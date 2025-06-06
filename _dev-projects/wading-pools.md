---
title: City of Wading Pools
description: A list of all the wading pools in Ottawa!
image: https://claudielarouche.com/assets/img/wading-pool.jpg
tags: [Ottawa]
permalink: /projects/wading-pools/
layout: dev
js:
  - https://code.jquery.com/jquery-3.6.0.min.js
  - https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js
  - https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js
  - https://cdn.datatables.net/buttons/1.7.1/js/buttons.colVis.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js
  - https://unpkg.com/leaflet/dist/leaflet.js
  - /assets/js/wading-pools.js
css: 
  - https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css
  - https://fonts.googleapis.com/icon?family=Material+Icons
  - https://unpkg.com/leaflet/dist/leaflet.css
---

<div class="mt-3">
<a href="#csvData" class="btn btn-primary">
    Go to wading pool listing
</a>
</div>

<!--<div class="mt-3">
<a href="#filters" class="btn btn-primary" >
    Go to filters
</a>
</div>-->

<div class="mt-3">
<a href="#map" class="btn btn-primary" >
    Go to map
</a>
</div>

<div class="mt-3">
<a href="#newsletter" class="btn btn-warning" >
    Sign-up for updates
</a>
</div>

<div class="mt-3">
<a href="https://forms.gle/7YHFbimGH4p5imQD8" class="btn btn-primary" target="_blank">
    Contact me
</a>
</div>



	
  <!--    
## Filters


<form class="form">

			

<div class="form-group row">
    <label for="selectedBoard" class="col-sm-2 col-form-label">Select School Board(s):</label>
    <div class="col-sm-10">
        <div class="checkbox">
            <label><input type="checkbox" id="ocdsbCheckbox" class="boardCheckbox" value="Ottawa-Carleton District School Board" checked=""> Ottawa-Carleton District School Board (OCDSB)</label>
        </div>
        <div class="checkbox">
            <label><input type="checkbox" id="ocsbCheckbox" class="boardCheckbox" value="Ottawa Catholic School Board" checked=""> Ottawa Catholic School Board (OCSB)</label>
        </div>
        <div class="checkbox">
            <label><input type="checkbox" id="cepeoCheckbox" class="boardCheckbox" value="Conseil des écoles publiques de l'Est de l'Ontario" checked=""> Conseil des écoles publiques de l'Est de l'Ontario (CEPEO)</label>
        </div>
        <div class="checkbox">
            <label><input type="checkbox" id="cecceCheckbox" class="boardCheckbox" value="Conseil des écoles catholiques du Centre-Est" checked=""> Conseil des écoles catholiques du Centre-Est (CECCE)</label>
        </div>
        <div class="checkbox">
            <label><input type="checkbox" id="privateCheckbox" class="boardCheckbox" value="N/A" checked=""> Private Schools (N/A)</label>
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
</div>-->

<div id="map" style="height: 400px; width: 100%;"></div>

## List of Wading Pools

<div id="csvData"></div>

Data source: [City of Ottawa Open Data](https://open.ottawa.ca/datasets/7a66e4301c60460c97f0d7c2830fb855_11/explore?location=45.271605%2C-75.773591%2C1.63)  