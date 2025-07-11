
/* vim: set foldmethod=marker fmr=/*\—,///: */

//:::::::::::::::::::::::::::::::::::::::: checkAndRepair.js / checkAndRepair.jsx

/*———————————————————————————————————————— configure button */

var objLabel = TRANSLATE.checkAndRepairButton
var objWidth = TRANSLATE.checkAndRepairButtonWidth
var objID    = 'butt41'

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

  standbyBanner.innerHTML = TRANSLATE.verifying
  standbyDiv.style.display='flex'

  setTimeout(() => {
    elapse(25, `calling checkAndRepair()`)
    CEP.evalScript("checkAndRepair()", STANDBYCALLBACK);
  }, 200);

})
///

/*:::::::::::::::::::::::::::::::::::::::: fin */

