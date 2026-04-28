---
layout: projects
title: Text Comparer
description: Compare two text files side by side, with highlighted differences.
tags: [Work]
image: https://claudielarouche.com/assets/img/comparison.jpg
image_hero: https://claudielarouche.com/assets/img/comparison.jpg
permalink: /projects/text-comparer/
---

<style>
/* =====================================================
   WRAPPER OVERRIDE — make this tool full-width
   ===================================================== */


/* =====================================================
   DIFF TOOL — CUSTOM PROPERTIES
   ===================================================== */
#diff-app {
  --c-add:        #e6ffec;
  --c-add-hi:     #56d364;
  --c-del:        #ffebe9;
  --c-del-hi:     #ff7b72;
  --c-chg:        #fff8c5;
  --c-chg-hi:     #e3b341;
  --c-mov:        #f0eaff;
  --c-mov-hi:     #b98de8;
  --c-phantom:    #f6f8fa;
  --c-toolbar:    #f6f8fa;
  --c-border:     #d0d7de;
  --c-linenum:    #636c76;
  --lh:           22px;
  --font-mono:    'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, 'Courier New', monospace;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  font-size: 14px;
  color: #1f2328;
}

/* =====================================================
   TOOLBAR
   ===================================================== */
#dt-toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  padding: 6px 8px;
  background: var(--c-toolbar);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  margin-bottom: 6px;
}

.t-sep { width: 1px; height: 20px; background: var(--c-border); margin: 0 4px; }

.tbtn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border: 1px solid var(--c-border);
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  font-size: 12px;
  font-family: inherit;
  color: #1f2328;
  line-height: 1.4;
  user-select: none;
  transition: background 0.12s, border-color 0.12s;
  white-space: nowrap;
}
.tbtn:hover  { background: #f3f4f6; }
.tbtn:active { background: #e9ecef; }
.tbtn.is-primary { background: #1f6feb; border-color: #1a5cc8; color: #fff; font-weight: 600; }
.tbtn.is-primary:hover { background: #1a5cc8; }

/* =====================================================
   SETTINGS PANEL
   ===================================================== */
#dt-settings {
  border: 1px solid var(--c-border);
  border-radius: 6px;
  margin-bottom: 6px;
  overflow: hidden;
}
#dt-settings-hdr {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  background: var(--c-toolbar);
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  user-select: none;
}
#dt-settings-hdr:hover { background: #eef0f3; }
#dt-settings-arrow { margin-left: auto; font-size: 10px; }
#dt-settings-body {
  display: none;
  padding: 8px 12px;
  gap: 16px;
  flex-wrap: wrap;
  background: #fff;
}
#dt-settings-body.open { display: flex; }
#dt-settings-body label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  cursor: pointer;
}

/* =====================================================
   STATS BAR
   ===================================================== */
#dt-stats {
  display: none;
  padding: 5px 10px;
  border: 1px solid #b6d4fe;
  border-radius: 5px;
  background: #eff6ff;
  font-size: 12px;
  color: #1e40af;
  margin-bottom: 6px;
}
#dt-stats.show { display: block; }

/* =====================================================
   MAIN AREA
   ===================================================== */
#dt-main {
  display: flex;
  height: 72vh;
  min-height: 380px;
  border: 1px solid var(--c-border);
  border-radius: 6px;
  overflow: hidden;
}

/* =====================================================
   PANELS
   ===================================================== */
.dt-panel {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
}

.dt-panel-hdr {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  background: var(--c-toolbar);
  border-bottom: 1px solid var(--c-border);
  flex-shrink: 0;
}

.dt-filename {
  flex: 1;
  font-family: var(--font-mono);
  font-size: 11px;
  border: 1px solid transparent;
  border-radius: 3px;
  padding: 2px 5px;
  background: transparent;
  color: #1f2328;
}
.dt-filename:focus {
  border-color: #93c5fd;
  background: #fff;
  outline: none;
}

.pbtn {
  padding: 2px 7px;
  font-size: 11px;
  border: 1px solid var(--c-border);
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  color: #495057;
  font-family: inherit;
  white-space: nowrap;
}
.pbtn:hover { background: #f0f2f4; }

/* Textarea (input mode) */
.dt-textarea {
  flex: 1;
  border: none;
  resize: none;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: var(--lh);
  padding: 6px 8px;
  color: #1f2328;
  outline: none;
  tab-size: 4;
  background: #fdfdfd;
}

/* Diff view (comparison mode) */
.dt-diffview {
  flex: 1;
  overflow: auto;
  display: none;
}
.dt-diffview.show { display: block; }

/* Line table */
.dt-lines { display: table; width: 100%; border-collapse: collapse; }

.dl {
  display: table-row;
  height: var(--lh);
}
.dl:hover { filter: brightness(0.965); }

/* Line type colours */
.dl-unchanged { background: transparent; }
.dl-added     { background: var(--c-add); }
.dl-deleted   { background: var(--c-del); }
.dl-changed   { background: var(--c-chg); }
.dl-moved     { background: var(--c-mov); }
.dl-phantom   { background: var(--c-phantom); }


/* Gutter line number */
.dl-num {
  display: table-cell;
  width: 3.2em;
  min-width: 3.2em;
  padding: 0 6px;
  text-align: right;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--c-linenum);
  border-right: 1px solid var(--c-border);
  user-select: none;
  vertical-align: middle;
  line-height: var(--lh);
}

/* Line content */
.dl-txt {
  display: table-cell;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: var(--lh);
  padding: 0 8px;
  white-space: pre-wrap;
  word-break: break-word;
  vertical-align: middle;
  width: 100%;
  min-width: 0;
}


/* Character-level highlights */
.ch { border-radius: 2px; }
.dl-added   .ch { background: var(--c-add-hi); }
.dl-deleted .ch { background: var(--c-del-hi); }
.dl-changed .ch { background: var(--c-chg-hi); }
.dl-moved   .ch { background: var(--c-mov-hi); }

/* =====================================================
   SPLITTER
   ===================================================== */
#dt-splitter {
  width: 5px;
  background: var(--c-border);
  cursor: col-resize;
  flex-shrink: 0;
  transition: background 0.12s;
}
#dt-splitter:hover, #dt-splitter.dragging { background: #60a5fa; }

/* =====================================================
   MINIMAP
   ===================================================== */
#dt-minimap {
  width: 56px;
  flex-shrink: 0;
  background: #f6f8fa;
  border-left: 1px solid var(--c-border);
  position: relative;
  overflow: hidden;
}
#dt-minimap canvas {
  display: block;
  cursor: pointer;
}
</style>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<div id="diff-app">

  <!-- ==================== TOOLBAR ==================== -->
  <div id="dt-toolbar">
    <div style="display:flex;align-items:center;gap:4px">
      <button class="tbtn is-primary" id="btn-compare" title="Compare (Ctrl+Enter)">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8.75 1.75a.75.75 0 0 0-1.5 0v5.5h-5.5a.75.75 0 0 0 0 1.5h5.5v5.5a.75.75 0 0 0 1.5 0v-5.5h5.5a.75.75 0 0 0 0-1.5h-5.5v-5.5Z"/></svg>
        Compare
      </button>
    </div>
    <div class="t-sep"></div>
    <button class="tbtn" id="btn-clear-all" title="Clear both panels">
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75ZM4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.491.149l-.66 6.6A1.748 1.748 0 0 1 10.595 15h-5.19a1.75 1.75 0 0 1-1.74-1.575l-.66-6.6a.75.75 0 1 1 1.491-.15ZM6.5 4h3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25V4Z"/></svg>
      Clear All
    </button>
    <!-- Colour legend -->
    <div class="t-sep"></div>
    <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:#636c76">
      <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#56d364"></span>Added
      <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ff7b72"></span>Deleted
      <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#e3b341"></span>Changed
      <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#b98de8"></span>Moved
    </div>
  </div>

  <!-- ==================== SETTINGS ==================== -->
  <div id="dt-settings">
    <div id="dt-settings-hdr">
      <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.257.645 6.803.095 7.548.03 7.698.01 7.85 0 8 0Zm-.659 1.42a.386.386 0 0 0-.38.319l-.29 1.106c-.128.492-.502.882-.956 1.108A4.01 4.01 0 0 0 5.25 4.2c-.391.26-.78.355-1.152.25l-1.103-.303a.386.386 0 0 0-.481.202 6.533 6.533 0 0 0-.57.99.386.386 0 0 0 .096.502l.814.806a1.545 1.545 0 0 1 .444 1.43 4.819 4.819 0 0 0 0 .628 1.545 1.545 0 0 1-.444 1.43l-.814.806a.386.386 0 0 0-.096.502c.165.352.358.691.57.99a.386.386 0 0 0 .481.202l1.103-.303c.372-.105.761-.01 1.152.25.214.143.437.272.668.386.454.226.828.616.956 1.108l.29 1.106a.386.386 0 0 0 .38.319c.219.013.44.013.659 0a.386.386 0 0 0 .38-.319l.29-1.106c.128-.492.502-.882.955-1.108.232-.114.454-.243.668-.386.391-.26.781-.355 1.153-.25l1.102.303a.386.386 0 0 0 .481-.202 6.53 6.53 0 0 0 .57-.99.386.386 0 0 0-.095-.502l-.815-.806a1.545 1.545 0 0 1-.443-1.43 4.82 4.82 0 0 0 0-.628 1.545 1.545 0 0 1 .443-1.43l.815-.806a.386.386 0 0 0 .096-.502 6.522 6.522 0 0 0-.57-.99.386.386 0 0 0-.482-.202l-1.102.303c-.372.105-.762.01-1.153-.25a4.01 4.01 0 0 0-.668-.386c-.453-.226-.827-.616-.955-1.108l-.29-1.106a.386.386 0 0 0-.38-.319 6.56 6.56 0 0 0-.66 0ZM8 5.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM8 7a1 1 0 1 0 0 2A1 1 0 0 0 8 7Z"/></svg>
      Ignore Options
      <span id="dt-settings-arrow">▶</span>
    </div>
    <div id="dt-settings-body">
      <label><input type="checkbox" id="opt-trim">   Ignore leading/trailing whitespace</label>
      <label><input type="checkbox" id="opt-ws">     Ignore all whitespace differences</label>
      <label><input type="checkbox" id="opt-blank">  Ignore blank lines</label>
      <label><input type="checkbox" id="opt-case">   Ignore case</label>
    </div>
  </div>

  <!-- ==================== STATS BAR ==================== -->
  <div id="dt-stats"></div>

  <!-- ==================== MAIN ==================== -->
  <div id="dt-main">

    <!-- LEFT PANEL -->
    <div class="dt-panel" id="panel-L">
      <div class="dt-panel-hdr">
        <input class="dt-filename" id="fname-L" type="text" value="File 1" spellcheck="false">
        <button class="pbtn" id="btn-clear-L">✕ Clear</button>
      </div>
      <textarea class="dt-textarea" id="ta-L" placeholder="Paste or type text here, or load a file…" spellcheck="false"></textarea>
      <div class="dt-diffview" id="dv-L"><div class="dt-lines" id="dl-L"></div></div>
    </div>

    <!-- SPLITTER -->
    <div id="dt-splitter"></div>

    <!-- RIGHT PANEL -->
    <div class="dt-panel" id="panel-R">
      <div class="dt-panel-hdr">
        <input class="dt-filename" id="fname-R" type="text" value="File 2" spellcheck="false">
        <button class="pbtn" id="btn-clear-R">✕ Clear</button>
      </div>
      <textarea class="dt-textarea" id="ta-R" placeholder="Paste or type text here, or load a file…" spellcheck="false"></textarea>
      <div class="dt-diffview" id="dv-R"><div class="dt-lines" id="dl-R"></div></div>
    </div>

    <!-- MINIMAP -->
    <div id="dt-minimap">
      <canvas id="mm-canvas"></canvas>
    </div>

  </div><!-- #dt-main -->
</div><!-- #diff-app -->

<!-- diff-match-patch via CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/diff_match_patch/20121119/diff_match_patch.js"></script>

<script>
/* =====================================================
   TEXT DIFF TOOL — claudielarouche.com
   ===================================================== */
(function () {
'use strict';

// =====================================================
// --- STATE ---
// =====================================================
const ST = {
  lLines:  [],   // rendered line objects for left panel
  rLines:  [],   // rendered line objects for right panel
  active:  false,
};

// =====================================================
// --- UTILS ---
// =====================================================
function esc(s) {
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;');
}

function $id(id) { return document.getElementById(id); }

function settings() {
  return {
    trim:  $id('opt-trim').checked,
    ws:    $id('opt-ws').checked,
    blank: $id('opt-blank').checked,
    icase: $id('opt-case').checked,
  };
}

function normLine(text, s) {
  let t = text;
  if (s.trim)  t = t.trim();
  if (s.ws)    t = t.replace(/\s+/g,' ').trim();
  if (s.icase) t = t.toLowerCase();
  return t;
}

// =====================================================
// --- DIFF ENGINE ---
// =====================================================
function runDiff(leftText, rightText) {
  const s = settings();

  // If ignoring blank lines, strip them from both sides before diffing
  let lRaw = leftText.split('\n');
  let rRaw = rightText.split('\n');
  if (s.blank) {
    lRaw = lRaw.filter(l => l.trim() !== '');
    rRaw = rRaw.filter(l => l.trim() !== '');
  }

  // Build normalized text for comparison only
  function buildForDiff(rawLines) {
    return rawLines.map(l => normLine(l, s) + '\n').join('');
  }

  const dmp = new diff_match_patch(); // eslint-disable-line no-undef
  const {chars1, chars2, lineArray} = dmp.diff_linesToChars_(
    buildForDiff(lRaw),
    buildForDiff(rRaw)
  );
  const rawDiffs = dmp.diff_main(chars1, chars2, false);
  dmp.diff_cleanupSemantic(rawDiffs);
  dmp.diff_charsToLines_(rawDiffs, lineArray);

  // Expand to operations with raw-line tracking
  const ops = [];
  let li = 0, ri = 0;

  for (const [op, chunk] of rawDiffs) {
    const normLines = chunk.split('\n');
    if (normLines[normLines.length - 1] === '') normLines.pop();
    const count = normLines.length;

    if (op === 0) {          // EQUAL
      const block = { type: 'equal', L: [], R: [] };
      for (let k = 0; k < count; k++) {
        block.L.push({ n: li + 1, t: lRaw[li] ?? '' });
        block.R.push({ n: ri + 1, t: rRaw[ri] ?? '' });
        li++; ri++;
      }
      ops.push(block);
    } else if (op === -1) {  // DELETE
      const block = { type: 'del', L: [], R: [] };
      for (let k = 0; k < count; k++) {
        block.L.push({ n: li + 1, t: lRaw[li] ?? '' });
        li++;
      }
      ops.push(block);
    } else {                 // INSERT
      const block = { type: 'ins', L: [], R: [] };
      for (let k = 0; k < count; k++) {
        block.R.push({ n: ri + 1, t: rRaw[ri] ?? '' });
        ri++;
      }
      ops.push(block);
    }
  }

  // Merge adjacent del+ins into change
  const merged = [];
  for (let i = 0; i < ops.length; i++) {
    if (ops[i].type === 'del' && ops[i + 1] && ops[i + 1].type === 'ins') {
      merged.push({ type: 'chg', L: ops[i].L, R: ops[i + 1].R });
      i++;
    } else {
      merged.push(ops[i]);
    }
  }

  // Moved-block detection: del block whose content equals an ins block
  const dels = merged.filter(o => o.type === 'del');
  const inss = merged.filter(o => o.type === 'ins');

  for (const d of dels) {
    const dk = d.L.map(l => l.t).join('\n');
    if (!dk.trim()) continue;
    for (const ins of inss) {
      if (ins.R.map(l => l.t).join('\n') === dk) {
        d.type = 'mov-del';
        ins.type = 'mov-ins';
        break;
      }
    }
  }

  // Build flat left/right line arrays with phantom lines for alignment
  const lLines = [], rLines = [];
  let added = 0, deleted = 0, changed = 0, moved = 0;

  for (const op of merged) {
    switch (op.type) {
      case 'equal':
        for (let i = 0; i < op.L.length; i++) {
          lLines.push({ ty: 'unchanged', n: op.L[i].n, t: op.L[i].t });
          rLines.push({ ty: 'unchanged', n: op.R[i].n, t: op.R[i].t });
        }
        break;

      case 'chg': {
        const max = Math.max(op.L.length, op.R.length);
        for (let i = 0; i < max; i++) {
          const hasL = i < op.L.length;
          const hasR = i < op.R.length;
          if (hasL && hasR) {
            const cd = charDiff(op.L[i].t, op.R[i].t);
            lLines.push({ ty: 'changed', n: op.L[i].n, t: op.L[i].t, segs: cd.L });
            rLines.push({ ty: 'changed', n: op.R[i].n, t: op.R[i].t, segs: cd.R });
          } else if (hasL) {
            lLines.push({ ty: 'changed', n: op.L[i].n, t: op.L[i].t });
            rLines.push({ ty: 'phantom', n: null,       t: '' });
          } else {
            lLines.push({ ty: 'phantom', n: null,       t: '' });
            rLines.push({ ty: 'changed', n: op.R[i].n, t: op.R[i].t });
          }
        }
        changed += max;
        break;
      }

      case 'del':
        for (const line of op.L) {
          lLines.push({ ty: 'deleted', n: line.n, t: line.t });
          rLines.push({ ty: 'phantom', n: null,    t: '' });
        }
        deleted += op.L.length;
        break;

      case 'ins':
        for (const line of op.R) {
          lLines.push({ ty: 'phantom', n: null,   t: '' });
          rLines.push({ ty: 'added',   n: line.n, t: line.t });
        }
        added += op.R.length;
        break;

      case 'mov-del':
        for (const line of op.L) {
          lLines.push({ ty: 'moved',   n: line.n, t: line.t });
          rLines.push({ ty: 'phantom', n: null,    t: '' });
        }
        moved += op.L.length;
        break;

      case 'mov-ins':
        for (const line of op.R) {
          lLines.push({ ty: 'phantom', n: null,   t: '' });
          rLines.push({ ty: 'moved',   n: line.n, t: line.t });
        }
        break;
    }
  }

  return { lLines, rLines, stats: { added, deleted, changed, moved } };
}

function charDiff(left, right) {
  const dmp  = new diff_match_patch(); // eslint-disable-line no-undef
  const ds   = dmp.diff_main(left, right);
  dmp.diff_cleanupSemantic(ds);
  const L = [], R = [];
  for (const [op, text] of ds) {
    if (op ===  0) { L.push({ t: text, hi: false }); R.push({ t: text, hi: false }); }
    if (op === -1) { L.push({ t: text, hi: true  }); }
    if (op ===  1) { R.push({ t: text, hi: true  }); }
  }
  return { L, R };
}

// =====================================================
// --- RENDERER ---
// =====================================================
function renderPanel(lines, containerId) {
  const el = $id(containerId);
  el.innerHTML = '';
  for (const line of lines) el.appendChild(mkLine(line));
}

function mkLine(line) {
  const row = document.createElement('div');
  row.className = `dl dl-${line.ty}`;

  const num = document.createElement('span');
  num.className = 'dl-num';
  num.textContent = line.n ?? '';
  row.appendChild(num);

  const txt = document.createElement('span');
  txt.className = 'dl-txt';

  if (line.ty === 'phantom') {
    txt.innerHTML = '&nbsp;';
  } else if (line.segs) {
    txt.innerHTML = line.segs.map(s => s.hi ? `<span class="ch">${esc(s.t)}</span>` : esc(s.t)).join('');
  } else {
    txt.textContent = line.t;
  }

  row.appendChild(txt);
  return row;
}


function renderStats(stats) {
  const bar   = $id('dt-stats');
  const total = stats.added + stats.deleted + stats.changed + stats.moved;
  if (total === 0) {
    bar.textContent = 'No differences found — files are identical.';
  } else {
    bar.innerHTML =
      `<strong>${stats.added}</strong> added &nbsp;·&nbsp; ` +
      `<strong>${stats.deleted}</strong> deleted &nbsp;·&nbsp; ` +
      `<strong>${stats.changed}</strong> changed &nbsp;·&nbsp; ` +
      `<strong>${stats.moved}</strong> moved &nbsp;—&nbsp; ` +
      `<strong>${total}</strong> difference${total !== 1 ? 's' : ''} total`;
  }
  bar.classList.add('show');
}

// =====================================================
// --- MINIMAP ---
// =====================================================
let mmLines = [];

function mmBuild(lines) {
  mmLines = lines;
  const canvas = $id('mm-canvas');
  const cont   = $id('dt-minimap');
  const W      = cont.clientWidth  || 56;
  const H      = cont.clientHeight || 400;
  canvas.width  = W;
  canvas.height = H;
  mmBuildBg();
  mmViewport();
}

function mmBuildBg() {
  const canvas = $id('mm-canvas');
  const W      = canvas.width;
  const H      = canvas.height;
  const ctx    = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  const n      = mmLines.length;
  if (!n) return;
  const COLORS = { added:'#57ab5a', deleted:'#e5534b', changed:'#d4a72c', moved:'#956ee4' };
  for (let i = 0; i < n; i++) {
    const color = COLORS[mmLines[i].ty];
    if (!color) continue;
    ctx.fillStyle = color;
    ctx.fillRect(0, (i / n) * H, W, Math.max(2, H / n));
  }
}

function mmViewport() {
  if (!mmLines.length) return;
  const canvas = $id('mm-canvas');
  const dvL    = $id('dv-L');
  if (!canvas.height) return;

  mmBuildBg();

  const H     = canvas.height;
  const W     = canvas.width;
  const sr    = dvL.scrollTop    / (dvL.scrollHeight  || 1);
  const vr    = dvL.clientHeight / (dvL.scrollHeight  || 1);
  const ctx   = canvas.getContext('2d');
  ctx.fillStyle   = 'rgba(9,105,218,0.12)';
  ctx.strokeStyle = 'rgba(9,105,218,0.55)';
  ctx.lineWidth   = 1;
  ctx.fillRect  (0, sr * H, W, vr * H);
  ctx.strokeRect(0, sr * H, W, vr * H);
}

// =====================================================
// --- SYNC SCROLL ---
// =====================================================
let _syncing = false;

function syncScroll(src) {
  if (_syncing) return;
  _syncing = true;
  const a = $id('dv-L'), b = $id('dv-R');
  if (src === 'L') { b.scrollTop = a.scrollTop; b.scrollLeft = a.scrollLeft; }
  else             { a.scrollTop = b.scrollTop; a.scrollLeft = b.scrollLeft; }
  mmViewport();
  _syncing = false;
}

// =====================================================
// --- SPLITTER ---
// =====================================================
function initSplitter() {
  const sp = $id('dt-splitter');
  const pL = $id('panel-L');
  const pR = $id('panel-R');
  let sx, lw, rw;

  sp.addEventListener('mousedown', e => {
    sx = e.clientX;
    lw = pL.getBoundingClientRect().width;
    rw = pR.getBoundingClientRect().width;
    sp.classList.add('dragging');
    document.body.style.cursor      = 'col-resize';
    document.body.style.userSelect  = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!sp.classList.contains('dragging')) return;
    const dx   = e.clientX - sx;
    const tot  = lw + rw;
    const lpct = Math.max(20, Math.min(80, ((lw + dx) / tot) * 100));
    pL.style.flex = `0 0 ${lpct}%`;
    pR.style.flex = `0 0 ${100 - lpct}%`;
  });

  document.addEventListener('mouseup', () => {
    sp.classList.remove('dragging');
    document.body.style.cursor     = '';
    document.body.style.userSelect = '';
  });
}

// =====================================================
// --- ACTIONS ---
// =====================================================
function doCompare() {
  const ltxt = $id('ta-L').value;
  const rtxt = $id('ta-R').value;

  if (!ltxt.trim() && !rtxt.trim()) {
    alert('Both panels are empty. Paste some text to compare.');
    return;
  }

  const result = runDiff(ltxt, rtxt);
  ST.lLines  = result.lLines;
  ST.rLines  = result.rLines;
  ST.active  = true;

  $id('ta-L').style.display = 'none';
  $id('ta-R').style.display = 'none';
  $id('dv-L').classList.add('show');
  $id('dv-R').classList.add('show');

  renderPanel(ST.lLines, 'dl-L');
  renderPanel(ST.rLines, 'dl-R');
  renderStats(result.stats);
  mmBuild(ST.lLines);
}

function resetView() {
  ST.active  = false;
  ST.lLines  = [];
  ST.rLines  = [];

  $id('ta-L').style.display = '';
  $id('ta-R').style.display = '';
  $id('dv-L').classList.remove('show');
  $id('dv-R').classList.remove('show');
  $id('dl-L').innerHTML = '';
  $id('dl-R').innerHTML = '';
  $id('dt-stats').classList.remove('show');
  mmLines = [];
  const c = $id('mm-canvas'), ctx = c.getContext('2d');
  ctx.clearRect(0, 0, c.width, c.height);
}

function clearPanel(side) {
  $id(`ta-${side}`).value = '';
  if (ST.active) resetView();
}

function clearAll() {
  $id('ta-L').value = '';
  $id('ta-R').value = '';
  resetView();
}



// =====================================================
// --- INIT ---
// =====================================================
function init() {
  if (typeof diff_match_patch === 'undefined') { // eslint-disable-line no-undef
    alert('Failed to load the diff library. Please check your internet connection and reload.');
    return;
  }

  initSplitter();

  $id('btn-compare')  .addEventListener('click', doCompare);
  $id('btn-clear-all').addEventListener('click', clearAll);
  $id('btn-clear-L')   .addEventListener('click', () => clearPanel('L'));
  $id('btn-clear-R')   .addEventListener('click', () => clearPanel('R'));


  $id('dv-L').addEventListener('scroll', () => syncScroll('L'), { passive: true });
  $id('dv-R').addEventListener('scroll', () => syncScroll('R'), { passive: true });

  $id('dt-settings-hdr').addEventListener('click', () => {
    const body  = $id('dt-settings-body');
    const arrow = $id('dt-settings-arrow');
    body.classList.toggle('open');
    arrow.textContent = body.classList.contains('open') ? '▼' : '▶';
  });

  $id('mm-canvas').addEventListener('click', e => {
    const rect  = $id('mm-canvas').getBoundingClientRect();
    const ratio = (e.clientY - rect.top) / rect.height;
    const dvL   = $id('dv-L');
    dvL.scrollTop = ratio * dvL.scrollHeight;
  });

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault(); doCompare();
    }
  });

  window.addEventListener('resize', () => {
    if (ST.active) mmBuild(ST.lLines);
    else {
      const c = $id('mm-canvas'), cont = $id('dt-minimap');
      c.width = cont.clientWidth; c.height = cont.clientHeight;
    }
  });

  const c = $id('mm-canvas'), cont = $id('dt-minimap');
  c.width  = cont.clientWidth  || 56;
  c.height = cont.clientHeight || 400;
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
</script>
