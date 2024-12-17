
//:::::::::::::::::::::::::::::::::::::::: shell.js

/*———————————————————————————————————————— notes

    overall

    the panel is constructed by using the contents of localStorage
    variables to add elements to the DOM.

    an object called MANIFEST contains a list of all the elements
    including name, type (ext) and ID

    elements are loaded in the order in which the are present in
    MANIFEST, and they ARE sensitive to the correct order

    ————————————————————————————————————————

    first run

    if there are no DOM elements in localStorage (first run), then
    MANIFEST is loaded from a local file.

    using MANIFEST, all other local files are loaded into localStorage
    variables. When the process is complete, the panel is restarted

    ————————————————————————————————————————

    updating

    after a given delay, the program checks for updates according to
    the branch chosen by the user (gear icon)  */

/*———————————————————————————————————————— EULA

    Copyright (c) Svija SAS

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
 
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    The software is provided "as is", without warranty of any kind, express or
    implied, including but not limited to the warranties of merchantability,
    fitness for a particular purpose and noninfringement. In no event shall the
    authors or copyright holders be liable for any claim, damages or other
    liability, whether in an action of contract, tort or otherwise, arising from,
    out of or in connection with the software or the use or other dealings in
    the software.

    svija.com · hello@svija.com*/


//:::::::::::::::::::::::::::::::::::::::: setup

// list of envirlnemtal variables to keep when restarting (accent color, build etc.)

//———————————————————————————————————————— start timer

var d = new Date()
var TIMER = d.getTime()

function elapse(str){
  var d = new Date()
  var t = d.getTime() - TIMER
  str = fillDigits(t) + ' #' + str
  console.log(str)
}

elapse(`016 - starting Svija Tools`)

//———————————————————————————————————————— CEP required

var CEP            = new CSInterface()
var HOSTENV        = CEP.getHostEnvironment()
//r resourceBundle = CEP.initResourceBundle();

window.addEventListener('error', (event)=>{
  var str = encodeURI(event.message)
      str = `alert("${str}")`
  CEP.evalScript(str) })

//———————————————————————————————————————— global variables

var DEBUG          = true                   // boolean   show alerts as well as console

var TOOLSVERSION   = '1.0.7'                // string    shown in branch picker panel
var AIVERSIONMIN   = 26                     // number    required for xref links

var BRANCHDEFAULT  = 2                      // number    default branch (master)
var INTMS          = 500                    // number    interrupt interval to refresh panel etc.
var READY          = false                  // boolean   is panel loaded, ready to use
var LANGDEFAULT    = 'en'                   // string    2-letter abbreviation
var MANIFESTPATH   =  'json/manifest.json'  // string    where manifest JSON is stored
var MAXWIDTH       = 240                    // number    width of panel
var SERVER         = 'tools.svija.love'     // string    server to get remote code
var UPDATEINTERVAL = 60                     // number    interval between update checks in minutes

var BRANCHNAME0    = 'alpha'                // string    used with BRANCH to derive folder names
var BRANCHNAME1    = 'beta'
var BRANCHNAME2    = 'master'

var AIVERSION      = HOSTENV.appVersion
var LANG           = HOSTENV.appUILocale.substr(0,2) // or appLocale
var ISMAC          = CEP.getOSInformation().substring(0,3) == 'Mac'
var MYDOCS         = CEP.getSystemPath(SystemPath.MY_DOCUMENTS)
var TOOLSPATH      = CEP.getSystemPath(SystemPath.EXTENSION)

var BRANCH         // number     0, 1, 2 alpha beta master
var DICTIONARY     // object     JSON english and french traductions
var INTERFACE      // number     0-3, set by js/panelManager.js // illustrator color
var ISSVIJA        // boolean    if fromtmost doc is a svija page (in a SYNC folder)
var JSONCOUNT      // number     counter, augmented by 1 with 
var LASTPATH       // string     last file path for a svija page
var LOCAL          // boolean    are we loading from local or not?
var LSLOADED       // boolean    localStorage version of panel is available
var MANIFEST       // object     JSON with all DOM elements
var SITEURL        // string     url of most recent svija site
var SYNCPATH       // string     absolute path to SYNC folder

var allVars = [    // harmonized - same in JS, localStorage and CEP
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

//———————————————————————————————————————— development (delete later)

var LANG = 'fr'

if (typeof localStorage.LOCAL == 'undefined') LOCAL  =   true
else                    LOCAL = (localStorage.LOCAL == 'true')

elapse(`163 - LOCAL=${LOCAL}`)

//———————————————————————————————————————— set defaults

if (typeof localStorage.LSLOADED == 'undefined')
  localStorage.LSLOADED = 'false'

if (typeof localStorage.BRANCH == 'undefined')
  localStorage.BRANCH = BRANCHDEFAULT
else
  localStorage.BRANCH = parseInt(localStorage.BRANCH)

if (LANG != 'fr') LANG = LANGDEFAULT

elapse(`177 - variables initialized`)


//:::::::::::::::::::::::::::::::::::::::: load panel

/*———————————————————————————————————————— manifest

    loads JSON file with list of dom elements and
    source files used to construct the panel   */

if (localStorage.LSLOADED != 'true'){
  elapse(`188 - localStorage.LSLOADED != 'true' - deleting BRANCH and getting local manifest`)

  if (typeof localStorage.BRANCH != 'undefined')    // make sure reloading doesn't get derailed by a previous attempt
    delete localStorage.BRANCH

  getLocalFile (true, MANIFESTPATH, loadManifest)
}

else{
  elapse(`197 - localStorage.LSLOADED = 'true' - transferring to loadDOM`)
  loadDOM()
}


//:::::::::::::::::::::::::::::::::::::::: check for updates

// for debugging only
UPDATEINTERVAL = .1  // number    interval between update checks in minutes (0.2 minutes is 12 seconds)

/*———————————————————————————————————————— launchUpdate after timeout TO REFACTOR

    */

var ms = UPDATEINTERVAL *60*1000

if (READY) setInterval(launchUpdate.bind(null,BRANCH), ms)


////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//:::::::::::::::::::::::::::::::::::::::: remote update

/*———————————————————————————————————————— 1. launchUpdate()

    gets remote manifest depending on branch then
    sends to compareVersions() */

function launchUpdate(branch){
  elapse(`220 -    launchUpdate() - checking for remote updates from "${branchName(branch)}" branch (currently on ${branchName(BRANCH)} branch)`)
  var local = false
  getRemoteFile (local, MANIFESTPATH, compareVersions)
}

/*———————————————————————————————————————— 2. compareVersions(local, contents, path)

    */

function compareVersions(local, contents, path){
  elapse(`226 - compareVersions() - local=${local}, path=${path}`)

  try{ var json = JSON.parse(contents) }
  catch(msg){
    elapse(`225 - compareVersions() - error getting remote manifest: ${msg}`)
    return true
  }

  try{ var newVersion = json[0].build }
  catch(msg){
    elapse(`233 - compareVersions() - remote manifest corrupt: ${msg}`)
    return true
  }

  var currentVersion = MANIFEST[0].build

  elapse(`242 - compareVersions() - comparing server:${newVersion}, current:${currentVersion} (n° ${BRANCH} branch)`)

  if (newVersion <= currentVersion){
    elapse(`254 - compareVersions() - no update available\n\n————————————————————————————————————————\n\n`)
    return true
  }

  elapse(`258 - compareVersions() - transferring to loadManifest()`)
  loadManifest(local, contents, path)
  
}


//:::::::::::::::::::::::::::::::::::::::: files into localStorage (local & remote)

/*———————————————————————————————————————— logic flow

    runs                loads           how       calls

    shell.html       manifest.json    callback —› loadManifest
    loadManifest                       direct  —› loadFiles
    loadFiles        each script      callback —› fileToManifest
    fileToManifest                        direct  —› manifestToLS (skipped if not last script)
    manifestToLS                     none   */

/*———————————————————————————————————————— 1. loadManifest(local, contents, path)

    loads the manifest for the active branch into
    MANIFEST, an object with keys and values:

    { "build":1, "name":"manifest" ,"ext":"json", "loaded":false } */

function loadManifest(local, contents, path){
  elapse(`275 -    loadManifest() - local=${local}, path=${path}`)

  if (typeof contents == 'undefined'){
    elapse(`274 -    loadManifest() - error; contents is undefined`)
    return true
  }

  if (contents == ''){
    elapse(`279 -    loadManifest() - stopping; remote manifest is empty (path=${path})`)
    return true
  }

  try{ MANIFEST = JSON.parse(contents).filter(record => !isNaN(record.build)) }      /* exclude comments */
  catch(msg){ lert( `JSON Parse Error\n${msg}\n${path}` ); return true   }

  var manifestRefs = MANIFEST.filter(record => record.name =="manifest")
  
  if ( manifestRefs.length < 1                            ){ lert(`289 -    loadManifest() - manifest error\nmissing manifest reference`); return true }
  try{ MANIFESTVERSION = manifestRefs[0].build } catch(msg){ lert(`290 -    loadManifest() - manifest error\nmissing build number`      ); return true }

  MANIFEST.filter(record=> record.name=='manifest')[0]['loaded'] = true

  elapse(`294 -    loadManifest() - manifest loaded (local=${local}) - transferring to loadFiles()`)

  loadFiles(local)
}

/*———————————————————————————————————————— 2. loadFiles(local)

    this will load the relevant files into memory but NOT activate
    them. they will be activated only when they are all loaded
    and validated in the MANIFEST json category "loaded" */

function loadFiles(local){

  LOCAL = local
  elapse(`311 -       loadFiles() - setting LOCAL=${local} - loading source files...`)

  console.groupCollapsed('[source file list]')
  for (var x=1; x<MANIFEST.length; x++){

    var scriptBuild =  MANIFEST[x]['build']

    if (typeof scriptBuild == "string") continue  // comments are strings

    var LSref = makeLSref(MANIFEST[x])
    var  path =  makePath(MANIFEST[x])

    elapse(`321 -       loadFiles() - LSref=${LSref}, path=${path}`)

    if (local){
      elapse(`324 -       loadFiles() - transferring to getLocalFile()`)
      getLocalFile (x, path, fileToManifest)
    }
    else{
      elapse(`328 -       loadFiles() - transferring to getRemoteFile()`)
      getRemoteFile(x, path, fileToManifest)
    }

  }

}

/*———————————————————————————————————————— 3. fileToManifest(manifest)

    this will create the localStorage variable for each script
    then mark the script as loaded in MANIFEST */

function fileToManifest(x, contents, path){

  if (typeof MANIFEST[x] == 'undefined'){
    elapsed(`345 —  fileToManifest() - file not found: `)
    manifestToLS()
  }

  MANIFEST[x].contents = contents
  MANIFEST[x].loaded   = true

  elapse(`354 —  fileToManifest() - ${path} loaded, sending to manifestToLS()`)
  manifestToLS()
}

/*———————————————————————————————————————— 4. manifestToLS()

    loads values from MANIFEST into localStorage */

function manifestToLS(){

  var notYetLoaded = MANIFEST.filter(record=> record.loaded==false)
  if (notYetLoaded.length > 0) return "not yet loaded"

  //————————————————————————————————————————

  console.groupEnd()

  elapse(`371 -    manifestToLS() - adding source files to LS...`)

  console.groupCollapsed(`[LS variable list]`)
  for (var x=1; x<MANIFEST.length; x++){
    var LSref = makeLSref(MANIFEST[x])
    localStorage[LSref] = MANIFEST[x].contents
    delete MANIFEST[x].contents
    delete MANIFEST[x].loaded
    elapse(`245 - ${LSref}`)
  }

  localStorage.MANIFEST = JSON.stringify(MANIFEST)
  localStorage.LSLOADED = 'true'

  console.groupEnd()
  elapse(`391 -    MANIFEST.length=${MANIFEST.length}, adding to localStorage`)
  elapse(`392 -    manifestToLS() - content saved to LS; setting localStorage.LOCAL to ${LOCAL}; ready to reload`)
  localStorage.LOCAL = LOCAL

//if (DEBUG){
//  //elapse(`260 - DEBUG is on`)
//  CEP.evalScript('confirm("Reload?\\nlocalStorage loaded", "zoo")', locationReload)
//} else

    location.reload()
}

function locationReload(str){
  
  // return=false, escape=true
  if (str=='false') location.reload()
  else  elapse(`258 -    manifestToLS() - reload canceled`)
}


//:::::::::::::::::::::::::::::::::::::::: localStorage into DOM

/*———————————————————————————————————————— loadDOM()

   using MANIFEST list of names, extensions and IDs,
   gets LS values and installs them to the DOM */

function loadDOM(){
  elapse(`421 -         loadDOM() - starting`)

  harmonize('ls')
  elapse(`424 -         loadDOM() - harmonized based on localStorage`)

  harmonize('js')
  elapse(`429 -         loadDOM() - harmonized based on JS`)
  elapse(`431 -         loadDOM() - adding elements to DOM...`)

  console.groupCollapsed(`[element list] ${MANIFEST.length} elements`)

  for (var x=1; x<MANIFEST.length; x++){

    elapse(`436 -         loadDOM() - treating MANIFEST[${x}]: ${MANIFEST[x].name}`)

    var LSref = makeLSref(MANIFEST[x])
    var objID = makeObjID(MANIFEST[x])

    elapse(`441 -         loadDOM() - installing localStorage.${LSref} with ID ${objID}`)

    var functionName = MANIFEST[x]['ext'] + 'ToDOM'

    window[functionName](objID, localStorage[LSref])
  }

  console.groupEnd()
  READY = true
  elapse(`450 -         loadDOM() - elements added; DOM ready\n\n————————————————————————————————————————\n\n`)
}


//:::::::::::::::::::::::::::::::::::::::: script loaders

/*———————————————————————————————————————— cssToDOM(scriptID, contents)

    installs a CSS sheet */

function cssToDOM(scriptID, contents){
  var obj = document.getElementById(scriptID)
  if (obj != null) obj.remove()

  var obj = document.createElement('style')
  document.head.appendChild(obj)

  obj.ID = scriptID
  obj.innerHTML = contents
}

/*———————————————————————————————————————— htmlToDOM(scriptID, contents)

    installs an HTML block */

function htmlToDOM(scriptID, contents){
  var obj = document.getElementById(scriptID)
  if (obj != null) obj.remove()

  var obj = document.createElement('div')
  document.body.appendChild(obj)

  obj.id = scriptID
  obj.innerHTML = contents

}

/*———————————————————————————————————————— jsToDOM(scriptID, contents)

    installs a JS block */

function jsToDOM(scriptID, contents){
  var obj = document.getElementById(scriptID)
  if (obj != null) obj.remove()

  var obj = document.createElement('script')
  document.body.appendChild(obj)

  obj.ID = scriptID
  obj.innerHTML = contents
}

/*———————————————————————————————————————— jsonToDOM(scriptID, contents)

    for translation */

function jsonToDOM(scriptID, contents){

  var varNameArray = JSON.parse(contents).filter(record => typeof record.name != 'undefined')
  var varName = varNameArray[0].name

  try{
    window[varName] = JSON.parse(contents).filter(record => record.build != 'fin' && typeof record.name == 'undefined')
    localStorage[varName] = JSON.stringify(window[varName])
//  if (varName == 'DICTIONARY') lert(localStorage[varName])
    elapse(`355 - jsonToDOM(${varName})`)
  }

  catch(e){
    elapse('515 - jsonToDOM() - JSON '+scriptID+' not loaded (line 309)\n'+e)
  }

}

/*———————————————————————————————————————— jsxToDOM(scriptID, contents)

    */

function jsxToDOM(scriptID, contents){
  elapse(`369 - jsxToDOM(${scriptID})`)
  CEP.evalScript(contents)
}


//:::::::::::::::::::::::::::::::::::::::: fetch utilities

/*———————————————————————————————————————— getRemoteFile(passthrough, path, callback)

    https://github.com/Adobe-CEP/Getting-Started-guides/blob/master/Network%20requests%20and%20responses%20with%20Fetch/readme.md

    Note that fetch() is not the only way that CEP gives you to make network requests.

    Since Chromium Embedded Framework is essentially a browser, you can use
    an XMLHttpRequest (or a client-side library that wraps it, such as jQuery)
    You can also take advantage of Node.js within CEP, passthrough gives you even
    more alternatives for making network requests.

    three params: ID, path, and callback function */

function getRemoteFile(passthrough, path, callback) {
  elapse(`546 -   getRemoteFile() - passthrough=${passthrough}, path=${path}, callback=${callback.name}`)

//if (path != 'json/manifest.json'){
//  elapse(`548 -   getRemoteFile()⚠️ CANCELING: passthrough=${passthrough}, path=${path}, callback=${callback.name}`)
//  window[callback.name]
//  return
//}

  path = 'https://' + SERVER + '/' + dirName(BRANCH) + '/' + path
  path = path + '?' + Math.random()

  elapse(`556 -   getRemoteFile() - getting ${path}`)
  fetch(path)
    .then(function(res){
      if (res.ok){
        return res.text()
      }
    })
    .then(function(text){
      //elapse(`532 - following errors could come from function ${callback.name}`)
      if (typeof text != 'undefined'){
        if (text != ''){
          elapse(`568 -   getRemoteFile() - transferring to ${callback.name}()`)
          callback(passthrough, text, path)
        }
        else{
          elapse('568 -   getRemoteFile() - Empty File\n' + path)
          callback('', '', path)
        }
      }
      else {
        elapse('573 -   getRemoteFile() - 404 Error\n' + path)
        callback('', '', path)
      }
    })

  .catch(function(err){
    elapse(`579 -   getRemoteFile() - error; path=${path}, error message=${err}`)
    callback('', '', path)
   })
}

/*———————————————————————————————————————— getLocalFile(path, callback)

    https://stackoverflow.com/questions/39989756/how-do-i-make-a-function-that-returns-the-value-of-a-local-text-file-in-javascri

    takes passthrough identifier, path, and callback function

    no choice of branch — there's only one local branch */

function getLocalFile(passthrough, path, callback){
  elapse(`584 getLocalFile - passthrough=${passthrough}, path=${path}, callback=${callback.name}`)

  path = TOOLSPATH + '/files/' +  path

  fetchLocal(path)
    .then(function(contents) {
      if (contents != ''){
         callback(passthrough, contents, path)
      }
      else{ elapse('602 - getLocalFile() - Empty File\n/Local file ' + path) }
    })

    .catch(function(msg){
       // attention: this catches errors anywhere in the callback chain
       elapse('607 - getLocalFile() - Catch Error\nline 384\n\nlocal file ' + path + '\n\n'+msg)
    })
}

/*———————————————————————————————————————— fetchLocal(file)

    replaces "fetch" function in remote version */

function fetchLocal(file) {

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

  if (ref != 'js' && ref != 'ls') { elapse('655 - harmonize() - illegal argument\nref = '+ref); return true }

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

  if (res.length == 0) elapse('705 - translate() - Missing translation key: "' + key + '"')
  else return res[0].text
}

/*———————————————————————————————————————— deleteElement(scriptType, scriptID)

    deletes HTML, JS or CSS given an ID */

function deleteElement(scriptType, scriptID){

  scriptID += scriptType

  elapse('717 - deleteElement() - going to Script Deletion\nDeleting object '+scriptID+' of type '+scriptType)

  obj = document.getElementById(scriptID)
  if (obj == null) return true

  elapse('722 - deleteElement() - deleting object '+scriptID+' of type '+scriptType)

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
  if (typeof str == 'undefined'){
    elapse(`719 - capitalize() received an undefined string`)
    return ''
  }

  if (str.length == 0){
    elapse(`724 - capitalize() received an empty string`)
    return ''
  }

  return str.charAt(0).toUpperCase()+str.slice(1)
}

/*———————————————————————————————————————— lert(msg)

    alerts in ai-land don't exit program space */

function lert(msg){
  msg = JSON.stringify(String(msg))
  msg = msg.substr(1, msg.length-2)

  console.log(msg)
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

  else if (lsVal.length > 90){                           // JSON
    try {
      var jsVal = JSON.parse(lsVal)
//    elapse(`874 -        lsToJs() - converting to JSON: ${lsVal}`)
    }
    catch(e){
      var jsVal = lsVal
//    elapse(`878 -        lsToJs() - failed converting to JSON: ${lsVal}`)
    }
//  elapse(`880 -        lsToJs() - jsVal.length=${jsVal.length}`)
  }

  else                                                 // string
    var jsVal  = lsVal

  return jsVal
}

/*———————————————————————————————————————— fillDigits(i)

    returns 4-digit number or string */

function fillDigits(i){
  if (i > 999) return         i
  if (i > 99 ) return   '0' + i
  if (i > 9  ) return  '00' + i
               return '000' + i
}

/*———————————————————————————————————————— makeLSref(obj)

    creates a reference for a localStorage variable
    name_build_ext   */

function makeLSref(obj){
  return obj.name +'_'+ obj.build +'_'+ obj.ext
}

/*———————————————————————————————————————— makeObjID(obj)

    creates the DOM object ID from the manifest info */

function makeObjID(obj){
    var objID = obj['name'] + capitalize(obj['ext'])

    if (typeof obj['id'] != 'undefined')
      if (obj['id'] != '')
        objID = obj['id']

  return objID
}

/*———————————————————————————————————————— makeObjID(obj)

    creates the file path from the manifest info */

function makePath(obj){
//elapse(`908 -        makePath() - ${obj['ext' ]} / ${obj['name']} . ${obj['ext']}`)
  path = obj['ext'] + '/' + obj['name'] + '.' + obj['ext']
  return path
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

