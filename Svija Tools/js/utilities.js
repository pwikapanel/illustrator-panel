
/*:::::::::::::::::::::::::::::::::::::::: utilities.js */

/*———————————————————————————————————————— lert(msg)

    alerts that don't exit Illustrators space */

function lert(msg){
  msg = JSON.stringify(String(msg))
  msg = msg.substr(1, msg.length-2)

  console.log(msg)
  CEP.evalScript('alert("' + msg + '")')
}

/*———————————————————————————————————————— varToCep(varName, val)

    DOESN'T HANDLE ARRAYS

    transmits a JS variable to CEP, as correct type
    currently JSON is sent in stringified format */


function varToCep(varName){

  //—————————————————————————————————————— varName doesn't exist

  if (typeof window[varName] == 'undefined'){
    elapse(32, `${varName} is not defined (utilities.js)`)
    return
  }

  //—————————————————————————————————————— initialization

  var val = window[varName]
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
    cepVal = 'ut_decodeJSON("' + encodeURI(str) + '")'
  }

  //—————————————————————————————————————— string

  else{
    cepVal = 'decodeURI("' + encodeURI(val) + '")'
  }

  //—————————————————————————————————————— impossible to discover

  if (typeof cepVal == 'undefined'){
    elapses(75, `impossible to create value from varName ${varName}`)
    return true
  }


  var cepString = varName + '=' + cepVal
  CEP.evalScript(cepString)
}

/*———————————————————————————————————————— enableObject(objId)

    used to renable buttons after they are disabled
    while saving, for example */

function enableObject(objId){
  window[objId].disabled = false
}

/*———————————————————————————————————————— fetchFile(passthrough, path, callback)

    used for news & loading JSX files
    passthrough is usually the name of the requested file */

function fetchFile(passthrough, path, callback) {

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
          elapse(185, `     successfully loaded ${passthrough}`)
          callback(passthrough, text, path)
        }
      }
   ).catch(
     function(err){
       elapse(636, `     fetchFile()⚠️ CANCELING\n     ${err}`)
       return
     }
   )
}

/*———————————————————————————————————————— fileToCep(passthrough, contents, path)

     evaluates the contents of a file so that it will
     be available in CEP */

function fileToCep(passthrough, contents, path){

  if (contents == ''){
     elapse(108, `     ${passthrough} returned empty file`)
     return
  }

  CEP.evalScript(contents)
  elapse(111, `     ${passthrough} successfully evaluated in CEP`)
}

/*———————————————————————————————————————— dirListArray(dir, ext, lsName)

    using node adds approx. 1 second to startup time

    returns a file list from a given local directory in
    the plugin, containing files with a given extension

    this can only be done at Illustrator startup, so we
    store the result in localStorage

    requires the following in manifest.xml:
 
     <CEFCommandLine>
       <Parameter>--enable-nodejs</Parameter>
     </CEFCommandLine>    */

function dirListArray(dir, ext, lsName){

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
    elapse(152, `directory listing in LS — didn't get fresh listing`)

  if (typeof require == 'undefined' && localStorage[lsName].length == 0)
    lert('Restart Illustrator\nFresh directory listing needed')
  
  if (!localStorage[lsName].includes('|')){
    elapse(156, `returning empty directory listing`)
    return []
  }

  elapse(159, `returning correct directory listing`)
  return localStorage[lsName].split('|')
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

