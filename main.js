/* Sadie Gardere — site interactions
   Plain JavaScript, no dependencies. */
(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".primary-nav");
  var closeNav = function () {
    if (!nav) return;
    nav.classList.remove("open");
    document.body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  };
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
  }

  /* ---------- Toast helper ---------- */
  var toastEl = document.querySelector("[data-toast]");
  var toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.hidden = false;
    requestAnimationFrame(function () { toastEl.classList.add("show"); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
      setTimeout(function () { toastEl.hidden = true; }, 350);
    }, 4200);
  }

  /* ---------- Hero rotation (art + quote together) ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll(".hero-slide"));
  var quotes = Array.prototype.slice.call(document.querySelectorAll(".hero-quote"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".hero-dots .dot"));
  var current = 0, heroTimer;

  function showHero(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) { s.classList.toggle("is-active", n === current); });
    quotes.forEach(function (q, n) { q.classList.toggle("is-active", n === current); });
    dots.forEach(function (d, n) { d.classList.toggle("is-active", n === current); });
  }
  function startHero() {
    clearInterval(heroTimer);
    if (slides.length > 1) heroTimer = setInterval(function () { showHero(current + 1); }, 6500);
  }
  dots.forEach(function (d, n) {
    d.addEventListener("click", function () { showHero(n); startHero(); });
  });
  if (slides.length) { showHero(0); startHero(); }

  /* ---------- Newsletter signup (interim: route to inbox) ----------
     Until Sadie picks Substack / Kit, every signup opens a pre-filled
     email to info@sadiegardere.com so no subscriber is lost. */
  document.querySelectorAll("[data-subscribe]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var email = input ? input.value.trim() : "";
      if (!email) return;
      var subject = encodeURIComponent("Subscribe me to Letters from Sadie");
      var body = encodeURIComponent("Please add me to Letters from Sadie:\n" + email);
      window.location.href = "mailto:info@sadiegardere.com?subject=" + subject + "&body=" + body;
      form.reset();
      toast("Thank you — your email app will open. Just hit send to confirm.");
    });
  });

  /* ---------- "Coming soon" links ---------- */
  document.querySelectorAll("[data-soon-link]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      toast("Coming soon — check back as the launch unfolds.");
    });
  });

  /* ---------- "Get notified" → jump to and focus the newsletter field ---------- */
  document.querySelectorAll("[data-focus-email]").forEach(function (el) {
    el.addEventListener("click", function () {
      var input = document.querySelector('#letters input[type="email"]');
      if (input) setTimeout(function () { input.focus({ preventScroll: true }); }, 600);
    });
  });
})();
