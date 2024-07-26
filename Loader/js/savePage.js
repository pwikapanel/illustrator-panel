
//:::::::::::::::::::::::::::::::::::::::: addListeners.js

var objId = 'button4r'


var obj = document.getElementById(objId)

if (obj === null) lert(objId + ' is null')

obj.value="save"

obj.addEventListener('click', savePage)

/*———————————————————————————————————————— savePage()

    copied directly from legacy, need to update */

function savePage(){

  var naam      = 'Save.jsx'
  var ISMAC     = 'true'
  var param     = 'save'
  var MYDOCS    = '/Users/Main/Documents'
  var utilities = PATH + '/jsx/Utilities.jsx'

  var file = PATH + '/jsx/' + naam

  CEP.evalScript("param  = '" + param  + "'")
  CEP.evalScript("ISMAC  = '" + ISMAC  + "'")
  CEP.evalScript("MYDOCS = '" + MYDOCS + "'")

  CEP.evalScript("$.evalFile('" + utilities + "')")
  CEP.evalScript("$.evalFile('" + file      + "')")
}

