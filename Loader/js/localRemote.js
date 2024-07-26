
//:::::::::::::::::::::::::::::::::::::::: localRemote.js

var objId = 'link1r'

var obj = document.getElementById(objId)

if (obj === null) lert(objId + ' is null')

obj.text="l/r"

obj.addEventListener('click', localRemote)

/*———————————————————————————————————————— localRemote()

    copied directly from legacy, need to update */

function localRemote(){

  if (LOCAL == true) LOCAL = false
  else LOCAL = true

  // load initial scripts

  var scriptID =  'master'
  var path     =  'json/' + scriptID + '.json'                                              

  if (LOCAL == true) fetchLocal (scriptID, path, parseScriptList)
                else fetchRemote(scriptID, path, parseScriptList)

}

// <a id="link1l" href="javascript:      fetchLink()"></a> • 

