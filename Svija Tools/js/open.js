
//:::::::::::::::::::::::::::::::::::::::: open.js / open.jsx

//———————————————————————————————————————— parameters

var objLabel = TRANSLATE.open
var objID    = 'buttC3'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {

  var alt = evn.altKey
  CEP.evalScript('openFile()')

})


/*:::::::::::::::::::::::::::::::::::::::: fin */

