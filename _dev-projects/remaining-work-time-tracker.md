---
layout: dev
title: Remaining Work Time Tracker
permalink: /dev-projects/remaining-work-time-tracker/
---

<div class="workday-tracker">
  <p>
    Enter the working periods you have planned for today. Do not include your lunch break.
    The tracker combines them with the current time to show how much working time is left in your day.
  </p>

  <div id="workday-periods" class="workday-periods" aria-live="polite">
    <!-- Default first work block (8:00 - 12:00, cannot be removed) -->
    <div class="period-row">
      <label>
        Start time
        <input type="time" class="time-input start" value="08:00" />
      </label>
      <label>
        End time
        <input type="time" class="time-input end" value="12:00" />
      </label>
    </div>

    <!-- Default second work block (12:30 - 16:00, removable) -->
    <div class="period-row">
      <input type="time" class="time-input start" value="12:30" />
      <input type="time" class="time-input end" value="16:00" />
      <button type="button" class="remove-period" aria-label="Remove period">✖</button>
    </div>
  </div>

  <button type="button" class="add-period" id="add-period">Add another work period</button>

  <div class="workday-summary">
    <p id="current-time" class="current-time"></p>
    <p id="remaining-time" class="remaining-time"></p>
  </div>
</div>

<style>
.workday-tracker {
  max-width: 720px;
  margin: 0 auto;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  font-family: "Helvetica Neue", Arial, sans-serif;
}

.workday-tracker p {
  margin-top: 0;
  color: #333;
  line-height: 1.6;
}

.workday-periods {
  background: #f7f9fc;
  border-radius: 10px;
  border: 1px solid #e3e8f0;
  padding: 1rem;
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.period-row {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
}

.period-row:first-child {
  grid-template-columns: 1fr 1fr; /* No remove button */
}

.period-row label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: #1f2933;
}

.time-input {
  margin-top: 0.35rem;
  padding: 0.6rem 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  background-color: #fff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.time-input:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.25);
}

.add-period {
  background-color: #0ea5e9;
  color: #fff;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.add-period:hover {
  background-color: #0284c7;
  transform: translateY(-1px);
}

.remove-period {
  background: #ef4444;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  padding: 0.4rem 0.7rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.remove-period:hover {
  background: #dc2626;
}

.workday-summary {
  margin-top: 1.5rem;
  background: #eff6ff;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  border: 1px solid #bfdbfe;
}

.remaining-time {
  font-size: 1.35rem;
  font-weight: 700;
  color: #1d4ed8;
  margin-bottom: 0.25rem;
}

.current-time {
  font-weight: 600;
  color: #1f2937;
}

@media (max-width: 600px) {
  .workday-tracker {
    padding: 1rem;
  }

  .add-period {
    width: 100%;
  }
}
</style>

<script>
(function () {
  const periodsContainer = document.getElementById("workday-periods");
  const addButton = document.getElementById("add-period");
  const currentTimeEl = document.getElementById("current-time");
  const remainingEl = document.getElementById("remaining-time");

  // Create a new removable period (no headers)
  function createPeriodRow(startValue = "", endValue = "") {
    const row = document.createElement("div");
    row.className = "period-row";
    row.innerHTML = `
      <input type="time" class="time-input start" value="${startValue}" />
      <input type="time" class="time-input end" value="${endValue}" />
      <button type="button" class="remove-period" aria-label="Remove period">✖</button>
    `;
    row.querySelector(".remove-period").addEventListener("click", () => {
      row.remove();
      updateRemainingTime();
    });
    return row;
  }

  function parseTime(input) {
    if (!input || !input.value) return null;
    const [hours, minutes] = input.value.split(":").map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
    return hours * 60 + minutes;
  }

  function minutesToDuration(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const hText = hours === 1 ? "1 hour" : `${hours} hours`;
    const mText = minutes === 1 ? "1 minute" : `${minutes} minutes`;
    if (hours === 0) return mText;
    if (minutes === 0) return hText;
    return `${hText} and ${mText}`;
  }

  function updateCurrentTime(now) {
    const formatted = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
    currentTimeEl.textContent = `Current time: ${formatted}`;
  }

  function updateRemainingTime() {
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    updateCurrentTime(now);

    const rows = Array.from(periodsContainer.querySelectorAll(".period-row"));
    let upcomingMinutes = 0;

    rows.forEach((row) => {
      const start = parseTime(row.querySelector(".start"));
      const end = parseTime(row.querySelector(".end"));
      if (start === null || end === null) return;
      if (end === start) return;

      let minutesRemaining = 0;
      if (end > start) {
        if (nowMinutes <= start) minutesRemaining = end - start;
        else if (nowMinutes < end) minutesRemaining = end - nowMinutes;
      }
      if (minutesRemaining > 0) upcomingMinutes += minutesRemaining;
    });

    if (upcomingMinutes <= 0) {
      remainingEl.textContent = "Your workday is complete. Great job!";
      return;
    }

    remainingEl.textContent = `Time remaining today: ${minutesToDuration(upcomingMinutes)}`;
  }

 const defaultRemoveButton = periodsContainer.querySelector(".period-row:nth-child(2) .remove-period");
  if (defaultRemoveButton) {
    defaultRemoveButton.addEventListener("click", () => {
      defaultRemoveButton.closest(".period-row").remove();
      updateRemainingTime();
    });
  }

  periodsContainer.addEventListener("input", updateRemainingTime);

  addButton.addEventListener("click", () => {
    const newRow = createPeriodRow();
    periodsContainer.appendChild(newRow);
    updateRemainingTime();
  });

  updateRemainingTime();
  setInterval(updateRemainingTime, 60000);
})();
</script>
