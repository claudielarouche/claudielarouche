---
title: How I Built the City of Ottawa Drop-In Website
description: A quick explanation on how I built the City of Ottawa Drop-In Website
image: https://claudielarouche.com/assets/img/racquets.jpg
image_hero: https://claudielarouche.com/assets/img/racquets.jpg
permalink: /projects/ottawa-drop-ins/how-i-built-this-tool
layout: projects

---

Every week, the City of Ottawa offers dozens of drop-in activities—swimming, skating, basketball, kindergym, and more. But finding them online is very difficult, because you have to click on one facility at a time (out of 100+) to view the schedule. So, I created a website that makes it easier to search and filter these activities by listing them all on one page. Here's how it works behind the scenes.

## Step 1: Gathering the Data (Every Saturday Morning)
Every Saturday, I run a custom Python script that ChatGPT wrote according to my specification. The script automatically visits each facility page on the City of Ottawa’s website. Here's what the script does: 

### Visit Every Facility Page
The script starts on the City of Ottawa’s “Places to Play” directory and clicks through every facility that might offer drop-ins—from pools and arenas to community centers.

### Read Activity Tables
Once on a facility’s page, the script looks for activity tables. These are the schedule grids you’d normally see as a human—listing days of the week in columns and activity names like “Public Swim” or “Pickleball” in rows.

The script grabs:

- The name of the activity
- The facility and its address
- The time slots for each day
- Notes about registration requirements
- The applicable period (e.g., “July 1 to August 31”)

### Interpret Messy Formats
Because the City website isn't structured consistently, the script includes logic to clean up odd formatting. For example:

- Replaces things like "12 : 30pm" with "12:30 pm"
- Converts "noon" to "12:00"
- Handles merged cells or extra punctuation in table headers
- Extracts start/end times and converts them into 24-hour format

### Categorize and Tag Activities
Next, the script uses keyword matching to tag each activity with:

- A category like “Swimming”, “Skating”, “Racquet Sport”, etc.
- An age group like “Preschool,” “Youth,” “50+”
- A time of day bucket (AM, PM, Evening) based on when the activity runs

### Extra Info
The script also adds:

- A link to Google Maps for the facility
- A reservation link (if one is available)
- The “area” of Ottawa (e.g., Central, East - Orleans, West - Kanata) based on address
- A calculated “Sort Order” to help display the days of the week in the correct sequence

## Step 2: Cleaning It Up
Once the raw schedule data is collected and saved to a CSV file, I take a few minutes to download it to my computer and clean it manually. For example, sometimes the city lists old or future activity periods that aren’t currently applicable. I remove those so only relevant drop-ins appear.

After that, upload the cleaned data to GitHub. The website claudielarouche.com is hosted on Netlify. An automatic process refreshes the website within a few minutes when Github is updated.

## Step 3: Presenting the Data on the Website

Each City of Ottawa drop-in page (swimming, skating, kindergym, etc.) is powered by JavaScript. Here's what happens when you visit:

- The site loads the CSV file directly from GitHub.
- A tool called PapaParse reads the CSV file and turns it into usable data.
- The site then builds a searchable, filterable table using DataTables, showing all the drop-in options (because there are a lot of lines, it takes a few minutes for the data to appear)

You can filter by day of the week, area of the city, age group, time of day, or activity type.

Clicking the facility name brings you to the official Ottawa.ca page; the address links to Google Maps; and reservation links (if required) open each facility's reservation page.

## Keeping It Updated

Because the script is run weekly, the data stays fresh without needing daily maintenance. Visitors also have a button to report incorrect entries, making it easy for people to report any mistake I may have made.

If you’re a parent, skater, swimmer, or just someone looking for affordable recreation options in Ottawa, I hope this tool makes your life a little easier!

![Claudie Larouche](../../assets/img/claudie-larouche.png)