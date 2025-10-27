---
layout: default
title: School notifications
permalink: /dev-projects/notifications/
---

<h1>Email notifications for Ottawa school boards</h1>
<p>Select your board, choose what to be reminded about, and when to receive the email.</p>

<form id="notify-form">
  <fieldset>
    <label>Email
      <input type="email" name="email" required>
    </label>
  </fieldset>

  <fieldset>
    <label>School board
      <select name="board" required>
        <option value="ocdsb">OCDSB</option>
        <option value="ocsb">OCSB</option>
        <option value="cepeo">CEPEO</option>
        <option value="cecce">CECCE</option>
      </select>
    </label>
  </fieldset>

  <fieldset>
    <legend>What do you want to be notified about?</legend>

    <label>
      <input type="radio" name="category" value="pd" checked>
      PD/PA days
    </label>

    <label>
      <input type="radio" name="category" value="event">
      Custom repeating day(s) (e.g., library day)
    </label>

    <div id="event-config" style="display:none; margin-top:0.5rem;">
      <p><strong>Choose a pattern</strong></p>

      <label><input type="radio" name="rule_type" value="cycle_days" checked>
        10-day cycle: pick one or more days
      </label>
      <div class="rule rule-cycle">
        <div>
          <label>Cycle days (1–10)</label>
          <div id="cycle-days">
            <label><input type="checkbox" value="1">1</label>
            <label><input type="checkbox" value="2">2</label>
            <label><input type="checkbox" value="3">3</label>
            <label><input type="checkbox" value="4">4</label>
            <label><input type="checkbox" value="5">5</label>
            <label><input type="checkbox" value="6">6</label>
            <label><input type="checkbox" value="7">7</label>
            <label><input type="checkbox" value="8">8</label>
            <label><input type="checkbox" value="9">9</label>
            <label><input type="checkbox" value="10">10</label>
          </div>
        </div>
      </div>

      <label><input type="radio" name="rule_type" value="weekly">
        Weekly (e.g., every Wednesday)
      </label>
      <div class="rule rule-weekly" style="display:none;">
        <label>Weekday(s)</label>
        <select id="weekly-weekdays" multiple size="7">
          <option value="0">Sunday</option><option value="1">Monday</option><option value="2">Tuesday</option>
          <option value="3">Wednesday</option><option value="4">Thursday</option><option value="5">Friday</option>
          <option value="6">Saturday</option>
        </select>
      </div>

      <label><input type="radio" name="rule_type" value="biweekly">
        Every second &lt;weekday&gt; (biweekly)
      </label>
      <div class="rule rule-biweekly" style="display:none;">
        <label>Weekday</label>
        <select id="biweekly-weekday">
          <option value="1">Monday</option><option value="2">Tuesday</option><option value="3">Wednesday</option>
          <option value="4">Thursday</option><option value="5">Friday</option>
        </select>
        <p style="font-size:.9em;">We’ll anchor the pattern to the first occurrence after your confirmation.</p>
      </div>
    </div>
  </fieldset>

  <fieldset>
    <label>How many days before the event should we email you?
      <input type="number" name="advance_days" min="0" step="1" value="1" required>
    </label>
  </fieldset>

  <p style="font-size:.9em;">
    Privacy: we’ll use your email only for these notifications. Each email includes links to cancel this notification or all notifications.
  </p>

  <button type="submit">Subscribe</button>
  <span id="status" aria-live="polite" style="margin-left:.5rem;"></span>
</form>

<script>
const eventConfig = document.getElementById('event-config');
const statusEl = document.getElementById('status');

function showRule(which) {
  document.querySelectorAll('.rule').forEach(el => el.style.display = 'none');
  const map = { cycle_days: '.rule-cycle', weekly: '.rule-weekly', biweekly: '.rule-biweekly' };
  document.querySelector(map[which]).style.display = '';
}

document.querySelectorAll('input[name="category"]').forEach(r => {
  r.addEventListener('change', () => {
    eventConfig.style.display = (r.value === 'event' && r.checked) ? '' : 'none';
  });
});
document.querySelectorAll('input[name="rule_type"]').forEach(r => {
  r.addEventListener('change', () => showRule(r.value));
});
showRule('cycle_days');

document.getElementById('notify-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = 'Submitting…';

  const form = e.target;
  const formData = new FormData(form);
  const payload = {
    email: formData.get('email'),
    board: formData.get('board'),
    category: formData.get('category'),
    advance_days: parseInt(formData.get('advance_days'), 10),
    rule_type: null,
    rule_payload: null
  };

  if (payload.category === 'event') {
    const ruleType = form.querySelector('input[name="rule_type"]:checked').value;
    payload.rule_type = ruleType;
    if (ruleType === 'cycle_days') {
      const days = [...document.querySelectorAll('#cycle-days input:checked')].map(x => parseInt(x.value, 10));
      if (days.length === 0) { statusEl.textContent = 'Pick at least one cycle day.'; return; }
      payload.rule_payload = { days };
    } else if (ruleType === 'weekly') {
      const days = [...document.getElementById('weekly-weekdays').selectedOptions].map(o => parseInt(o.value, 10));
      if (days.length === 0) { statusEl.textContent = 'Pick at least one weekday.'; return; }
      payload.rule_payload = { weekdays: days };
    } else if (ruleType === 'biweekly') {
      const d = parseInt(document.getElementById('biweekly-weekday').value, 10);
      payload.rule_payload = { weekday: d, intervalWeeks: 2 };
    }
  }

  try {
    const res = await fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error');
    statusEl.textContent = 'Please check your email to confirm.';
    form.reset();
    eventConfig.style.display = 'none';
  } catch (err) {
    statusEl.textContent = 'Something went wrong. Please try again.';
    console.error(err);
  }
});
</script>
