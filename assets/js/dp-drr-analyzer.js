function selectAll() {
  const checkboxes = document.querySelectorAll('#urlCheckboxes input[type="checkbox"]');
  checkboxes.forEach(checkbox => checkbox.checked = true);
}

function unselectAll() {
  const checkboxes = document.querySelectorAll('#urlCheckboxes input[type="checkbox"]');
  checkboxes.forEach(checkbox => checkbox.checked = false);
}



function getDepartmentName(url) {
  const match = allUrls.find(entry => entry.url === url);
  return match ? match.department : 'Unknown Department';
}

  let allUrls = [];

  async function loadUrls() {
    const category = document.getElementById('datasetSelect').value;
    const urlListDiv = document.getElementById('urlCheckboxes');
    urlListDiv.innerHTML = 'Loading URLs...';

    try {
      /*const response = await fetch('/assets/data/drr-dp-analyzer.csv'); // Netlify version */
      const response = await fetch('/claudielarouche/assets/data/drr-dp-analyzer.csv'); // Github pages version
      const csvText = await response.text();

      const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });

      allUrls = parsed.data
      .filter(row => row['category']?.trim() === category)
      .map(row => ({
        category: row['category']?.trim(),
        department: row['department']?.trim(),
        url: row['url']?.trim()
      }));

      if (allUrls.length === 0) {
        urlListDiv.innerHTML = `<p style="color: red;">No URLs found for "${category}".</p>`;
        return;
      }

      // Render checkboxes
      urlListDiv.innerHTML = '<strong>Select URLs to extract from:</strong><br/>';
      allUrls.forEach((entry, index) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `url-${index}`;
        checkbox.value = entry.url;
        checkbox.checked = true;

        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.innerText = entry.department;

        urlListDiv.appendChild(checkbox);
        urlListDiv.appendChild(label);
        urlListDiv.appendChild(document.createElement('br'));
      });

    } catch (err) {
      urlListDiv.innerHTML = `<p style="color: red;">Error loading URL list.</p>`;
    }
  }

  async function scrape() {
    const searchText = document.getElementById('searchText').value.trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Preparing request...';

    // Collect selected URLs
    const urls = allUrls
      .map((entry, index) => {
        const checkbox = document.getElementById(`url-${index}`);
        return checkbox.checked ? checkbox.value : null;
      })
      .filter(Boolean);

    if (urls.length === 0) {
      resultsDiv.innerHTML = '<p style="color: red;">Please select at least one URL.</p>';
      return;
    }

    try {
      resultsDiv.innerHTML = 'Extracting...';

      const scrapeResponse = await fetch("https://dp-drr-analyzer-claudielarouche.replit.app/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ urls, searchText })
      });

      const data = await scrapeResponse.json();
      resultsDiv.innerHTML = '';

      if (data.error) {
        resultsDiv.innerHTML = `<p style="color: red; font-weight: bold; padding: 10px; background-color: #ffe6e6; border: 1px solid #ff9999; border-radius: 5px;">${data.error}</p>`;

        // If there are partial results, show them too
        if (data.results && data.results.length > 0) {
          const partialResultsDiv = document.createElement('div');
          partialResultsDiv.innerHTML = '<h3>Partial Results (before abort):</h3>';

          data.results.forEach(result => {
            const container = document.createElement('div');
            container.className = 'result';
            container.innerHTML = `
              <strong>URL:</strong> <a href="${result.url}" target="_blank" rel="noopener noreferrer">${result.url}</a><br>
              <strong>Department:</strong> ${getDepartmentName(result.url)}<br>
              <strong>Matched Content:</strong><br>
              <div>${result.text}</div>
            `;
            partialResultsDiv.appendChild(container);
            partialResultsDiv.appendChild(document.createElement('hr'));
          });

          resultsDiv.appendChild(partialResultsDiv);
        }
        return;
      }

      if (data.results) {
        data.results.forEach(result => {
          const container = document.createElement('div');
          container.className = 'result';
          container.innerHTML = `
            <strong>URL:</strong> <a href="${result.url}" target="_blank" rel="noopener noreferrer">${result.url}</a><br>
            <strong>Department Name:</strong> ${getDepartmentName(result.url)}<br>
            <strong>Matched Content:</strong><br>
            <div>${result.text}</div>
          `;
          resultsDiv.appendChild(container);
          resultsDiv.appendChild(document.createElement('hr'));
        });
      } else {
        resultsDiv.innerHTML = 'No results found.';
      }

    } catch (error) {
      console.error("Error:", error);
      resultsDiv.innerHTML = `<p style="color: red;">Failed to scrape URLs.</p>`;
    }
  }
  window.addEventListener('DOMContentLoaded', loadUrls);