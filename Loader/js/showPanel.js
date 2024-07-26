
var objId = 'button2l'

var obj = document.getElementById(objId)

if (obj === null) lert(objId + ' is null')

obj.value="open panel"

obj.addEventListener('click', showPanel)

/*———————————————————————————————————————— show dialog panel

    will be utilised for Verify, forms etc. */

function showPanel(){
  var file = PATH + '/jsx/Dialog.jsx'
  CEP.evalScript("$.evalFile('" + file + "')")
}

