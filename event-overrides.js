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

  function applyEventConfig() {
    var config = window.EVENT_CONFIG;
    if (!config) {
      return;
    }

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

    updateButtons(config);
    updateFooterIdentity(config);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyEventConfig);
  } else {
    applyEventConfig();
  }
})();
