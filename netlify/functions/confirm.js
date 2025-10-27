// Used by "School notification" project
// netlify/functions/confirm.js
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export const handler = async (event) => {
  const token = event.queryStringParameters?.token;
  if (!token) return html('Missing token', 400);

  const { data, error } = await supabase 
    .from('subscriptions')
    .select('*')
    .eq('confirm_token', token)
    .limit(1)
    .single();

  if (error || !data) return html('Invalid or expired token', 400);

  let rule_payload = data.rule_payload;
  if (data.rule_type === 'biweekly') {
    const wd = rule_payload.weekday;
    const anchor = nextWeekday(new Date(), wd);
    rule_payload = { ...rule_payload, anchorDate: anchor.toISOString().slice(0,10) };
  }

  const { error: updErr } = await supabase
    .from('subscriptions')
    .update({ confirmed: true, rule_payload })
    .eq('id', data.id);

  if (updErr) return html('Failed to confirm', 500);

  return html(`<p>Subscription confirmed. You’ll get emails at 06:00 ET.</p>`);
};

function nextWeekday(fromDate, weekday) {
  const d = new Date(fromDate);
  d.setDate(d.getDate()+1); // start from tomorrow
  while (d.getDay() !== weekday) d.setDate(d.getDate()+1);
  return d;
}
function html(s, code=200) {
  return { statusCode: code, headers: { 'Content-Type':'text/html' }, body: s };
}
