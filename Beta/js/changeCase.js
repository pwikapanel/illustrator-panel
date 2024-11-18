
/*:::::::::::::::::::::::::::::::::::::::: changeCase.js */

/*———————————————————————————————————————— parameters */

var objId    = 'buttCase'
var objLabel = 'change case'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— load scripts

     */

var scr = 'changeCase.jsx'
var file = TOOLSPATH + '/cep/' + scr
CEP.evalScript("$.evalFile('" + file + "')")

/*———————————————————————————————————————— mouseup function

    will be utilised for Verify, forms etc. */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  if (alt) str = 'changeCase(true)'                                            
  else str = 'changeCase(false)'                                               

  CEP.evalScript(str)
})

