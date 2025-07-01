---
title: City of Ottawa Playgrounds
description: A map and list of all the playgrounds in Ottawa!
image: https://claudielarouche.com/assets/img/playground.jpg
image-hero: https://claudielarouche.com/assets/img/playground.jpg
tags: [Ottawa]
permalink: /projects/playgrounds/
layout: projects
js:
  - https://code.jquery.com/jquery-3.6.0.min.js
  - https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js
  - https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js
  - https://cdn.datatables.net/buttons/1.7.1/js/buttons.colVis.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js
  - https://unpkg.com/leaflet/dist/leaflet.js
  - /assets/js/playgrounds.js
css: 
  - https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css
  - https://fonts.googleapis.com/icon?family=Material+Icons
  - https://unpkg.com/leaflet/dist/leaflet.css
---

<div class="admonition note">
  <p><span class="admonition-icon">ℹ️</span>
  <strong>Please Note</strong>: This project is still under construction, thank you for your patience! Please help me fill the missing data by submitting information about the parks you are familiar with (the link to submit data is in the map or in the table, thanks!). </p>
</div>

<div class="mt-3">
<a href="#csvData" class="btn btn-primary">
    Go to playgrounds listing
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

<div class="form-group row">
  <label for="selectedFeature" class="col-sm-2 col-form-label">Only include parks that have:</label>
  <div class="col-sm-10">
    <button type="button" id="selectAllFeaturesButton" class="btn btn-primary">Select All</button>
    <button type="button" id="unselectAllFeaturesButton" class="btn btn-secondary">Unselect All</button>
    <div class="checkbox">
      <label><input type="checkbox" id="washroomCheckbox" class="featureCheckbox" value="Washroom" checked=""> Washroom</label>
    </div>
    <div class="checkbox">
      <label><input type="checkbox" id="picnicCheckbox" class="featureCheckbox" value="Picnic Table" checked=""> Picnic Table</label>
    </div>
    <div class="checkbox">
      <label><input type="checkbox" id="fenceCheckbox" class="featureCheckbox" value="Fenced area" checked=""> Fenced Area</label>
    </div>
    <div class="checkbox">
      <label><input type="checkbox" id="splashPadCheckbox" class="featureCheckbox" value="Splash Pad" checked=""> Splash Pad</label>
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


## List of Playgrounds



<div id="csvData"></div>

Please note that the table above contains information licensed under the [Open Government Licence – City of Ottawa](https://ottawa.ca/en/city-hall/open-transparent-and-accountable-government/open-data){:target="_blank" rel="noopener noreferrer"}.

Data source: To be completed