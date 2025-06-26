
//:::::::::::::::::::::::::::::::::::::::: colorUtilities.js

/*———————————————————————————————————————— cssVarToCep(varName)

    reads a CSS variable declaration
    creates a variable in CEP with the same name */

function cssVarToCep(varName){

  var hslString = STYLE.getPropertyValue(`--${varName}`)

  if (hslString == ''){
    elapse(65, `missing CSS color: ${varName}`)
    return
  }

  var hslArray  = strToHslArray(hslString)
  var rgbArray  = hslToRgbArray(hslArray)
  var rgbString = '[' + rgbArray.join(',') + ']'
  var cepString = `${varName}=${rgbString}`

  //lert(cepString)
  CEP.evalScript(cepString)
}


//:::::::::::::::::::::::::::::::::::::::: utility functions

/*———————————————————————————————————————— strToHslArray(str)

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

/*———————————————————————————————————————— hslToRgbArray(hslArr)

    accepts three values: 0-360, 0-100, 0-100
    returns an array of three 0-1 values

    axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
    stackoverflow.com/a/9493060 */

function hslToRgbArray(hslArr){

  h = hslArr[0]/360
  s = hslArr[1]/100
  l = hslArr[2]/100

  var r, g, b

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {

    const q = l < 0.5 ? l*(1+s) : l+s-l*s;
    const p = 2*l-q;

    r = mysteryFunction(p, q, h + 1/3);
    g = mysteryFunction(p, q, h);
    b = mysteryFunction(p, q, h - 1/3);
  }

  return [r, g, b];
}

/*———————————————————————————————————————— mysteryFunction(m1, m2, h)

    accepts three 0-1 values

    returns a number from 0-1 */

function mysteryFunction(m1, m2, h){

  if (h < 0) h +=  1
  if (h > 1) h -=  1

  if (h*6 < 1) return m1 + (m2-m1) * h * 6
  if (h*2 < 1) return m2
  if (h*3 < 2) return m1 + (m2-m1) * (2/3-h) * 6

  return m1
}


//:::::::::::::::::::::::::::::::::::::::: fin

