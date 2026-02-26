---
---

console.log('v5');

let sortingState;
let originalData = [];
var map;
var markersGroup;
var allMarkers = [];

let currentSearchValue = getQueryParam('search') || '';

function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

window.onload = function () {
  initMap();

  const csvFilePath = '{{ "/assets/data/sled.csv" | relative_url }}';

  Papa.parse(csvFilePath, {
    header: true,
    download: true,
    skipEmptyLines: true,
    complete: function (results) {
      if (results.errors.length > 0) {
        console.error('Error parsing CSV:', results.errors);
        document.getElementById('csvData').innerHTML = 'Error loading data.';
        return;
      }

      if (!Array.isArray(results.data)) {
        console.error('Error loading data: Data is not an array.');
        document.getElementById('csvData').innerHTML = 'Error loading data.';
        return;
      }

      originalData = results.data;
      renderTable(originalData);
    },
    error: function (error) {
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

  if (data.length === 0) {
    console.warn('No data available.');
    document.getElementById('csvData').innerHTML = 'No data available.';
    return;
  }

  const headers = Object.keys(data[0]);

  // Destroy existing DataTable BEFORE replacing table HTML
  if ($.fn.dataTable.isDataTable('#dataTable')) {
    $('#dataTable').DataTable().destroy();
  }

  // Build table HTML
  let tableHtml = '<table id="dataTable"><thead><tr>';
  headers.forEach(header => {
    tableHtml += `<th>${header}</th>`;
  });
  tableHtml += '</tr></thead><tbody>';

  data.forEach(row => {
    tableHtml += '<tr>';

    headers.forEach(header => {
      switch (header) {
        case 'Address': {
          const address = row[header] ? row[header].trim() : '';
          if (address !== '') {
            const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)},+Ottawa,+Canada`;
            tableHtml += `<td><a href="${googleMapsLink}" target="_blank">${address}</a></td>`;
          } else {
            tableHtml += '<td></td>';
          }
          break;
        }
        default:
          tableHtml += `<td>${row[header] ?? ''}</td>`;
          break;
      }
    });

    tableHtml += '</tr>';
  });

  tableHtml += '</tbody></table>';
  document.getElementById('csvData').innerHTML = tableHtml;

  // Init DataTable and keep a usable reference every time
  const nameColumnIndex = headers.indexOf('Park Name');
  const orderSetting = nameColumnIndex >= 0 ? [[nameColumnIndex, 'asc']] : [];

  const dt = $('#dataTable').DataTable({
    pageLength: -1,
    dom: 'Bfrtip',
    buttons: ['colvis'],
    columnDefs: [
      {
        targets: [0, 1, 2, 3, 4, 5, 6],
        visible: false
      }
    ],
    order: orderSetting,
    language: {
      emptyTable: "No data available in table, try <a href='javascript:void(0);' onclick='clearAllFilters()'>resetting all filters to default</a>.",
      zeroRecords: "No data available in table, try <a href='javascript:void(0);' onclick='clearAllFilters()'>resetting all filters to default</a>."
    }
  });

  // Reapply prior sort state if you captured it
  if (sortingState && sortingState.order) {
    dt.order(sortingState.order).draw();
  }

  // Apply query param search using the DataTables API (not by triggering input)
  dt.search(currentSearchValue || '').draw();

  // Ensure only one handler is attached
  $('#dataTable_filter input')
    .off('input.sled')
    .on('input.sled', function () {
      filterMap();
    });

  // Rebuild markers from the full dataset, then filter markers based on current table search box
  addMarkersToMap(data);
  filterMap();
}

function clearAllFilters() {
  // Store sorting state before wipe
  if ($.fn.dataTable.isDataTable('#dataTable')) {
    sortingState = $('#dataTable').DataTable().state();
  }

  const dt = $('#dataTable').DataTable();
  dt.search('').draw();
  currentSearchValue = '';

  renderTable(originalData);
}

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
      const lat = parseFloat(item['Latitude']);
      const lng = parseFloat(item['Longitude']);

      if (!isNaN(lat) && !isNaN(lng)) {
        const address = item['Address'] ? item['Address'].trim() : '';
        const addressLink = address
          ? `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}, Ottawa, Canada" target="_blank">${address}</a><br>`
          : '';

        let popupContent = `<b>${item['Park Name'] || ''}</b><br>${addressLink}`;

        const fields = ['Address', 'Observations'];
        fields.forEach(field => {
          if (item[field] && item[field].toString().trim() !== '') {
            popupContent += `<b>${field}:</b> ${item[field]}<br>`;
          }
        });

        const marker = L.marker([lat, lng]).bindPopup(popupContent);
        markersGroup.addLayer(marker);
        allMarkers.push({ marker: marker, data: item });
      }
    }
  });
}

function filterMap() {
  markersGroup.clearLayers();

  const input = $('#dataTable_filter input');
  const value = (input.val() || '').toString().toLowerCase();
  currentSearchValue = value;

  if (value) {
    allMarkers.forEach(obj => {
      const values = Object.values(obj.data).join(' ').toLowerCase();
      if (values.includes(value)) {
        markersGroup.addLayer(obj.marker);
      }
    });
  } else {
    allMarkers.forEach(obj => markersGroup.addLayer(obj.marker));
  }
}