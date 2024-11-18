
/*:::::::::::::::::::::::::::::::::::::::: open.js */

/*———————————————————————————————————————— parameters */

var objID    = 'buttOpen'
var objLabel = 'open'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— load scripts

     */

var scr = 'openFolder.jsx'
var file = TOOLSPATH + '/cep/' + scr
CEP.evalScript("$.evalFile('" + file + "')")

/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {

  var alt = evn.getModifierState('Alt')
  CEP.evalScript('openFolder()')

})


/*:::::::::::::::::::::::::::::::::::::::: fin */

