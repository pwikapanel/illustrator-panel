
/*:::::::::::::::::::::::::::::::::::::::: source.js */

/*———————————————————————————————————————— parameters */

var objId    = 'linkSource'

    // ⚙ 🫧 ☁️  ⚙️  🍄 🌕 ✨ 🎛️ 🔋 🔅 ★

var objLabel = '   ⚙'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— mouseup function

    will be utilised for Verify, forms etc. */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.altKey
  var extensionPath = CEP.getSystemPath(SystemPath.EXTENSION)
  var cmd = 'sourceDialog("' + extensionPath + '", ' +  SOURCE + ')'
  CEP.evalScript(cmd, setSource)
})

/*———————————————————————————————————————— setSource(source)

    receives a string from source.jsx */

function setSource(str){

  var bits    = str.split('|')
  var source = bits[0]
  var local   = (bits[1] === 'true')

  if (typeof source == 'undefined') return true
  if (       source == ''         ) return true
  if ( isNaN(source)              ) return true // notNumber, notANumber not a number
  if (   0 > source || 2 < source) return true

  switch(source){
    case '0':
    case '1':
    case '2':
      var ab = localStorage.accentBright
      var ad = localStorage.accentDim

      localStorage.clear();

      localStorage.SOURCE      = source
      localStorage.LOCAL        = local
      localStorage.accentBright = ab
      localStorage.accentDim    = ad
      location.reload(); break

    default :
      lert('Invalid source: ' + source);
  }
}

/*:::::::::::::::::::::::::::::::::::::::: fin */

