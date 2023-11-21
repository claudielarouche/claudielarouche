
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
                    //totalData++;
					tableHtml += '<tr>';
                    headers.forEach(header => {
                        if (header === 'URL') {
                            // Make the URL clickable as a link
                            tableHtml += `<td><a href="${row[header]}" target="_blank">URL</a></td>`;
                        } else {
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

    const selectedDate = new Date(dateString);
    selectedDate.setHours(0, 0, 0, 0); // Set time to midnight

	console.log('currentDate:', currentDate);
console.log('selectedDate:', selectedDate);
console.log(selectedDate < currentDate);

    return selectedDate < currentDate;
}


        // Listen for changes in date input
        document.getElementById('selectedDate').addEventListener('change', function() {
            renderTable(originalData);
        });
