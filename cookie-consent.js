// requires a simple cookie lib

/**
 * Init Cookie Consent Bar
 */
function initCookieConsentBar() {
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
  button.addEventListener('click', function() {
    $.cookie('cookie-consent', '1', 5*60*1000)
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

  // Stop further execution, if the user already allowed cookie usage.
  if (currentCookieSelection !== null && currentCookieSelection !== undefined) {
    return;
  }
  else {
    initCookieConsentBar();
  }
});
