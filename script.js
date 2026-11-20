(function () {
  var nav = document.getElementById('nav'),
      bar = document.getElementById('bar'),
      burger = document.getElementById('burger'),
      menu = document.getElementById('menu');

  // Sticky nav state + scroll progress
  function onScroll() {
    var h = document.documentElement;
    nav.classList.toggle('on', window.scrollY > 40);
    bar.style.width = (window.scrollY / (h.scrollHeight - h.clientHeight) * 100) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });

  // Count-up numbers
  function count(el) {
    var end = +el.dataset.n, t0 = null, dur = 1800;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Reveal on scroll
  var io = new IntersectionObserver(function (items) {
    items.forEach(function (i) {
      if (!i.isIntersecting) return;
      i.target.classList.add('in');
      i.target.querySelectorAll('[data-n]').forEach(count);
      io.unobserve(i.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });

  // Marquee: duplicate buyers for a seamless loop
  var track = document.querySelector('.track');
  if (track) track.innerHTML += track.innerHTML;

  // Highlight the active section in the menu
  var links = [].slice.call(menu.querySelectorAll('a'));
  var spy = new IntersectionObserver(function (items) {
    items.forEach(function (i) {
      if (!i.isIntersecting) return;
      links.forEach(function (a) {
        a.style.color = a.getAttribute('href') === '#' + i.target.id && !a.classList.contains('cta') ? '#e0a93b' : '';
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('section[id]').forEach(function (s) { spy.observe(s); });
})();
