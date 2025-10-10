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
  <p id="task-intro">Here could be your motivational or instructional text for the day.</p>

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
        <button class="lane-add" data-target="todo-list">＋</button>
      </div>
      <ul class="task-list" id="todo-list"></ul>
    </div>

    <div class="task-column" data-status="waiting">
      <div class="column-header">
        <h3>Waiting</h3>
        <button class="lane-add" data-target="waiting-list">＋</button>
      </div>
      <ul class="task-list" id="waiting-list"></ul>
    </div>

    <div class="task-column" data-status="done">
      <div class="column-header">
        <h3>Done</h3>
        <button class="lane-add" data-target="done-list">＋</button>
      </div>
      <ul class="task-list" id="done-list"></ul>
    </div>
  </div>

  <div id="day-controls" class="hidden">
    <button id="new-day" class="new-day-btn">Start a new day</button>
  </div>
</div>

<style>
/* ===== General Tracker Styling ===== */
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
  grid-template-columns: 1fr 1fr;
}

.time-input {
  margin-top: 0.35rem;
  padding: 0.6rem 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  background-color: #fff;
}

.time-input:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.25);
}

.add-period,
#start-working,
.new-day-btn {
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

.add-period:hover,
#start-working:hover,
.new-day-btn:hover {
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
}

.current-time {
  font-weight: 600;
  color: #1f2937;
}

/* ===== Task Section ===== */
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

.hidden {
  display: none;
}

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
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
}

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
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.task-item.dragging {
  opacity: 0.5;
}

.task-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 1rem 1.25rem;
  z-index: 1000;
  width: min(92vw, 420px);
}

.task-popup h4 {
  margin-top: 0;
}

.color-swatch {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #e5e7eb;
  transition: transform 0.15s ease;
}

.color-swatch:hover {
  transform: scale(1.1);
}

.icon-picker span {
  cursor: pointer;
  font-size: 1.25rem;
  margin-right: 0.4rem;
  transition: transform 0.1s ease;
}

.icon-picker span:hover {
  transform: scale(1.2);
}

.popup-actions {
  margin-top: 0.8rem;
  text-align: right;
}

.popup-actions button {
  border: none;
  border-radius: 6px;
  padding: 0.45rem 0.8rem;
  cursor: pointer;
  margin-left: 0.5rem;
}

.popup-actions .apply {
  background: #16a34a;
  color: #fff;
}

.popup-actions .close {
  background: #e5e7eb;
  color: #374151;
}

/* color palette */
.color-default { background: #eff6ff; }
.color-red     { background: #fecaca; }
.color-green   { background: #bbf7d0; }
.color-orange  { background: #fed7aa; }
.color-yellow  { background: #fef08a; }
.color-purple  { background: #e9d5ff; }
.color-pink    { background: #fbcfe8; }

.color-red:hover { background: #fca5a5; }
.color-green:hover { background: #86efac; }
.color-orange:hover { background: #fdba74; }
.color-yellow:hover { background: #fde047; }
.color-purple:hover { background: #c084fc; }
.color-pink:hover { background: #f472b6; }

.new-day-btn {
  margin-top: 1rem;
}
</style>

<script>
/* ========== Workday timer logic (same as before) ========== */
(function () {
  const periodsContainer = document.getElementById("workday-periods");
  const addButton = document.getElementById("add-period");
  const currentTimeEl = document.getElementById("current-time");
  const remainingEl = document.getElementById("remaining-time");

  function parseTime(input) {
    const [h, m] = input.value.split(":").map(Number);
    return h * 60 + m;
  }

  function minutesToDuration(mins) {
    const h = Math.floor(mins / 60), m = mins % 60;
    return (h ? h + "h " : "") + (m ? m + "min" : "");
  }

  function update() {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    currentTimeEl.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    let lastEnd = 0, remaining = 0;
    periodsContainer.querySelectorAll(".period-row").forEach(row => {
      const start = parseTime(row.querySelector(".start"));
      const end = parseTime(row.querySelector(".end"));
      if (end > lastEnd) lastEnd = end;
      if (nowMin < end && nowMin >= start) remaining += end - nowMin;
      else if (nowMin < start) remaining += end - start;
    });

    if (remaining <= 0) {
      remainingEl.innerHTML = "Your workday is complete. Great job!";
      if (nowMin > lastEnd) {
        const ot = nowMin - lastEnd;
        remainingEl.innerHTML += `<p style='color:red;font-weight:bold'>Overtime: ${minutesToDuration(ot)}</p>`;
      }
    } else remainingEl.textContent = "Time remaining today: " + minutesToDuration(remaining);
  }
  addButton.onclick = () => {
    const div = document.createElement("div");
    div.className = "period-row";
    div.innerHTML = `<input type="time" class="time-input start"/> <input type="time" class="time-input end"/> <button class="remove-period">✖</button>`;
    div.querySelector(".remove-period").onclick = () => div.remove();
    periodsContainer.appendChild(div);
  };
  setInterval(update, 60000);
  update();
})();

/* ========== Task planner ========== */
(function () {
  const startBtn = document.getElementById("start-working");
  const taskInput = document.getElementById("task-input");
  const board = document.getElementById("task-board");
  const dayControls = document.getElementById("day-controls");
  const newDayBtn = document.getElementById("new-day");
  const laneAddBtns = document.querySelectorAll(".lane-add");

  const ICONS = { H: "🏠", W: "💼", M: "📅" };

  function parseTask(text) {
    const match = text.match(/^\s*([HWM])\s*-\s*(.+)$/i);
    if (match) return { icon: ICONS[match[1].toUpperCase()], label: match[2].trim() };
    return { icon: "💼", label: text.trim() || "Untitled" }; // default work icon
  }

  function buildTask(obj, color = "#eff6ff") {
    const li = document.createElement("li");
    li.className = "task-item";
    li.draggable = true;
    li.style.background = color;
    li.innerHTML = `<span class="icon">${obj.icon}</span><span class="label">${obj.label}</span>`;
    addInteractivity(li);
    return li;
  }

  function openTaskPopup(targetListId, existingTask = null) {
    const currentColor = existingTask ? existingTask.style.backgroundColor : "#eff6ff";
    const labelText = existingTask ? existingTask.querySelector(".label").textContent : "";
    const currentIcon = existingTask ? existingTask.querySelector(".icon").textContent : "💼";

    const popup = document.createElement("div");
    popup.className = "task-popup";
    popup.innerHTML = `
      <h4>${existingTask ? "Edit task" : "Add new task"}</h4>
      <div class="popup-row">
        <input type="text" id="task-name" value="${labelText}" placeholder="Task name"/>
      </div>
      <div class="popup-row icon-picker">
        ${Object.values(ICONS).map(i => `<span>${i}</span>`).join("")}
      </div>
      <div class="popup-row color-picker">
        ${["default","red","green","orange","yellow","purple","pink"].map(c=>`<div class="color-swatch color-${c}" data-color="${c}"></div>`).join("")}
      </div>
      <div class="popup-actions">
        <button class="apply">Apply</button>
        <button class="close">Close</button>
      </div>
    `;
    document.body.appendChild(popup);

    let selectedIcon = currentIcon;
    let selectedColor = currentColor;

    popup.querySelectorAll(".icon-picker span").forEach(s => {
      s.onclick = () => { selectedIcon = s.textContent; };
    });

    popup.querySelectorAll(".color-swatch").forEach(sw => {
      sw.onclick = () => {
        popup.querySelectorAll(".color-swatch").forEach(x => x.style.outline = "none");
        sw.style.outline = "3px solid #0ea5e9";
        selectedColor = window.getComputedStyle(sw).backgroundColor;
      };
    });

    popup.querySelector(".apply").onclick = () => {
      const name = popup.querySelector("#task-name").value.trim() || "Untitled task";
      if (existingTask) {
        existingTask.querySelector(".label").textContent = name;
        existingTask.querySelector(".icon").textContent = selectedIcon;
        existingTask.style.background = selectedColor;
      } else {
        const newTask = buildTask({ icon: selectedIcon, label: name }, selectedColor);
        document.getElementById(targetListId).appendChild(newTask);
      }
      popup.remove();
    };
    popup.querySelector(".close").onclick = () => popup.remove();
  }

  function addInteractivity(task) {
    task.addEventListener("click", e => {
      if (!task.classList.contains("dragging")) openTaskPopup(task.closest(".task-list").id, task);
    });
    task.addEventListener("dragstart", e => {
      task.classList.add("dragging");
      e.dataTransfer.setData("text/plain", "");
    });
    task.addEventListener("dragend", e => task.classList.remove("dragging"));
  }

  document.querySelectorAll(".task-list").forEach(list => {
    list.addEventListener("dragover", e => {
      e.preventDefault();
      const dragging = document.querySelector(".dragging");
    if (!dragging) return;
    const after = getDragAfterElement(list, e.clientY);
    if (after == null) {
      list.appendChild(dragging);
    } else {
      list.insertBefore(dragging, after);
    }
  });
});

function getDragAfterElement(container, y) {
  const els = [...container.querySelectorAll(".task-item:not(.dragging)")];
  return els.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY, element: null }
  ).element;
}

/* ---------- Start Working: parse textarea with codes + default icon ---------- */
startBtn.addEventListener("click", () => {
  const raw = taskInput.value
    .split("\n")
    .map((t) => t.trim())
    .filter(Boolean);

  if (raw.length === 0) {
    alert("Please enter at least one task.");
    return;
  }

  const todo = document.getElementById("todo-list");
  todo.innerHTML = "";

  raw.forEach((line) => {
    // Accept H/W/M codes; default to 💼 if none
    const match = line.match(/^\s*([HWM])\s*-\s*(.+)$/i);
    let icon = "💼";
    let label = line;
    if (match) {
      const code = match[1].toUpperCase();
      label = match[2].trim();
      icon = { H: "🏠", W: "💼", M: "📅" }[code] || "💼";
    }
    const li = buildTask({ icon, label }); // default color #eff6ff inside buildTask
    todo.appendChild(li);
  });

  // show board & controls, hide input
  taskInput.classList.add("hidden");
  startBtn.classList.add("hidden");
  board.classList.remove("hidden");
  dayControls.classList.remove("hidden");
});

/* ---------- Lane “+” buttons: open same popup to add a task ---------- */
laneAddBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    openTaskPopup(targetId, null);
  });
});

/* ---------- Start a new day (no reload): clear & hide board, show textarea ---------- */
newDayBtn.addEventListener("click", () => {
  ["todo-list", "waiting-list", "done-list"].forEach((id) => {
    document.getElementById(id).innerHTML = "";
  });
  board.classList.add("hidden");
  dayControls.classList.add("hidden");
  taskInput.value = "";
  taskInput.classList.remove("hidden");
  startBtn.classList.remove("hidden");
});

/* ---------- Helpers used earlier ---------- */
function buildTask(obj, color = "#eff6ff") {
  const li = document.createElement("li");
  li.className = "task-item";
  li.draggable = true;
  li.style.background = color;
  li.innerHTML = `<span class="icon">${obj.icon}</span><span class="label">${obj.label}</span>`;
  addInteractivity(li);
  return li;
}

function addInteractivity(task) {
  task.addEventListener("click", () => {
    if (!task.classList.contains("dragging")) {
      openTaskPopup(task.closest(".task-list").id, task);
    }
  });
  task.addEventListener("dragstart", (e) => {
    task.classList.add("dragging");
    e.dataTransfer.setData("text/plain", "");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("dragging");
  });
}

function openTaskPopup(targetListId, existingTask = null) {
  const labelText = existingTask ? existingTask.querySelector(".label").textContent : "";
  const currentIcon = existingTask ? existingTask.querySelector(".icon").textContent : "💼";
  const currentColor = existingTask
    ? window.getComputedStyle(existingTask).backgroundColor
    : "#eff6ff";

  const popup = document.createElement("div");
  popup.className = "task-popup";
  popup.innerHTML = `
    <h4>${existingTask ? "Edit task" : "Add new task"}</h4>
    <div class="popup-row">
      <input type="text" id="task-name" value="${escapeHtml(labelText)}" placeholder="Task name"/>
    </div>
    <div class="popup-row">
      <div class="icon-picker" aria-label="Choose an icon">
        <span title="Home">🏠</span>
        <span title="Work">💼</span>
        <span title="Meeting">📅</span>
      </div>
    </div>
    <div class="popup-row" aria-label="Choose a color">
      <div class="color-swatch color-default" data-color="#eff6ff" title="Default"></div>
      <div class="color-swatch color-red"     data-color="#fecaca" title="Red"></div>
      <div class="color-swatch color-green"   data-color="#bbf7d0" title="Green"></div>
      <div class="color-swatch color-orange"  data-color="#fed7aa" title="Orange"></div>
      <div class="color-swatch color-yellow"  data-color="#fef08a" title="Yellow"></div>
      <div class="color-swatch color-purple"  data-color="#e9d5ff" title="Purple"></div>
      <div class="color-swatch color-pink"    data-color="#fbcfe8" title="Pink"></div>
    </div>
    <div class="popup-actions">
      <button class="apply">Apply</button>
      <button class="close">Close</button>
    </div>
  `;
  document.body.appendChild(popup);

  // selection state
  let selectedIcon = currentIcon || "💼";
  let selectedColor = currentColor || "#eff6ff";

  // highlight current color swatch
  const swatches = popup.querySelectorAll(".color-swatch");
  swatches.forEach((sw) => {
    const c = sw.getAttribute("data-color");
    if (colorsEqual(c, selectedColor)) sw.style.outline = "3px solid #0ea5e9";
    sw.onclick = () => {
      swatches.forEach((x) => (x.style.outline = "none"));
      sw.style.outline = "3px solid #0ea5e9";
      selectedColor = c;
    };
  });

  // icon picking
  popup.querySelectorAll(".icon-picker span").forEach((span) => {
    if (span.textContent === selectedIcon) span.style.outline = "2px solid #0ea5e9";
    span.onclick = () => {
      popup.querySelectorAll(".icon-picker span").forEach((s) => (s.style.outline = "none"));
      span.style.outline = "2px solid #0ea5e9";
      selectedIcon = span.textContent;
    };
  });

  // apply / close
  popup.querySelector(".apply").onclick = () => {
    const name = popup.querySelector("#task-name").value.trim() || "Untitled task";
    if (existingTask) {
      existingTask.querySelector(".label").textContent = name;
      existingTask.querySelector(".icon").textContent = selectedIcon;
      existingTask.style.background = selectedColor;
    } else {
      const task = buildTask({ icon: selectedIcon, label: name }, selectedColor);
      document.getElementById(targetListId).appendChild(task);
    }
    popup.remove();
  };
  popup.querySelector(".close").onclick = () => popup.remove();
}

/* small helpers */
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (ch) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
}
function colorsEqual(a, b) {
  // compare hex or rgb strings by drawing to a dummy element and reading computed color
  const el = document.createElement("div");
  el.style.color = a;
  document.body.appendChild(el);
  const ca = getComputedStyle(el).color;
  el.style.color = b;
  const cb = getComputedStyle(el).color;
  document.body.removeChild(el);
  return ca === cb;
}
})();
</script>
