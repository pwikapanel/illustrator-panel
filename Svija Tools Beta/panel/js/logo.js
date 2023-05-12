//:::::::::::::::::::::::::::::::::::::::: logo.js

var imgObj = document.getElementsByTagName('image')[0]

var imgAddr = "http://msg.svija.love/tools/" + env_version + "/logo" + env_interface + ".png"

// https://www.tutorialspoint.com/how-to-check-mentioned-file-exists-or-not-using-javascript-jquery

if(exists(imgAddr))
  imgObj.setAttributeNS('http://www.w3.org/1999/xlink', 'href', imgAddr);

//:::::::::::::::::::::::::::::::::::::::: functions

function exists(url){
  var http = new XMLHttpRequest()

  http.open('HEAD', url, false)
  http.send()

  if (http.status === 200)
     return true

  return false  //This file does not exist!
}

//:::::::::::::::::::::::::::::::::::::::: fin
