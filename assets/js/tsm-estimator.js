// =====================================================
// TSM Estimator – Calculation Logic
// Based on NJC Work Force Adjustment Directive (WFAD)
// Appendix C & Section 6.4.1(b)
// =====================================================

// Official Appendix C lookup table: years of service → TSM weeks
var TSM_TABLE = {
  0: 10, 1: 22, 2: 24, 3: 26, 4: 28, 5: 30,
  6: 32, 7: 34, 8: 36, 9: 38, 10: 40, 11: 42,
  12: 44, 13: 46, 14: 48, 15: 50,
  16: 52, 17: 52, 18: 52, 19: 52, 20: 52, 21: 52,
  22: 52, 23: 52, 24: 52, 25: 52, 26: 52, 27: 52,
  28: 52, 29: 52,
  30: 49, 31: 46, 32: 43, 33: 40, 34: 37, 35: 34,
  36: 31, 37: 28, 38: 25, 39: 22, 40: 19, 41: 16,
  42: 13, 43: 10, 44: 7, 45: 4
};

function getTSMWeeks(years) {
  var y = Math.min(Math.floor(years), 45);
  return TSM_TABLE[y];
}

// ---- Toggle helpers ----

function togglePartTimeHours() {
  var empType = document.getElementById('employment-type').value;
  var group = document.getElementById('weekly-hours-group');
  group.style.display = (empType === 'part-time' || empType === 'seasonal') ? 'block' : 'none';
}

// ---- Helpers ----

function formatCurrency(amount) {
  return '$' + amount.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ---- Main calculation ----

function calculateTSM() {
  // --- Collect inputs ---
  var yearsVal = document.getElementById('years-of-service').value;
  var salaryVal = document.getElementById('annual-salary').value;
  var empType = document.getElementById('employment-type').value;

  // Validate required fields
  if (yearsVal === '' || isNaN(yearsVal) || parseFloat(yearsVal) < 0) {
    alert('Please enter your years of public service (0 or more).');
    document.getElementById('years-of-service').focus();
    return;
  }
  if (salaryVal === '' || isNaN(salaryVal) || parseFloat(salaryVal) <= 0) {
    alert('Please enter your current annual salary.');
    document.getElementById('annual-salary').focus();
    return;
  }
  if (!empType) { empType = 'full-time'; }
  if (empType === 'part-time' || empType === 'seasonal') {
    var hoursVal = document.getElementById('weekly-hours').value;
    if (hoursVal === '' || isNaN(hoursVal) || parseFloat(hoursVal) <= 0) {
      alert('Please enter your average weekly hours.');
      document.getElementById('weekly-hours').focus();
      return;
    }
  }

  // --- Parse values ---
  var yearsRaw = parseFloat(yearsVal);
  var yearsFloor = Math.floor(Math.min(yearsRaw, 45));
  var salary = parseFloat(salaryVal);
  var weeklyHours = (empType !== 'full-time')
    ? parseFloat(document.getElementById('weekly-hours').value || 0)
    : 37.5;

  var ageVal = document.getElementById('age').value;
  var age = ageVal !== '' ? parseInt(ageVal) : null;
  var pensionYearsVal = document.getElementById('pension-years').value;
  var pensionYears = pensionYearsVal !== '' ? parseInt(pensionYearsVal) : null;

  var surplusDateRaw = document.getElementById('surplus-start-date').value;
  var alternationWeeks = 0;
  var surplusStartDate = null;
  if (surplusDateRaw) {
    surplusStartDate = new Date(surplusDateRaw + 'T12:00:00');
    var today = new Date();
    var msElapsed = today - surplusStartDate;
    alternationWeeks = msElapsed > 0 ? Math.floor(msElapsed / (7 * 24 * 60 * 60 * 1000)) : 0;
  }
  var isAlternate = alternationWeeks > 0;

  // --- Core calculations ---
  var weeklyPay = salary / 52;
  var tsmWeeksBase = getTSMWeeks(yearsFloor);
  var tsmWeeks = isAlternate ? Math.max(0, tsmWeeksBase - alternationWeeks) : tsmWeeksBase;

  var tsmAmountFull = tsmWeeks * weeklyPay;
  var isProRated = (empType !== 'full-time');
  var tsmAmount = isProRated && weeklyHours > 0
    ? tsmAmountFull * (weeklyHours / 37.5)
    : tsmAmountFull;

  // Pension waiver eligibility (Option B only — noted in output)
  var pensionWaiverEligible = age !== null && age >= 55 && age <= 59
    && pensionYears !== null && pensionYears >= 10;

  // EI delay
  var eiDelayWeeks = tsmWeeks;

  // --- Build results HTML ---
  var html = '';

  // Primary result card
  html += '<div class="tsm-result-card tsm-result-primary">';
  html += '<h4>Estimated TSM Amount</h4>';
  html += '<div class="tsm-big-number">' + formatCurrency(tsmAmount) + '</div>';
  html += '<p class="tsm-subtitle">Based on <strong>' + tsmWeeks + ' weeks</strong>'
    + ' &times; <strong>' + formatCurrency(weeklyPay) + '/week</strong></p>';
  if (isProRated && weeklyHours > 0) {
    html += '<div class="alert alert-warning tsm-alert-sm">&#9888; Pro-rated for '
      + empType + ' (' + weeklyHours + ' hrs/week &divide; 37.5 hrs). '
      + 'This is an <em>estimate only</em> &mdash; your exact amount depends on your collective agreement.</div>';
  }
  if (isAlternate) {
    html += '<p class="tsm-muted mt-2">TSM weeks reduced by <strong>' + alternationWeeks
      + ' week(s)</strong> due to alternation (surplus period started '
      + surplusStartDate.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
      + '; from ' + tsmWeeksBase + ' to ' + tsmWeeks + ' weeks).</p>';
  }
  html += '</div>';

  // Secondary detail grid
  html += '<div class="tsm-result-grid">';
  html += '<div class="tsm-result-card tsm-result-secondary">'
    + '<p class="tsm-label">Years of Service</p>'
    + '<p class="tsm-value">' + yearsFloor + '</p></div>';
  html += '<div class="tsm-result-card tsm-result-secondary">'
    + '<p class="tsm-label">TSM Weeks</p>'
    + '<p class="tsm-value">' + tsmWeeks + '</p></div>';
  html += '<div class="tsm-result-card tsm-result-secondary">'
    + '<p class="tsm-label">Weekly Pay</p>'
    + '<p class="tsm-value">' + formatCurrency(weeklyPay) + '</p></div>';
  html += '</div>';

  if (yearsRaw !== yearsFloor) {
    html += '<div class="alert alert-info tsm-alert-sm">'
      + '<strong>Note:</strong> Your ' + yearsRaw + ' years was rounded down to '
      + yearsFloor + ' completed years (the NJC WFAD does not specify interpolation for partial years).'
      + '</div>';
  }

  // EI delay warning
  html += '<div class="alert alert-warning">';
  html += '<strong>&#9200; EI Delay:</strong> Your TSM (and any severance) must first be allocated '
    + 'based on your normal gross weekly earnings, delaying the start of your EI benefits by approximately '
    + '<strong>' + eiDelayWeeks + ' weeks</strong>. Plan your finances accordingly. '
    + 'See <a href="https://www.canada.ca/en/employment-social-development/programs/ei/ei-list/reports/regular-benefits.html" '
    + 'target="_blank" rel="noopener noreferrer">Service Canada EI information</a>.';
  html += '</div>';

  // Entitlement summary
  html += '<div class="tsm-result-card tsm-result-secondary">';
  html += '<h4>Entitlement Summary</h4>';
  html += '<ul class="tsm-checklist">';
  html += '<li>&#9989; <strong>Counselling allowance:</strong> Up to <strong>$1,200</strong> for financial '
    + 'and job placement counselling services (per the NJC WFAD). Keep your receipts.</li>';
  html += '<li>&#8505;&#65039; <strong>Severance pay:</strong> Severance under your collective agreement '
    + 'is <strong>in addition</strong> to the TSM — this tool does not calculate it. '
    + 'Consult your collective agreement or union.</li>';
  html += '<li>&#8505;&#65039; <strong>Education allowance (Option C(i) or C(ii)):</strong> If you choose Option C, '
    + 'you may receive up to <strong>$17,000</strong> for receipted tuition, books, and relevant equipment, '
    + 'in addition to your TSM amount above. C(i) = resign; C(ii) = up to 2 years leave without pay.</li>';
  if (age !== null && pensionYears !== null) {
    if (pensionWaiverEligible) {
      html += '<li>&#9989; <strong>Pension reduction waiver:</strong> Based on your age (' + age
        + ') and pensionable service (' + pensionYears + ' years), you <strong>may be eligible</strong> '
        + 'for a pension reduction waiver if you choose <strong>Option B</strong>. Confirm with your HR advisor or pension contact.</li>';
    } else {
      html += '<li>&#10060; <strong>Pension reduction waiver:</strong> Based on the information provided, '
        + 'you do not appear to meet all criteria (requires age 55&ndash;59, &ge;10 years pensionable service, '
        + 'Option B, laid off with no reasonable job offer).</li>';
    }
  } else {
    html += '<li>&#8505;&#65039; <strong>Pension reduction waiver:</strong> If you are aged 55&ndash;59 '
      + 'with &ge;10 years of pensionable service and choose Option B, you may qualify. '
      + 'Enter your age and pension years above and recalculate to check.</li>';
  }
  html += '</ul>';
  html += '</div>';

  // Important rules
  html += '<div class="tsm-result-card tsm-result-secondary">';
  html += '<h4>Important Rules to Know</h4>';
  html += '<ul>';
  html += '<li>The TSM <strong>cannot be combined</strong> with any other payment under the WFAD (Section 6.3.3).</li>';
  html += '<li>If you are <strong>re-appointed</strong> to a federal department (Schedules I, IV, or V) '
    + 'after receiving the TSM, you must reimburse the Receiver General for the period from '
    + 're-appointment to the end of the TSM period (Section 6.3.7).</li>';
  html += '</ul>';
  html += '</div>';

  // Disclaimer
  html += '<div class="tsm-disclaimer">';
  html += '<h4>&#9888; Disclaimers</h4>';
  html += '<ol>';
  html += '<li><strong>This is an estimate only.</strong> Actual TSM amounts are determined by your '
    + 'department and the Public Service Pay Centre.</li>';
  html += '<li><strong>Tax is not calculated.</strong> The TSM is taxable income — consult a tax professional.</li>';
  html += '<li><strong>Severance pay is separate</strong> and depends on your specific collective agreement.</li>';
  if (isProRated) {
    html += '<li><strong>Pro-rating for ' + empType + ' employees is approximate.</strong> '
      + 'Your exact pro-rating factor depends on your collective agreement.</li>';
  }
  html += '</ol>';
  html += '<p><strong>Official sources:</strong> '
    + '<a href="https://www.njc-cnm.gc.ca/directive/d12/v239/s673/en" target="_blank" rel="noopener noreferrer">NJC WFAD Appendix C</a>'
    + ' &bull; '
    + '<a href="https://www.njc-cnm.gc.ca/directive/d12/v239/en" target="_blank" rel="noopener noreferrer">Full NJC WFAD</a>'
    + ' &bull; '
    + '<a href="https://www.canada.ca/en/government/publicservice/workforce/workforce-adjustment.html" target="_blank" rel="noopener noreferrer">Workforce Adjustment &mdash; Canada.ca</a>'
    + '</p>';
  html += '</div>';

  // Show results and scroll to them
  document.getElementById('tsm-results-content').innerHTML = html;
  var resultsSection = document.getElementById('tsm-results');
  resultsSection.style.display = 'block';
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ---- Reset ----

function resetForm() {
  ['years-of-service', 'annual-salary', 'weekly-hours',
   'age', 'pension-years', 'surplus-start-date'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('employment-type').value = 'full-time';

  var hoursGroup = document.getElementById('weekly-hours-group');
  if (hoursGroup) hoursGroup.style.display = 'none';

  document.getElementById('tsm-results').style.display = 'none';
  document.getElementById('tsm-results-content').innerHTML = '';

  document.getElementById('tsm-tool').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
