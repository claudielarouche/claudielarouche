---
---

let sortingState;
let originalData = [];
var map;
var markersGroup;
var allMarkers = [];

var blueIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

var greenIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

window.onload = function() {
    initMap();

    const csvFilePath = '{{ "/assets/data/daycare.csv" | relative_url }}';

    Papa.parse(csvFilePath, {
        header: true,
        download: true,
        skipEmptyLines: true,
        complete: function(results) {
            if (results.errors.length > 0) {
                console.error('Error parsing CSV:', results.errors);
                document.getElementById('csvData').innerHTML = 'Error loading data.';
            } else if (Array.isArray(results.data)) {
                originalData = results.data;
                renderTable(originalData);
            } else {
                console.error('Error loading data: Data is not an array.');
                document.getElementById('csvData').innerHTML = 'Error loading data.';
            }
        },
        error: function(error) {
            console.error('Error fetching or parsing CSV:', error);
            document.getElementById('csvData').innerHTML = 'Error loading data.';
        }
    });
};

function renderTable(data) {
    if (!Array.isArray(data) || data.length === 0) {
        document.getElementById('csvData').innerHTML = 'No data available.';
        return;
    }

    // Strip empty headers produced by trailing commas in the CSV
    const headers = Object.keys(data[0]).filter(h => h.trim() !== '');

    let tableHtml = '<table id="dataTable"><thead><tr>';
    headers.forEach(header => {
        if (header !== 'Website') {
            tableHtml += `<th>${header}</th>`;
        }
    });
    tableHtml += '</tr></thead><tbody>';

    data.forEach(row => {
        tableHtml += '<tr>';
        headers.forEach(header => {
            if (header === 'Website') return;
            switch (header) {
                case 'Child Care Centre Name':
                    const url = row['Website'] ? row['Website'].trim() : '';
                    const name = row[header] ? row[header] : '';
                    if (url !== '') {
                        tableHtml += `<td><a href="${url}" target="_blank">${name}</a></td>`;
                    } else {
                        tableHtml += `<td>${name}</td>`;
                    }
                    break;
                case 'CCC Civic Address':
                    const address = row[header] ? row[header].trim() : '';
                    if (address !== '') {
                        const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)},+Ottawa,+Canada`;
                        tableHtml += `<td><a href="${googleMapsLink}" target="_blank">${address}</a></td>`;
                    } else {
                        tableHtml += '<td></td>';
                    }
                    break;
                case 'Phone Number':
                    const phone = row[header] ? row[header].trim() : '';
                    if (phone !== '') {
                        tableHtml += `<td><a href="tel:${phone}">${phone}</a></td>`;
                    } else {
                        tableHtml += '<td></td>';
                    }
                    break;
                case 'Email Address':
                    const email = row[header] ? row[header].trim() : '';
                    if (email !== '') {
                        tableHtml += `<td><a href="mailto:${email}">${email}</a></td>`;
                    } else {
                        tableHtml += '<td></td>';
                    }
                    break;
                default:
                    tableHtml += `<td>${row[header] !== undefined ? row[header] : ''}</td>`;
                    break;
            }
        });
        tableHtml += '</tr>';
    });

    tableHtml += '</tbody></table>';
    document.getElementById('csvData').innerHTML = tableHtml;

    if (!$.fn.dataTable.isDataTable('#dataTable')) {
        $('#dataTable').DataTable({
            "pageLength": -1,
            "dom": 'Bfrtip',
            "buttons": ['colvis'],
            "columnDefs": [
                {
                    // Hide: Latitude(0), Longitude(1), # of Family Age Group(11),
                    // City(14), Province(15), Postal Code(16), Full French Service(17),
                    // Indigenous(18), Website is already excluded from headers
                    "targets": [0, 1, 11, 14, 15, 16, 17, 18],
                    "visible": false
                }
            ],
            "order": [4, 'asc'],
            "language": {
                "emptyTable": "No data available in table.",
                "zeroRecords": "No matching records found."
            }
        });
    }

    $('#dataTable_filter input').val(currentSearchValue).trigger('input');

    if (sortingState) {
        $('#dataTable').DataTable().order(sortingState.order).draw();
    }

    $('#dataTable_filter input').on('input', function() {
        filterMap();
    });

    addMarkersToMap(data);
}


let currentSearchValue = getQueryParam('search');

function initMap() {
    map = L.map('map').setView([45.4215, -75.6972], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    markersGroup = L.layerGroup().addTo(map);

    return map;
}

function addMarkersToMap(data) {
    markersGroup.clearLayers();
    allMarkers = [];

    data.forEach(item => {
        if (item['Latitude'] && item['Longitude']) {
            var lat = parseFloat(item['Latitude']);
            var lng = parseFloat(item['Longitude']);
            if (!isNaN(lat) && !isNaN(lng)) {
                const name    = item['Child Care Centre Name'] || '';
                const address = item['CCC Civic Address'] || '';
                const type    = item['Type'] || '';
                const total   = item['Total Capacity'] || 'TBD';
                const infant  = item['# of Infant'] || 'TBD';
                const toddler = item['# of Toddler'] || 'TBD';
                const preschool   = item['# of Preschool'] || 'TBD';
                const kindergarten = item['# of Kindergarten'] || 'TBD';
                const primaryJunior = item['# of Primary/Junior School Age '] || item['# of Primary/Junior School Age'] || 'TBD';
                const junior  = item['# of Junior School Age'] || 'TBD';
                const website = item['Website'] ? item['Website'].trim() : '';
                const phone   = item['Phone Number'] ? item['Phone Number'].trim() : '';
                const email   = item['Email Address'] ? item['Email Address'].trim() : '';

                const nameHtml = website !== ''
                    ? `<a href="${website}" target="_blank">${name}</a>`
                    : name;
                const phoneHtml = phone !== ''
                    ? `<br>📞 <a href="tel:${phone}">${phone}</a>`
                    : '';
                const emailHtml = email !== ''
                    ? `<br>✉️ <a href="mailto:${email}">${email}</a>`
                    : '';

                var popupContent =
                    `<b>${nameHtml}</b><br>` +
                    `${address}` +
                    `${phoneHtml}` +
                    `${emailHtml}` +
                    `<br><br><b>Capacity by age group:</b><br>` +
                    `Infant: ${infant} | Toddler: ${toddler} | Preschool: ${preschool}<br>` +
                    `Kindergarten: ${kindergarten} | Primary/Junior: ${primaryJunior} | Junior: ${junior}<br>` +
                    `<b>Total capacity: ${total}</b>`;

                const icon = type === 'Home' ? greenIcon : blueIcon;

                var marker = L.marker([lat, lng], { icon: icon }).bindPopup(popupContent);
                markersGroup.addLayer(marker);
                const licensee = item['Licensee Name'] || '';
                const searchText = [name, licensee, address, type].join(' ').toLowerCase();
                allMarkers.push({ marker: marker, name: name, searchText: searchText });
            }
        }
    });
}

function filterMap() {
    markersGroup.clearLayers();
    currentSearchValue = $('#dataTable_filter input').val();

    if (currentSearchValue) {
        const words = currentSearchValue.toLowerCase().split(/\s+/).filter(w => w.length > 0);
        allMarkers.forEach(function(obj) {
            if (words.every(w => obj.searchText.includes(w))) {
                markersGroup.addLayer(obj.marker);
            }
        });
    } else {
        allMarkers.forEach(function(obj) {
            markersGroup.addLayer(obj.marker);
        });
    }
}
