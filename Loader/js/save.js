
/*:::::::::::::::::::::::::::::::::::::::: save.js */

/*———————————————————————————————————————— parameters */

var objID    = 'buttSave'
var objLabel = 'save'

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

  var script    = 'save.jsx'
  var param     = 'save'

  var file = TOOLSPATH + '/cep/' + script

  CEP.evalScript("param  = '" + param  + "'")
  CEP.evalScript("$.evalFile('" + file      + "')")

})


/*:::::::::::::::::::::::::::::::::::::::: fin */

