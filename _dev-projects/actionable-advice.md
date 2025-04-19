---
layout: dev 
title: All Actionable Advice
permalink: /dev-projects/actionable-advice/
---

# All Actionable Advice from CSPS Videos

This page brings together every actionable insight shared in the video summaries. Click any link to view the full context and summary.

---

<ul>
  {% for summary in site.dev-projects %} <!-- replace with site.csps when going to prod -->
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
