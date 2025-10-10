---
layout: dev
title: Remaining Work Time Tracker
permalink: /dev-projects/remaining-work-time-tracker/
css: 
  - /assets/css/remaining-work-tracker.css
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

<script>
/* ========== Workday timer logic ========== */
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
    const h = Math.floor(mins / 60),
      m = mins % 60;
    return (h ? h + "h " : "") + (m ? m + "min" : "");
  }

  function update() {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    currentTimeEl.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    let lastEnd = 0,
      remaining = 0;
    periodsContainer.querySelectorAll(".period-row").forEach((row) => {
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
        remainingEl.innerHTML += `<p style='color:red;font-weight:bold'>Overtime: ${minutesToDuration(
          ot
        )}</p>`;
      }
    } else
      remainingEl.textContent =
        "Time remaining today: " + minutesToDuration(remaining);
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
    if (match)
      return { icon: ICONS[match[1].toUpperCase()], label: match[2].trim() };
    return { icon: "💼", label: text.trim() || "Untitled" };
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

  // ✳️ Unified popup for adding / editing tasks
  function openTaskPopup(targetListId, existingTask = null, focusName = false) {
    const labelText = existingTask
      ? existingTask.querySelector(".label").textContent
      : "";
    const currentIcon = existingTask
      ? existingTask.querySelector(".icon").textContent
      : "💼";
    const currentColor = existingTask
      ? window.getComputedStyle(existingTask).backgroundColor
      : "#eff6ff";

    const popup = document.createElement("div");
    popup.className = "task-popup";
    popup.innerHTML = `
      <h4>${existingTask ? "Edit task" : "Add new task"}</h4>

      <div class="popup-row">
        <label for="task-name" style="font-weight:600;">Task name</label>
        <input type="text" id="task-name" value="${labelText}" placeholder="Task name" style="width:100%;margin-top:4px;"/>
      </div>

      <div class="popup-row" style="margin-top:0.75rem;">
        <label style="font-weight:600;">Icon</label>
        <div class="icon-picker" style="margin-top:4px;">
          <span title="Home">🏠</span>
          <span title="Work">💼</span>
          <span title="Meeting">📅</span>
        </div>
      </div>

      <div class="popup-row" style="margin-top:0.75rem;">
        <label style="font-weight:600;">Color</label>
        <div class="color-picker" style="display:flex;gap:8px;flex-wrap:nowrap;margin-top:4px;align-items:center;">
          ${[
            "default",
            "red",
            "green",
            "orange",
            "yellow",
            "purple",
            "pink",
          ]
            .map(
              (c) =>
                `<div class="color-swatch color-${c}" data-color="${c}"></div>`
            )
            .join("")}
        </div>
      </div>

      <div class="popup-actions">
        <button class="apply">Apply</button>
        <button class="close">Close</button>
      </div>
    `;
    document.body.appendChild(popup);

    // Auto-focus + select text
    const nameInput = popup.querySelector("#task-name");
    if (focusName) {
      setTimeout(() => {
        nameInput.focus();
        nameInput.select();
      }, 50);
    } else {
      setTimeout(() => {
        nameInput.focus();
        nameInput.select();
      }, 50);
    }

    // Enter key triggers Apply
    popup.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        popup.querySelector(".apply").click();
      }
    });

    let selectedIcon = currentIcon || "💼";
    let selectedColor = currentColor || "#eff6ff";

    // Icon selection
    const icons = popup.querySelectorAll(".icon-picker span");
    icons.forEach((icon) => {
      if (icon.textContent === selectedIcon)
        icon.style.outline = "2px solid #0ea5e9";
      icon.onclick = () => {
        icons.forEach((i) => (i.style.outline = "none"));
        icon.style.outline = "2px solid #0ea5e9";
        selectedIcon = icon.textContent;
      };
    });

    // Color selection
    const swatches = popup.querySelectorAll(".color-swatch");
    swatches.forEach((sw) => {
      const c = sw.getAttribute("data-color");
      if (colorsEqual(c, selectedColor)) sw.style.outline = "3px solid #0ea5e9";
      sw.onclick = () => {
        swatches.forEach((x) => (x.style.outline = "none"));
        sw.style.outline = "3px solid #0ea5e9";
        selectedColor = window.getComputedStyle(sw).backgroundColor;
      };
    });

    // Apply / Close
    popup.querySelector(".apply").onclick = () => {
      const name = nameInput.value.trim() || "Untitled task";
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
    task.addEventListener("dragend", () => task.classList.remove("dragging"));
  }

  document.querySelectorAll(".task-list").forEach((list) => {
    list.addEventListener("dragover", (e) => {
      e.preventDefault();
      const dragging = document.querySelector(".dragging");
      if (!dragging) return;
      const after = getDragAfterElement(list, e.clientY);
      if (after == null) list.appendChild(dragging);
      else list.insertBefore(dragging, after);
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

  // Hide lanes by default (redundant but ensures behavior)
  board.classList.add("hidden");

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
      const t = parseTask(line);
      const li = buildTask(t);
      todo.appendChild(li);
    });

    taskInput.classList.add("hidden");
    startBtn.classList.add("hidden");
    board.classList.remove("hidden");
    dayControls.classList.remove("hidden");
  });

  laneAddBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      openTaskPopup(targetId, null, true);
    });
  });

  newDayBtn.addEventListener("click", () => {
    ["todo-list", "waiting-list", "done-list"].forEach(
      (id) => (document.getElementById(id).innerHTML = "")
    );
    board.classList.add("hidden");
    dayControls.classList.add("hidden");
    taskInput.value = "";
    taskInput.classList.remove("hidden");
    startBtn.classList.remove("hidden");
  });

  function colorsEqual(a, b) {
    const el = document.createElement("div");
    el.style.color = a;
    document.body.appendChild(el);
    const ca = getComputedStyle(el).color;
    el.style.color = b;
    const cb = getComputedStyle(el).color;
    document.body.removeChild(el);
    return ca === cb;
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        ch
      ])
    );
  }
})();
</script>
