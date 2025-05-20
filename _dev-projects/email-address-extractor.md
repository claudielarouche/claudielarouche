---
title: Email Address Extractor
description: Paste any paragrah of text, let the tool extract all the email addresses for you
image: https://claudielarouche.com/assets/img/letters.jpg
tags: [Work]
permalink: /dev-projects/email-address-extractor/
layout: dev
js: 
  - https://code.jquery.com/jquery-3.6.0.min.js
  - /assets/js/email-extractor.js
css: 
  - https://fonts.googleapis.com/icon?family=Material+Icons
---


<style>
    #output {
        margin-top: 20px;
        font-size: 16px;
    }
</style>

## How to use

Enter any paragraph of text in the box below. The tool will find all the email addresses from the block of text and show them on the screen so that you can easily copy paste them. Duplicates are removed.  

Email addresses are all separated by a semi-colon so that you can quickly paste them in your email client to send a quick message out.  

If you like this tool, please let me know by sending me a quick email at claudielarouche@gmail.com  
<label for="textInput">Enter text:</label><br>
<textarea id="textInput" rows="10" cols="100"></textarea>
<br>
<button onclick="extractEmails()">Extract Email Addresses</button>
<button onclick="clearInput()">Clear</button>
</div>
<div id="output"></div>
</div>
