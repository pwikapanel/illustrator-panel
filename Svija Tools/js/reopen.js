
//:::::::::::::::::::::::::::::::::::::::: reopen.js / reopen.jsx

//———————————————————————————————————————— parameters

var objLabel = TRANSLATE.reopen
var objID    = 'buttC2'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

  opens file based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {

  var alt = evn.getModifierState('Alt')
  var errmsg = TRANSLATE.noLastPath
  CEP.evalScript(`reopen("${errmsg}")`)

})


/*:::::::::::::::::::::::::::::::::::::::: fin */

