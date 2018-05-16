Cookie Consent
==============

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
- set inline styles → dont allow to separate scripts & styles, which makes it 
  harder to add custom stylesheets
- have to many styles or no styles at all
- hardcode labels/text in the JavaScript → limit translations & text changes
- are too big/complex (mostly because styles, scripts & labels are mixed and the 
  options to change all of them are more complex then the cookie logic itself)

Goals of this library:

- KISS
- Separate JavaScript logic, CSS styles and HTML markup
- Allow to copy/integrate a simple, single JavaScript (no CDN, no framework)
- Allow to change text/labels as desired (eg. in application)
- Add basic fallbacks (eg. styles), which may be overwritten/removed easily
- Allow to gain different types of consent
- Dont make any external request

Requirements
------------

* JavaScript
* Internet Explorer > 10, Firefox > 48, Chrome > 57

Demo
----

https://pixelbrackets.gitlab.io/cookie-consent/

Preliminary considerations
--------------------------

📚 Please read this section as a prerequisite prior to installing the script.

The most obvious reason for the EU cookie law is to inform the user about cookie 
usage. But even more important is the constraint for website operators to think 
about cookie usage. They should ask themself how intrusive a cookie is, 
what data does each cookie hold, is its lifespan appropriate to its purpose, 
is it a first or third‑party cookie, who controls the data?

Instead of saying “we use all kinds of cookies, I dont even know which and why” 
a website owner should be able to tell why and when cookies are used.

A website needs to differentiate…

* between first-party and third-party cookies,
* between session and persistent cookies and
* between necessary and non-necessary cookies.

A cookie is »necessary« if it is required by the service for the sole purpose of 
communication and storing stateful data. A first-party cookie whichs stores a 
login state or items in a shopping cart and is limited to a session only 
(erased when the user closes the browser), may be necessary.

Not all cookies requires a consent, see [European Commission - Internet Handbook](http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm).

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

There are diverging views about how to gain consent from a user.

* Agreement due to continued usage (most often used) → Inform user about 
  cookie usage and that the website will continute to do so if the user 
  continues to use the website
* Opt-Out → Inform user about cookie usage, but let the user disagree to usage 
  of cookies with a click on a button, after that no cookies (except the 
  denied consent) are stored
* Opt-In (recommended) → User aggrees to usage of cookies with a click on a 
  button, until then no non-necessary cookies are stored

The cookie consent bar should link to a page informing about cookie usage (eg.
privacy notes)…

* in plain, jargon‑free language
* why are cookies used (to remember user actions, identify users etc)
* types of used cookies (eg. session or permanent, first or third‑party)
* who controls/accesses the cookie‑related information (first or third‑party)
* how users can withdraw consent (eg. close browser, clear browser cache)

The different origins, usage types and ways to gain consent are considered in 
this repository. It uses »levels« for this, see sections »Usage & Levels«.

Installation
------------

Packagist https://packagist.org/packages/pixelbrackets/cookie-consent

Usage
-----

See `demo.html`, which holds all example files.

Recommended usage:

- Copy cookie consent bar HTML and integrate it into your own view
  - Change the labels/text as you want, but keep the markup structure the same
  - Add a link to a separate privacy page
- Integrete `cookie.js` and `cookie-consent.js` into your own view
  - Maybe concat and minify the files according to your own asset structure
- Either copy the default stylesheet `cookie-consent.css` or write your own
- Use the example file `tracker.js` and adapt the content to your own needs

The script allows to use diffent consent »levels« which may be configured 
and read to allow/disallow any scripts depending on the given consent.

### Levels

| Level 〽️ | Triggered by | Cookie Bar Visibillity | Cookie Types Allowed | Notes |
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

### Examples

* Internal shopping cart → no consent required
* Internal form wizard (persist user input), shall be allowed by continued usage → requires at least level `10`
* Internal tracking tool, shall be allowed by continued usage → requires at least level `20`
* Internal tracking tool, shall be allowed by Opt-In only → requires at least level `50`
* External form wizard (keep user input in session only), shall be allowed by continued usage → requires at least level `30`
* External tracking tool, shall be allowed by continued usage → requires at least level `30`
* External tracking tool, shall be allowed by Opt-In only → requires at least level `80`

⚠️️️ Example use cases, your use cases and internal requirements may differ.

### Required Configuration

In order to set up and use different levels the following options may be set:

* Level of cookie consent set by agreement due to continued usage
  * Set in `data-level` attribute of `.cookie-consent`-DIV in `demo.html`
  * Default value »1«, usually »20«, always lower than »50«
* Duration of cookie consent set by agreement due to continued usage
  * Set in `data-duration` attribute of `.cookie-consent`-DIV in `demo.html`
  * Set in hours
  * Default value »8«, usually »8«, never greater than »8760« (365 days)
* Level of cookie consent set by opt-in due to button click
  * Set in `data-level` attribute of `.cookie-consent`-BUTTON in `demo.html`
  * Default value »50«, usually »80«
* Duration of cookie consent set by opt-in due to button click
  * Set in `data-duration` attribute of `.cookie-accept`-BUTTON in `demo.html`
  * Set in hours
  * Default value »8«, usually »8760«, never greater than »8760« (365 days)

❕ It is not mandatory to set these values if the default values are sufficient
for your use case (default level is »1« = agreement due to continued usage,
should be good enough for necessary first party cookies).

Source
------

https://gitlab.com/pixelbrackets/cookie-consent

License
-------

GNU General Public License version 2 or later

The GNU General Public License can be found at http://www.gnu.org/copyleft/gpl.html.

Author
------

Dan Untenzu (<mail@pixelbrackets.de> / [@pixelbrackets](https://github.com/pixelbrackets))

Changelog
---------

[./Changelog.md](./Changelog.md)

Contribution
------------

This script is Open Source, so please use, patch, extend or fork it.
