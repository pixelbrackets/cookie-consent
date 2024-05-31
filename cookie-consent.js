// Requires a simple cookie lib, like the bundled cookie.js

/**
 * Init cookie consent bar (no cookie written yet)
 */
function initCookieConsentBar() {
  // Only show a cookie bar if cookies are allowed at all, otherwise keep
  // »null« as consent level and retry on the next request
  if($.areCookiesEnabled() == false) {
    return;
  }

  // Set level & duration due to continued usage
  let consentBar = document.getElementsByClassName('cookie-consent')[0];
  let level = consentBar.dataset.level;
  // Set fallback level for continued usage and restrict the max level
  // (don't allow automatic opt-ins)
  if (level === undefined || level >= 50) {
    level = 1;
  }
  // Don't store cookie for more than 1 year
  let duration = consentBar.dataset.duration;
  if (duration === undefined || duration > 8760) {
    duration = 8;
  }

  $.cookie('cookie-consent', level, duration*60*60*1000)

  showCookieConsentBar();
}

/**
 * Show cookie consent bar until a confirmation button is clicked
 */
function showCookieConsentBar() {
  // Autowire events to opt-in button, set default level & duration if missing
  let consentBar = document.getElementsByClassName('cookie-consent')[0];
  let buttons = document.getElementsByClassName('cookie-accept');

  for (var i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    let level = button.dataset.level;
    // Set fallback level for opt-in button
    if (level === undefined) {
      level = 50;
    }
    // Don't store consent cookie for more than 1 year
    let duration = button.dataset.duration;
    if (duration === undefined || duration > 8760) {
      duration = 8;
    }

    button.addEventListener('click', function () {
      $.cookie('cookie-consent', level, duration * 60 * 60 * 1000)
      fadeOut(consentBar, 250);
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
  var elementStyle = element.style;
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
  var elementStyle = element.style;
  elementStyle.opacity = 1;
  (function fade() {
    (elementStyle.opacity -= 0.1) < 0.1 ? elementStyle.display = 'none' : setTimeout(fade, (speed / 10));
  })();
}

document.addEventListener('DOMContentLoaded', function() {
  let currentCookieSelection = $.cookie('cookie-consent');

  // First request ever - show cookie bar and set a default level
  if(currentCookieSelection === null) {
    initCookieConsentBar();
  } else if (currentCookieSelection > 0 && currentCookieSelection < 50) {
    // Keep showing the cookie bar as long as no explicit agreement (Opt-In)
    // was given yet (level lower than 50)
    showCookieConsentBar();
  }
});
