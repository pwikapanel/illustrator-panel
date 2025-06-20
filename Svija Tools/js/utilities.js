
/*:::::::::::::::::::::::::::::::::::::::: utilities.js */

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

/*———————————————————————————————————————— lert(msg)

    alerts that don't exit Illustrators space */

function lert(msg){
  msg = JSON.stringify(String(msg))
  msg = msg.substr(1, msg.length-2)

  console.log(msg)
  CEP.evalScript('alert("' + msg + '")')
}

/*———————————————————————————————————————— ut_hslToRgbArray(hsl) DOESN'T HANDLE DOUBLE SPACES

    accepts a string of format 'hsl(120, 50%, 50%)'
    with or without commas

    returns an array of three 0-1 values */

function ut_hslToRgbArray(str){

  str = str.slice(4, -1)             // remove hsl()
  str = str.replace(/%/g,'')         // remove % signs
  str = str.trim()                   // remove leading trailing spaces
  str = str.replace(/ +(?= )/g,'')   // remove multiple spaces

  var hsl = str.split(' ')

  var h = parseFloat(hsl[0])            // 80
  var s = parseFloat(hsl[1])            // 100
  var l = parseFloat(hsl[2])            // 50

  return us_hslToRgb(h, s, l)
}

/*———————————————————————————————————————— us_hslToRgb(h, s, l)

    accepts three values: 0-360, 0-100, 0-100

    returns an array of three 0-1 values */

function us_hslToRgb(h, s, l){
  // https://stackoverflow.com/a/9493060

  h = h/360
  s = s/100
  l = l/100

  var r, g, b

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = us_hueToRgb(p, q, h + 1/3);
    g = us_hueToRgb(p, q, h);
    b = us_hueToRgb(p, q, h - 1/3);
  }

  return [r, g, b];
}

/*———————————————————————————————————————— us_hueToRgb(m1, m2, h)

    accepts three 0-1 values

    returns a number from 0-1 */

function us_hueToRgb(m1, m2, h){
  // https://stackoverflow.com/a/9493060

  if (h < 0) h +=  1
  if (h > 1) h -=  1

  if (h*6 < 1) return m1 + (m2-m1) * h * 6
  if (h*2 < 1) return m2
  if (h*3 < 2) return m1 + (m2-m1) * (2/3-h) * 6

  return m1
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

