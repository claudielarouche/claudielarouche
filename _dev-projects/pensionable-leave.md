---
layout: dev
title: LWOP pensionable limit calculator
---

# LWOP pensionable limit calculator

This page is a planning tool to help you estimate pensionable LWOP usage against the commonly cited caps referenced in public service pension guidance and the Income Tax Act.

Reference links  
<a href="https://laws.justice.gc.ca/eng/acts/I-3.3/">Income Tax Act</a>  
<a href="https://www.canada.ca/en/public-services-procurement/services/pay-pension/public-service-pension-plan/information-packages-kits/leave-without-pay.html">Public service pension plan LWOP information</a>

Notes  
This tool does not validate whether a specific leave period is eligible for a specific bucket based on timing around birth or adoption. It assumes you enter periods in the correct section. If rules around extended leave options change how eligibility works, you should rely on official guidance or the Pension Centre.

---

## Summary

Two buckets are tracked

Bucket 1 is the parenting bucket with a planning cap of 365 times 3 days  
This section is for maternity and parental leave, up to one year per child, up to 3 children

Bucket 2 is the general LWOP bucket with a planning cap of 365 times 5 days  
This section is for LWOP and LIA and other pensionable LWOP types that count toward the five year cap, including additional maternity or parental leave beyond 3 children

---

## Part 1
## Parenting bucket
## Maternity and parental
## Planning cap 1095 days

How many children did you take maternity and or parental leave for  
<input id="childrenCount" type="number" min="0" max="20" value="0">

<div id="part1Info"></div>

<div id="part1TableWrap"></div>

<div id="part1Totals"></div>

---

## Part 2
## General LWOP bucket
## Planning cap 1825 days

<div id="part2TableWrap"></div>

<p>
  <button type="button" id="addPart2LineBtn" style="background-color:green;color:white;border:0;padding:6px 10px;cursor:pointer">
    Add another leave block
  </button>
</p>

<div id="part2Totals"></div>

---

## Export and import

<p>
  <button type="button" id="exportBtn">Export JSON</button>
  <button type="button" id="importBtn">Import JSON</button>
  <input type="file" id="importFileInput" accept=".json,application/json" style="display:none">
</p>

---

## Exact math used

Caps used by this tool for planning

Parenting bucket cap  
365 × 3 = 1095 calendar days

General LWOP bucket cap  
365 × 5 = 1825 calendar days

How days are counted per line

If both Start date and End date are valid, the line day count is:

End date minus Start date plus 1  
This is inclusive counting of calendar days, including weekends

If a line has an invalid date or End date is before Start date, that line day count is blank and it is not included in totals

How totals are counted inside each bucket

Totals are de duplicated by calendar day within each bucket

If two lines in the same bucket overlap on the calendar, overlapping days are only counted once in the bucket total

Per child guidance shown by the tool

For Part 1, each child line is flagged if its line day count exceeds 365 days  
This is a planning helper only, not an eligibility decision

Over cap reporting

If a bucket total exceeds its cap, the tool reports the number of days over cap as not pensionable for planning purposes

What the tool does not validate

It does not validate the eligibility window around a birth or adoption date  
It does not validate special cases, exceptions, buyback rules, or plan specific interpretations

<script>
(function () {
  "use strict";

  var CAP_PARENTING = 365 * 3; // 1095
  var CAP_GENERAL = 365 * 5;   // 1825
  var PER_CHILD_GUIDE = 365;
  var MAX_CHILD_LINES = 3;

  var childrenCountEl = document.getElementById("childrenCount");
  var part1InfoEl = document.getElementById("part1Info");
  var part1TableWrapEl = document.getElementById("part1TableWrap");
  var part1TotalsEl = document.getElementById("part1Totals");

  var part2TableWrapEl = document.getElementById("part2TableWrap");
  var part2TotalsEl = document.getElementById("part2Totals");
  var addPart2LineBtn = document.getElementById("addPart2LineBtn");

  var exportBtn = document.getElementById("exportBtn");
  var importBtn = document.getElementById("importBtn");
  var importFileInput = document.getElementById("importFileInput");

  var state = {
    version: 1,
    childrenCount: 0,
    part1Lines: [],
    part2Lines: []
  };

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

function formatYearsDays(totalDays) {
  var n = Number(totalDays);
  if (!Number.isFinite(n) || n < 0) n = 0;
  n = Math.round(n); // totals are integer unique days
  var years = Math.floor(n / 365);
  var days = n % 365;
  return { years: years, days: days };
}

  function clampInt(n, min, max) {
    n = Number(n);
    if (!Number.isFinite(n)) return min;
    n = Math.floor(n);
    return Math.max(min, Math.min(max, n));
  }

  function parseDate(value) {
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

  function formatDateUTC(dt) {
    var y = dt.getUTCFullYear();
    var m = String(dt.getUTCMonth() + 1).padStart(2, "0");
    var d = String(dt.getUTCDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  function addDaysUTC(dt, days) {
    return new Date(dt.getTime() + days * 86400000);
  }

  function daysInclusive(startStr, endStr) {
    var s = parseDate(startStr);
    var e = parseDate(endStr);
    if (!s || !e) return null;
    if (e.getTime() < s.getTime()) return null;
    var diffDays = Math.round((e.getTime() - s.getTime()) / 86400000);
    return diffDays + 1;
  }

  function ensurePart1LinesForChildrenCount() {
    var c = clampInt(state.childrenCount, 0, 20);
    var target = Math.min(c, MAX_CHILD_LINES);

    // preserve existing lines by index
    var next = [];
    for (var i = 0; i < target; i++) {
      var existing = state.part1Lines[i];
      if (existing) {
        next.push(existing);
      } else {
        next.push({
          id: "p1_" + (i + 1),
          childNumber: i + 1,
          category: "maternity_parental",
          startDate: "",
          endDate: "",
          description: ""
        });
      }
    }
    state.part1Lines = next;

    // if more than 3 children, ensure a helper line exists in Part 2
    var needsExtra = c > MAX_CHILD_LINES;
    var hasAuto = state.part2Lines.some(function (l) { return l && l.isAutoExtraChildren === true; });

    if (needsExtra && !hasAuto) {
      state.part2Lines.unshift({
        id: "p2_extra_children",
        leaveType: "additional_maternity_parental",
        startDate: "",
        endDate: "",
        description: "Additional maternity or parental leave beyond 3 children",
        isAutoExtraChildren: true
      });
    }

    if (!needsExtra && hasAuto) {
      // remove auto line only if blank dates to avoid deleting user entered data
      state.part2Lines = state.part2Lines.filter(function (l) {
        if (!l || l.isAutoExtraChildren !== true) return true;
        var blank = (!String(l.startDate || "").trim() && !String(l.endDate || "").trim());
        return !blank;
      });
    }
  }

  function ensureAtLeastOnePart2Line() {
    if (state.part2Lines.length === 0) {
      state.part2Lines.push({
        id: "p2_1",
        leaveType: "lwop",
        startDate: "",
        endDate: "",
        description: ""
      });
    }
  }

  function renderPart1() {
    var c = clampInt(state.childrenCount, 0, 20);
    var shown = Math.min(c, MAX_CHILD_LINES);

    var info = "";
    if (c === 0) {
      info = "<p>No parenting leave lines are shown because you entered 0.</p>";
    } else if (c <= MAX_CHILD_LINES) {
      info = "<p>Showing one line per child for up to 3 children.</p>";
    } else {
      info = "<p>You entered " + escapeHtml(c) + ". Only 3 parenting lines are shown here. Additional maternity or parental leave beyond 3 children is expected to use the 5 year bucket, and a helper line was added in Part 2.</p>";
    }
    part1InfoEl.innerHTML = info;

    var html = "";
    if (shown > 0) {
      html += "<table>";
      html += "<thead><tr>";
      html += "<th>Child</th>";
      html += "<th>Start date</th>";
      html += "<th>End date</th>";
      html += "<th>Description</th>";
      html += "<th>Days</th>";
      html += "<th>Flag</th>";
      html += "</tr></thead>";
      html += "<tbody>";

      for (var i = 0; i < state.part1Lines.length; i++) {
        var line = state.part1Lines[i];
        var lineDays = daysInclusive(line.startDate, line.endDate);
        var flag = "";
        if (lineDays !== null && lineDays > PER_CHILD_GUIDE) {
          flag = "Over 365";
        }

        html += "<tr data-line-id='" + escapeHtml(line.id) + "'>";
        html += "<td>" + escapeHtml(line.childNumber) + "</td>";
        html += "<td><input type='text' class='p1Start' placeholder='YYYY-MM-DD' value='" + escapeHtml(line.startDate || "") + "'></td>";
        html += "<td><input type='text' class='p1End' placeholder='YYYY-MM-DD' value='" + escapeHtml(line.endDate || "") + "'></td>";
        html += "<td><input type='text' class='p1Desc' value='" + escapeHtml(line.description || "") + "'></td>";
        html += "<td class='p1Days'>" + (lineDays === null ? "" : escapeHtml(lineDays)) + "</td>";
        html += "<td class='p1Flag' style='" + (flag ? "color:red" : "") + "'>" + escapeHtml(flag) + "</td>";
        html += "</tr>";
      }

      html += "</tbody></table>";
    }

    part1TableWrapEl.innerHTML = html;

    // attach listeners
    var rows = part1TableWrapEl.querySelectorAll("tr[data-line-id]");
    for (var r = 0; r < rows.length; r++) {
      (function () {
        var row = rows[r];
        var id = row.getAttribute("data-line-id");

        var startEl = row.querySelector(".p1Start");
        var endEl = row.querySelector(".p1End");
        var descEl = row.querySelector(".p1Desc");

        function onChange() {
          var line = state.part1Lines.find(function (x) { return x.id === id; });
          if (!line) return;

          line.startDate = startEl.value;
          line.endDate = endEl.value;
          line.description = descEl.value;

          updatePart1Row(row, line);
          renderTotals();
        }

        startEl.addEventListener("input", onChange);
        endEl.addEventListener("input", onChange);
        descEl.addEventListener("input", onChange);
      })();
    }
  }

  function updatePart1Row(row, line) {
    var daysCell = row.querySelector(".p1Days");
    var flagCell = row.querySelector(".p1Flag");
    var lineDays = daysInclusive(line.startDate, line.endDate);

    daysCell.textContent = (lineDays === null ? "" : String(lineDays));

    var flag = "";
    if (lineDays !== null && lineDays > PER_CHILD_GUIDE) {
      flag = "Over 365";
    }
    flagCell.textContent = flag;
    flagCell.setAttribute("style", flag ? "color:red" : "");
  }

  function renderPart2() {
    var html = "";
    html += "<table>";
    html += "<thead><tr>";
    html += "<th>Start date</th>";
    html += "<th>End date</th>";
    html += "<th>Leave type</th>";
    html += "<th>Description</th>";
    html += "<th>Days</th>";
    html += "<th>Actions</th>";
    html += "</tr></thead>";
    html += "<tbody>";

    for (var i = 0; i < state.part2Lines.length; i++) {
      var line = state.part2Lines[i];
      var lineDays = daysInclusive(line.startDate, line.endDate);

      html += "<tr data-line-id='" + escapeHtml(line.id) + "'>";
      html += "<td><input type='text' class='p2Start' placeholder='YYYY-MM-DD' value='" + escapeHtml(line.startDate || "") + "'></td>";
      html += "<td><input type='text' class='p2End' placeholder='YYYY-MM-DD' value='" + escapeHtml(line.endDate || "") + "'></td>";

      html += "<td><select class='p2Type'>";
      html += "<option value='lwop'" + (line.leaveType === "lwop" ? " selected" : "") + ">LWOP</option>";
      html += "<option value='lia'" + (line.leaveType === "lia" ? " selected" : "") + ">LIA</option>";
      html += "<option value='additional_maternity_parental'" + (line.leaveType === "additional_maternity_parental" ? " selected" : "") + ">Additional maternity or parental beyond 3 children</option>";
      html += "<option value='other'" + (line.leaveType === "other" ? " selected" : "") + ">Other</option>";
      html += "</select></td>";

      html += "<td><input type='text' class='p2Desc' value='" + escapeHtml(line.description || "") + "'></td>";
      html += "<td class='p2Days'>" + (lineDays === null ? "" : escapeHtml(lineDays)) + "</td>";

      html += "<td>";
      html += "<button type='button' class='p2Remove' style='background-color:red;color:white;border:0;padding:6px 10px;cursor:pointer'>Remove</button>";
      html += "</td>";

      html += "</tr>";
    }

    html += "</tbody></table>";

    part2TableWrapEl.innerHTML = html;

    // listeners
    var rows = part2TableWrapEl.querySelectorAll("tr[data-line-id]");
    for (var r = 0; r < rows.length; r++) {
      (function () {
        var row = rows[r];
        var id = row.getAttribute("data-line-id");

        var startEl = row.querySelector(".p2Start");
        var endEl = row.querySelector(".p2End");
        var typeEl = row.querySelector(".p2Type");
        var descEl = row.querySelector(".p2Desc");
        var removeBtn = row.querySelector(".p2Remove");

        function onChange() {
          var line = state.part2Lines.find(function (x) { return x.id === id; });
          if (!line) return;

          line.startDate = startEl.value;
          line.endDate = endEl.value;
          line.leaveType = typeEl.value;
          line.description = descEl.value;

          updatePart2Row(row, line);
          renderTotals();
        }

        startEl.addEventListener("input", onChange);
        endEl.addEventListener("input", onChange);
        typeEl.addEventListener("change", onChange);
        descEl.addEventListener("input", onChange);

        removeBtn.addEventListener("click", function () {
          state.part2Lines = state.part2Lines.filter(function (x) { return x.id !== id; });
          ensureAtLeastOnePart2Line();
          renderAll();
        });
      })();
    }
  }

  function updatePart2Row(row, line) {
    var daysCell = row.querySelector(".p2Days");
    var lineDays = daysInclusive(line.startDate, line.endDate);
    daysCell.textContent = (lineDays === null ? "" : String(lineDays));
  }

  function uniqueDaysFromLines(lines, getStart, getEnd) {
    var set = Object.create(null);

    for (var i = 0; i < lines.length; i++) {
      var sStr = getStart(lines[i]);
      var eStr = getEnd(lines[i]);

      var s = parseDate(sStr);
      var e = parseDate(eStr);
      if (!s || !e) continue;
      if (e.getTime() < s.getTime()) continue;

      var cursor = s;
      while (cursor.getTime() <= e.getTime()) {
        set[formatDateUTC(cursor)] = true;
        cursor = addDaysUTC(cursor, 1);
      }
    }

    return Object.keys(set).length;
  }

  function findOverlapDaysBetweenBuckets(part1Lines, part2Lines) {
  var p1 = Object.create(null);
  var p2 = Object.create(null);

  function addRangeToSet(lines, setObj) {
    for (var i = 0; i < lines.length; i++) {
      var s = parseDate(lines[i].startDate);
      var e = parseDate(lines[i].endDate);
      if (!s || !e) continue;
      if (e.getTime() < s.getTime()) continue;

      var cur = s;
      while (cur.getTime() <= e.getTime()) {
        setObj[formatDateUTC(cur)] = true;
        cur = addDaysUTC(cur, 1);
      }
    }
  }

  addRangeToSet(part1Lines, p1);
  addRangeToSet(part2Lines, p2);

  var overlaps = [];
  var keys = Object.keys(p1);
  for (var k = 0; k < keys.length; k++) {
    if (p2[keys[k]]) overlaps.push(keys[k]);
  }

  overlaps.sort();
  return overlaps;
}

function renderTotals() {
  // Part 1 totals
  var p1Unique = uniqueDaysFromLines(
    state.part1Lines,
    function (l) { return l.startDate; },
    function (l) { return l.endDate; }
  );

  var p1Over = Math.max(0, p1Unique - CAP_PARENTING);
  var p1Remaining = Math.max(0, CAP_PARENTING - p1Unique);

  var p1YD = formatYearsDays(p1Unique);
  var p1RemainingYD = formatYearsDays(p1Remaining);
  var p1OverYD = formatYearsDays(p1Over);

  // Part 2 totals
  var p2Unique = uniqueDaysFromLines(
    state.part2Lines,
    function (l) { return l.startDate; },
    function (l) { return l.endDate; }
  );

  var p2Over = Math.max(0, p2Unique - CAP_GENERAL);
  var p2Remaining = Math.max(0, CAP_GENERAL - p2Unique);

  var p2YD = formatYearsDays(p2Unique);
  var p2RemainingYD = formatYearsDays(p2Remaining);
  var p2OverYD = formatYearsDays(p2Over);

  // Overlap warning
  var overlaps = findOverlapDaysBetweenBuckets(state.part1Lines, state.part2Lines);
  var overlapWarning = "";
  if (overlaps.length > 0) {
    var previewCount = Math.min(10, overlaps.length);
    var preview = overlaps.slice(0, previewCount).join(", ");
    overlapWarning = "<p style='color:red'><strong>Warning:</strong> " +
      "You have " + escapeHtml(overlaps.length) + " calendar day(s) that appear in both buckets. " +
      "This page does not de duplicate across buckets, so those days may be effectively counted twice in the combined total. " +
      "First overlapping dates: " + escapeHtml(preview) +
      (overlaps.length > previewCount ? " ..." : "") +
      "</p>";
  }

  // Render Part 1
  var p1Html = "";
  p1Html += "<p><strong>Parenting bucket total</strong></p>";
  p1Html += "<p>Unique days counted: " + escapeHtml(p1Unique) + " out of " + escapeHtml(CAP_PARENTING) + "</p>";
  p1Html += "<p>That is: " + escapeHtml(p1YD.years) + " years " + escapeHtml(p1YD.days) + " days</p>";
  p1Html += "<p>Remaining: " + escapeHtml(p1Remaining) + " days</p>";
  p1Html += "<p>Remaining as: " + escapeHtml(p1RemainingYD.years) + " years " + escapeHtml(p1RemainingYD.days) + " days</p>";

  if (p1Over > 0) {
    p1Html += "<p style='color:red'><strong>Over cap by:</strong> " + escapeHtml(p1Over) + " days</p>";
    p1Html += "<p style='color:red'><strong>Over cap as:</strong> " + escapeHtml(p1OverYD.years) + " years " + escapeHtml(p1OverYD.days) + " days</p>";
    p1Html += "<p style='color:red'>Planning note: days over the 3 year cap may need to be tracked under the 5 year bucket depending on your situation.</p>";
  }
  part1TotalsEl.innerHTML = p1Html;

  // Render Part 2
  var p2Html = "";
  p2Html += overlapWarning;

  p2Html += "<p><strong>General LWOP bucket total</strong></p>";
  p2Html += "<p>Unique days counted: " + escapeHtml(p2Unique) + " out of " + escapeHtml(CAP_GENERAL) + "</p>";
  p2Html += "<p>That is: " + escapeHtml(p2YD.years) + " years " + escapeHtml(p2YD.days) + " days</p>";
  p2Html += "<p>Remaining: " + escapeHtml(p2Remaining) + " days</p>";
  p2Html += "<p>Remaining as: " + escapeHtml(p2RemainingYD.years) + " years " + escapeHtml(p2RemainingYD.days) + " days</p>";

  if (p2Over > 0) {
    p2Html += "<p style='color:red'><strong>Over cap by:</strong> " + escapeHtml(p2Over) + " days</p>";
    p2Html += "<p style='color:red'><strong>Over cap as:</strong> " + escapeHtml(p2OverYD.years) + " years " + escapeHtml(p2OverYD.days) + " days</p>";
  }

  // Combined totals (no cross bucket de dup)
  var combined = p1Unique + p2Unique;
  var combinedYD = formatYearsDays(combined);

  p2Html += "<p><strong>Combined total across both buckets</strong></p>";
  p2Html += "<p>Total days: " + escapeHtml(combined) + " days</p>";
  p2Html += "<p>That is: " + escapeHtml(combinedYD.years) + " years " + escapeHtml(combinedYD.days) + " days</p>";

  part2TotalsEl.innerHTML = p2Html;
}

  function renderAll() {
    ensurePart1LinesForChildrenCount();
    ensureAtLeastOnePart2Line();
    renderPart1();
    renderPart2();
    renderTotals();
  }

  function addPart2Line() {
    var nextId = "p2_" + (state.part2Lines.length + 1) + "_" + Date.now();
    state.part2Lines.push({
      id: nextId,
      leaveType: "lwop",
      startDate: "",
      endDate: "",
      description: ""
    });
    renderPart2();
    renderTotals();
  }

  function exportToFile() {
    var payload = {
      version: state.version,
      exportedAt: new Date().toISOString(),
      childrenCount: state.childrenCount,
      part1Lines: state.part1Lines,
      part2Lines: state.part2Lines
    };

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
        alert("Invalid JSON structure.");
        return;
      }

      var cc = clampInt(parsed.childrenCount, 0, 20);

      var p1 = Array.isArray(parsed.part1Lines) ? parsed.part1Lines : [];
      var p2 = Array.isArray(parsed.part2Lines) ? parsed.part2Lines : [];

      state.childrenCount = cc;

      state.part1Lines = p1.map(function (l, idx) {
        return {
          id: (l && typeof l.id === "string") ? l.id : ("p1_" + (idx + 1)),
          childNumber: (l && Number.isFinite(Number(l.childNumber))) ? clampInt(l.childNumber, 1, 3) : (idx + 1),
          category: "maternity_parental",
          startDate: (l && typeof l.startDate === "string") ? l.startDate : "",
          endDate: (l && typeof l.endDate === "string") ? l.endDate : "",
          description: (l && typeof l.description === "string") ? l.description : ""
        };
      });

      state.part2Lines = p2.map(function (l, idx) {
        var t = (l && typeof l.leaveType === "string") ? l.leaveType : "lwop";
        if (t !== "lwop" && t !== "lia" && t !== "additional_maternity_parental" && t !== "other") t = "lwop";

        return {
          id: (l && typeof l.id === "string") ? l.id : ("p2_" + (idx + 1)),
          leaveType: t,
          startDate: (l && typeof l.startDate === "string") ? l.startDate : "",
          endDate: (l && typeof l.endDate === "string") ? l.endDate : "",
          description: (l && typeof l.description === "string") ? l.description : "",
          isAutoExtraChildren: (l && l.isAutoExtraChildren === true) ? true : false
        };
      });

      childrenCountEl.value = String(state.childrenCount);

      // reapply line shaping rules
      ensurePart1LinesForChildrenCount();
      ensureAtLeastOnePart2Line();
      renderAll();
    };

    reader.onerror = function () {
      alert("Could not read that file.");
    };

    reader.readAsText(file);
  }

  childrenCountEl.addEventListener("input", function () {
    state.childrenCount = clampInt(childrenCountEl.value, 0, 20);
    renderAll();
  });

  addPart2LineBtn.addEventListener("click", addPart2Line);

  exportBtn.addEventListener("click", exportToFile);

  importBtn.addEventListener("click", function () {
    importFileInput.value = "";
    importFileInput.click();
  });

  importFileInput.addEventListener("change", function () {
    var file = importFileInput.files && importFileInput.files[0];
    importFromFile(file);
  });

  // initial
  state.childrenCount = 0;
  childrenCountEl.value = "0";
  renderAll();
})();
</script>