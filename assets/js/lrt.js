const lrtStations = [
    { name: "Tunney's Pasture", lat: 45.4037285, lng: -75.7352187 },
    { name: "Bayview", lat: 45.4092962, lng: -75.7219932 },
    { name: "Pimisi", lat: 45.4136611, lng: -75.7135095 },
    { name: "Lyon", lat: 45.4189389, lng:  -75.7045351 },
    { name: "Parliament", lat: 45.4212818, lng: -75.6990875 },
    { name: "Rideau", lat: 45.4263154, lng: -75.6914553 },
    { name: "uOttawa", lat: 45.4205686, lng: -75.6823615 },
    { name: "Lees", lat: 45.4164162, lng: -75.6706241 },
    { name: "Hurdman", lat: 45.4123583, lng: -75.6642421 },
    { name: "Tremblay", lat: 45.4168685, lng: -75.6534543 },
    { name: "St‑Laurent", lat: 45.4206528, lng: -75.6374038 },
    { name: "Cyrville", lat: 45.4226651, lng: -75.6263589 },
    { name: "Blair", lat: 45.4310413, lng: -75.6084142 },
    { name: "Carleton", lat: 45.3855911, lng: -75.6959222 },
    { name: "Mooney's Bay", lat: 45.376859, lng: -75.6847132 },
    { name: "Walkley", lat: 45.3686560, lng: -75.6657325 },
    { name: "Greenboro", lat: 45.3595474, lng: -75.6591105 },
    { name: "South Keys", lat: 45.3534303, lng: -75.6555038 },
    { name: "Leitrim", lat: 45.3141525, lng: -75.6320817 },
    { name: "Bowesville", lat: 45.2933897, lng: -75.6326573 },
    { name: "Limebank", lat: 45.2775238, lng: -75.6665210 },
    { name: "Uplands", lat: 45.3330390, lng: -75.6557346 },
    { name: "Airport", lat: 45.3235902, lng: -75.6687793 }
];

async function geocodeAddress(address) {
  const response = await fetch("/.netlify/functions/get-coordinates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address })
  });

  const data = await response.json();
  if (!data.results || !data.results.length) throw new Error("Address not found.");

  const location = data.results[0].geometry.location;
  const formatted = data.results[0].formatted_address;

  return {
    lat: location.lat,
    lng: location.lng,
    formattedAddress: formatted
  };
}

async function getDistances(origin, destinations, mode) {
    const response = await fetch("/.netlify/functions/get-distance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        origins: `${origin.lat},${origin.lng}`,
        destinations: destinations.map(d => `${d.lat},${d.lng}`).join("|"),
        mode
    })
    });

    const data = await response.json();
    console.log("Distance Matrix API response:", data); // 🔍 log here
    return data.rows[0].elements;
}

async function findClosestStations() {
    const address = document.getElementById("addressInput").value;

    const fullAddress = address.includes("Ottawa") ? address : `${address}, Ottawa, ON, Canada`;

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "Loading...";

    try {
    const origin = await geocodeAddress(fullAddress);
    const formatted = origin.formattedAddress;
    
    const walking = await getDistances(origin, lrtStations, "walking");
    const driving = await getDistances(origin, lrtStations, "driving");
    const cycling = await getDistances(origin, lrtStations, "bicycling");

    const combined = lrtStations.map((station, i) => ({
        name: station.name,
        walkText: `${walking[i].distance.text} (${walking[i].duration.text})`,
        walkValue: walking[i].distance.value,
        driveText: `${driving[i].distance.text} (${driving[i].duration.text})`,
        cycleText: `${cycling[i].distance.text} (${cycling[i].duration.text})`
    }));

    combined.sort((a, b) => a.walkValue - b.walkValue);

    let html = `<h3>All LRT Stations Sorted by Walking Distance</h3><table>
                <p><strong>Address:</strong> ${formatted}</p>
                <tr>
                <th>Station</th>
                <th>Walking</th>
                <th>Driving</th>
                <th>Cycling</th>
                </tr>`;
    combined.forEach(station => {
    html += `<tr>
        <td>${station.name}</td>
        <td>${station.walkText}</td>
        <td>${station.driveText}</td>
        <td>${station.cycleText}</td>
    </tr>`;
    });
    html += `</table>`;
    resultsDiv.innerHTML = html;

    } catch (err) {
    resultsDiv.innerHTML = `<span style="color:red;">Error: ${err.message}</span>`;
    }
}