---
layout: dev
title: LWOP pensionable limit calculator
---

# LWOP pensionable limit calculator

Enter each LWOP period. The calculator counts calendar days including weekends, prevents double counting when periods overlap, and allocates days to the parenting bucket first when applicable.

## Child info for parenting bucket

The parenting bucket applies only to leave taken within 365 days after a child's birth or adoption date. Each child can contribute up to 365 parenting days, up to 3 children total, maximum 1095 parenting days.

<div id="lwop-tool">

<div id="children-section">
  <p><label for="child1Date">Child 1 birth or adoption date</label><br><input id="child1Date" type="date"></p>
  <p><label for="child2Date">Child 2 birth or adoption date</label><br><input id="child2Date" type="date"></p>
  <p><label for="child3Date">Child 3 birth or adoption date</label><br><input id="child3Date" type="date"></p>
</div>

## Save and reload your data

Use Export to generate a JSON block you can copy. Use Import to paste it back later.

<p>
  <button type="button" id="exportBtn">Export</button>
  <button type="button" id="importBtn">Import</button>
</p>

<p>
  <label for="dataBox">Export or import data</label><br>
  <textarea id="dataBox" rows="8" cols="80" placeholder="Exported JSON will appear here. Paste JSON here to import."></textarea>
</p>

## LWOP entries

For each entry, choose dates and type. FTE percent is optional and defaults to 100. If you enter 50, the tool counts half days for that period as a full time equivalent estimate.

<p><button type="button" id="addEntryBtn">Add LWOP entry</button></p>

<div id="entriesContainer" aria-live="polite"></div>

## Results

<p><button type="button" id="calculateBtn">Calculate</button></p>

<div id="results"></div>

## Exact math used

This tool treats the statutory limits as day caps for planning purposes.

General bucket cap is 5 times 365 days, which equals 1825 days.

Parenting bucket cap is up to 3 times 365 days, which equals 1095 days, with a per child cap of 365 days. A day is eligible for the parenting bucket only if it falls within the window from the child's birth or adoption date inclusive up to and including 364 days after that date.

For each LWOP entry, the tool generates the set of calendar days covered by that entry from start date to end date inclusive, then applies the FTE percent as a multiplier to each day in that set.

If entries overlap, a given calendar day is counted at most once. If multiple entries include the same calendar day, the tool uses the highest FTE percent for that day.

For each unique calendar day in the final set, the tool decides whether it can be allocated to the parenting bucket. If the day is eligible for one or more children, it is allocated to the earliest child that still has remaining parenting room. If it is not eligible for any child, it is allocated to the general bucket.

If either bucket cap is exceeded, the excess is reported as non pensionable days for planning purposes.

<hr>

</div>

<script>
(function () {
  "use strict";

  var GENERAL_CAP_DAYS = 365 * 5;   // 1825
  var PER_CHILD_CAP_DAYS = 365;     // 365
  var MAX_CHILDREN = 3;
  var PARENTING_CAP_DAYS = PER_CHILD_CAP_DAYS * MAX_CHILDREN; // 1095

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
    if (!value) return null;
    var parts = value.split("-");
    if (parts.length !== 3) return null;
    var y = Number(parts[0]);
    var m = Number(parts[1]);
    var d = Number(parts[2]);
    if (!y || !m || !d) return null;
    return new Date(Date.UTC(y, m - 1, d));
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

  function readChildren() {
    var ids = ["child1Date", "child2Date", "child3Date"];
    var out = [];
    for (var i = 0; i < ids.length; i++) {
      var v = document.getElementById(ids[i]).value;
      var d = parseDateInput(v);
      if (d) out.push(d);
    }
    out.sort(function (a, b) { return a.getTime() - b.getTime(); });
    if (out.length > MAX_CHILDREN) out = out.slice(0, MAX_CHILDREN);
    return out;
  }

  function createEntryElement(entryId) {
    var wrap = document.createElement("div");
    wrap.setAttribute("data-entry-id", String(entryId));

    var html = "";
    html += "<h3>Entry " + escapeHtml(entryId) + "</h3>";
    html += "<p>";
    html += "<label>Start date</label><br>";
    html += "<input type='date' class='startDate'>";
    html += "</p>";

    html += "<p>";
    html += "<label>End date</label><br>";
    html += "<input type='date' class='endDate'>";
    html += "</p>";

    html += "<p>";
    html += "<label>Type</label><br>";
    html += "<select class='leaveType'>";
    html += "<option value='parenting'>Maternity or parental within 1 year of birth or adoption</option>";
    html += "<option value='general'>Other pensionable LWOP</option>";
    html += "<option value='exclude'>Exclude from limits</option>";
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
      if (prefill.leaveType) el.querySelector(".leaveType").value = prefill.leaveType;
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
      var typeVal = node.querySelector(".leaveType").value;
      var fteVal = Number(node.querySelector(".fte").value);

      entries.push({
        startDate: startVal,
        endDate: endVal,
        leaveType: typeVal,
        fte: clampNumber(fteVal, 0, 100)
      });
    }
    return entries;
  }

  function setChildrenFromData(childrenIso) {
    var ids = ["child1Date", "child2Date", "child3Date"];
    for (var i = 0; i < ids.length; i++) {
      document.getElementById(ids[i]).value = childrenIso[i] || "";
    }
  }

  function resetEntriesAndLoad(entries) {
    entriesContainer.innerHTML = "";
    entryIdCounter = 0;
    for (var i = 0; i < entries.length; i++) {
      addEntry(entries[i]);
    }
  }

  function exportData() {
    var children = [
      document.getElementById("child1Date").value || "",
      document.getElementById("child2Date").value || "",
      document.getElementById("child3Date").value || ""
    ];

    var payload = {
      version: 1,
      children: children,
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

    if (!parsed || typeof parsed !== "object") {
      alert("Invalid data format.");
      return;
    }

    if (!Array.isArray(parsed.children) || !Array.isArray(parsed.entries)) {
      alert("Missing children or entries arrays.");
      return;
    }

    var safeChildren = parsed.children.slice(0, 3).map(function (v) {
      return typeof v === "string" ? v : "";
    });

    var safeEntries = parsed.entries.map(function (e) {
      return {
        startDate: (e && typeof e.startDate === "string") ? e.startDate : "",
        endDate: (e && typeof e.endDate === "string") ? e.endDate : "",
        leaveType: (e && (e.leaveType === "parenting" || e.leaveType === "general" || e.leaveType === "exclude")) ? e.leaveType : "general",
        fte: clampNumber(Number(e && e.fte), 0, 100)
      };
    });

    setChildrenFromData(safeChildren);
    resetEntriesAndLoad(safeEntries);
    resultsEl.innerHTML = "";
  }

  function buildDayFteMap(entries) {
    // Map of yyyy-mm-dd -> { fte: number, typeHint: string }
    // If multiple entries cover the same day, we keep the highest fte.
    var map = Object.create(null);

    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];

      if (e.leaveType === "exclude") continue;

      var start = parseDateInput(e.startDate);
      var end = parseDateInput(e.endDate);
      if (!start || !end) continue;

      if (end.getTime() < start.getTime()) continue;

      var fteFrac = clampNumber(Number(e.fte), 0, 100) / 100;

      var cursor = start;
      while (cursor.getTime() <= end.getTime()) {
        var key = formatDateUTC(cursor);
        if (!map[key] || fteFrac > map[key].fte) {
          map[key] = { fte: fteFrac, typeHint: e.leaveType };
        }
        cursor = addDaysUTC(cursor, 1);
      }
    }

    return map;
  }

  function buildChildWindows(children) {
    // For each child date, window is [childDate, childDate + 364] inclusive
    var windows = [];
    for (var i = 0; i < children.length; i++) {
      var d = children[i];
      var start = d;
      var end = addDaysUTC(d, 364);
      windows.push({ start: start, end: end, remaining: PER_CHILD_CAP_DAYS });
    }
    return windows;
  }

  function isDayWithinWindow(dayUtc, window) {
    var t = dayUtc.getTime();
    return t >= window.start.getTime() && t <= window.end.getTime();
  }

  function allocateDays(dayMap, childrenDates) {
    var keys = Object.keys(dayMap);
    keys.sort();

    var childWindows = buildChildWindows(childrenDates);

    var usedGeneral = 0;
    var usedParenting = 0;
    var usedPerChild = childWindows.map(function () { return 0; });

    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var day = parseDateInput(k);
      if (!day) continue;

      var fte = dayMap[k].fte;

      var allocatedToParenting = false;

      // Only days that are tagged as parenting or general can exist in dayMap.
      // Even if the entry type was "general", we still allow allocation to parenting if date falls within window,
      // because in practice the pension classification depends on leave reason and timing. The UI type is a hint.
      // To keep the tool practical, allocation is based on the date window and remaining child room.
      for (var c = 0; c < childWindows.length; c++) {
        if (childWindows[c].remaining <= 0) continue;
        if (isDayWithinWindow(day, childWindows[c])) {
          var canTake = Math.min(childWindows[c].remaining, fte);
          // We treat a day as a "unit" that can be fractional by FTE.
          childWindows[c].remaining -= canTake;
          usedParenting += canTake;
          usedPerChild[c] += canTake;

          // If the day had more than canTake due to fte > remaining, spill remainder to general
          var remainder = fte - canTake;
          if (remainder > 0) {
            usedGeneral += remainder;
          }

          allocatedToParenting = true;
          break;
        }
      }

      if (!allocatedToParenting) {
        usedGeneral += fte;
      }
    }

    return {
      usedGeneral: usedGeneral,
      usedParenting: usedParenting,
      usedPerChild: usedPerChild
    };
  }

  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  function renderResults(res, childrenDates) {
    var remainingGeneral = GENERAL_CAP_DAYS - res.usedGeneral;
    var remainingParenting = PARENTING_CAP_DAYS - res.usedParenting;

    var nonPensionableGeneral = Math.max(0, res.usedGeneral - GENERAL_CAP_DAYS);
    var nonPensionableParenting = Math.max(0, res.usedParenting - PARENTING_CAP_DAYS);

    var html = "";

    html += "<p><strong>General bucket</strong></p>";
    html += "<p>Used: " + escapeHtml(round2(res.usedGeneral)) + " days (FTE)</p>";
    html += "<p>Remaining: " + escapeHtml(round2(Math.max(0, remainingGeneral))) + " days (FTE) out of " + GENERAL_CAP_DAYS + "</p>";
    if (nonPensionableGeneral > 0) {
      html += "<p><strong>Exceeded general cap by:</strong> " + escapeHtml(round2(nonPensionableGeneral)) + " days (FTE)</p>";
    }

    html += "<p><strong>Parenting bucket</strong></p>";
    html += "<p>Used: " + escapeHtml(round2(res.usedParenting)) + " days (FTE)</p>";
    html += "<p>Remaining: " + escapeHtml(round2(Math.max(0, remainingParenting))) + " days (FTE) out of " + PARENTING_CAP_DAYS + "</p>";
    if (nonPensionableParenting > 0) {
      html += "<p><strong>Exceeded parenting cap by:</strong> " + escapeHtml(round2(nonPensionableParenting)) + " days (FTE)</p>";
    }

    if (childrenDates.length > 0) {
      html += "<p><strong>Per child usage</strong></p>";
      html += "<ul>";
      for (var i = 0; i < childrenDates.length; i++) {
        html += "<li>Child " + (i + 1) + " (" + escapeHtml(formatDateUTC(childrenDates[i])) + "): " +
          escapeHtml(round2(res.usedPerChild[i])) + " of " + PER_CHILD_CAP_DAYS + " days (FTE)</li>";
      }
      html += "</ul>";
    } else {
      html += "<p>No child dates entered, so all counted days are allocated to the general bucket.</p>";
    }

    var totalUsed = res.usedGeneral + res.usedParenting;
    html += "<p><strong>Total counted LWOP:</strong> " + escapeHtml(round2(totalUsed)) + " days (FTE)</p>";

    resultsEl.innerHTML = html;
  }

  function calculate() {
    var childrenDates = readChildren();
    var entries = getAllEntries();

    var dayMap = buildDayFteMap(entries);
    var allocation = allocateDays(dayMap, childrenDates);

    renderResults(allocation, childrenDates);
  }

  addEntryBtn.addEventListener("click", function () { addEntry(); });
  calculateBtn.addEventListener("click", calculate);

  exportBtn.addEventListener("click", exportData);
  importBtn.addEventListener("click", importData);

  // Start with one empty entry for convenience
  addEntry();
})();
</script>