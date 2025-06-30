
//:::::::::::::::::::::::::::::::::::::::: paletteAlert .css .js .jsx

//———————————————————————————————————————— settings 

var alertSeconds = 1.5   // how long alert will show
var progInterval =  30   // ms between prog bar updates
var fudgeFactor  = 0.9   // <1, to match progBar to window closing

/*———————————————————————————————————————— paletteAlert(arg)

    colors:
    background: labelText
          text: panelBg

    cssVarToCep isin colorUtilites.js */

function paletteAlert(arg){
  cssVarToCep('labelText')
  cssVarToCep('panelBg')

  var cmd = 'paletteAlert("' + TRANSLATE[arg] + '")'
  CEP.evalScript(cmd, paletteAlertCallback)
}

/*———————————————————————————————————————— paletteAlertCallback(arg)

    */

function paletteAlertCallback(arg){

  var cmd = arg+'.hide()'
  setTimeout(function(){ CEP.evalScript(cmd) }, alertSeconds * 1000)
}

/*:::::::::::::::::::::::::::::::::::::::: color utilities */

