
/*:::::::::::::::::::::::::::::::::::::::: utilities.js */

/*———————————————————————————————————————— lert(msg)

    alerts that don't exit Illustrators space */

function lert(msg){
  msg = JSON.stringify(String(msg))
  msg = msg.substr(1, msg.length-2)

  console.log(msg)
  CEP.evalScript('alert("' + msg + '")')
}

/*———————————————————————————————————————— ut_transmitToCEP(varName, val) DOESN'T HANDLE ARRAYS

    transmits a JS variable to CEP, as correct type
    currently JSON is sent in stringified format */



function ut_transmitToCEP(varName, val){

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

    if (typeof JSONCOUNT == 'undefined') JSONCOUNT = 3600000/500

    JSONCOUNT += 1

    if (JSONCOUNT < 3600000/500) return true // 1 per hour, it's only the dictionary

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

/*———————————————————————————————————————— ut_transmitCSStoCEP(varName)

    given a css variable name (without interface code)
    sends the RGB array equivalent of a HSL color to CEP */

function ut_transmitCSStoCEP(varName){

  var    hsl = style.getPropertyValue(`--${varName}${INTERFACE}`)
  var rgbStr = ut_hslToRgbArray(hsl).join(',')

  var evalStr = `${varName}=[${rgbStr}]`
  CEP.evalScript(evalStr)

}


/*:::::::::::::::::::::::::::::::::::::::: fin */

