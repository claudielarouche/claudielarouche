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
<strong>Who this tool is for:</strong> Indeterminate federal public service employees who have been declared <strong>opting</strong> (no guarantee of a reasonable job offer was provided). The TSM amount is the same whether you choose Option B, C(i), or C(ii), so this tool is also useful if you want to know how much your <strong>alternate</strong> would receive.<br><br>
<strong>Not eligible?</strong> The TSM is not available to term employees or to employees who received a reasonable job offer before the TSM was accepted in writing. Consult your union or HR advisor if you are unsure of your status.
</div>

<details class="tsm-glossary">
<summary><strong>&#128218; WFA Glossary — Click to expand</strong></summary>
<dl>
  <dt>WFA (Workforce Adjustment)</dt>
  <dd>The process by which the federal government eliminates or significantly changes positions due to budget cuts, reorganizations, or program changes. Governed by the NJC Work Force Adjustment Directive and/or your collective agreement.</dd>

  <dt>Opting employee</dt>
  <dd>An indeterminate employee whose department has confirmed there is no guarantee of a reasonable job offer. As an opting employee, you have the right to choose between Option A, B, C(i), or C(ii).</dd>

  <dt>Opting period</dt>
  <dd>The period during which you are deciding which option to select. <strong>The surplus period has not yet started</strong> during this time. You are still working and being paid normally.</dd>

  <dt>Option A</dt>
  <dd>You enter a <strong>12-month surplus priority period</strong>. This is the default if no option is selected within the deadline.</dd>

  <dt>Option B</dt>
  <dd>You resign and receive the <strong>TSM as a cash payment</strong>. You may also be eligible for a pension reduction waiver if you meet age and service criteria.</dd>

  <dt>Option C(i)</dt>
  <dd>You <strong>resign</strong> and receive the TSM plus an education allowance of up to $17,000 for receipted tuition, books, and relevant equipment from a recognized learning institution. You relinquish any priority rights for reappointment upon resignation.</dd>

  <dt>Option C(ii)</dt>
  <dd>You receive the TSM plus an education allowance of up to $17,000, and are placed on <strong>leave without pay (LWOP) for up to two years</strong> while attending a recognized learning institution. During this period, you <em>may</em> choose to continue contributing (both employer and employee share) to public service benefit plans and the Public Service Superannuation Plan. At the end of two years, you are laid off unless you have secured alternate employment in the public service. If you have not provided proof of registration within 12 months of starting your LWOP, you are deemed to have resigned. If you have chosen Option C(ii), you <strong>can no longer alternate</strong> with an unaffected employee.</dd>

  <dt>Surplus period</dt>
  <dd>Begins only <strong>after you select (or default to) Option A</strong>. During this period, you remain employed and continue to receive your salary. You are expected to actively seek alternative employment in cooperation with your department — this can include alternating with an unaffected employee who wants to leave, or being deployed to another position. The TSM reduction for alternation is calculated from the start of this period, not from when you were declared opting.</dd>

  <dt>Alternation</dt>
  <dd>An arrangement where an opting employee in the Option A surplus period swaps positions with a non-affected employee who volunteers to leave instead. The non-affected employee (the <em>alternate</em>) receives Option B or C(i) in place of the opting employee — Option C(ii) is not available in alternation. The alternate's TSM is reduced by one week for each week that elapsed since the surplus period began.</dd>

  <dt>Reasonable job offer</dt>
  <dd>An offer of indeterminate employment within the core public administration, normally at an equivalent level, and normally within your headquarters where practicable. If you receive such an offer during your opting period and before you have accepted the TSM in writing, you are no longer eligible for the TSM.</dd>

  <dt>TSM (Transition Support Measure)</dt>
  <dd>A cash payment based on your years of indeterminate service and weekly salary, paid when you choose Option B, C(i), or C(ii), or when an alternation is finalized during Option A (in which case it is the unaffected employee who chose to leave who receives the TSM).</dd>
</dl>
</details>

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
<label for="alternation-weeks"><strong>Weeks Elapsed Since Surplus Period Start</strong> <small class="tsm-muted">(alternation only)</small></label>
<input type="number" class="form-control" id="alternation-weeks" min="0" placeholder="e.g. 4 — leave blank or enter 0 if N/A">
<small>The surplus period begins after the opting employee selects (or defaults to) Option A. It is not the same as the opting period. The alternate's TSM is reduced by one week for each week elapsed since the surplus period started. Leave blank or enter 0 if your opting period has not started.</small>
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
- **Counselling allowance** &mdash; per the NJC WFAD

**Note:** Several bargaining groups (e.g. EC, AS, PM) have WFA provisions written directly into their collective agreements, which may differ from the NJC Directive. This tool reflects the NJC Directive — consult your collective agreement and/or union to confirm any differences.

For more WFA resources, visit the [WFA Resources page](/wfa).

*Built by [Claudie Larouche](https://www.linkedin.com/in/claudie-larouche/){:target="_blank" rel="noopener noreferrer"} and [Claude](https://claude.ai){:target="_blank" rel="noopener noreferrer"}. Please see [claudielarouche.com](https://claudielarouche.com) to try my other tools.*
