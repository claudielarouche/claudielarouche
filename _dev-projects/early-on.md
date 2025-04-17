---
title: EarlyON Repository (2023-2024)
description: This used to provide a listing of all the playgroups in Ottawa. You can now use the <a href="https://www.incredibleplaygroupfinder.ca/en" target="_blank">Incredible Playgroup Finder</a>
image: https://claudielarouche.com/assets/img/kids.png
tags: [Ottawa]
permalink: /dev-projects/early-on/
layout: dev
---

From November 2023 to October 2024, I maintained the EarlyON Playgroup Repository, a searchable and up-to-date listing of EarlyON programs in Ottawa. My goal was to make it easier for parents to find playgroup information without having to search through 21 different websites. This resource was updated monthly and served many families during its year-long run.

In October 2024, the Parent Resource Centre launched the [Incredible Playgroup Finder](https://incredibleplaygroupfinder.ca), a centralized and more permanent tool built on the same goal: to support Ottawa families. 

## 📂 View the Historical Repository

<details>
  <summary>Click to expand</summary>
  <p>To be completed</p>
</details>

## 🛠 How It Was Built

It all started with a simple question to ChatGPT: "Can you help me build a javascript and HTML website that reads off of a CSV file and presents the data on the screen?" It took 5 or 6 different attempts after that initial question, but finally ChatGPT and I found a way to make it work. 

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
To be completed

---

## ✉️ Final Note

Thank you to everyone who used and shared this resource. If you're interested in building a similar tool or want to collaborate on community-driven solutions, feel free to reach out.

— Claudie Larouche  
*Project lead and developer, EarlyON Repository*
