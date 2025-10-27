// Used by "School notification" project

// netlify/functions/send-daily.js
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SITE_URL = process.env.SITE_URL || 'https://your-site.netlify.app';

export const handler = async () => {
  const today = new Date(); // Netlify scheduled at 06:00 America/Toronto
  const { data: subs, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('confirmed', true)
    .is('deleted_at', null);

  if (error) return resp(500, { error: 'DB read failed' });

  // Load CSV mapping shipped with the site (built into /_data/calendars.csv)
  const map = await loadCalendar();

  const sends = [];
  for (const s of subs) {
    const target = addDays(today, s.advance_days);
    const targetISO = iso(target);
    const label = (map[targetISO]?.[s.board]) || null;

    let match = false;
    if (s.category === 'pd') {
      match = (label === 'PA');
    } else if (s.category === 'event') {
      if (s.rule_type === 'cycle_days') {
        if (label && /^\d+$/.test(label)) {
          const dayNum = parseInt(label,10);
          match = Array.isArray(s.rule_payload?.days) && s.rule_payload.days.includes(dayNum);
        }
      } else if (s.rule_type === 'weekly') {
        match = (s.rule_payload?.weekdays || []).includes(target.getDay());
      } else if (s.rule_type === 'biweekly') {
        const wd = s.rule_payload?.weekday;
        const anchor = s.rule_payload?.anchorDate;
        if (wd != null && anchor) {
          match = (target.getDay() === wd) && weeksBetween(new Date(anchor), target) % 2 === 0;
        }
      }
    }

    if (match) {
      const manageThis = `${SITE_URL}/.netlify/functions/unsubscribe?id=${encodeURIComponent(s.id)}&token=${encodeURIComponent(s.cancel_token)}`;
      const manageAll = `${SITE_URL}/.netlify/functions/unsubscribe?all=1&token=${encodeURIComponent(s.cancel_token)}`;

      const subject = (s.category === 'pd') ? `Heads up: PD/PA day in ${s.advance_days} day(s)` :
        `Reminder: Your event in ${s.advance_days} day(s)`;

      const body = emailHtml({
        subject,
        board: s.board.toUpperCase(),
        targetDate: targetISO,
        label,
        manageThis, manageAll
      });

      sends.push(sendEmail({ to: s.email, subject, html: body }));
    }
  }

  await Promise.allSettled(sends);
  return resp(200, { ok: true, attempted: sends.length });
};

function resp(statusCode, payload) {
  return { statusCode, headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) };
}
function addDays(d, n){ const x=new Date(d); x.setDate(x.getDate()+Number(n||0)); return x; }
function iso(d){ return d.toISOString().slice(0,10); }
function weeksBetween(a, b){
  const ms = (Date.UTC(b.getFullYear(),b.getMonth(),b.getDate()) - Date.UTC(a.getFullYear(),a.getMonth(),a.getDate()));
  return Math.floor(ms / (1000*60*60*24*7));
}
async function loadCalendar(){
  // During build, copy _data/calendars.csv to /functions-data or bundle it with your function
  const here = path.dirname(fileURLToPath(import.meta.url));
  const csvPath = path.join(here, 'calendars.csv'); // place a copy alongside this function
  const text = fs.readFileSync(csvPath, 'utf8').trim();
  const rows = text.split(/\r?\n/).map(l=>l.split(','));
  const headers = rows.shift().map(h=>h.trim().toLowerCase());
  const idx = {
    date: headers.indexOf('date'),
    ocdsb: headers.indexOf('ocdsb'),
    ocsb: headers.indexOf('ocsb'),
    cepeo: headers.indexOf('cepeo'),
    cecce: headers.indexOf('cecce')
  };
  const map = {};
  for (const r of rows) {
    const d = r[idx.date];
    map[d] = {
      ocdsb: r[idx.ocdsb],
      ocsb: r[idx.ocsb],
      cepeo: r[idx.cepeo],
      cecce: r[idx.cecce]
    };
  }
  return map;
}
function emailHtml({ subject, board, targetDate, label, manageThis, manageAll }) {
  return `
    <div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif">
      <h2>${subject}</h2>
      <p><strong>Board:</strong> ${board}</p>
      <p><strong>Target date:</strong> ${targetDate}${label ? ` (Cycle label: ${label})` : ''}</p>
      <hr>
      <p style="font-size:.9em;color:#555">
        <a href="${manageThis}">Cancel this notification</a> ·
        <a href="${manageAll}">Cancel all notifications</a>
      </p>
    </div>
  `;
}
async function sendEmail({ to, subject, html }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type':'application/json' },
    body: JSON.stringify({ from: 'Ottawa School Alerts <notifications@onresend.com>', to, subject, html })
  });
  if (!res.ok) throw new Error('Email send failed');
}
