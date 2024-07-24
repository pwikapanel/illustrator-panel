/*———————————————————————————————————————— savePage()

    copied directly from legacy, need to update */

function savePage(){

  var isMac     = 'true'
  var param     = 'save'
  var myDocs    = '/Users/Main/Documents'
  var utilities = '/Library/Application Support/Adobe/CEP/extensions/New/scripts/utilities.jsx'
  var file      = '/Library/Application Support/Adobe/CEP/extensions/New/scripts/Save.jsx'

  cep.evalScript("param = '" + param + "'")
  cep.evalScript("isMac  = '" + isMac  + "'")
  cep.evalScript("myDocs = '" + myDocs + "'")

  cep.evalScript("$.evalFile('" + utilities + "')")
  cep.evalScript("$.evalFile('" + file      + "')")
}

