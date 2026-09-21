(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  var label = btn ? btn.querySelector('.theme-toggle__label') : null;

  function current() { return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark'; }

  function apply(theme, save) {
    root.setAttribute('data-theme', theme);
    if (label) label.textContent = theme === 'light' ? 'Тёмная' : 'Светлая';
    if (save) {
      try { localStorage.setItem('mve-theme', theme); } catch (e) {}
    }
  }

  function init() {
    var saved = null;
    try { saved = localStorage.getItem('mve-theme'); } catch (e) {}
    var theme = saved === 'light' || saved === 'dark'
      ? saved
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    apply(theme, false);
  }

  if (btn) {
    btn.addEventListener('click', function () {
      var next = current() === 'light' ? 'dark' : 'light';
      apply(next, true);
      document.dispatchEvent(new CustomEvent('themechange', { detail: next }));
    });
  }

  init();
})();