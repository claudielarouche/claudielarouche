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
    if (!Array.isArray(data)) {
        console.error('Error loading data: Data is not an array.');
        document.getElementById('csvData').innerHTML = 'Error loading data.';
        return;
    }

    let sortOrderIndex;

    if (data.length === 0) {
        console.warn('No data available.');
        document.getElementById('csvData').innerHTML = 'No data available.';
        return;
    }

    const headers = Object.keys(data[0]);

    let tableHtml = '<table id="dataTable"><thead><tr>';
    headers.forEach(header => {
        if (header !== 'Website') {
            tableHtml += `<th>${header}</th>`;
        }
    });
    tableHtml += '</tr></thead><tbody>';

    const filteredData = filterData(data, selectedTypes);

    filteredData.forEach(row => {
        tableHtml += '<tr>';

        headers.forEach(header => {
            if (header !== 'Website') {
                switch (header) {

                    case 'Name':
                        const url = row['Website'] ? row['Website'] : '';
                        const name = row[header] ? row[header] : '';
                        if (url !== '' && name !== '') {
                            tableHtml += `<td><a href="${url}" target="_blank">${name}</a></td>`;
                        } else {
                            tableHtml += `<td>${name}</td>`;
                        }
                        break;

                    case 'Address':
                        const address = row[header] ? row[header].trim() : '';
                        if (address !== '') {
                            const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)},+Ottawa,+Canada`;
                            tableHtml += `<td><a href="${googleMapsLink}" target="_blank">${address}</a></td>`;
                        } else {
                            tableHtml += '<td></td>';
                        }
                        break;

                    default:
                        tableHtml += `<td>${row[header]}</td>`;
                        break;
                }
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
            "buttons": [
                'colvis'
            ],
            "order": [0, 'asc'],
            "language": {
                "emptyTable": "No data available in table, try <a href='javascript:void(0);' onclick='clearAllFilters()'>resetting all filters to default</a>.",
                "zeroRecords": "No data available in table, try <a href='javascript:void(0);' onclick='clearAllFilters()'>resetting all filters to default</a>."
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

    addMarkersToMap(filteredData);
}


function filterData(data, selectedType) {
    return data.filter(row => {
        const currentType = row['Type'] || '';
        const typeCondition = selectedType.length === 0
            ? true
            : selectedType.some(t => currentType.toLowerCase().includes(t.toLowerCase()));
        return typeCondition;
    });
}


let currentSearchValue = getQueryParam('search');

function clearAllFilters() {
    sortingState = $('#dataTable').DataTable().state();

    document.querySelectorAll('.typeCheckbox').forEach(checkbox => {
        checkbox.checked = true;
        if (!selectedTypes.includes(checkbox.value)) {
            selectedTypes.push(checkbox.value);
        }
    });

    var dataTable = $('#dataTable').DataTable();
    dataTable.search('').draw();
    currentSearchValue = "";

    renderTable(originalData);
}

const selectedTypes = [];

document.querySelectorAll('.typeCheckbox').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        sortingState = $('#dataTable').DataTable().state();
        currentSearchValue = $('#dataTable_filter input').val();
        if (checkbox.checked) {
            if (!selectedTypes.includes(checkbox.value)) {
                selectedTypes.push(checkbox.value);
            }
        } else {
            const index = selectedTypes.indexOf(checkbox.value);
            if (index !== -1) {
                selectedTypes.splice(index, 1);
            }
        }
        renderTable(originalData);
    });

    checkbox.checked = true;
    if (!selectedTypes.includes(checkbox.value)) {
        selectedTypes.push(checkbox.value);
    }
});


function initMap() {
    map = L.map('map').setView([45.4215, -75.6972], 12);

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
                var popupContent = `<b>${item['Name']}</b><br>Type: ${item['Type']}`;
                var marker = L.marker([lat, lng])
                    .bindPopup(popupContent);
                markersGroup.addLayer(marker);
                allMarkers.push({ marker: marker, name: item['Name'] });
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
