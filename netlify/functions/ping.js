export const handler = async () => {
  console.log("ping invoked");
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true, ts: Date.now() })
  };
};
