---
layout: projects
title: Resources for Canadian Public Servants
permalink: /gc-resources/
tags: [Work]
permalink: /projects/gc-resources/
image: https://claudielarouche.com/assets/img/canada-flag.jpg
image_hero: https://claudielarouche.com/assets/img/canada-flag.jpg
description: Useful resource for Government of Canada employees
---

Browse topics:

<ul>
  {% assign topics = site.gc_resources | sort: "order" %}
  {% for t in topics %}
    <li>
      <a href="{{ t.url | relative_url }}">{{ t.title }}</a>
      {% if t.summary %}<div>{{ t.summary }}</div>{% endif %}
    </li>
  {% endfor %}
</ul>

More content to come!