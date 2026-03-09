---
layout: page
title: Personal Projects
permalink: /personal-projects/
description: "Claudie's personal projects"
---



  <h2>City of Ottawa Drop-Ins</h2>
  <div class="projects-gallery">
    {% assign drop_ins = site.projects | where_exp: "item", "item.tags contains 'City of Ottawa Drop-Ins'" | sort: "title" %}
    {% if drop_ins.size > 0 %}
      {% for project in drop_ins %}
        <div class="project-card">
          <a href="{{ project.url | relative_url }}">
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

  <h2>Other Ottawa Resources</h2>
  <div class="projects-gallery">
    {% assign other_ottawa = site.projects | where_exp: "item", "item.tags contains 'Other Ottawa Resources'" | sort: "title" %}
    {% if other_ottawa.size > 0 %}
      {% for project in other_ottawa %}
        <div class="project-card">
          <a href="{{ project.url | relative_url }}">
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

