---
title: Email Address Extractor
description: Paste any paragrah of text, let the tool extract all the email addresses for you
image: https://claudielarouche.com/assets/img/letters.jpg
image_hero: https://claudielarouche.com/assets/img/letters.jpg
tags: [Work]
permalink: /projects/email-address-extractor/
layout: projects
js: 
  - https://code.jquery.com/jquery-3.6.0.min.js
  - /assets/js/email-extractor.js
css: 
  - https://fonts.googleapis.com/icon?family=Material+Icons
---

## How to use

Enter any paragraph of text in the box below. The tool will find all the email addresses from the block of text and show them on the screen so that you can easily copy paste them. Duplicates are removed.  

Email addresses are all separated by a semi-colon so that you can quickly paste them in your email client to send a quick message out.  

If you like this tool, please let me know by sending me a quick email at claudielarouche@gmail.com  

<label for="textInput">Enter text:</label>  

<textarea id="textInput" rows="10" cols="100"></textarea>

<div class="btn-group mb-3" role="group" aria-label="Buttons">
  <button type="button" class="btn btn-primary" onclick="extractEmails()">Extract Email Addresses</button>
  <div id="copyContainer" >
    <button type="button" class="btn btn-warning" onclick="copyOutput()">Copy</button>
    <span id="copyMessage" style="margin-left: 8px; color: green;"></span>
  </div>
  <button type="button" class="btn btn-danger" onclick="clearInput()">Clear</button>
</div>

<div id="output"></div>

