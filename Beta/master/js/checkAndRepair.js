
/*:::::::::::::::::::::::::::::::::::::::: checkAndRepair.js */

/*———————————————————————————————————————— parameters */

var objLabel = 'check & repair'
var objID    = 'buttCheck'
var script   = 'checkAndRepair.jsx'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— load utilities */

     /* loaded by save.js */
     /* used by check.js & saveAll.js */

/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.altKey

  CEP.evalScript("checkAndRepair()")

})


/*:::::::::::::::::::::::::::::::::::::::: fin */

