/* ========== Workday timer logic ========== */
(function () {
  const periodsContainer = document.getElementById("workday-periods");
  const addButton = document.getElementById("add-period");
  const remainingEl = document.getElementById("remaining-time");
  const copyBtn = document.getElementById("copy-url-btn");
  const confirmationEl = document.getElementById("copy-confirmation");

  // ===== Helper functions =====
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
    } else {
      remainingEl.textContent =
        "Time remaining today: " + minutesToDuration(remaining);
    }
  }

  // ===== URL Parsing =====
  function loadPeriodsFromURL() {
    const params = new URLSearchParams(window.location.search);
    const periodsParam = params.get("periods");

    // Clear any existing rows
    periodsContainer.innerHTML = "";

    if (!periodsParam) {
      // Default blocks
      addPeriod("08:00", "12:00");
      addPeriod("12:30", "16:00");
      return;
    }

    const blocks = periodsParam.split(",");
    blocks.forEach((block) => {
      const [start, end] = block.split("-");
      if (start && end) addPeriod(start, end);
    });
  }

  // ===== Add / Remove =====
  function addPeriod(startVal = "", endVal = "") {
    const div = document.createElement("div");
    div.className = "period-row";
    div.innerHTML = `
      <input type="time" class="time-input start" value="${startVal}" />
      <input type="time" class="time-input end" value="${endVal}" />
      <button class="remove-period">✖</button>
    `;
    div.querySelector(".remove-period").onclick = () => div.remove();
    periodsContainer.appendChild(div);
  }

  addButton.onclick = () => addPeriod();

  // ===== Copy custom URL =====
  copyBtn.onclick = () => {
    const periods = [];
    periodsContainer.querySelectorAll(".period-row").forEach((row) => {
      const start = row.querySelector(".start").value;
      const end = row.querySelector(".end").value;
      if (start && end) periods.push(`${start}-${end}`);
    });

    const base = window.location.origin + window.location.pathname;
    const customURL = `${base}?periods=${encodeURIComponent(
      periods.join(",")
    )}`;

    navigator.clipboard
      .writeText(customURL)
      .then(() => {
        confirmationEl.classList.remove("hidden");
        confirmationEl.classList.add("show");
        setTimeout(() => {
          confirmationEl.classList.remove("show");
          setTimeout(
            () => confirmationEl.classList.add("hidden"),
            500
          );
        }, 3000);
      })
      .catch(() => alert("Could not copy URL. Please try again."));
  };

  // ===== Initialize =====
  loadPeriodsFromURL();
  setInterval(update, 60000);
  update();
})();

/* ========== Task planner (unchanged except delete button) ========== */
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

  // ✳️ Popup for adding / editing tasks (includes delete option)
    // ✳️ Popup for adding / editing tasks (live update, closes on outside click)
  function openTaskPopup(targetListId, existingTask = null, focusName = false) {
    const isNew = !existingTask;
    const task =
      existingTask ||
      (() => {
        // Create a default new task (💼 icon, light blue background)
        const t = buildTask({ icon: "💼", label: "" }, "#eff6ff");
        const targetList = document.getElementById(targetListId);
        targetList.insertBefore(t, targetList.firstChild); // add to top
        return t;
      })();

    const popup = document.createElement("div");
    popup.className = "task-popup";
    popup.innerHTML = `
      <h4>${isNew ? "Add new task" : "Edit task"}</h4>

      <div class="popup-row">
        <label for="task-name" style="font-weight:600;">Task name</label>
        <input type="text" id="task-name" value="${task.querySelector(".label").textContent}" placeholder="Task name" style="width:100%;margin-top:4px;"/>
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
        ${
          !isNew
            ? '<button class="delete-task" style="background:#ef4444;color:#fff;">🗑️ Delete</button>'
            : ""
        }
        <button class="close">Close</button>
      </div>
    `;
    document.body.appendChild(popup);

    // Focus name field
    const nameInput = popup.querySelector("#task-name");
    setTimeout(() => {
      nameInput.focus();
      nameInput.select();
    }, 50);

    // === Live updates ===
    nameInput.addEventListener("input", () => {
      task.querySelector(".label").textContent = nameInput.value;
    });

    const icons = popup.querySelectorAll(".icon-picker span");
    icons.forEach((icon) => {
      icon.onclick = () => {
        icons.forEach((i) => (i.style.outline = "none"));
        icon.style.outline = "2px solid #0ea5e9";
        task.querySelector(".icon").textContent = icon.textContent;
      };
      // highlight the current one
      if (icon.textContent === task.querySelector(".icon").textContent)
        icon.style.outline = "2px solid #0ea5e9";
    });

    const swatches = popup.querySelectorAll(".color-swatch");
    swatches.forEach((sw) => {
      const bg = window.getComputedStyle(sw).backgroundColor;
      sw.onclick = () => {
        swatches.forEach((x) => (x.style.outline = "none"));
        sw.style.outline = "3px solid #0ea5e9";
        task.style.background = bg;
      };
      // outline current color
      if (bg === window.getComputedStyle(task).backgroundColor)
        sw.style.outline = "3px solid #0ea5e9";
    });

    // === Delete ===
    const deleteBtn = popup.querySelector(".delete-task");
    if (deleteBtn) {
      deleteBtn.onclick = () => {
        if (confirm("Are you sure you want to delete this task?")) {
          task.remove();
          popup.remove();
        }
      };
    }

    // === Close on button or outside click ===
    const closePopup = () => popup.remove();

    popup.querySelector(".close").onclick = closePopup;

    document.addEventListener("click", function outsideClick(e) {
      if (!popup.contains(e.target)) {
        popup.remove();
        document.removeEventListener("click", outsideClick);
      }
    });

    // === Enter key closes popup ===
    nameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        closePopup();
      }
    });
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
      // Creates the task instantly and opens popup for live editing
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
})();
