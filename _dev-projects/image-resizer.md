---
title: "Image Resizer"
layout: dev
---

<div class="ir-wrap">
  <h1 class="sr-only">Image Resizer</h1>

  <section class="ir-card">
    <div class="ir-row">
      <div class="ir-col">
        <label class="ir-label" for="irFile">Upload an image</label>
        <input id="irFile" class="ir-input" type="file" accept="image/*" />
        <p class="ir-help" id="irMeta"></p>
      </div>

      <div class="ir-col ir-dims">
        <div class="ir-dim">
          <label class="ir-label" for="irW">Target width (px)</label>
          <input id="irW" class="ir-input" type="number" min="1" value="600" />
        </div>
        <div class="ir-dim">
          <label class="ir-label" for="irH">Target height (px)</label>
          <input id="irH" class="ir-input" type="number" min="1" value="400" />
        </div>
        <div class="ir-actions">
          <button id="irStart" class="ir-btn" disabled>Start</button>
          <button id="irReset" class="ir-btn ir-btn-ghost" disabled>Reset</button>
        </div>
        <p class="ir-help" id="irStatus"></p>
      </div>
    </div>
  </section>

  <section class="ir-card">
    <div class="ir-stage-wrap">
      <div class="ir-stage" id="irStage" aria-label="Crop and resize stage">
        <img id="irImg" alt="" draggable="false" />
        <div id="irCrop" class="ir-crop" hidden>
          <div class="ir-handle ir-handle-nw" data-h="nw" aria-hidden="true"></div>
          <div class="ir-handle ir-handle-ne" data-h="ne" aria-hidden="true"></div>
          <div class="ir-handle ir-handle-sw" data-h="sw" aria-hidden="true"></div>
          <div class="ir-handle ir-handle-se" data-h="se" aria-hidden="true"></div>
        </div>
      </div>

      <div class="ir-export">
        <button id="irExport" class="ir-btn" disabled>Export</button>
        <a id="irDownload" class="ir-link" hidden>Download</a>
        <p class="ir-help" id="irExportMeta"></p>
      </div>
    </div>
  </section>

  <canvas id="irCanvas" hidden></canvas>
</div>

<style>
  .ir-wrap { max-width: 980px; margin: 0 auto; padding: 16px; }
  .ir-card { background: #fff; border: 1px solid rgba(0,0,0,.08); border-radius: 14px; padding: 16px; box-shadow: 0 1px 6px rgba(0,0,0,.04); margin-bottom: 14px; }
  .ir-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 860px) { .ir-row { grid-template-columns: 1fr; } }
  .ir-col { display: flex; flex-direction: column; gap: 8px; }
  .ir-label { font-weight: 600; font-size: 14px; }
  .ir-input { width: 100%; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,.18); font-size: 14px; }
  .ir-help { margin: 0; font-size: 13px; color: rgba(0,0,0,.62); min-height: 18px; }
  .ir-dims { align-content: start; }
  .ir-dim { display: flex; flex-direction: column; gap: 6px; }
  .ir-actions { display: flex; gap: 10px; margin-top: 4px; flex-wrap: wrap; }
  .ir-btn { padding: 10px 14px; border-radius: 12px; border: 1px solid rgba(0,0,0,.18); background: #111; color: #fff; cursor: pointer; font-weight: 600; }
  .ir-btn[disabled] { opacity: .45; cursor: not-allowed; }
  .ir-btn-ghost { background: #fff; color: #111; }
  .ir-stage-wrap { display: grid; grid-template-columns: 1fr; gap: 12px; }
  .ir-stage { position: relative; width: 100%; height: min(70vh, 560px); background: rgba(0,0,0,.04); border-radius: 14px; overflow: hidden; border: 1px solid rgba(0,0,0,.08); }
  .ir-stage img { position: absolute; inset: 0; margin: auto; max-width: 100%; max-height: 100%; user-select: none; -webkit-user-drag: none; }
  .ir-crop { position: absolute; border: 2px solid rgba(17,17,17,.95); box-shadow: 0 0 0 9999px rgba(0,0,0,.35); border-radius: 6px; cursor: move; }
  .ir-handle { position: absolute; width: 14px; height: 14px; background: #fff; border: 2px solid rgba(17,17,17,.95); border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,.2); }
  .ir-handle-nw { left: -9px; top: -9px; cursor: nwse-resize; }
  .ir-handle-ne { right: -9px; top: -9px; cursor: nesw-resize; }
  .ir-handle-sw { left: -9px; bottom: -9px; cursor: nesw-resize; }
  .ir-handle-se { right: -9px; bottom: -9px; cursor: nwse-resize; }
  .ir-export { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .ir-link { font-weight: 600; text-decoration: underline; cursor: pointer; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
</style>

<script>
(() => {
  const elFile = document.getElementById("irFile");
  const elW = document.getElementById("irW");
  const elH = document.getElementById("irH");
  const elStart = document.getElementById("irStart");
  const elReset = document.getElementById("irReset");
  const elExport = document.getElementById("irExport");
  const elDownload = document.getElementById("irDownload");
  const elMeta = document.getElementById("irMeta");
  const elStatus = document.getElementById("irStatus");
  const elExportMeta = document.getElementById("irExportMeta");

  const stage = document.getElementById("irStage");
  const imgEl = document.getElementById("irImg");
  const cropEl = document.getElementById("irCrop");
  const canvas = document.getElementById("irCanvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  const EPS = 1e-6;

  let sourceFile = null;
  let sourceImg = new Image();
  let imgNaturalW = 0;
  let imgNaturalH = 0;

  let stageRect = null;
  let imgRect = null;

  let ratioTarget = 600 / 400;

  let mode = "idle"; // idle | ready | crop | done
  let drag = null;

  function setStatus(msg) { elStatus.textContent = msg || ""; }
  function setMeta(msg) { elMeta.textContent = msg || ""; }
  function setExportMeta(msg) { elExportMeta.textContent = msg || ""; }

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function gcd(a,b){ while(b){ [a,b]=[b,a%b]; } return a; }

  function readTarget() {
    const w = Math.max(1, parseInt(elW.value || "1", 10));
    const h = Math.max(1, parseInt(elH.value || "1", 10));
    elW.value = w;
    elH.value = h;
    ratioTarget = w / h;
    return { w, h, ratio: ratioTarget };
  }

  function resetAll() {
    sourceFile = null;
    imgEl.src = "";
    sourceImg = new Image();
    imgNaturalW = 0;
    imgNaturalH = 0;
    cropEl.hidden = true;
    elStart.disabled = true;
    elReset.disabled = true;
    elExport.disabled = true;
    elDownload.hidden = true;
    elDownload.removeAttribute("href");
    elDownload.removeAttribute("download");
    setMeta("");
    setStatus("");
    setExportMeta("");
    mode = "idle";
  }

  function enableForLoadedImage() {
    elStart.disabled = false;
    elReset.disabled = false;
    setStatus("Click Start to resize. If the ratio does not match, you will get a crop box.");
  }

  function updateRects() {
    stageRect = stage.getBoundingClientRect();
    imgRect = imgEl.getBoundingClientRect();
  }

  function aspectMatches(a, b) {
    return Math.abs(a - b) <= 0.002; // tolerance for browser rounding and user inputs
  }

  function fitCropToImage() {
    updateRects();

    const { w: tW, h: tH, ratio } = readTarget();

    const displayW = imgRect.width;
    const displayH = imgRect.height;

    let cropW = displayW * 0.85;
    let cropH = cropW / ratio;

    if (cropH > displayH * 0.85) {
      cropH = displayH * 0.85;
      cropW = cropH * ratio;
    }

    const left = imgRect.left - stageRect.left + (displayW - cropW) / 2;
    const top = imgRect.top - stageRect.top + (displayH - cropH) / 2;

    setCropBox({ left, top, width: cropW, height: cropH });
  }

  function getCropBox() {
    const left = parseFloat(cropEl.style.left);
    const top = parseFloat(cropEl.style.top);
    const width = parseFloat(cropEl.style.width);
    const height = parseFloat(cropEl.style.height);
    return { left, top, width, height };
  }

  function setCropBox({ left, top, width, height }) {
    updateRects();
    const imgLeft = imgRect.left - stageRect.left;
    const imgTop = imgRect.top - stageRect.top;
    const imgRight = imgLeft + imgRect.width;
    const imgBottom = imgTop + imgRect.height;

    width = clamp(width, 20, imgRect.width);
    height = clamp(height, 20, imgRect.height);

    left = clamp(left, imgLeft, imgRight - width);
    top = clamp(top, imgTop, imgBottom - height);

    cropEl.style.left = left + "px";
    cropEl.style.top = top + "px";
    cropEl.style.width = width + "px";
    cropEl.style.height = height + "px";
  }

  function pointInEl(e, targetEl) {
    const r = targetEl.getBoundingClientRect();
    return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
  }

  function stagePoint(e) {
    updateRects();
    return { x: e.clientX - stageRect.left, y: e.clientY - stageRect.top };
  }

  function exportFromCrop() {
    const { w: outW, h: outH } = readTarget();
    updateRects();

    const crop = getCropBox();

    const imgLeft = imgRect.left - stageRect.left;
    const imgTop = imgRect.top - stageRect.top;

    const relX = crop.left - imgLeft;
    const relY = crop.top - imgTop;

    const scaleX = imgNaturalW / imgRect.width;
    const scaleY = imgNaturalH / imgRect.height;

    const srcX = Math.round(relX * scaleX);
    const srcY = Math.round(relY * scaleY);
    const srcW = Math.round(crop.width * scaleX);
    const srcH = Math.round(crop.height * scaleY);

    canvas.width = outW;
    canvas.height = outH;

    ctx.clearRect(0, 0, outW, outH);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(sourceImg, srcX, srcY, srcW, srcH, 0, 0, outW, outH);

    const hasAlpha = detectAlpha(canvas, ctx);

    const mime = hasAlpha ? "image/png" : "image/jpeg";
    const ext = hasAlpha ? "png" : "jpg";

    canvas.toBlob((blob) => {
      if (!blob) {
        setExportMeta("Export failed.");
        return;
      }
      const url = URL.createObjectURL(blob);
      elDownload.href = url;
      elDownload.download = `resized-${outW}x${outH}.${ext}`;
      elDownload.hidden = false;
      elDownload.textContent = `Download resized image (${outW}×${outH} ${ext.toUpperCase()})`;
      setExportMeta(hasAlpha ? "Transparency detected. Exported as PNG." : "No transparency detected. Exported as JPG.");
      mode = "done";
    }, mime, mime === "image/jpeg" ? 0.9 : undefined);
  }

  function detectAlpha(canvasEl, context) {
    const w = canvasEl.width;
    const h = canvasEl.height;

    const step = Math.max(1, Math.floor(Math.min(w, h) / 200));
    const imgData = context.getImageData(0, 0, w, h).data;

    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const i = (y * w + x) * 4 + 3;
        if (imgData[i] !== 255) return true;
      }
    }
    return false;
  }

  function resizeDirect() {
    const { w: outW, h: outH } = readTarget();

    canvas.width = outW;
    canvas.height = outH;

    ctx.clearRect(0, 0, outW, outH);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(sourceImg, 0, 0, imgNaturalW, imgNaturalH, 0, 0, outW, outH);

    const hasAlpha = detectAlpha(canvas, ctx);
    const mime = hasAlpha ? "image/png" : "image/jpeg";
    const ext = hasAlpha ? "png" : "jpg";

    canvas.toBlob((blob) => {
      if (!blob) {
        setExportMeta("Export failed.");
        return;
      }
      const url = URL.createObjectURL(blob);
      elDownload.href = url;
      elDownload.download = `resized-${outW}x${outH}.${ext}`;
      elDownload.hidden = false;
      elDownload.textContent = `Download resized image (${outW}×${outH} ${ext.toUpperCase()})`;
      setExportMeta(hasAlpha ? "Transparency detected. Exported as PNG." : "No transparency detected. Exported as JPG.");
      mode = "done";
    }, mime, mime === "image/jpeg" ? 0.9 : undefined);
  }

  function startFlow() {
    if (!sourceFile || !imgNaturalW || !imgNaturalH) return;

    const { w: outW, h: outH, ratio } = readTarget();
    const srcRatio = imgNaturalW / imgNaturalH;

    elDownload.hidden = true;
    setExportMeta("");

    if (aspectMatches(srcRatio, ratio)) {
      cropEl.hidden = true;
      setStatus("Aspect ratio matches. Resizing now.");
      elExport.disabled = true;
      resizeDirect();
      return;
    }

    cropEl.hidden = false;
    fitCropToImage();
    elExport.disabled = false;

    const g = gcd(outW, outH);
    const rw = outW / g;
    const rh = outH / g;
    setStatus(`Aspect ratio mismatch. Adjust the crop box (${rw}:${rh}) then click Export.`);
    mode = "crop";
  }

  function handlePointerDown(e) {
    if (mode !== "crop") return;
    if (e.button !== 0) return;

    updateRects();

    const p = stagePoint(e);
    const crop = getCropBox();

    const inCrop = (p.x >= crop.left && p.x <= crop.left + crop.width && p.y >= crop.top && p.y <= crop.top + crop.height);
    if (!inCrop) return;

    const handle = e.target?.dataset?.h || null;

    drag = {
      type: handle ? "resize" : "move",
      handle,
      startX: p.x,
      startY: p.y,
      startCrop: { ...crop },
      ratio: ratioTarget
    };

    e.preventDefault();
  }

  function handlePointerMove(e) {
    if (!drag) return;

    const p = stagePoint(e);
    const dx = p.x - drag.startX;
    const dy = p.y - drag.startY;

    if (drag.type === "move") {
      setCropBox({
        left: drag.startCrop.left + dx,
        top: drag.startCrop.top + dy,
        width: drag.startCrop.width,
        height: drag.startCrop.height
      });
      return;
    }

    const h = drag.handle;
    const r = drag.ratio;

    let newLeft = drag.startCrop.left;
    let newTop = drag.startCrop.top;
    let newW = drag.startCrop.width;
    let newH = drag.startCrop.height;

    const maxW = imgRect.width;
    const maxH = imgRect.height;

    const imgLeft = imgRect.left - stageRect.left;
    const imgTop = imgRect.top - stageRect.top;
    const imgRight = imgLeft + imgRect.width;
    const imgBottom = imgTop + imgRect.height;

    const minSize = 40;

    if (h === "se") {
      newW = clamp(drag.startCrop.width + dx, minSize, maxW);
      newH = newW / r;
    } else if (h === "nw") {
      newW = clamp(drag.startCrop.width - dx, minSize, maxW);
      newH = newW / r;
      newLeft = drag.startCrop.left + (drag.startCrop.width - newW);
      newTop = drag.startCrop.top + (drag.startCrop.height - newH);
    } else if (h === "ne") {
      newW = clamp(drag.startCrop.width + dx, minSize, maxW);
      newH = newW / r;
      newTop = drag.startCrop.top + (drag.startCrop.height - newH);
    } else if (h === "sw") {
      newW = clamp(drag.startCrop.width - dx, minSize, maxW);
      newH = newW / r;
      newLeft = drag.startCrop.left + (drag.startCrop.width - newW);
    }

    newLeft = clamp(newLeft, imgLeft, imgRight - newW);
    newTop = clamp(newTop, imgTop, imgBottom - newH);

    if (newLeft < imgLeft + EPS) {
      const right = newLeft + newW;
      newLeft = imgLeft;
      newW = right - newLeft;
      newH = newW / r;
    }
    if (newTop < imgTop + EPS) {
      const bottom = newTop + newH;
      newTop = imgTop;
      newH = bottom - newTop;
      newW = newH * r;
    }
    if (newLeft + newW > imgRight - EPS) {
      newW = (imgRight - newLeft);
      newH = newW / r;
    }
    if (newTop + newH > imgBottom - EPS) {
      newH = (imgBottom - newTop);
      newW = newH * r;
    }

    setCropBox({ left: newLeft, top: newTop, width: newW, height: newH });
  }

  function handlePointerUp() {
    drag = null;
  }

  elFile.addEventListener("change", async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    resetAll();
    sourceFile = file;

    const url = URL.createObjectURL(file);

    sourceImg = new Image();
    sourceImg.onload = () => {
      imgNaturalW = sourceImg.naturalWidth;
      imgNaturalH = sourceImg.naturalHeight;

      imgEl.src = url;

      setMeta(`${file.name} • ${imgNaturalW}×${imgNaturalH}`);
      enableForLoadedImage();
      mode = "ready";
    };
    sourceImg.onerror = () => {
      setStatus("Could not load that image.");
      URL.revokeObjectURL(url);
    };
    sourceImg.src = url;
  });

  elStart.addEventListener("click", () => {
    if (!sourceFile) return;
    elExport.disabled = true;
    startFlow();
  });

  elReset.addEventListener("click", () => {
    const keepFile = sourceFile;
    const keepImg = sourceImg;
    const keepW = elW.value;
    const keepH = elH.value;

    if (!keepFile || !imgNaturalW) { resetAll(); return; }

    cropEl.hidden = true;
    elDownload.hidden = true;
    setExportMeta("");
    setStatus("Reset crop. Click Start again.");
    mode = "ready";

    sourceFile = keepFile;
    sourceImg = keepImg;
    elW.value = keepW;
    elH.value = keepH;

    elStart.disabled = false;
    elReset.disabled = false;
    elExport.disabled = true;
  });

  elExport.addEventListener("click", () => {
    if (mode !== "crop") return;
    exportFromCrop();
  });

  window.addEventListener("resize", () => {
    if (mode !== "crop") return;
    const prev = getCropBox();
    updateRects();
    setCropBox(prev);
  });

  stage.addEventListener("pointerdown", handlePointerDown);
  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerup", handlePointerUp);
  window.addEventListener("pointercancel", handlePointerUp);

  resetAll();
})();
</script>
