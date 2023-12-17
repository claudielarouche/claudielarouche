let originalData = []; // Initialize as an empty array
// Load the data from the archive.csv file
    d3.csv('https://claudielarouche.com/earlyON/archive.csv').then(data => {
        // Your chart code here

        // For example, let's create a simple bar chart showing the count of rows by "Day of Week"
        const dayOfWeekCounts = d3.nest()
            .key(d => d['Day of Week'])
            .rollup(v => v.length)
            .entries(data);

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

        // Render the data table
        renderTable(data);
    });

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



	// Initialize DataTable only once


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