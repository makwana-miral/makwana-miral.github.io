(function () {
  /* ---------- Translations ----------
     French is the page's source language and is written directly in
     index.html; it is captured from the DOM on load. Only English lives
     here. Each key matches a data-i18n attribute in index.html. */
  var translations = {
    en: {
      "meta.title": "Miral Makwana",
      "nav.home": "Home",
      "nav.experience": "Experience",
      "nav.education": "Education",
      "nav.skills": "Skills",
      "nav.portfolio": "Portfolio",
      "nav.contact": "Contact",

      "home.title":
        "Translator (French > English and Hindi)",
      "home.lead":
        "I am a multilingual professional with a Master's degree in Specialised Translation from INALCO, Paris.",
      "home.services.intro": "Here are the services I propose:",
      "home.services.list":
        "<li>Translation of comics, books for children and subtitles</li>" +
        "<li>Teaching English to any kind of public</li>" +
        "<li>Linguistic mediation project</li>" +
        "<li>Cultural & Linguistic project management</li>",

      "experience.heading": "Work Experience",

      "exp.verba.role": "Translation Project Management Internship",
      "exp.verba.dates": "(October–November 2025)",
      "exp.verba.desc":
        "<li>Management of multilingual translation projects</li>" +
        "<li>Planning and monitoring workflows</li>" +
        "<li>Use of CAT tools</li>",

      "exp.pfe.role": "Translation and Communication Internship",
      "exp.pfe.dates": "(March–April 2025)",
      "exp.pfe.desc":
        "<li>Translation and adaptation of documents for sporting events</li>" +
        "<li>Management of multilingual communication with international partners</li>" +
        "<li>Development of a multilingual educational tool</li>",

      "exp.cesah.place": "— Aubervilliers, Seine-Saint-Denis (online)",
      "exp.cesah.role": "Transcription internship",
      "exp.cesah.dates": "(August–September 2024)",
      "exp.cesah.desc":
        "<li>Audio data transcription and processing</li>" +
        "<li>Linguistic and phonetic analysis</li>" +
        "<li>Use of transcription tools</li>",

      "exp.modlingua.place": "— Delhi, India (online)",
      "exp.modlingua.role": "Translation internship",
      "exp.modlingua.dates": "(March–May 2024)",
      "exp.modlingua.desc":
        "<li>Machine and AI-assisted translation</li>" +
        "<li>Creation and adaptation of multilingual social media content</li>" +
        "<li>Marketing and digital communication</li>",

      "exp.ceran.place": "— Belgium",
      "exp.ceran.role": "English teacher",
      "exp.ceran.dates": "(June–August 2023, 2024, 2025 and 2026)",
      "exp.ceran.desc":
        "<li>Teaching English to international learners of all levels</li>",

      "exp.fei.role": "English Language Assistant in France",
      "exp.fei.dates": "(October 2019 – April 2022)",
      "exp.fei.desc":
        "<li>Planning lessons to develop speaking skills</li>" +
        "<li>Leading small groups and educational activities</li>" +
        "<li>Promoting intercultural awareness and understanding</li>",

      "education.heading": "Education",

      "edu.inalco": "Institut National des Langues et Civilisations Orientales (INALCO)",
      "edu.master.school": "Institut National des Langues et Civilisations Orientales (INALCO)",
      "edu.master.degree": "Master's in Specialised Translation (English, French and Hindi)",
      "edu.master.desc": "Technical, economic, legal and scientific translation; localisation; translation project management; CAT tools.",

      "edu.l2.school": "Institut National des Langues et Civilisations Orientales (INALCO)",
      "edu.l2.degree": "Undergraduate Level 2 (Hindi): Didactics of World Languages and French as a Foreign Language (FLE)",
      "edu.l2.desc": "Hindi language and civilisation; linguistics; introduction to language teaching.",

      "edu.mumbai.school": "University of Mumbai (St. Xavier's College)",
      "edu.mumbai.place": "— Mumbai, India",
      "edu.mumbai.degree": "B. A in Sociology",
      "edu.mumbai.desc": "GPA 3.23/4.00 — Sociological theory; sociological research methods; media, culture and society; subaltern studies.",

      "skills.heading": "Skills &amp; Languages",
      "skills.languages": "Languages",
      "skills.languages.list":
        "<li>English — C2</li><li>Hindi — C2</li><li>French — C1</li><li>Gujarati — C2</li><li>Marathi — B1</li>",
      "skills.technical": "Technical Skills",
      "skills.technical.list":
        "<li>Writing multilingual content</li>" +
        "<li>Project management</li>" +
        "<li>Proofreading</li>",
      "skills.digital": "Digital Skills",
      "skills.digital.list":
        "<li>Office suite</li>" +
        "<li>Canva</li>" +
        "<li>SDL Trados, MultiTerm, OmegaT</li>",

      "portfolio.heading": "Portfolio",
      "portfolio.intro": "A selection of my translation work: comics and subtitled YouTube videos.",
      "portfolio.comics": "Comics",
      "portfolio.videos": "YouTube videos",
      "portfolio.empty": "Portfolio coming soon.",

      "contact.heading": "Contact",
      "contact.email": "Email",
      "contact.location": "Location",

    }
  };

  var STORAGE_KEY = "lang";
  var i18nNodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  var langButtons = Array.prototype.slice.call(document.querySelectorAll(".lang-btn"));

  // Capture the French source text written in index.html.
  translations.fr = {};
  i18nNodes.forEach(function (node) {
    translations.fr[node.getAttribute("data-i18n")] = node.innerHTML.trim();
  });

  function setLanguage(lang) {
    if (!translations[lang]) lang = "fr";
    currentLang = lang;
    var dict = translations[lang];
    i18nNodes.forEach(function (node) {
      var value = dict[node.getAttribute("data-i18n")];
      if (value !== undefined) node.innerHTML = value;
    });
    document.documentElement.lang = lang;
    updatePortfolioLanguage(lang);
    langButtons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
    });
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function initialLanguage() {
    var fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl) return fromUrl;
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return stored;
    } catch (e) {}
    return (navigator.language || "fr").toLowerCase().indexOf("fr") === 0 ? "fr" : "en";
  }

  /* ---------- Portfolio ----------
     Cards are built once from window.PORTFOLIO (portfolio.js). On a
     language switch only their text is updated, so a playing video keeps
     playing. */
  var currentLang = "fr";
  var portfolioData = window.PORTFOLIO || { comics: [], videos: [] };
  var localizedNodes = []; // { node, value, attr? } where value is a string or { fr, en }

  var uiText = {
    fr: {
      viewPages: "Voir les planches",
      viewCover: "Voir la couverture",
      fullWork: "Voir l'œuvre complète",
      watchOnYoutube: "Voir sur YouTube",
      play: "Lire la vidéo",
      close: "Fermer",
      prev: "Page précédente",
      next: "Page suivante"
    },
    en: {
      viewPages: "View pages",
      viewCover: "View cover",
      fullWork: "See the full work",
      watchOnYoutube: "Watch on YouTube",
      play: "Play video",
      close: "Close",
      prev: "Previous page",
      next: "Next page"
    }
  };

  function pick(value, lang) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    return value[lang] || value.fr || value.en || "";
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // Registers a node whose text (or attribute) follows the current language.
  function localize(node, value, attr) {
    localizedNodes.push({ node: node, value: value, attr: attr });
    return node;
  }

  function uiValue(key) {
    return { fr: uiText.fr[key], en: uiText.en[key] };
  }

  function buildMeta(item) {
    var body = el("div", "portfolio-body");
    body.appendChild(el("h4", "portfolio-title", item.title ? pick(item.title, "fr") : ""));
    localize(body.lastChild, item.title || "");
    if (item.languages) body.appendChild(el("span", "portfolio-langs", item.languages));
    if (item.description) {
      body.appendChild(localize(el("p", "portfolio-desc"), item.description));
    }
    return body;
  }

  function buildComicCard(item) {
    var card = el("article", "portfolio-card");
    var pages = item.pages && item.pages.length ? item.pages : item.cover ? [item.cover] : [];

    var thumb = el("button", "portfolio-thumb portfolio-thumb--comic");
    thumb.type = "button";
    localize(thumb, uiValue(item.pages && item.pages.length ? "viewPages" : "viewCover"), "aria-label");
    if (item.cover) {
      var img = el("img");
      img.src = item.cover;
      img.alt = "";
      img.loading = "lazy";
      thumb.appendChild(img);
    }
    if (item.pages && item.pages.length > 1) {
      thumb.appendChild(el("span", "portfolio-badge", item.pages.length + " p."));
    }
    thumb.addEventListener("click", function () {
      openViewer(item, pages, 0);
    });
    if (!pages.length) thumb.disabled = true;

    card.appendChild(thumb);
    var body = buildMeta(item);
    if (item.link) {
      var link = localize(el("a", "portfolio-link"), uiValue("fullWork"));
      link.href = item.link;
      link.target = "_blank";
      link.rel = "noopener";
      body.appendChild(link);
    }
    card.appendChild(body);
    return card;
  }

  function buildVideoCard(item) {
    var card = el("article", "portfolio-card");
    var id = encodeURIComponent(item.youtubeId || "");

    var frame = el("div", "portfolio-thumb portfolio-thumb--video");
    var play = el("button", "video-play");
    play.type = "button";
    localize(play, uiValue("play"), "aria-label");
    var img = el("img");
    img.src = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
    img.alt = "";
    img.loading = "lazy";
    play.appendChild(img);
    play.appendChild(el("span", "video-play-icon"));
    frame.appendChild(play);

    // Load the real player only on click: keeps the page fast and avoids
    // contacting YouTube until the visitor asks for it.
    play.addEventListener("click", function () {
      var params = "autoplay=1&rel=0&hl=" + currentLang;
      if (item.subtitleLang) {
        params += "&cc_load_policy=1&cc_lang_pref=" + encodeURIComponent(item.subtitleLang);
      }
      var iframe = el("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?" + params;
      iframe.title = pick(item.title, currentLang);
      iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      frame.replaceChild(iframe, play);
    });

    card.appendChild(frame);
    var body = buildMeta(item);
    var link = localize(el("a", "portfolio-link"), uiValue("watchOnYoutube"));
    link.href = "https://www.youtube.com/watch?v=" + id;
    link.target = "_blank";
    link.rel = "noopener";
    body.appendChild(link);
    card.appendChild(body);
    return card;
  }

  function renderPortfolio() {
    var groups = [
      { key: "comics", build: buildComicCard },
      { key: "videos", build: buildVideoCard }
    ];
    var total = 0;
    groups.forEach(function (group) {
      var items = portfolioData[group.key] || [];
      var grid = document.querySelector('[data-portfolio="' + group.key + '"]');
      if (!grid) return;
      items.forEach(function (item) {
        grid.appendChild(group.build(item));
      });
      grid.parentNode.hidden = items.length === 0;
      total += items.length;
    });
    var empty = document.querySelector(".portfolio-empty");
    if (empty) empty.hidden = total > 0;
  }

  function updatePortfolioLanguage(lang) {
    localizedNodes.forEach(function (entry) {
      var text = pick(entry.value, lang);
      if (entry.attr) entry.node.setAttribute(entry.attr, text);
      else entry.node.textContent = text;
    });
  }

  /* Comic page viewer */
  var viewer = document.getElementById("comic-viewer");
  var viewerState = { pages: [], index: 0 };

  function showPage(index) {
    var pages = viewerState.pages;
    viewerState.index = (index + pages.length) % pages.length;
    var img = viewer.querySelector(".viewer-img");
    img.src = pages[viewerState.index];
    img.alt = viewer.querySelector(".viewer-title").textContent + " — " + (viewerState.index + 1);
    viewer.querySelector(".viewer-count").textContent =
      pages.length > 1 ? viewerState.index + 1 + " / " + pages.length : "";
    var multi = pages.length > 1;
    viewer.querySelector(".viewer-prev").hidden = !multi;
    viewer.querySelector(".viewer-next").hidden = !multi;
  }

  function openViewer(item, pages, index) {
    if (!viewer || !pages.length) return;
    viewerState.pages = pages;
    viewer.querySelector(".viewer-title").textContent = pick(item.title, currentLang);
    ["close", "prev", "next"].forEach(function (key) {
      viewer.querySelector(".viewer-" + key).setAttribute("aria-label", uiText[currentLang][key]);
    });
    showPage(index);
    if (typeof viewer.showModal === "function") viewer.showModal();
    else window.open(pages[index], "_blank");
  }

  if (viewer) {
    viewer.querySelector(".viewer-close").addEventListener("click", function () {
      viewer.close();
    });
    viewer.querySelector(".viewer-prev").addEventListener("click", function () {
      showPage(viewerState.index - 1);
    });
    viewer.querySelector(".viewer-next").addEventListener("click", function () {
      showPage(viewerState.index + 1);
    });
    viewer.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") showPage(viewerState.index - 1);
      if (e.key === "ArrowRight") showPage(viewerState.index + 1);
    });
    // Click on the dark backdrop closes the viewer.
    viewer.addEventListener("click", function (e) {
      if (e.target === viewer) viewer.close();
    });
  }

  renderPortfolio();

  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLanguage(btn.getAttribute("data-lang"));
    });
  });

  setLanguage(initialLanguage());

  /* ---------- Active nav link on scroll ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".site-nav a"));
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function onScroll() {
    var pos = window.scrollY + 110;
    var current = sections[0];
    sections.forEach(function (section) {
      if (section.offsetTop <= pos) {
        current = section;
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current.id);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

})();
