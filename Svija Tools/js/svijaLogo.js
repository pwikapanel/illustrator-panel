
//:::::::::::::::::::::::::::::::::::::::: svijaLogo.js / svijaLogo.jsx

/*———————————————————————————————————————— store colors in localStorage

    if user already picked a favorite color */

if (typeof localStorage.accentBright == 'undefined'){
  var style = getComputedStyle(document.body)                  

  localStorage.accentBright = style.getPropertyValue('--accentBright')
  localStorage.accentDim    = style.getPropertyValue('--accentDim')

}

else{
  document.documentElement.style.setProperty('--accentBright', localStorage.accentBright)
  document.documentElement.style.setProperty('--accentDim',    localStorage.accentDim)
}

/*———————————————————————————————————————— online status color

    colored if online, red bar if offline */

onlineStatus()
setInterval(onlineStatus, INTMS)

function onlineStatus(){

  if (navigator.onLine){
    logoArt.style.fill = 'var(--accentBright)'
    logoBar.style.fill = 'var(--panelBgDark)'
  }
  
  else{
    logoArt.style.fill = 'none'
    logoBar.style.fill = 'red'
  }

}

/*———————————————————————————————————————— svijaLogo.addEventListener('mouseup'

    user clicks logo to change color */

svijaLogo.addEventListener('mouseup', (evn) => {
  var style = getComputedStyle(document.body)                  

  elapse(67, 'logo clicked')
  CEP.evalScript('colorPicker()', setAccentColor)

})

function setAccentColor(arg){

  elapse(73, 'setAccentColor returned '+arg)
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

