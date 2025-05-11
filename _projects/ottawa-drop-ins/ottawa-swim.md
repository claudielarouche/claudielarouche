---
title: List of Places to Swim in Ottawa
description: A subset of the City of Ottawa Drop-Ins, but just for swimming!
image: https://claudielarouche.com/assets/img/swim.jpg
image_hero: https://claudielarouche.com/assets/img/swim.jpg
tags: [Ottawa]
permalink: /projects/ottawa-swim/
layout: projects
js:
  - https://code.jquery.com/jquery-3.6.0.min.js
  - https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js
  - https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js
  - https://cdn.datatables.net/buttons/1.7.1/js/buttons.colVis.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js
  - /assets/js/ottawa-drop-ins/common.js
  - /assets/js/ottawa-drop-ins/swim.js
css: 
  - https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css
  - https://fonts.googleapis.com/icon?family=Material+Icons
---

This tool is dedicated to [Dave Sampson](https://davidsampson.ca/wp/){:target="_blank" rel="noopener noreferrer"} ([LinkedIn](https://www.linkedin.com/in/davidrsampson){:target="_blank" rel="noopener noreferrer"}) who suggested it to me at a NAC concert where we bumped into each other 🙂

{% include ottawa-drop-ins/header.html %}      

{% include filter-area.html %}   

{% include filter-days-of-week.html %}   

{% include ottawa-drop-ins/filter-age-group.html %}   

{% include filter-time-of-day.html %}     

{% include view-data-reset-filter.html %}   

{% include ottawa-drop-ins/alert-info.html %}  

## City of Ottawa Swimming Schedule

{% include ottawa-drop-ins/last-updated.html %}  

<div id="csvData"></div>