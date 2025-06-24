
/*:::::::::::::::::::::::::::::::::::::::: paletteAlert.js */

//———————————————————————————————————————— settings 

var alertSeconds =   2   // how long alert will show
var progInterval =  30   // ms between prog bar updates
var fudgeFactor  = 0.9   // <1, to match progBar to window closing

/*———————————————————————————————————————— paletteAlert(val)

    */

function paletteAlert(val){
  var extensionPath = CEP.getSystemPath(SystemPath.EXTENSION)
  var cmd = 'paletteAlert("' + val + '")'
  CEP.evalScript(cmd, alertCallback)
}

/*———————————————————————————————————————— alertCallback(arg)

    */

function alertCallback(arg){
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


/*:::::::::::::::::::::::::::::::::::::::: fin */

