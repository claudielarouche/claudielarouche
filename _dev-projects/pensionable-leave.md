---
layout: dev
title: LWOP pensionable limit calculator
---

# LWOP pensionable limit calculator

This tool helps you total pensionable LWOP time against the standard limits described in the public service pension guidance that references the Income Tax Act.

Reference
<a href="https://laws.justice.gc.ca/eng/acts/I-3.3/">Income Tax Act</a>

## LWOP entries

Leave categories
Maternity
Parental
LWOP
LIA

Dates are counted as calendar days including weekends. If entries overlap, a calendar day is counted at most once.

<div id="lwop-tool">

<p><button type="button" id="addEntryBtn">Add entry</button></p>

<div id="entriesContainer" aria-live="polite"></div>

## Results

<p><button type="button" id="calculateBtn">Calculate</button></p>

<div id="results"></div>

## Export and import

Export generates a JSON block you can copy. Import restores the tool state from that JSON.

<p>
  <button type="button" id="exportBtn">Export</button>
  <button type="button" id="importBtn">Import</button>
</p>

<p>
  <label for="dataBox">Export or import data</label><br>
  <textarea id="dataBox" rows="10" cols="80" placeholder="Exported JSON will appear here. Paste JSON here to import."></textarea>
</p>

## Exact math used

Caps used by this tool

General bucket cap is 5 times 365 days, which equals 1825 days. This bucket includes LWOP and LIA.

Parenting bucket cap is up to 3 times 365 days, which equals 1095 days. This bucket includes Maternity and Parental.

Important note about the parenting bucket

The pension rules tie the extra parenting room to timing around a birth or adoption and a per child limit. This tool does not ask for child dates and does not validate eligibility windows. It simply totals the days you label as Maternity or Parental toward the 1095 day parenting cap. You must ensure your entered Maternity or Parental periods meet the eligibility rules for the additional room.

How days are counted

Each entry produces a set of calendar days from Start date to End date inclusive. A year is treated as 365 days for the caps above.

FTE percent

Each calendar day counted by the tool is multiplied by the FTE percent divided by 100. Example, a day with FTE 50 counts as 0.5 day.

Overlap handling

If multiple entries include the same calendar day, that day is counted once using the highest FTE percent for that day.

Category conflicts on the same calendar day

If the same day appears in both a parenting category and a general category, the tool counts it as parenting for that day, using the highest FTE percent among the entries that cover that day.

Non pensionable reporting

If total days in a bucket exceed its cap, the excess is reported as not pensionable for planning purposes.

<hr>

</div>

<script>
(function () {
  "use strict";

  var GENERAL_CAP_DAYS = 365 * 5;     // 1825
  var PARENTING_CAP_DAYS = 365 * 3;   // 1095

  var entriesContainer = document.getElementById("entriesContainer");
  var addEntryBtn = document.getElementById("addEntryBtn");
  var calculateBtn = document.getElementById("calculateBtn");
  var resultsEl = document.getElementById("results");

  var exportBtn = document.getElementById("exportBtn");
  var importBtn = document.getElementById("importBtn");
  var dataBox = document.getElementById("dataBox");

  var entryIdCounter = 0;

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function parseDateInput(value) {
    // Accept yyyy-mm-dd
    if (!value) return null;
    var v = String(value).trim();
    var m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return null;

    var y = Number(m[1]);
    var mo = Number(m[2]);
    var d = Number(m[3]);

    if (!y || mo < 1 || mo > 12 || d < 1 || d > 31) return null;

    // Use UTC to avoid DST issues
    var dt = new Date(Date.UTC(y, mo - 1, d));

    // Reject impossible dates like 2026-02-30
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

  function isParentingCategory(cat) {
    return cat === "maternity" || cat === "parental";
  }

  function categoryPrecedence(cat) {
    // Parenting categories override general categories on the same day
    return isParentingCategory(cat) ? 2 : 1;
  }

  function createEntryElement(entryId) {
    var wrap = document.createElement("div");
    wrap.setAttribute("data-entry-id", String(entryId));

    var html = "";
    html += "<h3>Entry " + escapeHtml(entryId) + "</h3>";

    html += "<p>";
    html += "<label>Start date</label><br>";
    html += "<input type='text' class='startDate' placeholder='YYYY-MM-DD' inputmode='numeric' autocomplete='off'>";
    html += "</p>";

    html += "<p>";
    html += "<label>End date</label><br>";
    html += "<input type='text' class='endDate' placeholder='YYYY-MM-DD' inputmode='numeric' autocomplete='off'>";
    html += "</p>";

    html += "<p>";
    html += "<label>Category</label><br>";
    html += "<select class='leaveCategory'>";
    html += "<option value='maternity'>Maternity</option>";
    html += "<option value='parental'>Parental</option>";
    html += "<option value='lwop'>LWOP</option>";
    html += "<option value='lia'>LIA</option>";
    html += "</select>";
    html += "</p>";

    html += "<p>";
    html += "<label>FTE percent</label><br>";
    html += "<input type='number' class='fte' min='0' max='100' value='100'>";
    html += "</p>";

    html += "<p><button type='button' class='removeBtn'>Remove entry</button></p>";
    html += "<hr>";

    wrap.innerHTML = html;

    wrap.querySelector(".removeBtn").addEventListener("click", function () {
      wrap.remove();
    });

    return wrap;
  }

  function addEntry(prefill) {
    entryIdCounter += 1;
    var el = createEntryElement(entryIdCounter);
    entriesContainer.appendChild(el);

    if (prefill) {
      if (prefill.startDate) el.querySelector(".startDate").value = prefill.startDate;
      if (prefill.endDate) el.querySelector(".endDate").value = prefill.endDate;
      if (prefill.leaveCategory) el.querySelector(".leaveCategory").value = prefill.leaveCategory;
      if (typeof prefill.fte === "number" || typeof prefill.fte === "string") {
        el.querySelector(".fte").value = String(prefill.fte);
      }
    }
  }

  function getAllEntries() {
    var nodes = entriesContainer.querySelectorAll("div[data-entry-id]");
    var entries = [];

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];

      var startVal = node.querySelector(".startDate").value;
      var endVal = node.querySelector(".endDate").value;
      var categoryVal = node.querySelector(".leaveCategory").value;
      var fteVal = Number(node.querySelector(".fte").value);

      entries.push({
        startDate: startVal,
        endDate: endVal,
        leaveCategory: categoryVal,
        fte: clampNumber(fteVal, 0, 100)
      });
    }

    return entries;
  }

  function resetEntriesAndLoad(entries) {
    entriesContainer.innerHTML = "";
    entryIdCounter = 0;

    for (var i = 0; i < entries.length; i++) {
      addEntry(entries[i]);
    }
  }

  function exportData() {
    var payload = {
      version: 2,
      entries: getAllEntries()
    };

    dataBox.value = JSON.stringify(payload, null, 2);
  }

  function importData() {
    var raw = dataBox.value.trim();
    if (!raw) {
      alert("Paste exported JSON into the box first.");
      return;
    }

    var parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      alert("That does not look like valid JSON.");
      return;
    }

    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.entries)) {
      alert("Invalid data format.");
      return;
    }

    var safeEntries = parsed.entries.map(function (e) {
      var cat = (e && typeof e.leaveCategory === "string") ? e.leaveCategory : "lwop";
      if (cat !== "maternity" && cat !== "parental" && cat !== "lwop" && cat !== "lia") cat = "lwop";

      return {
        startDate: (e && typeof e.startDate === "string") ? e.startDate : "",
        endDate: (e && typeof e.endDate === "string") ? e.endDate : "",
        leaveCategory: cat,
        fte: clampNumber(Number(e && e.fte), 0, 100)
      };
    });

    resetEntriesAndLoad(safeEntries);
    resultsEl.innerHTML = "";
  }

  function buildDayMap(entries) {
    // Map yyyy-mm-dd -> { fte: number, category: string, precedence: number }
    // If multiple entries cover the same day:
    //   Keep the category with higher precedence (parenting over general)
    //   Within same precedence, keep the one with higher FTE
    var map = Object.create(null);

    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];

      var start = parseDateInput(e.startDate);
      var end = parseDateInput(e.endDate);
      if (!start || !end) continue;
      if (end.getTime() < start.getTime()) continue;

      var fteFrac = clampNumber(Number(e.fte), 0, 100) / 100;
      var cat = e.leaveCategory;
      var prec = categoryPrecedence(cat);

      var cursor = start;
      while (cursor.getTime() <= end.getTime()) {
        var key = formatDateUTC(cursor);
        var existing = map[key];

        if (!existing) {
          map[key] = { fte: fteFrac, category: cat, precedence: prec };
        } else {
          if (prec > existing.precedence) {
            map[key] = { fte: Math.max(existing.fte, fteFrac), category: cat, precedence: prec };
          } else if (prec === existing.precedence && fteFrac > existing.fte) {
            map[key] = { fte: fteFrac, category: cat, precedence: prec };
          } else if (prec > existing.precedence && fteFrac > existing.fte) {
            map[key] = { fte: fteFrac, category: cat, precedence: prec };
          }
        }

        cursor = addDaysUTC(cursor, 1);
      }
    }

    return map;
  }

  function calculateTotals(dayMap) {
    var keys = Object.keys(dayMap);
    keys.sort();

    var usedGeneral = 0;
    var usedParenting = 0;

    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var item = dayMap[k];
      if (!item) continue;

      if (isParentingCategory(item.category)) {
        usedParenting += item.fte;
      } else {
        usedGeneral += item.fte;
      }
    }

    return { usedGeneral: usedGeneral, usedParenting: usedParenting };
  }

  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  function renderResults(totals) {
    var remainingGeneral = GENERAL_CAP_DAYS - totals.usedGeneral;
    var remainingParenting = PARENTING_CAP_DAYS - totals.usedParenting;

    var exceededGeneral = Math.max(0, totals.usedGeneral - GENERAL_CAP_DAYS);
    var exceededParenting = Math.max(0, totals.usedParenting - PARENTING_CAP_DAYS);

    var html = "";

    html += "<p><strong>General bucket</strong></p>";
    html += "<p>Includes LWOP and LIA</p>";
    html += "<p>Used: " + escapeHtml(round2(totals.usedGeneral)) + " days (FTE)</p>";
    html += "<p>Remaining: " + escapeHtml(round2(Math.max(0, remainingGeneral))) + " days (FTE) out of " + GENERAL_CAP_DAYS + "</p>";
    if (exceededGeneral > 0) {
      html += "<p><strong>Exceeded general cap by:</strong> " + escapeHtml(round2(exceededGeneral)) + " days (FTE)</p>";
    }

    html += "<p><strong>Parenting bucket</strong></p>";
    html += "<p>Includes Maternity and Parental</p>";
    html += "<p>Used: " + escapeHtml(round2(totals.usedParenting)) + " days (FTE)</p>";
    html += "<p>Remaining: " + escapeHtml(round2(Math.max(0, remainingParenting))) + " days (FTE) out of " + PARENTING_CAP_DAYS + "</p>";
    if (exceededParenting > 0) {
      html += "<p><strong>Exceeded parenting cap by:</strong> " + escapeHtml(round2(exceededParenting)) + " days (FTE)</p>";
    }

    var totalUsed = totals.usedGeneral + totals.usedParenting;
    html += "<p><strong>Total counted LWOP:</strong> " + escapeHtml(round2(totalUsed)) + " days (FTE)</p>";

    resultsEl.innerHTML = html;
  }

  function calculate() {
    var entries = getAllEntries();
    var dayMap = buildDayMap(entries);
    var totals = calculateTotals(dayMap);
    renderResults(totals);
  }

  addEntryBtn.addEventListener("click", function () { addEntry(); });
  calculateBtn.addEventListener("click", calculate);

  exportBtn.addEventListener("click", exportData);
  importBtn.addEventListener("click", importData);

  // Start with one empty entry
  addEntry();
})();
</script>