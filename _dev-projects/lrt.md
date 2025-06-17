---
title: LRT Station Finder
description: Find the closest LRT station to you
image: https://claudielarouche.com/assets/img/kindergym.jpg
image_hero: https://claudielarouche.com/assets/img/kindergym.jpg
tags: [Ottawa]
permalink: /dev-projects/lrt/
layout: dev
js:
  - https://code.jquery.com/jquery-3.6.0.min.js
  - /assets/js/lrt.js
css: 
  - https://fonts.googleapis.com/icon?family=Material+Icons
---

<input id="addressInput" type="text" placeholder="Enter your address" size="50">
<button onclick="findClosestStations()">Calculate</button>
<div id="results"></div>

