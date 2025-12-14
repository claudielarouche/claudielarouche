---
layout: dev 
title: Generate md files
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CSV → Markdown → ZIP</title>
    <style>
      body {
        font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        margin: 40px;
        max-width: 980px;
      }
      h1 { margin: 0 0 8px; }
      .sub { color: #555; margin: 0 0 24px; }
      .card {
        border: 1px solid #ddd;
        border-radius: 12px;
        padding: 18px;
        margin-bottom: 18px;
      }
      label { display: block; font-weight: 600; margin-top: 12px; }
      input[type="text"], select {
        width: 100%;
        padding: 10px;
        font-size: 14px;
        margin-top: 6px;
      }
      input[type="file"] { margin-top: 6px; }
      button {
        margin-top: 16px;
        padding: 12px 14px;
        font-size: 14px;
        cursor: pointer;
      }
      .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
      .hint { color: #666; font-size: 13px; margin-top: 6px; }
      .error { color: #b00020; font-weight: 650; margin-top: 10px; }
      .ok { color: #146c2e; font-weight: 650; margin-top: 10px; }
      .small { font-size: 12px; color: #666; }
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
      .preview {
        white-space: pre;
        overflow: auto;
        background: #fafafa;
        border: 1px solid #eee;
        border-radius: 10px;
        padding: 12px;
        margin-top: 12px;
        max-height: 260px;
      }
    </style>
  </head>
  <body>
    <h1>CSV → Markdown → ZIP</h1>
    <p class="sub">Pick a CSV, choose the title column, optionally set a layout, then download a ZIP of generated Markdown files.</p>

    <div class="card">
      <label for="csvFile">CSV file</label>
      <input id="csvFile" type="file" accept=".csv,text/csv" />

      <div class="row">
        <div>
          <label for="titleCol">Title column</label>
          <select id="titleCol" disabled>
            <option value="">Upload a CSV first</option>
          </select>
          <div class="hint">Must match a header in your CSV.</div>
        </div>

        <div>
          <label for="layoutInput">Layout</label>
          <input id="layoutInput" type="text" placeholder="default" />
          <div class="hint">If blank, layout will be <span class="mono">default</span>.</div>
        </div>
      </div>

      <div class="row">
        <div>
          <label for="filenameCol">Filename column (optional)</label>
          <select id="filenameCol" disabled>
            <option value="">(none) use row number + slug</option>
          </select>
          <div class="hint">If provided, that column will be used to name files (slugified).</div>
        </div>

        <div>
          <label for="folderName">Folder name inside ZIP (optional)</label>
          <input id="folderName" type="text" placeholder="md" />
          <div class="hint">If blank, files are in the ZIP root.</div>
        </div>
      </div>

      <button id="generateBtn" disabled>Generate ZIP</button>

      <div id="status" class="hint"></div>

      <div id="previewWrap" style="display:none;">
        <div class="hint" style="margin-top:14px;">Preview of the first generated file:</div>
        <div id="preview" class="preview"></div>
      </div>
    </div>

    <div class="small">
      Notes:
      <br />• Front matter includes: title, layout, image, image_hero, image_attribution, image_attribution_url, plus one key per CSV column.
      <br />• Empty cells become empty strings in YAML.
    </div>

    <script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"></script>

    <script>
      const csvFileEl = document.getElementById("csvFile");
      const titleColEl = document.getElementById("titleCol");
      const layoutInputEl = document.getElementById("layoutInput");
      const filenameColEl = document.getElementById("filenameCol");
      const folderNameEl = document.getElementById("folderName");
      const generateBtn = document.getElementById("generateBtn");
      const statusEl = document.getElementById("status");
      const previewWrapEl = document.getElementById("previewWrap");
      const previewEl = document.getElementById("preview");

      let parsed = null; // { headers: [], rows: [] }

      function setStatus(msg, kind = "hint") {
        statusEl.className = kind;
        statusEl.textContent = msg || "";
      }

      function slugify(input) {
        return String(input ?? "")
          .trim()
          .toLowerCase()
          .normalize("NFKD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .replace(/-{2,}/g, "-");
      }

      function sanitizeKey(key) {
        // YAML keys: keep them readable, avoid weird chars
        return String(key ?? "")
          .trim()
          .replace(/\s+/g, "_")
          .replace(/[^A-Za-z0-9_]/g, "_")
          .replace(/_{2,}/g, "_")
          .replace(/^_+|_+$/g, "");
      }

      function yamlEscapeValue(val) {
        // Always quote as a JSON string for safe YAML scalars
        // Handles quotes, newlines, colons, etc.
        const s = val === null || val === undefined ? "" : String(val);
        return JSON.stringify(s);
      }

      function buildFrontMatter(rowObj, titleCol, layoutValue, headers) {
        const titleValue = rowObj[titleCol] ?? "";

        let yaml = "";
        yaml += "---\n";
        yaml += `title: ${yamlEscapeValue(titleValue)}\n`;
        yaml += `layout: ${yamlEscapeValue(layoutValue || "default")}\n`;
        yaml += "image: \n";
        yaml += "image_hero: \n";
        yaml += "image_attribution: \n";
        yaml += "image_attribution_url: \n";

        for (const h of headers) {
          const key = sanitizeKey(h);
          if (!key) continue;

          // avoid duplicate keys that we already wrote
          const reserved = new Set(["title", "layout", "image", "image_hero", "image_attribution", "image_attribution_url"]);
          if (reserved.has(key)) continue;

          yaml += `${key}: ${yamlEscapeValue(rowObj[h] ?? "")}\n`;
        }

        yaml += "---\n";
        yaml += "\n";
        return yaml;
      }

      function pickFilename(rowObj, rowIndex, titleCol, filenameCol) {
        const fallbackBase = `${String(rowIndex + 1).padStart(3, "0")}-${slugify(rowObj[titleCol] ?? "item") || "item"}`;
        if (!filenameCol) return `${fallbackBase}.md`;

        const fromCol = slugify(rowObj[filenameCol] ?? "");
        return `${fromCol || fallbackBase}.md`;
      }

      function populateSelect(selectEl, headers, placeholder) {
        selectEl.innerHTML = "";
        const ph = document.createElement("option");
        ph.value = "";
        ph.textContent = placeholder;
        selectEl.appendChild(ph);

        for (const h of headers) {
          const opt = document.createElement("option");
          opt.value = h;
          opt.textContent = h;
          selectEl.appendChild(opt);
        }
      }

      csvFileEl.addEventListener("change", async () => {
        previewWrapEl.style.display = "none";
        previewEl.textContent = "";
        setStatus("");

        const file = csvFileEl.files?.[0];
        if (!file) {
          parsed = null;
          titleColEl.disabled = true;
          filenameColEl.disabled = true;
          generateBtn.disabled = true;
          return;
        }

        setStatus("Parsing CSV…");

        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const rows = results.data || [];
            const headers = results.meta?.fields || [];

            if (!headers.length) {
              parsed = null;
              setStatus("No headers detected. Make sure the first row of your CSV contains column names.", "error");
              titleColEl.disabled = true;
              filenameColEl.disabled = true;
              generateBtn.disabled = true;
              return;
            }

            if (!rows.length) {
              parsed = null;
              setStatus("CSV parsed but contains no data rows.", "error");
              titleColEl.disabled = true;
              filenameColEl.disabled = true;
              generateBtn.disabled = true;
              return;
            }

            parsed = { headers, rows };

            populateSelect(titleColEl, headers, "Select title column");
            populateSelect(filenameColEl, headers, "(none) use row number + slug");
            titleColEl.disabled = false;
            filenameColEl.disabled = false;

            // default title column guess
            const guess = headers.find(h => String(h).toLowerCase() === "title") || headers[0];
            titleColEl.value = guess;

            generateBtn.disabled = false;
            setStatus(`Loaded ${rows.length} rows, ${headers.length} columns.`, "ok");

            // show preview
            const first = rows[0];
            const fm = buildFrontMatter(first, titleColEl.value, layoutInputEl.value.trim(), headers);
            previewEl.textContent = fm;
            previewWrapEl.style.display = "block";
          },
          error: () => {
            parsed = null;
            setStatus("Failed to parse CSV.", "error");
            titleColEl.disabled = true;
            filenameColEl.disabled = true;
            generateBtn.disabled = true;
          }
        });
      });

      titleColEl.addEventListener("change", () => {
        if (!parsed) return;
        const first = parsed.rows[0];
        const fm = buildFrontMatter(first, titleColEl.value, layoutInputEl.value.trim(), parsed.headers);
        previewEl.textContent = fm;
        previewWrapEl.style.display = "block";
      });

      layoutInputEl.addEventListener("input", () => {
        if (!parsed) return;
        const first = parsed.rows[0];
        const fm = buildFrontMatter(first, titleColEl.value, layoutInputEl.value.trim(), parsed.headers);
        previewEl.textContent = fm;
        previewWrapEl.style.display = "block";
      });

      generateBtn.addEventListener("click", async () => {
        try {
          if (!parsed) {
            setStatus("Upload a CSV first.", "error");
            return;
          }

          const titleCol = titleColEl.value;
          if (!titleCol) {
            setStatus("Select a title column.", "error");
            return;
          }

          const layoutValue = layoutInputEl.value.trim() || "default";
          const filenameCol = filenameColEl.value || "";
          const folderName = folderNameEl.value.trim();

          setStatus("Generating files…");

          const zip = new JSZip();
          const target = folderName ? zip.folder(folderName) : zip;

          const { headers, rows } = parsed;

          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            const md = buildFrontMatter(row, titleCol, layoutValue, headers);
            const filename = pickFilename(row, i, titleCol, filenameCol);

            target.file(filename, md);
          }

          setStatus("Creating ZIP…");

          const blob = await zip.generateAsync({ type: "blob" });
          const ts = new Date();
          const stamp = ts.toISOString().slice(0, 10); // YYYY-MM-DD
          const zipName = `markdown_files_${stamp}.zip`;

          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = zipName;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(a.href);

          setStatus(`Done. Downloaded ${rows.length} markdown files as a ZIP.`, "ok");
        } catch (e) {
          setStatus(`Error: ${e?.message || String(e)}`, "error");
        }
      });
    </script>
  </body>
</html>
