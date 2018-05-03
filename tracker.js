// requires the cookie-consent script

document.addEventListener('DOMContentLoaded', function() {
  var currentCookieSelection = $.cookie('cookie-consent');

  // enable tracker code ony if cookie consent was given previously
  if (currentCookieSelection !== null && currentCookieSelection >= 1) {
    // activate tracking, e.g. Matomo
    console.log('tracking allowed')
  }
});
