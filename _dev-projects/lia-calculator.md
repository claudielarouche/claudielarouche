---
title: Leave with Income Averaging (LIA) Calculator
description: A calculator to calculate the cost of Leave with Income Averaging (LIA)
image: https://claudielarouche.com/assets/img/browser.png
tags: [Other]
permalink: /dev-projects/lia-calculator/
layout: dev
---

<form>
<div class="form-group">
<label for="salary">Yearly Salary:</label>
<input type="number" class="form-control" id="salary" placeholder="Enter yearly salary">
</div>
<div class="form-group">
<label for="days">Number of Work Days during your leave period (please include statutory holidays but do not include weekends):</label>
<input type="number" class="form-control" id="days" placeholder="Enter number of days">
</div>
<button type="button" class="btn btn-primary" onclick="calculate()">Calculate</button>
</form>
<div class="alert alert-info mt-3" role="alert" id="result"></div>

## Frequently Asked Questions

### Q: Is this tool official?

A: Not at all, so please don't make financial decisions based on this tool! This tool was built using answers about pay impact I received from a very friendly employee of Public Works when they processed my own leave with income averaging.

### Q: What is the calculation used by this tool?

A: The calculator takes your yearly salary and divides it by 260.88 in order to get your daily salary. We then take this amount and multiply it by the number of days of leave, which gives us the entire "cost" of the leave. That cost is then divided by 26, to give you the impact on your pay every 2 weeks. The amount is gross, not net, and there might be other factors at play in your specific case (bilingual bonus, acting pay, etc.) This tool is simply meant to help you in your decision making process and the true impact on your paycheck will not be identical to the amount provided here.

### Q: Why should I include statutory holidays?

A: Statutory holidays that are within the leave must be included, because if we do not work the day before or after said holiday, we are not entitled to be paid for it.

### Q: How long did it take to build this tool?

A: 5 minutes to ask ChatGPT to write the HTML, Javascript and CSS code (here is my [conversation with ChatGPT](https://docs.google.com/document/d/1sz9yac5InRktp9m2QwTKSSW51gREkNAgNHQT4FeMteQ/edit?tab=t.0){:target="_blank" rel="noopener"} in case you're interested). 10 minutes to write this FAQ. 5 minutes to publish it online ;)

### Q: Can I share this tool with my colleagues?

A: Absolutely!

### Q: Who built this tool?

A: It was built with love by [Claudie Larouche](https://claudielarouche.com) with help from [ChatGPT](https://chat.openai.com/){:target="_blank" rel="noopener"}. I'd be happy to connect!