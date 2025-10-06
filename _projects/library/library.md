---
title: City of Ottawa Library Programs
description: A tool to browse and filter all public library events in Ottawa
image: https://claudielarouche.com/assets/img/library-small.jpg
image_hero: https://claudielarouche.com/assets/img/library-small.jpg
permalink: /projects/library/
tags: [Ottawa]
layout: projects
js:
  - https://code.jquery.com/jquery-3.6.0.min.js
  - https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js
  - https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js
  - https://cdn.datatables.net/buttons/1.7.1/js/buttons.colVis.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js
  - /assets/js/library.js
css: 
  - https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css
  - https://fonts.googleapis.com/icon?family=Material+Icons
---


Photo by <a href="https://unsplash.com/@trnavskauni?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Trnava University</a> on <a href="https://unsplash.com/photos/brown-wooden-book-shelf-with-books-BEEyeib-am8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      
			
<a href="#csvData" class="btn btn-primary">Go to listing</a>

<a href="#filters" class="btn btn-primary" >Go to filters</a>

<a href="#" class="btn btn-primary" id="showToday" >Show me today's programs</a>

<a href="#newsletter" class="btn btn-warning" >Sign-up for updates</a>

<a href="https://forms.gle/7YHFbimGH4p5imQD8" class="btn btn-primary" target="_blank">Contact me</a>


## Filters

Please note that you can also use the "search" box directly on the data table to filter the data.

<form class="form">

<div class="form-group row">
<label for="selectedDate" class="col-sm-2 col-form-label">Select Date: </label>
<div class="col-sm-10">
<input type="date" id="selectedDate" class="form-control col-sm-2">
</div>
</div>
 
{% include filter-area.html %}   

<div class="form-group row">
<label for="selectedAudience" class="col-sm-2 col-form-label">Select Audience(s):</label>
<div class="col-sm-10">
<button type="button" id="selectAllAudiencesButton" class="btn btn-primary">Select All</button>
<button type="button" id="unselectAllAudiencesButton" class="btn btn-secondary">Unselect All</button>
<div class="checkbox">
<label><input type="checkbox" id="babyCheckbox" class="audienceCheckbox" value="Baby" checked=""> Baby</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="toddlerCheckbox" class="audienceCheckbox" value="Toddler" checked=""> Toddler</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="preschoolCheckbox" class="audienceCheckbox" value="Preschool" checked=""> Preschool</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="childCheckbox" class="audienceCheckbox" value="Child" checked=""> Child</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="teenCheckbox" class="audienceCheckbox" value="Teen" checked=""> Teen</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="familyCheckbox" class="audienceCheckbox" value="Family" checked=""> Family</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="adultCheckbox" class="audienceCheckbox" value="Adult" checked=""> Adult</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="50plusCheckbox" class="audienceCheckbox" value="50-plus" checked=""> 50-plus</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="newcomersCheckbox" class="audienceCheckbox" value="Newcomers" checked=""> Newcomers</label>
</div>
</div>
</div>

</form>

<div class="mt-3">
<button class="btn btn-secondary" onclick="clearAllFilters()">
Reset filters to default
</button>
</div>
<div class="mt-3">
<a href="#csvData" class="btn btn-primary">
View schedule
</a>
</div>

<div class="alert alert-info mt-3" role="alert">
<span class="material-icons" style="vertical-align: middle;">lightbulb</span>
Please make sure to <strong>always click on the Program Name link</strong> to verify that the schedule on this web page is accurate. Please note that I am not informed of last minute cancellations.
</div>

## Library Activities
Data last updated: 2025-10-06 (Data is updated approximately every Monday)

<label>
<input type="checkbox" id="showTodayOnly" name="showTodayOnly">
Show Today Only
</label>

<div id="csvData"></div>

