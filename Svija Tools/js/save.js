
/*:::::::::::::::::::::::::::::::::::::::: save.js */

/*———————————————————————————————————————— parameters */

var objLabel = 'save'
var objID    = 'butt43'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.altKey

  var param     = 'save'
  elapse(25, 'calling savePages()')
  CEP.evalScript('savePages("' + param + '")', 'saveCallback')


})

function saveCallback(art){
  elapse(32, 'in saveCallback')
//showAlert(arg)
}

/*:::::::::::::::::::::::::::::::::::::::: fin */

