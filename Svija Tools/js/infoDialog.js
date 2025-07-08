
/* vim: set foldmethod=marker fmr=/*\—,///: */

//:::::::::::::::::::::::::::::::::::::::: infoDialog.css .js .jsx

/*———————————————————————————————————————— parameters */

var objId    = 'linkInfo'
var objLabel = TRANSLATE.infoLink
///
/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) LERT(objId + ' is null')

obj.text = objLabel
obj.style.display = 'inline'
///
/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {

  var alt = evn.altKey
  var extensionPath = CEP.getSystemPath(SystemPath.EXTENSION)
  var cmd = 'infoDialog("' + extensionPath + '")'
  elapse(50, `calling ${cmd}`)
  CEP.evalScript(cmd, infoDialogCallback)
})
///

/*:::::::::::::::::::::::::::::::::::::::: functions */

/*———————————————————————————————————————— infoDialogCallback(source)

    */

function infoDialogCallback(source){
  if (source == 'true')
    elapse(41, `infoDialogCallback:user clicked "OK"`)
  else
    elapse(43, `infoDialogCallback:user typed escape`)
  return
}
///

/*:::::::::::::::::::::::::::::::::::::::: fin */

