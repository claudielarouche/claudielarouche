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

---
layout: page
title: Resources for Parents
---

## Table of Contents

<ul>
  {% for table in site.data.resources %}
    <li><a href="#{{ table.category | slugify }}">{{ table.category }}</a></li>
  {% endfor %}
</ul>

{% for table in site.data.resources %}
### {{ table.category }} {#{{ table.category | slugify }}#}

<table>
  <thead>
    <tr>
      {% for h in table.headings %}
        <th>{{ h }}</th>
      {% endfor %}
    </tr>
  </thead>
  <tbody>
    {% for row in table.items %}
      <tr>
        {% for cell in row %}
          <td>{{ cell }}</td>
        {% endfor %}
      </tr>
    {% endfor %}
  </tbody>
</table>

{% endfor %}
