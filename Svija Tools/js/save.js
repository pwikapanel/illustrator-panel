
//:::::::::::::::::::::::::::::::::::::::: save.js / save.jsx

/*———————————————————————————————————————— parameters */

var objLabel = TRANSLATE.saveButton
var objID    = 'butt43'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {
  var alt   = evn.altKey

  // false = don't save all open files
  elapse(25, `calling savePages(false)`)
  CEP.evalScript('savePages(false)', saveCallback)
})

function saveCallback(arg){
  elapse(30, `saveCallback() received "${arg}"`)
  if (arg != '') paletteAlert(arg)
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

