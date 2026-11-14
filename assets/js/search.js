// Search runs fully in the browser, on the index.json that Hugo generates.
(function () {
  var script = document.currentScript;
  var input = document.getElementById('search-input');
  var status = document.getElementById('search-status');
  var results = document.getElementById('search-results');
  var posts = null;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function highlight(text, words) {
    var out = esc(text);
    words.forEach(function (w) {
      var re = new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      out = out.replace(re, '<mark>$1</mark>');
    });
    return out;
  }
  function score(post, words) {
    var total = 0;
    for (var i = 0; i < words.length; i++) {
      var w = words[i], s = 0;
      if (post._title.indexOf(w) > -1) s += 10;
      if (post._tax.indexOf(w) > -1) s += 6;
      if (post._summary.indexOf(w) > -1) s += 3;
      if (post._content.indexOf(w) > -1) s += 1;
      if (!s) return 0; // every word has to match somewhere
      total += s;
    }
    return total;
  }
  function run() {
    var q = input.value.trim().toLowerCase();
    var url = new URL(location.href);
    if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
    history.replaceState(null, '', url);
    if (!q) { results.innerHTML = ''; status.textContent = ''; return; }
    var words = q.split(/\s+/);
    var hits = posts
      .map(function (p) { return { p: p, s: score(p, words) }; })
      .filter(function (h) { return h.s > 0; })
      .sort(function (a, b) { return b.s - a.s; });
    status.textContent = hits.length + (hits.length === 1 ? ' article' : ' articles') + ' found';
    results.innerHTML = hits.map(function (h) {
      var p = h.p;
      return '<a class="result" href="' + esc(p.url) + '"><strong>' + highlight(p.title, words) + '</strong>' +
        '<span class="summary">' + highlight(p.summary, words) + '</span>' +
        '<span class="meta">' + esc(p.date) + (p.categories.length ? ' &middot; ' + esc(p.categories.join(', ')) : '') + '</span></a>';
    }).join('');
  }

  status.textContent = 'Loading articles...';
  fetch(script.dataset.index)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      posts = data.map(function (p) {
        p._title = p.title.toLowerCase();
        p._summary = p.summary.toLowerCase();
        p._content = p.content.toLowerCase();
        p._tax = p.categories.concat(p.tags).join(' ').toLowerCase();
        return p;
      });
      status.textContent = '';
      var q = new URLSearchParams(location.search).get('q');
      if (q) input.value = q;
      input.addEventListener('input', run);
      run();
    })
    .catch(function () { status.textContent = 'Search could not be loaded.'; });
})();
