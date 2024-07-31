
/*:::::::::::::::::::::::::::::::::::::::: saveAll.js */

/*———————————————————————————————————————— parameters */

var objID    = 'buttLast'
var objLabel = 'open last'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— load scripts

     */

var scr = 'openLast.jsx'
var file = TOOLSPATH + '/cep/' + scr
CEP.evalScript("$.evalFile('" + file + "')")

/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {

  var alt = evn.getModifierState('Alt')
  CEP.evalScript('openLast()')

})


/*:::::::::::::::::::::::::::::::::::::::: fin */

