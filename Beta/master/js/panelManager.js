
/*———————————————————————————————————————— panel size

     */

var ms = 500

setInterval(function(){

  if (typeof ISSVIJA == 'undefined'){
    dormantDiv.style.display='none'
    moreDiv.style.display='block'
    mainDiv.style.display='block'
    bottomBar.style.display='block'
    var whichObj = bottomBar 
  }
  else if (ISSVIJA){
    dormantDiv.style.display='none'
    moreDiv.style.display='block'
    mainDiv.style.display='block'
    bottomBar.style.display='block'
    var whichObj = bottomBar 
  }
  else{
    dormantDiv.style.display='block'
    moreDiv.style.display='none'
    mainDiv.style.display='none'
    bottomBar.style.display='none'
    var whichObj = dormantDiv
  }

  var f = CEP.getScaleFactor()
  var w = Math.round(MAXWIDTH / f)
  var h = Math.round(whichObj.getBoundingClientRect().bottom/f)

  CEP.resizeContent(w, h)
}, ms)

/*———————————————————————————————————————— setInterface()

  https://fenomas.com/2014/09/cep-5-events-en/

  returns 0-3, corresponding to the 4 shades
  of interface colors availablein Ai prefs */

function setInterface() { // did have (event) as arg
  var hostEnv = window.__adobe_cep__.getHostEnvironment()
  var skinInfo = JSON.parse(hostEnv).appSkinInfo
  var color = skinInfo.panelBackgroundColor.color

  switch(color.red) {
  case  50: code = 0; break;
  case 184: code = 2; break;
  case 240: code = 3; break;
   default: code = 1; break; // case 83
  }

  document.body.id = "if_" + code
}

setInterface()

CEP.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, setInterface)

