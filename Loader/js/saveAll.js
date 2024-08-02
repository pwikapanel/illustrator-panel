
/*:::::::::::::::::::::::::::::::::::::::: saveAll.js */

/*———————————————————————————————————————— parameters */

var objID    = 'buttAll'
var objLabel = 'save all'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— load utilities */







/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  var script    = 'save.jsx'
  var param     = 'all'

  var file = TOOLSPATH + '/cep/' + script

  CEP.evalScript("param  = '" + param  + "'")
  CEP.evalScript("$.evalFile('" + file      + "')")

})


/*:::::::::::::::::::::::::::::::::::::::: fin */

