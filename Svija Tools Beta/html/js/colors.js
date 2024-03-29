//———————————————————————————————————————— match highlight color to system

var hostEnv     = jsx.getHostEnvironment();
var RGBColorObj = hostEnv.appSkinInfo.systemHighlightColor;

var r = RGBColorObj.red
var g = RGBColorObj.green
var b = RGBColorObj.blue

var hsl        = rgbToHsl(r, g, b)
var hue        = Math.round(hsl[0])
var saturation = Math.round(hsl[1])

if (''+r+g+b == '0120215') hue = 72

if (saturation < 10) hue = 72   // if system highlight is gray, use official color

var lightness = 50
var dimness   = 30

if (hue>190 && hue < 290) lightness += 10

var highlight = 'hsl('+hue+', 100%, ' + lightness + '%)'
var  dimlight = 'hsl('+hue+',  30%, ' + dimness   + '%)'


if (typeof localStorage.highlight != 'undefined') highlight = localStorage.highlight
if (typeof localStorage.dimlight  != 'undefined') dimlight  = localStorage.dimlight

document.documentElement.style.setProperty('--system-highlight', highlight);
document.documentElement.style.setProperty('--system-dimlight',   dimlight);


//:::::::::::::::::::::::::::::::::::::::: functions

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



