---
title: Kindergym in Ottawa
description: A subset of the City of Ottawa Drop-Ins, but just for kindergym!
image: https://claudielarouche.com/assets/img/kindergym.jpg
image_hero: https://claudielarouche.com/assets/img/kindergym.jpg
tags: [Ottawa]
permalink: /dev-projects/ottawa-kindergym/
layout: dev
js:
  - https://code.jquery.com/jquery-3.6.0.min.js
  - https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js
  - https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js
  - https://cdn.datatables.net/buttons/1.7.1/js/buttons.colVis.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js
  - /assets/js/kindergym.js
css: 
  - https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css
  - https://fonts.googleapis.com/icon?family=Material+Icons
---

{% include ottawa-drop-ins/header.html %}      

{% include filter-area.html %}   

{% include filter-days-of-week.html %}   

{% include filter-time-of-day.html %}   

{% include view-data-reset-filter.html %}   

{% include ottawa-drop-ins/alert-info.html %}  

## Kindergym Schedule

{% include ottawa-drop-ins/last-updated.html %}  

<div id="csvData"></div>