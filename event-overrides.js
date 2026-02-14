(function () {
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function textWithBreaks(value) {
    return escapeHtml(value).replace(/\n/g, '<br class="wixui-rich-text__text">');
  }

  function setHtml(id, html) {
    var el = document.getElementById(id);
    if (el) {
      el.innerHTML = html;
    }
  }

  function setTitleBlock(id, text, fontClass, useBoldSpan) {
    var content = useBoldSpan
      ? '<span style="font-weight:bold;" class="wixui-rich-text__text">' + escapeHtml(text) + "</span>"
      : '<span class="wixui-rich-text__text">' + escapeHtml(text) + "</span>";
    setHtml(id, '<h2 class="' + fontClass + ' wixui-rich-text__text">' + content + "</h2>");
  }

  function setParagraphBlock(id, text) {
    setHtml(
      id,
      '<p class="font_8 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        textWithBreaks(text) +
        "</span></p>"
    );
  }

  function updateButtons(config) {
    ["#comp-m7xb380k a", "#comp-m7xce3ra a"].forEach(function (selector) {
      var link = document.querySelector(selector);
      if (!link) {
        return;
      }
      link.href = config.buttonUrl;
      link.setAttribute("aria-label", config.buttonLabel);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      var label = link.querySelector(".wixui-button__label, .w4Vxx6, .gIbEBg");
      if (label) {
        label.textContent = config.buttonLabel;
      }
    });
  }

  function updateFooterIdentity(config) {
    var contactBlock = document.getElementById("comp-m7x93b201_r_comp-m5ot5s24");
    if (contactBlock) {
      contactBlock.innerHTML =
        '<p class="font_8 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        escapeHtml(config.churchName) +
        '</span></p><p class="font_8 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        escapeHtml(config.churchAddress) +
        "</span></p>";
    }

    var copyrightBlock = document.getElementById("comp-m7x93b201_r_comp-m7xgo3hy");
    if (copyrightBlock) {
      copyrightBlock.innerHTML =
        '<p class="font_9 wixui-rich-text__text"><span class="wixui-rich-text__text">&copy; ' +
        new Date().getFullYear() +
        " " +
        escapeHtml(config.churchName).toUpperCase() +
        "&nbsp;</span></p>";
    }
  }

  function updateImageSlot(selector, src, alt) {
    var image = document.querySelector(selector + " img");
    if (image) {
      image.src = src;
      if (alt) {
        image.alt = alt;
      }
    }

    var source = document.querySelector(selector + " source");
    if (source) {
      source.srcset = src;
    }
  }

  function updateImages(config) {
    if (!config.images) {
      return;
    }

    updateImageSlot("#img_comp-m7x93b1811", config.images.heroBackground, "Alpha hero");
    updateImageSlot("#img-comp-m7xai1gu6", config.images.introImage1, "Alpha intro 1");
    updateImageSlot("#img-comp-m7xahkwm", config.images.introImage2, "Alpha intro 2");
    updateImageSlot("#img-comp-m7xahqd3", config.images.introImage3, "Alpha intro 3");
    updateImageSlot("#img-comp-m7xbkf0f__item1", config.images.stepImage1, "Alpha step 1");
    updateImageSlot(
      "#img-comp-m7xbkf0f__item-j9ples3e",
      config.images.stepImage2,
      "Alpha step 2"
    );
    updateImageSlot(
      "#img-comp-m7xbkf0f__item-j9plerjk",
      config.images.stepImage3,
      "Alpha step 3"
    );
    updateImageSlot(
      "#img-comp-m7xbkf0f__item-m7xbjbya",
      config.images.stepImage4,
      "Alpha step 4"
    );
    updateImageSlot("#img_comp-m7xc4yop", config.images.bottomBanner, "Alpha banner");
  }

  function renderLinks(links, className) {
    return (links || [])
      .map(function (link) {
        return (
          '<a class="' +
          className +
          '" href="' +
          escapeHtml(link.url) +
          '" target="_blank" rel="noopener noreferrer">' +
          escapeHtml(link.label) +
          "</a>"
        );
      })
      .join("");
  }

  function applyPageBranding(config) {
    if (config.pageTitle) {
      document.title = config.pageTitle;
    }

    var faviconUrl = config.faviconUrl || config.logoUrl;
    if (!faviconUrl) {
      return;
    }

    var iconSelectors = [
      'link[rel="icon"]',
      'link[rel="shortcut icon"]',
      'link[rel="apple-touch-icon"]',
    ];

    iconSelectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (node) {
        node.setAttribute("href", faviconUrl);
      });
    });
  }

  function applyBrandTheme(config) {
    var theme = config.theme || {};
    var css = [
      ":root{",
      "--sp-surface:" + (theme.surface || "#161311") + ";",
      "--sp-surface-soft:" + (theme.surfaceSoft || "#231d19") + ";",
      "--sp-text:" + (theme.text || "#f7efe8") + ";",
      "--sp-muted:" + (theme.muted || "#d8c5b3") + ";",
      "--sp-accent:" + (theme.accent || "#e26f3f") + ";",
      "--sp-accent-hover:" + (theme.accentHover || "#f08b5e") + ";",
      "--sp-border:" + (theme.border || "#3a2b20") + ";",
      "}",
      ".sp-header{position:sticky;top:0;z-index:9999;background:rgba(22,19,17,.95);backdrop-filter:blur(8px);border-bottom:1px solid var(--sp-border);}",
      ".sp-header-inner{max-width:1200px;margin:0 auto;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;gap:20px;}",
      ".sp-brand{display:flex;align-items:center;gap:12px;color:var(--sp-text)!important;text-decoration:none!important;font:600 14px/1.2 Arial,sans-serif;letter-spacing:.03em;text-transform:uppercase;}",
      ".sp-brand img{height:38px;width:auto;display:block;filter:brightness(1.05);}",
      ".sp-nav{display:flex;flex-wrap:wrap;gap:14px;justify-content:flex-end;}",
      ".sp-nav-link{color:var(--sp-text)!important;text-decoration:none!important;font:600 12px/1 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;padding:7px 10px;border-radius:999px;border:1px solid transparent;}",
      ".sp-nav-link:hover{background:var(--sp-accent);border-color:var(--sp-accent);color:#120c08!important;}",
      ".sp-footer{background:var(--sp-surface);color:var(--sp-text);padding:42px 20px 28px;border-top:1px solid var(--sp-border);}",
      ".sp-footer-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.2fr 2fr;gap:26px;}",
      ".sp-footer h4{margin:0 0 10px;font:700 14px/1.2 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--sp-muted);}",
      ".sp-footer p,.sp-footer a{font:400 14px/1.5 Arial,sans-serif;color:var(--sp-text);text-decoration:none;}",
      ".sp-footer-links{display:grid;grid-template-columns:repeat(2,minmax(140px,1fr));gap:8px 16px;}",
      ".sp-footer-link:hover,.sp-social-link:hover{color:var(--sp-accent);}",
      ".sp-social{display:flex;gap:12px;flex-wrap:wrap;margin-top:12px;}",
      ".sp-bottom{max-width:1200px;margin:20px auto 0;padding-top:12px;border-top:1px solid var(--sp-border);font:400 12px/1.4 Arial,sans-serif;color:var(--sp-muted);}",
      "#comp-m7xb380k a,#comp-m7xce3ra a{background:var(--sp-accent)!important;border-color:var(--sp-accent)!important;color:#1a110a!important;}",
      "#comp-m7xb380k a:hover,#comp-m7xce3ra a:hover{background:var(--sp-accent-hover)!important;border-color:var(--sp-accent-hover)!important;}",
      "@media (max-width:860px){.sp-footer-inner{grid-template-columns:1fr}.sp-nav{justify-content:flex-start}.sp-nav-link{font-size:11px}}",
    ].join("");

    var style = document.getElementById("sp-theme-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "sp-theme-style";
      document.head.appendChild(style);
    }
    style.textContent = css;
  }

  function replaceHeaderFooter(config) {
    var header = document.getElementById("comp-m7x93b2112");
    if (header) {
      header.innerHTML =
        '<div class="sp-header"><div class="sp-header-inner">' +
        '<a class="sp-brand" href="' +
        escapeHtml(config.churchWebsite) +
        '" target="_blank" rel="noopener noreferrer">' +
        '<img src="' +
        escapeHtml(config.logoUrl) +
        '" alt="' +
        escapeHtml(config.churchName) +
        ' logo">' +
        "<span>" +
        escapeHtml(config.churchName) +
        "</span></a>" +
        '<nav class="sp-nav">' +
        renderLinks(config.headerNav, "sp-nav-link") +
        "</nav></div></div>";
    }

    var footer = document.getElementById("comp-m7x93b201");
    if (footer) {
      footer.innerHTML =
        '<footer class="sp-footer"><div class="sp-footer-inner">' +
        "<div>" +
        "<h4>St Philip's Anglican Cottesloe</h4>" +
        "<p>" +
        escapeHtml(config.churchAddress) +
        "</p>" +
        '<p><a href="tel:+61893851042">' +
        escapeHtml(config.churchPhone) +
        "</a></p>" +
        '<p><a href="mailto:' +
        escapeHtml(config.churchEmail) +
        '">' +
        escapeHtml(config.churchEmail) +
        "</a></p>" +
        '<div class="sp-social">' +
        renderLinks(config.socialLinks, "sp-social-link") +
        "</div>" +
        "</div>" +
        '<div><h4>Quick Links</h4><div class="sp-footer-links">' +
        renderLinks(config.footerLinks, "sp-footer-link") +
        "</div></div>" +
        '</div><div class="sp-bottom">&copy; ' +
        new Date().getFullYear() +
        " " +
        escapeHtml(config.churchName) +
        ". All rights reserved.</div></footer>";
    }
  }

  function applyEventConfig() {
    var config = window.EVENT_CONFIG;
    if (!config) {
      return;
    }

    applyPageBranding(config);

    setTitleBlock("comp-m7x93b1b8", config.heroTag, "font_3", false);
    setTitleBlock("comp-m7x9xgdb", config.heroInvite, "font_2", true);
    setHtml(
      "comp-m7x9y2ke",
      '<h2 class="font_2 wixui-rich-text__text">' + escapeHtml(config.heroSubheading) + "</h2>"
    );
    setHtml(
      "comp-m7x9y8g2",
      '<p class="font_8 wixui-rich-text__text">' +
        '<span class="wixui-rich-text__text">' +
        escapeHtml(config.introParagraph1) +
        "</span>" +
        '<span class="wixui-rich-text__text">' +
        escapeHtml(config.introParagraph2) +
        "</span>" +
        "</p>"
    );
    setHtml(
      "comp-m7x9yb2u",
      '<h2 class="font_2 wixui-rich-text__text">' + escapeHtml(config.launchHeading) + "</h2>"
    );
    setHtml(
      "comp-m7xa3bg0",
      '<h2 class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        escapeHtml(config.launchLine1) +
        "</span></h2>"
    );
    setHtml(
      "comp-m7xa46ue",
      '<h2 class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        escapeHtml(config.launchLine2) +
        "</span></h2>"
    );
    setHtml(
      "comp-m7xb8fnk",
      '<h2 class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        escapeHtml(config.howItWorksHeading) +
        "</span></h2>"
    );

    var stepTitleIds = [
      "comp-m7xblndi__item1",
      "comp-m7xblndi__item-j9ples3e",
      "comp-m7xblndi__item-j9plerjk",
      "comp-m7xblndi__item-m7xbjbya",
    ];
    var stepBodyIds = [
      "comp-m7xbnsld__item1",
      "comp-m7xbnsld__item-j9ples3e",
      "comp-m7xbnsld__item-j9plerjk",
      "comp-m7xbnsld__item-m7xbjbya",
    ];

    config.steps.slice(0, 4).forEach(function (step, index) {
      setHtml(
        stepTitleIds[index],
        '<h2 class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
          escapeHtml(step.title) +
          "</span></h2>"
      );
      if (index === 0) {
        setHtml(
          stepBodyIds[index],
          '<h2 class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
            escapeHtml(step.description) +
            "</span></h2>"
        );
      } else {
        setParagraphBlock(stepBodyIds[index], step.description);
      }
    });

    setHtml(
      "comp-m7xcas2w",
      '<h2 class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        escapeHtml(config.ctaSectionHeading) +
        "</span></h2>"
    );
    setHtml(
      "comp-m7xcbvkh",
      '<h2 class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        textWithBreaks(config.ctaBody) +
        "</span></h2>"
    );
    setHtml(
      "comp-m7xcdn51",
      '<h2 class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">' +
        escapeHtml(config.eventDateTime) +
        '<br class="wixui-rich-text__text">' +
        escapeHtml(config.eventLocation) +
        "</span></h2>"
    );
    setHtml(
      "comp-mcleq4kt",
      '<h3 class="font_3 wixui-rich-text__text">' + escapeHtml(config.footerHero) + "</h3>"
    );

    applyBrandTheme(config);
    replaceHeaderFooter(config);
    updateButtons(config);
    updateFooterIdentity(config);
    updateImages(config);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyEventConfig);
  } else {
    applyEventConfig();
  }
})();
