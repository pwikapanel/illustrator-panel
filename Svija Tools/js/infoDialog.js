
//:::::::::::::::::::::::::::::::::::::::: infoDialog.css .js .jsx

/*———————————————————————————————————————— parameters */

var objId    = 'linkInfo'
var objLabel = TRANSLATE.infoLink

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {

 // CSS
  cssVarToCep('infoBg'+INTERFACE)
  cssVarToCep('infoVersion'+INTERFACE)
  cssVarToCep('infoParagraph'+INTERFACE)
  cssVarToCep('infoUsage'+INTERFACE)
  cssVarToCep('infoButtons'+INTERFACE)

  para1line1 = TRANSLATE.startupTime + STARTUPTIME
  para1line2 = TRANSLATE.memoryUsed + USEDHEAP

  para2line1 = TRANSLATE.infoText1
  para2line2 = TRANSLATE.infoText2

  varToCep('para1line1', para1line1)
  varToCep('para1line2', para1line2)
  varToCep('para2line1', para2line1)
  varToCep('para2line2', para2line2)

  var alt = evn.altKey
  var extensionPath = CEP.getSystemPath(SystemPath.EXTENSION)
  var cmd = 'infoDialog("' + extensionPath + '")'
  elapse(50, `CEP: ${cmd}`)
  CEP.evalScript(cmd, infoDialogCallback)
})


/*:::::::::::::::::::::::::::::::::::::::: functions */

/*———————————————————————————————————————— infoDialogCallback(source)

    receives a string from source.jsx

    0 = local
    1 = alpha
    2 = beta
    3 = master   */

function infoDialogCallback(source){
  elapse(59, `infoDialogCallback received ${source}`)
  return
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

