---
title: City of Ottawa Schools
description: A list of all the schools in Ottawa!
image: https://claudielarouche.com/assets/img/school.jpg
tags: [Ottawa]
permalink: /projects/ottawa-schools/
layout: projects
js:
  - https://code.jquery.com/jquery-3.6.0.min.js
  - https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js
  - https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js
  - https://cdn.datatables.net/buttons/1.7.1/js/buttons.colVis.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js
  - https://unpkg.com/leaflet/dist/leaflet.js
  - /assets/js/schools.js
css: 
  - https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css
  - https://fonts.googleapis.com/icon?family=Material+Icons
  - https://unpkg.com/leaflet/dist/leaflet.css
---

<h1>How to choose a school in Ottawa</h1>

<div class="mt-3">
<a href="#csvData" class="btn btn-primary">
    Go to school listing
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
<a href="#faq" class="btn btn-primary" >
    Frequently Asked Questions
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


Selecting the right school for your child can be a stressful decision for parents, so I decided to create this resource to try and help.  

If any of the data below is incorrect, please contact me at claudielarouche@gmail.com to inform me of the correction needed.  
	
      
## Filters


<form class="form" data-gtm-form-interact-id="0">
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
    <div class="form-group row">
        <label for="selectedOption" class="col-sm-2 col-form-label">Other options:</label>
        <div class="col-sm-10">
            <div class="checkbox">
                <label><input type="checkbox" id="virtualCheck" class="optionsCheckbox" value="Virtual" checked="" data-gtm-form-interact-field-id="0"> Virtual</label>
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

## List of schools

Please note that this table contains information licensed under the [Open Government Licence – City of Ottawa](https://ottawa.ca/en/city-hall/open-transparent-and-accountable-government/open-data){:target="_blank" rel="noopener noreferrer"}.

<div id="csvData"></div>

## Frequently Asked Questions {#faq}

### What are the different school boards in Ottawa?

**Ottawa-Carleton District School Board (OCDSB)**  
The OCDSB is the largest school board in Ottawa, serving a diverse student population. It offers a wide range of programs including French Immersion, Alternative schools, and Special Education needs.  

**Ottawa Catholic School Board (OCSB)**  
The OCSB focuses on a values-based education grounded in Catholic faith, open to all students who wish to participate in a Catholic educational environment.  

**Conseil des écoles publiques de l'Est de l'Ontario (CEPEO)**  
This public French-language board serves students who qualify under French-language rights in Ontario, providing education primarily in French.  

**Conseil des écoles catholiques du Centre-Est (CECCE)**  
The largest French-language Catholic school board in Ontario, offering instruction from kindergarten to Grade 12, emphasizing spiritual growth and academic excellence.  

### How do I determine which school my child can attend based on my address?

You can use each board's school locator to determine which schools your child is eligible to attend:

- [OCDSB School Locator](https://staffapps.ocdsb.ca/school_locator/default.aspx){:target="_blank" rel="noopener noreferrer"}
- [OCSB School Locator](https://schoollocator.ocsb.ca:8081/Eligibility.aspx?Page=School){:target="_blank" rel="noopener noreferrer"}
- [CECCE School Locator](https://ctso.mybusplanner.ca/Eligibility.aspx){:target="_blank" rel="noopener noreferrer"}
- [CEPEO School Locator](https://cepeo.maps.arcgis.com/apps/webappviewer/index.html?id=9bf66b0e927143c885b607db7168f12b){:target="_blank" rel="noopener noreferrer"}
