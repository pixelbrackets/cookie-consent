# Cookie Consent

🍪 Standalone script to display a cookie consent to comply with EU cookie law.

*Yet another cookie consent bar… Whyyyyy❓❓*

…Well, most of the popular existing solutions have issues like…

- require loading the JavaScript through a CDN → which may track visitors and 
  therefore signifies a privacy issue
- require a JavaScript framework like jQuery → which may not exist if the 
  current site only adds a cookie because of one tracking tool
- add advertisements
- add trackers
- are hard to modify
- set inline styles → don't allow separating scripts & styles, which makes it 
  harder to add custom stylesheets
- have to many styles or no styles at all
- hardcode labels/text in the JavaScript → limit translations & text changes
- don't have an easy way to wrap dependent scripts
- are too big/complex (mostly because styles, scripts & labels are mixed, and the 
  options to change all of them are more complex than the cookie logic itself)

Goals of this library:

- KISS
- Minimal footprint - no frameworks, no CDNs, no external requests
- Separate JavaScript logic, CSS styles and HTML markup
- Allow to copy/integrate a small, single JavaScript (no CDN, no framework)
- Allow to change text/labels as desired (e.g. in application)
- Add basic fallbacks (e.g. styles), which may be overwritten/removed/extended
- Allow to gain different types of consent
- Don't make any external requests
- Don't manage multiple cookie sources (use a cookie consent manager instead)
- Expose plain conditions for other JavaScripts depending on provided consent

## Requirements

- JavaScript (ES6/ES2015)
- Modern browsers: Chrome, Firefox, Safari, Edge (latest versions)
- Legacy support: Internet Explorer > 10, Edge > 12, Safari > 10, Opera > 49, Firefox > 48, Chrome > 57

“🤔 Hmm, this script is from 2018, will it still work with modern apps?” - Yepp, it will.
This library uses vanilla JavaScript with no dependencies, making it compatible with
Vue, Svelte, PWAs, Vite, Rollup, or any other modern framework or bundler.
And, of course, good old plain HTML pages.

## Demo

🚀 https://pixelbrackets.gitlab.io/cookie-consent/

## Quickstart

This README explains cookie laws and how to gain consent using different levels
at length. If you just want to get a brief overview, read this section first.

**How it works:** This script displays a consent bar and stores the user's consent choice as a numeric "level" (0-80)
in a cookie. Your tracking scripts then check this level before executing.

**Benefits of consent levels:**
- Different scripts require different levels for legal reasons (See preliminary considerations)
- Users can choose granular consent (necessary only, analytics, or all cookies)
- Your scripts read one simple number to decide whether to run

```html
<!-- 1. Add the consent bar HTML with opt-in buttons -->
<div class="cookie-consent">
  <p>We use cookies. <a href="/privacy">Privacy Policy</a></p>
  <button class="cookie-accept" data-level="0" data-duration="72">Necessary only</button>
  <button class="cookie-accept" data-level="80" data-duration="8760">Accept all</button>
</div>

<!-- 2. Include the scripts -->
<script src="cookie.js"></script>
<script src="cookie-consent.js"></script>

<!-- 3. Your tracking scripts check the consent level before running -->
<script>
  const consentLevel = $.cookie('cookie-consent');

  // Only run internal analytics if user consented to level 60 or higher
  if (consentLevel >= 60) {
    // Initialize your analytics
  }

  // Only run third-party tracking if user consented to level 80
  if (consentLevel >= 80) {
    // Initialize third-party trackers
  }
</script>
```

See the included `demo.html` files for complete working examples with different configurations.

## Preliminary considerations

📚 Please read this section as a prerequisite prior to installing the script.

The most obvious reason for the EU cookie law is to inform the user about cookie 
usage. But even more important is the constraint for website operators to think 
about cookie usage. They should ask themselves how intrusive a cookie is, 
what data does each cookie hold, is its lifespan appropriate to its purpose, 
is it a first or third‑party cookie, who controls the data?

Instead of saying “we use all kinds of cookies, I don't even know which and why” 
a website owner should be able to tell why and when cookies are used.

A website needs to differentiate…

* between first-party and third-party cookies,
* between session and persistent cookies and
* between necessary and non-necessary cookies.

A cookie is »necessary« if it is required by the service for the sole purpose of 
communication and storing stateful data. A first-party cookie which stores a 
login state or items in a shopping cart and is limited to a session only 
(erased when the user closes the browser), may be necessary.

👉 Not all cookies require a consent, see [European Commission - Internet Handbook](http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm).

* First‑party session cookies DO NOT require informed consent.
* First‑party persistent cookies DO require informed consent.
* Third‑party session and persistent cookies DO require informed consent.

| Origin | Duration | Requires consent |
| ------ | -------- | ---------------- |
| First‑party | Session | ❌ |
| First‑party | Persistent | ✔ (except »necessary« cookies limited to a few hours, like shopping carts)|
| Third‑party | Session | ✔ |
| Third‑party | Persistent | ✔ |

Although not mandatory it may be helpful to further differentiate between 
different usage types of cookies.

* Necessary cookies = storing stateful data, like a shopping cart or a login status
* Experience cookies = user preferences, like data previously entered into forms
* Analytical cookies = target user behaviour, like how often an item was clicked

When this script was first created, there were still different views
on how to gain consent from a user.

* Agreement due to continued usage → Only inform the user about cookie usage
  and that the website will continue to do so if the user continues
  to use the website.
* Opt-Out → Inform the user about cookie usage, but let the user disagree to
  usage of cookies with a click on a button. After that existing cookies
  (except the denied consent) are removed and now new cookies created anymore.
* Opt-In → User agrees to usage of cookies with a click on a button,
  until then no non-necessary cookies are stored.

🌪️ However, please note that since 2020 only an opt-in is a permissible form
of consent to cookies within the EU! Users must actively consent,
preset checkboxes or opt-outs are no longer permitted.

Other regions, like the US, have different legal requirements. Consent due to
continued usage is therefore still supported in this script,
but should no longer be used within the EU.

The cookie consent bar should link to a page informing about cookie usage (eg.
privacy notes)…

* in plain, jargon‑free language
* why cookies are used (to remember user actions, identify users etc.)
* types of used cookies (e.g. session or permanent, first or third‑party)
* who controls/accesses the cookie‑related information (first or third‑party)
* how users can withdraw consent (e.g. close browser, clear cache, opt-out button)

The different origins, usage types and ways to gain consent are considered in 
this repository. It uses »levels« for this, see sections »Usage & Levels«.

## Installation

Packagist https://packagist.org/packages/pixelbrackets/cookie-consent

## Usage

The most important script of this package is `cookie-consent.js`, which
handles the consent. Everything else is optional. The script looks for
certain data attributes in elements with a certain class name. If everything
is missing, then it will set default values instead.

The script stores what type of consent was given by the user and how long
it is supposed to be valid. The consent is categorised into different »levels«.
Read more about these levels in the following chapter.

All your own scripts, which want to write cookies or execute actions requiring
consent, must read the stored consent level to continue or cancel.

### Integration

🔰 Take a look at the demo files:

- `demo.html` - Best practice, EU-compliant opt-in with multiple buttons
- `demo-granular.html` - EU-compliant opt-in with one button per cookie category
- `demo-minimal.html` - No configuration, uses fallback values
- `demo-legacy.html` - Consent by continued usage (not EU-compliant)

_Set up cookie consent bar_

- Copy the cookie consent bar HTML and integrate it into your own view
  - Change the labels/text as you want, but try to keep the markup structure
  - Add a link to a separate privacy page
  - See the »configuration« section to learn how to change the default values
    for consent levels and duration
- Integrate `cookie.js` and `cookie-consent.js` into your own view
  - Import them as ES6 modules in your build pipeline, or copy them to your
    public assets folder and add `<script>` tags to your HTML
  - Optionally concatenate and minify the files according to your own asset structure
- Either copy the default stylesheet `cookie-consent.css` or write your own,
  styles are independent of the script
- The consent level is stored in a cookie called »cookie-consent«

_Guard clause your own scripts with consent checks_

- Wrap all scripts that use cookies or tracking with conditional checks to verify the user has given appropriate consent
- Every script that sets cookies, tracks user behavior, or loads third-party services must first read the consent level
  from the `cookie-consent` cookie and only execute if the consent level meets or exceeds the required threshold
  for that type of action
- The example file `demo-tracker.js` demonstrates how to implement these consent checks in JavaScript:
    ```javascript
    // Always check if consent was given before executing tracking code
    if ($.cookie('cookie-consent') !== null && $.cookie('cookie-consent') >= 50) {
      /* User consented to level 50 or higher, safe to trigger action */
    }
    ```

_Optional:_ Add your own consent events

- Write your own actions to change the level stored in cookie `cookie-consent`
  - The example file `demo.html` shows how to set the level with inline JavaScript
    ```html
    <button type="button" class="btn btn-secondary" onClick="$.cookie('cookie-consent', 80, 31536000000); return false;">Accept all cookies</button>
    ```
- Let users change or withdraw their consent, e.g. with a »Cookie settings«
  link in the footer of your site
  - The example file `demo.html` shows how to reset the cookie duration time (`-1`)
    ```html
    <a href="#" onClick="$.cookie('cookie-consent', '', -1); location.reload(); return false;">Cookie settings</a>
    ```

### Levels

The given consent is categorised into different »levels«. They are triggered by
different events, like continued usage of the website or a button click (Opt-In).

All other scripts need to ask for the current level to check whether they are 
allowed to write a cookie or not.

These behaviours are intended for the following levels:

| Set Level 〽️ | Triggered by                     | Cookie Bar Visibillity | Cookie Types Allowed                    | Notes                                         |
|--------------|----------------------------------|------------------------|-----------------------------------------|-----------------------------------------------|
| `null`       | Browser blocks cookies           | Dont show              | None                                    | Website may not work                          |
| 0            | Opt-Out                          | Dont show              | First Party, Session, Necessary cookies |                                               |
| 1            | Agreement due to continued usage | Keep showing           | First Party, Session, Necessary cookies |                                               |
| 10           | Agreement due to continued usage | Keep showing           | First-Party, Persistent, Experience     |                                               |
| 20           | Agreement due to continued usage | Keep showing           | First-Party, Persistent, Analytical     |                                               |
| 30           | Agreement due to continued usage | Keep showing           | Third-Party, Session, Experience        |                                               |
| 40           | Agreement due to continued usage | Keep showing           | Third-Party, Persistent, Analytical     |                                               |
| 50           | Opt-In                           | Dont Show              | First-Party, Persistent, Experience     | Missing necessary cookies here? See level `0` |
| 60           | Opt-In                           | Dont Show              | First-Party, Persistent, Analytical     |                                               |
| 70           | Opt-In                           | Dont Show              | Third-Party, Session, Experience        |                                               |
| 80           | Opt-In                           | Dont Show              | Third-Party, Persistent, Analytical     | “Allow all cookies”                           |

🏔️ You may define your own values between these levels or above level 80.

#### Examples

In relation to the table above, the following use cases may require these levels:

* Internal shopping cart → no consent required (you may check for level `1` or ignore it)
* Internal form wizard (persist user input), shall be allowed by continued usage → requires at least level `10`
* Internal tracking tool, shall be allowed by continued usage → requires at least level `20`
* Internal tracking tool, shall be allowed by Opt-In only → requires at least level `50`
* External form wizard (keep user input in session only), shall be allowed by continued usage → requires at least level `30`
* External tracking tool, shall be allowed by continued usage → requires at least level `30`
* External tracking tool, shall be allowed by Opt-In only → requires at least level `80`

⚠️Example use cases, your use cases and internal requirements may differ.

### Configuration

To let the script set and use different levels it is possible to configure
which event triggers what consent level and how long this level is valid.

To do so the attributes `data-level` and `data-duration` may be set on two 
different places.

**Triggered by continued usage**

* Level of cookie consent set by agreement due to continued usage
  * Set in `data-level` attribute of `.cookie-consent` Element (DIV)
  * Integer, levels as defined in the »levels« table above
  * Default value »1«, usually »20«, always lower than »50«
* Duration of cookie consent set by agreement due to continued usage
  * Set in `data-duration` attribute of `.cookie-consent` Element (DIV)
  * Integer, duration in hours
  * Default value »8«, usually »8«, never greater than »8760« (365 days)

**Triggered by Opt-In**

* Level of cookie consent set by opt-in due to button click
  * Set in `data-level` attribute of `.cookie-accept` Element (BUTTON)
  * Integer, levels as defined in the »levels« table above
  * Default value »50«, usually »80«
* Duration of cookie consent set by opt-in due to button click
  * Set in `data-duration` attribute of `.cookie-accept` Element (BUTTON)
  * Integer, duration in hours
  * Default value »8«, usually »8760«, never greater than »8760« (365 days)
* Note: You may set up multiple opt-in buttons, all they need is a
  `.cookie-accept` class and the desired `data` attributes

❕ If the default values are sufficient for your app,
you even can omit the `data-*` attributes.

🔰 Again, take a look at the demo files to try out different examples.

## Source

https://gitlab.com/pixelbrackets/cookie-consent

## License

GNU General Public License version 2 or later

The GNU General Public License can be found at http://www.gnu.org/copyleft/gpl.html.

## Author

Dan Kleine (Dan Untenzu) (<mail@pixelbrackets.de> / [@pixelbrackets](https://github.com/pixelbrackets))

## Changelog

See [CHANGELOG.md](./CHANGELOG.md)

## Contribution

This script is Open Source, so please use, share, patch, extend or fork it.
