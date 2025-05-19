---
title: Resources for parents in Ottawa
description: A complete list of all the resources that exist for parents in Ottawa
image:
image_hero: 
tags: [Ottawa]
permalink: /dev-projects/parents-resources/
layout: dev
---

Becoming a parent / being a parent can be a bit overwhelming at times! That is why I decided to create this repository of allllllllllllllllll the awwesome resources that exist throughout the city to help parents. If you notice anything missing, please let me know!

## Table of Contents

<ul>
  {% for table in site.data.resources %}
    <li><a href="#{{ table.category | slugify }}">{{ table.category }}</a></li>
  {% endfor %}
</ul>

{% for table in site.data.resources %}
### {{ table.category }} 

<table>
  <thead>
    <tr>
      {% for h in table.headings %}
        <th>{{ h }}</th>
      {% endfor %}
    </tr>
  </thead>
  <tbody>
    {% for item in table.items %}
      <tr>
        <!-- make the name a clickable link -->
        <td>
          [{{ item.name }}]({{ item.url }}){:target="_blank" rel="noopener noreferrer"}
        </td>
        <td>{{ item.area }}</td>
        <td>{{ item.description }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>


{% endfor %}
