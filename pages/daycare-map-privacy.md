---
title: Home Daycare Map Privacy
description: How home daycare provider locations are shown on the map
layout: page
css:
  - https://unpkg.com/leaflet/dist/leaflet.css
js:
  - https://unpkg.com/leaflet/dist/leaflet.js
---

## How your location will appear on the map

To protect the privacy of home daycare providers, we do not display your exact address on the public map. Instead, your coordinates are **rounded to 3 decimal places**, which shifts your pin by roughly **50 to 100 metres** from your true location.

The map below shows the difference between the two:

- **True address** (exact coordinates) — shown in <span style="color:#e74c3c;">red</span>: this is what we receive but do **not** display publicly.
- **Approximate location** (rounded coordinates) — shown in <span style="color:#2980b9;">blue</span>: this is what visitors see on the map.

<div id="privacyMap" style="height: 450px; width: 100%; margin-top: 1rem;"></div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var trueCoords   = [45.44023, -75.6432];
    var roundedCoords = [45.441,  -75.644];

    var map = L.map('privacyMap').setView([45.4402, -75.6432], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var trueIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
        iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
    });

    var blueIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
        iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
    });

    L.marker(trueCoords, { icon: trueIcon })
        .addTo(map)
        .bindPopup('<b>True address</b><br>Exact coordinates: 45.44023, -75.6432<br><em>Not shown publicly.</em>');

    L.marker(roundedCoords, { icon: blueIcon })
        .addTo(map)
        .bindPopup('<b>Approximate location</b><br>Rounded coordinates: 45.441, -75.644<br><em>This is what visitors see.</em>');
});
</script>

## Why we do this

Home daycare providers operate out of their personal residences. Displaying your exact address publicly could raise safety and privacy concerns. By rounding coordinates to 3 decimal places, we ensure that:

- Your pin appears in the **right neighbourhood** and is useful to parents searching nearby.
- Your **exact home address is not pinpointed** on a public map.
- The offset is small enough (~50–100 m) that it does not mislead parents about your general area.

Parents who are interested in your daycare will contact you directly to get your full address.
