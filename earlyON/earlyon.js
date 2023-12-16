let originalData = []; // Initialize as an empty array

window.onload = function () {
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
	/*headers.push('Time of Day'); // Add this line to include the new header
	headers.push('Day of Week'); // Add this line to include the new header*/
	

    let tableHtml = '<table id="dataTable"><thead><tr>';
    headers.forEach(header => {
        tableHtml += `<th>${header}</th>`;
    });
    tableHtml += '</tr></thead><tbody>';

    const selectedDate = document.getElementById('selectedDate').value;

    const filteredData = filterDataByDate(data, selectedDate);

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
           /* } else if (header === 'Day of Week') {
                // Calculate and display the day of the week
                const dateParts = currentDate.split('-');
                const currentJsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
                const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentJsDate.getDay()];
                tableHtml += `<td>${dayOfWeek}</td>`;
            } else if (header === 'Time of Day') {
                // Calculate and display the time of day
                const time = row['Hours'] ? row['Hours'].trim() : '';
                if (time.startsWith('09') || time.startsWith('10') || time.startsWith('11')) {
                    tableHtml += '<td>Morning</td>';
                } else if (time.startsWith('12') || time.startsWith('13') || time.startsWith('14') || time.startsWith('15') || time.startsWith('16')) {
                    tableHtml += '<td>Afternoon</td>';
                } else {
                    tableHtml += '<td>Evening</td>';
                }
            */} else if (header === 'Location Address') {
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
    
    /*if (totalData > 0) {
        document.getElementById('csvData').innerHTML = 'No playgroups found for the selected day.';
        return;
    }*/

    // Initialize DataTable only once
   /* if (!$.fn.dataTable.isDataTable('#dataTable')) {
        $('#dataTable').DataTable({
			"pageLength": -1,
			"lengthChange": false, // Hide the "Show x entries" dropdown
			"searching": false
		});
    }*/
	
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

function filterDataByDate(data, selectedDate) {
    // If no date is selected, return the original data
    if (!selectedDate) {
        return data;
    }

    // Ensure data is an array before filtering
    if (Array.isArray(data)) {
        return data.filter(row => {
            const currentDate = row['Date'] ? row['Date'] : '';
            return currentDate === selectedDate;
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
