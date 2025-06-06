---
title: Time Difference Calculator
description: Use this calculator to help sum up leave needed when you work multiple blocks during a day
image: https://claudielarouche.com/assets/img/clocks.jpg
image_hero: https://claudielarouche.com/assets/img/clocks.jpg
tags: [Work]
permalink: /projects/time-diff/
sitemap: false
layout: projects
js:
  - https://code.jquery.com/jquery-3.6.0.min.js
  - https://cdn.jsdelivr.net/npm/flatpickr
  - /assets/js/time-diff.js
css: 
  - https://fonts.googleapis.com/icon?family=Material+Icons
  - https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css
---

## How to use this tool

Please enter start and end time, as well as the AM and PM indicator. Then click the Calculate button to count the difference between the two times. If you have added multiple rows of times to calculate, the tool will add them all up.  


<form id="timeCalcForm">
  <div id="timeInputs">
    <fieldset class="time-inputs">
      <legend>Time Block</legend>
      <label for="start1">Start Time:</label>
      <input type="text" id="start1" name="start1" class="timepicker start-time">
      <label for="end1">End Time:</label>
      <input type="text" id="end1" name="end1" class="timepicker end-time">
    </fieldset>
  </div>
  <div class="button-group">
    <button type="button" class="btn btn-primary" id="calculate">Calculate</button>
    <button type="button" class="btn btn-success" id="addTime">Add More Time Boxes</button>
    <button type="button" class="btn btn-warning" id="reset">Start Over</button>
  </div>
</form>

<div id="totalTime" class="mt-4"></div>

## Why was this tool created

Being the Mom of a young child, I often work partial days when my son is home sick. It was taking me a lot of time trying to figure out how many hours I have worked in a day when I work from 6:00 AM to 6:30 AM and then from 10:45 AM to 11:51 AM and then from 1:32 PM to 3:29 PM and so on and so forth. So I created this tool to help me calculate how many hours I managed to work so that I can quickly put in a leave request for the correct amount of time.  


