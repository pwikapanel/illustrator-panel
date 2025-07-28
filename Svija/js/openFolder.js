
/* vim: set foldmethod=marker fmr=/*\—,///: */

/*:::::::::::::::::::::::::::::::::::::::: openFolder.js

    two buttons: closed and open states */

/*———————————————————————————————————————— closed button */


//———————————————————————————————————————— parameters

var objLabel = TRANSLATE.closedOpenFolderButton
var objWidth = TRANSLATE.closedOpenFolderButtonWidth
var objID    = 'buttC1'

//———————————————————————————————————————— configure button

var obj = document.getElementById(objID)
if (obj === null) LERT(objID + ' is null')

obj.value = objLabel
obj.style.width = objWidth + 'px'
obj.style.display = 'inline'

//———————————————————————————————————————— listener function

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt')
  if (alt) openProjectFolder()
  else openFolder()
})
///
/*———————————————————————————————————————— regular button */

var objLabel = TRANSLATE.openFolderButton
var objWidth = TRANSLATE.openFolderButtonWidth
var objID    = 'butt31'

//———————————————————————————————————————— configure button

var obj = document.getElementById(objID)
if (obj === null) LERT(objID + ' is null')

obj.value         = objLabel
obj.style.width   = objWidth + 'px'
obj.style.display = 'inline'

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt')
  if (alt) openProjectFolder()
  else openFolder()
})
///

/*:::::::::::::::::::::::::::::::::::::::: main function */

/*———————————————————————————————————————— openFolder(alt) */

function openFolder(){

  let path

  if (LASTPATH == '')
    path = MYDOCS

  else if (ISMAC)
    path = LASTPATH.substr(0, LASTPATH.lastIndexOf('/'))

  else
    path = LASTPATH.substr(0, LASTPATH.lastIndexOf('\\'))

  path = path.replace(/\\\\/g, "\\")

  window.cep.process.createProcess(OPENER, path)

}
///
/*———————————————————————————————————————— openProjectFolder(alt) */

function openProjectFolder(alt){

  if (ISMAC) var OPENER = MACOPEN
  else       var OPENER = PCOPEN

  if (SYNCPATH == ''){
    LERT(TRANSLATE.noProject)
    return
  }

  var path = SYNCPATH.slice(0,-5)
  path     = path.replace(/\\\\/g, "\\")

  window.cep.process.createProcess(OPENER, path)

}
///

/*:::::::::::::::::::::::::::::::::::::::: fin */



