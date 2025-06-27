
/*:::::::::::::::::::::::::::::::::::::::: openFolder.js

    used both in closed and open states */

/*:::::::::::::::::::::::::::::::::::::::: closed button */

//———————————————————————————————————————— parameters

var objLabel = TRANSLATE.closedOpenFolderButton
var objWidth = TRANSLATE.closedOpenFolderButtonWidth
var objID    = 'buttC1'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.width = objWidth + 'px'
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

    */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt')
  openLastFolder(alt)
})


/*:::::::::::::::::::::::::::::::::::::::: regular button */

/*———————————————————————————————————————— parameters */

var objLabel = TRANSLATE.openFolderButton
var objWidth = TRANSLATE.openFolderButtonWidth
var objID    = 'butt31'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value         = objLabel
obj.style.width   = objWidth + 'px'
obj.style.display = 'inline'

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt')
  openLastFolder(alt)
})


/*:::::::::::::::::::::::::::::::::::::::: main function */

//———————————————————————————————————————— openLastFolder(alt)

const pcOpener  = 'C:\\Windows\\explorer.exe'
const macOpener = '/usr/bin/open'

function openLastFolder(alt){

  if (ISMAC) var opener = macOpener
  else       var opener = pcOpener

  if (LASTPATH == ''){
    lert(TRANSLATE.noLastPath)
    return
  }

  if (ISMAC)
    path = LASTPATH.substr(0, LASTPATH.lastIndexOf('/'))
  else
    path = LASTPATH.substr(0, LASTPATH.lastIndexOf('\\'))

  path = path.replace(/\\\\/g, "\\")

  window.cep.process.createProcess(opener, path)

}


/*:::::::::::::::::::::::::::::::::::::::: fin */

