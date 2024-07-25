
//:::::::::::::::::::::::::::::::::::::::: addListeners.js

var objId = 'button1l'

var obj = document.getElementById(objId)

if (obj === null) lert(objId + ' is null')

obj.value="open folder"

obj.addEventListener('click', savePage)

/*———————————————————————————————————————— savePage()

    copied directly from legacy, need to update */

function savePage(){

  var ISMAC     = 'true'
  var param     = 'save'
  var MYDOCS    = '/Users/Main/Documents'
  var utilities = PATH + '/jsx/Utilities.jsx'

  var file = PATH + '/jsx/Save.jsx'

  cep.evalScript("param  = '" + param  + "'")
  cep.evalScript("ISMAC  = '" + ISMAC  + "'")
  cep.evalScript("MYDOCS = '" + MYDOCS + "'")

  cep.evalScript("$.evalFile('" + utilities + "')")
  cep.evalScript("$.evalFile('" + file      + "')")
}

