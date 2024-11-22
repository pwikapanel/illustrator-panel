
/*:::::::::::::::::::::::::::::::::::::::: saveAll.js */

/*———————————————————————————————————————— parameters */

var objLabel = 'save all'
var objID    = 'buttAll'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.altKey

  var param     = 'all'
  CEP.evalScript('savePages("' + param + '")')

})


/*:::::::::::::::::::::::::::::::::::::::: fin */

