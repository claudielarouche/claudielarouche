---
title: EarlyON Repository (2023-2024)
description: This used to provide a listing of all the playgroups in Ottawa. You can now use the <a href="https://www.incredibleplaygroupfinder.ca/en" target="_blank">Incredible Playgroup Finder</a>
image: https://claudielarouche.com/assets/img/kids.png
tags: [Ottawa]
permalink: /dev-projects/early-on/
layout: dev
---

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

<style>

#dataTable thead th {
position: sticky;
top: 0;
background-color: #f2f2f2; /* Change the background color as needed */
z-index: 100;
}

table {
border-collapse: collapse;
width: 100%;
margin-top: 20px;
}

th,
td {
border: 1px solid #dddddd;
}

h2 {
margin-top: 20px;
}

label {
display: block;
margin-top: 10px;
}


.checked {
text-decoration: line-through;
}

td.dataTables_empty {
text-align: left !important;
}

.dataTables_wrapper .dataTables_filter {
float: left;
text-align: left;
}
</style>

From November 2023 to October 2024, I maintained the EarlyON Playgroup Repository, a searchable and up-to-date listing of EarlyON programs in Ottawa. My goal was to make it easier for parents to find playgroup information without having to search through 21 different websites. This resource was updated monthly and served many families during its year-long run.

In October 2024, the Parent Resource Centre launched the [Incredible Playgroup Finder](https://incredibleplaygroupfinder.ca), a centralized and more permanent tool built on the same goal: to support Ottawa families. 

## 📂 View the Historical Repository

<details>
<summary>Click to expand</summary>

<!-- Add the Bootstrap call-out with a lightbulb icon -->
<div class="alert alert-danger mt-3" role="alert">
<span class="material-icons" style="vertical-align: middle;">lightbulb</span>
Please note that this is a demo of what the EarlyON Repository used to look like, not a list of current playgroups. The date range is 2024-01-02 to 2024-01-05</div>

<h2>Filters</h2>
<form class="form">

<div class="form-group row">
<label for="selectedDate" class="col-sm-2 col-form-label">Select Date:</label>
<div class="col-sm-10">
<input type="date" id="selectedDate" class="form-control col-sm-2">
</div>
</div>

<div class="form-group row">
<label for="selectedArea" class="col-sm-2 col-form-label">Select Area(s):</label>
<div class="col-sm-10">
<div class="checkbox">
<label><input type="checkbox" id="centralCheckbox" class="areaCheckbox" value="Central" checked=""> Central</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="eastCheckbox" class="areaCheckbox" value="East" checked=""> East</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="southCheckbox" class="areaCheckbox" value="South" checked=""> South</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="westCheckbox" class="areaCheckbox" value="West" checked=""> West</label>
</div>
</div>
</div>

<div class="form-group row">
<label for="selectedAgeGroup" class="col-sm-2 col-form-label">Select Age Group:</label>
<div class="col-sm-3">
<select id="selectedAgeGroup" class="form-control">
<option value="">Show all</option>
<option value="Babies">Show baby playgroups only</option>
<option value="Kids">Show kids playgroups only</option>
</select>
</div>
</div>

<div class="form-group row">
<label for="scheduleFilter" class="col-sm-2 col-form-label">Select Schedule:</label>
<div class="col-sm-4">
<select id="scheduleFilter" class="form-control">
<option value="all">Show all times</option>
<option value="eveningsWeekends">Show evenings and weekends only</option>
<option value="weekdayAMPM">Show weekday AM and PM only</option>
</select>
</div>
</div>

<div class="form-group row">
<label for="languageFilter" class="col-sm-2 col-form-label">Select Language(s):</label>
<div class="col-sm-10">
<div class="checkbox">
<label><input type="checkbox" id="arabicCheckbox" class="languageCheckbox" value="Arabic" checked=""> Arabic</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="englishCheckbox" class="languageCheckbox" value="English" checked=""> English</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="frenchCheckbox" class="languageCheckbox" value="French" checked=""> French</label>
</div>
<div class="checkbox">
<label><input type="checkbox" id="mandarinCheckbox" class="languageCheckbox" value="Mandarin" checked=""> Mandarin</label>
</div>
</div>
</div>
</form>

<div class="mt-3">
<button class="btn btn-secondary" onclick="clearAllFilters()">
Reset filters to default
</button>
</div>

<h2>Data</h2>
<div id="csvData"></div>
<p>The data from this table was taken from the various Ottawa EarlyON playgroups posted on the <a href="https://ottawa.ca/en/family-and-social-services/childrens-services/earlyon" target="_blank">Ottawa.ca website</a>. </p>

</details>

## 🛠 How It Was Built

It all started with a simple question to ChatGPT: "Can you help me build a Javascript and HTML website that reads off of a CSV file and presents the data on the screen?" It took 5 or 6 different attempts after that initial question, but finally ChatGPT and I found a way to make it work. 

Once I had a working prototype, I had to find the data. 

I was hoping to automatically extract the information from the 21 different websites, but the format is so different, most of the schedules are on PDF documents, and that was not a viable option. 

Thankfully, most playgroups follow the same logic week after week. 

So what I ended up doing is basically emailing every organization to ask them if they had any planned changes to the schedule for the following month or planned closure. 

Then I'd make the appropriate changes in a Google Sheet document. 

Then I'd export the Google Sheet to CSV. 

Then I'd save the Google Sheet to Github pages. 

...and then the data was up to date for another month :) 



---

## 💬 Testimonials
<!--
> *“This tool was a lifesaver during my maternity leave. I could finally plan outings without endlessly scrolling through Facebook pages.”*  
> — Local Parent

> *“Thank you for this! I’ve been forwarding it to all the new parents I know.”*  
> — EarlyON Staff Member

> *“I used it every week to plan which centres to visit. The search feature was amazing.”*  
> — Community Volunteer
-->
> *“THANK YOU for the schedules you have created. I never went to the early ON groups because I always found it too much "effort" to figure out where/when/what etc. With the data set you have created, I have turned into an Early ON snob and go at least twice a week and love it! Thank you!”*

> *“Hi Claudie! I just wanted to say thank you so much for the Early On mast list. It has made such a difference for me :) I was wondering if I could send you a Starbucks or timmies gift card just to say thanks! You've single handily lifted me out of postpartum depression lol”*

> *“Who are you? You're like a Mom superhero”*

> *“This is amazing!!! I have wanted to see one of these lists built for years, but didn’t have the background to do it myself. The families are going to really appreciate this valuable resource.”*

> *“Hi Claudie, I just want to say thank you so much for putting this all together! I work for EarlyON and parents are always asking for guidance in finding other playgroups that fit their unique schedule and needs. Our location doesn't always have what they are looking for and I have found that getting information on other EarlyOn programs is very complicated and time consuming. There is a serious lack of collaboration between EarlyON groups, and this is exactly what we need. So, thank you so much! I will be using this site a lot! Let me know if there's anything I can do to help. All the best.”*

> *“I love what you’ve done with your webpage!! Thank you so much for creating this useful tool. It’s so overwhelming trying to figure out all the dates and times and locations of playgroups - I’m adding your page to my bookmarks for easy access. Thank you!!”*

> *“Encore une fois merci pour ce travail exhaustif et qui fait une très grande différence dans le taux de participation aux activités de nos centres. Nous entendons très souvent les nouveaux clients dire qu’ils ont connu notre centre grâce à votre page Web. C’est une chance inouïe que vous partagiez toute cette information avec la communauté d’Ottawa. Merci infiniment !!!”*

> *“Hi Claudie Thank you so much for this great resource. Both staff and Parents love it. We have even created a QR code for your website that we give out or parents can scan it. I am attaching a copy for your records. Also feel free to distribute it.”*

> *“Thank you so much for all your hard work and dedication to the community. The website is very impressive and so helpful to families.”*
---

## ✉️ Final Notes

Thank you to everyone who used and shared this resource. If you're interested in building a similar tool or want to collaborate on community-driven solutions, feel free to reach out.

— Claudie Larouche  

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js"></script>
<script src="https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.colVis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
<script src="{{ "/assets/js/earlyon.js" | relative_url }}"></script>
