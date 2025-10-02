
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
  if (alt) openSVGfolder()
  else openFolder()
})
///
/*———————————————————————————————————————— configure regular button */

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
  if (alt) openSVGfolder()
  else openFolder()
})
///

/*:::::::::::::::::::::::::::::::::::::::: main function */

/*———————————————————————————————————————— openFolder()

    for PC, path should be correct string — no extra
    slashes except those necessary to define the string */

function openFolder(){

  let path

  if (LASTPATH == '') path = MYDOCS
  else if (ISMAC)     path = LASTPATH.substr(0, LASTPATH.lastIndexOf('/'))
  else                path = LASTPATH.substr(0, LASTPATH.lastIndexOf('\\'))

  let res = window.cep.process.createProcess(OPENER, path)

  elapse(75, `openFolder returned: ${res}`)
}
///
/*———————————————————————————————————————— openSVGfolder() */

function openSVGfolder(alt){

  if (SYNCPATH == ''){
    LERT(TRANSLATE.noProject)
    return
  }

  var path = SYNCPATH + '/SVIJA/SVG Files'
  let res = window.cep.process.createProcess(OPENER, path)

  elapse(90, `openSVGfolder returned: ${res}`)
}
///

/*:::::::::::::::::::::::::::::::::::::::: fin */



