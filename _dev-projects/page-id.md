---
title: Page Identification Tool
description: To be completed
image: 
tags: [hidden]
permalink: /dev-projects/page-id/
layout: dev
sitemap: false
css: 
  - /assets/css/page-id.css
js: 
  - /assets/js/page-id.js
---

Please use the buttons below or hit the letters A for Automation, D for DINE, R for RTL, M for Manual, and T for TBD. 
Every time you press a button, the tool will take the "current page" number from the input box and place it in the correct location in the text below.
The text can be edited as needed. For this tool to work, please do not remove the text Automation, DINE, RTL, Manual, TBD from the final input box below.
<br><br>
Use the P button to identify pages that are rotated (it will not increase page count). You can send the list to Max to redo the OCR on those pages.

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


## RTL/DINE/Manual Reference

### RTL

- If we don’t know if it’s been paid (any pages with child information, but no costing info)
- Approval letters and acceptance letters
- Request form
- Child care notification form
- Invoice (but not sure if paid or not) - Except for SK (see below)
  - SK: All invoices should be marked Manual, except for hotels, flight companies, taxis etc
- Authorization of funding (Autorisation de dépenses)
- Request for funding
- Legal documentation
- “Special Needs Requests”
- Travel claim
- Memos
- Babysitting receipts
- Notice of admission forms
- Notice of discharge forms
- Purchase Authority Slip
- Initial Placement Forms (IPF)
- Determination of eligibility forms
- Financial home visit form
- If there is no indication child is in care, it is RTL.
- Foster parent placement form
- Requisition for goods and services
- Clothing request form
- SK - Community Event
- Elder Services
- (requests are pretty much always RTL

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
<h3 class="mt-4 mb-2">Automation</h3>
<ul>
<li>Manitoba - General Ledget by Child Report</li>
</ul>
<h3 class="mt-4 mb-2">TBD</h3>
<ul>
<li>If you are unsure what a page should be identified as, ask Stéphane or Julia.</li>
</ul>
