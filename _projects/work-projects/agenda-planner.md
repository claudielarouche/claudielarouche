---
title: Agenda Planner
description: Plan a meeting or workshop agenda. Set your meeting window, add sections with their length, and every start and end time works itself out.
image: /assets/img/meeting-plan.jpg
image_hero: /assets/img/meeting-plan.jpg
tags: [Work]
permalink: /projects/agenda-planner/
sitemap: true
layout: projects
css:
  - /assets/css/agenda-planner.css
js:
  - /assets/js/agenda-planner.js
---

<div id="agenda-tool">
  <div class="head-row">
    <p class="lede">Set your meeting window, add sections with their length, and every start and end time works itself out.</p>
    <div class="data-bar">
      <button type="button" class="ghost" id="exportBtn">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M7 2v7M4 6l3 3 3-3M2 11.5h10"/></svg>
        Export
      </button>
      <button type="button" class="ghost" id="importBtn">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M7 9V2M4 5l3-3 3 3M2 11.5h10"/></svg>
        Import
      </button>
      <input type="file" id="importFile" accept=".json,application/json" hidden>
    </div>
  </div>

  <p class="toast" id="toast" role="status" hidden></p>

  <section class="paste-panel" id="pastePanel" hidden aria-label="Agenda data">
    <p id="pasteHelp"></p>
    <textarea id="pasteBox" spellcheck="false" aria-label="Agenda data as JSON"></textarea>
    <div class="paste-actions">
      <button type="button" class="primary" id="pasteLoad">Load this agenda</button>
      <button type="button" class="ghost" id="pasteCopy">Copy</button>
      <button type="button" class="ghost" id="pasteFile">Choose a file instead</button>
      <button type="button" class="ghost" id="pasteClose">Close</button>
    </div>
  </section>

  <section class="window" aria-label="Meeting details">
    <div class="field wide">
      <label class="label" for="meetingTitle">Meeting title (optional)</label>
      <input type="text" id="meetingTitle" maxlength="120" value="Agenda" placeholder="e.g. Q1 planning workshop">
    </div>
    <div class="field">
      <label class="label" for="meetingDate">Date (optional)</label>
      <input type="date" id="meetingDate">
    </div>
    <div class="field">
      <label class="label" for="start">Meeting starts</label>
      <input type="time" id="start" value="09:00">
    </div>
    <div class="field">
      <label class="label" for="end">Meeting ends</label>
      <input type="time" id="end" value="12:00">
    </div>
    <div class="field" style="flex:0 0 auto">
      <span class="label">Clock</span>
      <div class="fmt" role="group" aria-label="Time format">
        <button type="button" id="fmt12" aria-pressed="true">12h</button>
        <button type="button" id="fmt24" aria-pressed="false">24h</button>
      </div>
    </div>
  </section>

  <section aria-label="Summary" style="display:flex;flex-direction:column;gap:14px">
    <div class="summary">
      <div class="stat"><span class="label">Meeting length</span><span class="v" id="sLen"></span></div>
      <div class="stat"><span class="label">Planned</span><span class="v" id="sPlan"></span></div>
      <div class="stat"><span class="label">Agenda ends</span><span class="v" id="sEnd"></span></div>
      <span class="pill" id="sPill" role="status"></span>
    </div>
    <div class="timeline-wrap">
      <div class="timeline" id="timeline" aria-hidden="true"></div>
      <div class="tl-labels"><span id="tlStart"></span><span id="tlEnd"></span></div>
    </div>
  </section>

  <section class="sheet" aria-label="Agenda">
    <div class="sheet-head">
      <h2>Run sheet</h2>
      <div class="sheet-tools">
        <div class="example-note">
          <span id="exampleNote">Example agenda loaded.</span>
          <button type="button" class="linkish" id="toggleNotes">Expand all details</button>
          <button type="button" class="linkish" id="clearAll">Clear and start fresh</button>
        </div>
        <button type="button" class="ghost" id="addCol">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M7 2.5v9M2.5 7h9"/></svg>
          Add column
        </button>
      </div>
    </div>
    <div class="table-scroll">
      <div class="table" id="table">
        <div class="cols-head" id="colsHead"></div>
        <ol class="rows" id="rows"></ol>
      </div>
    </div>
    <div class="endrow" id="endrow"></div>
  </section>

  <form class="add" id="addForm" autocomplete="off">
    <div class="field">
      <label class="label" for="newName">Section name</label>
      <input type="text" id="newName" placeholder="e.g. Brainstorm in small groups">
    </div>
    <div class="field">
      <label class="label" for="newDur">Minutes</label>
      <input type="number" id="newDur" min="1" max="1440" step="1" value="15">
    </div>
    <label class="chk"><input type="checkbox" id="newBrk"> Break</label>
    <button type="submit" class="primary">Add section</button>
    <div class="field full">
      <label class="label" for="newNotes">Details (optional)</label>
      <textarea class="details-in" id="newNotes" rows="2" placeholder="What this section covers: goals, activities, materials"></textarea>
    </div>
    <p class="err" id="addErr" hidden></p>
  </form>

  <section class="share" aria-label="Shareable agenda">
    <div class="sheet-head">
      <h2>Shareable agenda</h2>
      <div class="sheet-tools">
        <label class="chk"><input type="checkbox" id="shareDur" checked> Include duration</label>
        <label class="chk"><input type="checkbox" id="shareDetails" checked> Include section details</label>
      </div>
    </div>
    <div class="share-panel" id="sharePanel">
      <div class="paper-scroll"><div class="paper" id="paper"></div></div>
      <div class="paste-actions">
        <button type="button" class="primary" id="copyRich">Copy</button>
        <span class="share-hint">You can paste the agenda into a Word document or an Outlook meeting invite.</span>
      </div>
      <p class="share-status" id="shareStatus" role="status" hidden></p>
    </div>
  </section>

  <dialog class="confirm" id="confirmDlg" aria-labelledby="cfTitle" aria-describedby="cfMsg">
    <div class="cf-inner">
      <h3 id="cfTitle">Delete?</h3>
      <p id="cfMsg"></p>
      <div class="cf-actions">
        <button type="button" class="ghost" id="cfCancel">Cancel</button>
        <button type="button" class="danger" id="cfOk">Delete</button>
      </div>
    </div>
  </dialog>
</div>
