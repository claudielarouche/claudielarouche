---
title: City of Ottawa Drop-Ins
description: Racquet sports, gym sports, swimming, skating, etc.
image: https://claudielarouche.com/assets/img/racquets.jpg
image_hero: https://claudielarouche.com/assets/img/racquets.jpg
tags: [Ottawa]
permalink: /projects/ottawa-drop-ins/
layout: projects
js:
  - https://code.jquery.com/jquery-3.6.0.min.js
  - https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js
  - https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js
  - https://cdn.datatables.net/buttons/1.7.1/js/buttons.colVis.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js
  - /assets/js/ottawa-drop-ins/ottawa.js
css: 
  - https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css
  - https://fonts.googleapis.com/icon?family=Material+Icons
---
     
{% include ottawa-drop-ins/message.html %}    

{% include ottawa-drop-ins/header.html %}        

{% include filter-area.html %}   

{% include filter-days-of-week.html %}   

{% include ottawa-drop-ins/filter-categories.html %}   

{% include ottawa-drop-ins/filter-age-group.html %}   

{% include filter-time-of-day.html %}   

{% include view-data-reset-filter.html %}   

{% include ottawa-drop-ins/alert-info.html %}  

## City of Ottawa Activities

{% include ottawa-drop-ins/last-updated.html %}  

<div id="csvData"></div>