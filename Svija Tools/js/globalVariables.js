
//:::::::::::::::::::::::::::::::::::::::: globalVariables.js

console.groupEnd()

//———————————————————————————————————————— initialize variables

var TOOLSVERSION   = '1.0.7'   // string shown in info panel
var INTMS          = 500       // interval for the updating panel

//———————————————————————————————————————— set in projectInfo.js

var ISSVIJA  = false     // boolean    if fromtmost doc is a svija page (in a SYNC folder)
var STYLE    = getComputedStyle(document.body) // provokes error
var LASTPATH = ''    // string     last file path for a svija page
var SITEURL  = ''     // string     url of most recent svija site
var SYNCPATH = ''    // string     absolute path to SYNC folder

/*———————————————————————————————————————— recover localStorage

    get values from LS if possible*/

if (typeof localStorage.lastPath != 'undefined')
  LASTPATH = localStorage.lastPath

if (typeof localStorage.siteUrl != 'undefined')
  SITEURL = localStorage.siteUrl

if (typeof localStorage.synchPath != 'undefined')
  SYNCPATH = localStorage.synchPath

//———————————————————————————————————————— more

var LANG = 'fr'

if (LANG != 'fr') LANG = LANGDEFAULT // dev use only — delete when done

var LANGDEFAULT      // string     two letter language code
var LANG             // string     two letter language code
var DICTIONARY       // object     JSON english and french traductions
var INTERFACE        // number     0-3 dark to light
var MAXWIDTH = 240   // number    width of panel

var AIVERSION = HOSTENV.appVersion // illustrator version
var ISMAC = CEP.getOSInformation().substring(0,3) == 'Mac' // boolean    macOS boolean · set in projectInfo.js

elapse(28, `        variables initialized`)
elapse(29, `        ISMAC=${ISMAC}`)
elapse(30, `        AIVERSION=${AIVERSION}`)

//———————————————————————————————————————— transmit valued to CEP

transmitToCep('ISMAC'    )
transmitToCep('AIVERSION')
transmitToCep('LASTPATH' )
transmitToCep('SITEURL'  )
transmitToCep('SYNCPATH' )

//:::::::::::::::::::::::::::::::::::::::: fin

