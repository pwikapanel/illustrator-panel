
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

window.addEventListener('resize', function(){
  fixSquash()
})

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

function setPanelSize(referenceObj){

  var referenceObject = document.getElementById(referenceObj)

  // don't log because it happens every 1/2 second
  if (referenceObject === null) return true

  var w = 240 // max width in manifest.csxs
  var h = referenceObject.getBoundingClientRect().bottom

  if(ISMAC){
    var f = CEP.getScaleFactor()
    w = w / f
    h = h / f
  }

  CEP.resizeContent(Math.round(w), Math.round(h)-1)
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

/*———————————————————————————————————————— fixSquash()

    fix problem where undocking panel from another panel
    that's much wider cause squashed interface */

function fixSquash(){
  var obj = document.getElementById('closedDiv')
  elapse(197, 'mdw: '+obj.offsetWidth)
//location.reload()
return
  var w = window.innerWidth
  var h = window.innerHeight

  CEP.resizeContent(w+10, h+10)
  CEP.resizeContent(w, h)
}
///
/*

I need to check if the width changes from something to 240
so I need to keep a record of the current width

fixSquash will check: if (oldWidth > 240 and newWidth==240) location.reload()



*/
