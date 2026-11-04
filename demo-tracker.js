// Demo only - example of a script depending on the cookie consent level
// Requires the cookie script to read cookies
// Requires the cookie-consent script to set the cookie-consent cookie

document.addEventListener('DOMContentLoaded', () => {
  const currentCookieSelection = $.cookie('cookie-consent');
  console.log(`Current cookie consent level: ${currentCookieSelection}`);

  // Show the current level on the demo page
  const levelElement = document.querySelector('.demo-level');
  if (levelElement) {
    levelElement.textContent = currentCookieSelection === null ? 'not set' : currentCookieSelection;
  }

  // Enable any necessary cookie script since they don't require consent, see readme
  console.log('[Level 0+] Necessary first-party script started - no consent required');

  // Enable internal script only if cookie consent was given due to continued usage
  // Watch out: Not a valid consent form anymore within the EU!…
  // …Solution: Raise to level 60 instead (consent to first party analytics by opt-in), see below
  if (currentCookieSelection !== null && currentCookieSelection >= 20) {
    console.log('[Level 20+] First-party analytics script started - legacy (based on continued usage, not EU-compliant)');
  }

  // Enable internal preference script only if cookie consent was given by opt-in
  if (currentCookieSelection !== null && currentCookieSelection >= 50) {
    console.log('[Level 50+] First-party experience script started - opt-in carried out');
  }

  // Enable internal statistics script (e.g. self-hosted Matomo) only if cookie consent was given by opt-in
  if (currentCookieSelection !== null && currentCookieSelection >= 60) {
    console.log('[Level 60+] First-party analytics script started (e.g. self-hosted Matomo) - opt-in carried out');
  }

  // Enable external comfort script (e.g. YouTube videos) only if cookie consent was given by opt-in
  if (currentCookieSelection !== null && currentCookieSelection >= 70) {
    console.log('[Level 70+] Third-party experience script started (e.g. YouTube) - opt-in carried out');
  }

  // Enable external analytics script (e.g. Google Analytics) only if cookie consent was given by opt-in
  if (currentCookieSelection !== null && currentCookieSelection >= 80) {
    console.log('[Level 80+] Third-party analytics script started (e.g. Google Analytics) - opt-in carried out');
  }
});
