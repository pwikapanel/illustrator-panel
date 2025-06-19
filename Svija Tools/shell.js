
//:::::::::::::::::::::::::::::::::::::::: shell.js

DEBUG = true

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
    the source chosen by the user (gear icon)  */

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


//:::::::::::::::::::::::::::::::::::::::: program

//———————————————————————————————————————— start timer

var d = new Date()
var TIMER = d.getTime()

function elapse(line, str){
  var d = new Date()
  var t = d.getTime() - TIMER
  str = sh_fillDigits(t, 5) + ' °' + sh_fillDigits(line, 4) + ' ' + str
  console.log(str)
}

function elapseGroup(line, str){
  var d = new Date()
  var t = d.getTime() - TIMER
  str = sh_fillDigits(t, 5) + ' °' + sh_fillDigits(line, 4) + ' ' + str
  console.groupCollapsed(str)
}

elapse(82, `starting Svija Tools`)

//———————————————————————————————————————— CEP required

var CEP            = new CSInterface()
var HOSTENV        = CEP.getHostEnvironment()
//r resourceBundle = CEP.initResourceBundle();

window.addEventListener('error', (event)=>{
  var str = encodeURI(event.message)
      str = `alert("${str}")`
  CEP.evalScript(str) })

/*———————————————————————————————————————— lert(msg)

    alerts that don't exit Illustrators space */

function lert(msg){
  msg = JSON.stringify(String(msg))
  msg = msg.substr(1, msg.length-2)

  console.log(msg)
  CEP.evalScript('alert("' + msg + '")')
}

//———————————————————————————————————————— initialize variables

var TOOLSVERSION   = '1.0.7'                   // string    shown in source picker panel

var INTMS          = 5000                       // number    interrupt interval to refresh panel etc.
var MANIFESTPATH   = 'json/manifest.json'      // string    where manifest JSON is stored
var READY          = false                     // boolean   is panel loaded, ready to use
var REMOTE         = 'tools.svija.com/tools'  // string    server to get remote code
var SOURCEDEFAULT  = 2                         // number    default source (master)
var UPDATEINTERVAL = 60                        // number    interval between update checks in minutes

var SOURCENAME0    = 'tools'                   // string    used with SOURCE to derive folder names
var SOURCENAME1    = 'alpha'
var SOURCENAME2    = 'beta'
var SOURCENAME3    = 'master'

var TOOLSPATH      = CEP.getSystemPath(SystemPath.EXTENSION)

var SOURCE         // number     0, 1, 2 alpha beta master
var ISSVIJA        // boolean    if fromtmost doc is a svija page (in a SYNC folder)
var JSONCOUNT      // number     counter, augmented by 1 with 
var LASTPATH       // string     last file path for a svija page
var LSLOADED       // boolean    localStorage version of panel is available
var MANIFEST       // object     JSON with all DOM elements
var SITEURL        // string     url of most recent svija site
var SYNCPATH       // string     absolute path to SYNC folder

var ALLVARS = [    // harmonized - same in JS, localStorage and CEP
  'TOOLSVERSION',

  'TOOLSPATH',

  'MAXWIDTH',
  'INTMS',
  'REMOTE',


  'SOURCE',
  'SOURCENAME0',
  'SOURCENAME1',
  'SOURCENAME2',

  'ISSVIJA',
  'LASTPATH',
  'MANIFEST',
  'SITEURL',
  'SYNCPATH'
]

var SAVEDVARS = [  // kept when localStorage is cleared during updates
  'accentBright',
  'accentDim',
  'ISSVIJA',
  'LASTPATH',
  'SITEURL',
  'SOURCE',
  'SYNCPATH'
]

//———————————————————————————————————————— development (delete later)

var LANG = 'fr'

if (typeof localStorage.SOURCE != 'undefined'){
  SOURCE = sh_lsToJs(localStorage.SOURCE)
  elapse(172, `SOURCE=${SOURCE} (from LS)`)
}
else{
  SOURCE =   0
  elapse(176, `SOURCE not in localStorage; reset to "/${SOURCENAME0}"`)
}

//———————————————————————————————————————— set defaults

if (typeof localStorage.LSLOADED == 'undefined')
  localStorage.LSLOADED = 'false'

if (typeof localStorage.SOURCE == 'undefined')
  localStorage.SOURCE = SOURCEDEFAULT
else
  localStorage.SOURCE = parseInt(localStorage.SOURCE)

if (LANG != 'fr') LANG = LANGDEFAULT

elapse(191, `variables initialized`)

/*———————————————————————————————————————— start loading

    loads JSON file with list of dom elements and
    source files used to construct the panel

    at startup, remote updates can only be installed
    if they're already in localStorage —— otherwise
    it would take too long or risk an incomplete update

    so if there's no localStorage, it's local files  */

if (localStorage.LSLOADED == 'true'){
  elapse(211, `localStorage.LSLOADED = 'true'; transferring to loadDOM`)
  loadDOM()
}

else{
  elapse(216, `localStorage.LSLOADED != 'true'; deleting SOURCE and getting local manifest\n `)

  if (typeof localStorage.SOURCE != 'undefined')    // make sure reloading doesn't get derailed by a previous attempt
    delete localStorage.SOURCE

  SOURCE = 0
  getLocalFile (SOURCE, MANIFESTPATH, parseManifest)
}


/*———————————————————————————————————————— check for updates

    if existing version is local, I take any update I can get, doesn't matter

    if existing verfsion is local, I take updates from same branch but higher id */

var ms = UPDATEINTERVAL *60*100000   // variable is interval between update checks in minutes

if (READY) setInterval(sh_launchUpdate.bind(null, SOURCE), ms)
if (READY && typeof DEBUG != 'undefined') sh_launchUpdate(SOURCE)


//:::::::::::::::::::::::::::::::::::::::: construction functions

/*———————————————————————————————————————— loadDOM() // if LS is loaded

   using MANIFEST list of names, extensions and IDs,
   gets LS values and installs them to the DOM */

function loadDOM(){
  elapse(248, `              loadDOM() - starting`)

  sh_harmonize('ls')
  elapse(251, `              loadDOM() - harmonized based on localStorage`)

  sh_harmonize('js')
  elapse(254, `              loadDOM() - harmonized based on JS`)

  elapseGroup(256, `              loadDOM() - adding ${MANIFEST.length} elements to DOM...`)

  for (var x=1; x<MANIFEST.length; x++){

//  elapse(260, `         loadDOM() - treating MANIFEST[${x}]: ${MANIFEST[x].name}`)

    var LSref = sh_makeLSref(MANIFEST[x])
    var objID = sh_makeObjID(MANIFEST[x])

    var functionName = MANIFEST[x]['ext'] + 'ToDOM'

    elapse(264, `              loadDOM() - installing localStorage.${LSref} with ID ${objID}`)

    window[functionName](objID, localStorage[LSref])
  }

  console.groupEnd()
  READY = true
  elapse(268, `              loadDOM() - "${sh_sourceName(SOURCE)}" ready to use 🙂\n\n————————————————————————————————————————\n\n`)
}

//———————————————————————————————————————— notes: files into localStorage (local & remote)

/*                      loads           how       calls

    shell.html       manifest.json    callback  —› parseManifest
    parseManifest                       direct  —› loadFiles
    loadFiles        each script      callback  —› fileToManifest
    fileToManifest                      direct  —› manifestToLS (skipped if not last script)
    manifestToLS                     none   */

/*———————————————————————————————————————— 1. parseManifest(source, contents, path)

    loads the manifest for the active source into
    MANIFEST, an object with keys and values:

    { "id":0, "name":"manifest" ,"ext":"json", "loaded":false } */

function parseManifest(source, contents, path){

  console.log(' ')
  elapse(292, `        parseManifest() - validating JSON from "${sh_sourceName(source)}" manifest`)

//———————————————————————————————————————— validate text

  if (typeof contents == 'undefined'){
    elapse(300, `        parseManifest() - error; contents is undefined`)
    return true
  }

  if (contents == ''){
    elapse(305, `        parseManifest() - stopping; remote manifest is empty (path=${path})`)
    return true
  }

//———————————————————————————————————————— validate JSON

  try{ var zoop = JSON.parse(contents) }
  catch(msg){
    elapse(309, `        parseManifest() - CANCELED ⚠️ parse error in ${path}\n\n    ${msg}\n\n` )
    return true
  }

  try{ MANIFEST = zoop.filter(record => record.name.slice(0,1) != '#') }
  catch(msg){
    elapse(316, `        parseManifest() - CANCELED ⚠️ missing "name" record in MANIFEST JSON from ${path}\n\n    ${msg}\n\n` )
    return true
  }

//———————————————————————————————————————— validate 1st record (self-reference)

  MANIFESTVERSION = MANIFEST[0].id

  if (typeof MANIFESTVERSION == 'undefined'){
    elapse(330, `        parseManifest() - manifest error - missing manifest id`)
    return true
  }

//———————————————————————————————————————— mark as loaded and continue

  MANIFEST[0]['loaded'] = true


  elapse(337, `        parseManifest() - "${sh_sourceName(source)}" manifest loaded`)
  loadFiles(source)

}

/*———————————————————————————————————————— 2. loadFiles(source)

    this will load the relevant files into memory but NOT activate
    them. they will be activated only when they are all loaded
    and validated in the MANIFEST json category "loaded" */

function loadFiles(source){

  SOURCE = source

  elapseGroup(352, `            loadFiles() - loading ${MANIFEST.length} files from "${sh_sourceName(source)}" into variable MANIFEST...`)
  for (var x=1; x<MANIFEST.length; x++){

    var comment = MANIFEST[x]['name'].slice(0,1) === '#'
    if (comment) continue

    var LSref = sh_makeLSref(MANIFEST[x])
    var  path =  sh_makePath(MANIFEST[x])

    if (LSref == ''){
      console.groupEnd()
      elapse(359, `            loadFiles() ⚠️ impossible to construct LSref for MANIFEST[${x}]`)
      return
    }

    if (path == ''){
      console.groupEnd()
      elapse(365, `            loadFiles() ⚠️ impossible to construct path for MANIFEST[${x}]`)
      return
    }

    elapse(362, `          loadFiles() - ${path}`)

    if (source==0){
//    elapse(365, `         loadFiles() - transferring to getLocalFile()`)
      getLocalFile (x, path, fileToManifest)
    }
    else{
//    elapse(369, `         loadFiles() - transferring to getRemoteFile()`)
      getRemoteFile(x, SOURCE, path, fileToManifest)
    }

  }

}

/*———————————————————————————————————————— 3. fileToManifest(manifest)

    this will create the localStorage variable for each script
    then mark the script as loaded in MANIFEST */

function fileToManifest(x, contents, path){

  if (typeof MANIFEST[x] == 'undefined'){
    elapsed(385, `     fileToManifest() - file not found: `)
    manifestToLS()
  }

  MANIFEST[x].contents = contents
  MANIFEST[x].loaded   = true

  elapse(392, `     fileToManifest() - ${MANIFEST[x].name} added`)
  manifestToLS()
}

/*———————————————————————————————————————— 4. manifestToLS()

    loads values from MANIFEST into localStorage */

function manifestToLS(){

  try{var notYetLoaded = MANIFEST.filter(record=> (typeof record.loaded == 'undefined'))
  }catch(e){console.log(398, '———————————————————————————'+e)}

  if (notYetLoaded.length > 0) return "not yet loaded"

  //————————————————————————————————————————

  console.groupEnd()
  sh_clearLocalStorage()

  elapseGroup(409, `         manifestToLS() - moving ${MANIFEST.length} variables from variable MANIFEST to localStorage...`)
  for (var x=1; x<MANIFEST.length; x++){
    var LSref = sh_makeLSref(MANIFEST[x])
    localStorage[LSref] = MANIFEST[x].contents
    delete MANIFEST[x].contents
    delete MANIFEST[x].loaded
    elapse(415, `       manifestToLs() - ${LSref}`)
  }

  localStorage.MANIFEST = JSON.stringify(MANIFEST)
  localStorage.LSLOADED = 'true'

  console.groupEnd()
  localStorage.SOURCE = SOURCE
  elapse(419, `         manifestToLS() - localStorage loaded (${sh_lsStorageUsed()} KB); localStorage.SOURCE set to "/${sh_sourceName(SOURCE)}"; 🔥 reload to install DOM`)

  if (typeof DEBUG != 'undefined')
    CEP.evalScript(`confirm("Cancel Reload?\\nlocalStorage loaded from ${sh_sourceName(SOURCE)}", "zoo")`, locationReload)
  else
    zoop = 'boo'
//  location.reload()
}

function locationReload(str){

  // return=false, escape=true

  if (str=='false')
    zoop = 'boo'
//  location.reload()
  else  elapse(438, `       locationReload() - canceled`)
}


//:::::::::::::::::::::::::::::::::::::::: updater functions

/*———————————————————————————————————————— 1. sh_launchUpdate()

    if existing source is local, I take any update I can get, doesn't matter

    if existing verfsion is local, I take updates from same branch but higher id

    gets remote manifest depending on source then
    sends to compareVersions() */

function sh_launchUpdate(newSource){
  if (newSource<1 || newSource>3) newSource = 3 // only update from remote

  elapse(453, `      sh_launchUpdate() - checking for remote updates from "${sh_sourceName(newSource)}" (currently on "${sh_sourceName(SOURCE)}")`)
  getRemoteFile (newSource, newSource, MANIFESTPATH, compareVersions)
}

/*———————————————————————————————————————— 2. compareVersions(local, contents, path)

    */

function compareVersions(newSource, contents, path){

//———————————————————————————————————————— error checking

  try{ var json = JSON.parse(contents) }
  catch(msg){
    elapse(452, `compareVersions() - error getting remote manifest: ${msg}`)
    return true
  }

  try{ var newVersion = json[0].id}
  catch(msg){
    elapse(458, `compareVersions() - remote manifest corrupt: ${msg}`)
    return true
  }

//———————————————————————————————————————— have valid manifest

/*  possible conditions:

    √ if current source is local, we take any remote source 
    if changing source, take remote source
    if not changing source, new version has to be higher id n°

    need following info:

    - current source & version
    - new source & version

    but this should have happened earlier -- at sh_launchUpdate(source) */

  var currentVersion = MANIFEST[0].id

  elapse(481, `      compareVersions() - current:${sh_sourceName(SOURCE)} is v${currentVersion}, server:${sh_sourceName(newSource)} is v${newVersion}`)

  if (newSource == SOURCE && newVersion <= currentVersion){
    elapse(484, `      compareVersions() - no update available for "${sh_sourceName(newSource)}"\n\n————————————————————————————————————————\n\n`)
    return true
  }

  elapse(488, `      compareVersions() - update available for "${sh_sourceName(newSource)}"`)
  parseManifest(newSource, contents, path)
  
}


//:::::::::::::::::::::::::::::::::::::::: sh_ utility functions

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

    accepts a JSON file where valid records have a string "key" and 
    comments have a key starting with #
    only used for translation at this time */

function jsonToDOM(scriptID, contents){

  try{
    window[scriptID]       = JSON.parse(contents).filter(record => record.key.slice(0,1) != '#')
    localStorage[scriptID] = JSON.stringify(window[scriptID])
    elapse(579, `             jsonToDOM(${scriptID}) successful`)
  }

  catch(e){
    elapse(583, `             jsonToDOM() ⚠️ JSON error; ${scriptID} not loaded\n`+e)
  }

}

/*———————————————————————————————————————— jsxToDOM(scriptID, contents)

    */

function jsxToDOM(scriptID, contents){
  elapse(586, `              jsxToDOM(${scriptID})`)
  CEP.evalScript(contents)
}


//———————————————————————————————————————— fetch utilities

/*———————————————————————————————————————— getRemoteFile(passthrough, source, path, callback)

    https://github.com/Adobe-CEP/Getting-Started-guides/blob/master/Network%20requests%20and%20responses%20with%20Fetch/readme.md

    Note that fetch() is not the only way that CEP gives you to make network requests.

    Since Chromium Embedded Framework is essentially a browser, you can use
    an XMLHttpRequest (or a client-side library that wraps it, such as jQuery)
    You can also take advantage of Node.js within CEP, passthrough gives you even
    more alternatives for making network requests.

    three params: ID, path, and callback function */

function getRemoteFile(passthrough, source, path, callback) {
//elapse(607, `     getRemoteFile() - passthrough=${passthrough}, source=${source}, path=${path}, callback=${callback.name}`)

  if (source<1 || source>3){
    elapse(610, `     getRemoteFile()⚠️ CANCELING: passthrough=${passthrough}, source=${source}, path=${path}, callback=${callback.name}`)
    window[callback.name]
    return
  }

  path = 'https://' + REMOTE + '/' + sh_dirName(source) + '/' + path
  path = path + '?' + Math.random()

  elapse(612, `        getRemoteFile() - ${path}`)

  fetch(path)
    .then(
      function(result){
        if (!result.ok) throw new Error(`#614 - 404 error: ${path}`)
        else return result.text()
      }
    ).then(
      function(text){
        if (text == '') throw new Error(`#615 - empty file: ${path}`)
        else{
//        elapse(630, `     getRemoteFile() - transferring to ${callback.name}()`)
          callback(passthrough, text, path)
        }
      }
   ).catch(
     function(err){
       elapse(636, `     getRemoteFile()⚠️ CANCELING\n     ${err}`)
       return
     }
   )
}

/*———————————————————————————————————————— getLocalFile(path, callback)

    https://stackoverflow.com/questions/39989756/how-do-i-make-a-function-that-returns-the-value-of-a-local-text-file-in-javascri

    takes passthrough identifier, path, and callback function

    no choice of source — there's only one local source */

function getLocalFile(passthrough, path, callback){

  path = `${TOOLSPATH}/${sh_sourceName(0)}/${path}`

  var myPromise = fetchLocal(path)
  myPromise.then(onFulfilled, onRejected)

  function onFulfilled (contents){
    if (contents != '') callback(passthrough, contents, path)
    else elapse(655, `getLocalFile() - empty file: ${path}`)
  }

  function onRejected(txt){
    // attention: this catches errors anywhere in the previous callback chain
    elapse(660, `getLocalFile() - file not found: ${path}\n\n    ${txt}\n `)
  }

}

/*———————————————————————————————————————— fetchLocal(file)

    developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject

    replaces "fetch" function in remote version
    returns a promise object (see link above)

    the Promise contains a fetch request that has 4 parts:

    1. creation of request with new

    2. add listener to request to send ("resolve" from promise) contents

    3. add listener for error to send ("reject" from promise) error

    4. request submission, "send"

    resolve and reject are here because here is where I decide
    what counts as a resolution or a rejection, but they are
    HANDLED in the calling function, getLocalFile()  */

function fetchLocal(file) {

  return new Promise(function(resolve, reject) {

    var localRequest = new XMLHttpRequest()

    localRequest.open("GET", file, false)
    localRequest.onerror = reject

    localRequest.onreadystatechange = function (){
      if(localRequest.readyState != 4                              ) reject
      if(localRequest.status     != 200 && localRequest.status != 0) reject
      resolve(localRequest.responseText)
    }


    localRequest.send()
  })
}


//———————————————————————————————————————— utilities

/*———————————————————————————————————————— sh_harmonize(ref)

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

function sh_harmonize(ref){

  if (ref != 'js' && ref != 'ls') { elapse(713, ' sh_harmonize() - illegal argument\nref = '+ref); return true }

  for (x=0; x<ALLVARS.length; x++){

    var varName = ALLVARS[x]
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
      //elapse(733, ` ref='+ref+', calling sh_transmitToCEP: '+varName +' - '+elapse(TIMER) + 'ms')
      sh_transmitToCEP(varName, jsVal)
    }

    //———————————————————— LS —› JS

    if (ref == 'ls'){
      if (typeof localStorage[varName] == 'undefined') continue
      else lsVal = localStorage[varName]

      jsVal = sh_lsToJs(lsVal)

      window[varName] = jsVal
      //elapse(746, ` ref='+ref+', calling sh_transmitToCEP: '+varName +' - '+elapse(TIMER) + 'ms')
      sh_transmitToCEP(varName, jsVal)
    }


  }

  return true
}

/*———————————————————————————————————————— sh_deleteElement(scriptType, scriptID)

    deletes HTML, JS or CSS given an ID */

function sh_deleteElement(scriptType, scriptID){

  scriptID += scriptType

  elapse(774, ' sh_deleteElement() - going to Script Deletion\nDeleting object '+scriptID+' of type '+scriptType)

  obj = document.getElementById(scriptID)
  if (obj == null) return true

  elapse(779, ' sh_deleteElement() - deleting object '+scriptID+' of type '+scriptType)

  if (scriptType == 'css')
    obj.querySelectorAll('link[rel="stylesheet"], style').forEach(elem => elem.parentNode.removeChild(elem))

  else obj.remove()
}

/*———————————————————————————————————————— sh_stripExtension(str)

    strips everything after last period */

function sh_stripExtension(str){
  if (str.indexOf('.') < 0) return str

  var dotIndex = str.lastIndexOf('.')
  return str.substr(0, dotIndex)
}

/*———————————————————————————————————————— sh_capitalize(str)

    capitalize first letter */

function sh_capitalize(str){
  if (typeof str == 'undefined'){
    elapse(803, ` sh_capitalize() received an undefined string`)
    return ''
  }

  if (str.length == 0){
    elapse(808, ` sh_capitalize() received an empty string`)
    return ''
  }

  return str.charAt(0).toUpperCase()+str.slice(1)
}

/*———————————————————————————————————————— sh_sourceName()

                                               */

function sh_sourceName(c){
  return window['SOURCENAME' + c]
}

/*———————————————————————————————————————— sh_dirName()

                                               */

function sh_dirName(c){
  return sh_sourceName(c).toLowerCase()
}

/*———————————————————————————————————————— sh_transmitToCEP(varName, val) DOESN'T HANDLE ARRAYS

    transmits a JS variable to CEP, as correct type
    currently JSON is sent in stringified format */


// make it a function of INTMS

function sh_transmitToCEP(varName, val){

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

  //elapse(888, ` sending '+varName+' to CEP: ' + elapse(TIMER)+ ' ms')
  CEP.evalScript(scrpt)
}

/*———————————————————————————————————————— sh_lsToJs(lsVal)

    converts a string to appropriate javascript type */

function sh_lsToJs(lsVal){
  if (typeof lsVal == undefined){
    //elapse(906, ` undefined lsVal')
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
//    elapse(923, `        sh_lsToJs() - converting to JSON: ${lsVal}`)
    }
    catch(e){
      var jsVal = lsVal
//    elapse(927, `        sh_lsToJs() - failed converting to JSON: ${lsVal}`)
    }
//  elapse(929, `        sh_lsToJs() - jsVal.length=${jsVal.length}`)
  }

  else                                                 // string
    var jsVal  = lsVal

  return jsVal
}

/*———————————————————————————————————————— sh_fillDigits(i)

    returns n-digit number or string */

function sh_fillDigits(i, n){
  v = '000000' + i
  return v.slice(0-n)
}

/*———————————————————————————————————————— sh_makeLSref(obj)

    creates a reference for a localStorage variable
    name_ext   */

function sh_makeLSref(obj){
  if (typeof obj.name == 'undefined'){
    elapse(941, `object with no name`)
    return ''
  }

  if (typeof obj.ext == 'undefined'){
    elapse(946, `object with no ext`)
    return ''
  }

  return obj.name +'_'+ obj.ext
}

/*———————————————————————————————————————— sh_makeObjID(obj)

    creates the DOM object ID from the manifest info */

function sh_makeObjID(obj){
  if (typeof obj.name == 'undefined'){
    elapse(959, `object with no name`)
    return ''
  }

  if (typeof obj.ext == 'undefined'){
    elapse(959, `object with no ext`)
    return ''
  }

  var objID = obj['name'] + sh_capitalize(obj['ext'])

  if (typeof obj['id'] != 'undefined')
    if (obj['id'] != '')
      objID = obj['id']

  return objID
}

/*———————————————————————————————————————— sh_makePath(obj)

    creates the file path from the manifest info */

function sh_makePath(obj){
  if (typeof obj.name == 'undefined'){
    elapse(973, `object with no name`)
    return ''
  }

  if (typeof obj.ext == 'undefined'){
    elapse(978, `object with no ext`)
    return ''
  }

  path = obj['ext'] + '/' + obj['name'] + '.' + obj['ext']
  return path
}

/*———————————————————————————————————————— sh_clearLocalStorage()

    clears localStorage but keeps a few key variables */

function sh_clearLocalStorage(){
  var temp = {}

  elapseGroup(952, ` sh_clearLocalStorage() - clearing localStorage`)
  SAVEDVARS.forEach(function(name){
    if (typeof localStorage[name] == 'undefined')
      console.log(`    not saved: localStorage.${name} is undefined`)
    else {
      temp[name] = localStorage[name]
      console.log(`        saved: localStorage.${name} = ${localStorage[name]}`)
    }
  })

  localStorage.clear();

  for (const [key, value] of Object.entries(temp)) {
    localStorage[key] = value
    console.log(`     restored: localStorage.${key} = ${value}`)
  }
  console.groupEnd()
}

/*———————————————————————————————————————— sh_lsStorageUsed()

    145985 bytes  */

function sh_lsStorageUsed(){
  var z = new Blob(Object.values(localStorage)).size
  var z = Math.round(z / 100)
  return z/10
}



//:::::::::::::::::::::::::::::::::::::::: fin


