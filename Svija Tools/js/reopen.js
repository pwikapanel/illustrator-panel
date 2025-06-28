
//:::::::::::::::::::::::::::::::::::::::: reopen.js / reopen.jsx

//———————————————————————————————————————— parameters

var objLabel = TRANSLATE.closedReopenButton
var objWidth = TRANSLATE.closedReopenButtonWidth
var objID    = 'buttC3'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.width = objWidth+'px'
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

  opens file based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {

  var alt = evn.getModifierState('Alt')
  var errmsg = TRANSLATE.noProject
  CEP.evalScript(`reopen("${errmsg}")`)

})


/*:::::::::::::::::::::::::::::::::::::::: fin */

