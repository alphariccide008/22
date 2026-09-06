/* SabioCast — static site behaviour. No framework. */
(function () {
  "use strict";

  /* ---------- header ---------- */
  var header = document.querySelector("[data-header]");
  function onScroll() {
    if (!header) return;
    header.setAttribute("data-scrolled", window.scrollY > 8 ? "true" : "false");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- desktop dropdowns ---------- */
  var groups = Array.prototype.slice.call(document.querySelectorAll(".nav-group"));
  groups.forEach(function (group) {
    var btn = group.querySelector(".nav-trigger");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = group.getAttribute("data-open") === "true";
      groups.forEach(function (g) { g.setAttribute("data-open", "false"); });
      group.setAttribute("data-open", open ? "false" : "true");
      btn.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });
  document.addEventListener("click", function () {
    groups.forEach(function (g) { g.setAttribute("data-open", "false"); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") groups.forEach(function (g) { g.setAttribute("data-open", "false"); });
  });

  /* ---------- mobile menu ---------- */
  var burger = document.querySelector("[data-burger]");
  var mobile = document.querySelector("[data-mobile-menu]");
  if (burger && mobile) {
    burger.addEventListener("click", function () {
      var open = mobile.hasAttribute("hidden") === false;
      if (open) {
        mobile.setAttribute("hidden", "");
        document.body.style.overflow = "";
        burger.setAttribute("aria-expanded", "false");
      } else {
        mobile.removeAttribute("hidden");
        document.body.style.overflow = "hidden";
        burger.setAttribute("aria-expanded", "true");
      }
      burger.setAttribute("data-open", open ? "false" : "true");
    });
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobile.setAttribute("hidden", "");
        document.body.style.overflow = "";
        burger.setAttribute("data-open", "false");
      });
    });
  }

  /* ---------- mobile submenu accordions ---------- */
  document.querySelectorAll("[data-msub-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var li = btn.closest("[data-msub]");
      if (!li) return;
      li.setAttribute("data-open", li.getAttribute("data-open") === "true" ? "false" : "true");
    });
  });

  /* ---------- FAQ accordions ---------- */
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      if (!item) return;
      var open = item.getAttribute("data-open") === "true";
      var group = item.closest(".faq-group") || document;
      group.querySelectorAll(".faq-item").forEach(function (i) {
        i.setAttribute("data-open", "false");
        var b = i.querySelector(".faq-q");
        if (b) b.setAttribute("aria-expanded", "false");
      });
      item.setAttribute("data-open", open ? "false" : "true");
      btn.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });

  /* ---------- scroll reveal ---------- */
  try {
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
      var root = document.documentElement;
      root.classList.add("js-anim");
      var els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
      var vh = window.innerHeight;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          if (el.dataset.delay) el.style.transitionDelay = el.dataset.delay + "ms";
          el.classList.add("in-view");
          io.unobserve(el);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
      els.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.9) el.classList.add("in-view");
        else io.observe(el);
      });
      setTimeout(function () {
        els.forEach(function (el) { el.classList.add("in-view"); });
      }, 3000);
    }
  } catch (e) { /* noop */ }

  /* ---------- video frames ---------- */
  document.querySelectorAll("[data-video]").forEach(function (frame) {
    var btn = frame.querySelector("[data-video-play]");
    var id = frame.getAttribute("data-youtube");
    if (btn && id) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var iframe = document.createElement("iframe");
        iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0&modestbranding=1";
        iframe.title = frame.getAttribute("data-label") || "Video";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0;";
        frame.innerHTML = "";
        frame.appendChild(iframe);
      });
    }
  });

  /* ---------- lead forms ---------- */
  var TG = window.SABIOCAST_CONFIG || {};
  var LABELS = {
    firstName: "First name", lastName: "Last name", name: "Name", email: "Business email",
    company: "Company", website: "Website", country: "Country", product: "Product of interest",
    question: "Question", purpose: "Purpose of trial", hearAbout: "How did you hear about us",
    findUs: "How did you find us", newsletter: "Newsletter opt-in"
  };
  var ORDER = ["name", "firstName", "lastName", "email", "company", "website", "country", "product", "purpose", "question", "hearAbout", "findUs", "newsletter"];
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  document.querySelectorAll("form[data-lead]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector("button[type=submit]");
      var errBox = form.querySelector("[data-form-error]");
      var type = form.getAttribute("data-lead");
      var fd = new FormData(form);
      var data = {};
      fd.forEach(function (v, k) { data[k] = String(v); });
      if (form.querySelector("[name=newsletter]")) data.newsletter = fd.get("newsletter") ? "yes" : "no";

      if (data.company_url) { showSuccess(form); return; }
      if (!data.email || data.email.indexOf("@") === -1) { showError(errBox, "A valid business email is required."); return; }
      if (!TG.token || !TG.chatId) { showError(errBox, "The form isn't configured yet. Please email hello@sabiocast.com."); return; }

      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Sending…"; }
      if (errBox) errBox.hidden = true;

      var title = type === "trial" ? "Trial request" : "Contact enquiry";
      var lines = ["<b>🔔 SabioCast — " + title + "</b>", ""];
      ORDER.forEach(function (k) {
        var v = (data[k] || "").trim();
        if (v) lines.push("<b>" + (LABELS[k] || k) + ":</b> " + esc(v));
      });
      lines.push("", "<i>" + new Date().toUTCString() + "</i>");

      fetch("https://api.telegram.org/bot" + TG.token + "/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TG.chatId, text: lines.join("\n"), parse_mode: "HTML", disable_web_page_preview: true })
      }).then(function (res) {
        if (res.ok) showSuccess(form);
        else { restore(btn); showError(errBox, "Couldn't send your message. Please try again or email us."); }
      }).catch(function () {
        restore(btn); showError(errBox, "Network error. Please try again.");
      });
    });
  });

  function restore(btn) { if (btn) { btn.disabled = false; if (btn.dataset.label) btn.textContent = btn.dataset.label; } }
  function showError(box, msg) { if (box) { box.textContent = msg; box.hidden = false; } }
  function showSuccess(form) {
    var ok = form.getAttribute("data-success") ||
      "Thanks — we've got it. A member of the team will reply within one working day.";
    var wrap = document.createElement("div");
    wrap.className = "rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center";
    wrap.innerHTML =
      '<div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white">' +
      '<svg viewBox="0 0 20 20" class="h-5 w-5" fill="none"><path d="m5 10.5 3.5 3.5L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
      '<h3 class="mt-4 text-lg font-bold text-ink-900">Thank you</h3>' +
      '<p class="mt-2 text-sm text-ink-600">' + ok + "</p>";
    form.replaceWith(wrap);
  }

  /* ---------- contact intent banner ---------- */
  try {
    var params = new URLSearchParams(location.search);
    if (params.get("intent") === "quote") {
      var b = document.querySelector("[data-quote-banner]");
      if (b) b.hidden = false;
    }
  } catch (e) { /* noop */ }

  /* ---------- footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
