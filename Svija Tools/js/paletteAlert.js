
//:::::::::::::::::::::::::::::::::::::::: paletteAlert.js / paletteAlert.jsx / paletteAlert.css

//———————————————————————————————————————— settings 

var alertSeconds = 1.5   // how long alert will show
var progInterval =  30   // ms between prog bar updates
var fudgeFactor  = 0.9   // <1, to match progBar to window closing

/*———————————————————————————————————————— paletteAlert(val)

    colors:
    background: labelText
          text: panelBg
       progbar: accentDim

    cssVarToCep isin colorUtilites.js */

function paletteAlert(val){
  cssVarToCep('labelText')
  cssVarToCep('panelBg')
  cssVarToCep('accentDim')

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

