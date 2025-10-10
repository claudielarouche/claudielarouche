---
layout: dev
title: Remaining Work Time Tracker
permalink: /dev-projects/remaining-work-time-tracker/
css: 
  - /assets/css/remaining-work-tracker.css
js:  
  - /assets/css/remaining-work-tracker.js
---



<div class="workday-tracker">

  {% include remaining-time-tracker/step1.html %} 

  <div id="workday-periods" class="workday-periods" aria-live="polite">
    <div class="period-row">
        <input type="time" class="time-input start" value="08:00" />
        <input type="time" class="time-input end" value="12:00" />
    </div>

    <div class="period-row">
      <input type="time" class="time-input start" value="12:30" />
      <input type="time" class="time-input end" value="16:00" />
      <button type="button" class="remove-period" aria-label="Remove period">✖</button>
    </div>
  </div>

  <button type="button" class="add-period" id="add-period">Add another work period</button>

  {% include remaining-time-tracker/summary.html %} 
</div>

{% include remaining-time-tracker/task-planning.html %} 