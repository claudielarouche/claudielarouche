console.log('show today v15');

let sortingState;
let originalData = []; // Initialize as an empty array

function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

window.onload = function() {
	// Update the path to your CSV file
	const csvFilePath = 'https://claudielarouche.com/library/ottawa_library_programs-dev.csv';

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
        if (header !== 'Event URL') {
            tableHtml += `<th>${header}</th>`;
        }
    });
    tableHtml += '</tr></thead><tbody>';

    

    const filteredData = filterData(data, selectedDate);

    // Iterate through each row of data
    //filteredData.forEach(row => {
    filteredData.forEach(row => {
        const currentDate = row['Date'] ? row['Date'] : '';

        // Start building the row with a conditional background color
        tableHtml += '<tr>';

        headers.forEach((header, index) => {
            // Skip rendering the URL column
            if (header !== 'Event URL') {
                switch (header) {
		    case 'Sort Order': 	
				    // Assign the index of the "Baby Scale" column to the babyScaleIndex variable
				// minus 1 because it is after the URL column which is not shown
                    		    sortOrderIndex = index;					  
				    tableHtml += `<td>${row[header]}</td>`;
				    break;
		    case 'Start Date': 	
				    // Assign the index of the "Baby Scale" column to the babyScaleIndex variable
				// minus 1 because it is after the URL column which is not shown
                    		    			  
				    tableHtml += `<td>${formatDate(row[header])}</td>`;
				    break;
		    case 'End Date': 	
				    // Assign the index of the "Baby Scale" column to the babyScaleIndex variable
				// minus 1 because it is after the URL column which is not shown
                    		    			  
				    tableHtml += `<td>${formatDate(row[header])}</td>`;
				    break;
                    case 'Program Name':
                        // Merge URL with Pool Name to create a clickable link
                        const url = row['Event URL'] ? row['Event URL'] : '';
                        const programName = row[header] ? row[header] : '';
                        if (url !== '' && programName !== '') {
                            tableHtml += `<td><a href="${url}" target="_blank">${programName}</a></td>`;
                        } else {
                            tableHtml += `<td>${programName}</td>`;
                        }
                        break;

                   /* case 'Address':
                        // Create a link with the Google Maps URL for the address
                        const address = row[header] ? row[header].trim() : '';
                        if (address !== '') {
                            const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)},+Ottawa,+Canada`;
                            tableHtml += `<td><a href="${googleMapsLink}" target="_blank">${address}</a></td>`;
                        } else {
                            tableHtml += '<td></td>';
                        }
                        break;*/

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

    //If sortingState is set, sort the table by sortingState
    if (sortingState) {
        $('#dataTable').DataTable().order(sortingState.order).draw();
    }
}

function formatDate(inputString) {
    // Define a mapping for month abbreviations to their numeric values
    const monthMap = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
    };

    // Validate input and split into parts
    const parts = inputString.split("-");
	
    /*if (parts.length !== 3) {
        throw new Error("Invalid date format. Expected format: 'DD-MMM-YY'");
    }*/

    const [day, month, year] = parts;


    // Ensure all parts are present and valid
 /*   if (!day || !month || !year || !monthMap[month]) {
        throw new Error("Invalid date components in input string.");
    }*/

    // Convert the year to a full 4-digit format
    const fullYear = "20" + year;

    // Get the numeric month from the month map
    const numericMonth = monthMap[month];

    // Ensure the day has two digits
    const paddedDay = day.padStart(2, "0");

    // Return the formatted date
    return `${fullYear}-${numericMonth}-${paddedDay}`;
}

let selectedDate = null;

document.getElementById('showToday').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor link
    document.getElementById("showTodayOnly").checked = true;

    // Scroll to the element with id 'csvData'
    document.getElementById('csvData').scrollIntoView({ behavior: 'smooth' });

    // Get today's day of the week
   // const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //selectedDate = new Date();
   // const todayDayOfWeek = daysOfWeek[selectedDate.getDay()];
    // console.log("selectedDate " + selectedDate);

    //currentSearchValue = $('#dataTable_filter input').val();

    //currentSearchValue = todayDayOfWeek + (currentSearchValue ? " " + currentSearchValue : "");

    // Populate the search box with today's day of the week
    //document.getElementById('dataTable_filter').querySelector('input').value = currentSearchValue;
    
    // Trigger the input event to initiate the search
    //document.getElementById('dataTable_filter').querySelector('input').dispatchEvent(new Event('input'));
    //renderTable(originalData);
});

document.getElementById("showTodayOnly").addEventListener("change", function (event) {
    selectedDate = new Date();
    document.getElementById('dataTable_filter').querySelector('input').dispatchEvent(new Event('input'));
    renderTable(originalData);
});

function filterData(data, selectedDate) {
   // If no date is selected, return the original data
   if (!selectedDate) {
        return data;
    }


    return data.filter(row => {


	const currentStartDate = new Date(row['Start Date']) || '';
	const currentEndDate = new Date(row['End Date']) || '';
	const currentDay = row['Day of Week'] || '';

/*	console.log("row start date" + row['Start Date']);
	console.log("current start date" + currentStartDate);

	console.log("row end date" + row['End Date']);
	console.log("current end date" + currentEndDate);*/

	//const dayCondition = selectedDate.some(day => currentDay.toLowerCase() === day.toLowerCase());


	const todayDay = selectedDate.toLocaleDateString("en-US", { weekday: "long" }); // Get day of week
	const dayCondition = currentDay.toLowerCase() === todayDay.toLowerCase();    
	    
	const dateCondition = (selectedDate >= currentStartDate && selectedDate <= currentEndDate);
	

	const startDateCheck = selectedDate <= currentStartDate;
	const endDateCheck = selectedDate >= currentEndDate

	/*console.log("dateCondition " + dateCondition);
	console.log("startDateCheck " + startDateCheck);
	console.log("endDateCheck " + endDateCheck);*/
	

	return dayCondition && dateCondition;
    });
}


let currentSearchValue = getQueryParam('search'); // Variable to store the current search value

function clearAllFilters() {
    // Store the current sorting state
    sortingState = $('#dataTable').DataTable().state();
    selectedDate = null;
	
    // Check all the "Select Area" checkboxes
/*    document.querySelectorAll('.areaCheckbox').forEach(checkbox => {
        checkbox.checked = true;
		if (!selectedAreas.includes(checkbox.value)) {
			selectedAreas.push(checkbox.value);
		}
    });



// Check all the "Select Day" checkboxes
    document.querySelectorAll('.dayCheckbox').forEach(checkbox => {
        checkbox.checked = true;
		if (!selectedDay.includes(checkbox.value)) {
			selectedDay.push(checkbox.value);
		}
    });*/




    // Clear the DataTable search box
    var dataTable = $('#dataTable').DataTable();
    dataTable.search('').draw();
	currentSearchValue = "";

    // Render the table with cleared filters
    renderTable(originalData);
}

/*const selectedAreas = [];
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

/*
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
*/
