---
title: City of Ottawa Wading Pools
description: A list of all the wading pools in Ottawa!
image: https://claudielarouche.com/assets/img/wading-pool.jpg
tags: [Ottawa]
permalink: /projects/wading-pools/
layout: projects
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

<div class="mt-3">
<a href="#filters" class="btn btn-primary" >
    Go to filters
</a>
</div>

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


   
## Filters


<form class="form">

			
{% include filter-area.html %}  


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
Legend: ![Closed](https://maps.google.com/mapfiles/ms/icons/red-dot.png) The pool is closed today ![Open](https://maps.google.com/mapfiles/ms/icons/green-dot.png) The pool is open today  

## List of Wading Pools

Please note that the table below contains information licensed under the [Open Government Licence – City of Ottawa](https://ottawa.ca/en/city-hall/open-transparent-and-accountable-government/open-data){:target="_blank" rel="noopener noreferrer"}.

To reduce the size of the table below, the table only show today's schedule by default. To see the schedule for other days, please click on the "Column visibility" button and add any days you wish to see. You can also view the full schedule of any individual wading pool by clicking on its pin on the map.

<div id="csvData"></div>

Data source: [City of Ottawa Open Data](https://open.ottawa.ca/datasets/7a66e4301c60460c97f0d7c2830fb855_11/explore?location=45.271605%2C-75.773591%2C1.63)  