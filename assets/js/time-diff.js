const addTimeButton = document.getElementById("addTime");
const calculateButton = document.getElementById("calculate");
const timeInputs = document.getElementById("timeInputs");
const totalTimeDisplay = document.getElementById("totalTime");
const resetButton = document.getElementById("reset");

flatpickr(".timepicker", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
});

addTimeButton.addEventListener("click", () => {
    const newTimeInputDiv = document.createElement("div");
    newTimeInputDiv.classList.add("time-inputs");
    newTimeInputDiv.innerHTML = `
        <label>Start Time:</label>
        <input type="time" class="timepicker start-time">
        <label>End Time:</label>
        <input type="time" class="timepicker end-time">
    `;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteTime");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        newTimeInputDiv.remove();
    });

    newTimeInputDiv.appendChild(deleteButton);
    timeInputs.appendChild(newTimeInputDiv);

    initializeTimepickers(); // Optional: if you use time picker library
});

calculateButton.addEventListener("click", () => {
    let totalTimeInMilliseconds = 0;
    let timeDetails = '';

    const allInputs = document.querySelectorAll(".time-inputs");

    allInputs.forEach((div) => {
        const startValue = div.querySelector(".start-time")?.value;
        const endValue = div.querySelector(".end-time")?.value;

        const startTime = parseTime(startValue);
        const endTime = parseTime(endValue);

        if (startTime != null && endTime != null) {
            const timeDiff = endTime - startTime;
            totalTimeInMilliseconds += timeDiff;
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const decimalHours = timeDiff / (1000 * 60 * 60);
            timeDetails += `${startValue} to ${endValue}: ${hours} hours and ${minutes} minutes (${decimalHours.toFixed(2)} hours)<br>`;
        }
    });

    const totalHours = Math.floor(totalTimeInMilliseconds / (1000 * 60 * 60));
    const totalMinutes = Math.floor((totalTimeInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const totalDecimalHours = totalTimeInMilliseconds / (1000 * 60 * 60);
    totalTimeDisplay.innerHTML = `${timeDetails}----------------------<br>Total Time: ${totalHours} hours and ${totalMinutes} minutes (${totalDecimalHours.toFixed(2)} hours)`;
});

function parseTime(timeString) {
    if (!timeString) return null;
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 3600000 + minutes * 60000;
}

function initializeTimepickers() {
    const timepickers = document.querySelectorAll('.timepicker');
    timepickers.forEach((timepicker) => {
        timepicker.addEventListener('focus', () => {
            if (!timepicker.value) {
                // Set default time if needed
            }
        });
    });
}

resetButton.addEventListener("click", () => {
    // Remove all dynamically added time input rows
    const allRows = document.querySelectorAll(".time-inputs");
    
    allRows.forEach((row, index) => {
        if (index === 0) {
            // Reset the first row's inputs
            const start = row.querySelector(".start-time");
            const end = row.querySelector(".end-time");
            if (start) start.value = '';
            if (end) end.value = '';
        } else {
            // Remove dynamically added rows
            row.remove();
        }
    });

    // Clear the output
    totalTimeDisplay.innerHTML = '';
});

// Initialize on page load
initializeTimepickers();