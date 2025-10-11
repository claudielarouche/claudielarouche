---
layout: dev
title: Latitude Longitude
permalink: /dev-projects/lat-long/
js:  
  - /assets/js/lat-long.js
---


## How to use
	
Enter a list of addresses below (one per line) and the tool will generate the longitude and latitude for all the addresses  

<textarea id="addressInput" rows="5" cols="50"></textarea>
<button onclick="geocodeAddresses()">Generate</button>
<div id="output"></div>