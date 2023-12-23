console.log('version 7');

let originalData = []; // Initialize as an empty array

window.onload = function() {
	// Update the path to your CSV file
	const csvFilePath = 'https://claudielarouche.com/earlyON/data.csv';

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
	tableHtml += '</tr></thead><tbody>';

	const selectedArea = document.getElementById('selectedArea').value;
	const selectedDate = document.getElementById('selectedDate').value;
	const selectedAgeGroup = document.getElementById('selectedAgeGroup').value;
	const filteredData = filterData(data, selectedDate, selectedArea, selectedAgeGroup);

	

	if (!Array.isArray(filteredData)) {
		console.error('Error loading data: Filtered data is not an array.');
		document.getElementById('csvData').innerHTML = 'Error loading data.';
		return;
	}

	//let totalData = 0;
	filteredData.forEach(row => {
		const currentDate = row['Date'] ? row['Date'] : '';
		if (!isPastDate(currentDate)) {
			tableHtml += '<tr>';
			headers.forEach(header => {
				if (header === 'URL') {
					// Make the URL clickable as a link
					tableHtml += `<td><a href="${row[header]}" target="_blank">URL</a></td>`;
				}
				
				else if (header === 'Location Address') {
					// Create a link with the Google Maps URL for the address
					const address = row[header] ? row[header].trim() : '';
					if (address !== '') {
						const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)},+Ottawa,+Canada`;
						tableHtml += `<td><a href="${googleMapsLink}" >${address}</a></td>`;
					} else {
						tableHtml += '<td></td>';
					}
				} else {
					// Display other columns
					tableHtml += `<td>${row[header]}</td>`;
				}
			});
			tableHtml += '</tr>';
		}
	});




	tableHtml += '</tbody></table>';

	document.getElementById('csvData').innerHTML = tableHtml;


	if (!$.fn.dataTable.isDataTable('#dataTable')) {
		$('#dataTable').DataTable({
			"pageLength": -1,
			"dom": 'Bfrtip', // 'B' for buttons
			"buttons": [
				'colvis' // Column visibility button
			]
		});
	}
	$('#dataTable_filter input').val(currentSearchValue).trigger('input');
}


function filterData(data, selectedDate, selectedArea, selectedAgeGroup) {
    // If no date, area, or age group is selected, return the original data
    if (!selectedDate && !selectedArea && !selectedAgeGroup) {
        return data;
    }

    // Ensure data is an array before filtering
    if (Array.isArray(data)) {
        return data.filter(row => {
            const currentDate = row['Date'] ? row['Date'] : '';
            const currentArea = row['Area'] ? row['Area'] : '';
            const currentAgeGroup = row['Age Group'] ? row['Age Group'] : '';

            const dateCondition = !selectedDate || currentDate === selectedDate;
            const areaCondition = !selectedArea || currentArea === selectedArea;
            const ageGroupCondition = !selectedAgeGroup || currentAgeGroup.includes(selectedAgeGroup);

            return dateCondition && areaCondition && ageGroupCondition;
        });
    } else {
        return [];
    }
}

function isPastDate(dateString) {
	const currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0); // Set time to midnight

	// Parse the date string in "YYYY-MM-DD" format
	const dateParts = dateString.split('-');
	const selectedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
	selectedDate.setHours(0, 0, 0, 0); // Set time to midnight

	return selectedDate < currentDate;
}

let currentSearchValue = ''; // Variable to store the current search value


// Listen for changes in date input
document.getElementById('selectedDate').addEventListener('change', function() {
	currentSearchValue = $('#dataTable_filter input').val();
	renderTable(originalData);
});

// Listen for changes in the Area select input
document.getElementById('selectedArea').addEventListener('change', function() {
	currentSearchValue = $('#dataTable_filter input').val();
    renderTable(originalData);
});

// Listen for changes in the Age Group select input
document.getElementById('selectedAgeGroup').addEventListener('change', function() {
	currentSearchValue = $('#dataTable_filter input').val();
    renderTable(originalData);
});

function clearAllFilters() {
    // Clear the date filter
    document.getElementById('selectedDate').value = '';

    // Clear the area filter
    document.getElementById('selectedArea').value = '';
	
	 // Clear the area filter
    document.getElementById('selectedAgeGroup').value = '';


    // Clear the DataTable search box
    $('#dataTable_filter input').val('');

    // Render the table with cleared filters
    renderTable(originalData);
}

