
/* vim: set foldmethod=marker fmr=/*—,///: */

//:::::::::::::::::::::::::::::::::::::::: variables.js

/*———————————————————————————————————————— set in shell */

 // AIVERSION        // string     illustrator version
 // CEP              // object     new CSInterface()
 // HOSTENV          // object     CEP.getHostEnvironment()
 // ISMAC            // boolean
 // LC               // string     two-letters: en_US fr_FR etc.
 // TOOLSPATH        // string     CEP.getSystemPath(SystemPath.EXTENSION)
 // TRANSLATE        // object     CEP.initResourceBundle()  https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_11.x/Documentation/CEP%2011.1%20HTML%20Extension%20Cookbook.md

VARTOCEP('LC'          , LC          )
VARTOCEP('ISMAC'       , ISMAC       )
VARTOCEP('TOOLSVERSION', TOOLSVERSION)
VARTOCEP('AIVERSION'   , AIVERSION   )
///
/*———————————————————————————————————————— set here */

var TOOLSVERSION   = '1.0.7'   // string shown in info panel
var INTMS          = 500       // interval for the updating panel
var LCDEFAULT      = 'en'      // string     two letter language code
if (LC != 'fr') LC = LCDEFAULT // dev use only — delete when done
///
/*———————————————————————————————————————— set in panelManager */

var INTERFACE        // number     0-3 dark to light
///
/*———————————————————————————————————————— set in projectManager */

var ISSVIJA          // boolean    if fromtmost doc is a svija page (in a SYNC folder)
var LASTPATH         // string     last file path for a svija page
var SITEURL          // string     url of most recent svija site
var SYNCPATH         // string     absolute path to SYNC folder
///
/*———————————————————————————————————————— set in svijaLogo */

var STYLE = getComputedStyle(document.body) // object, managed in svijaLogo.js
///
/*———————————————————————————————————————— load JSON colors & transmit to CEP

    load Illustrator CSS colors
    see Illustrator panel colors.ai
 
    these fields are not in a consistant order
    from dark to light:

    --labelDisabled
    --panelBgDark 
    --panelBorder   */

var colorDefsJson = 'json/illustratorColorDefs.json'
GETLOCALFILE ('illustratorColorDefs.json', colorDefsJson, installColors)
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

elapse(70, `variables initialized`)

//:::::::::::::::::::::::::::::::::::::::: fin

