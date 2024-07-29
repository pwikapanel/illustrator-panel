
/*:::::::::::::::::::::::::::::::::::::::: save.js */

/*———————————————————————————————————————— parameters */

var objID    = 'buttSave'
var objLabel = 'save'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'


  var ISMAC     = 'true'
  var MYDOCS    = '/Users/Main/Documents'
  var utilities = TOOLSPATH + '/cep/utilities.jsx'
  CEP.evalScript("ISMAC  = '" + ISMAC  + "'")
  CEP.evalScript("MYDOCS = '" + MYDOCS + "'")

  CEP.evalScript("$.evalFile('" + utilities + "')")

/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  var naam      = 'save.jsx'
  var param     = 'save'

  var file = TOOLSPATH + '/cep/' + naam

  CEP.evalScript("param  = '" + param  + "'")
  CEP.evalScript("$.evalFile('" + file      + "')")

})


/*:::::::::::::::::::::::::::::::::::::::: fin */

