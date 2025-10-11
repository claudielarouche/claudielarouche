---
layout: dev
description: Track how much time left to your workday and the progress of your daily tasks
title: Work Tracker
tags: [Work]
permalink: /dev-projects/work-tracker-dev/
image: https://claudielarouche.com/assets/img/work-tracker.jpg
css: 
  - /dev-projects/work-tracker-dev/work-tracker-dev.css
js:  
  - /dev-projects/work-tracker-dev/work-tracker-dev.js
---

<div class="workday-tracker">

  {% include work-tracker/step1.html %} 

  <div id="workday-periods" class="workday-periods" aria-live="polite">
    <!-- Work periods are dynamically built by JS.
         Default values are shown only if no ?periods= param is found. -->
    <div class="period-row">
      <input type="time" class="time-input start" value="08:00" />
      <input type="time" class="time-input end" value="12:00" />
      <button type="button" class="remove-period" aria-label="Remove period">✖</button>
    </div>

    <div class="period-row">
      <input type="time" class="time-input start" value="12:30" />
      <input type="time" class="time-input end" value="16:00" />
      <button type="button" class="remove-period" aria-label="Remove period">✖</button>
    </div>
  </div>

  <!-- Copy custom URL section -->
  <div class="custom-url-section">
    <button type="button" id="copy-url-btn">Copy your custom URL</button>
    <p class="custom-url-note">
      Clicking this button will copy a custom URL reflecting your work periods.  
      You can paste it in your browser and save it as a bookmark to restore these same blocks automatically next time.
    </p>
    <p id="copy-confirmation" class="copy-confirmation hidden">✅ URL copied to clipboard!</p>
  </div>

  <button type="button" class="add-period" id="add-period">Add another work period</button>

  {% include work-tracker/summary.html %} 
</div>

{% include work-tracker/task-planning.html %}
