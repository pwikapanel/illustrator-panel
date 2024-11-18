/*———————————————————————————————————————— set body id to match interface code

    */

var c = getInterfaceCode()
document.body.setAttribute("id", "body"+c)

// set width & height
// is it possible to block resizing (do as if manifest had imposed a limit)?

// need a list of current localStorage scripts
// parse list of scripts, install each
// install single script

/*———————————————————————————————————————— getInterfaceCode()

  https://fenomas.com/2014/09/cep-5-events-en/

  returns 0-3, corresponding to the 4 shades
  of interface colors availablein Ai prefs */

function getInterfaceCode() { // did have (event) as arg

  var hostEnv  = window.__adobe_cep__.getHostEnvironment()
  var skinInfo = JSON.parse(hostEnv).appSkinInfo
  var color    = skinInfo.panelBackgroundColor.color

  switch(color.red) {
  case  50: code = 0; break
  case 184: code = 2; break
  case 240: code = 3; break
   default: code = 1; break // case 83
  }

  return code
}



