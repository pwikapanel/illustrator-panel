
var DEBUG          = true                   // boolean   show alerts as well as console
var AIVERSIONMIN   = 26                     // number    required for xref links
var LANGDEFAULT    = 'en'                   // string    2-letter abbreviation
var LANG           = HOSTENV.appUILocale.substr(0,2) // or appLocale
var MAXWIDTH       = 240                    // number    width of panel
var AIVERSION      = HOSTENV.appVersion
var ISMAC          = CEP.getOSInformation().substring(0,3) == 'Mac'
var MYDOCS         = CEP.getSystemPath(SystemPath.MY_DOCUMENTS)
var DICTIONARY     // object     JSON english and french traductions
var INTERFACE      // number     0-3, set by js/panelManager.js // illustrator color

/*———————————————————————————————————————— translate(key)
    */

function translate(key){
  res = DICTIONARY.filter(record=> record.key==key && record.lang==LANG)

  if (res.length == 0) elapse(762, ' translate() - Missing translation key: "' + key + '"')
  else return res[0].text
}

