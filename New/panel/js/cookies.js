/*

    copied from cloud/svija/templates/svija/js/cookies.js

    except line 12 commented out */

function setCookie(name, value, expDays) {
  value = escape(value)

//deleteParentCookieIfNecessary(name, window.location.hostname)

//if (expDays > 7) expDays = 7; // max in Safari

  var d = new Date()
  d.setTime(d.getTime() + (expDays*24*60*60*1000))

  var expy = '; expires=' + d.toUTCString()
  var path = '; path=/'
  var domn = '; domain='  + window.location.hostname

//var secu = '; SameSite=Lax; Secure;';
// secu deprecated: developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
// var complete = value + expy + path + domn + secu;

  var complete = value + expy + path + domn
  document.cookie = name + '=' + complete
}

function getCookie(cname) {
  var name = cname + "="
  var ca = document.cookie.split(';')
  for(var i=0; i<ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0)==' ') c = c.substring(1)
    if (c.indexOf(name) != -1){
      return unescape(c.substring(name.length,c.length))
    }
  }
  return ""
}
