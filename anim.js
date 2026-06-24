/* Animations légères — compteurs au défilement. Aucune dépendance, aucun traceur. */
(function () {
  if (!('IntersectionObserver' in window)) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  if (reduce) { els.forEach(function (el) { el.textContent = el.getAttribute('data-count'); }); return; }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, end = parseFloat(el.getAttribute('data-count')), dur = 1100, start = null;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * eased);
        if (p < 1) requestAnimationFrame(step); else el.textContent = end;
      }
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.6 });

  els.forEach(function (el) { io.observe(el); });
})();
