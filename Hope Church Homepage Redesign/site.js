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
    // Close the menu if the viewport grows back to where the desktop nav shows.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1160) setMenu(false);
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

  /* ---- GA4 conversion events ----
     Fires a named event when a visitor clicks one of the key actions, so we
     can track them as conversions in Google Analytics. No-ops if GA isn't
     loaded (e.g. blocked by an ad blocker). */
  function eventForHref(h) {
    if (!h) return null;
    var l = h.toLowerCase();
    if (l.indexOf("mailto:") === 0) return "email_click";
    if (l.indexOf("/donate/") > -1) return "give_click";        // ChurchSuite giving
    if (l.indexOf("churchsuite.co") > -1) return "churchsuite_click"; // .com + .co.uk
    if (l.indexOf("youtube.com") > -1 || l.indexOf("youtu.be") > -1) return "watch_click";
    if (l.indexOf("spotify.com") > -1 || l.indexOf("pod.link") > -1 ||
        l.indexOf("soundcloud.com") > -1 || l.indexOf("podcasts.apple.com") > -1) return "listen_click";
    if (l.indexOf("facebook.com") > -1 || l.indexOf("instagram.com") > -1) return "social_click";
    return null;
  }
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    var name = eventForHref(a.getAttribute("href"));
    if (!name || typeof window.gtag !== "function") return;
    window.gtag("event", name, {
      link_url: a.href,
      link_text: (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 100),
      page_path: location.pathname,
      transport_type: "beacon"
    });
  }, true);
})();
