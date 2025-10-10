---
layout: dev
title: Remaining Work Time Tracker (Claudie)
permalink: /dev-projects/remaining-work-time-tracker-cl/
css: 
  - /assets/css/remaining-work-tracker.css
js:  
  - /assets/js/remaining-work-tracker.js
---



<div class="workday-tracker">

  {% include remaining-time-tracker/step1.html %} 

  <div id="workday-periods" class="workday-periods" aria-live="polite">
    <div class="period-row">
        <input type="time" class="time-input start" value="05:15" />
        <input type="time" class="time-input end" value="06:15" />
    </div>

    <div class="period-row">
      <input type="time" class="time-input start" value="08:00" />
      <input type="time" class="time-input end" value="12:00" />
      <button type="button" class="remove-period" aria-label="Remove period">✖</button>
    </div>

    <div class="period-row">
      <input type="time" class="time-input start" value="13:00" />
      <input type="time" class="time-input end" value="15:00" />
      <button type="button" class="remove-period" aria-label="Remove period">✖</button>
    </div>
  </div>

  <button type="button" class="add-period" id="add-period">Add another work period</button>

  {% include remaining-time-tracker/summary.html %} 
</div>

{% include remaining-time-tracker/task-planning.html %} 