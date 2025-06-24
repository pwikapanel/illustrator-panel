
//:::::::::::::::::::::::::::::::::::::::: jsxLoader.js

// localStorage.clear() // necessary if filenames change

jsxFileList = [
  'accentColor.jsx',
  'changeCase.jsx',
  'checkAndRepair.jsx',
  'createGroup.jsx',
  'json.jsx',
  'openFile.jsx',
  'paletteAlert.jsx',
  'projectInfo.jsx',
  'reopen.jsx',
  'save.jsx',
  'settings.jsx',
  'source.jsx',
  'sourcesNew.jsx',
  'utilities.jsx'
]

/*———————————————————————————————————————— read directory listing STATIC WHILE RE-INSTALLING SEQUOIA */

//var jsxList = dirListArray('jsx', 'jsx', 'jsxList')

var jsxList = [
  'accentColor.jsx',
  'changeCase.jsx',
  'checkAndRepair.jsx',
  'createGroup.jsx',
  'json.jsx',
  'openFile.jsx',
  'paletteAlert.jsx',
  'projectInfo.jsx',
  'reopen.jsx',
  'save.jsx',
  'settings.jsx',
  'source.jsx',
  'sourcesNew.jsx',
  'utilities.jsx'
]

// lert(jsxList.join('\n')) // empty

/*———————————————————————————————————————— try to load each one */

elapseGroup(10, `        loading JSX content (${jsxList.length} files)...`)

for (var x=0; x<jsxList.length; x++){
  var  path = `jsx/${jsxList[x]}`
  elapse(33, `          loading jsx file - ${path}`)
  getLocalFile (jsxList[x], path, fileToCEP)
}

console.groupEnd()

elapseGroup(40, `        installing JSX content...`)


//:::::::::::::::::::::::::::::::::::::::: fetch utilities

/*———————————————————————————————————————— getLocalFile(path, callback)

    https://stackoverflow.com/questions/39989756/how-do-i-make-a-function-that-returns-the-value-of-a-local-text-file-in-javascri

    takes passthrough variable, path, and callback function

    no choice of source — there's only one local source */

function getLocalFile(passthrough, path, callback){

  path = `${TOOLSPATH}/${path}`

  var myPromise = fetchLocal(path)

  myPromise.then(onFulfilled, onRejected)

  function onFulfilled (contents){
    if (contents != '') callback(passthrough, contents, path)
    else elapse(42, `getLocalFile() - empty file: ${path}`)
  }

  // attention: this catches errors anywhere in the previous callback chain
  function onRejected(txt){
    elapse(47, `getLocalFile() - file not found: ${path}\n\n    ${txt}\n `)
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

/*———————————————————————————————————————— fileToCEP(passthrough, contents, path)

     */

function fileToCEP(passthrough, contents, path){

  if (contents == ''){
     elapse(108, `     ${passthrough} returned empty file`)
     return
  }

  CEP.evalScript(contents)
  elapse(111, `     ${passthrough} successfully loaded`)
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
  lert(typeof require)

  if (typeof localStorage[lsName] == 'undefined'){
    elapse(134, `setting localStorage[${lsName}] to ''`)
    localStorage[lsName] = ''
  }

  elapse(138, `typeof require: ${typeof require}, localStorage[lsName].length: ${localStorage[lsName].length}`)
  if (typeof require != 'undefined' && localStorage[lsName].length == 0){

    elapse(140, 'getting fresh directory listing')
    var path    = CEP.getSystemPath(SystemPath.EXTENSION)
    var fs      = require('fs')
    var rawList = fs.readdirSync(path+'/'+dir)

    var tempArray = []
    for (x=0; x<rawList.length; x++)
      if (rawList[x].slice(-3) == ext) tempArray.push(rawList[x])
    
    localStorage[lsName] = tempArray.join('|')
  }
  else
    elapse(152, `didn't getting fresh directory listing`)

  
  if (!localStorage[lsName].includes('|')){
    elapse(156, `returning empty directory listing`)
    return []
  }

  elapse(159, `returning correct directory listing`)
  return localStorage[lsName].split('|')
}


//:::::::::::::::::::::::::::::::::::::::: fin

