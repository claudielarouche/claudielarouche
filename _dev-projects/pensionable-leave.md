---
layout: dev
title: LWOP pensionable limit calculator
---

# LWOP pensionable limit calculator

## Summary and references

The public service pension guidance describes an Income Tax Act driven limit of up to five cumulative years of LWOP that can be counted as pensionable, plus up to three additional years for parenting related LWOP, limited to one year per child taken within one year of birth or adoption. :contentReference[oaicite:0]{index=0}

Read more  
[Leave without pay information package](https://www.canada.ca/en/public-services-procurement/services/pay-pension/public-service-pension-plan/information-packages-kits/leave-without-pay.html) :contentReference[oaicite:1]{index=1}  
[Public service pensionable service](https://www.canada.ca/en/treasury-board-secretariat/services/pension-plan/plan-information/public-service-pensionable-service.html) :contentReference[oaicite:2]{index=2}  
[Income Tax Act](https://laws.justice.gc.ca/eng/acts/I-3.3/)

Important note  
This page is a planning calculator. It does not validate whether a given leave period meets the eligibility rules. You must classify your leave blocks correctly.

<div id="lwop-tool">

<h2>Part 1: Maternity and parental bucket (3 years)</h2>

<p>
How many children did you take maternity and or parental leave for
</p>

<p>
<label for="childrenCount">Number of children</label><br>
<input id="childrenCount" type="number" min="0" max="99" value="0">
</p>

<p>
If you enter more than 3, the extra children may draw from the five year bucket depending on the rules that apply to your situation. This tool will create one extra line in Part 2 as a reminder.
</p>

<div id="part1Container" aria-live="polite"></div>

<p><strong>Part 1 totals</strong></p>
<div id="part1Totals"></div>

<hr>

<h2>Part 2: LWOP bucket (5 years)</h2>

<p>
Use this section for LWOP and LIA. You can also use it for maternity or parental time that you believe should count against the five year bucket.
</p>

<div id="part2Container" aria-live="polite"></div>

<p><strong>Part 2 totals</strong></p>
<div id="part2Totals"></div>

<hr>

<h2>Export and import</h2>

<p>
Export downloads a JSON file. Import loads a JSON file you previously exported.
</p>

<p>
<button type="button" id="exportBtn">Export</button>
<button type="button" id="importBtn">Import</button>
<input type="file" id="importFileInput" accept=".json,application/json" style="display:none">
</p>

<hr>

</div>

## Exact math used

### Caps used by this tool

Part 1 cap is 3 times 365 calendar days, which equals 1095 days.  
Part 2 cap is 5 times 365 calendar days, which equals 1825 days.

This tool uses 365 day years for the caps because the limit is described in years and users plan using dates. :contentReference[oaicite:3]{index=3}

### How day counts work

1. Each line produces a set of calendar days from Start date to End date inclusive.
2. Each day is multiplied by FTE percent divided by 100.
3. Within each part, if multiple lines include the same calendar day, that day is counted once using the highest FTE percent for that day.
4. Totals for a part are the sum of the unique day values in that part.

### How Part 1 is structured

When you enter a number of children, the tool creates up to 3 child lines.

Each child line has a per line guideline of 365 days. If a single line exceeds 365 days, the row is flagged.

The tool does not validate the “within one year of birth or adoption” requirement or the “one year per child” eligibility timing. You must ensure your entries meet the eligibility requirements described in the pension guidance. :contentReference[oaicite:4]{index=4}

### How Part 2 is structured

Part 2 totals LWOP and LIA lines into the 1825 day cap.

### About double counting across parts

The tool does not attempt to prevent the same date from being entered in both parts. If you enter the same date in both parts, it will be counted in both totals.

<script>
(function () {
  "use strict";

  var CAP_PART1 = 365 * 3; // 1095
  var CAP_PART2 = 365 * 5; // 1825
  var PER_CHILD_GUIDE = 365; // row level warning only
  var MAX_CHILD_LINES = 3;

  var childrenCountEl = document.getElementById("childrenCount");

  var part1Container = document.getElementById("part1Container");
  var part2Container = document.getElementById("part2Container");

  var part1TotalsEl = document.getElementById("part1Totals");
  var part2TotalsEl = document.getElementById("part2Totals");

  var exportBtn = document.getElementById("exportBtn");
  var importBtn = document.getElementById("importBtn");
  var importFileInput = document.getElementById("importFileInput");

  function parseDateInput(value) {
    if (!value) return null;
    var v = String(value).trim();
    var m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return null;

    var y = Number(m[1]);
    var mo = Number(m[2]);
    var d = Number(m[3]);

    if (!y || mo < 1 || mo > 12 || d < 1 || d > 31) return null;

    var dt = new Date(Date.UTC(y, mo - 1, d));

    if (dt.getUTCFullYear() !== y || (dt.getUTCMonth() + 1) !== mo || dt.getUTCDate() !== d) return null;

    return dt;
  }

  function formatDateUTC(dateObj) {
    var y = dateObj.getUTCFullYear();
    var m = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    var d = String(dateObj.getUTCDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  function addDaysUTC(dateObj, days) {
    return new Date(dateObj.getTime() + days * 86400000);
  }

  function clampNumber(n, min, max) {
    if (isNaN(n)) return min;
    return Math.max(min, Math.min(max, n));
  }

  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function buttonStyle(bg) {
    return "background-color:" + bg + ";color:white;border:0;padding:6px 10px;cursor:pointer";
  }

  function createRow(part, rowId, defaults) {
    var wrap = document.createElement("div");
    wrap.setAttribute("data-part", part);
    wrap.setAttribute("data-row-id", String(rowId));

    var typeOptions = "";
    if (part === "part1") {
      typeOptions += "<option value='maternity'>Maternity</option>";
      typeOptions += "<option value='parental'>Parental</option>";
    } else {
      typeOptions += "<option value='lwop'>LWOP</option>";
      typeOptions += "<option value='lia'>LIA</option>";
      typeOptions += "<option value='other'>Other that you want counted here</option>";
    }

    var html = "";
    html += "<p>";
    html += "<input class='startDate' type='text' placeholder='Start YYYY-MM-DD' inputmode='numeric' autocomplete='off'> ";
    html += "<input class='endDate' type='text' placeholder='End YYYY-MM-DD' inputmode='numeric' autocomplete='off'> ";
    html += "<select class='leaveType'>" + typeOptions + "</select> ";
    html += "<input class='desc' type='text' placeholder='Description' size='32'> ";
    html += "<input class='fte' type='number' min='0' max='100' value='100' style='width:90px' title='FTE percent'> ";
    html += "<span class='days' style='display:inline-block;min-width:120px'>Days: 0</span> ";
    html += "</p>";

    html += "<p>";
    html += "<button type='button' class='removeBtn' style='" + buttonStyle("red") + "'>Remove</button> ";
    html += "<button type='button' class='addBelowBtn' style='" + buttonStyle("green") + "'>Add another leave block</button> ";
    html += "<span class='rowMsg' style='margin-left:10px'></span>";
    html += "</p>";

    html += "<hr>";

    wrap.innerHTML = html;

    var startEl = wrap.querySelector(".startDate");
    var endEl = wrap.querySelector(".endDate");
    var typeEl = wrap.querySelector(".leaveType");
    var descEl = wrap.querySelector(".desc");
    var fteEl = wrap.querySelector(".fte");

    if (defaults) {
      if (defaults.startDate) startEl.value = defaults.startDate;
      if (defaults.endDate) endEl.value = defaults.endDate;
      if (defaults.leaveType) typeEl.value = defaults.leaveType;
      if (defaults.desc) descEl.value = defaults.desc;
      if (typeof defaults.fte === "number" || typeof defaults.fte === "string") fteEl.value = String(defaults.fte);
    }

    function onChange() {
      updateRowDays(wrap);
      updateAllTotals();
    }

    startEl.addEventListener("input", onChange);
    endEl.addEventListener("input", onChange);
    typeEl.addEventListener("change", onChange);
    descEl.addEventListener("input", onChange);
    fteEl.addEventListener("input", onChange);

    wrap.querySelector(".removeBtn").addEventListener("click", function () {
      wrap.remove();
      refreshAddButtons(part);
      updateAllTotals();
      ensureAtLeastOneRow(part);
    });

    wrap.querySelector(".addBelowBtn").addEventListener("click", function () {
      addRowAfter(part, wrap, null);
    });

    return wrap;
  }

  function ensureAtLeastOneRow(part) {
    var container = (part === "part1") ? part1Container : part2Container;
    var rows = container.querySelectorAll("div[data-part='" + part + "']");
    if (rows.length === 0) {
      addRow(part, null);
    }
  }

  function addRow(part, defaults) {
    var container = (part === "part1") ? part1Container : part2Container;
    var row = createRow(part, nextRowId(container), defaults);
    container.appendChild(row);
    refreshAddButtons(part);
    updateRowDays(row);
    updateAllTotals();
  }

  function addRowAfter(part, existingRow, defaults) {
    var container = (part === "part1") ? part1Container : part2Container;
    var row = createRow(part, nextRowId(container), defaults);

    if (existingRow && existingRow.parentNode === container) {
      if (existingRow.nextSibling) {
        container.insertBefore(row, existingRow.nextSibling);
      } else {
        container.appendChild(row);
      }
    } else {
      container.appendChild(row);
    }

    refreshAddButtons(part);
    updateRowDays(row);
    updateAllTotals();
  }

  function nextRowId(container) {
    var existing = container.querySelectorAll("div[data-row-id]");
    var max = 0;
    for (var i = 0; i < existing.length; i++) {
      var id = Number(existing[i].getAttribute("data-row-id") || "0");
      if (id > max) max = id;
    }
    return max + 1;
  }

  function refreshAddButtons(part) {
    var container = (part === "part1") ? part1Container : part2Container;
    var rows = container.querySelectorAll("div[data-part='" + part + "']");
    for (var i = 0; i < rows.length; i++) {
      var btn = rows[i].querySelector(".addBelowBtn");
      if (!btn) continue;
      btn.style.display = (i === rows.length - 1) ? "inline-block" : "none";
    }
  }

  function getRowData(row) {
    return {
      startDate: row.querySelector(".startDate").value.trim(),
      endDate: row.querySelector(".endDate").value.trim(),
      leaveType: row.querySelector(".leaveType").value,
      desc: row.querySelector(".desc").value,
      fte: clampNumber(Number(row.querySelector(".fte").value), 0, 100)
    };
  }

  function countDaysForRow(row) {
    var d = getRowData(row);

    var start = parseDateInput(d.startDate);
    var end = parseDateInput(d.endDate);

    if (!start || !end) return { days: 0, valid: false, message: "" };
    if (end.getTime() < start.getTime()) return { days: 0, valid: false, message: "End date is before start date" };

    var fteFrac = d.fte / 100;
    var count = 0;

    var cursor = start;
    while (cursor.getTime() <= end.getTime()) {
      count += fteFrac;
      cursor = addDaysUTC(cursor, 1);
    }

    return { days: count, valid: true, message: "" };
  }

  function updateRowDays(row) {
    var part = row.getAttribute("data-part");
    var daysEl = row.querySelector(".days");
    var msgEl = row.querySelector(".rowMsg");

    var res = countDaysForRow(row);
    daysEl.textContent = "Days: " + round2(res.days);

    msgEl.textContent = "";

    if (!res.valid && res.message) {
      msgEl.textContent = res.message;
      return;
    }

    if (part === "part1") {
      if (res.days > PER_CHILD_GUIDE) {
        msgEl.textContent = "This line exceeds 365 days";
      }
    }
  }

  function buildUniqueDayMap(rows) {
    var map = Object.create(null);

    for (var i = 0; i < rows.length; i++) {
      var d = getRowData(rows[i]);

      var start = parseDateInput(d.startDate);
      var end = parseDateInput(d.endDate);
      if (!start || !end) continue;
      if (end.getTime() < start.getTime()) continue;

      var fteFrac = (clampNumber(Number(d.fte), 0, 100)) / 100;

      var cursor = start;
      while (cursor.getTime() <= end.getTime()) {
        var key = formatDateUTC(cursor);
        if (map[key] === undefined || fteFrac > map[key]) {
          map[key] = fteFrac;
        }
        cursor = addDaysUTC(cursor, 1);
      }
    }

    return map;
  }

  function sumMap(map) {
    var keys = Object.keys(map);
    var total = 0;
    for (var i = 0; i < keys.length; i++) total += map[keys[i]];
    return total;
  }

  function updateAllTotals() {
    var part1Rows = part1Container.querySelectorAll("div[data-part='part1']");
    var part2Rows = part2Container.querySelectorAll("div[data-part='part2']");

    var part1Map = buildUniqueDayMap(part1Rows);
    var part2Map = buildUniqueDayMap(part2Rows);

    var used1 = sumMap(part1Map);
    var used2 = sumMap(part2Map);

    var rem1 = CAP_PART1 - used1;
    var rem2 = CAP_PART2 - used2;

    var over1 = Math.max(0, used1 - CAP_PART1);
    var over2 = Math.max(0, used2 - CAP_PART2);

    var html1 = "";
    html1 += "<p>Used: " + escapeHtml(round2(used1)) + " days (FTE)</p>";
    html1 += "<p>Remaining: " + escapeHtml(round2(Math.max(0, rem1))) + " days (FTE) out of " + CAP_PART1 + "</p>";
    if (over1 > 0) html1 += "<p><strong>Exceeded Part 1 cap by:</strong> " + escapeHtml(round2(over1)) + " days (FTE)</p>";

    part1TotalsEl.innerHTML = html1;

    var html2 = "";
    html2 += "<p>Used: " + escapeHtml(round2(used2)) + " days (FTE)</p>";
    html2 += "<p>Remaining: " + escapeHtml(round2(Math.max(0, rem2))) + " days (FTE) out of " + CAP_PART2 + "</p>";
    if (over2 > 0) html2 += "<p><strong>Exceeded Part 2 cap by:</strong> " + escapeHtml(round2(over2)) + " days (FTE)</p>";

    part2TotalsEl.innerHTML = html2;
  }

  function setChildrenCount(n) {
    n = clampNumber(Number(n), 0, 99);

    var currentRows = part1Container.querySelectorAll("div[data-part='part1']");
    var existing = [];
    for (var i = 0; i < currentRows.length; i++) existing.push(getRowData(currentRows[i]));

    part1Container.innerHTML = "";

    var lines = Math.min(n, MAX_CHILD_LINES);
    for (var c = 0; c < lines; c++) {
      var defaults = existing[c] || { leaveType: "maternity", desc: "Child " + (c + 1), fte: 100 };
      if (!defaults.desc) defaults.desc = "Child " + (c + 1);
      addRow("part1", defaults);
    }

    if (lines === 0) {
      addRow("part1", { leaveType: "parental", desc: "Optional entry", fte: 100 });
    }

    if (n > MAX_CHILD_LINES) {
      ensureAtLeastOneRow("part2");
      var extraDesc = "Maternity or parental beyond 3 children";
      var part2Rows = part2Container.querySelectorAll("div[data-part='part2']");
      var already = false;
      for (var j = 0; j < part2Rows.length; j++) {
        var d = getRowData(part2Rows[j]);
        if ((d.desc || "").trim() === extraDesc) already = true;
      }
      if (!already) {
        addRowAfter("part2", part2Rows[part2Rows.length - 1], { leaveType: "other", desc: extraDesc, fte: 100 });
      }
    }

    refreshAddButtons("part1");
    refreshAddButtons("part2");
    updateAllTotals();
  }

  function getState() {
    function rowsToArray(container, part) {
      var rows = container.querySelectorAll("div[data-part='" + part + "']");
      var out = [];
      for (var i = 0; i < rows.length; i++) out.push(getRowData(rows[i]));
      return out;
    }

    return {
      version: 4,
      exportedAt: new Date().toISOString(),
      childrenCount: Number(childrenCountEl.value || "0"),
      part1: rowsToArray(part1Container, "part1"),
      part2: rowsToArray(part2Container, "part2")
    };
  }

  function loadState(state) {
    if (!state || typeof state !== "object") return;

    var cc = clampNumber(Number(state.childrenCount), 0, 99);
    childrenCountEl.value = String(cc);

    part1Container.innerHTML = "";
    part2Container.innerHTML = "";

    function safeType(part, t) {
      if (part === "part1") {
        if (t === "maternity" || t === "parental") return t;
        return "maternity";
      } else {
        if (t === "lwop" || t === "lia" || t === "other") return t;
        return "lwop";
      }
    }

    function safeRows(arr, part) {
      if (!Array.isArray(arr)) return [];
      return arr.map(function (e) {
        return {
          startDate: (e && typeof e.startDate === "string") ? e.startDate : "",
          endDate: (e && typeof e.endDate === "string") ? e.endDate : "",
          leaveType: safeType(part, e && e.leaveType),
          desc: (e && typeof e.desc === "string") ? e.desc : "",
          fte: clampNumber(Number(e && e.fte), 0, 100)
        };
      });
    }

    var p1 = safeRows(state.part1, "part1");
    var p2 = safeRows(state.part2, "part2");

    if (p1.length === 0) p1 = [{ leaveType: "maternity", desc: "Optional entry", fte: 100 }];
    if (p2.length === 0) p2 = [{ leaveType: "lwop", desc: "", fte: 100 }];

    for (var i = 0; i < p1.length; i++) addRow("part1", p1[i]);
    for (var j = 0; j < p2.length; j++) addRow("part2", p2[j]);

    refreshAddButtons("part1");
    refreshAddButtons("part2");
    updateAllTotals();
  }

  function exportToFile() {
    var payload = getState();
    var json = JSON.stringify(payload, null, 2);

    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = url;

    var stamp = payload.exportedAt.replace(/[:.]/g, "").replace("T", "_").replace("Z", "Z");
    a.download = "lwop_pensionable_limit_" + stamp + ".json";

    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  }

  function importFromFile(file) {
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function () {
      var raw = String(reader.result || "").trim();
      if (!raw) {
        alert("That file is empty.");
        return;
      }

      var parsed;
      try {
        parsed = JSON.parse(raw);
      } catch (e) {
        alert("That file does not contain valid JSON.");
        return;
      }

      if (!parsed || typeof parsed !== "object") {
        alert("Invalid file format.");
        return;
      }

      loadState(parsed);
    };

    reader.onerror = function () {
      alert("Could not read that file.");
    };

    reader.readAsText(file);
  }

  childrenCountEl.addEventListener("input", function () {
    setChildrenCount(childrenCountEl.value);
  });

  exportBtn.addEventListener("click", exportToFile);

  importBtn.addEventListener("click", function () {
    importFileInput.value = "";
    importFileInput.click();
  });

  importFileInput.addEventListener("change", function () {
    var file = importFileInput.files && importFileInput.files[0];
    importFromFile(file);
  });

  addRow("part1", { leaveType: "maternity", desc: "Optional entry", fte: 100 });
  addRow("part2", { leaveType: "lwop", desc: "", fte: 100 });
  refreshAddButtons("part1");
  refreshAddButtons("part2");
  updateAllTotals();
})();
</script>