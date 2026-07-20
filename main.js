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

  /* ---------- Newsletter signup → MailerLite ----------
     Submits to MailerLite form Q8wdEv (account 2521236) via its public JSONP
     endpoint, enrolling subscribers into the "Sadie" group with the form's
     double opt-in. These are public embed IDs — safe to ship, no secrets. */
  var ML_SUBSCRIBE = "https://assets.mailerlite.com/jsonp/2521236/forms/193533340735767973/subscribe";
  var mlPending = null;
  window.mlWebformSubmitted = function (data) {
    var cb = mlPending; mlPending = null; if (cb) cb(data);
  };
  function mlSubscribe(email) {
    return new Promise(function (resolve) {
      var script, timer, done = false;
      function finish(res) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        if (script && script.parentNode) script.parentNode.removeChild(script);
        resolve(res);
      }
      mlPending = function (data) { finish({ ok: !!(data && data.success), data: data }); };
      var guid = (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
        : String(Date.now()) + "-" + Math.random().toString(16).slice(2);
      script = document.createElement("script");
      script.src = ML_SUBSCRIBE + "?callback=mlWebformSubmitted"
        + "&fields%5Bemail%5D=" + encodeURIComponent(email)
        + "&ml-submit=1&anticsrf=true&ajax=1&guid=" + guid + "&_=" + Date.now();
      script.onerror = function () { finish({ ok: false, network: true }); };
      timer = setTimeout(function () { finish({ ok: false, network: true }); }, 10000);
      document.body.appendChild(script);
    });
  }
  function subStatus(form) {
    return form.parentElement ? form.parentElement.querySelector(".subscribe-status") : null;
  }
  function showSub(form, kind, msg) {
    var el = subStatus(form);
    if (!el) return;
    el.textContent = msg;
    el.classList.remove("is-success", "is-error");
    el.classList.add("is-" + kind);
    el.hidden = false;
  }
  document.querySelectorAll("[data-subscribe]").forEach(function (form) {
    var btn = form.querySelector('button[type="submit"]');
    var label = btn ? btn.textContent : "Subscribe";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var email = input ? input.value.trim() : "";
      if (!email) return;
      var status = subStatus(form);
      if (status) status.hidden = true;
      if (btn) { btn.disabled = true; btn.textContent = "Subscribing…"; }
      mlSubscribe(email).then(function (res) {
        if (btn) { btn.disabled = false; btn.textContent = label; }
        if (res.ok) {
          showSub(form, "success", "Thanks — check your inbox to confirm your subscription.");
          form.reset();
        } else if (res.data && res.data.errors && res.data.errors.fields && res.data.errors.fields.email) {
          showSub(form, "error", res.data.errors.fields.email[0]);
        } else {
          showSub(form, "error", "Something went wrong — please try again, or email info@sadiegardere.com.");
        }
      });
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
