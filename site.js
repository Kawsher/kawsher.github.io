// site.js: shared behaviour for every page (mobile menu + scroll reveals).
// Pages render fully without it; this only adds motion and the menu panel.
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // ---- Mobile menu ----
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    var label = toggle.querySelector('.label');
    function setOpen(open) {
      links.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (label) label.textContent = open ? 'Close' : 'Menu';
    }
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
  }

  // ---- Scroll reveal (once, only for content below the first screen) ----
  if (!('IntersectionObserver' in window)) return;
  var targets = document.querySelectorAll(
    '.content > h2, .content > p, .sel-pub, .area, .pub-item, .teach-block, .timeline-item, ' +
    '.news-item, .service-row, .award-row, .repo-card, .callout, .pi-block, .join-box, .interest-list'
  );
  var fold = window.innerHeight;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  targets.forEach(function (el) {
    if (el.getBoundingClientRect().top < fold) return;
    el.classList.add('reveal');
    io.observe(el);
  });
})();
