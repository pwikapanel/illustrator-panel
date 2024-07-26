
//:::::::::::::::::::::::::::::::::::::::: addListeners.js

var objId = 'button3l'

var obj = document.getElementById(objId)

if (obj === null) lert(objId + ' is null')

obj.value="create group"

obj.addEventListener('click', savePage)

/*———————————————————————————————————————— savePage()

    copied directly from legacy, need to update */

function savePage(){

  var ISMAC     = 'true'
  var param     = 'save'
  var MYDOCS    = '/Users/Main/Documents'
  var utilities = PATH + '/jsx/Utilities.jsx'

  var file = PATH + '/jsx/Save.jsx'

  CEP.evalScript("param  = '" + param  + "'")
  CEP.evalScript("ISMAC  = '" + ISMAC  + "'")
  CEP.evalScript("MYDOCS = '" + MYDOCS + "'")

  CEP.evalScript("$.evalFile('" + utilities + "')")
  CEP.evalScript("$.evalFile('" + file      + "')")
}

