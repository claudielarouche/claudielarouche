// netlify/functions/subscribe.js
export const handler = async (event) => {
  // CORS + preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: cors(),
      body: "",
    };
  }

  try {
    console.log("subscribe invoked", { method: event.httpMethod });

    if (event.httpMethod !== "POST") {
      return json(405, { error: "Method Not Allowed" });
    }

    const body = JSON.parse(event.body || "{}");
    console.log("payload received", body);

    // quick validation
    const required = ["email", "board", "category", "advance_days"];
    for (const k of required) {
      if (body[k] == null || body[k] === "") {
        return json(400, { error: `Missing ${k}` });
      }
    }

    // Stub OK response (no DB yet)
    return json(200, { ok: true, stub: true });
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
  return {
    statusCode: code,
    headers: { "Content-Type": "application/json", ...cors() },
    body: JSON.stringify(obj),
  };
}
