// requires a simple cookie lib

/**
 * Init Cookie Consent Bar (no cookie written yet)
 */
function initCookieConsentBar() {
  // only show a cookie bar however if cookies are allowed at all,
  // otherwise keep »null« as consent level
  if($.areCookiesEnabled() == false) {
    return;
  }

  // set default level
  bar = document.getElementsByClassName('cookie-consent')[0];
  level = bar.dataset.level;
  // dont allow automatic Opt-Ins
  if (level === undefined || level >= 50) {
    level = 1;
  }
  // dont store cookie for more than 1 year
  duration = bar.dataset.duration;
  if (duration === undefined || duration > 8760) {
    duration = 8;
  }

  $.cookie('cookie-consent', level, duration*60*1000)

  showCookieConsentBar();
}

/**
 * Show Cookie Consent Bar
 */
function showCookieConsentBar() {
  bar = document.getElementsByClassName('cookie-consent')[0];
  button = document.getElementsByClassName('cookie-accept')[0];

  setEventListeners();
  fadeIn(bar, 250);
}

/**
 * Set button actions
 * @return null
 */
function setEventListeners() {
  level = button.dataset.level;
  // set fallback level
  if (level === undefined) {
    level = 50;
  }
  // dont store cookie for more than 1 year
  duration = button.dataset.duration;
  if (duration === undefined || duration > 8760) {
    duration = 8;
  }

  button.addEventListener('click', function() {
    $.cookie('cookie-consent', level, duration*60*1000)
    fadeOut(bar, 250);
  });
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
  var currentCookieSelection = $.cookie('cookie-consent');
  console.log(currentCookieSelection);

  // first request ever - show cookie bar and set a default level
  if(currentCookieSelection === null) {
    initCookieConsentBar();
  } else if (currentCookieSelection > 0 && currentCookieSelection < 50) {
    // Keep showing the cookie bar as long as no explicit agreement (Opt-In)
    // was given yet (level lower than 50)
    showCookieConsentBar();
  }
});
