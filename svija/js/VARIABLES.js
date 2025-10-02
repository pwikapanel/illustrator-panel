
/* vim: set foldmethod=marker fmr=/*—,///: */

//:::::::::::::::::::::::::::::::::::::::: variables.js

/*———————————————————————————————————————— in shell.html

var CEP            = new CSInterface()
CEP.setContextMenu('<Menu></Menu>', function(){})

var TRANSLATE      = CEP.initResourceBundle() 
var ISMAC          = CEP.getOSInformation().substring(0,3) == 'Mac' // boolean    macOS boolean · set in projectManager.js
var PANELPATH      = CEP.getSystemPath(SystemPath.EXTENSION)
var MYDOCS         = CEP.getSystemPath(SystemPath.MY_DOCUMENTS)

var HOSTENV        = CEP.getHostEnvironment()
var LC             = HOSTENV.appUILocale.substr(0,2) // en_US
var AIVERSION      = HOSTENV.appVersion // illustrator version */

///
/*———————————————————————————————————————— set here */

const PANELVERSION   = '1.0.7'   // string shown in info panel
const INTMS          =  500      // interval for the updating panel
const STANDBYMS      = 1500      // how long is standby message shown

let OPENER
if (ISMAC) OPENER = '/usr/bin/open'
else       OPENER = 'C:\\Windows\\explorer.exe'

const LCDEFAULT      = 'en'      // string     two letter language code
if (LC != 'fr') LC = LCDEFAULT // dev use only — delete when done

VARTOCEP('LC'          , LC          )
VARTOCEP('ISMAC'       , ISMAC       )
VARTOCEP('PANELVERSION', PANELVERSION)
VARTOCEP('AIVERSION'   , AIVERSION   )
///
/*———————————————————————————————————————— set in panelManager */

let INTERFACE        // number     0-3 dark to light
///
/*———————————————————————————————————————— set in projectManager */

let ISSVIJA          // boolean    if fromtmost doc is a svija page (in a SYNC folder)
let LASTPATH         // string     last file path for a svija page
let SITEURL          // string     url of most recent svija site
let SYNCPATH         // string     absolute path to SYNC folder
///
/*———————————————————————————————————————— set in svijaLogo */

let STYLE = getComputedStyle(document.body) // object, managed in logo.js
///
/*———————————————————————————————————————— load JSON colors

    load Illustrator CSS colors
    see Illustrator panel colors.ai
 
    these fields are not in a consistant order
    from dark to light:

    --labelDisabled
    --panelBgDark 
    --panelBorder   */

if (typeof localStorage.cssVarJson != 'undefined'){
  installColors(localStorage.cssVarJson)
  elapse(60, `CSS JSON installed from localStorage`)
  }
else{
  var filePath = 'json/illustratorColorDefs.json'
  GETLOCALFILE ('illustratorColorDefs.json', filePath, retrieveColors)
  elapse(60, `  requested ${filePath}`)
}

///
/*———————————————————————————————————————— load JSON colors callback */

function retrieveColors(name, cssVarJson, path){
  if (cssVarJson == '' || !cssVarJson.includes(':')){
    elapse(63, `⚠️ cssVarJson is empty or contains no colons`)
    return
  }

  localStorage.cssVarJson = cssVarJson
  installColors(cssVarJson)
}
///
/*———————————————————————————————————————— transmit colors to CEP */

function installColors(cssVarJson){
  if (cssVarJson == '' || !cssVarJson.includes(':')){
    elapse(77, `⚠️ cssVarJson is empty or contains no colons`)
    return
  }

  var cssVars = JSON.parse(cssVarJson)
  const root = document.documentElement

  cssVars.forEach(({ name, hsl }) => {
    root.style.setProperty(`--${name}`, `hsl(${hsl})`)
    CSSVARTOCEP(name)
//  elapse(26, `--${name} set to hsl(${hsl})`)
  })
}
///

elapse(70, `variables initialized`)

//:::::::::::::::::::::::::::::::::::::::: fin

