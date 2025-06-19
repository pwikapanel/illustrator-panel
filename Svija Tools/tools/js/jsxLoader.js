
//:::::::::::::::::::::::::::::::::::::::: jsxLoader.js
var JSONCOUNT      // number     counter, augmented by 1 with 
var MANIFEST       // object     JSON with all DOM elements

/*———————————————————————————————————————— start loading

    loads JSON file with list of dom elements and
    source files used to construct the panel

    at startup, remote updates can only be installed
    if they're already in localStorage —— otherwise
    it would take too long or risk an incomplete update

    so if there's no localStorage, it's local files  */

var JSXFILEPATH   = 'json/jsxFiles.json'      // string    where jsx file list JSON is stored

elapse(216, `getting JSX file list\n`)

getLocalFile (0, JSXFILEPATH, parseJSXlist)

//:::::::::::::::::::::::::::::::::::::::: construction functions

/*———————————————————————————————————————— loadDOM() // if LS is loaded

   using MANIFEST list of names, extensions and IDs,
   gets LS values and installs them to the DOM */

function loadDOM(){

  elapse(248, `              loadDOM() - starting`)


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
  elapse(268, `              loadDOM() - "tools" ready to use 🙂\n\n————————————————————————————————————————\n\n`)
}

/*———————————————————————————————————————— 1. parseJSXlist(source, contents, path)

    loads the manifest for the active source into
    MANIFEST, an object with keys and values:

    { "id":0, "name":"manifest" ,"ext":"json", "loaded":false } */

function parseJSXlist(source, contents, path){

  console.log(' ')
  elapse(292, `        parseJSXlist() - validating JSON from "tools" jsx file list`)

//———————————————————————————————————————— validate text

  if (typeof contents == 'undefined'){
    elapse(300, `        parseJSXlist() - error; contents is undefined`)
    return true
  }

  if (contents == ''){
    elapse(305, `        parseJSXlist() - stopping; remote jsx file list is empty (path=${path})`)
    return true
  }

//———————————————————————————————————————— validate JSON

  try{ var zoop = JSON.parse(contents) }
  catch(msg){
    elapse(309, `        parseJSXlist() - CANCELED ⚠️ parse error in ${path}\n\n    ${msg}\n\n` )
    return true
  }

  try{ MANIFEST = zoop.filter(record => record.name.slice(0,1) != '#') }
  catch(msg){
    elapse(316, `        parseJSXlist() - CANCELED ⚠️ missing "name" record in MANIFEST JSON from ${path}\n\n    ${msg}\n\n` )
    return true
  }

//———————————————————————————————————————— validate 1st record (self-reference)

  MANIFESTVERSION = MANIFEST[0].id

  if (typeof MANIFESTVERSION == 'undefined'){
    elapse(330, `        parseJSXlist() - jsx file list error - missing jsx file list id`)
    return true
  }

//———————————————————————————————————————— mark as loaded and continue

  MANIFEST[0]['loaded'] = true


  elapse(337, `        parseJSXlist() - "tools" jsx file list loaded`)
  loadFiles(source)

}


/*———————————————————————————————————————— 2. loadFiles(source)

    this will load the relevant files into memory but NOT activate
    them. they will be activated only when they are all loaded
    and validated in the MANIFEST json category "loaded" */

function loadFiles(source){

  elapseGroup(378, `            loadFiles() - loading ${MANIFEST.length} files from "tools" into variable MANIFEST...`)
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

    getLocalFile (x, path, fileToManifest)

  }

}

/*———————————————————————————————————————— 3. fileToManifest(manifest)

    this will create the localStorage variable for each script
    then mark the script as loaded in MANIFEST */

function fileToManifest(x, contents, path){

  if (typeof MANIFEST[x] == 'undefined'){
    elapsed(385, `     fileToManifest() - file not found: `)
  }

  MANIFEST[x].contents = contents
  MANIFEST[x].loaded   = true

  elapse(392, `     fileToManifest() - ${MANIFEST[x].name} added`)
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

/*———————————————————————————————————————— getLocalFile(path, callback)

    https://stackoverflow.com/questions/39989756/how-do-i-make-a-function-that-returns-the-value-of-a-local-text-file-in-javascri

    takes passthrough identifier, path, and callback function

    no choice of source — there's only one local source */

function getLocalFile(passthrough, path, callback){

  path = `${TOOLSPATH}/tools/${path}`

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

