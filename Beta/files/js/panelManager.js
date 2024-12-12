
/*:::::::::::::::::::::::::::::::::::::::: panelManager.js */

/*———————————————————————————————————————— panel size

     need to integrate status of localStorage.moreLess */

setInterval(function(){

  var showDormant = true
  if (typeof ISSVIJA == 'undefined') showDormant = false
  else if (ISSVIJA == true) showDormant = false

  if (showDormant){
    var bottomEdge = 'dormantDiv'
    dormantDiv.style.display ='block'

      moreDiv.style.display  ='none'
     mainDiv.style.display  ='none'
    bottomBar.style.display  ='none'
  }

  else{
    //console.log('panelManager: moreLess='+localStorage.moreLess)
    var bottomEdge = 'bottomBar'
    dormantDiv.style.display ='none'

    mainDiv.style.display   ='block'
    bottomBar.style.display  ='block'

    if (localStorage.moreLess == 'more') showMore()
    else showLess()
  }

  setPanelSize(bottomEdge)
}, INTMS)

function setPanelSize(objID){

  var obj = document.getElementById(objID)
  if (obj === null){
    console.log(objID + ' not found')
    return true
  }

  var f = CEP.getScaleFactor()
  var w = Math.round(MAXWIDTH / f)
  var h = Math.round(obj.getBoundingClientRect().bottom/f)

  CEP.resizeContent(w, h)
}

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

  INTERFACE = code
  document.body.id = "if_" + code
}

setInterface()

CEP.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, setInterface)


/*:::::::::::::::::::::::::::::::::::::::: fin */

