---
layout: dev
title: Home-dev
permalink: dev-projects/home
---

<link rel="stylesheet" href="{{ "/assets/css/custom.css" | relative_url }}">


{% assign categories = "Ottawa,Work,Other,Archive" | split: "," %}

{% for category in categories %}
  <h2>{{ category }} Projects</h2>
  <div class="projects-gallery">
    {% assign filtered = site.projects | where_exp: "item", "item.tags contains category" %}
    {% if filtered.size > 0 %}
      {% for project in filtered %}
        <div class="project-card">
          <a href="{{ project.url }}">
            <img src="{{ project.image }}" alt="{{ project.title }}" />
            <h3>{{ project.title }}</h3>
          </a>
          <p>{{ project.description }}</p>
        </div>
      {% endfor %}
    {% else %}
      <p>No projects in this category yet.</p>
    {% endif %}
  </div>
{% endfor %}

## Presentations

<div class="projects-gallery">

  <div class="project-card">
    <a href="https://www.youtube.com/watch?v=p78AW7ZdNGI" target="_blank">
      <img src="https://img.youtube.com/vi/p78AW7ZdNGI/maxresdefault.jpg" alt="Coding for a cause" />
      <h3>R-Ladies Ottawa - Coding for a cause with Claudie Larouche</h3>
    </a>
    <p>Teaching people how to use ChatGPT to build tools that solve problems (43 mins).</p>
  </div>
  
</div>

