---
layout: dev
title: GA Debug
---

<h1>Site Page Diagnostics</h1>
<table>
  <thead>
    <tr>
      <th>URL</th>
      <th>Layout</th>
      <th>exclude_ga</th>
      <th>sitemap</th>
    </tr>
  </thead>
  <tbody>
    {% assign all_content = site.pages | concat: site.posts %}
    {% for collection in site.collections %}
      {% assign all_content = all_content | concat: collection.docs %}
    {% endfor %}

    {% assign sorted = all_content | sort: "url" %}
    {% for item in sorted %}
      <tr>
        <td><a href="{{ item.url }}">{{ item.url }}</a></td>
        <td>{{ item.layout }}</td>
        <td>{{ item.exclude_ga }}</td>
        <td>{{ item.sitemap }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>
