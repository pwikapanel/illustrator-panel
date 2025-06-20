
/*:::::::::::::::::::::::::::::::::::::::: panelManager.js */

// manages size, color & content

//———————————————————————————————————————— match color to Ai interface

setBodyIdColor()

CEP.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, setBodyIdColor)

//———————————————————————————————————————— choose panel content

setInterval(function(){

  var noSvijaFileOpen = true
  if (typeof ISSVIJA == 'undefined') noSvijaFileOpen = false
  else if (ISSVIJA == true) noSvijaFileOpen = false

  // no svija file is open so we show reduced content
  if (noSvijaFileOpen){
    var bottomEdge           = 'dormantDiv'

    dormantDiv.style.display = 'block'
      moreDiv.style.display  = 'none'
      mainDiv.style.display  = 'none'
    bottomBar.style.display  = 'none'
  }

  // svija file is open so we show Svija Tools
  else{
    if (typeof localStorage.moreLess == 'undefined')
      localStorage.moreLess = 'less'

    //console.log('panelManager: moreLess='+localStorage.moreLess)
    var bottomEdge           = 'bottomBar'

    dormantDiv.style.display ='none'
    mainDiv.style.display    ='block'
    bottomBar.style.display  ='block'

    if (localStorage.moreLess == 'more') showMore()
    else showLess()
  }

  setPanelSize(bottomEdge)
}, INTMS)


//:::::::::::::::::::::::::::::::::::::::: functions

/*———————————————————————————————————————— setPanelSize(objID)

    sets bottom edge of panel to match bottom edge
    of supplied object */

function setPanelSize(referenceObjId){

  var referenceObject = document.getElementById(referenceObjId)

  // don't log because it happens every 1/2 second
  if (referenceObject === null) return true

  var f = CEP.getScaleFactor()
  var w = Math.round(MAXWIDTH / f)
  var h = Math.round(referenceObject.getBoundingClientRect().bottom/f)

  CEP.resizeContent(w, h)
}

/*———————————————————————————————————————— setBodyIdColor()

  https://fenomas.com/2014/09/cep-5-events-en/

  changes body ID to correspond to AI user interface
  the body ID is keyed to CSS color definitions */

function setBodyIdColor() { // did have (event) as arg

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
  ut_transmitToCEP('INTERFACE', INTERFACE)

  document.body.id = "if_" + code
}

/*———————————————————————————————————————— showMore()

    also used in more.js */

function showMore(){
  localStorage.moreLess    = 'more'

   moreDiv.style.display   = 'block'


  linkMore.style.display   = 'none'
  linkLess.style.display   = 'inline'

  setPanelSize('bottomBar')
}

/*———————————————————————————————————————— showLess()

    also used in more.js */

function showLess(){
  localStorage.moreLess  = 'less'

   moreDiv.style.display = 'none'

  linkMore.style.display = 'inline'
  linkLess.style.display = 'none'

  setPanelSize('bottomBar')
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

