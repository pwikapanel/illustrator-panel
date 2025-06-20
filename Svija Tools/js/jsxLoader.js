






var jsxList = dirListArray('jsx', 'jsx', 'jsxList')


//:::::::::::::::::::::::::::::::::::::::: jsxLoader.js

var JSONCOUNT      // number     counter, augmented by 1 to avoid infinite waitwhen loading files
var jsxList        // object     JSON with all DOM elements

/*———————————————————————————————————————— get list of JSX files

    loads JSON file with list of dom elements and
    source files used to construct the panel

    at startup, remote updates can only be installed
    if they're already in localStorage —— otherwise
    it would take too long or risk an incomplete update

    so if there's no localStorage, it's local files  */

var JSXFILEPATH   = 'json/jsxFiles.json'      // string    where jsx file list JSON is stored

elapse(216, `getting JSX file list\n`)

getLocalFile (0, JSXFILEPATH, parseJsxList)

/*———————————————————————————————————————— 1. parseJsxList(source, contents, path)

    loads the manifest for the active source into
    jsxList, an object with keys and values:

    { "id":0, "name":"manifest" ,"ext":"json", "loaded":false } */

function parseJsxList(source, contents, path){

  console.log(' ')
  elapse(34, `        parseJsxList() - validating jsx file list JSON`)

//———————————————————————————————————————— validate text

  if (typeof contents == 'undefined'){
    elapse(300, `        parseJsxList() - error; contents is undefined`)
    return true
  }

  if (contents == ''){
    elapse(305, `        parseJsxList() - stopping; remote jsx file list is empty (path=${path})`)
    return true
  }

//———————————————————————————————————————— validate JSON

  try{ var zoop = JSON.parse(contents) }
  catch(msg){
    elapse(309, `        parseJsxList() - CANCELED ⚠️ parse error in ${path}\n\n    ${msg}\n\n` )
    return true
  }

  try{ jsxList = zoop.filter(record => record.name.slice(0,1) != '#') }
  catch(msg){
    elapse(316, `        parseJsxList() - CANCELED ⚠️ missing "name" record in jsxList JSON from ${path}\n\n    ${msg}\n\n` )
    return true
  }

//———————————————————————————————————————— validate 1st record (self-reference)

  jsxListVERSION = jsxList[0].id

  if (typeof jsxListVERSION == 'undefined'){
    elapse(330, `        parseJsxList() - jsx file list error - missing jsx file list id`)
    return true
  }

//———————————————————————————————————————— mark as loaded and continue

  jsxList[0]['loaded'] = true


  elapse(76, `        parseJsxList() - jsx file list loaded`)
  loadJsxFiles(source)

}

/*———————————————————————————————————————— 2. loadJsxFiles(source)

    this will load the relevant files into memory but NOT activate
    them. they will be activated only when they are all loaded
    and validated in the jsxList json category "loaded" */

function loadJsxFiles(source){

  elapseGroup(89, `        loadJsxFiles() - loading ${jsxList.length} files into variable jsxList...`)
  for (var x=1; x<jsxList.length; x++){

    var comment = jsxList[x]['name'].slice(0,1) === '#'
    if (comment) continue

    var  path =  makePath(jsxList[x])


    if (path == ''){
      console.groupEnd()
      elapse(365, `            loadJsxFiles() ⚠️ impossible to construct path for jsxList[${x}]`)
      return
    }

    elapse(362, `          loadJsxFiles() - ${path}`)

    getLocalFile (x, path, fileToCEP)

  }
  console.groupEnd()
  elapseGroup(109, `        installing JSX content...`)
}

/*———————————————————————————————————————— 3. fileToCEP(x, contents, path)

    this will create the localStorage variable for each script
    then mark the script as loaded in jsxList */

function fileToCEP(x, contents, path){

  if (typeof jsxList[x] == 'undefined'){
    elapsed(385, `     fileToCEP() - file not found: `)
    return True
  }

  CEP.evalScript(contents)
  elapse(392, `     fileToCEP() - ${jsxList[x].name} added`)
}


//:::::::::::::::::::::::::::::::::::::::: fetch utilities

/*———————————————————————————————————————— getLocalFile(path, callback)

    https://stackoverflow.com/questions/39989756/how-do-i-make-a-function-that-returns-the-value-of-a-local-text-file-in-javascri

    takes passthrough identifier, path, and callback function

    no choice of source — there's only one local source */

function getLocalFile(passthrough, path, callback){

  path = `${TOOLSPATH}/${path}`

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


//:::::::::::::::::::::::::::::::::::::::: other functions

/*———————————————————————————————————————— makePath(obj)

    creates the file path from the manifest info */

function makePath(obj){
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

/*———————————————————————————————————————— dirListArray(dir, ext, lsName)

    using node adds approx. 1 second to startup time

    returns a file list from a given directory in the plugin
    containing files with a given extension

    this can only be done at Illustrator startup, so we
    stores the result in localStorage

    requires the following in manifest.xml:
 
     <CEFCommandLine>
       <Parameter>--enable-nodejs</Parameter>
     </CEFCommandLine>                                       */

function dirListArray(dir, ext, lsName){
  
  if (typeof require != 'undefined' && typeof localStorage[lsName] == 'undefined'){

    var path    = CEP.getSystemPath(SystemPath.EXTENSION)
    var fs      = require('fs')
    var rawList = fs.readdirSync(path+'/'+dir)

    var tempArray = []
    for (x=0; x<rawList.length; x++)
      if (rawList[x].slice(-3) == ext) tempArray.push(rawList[x])
    
    localStorage[lsName] = tempArray.join('|')
  }
  
  if (typeof localStorage[lsName] == 'undefined') return []
  if (     ! localStorage[lsName].includes('|') ) return []

  return localStorage[lsName].split('|')
}


//:::::::::::::::::::::::::::::::::::::::: fin

