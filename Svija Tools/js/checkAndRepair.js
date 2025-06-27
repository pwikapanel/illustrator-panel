
//:::::::::::::::::::::::::::::::::::::::: checkAndRepair.js / checkAndRepair.jsx

/*———————————————————————————————————————— parameters */

var objLabel = TRANSLATE.checkAndRepairButton
var objWidth = TRANSLATE.checkAndRepairButtonWidth
var objID    = 'butt41'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value         = objLabel
obj.style.width   = objWidth + 'px'
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.altKey

  CEP.evalScript("checkAndRepair()")

})


/*:::::::::::::::::::::::::::::::::::::::: fin */

