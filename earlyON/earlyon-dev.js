console.log('version 4');

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
	
	const selectedScheduleCheckboxes = document.querySelectorAll('.scheduleCheckbox');
    const selectedSchedule = Array.from(selectedScheduleCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.id.replace('Checkbox', ''));

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
			],
			"language": {
				"emptyTable": "No data available in table, try <a href='javascript:void(0);' onclick='clearAllFilters()'>resetting all filters to default</a>.",
				"zeroRecords": "No data available in table, try <a href='javascript:void(0);' onclick='clearAllFilters()'>resetting all filters to default</a>."
			}
		});
	}
	$('#dataTable_filter input').val(currentSearchValue).trigger('input');
}


function filterData(data, selectedDate, selectedArea, selectedAgeGroup) {
    /*const morningCheckbox = document.getElementById('morningCheckbox');
    const afternoonCheckbox = document.getElementById('afternoonCheckbox');
    const eveningCheckbox = document.getElementById('eveningCheckbox');*/
    const scheduleFilter = document.getElementById('scheduleFilter').value;
	/*const arabicCheckbox = document.getElementById('arabicCheckbox');
	const englishCheckbox = document.getElementById('englishCheckbox');
	const frenchCheckbox = document.getElementById('frenchCheckbox');
	const mandarinCheckbox = document.getElementById('mandarinCheckbox');

	const selectedLanguages = [];
	if (arabicCheckbox.checked) selectedLanguages.push('Arabic');
	if (englishCheckbox.checked) selectedLanguages.push('English');
	if (frenchCheckbox.checked) selectedLanguages.push('French');
	if (mandarinCheckbox.checked) selectedLanguages.push('Mandarin');
	
	const languageCondition = !selectedLanguages.length || selectedLanguages.includes(row['Language']);*/


    // If no date, area, age group, or schedule is selected, return the original data
    if (!selectedDate && !selectedArea && !selectedAgeGroup && scheduleFilter === 'all'  && !selectedLanguages.length) {
        return data;
    }

    // Ensure data is an array before filtering
    if (Array.isArray(data)) {
        return data.filter(row => {
            const currentDate = row['Date'] ? row['Date'] : '';
            const currentArea = row['Area'] ? row['Area'] : '';
            const currentAgeGroup = row['Age Group'] ? row['Age Group'] : '';
            const currentTimeOfDay = row['Time of Day'] ? row['Time of Day'] : '';
            const currentDayOfWeek = row['Day of Week'] ? row['Day of Week'] : '';
			const currentLanguage = row['Language'] ? row['Language'] : ''; 

            const dateCondition = !selectedDate || currentDate === selectedDate;
            const areaCondition = !selectedArea || currentArea === selectedArea;
            const ageGroupCondition = !selectedAgeGroup || currentAgeGroup.includes(selectedAgeGroup);
			const languageCondition = !selectedLanguages.length || selectedLanguages.includes(currentLanguage); // Adjust this line
			

            switch (scheduleFilter) {
                case 'all':
                    // Show all rows
                    return dateCondition && areaCondition && ageGroupCondition && languageCondition;

                case 'eveningsWeekends':
                    // Show evenings and weekends only
                    return (
                        dateCondition &&
                        areaCondition &&
						languageCondition &&
                        ageGroupCondition &&
                        (currentTimeOfDay === 'Evening' ||
                            currentDayOfWeek === 'Saturday' ||
                            currentDayOfWeek === 'Sunday')
                    );

                case 'weekdayAMPM':
				// Show weekday AM and PM only
				return (
					dateCondition &&
					areaCondition &&
					languageCondition &&
					ageGroupCondition &&
					(
						(currentDayOfWeek !== 'Saturday' && currentDayOfWeek !== 'Sunday') &&
						(currentTimeOfDay === 'Morning' || currentTimeOfDay === 'Afternoon')
					)
				);


                default:
                    // Handle other cases
                    return false;
            }
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

// Listen for changes in the Schedule Filter 
document.getElementById('scheduleFilter').addEventListener('change', function() {	
	currentSearchValue = $('#dataTable_filter input').val();
    renderTable(originalData);
});

// Listen for changes in language checkboxes
const selectedLanguages = [];
document.querySelectorAll('input[name="languageCheckbox"]').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        currentSearchValue = $('#dataTable_filter input').val();
		console.log("I'm running that code");
		if (checkbox.checked) {
            selectedLanguages.push(checkbox.value);
        } else {
            const index = selectedLanguages.indexOf(checkbox.value);
            if (index !== -1) {
                selectedLanguages.splice(index, 1);
            }
        }

		
        renderTable(originalData);
    });

    // Initialize with all checkboxes checked by default
    checkbox.checked = true;
    selectedLanguages.push(checkbox.value);
	console.log("I'm running this code");
});



// Listen for changes in the "Select Schedule" checkboxes
/*document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        currentSearchValue = $('#dataTable_filter input').val();
        renderTable(originalData);
    });
});*/

function clearAllFilters() {
    // Clear the date filter
    document.getElementById('selectedDate').value = '';

    // Clear the area filter
    document.getElementById('selectedArea').value = '';
	
	 // Clear the age group filter
    document.getElementById('selectedAgeGroup').value = '';

    // Check all the "Select Schedule" checkboxes
   /* document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true;
    });*/
	
	document.getElementById('scheduleFilter').value = 'all';

    // Clear the DataTable search box
    var dataTable = $('#dataTable').DataTable();
    dataTable.search('').draw();
	currentSearchValue = "";

    // Render the table with cleared filters
    renderTable(originalData);
}


