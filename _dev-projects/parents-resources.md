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

[Back to top](#page-title)

<table class="resource-table">
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
        {% for h in table.headings %}
          {% assign key = h | downcase %}
          <td>
            {%- if key == 'name' and item.url -%}
              <a href="{{ item.url }}"
                 target="_blank"
                 rel="noopener noreferrer">
                {{ item.name }}
              </a>
            {%- else -%}
              {{ item[key] }}
            {%- endif -%}
          </td>
        {% endfor %}
      </tr>
    {% endfor %}
  </tbody>
</table>



{% endfor %}
