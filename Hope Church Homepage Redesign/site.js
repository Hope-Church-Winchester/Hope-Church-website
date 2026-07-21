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

  /* ---- What's On category filter ----
     Show/hide the activity cards by category. The buttons carry data-filter
     and the cards data-cat; "all" shows everything. (This behaviour used to
     live in the old runtime and is reproduced here.) */
  var filterBar = document.querySelector("[data-filterbar]");
  if (filterBar) {
    var filterBtns = Array.prototype.slice.call(filterBar.querySelectorAll("[data-filter]"));
    var mcards = Array.prototype.slice.call(document.querySelectorAll("[data-mcard]"));
    var setActiveFilter = function (active) {
      filterBtns.forEach(function (b) {
        var on = b === active;
        b.style.background = on ? "rgb(13, 27, 62)" : "transparent";
        b.style.color = on ? "rgb(255, 255, 255)" : "rgb(35, 34, 32)";
        b.style.borderColor = on ? "rgb(13, 27, 62)" : "rgba(35, 34, 32, 0.2)";
      });
    };
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter");
        setActiveFilter(btn);
        mcards.forEach(function (card) {
          var show = f === "all" || card.getAttribute("data-cat") === f;
          card.style.display = show ? "flex" : "none";
        });
      });
    });
  }

  /* ---- GA4 conversion events ----
     Fires a named event when a visitor clicks one of the key actions, so we
     can track them as conversions in Google Analytics. No-ops if GA isn't
     loaded (e.g. blocked by an ad blocker). */
  function eventForLink(a) {
    var h = (a.getAttribute("href") || "").toLowerCase();
    var t = (a.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
    var tn = t.replace(/['‘’`]/g, ""); // apostrophe-stripped, e.g. "im new"
    var cs = h.indexOf("churchsuite") > -1;

    // Newcomer-intent actions (highest value for integration)
    if (h.indexOf("mailto:welcome@") > -1) return "welcome_email";
    if ((t.indexOf("plan") > -1 && t.indexOf("visit") > -1) ||
        tn.indexOf("im new") > -1) return "plan_visit";

    // Giving
    if (h.indexOf("/donate/") > -1) return "give_click";

    // ChurchSuite sign-ups
    if (cs && h.indexOf("addressbook/form") > -1) return "newsletter_signup";
    if (cs && (h.indexOf("/events/") > -1 || h.indexOf("/-/forms/") > -1)) return "event_signup";
    if (cs) return "churchsuite_click";

    // Teaching engagement
    if (h.indexOf("youtube.com") > -1 || h.indexOf("youtu.be") > -1) return "watch_click";
    if (h.indexOf("spotify.com") > -1 || h.indexOf("pod.link") > -1 ||
        h.indexOf("soundcloud.com") > -1 || h.indexOf("podcasts.apple.com") > -1) return "listen_click";

    // General contact / social
    if (h.indexOf("mailto:") === 0) return "email_click";
    if (h.indexOf("facebook.com") > -1 || h.indexOf("instagram.com") > -1) return "social_click";
    return null;
  }
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    var name = eventForLink(a);
    if (!name || typeof window.gtag !== "function") return;
    window.gtag("event", name, {
      link_url: a.href,
      link_text: (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 100),
      page_path: location.pathname,
      transport_type: "beacon"
    });
  }, true);
})();
