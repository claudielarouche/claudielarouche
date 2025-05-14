---
layout: dev
title: Debug
permalink: /debug/
exclude_ga: true
---

Debug page, also a quick test for skipping builds

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
    {% for collection in site.collections %}
      {% assign all_docs = all_docs | concat: collection.docs %}
    {% endfor %}

    {% assign all_docs = all_docs | uniq | sort: "url" %}
    {% for doc in all_docs %}
      <tr>
        <td><a href="{{ doc.url }}">{{ doc.url }}</a></td>
        <td>{{ doc.title | default: "(no title)" }}</td>
        <td>{% if doc.noindex %}✅{% endif %}</td>
        <td>{{ doc.sitemap | default: "true" }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>



<!--
<h2>Sitemap and SEO Audit</h2>

<div style="margin-bottom: 1em;">
  <label for="filter-url">URL contains:</label>
  <input type="text" id="filter-url" placeholder="e.g. /projects">

  <label for="filter-title">Title contains:</label>
  <input type="text" id="filter-title" placeholder="e.g. Ottawa">

  <label for="filter-sitemap">Sitemap:</label>
  <select id="filter-sitemap">
    <option value="">Any</option>
    <option value="true">true</option>
    <option value="false">false</option>
  </select>

  <label for="filter-noindex">Noindex:</label>
  <select id="filter-noindex">
    <option value="">Any</option>
    <option value="true">true</option>
    <option value="false">false</option>
  </select>
</div>


<table id="seo-table">
  <thead>
    <tr><th>URL</th><th>Title</th><th>noindex</th><th>sitemap</th></tr>
  </thead>
  <tbody>
    {% assign all_docs = site.pages | concat: site.posts %}
    {% for doc in all_docs %}
      <tr>
        <td>{{ doc.url }}</td>
        <td>{{ doc.title | default: "(no title)" }}</td>
        <td>{{ doc.noindex | default: false }}</td>
        <td>{{ doc.sitemap | default: true }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>

<script>
document.addEventListener('DOMContentLoaded', function () {
  const urlInput = document.getElementById('filter-url');
  const titleInput = document.getElementById('filter-title');
  const sitemapSelect = document.getElementById('filter-sitemap');
  const noindexSelect = document.getElementById('filter-noindex');
  const table = document.getElementById('seo-table');
  const rows = table.querySelectorAll('tbody tr');

  function filterTable() {
    const urlFilter = urlInput.value.toLowerCase();
    const titleFilter = titleInput.value.toLowerCase();
    const sitemapFilter = sitemapSelect.value;
    const noindexFilter = noindexSelect.value;

    rows.forEach(row => {
      const url = row.cells[0].textContent.toLowerCase();
      const title = row.cells[1].textContent.toLowerCase();
      const noindex = row.cells[2].textContent;
      const sitemap = row.cells[3].textContent;

      const matchesUrl = url.includes(urlFilter);
      const matchesTitle = title.includes(titleFilter);
      const matchesSitemap = sitemapFilter === "" || sitemap === sitemapFilter;
      const matchesNoindex = noindexFilter === "" || noindex === noindexFilter;

      if (matchesUrl && matchesTitle && matchesSitemap && matchesNoindex) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  urlInput.addEventListener('input', filterTable);
  titleInput.addEventListener('input', filterTable);
  sitemapSelect.addEventListener('change', filterTable);
  noindexSelect.addEventListener('change', filterTable);
});
</script>
-->

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
