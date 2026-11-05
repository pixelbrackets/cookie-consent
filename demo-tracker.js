// Demo only - example of a script depending on the cookie consent level
// Requires the cookie script to read cookies
// Requires the cookie-consent script to set the cookie-consent cookie

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  const currentCookieSelection = $.cookie('cookie-consent');

  // Show current level
  console.log(`Current cookie consent level: ${currentCookieSelection}`);
  // …and on the demo page as well
  const levelElement = document.querySelector('.demo-level');
  if (levelElement) {
    levelElement.textContent = currentCookieSelection === null ? 'not set' : currentCookieSelection;
  }

  // Enable necessary cookie scripts right away, they don't require consent (see README)
  console.log('[Level 0+] Necessary first-party script started - no consent required');

  // Enable first-party analytics script only if consent was given by continued usage
  // Watch out: Not a valid form of consent within the EU anymore!…
  // …Solution: Raise to level 60 instead (first-party analytics by opt-in), see below
  if (currentCookieSelection !== null && currentCookieSelection >= 20) {
    console.log('[Level 20+] First-party analytics script started - legacy (based on continued usage, not EU-compliant)');
  }

  // Start opt-in scripts if the user opted in on an earlier visit
  startOptInScripts(currentCookieSelection);
});

// Start opt-in scripts right away when the user clicks a consent button,
// without waiting for the next page load (not fired again when the consent was given on an earlier visit)
document.addEventListener('cookie-consent-change', (event) => {
  console.log(`Consent change event caught - new cookie consent level: ${event.detail.level}`);
  startOptInScripts(event.detail.level);
});

/**
 * Start all scripts requiring an opt-in (level 50 or higher)
 *
 * Called on page load and on a consent change. Each script still starts only once:
 * If the user opted in earlier, the consent bar is hidden and no click can follow.
 * Otherwise the page load call skips the script, and the click starts it.
 *
 * Don't add continued usage scripts (level below 50) here, they would start twice:
 * on page load and again on the click.
 *
 * @param level - current consent level
 */
function startOptInScripts(level) {
  // Enable first-party experience script only if consent was given by opt-in
  if (level !== null && level >= 50) {
    console.log('[Level 50+] First-party experience script started - opt-in carried out');
  }

  // Enable first-party analytics script (e.g. self-hosted Matomo) only if consent was given by opt-in
  if (level !== null && level >= 60) {
    console.log('[Level 60+] First-party analytics script started (e.g. self-hosted Matomo) - opt-in carried out');
  }

  // Enable third-party experience script (e.g. YouTube videos) only if consent was given by opt-in
  if (level !== null && level >= 70) {
    console.log('[Level 70+] Third-party experience script started (e.g. YouTube) - opt-in carried out');
  }

  // Enable third-party analytics script (e.g. Google Analytics) only if consent was given by opt-in
  if (level !== null && level >= 80) {
    console.log('[Level 80+] Third-party analytics script started (e.g. Google Analytics) - opt-in carried out');
  }
}
