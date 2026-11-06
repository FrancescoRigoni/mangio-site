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
  function select(tab) {
    tabs.forEach(function (t) {
      t.setAttribute("aria-selected", t === tab ? "true" : "false");
      t.tabIndex = t === tab ? 0 : -1;
    });
    if (!shot || shot.getAttribute("src") === tab.dataset.src) return;
    shot.style.opacity = "0";
    setTimeout(function () {
      shot.src = tab.dataset.src;
      shot.alt = tab.dataset.alt;
      shot.style.opacity = "1";
    }, 180);
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
  tabs.forEach(function (t) { var img = new Image(); img.src = t.dataset.src; });

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
