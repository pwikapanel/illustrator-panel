
//:::::::::::::::::::::::::::::::::::::::: alertPalette .css .js .jsx

//———————————————————————————————————————— settings 

var alertSeconds = 1.5   // how long alert will show
var progInterval =  30   // ms between prog bar updates
var fudgeFactor  = 0.9   // <1, to match progBar to window closing

/*———————————————————————————————————————— alertPalette(arg)

    colors:
    background: labelText
          text: panelBg

    cssVarToCep isin colorUtilites.js */

// lert(STYLE.getPropertyValue(`--fieldContents0`)) // worked
lert(INTERFACE)

function alertPalette(arg){

  cssVarToCep('alertBG' + INTERFACE)
  cssVarToCep('panelText' + INTERFACE)

  var cmd = 'alertPalette("' + TRANSLATE[arg] + '")'
  CEP.evalScript(cmd, alertPaletteCallback)
}

/*———————————————————————————————————————— alertPaletteCallback(arg)

    */

function alertPaletteCallback(arg){

  var cmd = arg+'.hide()'
  setTimeout(function(){ CEP.evalScript(cmd) }, alertSeconds * 1000)
}

/*:::::::::::::::::::::::::::::::::::::::: color utilities */

