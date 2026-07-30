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

/* ---- Site search (client-side, no external service) ----
   Injects a magnifier button into the nav (desktop) and mobile menu, plus a
   search overlay. Searches a prebuilt search-index.json of every page. */
(function () {
  "use strict";
  var nav = document.querySelector("nav");
  if (!nav) return;

  var css = document.createElement("style");
  css.textContent = [
    "[data-search-open]{background:transparent;border:none;cursor:pointer;padding:8px;display:inline-flex;align-items:center;color:#fff}",
    ".hcs-menu-btn{color:rgba(255,255,255,.8);font-family:Inter;font-size:22px;font-weight:400;padding:13px 0;display:flex;align-items:center;gap:12px;background:none;border:none;border-bottom:1px solid rgba(255,255,255,.08);width:100%;text-align:left;cursor:pointer}",
    "#hcs{position:fixed;inset:0;z-index:500;display:none}",
    "#hcs.open{display:block}",
    "#hcs .hcs-bd{position:absolute;inset:0;background:rgba(8,15,30,.75);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}",
    "#hcs .hcs-panel{position:relative;max-width:640px;margin:11vh auto 0;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 30px 80px -20px rgba(8,15,30,.6);max-height:78vh;display:flex;flex-direction:column}",
    "#hcs .hcs-top{display:flex;align-items:center;gap:12px;padding:18px 20px;border-bottom:1px solid rgba(35,34,32,.1)}",
    "#hcs input{flex:1;border:none;outline:none;font-family:Inter;font-size:19px;color:#0D1B3E;background:transparent;-webkit-appearance:none}",
    "#hcs input::-webkit-search-cancel-button{-webkit-appearance:none;appearance:none;display:none}",
    "#hcs .hcs-close{background:none;border:none;cursor:pointer;color:#8a837a;font-size:20px;line-height:1;padding:4px}",
    "#hcs .hcs-results{overflow-y:auto;padding:6px 0}",
    "#hcs a.hcs-hit{display:block;padding:14px 20px;text-decoration:none;border-bottom:1px solid rgba(35,34,32,.06)}",
    "#hcs a.hcs-hit:hover{background:rgba(63,92,170,.06)}",
    "#hcs .hcs-hit-t{font-family:Inter;font-weight:600;font-size:16px;color:#0D1B3E;margin-bottom:3px}",
    "#hcs .hcs-hit-s{font-family:Inter;font-size:14px;line-height:1.5;color:#5b5650}",
    "#hcs .hcs-hit-s mark{background:rgba(163,192,232,.55);color:inherit;padding:0 1px;border-radius:2px}",
    "#hcs .hcs-msg{padding:22px 20px;font-family:Inter;font-size:15px;color:#8a837a}",
    "@media (max-width:559px){#hcs .hcs-panel{margin:0;max-width:none;height:100%;max-height:none;border-radius:0}}"
  ].join("");
  document.head.appendChild(css);

  var MAG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';

  var ctas = nav.querySelector("[data-navctas]");
  if (ctas) {
    var db = document.createElement("button");
    db.setAttribute("data-search-open", "");
    db.setAttribute("aria-label", "Search the site");
    db.innerHTML = MAG;
    db.style.order = "-1";
    ctas.insertBefore(db, ctas.firstChild);
  }
  var menu = document.querySelector("[data-menu]");
  if (menu) {
    var mb = document.createElement("button");
    mb.className = "hcs-menu-btn";
    mb.setAttribute("data-search-open", "");
    mb.innerHTML = MAG + "<span>Search</span>";
    menu.insertBefore(mb, menu.firstChild);
  }

  var ov = document.createElement("div");
  ov.id = "hcs";
  ov.innerHTML =
    '<div class="hcs-bd" data-search-close></div>' +
    '<div class="hcs-panel" role="dialog" aria-modal="true" aria-label="Search">' +
      '<div class="hcs-top"><span style="color:#8a837a;display:inline-flex;flex-shrink:0">' + MAG + '</span>' +
        '<input type="search" placeholder="Search the site…" aria-label="Search the site">' +
        '<button class="hcs-close" data-search-close aria-label="Close search">✕</button>' +
      '</div>' +
      '<div class="hcs-results"></div>' +
    '</div>';
  document.body.appendChild(ov);

  var input = ov.querySelector("input");
  var results = ov.querySelector(".hcs-results");
  var index = null, loading = false;

  function openSearch() {
    if (menu) menu.style.display = "none";
    var burger = document.querySelector("[data-hamburger]");
    if (burger) burger.setAttribute("aria-expanded", "false");
    ov.classList.add("open");
    document.documentElement.style.overflow = "hidden";
    setTimeout(function () { input.focus(); }, 30);
    if (!index && !loading) loadIndex();
    else render(input.value);
  }
  function closeSearch() {
    ov.classList.remove("open");
    document.documentElement.style.overflow = "";
  }
  function loadIndex() {
    loading = true;
    results.innerHTML = '<div class="hcs-msg">Loading…</div>';
    fetch("search-index.json").then(function (r) { return r.json(); }).then(function (d) {
      index = d; loading = false; render(input.value);
    }).catch(function () {
      results.innerHTML = '<div class="hcs-msg">Search is unavailable right now.</div>';
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function snippet(text, terms) {
    var low = text.toLowerCase(), pos = -1, i;
    for (i = 0; i < terms.length; i++) {
      var p = low.indexOf(terms[i]);
      if (p > -1 && (pos < 0 || p < pos)) pos = p;
    }
    if (pos < 0) pos = 0;
    var start = Math.max(0, pos - 50), end = Math.min(text.length, pos + 120);
    var frag = (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
    frag = esc(frag);
    terms.forEach(function (t) {
      if (!t) return;
      var re = new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
      frag = frag.replace(re, "<mark>$1</mark>");
    });
    return frag;
  }

  function render(q) {
    q = (q || "").trim().toLowerCase();
    if (!index) return;
    if (q.length < 2) { results.innerHTML = '<div class="hcs-msg">Type to search across the site.</div>'; return; }
    var terms = q.split(/\s+/).filter(Boolean);
    var scored = index.map(function (e) {
      var t = e.title.toLowerCase(), h = (e.headings || []).join(" ").toLowerCase(), c = e.content.toLowerCase();
      var score = 0, all = true;
      terms.forEach(function (term) {
        var inT = t.indexOf(term) > -1, inH = h.indexOf(term) > -1, inC = c.indexOf(term) > -1;
        if (inT) score += 10;
        if (inH) score += 4;
        var m = c.split(term).length - 1;
        score += Math.min(m, 5);
        if (!(inT || inH || inC)) all = false;
      });
      return { e: e, score: all ? score : 0 };
    }).filter(function (x) { return x.score > 0; }).sort(function (a, b) { return b.score - a.score; });
    if (!scored.length) { results.innerHTML = '<div class="hcs-msg">No results for “' + esc(q) + '”.</div>'; return; }
    results.innerHTML = scored.slice(0, 8).map(function (x) {
      return '<a class="hcs-hit" href="' + x.e.url + '"><div class="hcs-hit-t">' + esc(x.e.title) +
        '</div><div class="hcs-hit-s">' + snippet(x.e.content, terms) + "</div></a>";
    }).join("");
  }

  document.addEventListener("click", function (e) {
    var o = e.target.closest ? e.target.closest("[data-search-open]") : null;
    if (o) { e.preventDefault(); openSearch(); return; }
    var c = e.target.closest ? e.target.closest("[data-search-close]") : null;
    if (c) { e.preventDefault(); closeSearch(); }
  });
  input.addEventListener("input", function () { render(input.value); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && ov.classList.contains("open")) closeSearch();
  });
})();
