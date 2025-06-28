
//:::::::::::::::::::::::::::::::::::::::: info.js / info.jsx

/*———————————————————————————————————————— parameters */

var objId    = 'linkInfo'
var objLabel = TRANSLATE.infoLink

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— obj.addEventListener('mouseup', (evn) =>

  --aboutBG1       :hsl(29 90%  20%);
  --aboutVersion1  :hsl(0  0%  81%);
  --aboutPara1     :hsl(0  0%  81%);
  --aboutButtons1  :hsl(0  0%  81%);

    will be utilised for Verify, forms etc. */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.altKey


//transmitToCep('LANG')
//transmitToCep('INTERFACE')
//transmitToCep('ACCENTBRIGHT')
//transmitToCep('ACCENTDIM')

//cssVarToCep('aboutBG'          )
//cssVarToCep('aboutVersion'     )
//cssVarToCep('aboutParagraph'   )
//cssVarToCep('aboutInstructions')
//cssVarToCep('aboutButtons'     )

  var extensionPath = CEP.getSystemPath(SystemPath.EXTENSION)
  var cmd = 'infoDialog("' + extensionPath + '")'
  CEP.evalScript(cmd, setSource)
})


/*:::::::::::::::::::::::::::::::::::::::: functions */

/*———————————————————————————————————————— setSource(source)

    receives a string from source.jsx

    0 = local
    1 = alpha
    2 = beta
    3 = master   */

function setSource(source){
  elapse(59, "SUCCESS: info.jsx —› info.js")
  return
  if (        source == ''          ) return true // user canceled
  if ( typeof source == 'undefined' ) return true // should not happen

  if (isNaN(source) || '1'>source || '3'<source){
    elapse(73, `            setSource() — invalid source; settings.jsx returned ${source}`)
    return true
  }

  elapse(77, `            setSource() — source changed to ${sh_sourceName(source)}`)

  switch(source){
    case '1':
    case '2':
    case '3':
      sh_launchUpdate(source)
      break

    default :
      lert('Invalid Source\nsettings.jsx returned ' + source)
  }
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

