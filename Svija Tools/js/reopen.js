
//:::::::::::::::::::::::::::::::::::::::: reopen.js / reopen.jsx

/*———————————————————————————————————————— parameters */

var objID    = 'buttD2'
var objLabel = TRANSLATE.reopen

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

  opens file based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {

  var alt = evn.getModifierState('Alt')
  CEP.evalScript('reopen()')

})


/*:::::::::::::::::::::::::::::::::::::::: fin */

