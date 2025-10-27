// Used by "School notification" project
// netlify/functions/subscribe.js
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

const env = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  SITE_URL: process.env.SITE_URL || "https://claudielarouche.netlify.app",
};
const supabase = (env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY)
  ? createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY)
  : null;
 
export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors(), body: "" };

  try {
    console.log("subscribe invoked", { method: event.httpMethod, envs: {
      hasUrl: !!env.SUPABASE_URL, hasKey: !!env.SUPABASE_SERVICE_KEY, hasResend: !!env.RESEND_API_KEY
    }});

    if (event.httpMethod !== "POST") return json(405, { error: "Method Not Allowed" });

    const body = JSON.parse(event.body || "{}");
    const required = ["email", "board", "category", "advance_days"];
    for (const k of required) if (body[k] == null || body[k] === "") return json(400, { error: `Missing ${k}` });

    if (!supabase) return json(500, { error: "Supabase not configured" });
    if (!env.RESEND_API_KEY) return json(500, { error: "RESEND_API_KEY not set" });

    const confirm_token = randomUUID();
    const cancel_token = randomUUID();

    const { error } = await supabase.from("subscriptions").insert([{
      email: String(body.email).trim().toLowerCase(),
      board: body.board,
      category: body.category,
      rule_type: body.rule_type || null,
      rule_payload: body.rule_payload || null,
      advance_days: Number(body.advance_days) || 0,
      timezone: "America/Toronto",
      confirm_token,
      cancel_token,
      confirmed: false
    }]);

    if (error) {
      console.error("DB insert failed:", error);
      return json(500, { error: "DB insert failed" });
    }

    const confirmUrl = `${env.SITE_URL}/.netlify/functions/confirm?token=${encodeURIComponent(confirm_token)}`;

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Ottawa School Alerts <notifications@onresend.com>",
        to: body.email,
        subject: "Confirm your subscription",
        html: `<p>Please confirm your subscription.</p><p><a href="${confirmUrl}">Confirm subscription</a></p>`,
      }),
    });

    if (!emailRes.ok) {
      const txt = await emailRes.text().catch(() => "");
      console.error("Email send failed:", emailRes.status, txt);
      return json(502, { error: "Email send failed" });
    }

    return json(200, { ok: true });
  } catch (e) {
    console.error("subscribe crashed", e);
    return json(500, { error: "Function crashed" });
  }
};

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
function json(code, obj) {
  return { statusCode: code, headers: { "Content-Type": "application/json", ...cors() }, body: JSON.stringify(obj) };
}
