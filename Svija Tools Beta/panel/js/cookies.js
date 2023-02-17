// copied from cloud/svija/templates/svija/js/cookies.js

//———————————————————————————————————————— setCookie(cname, value)

function setCookie(cname, value){
  var d = new Date();
  d.setTime(d.getTime() + (expires*24*60*60*1000));

  var expires = 30;
  value = escape(value);

  var expy = '; expires=' + d.toUTCString();
  var path = '; path=/';
  var domn = '; domain='  + window.location.hostname;
  var secu = '; SameSite=Lax; Secure;';

  var complete = value + expy + path + domn;
  document.cookie = cname + '=' + complete;
}

//———————————————————————————————————————— getCookie(cname)

function getCookie(cname){
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
  }
  return "";
}

//———————————————————————————————————————— fin
