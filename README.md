# Cookie Consent

🍪 Standalone script to display a cookie consent to comply with EU cookie law.

*Yet another cookie consent bar… Whyyyyy❓❓*

…Well, most of the popular existing solutions have issues like…

- require loading the JavaScript trough a CDN → which may track visitors and 
  therefore signifies a privacy issue
- require a JavaScript framework like jQuery → which may not exist if the 
  current site only adds a cookie because of one tracking tool
- add advertisments
- add trackers
- are hard to modify
- set inline styles → don't allow separating scripts & styles, which makes it 
  harder to add custom stylesheets
- have to many styles or no styles at all
- hardcode labels/text in the JavaScript → limit translations & text changes
- are too big/complex (mostly because styles, scripts & labels are mixed, and the 
  options to change all of them are more complex than the cookie logic itself)

Goals of this library:

- KISS
- Separate JavaScript logic, CSS styles and HTML markup
- Allow to copy/integrate a small, single JavaScript (no CDN, no framework)
- Allow to change text/labels as desired (eg. in application)
- Add basic fallbacks (eg. styles), which may be overwritten/removed/extended
- Allow to gain different types of consent
- Don't make any external request

## Requirements

- JavaScript
- Internet Explorer > 10, Firefox > 48, Chrome > 57

## Demo

https://pixelbrackets.gitlab.io/cookie-consent/

## Preliminary considerations

📚 Please read this section as a prerequisite prior to installing the script.

The most obvious reason for the EU cookie law is to inform the user about cookie 
usage. But even more important is the constraint for website operators to think 
about cookie usage. They should ask themself how intrusive a cookie is, 
what data does each cookie hold, is its lifespan appropriate to its purpose, 
is it a first or third‑party cookie, who controls the data?

Instead of saying “we use all kinds of cookies, I don't even know which and why” 
a website owner should be able to tell why and when cookies are used.

A website needs to differentiate…

* between first-party and third-party cookies,
* between session and persistent cookies and
* between necessary and non-necessary cookies.

A cookie is »necessary« if it is required by the service for the sole purpose of 
communication and storing stateful data. A first-party cookie whichs stores a 
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

Although not mandatory it may be helpful to futher differentiate between 
different usage types of cookies.

* Necessary cookies = storing stateful data, like a shopping cart or a login status
* Experience cookies = user preferences, like data previously entered into forms
* Analytical cookies = target user behaviour, like how often an item was clicked

* There are diverging views about how to gain consent from a user.

* Agreement due to continued usage → Only inform the user about cookie usage
  and that the website will continue to do so if the user continues
  to use the website.
* Opt-Out → Inform the user about cookie usage, but let the user disagree to
  usage of cookies with a click on a button. After that existing cookies
  (except the denied consent) are removed and now new cookies created anymore.
* Opt-In (recommended) → User agrees to usage of cookies with a click on a 
  button, until then no non-necessary cookies are stored.

🌪️ *Update:* Please note that since 2020 only an opt-in is a permissible form
of consent to cookies within the EU! Users must actively consent,
preset checkboxes or opt-outs are no longer permitted.

The cookie consent bar should link to a page informing about cookie usage (eg.
privacy notes)…

* in plain, jargon‑free language
* why are cookies used (to remember user actions, identify users etc)
* types of used cookies (eg. session or permanent, first or third‑party)
* who controls/accesses the cookie‑related information (first or third‑party)
* how users can withdraw consent (eg. close browser, clear browser cache)

The different origins, usage types and ways to gain consent are considered in 
this repository. It uses »levels« for this, see sections »Usage & Levels«.

## Installation

Packagist https://packagist.org/packages/pixelbrackets/cookie-consent

## Usage

The most important script of this package is `cookie-consent.js`, which
handles the consent. Everything else is optional. The script looks for
certain data attributes in elements with a certain class name. If everything
is missing, then it will set default values instead.

The script allows different consent »levels«, triggered by different events.
Read more about these levels in the following chapter.

All other scripts which want to write cookies, must read the given consent level
to continue or break up.

### Integration

🔰 Take a look at the `demo.html` file, which holds all example files.

- Copy cookie consent bar HTML and integrate it into your own view
  - Change the labels/text as you want, but try to keep the markup structure
  - Add a link to a separate privacy page
  - See the »configuration« section to learn how to change the default values
    for consent levels and duration
- Integrete `cookie.js` and `cookie-consent.js` into your own view
  - Maybe concat and minify the files according to your own asset structure
- Either copy the default stylesheet `cookie-consent.css` or write your own
- The consent level is stored in a cookie called »cookie-consent«, you may
  write your own actions to change the level or use the value server-sided
- Adapt all scripts with cookies actions to read the given consent level
  - The example file `tracker.js` shows how to react to the level in JavaScript
    ```javascript
    if ($.cookie('cookie-consent') !== null && $.cookie('cookie-consent') >= 50) { /*consent given*/ }
    ```

### Levels

The cookie script sets the following levels. They are triggered by different 
events, like continued usage of the website or a button click (Opt-In).

All other scripts need to ask for the current level to check whether they are 
allowed to write a cookie or not.

| Set Level 〽️ | Triggered by | Cookie Bar Visibillity | Cookie Types Allowed | Notes |
| ----- | ------------ | ---------------------- | -------------------- | ----- |
| `null` | Browser blocks cookies | Dont show | None | Website may not work |
| 0 | Opt-Out | Dont show | First Party, Session, Necessary cookies |  |
| 1 | Agreement due to continued usage | Keep showing | First Party, Session, Necessary cookies |  |
| 10 | Agreement due to continued usage | Keep showing | First-Party, Persistent, Experience |  |
| 20 | Agreement due to continued usage | Keep showing | First-Party, Persistent, Analytical |  |
| 30 | Agreement due to continued usage | Keep showing | Third-Party, Session, Experience |  |
| 40 | Agreement due to continued usage | Keep showing | Third-Party, Persistent, Analytical |  |
| 50 | Opt-In | Dont Show | First-Party, Persistent, Experience |  |
| 60 | Opt-In | Dont Show | First-Party, Persistent, Analytical |  |
| 70 | Opt-In | Dont Show | Third-Party, Session, Experience |  |
| 80 | Opt-In | Dont Show | Third-Party, Persistent, Analytical |  |

#### Examples

* Internal shopping cart → no consent required
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

❕ It is not mandatory to set these values if the default values are sufficient
for your use case.

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

## Source

https://gitlab.com/pixelbrackets/cookie-consent

## License

GNU General Public License version 2 or later

The GNU General Public License can be found at http://www.gnu.org/copyleft/gpl.html.

## Author

Dan Untenzu (<mail@pixelbrackets.de> / [@pixelbrackets](https://github.com/pixelbrackets))

## Changelog

[./Changelog.md](./Changelog.md)

## Contribution

This script is Open Source, so please use, patch, extend or fork it.
