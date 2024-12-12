
//:::::::::::::::::::::::::::::::::::::::: start timer

var d = new Date()
var TIMER = d.getTime()

function elapse(str){
  var d = new Date()
  var t = d.getTime() - TIMER
  str = fillDigits(t) + ' μ ' + str
  console.log(str)
}

elapse(`016 - starting Svija Tools`)

//:::::::::::::::::::::::::::::::::::::::: necessary

var CEP            = new CSInterface()
var HOSTENV        = CEP.getHostEnvironment()
//r resourceBundle = CEP.initResourceBundle();

window.addEventListener('error', (event)=>{
  var str = encodeURI(event.message)
      str = `alert("${str}")`
  CEP.evalScript(str) })

//:::::::::::::::::::::::::::::::::::::::: global variables

var DEBUG         = true                   // boolean   show alerts as well as console

var TOOLSVERSION  = '1.0.7'                // string    shown in branch picker panel
var AIVERSIONMIN  = 26                     // number    required for xref links

var SERVER        = 'tools.svija.love'     // string    server to get remote code
var MAXWIDTH      = 240                    // number    width of panel
var INTMS         = 500                    // number    interrupt interval to refresh panel etc.
var BRANCHDEFAULT = 2                      // number    default branch (master)
var LANGDEFAULT   = 'en'                   // string    2-letter abbreviation
var MANIFESTPATH  =  'json/manifest.json'  // string  where manifest JSON is stored

var BRANCHNAME0   = 'alpha'                // string    used with BRANCH to derive folder names
var BRANCHNAME1   = 'beta'
var BRANCHNAME2   = 'master'

var AIVERSION     = HOSTENV.appVersion
var LANG          = HOSTENV.appUILocale.substr(0,2) // or appLocale
var ISMAC         = CEP.getOSInformation().substring(0,3) == 'Mac'
var MYDOCS        = CEP.getSystemPath(SystemPath.MY_DOCUMENTS)
var TOOLSPATH     = CEP.getSystemPath(SystemPath.EXTENSION)

var BRANCH			// number     0, 1, 2 alpha beta master
var DICTIONARY    // object     JSON english and french traductions
var INTERFACE     // number     0-3, set by js/panelManager.js // illustrator color
var ISSVIJA       // boolean    if fromtmost doc is a svija page (in a SYNC folder)
var JSONCOUNT     // number     counter, augmented by 1 with 
var LASTPATH      // string     last file path for a svija page
var LOCAL         // boolean    are we loading from local or not?
var LSLOADED      // boolean    localStorage version of panel is available
var MANIFEST      // object     JSON with all DOM elements
var SITEURL       // string     url of most recent svija site
var SYNCPATH      // string     absolute path to SYNC folder

var allVars = [   // harmonized - same in JS, localStorage and CEP
  'DEBUG',
  'TOOLSVERSION',

  'AIVERSION',
  'AIVERSIONMIN',
  'LANG',
  'ISMAC',
  'MYDOCS',
  'TOOLSPATH',

  'MAXWIDTH',
  'INTMS',
  'SERVER',

  'DICTIONARY',

  'BRANCH',
  'BRANCHNAME0',
  'BRANCHNAME1',
  'BRANCHNAME2',

  'INTERFACE',
  'ISSVIJA',
  'LASTPATH',
  'MANIFEST',
  'LOCAL',
  'SITEURL',
  'SYNCPATH'
]

//:::::::::::::::::::::::::::::::::::::::: development (delete later)

var LANG = 'fr'

if (typeof localStorage.LOCAL == 'undefined') LOCAL  =   true
else                    LOCAL = (localStorage.LOCAL === 'true')

//:::::::::::::::::::::::::::::::::::::::: set defaults

if (typeof localStorage.BRANCH == 'undefined')
  BRANCH = BRANCHDEFAULT
else
  BRANCH = parseInt(localStorage.BRANCH)

if (LANG != 'fr') LANG = LANGDEFAULT

elapse(`111 - variables initialized`)

//:::::::::::::::::::::::::::::::::::::::: harmonize variables

//———————————————————————————————————————— harmonize variables

harmonize('ls')
elapse(`115 - harmonized based on localStorage`)

harmonize('js')
elapse(`118 - harmonized based on JS`)


//:::::::::::::::::::::::::::::::::::::::: load panel

/*———————————————————————————————————————— load manifest locally

    loads JSON file with list of dom elements and
    source files used to construct the panel   */

elapse(`127 - fetching manifest`)

fetchLocal ('manifest', MANIFESTPATH, loadManifest)

//  if (LOCAL) fetchLocal ('manifest', path, loadManifest)
//  else       fetchRemote('manifest', path, loadManifest)

/*———————————————————————————————————————— technical description 

    runs                loads           how       calls

    shell.html       manifest.json    callback —› loadManifest
    loadManifest                       direct  —› loadLibrary
    loadLibrary      each script      callback —› checkinScript
    checkinScript                      direct  —› activateLibrary (skipped if not last script)
    activateLibrary                     none   */

/*———————————————————————————————————————— 1. loadManifest(scriptID, str, path)

    loads the manifest for the active branch into the global variable

        MANIFEST

    it's an object with keys and values. The first line is

    { "build":1, "name":"manifest" ,"ext":"json", "loaded":false } */

function loadManifest(unused, str, path){

  if (str == '') return true

  try{ MANIFEST = JSON.parse(str).filter(record => !isNaN(record.build)) }      /* exclude comments */
  catch(msg){ lert( `JSON Parse Error\n${msg}\n${path}` ); return true   }

  var manifestRefs = MANIFEST.filter(record => record.name =="manifest")
  
  if ( manifestRefs.length < 1                            ){ lert('Manifest Error\nMissing manifest reference'); return true }
  try{ MANIFESTVERSION = manifestRefs[0].build } catch(msg){ lert('Manifest Error\nMissing build number'      ); return true }

  MANIFEST.filter(record=> record.name=='manifest')[0]['loaded'] = true

  //elapse(`198 - manifest loaded')
  loadLibrary()
}

/*———————————————————————————————————————— 2. loadLibrary(manifest) TO COMPLETE, ERROR-CHECKING

    this will load the relevant files into memory but NOT activate
    them. they will be activated only when they are all loaded
    and validated in the MANIFEST json category "loaded" */

function loadLibrary(){

  for (var x=1; x<MANIFEST.length; x++){

    var scriptBuild =  MANIFEST[x]['build']

    // if build is a string it's a commment in the JSON
    if (typeof scriptBuild == "string") continue 

//  if (scriptBuild < 0){
//    deleteElement(scriptType, scriptID)
//    continue
//  }

    passthrough = MANIFEST[x]['name'] +'_'+ MANIFEST[x]['build'] +'_'+ MANIFEST[x]['ext']

//  var localStorageRef  = scriptType + passthrough
//  var localStorageRef  = scriptType + passthrough + 'build'
//  // if it's already up to date
//  if (typeof(localStorage[localStorageRef]) != 'undefined')
//    if (bld <= localStorage[localStorageRef])
//      return true

    path = MANIFEST[x]['ext'] + '/' + MANIFEST[x]['name'] + '.' + MANIFEST[x]['ext']

  //if (x==1) lert(passthrough+'\n'+path)
    // utilities_0_jsx
    // jsx/utlities.jsx

    if(LOCAL) fetchLocal(passthrough, path, checkinScript)
        else fetchRemote(passthrough, path, checkinScript)

  }
  //elapse(`243 - library now loading: ' + elapse(TIMER) + ' ms')
}

/*———————————————————————————————————————— 3. checkinScript(manifest)

    this will create the localStorage variable for each script
    then mark the script as loaded in MANIFEST */

function checkinScript(identifier, contents, path){

  var nameParts = identifier.split('_')

  // users = users.filter(obj => obj.name == filter.name && obj.address == filter.address)

  var manifestRefs = MANIFEST.filter(record=> record.name==nameParts[0] && record.ext==nameParts[2])

  if (manifestRefs.length>0){
    localStorage[identifier] = contents
    MANIFEST.filter(record=> record.name==nameParts[0] && record.ext==nameParts[2])[0]['loaded'] = true
//  //elapse(`253: '+identifier+' loaded')
  }
  else
    lert('Not found: '+nameParts[0])

  activateLibrary()
}

/*———————————————————————————————————————— 4. activateLibrary()

    loads values from localStorage into actual DOM elements */

function activateLibrary(){

  var notYetLoaded =  MANIFEST.filter(record=> record.loaded==false)
  if (notYetLoaded.length > 0){ return "not yet loaded" }

  //elapse(`279 - library now activating: ' + elapse(TIMER) + ' ms')

  for (var x=1; x<MANIFEST.length; x++){

    var identifier = MANIFEST[x]['name'] +'_'+ MANIFEST[x]['build'] +'_'+ MANIFEST[x]['ext']

    if (MANIFEST[x]['id'] != '')
      var objID = MANIFEST[x]['id']
    else
      var objID = MANIFEST[x]['name'] + capitalize(MANIFEST[x]['ext'])

    var functionName = 'load' + capitalize(MANIFEST[x]['ext'])
    window[functionName](objID, localStorage[identifier])
  }

  localStorage.MANIFEST = JSON.stringify(MANIFEST)

  if (LOCAL) var rep = 'local source'
  else var rep = 'remote server'

  harmonize('js')
  //elapse(`300 - ' + branchName(BRANCH) + translate('branch loaded') + rep + ': ' + elapse(TIMER) + ' ms')
}


// need to check for doubles (accentcolor)
// db functions to handle filters

//:::::::::::::::::::::::::::::::::::::::: functions ::::::::::::::::::::::::::::::::::::::::

//:::::::::::::::::::::::::::::::::::::::: script loaders

/*———————————————————————————————————————— loadCss(scriptID, contents)

    installs a CSS sheet */

function loadCss(scriptID, contents){
  var obj = document.getElementById(scriptID)
  if (obj != null) obj.remove()

  var obj = document.createElement('style')
  document.head.appendChild(obj)

  obj.ID = scriptID
  obj.innerHTML = contents
}

/*———————————————————————————————————————— loadHtml(scriptID, contents)

    installs an HTML block */

function loadHtml(scriptID, contents){
  var obj = document.getElementById(scriptID)
  if (obj != null) obj.remove()

  var obj = document.createElement('div')
  document.body.appendChild(obj)

  obj.id = scriptID
  obj.innerHTML = contents

}

/*———————————————————————————————————————— loadJs(scriptID, contents)

    installs a JS block */

function loadJs(scriptID, contents){
  var obj = document.getElementById(scriptID)
  if (obj != null) obj.remove()

  var obj = document.createElement('script')
  document.body.appendChild(obj)

  obj.ID = scriptID
  obj.innerHTML = contents
}

/*———————————————————————————————————————— loadJson(scriptID, contents)

    for translation */

function loadJson(scriptID, contents){

  var varNameArray = JSON.parse(contents).filter(record => typeof record.name != 'undefined')
  var varName = varNameArray[0].name

  try{
    window[varName] = JSON.parse(contents).filter(record => record.build != 'fin' && typeof record.name == 'undefined')
    localStorage[varName] = JSON.stringify(window[varName])
//  if (varName == 'DICTIONARY') lert(localStorage[varName])
  elapse(`305 - loadJson(${varName})`)
  }

  catch(e){
    lert('JSON '+scriptID+' not loaded (line 309)\n'+e)
  }

}

/*———————————————————————————————————————— loadJsx(bld, which, src) NOT IMPLEMENTED

    */

function loadJsx(scriptID, contents){
  elapse(`348 - loadJsx(${scriptID})`)
  CEP.evalScript(contents)
}


//:::::::::::::::::::::::::::::::::::::::: fetch utilities

/*———————————————————————————————————————— fetchScript(bld, identifier, src) DEPRECATED

    */

function fetchScript(bld, identifier, src, scriptType){

  var lsRef  = scriptType + identifier
  var lsRef  = scriptType + identifier + 'build'

  // if it's already up to date
  if (typeof(localStorage[lsRef]) != 'undefined')
    if (bld <= localStorage[lsRef])
      return true

  src = scriptType + '/' + src

  var functionName = 'load' + capitalize(scriptType)

  var callback = window[functionName]

  if(LOCAL) fetchLocal(identifier, src, callback)
      else fetchRemote(identifier, src, callback)
}

/*———————————————————————————————————————— fetchRemote(path, callback)

    https://github.com/Adobe-CEP/Getting-Started-guides/blob/master/Network%20requests%20and%20responses%20with%20Fetch/readme.md

    Note that fetch() is not the only way that CEP gives you to make network requests.

    Since Chromium Embedded Framework is essentially a browser, you can use
    an XMLHttpRequest (or a client-side library that wraps it, such as jQuery)
    You can also take advantage of Node.js within CEP, which gives you even
    more alternatives for making network requests.

    three params: ID, path, and callback function */

function fetchRemote(which, path, callback) {

  path = 'https://' + SERVER + '/' + dirName(BRANCH) + '/' + path
  path = path + '?' + Math.random()

  fetch(path)
    .then(function(res){
      if (res.ok){
        return res.text()
      }
    })
    .then(function(text){
      if (typeof text != 'undefined'){
        if (text != '') callback(which, text, path)
        else{
          lert('Empty File\n' + path)
          callback('', '', path)
        }
      }
      else {
        lert('404 Error\n' + path)
        callback('', '', path)
      }
    })

  .catch(function(err){
    lert('Server not found\n' + path)
    callback('', '', path)
   })
}

/*———————————————————————————————————————— fetchLocal(path, callback)

    https://stackoverflow.com/questions/39989756/how-do-i-make-a-function-that-returns-the-value-of-a-local-text-file-in-javascri

    three params: ID, path, and callback function */

function fetchLocal(passthrough, path, callback){

  path = TOOLSPATH + '/' + dirName(BRANCH) + '/' + path

//path = path + '?' + Math.random()
//lert(path)

  fetchL(path)
    .then(function(contents) {
      if (contents != ''){
//       lert('fetch succeeded\nproceeding to '+callback.name)
         callback(passthrough, contents, path)
      }
      else{ lert('Empty File\n/Local file ' + path) }
    })

    .catch(function(msg){
       // attention: this catches errors anywhere in the callback chain
       lert('Catch Error\nline 384\n\nlocal file ' + path + '\n\n'+msg)
    })
}

/*———————————————————————————————————————— fetchL(file)

    replaces "fetch" function for server */

function fetchL(file) {

  return new Promise(function(resolve, reject) {
    var rawFile = new XMLHttpRequest()
    rawFile.open("GET", file, false)
    rawFile.onreadystatechange = function (){
      if(rawFile.readyState === 4)
          if(rawFile.status === 200 || rawFile.status == 0)
              resolve(rawFile.responseText)
    }

    rawFile.onerror = reject
    rawFile.send(null)
  })
}


//:::::::::::::::::::::::::::::::::::::::: utilities

/*———————————————————————————————————————— harmonize(ref)

    three types of variables

    - localStorage
    - global HTML
    - global CEP

    to start with, we import HTML & CEP from localstorage
    afterwards, we update CEP & localStorage from HTML

   ref = js | ls
   reference value is javascript or localStorage

   if a string is longer than 99 chars, we assume
   it's stringified JSON data */

// DO NOT ADD ALERTS · called every 500ms by getProjectInfo()

function harmonize(ref){

  if (ref != 'js' && ref != 'ls') { lert('harmonize(): illegal argument\nref = '+ref); return true }

  for (x=0; x<allVars.length; x++){

    var varName = allVars[x]
    var jsVal
    var lsVal

    //———————————————————— JS —› LS

    if (ref == 'js'){

      if (typeof window[varName] == 'undefined') continue
      else jsVal = window[varName]

      if (typeof jsVal == 'object')
        lsVal = JSON.stringify(jsVal)
      else lsVal = jsVal

      localStorage[varName] = lsVal
      //elapse(`484 - ref='+ref+', calling transmitToCEP: '+varName +' - '+elapse(TIMER) + 'ms')
      transmitToCEP(varName, jsVal)
    }

    //———————————————————— LS —› JS

    if (ref == 'ls'){

      if (typeof localStorage[varName] == 'undefined') continue
      else lsVal = localStorage[varName]

      jsVal = lsToJs(lsVal)

      window[varName] = jsVal
      //elapse(`498 - ref='+ref+', calling transmitToCEP: '+varName +' - '+elapse(TIMER) + 'ms')
      transmitToCEP(varName, jsVal)
    }


  }

  return true
}

/*———————————————————————————————————————— translate(key)
    */

function translate(key){
  res = DICTIONARY.filter(record=> record.key==key && record.lang==LANG)

  if (res.length == 0) lert('Missing translation key: "' + key + '"')
  else return res[0].text
}

/*———————————————————————————————————————— deleteElement(scriptType, scriptID)

    deletes HTML, JS or CSS given an ID */

function deleteElement(scriptType, scriptID){

  scriptID += scriptType

  lert('going to Script Deletion\nDeleting object '+scriptID+' of type '+scriptType)

  obj = document.getElementById(scriptID)
  if (obj == null) return true

  lert('Script Deletion\nDeleting object '+scriptID+' of type '+scriptType)

  if (scriptType == 'css')
    obj.querySelectorAll('link[rel="stylesheet"], style').forEach(elem => elem.parentNode.removeChild(elem))

  else obj.remove()
}

/*———————————————————————————————————————— stripExtension(str)

    strips everything after last period */

function stripExtension(str){
  if (str.indexOf('.') < 0) return str

  var dotIndex = str.lastIndexOf('.')
  return str.substr(0, dotIndex)
}

/*———————————————————————————————————————— capitalize first letter
    */

function capitalize(str){
  return str.charAt(0).toUpperCase()+str.slice(1)
}

/*———————————————————————————————————————— lert(msg)

    alerts in ai-land don't exit program space */

function lert(msg){
  msg = JSON.stringify(String(msg))
  msg = msg.substr(1, msg.length-2)

  CEP.evalScript('alert("' + msg + '")')
}

/*———————————————————————————————————————— branchName()

                                               */

function branchName(c){
  return window['BRANCHNAME' + c]
}

/*———————————————————————————————————————— dirName()

                                               */

function dirName(c){
  return branchName(c).toLowerCase()
}

/*———————————————————————————————————————— transmitToCEP(jsVal)

    transmits a JS variable to CEP, as correct type
    currently JSON is sent in stringified format */


// make it a function of INTMS

function transmitToCEP(varName, val){

  if (typeof val == 'undefined') return true

  var cepVal

  if (typeof val == 'boolean'){                        // boolean
    if (val==true)   cepVal = 'true'
    if (val== false) cepVal = 'false'
  }

  else if (!isNaN(val)){                               // number
    cepVal = val.toString()
  }

  else if (typeof val == 'object'){                    // JSON
    if (varName == 'MANIFEST') return true

    if (typeof JSONCOUNT == 'undefined') JSONCOUNT = 3600000/INTMS

    JSONCOUNT += 1

    if (JSONCOUNT < 3600000/INTMS) return true // 1 per hour, it's only the dictionary

    JSONCOUNT = 0
    var str = JSON.stringify(val)
    cepVal = 'ut_decodeJSON("' + encodeURI(str) + '")'
  }

  else{                                                // string
    cepVal = 'decodeURI("' + encodeURI(val) + '")'
  }

  if (typeof cepVal == 'undefined') return true

  var scrpt = varName + '=' + cepVal

  //elapse(`626 - sending '+varName+' to CEP: ' + elapse(TIMER)+ ' ms')
  CEP.evalScript(scrpt, transmitToCEPCallback)
}

/*———————————————————————————————————————— transmitToCEPCallback(err)

    error handler for transmitToCEP */

function transmitToCEPCallback(err){
  //elapse(`634 - transmitToCEPCallback: '+elapse(TIMER) + 'ms, returned: '+err)
}

/*———————————————————————————————————————— lsToJs(lsVal)

    converts a string to appropriate javascript type */

function lsToJs(lsVal){
  if (typeof lsVal == undefined){
    //elapse(`610: undefined lsVal')
    return ''
  }

  var jsVal

  if (lsVal == 'true')                                   // boolean
    var jsVal = true
  else if (lsVal == 'false')
    var jsVal = false

  else if (!isNaN(lsVal))                                // number
    var jsVal  = parseFloat(lsVal)

  else if (lsVal.length > 99){                           // JSON
    try     { var jsVal = JSON.parse(lsVal) }
    catch(e){ var jsVal = lsVal             }
  }

  else                                                 // string
    var jsVal  = lsVal

  return jsVal
}

/*———————————————————————————————————————— fillDigits(i)

    returns 3-digit number or string */

function fillDigits(i){
  if (i > 99) return        i
  if (i > 9 ) return  '0' + i
              return '00' + i
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

