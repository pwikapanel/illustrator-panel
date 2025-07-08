
/* vim: set foldmethod=marker fmr=/*\—,///: */

/*:::::::::::::::::::::::::::::::::::::::: utilities.js */

/*———————————————————————————————————————— LERT(msg)

    alerts that don't exit Illustrators space */

function LERT(msg){
  msg = JSON.stringify(String(msg))
  msg = msg.substr(1, msg.length-2)

  console.log(msg)
  CEP.evalScript('alert("' + msg + '")')
}
///
/*———————————————————————————————————————— VARTOCEP(varName, val)

    DOESN'T HANDLE ARRAYS

    transmits a JS variable to CEP, as correct type
    currently JSON is sent in stringified format */


function VARTOCEP(varName, val){

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
/*———————————————————————————————————————— GETREMOTEFILE(passthrough, path, callback)

    used for news & loading JSX files
    passthrough is usually the name of the requested file */

function GETREMOTEFILE(passthrough, path, callback) {
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
       elapse(636, `     GETREMOTEFILE() ⚠️: ${err}`)
       return
     }
   )
}
///
/*———————————————————————————————————————— GETLOCALFILE(passthrough, path, callback)

    https://stackoverflow.com/questions/39989756/how-do-i-make-a-function-that-returns-the-value-of-a-local-text-file-in-javascri

    takes passthrough variable, path, and callback function

    no choice of source — there's only one local source */

function GETLOCALFILE(passthrough, path, callback){

  path = path + '?' + Math.random()

  var myPromise = FETCHLOCAL(path)

  myPromise.then(onFulfilled, onRejected)

  function onFulfilled (contents){
    if (contents != '') callback(passthrough, contents, path)
    else elapse(42, `GETLOCALFILE() - empty file: ${path}`)
  }

  // attention: this catches errors anywhere in the previous callback chain
  function onRejected(txt){
    elapse(47, `GETLOCALFILE() - file not found: ${path}\n\n    ${txt}\n `)
  }

}
///
/*———————————————————————————————————————— FETCHLOCAL(file)

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
    HANDLED in the calling function, GETLOCALFILE()  */

function FETCHLOCAL(file) {

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
/*———————————————————————————————————————— ALERTPALETTE(arg)

    colors:
    background: labelText
          text: panelBg

    CSSVARTOCEP isin colorUtilites.js */

function ALERTPALETTE(arg){
  var cmd = 'ALERTPALETTE("' + TRANSLATE[arg] + '")'
  CEP.evalScript(cmd, ALERTPALETTECALLBACK)
}
///
/*———————————————————————————————————————— ALERTPALETTECALLBACK(arg)

    */

function ALERTPALETTECALLBACK(arg){

  var alertSeconds = 1.5   // how long alert will show

  var cmd = arg+'.hide()'
  setTimeout(function(){ CEP.evalScript(cmd) }, alertSeconds * 1000)
}
///

//:::::::::::::::::::::::::::::::::::::::: color utilities

/*———————————————————————————————————————— CSSVARTOCEP(varName)

    reads a CSS variable declaration
    creates a variable in CEP with the same name */

function CSSVARTOCEP(varName){

  var hslString = STYLE.getPropertyValue(`--${varName}`)

  if (hslString == ''){
    elapse(65, `missing CSS color: ${varName}`)
    return
  }

  var hslArray  = STRTOHSLARRAY(hslString)
  elapse(21, `${hslString} converted to ${hslArray.join(',')}`)

  var rgbArray  = HSLTORGBARRAY(hslArray)
  var rgbString = '[' + rgbArray.join(',') + ']'
  var cepString = `${varName}=${rgbString}`

  //LERT(cepString)
  CEP.evalScript(cepString)
}
///
/*———————————————————————————————————————— SETDIMACCENT()

    defines a dim version of the bright accent color */

function SETDIMACCENT(){

  var hslString = localStorage.accentBright
  
  elapse (115, `hslString=${hslString}`)
  var hslArray  = STRTOHSLARRAY(hslString)
  elapse (115, `hslArray=${hslArray.join(':')}`)

  var h = hslArray[0]
  var s = hslArray[1]
  var l = hslArray[2]

  elapse(230, `h=${h}, s=${s}`)

  if (s<5 || l<5 || l>95) s =  0
  else                    s = 20

  var interfaceLuminosityl = [10, 25, 80, 90]
  var l = interfaceLuminosityl[INTERFACE]

  hslString = `hsl(${h}, ${s}%, ${l}%)`
  elapse (237, `setting accentDim to ${hslString}`)

  // if no color, match other buttons
  if (s<5)
    hslString = STYLE.getPropertyValue(`--inputField`)
  
  document.documentElement.style.setProperty('--accentDim', hslString)
  STYLE = getComputedStyle(document.body)                  

  localStorage.accentDim = hslString
  elapse(142, `wrote to LS: accentDim=${hslString}`)
}
///

//:::::::::::::::::::::::::::::::::::::::: color sub-functions

/*———————————————————————————————————————— STRTOHSLARRAY(str)

    accepts a string of format 'hsl(120, 50%, 50%)'
    with or without commas, with any number of spaces

    returns an array of three 0-1 values */

function STRTOHSLARRAY(str){
  str = str.slice(4, -1)     // remove hsl( & )
  str = str.replace(/,/g,'') // remove commas

  str = str.replace(/\s+/g, ' ').trim()
  // \s matches any whitespace character
  // + means "one or more"


  var hsl = str.split(' ')            // ['80 100', '50']

  var h = parseFloat(hsl[0])            // 80
  var s = parseFloat(hsl[1])            // 100
  var l = parseFloat(hsl[2])            // 50


  return [h, s, l]
}
///
/*———————————————————————————————————————— HSLTORGBARRAY(hslArr)

    accepts three values: 0-360, 0-100, 0-100
    returns an array of three 0-1 values

    axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
    stackoverflow.com/a/9493060 */

function HSLTORGBARRAY(hslArr){

  h = hslArr[0]/360
  s = hslArr[1]/100
  l = hslArr[2]/100

  var r, g, b

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {

    const q = l < 0.5 ? l*(1+s) : l+s-l*s;
    const p = 2*l-q;

    r = RGBSEPARATOR(p, q, h + 1/3);
    g = RGBSEPARATOR(p, q, h);
    b = RGBSEPARATOR(p, q, h - 1/3);
  }

  return [r, g, b];
}
///
/*———————————————————————————————————————— RGBSEPARATOR(m1, m2, h)

    accepts three 0-1 values

    returns a number from 0-1 */

function RGBSEPARATOR(m1, m2, h){

  if (h < 0) h +=  1
  if (h > 1) h -=  1

  if (h*6 < 1) return m1 + (m2-m1) * h * 6
  if (h*2 < 1) return m2
  if (h*3 < 2) return m1 + (m2-m1) * (2/3-h) * 6

  return m1
}
///

//:::::::::::::::::::::::::::::::::::::::: fin

