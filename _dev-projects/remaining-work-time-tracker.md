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

<!-- ===== Task Planning Section ===== -->
<div class="task-section">
  <p id="task-intro">
    Here could be your motivational or instructional text for the day.
  </p>

  <textarea
    id="task-input"
    placeholder="Enter your planned tasks, one per line (use codes like 'H - Task', 'W - Task', 'M - Task')"
    rows="10"
  ></textarea>

  <button id="start-working">Start working</button>

  <div id="task-board" class="hidden">
    <div class="task-column" data-status="todo">
      <div class="column-header">
        <h3>Todo</h3>
        <button class="lane-add" data-target="todo-list" aria-label="Add task to Todo">＋</button>
      </div>
      <ul class="task-list" id="todo-list"></ul>
    </div>

    <div class="task-column" data-status="waiting">
      <div class="column-header">
        <h3>Waiting</h3>
        <button class="lane-add" data-target="waiting-list" aria-label="Add task to Waiting">＋</button>
      </div>
      <ul class="task-list" id="waiting-list"></ul>
    </div>

    <div class="task-column" data-status="done">
      <div class="column-header">
        <h3>Done</h3>
        <button class="lane-add" data-target="done-list" aria-label="Add task to Done">＋</button>
      </div>
      <ul class="task-list" id="done-list"></ul>
    </div>
  </div>

  <div id="day-controls" class="hidden">
    <button id="new-day" class="new-day-btn">Start a new day</button>
  </div>
</div>

<style>
/* === Layout and Styling === */
.workday-tracker {
  max-width: 920px;
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

/* === Task Planner Section === */
.task-section {
  max-width: 920px;
  margin: 2rem auto 3rem;
  background: #f9fafb;
  padding: 1.25rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}

#task-input {
  width: 100%;
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  margin-top: 0.75rem;
  font-family: inherit;
  resize: vertical;
}

#start-working {
  margin-top: 1rem;
  background-color: #16a34a;
  color: white;
  font-weight: 600;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

#start-working:hover {
  background-color: #15803d;
}

.hidden { display: none; }

#task-board {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.task-column {
  flex: 1;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  min-height: 360px;
}

.column-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.column-header h3 {
  margin: 0;
  color: #1f2937;
  text-align: center;
}

.lane-add {
  position: absolute;
  right: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: #0ea5e9;
  color: #fff;
  font-size: 1.25rem;
  line-height: 1;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
}

.lane-add:hover { background: #0284c7; }

.task-list {
  flex-grow: 1;
  list-style: none;
  margin: 0;
  padding: 0.5rem;
  min-height: 290px;
}

.task-item {
  background: #eff6ff;
  margin-bottom: 0.5rem;
  padding: 0.6rem;
  border-radius: 6px;
  cursor: grab;
  border: 1px solid #bfdbfe;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.task-item .icon {
  font-size: 1.1rem;
}

.task-item .label {
  flex: 1;
}

.task-item.dragging { opacity: 0.5; }
.task-item:hover { background: #dbeafe; }

/* Popup */
.task-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.20);
  padding: 1rem 1.25rem;
  z-index: 1000;
  width: min(92vw, 420px);
}

.task-popup h4 {
  margin: 0 0 0.5rem;
}

.popup-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.popup-row input[type="text"] {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}

.popup-row input[type="color"] {
  width: 44px;
  height: 36px;
  border: none;
  background: transparent;
  cursor: pointer;
}

.popup-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.popup-actions button {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.popup-actions .todo    { background-color: #3b82f6; color: white; }
.popup-actions .waiting { background-color: #f59e0b; color: white; }
.popup-actions .done    { background-color: #10b981; color: white; }
.popup-actions .apply   { background-color: #16a34a; color: white; margin-left: auto; }
.popup-actions .close   { background-color: #e5e7eb; color: #374151; }

/* Day controls */
#day-controls {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.new-day-btn {
  background: #6b7280;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  cursor: pointer;
}

.new-day-btn:hover { background: #4b5563; }

@media (max-width: 700px) {
  #task-board { flex-direction: column; }
}
</style>

<script>
/* ===================== Workday Time Logic (incl. Overtime) ===================== */
(function () {
  const periodsContainer = document.getElementById("workday-periods");
  const addButton = document.getElementById("add-period");
  const currentTimeEl = document.getElementById("current-time");
  const remainingEl = document.getElementById("remaining-time");

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
      hour: "2-digit", minute: "2-digit", hour12: true
    });
    currentTimeEl.textContent = `Current time: ${formatted}`;
  }

  function updateRemainingTime() {
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    updateCurrentTime(now);

    const rows = Array.from(periodsContainer.querySelectorAll(".period-row"));
    let upcomingMinutes = 0;
    let lastEndTime = 0;

    rows.forEach((row) => {
      const start = parseTime(row.querySelector(".start"));
      const end = parseTime(row.querySelector(".end"));
      if (start === null || end === null) return;
      if (end === start) return;
      if (end > lastEndTime) lastEndTime = end;

      let minutesRemaining = 0;
      if (end > start) {
        if (nowMinutes <= start) minutesRemaining = end - start;
        else if (nowMinutes < end) minutesRemaining = end - nowMinutes;
      }
      if (minutesRemaining > 0) upcomingMinutes += minutesRemaining;
    });

    if (upcomingMinutes <= 0) {
      remainingEl.innerHTML = "Your workday is complete. Great job!";
      if (lastEndTime && nowMinutes > lastEndTime) {
        const overtime = nowMinutes - lastEndTime;
        const overtimeText = minutesToDuration(overtime);
        const overtimeEl = document.createElement("p");
        overtimeEl.style.color = "red";
        overtimeEl.style.fontWeight = "bold";
        overtimeEl.textContent = `Overtime: ${overtimeText}`;
        remainingEl.appendChild(overtimeEl);
      }
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

/* ===================== Task Planner & Board ===================== */
(function () {
  const startBtn   = document.getElementById("start-working");
  const taskInput  = document.getElementById("task-input");
  const board      = document.getElementById("task-board");
  const dayControls = document.getElementById("day-controls");
  const newDayBtn  = document.getElementById("new-day");
  const columns    = document.querySelectorAll(".task-list");
  const laneAddBtns= document.querySelectorAll(".lane-add");
  let dragged = null;

  const ICONS = {
    H: "🏠",
    W: "💼",
    M: "📅",
    NONE: ""
  };

  function parseCodedTask(text) {
    // Accept codes like "H - Task", "W - Something", "M - Meeting Title"
    const codeMatch = text.match(/^\s*([HWM])\s*-\s*(.+)$/i);
    if (codeMatch) {
      const code = codeMatch[1].toUpperCase();
      const label = codeMatch[2].trim();
      return { icon: ICONS[code] || ICONS.NONE, label };
    }
    return { icon: ICONS.NONE, label: text.trim() };
  }

  function buildTaskElement(rawText, bgColor="") {
    const { icon, label } = parseCodedTask(rawText);
    const li = document.createElement("li");
    li.className = "task-item";
    li.setAttribute("draggable", "true");
    if (bgColor) li.style.background = bgColor;

    // Structure: [icon span] [label span]
    const iconSpan = document.createElement("span");
    iconSpan.className = "icon";
    iconSpan.textContent = icon;

    const labelSpan = document.createElement("span");
    labelSpan.className = "label";
    labelSpan.textContent = label || "Untitled task";

    li.appendChild(iconSpan);
    li.appendChild(labelSpan);

    addTaskInteractivity(li);
    return li;
  }

  function createPopupForTask(taskEl) {
    const currentListId = taskEl.closest(".task-list").id;
    const notIn = ["todo-list", "waiting-list", "done-list"].filter(id => id !== currentListId);

    const labelText = taskEl.querySelector(".label").textContent;
    const currentBg = rgbToHex(window.getComputedStyle(taskEl).backgroundColor);

    const popup = document.createElement("div");
    popup.className = "task-popup";
    popup.innerHTML = `
      <h4>Edit task</h4>
      <div class="popup-row">
        <label for="rename-input" style="min-width:90px;">Rename</label>
        <input id="rename-input" type="text" value="${escapeHtml(labelText)}" />
      </div>
      <div class="popup-row">
        <label for="color-input" style="min-width:90px;">Colour</label>
        <input id="color-input" type="color" value="${currentBg}" />
      </div>
      <div class="popup-actions">
        <span style="align-self:center;">Move to:</span>
        ${notIn.map(id => {
          const cls = id.replace("-list", "");
          const text = cls.charAt(0).toUpperCase() + cls.slice(1);
          return `<button class="${cls}" data-target="${id}">${text}</button>`;
        }).join("")}
        <button class="apply">Apply</button>
        <button class="close">Close</button>
      </div>
    `;
    document.body.appendChild(popup);

    // Move handlers
    popup.querySelectorAll("[data-target]").forEach(btn => {
      btn.addEventListener("click", () => {
        document.getElementById(btn.getAttribute("data-target")).appendChild(taskEl);
      });
    });

    // Apply rename/color
    popup.querySelector(".apply").addEventListener("click", () => {
      const newName = popup.querySelector("#rename-input").value.trim() || "Untitled task";
      const newColor = popup.querySelector("#color-input").value;
      taskEl.querySelector(".label").textContent = newName;
      taskEl.style.background = newColor;
      closePopup();
    });

    popup.querySelector(".close").addEventListener("click", closePopup);

    function closePopup() {
      if (popup && popup.parentNode) popup.parentNode.removeChild(popup);
    }
  }

  function rgbToHex(rgb) {
    // Converts "rgb(r, g, b)" to "#rrggbb"
    const m = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return "#eff6ff"; // default card color
    const r = Number(m[1]).toString(16).padStart(2, "0");
    const g = Number(m[2]).toString(16).padStart(2, "0");
    const b = Number(m[3]).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }

  function addTaskInteractivity(taskEl) {
    // Click → open popup to rename / recolor / move
    taskEl.addEventListener("click", (e) => {
      // Avoid click firing when dragging
      if (taskEl.classList.contains("dragging")) return;
      createPopupForTask(taskEl);
    });

    // Drag & drop
    taskEl.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", "");
      taskEl.classList.add("dragging");
      dragged = taskEl;
    });
    taskEl.addEventListener("dragend", () => {
      taskEl.classList.remove("dragging");
      dragged = null;
    });
  }

  // Column dragover logic (reorder within/between)
  columns.forEach((col) => {
    col.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterEl = getDragAfterElement(col, e.clientY);
      if (!dragged) return;
      if (afterEl == null) {
        col.appendChild(dragged);
      } else {
        col.insertBefore(dragged, afterEl);
      }
    });
  });

  function getDragAfterElement(container, y) {
    const others = [...container.querySelectorAll(".task-item:not(.dragging)")];
    return others.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  // Start working: parse textarea into tasks
  startBtn.addEventListener("click", () => {
    const tasks = taskInput.value
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

    if (tasks.length === 0) {
      alert("Please enter at least one task.");
      return;
    }

    // Build cards in TODO
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    tasks.forEach((t) => {
      todoList.appendChild(buildTaskElement(t));
    });

    // Show board + day controls, hide input
    taskInput.classList.add("hidden");
    startBtn.classList.add("hidden");
    board.classList.remove("hidden");
    dayControls.classList.remove("hidden");
  });

  // Lane + buttons: quick add task to a lane
  laneAddBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const text = prompt("New task name (use codes like 'H - ...', 'W - ...', 'M - ...'):");
      if (text !== null) {
        const trimmed = text.trim();
        if (trimmed) {
          const el = buildTaskElement(trimmed);
          document.getElementById(targetId).appendChild(el);
        }
      }
    });
  });

  // Start a new day: clear board, hide it, show textarea again (no reload)
  newDayBtn.addEventListener("click", () => {
    ["todo-list", "waiting-list", "done-list"].forEach(id => {
      document.getElementById(id).innerHTML = "";
    });
    board.classList.add("hidden");
    dayControls.classList.add("hidden");
    taskInput.value = "";
    taskInput.classList.remove("hidden");
    startBtn.classList.remove("hidden");
    // (Time periods at the top remain untouched)
  });

  // HTML escape for safe injection into value=""
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (ch) =>
      ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[ch])
    );
  }
})();
</script>
