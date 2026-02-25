---
layout: dev 
title: Generate md files
---

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Français Vivant — Learn French Through Text</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
  <!-- marked.js for markdown rendering -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/9.1.6/marked.min.js"></script>
  <style>
    :root {
      --cream: #f5f0e8;
      --ink: #1a1408;
      --warm-mid: #8c7355;
      --accent: #c0392b;
      --accent-soft: #e8d5d3;
      --gold: #b8860b;
      --surface: #faf7f2;
      --border: #d4c9b5;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--cream);
      color: var(--ink);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* ── HEADER ── */
    header {
      background: #fff;
      color: var(--ink);
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e0e0e0;
      flex-shrink: 0;
      min-height: 56px;
    }
    .header-logo {
      font-family: 'DM Sans', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      color: var(--ink);
      text-decoration: none;
      letter-spacing: 0.01em;
      white-space: nowrap;
    }
    .header-logo:hover { color: var(--accent); }
    .header-nav {
      display: flex;
      align-items: center;
      gap: 0;
    }
    .header-nav a {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.85rem;
      font-weight: 400;
      color: var(--ink);
      text-decoration: none;
      padding: 0 0.9rem;
      line-height: 56px;
      transition: color 0.15s;
      white-space: nowrap;
    }
    .header-nav a:hover { color: var(--accent); }

    /* ── APP TOOLBAR (second bar) ── */
    #app-toolbar {
      background: var(--ink);
      padding: 0.5rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid var(--gold);
      flex-shrink: 0;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .app-toolbar-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.1rem;
      color: var(--cream);
      font-style: italic;
    }
    .app-toolbar-title strong { font-style: normal; color: var(--gold); }
    .header-actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      flex-wrap: wrap;
    }
    #app-toolbar .btn-outline {
      color: var(--cream);
      border-color: rgba(255,255,255,0.3);
    }
    #app-toolbar .btn-outline:hover {
      background: rgba(255,255,255,0.1);
      border-color: rgba(255,255,255,0.6);
    }

    /* ── NEWSLETTER SECTION ── */
    .feedback-section {
      background: var(--surface);
      border-top: 1px solid var(--border);
      padding: 2rem;
    }
    .feedback-section .form-wrapper { max-width: 640px; margin: 0 auto; }
    .feedback-section h2 {
      font-family: 'DM Sans', sans-serif;
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--ink);
      margin-bottom: 0.75rem;
    }

    /* ── FOOTER ── */
    .site-footer {
      background: #fff;
      border-top: 1px solid #e0e0e0;
      padding: 1.5rem 0;
      font-size: 0.85rem;
      color: var(--warm-mid);
      flex-shrink: 0;
    }
    .site-footer .wrapper {
      max-width: 90%;
      margin: 0 auto;
      padding: 0 2rem;
    }
    .site-footer .footer-heading {
      font-family: 'DM Sans', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      color: var(--ink);
      margin-bottom: 0.75rem;
    }
    .site-footer .footer-col-wrapper {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
    }
    .site-footer .footer-col { flex: 1; min-width: 160px; }
    .site-footer .contact-list,
    .site-footer .social-media-list {
      list-style: none;
      padding: 0; margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    .site-footer .contact-list li,
    .site-footer .social-media-list li { font-size: 0.83rem; }
    .site-footer a { color: var(--warm-mid); text-decoration: none; transition: color 0.15s; }
    .site-footer a:hover { color: var(--accent); }
    .site-footer .u-email { color: var(--warm-mid); }
    .site-footer .social-media-list a {
      display: flex; align-items: center; gap: 0.4rem;
    }
    .site-footer .svg-icon {
      width: 16px; height: 16px;
      fill: var(--warm-mid);
      flex-shrink: 0;
      transition: fill 0.15s;
    }
    .site-footer a:hover .svg-icon { fill: var(--accent); }
    .site-footer .footer-col-3 p {
      font-size: 0.82rem;
      color: var(--warm-mid);
      line-height: 1.5;
      margin-bottom: 0.75rem;
    }

    /* ── BUTTONS ── */
    .btn {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.82rem;
      font-weight: 500;
      padding: 0.45rem 1rem;
      border-radius: 3px;
      border: 1.5px solid transparent;
      cursor: pointer;
      transition: all 0.15s;
      letter-spacing: 0.02em;
      white-space: nowrap;
    }
    .btn-primary { background: var(--accent); color: #fff; border-color: var(--accent); }
    .btn-primary:hover { background: #a93226; }
    .btn-outline { background: transparent; color: var(--cream); border-color: rgba(255,255,255,0.35); }
    .btn-outline:hover { background: rgba(255,255,255,0.1); }
    .btn-ink { background: var(--ink); color: var(--cream); border-color: var(--ink); }
    .btn-ink:hover { background: #2c2210; }
    .btn-ghost { background: transparent; color: var(--warm-mid); border-color: var(--border); }
    .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }
    .btn-gold { background: var(--gold); color: #fff; border-color: var(--gold); font-size: 0.8rem; }
    .btn-gold:hover { background: #9a6e09; }
    .btn-sm { padding: 0.28rem 0.65rem; font-size: 0.75rem; }
    .btn:disabled { opacity: 0.4; cursor: not-allowed; }

    /* ── API KEY BANNER ── */
    #api-banner {
      background: #fff8e6;
      border-bottom: 2px solid var(--gold);
      padding: 0.65rem 2rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
      flex-shrink: 0;
    }
    #api-banner label { font-size: 0.8rem; font-weight: 500; color: var(--warm-mid); white-space: nowrap; }
    #api-key-input {
      font-family: 'DM Mono', monospace;
      font-size: 0.78rem;
      padding: 0.38rem 0.75rem;
      border: 1.5px solid var(--border);
      border-radius: 3px;
      background: var(--cream);
      flex: 1;
      min-width: 200px;
      max-width: 360px;
    }
    #api-key-input:focus { outline: none; border-color: var(--gold); }
    .api-status { font-size: 0.78rem; color: var(--warm-mid); }
    .api-status.ok { color: #2e7d32; font-weight: 500; }
    #api-banner a { font-size: 0.78rem; color: var(--gold); text-decoration: underline; white-space: nowrap; }
    #api-banner a:hover { color: #9a6e09; }

    /* ── ONBOARDING (shown before upload) ── */
    #onboarding {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2.5rem 5% 3rem;
      gap: 0;
    }
    .onboarding-inner {
      width: 100%;
      max-width: 1400px;
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }
    .onboarding-hero {
      text-align: center;
      padding: 1rem 0 0.5rem;
    }
    .onboarding-hero h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem;
      font-style: italic;
      color: var(--ink);
      margin-bottom: 0.6rem;
    }
    .onboarding-hero p {
      color: var(--warm-mid);
      font-size: 1rem;
      line-height: 1.7;
      max-width: 680px;
      margin: 0 auto;
    }

    .how-it-works {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 1.5rem 1.75rem;
    }
    .how-it-works h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.1rem;
      margin-bottom: 1rem;
      color: var(--ink);
    }
    .steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
    }
    .step {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
    .step-icon { font-size: 1.4rem; }
    .step-title { font-weight: 600; font-size: 0.85rem; color: var(--ink); }
    .step-desc { font-size: 0.82rem; color: var(--warm-mid); line-height: 1.55; }

    .tips-box {
      background: #fff8e6;
      border: 1px solid #e8d9a0;
      border-left: 4px solid var(--gold);
      border-radius: 4px;
      padding: 1.1rem 1.25rem;
    }
    .tips-box h3 { font-size: 0.82rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--gold); margin-bottom: 0.6rem; }
    .tips-box ul { list-style: none; display: flex; flex-direction: column; gap: 0.35rem; }
    .tips-box li { font-size: 0.84rem; color: var(--ink); line-height: 1.5; padding-left: 1.2rem; position: relative; }
    .tips-box li::before { content: '→'; position: absolute; left: 0; color: var(--gold); }

    .upload-area {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 1.5rem 1.75rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    .upload-area h3 { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: var(--ink); }
    .drop-area {
      border: 2px dashed var(--border);
      border-radius: 6px;
      padding: 1.5rem 2.5rem;
      cursor: pointer;
      transition: all 0.2s;
      background: var(--cream);
      text-align: center;
      width: 100%;
    }
    .drop-area:hover, .drop-area.dragover { border-color: var(--accent); background: var(--accent-soft); }
    .drop-area .icon { font-size: 2rem; }
    .drop-area p { color: var(--warm-mid); font-size: 0.87rem; margin-top: 0.4rem; line-height: 1.5; }
    .or-divider { color: var(--warm-mid); font-size: 0.85rem; }

    /* ── APP LAYOUT ── */
    #app-layout {
      display: none;
      flex: 1;
      overflow: hidden;
      grid-template-columns: 1fr 360px;
    }
    #app-layout.visible { display: grid; }

    /* ── LEFT COL ── */
    #left-col {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      padding: 1.75rem 2rem;
      border-right: 1px solid var(--border);
      gap: 1.1rem;
    }

    .source-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .source-bar h3 { font-family: 'Playfair Display', serif; font-style: italic; color: var(--warm-mid); font-size: 1rem; }
    .progress-info { font-size: 0.75rem; color: var(--warm-mid); font-family: 'DM Mono', monospace; }

    .progress-bar-wrap { height: 3px; background: var(--border); border-radius: 2px; }
    .progress-bar-fill { height: 100%; background: var(--accent); border-radius: 2px; transition: width 0.3s; }

    .sentence-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-left: 4px solid var(--accent);
      border-radius: 4px;
      padding: 1.5rem 1.75rem;
    }
    .sentence-text {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem;
      line-height: 1.75;
    }
    .sentence-text .word-btn {
      background: none; border: none;
      font-family: inherit; font-size: inherit; color: inherit;
      cursor: pointer; padding: 0 1px;
      border-bottom: 1px dotted var(--warm-mid);
      transition: color 0.15s, border-color 0.15s;
      line-height: inherit;
    }
    .sentence-text .word-btn:hover { color: var(--accent); border-color: var(--accent); }

    /* Translation */
    .translation-box {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 1.1rem 1.25rem;
      display: none;
    }
    .translation-box.visible { display: block; }
    .translation-label {
      font-size: 0.68rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.1em;
      color: var(--warm-mid); margin-bottom: 0.35rem;
    }
    .translation-correct {
      font-family: 'Playfair Display', serif;
      font-size: 1rem; color: var(--ink);
      margin-bottom: 0.9rem; line-height: 1.6;
    }
    .translation-literal {
      font-family: 'DM Mono', monospace;
      font-size: 0.8rem; color: var(--warm-mid); line-height: 1.7;
    }

    .sentence-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }

    .nav-row {
      display: flex; align-items: center;
      justify-content: space-between;
      padding-top: 0.25rem;
      border-top: 1px solid var(--border);
    }
    .nav-btns { display: flex; gap: 0.5rem; }
    .keyboard-hint { font-size: 0.7rem; color: var(--warm-mid); font-family: 'DM Mono', monospace; }

    /* ── CHAT ── */
    .chat-section {
      border: 1.5px solid var(--border);
      border-radius: 6px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background: #fff;
    }
    .chat-header {
      background: var(--ink); color: var(--cream);
      padding: 0.65rem 1rem;
      font-size: 0.82rem; font-weight: 500;
      letter-spacing: 0.04em;
      display: flex; align-items: center; gap: 0.5rem;
    }
    .chat-subtitle {
      font-size: 0.7rem; color: rgba(245,240,232,0.5);
      font-weight: 400; font-style: italic;
      margin-left: auto; max-width: 180px;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    #chat-messages {
      min-height: 160px;
      max-height: 340px;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      background: var(--surface);
    }
    .chat-empty-msg {
      color: var(--warm-mid); font-size: 0.82rem;
      font-style: italic; text-align: center; padding: 1.5rem 0;
    }
    .chat-msg {
      max-width: 90%;
      padding: 0.55rem 0.85rem;
      border-radius: 4px;
      font-size: 0.85rem;
      line-height: 1.55;
    }
    .chat-msg.user {
      background: var(--ink); color: var(--cream);
      align-self: flex-end;
      border-radius: 4px 4px 0 4px;
    }
    .chat-msg.assistant {
      background: #fff; color: var(--ink);
      border: 1px solid var(--border);
      align-self: flex-start;
      border-radius: 4px 4px 4px 0;
    }
    /* Markdown inside chat */
    .chat-msg.assistant p { margin-bottom: 0.45rem; }
    .chat-msg.assistant p:last-child { margin-bottom: 0; }
    .chat-msg.assistant strong { font-weight: 600; }
    .chat-msg.assistant em { font-style: italic; }
    .chat-msg.assistant code {
      font-family: 'DM Mono', monospace;
      font-size: 0.82em;
      background: var(--surface);
      padding: 0.1em 0.35em;
      border-radius: 2px;
      color: var(--accent);
    }
    .chat-msg.assistant pre {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 3px;
      padding: 0.6rem 0.75rem;
      margin: 0.4rem 0;
      overflow-x: auto;
    }
    .chat-msg.assistant pre code { background: none; padding: 0; color: var(--ink); }
    .chat-msg.assistant ul, .chat-msg.assistant ol {
      padding-left: 1.2rem;
      margin: 0.3rem 0 0.45rem;
    }
    .chat-msg.assistant li { margin-bottom: 0.2rem; }
    .chat-msg.assistant h1, .chat-msg.assistant h2, .chat-msg.assistant h3 {
      font-family: 'Playfair Display', serif;
      margin: 0.5rem 0 0.25rem;
    }
    .chat-msg.assistant blockquote {
      border-left: 3px solid var(--gold);
      padding-left: 0.75rem;
      margin: 0.35rem 0;
      color: var(--warm-mid);
      font-style: italic;
    }
    .chat-msg.assistant hr { border: none; border-top: 1px solid var(--border); margin: 0.5rem 0; }

    .save-tidbit-btn {
      display: inline-block;
      margin-top: 0.55rem;
      font-size: 0.7rem;
      color: var(--warm-mid);
      background: none;
      border: 1px solid var(--border);
      border-radius: 3px;
      padding: 0.18rem 0.5rem;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      transition: all 0.15s;
    }
    .save-tidbit-btn:hover { color: var(--accent); border-color: var(--accent); }

    .typing-indicator {
      align-self: flex-start;
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 4px 4px 4px 0;
      padding: 0.5rem 0.85rem;
      font-size: 0.8rem;
      color: var(--warm-mid);
      font-style: italic;
      display: none;
    }
    .typing-indicator.visible { display: block; }

    .chat-input-row {
      display: flex; gap: 0.5rem;
      padding: 0.75rem;
      border-top: 1px solid var(--border);
      background: var(--cream);
    }
    #chat-input {
      flex: 1;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.83rem;
      padding: 0.45rem 0.75rem;
      border: 1.5px solid var(--border);
      border-radius: 3px;
      background: #fff;
      resize: none;
      height: 56px;
      line-height: 1.5;
    }
    #chat-input:focus { outline: none; border-color: var(--gold); }

    /* ── RIGHT COL: MEMORY ── */
    #right-col {
      display: flex; flex-direction: column;
      overflow: hidden;
      background: var(--surface);
    }
    .memory-header {
      background: var(--ink); color: var(--cream);
      padding: 0.65rem 1rem 0;
      flex-shrink: 0;
    }
    .memory-header-top {
      display: flex; align-items: center; justify-content: space-between;
      padding-bottom: 0.55rem;
    }
    .memory-header-title {
      font-size: 0.82rem; font-weight: 500; letter-spacing: 0.04em;
    }
    .memory-count {
      font-size: 0.72rem; color: rgba(245,240,232,0.5);
      font-family: 'DM Mono', monospace;
    }
    /* Sort toolbar */
    .memory-toolbar {
      display: flex; gap: 0.3rem; align-items: center;
      padding: 0.45rem 0 0.55rem;
      border-top: 1px solid rgba(255,255,255,0.08);
      flex-wrap: wrap;
    }
    .sort-label {
      font-size: 0.65rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.1em; color: rgba(245,240,232,0.45); margin-right: 0.15rem;
    }
    .sort-btn {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.7rem; font-weight: 500;
      padding: 0.2rem 0.5rem;
      border-radius: 3px;
      border: 1px solid rgba(255,255,255,0.15);
      background: transparent;
      color: rgba(245,240,232,0.6);
      cursor: pointer; transition: all 0.15s;
      white-space: nowrap;
    }
    .sort-btn:hover { background: rgba(255,255,255,0.08); color: var(--cream); }
    .sort-btn.active {
      background: var(--gold); color: #fff;
      border-color: var(--gold);
    }
    /* Known / unknown toggle on memory items */
    .mem-known-toggle {
      position: absolute; top: 0.45rem; right: 1.9rem;
      background: none; border: none; cursor: pointer;
      font-size: 1rem; line-height: 1;
      opacity: 0.3; transition: opacity 0.15s, transform 0.15s;
      title: "Mark as known";
    }
    .mem-known-toggle:hover { opacity: 0.7; transform: scale(1.15); }
    .memory-item.known .mem-known-toggle { opacity: 1; }
    .memory-item.known {
      border-left: 3px solid #2e7d32;
    }
    .memory-item.unknown {
      border-left: 3px solid transparent;
    }
    .mem-known-badge {
      display: none; font-size: 0.62rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.08em;
      color: #2e7d32; margin-left: 0.4rem;
      vertical-align: middle;
    }
    .memory-item.known .mem-known-badge { display: inline; }
    #memory-panel {
      flex: 1; overflow-y: auto;
      padding: 0.85rem;
      display: flex; flex-direction: column; gap: 0.5rem;
    }
    .memory-empty {
      color: var(--warm-mid); font-size: 0.82rem;
      font-style: italic; text-align: center;
      padding: 2.5rem 1rem; line-height: 1.7;
    }
    .memory-item {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 0.7rem 0.85rem;
      position: relative;
    }
    .mem-type {
      font-size: 0.62rem; text-transform: uppercase;
      letter-spacing: 0.1em; font-weight: 600; margin-bottom: 0.2rem;
    }
    .mem-type.word { color: var(--accent); }
    .mem-type.tidbit { color: var(--gold); }
    .mem-type.sentence { color: #2e7d32; }
    .mem-type.note { color: #7b1fa2; }
    .mem-main {
      font-family: 'Playfair Display', serif;
      font-size: 0.92rem; color: var(--ink); line-height: 1.45;
    }
    /* Markdown in memory tidbits */
    .mem-main p { margin-bottom: 0.3rem; }
    .mem-main p:last-child { margin-bottom: 0; }
    .mem-main strong { font-weight: 600; }
    .mem-main em { font-style: italic; }
    .mem-main code {
      font-family: 'DM Mono', monospace; font-size: 0.82em;
      background: var(--surface); padding: 0.1em 0.3em;
      border-radius: 2px; color: var(--accent);
    }
    .mem-main ul, .mem-main ol { padding-left: 1.1rem; margin: 0.2rem 0; }
    .mem-main li { margin-bottom: 0.15rem; font-size: 0.87rem; }
    .mem-sub { font-size: 0.76rem; color: var(--warm-mid); margin-top: 0.2rem; }
    .mem-note { font-size: 0.76rem; color: #555; margin-top: 0.3rem; font-style: italic; }
    .mem-actions {
      display: flex; gap: 0.3rem; margin-top: 0.5rem; flex-wrap: wrap;
    }
    /* Inline edit form */
    .mem-edit-form {
      display: none;
      flex-direction: column;
      gap: 0.4rem;
      margin-top: 0.5rem;
      padding-top: 0.5rem;
      border-top: 1px dashed var(--border);
    }
    .mem-edit-form.visible { display: flex; }
    .mem-edit-form label {
      font-size: 0.68rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.08em;
      color: var(--warm-mid); margin-bottom: 0.1rem;
    }
    .mem-edit-form textarea, .mem-edit-form input[type="text"] {
      width: 100%;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.83rem;
      padding: 0.38rem 0.6rem;
      border: 1.5px solid var(--gold);
      border-radius: 3px;
      background: #fffef5;
      line-height: 1.5;
    }
    .mem-edit-form textarea { resize: vertical; min-height: 60px; }
    .mem-edit-form textarea:focus, .mem-edit-form input:focus { outline: none; border-color: var(--accent); }
    .mem-edit-save-row { display: flex; gap: 0.4rem; justify-content: flex-end; margin-top: 0.2rem; }
    .mem-delete {
      position: absolute; top: 0.45rem; right: 0.5rem;
      background: none; border: none; cursor: pointer;
      color: var(--border); font-size: 1.1rem; line-height: 1;
      transition: color 0.15s;
    }
    .mem-delete:hover { color: var(--accent); }
    .memory-footer {
      display: flex; gap: 0.4rem;
      padding: 0.65rem 0.85rem;
      border-top: 1px solid var(--border);
      background: var(--cream);
      flex-wrap: wrap; flex-shrink: 0;
    }

    /* ── MODALS ── */
    .modal-overlay {
      display: none; position: fixed; inset: 0;
      background: rgba(26,20,8,0.6);
      z-index: 100; align-items: center; justify-content: center;
    }
    .modal-overlay.open { display: flex; }
    .modal {
      background: var(--cream);
      border: 2px solid var(--border);
      border-radius: 6px; padding: 1.75rem;
      width: 96%; max-width: 620px; max-height: 90vh; overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .modal h3 { font-family: 'Playfair Display', serif; font-size: 1.15rem; margin-bottom: 1rem; }
    .modal label {
      font-size: 0.78rem; font-weight: 500;
      color: var(--warm-mid); display: block;
      margin-bottom: 0.25rem; margin-top: 0.7rem;
    }
    .modal input, .modal textarea {
      width: 100%;
      font-family: 'DM Sans', sans-serif; font-size: 0.84rem;
      padding: 0.42rem 0.75rem;
      border: 1.5px solid var(--border);
      border-radius: 3px; background: #fff;
    }
    .modal input:focus, .modal textarea:focus { outline: none; border-color: var(--gold); }
    .modal textarea { resize: vertical; min-height: 60px; }
    .modal-actions { display: flex; gap: 0.5rem; margin-top: 1.1rem; justify-content: flex-end; }
    .modal input[readonly] {
      background: var(--surface); color: var(--ink);
      font-family: 'Playfair Display', serif; font-size: 1rem;
      font-weight: 600;
    }
    /* AI translation hint in word modal */
    .modal-ai-hint {
      font-size: 0.78rem; color: var(--warm-mid);
      margin-top: 0.3rem; font-style: italic;
      min-height: 1.1rem;
    }
    .modal-ai-hint.loading { color: var(--gold); }


    /* ── WORD MODAL RICH VIEW ── */
    #word-modal .modal { padding: 1.5rem; }
    .wm-loading {
      text-align: center; padding: 2rem 1rem;
      color: var(--warm-mid); font-style: italic; font-size: 0.88rem;
    }
    .wm-loading .spinner { border-top-color: var(--gold); }
    .wm-error { color: var(--accent); font-size: 0.84rem; padding: 1rem 0; }

    /* Word header */
    .wm-header { display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; }
    .wm-word {
      font-family: 'Playfair Display', serif;
      font-size: 1.7rem; font-weight: 700; color: var(--ink);
    }
    .wm-pronun {
      font-family: 'DM Mono', monospace;
      font-size: 0.85rem; color: var(--warm-mid);
    }
    .wm-badge {
      font-size: 0.68rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.08em; padding: 0.2rem 0.55rem;
      border-radius: 20px; white-space: nowrap;
    }
    .wm-badge.noun     { background: #e8f4fd; color: #1565c0; }
    .wm-badge.verb     { background: #fce4ec; color: #ad1457; }
    .wm-badge.adjective{ background: #e8f5e9; color: #2e7d32; }
    .wm-badge.adverb   { background: #fff3e0; color: #e65100; }
    .wm-badge.other    { background: var(--surface); color: var(--warm-mid); }

    /* Sections */
    .wm-section {
      border: 1px solid var(--border);
      border-radius: 4px;
      margin-bottom: 0.6rem;
      overflow: hidden;
    }
    .wm-section-title {
      font-size: 0.68rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.1em; color: var(--warm-mid);
      padding: 0.35rem 0.75rem;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
    }
    .wm-section-body { padding: 0.65rem 0.75rem; }

    /* Key-value rows */
    .wm-row {
      display: flex; gap: 0.5rem;
      font-size: 0.83rem; margin-bottom: 0.3rem; line-height: 1.5;
      align-items: baseline;
    }
    .wm-row:last-child { margin-bottom: 0; }
    .wm-key {
      font-weight: 600; color: var(--warm-mid);
      min-width: 130px; flex-shrink: 0; font-size: 0.78rem;
    }
    .wm-val { color: var(--ink); }
    .wm-val em { font-style: italic; color: var(--warm-mid); }
    .wm-val .highlight { color: var(--accent); font-weight: 600; }
    .wm-val .tag {
      display: inline-block;
      background: var(--accent-soft); color: var(--accent);
      font-size: 0.72rem; font-weight: 600;
      padding: 0.1rem 0.4rem; border-radius: 3px; margin-left: 0.3rem;
    }
    .wm-example {
      font-family: 'Playfair Display', serif;
      font-size: 0.88rem; font-style: italic;
      color: var(--warm-mid); margin-top: 0.2rem;
    }

    /* Save checkboxes */
    .wm-save-section { margin-top: 0.75rem; }
    .wm-save-title {
      font-size: 0.68rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.1em; color: var(--warm-mid); margin-bottom: 0.5rem;
    }
    .wm-checks {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 0.3rem 0.5rem;
    }
    .wm-check {
      display: flex; align-items: center; gap: 0.4rem;
      font-size: 0.8rem; cursor: pointer; padding: 0.25rem 0;
    }
    .wm-check input { cursor: pointer; accent-color: var(--accent); }
    .wm-check span { color: var(--ink); line-height: 1.3; }
    .wm-user-note {
      margin-top: 0.6rem;
    }
    .wm-user-note textarea {
      width: 100%;
      font-family: 'DM Sans', sans-serif; font-size: 0.82rem;
      padding: 0.4rem 0.65rem;
      border: 1.5px solid var(--border); border-radius: 3px;
      background: #fff; resize: vertical; min-height: 48px;
      line-height: 1.5;
    }
    .wm-user-note textarea:focus { outline: none; border-color: var(--gold); }
    .wm-user-note label {
      font-size: 0.72rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.08em; color: var(--warm-mid);
      display: block; margin-bottom: 0.25rem;
    }


    /* ── MERGE MODAL ── */
    #merge-modal .modal { max-width: 500px; }
    .merge-word-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem; font-weight: 700;
      color: var(--ink); margin-bottom: 0.25rem;
    }
    .merge-subtitle {
      font-size: 0.82rem; color: var(--warm-mid);
      margin-bottom: 1.1rem; line-height: 1.5;
    }
    .merge-columns {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 0.75rem; margin-bottom: 1rem;
    }
    .merge-col {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: 4px; padding: 0.75rem;
    }
    .merge-col.new-col { border-color: var(--gold); background: #fffef5; }
    .merge-col-label {
      font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.1em; margin-bottom: 0.4rem;
    }
    .merge-col-label.existing { color: var(--warm-mid); }
    .merge-col-label.new { color: var(--gold); }
    .merge-col-text {
      font-size: 0.8rem; color: var(--ink); line-height: 1.5;
      max-height: 120px; overflow-y: auto;
    }
    .merge-col-text p { margin-bottom: 0.2rem; }
    .merge-col-text p:last-child { margin-bottom: 0; }
    .merge-col-text strong { font-weight: 600; }
    .merge-col-text em { font-style: italic; color: var(--warm-mid); }
    .merge-preview {
      background: #e8f5e9;
      border: 1.5px solid #81c784;
      border-radius: 4px; padding: 0.75rem;
      margin-bottom: 0.5rem; display: none;
    }
    .merge-preview.visible { display: block; }
    .merge-preview-label {
      font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.1em; color: #2e7d32; margin-bottom: 0.35rem;
    }
    .merge-preview-text {
      font-size: 0.8rem; color: var(--ink); line-height: 1.5;
    }
    .merge-preview-text p { margin-bottom: 0.2rem; }
    .merge-preview-text p:last-child { margin-bottom: 0; }
    .merge-preview-text strong { font-weight: 600; }
    .merge-preview-text em { font-style: italic; color: var(--warm-mid); }
    .merge-actions-row {
      display: flex; gap: 0.5rem; flex-wrap: wrap;
      margin-top: 1rem; justify-content: flex-end;
    }

    /* ── SPINNER ── */
    .spinner {
      display: inline-block; width: 12px; height: 12px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
      vertical-align: middle; margin-right: 5px;
    }
    .spinner-dark {
      border: 2px solid rgba(0,0,0,0.12);
      border-top-color: var(--gold);
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── TOAST ── */
    #toast {
      position: fixed; bottom: 1.5rem; left: 50%;
      transform: translateX(-50%) translateY(16px);
      background: var(--ink); color: var(--cream);
      padding: 0.55rem 1.2rem; border-radius: 4px;
      font-size: 0.82rem; opacity: 0; transition: all 0.25s;
      pointer-events: none; z-index: 200; white-space: nowrap;
    }
    #toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }

    @media (max-width: 800px) {
      #app-layout.visible { grid-template-columns: 1fr; overflow: visible; }
      #app-layout { height: auto; }
      #right-col { min-height: 350px; }
    }
  </style>
</head>
<body>

<!-- HEADER -->
<header>
  <a href="https://claudielarouche.com/" class="header-logo">Claudie Larouche</a>
  <nav class="header-nav">
    <a href="https://claudielarouche.com/about/" target="_blank" rel="noopener">About</a>
    <a href="https://claudielarouche.com/personal-projects/" target="_blank" rel="noopener">Personal Projects</a>
    <a href="https://claudielarouche.com/work-projects/" target="_blank" rel="noopener">Work Projects</a>
    <a href="https://claudielarouche.com/media/" target="_blank" rel="noopener">Media</a>
    <a href="https://claudielarouche.com/contact/" target="_blank" rel="noopener">Contact</a>
  </nav>
</header>
<div id="app-toolbar">
  <span class="app-toolbar-title">🇫🇷 Français <strong>Vivant</strong></span>
  <div class="header-actions">
    <button class="btn btn-outline" id="restart-btn" style="display:none">↩ New Text</button>
    <button class="btn btn-outline" id="memory-export-btn">Export Memory</button>
    <label class="btn btn-outline" style="cursor:pointer">
      Import Memory
      <input type="file" id="memory-import-file" accept=".json" style="display:none">
    </label>
  </div>
</div>

<!-- API KEY BANNER -->
<div id="api-banner">
  <label for="api-key-input">🔑 Anthropic API Key:</label>
  <input type="password" id="api-key-input" placeholder="sk-ant-api03-…" autocomplete="off">
  <button class="btn btn-gold" id="api-key-save-btn">Save</button>
  <span class="api-status" id="api-status">Not set — required for translations &amp; chat</span>
  <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener">How to get an API key ↗</a>
</div>

<!-- ══ ONBOARDING ══ -->
<div id="onboarding">
  <div class="onboarding-inner">

    <div class="onboarding-hero">
      <h2>Learn French through real texts</h2>
      <p>Read any French text sentence by sentence, get instant translations, ask questions about grammar and vocabulary, and build your personal memory bank of words and insights.</p>
    </div>

    <div class="how-it-works">
      <h3>How it works</h3>
      <div class="steps">
        <div class="step">
          <div class="step-icon">📄</div>
          <div class="step-title">1. Load a text</div>
          <div class="step-desc">Upload any French .txt file, or use the built-in <em>Hansel et Gretel</em> story to get started right away.</div>
        </div>
        <div class="step">
          <div class="step-icon">🔍</div>
          <div class="step-title">2. Read sentence by sentence</div>
          <div class="step-desc">Navigate with the Prev / Next buttons or your keyboard's arrow keys. Hit <strong>Translate Sentence</strong> to see both a natural and a word-for-word translation.</div>
        </div>
        <div class="step">
          <div class="step-icon">💬</div>
          <div class="step-title">3. Ask the AI tutor</div>
          <div class="step-desc">The chatbot below each sentence knows exactly which sentence you're on. Ask about grammar, verb tenses, vocabulary nuance — anything.</div>
        </div>
        <div class="step">
          <div class="step-icon">🧠</div>
          <div class="step-title">4. Build your memory</div>
          <div class="step-desc">Click any word to save it with a translation. Save whole sentences, AI explanations, or your own custom notes. Export to keep your memory across devices.</div>
        </div>
      </div>
    </div>

    <div class="tips-box">
      <h3>✦ Tips</h3>
      <ul>
        <li>You need a free <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener" style="color:var(--gold)">Anthropic API key</a> for translations and chat. Paste it in the banner above — it's stored only in your browser.</li>
        <li>Click on any <strong>word</strong> in a sentence — Claude will suggest a translation based on context, and flag words that have other meanings in different forms.</li>
        <li>When the AI answers a question, you can save its response to Memory and <strong>edit it</strong> to keep only what's useful to you.</li>
        <li>Use <strong>Export Memory</strong> to save your memory bank as a JSON file. You can import it back later, even on a different device. Spaced repetition is coming soon!</li>
        <li>Press ← → on your keyboard to navigate between sentences.</li>
      </ul>
    </div>

    <div class="upload-area">
      <h3>Get started</h3>
      <div class="drop-area" id="drop-area">
        <div class="icon">📄</div>
        <p><strong>Drop a .txt file here</strong><br>or click to browse</p>
        <input type="file" id="file-input" accept=".txt" style="display:none">
      </div>
      <div class="or-divider">— or —</div>
      <button class="btn btn-ink" id="use-sample-btn">Use built-in story: <em>Hansel et Gretel</em></button>
    </div>

  </div>
</div>

<!-- ══ APP LAYOUT ══ -->
<div id="app-layout">

  <!-- LEFT: reader + chat -->
  <div id="left-col">

    <div class="source-bar">
      <h3 id="source-title"></h3>
      <span class="progress-info" id="progress-info">1 / 1</span>
    </div>

    <div class="progress-bar-wrap">
      <div class="progress-bar-fill" id="progress-bar" style="width:0%"></div>
    </div>

    <div class="sentence-card">
      <div class="sentence-text" id="sentence-display"></div>
    </div>

    <div class="translation-box" id="translation-box">
      <div class="translation-label">✦ Natural translation</div>
      <div class="translation-correct" id="trans-correct"></div>
      <div class="translation-label" style="margin-top:0.75rem">✦ Word-for-word</div>
      <div class="translation-literal" id="trans-literal"></div>
    </div>

    <div class="sentence-actions">
      <button class="btn btn-primary" id="translate-btn">Translate Sentence</button>
      <button class="btn btn-ghost" id="save-sentence-btn">+ Save Sentence</button>
    </div>

    <div class="nav-row">
      <div class="nav-btns">
        <button class="btn btn-ghost" id="prev-btn">← Prev</button>
        <button class="btn btn-ink" id="next-btn">Next →</button>
      </div>
      <span class="keyboard-hint">← → arrow keys</span>
    </div>

    <!-- AI CHATBOT -->
    <div class="chat-section">
      <div class="chat-header">
        💬 Ask Claude about this sentence
        <span class="chat-subtitle" id="chat-subtitle"></span>
      </div>
      <div id="chat-messages">
        <div class="chat-empty-msg" id="chat-empty">Ask anything — grammar, conjugation, vocabulary, context, nuance…</div>
      </div>
      <div class="typing-indicator" id="typing-indicator">Claude is thinking…</div>
      <div class="chat-input-row">
        <textarea id="chat-input" placeholder="e.g. Why is this verb in the imperfect tense?"></textarea>
        <button class="btn btn-primary" id="chat-send-btn">Send</button>
      </div>
    </div>

  </div>

  <!-- RIGHT: memory -->
  <div id="right-col">
    <div class="memory-header">
      <div class="memory-header-top">
        <span class="memory-header-title">🧠 Memory Bank</span>
        <span class="memory-count" id="memory-count"></span>
      </div>
      <div class="memory-toolbar">
        <span class="sort-label">Sort</span>
        <button class="sort-btn active" data-sort="date-desc">Newest</button>
        <button class="sort-btn" data-sort="date-asc">Oldest</button>
        <button class="sort-btn" data-sort="alpha-asc">A→Z</button>
        <button class="sort-btn" data-sort="alpha-desc">Z→A</button>
        <button class="sort-btn" data-sort="known">✓ Known first</button>
        <button class="sort-btn" data-sort="unknown">? Unknown first</button>
      </div>
    </div>
    <div id="memory-panel">
      <div class="memory-empty" id="memory-empty">Your memory bank is empty.<br><br>Click any <strong>word</strong> in a sentence to save it, hit <strong>+ Save Sentence</strong>, or click <strong>+ Save to Memory</strong> below any chat reply.</div>
    </div>
    <div class="memory-footer">
      <button class="btn btn-ghost" id="add-note-btn" style="font-size:0.76rem">+ Custom Note</button>
      <button class="btn btn-ghost" id="clear-memory-btn" style="font-size:0.76rem;margin-left:auto;color:#c0392b;border-color:#e8d5d3">Clear All</button>
    </div>
  </div>

</div>

<!-- WORD SAVE MODAL -->
<div class="modal-overlay" id="word-modal">
  <div class="modal">
    <!-- Loading state -->
    <div id="wm-loading" class="wm-loading">
      <span class="spinner spinner-dark"></span> Analysing word…
    </div>
    <!-- Error state -->
    <div id="wm-error" class="wm-error" style="display:none"></div>
    <!-- Content (populated by JS) -->
    <div id="wm-content" style="display:none">
      <div class="wm-header">
        <span class="wm-word" id="wm-word-display"></span>
        <span class="wm-pronun" id="wm-pronun"></span>
        <span class="wm-badge" id="wm-type-badge"></span>
      </div>

      <!-- Core meaning -->
      <div class="wm-section">
        <div class="wm-section-title">Meaning</div>
        <div class="wm-section-body">
          <div class="wm-row"><span class="wm-key">In this sentence</span><span class="wm-val" id="wm-meaning-ctx"></span></div>
          <div class="wm-row" id="wm-other-row"><span class="wm-key">Other meanings</span><span class="wm-val" id="wm-meaning-other"></span></div>
          <div class="wm-row" id="wm-false-friend-row"><span class="wm-key">⚠️ False friend</span><span class="wm-val highlight" id="wm-false-friend"></span></div>
          <div class="wm-row" id="wm-example-row">
            <span class="wm-key">Example</span>
            <span class="wm-val">
              <span class="wm-example" id="wm-example"></span>
            </span>
          </div>
        </div>
      </div>

      <!-- Grammar (shown/hidden based on type) -->
      <div class="wm-section" id="wm-grammar-section">
        <div class="wm-section-title" id="wm-grammar-title">Grammar</div>
        <div class="wm-section-body" id="wm-grammar-body"></div>
      </div>

      <!-- Usage note -->
      <div class="wm-section" id="wm-usage-section" style="display:none">
        <div class="wm-section-title">Usage note</div>
        <div class="wm-section-body wm-val" id="wm-usage"></div>
      </div>

      <!-- What to save -->
      <div class="wm-save-section">
        <div class="wm-save-title">✦ Choose what to save</div>
        <div class="wm-checks" id="wm-checks"></div>
        <div class="wm-user-note">
          <label>Your personal note (optional)</label>
          <textarea id="wm-user-note" placeholder="Anything extra you want to remember…"></textarea>
        </div>
      </div>
    </div>

    <div class="modal-actions">
      <button class="btn btn-ghost" id="word-modal-cancel">Cancel</button>
      <button class="btn btn-primary" id="word-modal-save" style="display:none">Save to Memory</button>
    </div>
  </div>
</div>

<!-- CUSTOM NOTE MODAL -->
<div class="modal-overlay" id="note-modal">
  <div class="modal">
    <h3>Add Custom Note</h3>
    <label>Note</label>
    <textarea id="note-text" placeholder="Write anything you want to remember…" style="min-height:90px"></textarea>
    <label>Tag (optional)</label>
    <input type="text" id="note-tag" placeholder="e.g. grammar, vocabulary, phrase">
    <div class="modal-actions">
      <button class="btn btn-ghost" id="note-modal-cancel">Cancel</button>
      <button class="btn btn-primary" id="note-modal-save">Save Note</button>
    </div>
  </div>
</div>

<!-- MERGE MODAL -->
<div class="modal-overlay" id="merge-modal">
  <div class="modal" id="merge-modal-inner">
    <div class="merge-word-title" id="merge-word-title"></div>
    <div class="merge-subtitle">This word is already in your memory bank. How would you like to handle it?</div>
    <div class="merge-columns">
      <div class="merge-col">
        <div class="merge-col-label existing">Existing entry</div>
        <div class="merge-col-text" id="merge-existing-text"></div>
      </div>
      <div class="merge-col new-col">
        <div class="merge-col-label new">New entry</div>
        <div class="merge-col-text" id="merge-new-text"></div>
      </div>
    </div>
    <div class="merge-preview" id="merge-preview">
      <div class="merge-preview-label">✦ Merged result preview</div>
      <div class="merge-preview-text" id="merge-preview-text"></div>
    </div>
    <div class="merge-actions-row">
      <button class="btn btn-ghost" id="merge-cancel-btn">Cancel</button>
      <button class="btn btn-ghost" id="merge-save-new-btn">Save as separate entry</button>
      <button class="btn btn-ghost" id="merge-replace-btn">Replace existing</button>
      <button class="btn btn-primary" id="merge-merge-btn">✦ Merge both</button>
    </div>
  </div>
</div>

<div id="toast"></div>

<script>
// ══════════════════════════════════════════════
// SAMPLE TEXT
// ══════════════════════════════════════════════
const SAMPLE_TEXT = `Hansel et Gretel
Il était une fois, à la lisière d'une grande forêt, un bûcheron qui vivait avec sa femme et ses deux enfants.
Le garçon s'appelait Hansel et la fille Gretel.
Ils étaient très pauvres, et il y avait peu à manger dans la maison.
Un soir, le père dit à sa femme : « Que ferons-nous de nos enfants ? »
La belle-mère répondit : « Demain matin, nous les emmènerons dans la forêt. »
Le lendemain matin, la femme réveilla les deux enfants.
Elle leur donna à chacun un morceau de pain pour le déjeuner.
Pendant qu'ils marchaient dans la forêt, Hansel s'arrêtait souvent et se retournait.
Son père lui dit : « Hansel, pourquoi t'arrêtes-tu ? »
Hansel répondit : « Je regarde mon petit pigeon blanc sur le toit. »
Mais ce n'était pas un pigeon — c'était le soleil qui brillait sur les petits cailloux blancs qu'il avait semés derrière lui.
Lorsqu'ils furent au milieu de la forêt, leur père dit : « Ramassez du bois, les enfants. »
Il alluma un feu, et quand les flammes étaient hautes, la femme dit : « Couchez-vous près du feu et reposez-vous. »
Les enfants s'endormirent, et quand ils se réveillèrent, ils étaient seuls.
Gretel se mit à pleurer, mais Hansel la réconforta.
Il dit : « Attends que la lune se lève — je retrouverai notre chemin. »
Les cailloux blancs brillaient comme des pièces d'argent, et ils guidèrent les enfants jusqu'à leur maison.
Mais la belle-mère était furieuse de leur retour.
Quelques jours plus tard, elle convainquit le père d'emmener les enfants encore plus loin dans la forêt.
Cette fois, Hansel n'avait que du pain pour marquer sa route.
Les oiseaux de la forêt mangèrent toutes les miettes de pain.
Sans chemin pour rentrer, les enfants errèrent pendant trois jours.
Ils aperçurent enfin une maison faite de pain d'épice, de gâteau et de sucre.
Ils commencèrent à la manger, quand une vieille femme apparut à la porte.
Elle dit d'une voix douce : « Entrez, mes chers enfants. »
Mais c'était une sorcière qui attrapait les enfants pour les manger.
Elle enferma Hansel dans une cage et força Gretel à travailler.
Chaque jour, elle demandait à Hansel de tendre son doigt pour voir s'il était assez gras.
Mais Hansel lui tendait un petit os, et la sorcière, qui voyait mal, croyait qu'il était encore maigre.
Un matin, la sorcière décida de faire cuire Hansel quand même.
Elle dit à Gretel de regarder dans le four pour voir s'il était chaud.
Gretel comprit le piège et dit : « Je ne sais pas comment regarder dedans. »
La sorcière s'approcha du four pour montrer — et Gretel la poussa dedans.
Elle courut libérer Hansel, et ils trouvèrent dans la maison des coffres remplis de perles et de pierres précieuses.
Ils remplirent leurs poches et retournèrent dans la forêt.
Une belle cane blanche les aida à traverser un grand lac.
Quand ils arrivèrent enfin chez leur père, il pleura de joie, car leur belle-mère était morte.
Ils vécurent tous ensemble, heureux et sans souci, pour le reste de leurs jours.`;

// ══════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════
let sentences = [];
let currentIndex = 0;
let memory = [];
let chatHistories = [];
let apiKey = '';
let currentSort = 'date-desc';

// ══════════════════════════════════════════════
// MARKED CONFIG
// ══════════════════════════════════════════════
marked.setOptions({ breaks: true, gfm: true });

function renderMarkdown(text) {
  return marked.parse(text || '');
}

// ══════════════════════════════════════════════
// MEMORY — localStorage
// ══════════════════════════════════════════════
function loadMemory() {
  try { const r = localStorage.getItem('fv_memory'); if (r) memory = JSON.parse(r); } catch(e) { memory = []; }
}
function saveMemory() {
  localStorage.setItem('fv_memory', JSON.stringify(memory));
  renderMemory();
}
function addMemoryItem(item) {
  item.id = Date.now() + '-' + Math.random().toString(36).slice(2);
  item.createdAt = new Date().toISOString();
  item.modifiedAt = item.createdAt;
  item.known = false;
  // SM-2 fields for future spaced repetition
  item.lastReviewed = null;
  item.nextReview = null;
  item.interval = 1;
  item.easeFactor = 2.5;
  item.repetitions = 0;
  memory.unshift(item);
  saveMemory();
  showToast('Saved to memory ✓');
}
function updateMemoryItem(id, fields) {
  const item = memory.find(m => m.id === id);
  if (item) {
    Object.assign(item, fields);
    item.modifiedAt = new Date().toISOString();
    localStorage.setItem('fv_memory', JSON.stringify(memory));
  }
}

function toggleKnown(id) {
  const item = memory.find(m => m.id === id);
  if (!item) return;
  item.known = !item.known;
  item.modifiedAt = new Date().toISOString();
  localStorage.setItem('fv_memory', JSON.stringify(memory));
  renderMemory();
}

function getSortedMemory() {
  const arr = [...memory];
  // Ensure legacy items have required fields
  arr.forEach(m => {
    if (!m.modifiedAt) m.modifiedAt = m.createdAt || new Date().toISOString();
    if (typeof m.known === 'undefined') m.known = false;
  });
  switch (currentSort) {
    case 'date-desc':  return arr.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'date-asc':   return arr.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
    case 'alpha-asc':  return arr.sort((a,b) => (a.main||'').localeCompare(b.main||'', 'fr', {sensitivity:'base'}));
    case 'alpha-desc': return arr.sort((a,b) => (b.main||'').localeCompare(a.main||'', 'fr', {sensitivity:'base'}));
    case 'known':      return arr.sort((a,b) => (b.known ? 1 : 0) - (a.known ? 1 : 0));
    case 'unknown':    return arr.sort((a,b) => (a.known ? 1 : 0) - (b.known ? 1 : 0));
    default:           return arr;
  }
}
function deleteMemoryItem(id) {
  memory = memory.filter(m => m.id !== id);
  saveMemory();
}

// ══════════════════════════════════════════════
// API KEY — localStorage
// ══════════════════════════════════════════════
function loadApiKey() {
  const stored = localStorage.getItem('fv_api_key');
  if (stored) { apiKey = stored; document.getElementById('api-key-input').value = stored; updateApiStatus(); }
}
function updateApiStatus() {
  const el = document.getElementById('api-status');
  if (apiKey) { el.textContent = '✓ Key saved'; el.className = 'api-status ok'; }
  else { el.textContent = 'Not set — required for translations & chat'; el.className = 'api-status'; }
}
document.getElementById('api-key-save-btn').addEventListener('click', () => {
  const val = document.getElementById('api-key-input').value.trim();
  if (!val) { showToast('Please paste your API key'); return; }
  apiKey = val;
  localStorage.setItem('fv_api_key', apiKey);
  updateApiStatus();
  showToast('API key saved!');
});

// ══════════════════════════════════════════════
// TEXT PARSING
// ══════════════════════════════════════════════
function parseText(text) {
  const lines = text.split('\n');
  const result = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const isHeader = !/[.!?»"'】]$/.test(trimmed) || trimmed.length < 50;
    if (isHeader) {
      result.push(trimmed);
    } else {
      const parts = trimmed.match(/[^.!?]+[.!?»]+["'»]?/g);
      if (parts) parts.forEach(p => { const s = p.trim(); if (s) result.push(s); });
      else result.push(trimmed);
    }
  }
  return result.filter(s => s.length > 0);
}

// ══════════════════════════════════════════════
// START READING
// ══════════════════════════════════════════════
function startReading(text, title) {
  sentences = parseText(text);
  currentIndex = 0;
  chatHistories = sentences.map(() => []);
  document.getElementById('source-title').textContent = title;
  document.getElementById('onboarding').style.display = 'none';
  document.getElementById('app-layout').classList.add('visible');
  document.getElementById('restart-btn').style.display = 'inline-block';
  renderSentence();
}

document.getElementById('use-sample-btn').addEventListener('click', () => startReading(SAMPLE_TEXT, 'Hansel et Gretel'));

const dropArea = document.getElementById('drop-area');
dropArea.addEventListener('click', () => document.getElementById('file-input').click());
dropArea.addEventListener('dragover', e => { e.preventDefault(); dropArea.classList.add('dragover'); });
dropArea.addEventListener('dragleave', () => dropArea.classList.remove('dragover'));
dropArea.addEventListener('drop', e => {
  e.preventDefault(); dropArea.classList.remove('dragover');
  if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
});
document.getElementById('file-input').addEventListener('change', e => { if (e.target.files[0]) handleFile(e.target.files[0]); });
function handleFile(file) {
  const reader = new FileReader();
  reader.onload = e => startReading(e.target.result, file.name.replace(/\.txt$/i,''));
  reader.readAsText(file, 'UTF-8');
}

document.getElementById('restart-btn').addEventListener('click', () => {
  document.getElementById('onboarding').style.display = 'flex';
  document.getElementById('app-layout').classList.remove('visible');
  document.getElementById('restart-btn').style.display = 'none';
});

// ══════════════════════════════════════════════
// STRIP ELISIONS — l', d', j', m', t', s', n', c', qu'
// ══════════════════════════════════════════════
function stripElision(word) {
  // Remove leading elided articles/prepositions: l', d', j', m', t', s', n', c', qu'
  return word.replace(/^(l'|d'|j'|m'|t'|s'|n'|c'|qu')/i, '');
}

// ══════════════════════════════════════════════
// RENDER SENTENCE
// ══════════════════════════════════════════════
function renderSentence() {
  const sentence = sentences[currentIndex];
  const display = document.getElementById('sentence-display');

  const tokens = sentence.split(/(\s+)/);
  display.innerHTML = tokens.map(w => {
    if (/^\s+$/.test(w)) return w;
    // The raw token for display, clean version for the data attribute
    const clean = w.replace(/[«»""„,.:;!?()\[\]—–]/g, '');
    if (!clean || clean.length < 2) return `<span>${w}</span>`;
    return `<button class="word-btn" data-word="${clean}">${w}</button>`;
  }).join('');

  display.querySelectorAll('.word-btn').forEach(btn => {
    btn.addEventListener('click', () => openWordModal(btn.dataset.word));
  });

  document.getElementById('progress-info').textContent = `${currentIndex + 1} / ${sentences.length}`;
  document.getElementById('progress-bar').style.width = `${((currentIndex + 1) / sentences.length) * 100}%`;
  document.getElementById('prev-btn').disabled = currentIndex === 0;
  document.getElementById('next-btn').disabled = currentIndex === sentences.length - 1;

  document.getElementById('translation-box').classList.remove('visible');
  const tb = document.getElementById('translate-btn');
  tb.disabled = false; tb.innerHTML = 'Translate Sentence';

  const short = sentence.length > 55 ? sentence.substring(0, 52) + '…' : sentence;
  document.getElementById('chat-subtitle').textContent = `"${short}"`;

  renderChat();
}

// ══════════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════════
document.getElementById('prev-btn').addEventListener('click', () => navigate(-1));
document.getElementById('next-btn').addEventListener('click', () => navigate(1));
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});
function navigate(dir) {
  const n = currentIndex + dir;
  if (n >= 0 && n < sentences.length) { currentIndex = n; renderSentence(); }
}

// ══════════════════════════════════════════════
// TRANSLATION
// ══════════════════════════════════════════════
document.getElementById('translate-btn').addEventListener('click', async () => {
  if (!apiKey) { showToast('Please enter your Anthropic API key first'); return; }
  const btn = document.getElementById('translate-btn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>Translating…';
  const sentence = sentences[currentIndex];
  const prompt = `Translate this French sentence into English. Return ONLY a JSON object with exactly two keys:
- "correct": a natural, grammatically correct English translation
- "literal": a word-for-word translation showing each French word's direct English equivalent

French: "${sentence}"

Respond with only the raw JSON, no markdown fences, no explanation.`;

  try {
    const text = await callClaude([{ role: 'user', content: prompt }], 'You are a French-English translator. Return only valid JSON, no markdown.');
    const cleaned = text.replace(/```json\s*|\s*```/g, '').trim();
    const data = JSON.parse(cleaned);
    document.getElementById('trans-correct').textContent = data.correct;
    document.getElementById('trans-literal').textContent = data.literal;
    document.getElementById('translation-box').classList.add('visible');
    btn.innerHTML = '↺ Retranslate'; btn.disabled = false;
  } catch(err) {
    console.error('Translation error:', err);
    showToast('Translation failed — check your API key');
    btn.innerHTML = 'Translate Sentence'; btn.disabled = false;
  }
});

document.getElementById('save-sentence-btn').addEventListener('click', () => {
  const sentence = sentences[currentIndex];
  const trans = document.getElementById('trans-correct').textContent;
  addMemoryItem({ type: 'sentence', main: sentence, sub: trans || '(translate first to see meaning)', note: '', sourceIndex: currentIndex });
});

// ══════════════════════════════════════════════
// WORD MODAL — rich AI word analysis
// ══════════════════════════════════════════════
let currentWordData = null; // holds the parsed AI response

async function openWordModal(rawWord) {
  const word = stripElision(rawWord);
  if (!word || word.length < 2) return;

  // Reset modal to loading state
  currentWordData = null;
  document.getElementById('wm-loading').style.display = 'block';
  document.getElementById('wm-error').style.display   = 'none';
  document.getElementById('wm-content').style.display = 'none';
  document.getElementById('word-modal-save').style.display = 'none';
  document.getElementById('wm-user-note').value = '';
  document.getElementById('word-modal').classList.add('open');

  if (!apiKey) {
    document.getElementById('wm-loading').style.display = 'none';
    document.getElementById('wm-error').style.display   = 'block';
    document.getElementById('wm-error').textContent     = 'Add your API key to get word analysis.';
    return;
  }

  const sentence = sentences[currentIndex];

  const prompt = `Analyse the French word "${word}" as it appears in this sentence: "${sentence}"

Return ONLY a JSON object with these fields (use null for any that don't apply):

{
  "word": "${word}",
  "pronunciation": "rough phonetic guide, e.g. /shɛʁ.she/",
  "type": "noun | verb | adjective | adverb | preposition | conjunction | pronoun | article | other",
  "meaning_in_context": "translation/meaning in this specific sentence",
  "other_meanings": "other common meanings or uses (null if none)",
  "false_friend": "English word it resembles but means something different (null if none)",
  "example_sentence": "a simple French example sentence showing another common use (null if same type as context)",

  "noun": {
    "gender": "masculine | feminine | both",
    "singular": "singular form",
    "plural": "plural form",
    "article_def": "le | la | les",
    "article_indef": "un | une | des"
  },

  "verb": {
    "infinitive": "infinitive form",
    "tense": "present | imperfect | passé composé | future | conditional | subjunctive | etc.",
    "mood": "indicative | subjunctive | conditional | imperative | infinitive | participle",
    "person": "1st | 2nd | 3rd",
    "number": "singular | plural",
    "auxiliary": "avoir | être",
    "irregular": true or false,
    "irregularity_note": "brief note if irregular, else null"
  },

  "adjective": {
    "base_form": "masculine singular form",
    "feminine": "feminine form",
    "plural": "plural form",
    "fem_plural": "feminine plural form",
    "position": "before noun | after noun | either",
    "position_note": "if position changes meaning, explain briefly, else null"
  },

  "usage_note": "any confusion with similar words (e.g. savoir vs connaître), register note, etc. (null if nothing worth noting)"
}

Only include the keys that are relevant (e.g. only fill "verb" if type is verb). Return raw JSON only, no markdown.`;

  try {
    const text = await callClaude(
      [{ role: 'user', content: prompt }],
      'You are a precise French linguistics assistant. Return only valid JSON, no markdown fences, no explanation.'
    );
    const cleaned = text.replace(/```json\s*|\s*```/g, '').trim();
    currentWordData = JSON.parse(cleaned);
    renderWordModal(currentWordData);
  } catch(e) {
    console.error('Word analysis error:', e);
    document.getElementById('wm-loading').style.display = 'none';
    document.getElementById('wm-error').style.display   = 'block';
    document.getElementById('wm-error').textContent     = 'Could not analyse word. Check your API key or try again.';
  }
}

function renderWordModal(d) {
  document.getElementById('wm-loading').style.display = 'none';
  document.getElementById('wm-content').style.display = 'block';
  document.getElementById('word-modal-save').style.display = 'inline-block';

  // Header
  document.getElementById('wm-word-display').textContent = d.word || '';
  document.getElementById('wm-pronun').textContent = d.pronunciation ? d.pronunciation : '';

  const badge = document.getElementById('wm-type-badge');
  const type = (d.type || 'other').toLowerCase();
  const typeMap = { noun:'noun', verb:'verb', adjective:'adjective', adverb:'adverb' };
  badge.textContent = d.type || '';
  badge.className = 'wm-badge ' + (typeMap[type] || 'other');

  // Meaning
  document.getElementById('wm-meaning-ctx').textContent = d.meaning_in_context || '';

  const otherRow = document.getElementById('wm-other-row');
  if (d.other_meanings) {
    document.getElementById('wm-meaning-other').textContent = d.other_meanings;
    otherRow.style.display = '';
  } else { otherRow.style.display = 'none'; }

  const ffRow = document.getElementById('wm-false-friend-row');
  if (d.false_friend) {
    document.getElementById('wm-false-friend').textContent = d.false_friend;
    ffRow.style.display = '';
  } else { ffRow.style.display = 'none'; }

  const exRow = document.getElementById('wm-example-row');
  if (d.example_sentence) {
    document.getElementById('wm-example').textContent = d.example_sentence;
    exRow.style.display = '';
  } else { exRow.style.display = 'none'; }

  // Grammar section
  const grammarSection = document.getElementById('wm-grammar-section');
  const grammarTitle   = document.getElementById('wm-grammar-title');
  const grammarBody    = document.getElementById('wm-grammar-body');
  grammarBody.innerHTML = '';

  function row(key, val) {
    if (!val && val !== false) return '';
    const v = val === true ? 'Yes' : val === false ? 'No' : val;
    return `<div class="wm-row"><span class="wm-key">${key}</span><span class="wm-val">${v}</span></div>`;
  }

  if (type === 'verb' && d.verb) {
    grammarTitle.textContent = 'Verb forms & grammar';
    const v = d.verb;
    grammarBody.innerHTML = [
      row('Infinitive',   v.infinitive),
      row('Tense',        v.tense),
      row('Mood',         v.mood),
      row('Person',       v.person && v.number ? v.person + ' person ' + v.number : (v.person || v.number)),
      row('Auxiliary',    v.auxiliary ? (v.auxiliary + ' (for passé composé)') : null),
      row('Irregular',    v.irregular),
      row('Irregularity', v.irregularity_note),
    ].join('');
    grammarSection.style.display = '';
  } else if (type === 'noun' && d.noun) {
    grammarTitle.textContent = 'Noun forms';
    const n = d.noun;
    grammarBody.innerHTML = [
      row('Gender',       n.gender),
      row('Singular',     n.singular),
      row('Plural',       n.plural),
      row('Definite art.',   n.article_def),
      row('Indefinite art.', n.article_indef),
    ].join('');
    grammarSection.style.display = '';
  } else if (type === 'adjective' && d.adjective) {
    grammarTitle.textContent = 'Adjective forms';
    const a = d.adjective;
    grammarBody.innerHTML = [
      row('Masc. singular', a.base_form),
      row('Feminine',       a.feminine),
      row('Masc. plural',   a.plural),
      row('Fem. plural',    a.fem_plural),
      row('Position',       a.position),
      row('Position note',  a.position_note),
    ].join('');
    grammarSection.style.display = '';
  } else {
    grammarSection.style.display = 'none';
  }

  // Usage note
  const usageSection = document.getElementById('wm-usage-section');
  if (d.usage_note) {
    document.getElementById('wm-usage').textContent = d.usage_note;
    usageSection.style.display = '';
  } else { usageSection.style.display = 'none'; }

  // Build save checkboxes
  const checks = document.getElementById('wm-checks');
  checks.innerHTML = '';

  const saveOptions = [
    { id: 'sv-word',      label: `Word: <strong>${d.word}</strong>`, checked: true },
    { id: 'sv-meaning',   label: `Meaning: <em>${d.meaning_in_context}</em>`, checked: true },
    { id: 'sv-pronun',    label: `Pronunciation`, checked: !!d.pronunciation, show: !!d.pronunciation },
    { id: 'sv-type',      label: `Type: ${d.type}`, checked: true },
    { id: 'sv-other',     label: `Other meanings`, checked: false, show: !!d.other_meanings },
    { id: 'sv-falsefriend',label:`False friend note`, checked: true, show: !!d.false_friend },
    { id: 'sv-grammar',   label: `Grammar details`, checked: true, show: !!(d.verb || d.noun || d.adjective) },
    { id: 'sv-usage',     label: `Usage note`, checked: true, show: !!d.usage_note },
    { id: 'sv-example',   label: `Example sentence`, checked: false, show: !!d.example_sentence },
  ];

  saveOptions.forEach(opt => {
    if (opt.show === false) return;
    const label = document.createElement('label');
    label.className = 'wm-check';
    label.innerHTML = `<input type="checkbox" id="${opt.id}" ${opt.checked ? 'checked' : ''}><span>${opt.label}</span>`;
    checks.appendChild(label);
  });
}

document.getElementById('word-modal-cancel').addEventListener('click', () => {
  document.getElementById('word-modal').classList.remove('open');
});

// Build the word mainText from current modal checkboxes
function buildWordMainText(d) {
  const checked = id => { const el = document.getElementById(id); return el ? el.checked : false; };
  const parts = [];
  if (checked('sv-word'))      parts.push(`**${d.word}**`);
  if (checked('sv-pronun') && d.pronunciation) parts.push(`*${d.pronunciation}*`);
  if (checked('sv-type'))      parts.push(`*(${d.type})*`);
  if (checked('sv-meaning'))   parts.push(`NEWLINE_MARKER**Meaning:** ${d.meaning_in_context}`);
  if (checked('sv-other') && d.other_meanings) parts.push(`NEWLINE_MARKER**Other meanings:** ${d.other_meanings}`);
  if (checked('sv-falsefriend') && d.false_friend) parts.push(`NEWLINE_MARKER⚠️ **False friend:** ${d.false_friend}`);
  if (checked('sv-example') && d.example_sentence) parts.push(`NEWLINE_MARKER**Example:** *${d.example_sentence}*`);
  if (checked('sv-grammar')) {
    const type = (d.type || '').toLowerCase();
    if (type === 'verb' && d.verb) {
      const v = d.verb;
      const gl = [];
      if (v.infinitive)         gl.push(`Infinitive: **${v.infinitive}**`);
      if (v.tense)              gl.push(`Tense: ${v.tense}`);
      if (v.mood)               gl.push(`Mood: ${v.mood}`);
      if (v.person && v.number) gl.push(`Person: ${v.person} ${v.number}`);
      if (v.auxiliary)          gl.push(`Auxiliary: ${v.auxiliary}`);
      if (v.irregular)          gl.push(`Irregular: yes${v.irregularity_note ? ' — ' + v.irregularity_note : ''}`);
      if (gl.length) parts.push('NEWLINE_MARKER**Grammar:** ' + gl.join(' · '));
    } else if (type === 'noun' && d.noun) {
      const n = d.noun; const g = [];
      if (n.gender)      g.push(`Gender: ${n.gender}`);
      if (n.article_def) g.push(`${n.article_def} ${n.singular || d.word}`);
      if (n.plural)      g.push(`Plural: ${n.plural}`);
      if (g.length) parts.push('NEWLINE_MARKER**Grammar:** ' + g.join(' · '));
    } else if (type === 'adjective' && d.adjective) {
      const a = d.adjective; const ag = [];
      if (a.base_form)     ag.push(`Base: ${a.base_form}`);
      if (a.feminine)      ag.push(`Fem: ${a.feminine}`);
      if (a.position)      ag.push(`Position: ${a.position}`);
      if (a.position_note) ag.push(a.position_note);
      if (ag.length) parts.push('NEWLINE_MARKER**Grammar:** ' + ag.join(' · '));
    }
  }
  if (checked('sv-usage') && d.usage_note) parts.push(`NEWLINE_MARKER**Usage:** ${d.usage_note}`);
  return parts.join(' ').replace(/NEWLINE_MARKER/g, '\n');
}

// Find existing word entries that match a word (case-insensitive)
function findExistingWordEntries(word) {
  const w = word.toLowerCase().trim();
  return memory.filter(m =>
    m.type === 'word' && (
      (m.wordRaw && m.wordRaw.toLowerCase() === w) ||
      (m.main && m.main.toLowerCase().includes(`**${w}**`))
    )
  );
}

let pendingNewWordItem = null; // holds the new item while merge modal is open

document.getElementById('word-modal-save').addEventListener('click', () => {
  if (!currentWordData) return;
  const d = currentWordData;
  const userNote = document.getElementById('wm-user-note').value.trim();
  const mainText = buildWordMainText(d);

  const newItem = {
    type: 'word',
    main: mainText,
    sub:  d.meaning_in_context || '',
    note: userNote,
    wordRaw: d.word,
  };

  // Check for duplicates
  const existing = findExistingWordEntries(d.word);
  if (existing.length > 0) {
    // Close word modal and open merge modal
    document.getElementById('word-modal').classList.remove('open');
    pendingNewWordItem = newItem;
    openMergeModal(existing[0], newItem);
  } else {
    addMemoryItem(newItem);
    document.getElementById('word-modal').classList.remove('open');
  }
});

// ══════════════════════════════════════════════
// MERGE MODAL
// ══════════════════════════════════════════════
function openMergeModal(existingItem, newItem) {
  document.getElementById('merge-word-title').textContent = newItem.wordRaw || newItem.sub || 'Word';

  // Render existing
  const existEl = document.getElementById('merge-existing-text');
  existEl.innerHTML = renderMarkdown(existingItem.main || '');

  // Render new
  const newEl = document.getElementById('merge-new-text');
  newEl.innerHTML = renderMarkdown(newItem.main || '');

  // Build and show merge preview
  const mergedMain = buildMergedText(existingItem.main, newItem.main);
  const previewEl = document.getElementById('merge-preview');
  const previewText = document.getElementById('merge-preview-text');
  previewText.innerHTML = renderMarkdown(mergedMain);
  previewEl.classList.add('visible');

  document.getElementById('merge-modal').classList.add('open');
}

function buildMergedText(existingMain, newMain) {
  // Combine: existing first, then a divider, then new context
  return existingMain.trimEnd() + '\n\n---\n\n' + newMain.trimStart();
}

// Merge modal buttons
document.getElementById('merge-cancel-btn').addEventListener('click', () => {
  document.getElementById('merge-modal').classList.remove('open');
  pendingNewWordItem = null;
});

document.getElementById('merge-save-new-btn').addEventListener('click', () => {
  if (pendingNewWordItem) {
    addMemoryItem(pendingNewWordItem);
    showToast('Saved as a separate entry ✓');
  }
  document.getElementById('merge-modal').classList.remove('open');
  pendingNewWordItem = null;
});

document.getElementById('merge-replace-btn').addEventListener('click', () => {
  if (!pendingNewWordItem) return;
  const existing = findExistingWordEntries(pendingNewWordItem.wordRaw || '');
  if (existing.length > 0) {
    const idx = memory.findIndex(m => m.id === existing[0].id);
    if (idx !== -1) {
      memory[idx].main = pendingNewWordItem.main;
      memory[idx].sub  = pendingNewWordItem.sub;
      memory[idx].note = pendingNewWordItem.note;
      memory[idx].modifiedAt = new Date().toISOString();
      localStorage.setItem('fv_memory', JSON.stringify(memory));
      renderMemory();
      showToast('Entry replaced ✓');
    }
  }
  document.getElementById('merge-modal').classList.remove('open');
  pendingNewWordItem = null;
});

document.getElementById('merge-merge-btn').addEventListener('click', () => {
  if (!pendingNewWordItem) return;
  const existing = findExistingWordEntries(pendingNewWordItem.wordRaw || '');
  if (existing.length > 0) {
    const idx = memory.findIndex(m => m.id === existing[0].id);
    if (idx !== -1) {
      memory[idx].main = buildMergedText(existing[0].main, pendingNewWordItem.main);
      // Merge sub: append new meaning if different
      const existSub = memory[idx].sub || '';
      const newSub   = pendingNewWordItem.sub || '';
      if (newSub && !existSub.includes(newSub)) {
        memory[idx].sub = existSub ? existSub + ' · ' + newSub : newSub;
      }
      // Merge notes
      const existNote = memory[idx].note || '';
      const newNote   = pendingNewWordItem.note || '';
      if (newNote && !existNote.includes(newNote)) {
        memory[idx].note = existNote ? existNote + '\n' + newNote : newNote;
      }
      memory[idx].modifiedAt = new Date().toISOString();
      localStorage.setItem('fv_memory', JSON.stringify(memory));
      renderMemory();
      showToast('Entries merged ✓');
    }
  }
  document.getElementById('merge-modal').classList.remove('open');
  pendingNewWordItem = null;
});

// ══════════════════════════════════════════════
// CHAT
// ══════════════════════════════════════════════
document.getElementById('chat-send-btn').addEventListener('click', sendChat);
document.getElementById('chat-input').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); }
});

async function sendChat() {
  if (!apiKey) { showToast('Please enter your Anthropic API key first'); return; }
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  const sentence = sentences[currentIndex];
  chatHistories[currentIndex].push({ role: 'user', content: text });
  renderChat();
  document.getElementById('typing-indicator').classList.add('visible');
  document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;

  const systemPrompt = `You are an encouraging French language tutor. The student is reading this sentence:

"${sentence}"

Answer their questions about this sentence specifically. Topics: grammar, vocabulary, verb conjugation, tense usage, pronunciation, cultural context, etc. Be clear and concise. Use markdown formatting where it helps (e.g. **bold** for key terms, bullet lists for multiple points, \`code\` for word forms). Be friendly and encouraging.`;

  try {
    const messages = chatHistories[currentIndex].map(m => ({ role: m.role, content: m.content }));
    const reply = await callClaude(messages, systemPrompt);
    chatHistories[currentIndex].push({ role: 'assistant', content: reply });
  } catch(err) {
    console.error('Chat error:', err);
    chatHistories[currentIndex].push({ role: 'assistant', content: `⚠️ Error: ${err.message}` });
  }

  document.getElementById('typing-indicator').classList.remove('visible');
  renderChat();
}

function renderChat() {
  const history = chatHistories[currentIndex] || [];
  const container = document.getElementById('chat-messages');
  const emptyEl = document.getElementById('chat-empty');

  container.innerHTML = '';
  if (history.length === 0) {
    container.appendChild(emptyEl);
    emptyEl.style.display = 'block';
    return;
  }

  history.forEach((msg) => {
    const div = document.createElement('div');
    div.className = `chat-msg ${msg.role}`;

    if (msg.role === 'assistant') {
      // Render markdown
      div.innerHTML = renderMarkdown(msg.content);
      // Save to memory button
      const saveBtn = document.createElement('button');
      saveBtn.className = 'save-tidbit-btn';
      saveBtn.textContent = '+ Save to Memory';
      const capturedContent = msg.content;
      const capturedSentence = sentences[currentIndex];
      saveBtn.addEventListener('click', () => {
        addMemoryItem({
          type: 'tidbit',
          main: capturedContent, // store raw markdown
          sub: `About: "${capturedSentence.substring(0, 60)}…"`,
          note: ''
        });
      });
      div.appendChild(saveBtn);
    } else {
      div.textContent = msg.content;
    }
    container.appendChild(div);
  });
  container.scrollTop = container.scrollHeight;
}

// ══════════════════════════════════════════════
// MEMORY RENDER
// ══════════════════════════════════════════════
function renderMemory() {
  const panel = document.getElementById('memory-panel');

  // Remove all items except #memory-empty (keep it in DOM)
  Array.from(panel.children).forEach(child => {
    if (child.id !== 'memory-empty') child.remove();
  });

  const empty = document.getElementById('memory-empty');

  // Update count
  const countEl = document.getElementById('memory-count');
  if (countEl) {
    const knownCount = memory.filter(m => m.known).length;
    countEl.textContent = memory.length
      ? `${memory.length} item${memory.length !== 1 ? 's' : ''} · ${knownCount} known`
      : '';
  }

  if (memory.length === 0) {
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  const typeLabel = { word: '📘 Word', tidbit: '💡 Tidbit', sentence: '📝 Sentence', note: '✏️ Note' };

  // Field labels per type
  const fieldConfig = {
    word:     { mainLabel: 'French word', subLabel: 'Translation', noteLabel: 'Note' },
    sentence: { mainLabel: 'Sentence',    subLabel: 'Translation', noteLabel: 'Note' },
    tidbit:   { mainLabel: 'Content',     subLabel: 'Context',     noteLabel: 'Note' },
    note:     { mainLabel: 'Note',        subLabel: 'Tag',         noteLabel: '' },
  };

  const sorted = getSortedMemory();

  sorted.forEach(item => {
    const div = document.createElement('div');
    div.className = 'memory-item';
    div.dataset.id = item.id;

    const isMarkdown = true; // all types may contain markdown
    const cfg = fieldConfig[item.type] || { mainLabel: 'Content', subLabel: 'Details', noteLabel: 'Note' };

    // Build view HTML
    div.className = 'memory-item ' + (item.known ? 'known' : 'unknown');
    div.innerHTML = `
      <div class="mem-type ${item.type}">${typeLabel[item.type] || item.type}<span class="mem-known-badge">✓ known</span></div>
      <div class="mem-main">${isMarkdown ? renderMarkdown(item.main) : escapeHtml(item.main)}</div>
      ${item.sub  ? `<div class="mem-sub">${escapeHtml(item.sub)}</div>`   : '<div class="mem-sub" style="display:none"></div>'}
      ${item.note ? `<div class="mem-note">${escapeHtml(item.note)}</div>` : '<div class="mem-note" style="display:none"></div>'}
      <div class="mem-actions"></div>
      <div class="mem-edit-form">
        <label>${cfg.mainLabel}</label>
        <textarea class="edit-main" rows="3"></textarea>
        <label>${cfg.subLabel}</label>
        <input type="text" class="edit-sub">
        ${cfg.noteLabel ? `<label>${cfg.noteLabel}</label><textarea class="edit-note" rows="2"></textarea>` : ''}
        <div class="mem-edit-save-row">
          <button class="btn btn-ghost btn-sm edit-cancel-btn">Cancel</button>
          <button class="btn btn-primary btn-sm edit-save-btn">💾 Save</button>
        </div>
      </div>
      <button class="mem-known-toggle" title="${item.known ? 'Mark as unknown' : 'Mark as known'}">✓</button>
      <button class="mem-delete" title="Delete">×</button>
    `;

    const actionsEl  = div.querySelector('.mem-actions');
    const editForm   = div.querySelector('.mem-edit-form');
    const mainEl     = div.querySelector('.mem-main');
    const subEl      = div.querySelector('.mem-sub');
    const noteEl     = div.querySelector('.mem-note');
    const editMain   = div.querySelector('.edit-main');
    const editSub    = div.querySelector('.edit-sub');
    const editNote   = div.querySelector('.edit-note');

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-ghost btn-sm';
    editBtn.textContent = '✏️ Edit';
    editBtn.addEventListener('click', () => {
      // Populate fields with current raw values
      editMain.value = item.main || '';
      editSub.value  = item.sub  || '';
      if (editNote) editNote.value = item.note || '';
      editForm.classList.add('visible');
      editBtn.style.display = 'none';
      editMain.focus();
    });
    actionsEl.appendChild(editBtn);

    // Cancel
    div.querySelector('.edit-cancel-btn').addEventListener('click', () => {
      editForm.classList.remove('visible');
      editBtn.style.display = '';
    });

    // Save
    div.querySelector('.edit-save-btn').addEventListener('click', () => {
      const newMain = editMain.value.trim();
      const newSub  = editSub.value.trim();
      const newNote = editNote ? editNote.value.trim() : item.note;

      if (!newMain) { showToast('Main field cannot be empty'); return; }

      item.main = newMain;
      item.sub  = newSub;
      item.note = newNote || '';
      item.modifiedAt = new Date().toISOString();

      // Update localStorage
      const idx = memory.findIndex(m => m.id === item.id);
      if (idx !== -1) memory[idx] = item;
      localStorage.setItem('fv_memory', JSON.stringify(memory));
      // Refresh count
      const countEl = document.getElementById('memory-count');
      if (countEl) {
        const knownCount = memory.filter(m => m.known).length;
        countEl.textContent = `${memory.length} item${memory.length !== 1 ? 's' : ''} · ${knownCount} known`;
      }

      // Re-render view fields in place (no full re-render = no scroll jump)
      mainEl.innerHTML = isMarkdown ? renderMarkdown(newMain) : escapeHtml(newMain);
      if (newSub) {
        subEl.textContent = newSub;
        subEl.style.display = '';
      } else {
        subEl.style.display = 'none';
      }
      if (newNote) {
        noteEl.textContent = newNote;
        noteEl.style.display = '';
      } else {
        noteEl.style.display = 'none';
      }

      editForm.classList.remove('visible');
      editBtn.style.display = '';
      showToast('Saved ✓');
    });

    // Known toggle
    div.querySelector('.mem-known-toggle').addEventListener('click', () => toggleKnown(item.id));

    div.querySelector('.mem-delete').addEventListener('click', () => deleteMemoryItem(item.id));
    panel.appendChild(div);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Custom note
document.getElementById('add-note-btn').addEventListener('click', () => {
  document.getElementById('note-text').value = '';
  document.getElementById('note-tag').value = '';
  document.getElementById('note-modal').classList.add('open');
  setTimeout(() => document.getElementById('note-text').focus(), 50);
});
document.getElementById('note-modal-cancel').addEventListener('click', () => document.getElementById('note-modal').classList.remove('open'));
document.getElementById('note-modal-save').addEventListener('click', () => {
  const text = document.getElementById('note-text').value.trim();
  const tag = document.getElementById('note-tag').value.trim();
  if (!text) { showToast('Note is empty'); return; }
  addMemoryItem({ type: 'note', main: text, sub: tag ? `Tag: ${tag}` : '', note: '' });
  document.getElementById('note-modal').classList.remove('open');
});

document.getElementById('clear-memory-btn').addEventListener('click', () => {
  if (memory.length === 0) { showToast('Memory is already empty'); return; }
  if (confirm('Clear all memory items? This cannot be undone.')) {
    memory = []; saveMemory(); showToast('Memory cleared');
  }
});

// Sort buttons
document.querySelectorAll('.sort-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentSort = btn.dataset.sort;
    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMemory();
  });
});

// Export / Import
document.getElementById('memory-export-btn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(memory, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `francais-vivant-memory-${new Date().toISOString().slice(0,10)}.json`;
  a.click(); URL.revokeObjectURL(url);
  showToast('Memory exported!');
});
document.getElementById('memory-import-file').addEventListener('change', e => {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const imported = JSON.parse(ev.target.result);
      if (!Array.isArray(imported)) throw new Error('Invalid format');
      memory = [...imported, ...memory];
      saveMemory();
      showToast(`Imported ${imported.length} items`);
    } catch { showToast('Invalid memory file'); }
  };
  reader.readAsText(file);
  e.target.value = '';
});

// ══════════════════════════════════════════════
// CLAUDE API
// ══════════════════════════════════════════════
async function callClaude(messages, systemPrompt = '') {
  const body = {
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages
  };
  if (systemPrompt) body.system = systemPrompt;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API ${response.status}: ${errText}`);
  }
  const data = await response.json();
  if (!data.content || !data.content[0]) throw new Error('Empty response from API');
  return data.content[0].text;
}

// ══════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}


// ══════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════
loadMemory();
loadApiKey();
renderMemory();
</script>

<!-- ── SITE FOOTER ── -->
<footer class="site-footer h-card">
  <data class="u-url" value="/"></data>
  <div class="wrapper">
    <h2 class="footer-heading">Claudie Larouche</h2>
    <div class="footer-col-wrapper">
      <div class="footer-col footer-col-1">
        <ul class="contact-list">
          <li class="p-name">Claudie Larouche</li>
          <li><a class="u-email" href="mailto:claudielarouche@gmail.com">claudielarouche@gmail.com</a></li>
        </ul>
      </div>
      <div class="footer-col footer-col-2">
        <ul class="social-media-list">
          <li><a href="https://www.facebook.com/claudie.larouche.3">
            <svg class="svg-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span class="username">claudie.larouche.3</span>
          </a></li>
          <li><a href="https://github.com/claudielarouche">
            <svg class="svg-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            <span class="username">claudielarouche</span>
          </a></li>
          <li><a href="https://www.linkedin.com/in/claudie-larouche">
            <svg class="svg-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            <span class="username">claudie-larouche</span>
          </a></li>
          <li><a href="https://www.twitter.com/claudielarouche">
            <svg class="svg-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.59z"/></svg>
            <span class="username">claudielarouche</span>
          </a></li>
        </ul>
      </div>
      <div class="footer-col footer-col-3">
        <p>A website demonstrating my Ottawa and work-related projects</p>
        <a href="https://ko-fi.com/H2H21DRM34" target="_blank"><img height="36" style="border:0px;height:36px;" src="https://storage.ko-fi.com/cdn/kofi6.png?v=6" border="0" alt="Buy Me a Coffee at ko-fi.com"></a>
      </div>
    </div>
  </div>
</footer>

</body>
</html>
