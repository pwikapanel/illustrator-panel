
/* vim: set foldmethod=marker fmr=/*\—,///: */

/*:::::::::::::::::::::::::::::::::::::::: saveAll.js */

/*———————————————————————————————————————— configure button */

var objLabel = TRANSLATE.saveAllButton
var objWidth = TRANSLATE.saveAllButtonWidth
var objID    = 'butt42'

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

  standbyBanner.innerHTML = TRANSLATE.saving
  standbyDiv.style.display='flex'

  // false = don't save all open files
  setTimeout(() => {
    elapse(25, `calling savePages(true)`)
    CEP.evalScript('savePages(true)', STANDBYCALLBACK)
  }, 200);
})
///

/*:::::::::::::::::::::::::::::::::::::::: fin */

