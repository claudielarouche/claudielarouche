---
---
console.log('report a problem v1');

let sortingState;
let originalData = []; // Initialize as an empty array


window.onload = function() {
	// Update the path to your CSV file
	const csvFilePath = '{{ "/assets/data/ottawa-drop-ins.csv" | relative_url }}';

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

document.getElementById('showToday').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor link

    // Scroll to the element with id 'csvData'
    document.getElementById('csvData').scrollIntoView({ behavior: 'smooth' });

    // Get today's day of the week
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const todayDayOfWeek = daysOfWeek[today.getDay()];

    currentSearchValue = $('#dataTable_filter input').val();

    if (!currentSearchValue.includes(todayDayOfWeek)) {

       currentSearchValue = todayDayOfWeek + (currentSearchValue ? " " + currentSearchValue : "");

       // Populate the search box with today's day of the week
       document.getElementById('dataTable_filter').querySelector('input').value = currentSearchValue;

       // Trigger the input event to initiate the search
       document.getElementById('dataTable_filter').querySelector('input').dispatchEvent(new Event('input'));
    }
});

function filterData(data, selectedAreas, selectedCategory, selectedDay, selectedAge, selectedTime) {


    return data.filter(row => {

	const currentArea = row['Area'] || '';
	const currentCategory = row['Category'] || '';
	const currentDay = row['Day'] || '';
	const currentAge = row['Age'] || '';
	const currentTime = row['Time of day'] || '';

	const areaCondition = selectedAreas.some(area => currentArea.toLowerCase().includes(area.toLowerCase()));
        const categoryCondition = selectedCategory.some(category => currentCategory.toLowerCase() === category.toLowerCase());
	const dayCondition = selectedDay.some(day => currentDay.toLowerCase() === day.toLowerCase());
	const ageCondition = selectedAge.some(age => currentAge.toLowerCase().includes(age.toLowerCase()));
	const timeCondition = selectedTime.some(time => currentTime.toLowerCase().includes(time.toLowerCase()));

	return areaCondition && categoryCondition && dayCondition && ageCondition && timeCondition;
    });
}

function filterCurrentData(data) {
    return filterData(data, selectedAreas, selectedCategory, selectedDay, selectedAge, selectedTime);
}

let currentSearchValue = getQueryParam('search'); // Variable to store the current search value
const REPORT_PREFIX = 'Ottawa Drop-Ins';

const selectedAreas = [];
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

const selectedCategory = [];
document.querySelectorAll('.categoryCheckbox').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
	// Store the current sorting state
        sortingState = $('#dataTable').DataTable().state();
        currentSearchValue = $('#dataTable_filter input').val();
		if (checkbox.checked) {
            if (!selectedCategory.includes(checkbox.value)) {
                selectedCategory.push(checkbox.value);
            }
        } else {
            const index = selectedCategory.indexOf(checkbox.value);
            if (index !== -1) {
                selectedCategory.splice(index, 1);
            }
        }
        renderTable(originalData);
    });

    // Initialize with all checkboxes checked by default
    checkbox.checked = true;
    if (!selectedCategory.includes(checkbox.value)) {
        selectedCategory.push(checkbox.value);
    }
});

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

const selectedAge = [];
document.querySelectorAll('.ageCheckbox').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
	// Store the current sorting state
        sortingState = $('#dataTable').DataTable().state();
        currentSearchValue = $('#dataTable_filter input').val();
		if (checkbox.checked) {
            if (!selectedAge.includes(checkbox.value)) {
                selectedAge.push(checkbox.value);
            }
        } else {
            const index = selectedAge.indexOf(checkbox.value);
            if (index !== -1) {
                selectedAge.splice(index, 1);
            }
        }
        renderTable(originalData);
    });

    // Initialize with all checkboxes checked by default
    checkbox.checked = true;
    if (!selectedAge.includes(checkbox.value)) {
        selectedAge.push(checkbox.value);
    }
});

const selectedTime = [];
document.querySelectorAll('.timeCheckbox').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
	// Store the current sorting state
        sortingState = $('#dataTable').DataTable().state();
        currentSearchValue = $('#dataTable_filter input').val();
		if (checkbox.checked) {
            if (!selectedTime.includes(checkbox.value)) {
                selectedTime.push(checkbox.value);
            }
        } else {
            const index = selectedTime.indexOf(checkbox.value);
            if (index !== -1) {
                selectedTime.splice(index, 1);
            }
        }
        renderTable(originalData);
    });

    // Initialize with all checkboxes checked by default
    checkbox.checked = true;
    if (!selectedTime.includes(checkbox.value)) {
        selectedTime.push(checkbox.value);
    }
});

// wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const selectAllAreasBtn = document.getElementById('selectAllAreasButton');
    const unselectAllAreasBtn = document.getElementById('unselectAllAreasButton');
    const areasCheckboxes = document.querySelectorAll('.areaCheckbox');

    selectAllAreasBtn.addEventListener('click', function() {
        areasCheckboxes.forEach(cb => {
            cb.checked = true;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    unselectAllAreasBtn.addEventListener('click', function() {
        areasCheckboxes.forEach(cb => {
            cb.checked = false;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    // === Days ===
    const selectAllDaysBtn   = document.getElementById('selectAllDaysButton');
    const unselectAllDaysBtn = document.getElementById('unselectAllDaysButton');
    const daysCheckboxes     = document.querySelectorAll('.dayCheckbox');

    selectAllDaysBtn.addEventListener('click', function() {
        daysCheckboxes.forEach(cb => {
            cb.checked = true;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    unselectAllDaysBtn.addEventListener('click', function() {
        daysCheckboxes.forEach(cb => {
            cb.checked = false;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    // === Time ===
    const selectAllTimesBtn   = document.getElementById('selectAllTimesButton');
    const unselectAllTimesBtn = document.getElementById('unselectAllTimesButton');
    const timesCheckboxes     = document.querySelectorAll('.timeCheckbox');

    selectAllTimesBtn.addEventListener('click', function() {
        timesCheckboxes.forEach(cb => {
            cb.checked = true;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    unselectAllTimesBtn.addEventListener('click', function() {
        timesCheckboxes.forEach(cb => {
            cb.checked = false;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    // === Age ===
    const selectAllAgesBtn   = document.getElementById('selectAllAgesButton');
    const unselectAllAgesBtn = document.getElementById('unselectAllAgesButton');
    const agesCheckboxes     = document.querySelectorAll('.ageCheckbox');

    selectAllAgesBtn.addEventListener('click', function() {
        agesCheckboxes.forEach(cb => {
            cb.checked = true;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    unselectAllAgesBtn.addEventListener('click', function() {
        agesCheckboxes.forEach(cb => {
            cb.checked = false;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    // === Category ===
    const selectAllCategoriesBtn   = document.getElementById('selectAllCategoriesButton');
    const unselectAllCategoriesBtn = document.getElementById('unselectAllCategoriesButton');
    const categoriesCheckboxes     = document.querySelectorAll('.categoryCheckbox');

    selectAllCategoriesBtn.addEventListener('click', function() {
        categoriesCheckboxes.forEach(cb => {
            cb.checked = true;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    unselectAllCategoriesBtn.addEventListener('click', function() {
        categoriesCheckboxes.forEach(cb => {
            cb.checked = false;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });
});

