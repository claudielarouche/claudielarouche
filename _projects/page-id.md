---
title: Page Identification Tool
description: To be completed
image: 
tags: [hidden]
permalink: /projects/page-id/
layout: page
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

### Invoices

- If there are no names: DINE
- If the invoice has maintenance cost and days: Manual
- If the invoice is paid: Manual
- If it's unclear the invoice is paid or not: RTL
- Saskatchewan: All invoices should be marked Manual, except for hotels, flight companies, taxis etc

### RTL

- As a general rule, if the cost only falls in "other cost" category, it would be RTL
- Approval letters and acceptance letters
- Request form
- Child care notification form
- Child care instruction sheet
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
- (requests are pretty much always RTL)
- Fee requisition
- Support worker timesheet
- Support / Respite worker report
- Application for Age of Majority Allowance

### DINE

- Files with passwords are DINE.
- Pages with no names
- Pages with only adult names
- If there is no indication that the child is in care
- Aide à domicile / Home Care Services (8420) -> This is for adults

### Manual

- Chèques at the top with details under (SK)
- Saskatchewan: If you see anything with "Questionable", although it looks super easy to parse, it always goes to Manual
- Maintenance monthly report
- Manitoba - Accompanying Schedule to DOCFS Billing, Explanations for Other Expensitures

### Automation

- Manitoba - General Ledger by Child Report

### TBD

- If you are unsure what a page should be identified as, ask Stéphane or Julia.
