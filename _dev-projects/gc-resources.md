---
layout: dev
title: Resources for Canadian Public Servants
permalink: /gc-resources/
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