
/* vim: set foldmethod=marker fmr=/*\—,///: */

//:::::::::::::::::::::::::::::::::::::::: svijaLogo.jsx .js

elapse(6, `on load, localStorage.accentBright=${localStorage.accentBright}, localStorage.accentDim=${localStorage.accentDim}`)

if (typeof localStorage.accentBright == 'undefined'){
  localStorage.accentBright = STYLE.getPropertyValue('--accentBright')
  localStorage.accentDim    = STYLE.getPropertyValue('--accentDim')
  elapse(11, `wrote to LS: accentDim=${STYLE.getPropertyValue('--accentDim')}`)
}

else{
  document.documentElement.style.setProperty('--accentBright', localStorage.accentBright)
  document.documentElement.style.setProperty('--accentDim',    localStorage.accentDim)
  STYLE = getComputedStyle(document.body)                  
}

//:::::::::::::::::::::::::::::::::::::::: setInterval online status

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
///

//:::::::::::::::::::::::::::::::::::::::: user changes color

/*———————————————————————————————————————— CEP.evalScript('svijaLogo()')

    user clicks logo to change color */

svijaLogo.addEventListener('mouseup', (evn) => {
  elapse(67, 'logo clicked')
  CEP.evalScript('svijaLogo()', svijaLogoCallback)
})
///
/*———————————————————————————————————————— svijaLogoCallback(arg)

    */

function svijaLogoCallback(arg){

  elapse(73, 'svijaLogoCallback returned '+arg)
  var parts = arg.split(':')

  var r = parts[0]
  var g = parts[1]
  var b = parts[2]

  var hsl = rgbToHsl(r, g, b)
  var   h = Math.round(hsl[0])
  var   s = Math.round(hsl[1])
  var   l = Math.round(hsl[2])

  var hslString = `hsl(${h}, ${s}% , ${l}%)`

  document.documentElement.style.setProperty('--accentBright', hslString)
  STYLE = getComputedStyle(document.body)                  

  localStorage.accentBright = hslString 
  setDimAccentColor()
}
///

/*:::::::::::::::::::::::::::::::::::::::: utilities */

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
///

/*:::::::::::::::::::::::::::::::::::::::: fin */

