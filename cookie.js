// Fix: Allow to exist with or without jQuery
if ($ === null || typeof $ !== 'object') {
  var $ = new Object;
}

// Source: https://stackoverflow.com/a/48521179/3894752
// Note: This will return false on localhost in Chrome https://stackoverflow.com/a/8225269
$.areCookiesEnabled = function() {
  try {
    // Create cookie
    document.cookie = 'cookietest=1';
    var cookiesEnabled = document.cookie.indexOf('cookietest=') != -1;
    // Delete cookie
    document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    return cookiesEnabled;
  } catch (e) {
    return false;
  }
}

// Source: https://gist.githubusercontent.com/bronson/6707533/raw/7317b0e0d204d00d3b01d06f9f18a09ae4ee6f4e/cookie.js
// cookie.js
//
// Usage:
//  $.cookie('mine', 'data', 5*60*1000)  -- write data to cookie named mine that lasts for five minutes
//  $.cookie('mine')                     -- read the cookie that was just set, function result will be 'data'
//  $.cookie('mine', '', -1)             -- delete the cookie

$.cookie = function(name,value,ms) {
  if(arguments.length < 2) {
    // read cookie
    var cookies = document.cookie.split(';')
    for(var i=0; i < cookies.length; i++) {
      var c = cookies[i].replace(/^\s+/, '')
      if(c.indexOf(name+'=') == 0) {
        return decodeURIComponent(c.substring(name.length+1).split('+').join(' '))
      }
    }
    return null
  }

  // write cookie
  var date = new Date()
  date.setTime(date.getTime()+ms)
  document.cookie = name+"=" + encodeURIComponent(value) + (ms ? ";expires="+date.toGMTString() : '') + ";path=/"
}
