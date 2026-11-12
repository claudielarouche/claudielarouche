---
---
(function() {
    if (window.__winterCoursesLoaded) return;
    window.__winterCoursesLoaded = true;

    let table = null;

    function getTimeOfDay(timeStr) {
        if (!timeStr) return '';
        const hour = parseInt(timeStr.split(':')[0], 10);
        if (hour < 12) return 'AM';
        if (hour < 18) return 'PM';
        return 'Evening';
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        var parts = dateStr.split('/');
        if (parts.length !== 3) return dateStr;
        var m = parts[0].padStart(2, '0');
        var d = parts[1].padStart(2, '0');
        var y = parts[2];
        return y + '-' + m + '-' + d;
    }

    function formatTime(timeStr) {
        if (!timeStr) return '';
        const parts = timeStr.split(':');
        if (parts.length < 2) return timeStr;
        const hour = parseInt(parts[0], 10);
        const min = parts[1];
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const h12 = hour % 12 || 12;
        return h12 + ':' + min + ' ' + ampm;
    }

    // Filter state — Sets for O(1) lookup
    const selectedDay              = new Set();
    const selectedAge              = new Set();
    const selectedTime             = new Set();
    const selectedDepartment       = new Set();
    const selectedActivityCategory = new Set();

    // Register custom DataTables search — reads data attributes on each <tr>
    $.fn.dataTable.ext.search.push(function(settings, _data, dataIndex) {
        if (settings.nTable.id !== 'dataTable') return true;
        const tr = settings.aoData[dataIndex].nTr;
        if (!tr) return true;
        return selectedDay.has(tr.dataset.day)
            && selectedAge.has(tr.dataset.age)
            && selectedTime.has(tr.dataset.time)
            && selectedDepartment.has(tr.dataset.dept)
            && selectedActivityCategory.has(tr.dataset.cat);
    });

    window.onload = function() {
        const csvFilePath = '{{ "/assets/data/2027-winter-course-information.csv" | relative_url }}';
        Papa.parse(csvFilePath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: function(results) {
                if (results.errors.length > 0) {
                    console.error('Error parsing CSV:', results.errors);
                    document.getElementById('csvData').innerHTML = 'Error loading data.';
                    return;
                }
                if (Array.isArray(results.data)) {
                    buildTable(results.data);
                } else {
                    document.getElementById('csvData').innerHTML = 'Error loading data.';
                }
            },
            error: function(error) {
                console.error('Error fetching or parsing CSV:', error);
                document.getElementById('csvData').innerHTML = 'Error loading data.';
            }
        });
    };

    function buildTable(data) {
        if (!Array.isArray(data) || data.length === 0) {
            document.getElementById('csvData').innerHTML = 'No data available.';
            return;
        }

        var tableHtml = '<table id="dataTable"><thead><tr>'
            + '<th>Activity Name</th>'
            + '<th>Department</th>'
            + '<th>Activity Category</th>'
            + '<th>Age Category</th>'
            + '<th>Location</th>'
            + '<th>Day</th>'
            + '<th>Start Date</th>'
            + '<th>Start Time</th>'
            + '<th>End Date</th>'
            + '<th>Number of Dates</th>'
            + '<th>Resident Fee (before tax)</th>'
            + '</tr></thead><tbody>';

        data.forEach(function(row) {
            var day  = row['Day'] || '';
            var time = getTimeOfDay(row['Start Time']);
            var age  = (row['Age Category'] || '').toLowerCase();
            var dept = (row['Department'] || '').toLowerCase();
            var cat  = (row['Activity Category'] || '').toLowerCase();
            var link = row['Link'] || '';
            var name = row['Activity Name'] || '';
            var fee  = row['Resident Fee (before tax)']
                ? '$' + parseFloat(row['Resident Fee (before tax)']).toFixed(2)
                : '';

            tableHtml += '<tr data-day="' + day + '" data-age="' + age + '" data-time="' + time + '" data-dept="' + dept + '" data-cat="' + cat + '">';
            tableHtml += link
                ? '<td><a href="' + link + '" target="_blank" rel="noopener noreferrer">' + name + '</a></td>'
                : '<td>' + name + '</td>';
            tableHtml += '<td>' + (row['Department'] || '') + '</td>';
            tableHtml += '<td>' + (row['Activity Category'] || '') + '</td>';
            tableHtml += '<td>' + (row['Age Category'] || '') + '</td>';
            tableHtml += '<td>' + (row['Location'] || '') + '</td>';
            tableHtml += '<td>' + day + '</td>';
            tableHtml += '<td>' + formatDate(row['Start Date']) + '</td>';
            tableHtml += '<td>' + formatTime(row['Start Time']) + '</td>';
            tableHtml += '<td>' + formatDate(row['End Date']) + '</td>';
            tableHtml += '<td>' + (row['Number of Dates'] || '') + '</td>';
            tableHtml += '<td>' + fee + '</td>';
            tableHtml += '</tr>';
        });

        tableHtml += '</tbody></table>';
        document.getElementById('csvData').innerHTML = tableHtml;

        table = $('#dataTable').DataTable({
            "pageLength": -1,
            "dom": 'Bfrtip',
            "buttons": ['colvis'],
            "order": [[6, 'asc'], [7, 'asc'], [0, 'asc']],
            "language": {
                "emptyTable": "No data available, try <a href='javascript:void(0);' onclick='window.clearWinterFilters()'>resetting all filters to default</a>.",
                "zeroRecords": "No data available, try <a href='javascript:void(0);' onclick='window.clearWinterFilters()'>resetting all filters to default</a>."
            }
        });
    }

    window.clearWinterFilters = function() {
        [
            { selector: '.dayCheckbox',        set: selectedDay,        transform: null },
            { selector: '.ageCheckbox',        set: selectedAge,        transform: function(v) { return v.toLowerCase(); } },
            { selector: '.timeCheckbox',       set: selectedTime,       transform: null },
            { selector: '.departmentCheckbox',       set: selectedDepartment,       transform: function(v) { return v.toLowerCase(); } },
            { selector: '.activityCategoryCheckbox', set: selectedActivityCategory, transform: function(v) { return v.toLowerCase(); } },
        ].forEach(function(item) {
            document.querySelectorAll(item.selector).forEach(function(cb) {
                cb.checked = true;
                var val = item.transform ? item.transform(cb.value) : cb.value;
                item.set.add(val);
            });
        });
        if (table) table.search('').draw();
    };

    function setupCheckboxes(selector, set, transform) {
        document.querySelectorAll(selector).forEach(function(checkbox) {
            var val = transform ? transform(checkbox.value) : checkbox.value;
            checkbox.checked = true;
            set.add(val);
            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    set.add(val);
                } else {
                    set.delete(val);
                }
                if (table) table.draw();
            });
        });
    }

    setupCheckboxes('.dayCheckbox',        selectedDay,        null);
    setupCheckboxes('.ageCheckbox',        selectedAge,        function(v) { return v.toLowerCase(); });
    setupCheckboxes('.timeCheckbox',       selectedTime,       null);
    setupCheckboxes('.departmentCheckbox',       selectedDepartment,       function(v) { return v.toLowerCase(); });
    setupCheckboxes('.activityCategoryCheckbox', selectedActivityCategory, function(v) { return v.toLowerCase(); });

    document.addEventListener('DOMContentLoaded', function() {
        function setupBulkButtons(selectId, unselectId, selector, set, transform) {
            var checkboxes  = document.querySelectorAll(selector);
            var selectBtn   = document.getElementById(selectId);
            var unselectBtn = document.getElementById(unselectId);

            if (selectBtn) {
                selectBtn.addEventListener('click', function() {
                    checkboxes.forEach(function(cb) {
                        cb.checked = true;
                        set.add(transform ? transform(cb.value) : cb.value);
                    });
                    if (table) table.draw();
                });
            }
            if (unselectBtn) {
                unselectBtn.addEventListener('click', function() {
                    checkboxes.forEach(function(cb) { cb.checked = false; });
                    set.clear();
                    if (table) table.draw();
                });
            }
        }

        setupBulkButtons('selectAllDaysButton',       'unselectAllDaysButton',       '.dayCheckbox',        selectedDay,        null);
        setupBulkButtons('selectAllAgesButton',        'unselectAllAgesButton',        '.ageCheckbox',        selectedAge,        function(v) { return v.toLowerCase(); });
        setupBulkButtons('selectAllTimesButton',       'unselectAllTimesButton',       '.timeCheckbox',       selectedTime,       null);
        setupBulkButtons('selectAllDepartmentsButton',       'unselectAllDepartmentsButton',       '.departmentCheckbox',       selectedDepartment,       function(v) { return v.toLowerCase(); });
        setupBulkButtons('selectAllActivityCategoriesButton', 'unselectAllActivityCategoriesButton', '.activityCategoryCheckbox', selectedActivityCategory, function(v) { return v.toLowerCase(); });
    });

})();
