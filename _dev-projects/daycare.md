---
title: City of Ottawa Daycares
description: A list of daycares in Ottawa
image: https://claudielarouche.com/assets/img/school.jpg
tags: [Ottawa]
permalink: /dev-projects/daycare/
layout: dev
js:
  - https://code.jquery.com/jquery-3.6.0.min.js
  - https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js
  - https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js
  - https://cdn.datatables.net/buttons/1.7.1/js/buttons.colVis.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js
  - https://unpkg.com/leaflet/dist/leaflet.js
  - /assets/js/daycare.js
css:
  - https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css
  - https://fonts.googleapis.com/icon?family=Material+Icons
  - https://unpkg.com/leaflet/dist/leaflet.css
---

<h1>Daycares in Ottawa</h1>

<div class="mt-3">
<a href="#csvData" class="btn btn-primary">
    Go to daycare listing
</a>
</div>

<div class="mt-3">
<a href="#filters" class="btn btn-primary">
    Go to filters
</a>
</div>

<div class="mt-3">
<a href="#map" class="btn btn-primary">
    Go to map
</a>
</div>

<div class="mt-3">
<a href="https://forms.gle/7YHFbimGH4p5imQD8" class="btn btn-primary" target="_blank">
    Contact me
</a>
</div>

If any of the data below is incorrect, please contact me at claudielarouche@gmail.com to inform me of the correction needed.

## Filters {#filters}

<form class="form">
    <div class="form-group row">
        <label for="selectedType" class="col-sm-2 col-form-label">Select Type(s):</label>
        <div class="col-sm-10">
            <div class="checkbox">
                <label><input type="checkbox" class="typeCheckbox" value="Centre" checked=""> Centre-based</label>
            </div>
            <div class="checkbox">
                <label><input type="checkbox" class="typeCheckbox" value="Home" checked=""> Home daycare</label>
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
    View data
</a>
</div>

<div id="map" style="height: 400px; width: 100%;"></div>

## List of daycares

<div id="csvData"></div>
