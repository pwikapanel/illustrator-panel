
/* vim: set foldmethod=marker fmr=/*\—,///: */

/*:::::::::::::::::::::::::::::::::::::::: utilities.js */

/*———————————————————————————————————————— lert(msg)

    alerts that don't exit Illustrators space */

function lert(msg){
  msg = JSON.stringify(String(msg))
  msg = msg.substr(1, msg.length-2)

  console.log(msg)
  CEP.evalScript('alert("' + msg + '")')
}
///
/*———————————————————————————————————————— varToCep(varName, val)

    DOESN'T HANDLE ARRAYS

    transmits a JS variable to CEP, as correct type
    currently JSON is sent in stringified format */


function varToCep(varName, val){

  //—————————————————————————————————————— initialization

  var cepVal

  //—————————————————————————————————————— boolean

  if (typeof val == 'boolean'){
    if (val==true)   cepVal = 'true'
    if (val== false) cepVal = 'false'
  }

  //—————————————————————————————————————— number

  else if (!isNaN(val)){
    cepVal = val.toString()
  }

  //—————————————————————————————————————— JSON

  else if (typeof val == 'object'){
    if (varName == 'MANIFEST') return true

    if (typeof JSONCOUNT == 'undefined') JSONCOUNT = 3600000/500

    JSONCOUNT += 1

    if (JSONCOUNT < 3600000/500) return true // 1 per hour, it's only the dictionary

    JSONCOUNT = 0
    var str = JSON.stringify(val)
    cepVal = 'decodeJSON("' + encodeURI(str) + '")'
  }

  //—————————————————————————————————————— string

  else{
    cepVal = 'decodeURI("' + encodeURI(val) + '")'
  }

  //—————————————————————————————————————— impossible to discover

  if (typeof cepVal == 'undefined'){
    elapse(75, `impossible to create value from varName ${varName}`)
    return true
  }


  var cepString = 'var ' + varName + '=' + cepVal
  CEP.evalScript(cepString)
  elapse(83, `CEP: ${cepString}`)
  
}
///
/*———————————————————————————————————————— enableObject(objId)

    used to renable buttons after they are disabled
    while saving, for example */

function enableObject(objId){
  window[objId].disabled = false
}
///
/*———————————————————————————————————————— fetchFile(passthrough, path, callback)

    used for news & loading JSX files
    passthrough is usually the name of the requested file */

function fetchFile(passthrough, path, callback) {
  if (path.slice(0,4) != 'http'){
    elapse(97, `     fetch file got local path: ${path}`)
    return
  }


  path = path + '?' + Math.random()

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
//        elapse(185, `     successfully loaded ${passthrough}`)
          callback(passthrough, text, path)
        }
      }
   ).catch(
     function(err){
       elapse(636, `     fetchFile() ⚠️: ${err}`)
       return
     }
   )
}
///
/*———————————————————————————————————————— getLocalFile(passthrough, path, callback)

    https://stackoverflow.com/questions/39989756/how-do-i-make-a-function-that-returns-the-value-of-a-local-text-file-in-javascri

    takes passthrough variable, path, and callback function

    no choice of source — there's only one local source */

function getLocalFile(passthrough, path, callback){

  path = path + '?' + Math.random()

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
///
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
///
/*———————————————————————————————————————— alertPalette(arg)

    colors:
    background: labelText
          text: panelBg

    cssVarToCep isin colorUtilites.js */

function alertPalette(arg){
  var cmd = 'alertPalette("' + TRANSLATE[arg] + '")'
  CEP.evalScript(cmd, alertPaletteCallback)
}
///
/*———————————————————————————————————————— alertPaletteCallback(arg)

    */

function alertPaletteCallback(arg){

  var alertSeconds = 1.5   // how long alert will show

  var cmd = arg+'.hide()'
  setTimeout(function(){ CEP.evalScript(cmd) }, alertSeconds * 1000)
}
///

/*:::::::::::::::::::::::::::::::::::::::: fin */

