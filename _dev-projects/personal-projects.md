---
layout: dev
title: Personal Projects
---



  <div class="projects-gallery">
    {% assign filtered = site.projects | where_exp: "item", "item.tags contains 'Ottawa'" %}
    {% if filtered.size > 0 %}
      {% for project in filtered %}
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

