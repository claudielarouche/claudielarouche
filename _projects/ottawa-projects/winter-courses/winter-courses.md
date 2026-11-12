---
title: City of Ottawa Winter 2027 Courses
description: Search and filter City of Ottawa winter 2027 recreational courses and programs.
image: https://claudielarouche.com/assets/img/winter-sport.jpg
image_hero: https://claudielarouche.com/assets/img/winter-sport.jpg
hidden: true
tags: [Ottawa]
permalink: /projects/winter-courses-2027/
layout: projects
js:
  - https://code.jquery.com/jquery-3.6.0.min.js
  - https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js
  - https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js
  - https://cdn.datatables.net/buttons/1.7.1/js/buttons.colVis.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js
  - /assets/js/winter-courses/winter-courses.js
css:
  - https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css
  - https://fonts.googleapis.com/icon?family=Material+Icons
---

{% include winter-courses/header.html %}

{% include filter-days-of-week.html %}

{% include winter-courses/filter-age-group.html %}

{% include filter-time-of-day.html %}

{% include winter-courses/filter-department.html %}

{% include winter-courses/filter-activity-category.html %}

{% include view-data-reset-filter.html %}

## City of Ottawa Winter 2027 Courses

{% include winter-courses/last-updated.html %}

<div id="csvData"></div>
