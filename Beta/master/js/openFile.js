
/*:::::::::::::::::::::::::::::::::::::::: openFile.js */

/*———————————————————————————————————————— parameters */

var objID    = 'buttD3'
var objLabel = 'open'

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

