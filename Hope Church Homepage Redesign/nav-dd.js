/* Nav dropdown behaviour (see nav-dd.css).
   Desktop: opens on mouse hover, or on click/tap/Enter/Space; closes on Escape,
   outside click or focus leaving the group. Mobile: tap-to-expand accordion.
   Progressive enhancement — without JS the groups simply stay closed. */
(function () {
  "use strict";

  var here = location.pathname.replace(/\/+$/, "").split("/").pop().replace(/\.html$/, "") || "index";

  // Mark the link for the page we're on, and flag its group.
  Array.prototype.forEach.call(document.querySelectorAll(".nav-dd-list a, .m-dd-panel a"), function (a) {
    var href = a.getAttribute("href") || "";
    if (/^https?:|#/.test(href)) return;
    if (href.replace(/\.html$/, "") === here) {
      a.setAttribute("aria-current", "page");
      var group = a.closest(".nav-dd, .m-dd");
      if (group) group.classList.add("current");
    }
  });

  /* ---- desktop dropdowns ---- */
  var groups = Array.prototype.slice.call(document.querySelectorAll(".nav-dd"));
  var closeTimer;

  function setOpen(g, open) {
    g.classList.toggle("open", open);
    g.querySelector(".nav-dd-btn").setAttribute("aria-expanded", open ? "true" : "false");
  }
  function closeAll(except) {
    groups.forEach(function (g) { if (g !== except) setOpen(g, false); });
  }

  groups.forEach(function (g) {
    var btn = g.querySelector(".nav-dd-btn");

    btn.addEventListener("click", function () {
      // A mouse user who hovered the group open and then clicks it expects it
      // to stay open, not flip shut.
      if (g._byHover) { g._byHover = false; return; }
      var willOpen = !g.classList.contains("open");
      closeAll(g);
      setOpen(g, willOpen);
    });

    // Mouse only — touch taps also fire mouseenter-style events, which would
    // open then immediately re-close the menu via the click handler.
    g.addEventListener("pointerenter", function (e) {
      if (e.pointerType !== "mouse") return;
      clearTimeout(closeTimer);
      closeAll(g);
      g._byHover = !g.classList.contains("open");
      setOpen(g, true);
    });
    g.addEventListener("pointerleave", function (e) {
      if (e.pointerType !== "mouse") return;
      g._byHover = false;
      closeTimer = setTimeout(function () { setOpen(g, false); }, 120);
    });

    g.addEventListener("focusout", function (e) {
      if (!g.contains(e.relatedTarget)) setOpen(g, false);
    });
    g.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && g.classList.contains("open")) {
        setOpen(g, false);
        btn.focus();
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-dd")) closeAll();
  });

  /* ---- mobile accordion ---- */
  Array.prototype.forEach.call(document.querySelectorAll(".m-dd"), function (g) {
    var btn = g.querySelector(".m-dd-btn");
    if (g.classList.contains("current")) {
      g.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
    btn.addEventListener("click", function () {
      var open = !g.classList.contains("open");
      g.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
})();
