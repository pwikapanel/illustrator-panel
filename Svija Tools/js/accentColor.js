
/*:::::::::::::::::::::::::::::::::::::::: accentColor.js */

/*———————————————————————————————————————— logo SVG code

/><svg id="svijaLogo"
  onmouseover="logoArt.style.transform='scale(1.1)'"
  onmouseout ="logoArt.style.transform='scale(1.0)'"
  xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 105 22">
  <g>
    <rect id="logoBar" class="cls-1" y="7.85" width="105" height="6.3"/>
    <path id="logoArt" style="transform-origin: 50% 50%;"
      d="M62.133,5.571h-2.571v11.143h2.571V5.571ZM66.705,1h-7.143v2.571h7.143V1ZM66.705,5.571h-2.571v15.429h2.571V5.571ZM36.295,16.714h-16.857v-2.571h14.286v-.994l-14.286-1.735v-5.843h16.857v2.571h-14.286v.994l14.286,1.735v5.843ZM85.562,5.571h-16.857v2.571h14.286v.994l-14.286,1.735v5.843h16.857V5.571ZM71.276,13.149l11.714-1.423v2.416h-11.714v-.994ZM55.614,5.571l-5.289,8.178c-.159.246-.43.394-.723.394h-3.38c-.293,0-.564-.147-.723-.394l-5.289-8.178h-3.062l6.192,9.574c.635.982,1.713,1.569,2.882,1.569h3.38c1.17,0,2.247-.586,2.882-1.569l6.192-9.574h-3.062Z"/>
  </g>
</svg */

/*———————————————————————————————————————— store colors in localStorage

    if user already picked a favorite color */

if (typeof localStorage.ACCENTBRIGHT == 'undefined'){

  var style = getComputedStyle(document.body)                  
  localStorage.ACCENTBRIGHT = style.getPropertyValue('--accentBright')
  localStorage.ACCENTDIM    = style.getPropertyValue('--accentDim')
  
}
else{

  document.documentElement.style.setProperty('--accentBright', localStorage.ACCENTBRIGHT)
  document.documentElement.style.setProperty('--accentDim',    localStorage.ACCENTDIM)

}

/*———————————————————————————————————————— online status color

    colored if online, red bar if offline */

onlineStatus()
setInterval(onlineStatus, INTMS)

function onlineStatus(){
  try{
  if (navigator.onLine){
    logoArt.style.fill = 'var(--accentBright)'
    logoBar.style.fill = 'var(--panel-bg-dark)'
    }
  
  else{
    logoArt.style.fill = 'none'
    logoBar.style.fill = 'red'
  }
  } catch(e){ lert('accentColor 50: '+e) }
}


/*———————————————————————————————————————— svijaLogo.addEventListener('mouseup'

    user clicks logo to change color */

svijaLogo.addEventListener('mouseup', (evn) => {

  CEP.evalScript('colorPicker()', setAccent)

})

function setAccent(arg){
  var parts = arg.split(':')

  var r = parts[0]
  var g = parts[1]
  var b = parts[2]

  var hsl        = ut_rgbToHsl(r, g, b)
  var hue        = Math.round(hsl[0])
  var saturation = Math.round(hsl[1])

  var lightness = 50
  if (hue>190 && hue < 290) lightness += 10

  var bright = 'hsl('+hue+', 100%, ' + lightness + '%)'
  var dim    = dimVersion(hue)

  localStorage.ACCENTBRIGHT = bright 
  localStorage.ACCENTDIM    = dim

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

/*———————————————————————————————————————— ut_rgbToHsl(r, g, b)

    https://www.30secondsofcode.org/js/s/rgb-to-hsl/  */

function ut_rgbToHsl(r, g, b){
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

