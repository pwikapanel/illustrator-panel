
/*:::::::::::::::::::::::::::::::::::::::: siteFiles.js */

/*———————————————————————————————————————— platform specific */

const pcOpener  = 'C:\\Windows\\explorer.exe'
const macOpener = '/usr/bin/open'

/*———————————————————————————————————————— parameters extra button */

var objID    = 'buttFiles2'
var objLabel = 'site files'

/*———————————————————————————————————————— configure extra  button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt')
  openLastFolder(alt)
})

/*———————————————————————————————————————— parameters */

var objID    = 'buttFiles'
var objLabel = 'site files'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt')
  openLastFolder(alt)
})

/*———————————————————————————————————————— main function

    */

function openLastFolder(alt){

  if (alt){
    lert('Unimplemented\nOpen Links folder')
    return true
  }

  if (ISMAC) var opener = macOpener
  else       var opener = pcOpener

  if (LASTPATH == ''){
    lert('Pas de projet Svija enregistré')
    return true
  }

  if (ISMAC)
    path = LASTPATH.substr(0, LASTPATH.lastIndexOf('/'))
  else
    path = LASTPATH.substr(0, LASTPATH.lastIndexOf('\\'))

  path = path.replace(/\\\\/g, "\\")

  window.cep.process.createProcess(opener, path)

}


/*:::::::::::::::::::::::::::::::::::::::: fin */

