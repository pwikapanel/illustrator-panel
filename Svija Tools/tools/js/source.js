
/*:::::::::::::::::::::::::::::::::::::::: source.js */

/*———————————————————————————————————————— notes

    ⚙ 🫧 ☁️  ⚙️  🍄 🌕 ✨ 🎛️ 🔋 🔅 ★ */

/*———————————————————————————————————————— parameters */

var objId    = 'linkSource'

var objLabel = '   ⚙'

/*———————————————————————————————————————— needed in CEP */

sh_transmitToCEP('AIVERSION' , AIVERSION )
sh_transmitToCEP('LANG'      , LANG      )
sh_transmitToCEP('DICTIONARY', DICTIONARY)

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel

if (SOURCE != 0)
  obj.style.display = 'inline'

/*———————————————————————————————————————— mouseup function

  --aboutBG1       :hsl(29 90%  20%);
  --aboutVersion1  :hsl(0  0%  81%);
  --aboutPara1     :hsl(0  0%  81%);
  --aboutButtons1  :hsl(0  0%  81%);

    will be utilised for Verify, forms etc. */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.altKey

  sh_transmitToCEP('INTERFACE'   ,              INTERFACE   )
  sh_transmitToCEP('ACCENTBRIGHT', localStorage.ACCENTBRIGHT)
  sh_transmitToCEP('ACCENTDIM'   , localStorage.ACCENTDIM   )

  ut_transmitCSStoCEP('aboutBG'          )
  ut_transmitCSStoCEP('aboutVersion'     )
  ut_transmitCSStoCEP('aboutParagraph'   )
  ut_transmitCSStoCEP('aboutInstructions')
  ut_transmitCSStoCEP('aboutButtons'     )

  var extensionPath = CEP.getSystemPath(SystemPath.EXTENSION)
  var cmd = 'sourceDialog("' + extensionPath + '", ' +  SOURCE + ')'
  CEP.evalScript(cmd, setSource)
})

/*———————————————————————————————————————— setSource(source)

    receives a string from source.jsx */

function setSource(str){

  elapse(39, `source.js - checking\n${str}`)

  var bits    = str.split('|')
  var source  = bits[0]
  var local   = (bits[1] === 'true')

  if (typeof source == 'undefined') return true
  if (       source == ''         ) return true
  if ( isNaN(source)              ) return true // notNumber, notANumber not a number
  if (    1 > source || 3 < source) return true

  elapse(50, `source.js - source is now ${sh_sourceName(source)}`)

  switch(source){
    case '1':
    case '2':
    case '3':
      launchUpdate(source)
      break

    default :
      lert('Invalid source: ' + source)
  }
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

