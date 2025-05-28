const addTimeButton = document.getElementById("addTime");
const calculateButton = document.getElementById("calculate");
const timeInputs = document.getElementById("timeInputs");
const totalTimeDisplay = document.getElementById("totalTime");

let timeCount = 1;

addTimeButton.addEventListener("click", () => {
    timeCount++;
    const newTimeInputDiv = document.createElement("div");
    newTimeInputDiv.classList.add("time-inputs");
    newTimeInputDiv.innerHTML = `
        <label for="start${timeCount}">Start Time:</label>
        <input type="time" id="start${timeCount}" name="start${timeCount}" class="timepicker">
        <label for="end${timeCount}">End Time:</label>
        <input type="time" id="end${timeCount}" name="end${timeCount}" class="timepicker">
    `;
    if (timeCount > 1) {
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-danger");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            newTimeInputDiv.remove();
            timeCount--;
        });
        newTimeInputDiv.appendChild(deleteButton);
    }
    timeInputs.appendChild(newTimeInputDiv);
    initializeTimepickers(); // Reinitialize timepickers after adding new ones
});

function initializeTimepickers() {
    const timepickers = document.querySelectorAll('.timepicker');
    timepickers.forEach((timepicker) => {
        timepicker.addEventListener('focus', () => {
            if (!timepicker.value) {
                // Optionally, you can provide some default value here if needed
            }
        });
    });
}

initializeTimepickers(); // Initialize timepickers on page load

calculateButton.addEventListener("click", () => {
    let totalTimeInMilliseconds = 0;
    let timeDetails = '';
    for (let i = 1; i <= timeCount; i++) {
        const startTime = parseTime(document.getElementById(`start${i}`).value);
        const endTime = parseTime(document.getElementById(`end${i}`).value);
        if (startTime && endTime) {
            const timeDiff = endTime - startTime;
            totalTimeInMilliseconds += timeDiff;
            const startValue = document.getElementById(`start${i}`).value;
            const endValue = document.getElementById(`end${i}`).value;
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const decimalHours = timeDiff / (1000 * 60 * 60);
            timeDetails += `${startValue} to ${endValue}: ${hours} hours and ${minutes} minutes (${decimalHours.toFixed(2)} hours)<br>`;
        }
    }
    const totalHours = Math.floor(totalTimeInMilliseconds / (1000 * 60 * 60));
    const totalMinutes = Math.floor((totalTimeInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const totalDecimalHours = totalTimeInMilliseconds / (1000 * 60 * 60);
    totalTimeDisplay.innerHTML = `${timeDetails}----------------------<br>Total Time: ${totalHours} hours and ${totalMinutes} minutes (${totalDecimalHours.toFixed(2)} hours)`;
});

function parseTime(timeString) {
    const timeComponents = timeString.split(':');
    const hours = parseInt(timeComponents[0]);
    const minutes = parseInt(timeComponents[1]);
    return hours * 3600000 + minutes * 60000;
}