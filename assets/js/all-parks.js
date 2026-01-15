(function () {
  function getCoordsFromMapDataset(mapEl) {
    if (!mapEl) return null;

    var latRaw = mapEl.getAttribute("data-lat");
    var lngRaw = mapEl.getAttribute("data-lng");

    if (!latRaw || !lngRaw) return null;

    var lat = parseFloat(latRaw);
    var lng = parseFloat(lngRaw);

    if (!isFinite(lat) || !isFinite(lng)) return null;

    return { lat: lat, lng: lng };
  }

  function getCoordsFromPageText() {
    var text = document.body ? document.body.innerText : "";
    if (!text) return null;

    var latMatch = text.match(/Latitude:\s*([0-9.+-]+)/i);
    var lngMatch = text.match(/Longitude:\s*([0-9.+-]+)/i);

    if (!latMatch || !lngMatch) return null;

    var lat = parseFloat(latMatch[1]);
    var lng = parseFloat(lngMatch[1]);

    if (!isFinite(lat) || !isFinite(lng)) return null;

    return { lat: lat, lng: lng };
  }

  function initLeafletMap() {
    var mapEl = document.getElementById("map");
    if (!mapEl) return;

    if (typeof L === "undefined") return;

    var coords = getCoordsFromMapDataset(mapEl) || getCoordsFromPageText();
    if (!coords) return;

    if (mapEl._leaflet_id) return;

    var map = L.map("map").setView([coords.lat, coords.lng], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([coords.lat, coords.lng]).addTo(map);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLeafletMap);
  } else {
    initLeafletMap();
  }
})();
