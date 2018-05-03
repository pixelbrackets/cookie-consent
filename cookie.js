// Fix: Allow to exist with or without jQuery
if ($ === null || typeof $ !== 'object') {
  var $ = new Object;
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
