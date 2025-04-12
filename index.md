---
layout: home
title: Home
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
          <a href="/redesign{{ project.url }}">
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


<!-- Old Structure 
## My City of Ottawa Projects

<div class="projects-gallery">

  <div class="project-card">
    <a href="https://claudielarouche.com/ottawa.html">
      <img src="https://claudielarouche.com/assets/img/bonus.jpg" alt="City of Ottawa Drop-Ins" />
      <h3>All City of Ottawa Drop-Ins</h3>
    </a>
    <p>Racquet sports, gym sports, swimming, skating, etc.</p>
  </div>

  <div class="project-card">
    <a href="https://claudielarouche.com/earlyon.html">
      <img src="https://claudielarouche.com/assets/img/kids.png" alt="Early ON Playgroup Repository" />
      <h3>Early ON Playgroup Repository</h3>
    </a>
    <p>This used to provide a listing of all the playgroups in Ottawa. You can now use the <a href="https://www.incredibleplaygroupfinder.ca/en" target="_blank">Incredible Playgroup Finder</a></p>
  </div>

  <div class="project-card">
    <a href="https://claudielarouche.com/swim.html">
      <img src="https://claudielarouche.com/assets/img/swim.jpg" alt="Where to swim?" />
      <h3>Where to swim?</h3>
    </a>
    <p>A subset of the City of Ottawa Drop-Ins, but just for swimming!</p>
  </div>
  

  <div class="project-card">
    <a href="https://claudielarouche.com/library.html">
      <img src="https://claudielarouche.com/assets/img/library.jpg" alt="City of Ottawa Library Programs" />
      <h3>City of Ottawa Library Programs</h3>
    </a>
    <p>Short description of Project 4.</p>
  </div>
  


  

  <div class="project-card">
    <a href="https://claudielarouche.com/skate.html">
      <img src="https://claudielarouche.com/assets/img/skating.jpg" alt="Where to skate?" />
      <h3>Where to skate?</h3>
    </a>
    <p>A subset of the City of Ottawa Drop-Ins, but just for skating!</p>
  </div>
  

  <div class="project-card">
    <a href="https://claudielarouche.com/dance.html">
      <img src="https://claudielarouche.com/assets/img/dance.jpg" alt="City of Ottawa Adult Dance Classes" />
      <h3>City of Ottawa Adult Dance Classes</h3>
    </a>
    <p>A repository of all the adult dance classes in Ottawa</p>
  </div>

  <div class="project-card">
    <a href="https://claudielarouche.com/school.html">
      <img src="https://claudielarouche.com/assets/img/school.jpg" alt="List of Schools" />
      <h3>List of Schools</h3>
    </a>
    <p>A list of allt he schools in Ottawa!</p>
  </div>


</div>

## My Work Projects
<div class="projects-gallery">
  <div class="project-card">
    <a href="https://claudielarouche.com/work/lia-calculator.html">
      <img src="https://claudielarouche.com/assets/img/productive-person.jpg" alt="The Efficient Public Servant" />
      <h3>The Efficient Public Servant</h3>
    </a>
    <p>Ideas to be more efficient at work.</p>
  </div>
  
  <div class="project-card">
    <a href="https://claudielarouche.com/work/lia-calculator.html">
      <img src="https://claudielarouche.com/assets/img/browser.png" alt="Leave with Income Averaging Calculator" />
      <h3>Leave with Income Averaging Calculator</h3>
    </a>
    <p>A calculator to verify how much Leave with Income Averaging might cost you.</p>
  </div>

  <div class="project-card">
    <a href="https://claudielarouche.com/work/email.html">
      <img src="https://claudielarouche.com/assets/img/letters.jpg" alt="Email address extractor" />
      <h3>Email Address Extractor</h3>
    </a>
    <p>Paste any paragrah of text, let the tool extract all the email addresses for you</p>
  </div>

  <div class="project-card">
    <a href="https://claudielarouche.com/acronyms.html">
      <img src="https://claudielarouche.com/assets/img/acronyms.jpg" alt="Government of Canada Acronym Game" />
      <h3>Government of Canada Acronym Game</h3>
    </a>
    <p>How well do you know your acronyms?</p>
  </div>

  <div class="project-card">
    <a href="https://claudielarouche.com/work/fncfs/page-id.html">
      <img src="/redesign/assets/img/bonus.jpg" alt="Page Identificator Tool for Indigenous Services Canada (2024)" />
      <h3>Page Identificator Tool for Indigenous Services Canada (2024)</h3>
    </a>
    <p>Just a tool to help me in my work, I'm probably the only one who needs it ;)</p>
  </div>

</div> 

## My Other projects

<div class="projects-gallery">
  <div class="project-card">
    <a href="https://claudie-larouche.aweb.page/p/0f99e849-dec6-42b0-89d0-d9649d3f525b" target="_blank">
      <img src="https://claudielarouche.com/assets/img/food.jpg" alt="Healthy Living Challenge" />
      <h3>Healthy Living Challenge</h3>
    </a>
    <p>52 challenges over the course of an entire year. </p>
  </div>
</div>

## My Articles

<div class="projects-gallery">

  <div class="project-card">
    <a href="/redesign/articles/temp-article1/">
      <img src="/redesign/assets/img/bonus.jpg" alt="Project 1" />
      <h3>Project 1</h3>
    </a>
    <p>Short description of Article 1.</p>
  </div>

</div>

## My Presentations

<div class="projects-gallery">

  <div class="project-card">
    <a href="https://www.youtube.com/watch?v=p78AW7ZdNGI" target="_blank">
      <img src="https://img.youtube.com/vi/p78AW7ZdNGI/maxresdefault.jpg" alt="Coding for a cause" />
      <h3>R-Ladies Ottawa - Coding for a cause with Claudie Larouche</h3>
    </a>
    <p>Teaching people how to use ChatGPT to build tools that solve problems (43 mins).</p>
  </div>
  
</div>

## My Past Projects

<div class="projects-gallery">

  <div class="project-card">
    <a href="https://claudielarouche.com/claudie-web-design.html" target="_blank">
      <img src="https://claudielarouche.com/assets/img/web.png" alt="Project 1" />
      <h3>Claudie Web Design</h3>
    </a>
    <p>I used to have a web design side business :) This is my portfolio</p>
  </div>

</div> 

-->