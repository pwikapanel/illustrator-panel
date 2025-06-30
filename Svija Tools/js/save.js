
//:::::::::::::::::::::::::::::::::::::::: save.js / save.jsx

/*———————————————————————————————————————— parameters */

var objLabel = TRANSLATE.saveButton
var objWidth = TRANSLATE.saveButtonWidth
var objID    = 'butt43'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value         = objLabel
obj.style.width   = objWidth + 'px'
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {
  butt43.disabled = true
  var alt   = evn.altKey

  // false = don't save all open files
  elapse(25, `calling savePages(false)`)
  CEP.evalScript('savePages(false)', saveCallback)
})

var specialObjId = objID

function saveCallback(arg){
  elapse(30, `saveCallback() received "${arg}"`)
  if (arg != '') alertPalette(arg)
  setTimeout(enableInput.bind(null, 'butt43'), 1500)
//setTimeout(functions[name].bind(null, ...args), triggers.delay*1000)
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

