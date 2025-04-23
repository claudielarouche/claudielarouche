---
layout: dev 
title: All Actionable Advice
permalink: /dev-projects/actionable-advice/
---

This page brings together every actionable insight shared in the video summaries. Click any link to view the full context and summary.

# Note that the URLs don't work below!

---

<!--<ul>
  {% for summary in site.dev-projects %} 
    {% if summary.advice %}
      {% for item in summary.advice %}
        <li>
          {{ item }}<br>
          <small>From: <a href="{{ summary.url }}">{{ summary.title }}</a></small>
        </li>
      {% endfor %}
    {% endif %}
  {% endfor %}
</ul>
-->
<!-- THis loop doesn't actually work-->
<ul class="all-advice">
  {% for doc in site.csps %}
    {% assign v = site.data.csps_videos[doc.data.video_id] %}
    {% if v.advice and v.advice.size > 0 %}
      <li class="video-block">
        <h2>
          <!-- use doc.url instead of reconstructing from date+slug -->
          <a href="{{ doc.url }}">{{ v.short_title }}</a>
          <small>({{ v.date_published | date: "%Y-%m-%d" }})</small>
        </h2>
        <ul>
          {% for tip in v.advice %}
            <li>{{ tip }}</li>
          {% endfor %}
        </ul>
      </li>
    {% endif %}
  {% endfor %}
</ul>

<!-- this loop works -->
<ul class="all-advice">
  {% for entry in site.data.csps_videos %}
    {% assign id = entry[0] %}
    {% assign v  = entry[1] %}
    {% if v.advice and v.advice.size > 0 %}
      <li class="video-block">
        <h2>
          <a href="{{ doc.url }}">{{ v.short_title }}</a>
          <small>({{ v.date_published | date: "%Y-%m-%d" }})</small>
        </h2>
        <ul>
          {% for tip in v.advice %}
            <li>{{ tip }}</li>
          {% endfor %}
        </ul>
      </li>
    {% endif %}
  {% endfor %}
</ul>
