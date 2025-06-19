---
title: Find the nearest LRT
description: Find the nearest LRT station to any address in Ottawa
image: https://claudielarouche.com/assets/img/train.jpg
image_hero: https://claudielarouche.com/assets/img/train.jpg
tags: [Work in progress]
permalink: /projects/lrt/
layout: projects
js:
  - https://code.jquery.com/jquery-3.6.0.min.js
  - /assets/js/lrt.js
css: 
  - https://fonts.googleapis.com/icon?family=Material+Icons
---

<input id="addressInput" type="text" placeholder="Enter your address" size="50">
<button onclick="findClosestStations()">Calculate</button>
<div id="results"></div>

