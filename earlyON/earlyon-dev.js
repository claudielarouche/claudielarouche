/*THIS IS THE VERSION I WAS WORKING ON FOR THE PERMANENT DATE FIX*/

console.log('bug fix 2');

let originalData = []; // Initialize as an empty array



function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

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
	tableHtml += '<th>Actions</th></tr></thead><tbody>';

	//const selectedArea = document.getElementById('selectedArea').value;
	const selectedDate = document.getElementById('selectedDate').value;
	const selectedAgeGroup = document.getElementById('selectedAgeGroup').value;
	
	const selectedScheduleCheckboxes = document.querySelectorAll('.scheduleCheckbox');
    const selectedSchedule = Array.from(selectedScheduleCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.id.replace('Checkbox', ''));

    //const filteredData = filterData(data, selectedDate, selectedArea, selectedAgeGroup);
	const filteredData = filterData(data, selectedDate, selectedAgeGroup);

	if (!Array.isArray(filteredData)) {
		console.error('Error loading data: Filtered data is not an array.');
		document.getElementById('csvData').innerHTML = 'Error loading data.';
		return;
	}
	
	

	//let totalData = 0;
	filteredData.forEach(row => {
		const currentDate = row['Date'] ? row['Date'] : '';

	
		const problemReportUrl = 'earlyon-problem.html'; // Replace with your actual URL
		if (!isPastDate(currentDate)) {
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
			    	case 'Date':
				    //console.log("row[header] "+row[header]);
				    let dateValue = new Date(row[header]);
					    
				    //dateValue.setDate(dateValue.getDate() + 1);
/*
 				    //console.log("dateValue: " + dateValue);    
			            //console.log("is it daylight saving? " + isDaylightSavingTime(dateValue)); // Output: true or false
					    
				    let march9_2024 = new Date('2024-03-09');
				    march9_2024.setDate(march9_2024.getDate() + 1);
					//    console.log("dateValue "+dateValue);
					  //  console.log("march10_2024"+march10_2024);
				
				    if (dateValue > march9_2024) {
					console.log("inside the if statement");
				        dateValue.setDate(dateValue.getDate() + 1);
				//	console.log("dateValue "+dateValue)
				    }*/
				
				    // Format the date to the desired string format (e.g., YYYY-MM-DD)
				    let formattedDate = `${dateValue.getFullYear()}-${(dateValue.getMonth() + 1).toString().padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}`;

			            if (isDaylightSavingTime(formattedDate) == true)
				    {
					    dateValue.setDate(dateValue.getDate() + 1);
				    }

				    dateValue.setDate(dateValue.getDate() + 1);

				    formattedDate = `${dateValue.getFullYear()}-${(dateValue.getMonth() + 1).toString().padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}`;	    

				    /*console.log("formattedDate: " + formattedDate);    
			            console.log("is it daylight saving? " + isDaylightSavingTime(formattedDate)); // Output: true or false*/
					    
				 //   console.log("formattedDate "+formattedDate);
				    tableHtml += `<td>${formattedDate}</td>`;
				    break;
			        case 'Location Address':
			            // Create a link with the Google Maps URL for the address
			            const address = row[header] ? row[header].trim() : '';
			            if (address !== '') {
			                const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)},+Ottawa,+Canada`;
			                tableHtml += `<td><a href="${googleMapsLink}" >${address}</a></td>`;
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
			
			
			tableHtml += `<td><a href="https://docs.google.com/forms/d/e/1FAIpQLScAtAvU5WfcL2Jkk3trRwLDq4j_dW0nzcJflcHrtdbyzOaQ3w/viewform?usp=sf_link&entry.980923575=${encodeURIComponent(row['Date'])}&entry.658764103=${encodeURIComponent(row['Playgroup Name'])}&entry.253977818=${encodeURIComponent(row['Hours'])}&entry.1285117799=${encodeURIComponent(row['Location Name'])}&entry.763229385=${encodeURIComponent(row['Location Address'])}&entry.1707950985=${encodeURIComponent(row['Area'])}&entry.1819665326=${encodeURIComponent(row['Registration Required'])}&entry.1741653207=${encodeURIComponent(row['Language'])}&entry.1282617511=${encodeURIComponent(row['URL'])}&entry.815961453=${encodeURIComponent(row['Organizer'])}&entry.863582397=${encodeURIComponent(row['Age Group'])}&entry.740455553=${encodeURIComponent(row['Time of Day'])}&entry.1566548831=${encodeURIComponent(row['Day of Week'])}" target="_blank">Report a Problem</a></td>`;
			
			
			tableHtml += '</tr>';
		}
	});

	
	tableHtml += '</tbody></table>';

	document.getElementById('csvData').innerHTML = tableHtml;


	if (!$.fn.dataTable.isDataTable('#dataTable')) {
		$('#dataTable').DataTable({
			"pageLength": 100,
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
	console.log("in render table: " + currentSearchValue)
	$('#dataTable_filter input').val(currentSearchValue).trigger('input');
}


function filterData(data, selectedDate, selectedAgeGroup) {
    const scheduleFilter = document.getElementById('scheduleFilter').value;
	
	 if (selectedLanguages.length === 0) {
        return [];
    }
	
    // If no date, area, age group, or schedule is selected, return the original data
    if (!selectedDate && !selectedAreas.length && !selectedAgeGroup && scheduleFilter === 'all'  && !selectedLanguages.length) {
        return data;
    }

    // Ensure data is an array before filtering
    if (Array.isArray(data)) {
        return data.filter(row => {
            const currentDate = row['Date'] ? row['Date'] : '';
            //const currentArea = row['Area'] ? row['Area'] : '';
            const currentAgeGroup = row['Age Group'] ? row['Age Group'] : '';
            const currentTimeOfDay = row['Time of Day'] ? row['Time of Day'] : '';
            const currentDayOfWeek = row['Day of Week'] ? row['Day of Week'] : '';
			const currentLanguage = row['Language'] ? row['Language'] : ''; 

            const dateCondition = !selectedDate || currentDate === selectedDate;
            const ageGroupCondition = !selectedAgeGroup || currentAgeGroup.includes(selectedAgeGroup);			
			const languageCondition = !selectedLanguages.length || selectedLanguages.some(lang => row['Language'].toLowerCase().includes(lang.toLowerCase())); //Not exact match
			const areaCondition = !selectedAreas.length || selectedAreas.some(lang => row['Area'].toLowerCase().includes(lang.toLowerCase())); //Not exact match

            switch (scheduleFilter) {
                case 'all':
                    // Show all rows
                    return dateCondition && areaCondition && ageGroupCondition && languageCondition && areaCondition;

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
	var dateInput = dateString;
	
	console.log("dateString: " + dateString);
	// Extract year, month, and day components
	var year = parseInt(dateInput.substring(0, 4));
	var month = parseInt(dateInput.substring(5, 7)) - 1; // Months are zero-based
	var day = parseInt(dateInput.substring(8, 10));
	var dateParts = new Date(year, month, day);
	
	//const dateParts = dateString.split('-');
	const selectedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
	selectedDate.setHours(0, 0, 0, 0); // Set time to midnight


	console.log("selectedDate: " + selectedDate); 
	console.log("currentDate: " + currentDate); 	 
	console.log("selectedDate < currentDate: " + selectedDate < currentDate); 
	
	return selectedDate < currentDate;
}

let currentSearchValue = getQueryParam('search'); // Variable to store the current search value


// Go to today's playgroup button
document.getElementById('showPlaygroupsButton').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default behavior of the anchor link

        // Scroll to the element with id 'csvData'
        document.getElementById('csvData').scrollIntoView({ behavior: 'smooth' });

        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero based
        const day = String(today.getDate()).padStart(2, '0');
        const todayDate = `${year}-${month}-${day}`;

        // Populate the search box with today's date
        document.getElementById('dataTable_filter').querySelector('input').value = todayDate;
        
        // Trigger the input event to initiate the search
        document.getElementById('dataTable_filter').querySelector('input').dispatchEvent(new Event('input'));
    });

// Listen for changes in date input
document.getElementById('selectedDate').addEventListener('change', function() {
	currentSearchValue =  $('#dataTable_filter input').val();$('#dataTable_filter input').val();
	renderTable(originalData);
});

// Listen for changes in the Age Group select input
document.getElementById('selectedAgeGroup').addEventListener('change', function() {
	currentSearchValue =  $('#dataTable_filter input').val();
	renderTable(originalData);
});

// Listen for changes in the Schedule Filter 
document.getElementById('scheduleFilter').addEventListener('change', function() {	
	currentSearchValue =  $('#dataTable_filter input').val();
    renderTable(originalData);
});

// Listen for changes in language checkboxes
const selectedLanguages = [];
document.querySelectorAll('.languageCheckbox').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        currentSearchValue = $('#dataTable_filter input').val();
		if (checkbox.checked) {
            if (!selectedLanguages.includes(checkbox.value)) {
                selectedLanguages.push(checkbox.value);
            }
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
    if (!selectedLanguages.includes(checkbox.value)) {
        selectedLanguages.push(checkbox.value);
    }
});

const selectedAreas = [];
document.querySelectorAll('.areaCheckbox').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        currentSearchValue =  $('#dataTable_filter input').val();
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

document.getElementById('pageLength').addEventListener('change', function() {
    const selectedPageLength = parseInt(this.value, 10);
    const dataTable = $('#dataTable').DataTable();
    
    // Update DataTable page length
    dataTable.page.len(selectedPageLength).draw();
});

function clearAllFilters() {
    // Clear the date filter
    document.getElementById('selectedDate').value = '';

    // Clear the area filter
    //document.getElementById('selectedArea').value = '';
	
	 // Clear the age group filter
    document.getElementById('selectedAgeGroup').value = '';

    // Check all the "Select Schedule" checkboxes
    document.querySelectorAll('.languageCheckbox').forEach(checkbox => {
        checkbox.checked = true;
		if (!selectedLanguages.includes(checkbox.value)) {
			selectedLanguages.push(checkbox.value);
		}
    });
	
	// Check all the "Select Schedule" checkboxes
    document.querySelectorAll('.areaCheckbox').forEach(checkbox => {
        checkbox.checked = true;
		if (!selectedAreas.includes(checkbox.value)) {
			selectedAreas.push(checkbox.value);
		}
    });
	
	document.getElementById('scheduleFilter').value = 'all';

    // Clear the DataTable search box
    var dataTable = $('#dataTable').DataTable();
    dataTable.search('').draw();
	currentSearchValue = "";

    // Render the table with cleared filters
    renderTable(originalData);
}

function isDaylightSavingTime(date) {
    // Extracting year from the date string
    const year = parseInt(date.slice(0, 4));

    // Getting the timezone offset for January 1st of the extracted year
    const januaryOffset = new Date(year, 0, 1).getTimezoneOffset();

    // Getting the current timezone offset
    const currentOffset = new Date(date).getTimezoneOffset();

    // Comparing the offsets to determine if the date is in daylight saving time
    return januaryOffset !== currentOffset;
}
