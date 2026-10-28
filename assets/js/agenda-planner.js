(function () {
  const ICON_GRIP = '<svg width="12" height="18" viewBox="0 0 12 18" fill="currentColor" aria-hidden="true"><circle cx="3" cy="3" r="1.6"/><circle cx="9" cy="3" r="1.6"/><circle cx="3" cy="9" r="1.6"/><circle cx="9" cy="9" r="1.6"/><circle cx="3" cy="15" r="1.6"/><circle cx="9" cy="15" r="1.6"/></svg>';
  const ICON_UP = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 9l4-4 4 4"/></svg>';
  const ICON_DOWN = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 5l4 4 4-4"/></svg>';
  const ICON_X = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3.5 3.5l7 7M10.5 3.5l-7 7"/></svg>';

  const ICON_NOTE = '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2.5" y="2" width="10" height="11" rx="1.5"/><path d="M5 5.5h5M5 8h5M5 10.5h3"/></svg>';
  function confirmDelete(title, msg, okLabel) {
    return new Promise((resolve) => {
      const d = $("confirmDlg");
      $("cfTitle").textContent = title;
      $("cfMsg").textContent = msg;
      $("cfOk").textContent = okLabel;
      let settled = false;
      const finish = (v) => {
        if (settled) return;
        settled = true;
        if (d.open) d.close();
        resolve(v);
      };
      $("cfOk").onclick = () => finish(true);
      $("cfCancel").onclick = () => finish(false);
      // A close event from an earlier dialog can arrive after this one opens; ignore it while open.
      d.onclose = () => { if (!d.open) finish(false); };
      d.onclick = (e) => { if (e.target === d) finish(false); };
      if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
      $("cfCancel").focus();
    });
  }

  let nextId = 1;
  let nextColId = 2;
  const mk = (name, dur, brk, fields, notes) => ({ id: nextId++, name, dur, brk: !!brk, fields: fields || {}, notes: notes || "" });
  const sp = (v) => ({ c1: v });
  const state = {
    fmt24: false,
    isExample: true,
    columns: [{ id: "c1", name: "Speaker" }],
    sections: [
      mk("Welcome and introductions", 15, false, sp("Lead facilitator")),
      mk("Icebreaker", 15, false, sp("Co-facilitator"), "Two truths and a lie, in pairs. Each pair then introduces each other to the room."),
      mk("Session 1: Mapping the problem", 45, false, sp("Guest speaker"), "Groups map the current process on the wall, then dot-vote on the three biggest pain points.\nMaterials: sticky notes, markers, dot stickers."),
      mk("Coffee break", 15, true),
      mk("Session 2: Small-group work", 50, false, sp("Table hosts")),
      mk("Report back", 25, false, sp("Each group")),
      mk("Wrap-up and next steps", 15, false, sp("Lead facilitator"), "Recap decisions, assign an owner to each next step, quick feedback round."),
    ],
  };
  const openNotes = new Set();

  function updateExpandLabel() {
    const btn = $("toggleNotes");
    const any = state.sections.some((s) => openNotes.has(s.id));
    btn.textContent = any ? "Collapse all details" : "Expand all details";
    btn.hidden = !state.sections.length;
  }

  const $ = (id) => document.getElementById(id);
  const startEl = $("start"), endEl = $("end"), rowsEl = $("rows");

  const toMin = (v) => { if (!v) return null; const [h, m] = v.split(":").map(Number); return h * 60 + m; };
  function meeting() {
    const s = toMin(startEl.value) ?? 540;
    let e = toMin(endEl.value) ?? s;
    if (e <= s) e += 1440; // ends after midnight
    return { s, e, len: e - s };
  }
  function clock(min) {
    const m = ((min % 1440) + 1440) % 1440;
    const h = Math.floor(m / 60), mm = String(m % 60).padStart(2, "0");
    if (state.fmt24) return String(h).padStart(2, "0") + ":" + mm;
    const ap = h < 12 ? "AM" : "PM";
    return String((h % 12) || 12).padStart(2, "0") + ":" + mm + " " + ap;
  }
  function dur(min) {
    if (min < 60) return min + " min";
    return Math.floor(min / 60) + "h " + String(min % 60).padStart(2, "0") + "m";
  }

  function schedule() {
    const { s } = meeting();
    let t = s;
    return state.sections.map((sec) => { const a = t; t += sec.dur; return { a, b: t }; });
  }

  // Updates every computed number without rebuilding the inputs (keeps focus while typing).
  function refresh() {
    const m = meeting();
    const sched = schedule();
    const total = state.sections.reduce((n, x) => n + x.dur, 0);
    const agendaEnd = m.s + total;

    $("sLen").textContent = dur(m.len);
    $("sPlan").textContent = dur(total);
    $("sEnd").textContent = state.sections.length ? clock(agendaEnd) : "–";
    const pill = $("sPill");
    const diff = m.len - total;
    if (diff === 0) { pill.className = "pill ok"; pill.textContent = "Fits exactly"; }
    else if (diff > 0) { pill.className = "pill under"; pill.textContent = dur(diff) + " unplanned"; }
    else { pill.className = "pill over"; pill.textContent = "Over by " + dur(-diff); }

    // timeline
    const tl = $("timeline");
    tl.innerHTML = "";
    const scale = Math.max(m.len, total) || 1;
    state.sections.forEach((sec, i) => {
      const d = document.createElement("div");
      const late = sched[i].b > m.e;
      d.className = "seg" + (sec.brk ? " brk" : "") + (late ? " late" : "");
      d.style.flex = sec.dur + " 0 0";
      d.title = sec.name + " (" + dur(sec.dur) + ")";
      tl.appendChild(d);
    });
    if (total < m.len) { const f = document.createElement("div"); f.style.flex = (m.len - total) + " 0 0"; tl.appendChild(f); }
    if (total > m.len) {
      const mark = document.createElement("div");
      mark.className = "endmark";
      mark.style.left = (m.len / scale * 100) + "%";
      tl.appendChild(mark);
    }
    $("tlStart").textContent = clock(m.s);
    $("tlEnd").textContent = clock(m.s + scale);

    // rows
    rowsEl.querySelectorAll(".row").forEach((li, i) => {
      const { a, b } = sched[i];
      const late = b > m.e;
      li.classList.toggle("late", late);
      li.classList.toggle("brk", state.sections[i].brk);
      const t = li.querySelector(".times");
      t.innerHTML = clock(a) + " – " + clock(b) +
        (late ? '<span class="late-tag">' + (a >= m.e ? "After meeting end" : "Runs past end") + "</span>" : "");
    });
    $("endrow").textContent = state.sections.length ? clock(agendaEnd) + "  End of agenda" : "";
    $("exampleNote").hidden = !state.isExample;
    updateExpandLabel();
    scheduleShare();
  }

  function touched() { if (state.isExample) { state.isExample = false; } scheduleShare(); }

  function move(from, to) {
    if (to < 0 || to >= state.sections.length || from === to) return;
    const [item] = state.sections.splice(from, 1);
    state.sections.splice(to, 0, item);
    touched();
    render();
  }

  function gridCols() {
    const n = state.columns.length;
    return "28px 11.75rem minmax(14rem, 2fr) " + (n ? "repeat(" + n + ", minmax(9rem, 1fr)) " : "") + "4.5rem 5.25rem 62px";
  }

  function renderHead() {
    const head = $("colsHead"), table = $("table");
    const n = state.columns.length;
    table.style.setProperty("--cols", gridCols());
    table.style.setProperty("--minw", n ? (760 + n * 154) + "px" : "0px");
    head.innerHTML = '<span class="ch-fixed"></span><span class="label ch-fixed">Time</span><span class="label ch-fixed">Section</span>';
    state.columns.forEach((col, ci) => {
      const cell = document.createElement("div");
      cell.className = "ch-col";
      cell.innerHTML = '<button type="button" class="col-grip" title="Drag to move column">' + ICON_GRIP + "</button>" +
        '<input type="text" maxlength="60"><button type="button" class="icon-btn del">' + ICON_X + "</button>";
      const grip = cell.querySelector(".col-grip");
      grip.setAttribute("aria-label", "Move column " + col.name + " (drag, or use left and right arrow keys)");
      grip.addEventListener("mousedown", () => { cell.draggable = true; });
      grip.addEventListener("mouseup", () => { cell.draggable = false; });
      grip.addEventListener("keydown", (e) => {
        const to = e.key === "ArrowLeft" ? ci - 1 : e.key === "ArrowRight" ? ci + 1 : null;
        if (to === null) return;
        e.preventDefault();
        if (moveCol(ci, to)) { const g = $("colsHead").querySelectorAll(".col-grip")[to]; if (g) g.focus(); }
      });
      cell.addEventListener("dragstart", (e) => {
        colDragFrom = ci; cell.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
        try { e.dataTransfer.setData("text/plain", "col" + ci); } catch (_) {}
      });
      cell.addEventListener("dragend", () => { cell.draggable = false; cell.classList.remove("dragging"); clearColDrop(); colDragFrom = null; });
      cell.addEventListener("dragover", (e) => {
        if (colDragFrom === null) return;
        e.preventDefault();
        const r = cell.getBoundingClientRect();
        const after = e.clientX > r.left + r.width / 2;
        clearColDrop();
        cell.classList.add(after ? "drop-after" : "drop-before");
      });
      cell.addEventListener("drop", (e) => {
        if (colDragFrom === null) return;
        e.preventDefault();
        const r = cell.getBoundingClientRect();
        const after = e.clientX > r.left + r.width / 2;
        let to = ci + (after ? 1 : 0);
        if (colDragFrom < to) to -= 1;
        const from = colDragFrom;
        colDragFrom = null;
        moveCol(from, to);
      });
      const inp = cell.querySelector("input");
      inp.id = "col-" + col.id;
      inp.value = col.name;
      inp.setAttribute("aria-label", "Column name");
      inp.addEventListener("input", () => {
        col.name = inp.value;
        touched();
        rowsEl.querySelectorAll('[data-col="' + col.id + '"]').forEach((el) => {
          el.placeholder = col.name; el.setAttribute("aria-label", col.name || "Custom column");
        });
        cell.querySelector(".del").setAttribute("aria-label", "Remove column " + (col.name || ""));
      });
      const del = cell.querySelector(".del");
      del.setAttribute("aria-label", "Remove column " + col.name);
      del.title = "Remove column";
      del.addEventListener("click", async () => {
        const nm = col.name.trim() || "untitled";
        const filled = state.sections.filter((s) => (s.fields[col.id] || "").trim()).length;
        const msg = filled
          ? "The " + nm + " column and its values in " + filled + " section" + (filled === 1 ? "" : "s") + " will be removed."
          : "The " + nm + " column will be removed. It has no values yet.";
        if (!(await confirmDelete("Delete the " + nm + " column?", msg, "Delete column"))) return;
        state.columns = state.columns.filter((c) => c !== col);
        state.sections.forEach((s) => { delete s.fields[col.id]; });
        touched();
        render();
        toast("Removed the " + (col.name || "untitled") + " column.");
      });
      head.appendChild(cell);
    });
    head.insertAdjacentHTML("beforeend", '<span class="label ch-fixed">Minutes</span><span class="ch-fixed"></span><span class="ch-fixed"></span>');
  }

  let colDragFrom = null;
  function clearColDrop() { $("colsHead").querySelectorAll(".drop-before,.drop-after").forEach((el) => el.classList.remove("drop-before", "drop-after")); }
  function moveCol(from, to) {
    if (to < 0 || to >= state.columns.length || from === to) return false;
    const [c] = state.columns.splice(from, 1);
    state.columns.splice(to, 0, c);
    touched();
    render();
    return true;
  }

  function render() {
    renderHead();
    rowsEl.innerHTML = "";
    if (!state.sections.length) {
      const li = document.createElement("li");
      li.className = "empty";
      li.textContent = "No sections yet. Add your first one below and its times will appear here.";
      rowsEl.appendChild(li);
    }
    state.sections.forEach((sec, i) => {
      const li = document.createElement("li");
      li.className = "row";
      li.dataset.index = i;
      li.innerHTML =
        '<button type="button" class="handle" aria-label="Drag to reorder" title="Drag to reorder">' + ICON_GRIP + "</button>" +
        '<div class="times"></div>' +
        '<input type="text" class="name" aria-label="Section name">' +
        '<div class="dur"><input type="number" min="1" max="1440" step="1" aria-label="Duration in minutes"><span>min</span></div>' +
        '<button type="button" class="brk-toggle">Break</button>' +
        '<div class="actions">' +
          '<button type="button" class="icon-btn notes-btn">' + ICON_NOTE + "</button>" +
          '<button type="button" class="icon-btn del" aria-label="Delete section">' + ICON_X + "</button>" +
        "</div>";
      const nameIn = li.querySelector(".name");
      nameIn.id = "name-" + sec.id;
      nameIn.value = sec.name;
      nameIn.addEventListener("input", () => { sec.name = nameIn.value; touched(); refresh(); });
      const cf = document.createElement("div");
      cf.className = "custom";
      state.columns.forEach((col) => {
        const fi = document.createElement("input");
        fi.type = "text";
        fi.id = "f-" + sec.id + "-" + col.id;
        fi.dataset.col = col.id;
        fi.placeholder = col.name;
        fi.setAttribute("aria-label", col.name || "Custom column");
        fi.value = sec.fields[col.id] || "";
        fi.addEventListener("input", () => { sec.fields[col.id] = fi.value; touched(); });
        cf.appendChild(fi);
      });
      nameIn.after(cf);
      const durIn = li.querySelector(".dur input");
      durIn.id = "dur-" + sec.id;
      durIn.value = sec.dur;
      durIn.addEventListener("input", () => {
        const v = Math.round(Number(durIn.value));
        if (Number.isFinite(v) && v >= 1) { sec.dur = Math.min(v, 1440); touched(); refresh(); }
      });
      durIn.addEventListener("blur", () => { durIn.value = sec.dur; });
      const bt = li.querySelector(".brk-toggle");
      bt.setAttribute("aria-pressed", sec.brk ? "true" : "false");
      bt.addEventListener("click", () => {
        sec.brk = !sec.brk; bt.setAttribute("aria-pressed", sec.brk ? "true" : "false"); touched(); refresh();
      });
      li.querySelector(".del").addEventListener("click", async () => {
        const label = sec.name.trim() ? "“" + sec.name.trim() + "”" : "This section";
        const ok = await confirmDelete("Delete this section?", label + " (" + dur(sec.dur) + ") will be removed and the times after it will shift earlier.", "Delete section");
        if (!ok) return;
        const idx = state.sections.indexOf(sec);
        if (idx < 0) return;
        state.sections.splice(idx, 1); openNotes.delete(sec.id); touched(); render();
      });

      // details
      const prev = document.createElement("div");
      prev.className = "preview";
      const nw = document.createElement("div");
      nw.className = "notes";
      const ta = document.createElement("textarea");
      ta.className = "details-in";
      ta.id = "notes-" + sec.id;
      ta.placeholder = "What this section covers: goals, activities, materials";
      ta.setAttribute("aria-label", "Details for " + (sec.name || "this section"));
      ta.value = sec.notes;
      nw.appendChild(ta);
      li.appendChild(prev);
      li.appendChild(nw);
      const nb = li.querySelector(".notes-btn");
      const grow = () => { ta.style.height = "auto"; ta.style.height = (ta.scrollHeight + 2) + "px"; };
      const syncNotes = () => {
        const open = openNotes.has(sec.id);
        const has = !!sec.notes.trim();
        nw.hidden = !open;
        prev.hidden = open || !has;
        prev.textContent = has ? sec.notes.trim().split("\n")[0] : "";
        nb.classList.toggle("has-notes", has);
        nb.setAttribute("aria-expanded", String(open));
        nb.setAttribute("aria-label", (open ? "Hide" : "Show") + " details");
        nb.title = has ? (open ? "Hide details" : "Show details") : "Add details";
      };
      ta.addEventListener("input", () => { sec.notes = ta.value; touched(); grow(); syncNotes(); });
      nb.addEventListener("click", () => {
        if (openNotes.has(sec.id)) openNotes.delete(sec.id); else openNotes.add(sec.id);
        syncNotes();
        updateExpandLabel();
        if (openNotes.has(sec.id)) { grow(); ta.focus(); }
      });
      syncNotes();

      // drag and drop; arrow keys on the focused handle also reorder
      const handle = li.querySelector(".handle");
      handle.addEventListener("mousedown", () => { li.draggable = true; });
      handle.addEventListener("mouseup", () => { li.draggable = false; });
      handle.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp") { e.preventDefault(); move(i, i - 1); focusRow(i - 1, ".handle"); }
        if (e.key === "ArrowDown") { e.preventDefault(); move(i, i + 1); focusRow(i + 1, ".handle"); }
      });
      li.addEventListener("dragstart", (e) => {
        dragFrom = i; li.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
        try { e.dataTransfer.setData("text/plain", String(i)); } catch (_) {}
      });
      li.addEventListener("dragend", () => { li.draggable = false; li.classList.remove("dragging"); clearDrop(); dragFrom = null; });
      li.addEventListener("dragover", (e) => {
        if (dragFrom === null) return;
        e.preventDefault();
        const r = li.getBoundingClientRect();
        const after = e.clientY > r.top + r.height / 2;
        clearDrop();
        li.classList.add(after ? "drop-after" : "drop-before");
      });
      li.addEventListener("drop", (e) => {
        if (dragFrom === null) return;
        e.preventDefault();
        const r = li.getBoundingClientRect();
        const after = e.clientY > r.top + r.height / 2;
        let to = i + (after ? 1 : 0);
        if (dragFrom < to) to -= 1;
        const from = dragFrom;
        dragFrom = null;
        move(from, to);
      });
      rowsEl.appendChild(li);
      if (openNotes.has(sec.id)) grow();
    });
    refresh();
  }

  let dragFrom = null;
  function clearDrop() { rowsEl.querySelectorAll(".drop-before,.drop-after").forEach((el) => el.classList.remove("drop-before", "drop-after")); }
  function focusRow(i, sel) {
    const li = rowsEl.children[Math.max(0, Math.min(i, rowsEl.children.length - 1))];
    const b = li && li.querySelector(sel);
    if (b && !b.disabled) b.focus(); else if (li) { const h = li.querySelector(".handle"); if (h) h.focus(); }
  }

  $("addForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("newName").value.trim();
    const d = Math.round(Number($("newDur").value));
    const err = $("addErr");
    if (!name) { err.textContent = "Give the section a name so it shows on the run sheet."; err.hidden = false; $("newName").focus(); return; }
    if (!Number.isFinite(d) || d < 1) { err.textContent = "Enter a duration of at least 1 minute."; err.hidden = false; $("newDur").focus(); return; }
    err.hidden = true;
    state.sections.push(mk(name, Math.min(d, 1440), $("newBrk").checked, {}, $("newNotes").value.trim()));
    touched();
    $("newName").value = ""; $("newBrk").checked = false; $("newNotes").value = "";
    render();
    $("newName").focus();
  });

  $("clearAll").addEventListener("click", () => {
    if (!state.sections.length && !state.columns.length) { toast("The agenda is already empty."); return; }
    const saved = { sections: state.sections, columns: state.columns, isExample: state.isExample };
    state.sections = []; state.columns = []; state.isExample = false;
    render();
    $("newName").focus();
    toast("Agenda cleared.", false, "Undo", () => {
      state.sections = saved.sections; state.columns = saved.columns; state.isExample = saved.isExample;
      render();
      toast("Agenda restored.");
    });
  });

  $("toggleNotes").addEventListener("click", () => {
    const any = state.sections.some((s) => openNotes.has(s.id));
    if (any) openNotes.clear(); else state.sections.forEach((s) => openNotes.add(s.id));
    render();
  });

  $("addCol").addEventListener("click", () => {
    const col = { id: "c" + nextColId++, name: "New column" };
    state.columns.push(col);
    touched();
    render();
    const inp = $("col-" + col.id);
    if (inp) { inp.focus(); inp.select(); }
  });

  startEl.addEventListener("input", refresh);
  endEl.addEventListener("input", refresh);
  function setFmt(is24) {
    state.fmt24 = is24;
    $("fmt12").setAttribute("aria-pressed", String(!is24));
    $("fmt24").setAttribute("aria-pressed", String(is24));
    refresh();
  }
  $("fmt12").addEventListener("click", () => setFmt(false));
  $("fmt24").addEventListener("click", () => setFmt(true));

  // ---------- Export / import ----------
  const toastEl = $("toast"), panel = $("pastePanel"), box = $("pasteBox");
  let toastTimer = null;
  function toast(msg, bad, actionLabel, action) {
    toastEl.textContent = msg;
    toastEl.className = "toast" + (bad ? " bad" : "");
    if (actionLabel) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "linkish";
      b.style.marginLeft = "10px";
      b.textContent = actionLabel;
      b.addEventListener("click", () => { toastEl.hidden = true; action(); });
      toastEl.appendChild(b);
    }
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.hidden = true; }, actionLabel ? 10000 : bad ? 7000 : 4000);
  }

  function serialize() {
    const colNames = [];
    state.columns.forEach((c) => {
      const base = c.name.trim() || "Untitled";
      let k = base, i = 2;
      while (colNames.includes(k)) k = base + " (" + i++ + ")";
      colNames.push(k);
    });
    return JSON.stringify({
      type: "workshop-agenda",
      version: 2,
      exported: new Date().toISOString(),
      title: $("meetingTitle").value,
      date: $("meetingDate").value,
      start: startEl.value,
      end: endEl.value,
      clock: state.fmt24 ? "24h" : "12h",
      columns: colNames,
      sections: state.sections.map((s) => {
        const details = {};
        state.columns.forEach((c, j) => { details[colNames[j]] = s.fields[c.id] || ""; });
        return { name: s.name, minutes: s.dur, break: s.brk, description: s.notes || "", details };
      }),
    }, null, 2);
  }

  function load(text) {
    let d;
    try { d = JSON.parse(text); } catch (_) { throw new Error("That isn't valid agenda data. Use a .json file exported from this planner."); }
    const list = Array.isArray(d) ? d : d && d.sections;
    if (!Array.isArray(list)) throw new Error("No sections found. Use a .json file exported from this planner.");
    const timeOk = (v) => typeof v === "string" && /^\d{2}:\d{2}$/.test(v);
    const colNames = (!Array.isArray(d) && Array.isArray(d.columns)) ? d.columns.map((c) => String(c)) : [];
    const cols = colNames.map((n) => ({ id: "c" + nextColId++, name: n.slice(0, 60) }));
    const secs = [];
    for (const s of list) {
      const mins = Math.round(Number(s && (s.minutes ?? s.duration ?? s.dur)));
      if (!Number.isFinite(mins) || mins < 1) throw new Error("A section is missing a valid number of minutes.");
      const fields = {};
      const det = (s.details && typeof s.details === "object") ? s.details : {};
      cols.forEach((c, j) => { const v = det[colNames[j]]; if (v != null && v !== "") fields[c.id] = String(v).slice(0, 500); });
      const notes = (typeof s.description === "string") ? s.description.slice(0, 5000) : "";
      secs.push(mk(String((s.name ?? s.title ?? "Untitled section")).slice(0, 200), Math.min(mins, 1440), s.break ?? s.brk, fields, notes));
    }
    state.columns = cols;
    if (!Array.isArray(d)) {
      if (timeOk(d.start)) startEl.value = d.start;
      if (timeOk(d.end)) endEl.value = d.end;
      if (typeof d.title === "string") $("meetingTitle").value = d.title.slice(0, 120);
      if (typeof d.date === "string") $("meetingDate").value = /^\d{4}-\d{2}-\d{2}$/.test(d.date) ? d.date : "";
      if (d.clock === "24h" || d.clock === "12h") {
        state.fmt24 = d.clock === "24h";
        $("fmt12").setAttribute("aria-pressed", String(!state.fmt24));
        $("fmt24").setAttribute("aria-pressed", String(state.fmt24));
      }
    }
    state.sections = secs;
    state.isExample = false;
    render();
    return secs.length;
  }

  function fileName() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, "0");
    return "workshop-agenda-" + d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + ".json";
  }

  function openPanel(mode, text) {
    panel.hidden = false;
    $("pasteLoad").hidden = mode !== "import";
    $("pasteCopy").hidden = mode !== "export";
    $("pasteFile").hidden = mode !== "import";
    $("pasteHelp").textContent = mode === "export"
      ? "Saving files isn't available in this view. Copy this text and keep it in a note or a .json file; paste it back with Import later."
      : "Paste agenda data you exported earlier, or choose a .json file.";
    box.value = text || "";
    box.readOnly = mode === "export";
    box.focus();
    if (mode === "export") box.select();
  }

  $("exportBtn").addEventListener("click", () => {
    const text = serialize();
    try {
      const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName();
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      panel.hidden = true;
      toast("Agenda exported. Use Import to load it back any time.");
    } catch (_) {
      openPanel("export", text);
    }
  });

  $("importBtn").addEventListener("click", () => { $("importFile").click(); openPanel("import"); });
  $("pasteFile").addEventListener("click", () => $("importFile").click());
  $("importFile").addEventListener("change", (e) => {
    const f = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try { const n = load(String(r.result)); panel.hidden = true; toast("Imported " + n + " section" + (n === 1 ? "" : "s") + " from " + f.name + "."); }
      catch (err) { toast(err.message, true); }
    };
    r.onerror = () => toast("Couldn't read that file. Try choosing it again.", true);
    r.readAsText(f);
  });
  $("pasteLoad").addEventListener("click", () => {
    if (!box.value.trim()) { toast("Paste your exported agenda data into the box first.", true); box.focus(); return; }
    try { const n = load(box.value); panel.hidden = true; toast("Imported " + n + " section" + (n === 1 ? "" : "s") + "."); }
    catch (err) { toast(err.message, true); }
  });
  $("pasteCopy").addEventListener("click", () => {
    const done = () => toast("Copied. Paste it somewhere safe.");
    try {
      navigator.clipboard.writeText(box.value).then(done, () => { box.select(); toast("Text selected. Press Ctrl+C (or Cmd+C) to copy."); });
    } catch (_) { box.select(); toast("Text selected. Press Ctrl+C (or Cmd+C) to copy."); }
  });
  $("pasteClose").addEventListener("click", () => { panel.hidden = true; });

  // ---------- Shareable agenda ----------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let shareRaf = 0;
  function scheduleShare() {
    const p = $("sharePanel");
    if (!p || p.hidden) return;
    cancelAnimationFrame(shareRaf);
    shareRaf = requestAnimationFrame(renderPaper);
  }

  function buildShare() {
    const m = meeting(), sched = schedule();
    const title = $("meetingTitle").value.trim();
    const dateTxt = fmtDate($("meetingDate").value);
    const withD = $("shareDetails").checked;
    const withDur = $("shareDur").checked;
    const F = "font-family:Calibri,Arial,sans-serif;font-size:11pt;";
    const cell = "border:1px solid #bfbfbf;padding:6px 10px;vertical-align:top;" + F;
    const th = cell + "background:#1f3a8a;color:#ffffff;font-weight:bold;text-align:left;";
    const range = clock(m.s) + " – " + clock(m.e);
    const when = (dateTxt ? dateTxt + " · " : "") + range + " (" + dur(m.len) + ")";
    let h = "";
    if (title) h += '<p style="' + F + 'font-size:16pt;font-weight:bold;color:#1f2937;margin:0 0 4pt 0;">' + esc(title) + "</p>";
    h += '<p style="' + F + 'color:#4b5563;margin:0 0 10pt 0;">' + esc(when) + "</p>";
    h += '<table style="border-collapse:collapse;width:100%;" cellpadding="0" cellspacing="0"><thead><tr>';
    h += '<th style="' + th + 'white-space:nowrap;">Time</th>';
    if (withDur) h += '<th style="' + th + 'white-space:nowrap;">Duration</th>';
    h += '<th style="' + th + '">Section</th>';
    state.columns.forEach((c) => { h += '<th style="' + th + '">' + esc(c.name || "") + "</th>"; });
    h += "</tr></thead><tbody>";
    const lines = [];
    if (title) lines.push(title);
    lines.push(when, "");
    state.sections.forEach((s, i) => {
      const bg = s.brk ? "background:#f3f4f6;" : "";
      const t = clock(sched[i].a) + " – " + clock(sched[i].b);
      const notes = withD ? s.notes.trim() : "";
      h += "<tr>";
      h += '<td style="' + cell + bg + 'white-space:nowrap;">' + esc(t) + "</td>";
      if (withDur) h += '<td style="' + cell + bg + 'white-space:nowrap;">' + esc(dur(s.dur)) + "</td>";
      h += '<td style="' + cell + bg + '">' + (s.brk ? "<i>" + esc(s.name) + "</i>" : "<b>" + esc(s.name) + "</b>");
      if (notes) h += '<br><span style="color:#4b5563;">' + esc(notes).replace(/\n/g, "<br>") + "</span>";
      h += "</td>";
      state.columns.forEach((c) => { h += '<td style="' + cell + bg + '">' + esc(s.fields[c.id] || "") + "</td>"; });
      h += "</tr>";

      lines.push(t + (withDur ? " (" + dur(s.dur) + ")" : "") + "   " + s.name + (s.brk ? " (break)" : ""));
      const extras = state.columns.filter((c) => (s.fields[c.id] || "").trim()).map((c) => (c.name || "Info") + ": " + s.fields[c.id].trim());
      if (extras.length) lines.push("      " + extras.join(", "));
      if (notes) notes.split("\n").forEach((l) => lines.push("      " + l));
      lines.push("");
    });
    h += "</tbody></table>";
    return { html: h, text: lines.join("\n").trim() + "\n" };
  }

  function renderPaper() {
    const paper = $("paper");
    if (!state.sections.length) { paper.innerHTML = '<p style="margin:0;color:#6b7280;">Add at least one section to build the agenda.</p>'; return; }
    paper.innerHTML = buildShare().html;
  }

  let shareTimer = null;
  function shareMsg(msg, bad) {
    const el = $("shareStatus");
    el.textContent = msg; el.className = "share-status" + (bad ? " bad" : ""); el.hidden = false;
    clearTimeout(shareTimer);
    shareTimer = setTimeout(() => { el.hidden = true; }, 6000);
  }

  function selectNode(node) {
    const sel = window.getSelection(); const r = document.createRange();
    r.selectNodeContents(node); sel.removeAllRanges(); sel.addRange(r);
    return sel;
  }

  function fmtDate(v) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v || "")) return "";
    const [y, mo, d] = v.split("-").map(Number);
    return new Date(y, mo - 1, d).toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  }
  $("meetingTitle").addEventListener("input", renderPaper);
  $("meetingDate").addEventListener("input", renderPaper);
  $("meetingDate").addEventListener("change", renderPaper);
  $("shareDetails").addEventListener("change", renderPaper);
  $("shareDur").addEventListener("change", renderPaper);

  $("copyRich").addEventListener("click", async () => {
    if (!state.sections.length) { shareMsg("Add at least one section first.", true); return; }
    renderPaper();
    const { html, text } = buildShare();
    try {
      if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
        await navigator.clipboard.write([new ClipboardItem({
          "text/html": new Blob(["<html><body>" + html + "</body></html>"], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" }),
        })]);
        shareMsg("Copied. Paste it into Word or your Outlook invite.");
        return;
      }
    } catch (_) {}
    const sel = selectNode($("paper"));
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (_) {}
    if (ok) { sel.removeAllRanges(); shareMsg("Copied. Paste it into Word or your Outlook invite."); }
    else shareMsg("The agenda is selected. Press Ctrl+C (Cmd+C on Mac) to copy it.");
  });


  render();
})();
