// requires the cookie-consent script

document.addEventListener('DOMContentLoaded', function() {
  var currentCookieSelection = $.cookie('cookie-consent');

  // enable internal script only if cookie consent was given due to continued usage
  if (currentCookieSelection !== null && currentCookieSelection >= 1) {
    // activate first-party tracking, eg. self hosted Matomo
    console.log('internal tracking initiated')
  }

  // enable external script ony if cookie consent was given by opt-in
  if (currentCookieSelection !== null && currentCookieSelection >= 80) {
    // activate third-party tracking, eg. Google Analytics
    console.log('external tracking initiated')
  }
});
