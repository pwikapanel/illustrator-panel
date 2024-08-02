
/*:::::::::::::::::::::::::::::::::::::::: localFolder.js */

/*———————————————————————————————————————— parameters */

var objID    = 'buttCheck'
var objLabel = 'check & repair'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  var naam      = 'check.jsx'
  var file = TOOLSPATH + '/cep/' + naam

  CEP.evalScript("$.evalFile('" + file      + "')")

})


/*:::::::::::::::::::::::::::::::::::::::: fin */

