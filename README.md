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
- Separate JavaScript logic, styles and markup
- Allow to copy/integrate a simple, single JavaScript (no CDN, no framework)
- Allow to change text/labels as desired
- Add basic fallbacks (eg. styles), which may be overwritten
- Dont make any external request

Requirements
------------

* JavaScript

Demo
----

https://pixelbrackets.gitlab.io/cookie-consent/

Installation
------------

Packagist https://packagist.org/packages/pixelbrackets/cookie-consent

Usage
-----

See `demo.html`, which holds all example files.

Recommended usage:

- Copy cookie consent bar HTML and integrate it into your own view
  - Change the labels/text as you want, but keep the markup the same
- Integrete `cookie.js` and `cookie-consent.js` into your own view
  - Maybe concat and minify the files according to your own asset structure
- Either copy the default stylesheet `cookie-consent.css` or write your own
- Use the example file `tracker.js` and adapt the content to your own needs

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
