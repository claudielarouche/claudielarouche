---
---

console.log('filter map works now');

let sortingState;
let originalData = []; // Initialize as an empty array
var map; // Global map variable
var markersGroup;
// Global variable to hold all markers
var allMarkers = [];

function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

window.onload = function() {
    initMap();
    //markersGroup = L.layerGroup().addTo(map); // Initialize once and add to map
    
    // Update the path to your CSV file
	const csvFilePath = '{{ "/assets/data/playgrounds.csv" | relative_url }}';

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
    // Ensure data is an array
    if (!Array.isArray(data)) {
        console.error('Error loading data: Data is not an array.');
        document.getElementById('csvData').innerHTML = 'Error loading data.';
        return;
    }

   let sortOrderIndex; 

    // Check if data is empty
    if (data.length === 0) {
        console.warn('No data available.');
        document.getElementById('csvData').innerHTML = 'No data available.';
        return;
    }

    const headers = Object.keys(data[0]);

    let tableHtml = '<table id="dataTable"><thead><tr>';
    headers.forEach(header => {
        // Skip rendering the URL column
        if (header !== 'Website') {
            tableHtml += `<th>${header}</th>`;
        }
    });

    tableHtml += '<th>Actions</th></tr></thead><tbody>';

    //const filteredData = filterData(data, selectedAreas);    
    const filteredData = data;

    // Iterate through each row of data
    filteredData.forEach(row => {
        const currentDate = row['Date'] ? row['Date'] : '';

        // Start building the row with a conditional background color
        tableHtml += '<tr>';

        headers.forEach((header, index) => {
            // Skip rendering the URL column
            if (header !== 'Website') {
                switch (header) {
            
                    

                    case 'Address':
                        // Create a link with the Google Maps URL for the address
                        const address = row[header] ? row[header].trim() : '';
                        if (address !== '') {
                            const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)},+Ottawa,+Canada`;
                            tableHtml += `<td><a href="${googleMapsLink}" target="_blank">${address}</a></td>`;
                        } else {
                            tableHtml += '<td></td>';
                        }
                        break;

       
                    default:
                        // Display other columns
                        tableHtml += `<td>${row[header]}</td>`;
                        break;
                }
            }
        });

        const reportValues = headers
            .map(header => `${header}: ${row[header]}`)
            .join(', ');

        const reportUrl = `https://docs.google.com/forms/d/e/1FAIpQLScTQ6U_lnHo0kr5rGo3zSjYQwsGG5PZIfL5Eil8iVQU9UWTmg/viewform?usp=sf_link&entry.658764103=${encodeURIComponent('Ottawa Wading Pools: ' + reportValues)}`;

        tableHtml += `<td><a href="${reportUrl}" target="_blank">Report a data issue</a></td>`;
        
        tableHtml += '</tr>';
    });

    tableHtml += '</tbody></table>';

    document.getElementById('csvData').innerHTML = tableHtml;

    if (!$.fn.dataTable.isDataTable('#dataTable')) {
        $('#dataTable').DataTable({
            "pageLength": -1,
            "dom": 'Bfrtip', // 'B' for buttons
            "buttons": [
                'colvis' // Column visibility button
            ],

        "columnDefs": [
                {
                "targets": [0, 1, 2, 3, 4],
                "visible": false 
                }
              
            ],
        "order": [0, 'asc'],
            "language": {
                "emptyTable": "No data available in table, try <a href='javascript:void(0);' onclick='clearAllFilters()'>resetting all filters to default</a>.",
                "zeroRecords": "No data available in table, try <a href='javascript:void(0);' onclick='clearAllFilters()'>resetting all filters to default</a>."
            }
        });
    }

    // 🌞 Keep only today's day column
    const table = $('#dataTable').DataTable();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay(); // 0 = Sunday, ..., 6 = Saturday

    const todayName = days[today];


    const columnHeaders = table.columns().header().toArray().map(th => th.textContent.trim());

    days.forEach(day => {
        const columnIndex = columnHeaders.findIndex(header => header.toLowerCase() === day.toLowerCase());

        const result_of_today = day === todayName;


        if (columnIndex !== -1) {
            table.column(columnIndex).visible(day === todayName);
        }
    });
    
    $('#dataTable_filter input').val(currentSearchValue).trigger('input');

    //If sortingState is set, sort the table by sortingState
    if (sortingState) {
        $('#dataTable').DataTable().order(sortingState.order).draw();
    }

    $('#dataTable_filter input').on('input', function() {        
        filterMap();
    });
    
    // Add markers to the map based on the data
    addMarkersToMap(filteredData);
//	filterMap();
}

/*
function filterData(data, selectedArea) {


    return data.filter(row => {

    const currentArea = row['Area'] || '';
    
    const areaCondition = selectedArea.some(board => currentArea.toLowerCase().includes(board.toLowerCase()));

        
            
    return areaCondition;
    });
}*/


let currentSearchValue = getQueryParam('search'); // Variable to store the current search value

function clearAllFilters() {
    // Store the current sorting state
    sortingState = $('#dataTable').DataTable().state();
    
    // Check all the "Select Board" checkboxes
   document.querySelectorAll('.areaCheckbox').forEach(checkbox => {
        checkbox.checked = true;
        if (!selectedAreas.includes(checkbox.value)) {
            selectedAreas.push(checkbox.value);
        }
    });




    // Clear the DataTable search box
    var dataTable = $('#dataTable').DataTable();
    dataTable.search('').draw();
    currentSearchValue = "";

    // Render the table with cleared filters
    renderTable(originalData);
}
/*
const selectedAreas = [];

document.querySelectorAll('.areaCheckbox').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
    // Store the current sorting state
        sortingState = $('#dataTable').DataTable().state();
        currentSearchValue = $('#dataTable_filter input').val();
        if (checkbox.checked) {
            if (!selectedAreas.includes(checkbox.value)) {
                selectedAreas.push(checkbox.value);
            }
        } else {
            const index = selectedAreas.indexOf(checkbox.value);
            if (index !== -1) {
                selectedAreas.splice(index, 1);
            }
        }
        renderTable(originalData);
    });

    // Initialize with all checkboxes checked by default
    checkbox.checked = true;
    if (!selectedAreas.includes(checkbox.value)) {
        selectedAreas.push(checkbox.value);
    }
});
*/

function initMap() {
    var map = L.map('map').setView([45.4215, -75.6972], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    markersGroup = L.layerGroup().addTo(map);

  

    return map;
}



function addMarkersToMap(data) {
    markersGroup.clearLayers(); // Clear existing markers
    allMarkers = []; // Reset the allMarkers array

    

    data.forEach(item => {
        if (item['Latitude'] && item['Longitude']) {
            var lat = parseFloat(item['Latitude']);
            var lng = parseFloat(item['Longitude']);
            if (!isNaN(lat) && !isNaN(lng)) {

                

                var address = item['Park Address'] ? item['Park Address'].trim() : '';
                var addressLink = address 
                    ? `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}, Ottawa, Canada" target="_blank">${address}</a><br>` 
                    : '';

                var popupContent = `                    
                    <b>${item['Park Name']}</b><br>
                    ${addressLink}`;

                var marker = L.marker([lat, lng])
                    .bindPopup(popupContent);

                markersGroup.addLayer(marker); // Add new marker to the group
                allMarkers.push({ marker: marker, name: item['Name'] }); // Store marker with name for filtering
            }
        }
    });
}

function filterMap() {
    markersGroup.clearLayers(); // Clear existing markers
    currentSearchValue = $('#dataTable_filter input').val();

    if (currentSearchValue) {
        allMarkers.forEach(function(obj) {
            if (obj.name.toLowerCase().includes(currentSearchValue.toLowerCase())) {
                markersGroup.addLayer(obj.marker);
            }
        });
    } else {
        // Optionally add back all markers if no search term is provided
        allMarkers.forEach(function(obj) {
            markersGroup.addLayer(obj.marker);
        });
    }
}

/*
document.addEventListener('DOMContentLoaded', function() {
    const selectAllAreasBtn = document.getElementById('selectAllAreasButton');
    const unselectAllAreasBtn = document.getElementById('unselectAllAreasButton');
    const areasCheckboxes = document.querySelectorAll('.areaCheckbox');

    selectAllAreasBtn.addEventListener('click', function() {
        areasCheckboxes.forEach(cb => {
            cb.checked = true;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    unselectAllAreasBtn.addEventListener('click', function() {
        areasCheckboxes.forEach(cb => {
            cb.checked = false;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });  
});*/