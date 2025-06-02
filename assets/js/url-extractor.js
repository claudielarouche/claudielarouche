/*const API_BASE_URL = 'https://your-project-name.your-username.repl.co';*/
    
    const API_BASE_URL = 'https://url-extractor-1-claudielarouche.replit.app';

    async function fetchLinks() {
      const urlInput = document.getElementById('urlInput').value.trim();
      const status = document.getElementById('status');
      const list = document.getElementById('linkList');
      list.innerHTML = '';
      status.textContent = '';

      if (!urlInput) {
        status.textContent = 'Please enter a valid URL.';
        return;
      }

      status.textContent = 'Fetching links...';

      try {
        const response = await fetch(`${API_BASE_URL}/fetch-links?url=${encodeURIComponent(urlInput)}`);
        const data = await response.json();

        if (response.ok) {
          if (data.links && data.links.length > 0) {
            status.textContent = `Found ${data.links.length} link(s):`;
            data.links.forEach(link => {
              const li = document.createElement('li');
              const a = document.createElement('a');
              a.href = link;
              a.textContent = link;
              a.target = '_blank';
              li.appendChild(a);
              list.appendChild(li);
            });
          } else {
            status.textContent = 'No links found.';
          }
        } else {
          status.textContent = 'Error: ' + (data.error || 'Unknown error');
        }

      } catch (error) {
        status.textContent = 'Error: ' + error.message;
      }
    }