
//:::::::::::::::::::::::::::::::::::::::: changeCase.js / changeCase.jsx

/*———————————————————————————————————————— parameters */

var objLabel = TRANSLATE.changeCaseButton
var objWidth = TRANSLATE.changeCaseButtonWidth
var objId    = 'butt22'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) LERT(objId + ' is null')

obj.value         = objLabel
obj.style.width   = objWidth + 'px'
obj.style.display = 'inline'

/*———————————————————————————————————————— mouseup function

    will be utilised for Verify, forms etc. */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.altKey

  if (alt) str = 'changeCase(true)'                                            
  else str = 'changeCase(false)'                                               

  CEP.evalScript(str)
})


/*:::::::::::::::::::::::::::::::::::::::: fin */

