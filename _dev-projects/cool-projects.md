---
title: Other cool projects
description: A list of other cool projects (not mine)
image: https://claudielarouche.com/assets/img/other-cool-projects.jpg
image_hero: https://claudielarouche.com/assets/img/other-cool-projects.jpg
tags: [Other]
permalink: /dev-projects/other-cool-projects/
layout: default-dev
js: 
css: 
---

Here are some other cool projects I've come across

{% assign categories = site.data.other-cool-projects | map: "category" | uniq %}

{% for category in categories %}
  <h2>{{ category }}</h2>
  <div class="projects-gallery">
    {% assign filtered = site.data.other-cool-projects | where: "category", category %}
    {% for project in filtered %}
      <div class="project-card">
        <a href="{{ project.url }}" target="_blank">
          <img src="{{ project.image }}" alt="{{ project.name }}" />
          <h3>{{ project.name }}</h3>
        </a>
        <p>{{ project.description }}</p>
      </div>
    {% endfor %}
  </div>
{% endfor %}