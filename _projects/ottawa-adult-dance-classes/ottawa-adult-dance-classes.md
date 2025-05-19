---
layout: projects
title: Ottawa Adult Dance Classes Repository
permalink: /projects/ottawa-adult-dance-classes/
description: A listing of adult dance classes in Ottawa
tags: [Ottawa]
image: https://claudielarouche.com/assets/img/dance.jpg
js: 
  - https://code.jquery.com/jquery-3.6.0.min.js
  - https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js
  - https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js
  - https://cdn.datatables.net/buttons/1.7.1/js/buttons.colVis.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js
  - /assets/js/dance.js
css: 
  - https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css
---

A list of adult dance classes in Ottawa.

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
View dance classes
</a>
</div>


## Dance classes

Please <a href="https://forms.gle/uYWN8SJGCwrpU3249" target="_blank">fill this form if you would like to submit a dance class / teacher to be added to the list</a>.  

<div id="csvData"></div>


