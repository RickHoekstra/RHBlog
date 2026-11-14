// Theme switch: light -> dark -> auto (follows the device setting).
(function () {
  var root = document.documentElement;
  var media = matchMedia('(prefers-color-scheme: dark)');
  var order = ['light', 'dark', 'auto'];

  function apply(mode) {
    var dark = mode === 'dark' || (mode === 'auto' && media.matches);
    root.dataset.theme = dark ? 'dark' : 'light';
    root.dataset.mode = mode;
    var btn = document.querySelector('.theme-toggle');
    if (btn) btn.title = 'Theme: ' + mode;
  }

  var btn = document.querySelector('.theme-toggle');
  if (btn) {
    btn.title = 'Theme: ' + (root.dataset.mode || 'auto');
    btn.addEventListener('click', function () {
      var next = order[(order.indexOf(root.dataset.mode) + 1) % order.length];
      try { localStorage.setItem('theme', next); } catch (e) {}
      apply(next);
    });
  }
  media.addEventListener('change', function () {
    if (root.dataset.mode === 'auto') apply('auto');
  });

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // Press "/" anywhere to jump to search
  document.addEventListener('keydown', function (e) {
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target;
    if (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    var link = document.querySelector('.header-actions a[href*="search"]');
    var input = document.getElementById('search-input');
    e.preventDefault();
    if (input) input.focus(); else if (link) location.href = link.href;
  });

  // Copy buttons on code blocks
  document.querySelectorAll('.prose .highlight').forEach(function (block) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'copy-btn';
    b.textContent = 'Copy';
    b.addEventListener('click', function () {
      var code = block.querySelector('code');
      navigator.clipboard.writeText(code.innerText).then(function () {
        b.textContent = 'Copied';
        setTimeout(function () { b.textContent = 'Copy'; }, 1500);
      });
    });
    block.appendChild(b);
  });
})();
