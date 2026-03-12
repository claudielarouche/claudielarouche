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
