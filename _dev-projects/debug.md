---
layout: dev
title: GA Debug
---



<h2>Site Info</h2>
<ul>
  <li>Base URL: {{ site.baseurl }}</li>
  <li>Environment: {{ jekyll.environment }}</li>
  <li>Production? {% if jekyll.environment == "production" %}✅{% else %}❌{% endif %}</li>
  <li>Current Time: {{ site.time }}</li>
</ul>

{% if site.navigation %}
  <h2>Navigation Links</h2>
  <ul>
    {% for item in site.navigation %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
    {% endfor %}
  </ul>
{% endif %}

<h2>Pages Missing Title</h2>
<ul>
  {% for page in site.pages %}
    {% unless page.title %}
      <li><a href="{{ page.url }}">{{ page.url }}</a></li>
    {% endunless %}
  {% endfor %}
</ul>

<h2>Sitemap and SEO Audit</h2>
<table>
  <thead>
    <tr><th>URL</th><th>Title</th><th>noindex?</th><th>sitemap</th></tr>
  </thead>
  <tbody>
    {% assign all_docs = site.pages | concat: site.posts %}
    {% for doc in all_docs %}
      <tr>
        <td><a href="{{ doc.url }}">{{ doc.url }}</a></td>
        <td>{{ doc.title | default: "(no title)" }}</td>
        <td>{% if doc.noindex %}✅{% endif %}</td>
        <td>{{ doc.sitemap }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>

<h2>Images Referenced</h2>
<ul>
  {% for page in site.pages %}
    {% if page.content contains 'img' %}
      <li><a href="{{ page.url }}">{{ page.url }}</a> contains images</li>
    {% endif %}
  {% endfor %}
</ul>

<h2>Collections</h2>
<ul>
  {% for collection in site.collections %}
    <li>{{ collection.label }} ({{ collection.docs | size }} items)</li>
  {% endfor %}
</ul>

<h2>Pages Containing # or Blank Links</h2>
<ul>
  {% for page in site.pages %}
    {% if page.content contains 'href="#"' or page.content contains 'href=""' %}
      <li><a href="{{ page.url }}">{{ page.url }}</a></li>
    {% endif %}
  {% endfor %}
</ul>

<h2>Pages with Very Short Content</h2>
<ul>
  {% for page in site.pages %}
    {% assign word_count = page.content | number_of_words %}
    {% if word_count < 100 %}
      <li><a href="{{ page.url }}">{{ page.url }}</a> ({{ word_count }} words)</li>
    {% endif %}
  {% endfor %}
</ul>


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
