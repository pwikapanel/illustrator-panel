
/*:::::::::::::::::::::::::::::::::::::::: logoColor.js */

/*———————————————————————————————————————— logo SVG code

  <svg id="svijaLogo" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 115 21">
    <rect id="logoBar" y="7.34" width="115" height="6.3"/>
    <path id="logoArt" d="M67.61,4.8h-2.7v11.69h2.7V4.8ZM72.4,,3.02-1.65l6.5-10.04h-3.21Z"/>
  </svg>

  #svijaLogo #logoBar{ fill: #424242; }
  #svijaLogo #logoArt{ fill: #ccff00; }

*/


/*———————————————————————————————————————— get colors from localStorage

    if user already picked a favorite color */

if (typeof localStorage.accentBright != 'undefined'){
  document.documentElement.style.setProperty('--accentBright', localStorage.accentBright)
  document.documentElement.style.setProperty('--accentDim',    localStorage.accentDim)
}

/*———————————————————————————————————————— online status color

    colored if online, red bar if offline */

var ms = 500

setInterval(function(){
  if (navigator.onLine){
    logoArt.style.fill = 'var(--accentBright)'
    logoBar.style.fill = 'var(--panel-bg-dark)'
    }
  
  else{
    logoArt.style.fill = 'none'
    logoBar.style.fill = 'red'
  }
}, ms)

/*———————————————————————————————————————— svijaLogo.addEventListener('mouseup'

    user clicks logo to change color */

svijaLogo.addEventListener('mouseup', (evn) => {

  var naam      = 'colorPicker.jsx'
  var ISMAC     = 'true'
  var MYDOCS    = '/Users/Main/Documents'

  var file = TOOLSPATH + '/cep/' + naam

  CEP.evalScript("$.evalFile('" + file + "')")
  CEP.evalScript('colorPicker()', setAccent)

})

/*———————————————————————————————————————— setAccent(arg)

    callback function after CEP script is executed */

function setAccent(arg){
  var parts = arg.split(':')

  var r = parts[0]
  var g = parts[1]
  var b = parts[2]

  var hsl        = rgbToHsl(r, g, b)
  var hue        = Math.round(hsl[0])
  var saturation = Math.round(hsl[1])

  var lightness = 50
  if (hue>190 && hue < 290) lightness += 10

  var bright = 'hsl('+hue+', 100%, ' + lightness + '%)'
  var dim    = dimVersion(hue)

  localStorage.accentBright = bright 
  localStorage.accentDim    = dim

  document.documentElement.style.setProperty('--accentBright', bright)
  document.documentElement.style.setProperty('--accentDim',    dim)
}


/*:::::::::::::::::::::::::::::::::::::::: utilities */

/*———————————————————————————————————————— dimVersion(hue, lightness)

    returns a dim version of the bright color */

function dimVersion(hue){
  var lightness = 25                                                             
  if (hue>190 && hue < 290) lightness += 10                                      

  return 'hsl('+hue+', 20%, ' + lightness + '%)'
}

/*———————————————————————————————————————— rgbToHsl(r, g, b)

    https://www.30secondsofcode.org/js/s/rgb-to-hsl/  */

function rgbToHsl(r, g, b){
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
}


/*:::::::::::::::::::::::::::::::::::::::: fin */


//      var hue = systemHue()                                                          
//      var lightness = 50                                                             
//      var dimness = 30                                                               
//                                                                                     
//      if (hue>190 && hue < 290) lightness += 10                                      
//                                                                                     
//      var highlight = 'hsl('+hue+', 100%, ' + lightness + '%)'                       
//      var  dimlight = 'hsl('+hue+',  30%, ' + dimness   + '%)'                       
//                                                                                     
//      if (typeof localStorage.highlight != 'undefined') highlight = localStorage.highlight
//      if (typeof localStorage.dimlight  != 'undefined') dimlight  = localStorage.dimlight
//                                                                                     
//      document.documentElement.style.setProperty('--system-highlight', highlight);   
//      document.documentElement.style.setProperty('--system-dimlight',   dimlight);   
                                                                               

