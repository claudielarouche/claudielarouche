---
---
function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

function clearAllFilters() {
    // Store the current sorting state
    sortingState = $('#dataTable').DataTable().state();

    [
        { selector: '.areaCheckbox',     array: typeof selectedAreas    !== 'undefined' ? selectedAreas    : null },
        { selector: '.categoryCheckbox', array: typeof selectedCategory !== 'undefined' ? selectedCategory : null },
        { selector: '.dayCheckbox',      array: typeof selectedDay      !== 'undefined' ? selectedDay      : null },
        { selector: '.ageCheckbox',      array: typeof selectedAge      !== 'undefined' ? selectedAge      : null },
        { selector: '.timeCheckbox',     array: typeof selectedTime     !== 'undefined' ? selectedTime     : null },
    ].forEach(({ selector, array }) => {
        if (!array) return;
        document.querySelectorAll(selector).forEach(checkbox => {
            checkbox.checked = true;
            if (!array.includes(checkbox.value)) {
                array.push(checkbox.value);
            }
        });
    });

    var dataTable = $('#dataTable').DataTable();
    dataTable.search('').draw();
    currentSearchValue = "";
    renderTable(originalData);
}

function renderTable(data) {
    if (!Array.isArray(data)) {
        console.error('Error loading data: Data is not an array.');
        document.getElementById('csvData').innerHTML = 'Error loading data.';
        return;
    }

    let sortOrderIndex;

    if (data.length === 0) {
        console.warn('No data available.');
        document.getElementById('csvData').innerHTML = 'No data available.';
        return;
    }

    const headers = Object.keys(data[0]);

    const showCategory = typeof selectedCategory !== 'undefined';
    const showAge      = typeof selectedAge      !== 'undefined';

    const isHidden = (header) =>
        header === 'URL' ||
        header === 'Reservation' ||
        (!showCategory && header === 'Category') ||
        (!showAge && (header === 'Age' || header === 'Activity Type'));

    let tableHtml = '<table id="dataTable"><thead><tr>';
    headers.forEach(header => {
        if (!isHidden(header)) tableHtml += `<th>${header}</th>`;
    });
    tableHtml += '<th>Actions</th></tr></thead><tbody>';

    const filteredData = filterCurrentData(data);
    const prefix = typeof REPORT_PREFIX !== 'undefined' ? REPORT_PREFIX : 'Ottawa Drop-Ins';

    filteredData.forEach(row => {
        tableHtml += '<tr>';
        headers.forEach((header, index) => {
            if (!isHidden(header)) {
                switch (header) {
                    case 'Sort Order':
                        sortOrderIndex = index;
                        tableHtml += `<td>${row[header]}</td>`;
                        break;
                    case 'Facility Name':
                        const url = row['URL'] ? row['URL'] : '';
                        const poolName = row[header] ? row[header] : '';
                        if (url !== '' && poolName !== '') {
                            tableHtml += `<td><a href="${url}" target="_blank">${poolName}</a></td>`;
                        } else {
                            tableHtml += `<td>${poolName}</td>`;
                        }
                        break;
                    case 'Address':
                        const address = row[header] ? row[header].trim() : '';
                        if (address !== '') {
                            const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)},+Ottawa,+Canada`;
                            tableHtml += `<td><a href="${googleMapsLink}" target="_blank">${address}</a></td>`;
                        } else {
                            tableHtml += '<td></td>';
                        }
                        break;
                    case 'Registration Required':
                        const facilityUrl = row['Reservation'] ? row['Reservation'] : '';
                        if (facilityUrl === '#') {
                            tableHtml += '<td>No</td>';
                        } else {
                            tableHtml += `<td><a href="${facilityUrl}" target="_blank">Yes</a></td>`;
                        }
                        break;
                    default:
                        tableHtml += `<td>${row[header]}</td>`;
                        break;
                }
            }
        });
        tableHtml += `<td><a href="https://docs.google.com/forms/d/e/1FAIpQLScTQ6U_lnHo0kr5rGo3zSjYQwsGG5PZIfL5Eil8iVQU9UWTmg/viewform?usp=sf_link&entry.658764103=${encodeURIComponent(prefix + ': ' + row['Day'] + ', ' + row['Time'] + ', ' + row['Facility Name'] + ', ' + row['Address'] + ', ' + row['Activity Type'] + ', ' + row['Registration Required'] + ', ' + row['Area'] + ', ' + row['Category'] + ', ' + row['Age'] + ', ' + row['Time of day'])}" target="_blank">Report a data issue</a></td>`;
        tableHtml += '</tr>';
    });

    tableHtml += '</tbody></table>';
    document.getElementById('csvData').innerHTML = tableHtml;

    if (!$.fn.dataTable.isDataTable('#dataTable')) {
        $('#dataTable').DataTable({
            "pageLength": -1,
            "dom": 'Bfrtip',
            "buttons": ['colvis'],
            "columnDefs": [{ "targets": sortOrderIndex, "visible": false }],
            "order": [[0, 'asc'], [2, 'asc'], [3, 'asc']],
            "language": {
                "emptyTable": "No data available in table, try <a href='javascript:void(0);' onclick='clearAllFilters()'>resetting all filters to default</a>.",
                "zeroRecords": "No data available in table, try <a href='javascript:void(0);' onclick='clearAllFilters()'>resetting all filters to default</a>."
            }
        });
    }
    $('#dataTable_filter input').val(currentSearchValue).trigger('input');

    if (sortingState) {
        $('#dataTable').DataTable().order(sortingState.order).draw();
    }
}
