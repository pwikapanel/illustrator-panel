
/*:::::::::::::::::::::::::::::::::::::::: saveAll.js */

/*———————————————————————————————————————— parameters */

var objLabel = TRANSLATE.saveAllButton
var objWidth = TRANSLATE.saveAllButtonWidth
var objID    = 'butt42'

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

  // true = save all open pages
  elapse(25, `calling savePages(true)`)
  CEP.evalScript('savePages(true)', saveCallback)

})

function saveCallback(arg){
  elapse(30, `saveCallback() received "${arg}"`)
  if (arg != '') alertPalette(arg)
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

