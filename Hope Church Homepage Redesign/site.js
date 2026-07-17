/* Hope Church Winchester — shared interactions.
   Progressive enhancement only: every page renders fully without this file.
   Reproduces the small amount of behaviour the old runtime provided —
   mobile menu toggle, nav background on scroll, hero parallax, scroll reveal. */
(function () {
  "use strict";

  var nav     = document.querySelector("nav");
  var burger  = document.querySelector("[data-hamburger]");
  var menu    = document.querySelector("[data-menu]");
  var heroBg  = document.querySelector("[data-hero-bg]");

  var NAV_SOLID  = "rgba(8,15,30,0.96)";
  var NAV_GRADIENT =
    "linear-gradient(to bottom,rgba(8,15,30,0.8),rgba(8,15,30,0.35) 60%,transparent)";

  /* ---- mobile menu ---- */
  if (burger && menu) {
    var setMenu = function (open) {
      menu.style.display = open ? "flex" : "none";
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    };
    setMenu(false);
    burger.addEventListener("click", function () {
      setMenu(menu.style.display !== "flex");
    });
    Array.prototype.forEach.call(menu.querySelectorAll("a"), function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    // Close the menu if the viewport grows back to desktop.
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1080) setMenu(false);
    });
  }

  /* ---- nav background + hero parallax on scroll ---- */
  function onScroll() {
    var y = window.scrollY || window.pageYOffset || 0;
    if (nav) {
      if (y > 40) {
        nav.style.background = NAV_SOLID;
        nav.style.backdropFilter = "blur(16px)";
        nav.style.webkitBackdropFilter = "blur(16px)";
        nav.style.borderBottom = "1px solid rgba(255,255,255,0.06)";
      } else {
        nav.style.background = NAV_GRADIENT;
        nav.style.backdropFilter = "";
        nav.style.webkitBackdropFilter = "";
        nav.style.borderBottom = "";
      }
    }
    if (heroBg) heroBg.style.transform = "translateY(" + (y * 0.18) + "px)";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- scroll reveal ---- */
  var reveals = Array.prototype.slice.call(
    document.querySelectorAll("[data-reveal]")
  );
  if (reveals.length && "IntersectionObserver" in window) {
    reveals.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(26px)";
      el.style.transition =
        "opacity .7s cubic-bezier(0.2,0,0,1), transform .7s cubic-bezier(0.2,0,0,1)";
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "none";
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
    // Safety net: never leave content hidden.
    setTimeout(function () {
      reveals.forEach(function (el) {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    }, 1600);
  }
})();
