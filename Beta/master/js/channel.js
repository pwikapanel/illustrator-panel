
/*:::::::::::::::::::::::::::::::::::::::: branch.js */

/*———————————————————————————————————————— parameters */

var objId    = 'linkBranch'

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
  var cmd = 'branchDialog("' + extensionPath + '", ' +  BRANCH + ')'
  CEP.evalScript(cmd, setBranch)
})

/*———————————————————————————————————————— setBranch(branch)

    receives a string from branch.jsx */

function setBranch(str){

  var bits    = str.split('|')
  var branch = bits[0]
  var local   = (bits[1] === 'true')

  if (typeof branch == 'undefined') return true
  if (       branch == ''         ) return true
  if ( isNaN(branch)              ) return true // notNumber, notANumber not a number
  if (   0 > branch || 2 < branch) return true

  switch(branch){
    case '0':
    case '1':
    case '2':
      var ab = localStorage.accentBright
      var ad = localStorage.accentDim

      localStorage.clear();

      localStorage.BRANCH      = branch
      localStorage.LOCAL        = local
      localStorage.accentBright = ab
      localStorage.accentDim    = ad
      location.reload(); break

    default :
      lert('Invalid branch: ' + branch);
  }
}

/*:::::::::::::::::::::::::::::::::::::::: fin */

