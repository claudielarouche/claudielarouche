---
layout: projects
description: Track how much time left to your workday and the progress of your daily tasks
title: Work Tracker
tags: [Work]
permalink: /projects/work-tracker/
image: https://claudielarouche.com/assets/img/work-tracker.jpg
css: 
  - /assets/css/work-tracker.css
js:  
  - /assets/js/work-tracker.js
---

<div class="workday-tracker">

  {% include work-tracker/step1.html %} 

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

  {% include work-tracker/summary.html %} 
</div>

{% include work-tracker/task-planning.html %} 