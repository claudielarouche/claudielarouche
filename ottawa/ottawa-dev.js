console.log('Add filter v6');

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
        if (header !== 'URL') {
            tableHtml += `<th>${header}</th>`;
        }
    });
    tableHtml += '</tr></thead><tbody>';

    const filteredData = filterData(data, selectedAreas);

    // Iterate through each row of data
    filteredData.forEach(row => {
        const currentDate = row['Date'] ? row['Date'] : '';

        // Start building the row with a conditional background color
        tableHtml += '<tr>';

        headers.forEach((header, index) => {
            // Skip rendering the URL column
            if (header !== 'URL') {
                switch (header) {
		    case 'Sort Order': 	
				    // Assign the index of the "Baby Scale" column to the babyScaleIndex variable
				// minus 1 because it is after the URL column which is not shown
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
    ],
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

function filterData(data, selectedAreas) {
    // If no date, age group, languages, areas, or schedule is selected, return the original data
    //if (!selectedDate && !selectedAgeGroup && selectedLanguages.length === 0 && selectedAreas.length === 0 && scheduleFilter === 'all') {
    if (selectedAreas.length === 0) {
        return data;
    }

    return data.filter(row => {
        /*const currentDate = row['Date'] || '';
        const currentAgeGroup = row['Age Group'] || '';
        const currentTimeOfDay = row['Time of Day'] || '';
        const currentDayOfWeek = row['Day of Week'] || '';
        const currentLanguage = row['Language'] || '';
        
	const currentBabyScale = row['Baby Scale'] || ''; */

	const currentArea = row['Area'] || '';
	//const areaCondition = !selectedAreas.length || selectedAreas.some(area => currentArea.toLowerCase().includes(area.toLowerCase()));

	const areaCondition = selectedAreas.some(area => currentArea.toLowerCase().includes(area.toLowerCase()));



        /*const dateCondition = !selectedDate || currentDate === selectedDate;
        const ageGroupCondition = !selectedAgeGroup || currentAgeGroup.includes(selectedAgeGroup);
        const languageCondition = !selectedLanguages.length || selectedLanguages.some(lang => currentLanguage.toLowerCase().includes(lang.toLowerCase()));
        // If babyScaleCheckbox is checked, include only rows where 'Baby Scale' is 'Yes'
    	const babyScaleCondition = !babyScaleFilter.checked || currentBabyScale === 'Yes';

        let scheduleFilterCondition = true;

	   
        switch (scheduleFilter) {
            case 'all':
                scheduleFilterCondition = true;
			
                break;
            case 'eveningsWeekends':
                scheduleFilterCondition = currentTimeOfDay === 'Evening' || currentDayOfWeek === 'Saturday' || currentDayOfWeek === 'Sunday';
			
                break;
            case 'weekdayAMPM':
			
                scheduleFilterCondition = (currentDayOfWeek !== 'Saturday' && currentDayOfWeek !== 'Sunday') && (currentTimeOfDay === 'Morning' || currentTimeOfDay === 'Afternoon');
                break;
        }

        return dateCondition && ageGroupCondition && languageCondition && areaCondition && scheduleFilterCondition && babyScaleCondition;*/
	return areaCondition;
    });
}


let currentSearchValue = getQueryParam('search'); // Variable to store the current search value

function clearAllFilters() {

    // Check all the "Select Schedule" checkboxes
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

const selectedAreas = [];
document.querySelectorAll('.areaCheckbox').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
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
