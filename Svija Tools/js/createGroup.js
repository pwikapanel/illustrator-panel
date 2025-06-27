
//:::::::::::::::::::::::::::::::::::::::: createGroup.js / createGroup.jsx

/*———————————————————————————————————————— parameters */

var objLabel = TRANSLATE.createGroupButton
var objWidth = TRANSLATE.createGroupButtonWidth
var objID    = 'butt21'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value         = objLabel
obj.style.width   = objWidth + 'px'
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  CEP.evalScript("createGroup()")

})


/*:::::::::::::::::::::::::::::::::::::::: fin */


