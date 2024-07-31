
/*:::::::::::::::::::::::::::::::::::::::: showDialog.js */

/*———————————————————————————————————————— parameters */

var objId    = 'buttDialog'
var objLabel = 'open panel'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— mouseup function

    will be utilised for Verify, forms etc. */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  var file = TOOLSPATH + '/cep/popup.jsx'
  CEP.evalScript("$.evalFile('" + file + "')")
})

/*———————————————————————————————————————— load scripts

    user clicks logo to change color */

var scr = 'mouseOver.jsx'
var file = TOOLSPATH + '/cep/' + scr
CEP.evalScript("$.evalFile('" + file + "')")

/*———————————————————————————————————————— mouse over function

    will be utilised for Verify, forms etc. */

obj.addEventListener('mouseover', (evn) => {
  var alt = evn.getModifierState('Alt');
  CEP.evalScript('popperUp()')
  setTimeout(closeWin, 1000)
})

function closeWin(){
  CEP.evalScript('winObj.close()')
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

