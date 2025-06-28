
/*:::::::::::::::::::::::::::::::::::::::: utilities.js */

/*———————————————————————————————————————— lert(msg)

    alerts that don't exit Illustrators space */

function lert(msg){
  msg = JSON.stringify(String(msg))
  msg = msg.substr(1, msg.length-2)

  console.log(msg)
  CEP.evalScript('alert("' + msg + '")')
}

/*———————————————————————————————————————— transmitToCep(varName, val)

    DOESN'T HANDLE ARRAYS

    transmits a JS variable to CEP, as correct type
    currently JSON is sent in stringified format */


function transmitToCep(varName){

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

//———————————————————————————————————————— ut_startTimer()

function ut_startTimer(){
  var d = new Date()
  return d.getTime()
}

//———————————————————————————————————————— ut_elapsed(startTime)

function ut_elapsed(startTime){
  var d = new Date()
  return d.getTime()-startTime
}


function enableInput(objId){
  window[objId].disabled = false
}

/*:::::::::::::::::::::::::::::::::::::::: fin */

