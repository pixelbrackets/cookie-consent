// Requires the cookie script to read cookies
// Requires the cookie-consent script to

document.addEventListener('DOMContentLoaded', function() {
  var currentCookieSelection = $.cookie('cookie-consent');

  console.log('Cookie Consent Level ' + currentCookieSelection);

  // Enable necessary cookie script since they don't require consent, see readme
  console.log('Tracker script »necessary cookie« triggered - no consent required')

  // Enable internal script only if cookie consent was given due to continued usage
  // Watch out: Not a valid consent form anymore within the EU!…
  if (currentCookieSelection !== null && currentCookieSelection >= 20) {
    console.log('Tracker script »first party, analytical cookie« triggered - consent due to continued usage')
  }
  // …Solution: Raise to level 60 instead (consent by opt-in)
  //if (currentCookieSelection !== null && currentCookieSelection >= 60) {
  //  console.log('tracker script »first party, analytical cookie« triggered - consent by opt-in')
  //}

  // Enable external script ony if cookie consent was given by opt-in
  if (currentCookieSelection !== null && currentCookieSelection >= 80) {
    console.log('Tracker script »analytical cookie« triggered - consent by opt-in')
  }
});
