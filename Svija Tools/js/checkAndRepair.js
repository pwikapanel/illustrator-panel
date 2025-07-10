
/* vim: set foldmethod=marker fmr=/*\—,///: */

//:::::::::::::::::::::::::::::::::::::::: checkAndRepair.js / checkAndRepair.jsx

/*———————————————————————————————————————— parameters */

var objLabel = TRANSLATE.checkAndRepairButton
var objWidth = TRANSLATE.checkAndRepairButtonWidth
var objID    = 'butt41'
///
/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) LERT(objID + ' is null')

obj.value         = objLabel
obj.style.width   = objWidth + 'px'
obj.style.display = 'inline'
///
/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.altKey

  standbyDiv.innerHTML = 'Verifying.'
  standbyDiv.style.display='block'

  setTimeout(() => {
    CEP.evalScript("checkAndRepair()", checkAndRepairCallback);
  }, 200);

})
///

/*:::::::::::::::::::::::::::::::::::::::: fin */

function checkAndRepairCallback(){
  standbyDiv.style.display='none'
}

/*:::::::::::::::::::::::::::::::::::::::: fin */

