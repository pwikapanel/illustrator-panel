
console.groupEnd()

//———————————————————————————————————————— initialize variables

var TOOLSVERSION   = '1.0.7'                   // string    shown in source picker panel

var INTMS          = 10000  // interval for the updating panel
var ISSVIJA        // boolean    if fromtmost doc is a svija page (in a SYNC folder)
var LASTPATH       // string     last file path for a svija page
var SITEURL        // string     url of most recent svija site
var SYNCPATH       // string     absolute path to SYNC folder
var LANG = 'fr'

if (LANG != 'fr') LANG = LANGDEFAULT // dev use only — delete when done

var LANGDEFAULT    // string     two letter language code
var LANG           // string     two letter language code
var DICTIONARY     // object     JSON english and french traductions
var ISMAC          // boolean    macOS boolean · set in projectInfo.js
var INTERFACE      // number     0-3 dark to light
var ACCENTBRIGHT   // string     hsl color
var ACCENTDIM      // string     hsl color
var MAXWIDTH = 240   // number    width of panel

elapse(15, `        variables initialized`)

