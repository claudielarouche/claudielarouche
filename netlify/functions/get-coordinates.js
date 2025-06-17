const fetch = require("node-fetch");

exports.handler = async function(event) {
  const { address } = JSON.parse(event.body);
  const key = process.env.GOOGLE_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
