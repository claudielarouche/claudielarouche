---
title: URL Extractor
description: Extract all URLs from a web page
image: https://claudielarouche.com/assets/img/fishing.jpg
image_hero: https://claudielarouche.com/assets/img/fishing.jpg
tags: [Work]
permalink: /projects/url-extractor/
layout: projects
js: 
  - /assets/js/url-extractor.js
css: 
  - https://fonts.googleapis.com/icon?family=Material+Icons
---

## How to use this tool

Enter the link of a webpage in the box below and click "Analyze". You can use the default value as an example. The tool will analyze the page and extract all the links in that page, listing them below, one line per URL.  

Unfortunately, I am unable to extract content from all web pages, sorry about that!


<label for="urlInput">Enter URL:</label>
<input type="text" id="urlInput" value="https://www.canada.ca/en/treasury-board-secretariat/services/departmental-performance-reports/2023-24-departmental-results-reports.html">
<button onclick="analyze()">Analyze</button>
<div id="result"></div>





