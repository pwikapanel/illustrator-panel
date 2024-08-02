
/*:::::::::::::::::::::::::::::::::::::::: save.js */

/*———————————————————————————————————————— parameters */

var objLabel = 'save'
var objID    = 'buttSave'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— load utilities */

var utilities = TOOLSPATH + '/cep/utilities.jsx'
CEP.evalScript("$.evalFile('" + utilities + "')")

/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  var param     = 'save'
  CEP.evalScript("param  = '" + param  + "'")

  var script    = 'save.jsx'
  var file = TOOLSPATH + '/cep/' + script

  CEP.evalScript("$.evalFile('" + file      + "')")

})


/*:::::::::::::::::::::::::::::::::::::::: fin */

