---
layout: page
title: City of Ottawa Drop-Ins
permalink: /ottawa-drop-ins/
---

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

## Related Article

[How I Built the City of Ottawa Drop-Ins pages](/projects/ottawa-drop-ins/how-i-built-this-tool)
