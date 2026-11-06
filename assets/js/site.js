// Small enhancements only: the site works without JavaScript.
(function () {
  // Header gets a border once the page scrolls.
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Feature list switches the phone's screenshot.
  var shot = document.getElementById("feature-shot");
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".feature-tab"));
  var spanSwitch = document.querySelector(".span-switch");
  var spanButtons = spanSwitch ? Array.prototype.slice.call(spanSwitch.querySelectorAll("button")) : [];
  function show(src, alt) {
    if (!shot || shot.getAttribute("src") === src) return;
    shot.style.opacity = "0";
    setTimeout(function () {
      shot.src = src;
      shot.alt = alt;
      shot.style.opacity = "1";
    }, 180);
  }
  function pressSpan(button) {
    spanButtons.forEach(function (b) { b.setAttribute("aria-pressed", b === button ? "true" : "false"); });
    show(button.dataset.src, button.dataset.alt);
  }
  spanButtons.forEach(function (b) {
    b.addEventListener("click", function () { pressSpan(b); });
  });
  function select(tab) {
    tabs.forEach(function (t) {
      t.setAttribute("aria-selected", t === tab ? "true" : "false");
      t.tabIndex = t === tab ? 0 : -1;
    });
    var trends = tab.hasAttribute("data-trends");
    if (spanSwitch) spanSwitch.hidden = !trends;
    if (trends) {
      var pressed = spanButtons.filter(function (b) { return b.getAttribute("aria-pressed") === "true"; })[0];
      if (pressed) { show(pressed.dataset.src, pressed.dataset.alt); return; }
    }
    show(tab.dataset.src, tab.dataset.alt);
  }
  tabs.forEach(function (tab, i) {
    tab.tabIndex = tab.getAttribute("aria-selected") === "true" ? 0 : -1;
    tab.addEventListener("click", function () { select(tab); });
    tab.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (next) {
        e.preventDefault();
        next.focus();
        select(next);
      }
    });
  });
  // Warm the cache so switching is instant.
  tabs.concat(spanButtons).forEach(function (t) { var img = new Image(); img.src = t.dataset.src; });

  // Reveal sections as they scroll in.
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Current year in the footer.
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
