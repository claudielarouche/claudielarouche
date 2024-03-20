console.log('version 1');

let originalData = []; // Initialize as an empty array

function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

window.onload = function() {
	// Update the path to your CSV file
	const csvFilePath = 'https://claudielarouche.com/dance/data.csv';

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

	// Check if data is empty
	if (data.length === 0) {
		console.warn('No data available.');
		document.getElementById('csvData').innerHTML = 'No data available.';
		return;
	}

	const headers = Object.keys(data[0]);

	let tableHtml = '<table id="dataTable"><thead><tr>';
	headers.forEach(header => {
		tableHtml += `<th>${header}</th>`;
	});
	//tableHtml += '<th>Actions</th></tr></thead><tbody>';
	tableHtml += '</tr></thead><tbody>';
	

	

    //const filteredData = filterData(data, selectedDate, selectedArea, selectedAgeGroup);
	//const filteredData = filterData(data, selectedDate, selectedAgeGroup);

	if (!Array.isArray(data)) {
		console.error('Error loading data: Filtered data is not an array.');
		document.getElementById('csvData').innerHTML = 'Error loading data.';
		return;
	}

	//let totalData = 0;
	data.forEach(row => {
		const currentDate = row['Date'] ? row['Date'] : '';
		//if (!isPastDate(currentDate)) {
			// Check if "Playgroup Name" contains "CANCELLED"
			const isCancelled = row['Playgroup Name'] && row['Playgroup Name'].includes('CANCELLED');

			// Start building the row with a conditional background color
			tableHtml += `<tr${isCancelled ? ' style="background-color: #FFCCCB;"' : ''}>`;

			headers.forEach(header => {
			    switch(header) {
			        case 'URL':
			            // Make the URL clickable as a link
			            tableHtml += `<td><a href="${row[header]}" target="_blank">URL</a></td>`;
			            break;
			    	/*case 'Date':
				    //Start of a very weird bug fix where all dates where one day off starting on March 9, 2024. Caroline thinks it's because of the time change
				    let dateValue = new Date(row[header]);
				    dateValue.setDate(dateValue.getDate() + 1);
				    let march9_2024 = new Date('2024-03-09');
				    march9_2024.setDate(march9_2024.getDate() + 1);
				
				    if (dateValue > march9_2024) {
				        dateValue.setDate(dateValue.getDate() + 1);
				    }
				
				    // Format the date to the desired string format (e.g., YYYY-MM-DD)
				    const formattedDate = `${dateValue.getFullYear()}-${(dateValue.getMonth() + 1).toString().padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}`;
				    //console.log("formattedDate: " + formattedDate);    
			            //console.log("is it daylight saving? " + isDaylightSavingTime(formattedDate)); // Output: true or false

				    tableHtml += `<td>${formattedDate}</td>`;
				    break;*/
				    //end of weird bug fix
			        case 'Location Address':
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
			});

			//tableHtml += `<td>TBD</td>`;
			

			tableHtml += '</tr>';
		//}
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
			"language": {
				"emptyTable": "No data available in table, try <a href='javascript:void(0);' onclick='clearAllFilters()'>resetting all filters to default</a>.",
				"zeroRecords": "No data available in table, try <a href='javascript:void(0);' onclick='clearAllFilters()'>resetting all filters to default</a>."
			}
		});
	}
	$('#dataTable_filter input').val(currentSearchValue).trigger('input');
}





let currentSearchValue = getQueryParam('search'); // Variable to store the current search value

