---
layout: page
exclude_ga: true
sitemap: false
permalink: /dev
title: Pages under development
---

<div class="projects-gallery">
  {% assign dev_projects = site.dev-projects %}
  {% if dev_projects.size > 0 %}
    {% for project in dev_projects %}
      <div class="project-card">
        <a href="{{ project.url }}">
          {% if project.image %}
            <img src="{{ project.image }}" alt="{{ project.title }}">
          {% endif %}
          <h3>{{ project.title }}</h3>
        </a>
        <p>{{ project.description }}</p>
      </div>
    {% endfor %}
  {% else %}
    <p>No development projects yet.</p>
  {% endif %}
</div>

## Direct link to useful pages

[Change Log](/change-log)  
[Style Guide](/style-guide)  
[Debug](/debug)  