---
title: Government of Canada Acronyms Game
description: How well do you know your acronyms?
image: https://claudielarouche.com/assets/img/acronyms.jpg
tags: [Other]
permalink: /projects/acronym-game/
layout: page
---

The data for this game was last downloaded on December 16, 2024, from the <a href="https://open.canada.ca/data/en/dataset/83320390-7715-43bc-a281-2049bf5d4232" target="_blank">Open Government website</a>. This website was built by <a href="https://claudielarouche.com/" target="_blank">Claudie Larouche</a> with help from <a href="https://openai.com/chatgpt" target="_blank">ChatGPT</a>, based on an idea from Emily Fegan. If you enjoy this game or have ideas for improvement, please send your feedback to <a href="mailto:claudielarouche@gmail.com">claudielarouche@gmail.com</a>.
        
<div>
<label for="game-mode" class="form-label">Choose the game mode:</label>
<select id="game-mode" class="form-select mb-3">
<option value="guessAcronym">Guess the Acronym from Department Name</option>
<option value="guessName">Guess the Department Name from Acronym</option>
</select>
</div>
<div>
<label for="question-count-select" class="form-label">Choose the number of questions:</label>
<select id="question-count-select" class="form-select mb-3">
<option value="10">10 Questions</option>
<option value="25">25 Questions</option>
<option value="50">50 Questions</option>
<option value="all" selected>All Questions</option>
</select>
<button id="start-game" class="btn btn-success">Play!</button>
</div>
<p id="progress-display">Question: 0/0</p>
<div id="game-area" class="mt-3" style="display: none;">
<p id="question"></p>
<input type="text" id="answer" class="form-control mb-3" onkeypress="checkEnter(event)">
<button id="validate-answer" class="btn btn-info">Validate Answer</button>

</div>
<div id="feedback" class="text-info mb-3"></div>
<button id="next-question" class="btn btn-secondary" style="display: none;">Next Question</button>
<div id="score-area">
<h2>Your Score: <span id="score">0</span>/<span id="total-questions">0</span></h2>
</div>

<hr>

## How this game was built

To build this game, I used the column called “Abbreviation” to identify the acronym. However, for the long form of the name, I had to be a bit more creative.
- If a value existed under “Applied Title”, that is the one I used.
- If a value did not exist under “Applied Title”, I used “Legal Title” instead

The following organizations are excluded because they don’t have a value under “Abbreviation”:

- Leaders’ Debates Commission
- National Security and Intelligence Review Agency Secretariat
- Office of the Intelligence Commissioner
- Canada Emission Reduction Incentives Agency
- Invest in Canada Hub

The organization called “Treasury Board” with Abbreviation of “TB” was removed since we have “Treasury Board Secretariat” / “TBS”. I’ve never heard of TB only, have you??

“Registrar of the Supreme Court of Canada and that portion of the federal public administration appointed under subsection 12(2) of the Supreme Court Act” was renamed to “Registrar of the Supreme Court of Canada”. You’re welcome.

There are 2 entries for “Offices of the Information and Privacy Commissioners of Canada”. One with Abbreviation “OPC”, the other with “OIC”. Which one is correct? Your guess is as good as mine, but I suspect they are both incorrect haha.

<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
<script src="{{ "/assets/js/acronyms-game.js" | relative_url }}"></script>
