---
---
console.log('report a problem v1');

let sortingState;
let originalData = []; // Initialize as an empty array

function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

window.onload = function() {
	// Update the path to your CSV file
	const csvFilePath = '{{ "/assets/data/ottawa-drop-ins.csv" | relative_url }}';

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
    tableHtml += '<th>Actions</th></tr></thead><tbody>';

    const filteredData = filterData(data, selectedAreas, selectedCategory, selectedDay, selectedAge, selectedTime);

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
                    tableHtml += `<td><a href="${facilityUrl}" target="_blank">Facility Reservation Page</a></td>`;
                }
                break;

                    default:
                        // Display other columns
                        tableHtml += `<td>${row[header]}</td>`;
                        break;
                }
            }
        });

	tableHtml += `<td><a href="https://docs.google.com/forms/d/e/1FAIpQLScTQ6U_lnHo0kr5rGo3zSjYQwsGG5PZIfL5Eil8iVQU9UWTmg/viewform?usp=sf_link&entry.658764103=${encodeURIComponent('Ottawa Drop-Ins: ' + row['Day'] + ', ' + row['Time'] + ', ' + row['Facility Name'] + ', ' + row['Address'] + ', ' + row['Activity Type'] + ', ' + row['Registration Required'] + ', ' + row['Area'] + ', ' + row['Category'] + ', ' + row['Age'] + ', ' + row['Time of day'])}" target="_blank">Report a data issue</a></td>`;


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
		"order": [[0, 'asc'], [2, 'asc'], [3, 'asc']],
            "language": {
                "emptyTable": "No data available in table, try <a href='javascript:void(0);' onclick='clearAllFilters()'>resetting all filters to default</a>.",
                "zeroRecords": "No data available in table, try <a href='javascript:void(0);' onclick='clearAllFilters()'>resetting all filters to default</a>."
            }
        });
    }
    $('#dataTable_filter input').val(currentSearchValue).trigger('input');

    //If sortingState is set, sort the table by sortingState
    if (sortingState) {
        $('#dataTable').DataTable().order(sortingState.order).draw();
    }
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

    if (!currentSearchValue.includes(todayDayOfWeek)) {

       currentSearchValue = todayDayOfWeek + (currentSearchValue ? " " + currentSearchValue : "");

       // Populate the search box with today's day of the week
       document.getElementById('dataTable_filter').querySelector('input').value = currentSearchValue;
    
       // Trigger the input event to initiate the search
       document.getElementById('dataTable_filter').querySelector('input').dispatchEvent(new Event('input'));
    }
});

function filterData(data, selectedAreas, selectedCategory, selectedDay, selectedAge, selectedTime) {


    return data.filter(row => {

	const currentArea = row['Area'] || '';
	const currentCategory = row['Category'] || '';
	const currentDay = row['Day'] || '';
	const currentAge = row['Age'] || '';
	const currentTime = row['Time of day'] || '';

	const areaCondition = selectedAreas.some(area => currentArea.toLowerCase().includes(area.toLowerCase()));
        const categoryCondition = selectedCategory.some(category => currentCategory.toLowerCase() === category.toLowerCase());
	const dayCondition = selectedDay.some(day => currentDay.toLowerCase() === day.toLowerCase());
	const ageCondition = selectedAge.some(age => currentAge.toLowerCase().includes(age.toLowerCase()));
	const timeCondition = selectedTime.some(time => currentTime.toLowerCase().includes(time.toLowerCase()));
	    
	return areaCondition && categoryCondition && dayCondition && ageCondition && timeCondition;
    });
}


let currentSearchValue = getQueryParam('search'); // Variable to store the current search value

function clearAllFilters() {
    // Store the current sorting state
    sortingState = $('#dataTable').DataTable().state();
	
    // Check all the "Select Area" checkboxes
    document.querySelectorAll('.areaCheckbox').forEach(checkbox => {
        checkbox.checked = true;
		if (!selectedAreas.includes(checkbox.value)) {
			selectedAreas.push(checkbox.value);
		}
    });

// Check all the "Select Category" checkboxes
    document.querySelectorAll('.categoryCheckbox').forEach(checkbox => {
        checkbox.checked = true;
		if (!selectedCategory.includes(checkbox.value)) {
			selectedCategory.push(checkbox.value);
		}
    });

// Check all the "Select Day" checkboxes
    document.querySelectorAll('.dayCheckbox').forEach(checkbox => {
        checkbox.checked = true;
		if (!selectedDay.includes(checkbox.value)) {
			selectedDay.push(checkbox.value);
		}
    });

// Check all the "Select Age" checkboxes
    document.querySelectorAll('.ageCheckbox').forEach(checkbox => {
        checkbox.checked = true;
		if (!selectedAge.includes(checkbox.value)) {
			selectedAge.push(checkbox.value);
		}
    });

// Check all the "Select Time of day" checkboxes
    document.querySelectorAll('.timeCheckbox').forEach(checkbox => {
        checkbox.checked = true;
		if (!selectedTime.includes(checkbox.value)) {
			selectedTime.push(checkbox.value);
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

const selectedCategory = [];
document.querySelectorAll('.categoryCheckbox').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
	// Store the current sorting state
        sortingState = $('#dataTable').DataTable().state();
        currentSearchValue = $('#dataTable_filter input').val();
		if (checkbox.checked) {
            if (!selectedCategory.includes(checkbox.value)) {
                selectedCategory.push(checkbox.value);
            }
        } else {
            const index = selectedCategory.indexOf(checkbox.value);
            if (index !== -1) {
                selectedCategory.splice(index, 1);
            }
        }
        renderTable(originalData);
    });

    // Initialize with all checkboxes checked by default
    checkbox.checked = true;
    if (!selectedCategory.includes(checkbox.value)) {
        selectedCategory.push(checkbox.value);
    }
});

const selectedDay = [];
document.querySelectorAll('.dayCheckbox').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
	// Store the current sorting state
        sortingState = $('#dataTable').DataTable().state();
        currentSearchValue = $('#dataTable_filter input').val();
		if (checkbox.checked) {
            if (!selectedDay.includes(checkbox.value)) {
                selectedDay.push(checkbox.value);
            }
        } else {
            const index = selectedDay.indexOf(checkbox.value);
            if (index !== -1) {
                selectedDay.splice(index, 1);
            }
        }
        renderTable(originalData);
    });

    // Initialize with all checkboxes checked by default
    checkbox.checked = true;
    if (!selectedDay.includes(checkbox.value)) {
        selectedDay.push(checkbox.value);
    }
});

const selectedAge = [];
document.querySelectorAll('.ageCheckbox').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
	// Store the current sorting state
        sortingState = $('#dataTable').DataTable().state();
        currentSearchValue = $('#dataTable_filter input').val();
		if (checkbox.checked) {
            if (!selectedAge.includes(checkbox.value)) {
                selectedAge.push(checkbox.value);
            }
        } else {
            const index = selectedAge.indexOf(checkbox.value);
            if (index !== -1) {
                selectedAge.splice(index, 1);
            }
        }
        renderTable(originalData);
    });

    // Initialize with all checkboxes checked by default
    checkbox.checked = true;
    if (!selectedAge.includes(checkbox.value)) {
        selectedAge.push(checkbox.value);
    }
});

const selectedTime = [];
document.querySelectorAll('.timeCheckbox').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
	// Store the current sorting state
        sortingState = $('#dataTable').DataTable().state();
        currentSearchValue = $('#dataTable_filter input').val();
		if (checkbox.checked) {
            if (!selectedTime.includes(checkbox.value)) {
                selectedTime.push(checkbox.value);
            }
        } else {
            const index = selectedTime.indexOf(checkbox.value);
            if (index !== -1) {
                selectedTime.splice(index, 1);
            }
        }
        renderTable(originalData);
    });

    // Initialize with all checkboxes checked by default
    checkbox.checked = true;
    if (!selectedTime.includes(checkbox.value)) {
        selectedTime.push(checkbox.value);
    }
});

// wait until the DOM is fully loaded
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

    // === Days ===
    const selectAllDaysBtn   = document.getElementById('selectAllDaysButton');
    const unselectAllDaysBtn = document.getElementById('unselectAllDaysButton');
    const daysCheckboxes     = document.querySelectorAll('.dayCheckbox');

    selectAllDaysBtn.addEventListener('click', function() {
        daysCheckboxes.forEach(cb => {
            cb.checked = true;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    unselectAllDaysBtn.addEventListener('click', function() {
        daysCheckboxes.forEach(cb => {
            cb.checked = false;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    // === Time ===
    const selectAllTimesBtn   = document.getElementById('selectAllTimesButton');
    const unselectAllTimesBtn = document.getElementById('unselectAllTimesButton');
    const timesCheckboxes     = document.querySelectorAll('.timeCheckbox');

    selectAllTimesBtn.addEventListener('click', function() {
        timesCheckboxes.forEach(cb => {
            cb.checked = true;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    unselectAllTimesBtn.addEventListener('click', function() {
        timesCheckboxes.forEach(cb => {
            cb.checked = false;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    // === Age ===
    const selectAllAgesBtn   = document.getElementById('selectAllAgesButton');
    const unselectAllAgesBtn = document.getElementById('unselectAllAgesButton');
    const agesCheckboxes     = document.querySelectorAll('.ageCheckbox');

    selectAllAgesBtn.addEventListener('click', function() {
        agesCheckboxes.forEach(cb => {
            cb.checked = true;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    unselectAllAgesBtn.addEventListener('click', function() {
        agesCheckboxes.forEach(cb => {
            cb.checked = false;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    // === Category ===
    const selectAllCategoriesBtn   = document.getElementById('selectAllCategoriesButton');
    const unselectAllCategoriesBtn = document.getElementById('unselectAllCategoriesButton');
    const categoriesCheckboxes     = document.querySelectorAll('.categoryCheckbox');

    selectAllCategoriesBtn.addEventListener('click', function() {
        categoriesCheckboxes.forEach(cb => {
            cb.checked = true;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    unselectAllCategoriesBtn.addEventListener('click', function() {
        categoriesCheckboxes.forEach(cb => {
            cb.checked = false;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });
});
