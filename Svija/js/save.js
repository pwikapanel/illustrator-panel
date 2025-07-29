
/* vim: set foldmethod=marker fmr=/*\—,///: */

//:::::::::::::::::::::::::::::::::::::::: save.js / save.jsx

/*———————————————————————————————————————— configure button */

var objLabel = TRANSLATE.saveButton
var objWidth = TRANSLATE.saveButtonWidth
var objID    = 'butt43'

var obj = document.getElementById(objID)
if (obj === null) LERT(objID + ' is null')

obj.value         = objLabel
obj.style.width   = objWidth + 'px'
obj.style.display = 'inline'
///
/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {
  var alt   = evn.altKey
  if (alt){
    openSvgFolder()
    return
  }

  standbyBanner.innerHTML = TRANSLATE.saving
  standbyDiv.style.display='flex'

  // false = don't save all open files
  setTimeout(() => {
    elapse(25, `calling savePages(false)`)
    CEP.evalScript('savePages(false)', STANDBYCALLBACK)
  }, 200);
})
///

/*:::::::::::::::::::::::::::::::::::::::: save all */

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

/*:::::::::::::::::::::::::::::::::::::::: functions */

/*———————————————————————————————————————— openSvgFolder() */

function openSvgFolder(alt){
  if (SYNCPATH == '') return

  let path
  if (ISMAC) path = '/SVIJA/SVG Files'
  else       path = '\\SVIJA\\SVG Files'

  path = SYNCPATH + path
  let res = window.cep.process.createProcess(OPENER, path)

  elapse(89, `openSvgFolder returned: ${res}`)
}
///

/*:::::::::::::::::::::::::::::::::::::::: fin */

