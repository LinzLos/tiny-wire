/**
 * Tiny Wire — docs JS
 * Sidebar injection + dark mode + code reveal + active link tracking.
 */

(function () {
  const root = document.documentElement;

  // ─── Single source of truth for the current version ────────────────────
  // Bump this ONE constant each release. It drives the sidebar below and every
  // element marked [data-tw-version] across the docs (see init()).
  const VERSION = 'v1.5';

  // ─── Sidebar template ──────────────────────────────────────────────────
  const SIDEBAR_HTML = `
<aside class="docs-sidebar">
  <div class="docs-logo-row">
    <a class="docs-logo" href="index.html">
      <div class="docs-logo-mark">
        <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
          <path d="M26 12C26.5304 12 27.0391 11.7893 27.4142 11.4142C27.7893 11.0391 28 10.5304 28 10V6C28 5.46957 27.7893 4.96086 27.4142 4.58579C27.0391 4.21071 26.5304 4 26 4H22C21.4696 4 20.9609 4.21071 20.5858 4.58579C20.2107 4.96086 20 5.46957 20 6V7H12V6C12 5.46957 11.7893 4.96086 11.4142 4.58579C11.0391 4.21071 10.5304 4 10 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V10C4 10.5304 4.21071 11.0391 4.58579 11.4142C4.96086 11.7893 5.46957 12 6 12H7V20H6C5.46957 20 4.96086 20.2107 4.58579 20.5858C4.21071 20.9609 4 21.4696 4 22V26C4 26.5304 4.21071 27.0391 4.58579 27.4142C4.96086 27.7893 5.46957 28 6 28H10C10.5304 28 11.0391 27.7893 11.4142 27.4142C11.7893 27.0391 12 26.5304 12 26V25H20V26C20 26.5304 20.2107 27.0391 20.5858 27.4142C20.9609 27.7893 21.4696 28 22 28H26C26.5304 28 27.0391 27.7893 27.4142 27.4142C27.7893 27.0391 28 26.5304 28 26V22C28 21.4696 27.7893 20.9609 27.4142 20.5858C27.0391 20.2107 26.5304 20 26 20H25V12H26ZM22 6H26V10H22V6ZM6 6H10V7.9875C9.99835 7.99575 9.99835 8.00425 10 8.0125V10H6V6ZM10 26H6V22H10V23.9875C9.99835 23.9958 9.99835 24.0042 10 24.0125V26ZM26 26H22V22H26V26ZM23 20H22C21.4696 20 20.9609 20.2107 20.5858 20.5858C20.2107 20.9609 20 21.4696 20 22V23H12V22C12 21.4696 11.7893 20.9609 11.4142 20.5858C11.0391 20.2107 10.5304 20 10 20H9V12H10C10.5304 12 11.0391 11.7893 11.4142 11.4142C11.7893 11.0391 12 10.5304 12 10V9H20V10C20 10.5304 20.2107 11.0391 20.5858 11.4142C20.9609 11.7893 21.4696 12 22 12H23V20Z" fill="currentColor"/>
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
      <a class="docs-nav-group-label" href="index.html">Get started</a>
      <a class="docs-nav-link" href="index.html">Introduction</a>
      <a class="docs-nav-link" href="index.html#quickstart">Quick start</a>
      <a class="docs-nav-link" href="index.html#principles">Principles</a>
      <a class="docs-nav-link" href="index.html#files">What's in the repo</a>
    </div>

    <div class="docs-nav-group">
      <a class="docs-nav-group-label" href="audit.html">Reference</a>
      <a class="docs-nav-link" href="audit.html">Audit &amp; changelog</a>
      <a class="docs-nav-link" href="a11y.html">A11y check</a>
    </div>

    <div class="docs-nav-group">
      <a class="docs-nav-group-label" href="foundations.html">Foundations</a>
      <a class="docs-nav-link" href="foundations.html#animation">Animation</a>
      <a class="docs-nav-link" href="foundations.html#colors">Colors</a>
      <a class="docs-nav-link" href="foundations.html#radius">Radius</a>
      <a class="docs-nav-link" href="foundations.html#shadows">Shadows</a>
      <a class="docs-nav-link" href="foundations.html#spacing">Spacing</a>
      <a class="docs-nav-link" href="foundations.html#typography">Typography</a>
    </div>

    <div class="docs-nav-group">
      <a class="docs-nav-group-label" href="components.html">Components</a>
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
      <a class="docs-nav-group-label" href="patterns.html">Patterns</a>
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

    // Command palette: filter items as you type
    document.querySelectorAll('.command .command-input').forEach(input => {
      const cmd = input.closest('.command');
      const list = cmd && cmd.querySelector('.command-list');
      if (!list) return;
      const items = Array.from(list.querySelectorAll('.menu-item'));
      const empty = document.createElement('div');
      empty.className = 'command-empty';
      empty.style.cssText = 'padding:var(--space-12) var(--space-14); font-size:var(--text-md); color:var(--text-tertiary); display:none;';
      empty.textContent = 'No results';
      list.appendChild(empty);
      input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        let shown = 0;
        items.forEach(it => {
          const ok = !q || (it.textContent || '').toLowerCase().includes(q);
          it.style.display = ok ? '' : 'none';
          if (ok) shown++;
        });
        list.querySelectorAll('.command-group-label').forEach(lab => {
          let el = lab.nextElementSibling, any = false;
          while (el && !(el.classList && el.classList.contains('command-group-label'))) {
            if (el.classList && el.classList.contains('menu-item') && el.style.display !== 'none') { any = true; break; }
            el = el.nextElementSibling;
          }
          lab.style.display = any ? '' : 'none';
        });
        empty.style.display = (q && shown === 0) ? '' : 'none';
      });
    });

    // Dialog / Sheet demos: the X (and Cancel) close it and reveal a reopen button; Esc closes
    document.querySelectorAll('.demo .dialog, .demo .sheet').forEach(modal => {
      const canvas = modal.closest('.demo-canvas');
      if (!canvas) return;
      const scrim = (modal.previousElementSibling && !modal.previousElementSibling.className) ? modal.previousElementSibling : null;
      const reopen = document.createElement('button');
      reopen.type = 'button';
      reopen.className = 'btn btn-primary';
      reopen.textContent = modal.classList.contains('sheet') ? 'Open sheet' : 'Open dialog';
      reopen.style.display = 'none';
      canvas.appendChild(reopen);
      const close = () => { modal.style.display = 'none'; if (scrim) scrim.style.display = 'none'; reopen.style.display = ''; reopen.focus(); };
      const open = () => { modal.style.display = ''; if (scrim) scrim.style.display = ''; reopen.style.display = 'none'; const f = modal.querySelector('button, [href], input, select'); if (f) f.focus(); };
      reopen.addEventListener('click', open);
      modal.querySelectorAll('.dialog-close').forEach(b => b.addEventListener('click', close));
      modal.querySelectorAll('.btn').forEach(b => { if ((b.textContent || '').trim() === 'Cancel') b.addEventListener('click', close); });
      modal.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    });

    // Slider: mirror value into aria-valuetext for screen readers
    document.querySelectorAll('input[type="range"].slider').forEach(sl => {
      const sync = () => sl.setAttribute('aria-valuetext', sl.value);
      sync(); sl.addEventListener('input', sync);
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
    if (document.querySelector('.color-grid')) return;   // foundations uses token search instead
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

  // ─── Token search (Foundations) ────────────────────────────────────────
  function setupTokenSearch() {
    if (!document.querySelector('.color-grid')) return;   // only Foundations
    const lede = document.querySelector('.docs-lede');
    if (!lede) return;
    const ROW = '.color-chip, .spacing-row, .type-scale-row, .shadow-item, .radius-item';
    const NAME = '.color-chip-var, .spacing-token, .type-scale-token, .shadow-token, .radius-token';
    const rows = Array.from(document.querySelectorAll(ROW));

    const wrap = document.createElement('div');
    wrap.className = 'token-search';
    wrap.innerHTML = '<input type="search" class="token-search-input" placeholder="Search tokens — e.g. space, accent, radius" aria-label="Search tokens" autocomplete="off"><span class="token-search-count" aria-live="polite"></span>';
    lede.insertAdjacentElement('afterend', wrap);
    const input = wrap.querySelector('.token-search-input');
    const count = wrap.querySelector('.token-search-count');

    const nameOf = (row) => {
      const el = row.querySelector(NAME);
      return (el ? el.textContent : row.textContent).toLowerCase();
    };

    function filter() {
      const q = input.value.trim().toLowerCase();
      let shown = 0;
      rows.forEach(r => {
        const ok = !q || nameOf(r).includes(q);
        r.style.display = ok ? '' : 'none';
        if (ok) shown++;
      });
      // hide emptied color groups (label + grid)
      document.querySelectorAll('.color-grid').forEach(grid => {
        const any = Array.from(grid.querySelectorAll('.color-chip')).some(c => c.style.display !== 'none');
        grid.style.display = any ? '' : 'none';
        const label = grid.previousElementSibling;
        if (label && label.classList.contains('token-group-label')) label.style.display = any ? '' : 'none';
      });
      // hide section headings whose rows are all filtered out
      document.querySelectorAll('h2.docs-h2[id]').forEach(h => {
        let el = h.nextElementSibling, any = false;
        while (el && el.tagName !== 'H2') {
          if (el.matches && el.matches(ROW) && el.style.display !== 'none') { any = true; break; }
          if (el.querySelectorAll && Array.from(el.querySelectorAll(ROW)).some(r => r.style.display !== 'none')) { any = true; break; }
          el = el.nextElementSibling;
        }
        const hide = q && !any;
        h.style.display = hide ? 'none' : '';
        const sub = h.nextElementSibling;
        if (sub && sub.classList && sub.classList.contains('docs-h2-sub')) sub.style.display = hide ? 'none' : '';
      });
      count.textContent = q ? (shown + ' token' + (shown === 1 ? '' : 's')) : '';
    }
    input.addEventListener('input', filter);
  }

  // ─── Prev / Next page footer (learning path) ───────────────────────────
  function setupPageNav() {
    const main = document.querySelector('.docs-main');
    if (!main) return;
    const PAGES = [
      { file: 'index.html', title: 'Introduction' },
      { file: 'foundations.html', title: 'Foundations' },
      { file: 'components.html', title: 'Components' },
      { file: 'patterns.html', title: 'Patterns' },
      { file: 'audit.html', title: 'Audit & changelog' },
      { file: 'a11y.html', title: 'Accessibility check' },
    ];
    const here = (location.pathname.split('/').pop() || 'index.html');
    const i = PAGES.findIndex(p => p.file === here);
    if (i < 0) return;
    const prev = PAGES[i - 1], next = PAGES[i + 1];
    if (!prev && !next) return;
    const link = (p, dir, cls) => p
      ? '<a class="docs-pagenav-link ' + cls + '" href="' + p.file + '"><span class="docs-pagenav-dir">' + dir + '</span><span class="docs-pagenav-title">' + p.title + '</span></a>'
      : '<span></span>';
    const nav = document.createElement('nav');
    nav.className = 'docs-pagenav';
    nav.setAttribute('aria-label', 'Page navigation');
    nav.innerHTML = link(prev, '← Previous', 'prev') + link(next, 'Next →', 'next');
    main.appendChild(nav);
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
    setupTokenSearch();
    setupPageNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
