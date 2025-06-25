
//:::::::::::::::::::::::::::::::::::::::: paletteAlert.js / paletteAlert.jsx / paletteAlert.css

//———————————————————————————————————————— settings 

var alertSeconds =   1   // how long alert will show
var progInterval =  30   // ms between prog bar updates
var fudgeFactor  = 0.9   // <1, to match progBar to window closing

/*———————————————————————————————————————— paletteAlert(val)

    */

function paletteAlert(val){
//var extensionPath = CEP.getSystemPath(SystemPath.EXTENSION)
  cssToCep('aboutBG0')
  var cmd = 'paletteAlert("' + val + '")'
  CEP.evalScript(cmd, paletteAlertCallback)
}

/*———————————————————————————————————————— paletteAlertCallback(arg)

    */

function paletteAlertCallback(arg){
  progBarUpdate(0)

  var cmd = arg+'.hide()'
  setTimeout(function(){ CEP.evalScript(cmd) }, alertSeconds * 1000)
}

/*———————————————————————————————————————— progBarUpdate(s)

    */

function progBarUpdate(s){

  var x = 100/(alertSeconds * fudgeFactor * 1000 / progInterval)
  // 200 interventions
  // 10 * 1000 / 50 / 100

  s += x

  var cmd = 'progBarUpdate(' + s + ')'
//elapse(46, `paletteAlert - ${cmd}`) // too many entries
  CEP.evalScript(cmd)
  
  if (s<100) setTimeout(function(){
      progBarUpdate(s)
    }, progInterval)
}


/*:::::::::::::::::::::::::::::::::::::::: color utilities */

/*———————————————————————————————————————— cssToCep(varName)

    */

function cssToCep(varName){

  var hslString = STYLE.getPropertyValue(`--${varName}`)

  if (hslString == ''){
    elapse(65, `missing CSS color: ${varName}`)
    return
  }

  var hslArray  = strToHslArray(hslString)
  var rgbArray  = hslToRgbArray(hslArray)
  var rgbString = '[' + rgbArray.join(',') + ']'
  var evalStr   = `${varName}=${rgbString}`

  lert(evalStr)
  CEP.evalScript(evalStr)
}

/*———————————————————————————————————————— hslToRgbArray(hsl)

    accepts a string of format 'hsl(120, 50%, 50%)'
    with or without commas, with any number of spaces

    returns an array of three 0-1 values */

function strToHslArray(str){
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

/*———————————————————————————————————————— us_hslToRgb(h, s, l)

    accepts three values: 0-360, 0-100, 0-100

    returns an array of three 0-1 values */

function hslToRgbArray(hslArr){
  // https://stackoverflow.com/a/9493060

  h = hslArr[0]/360
  s = hslArr[1]/100
  l = hslArr[2]/100

  var r, g, b

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1/3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1/3);
  }

  return [r, g, b];
}

/*———————————————————————————————————————— hueToRgb(m1, m2, h)

    accepts three 0-1 values

    returns a number from 0-1 */

function hueToRgb(m1, m2, h){
  // https://stackoverflow.com/a/9493060

  if (h < 0) h +=  1
  if (h > 1) h -=  1

  if (h*6 < 1) return m1 + (m2-m1) * h * 6
  if (h*2 < 1) return m2
  if (h*3 < 2) return m1 + (m2-m1) * (2/3-h) * 6

  return m1
}

