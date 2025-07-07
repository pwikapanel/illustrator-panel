
/* vim: set foldmethod=marker fmr=/*—,///: */

//:::::::::::::::::::::::::::::::::::::::: initialization.js

/*———————————————————————————————————————— initialize variables */

var TOOLSVERSION   = '1.0.7'   // string shown in info panel
var INTMS          = 500       // interval for the updating panel
///
/*———————————————————————————————————————— set in projectManager.js */

var STYLE = getComputedStyle(document.body)    // managed in svijaLogo.js
///

/*———————————————————————————————————————— more */

var LCDEFAULT = 'en'       // string     two letter language code
var DICTIONARY       // object     JSON english and french traductions
var INTERFACE        // number     0-3 dark to light
var MAXWIDTH = 240   // number    width of panel

var AIVERSION = HOSTENV.appVersion // illustrator version
var ISMAC = CEP.getOSInformation().substring(0,3) == 'Mac' // boolean    macOS boolean · set in projectManager.js

elapse(31, `variables initialized`)
elapse(32, `ISMAC=${ISMAC}`)
elapse(33, `AIVERSION=${AIVERSION}`)
///

// was set in shell.thml
if (LC != 'fr') LC = LCDEFAULT // dev use only — delete when done

/*———————————————————————————————————————— transmit valued to CEP */

varToCep('LC'          , LC          )
varToCep('ISMAC'       , ISMAC       )
varToCep('TOOLSVERSION', TOOLSVERSION)
varToCep('AIVERSION'   , AIVERSION   )
///
/*———————————————————————————————————————— load & transmit AI CSS

    load Illustrator CSS colors
    see Illustrator panel colors.ai
 
    these fields are not in a consistant order
    from dark to light:

    --labelDisabled
    --panelBgDark 
    --panelBorder   */

var colorDefsJson = 'json/illustratorColorDefs.json'
getLocalFile ('illustratorColorDefs.json', colorDefsJson, installColors)
elapse(17, `  requested ${colorDefsJson}`)

function installColors(name, contents, path){

  var cssVars = JSON.parse(contents)
  const root = document.documentElement

  cssVars.forEach(({ name, hsl }) => {
    root.style.setProperty(`--${name}`, `hsl(${hsl})`)
    cssVarToCep(name)
    elapse(26, `--${name} set to hsl(${hsl})`)
  })
}
///
/*———————————————————————————————————————— set in projectManager */

var ISSVIJA  = false // boolean    if fromtmost doc is a svija page (in a SYNC folder)
var LASTPATH = ''    // string     last file path for a svija page
var SITEURL  = ''    // string     url of most recent svija site
var SYNCPATH = ''    // string     absolute path to SYNC folder
///

//:::::::::::::::::::::::::::::::::::::::: fin

