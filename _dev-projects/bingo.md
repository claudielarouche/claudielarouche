---
layout: dev
title: Bingo Drawer (1-12)
---

<style>
  .bingo-wrap { max-width: 760px; margin: 0 auto; padding: 24px; }
  .bingo-card { border: 1px solid #ddd; border-radius: 18px; padding: 22px; box-shadow: 0 6px 18px rgba(0,0,0,.06); }
  .bingo-title { font-size: 28px; margin: 0 0 10px 0; }
  .bingo-sub { margin: 0 0 18px 0; opacity: .8; }
  .bingo-result {
    display: flex; align-items: baseline; justify-content: center; gap: 18px;
    padding: 18px; border-radius: 16px; background: #f6f7f8; margin: 14px 0 18px 0;
    min-height: 90px;
  }
  .bingo-letter { font-size: 64px; font-weight: 800; line-height: 1; }
  .bingo-number { font-size: 64px; font-weight: 800; line-height: 1; }
  .bingo-status { text-align: center; margin-top: 6px; opacity: .85; }
  .bingo-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 14px; }
  .bingo-btn {
    font-size: 22px; padding: 14px 22px; border-radius: 14px; border: 0; cursor: pointer;
    box-shadow: 0 6px 18px rgba(0,0,0,.08);
  }
  .bingo-btn-primary { background: #111; color: #fff; }
  .bingo-btn-secondary { background: #e9eaec; color: #111; }
  .bingo-btn:disabled { opacity: .5; cursor: not-allowed; }
  .bingo-drawn {
    margin-top: 18px;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 10px;
  }
  .bingo-pill {
    background: #fff; border: 1px solid #e2e2e2; border-radius: 999px;
    padding: 10px 12px; text-align: center; font-weight: 700;
  }
  .bingo-footer { margin-top: 16px; text-align: center; opacity: .7; font-size: 14px; }
</style>

<div class="bingo-wrap">
  <div class="bingo-card">
    <h1 class="bingo-title">Bingo drawer</h1>
    <p class="bingo-sub">Press Draw or hit Enter. Numbers are 1 to 12.</p>

    <div class="bingo-result" aria-live="polite">
      <div class="bingo-letter" id="letter">B</div>
      <div class="bingo-number" id="number">?</div>
    </div>

    <div class="bingo-status" id="status">0 of 60 drawn</div>

    <div class="bingo-actions">
      <button class="bingo-btn bingo-btn-primary" id="drawBtn" type="button">DRAW</button>
      <button class="bingo-btn bingo-btn-secondary" id="newGameBtn" type="button">New game</button>
    </div>

    <div class="bingo-drawn" id="drawnList"></div>
    <div class="bingo-footer">Tip: Enter draws again. No repeats in the same game.</div>
  </div>
</div>

<script>
  (function () {
    const letters = ["B", "I", "N", "G", "O"];
    const maxNumber = 12;

    const letterEl = document.getElementById("letter");
    const numberEl = document.getElementById("number");
    const statusEl = document.getElementById("status");
    const drawnListEl = document.getElementById("drawnList");
    const drawBtn = document.getElementById("drawBtn");
    const newGameBtn = document.getElementById("newGameBtn");

    const storageKey = "bingo_drawer_1_12_state_v1";

    function buildAllCombos() {
      const combos = [];
      for (const l of letters) {
        for (let n = 1; n <= maxNumber; n++) combos.push(l + n);
      }
      return combos;
    }

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function loadState() {
      try {
        const raw = localStorage.getItem(storageKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || !Array.isArray(parsed.remaining) || !Array.isArray(parsed.drawn)) return null;
        return parsed;
      } catch {
        return null;
      }
    }

    function saveState(state) {
      localStorage.setItem(storageKey, JSON.stringify(state));
    }

    function render(state) {
      statusEl.textContent = state.drawn.length + " of 60 drawn";
      drawnListEl.innerHTML = "";

      for (const combo of state.drawn.slice().reverse()) {
        const pill = document.createElement("div");
        pill.className = "bingo-pill";
        pill.textContent = combo[0] + " " + combo.slice(1);
        drawnListEl.appendChild(pill);
      }

      const done = state.remaining.length === 0;
      drawBtn.disabled = done;
      if (done) statusEl.textContent = "All 60 drawn. Start a new game.";
    }

    function startNewGame() {
      const all = buildAllCombos();
      const state = {
        remaining: shuffle(all.slice()),
        drawn: []
      };
      saveState(state);
      letterEl.textContent = "B";
      numberEl.textContent = "?";
      render(state);
      return state;
    }

    let state = loadState() || startNewGame();

    function drawOne() {
      if (state.remaining.length === 0) return;

      const combo = state.remaining.pop();
      state.drawn.push(combo);
      saveState(state);

      letterEl.textContent = combo[0];
      numberEl.textContent = combo.slice(1);

      render(state);
    }

    drawBtn.addEventListener("click", drawOne);
    newGameBtn.addEventListener("click", function () {
      state = startNewGame();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        drawOne();
      }
    });

    render(state);
  })();
</script>
