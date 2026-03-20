---
---

let sortingState;
let originalData = [];
var map;
var markersGroup;
var allMarkers = [];

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
        tableHtml += `<th>${header}</th>`;
    });
    tableHtml += '</tr></thead><tbody>';

    data.forEach(row => {
        tableHtml += '<tr>';
        headers.forEach(header => {
            switch (header) {
                case 'CCC Civic Address':
                    const address = row[header] ? row[header].trim() : '';
                    if (address !== '') {
                        const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)},+Ottawa,+Canada`;
                        tableHtml += `<td><a href="${googleMapsLink}" target="_blank">${address}</a></td>`;
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
                    // Hide: Latitude(0), Longitude(1), City(13), Province(14), Postal Code(15), Full French Service(16), Indigenous(17)
                    "targets": [0, 1, 13, 14, 15, 16, 17],
                    "visible": false
                }
            ],
            "order": [3, 'asc'],
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
                const name = item['Child Care Centre Name'] || '';
                const address = item['CCC Civic Address'] || '';
                const total = item['Total Capacity'] || '';
                const infant = item['# of Infant'] || '0';
                const toddler = item['# of Toddler'] || '0';
                const preschool = item['# of Preschool'] || '0';
                const kindergarten = item['# of Kindergarten'] || '0';
                const primaryJunior = item['# of Primary/Junior School Age '] || item['# of Primary/Junior School Age'] || '0';
                const junior = item['# of Junior School Age'] || '0';
                const family = item['# of Family Age Group'] || '0';

                var popupContent =
                    `<b>${name}</b><br>` +
                    `${address}<br><br>` +
                    `<b>Capacity by age group:</b><br>` +
                    `Infant: ${infant} | Toddler: ${toddler} | Preschool: ${preschool}<br>` +
                    `Kindergarten: ${kindergarten} | Primary/Junior: ${primaryJunior}<br>` +
                    `Junior: ${junior} | Family: ${family}<br>` +
                    `<b>Total capacity: ${total}</b>`;

                var marker = L.marker([lat, lng]).bindPopup(popupContent);
                markersGroup.addLayer(marker);
                allMarkers.push({ marker: marker, name: name });
            }
        }
    });
}

function filterMap() {
    markersGroup.clearLayers();
    currentSearchValue = $('#dataTable_filter input').val();

    if (currentSearchValue) {
        allMarkers.forEach(function(obj) {
            if (obj.name.toLowerCase().includes(currentSearchValue.toLowerCase())) {
                markersGroup.addLayer(obj.marker);
            }
        });
    } else {
        allMarkers.forEach(function(obj) {
            markersGroup.addLayer(obj.marker);
        });
    }
}
