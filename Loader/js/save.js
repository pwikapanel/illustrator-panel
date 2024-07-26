
/*:::::::::::::::::::::::::::::::::::::::: save.js */

/*———————————————————————————————————————— parameters */

var objID    = 'buttSave'
var objLabel = 'save'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  var naam      = 'save.jsx'
  var ISMAC     = 'true'
  var param     = 'save'
  var MYDOCS    = '/Users/Main/Documents'
  var utilities = PATH + '/cep/utilities.jsx'

  var file = PATH + '/cep/' + naam

  CEP.evalScript("param  = '" + param  + "'")
  CEP.evalScript("ISMAC  = '" + ISMAC  + "'")
  CEP.evalScript("MYDOCS = '" + MYDOCS + "'")

  CEP.evalScript("$.evalFile('" + utilities + "')")
  CEP.evalScript("$.evalFile('" + file      + "')")

})


/*:::::::::::::::::::::::::::::::::::::::: fin */

