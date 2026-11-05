// Requires a simple cookie lib, like the bundled cookie.js

// Wrap in IIFE to keep all functions out of the global scope
(() => {
  /**
   * Init cookie consent bar (no cookie written yet)
   */
  function initCookieConsentBar() {
    // Only show a cookie bar if cookies are allowed at all, otherwise keep
    // »null« as consent level and retry on the next request
    if (!$.areCookiesEnabled()) {
      return;
    }

    // Set level & duration due to continued usage
    const consentBar = document.getElementsByClassName('cookie-consent')[0];
    let level = parseInt(consentBar.dataset.level, 10);
    // Set fallback level for continued usage and restrict the max level
    // (don't allow automatic opt-ins)
    if (Number.isNaN(level) || level < 0 || level >= 50) {
      level = 1;
    }
    // Don't store cookie for more than 1 year
    let duration = parseInt(consentBar.dataset.duration, 10);
    if (Number.isNaN(duration) || duration < 0 || duration > 8760) {
      duration = 8;
    }

    $.cookie('cookie-consent', level, duration * 60 * 60 * 1000);

    showCookieConsentBar();
  }

  /**
   * Show cookie consent bar until a confirmation button is clicked
   */
  function showCookieConsentBar() {
    // Autowire events to opt-in button, set default level & duration if missing
    const consentBar = document.getElementsByClassName('cookie-consent')[0];
    const buttons = document.getElementsByClassName('cookie-accept');

    for (const button of buttons) {
      let level = parseInt(button.dataset.level, 10);
      // Set fallback level for opt-in button
      if (Number.isNaN(level) || level < 0) {
        level = 50;
      }
      // Don't store consent cookie for more than 1 year
      let duration = parseInt(button.dataset.duration, 10);
      if (Number.isNaN(duration) || duration < 0 || duration > 8760) {
        duration = 8;
      }

      button.addEventListener('click', () => {
        $.cookie('cookie-consent', level, duration * 60 * 60 * 1000);
        fadeOut(consentBar, 250);
        // Notify dependent scripts, so they can start right away without a reload
        document.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: { level } }));
      });
    }

    // Setup done, show the consent bar
    fadeIn(consentBar, 250);
  }

  /**
   * FadeIn effect
   * @param element - DOM Element
   * @param speed - effect duration
   * @return null
   */
  function fadeIn(element, speed) {
    const elementStyle = element.style;
    elementStyle.opacity = 0;
    elementStyle.display = 'block';
    (function fade() {
      (elementStyle.opacity -= -0.1) > 0.9 ? null : setTimeout(fade, (speed / 10));
    })();
  }

  /**
   * FadeOut effect
   * @param element - DOM Element
   * @param speed - effect duration
   * @return null
   */
  function fadeOut(element, speed) {
    const elementStyle = element.style;
    elementStyle.opacity = 1;
    (function fade() {
      (elementStyle.opacity -= 0.1) < 0.1 ? elementStyle.display = 'none' : setTimeout(fade, (speed / 10));
    })();
  }

  /**
   * Decide whether to show the cookie consent bar
   */
  function startCookieConsent() {
    // No consent bar markup on this page (yet), nothing to do
    if (document.getElementsByClassName('cookie-consent').length === 0) {
      return;
    }

    const currentCookieSelection = $.cookie('cookie-consent');

    // First request ever - show cookie bar and set a default level
    if (currentCookieSelection === null) {
      initCookieConsentBar();
    } else if (currentCookieSelection > 0 && currentCookieSelection < 50) {
      // Keep showing the cookie bar as long as no explicit agreement (Opt-In)
      // was given yet (level lower than 50)
      showCookieConsentBar();
    }
  }

  // Wait for the DOM, or start right away if the script is loaded late
  // (e.g. async, deferred or bundled scripts)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startCookieConsent);
  } else {
    startCookieConsent();
  }
})();
