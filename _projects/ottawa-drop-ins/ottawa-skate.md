---
title: List of Places to Skate in Ottawa
description: A subset of the City of Ottawa Drop-Ins, but just for skating!
image: https://claudielarouche.com/assets/img/skating.jpg
image_hero: https://claudielarouche.com/assets/img/skating.jpg
tags: [Ottawa]
permalink: /projects/ottawa-skate/
layout: projects
js:
  - https://code.jquery.com/jquery-3.6.0.min.js
  - https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js
  - https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js
  - https://cdn.datatables.net/buttons/1.7.1/js/buttons.colVis.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js
  - /assets/js/skate.js
css: 
  - https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css
  - https://fonts.googleapis.com/icon?family=Material+Icons
---

{% include ottawa-drop-ins-nav.html %}      

<br>

<a href="#csvData" class="btn btn-primary">Go to listing</a>

<a href="#filters" class="btn btn-primary" >Go to filters</a>

<a href="#" class="btn btn-primary" id="showToday" >Show me today's programs</a>

<a href="#newsletter" class="btn btn-warning" >Sign-up for updates</a>

<a href="https://forms.gle/7YHFbimGH4p5imQD8" class="btn btn-primary" target="_blank">Contact me</a>



## Filters

Please note that you can also use the "search" box directly on the data table to filter the data.

<form class="form">

<div class="form-group row">
<label for="selectedArea" class="col-sm-2 col-form-label">Select Area(s):</label>
<div class="col-sm-10">
<div class="checkbox">
<label><input type="checkbox" id="centralCheckbox" class="areaCheckbox" value="Central" checked=""> Central</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="eastCheckbox" class="areaCheckbox" value="East" checked=""> East</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="southCheckbox" class="areaCheckbox" value="South" checked=""> South</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="westCheckbox" class="areaCheckbox" value="West" checked=""> West</label>
</div>
</div>
</div>

<div class="form-group row">
<label for="selectedDay" class="col-sm-2 col-form-label">Select Days of the week:</label>
<div class="col-sm-10">
<!--<button type="button" id="selectAllCategoryButton" class="btn btn-primary">Select All</button>
<button type="button" id="unselectAllCategoryButton" class="btn btn-secondary">Unselect All</button>-->

<div class="checkbox">
<label><input type="checkbox" id="mondayCheckbox" class="dayCheckbox" value="Monday" checked=""> Monday</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="tuesdayCheckbox" class="dayCheckbox" value="Tuesday" checked=""> Tuesday</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="wednesdayCheckbox" class="dayCheckbox" value="Wednesday" checked=""> Wednesday</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="thursdayCheckbox" class="dayCheckbox" value="Thursday" checked=""> Thursday</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="fridayCheckbox" class="dayCheckbox" value="Friday" checked=""> Friday</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="saturdayCheckbox" class="dayCheckbox" value="Saturday" checked=""> Saturday</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="sundayCheckbox" class="dayCheckbox" value="Sunday" checked=""> Sunday</label>
</div>

</div>

</div>

<div class="form-group row">
<label for="selectedAge" class="col-sm-2 col-form-label">Select Age Group: </label>
<div class="col-sm-10">
<!--<button type="button" id="selectAllCategoryButton" class="btn btn-primary">Select All</button>
<button type="button" id="unselectAllCategoryButton" class="btn btn-secondary">Unselect All</button>-->

<div class="checkbox">
<label><input type="checkbox" id="preschoolCheckbox" class="ageCheckbox" value="Preschool" checked=""  > Preschool (0 to 5)</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="childrenCheckbox" class="ageCheckbox" value="Children" checked=""  > Children (6 to 12)</label>
</div>

<div class="checkbox">
<label><input type="checkbox" id="youthCheckbox" class="ageCheckbox" value="Youth" checked="" > Youth (13 to 17)</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="adultCheckbox" class="ageCheckbox" value="Adult" checked=""  > Adult</label>
</div>

<div class="checkbox">
<label><input type="checkbox" id="50Checkbox" class="ageCheckbox" value="50+" checked="" > 50+</label>
</div>


</div>

</div>
<div class="form-group row">
<label for="selectedTime" class="col-sm-2 col-form-label">Select Time of Day: </label>
<div class="col-sm-10">
<div class="checkbox">
<label><input type="checkbox" id="amCheckbox" class="timeCheckbox" value="AM" checked=""> AM</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="pmCheckbox" class="timeCheckbox" value="PM" checked=""> PM</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="eveningCheckbox" class="timeCheckbox" value="Evening" checked=""> Evening</label>
</div>

</div>


</div>

</form>

<div class="mt-3">
<a href="#csvData" class="btn btn-primary">
View activities
</a>
</div>
<div class="mt-3">
<button class="btn btn-secondary" onclick="clearAllFilters()">
Reset filters to default
</button>
</div>

<div class="alert alert-info mt-3" role="alert">
<span class="material-icons" style="vertical-align: middle;">lightbulb</span>
Data listed was accurate at the time of publication and is subject to change. Before attending a drop-in activity please confirm schedules, reservation processes, fees, and other details, by <strong>visiting the facility page</strong>. claudielarouche.com is not affiliated with the City of Ottawa in any way. All trademarks and copyrights are property of their respective owners.
</div>

## City of Ottawa Activities

Data last updated: 2025-05-04 (Data is updated approximately every Sunday)  
You can request an update at claudielarouche@gmail.com  

<div id="csvData"></div>