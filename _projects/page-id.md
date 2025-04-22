---
title: Page Identification Tool
description: To be completed
image: 
tags: [hidden]
permalink: /projects/page-id/
layout: page
sitemap: false
---

<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
<style>
.container {
margin-top: 20px;
}
.input-group-text {
min-width: 100px;
}
textarea {
overflow: hidden; /* Prevents scroll bar from appearing */
}
</style>



Please use the buttons below or hit the letters A for Automation, D for DINE, R for RTL, M for Manual, and T for TBD. 
Every time you press a button, the tool will take the "current page" number from the input box and place it in the correct location in the text below.
The text can be edited as needed. For this tool to work, please do not remove the text Automation, DINE, RTL, Manual, TBD from the final input box below.
<br><br>
Use the P button to identify pages that are rotated (it will not increase page count). You can send the list to Max to redo the OCR on those pages.

<div class="container">

<div class="input-group mb-3">
<div class="input-group-prepend">
<span class="input-group-text">Current Page</span>
</div>
<input type="number" id="pageNumber" class="form-control" value="1">
</div>

<div class="btn-group mb-3" role="group" aria-label="Page Buttons">
<button type="button" class="btn btn-primary" onclick="addToText('Automation')">A - Automation</button>
<button type="button" class="btn btn-secondary" onclick="addToText('DINE')">D - DINE</button>
<button type="button" class="btn btn-success" onclick="addToText('RTL')">R - RTL</button>
<button type="button" class="btn btn-danger" onclick="addToText('Manual')">M - Manual</button>
<button type="button" class="btn btn-warning" onclick="addToText('TBD')">T - TBD</button>
<button type="button" class="btn btn-info" onclick="addToText('Pivot')">P - Pivot</button>
</div>

<textarea class="form-control" id="finalText" rows="8" oninput="adjustTextArea(this)">Automation: 
DINE: 
RTL: 
Manual: 
TBD: 

Pivot: 
</textarea>

<button class="btn btn-info mt-3" onclick="createFinalRecord()">Create Final Record</button>
<p id="recordDisplay"></p>
<p id="instructionDisplay"></p>
<button class="btn btn-warning mt-2" onclick="startOver()">Start Over</button>

<div>
<h2 class="mb-3 mt-2 pb-1 border-bottom">RTL/DINE/Manual Reference</h2>
<h3 class="mt-4 mb-2">RTL</h3>
<ul>
<li>If we don’t know if it’s been paid (any pages with child information, but no costing info)</li>
<li>Approval letters and acceptance letters</li>
<li>Request form</li>
<li>Child care notification form</li>
<li>Invoice (but not sure if paid or not) - Except for SK (see below)</li>
<ul>
<li>SK: All invoices should be marked Manual, except for hotels, flight companies, taxis etc</li>
</ul>
<li>Authorization of funding (Autorisation de dépenses)</li>
<li>Request for funding</li>
<li>Legal documentation</li>
<li>“Special Needs Requests”</li>
<li>Travel claim</li>
<li>Memos</li>
<li>Babysitting receipts</li>
<li>Notice of admission forms</li>
<li>Notice of discharge forms</li>
<li>Purchase Authority Slip</li>
<li>Initial Placement Forms (IPF)</li>
<li>Determination of eligibility forms</li>
<li>Financial home visit form</li>
<li>If there is no indication child is in care, it is RTL.</li>
<li>Foster parent placement form</li>
<li>Requisition for goods and services</li>
<li>Clothing request form</li>
<li>SK - Community Event</li>
<li>Elder Services</li>
<li>(requests are pretty much always RTL)</li>
</ul>
<h3 class="mt-4 mb-2">DINE</h3>
<ul>
<li>Files with passwords are DINE.</li>
<li>Pages with no names</li>
<li>Pages with only adult names</li>
<li>If there is no indication that the child is in care</li>
<li>Aide à domicile / Home Care Services (8420) -> This is for adults</li>
</ul>
<h3 class="mt-4 mb-2">Manual</h3>
<ul>
<li>Chèques at the top with details under (SK)</li>
<li>Saskatchewan: If you see anything with "Questionable", although it looks super easy to parse, it always goes to Manual</li>
<li>SK: Maintenance monthly report</li>
<li>SK - Invoices</li>
<li>Manitoba - Accompanying Schedule to DOCFS Billing, Explanations for Other Expensitures</li>  
</ul>
<h3 class="mt-4 mb-2">TBD</h3>
<ul>
<li>If you are unsure what a page should be identified as, ask Stéphane or Julia.</li>
</ul>
</div>

</div>

<script type="text/javascript" src="{{ "/assets/js/page-id.js" | relative_url }}"></script>
