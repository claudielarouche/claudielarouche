---
title:  Departmental Results Reports / Departmental Plans Analyzer
description: Extract content from Government of Canada Departmental Results Reports or Departmental Plans for ease of analyzing
image: 
image_hero: 
tags: [Work]
permalink: /dev-projects/drr-dp-analyzer/
layout: dev
js:
  - https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js
  - /assets/js/drr-dp-analyzer.js
css: 
  - https://fonts.googleapis.com/icon?family=Material+Icons
---

## How to use this website

Please select whether you want to extract information from the Departmental Result Reports or the Departmental Plans. Select the year you are interested in (only one year currently available, more coming soon!)  

You may select which department(s) you want to extract information from.   

Please write the content of the heading of the section you are interested in. You can only search for text in a heading.   

Once your selections are done, click on "Extract". If all departments are selected, this could take around 10 minutes.  

The tool does not work with 100% accuracy, sorry :)   

<label for="datasetSelect">Choose a dataset:</label>
<select id="datasetSelect" onchange="loadUrls()">
  <option value="Departmental Result Reports 2023-24">Departmental Result Reports 2023-24</option>
</select>

<div>
  <button onclick="selectAll()">Select All</button>
  <button onclick="unselectAll()">Unselect All</button>
</div>
<div id="urlCheckboxes"></div> <!-- this holds all the checkboxes -->


<label for="searchText">Search for heading containing:</label>
<input type="text" id="searchText" value="contracts awarded to Indigenous businesses"/>

<button onclick="scrape()">Extract</button>

<div id="results"></div>

