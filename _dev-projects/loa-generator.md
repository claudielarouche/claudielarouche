---
title: Letter of Agreement Generator
description: Letter of Agreement Generator for the Free Agent Program
image: https://claudielarouche.com/assets/img/printer.jpg
image_hero: https://claudielarouche.com/assets/img/printer.jpg
tags: [hidden]
permalink: /dev-projects/loa-generator/
layout: dev
js:
  - https://code.jquery.com/jquery-3.5.1.slim.min.js
  - /assets/js/ottawa-drop-ins/loa-generator.js
css: 
---

Content coming soon


If you have any questions or requests for modifications, please contact Claudie at Claudielarouche@gmail.com  

<!--
<h2>Coming soon</h2>
<ul>
<li>Change all email addresses into clickable links</li>
<li>Create different versions for different home departments</li>
<li>Maybe more! Submit your ideas to Claudie! </li>

</ul>
-->
<form id="agreementForm">
    <div class="form-group row">
        <label for="personName" class="col-sm-2 col-form-label">Free Agent's Name:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="personName" name="personName" required value="Claudie Larouche">
        </div>
    </div>
    <div class="form-group row">
        <label for="ministerName" class="col-sm-2 col-form-label">Minister of the host department:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="ministerName" name="ministerName" required value="Minister of Indigenous Services">
        </div>
    </div>
    <div class="form-group row">
        <label for="departmentName" class="col-sm-2 col-form-label">Name of Host Department:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="departmentName" name="departmentName" required value="Indigenous Services Canada">
        </div>
    </div>
    <div class="form-group row">
        <label for="departmentAddress" class="col-sm-2 col-form-label">Address of Host Department:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="departmentAddress" name="departmentAddress" required value="10 Wellington, Gatineau, QC">
        </div>
    </div>	
	<div class="form-group row">
        <label for="linguisticProfile" class="col-sm-2 col-form-label">Position Linguistic Profile:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="linguisticProfile" name="linguisticProfile" required value="CBC/CBC">
        </div>
    </div>	
    <div class="form-group row">
        <label for="bilingualBonusDropdown" class="col-sm-2 col-form-label">Free Agent is receiving the bilingual bonus:</label>
        <div class="col-sm-10">
            <select class="form-control" id="bilingualBonusDropdown" name="bilingualBonusDropdown">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
        </div>
    </div>	
	<div class="form-group row">
        <label for="clearance" class="col-sm-2 col-form-label">Position Sercurity Clearance:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="clearance" name="clearance" required value="Secret Clearance">
        </div>
    </div>	
	<div class="form-group row">
        <label for="startDate" class="col-sm-2 col-form-label">Assignment Start Date (format: Month DD, YYYY):</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="startDate" name="startDate" required value="October 16, 2023">
        </div>
    </div>	
	<div class="form-group row">
        <label for="endDate" class="col-sm-2 col-form-label">Assignment End Date (format: Month DD, YYYY):</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="endDate" name="endDate" required value="December 28, 2023">
        </div>
    </div>	
	<div class="form-group row">
        <label for="level" class="col-sm-2 col-form-label">Assignment Level:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="level" name="level" required value="IT-03">
        </div>
    </div>	
	<div class="form-group row">
        <label for="depCode" class="col-sm-2 col-form-label">Financial - Host Department Code:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="depCode" name="depCode" required value="9999">
        </div>
    </div>	
	<div class="form-group row">
        <label for="orgCode" class="col-sm-2 col-form-label">Financial - Host Organization Code:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="orgCode" name="orgCode" required value="A99999">
        </div>
    </div>	
	<div class="form-group row">
        <label for="refCode" class="col-sm-2 col-form-label">Financial - Host Reference Code:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="refCode" name="refCode" required value="9999999999">
        </div>
    </div>	
	<div class="form-group row">
        <label for="hostContactName" class="col-sm-2 col-form-label">Host Department Contact Name:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="hostContactName" name="hostContactName" required value="Jane Doe">
        </div>
    </div>	
	<div class="form-group row">
        <label for="hostContactPosition" class="col-sm-2 col-form-label">Host Department Contact Position:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="hostContactPosition" name="hostContactPosition" required value="Senior director">
        </div>
    </div>	
	<div class="form-group row">
        <label for="hostContactEmail" class="col-sm-2 col-form-label">Host Department Contact Email address:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="hostContactEmail" name="hostContactEmail" required value="jane.doe@dept-dept.gc.ca">
        </div>
    </div>	
	<div class="form-group row">
        <label for="finContactName" class="col-sm-2 col-form-label">Host Department Financial Contact Name:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="finContactName" name="finContactName" required value="Jane Doe">
        </div>
    </div>	
	<div class="form-group row">
        <label for="finContactPosition" class="col-sm-2 col-form-label">Host Department Financial Contact Position:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="finContactPosition" name="finContactPosition" required value="Manager, Finance">
        </div>
    </div>	
	<div class="form-group row">
        <label for="finContactEmail" class="col-sm-2 col-form-label">Host Department Financial Contact Email address:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="finContactEmail" name="finContactEmail" required value="jane.doe@dept-dept.gc.ca">
        </div>
    </div>	
	<div class="form-group row">
        <label for="signatoryTitle" class="col-sm-2 col-form-label">Host Department Signatory Title (director level or above):</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="signatoryTitle" name="signatoryTitle" required value="Senior Director, ACC">
        </div>
    </div>
    <div class="form-group row">
        <label for="mainTasks" class="col-sm-2 col-form-label">Main Tasks:</label>
        <div class="col-sm-10">
            <textarea class="form-control" id="mainTasks" name="mainTasks" rows="10">Main Task 1
Main Task 2
Main Task 3</textarea>
        </div>
    </div>
    <div class="form-group row">
        <label for="supportingTasks" class="col-sm-2 col-form-label">Supporting Tasks (optional):</label>
        <div class="col-sm-10">
            <textarea class="form-control" id="supportingTasks" name="supportingTasks" rows="10">Supporting Task 1
Supporting Task 2
Supporting Task 3</textarea>
        </div>
    </div>
    <button type="button" class="btn btn-primary" onclick="generateAgreement()">Generate Letter of Agreement</button>
	<!-- Save button -->
    <button type="button" class="btn btn-success" onclick="saveFormData()">Save Form Data</button>
    <!-- Load button -->
    <input type="file" id="fileInput" style="display: none;">
    <button type="button" class="btn btn-info" onclick="loadFormData()">Load Form Data</button>

	
</form>


    
<div class="letter-content" id="letterContent" style="display: none;">
		<h1 id="letterTitle">Letter of Agreement</h1>
        <p id="betweenParagraph"><strong>Between</strong></p>
		<p><strong>His Majesty the King in Right of Canada</strong> as represented by the <strong><span id="ministerNameDisplay">[Minister]</span></strong>, acting through <strong><span id="departmentNameDisplay">[Name of Department]</span> (the host department)</strong> at <span id="addressDisplay">[Address of Department]</span>.</p>
        <p id="andParagraph"><strong>and</strong></p>
		<p><strong>His Majesty the King in Right of Canada</strong> as represented by the <strong>Minister of Natural Resources</strong>, acting through <strong>Natural Resources Canada (the home department)</strong> at 580 Booth Street, Ottawa, Ontario.</p>
        <p id="partiesAgreeParagraph">The parties agree to the following:</p>
        <h2 id="agreementHeading">1.0 The Agreement</h2>
        <p id="agreementContentParagraph">1.1&nbsp;&nbsp;With this Agreement, the host department is retaining the services of <strong><span id="personNameDisplay">[NAME]</span></strong>, as part of the Canada’s Free Agents program, pursuant to discussions between the host department and the home department to have the Free Agent undertake the work described in Annex A of this Agreement for the benefit and at the request of the host department.</p>
		<h2>2.0 Administrative responsibilities of the home department and the Free Agent</h2>
		<p>2.1 The home department remains the Free Agent’s substantive employer and shall be responsible for managing the Free Agent’s human resources (HR) file, which includes:</p>
		<ul>
			<li>approving leave requests</li>
			<li>completing the performance management agreement, with input from the host manager</li>
			<li>providing regular training and development opportunities</li>
		</ul>
		<p>2.2 As an indeterminate employee of the home department, the Free Agent has certain responsibilities, including but not limited to:</p>
		<ul>
			<li>returning to the home department as needed</li>
			<li>returning to the home department periodically during business hours to ensure that their IT equipment is up to date</li>
		</ul>
		<h2>3.0 Administrative responsibilities of the host department</h2>
		<p>3.1 <strong>For acting assignments only</strong>: If the Free Agent is working at a level that is higher than the employee’s substantive level, the host department is responsible for:</p>
		<ul>
			<li>ensuring the Free Agent meets merit and has been assessed as a fit for the opportunity</li>
			<li>undertaking the related staffing action</li>
			<li>ensuring that the signed letter of offer has been submitted to the home department a minimum of 10 business days prior to its effective date to allow for HR-to-Pay data entry deadlines to be met (to mitigate pay issues for the Free Agent)</li>
		</ul>
<p>3.2 <strong>Performance feedback</strong>: The host department shall provide the home department with feedback about the Free Agent’s performance to enable completion of the Free Agent’s performance management agreement. This feedback will be solicited by the home department periodically, with the host department’s response required within stipulated timelines.</p>
<p>3.3 <strong>Leave approval</strong>: The Free Agent will confirm the host manager’s agreement for any leave taken during the assignment. The Free Agent will then provide the leave information along with host manager’s consent to the talent manager for approval.</p>
<p>3.4 <strong>Vacation and other leave</strong>: Free Agents are indeterminate federal employees and as such have access to leave provisions and other benefits set out in their collective agreements. The host department agrees to allow the Free Agent to take an amount of leave that is, at a minimum, proportionate to the amount of leave the Free Agent is entitled to on an annual basis, pro-rated for the duration of the Agreement.</p>

<p>3.5 <strong>Collective agreement</strong>: All aspects of this Agreement must follow the Free Agent’s collective agreement as it pertains to the appropriate respective bargaining agent.</p>

<p>3.6 <strong>Official languages</strong>: By signing this Agreement, the host department attests that the linguistic profile in relation to the work objectives outlined in Annex A of this Agreement has been objectively established in compliance with the <a href="https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=26168">Directive on Official Languages for People Management</a>. As work objectives are being developed for the Free Agent’s assignment, the host department is invited to use the following TBS tool as guidance when determining the linguistic profile of the work position: <a href="https://www.tbs-sct.canada.ca/lp-pl/index.aspx?Lang=EN">Determining the Linguistic Profile of Bilingual Positions</a>.</p>

<p>The host department acknowledges that it is responsible for ensuring that the obligations of the Official Languages Act, involving Parts IV and V as well as the Directive on Official Languages for People Management, are met at all times with respect to service to the public and language of work within federal institutions, in support of the work objectives outlined in Annex A.</p>

<p>The linguistic profile of the position is confirmed to be <strong><span id="linguisticProfileDisplay">CBC/CBC</span></strong>, which the home department confirms the Free Agent currently meets.</p>

<p>3.7 <strong>Security</strong>: The host department confirms that the security requirement of the position is <strong><span id="clearanceDisplay">secret clearance<span></strong>, which the home department confirms the Free Agent currently meets.</p>

<p>3.8 <strong>Overtime</strong>: If a Free Agent accrues overtime approved by the host manager during the period covered by the Agreement, the Free Agent can take time in lieu, which <strong>must be taken during the assignment</strong> and must not replace regular vacation leave as provided in section 3.4.</p>

<p>Should a Free Agent choose to be compensated by cash payment for overtime, the home department will bill the host department as set out in the process laid out in section 5.0 and in accordance with the provisions of the Free Agent’s collective agreement.</p>

<p>3.9 <strong>Free Agent training and development</strong>: The host department agrees to allow the Free Agent to attend the following:</p>
<ul>
			<li>a regular one-hour virtual Free Agents team meeting every two weeks with the Free Agent’s home department</li>
			<li>a Free Agent virtual program-wide event (approximately one to two hours) per month</li>
			<li>a two-day, in-person program-wide learning and development session for Free Agents, to a maximum of once each year. Free Agents located outside the National Capital Region may require a maximum of two additional days for travel if the activity is in person.</li>
		</ul>


<p>3.10 <strong>Other training and development</strong>: Learning activities that are required by the host department shall be organized and paid for by the host department.</p>

<p>When and where possible, it is encouraged to allow the Free Agent to attend host department learning and development activities aligned with departmental or government priorities or with the Free Agent’s career objectives.</p>

<p>Learning activities discussed as part of the Free Agent’s yearly performance agreement would be organized and paid for by the home department. The Free Agent’s attendance is at the discretion of the host department, which commits to making every effort to ensure that the Free Agent’s participation is facilitated, understanding the importance of balancing operational needs.</p>

<h2>4.0 Duration and termination of the agreement</h2>


<p>4.1 Activities under this Agreement shall commence on <strong><span id="startDateDisplay">October 16, 2023</span></strong>, and conclude on <strong><span id="endDateDisplay">December 28, 2023</span></strong>, or at completion of the work described in Annex A.</p>

<p>4.2 Should the completion of the work covered by this Agreement require an extension beyond or conclude before <strong><span id="endDateDisplay2">December 28, 2023</span></strong>, the home department and the host department can agree to an amended end date by signing an amendment to this Agreement, provided by the home department.</p>

<p>4.3 The host department or the home department may terminate this Agreement before completion of the work by providing a minimum of 10 business days’ notice. In such a case, the home department shall be entitled to all payments for which services were performed up to the amended end date of the Agreement.</p>

<p>4.4 At the completion of the assignment, any unexpended advanced funds shall be returned to the host department via an Interdepartmental Settlement (IS) transfer.</p>

<h2>5.0 Source of funding</h2>

<p>5.1 Upon execution of this Agreement by the parties, at periods identified as part of departmental salary recovery processes, the home department will bill the host department via an IS transfer in accordance with the provisions of the Agreement.</p>

<p>The IS transfer will include the following amounts:</p>

<ol><li><strong>100%</strong> of the Free Agent’s indeterminate <span id="bilingualBonusDisplay1">and bilingual bonus </span>at the <strong><span id="levelDisplay">IT-03</span></strong> level for the duration of the Agreement in accordance with the Directive on Terms and Conditions of Employment and the Bilingualism Bonus Directive</li>
<li>an additional 20% of the Free Agent’s salary<span id="bilingualBonusDisplay2"> and bilingualism bonus</span>, including for any overtime hours that are payable in cash</li>
</ol>

<p>5.2 Host financial information:</p>

<ul>
<li>Host Department Code: <span id="depCodeDisplay">9999</span></li>
<li>Host Organization Code: <span id="orgCodeDisplay">A99999</span></li>
<li>Host Reference Code: <span id="refCodeDisplay">9999999999</span></li>
</ul>

<p>5.3 Salary costs incurred during extended leave (for example, parental leave) will be reduced from the salary amount as described in section 5.1.</p>
<p>5.4 Where the actual salary currently paid to the Free Agent differs from the salary being currently earned, the recovery will reflect the full earned pay and related 20%, as outlined in section 5.1. This recovery will allow for retroactive reimbursement, for example, where there is a delay in processing acting pay or in the transfer of a pay file. It will also allow, in the case of Free Agents who request to take leave with income averaging and whose 12-month repayment period falls partially or entirely within this assignment, for their salary to be recovered at the full rate for their classification and level while working in order for them to self-fund their leave.</p>
<p>5.5 If a host department chooses to use an O&M envelope to pay for some or all of the costs in section 5.1, it is incumbent on the host department to be responsible for any fee to convert those funds to salary. The home department must ultimately receive sufficient funds to fully cover the Free Agent’s salary and other salary costs funded via the 20% identified in section 5.1.</p>
<h2>6.0 Notices</h2>
<p>6.1 All notices and communications to the home department shall be addressed to:</p>
<p><strong>Jodi LeBlanc</strong><br> 
Talent Manager | Gestionnaire de talents<br>
Canada's Free Agents | Agents libres du Canada<br>
Natural Resources Canada | Ressources naturelles Canada<br>
782-377-1621 or <a href="mailto:jodi.leblanc@nrcan-rncan.gc.ca">jodi.leblanc@nrcan-rncan.gc.ca</a></p>
<p>6.2 All notices and communications to the host department in connection with this Agreement shall be addressed to:</p>
<p><strong><span id="hostContactNameDisplay">Jane Doe</span></strong><br>
<span id="hostContactPositionDisplay">Senior Director</span><br>
<span id="department2Display">Indigenous Services Canada</span><br>
<span id="hostContactEmailDisplay">jane.doe@sac-isc.gc.ca</span></p>
<p>Financial Contact:</p>
<p><strong><span id="finContactNameDisplay">John Doe</span></strong><br>
<span id="finContactPositionDisplay">Manager, Financial Services, Business Management Unit</span><br>
<span id="department3Display">Indigenous Services Canada</span><br>
<span id="finContactEmailDisplay">john.doe@sac-isc.gc.ca</span></p>
<p><strong>IN WITNESS WHEREOF, each of the parties have signed.</strong></p>
<p>HIS MAJESTY THE KING IN RIGHT OF CANADA</p>
<p>as represented by the <strong>Minister of Natural Resources</strong></p>
<br><br>
<p>Signature: _______________________________</p>
<p>Title: DG, Planning, Delivery and Results, SPI </p>

<hr>

<p>HIS MAJESTY THE KING IN RIGHT OF CANADA</p>
<p>as represented by the <strong><span id="minister2Display">Minister of Indigenous Services</span></strong></p>
<br><br>
<p>Signature: _______________________________</p>
<p>Title: <span id="signatoryTitleDisplay"></span></p>

<hr>

<p>Witnessed by, and in concurrence with the Attachments annexed to this agreement:</p>
<p>FREE AGENT</p>
<br><br>
<p>Signature: ________________________________</p>

<h2>ANNEX A</h2>
<p>ASSIGNMENT WORK OBJECTIVES</p>
<p><strong>Main Tasks </strong></p>
<div id="mainTasksDisplay"></div>

<p id="supportingTasksParagraph"><strong>Supporting Tasks </strong></p>
<div id="supportingTasksDisplay"></div>

</div>

