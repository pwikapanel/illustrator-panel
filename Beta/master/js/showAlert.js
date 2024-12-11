
/*:::::::::::::::::::::::::::::::::::::::: showAlert.js */

/*———————————————————————————————————————— settings 

    */

var alertSeconds =  3   // how long alert will show
var progInterval = 30   // ms between prog bar updates
var fudgeFactor  =  1   // <1, to match progBar to window closing

/*———————————————————————————————————————— showAlert(val)

    */

function showAlert(val){
  var extensionPath = CEP.getSystemPath(SystemPath.EXTENSION)
  var cmd = 'showAlert("' + val + '")'
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
  console.log(cmd + ' ' + elapsed(globalTimer)+ ' ms')
  CEP.evalScript(cmd)
  
  if (s<100) setTimeout(function(){
      progBarUpdate(s)
    }, progInterval)
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

