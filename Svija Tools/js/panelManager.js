
/*:::::::::::::::::::::::::::::::::::::::: panelManager.js */

/*———————————————————————————————————————— notes

    https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_10.x/Documentation/CEP%2010.0%20HTML%20Extension%20Cookbook.md

    manages size, color & content

    the panel has three states:

    - less
    - more
    - closed */

//———————————————————————————————————————— disable context menu

var menuXML = '<Menu> \
  <MenuItem Id="reloadPanel" Label="Svija Tools" Enabled="false" Checked="false"/> \
</Menu>';

CEP.setContextMenu(menuXML, flyoutMenuCallback)
function flyoutMenuCallback(event){ lert(event) }

//———————————————————————————————————————— initialize more status

if (typeof localStorage.more == 'undefined')
  localStorage.more = 'false'

//———————————————————————————————————————— match color to Ai interface

CEP.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, setPanelColor)

setPanelColor()

//———————————————————————————————————————— choose panel content

setInterval(chooseContent, INTMS) // commenting this fixes error

function chooseContent(){

//STYLE = getComputedStyle(document.body) // moved to globalVariables.js

  if (!ISSVIJA){
    showClosed()
    return
  }
  
  if (localStorage.more == 'true')
    showMore()
  else
    showLess()
}


//:::::::::::::::::::::::::::::::::::::::: content visibility

/*———————————————————————————————————————— showMore()

    also used in more.js */

function showMore(){
  localStorage.more       = 'true'

    moreDiv.style.display = 'block'
   linkLess.style.display = 'inline'

   linkMore.style.display = 'none'

    mainDiv.style.display = 'block'
  bottomBar.style.display = 'block'
  closedDiv.style.display = 'none'

  setPanelSize('bottomBar')
}

/*———————————————————————————————————————— showLess()

    also used in more.js */

function showLess(){
  localStorage.more         = 'false'

   linkMore.style.display   = 'inline'

    moreDiv.style.display   = 'none'
   linkLess.style.display   = 'none'

      mainDiv.style.display = 'block'
    bottomBar.style.display = 'block'
  closedDiv.style.display   = 'none'

  setPanelSize('bottomBar')
}

/*———————————————————————————————————————— showClosed()

    */

function showClosed(){

    closedDiv.style.display = 'block'

      moreDiv.style.display = 'none'
      mainDiv.style.display = 'none'
    bottomBar.style.display = 'none'

  setPanelSize('closedDiv')
}


//:::::::::::::::::::::::::::::::::::::::: size & color

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

  CEP.resizeContent(w, h-1)
}

/*———————————————————————————————————————— setPanelColor()

  https://fenomas.com/2014/09/cep-5-events-en/

  changes body ID to correspond to AI user interface
  the body ID is keyed to CSS color definitions */

function setPanelColor() { // did have (event) as arg

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
  varToCep('INTERFACE', INTERFACE)

  document.body.id = "if_" + INTERFACE
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

