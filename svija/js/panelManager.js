
/* vim: set foldmethod=marker fmr=/*\—,///: */

/*:::::::::::::::::::::::::::::::::::::::: panelManager.js */

// background-color:var(--panelBg);

/*———————————————————————————————————————— notes

    https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_10.x/Documentation/CEP%2010.0%20HTML%20Extension%20Cookbook.md

    manages size, color & content

    the panel has three states:

    - less
    - more
    - closed */
///

/*———————————————————————————————————————— startup & addListener */

var panelContentInterval = setInterval(setPanelContent, INTMS)

setPanelColor()
CEP.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, setPanelColor)
///

/*:::::::::::::::::::::::::::::::::::::::: interrupt functions */

/*———————————————————————————————————————— setPanelContent()

    three possibilities :
    - closed view
    - less view
    - more view */


function setPanelContent(){
//elapse(40, `ISSVIJA=${ISSVIJA}`)

  document.body.style.backgroundImage = 'none';

  if (!ISSVIJA){
    showClosed()
    return
  }
//elapse(46, `typeof=${typeof localStorage.more}`)
//elapse(46, `value=${localStorage.more}`)
  
  if (typeof localStorage.more == 'undefined')
    showLess()
  else if (localStorage.more == 'false')
    showLess()
  else
    showMore()
}
///
/*———————————————————————————————————————— setPanelColor()

  https://fenomas.com/2014/09/cep-5-events-en/

  changes body ID to correspond to AI user interface
  the body ID is keyed to CSS color definitions */

function setPanelColor(){

  var hostEnv  = window.__adobe_cep__.getHostEnvironment()
  var skinInfo = JSON.parse(hostEnv).appSkinInfo
  var color    = skinInfo.panelBackgroundColor.color

  switch(color.red) {
  case  50: INTERFACE = 0; break;
  case 184: INTERFACE = 2; break;
  case 240: INTERFACE = 3; break;
   default: INTERFACE = 1; break; // case 83
  }

  document.body.id = `if_${INTERFACE}`
  VARTOCEP('INTERFACE', INTERFACE)

  SETDIMACCENT() // because dark accent depends on panel background
}
///

/*:::::::::::::::::::::::::::::::::::::::: functions */

/*———————————————————————————————————————— showMore()

    also used in more.js */

function showMore(){
  closedDiv.style.display = 'none'
   linkMore.style.display = 'none'

    moreDiv.style.display = 'block'
    mainDiv.style.display = 'block'
  bottomDiv.style.display = 'block'

   linkLess.style.display = 'inline'
  setPanelSize('bottomDiv')
  localStorage.more       = 'true'
}
///
/*———————————————————————————————————————— showLess()

    also used in more.js */

function showLess(){
  closedDiv.style.display   = 'none'
    moreDiv.style.display   = 'none'
   linkLess.style.display   = 'none'

      mainDiv.style.display = 'block'
    bottomDiv.style.display = 'block'

   linkMore.style.display   = 'inline'
  setPanelSize('bottomDiv')
  localStorage.more         = 'false'
}
///
/*———————————————————————————————————————— showClosed()

    */

function showClosed(){

      moreDiv.style.display = 'none'
      mainDiv.style.display = 'none'
    bottomDiv.style.display = 'none'

    closedDiv.style.display = 'block'

  setPanelSize('closedDiv')
}
///
/*———————————————————————————————————————— setPanelSize(referenceObj)

    sets bottom edge of panel to match bottom edge
    of supplied object */

let DANGER = false // panel is docked to much larger panel

function setPanelSize(referenceObj){

  let referenceObject = document.getElementById(referenceObj)

  // don't log because it happens every 1/2 second
  if (referenceObject === null) return true

  // max width in manifest.csxs
  const winDefaultWidth = 230 // width of transform, paragraph
  const macDefaultWidth = 240 // and other fixed-width panels

  let w, h

  if (ISMAC) w = macDefaultWidth
  else       w = winDefaultWidth

  h = referenceObject.getBoundingClientRect().bottom

  if(ISMAC){
    let f = CEP.getScaleFactor()
    w = w / f
    h = h / f
  }

  CEP.resizeContent(Math.round(w), Math.round(h)-1)

  //elapse(170, w+': '+mainDiv.getBoundingClientRect().right)

  // window went from extra wide to normal; on macOS this causes interface distortion
  if (ISMAC && window.innerWidth==Math.round(w) && DANGER==true) 
    location.reload()

  if (window.innerWidth > Math.round(w)) DANGER = true
  else                                   DANGER = false

  
}
///
/*———————————————————————————————————————— getInterface()

  https://fenomas.com/2014/09/cep-5-events-en/

  changes body ID to correspond to AI user interface
  the body ID is keyed to CSS color definitions */

function getInterface() { // did have (event) as arg

  var hostEnv  = window.__adobe_cep__.getHostEnvironment()
  var skinInfo = JSON.parse(hostEnv).appSkinInfo
  var color    = skinInfo.panelBackgroundColor.color

  switch(color.red) {
  case  50: return 0
  case 184: return 2
  case 240: return 3
   default: return 1
  }

}
///

/*:::::::::::::::::::::::::::::::::::::::: fin */

/*

I need to check if the width changes from something to 240
so I need to keep a record of the current width

fixSquash will check: if (oldWidth > 240 and newWidth==240) location.reload()



*/
