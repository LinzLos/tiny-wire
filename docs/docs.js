/**
 * Tiny Wire — docs JS
 * Sidebar injection + dark mode + code reveal + active link tracking.
 */

(function () {
  const root = document.documentElement;

  // ─── Single source of truth for the current version ────────────────────
  // Bump this ONE constant each release. It drives the sidebar below and every
  // element marked [data-tw-version] across the docs (see init()).
  const VERSION = 'v1.3';

  // ─── Sidebar template ──────────────────────────────────────────────────
  const SIDEBAR_HTML = `
<aside class="docs-sidebar">
  <div class="docs-logo-row">
    <a class="docs-logo" href="index.html">
      <div class="docs-logo-mark">
        <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
          <path d="M41.9996 4L37.9996 8M37.9996 8L43.9996 14L36.9996 21L30.9996 15M37.9996 8L30.9996 15M22.7796 23.22C23.8123 24.2389 24.6332 25.4521 25.1951 26.7896C25.757 28.1271 26.0488 29.5625 26.0536 31.0133C26.0585 32.464 25.7763 33.9014 25.2234 35.2426C24.6705 36.5838 23.8577 37.8025 22.8319 38.8283C21.806 39.8541 20.5874 40.6669 19.2462 41.2198C17.9049 41.7728 16.4676 42.0549 15.0168 42.0501C13.5661 42.0452 12.1307 41.7534 10.7932 41.1915C9.45565 40.6296 8.24251 39.8087 7.22357 38.776C5.21983 36.7014 4.1111 33.9228 4.13616 31.0386C4.16122 28.1544 5.31808 25.3955 7.35757 23.356C9.39706 21.3165 12.156 20.1596 15.0402 20.1346C17.9243 20.1095 20.7029 21.2183 22.7776 23.222L22.7796 23.22ZM22.7796 23.22L30.9996 15" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div>
        <div class="docs-logo-name">Tiny Wire</div>
        <div class="docs-logo-version">${VERSION}</div>
      </div>
    </a>
    <button class="theme-toggle-icon" data-theme-toggle onclick="toggleTheme()" aria-label="Toggle theme" title="Toggle theme"></button>
  </div>

  <nav class="docs-nav">
    <div class="docs-nav-group">
      <div class="docs-nav-group-label">Get started</div>
      <a class="docs-nav-link" href="index.html">Introduction</a>
      <a class="docs-nav-link" href="index.html#quickstart">Quick start</a>
      <a class="docs-nav-link" href="index.html#principles">Principles</a>
      <a class="docs-nav-link" href="audit.html">Audit &amp; changelog</a>
      <a class="docs-nav-link" href="a11y.html">A11y check</a>
    </div>

    <div class="docs-nav-group">
      <div class="docs-nav-group-label">Foundations</div>
      <a class="docs-nav-link" href="foundations.html#animation">Animation</a>
      <a class="docs-nav-link" href="foundations.html#colors">Colors</a>
      <a class="docs-nav-link" href="foundations.html#radius">Radius</a>
      <a class="docs-nav-link" href="foundations.html#shadows">Shadows</a>
      <a class="docs-nav-link" href="foundations.html#spacing">Spacing</a>
      <a class="docs-nav-link" href="foundations.html#typography">Typography</a>
    </div>

    <div class="docs-nav-group">
      <div class="docs-nav-group-label">Components</div>
      <a class="docs-nav-link" href="components.html#accordion">Accordion</a>
      <a class="docs-nav-link" href="components.html#alert">Alert</a>
      <a class="docs-nav-link" href="components.html#avatar">Avatar</a>
      <a class="docs-nav-link" href="components.html#banner">Banner</a>
      <a class="docs-nav-link" href="components.html#breadcrumb">Breadcrumb</a>
      <a class="docs-nav-link" href="components.html#button">Button</a>
      <a class="docs-nav-link" href="components.html#card">Card</a>
      <a class="docs-nav-link" href="components.html#checkbox">Checkbox</a>
      <a class="docs-nav-link" href="components.html#command">Command</a>
      <a class="docs-nav-link" href="components.html#dialog">Dialog</a>
      <a class="docs-nav-link" href="components.html#menu">Dropdown Menu</a>
      <a class="docs-nav-link" href="components.html#empty">Empty State</a>
      <a class="docs-nav-link" href="components.html#input">Input</a>
      <a class="docs-nav-link" href="components.html#pagination">Pagination</a>
      <a class="docs-nav-link" href="components.html#popover">Popover</a>
      <a class="docs-nav-link" href="components.html#progress">Progress</a>
      <a class="docs-nav-link" href="components.html#radio">Radio</a>
      <a class="docs-nav-link" href="components.html#select">Select</a>
      <a class="docs-nav-link" href="components.html#sheet">Sheet</a>
      <a class="docs-nav-link" href="components.html#sidebar">Sidebar</a>
      <a class="docs-nav-link" href="components.html#skeleton">Skeleton</a>
      <a class="docs-nav-link" href="components.html#slider">Slider</a>
      <a class="docs-nav-link" href="components.html#chip">Status Chip</a>
      <a class="docs-nav-link" href="components.html#switch">Switch</a>
      <a class="docs-nav-link" href="components.html#table">Table</a>
      <a class="docs-nav-link" href="components.html#tabs">Tabs</a>
      <a class="docs-nav-link" href="components.html#tag">Tag &amp; Badge</a>
      <a class="docs-nav-link" href="components.html#textarea">Textarea</a>
      <a class="docs-nav-link" href="components.html#toast">Toast</a>
      <a class="docs-nav-link" href="components.html#tooltip">Tooltip</a>
    </div>

    <div class="docs-nav-group">
      <div class="docs-nav-group-label">Patterns</div>
      <a class="docs-nav-link" href="patterns.html#dashboard">Dashboard</a>
      <a class="docs-nav-link" href="patterns.html#datatable">Data Table</a>
      <a class="docs-nav-link" href="patterns.html#empty-states">Empty States</a>
      <a class="docs-nav-link" href="patterns.html#login">Login</a>
      <a class="docs-nav-link" href="patterns.html#settings">Settings</a>
    </div>
  </nav>

  <div class="docs-theme-toggle">
    <span>Theme</span>
    <button class="theme-toggle-btn" data-theme-toggle-2 onclick="toggleTheme()">Dark</button>
  </div>
</aside>`;

  // ─── Theme ─────────────────────────────────────────────────────────────
  const stored = localStorage.getItem('tw-theme');
  if (stored === 'dark') root.setAttribute('data-theme', 'dark');

  window.toggleTheme = function () {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    // v1.1 — scope the cross-fade to this single swap, then remove it so
    // ordinary hover/focus transitions stay snappy.
    root.classList.add('theme-swapping');
    if (next === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    localStorage.setItem('tw-theme', next);
    updateThemeLabel();
    window.setTimeout(() => root.classList.remove('theme-swapping'), 280);
  };

  function updateThemeLabel() {
    const isDark = root.getAttribute('data-theme') === 'dark';
    // Header icon button (sun/moon glyph only)
    const iconBtn = document.querySelector('[data-theme-toggle]');
    if (iconBtn) {
      iconBtn.innerHTML = isDark
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      iconBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    // Footer label-and-button
    const footBtn = document.querySelector('[data-theme-toggle-2]');
    if (footBtn) {
      footBtn.innerHTML = isDark
        ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg><span>Light</span>'
        : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg><span>Dark</span>';
    }
  }

  // ─── Demo tabs (Preview / Code) ────────────────────────────────────────
  window.setDemoTab = function (btn, target) {
    const demo = btn.closest('.demo');
    if (!demo) return;
    demo.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    if (target === 'code') demo.classList.add('code-open');
    else demo.classList.remove('code-open');
  };

  // ─── Mark current page link ────────────────────────────────────────────
  function markCurrentPage() {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.docs-nav-link').forEach(l => {
      const href = l.getAttribute('href');
      if (!href) return;
      const linkPage = href.split('#')[0] || page;
      if (linkPage === page && !href.includes('#')) {
        l.classList.add('active');
      }
    });
  }

  // ─── Active anchor tracking (in-page) ──────────────────────────────────
  function setupActiveLinks() {
    const page = location.pathname.split('/').pop() || 'index.html';
    const links = [...document.querySelectorAll(`.docs-nav-link[href*="${page}#"], .docs-nav-link[href^="#"]`)];
    const sections = [];
    links.forEach(l => {
      const hash = l.getAttribute('href').split('#')[1];
      if (!hash) return;
      const el = document.getElementById(hash);
      if (el) sections.push({ link: l, el });
    });
    if (!sections.length) return;

    function update() {
      let cur = null;
      const y = window.scrollY + 120;
      sections.forEach(({ el }) => {
        if (el.offsetTop <= y) cur = el.id;
      });
      links.forEach(l => l.classList.remove('active'));
      if (cur) {
        const target = sections.find(s => s.el.id === cur);
        if (target) target.link.classList.add('active');
      }
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // ─── Interactive demos ─────────────────────────────────────────────────
  // Docs-level vanilla JS so the demos are honest (no false affordances).
  // The DESIGN SYSTEM stays CSS-only; this just animates its documented states.
  function selectTab(tab) {
    const list = tab.closest('.tabs-list, .tabs-list-pill');
    if (!list) return;
    list.querySelectorAll('.tab').forEach(t => {
      const on = t === tab;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.setAttribute('tabindex', on ? '0' : '-1');
    });
    if (list.classList.contains('tabs-list')) {
      const panel = list.parentElement && list.parentElement.querySelector('.tab-panel');
      if (panel) {
        const label = (tab.textContent || '').replace(/\s+\d+\s*$/, '').trim();
        const p = panel.querySelector('p') || panel;
        p.textContent = label + ' content goes here.';
      }
    }
  }

  function setupDemos() {
    // ARIA on tab demos
    document.querySelectorAll('.tabs-list, .tabs-list-pill').forEach(list => {
      list.setAttribute('role', 'tablist');
      list.querySelectorAll('.tab').forEach(t => {
        t.setAttribute('role', 'tab');
        const on = t.classList.contains('active');
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.setAttribute('tabindex', on ? '0' : '-1');
      });
      list.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const tabs = Array.from(list.querySelectorAll('.tab'));
        const i = tabs.indexOf(document.activeElement);
        if (i < 0) return;
        e.preventDefault();
        const n = e.key === 'ArrowRight' ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
        tabs[n].focus(); selectTab(tabs[n]);
      });
    });
    // aria-expanded on accordion triggers
    document.querySelectorAll('.accordion-item').forEach(item => {
      const trig = item.querySelector('.accordion-trigger');
      if (trig) trig.setAttribute('aria-expanded', item.getAttribute('data-state') === 'open' ? 'true' : 'false');
    });
    // demo popovers: hide, toggle from the preceding trigger button
    document.querySelectorAll('.demo .popover').forEach(pop => {
      const trigger = pop.previousElementSibling;
      pop.dataset.popoverDemo = '1';
      pop.style.display = 'none';
      if (trigger && trigger.tagName === 'BUTTON') {
        trigger.setAttribute('aria-expanded', 'false');
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          const hidden = pop.style.display === 'none';
          pop.style.display = hidden ? '' : 'none';
          trigger.setAttribute('aria-expanded', hidden ? 'true' : 'false');
        });
      }
    });

    // delegated activation
    document.addEventListener('click', (e) => {
      const at = e.target.closest('.accordion-trigger');
      if (at) {
        const item = at.closest('.accordion-item');
        const open = item.getAttribute('data-state') === 'open';
        item.setAttribute('data-state', open ? 'closed' : 'open');
        at.setAttribute('aria-expanded', open ? 'false' : 'true');
        return;
      }
      const tab = e.target.closest('.tabs-list .tab, .tabs-list-pill .tab');
      if (tab) { selectTab(tab); return; }
      // click-away closes demo popovers
      document.querySelectorAll('.demo .popover[data-popover-demo]').forEach(pop => {
        if (pop.style.display === 'none') return;
        if (e.target.closest('.popover') === pop) return;
        const trig = pop.previousElementSibling;
        if (trig && trig.contains && trig.contains(e.target)) return;
        pop.style.display = 'none';
        if (trig && trig.setAttribute) trig.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ─── Copy-to-clipboard on code blocks ──────────────────────────────────
  function setupCopyButtons() {
    document.querySelectorAll('pre.demo-code').forEach(pre => {
      if (pre.querySelector('.demo-copy')) return;
      const code = pre.textContent;           // captured BEFORE the button is added
      const btn = document.createElement('button');
      btn.className = 'demo-copy';
      btn.type = 'button';
      btn.textContent = 'Copy';
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const done = () => { btn.textContent = 'Copied'; btn.classList.add('copied');
          setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1600); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code).then(done).catch(() => { btn.textContent = '⌘C'; });
        } else { btn.textContent = '⌘C'; }
      });
      pre.appendChild(btn);
    });
  }

  // ─── Back-to-top ───────────────────────────────────────────────────────
  function setupBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '↑';
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(btn);
    const onScroll = () => btn.classList.toggle('visible', window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ─── On-page table of contents (long content pages) ────────────────────
  function setupTOC() {
    if (document.querySelector('.audit-meta')) return;   // audit has its own dashboard
    const heads = Array.from(document.querySelectorAll('h2.docs-h2[id]'));
    if (heads.length < 6) return;
    const lede = document.querySelector('.docs-lede');
    if (!lede) return;
    const nav = document.createElement('nav');
    nav.className = 'docs-toc';
    nav.setAttribute('aria-label', 'On this page');
    const label = document.createElement('span');
    label.className = 'docs-toc-label';
    label.textContent = 'On this page';
    nav.appendChild(label);
    heads.forEach(h => {
      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.className = 'docs-toc-link';
      a.textContent = (h.textContent || '').trim();
      nav.appendChild(a);
    });
    lede.insertAdjacentElement('afterend', nav);
  }

  // ─── Inject sidebar + init ────────────────────────────────────────────
  function init() {
    const slot = document.getElementById('docs-sidebar-slot');
    if (slot) slot.outerHTML = SIDEBAR_HTML;
    // Drive every current-version marker from the one VERSION constant.
    document.querySelectorAll('[data-tw-version]').forEach(el => { el.textContent = VERSION; });
    updateThemeLabel();
    markCurrentPage();
    setupActiveLinks();
    setupDemos();
    setupCopyButtons();
    setupBackToTop();
    setupTOC();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
