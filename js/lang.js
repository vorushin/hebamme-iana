(function () {
  "use strict";

  var LANGS = ["de", "en", "uk", "ru"];
  var STRINGS = {
    de: { text: "Diese Website gibt es auch auf Deutsch.", link: "Zu Deutsch wechseln", close: "Hinweis schliessen" },
    en: { text: "This website is also available in English.", link: "Switch to English", close: "Dismiss" },
    uk: { text: "Цей сайт доступний українською.", link: "Перейти на українську", close: "Закрити" },
    ru: { text: "Этот сайт доступен на русском.", link: "Перейти на русский", close: "Закрыть" }
  };
  var CHOICE_KEY = "hi-lang";
  var DISMISS_KEY = "hi-banner-dismissed";

  function store(key, value) { try { localStorage.setItem(key, value); } catch (e) {} }
  function read(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  /* '/en/' -> '/', '/hebamme-iana/uk/index.html' -> '/hebamme-iana/' */
  function siteBase() {
    return location.pathname
      .replace(/(?:en|uk|ru)\/(?:index\.html)?$/, "")
      .replace(/index\.html$/, "");
  }
  function pathFor(lang) { return siteBase() + (lang === "de" ? "" : lang + "/"); }
  function pageLang() { return (document.documentElement.lang || "de").slice(0, 2); }

  function initLangBanner(preferred) {
    if (read(CHOICE_KEY) || read(DISMISS_KEY)) { return; }
    var current = pageLang();
    var wanted = null;
    for (var i = 0; i < (preferred || []).length; i++) {
      var code = String(preferred[i]).slice(0, 2).toLowerCase();
      if (LANGS.indexOf(code) !== -1) { wanted = code; break; }
    }
    if (!wanted || wanted === current) { return; }

    var s = STRINGS[wanted];
    var banner = document.createElement("div");
    banner.className = "lang-banner";
    banner.setAttribute("role", "region");
    banner.setAttribute("lang", wanted);
    banner.setAttribute("aria-label", s.text);

    var text = document.createElement("span");
    text.textContent = s.text;

    var link = document.createElement("a");
    link.className = "lang-banner-link";
    link.href = pathFor(wanted);
    link.textContent = s.link;
    link.addEventListener("click", function () { store(CHOICE_KEY, wanted); });

    var close = document.createElement("button");
    close.className = "lang-banner-close";
    close.type = "button";
    close.setAttribute("aria-label", s.close);
    close.textContent = "×";
    close.addEventListener("click", function () {
      store(DISMISS_KEY, "1");
      banner.remove();
    });

    banner.appendChild(text);
    banner.appendChild(link);
    banner.appendChild(close);
    document.body.insertBefore(banner, document.body.firstChild);
  }

  document.querySelectorAll("a[data-lang]").forEach(function (a) {
    a.addEventListener("click", function () {
      store(CHOICE_KEY, a.getAttribute("data-lang"));
    });
  });

  initLangBanner(navigator.languages || [navigator.language || "de"]);

  /* manual test hook: clear storage, then initLangBanner(['uk']) in console */
  window.initLangBanner = initLangBanner;
})();
