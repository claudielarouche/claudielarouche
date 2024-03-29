console.log('version 7');

// D3
d3.csv('https://claudielarouche.com/earlyON/archive.csv').then(data => {
    renderDayOfWeekChart(data); // Call the new function to render the D3 chart
	renderTimeOfDayChart(data);
});


let originalData = []; // Initialize as an empty array

window.onload = function() {
	// Update the path to your CSV file
	const csvFilePath = 'https://claudielarouche.com/earlyON/archive.csv';

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
	const selectedOrganizer = document.getElementById('selectedOrganizer').value;
	const filteredData = filterData(data, selectedDate, selectedArea, selectedAgeGroup, selectedOrganizer);

	
	//const filteredData = filterDataByDate(data, selectedDate);

	if (!Array.isArray(filteredData)) {
		console.error('Error loading data: Filtered data is not an array.');
		document.getElementById('csvData').innerHTML = 'Error loading data.';
		return;
	}

	//let totalData = 0;
	filteredData.forEach(row => {
		const currentDate = row['Date'] ? row['Date'] : '';
		
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
		
	});




	tableHtml += '</tbody></table>';

	document.getElementById('csvData').innerHTML = tableHtml;



	if (!$.fn.dataTable.isDataTable('#dataTable')) {
    $('#dataTable').DataTable({
        "pageLength": -1,
        "searching": false
    });
}
}





function filterData(data, selectedDate, selectedArea, selectedAgeGroup, selectedOrganizer) {
    // If no date, area, or age group is selected, return the original data
    if (!selectedDate && !selectedArea && !selectedAgeGroup && !selectedOrganizer) {
        return data;
    }

    // Ensure data is an array before filtering
    if (Array.isArray(data)) {
        return data.filter(row => {
            const currentDate = row['Date'] ? row['Date'] : '';
            const currentArea = row['Area'] ? row['Area'] : '';
            const currentAgeGroup = row['Age Group'] ? row['Age Group'] : '';
			const currentOrganizer = row['Organizer'] ? row['Organizer'] : '';

            const dateCondition = !selectedDate || currentDate === selectedDate;
            const areaCondition = !selectedArea || currentArea === selectedArea;
            const ageGroupCondition = !selectedAgeGroup || currentAgeGroup.includes(selectedAgeGroup);
			const organizerCondition = !selectedOrganizer || currentOrganizer.includes(selectedOrganizer);

            return dateCondition && areaCondition && ageGroupCondition && organizerCondition;
        });
    } else {
        return [];
    }
}




// Listen for changes in date input
document.getElementById('selectedDate').addEventListener('change', function() {
	renderTable(originalData);
	updateCharts();
});

// Listen for changes in the Area select input
document.getElementById('selectedArea').addEventListener('change', function() {
    renderTable(originalData);
	updateCharts();
});

// Listen for changes in the Age Group select input
document.getElementById('selectedAgeGroup').addEventListener('change', function() {
    renderTable(originalData);
	updateCharts();
});

// Listen for changes in the Organizer select input
document.getElementById('selectedOrganizer').addEventListener('change', function() {	
    renderTable(originalData);
	updateCharts();
});

function clearAllFilters() {
    // Clear the date filter
    document.getElementById('selectedDate').value = '';

    // Clear the area filter
    document.getElementById('selectedArea').value = '';
	
	// Clear the area filter
    document.getElementById('selectedAgeGroup').value = '';
	
	// Clear the area filter
    document.getElementById('selectedOrganizer').value = '';



    // Clear the DataTable search box
    $('#dataTable_filter input').val('');

    // Render the table with cleared filters
    renderTable(originalData);
	
	// Update the chart with cleared filters
    updateCharts();
}

/*D3*/
function renderDayOfWeekChart(data) {
    // Remove the existing chart if any
    d3.select('#day-of-week-chart').selectAll('*').remove();

	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    // For example, let's create a simple bar chart showing the count of rows by "Day of Week"
    const dayOfWeekCounts = d3.nest()
		.key(d => d['Day of Week'])
		.rollup(v => v.length)
		.entries(data)
		.map(entry => ({ day: entry.key, count: entry.value }));

	// Ensure all days are included, filling in 0 for days with no data
	daysOfWeek.forEach(day => {
		if (!dayOfWeekCounts.some(entry => entry.day === day)) {
		  dayOfWeekCounts.push({ day, count: 0 });
		}
	  });
	  

    // Define the order of days of the week
    const daysOfWeekOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Sort the dayOfWeekCounts based on the defined order
    dayOfWeekCounts.sort((a, b) => daysOfWeekOrder.indexOf(a.key) - daysOfWeekOrder.indexOf(b.key));

    const svg = d3.select('#day-of-week-chart')
        .append('svg')
        .attr('width', 400)
        .attr('height', 300);
	
    

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
	
	
    const x = d3.scaleBand()
    .domain(daysOfWeekOrder) // Use the predefined order
    .range([margin.left, width - margin.right])
    .padding(0.1);
		

    const y = d3.scaleLinear()
    .domain([0, d3.max(dayOfWeekCounts, d => d.count)])
    .nice()
    .range([height - margin.bottom, margin.top]);
		

    svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'rotate(-45)') // Rotate the x-axis labels
    .attr('text-anchor', 'end'); // Adjust the anchor for proper alignment

		
	

    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

	
	
    // Append bars
svg.selectAll('.bar')
    .data(dayOfWeekCounts)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.day))
    .attr('y', d => isNaN(y(d.count)) ? 0 : y(d.count)) // Handle NaN values
    .attr('width', x.bandwidth())
    .attr('height', d => isNaN(height - margin.bottom - y(d.count)) ? 0 : height - margin.bottom - y(d.count)); // Handle NaN values




// Append text elements on top of each bar
svg.selectAll('.bar-label')
    .data(dayOfWeekCounts)
    .enter().append('text')
    .attr('class', 'bar-label')
    .attr('x', d => x(d.day) + x.bandwidth() / 2)
    .attr('y', d => isNaN(y(d.count)) ? height - margin.bottom : y(d.count) - 5) // Adjust the position as needed
    .attr('text-anchor', 'middle')
    .text(d => isNaN(d.count) ? '' : d.count);
	
}

function renderTimeOfDayChart(data) {
    d3.select('#time-of-day-chart').selectAll('*').remove();

    // Add your D3 chart code for "Time of Day" here
    const timeOfDayCounts = d3.nest()
        .key(d => d['Time of Day'])
        .rollup(v => v.length)
        .entries(data)
        .map(entry => ({ time: entry.key, count: entry.value }));

    const timeOfDay = ['Morning', 'Afternoon', 'Evening'];

    // Ensure all times are included, filling in 0 for days with no data
    timeOfDay.forEach(time => {
        if (!timeOfDayCounts.some(entry => entry.time === time)) {
            timeOfDayCounts.push({ time, count: 0 });
        }
    });

    // Define the order 
    const timeOfDayOrder = ['Morning', 'Afternoon', 'Evening'];

    // Sort  based on the defined order
    timeOfDayCounts.sort((a, b) => timeOfDayOrder.indexOf(a.time) - timeOfDayOrder.indexOf(b.time));

    const svg = d3.select('#time-of-day-chart')
        .append('svg')
        .attr('width', 400)
        .attr('height', 300);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const x = d3.scaleBand()
        .domain(timeOfDayOrder) // Use the predefined order
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(timeOfDayCounts, d => d.count)])
        .nice()
        .range([height - margin.bottom, margin.top]);

    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'rotate(-45)') // Rotate the x-axis labels
        .attr('text-anchor', 'end'); // Adjust the anchor for proper alignment

    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    // Append bars
    svg.selectAll('.bar')
        .data(timeOfDayCounts)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.time))
        .attr('y', d => isNaN(y(d.count)) ? 0 : y(d.count)) // Handle NaN values
        .attr('width', x.bandwidth())
        .attr('height', d => isNaN(height - margin.bottom - y(d.count)) ? 0 : height - margin.bottom - y(d.count)); // Handle NaN values

    // Append text elements on top of each bar
    svg.selectAll('.bar-label')
        .data(timeOfDayCounts)
        .enter().append('text')
        .attr('class', 'bar-label')
        .attr('x', d => x(d.time) + x.bandwidth() / 2)
        .attr('y', d => isNaN(y(d.count)) ? height - margin.bottom : y(d.count) - 5) // Adjust the position as needed
        .attr('text-anchor', 'middle')
        .text(d => isNaN(d.count) ? '' : d.count);
}


function updateCharts() {
	

    // Fetch the CSV data
    d3.csv('https://claudielarouche.com/earlyON/archive.csv').then(data => {
		
        // Apply filters to the data
        const selectedDate = document.getElementById('selectedDate').value;
        const selectedArea = document.getElementById('selectedArea').value;
        const selectedAgeGroup = document.getElementById('selectedAgeGroup').value;
		const selectedOrganizer = document.getElementById('selectedOrganizer').value;		
        const filteredData = filterData(data, selectedDate, selectedArea, selectedAgeGroup, selectedOrganizer);		

        // Render the updated chart with the filtered data
        renderDayOfWeekChart(filteredData);
		renderTimeOfDayChart(filteredData);
    });
}
