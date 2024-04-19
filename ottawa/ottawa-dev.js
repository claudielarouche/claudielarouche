console.log('fix sort order 1');

let originalData = []; // Initialize as an empty array

function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

window.onload = function() {
	// Update the path to your CSV file
	const csvFilePath = 'https://claudielarouche.com/ottawa/data.csv';

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

   let sortOrderIndex; // Declare babyScaleIndex variable

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
        if (header !== 'URL') {
            tableHtml += `<th>${header}</th>`;
        }
    });
    tableHtml += '</tr></thead><tbody>';

    // Iterate through each row of data
    data.forEach(row => {
        const currentDate = row['Date'] ? row['Date'] : '';

        // Start building the row with a conditional background color
        tableHtml += '<tr>';

        headers.forEach(header => {
            // Skip rendering the URL column
            if (header !== 'URL') {
                switch (header) {
		    case 'Sort Order': 	
				    // Assign the index of the "Baby Scale" column to the babyScaleIndex variable
                    		    sortOrderIndex = index;					  
				    tableHtml += `<td>${row[header]}</td>`;
				    break;
                    case 'Facility Name':
                        // Merge URL with Pool Name to create a clickable link
                        const url = row['URL'] ? row['URL'] : '';
                        const poolName = row[header] ? row[header] : '';
                        if (url !== '' && poolName !== '') {
                            tableHtml += `<td><a href="${url}" target="_blank">${poolName}</a></td>`;
                        } else {
                            tableHtml += `<td>${poolName}</td>`;
                        }
                        break;

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

		case 'Reservation':
                // Handle Facility URL content
                const facilityUrl = row[header] ? row[header] : '';
                if (facilityUrl === '#') {
                    tableHtml += '<td>N/A</td>';
                } else {
                    tableHtml += `<td><a href="${facilityUrl}" target="_blank">Facility Reservation Page</a> (if required)</td>`;
                }
                break;

                    default:
                        // Display other columns
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
            "dom": 'Bfrtip', // 'B' for buttons
            "buttons": [
                'colvis' // Column visibility button
            ],

	    "columnDefs": [
			    {
				"targets": sortOrderIndex, 
				"visible": false 
			    }
			  
			],
		"order": [
        [0, 'asc'] // Specify the index of the hidden column and the sorting order
    ]
            "language": {
                "emptyTable": "No data available in table, try <a href='javascript:void(0);' onclick='clearAllFilters()'>resetting all filters to default</a>.",
                "zeroRecords": "No data available in table, try <a href='javascript:void(0);' onclick='clearAllFilters()'>resetting all filters to default</a>."
            }
        });
    }
    $('#dataTable_filter input').val(currentSearchValue).trigger('input');
}

document.getElementById('showToday').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor link

    // Scroll to the element with id 'csvData'
    document.getElementById('csvData').scrollIntoView({ behavior: 'smooth' });

    // Get today's day of the week
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const todayDayOfWeek = daysOfWeek[today.getDay()];

    currentSearchValue = $('#dataTable_filter input').val();

    currentSearchValue = todayDayOfWeek + (currentSearchValue ? " " + currentSearchValue : "");

    // Populate the search box with today's day of the week
    document.getElementById('dataTable_filter').querySelector('input').value = currentSearchValue;
    
    // Trigger the input event to initiate the search
    document.getElementById('dataTable_filter').querySelector('input').dispatchEvent(new Event('input'));
});

let currentSearchValue = getQueryParam('search'); // Variable to store the current search value

function clearAllFilters() {


    // Clear the DataTable search box
    var dataTable = $('#dataTable').DataTable();
    dataTable.search('').draw();
	currentSearchValue = "";

    // Render the table with cleared filters
    renderTable(originalData);
}
