// D3
d3.csv('https://claudielarouche.com/earlyON/archive.csv').then(data => {
    renderChart(data); // Call the new function to render the D3 chart
});


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
	/*	headers.push('Time of Day'); // Add this line to include the new header
		headers.push('Day of Week'); // Add this line to include the new header*/


	let tableHtml = '<table id="dataTable"><thead><tr>';
	headers.forEach(header => {
		tableHtml += `<th>${header}</th>`;
	});
	tableHtml += '</tr></thead><tbody>';

	const selectedArea = document.getElementById('selectedArea').value;
	const selectedDate = document.getElementById('selectedDate').value;
	const selectedAgeGroup = document.getElementById('selectedAgeGroup').value;
	const filteredData = filterData(data, selectedDate, selectedArea, selectedAgeGroup);

	
	//const filteredData = filterDataByDate(data, selectedDate);

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
				/*else if (header === 'Day of Week') {
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
				           } */
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
	updateChart();
});

// Listen for changes in the Area select input
document.getElementById('selectedArea').addEventListener('change', function() {
	currentSearchValue = $('#dataTable_filter input').val();
    renderTable(originalData);
	updateChart();
});

// Listen for changes in the Age Group select input
document.getElementById('selectedAgeGroup').addEventListener('change', function() {
	currentSearchValue = $('#dataTable_filter input').val();
    renderTable(originalData);
	updateChart();
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

/*D3*/
function renderChart(data) {
    // Remove the existing chart if any
    d3.select('#chart-container').selectAll('*').remove();

    // For example, let's create a simple bar chart showing the count of rows by "Day of Week"
    const dayOfWeekCounts = d3.nest()
        .key(d => d['Day of Week'])
        .rollup(v => v.length)
        .entries(data);

    // Define the order of days of the week
    const daysOfWeekOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Sort the dayOfWeekCounts based on the defined order
    dayOfWeekCounts.sort((a, b) => daysOfWeekOrder.indexOf(a.key) - daysOfWeekOrder.indexOf(b.key));

    const svg = d3.select('#chart-container')
        .append('svg')
        .attr('width', 400)
        .attr('height', 300);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const x = d3.scaleBand()
        .domain(dayOfWeekCounts.map(d => d.key))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(dayOfWeekCounts, d => d.value)])
        .nice()
        .range([height - margin.bottom, margin.top]);

    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    svg.selectAll('.bar')
        .data(dayOfWeekCounts)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.key))
        .attr('y', d => y(d.value))
        .attr('width', x.bandwidth())
        .attr('height', d => height - margin.bottom - y(d.value));
}



function updateChart() {
    // Fetch the CSV data
    d3.csv('https://claudielarouche.com/earlyON/archive.csv').then(data => {
        // Apply filters to the data
        const selectedDate = document.getElementById('selectedDate').value;
        const selectedArea = document.getElementById('selectedArea').value;
        const selectedAgeGroup = document.getElementById('selectedAgeGroup').value;
        const filteredData = filterData(data, selectedDate, selectedArea, selectedAgeGroup);

        // Render the updated chart with the filtered data
        renderChart(filteredData);
    });
}
