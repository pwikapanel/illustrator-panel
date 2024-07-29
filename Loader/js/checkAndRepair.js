
/*:::::::::::::::::::::::::::::::::::::::: localFolder.js */

/*———————————————————————————————————————— parameters */

var objID    = 'buttCheck'
var objLabel = 'check & repair'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function */

  var ISMAC     = 'true'
  var MYDOCS    = '/Users/Main/Documents'
  CEP.evalScript("ISMAC  = '" + ISMAC  + "'")
  CEP.evalScript("MYDOCS = '" + MYDOCS + "'")
  var utilities = TOOLSPATH + '/cep/utilities.jsx'

  CEP.evalScript("$.evalFile('" + utilities + "')")

/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  var naam      = 'check.jsx'
  var file = TOOLSPATH + '/cep/' + naam

  CEP.evalScript("$.evalFile('" + file      + "')")

})


/*:::::::::::::::::::::::::::::::::::::::: fin */

