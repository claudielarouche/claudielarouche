// Used by "School notification" project
// netlify/functions/subscribe.js
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SITE_URL = process.env.SITE_URL || 'https://your-site.netlify.app';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  const body = JSON.parse(event.body || '{}');

  // Basic validation
  const required = ['email','board','category','advance_days'];
  for (const k of required) if (body[k] == null) return resp(400, { error: `Missing ${k}` });

  const confirm_token = cryptoRandom();
  const cancel_token = cryptoRandom();

  const { data, error } = await supabase
    .from('subscriptions')
    .insert([{
      email: body.email.trim().toLowerCase(),
      board: body.board,
      category: body.category,
      rule_type: body.rule_type || null,
      rule_payload: body.rule_payload || null,
      advance_days: body.advance_days,
      timezone: 'America/Toronto',
      confirm_token,
      cancel_token,
      confirmed: false
    }])
    .select();

  if (error) return resp(500, { error: 'DB insert failed' });

  const confirmUrl = `${SITE_URL}/.netlify/functions/confirm?token=${confirm_token}`;
  await sendEmail({
    to: body.email,
    subject: 'Confirm your subscription',
    html: `
      <p>Hi! Please confirm your subscription for ${body.category === 'pd' ? 'PD/PA day' : 'custom day'} notifications.</p>
      <p><a href="${confirmUrl}">Confirm subscription</a></p>
      <p>If you didn’t request this, you can ignore this email.</p>
    `
  });

  return resp(200, { ok: true });
};

function resp(statusCode, payload) {
  return { statusCode, headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) };
}
function cryptoRandom() {
  return [...crypto.getRandomValues(new Uint8Array(16))].map(b=>b.toString(16).padStart(2,'0')).join('');
}
async function sendEmail({ to, subject, html }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type':'application/json' },
    body: JSON.stringify({
      from: 'Ottawa School Alerts <notifications@onresend.com>', // swap to your custom domain later
      to, subject, html
    })
  });
  if (!res.ok) throw new Error('Email send failed');
}
