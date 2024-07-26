
/*:::::::::::::::::::::::::::::::::::::::: showDialog.js */

/*———————————————————————————————————————— parameters */

var objId    = 'buttDialog'
var objLabel = 'open panel'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

    will be utilised for Verify, forms etc. */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  var file = PATH + '/cep/Dialog.jsx'
  CEP.evalScript("$.evalFile('" + file + "')")
})


/*:::::::::::::::::::::::::::::::::::::::: fin */

