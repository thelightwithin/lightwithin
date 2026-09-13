/*
 * Nova motion system — runs on every page (loaded by BaseLayout).
 *   1. starfields        — populates .stars containers
 *   2. scroll reveals    — .fx / .fx-img / .fx-caps via IntersectionObserver
 *   3. parallax layers   — .plx elements with data-plx factors
 *   4. inertial scroll   — wheel-only smooth scroll; touch/keyboard stay native
 *   5. anchor glide      — same-page #links ride the same easing
 * Everything respects prefers-reduced-motion.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = window.matchMedia('(pointer: coarse)').matches;

/* ---------- starfields ---------- */
document.querySelectorAll('.stars').forEach(function (field) {
  for (let i = 0; i < 110; i++) {
    const s = document.createElement('i');
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.opacity = (0.2 + Math.random() * 0.8).toFixed(2);
    const sz = Math.random() < 0.86 ? 1 : 2;
    s.style.width = sz + 'px';
    s.style.height = sz + 'px';
    if (!reduceMotion && Math.random() < 0.3) {
      s.className = 'tw';
      s.style.setProperty('--tw', (2.5 + Math.random() * 4).toFixed(1) + 's');
      s.style.animationDelay = (Math.random() * 4).toFixed(1) + 's';
    }
    field.appendChild(s);
  }
});

/* ---------- scroll reveals ---------- */
const revealables = document.querySelectorAll('.fx, .fx-img, .fx-caps');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealables.forEach(function (el) { el.classList.add('in'); });
} else {
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });
  revealables.forEach(function (el) { io.observe(el); });
}

/* ---------- parallax layers ---------- */
const plxEls = [];
document.querySelectorAll('.plx').forEach(function (el) {
  plxEls.push({ el: el, f: parseFloat(el.getAttribute('data-plx') || '0.1'), parent: el.closest('section') });
});
let ticking = false;
function parallax() {
  ticking = false;
  const vh = window.innerHeight;
  plxEls.forEach(function (p) {
    if (!p.parent) return;
    const r = p.parent.getBoundingClientRect();
    if (r.bottom < -80 || r.top > vh + 80) return;
    const center = r.top + r.height / 2 - vh / 2; /* 0 when section centered */
    p.el.style.transform = 'translateY(' + (center * -p.f).toFixed(1) + 'px)';
  });
}
function onScrollParallax() {
  if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
}
if (!reduceMotion && plxEls.length) {
  window.addEventListener('scroll', onScrollParallax, { passive: true });
  window.addEventListener('resize', onScrollParallax);
  parallax();
}

/* ---------- inertial smooth scroll (wheel only; touch + keyboard stay native) ---------- */
const smoothOn = !reduceMotion && !coarse;
let target = window.scrollY, current = window.scrollY, animating = false;
function maxScroll() { return document.documentElement.scrollHeight - window.innerHeight; }
function loop() {
  current += (target - current) * 0.085;
  if (Math.abs(target - current) < 0.5) {
    current = target; animating = false;
    window.scrollTo(0, Math.round(current));
    return;
  }
  window.scrollTo(0, Math.round(current));
  requestAnimationFrame(loop);
}
function kick() { if (!animating) { animating = true; requestAnimationFrame(loop); } }
if (smoothOn) {
  window.addEventListener('wheel', function (e) {
    if (e.ctrlKey) return; /* keep pinch-zoom native */
    e.preventDefault();
    target = Math.max(0, Math.min(maxScroll(), target + e.deltaY));
    kick();
  }, { passive: false });
  window.addEventListener('scroll', function () {
    if (!animating) { target = current = window.scrollY; } /* stay in sync with native scrolls */
  }, { passive: true });
}
/* anchor links glide through the same easing (same-page #anchors only) */
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    const id = a.getAttribute('href');
    const dest = id === '#top' ? document.body : document.querySelector(id);
    if (!dest) return;
    e.preventDefault();
    let y = id === '#top' ? 0 : dest.getBoundingClientRect().top + window.scrollY;
    y = Math.max(0, Math.min(maxScroll(), y));
    if (smoothOn) { target = y; kick(); }
    else if (reduceMotion) { window.scrollTo(0, y); }
    else { window.scrollTo({ top: y, behavior: 'smooth' }); }
  });
});
