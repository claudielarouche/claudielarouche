---
title: TSM Estimator
description: Estimate your Transition Support Measure (TSM) amount as a federal public service employee affected by Workforce Adjustment (WFA)
image: https://claudielarouche.com/assets/img/wfa.jpg
image_hero: https://claudielarouche.com/assets/img/wfa.jpg
tags: [hidden]
permalink: /tsm/
layout: projects
css:
  - /assets/css/tsm-estimator.css
js:
  - /assets/js/tsm-estimator.js
---

Estimate your **Transition Support Measure (TSM)** as a federal public service employee affected by Workforce Adjustment (WFA). Based on the official [NJC Work Force Adjustment Directive](https://www.njc-cnm.gc.ca/directive/d12/v239/en){:target="_blank" rel="noopener noreferrer"}.

<div class="alert alert-info">
<strong>Who this tool is for:</strong> Indeterminate federal public service employees who have been declared <strong>opting</strong> (no guarantee of a reasonable job offer was provided). The TSM amount is the same whether you choose Option A, B, or C — so this tool is useful regardless of which option you are considering, including if you want to know how much your <strong>alternate</strong> would receive.<br><br>
<strong>Not eligible?</strong> The TSM is not available to term employees or to employees who received a reasonable job offer before accepting the TSM in writing. Consult your union or HR advisor if you are unsure of your status.
</div>

<div id="tsm-tool">

<hr>
<h3>Your Employment Details</h3>

<div class="form-group">
<label for="years-of-service"><strong>Years of Indeterminate Public Service (completed years)</strong></label>
<input type="number" class="form-control" id="years-of-service" min="0" max="50" step="1" placeholder="e.g. 12">
<small>Total completed years of indeterminate service across all federal departments/agencies under Schedules I, IV, and V of the FAA. Partial years are rounded down — the NJC WFAD does not specify interpolation.</small>
</div>

<div class="form-group">
<label for="annual-salary"><strong>Current Annual Salary ($)</strong></label>
<input type="number" class="form-control" id="annual-salary" min="0" step="100" placeholder="e.g. 75000">
<small>Your current gross annual salary. Weekly pay is calculated as salary &divide; 52.</small>
</div>

<div class="form-group">
<label for="employment-type"><strong>Employment Type</strong></label>
<select class="form-select" id="employment-type" onchange="togglePartTimeHours()">
  <option value="">-- Select --</option>
  <option value="full-time">Full-time indeterminate</option>
  <option value="part-time">Part-time indeterminate</option>
  <option value="seasonal">Seasonal indeterminate</option>
</select>
</div>

<div class="form-group" id="weekly-hours-group" style="display:none">
<label for="weekly-hours"><strong>Average Weekly Hours</strong></label>
<input type="number" class="form-control" id="weekly-hours" min="0" max="37.5" step="0.5" placeholder="e.g. 22.5">
<small>Used to pro-rate your TSM. Standard full-time is 37.5 hours/week.</small>
</div>

<hr>
<h3>Additional Details <small class="tsm-muted">(optional)</small></h3>

<div class="form-group">
<label for="age"><strong>Your Age at Time of WFA</strong></label>
<input type="number" class="form-control" id="age" min="18" max="70" placeholder="e.g. 57">
<small>Used to check <strong>pension reduction waiver</strong> eligibility. If you are aged 55&ndash;59, laid off under Option B with no reasonable job offer, and have enough pensionable service, you may be able to collect your pension earlier without the usual reduction. Leave blank to skip this check.</small>
</div>

<div class="form-group">
<label for="pension-years"><strong>Years of Pensionable Service</strong></label>
<input type="number" class="form-control" id="pension-years" min="0" max="40" placeholder="e.g. 10">
<small>Also used for the pension reduction waiver check (requires &ge;10 years). Leave blank to skip.</small>
</div>

<div class="form-group">
<label for="alternation-weeks"><strong>Weeks Elapsed Since Surplus Period Start</strong></label>
<input type="number" class="form-control" id="alternation-weeks" min="0" placeholder="e.g. 4 — leave blank or enter 0 if N/A">
<small>If an alternation occurred, the TSM is reduced by one week for each week elapsed between the beginning of the surplus period and the date the alternation was confirmed. Leave blank or enter 0 if no alternation occurred.</small>
</div>

<hr>

<button type="button" class="btn btn-primary" onclick="calculateTSM()">Calculate My TSM &rarr;</button>
&nbsp;
<button type="button" class="btn btn-secondary" onclick="resetForm()">Reset</button>

<!-- Results -->
<div id="tsm-results" style="display:none">
<hr>
<h3>Your TSM Estimate</h3>
<div id="tsm-results-content"></div>
<button type="button" class="btn btn-secondary mt-3" onclick="resetForm()">Reset &amp; Recalculate</button>
</div>

</div><!-- end #tsm-tool -->

---

## About This Tool

This tool is based on the [NJC Work Force Adjustment Directive (WFAD)](https://www.njc-cnm.gc.ca/directive/d12/v239/en){:target="_blank" rel="noopener noreferrer"}, specifically:

- **[Appendix C](https://www.njc-cnm.gc.ca/directive/d12/v24/s281/en){:target="_blank" rel="noopener noreferrer"}** &mdash; the official TSM lookup table
- **Section 6.4.1(b)** &mdash; TSM payment structure
- **Section 6.3.6** &mdash; Counselling allowance of $600

For more WFA resources, visit the [WFA Resources page](/wfa).

*Built by [Claudie Larouche](https://www.linkedin.com/in/claudie-larouche/){:target="_blank" rel="noopener noreferrer"} and [Claude](https://claude.ai){:target="_blank" rel="noopener noreferrer"}. Please see [claudielarouche.com](https://claudielarouche.com) to try my other tools.*
