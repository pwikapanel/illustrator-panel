
function showAlert(val){
  var extensionPath = CEP.getSystemPath(SystemPath.EXTENSION)
  var cmd = 'showAlert("' + val + '")'
  CEP.evalScript(cmd, afterAlert)
}

function afterAlert(arg){
  console.log('9: afterAlert: '+arg)
}
