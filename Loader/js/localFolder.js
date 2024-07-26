
/*:::::::::::::::::::::::::::::::::::::::: localFolder.js */

/*———————————————————————————————————————— parameters */

var objID    = 'buttFolder'
var objLabel = 'open folder'

const pcOpener  = 'C:\\Windows\\explorer.exe'
const macOpener = '/usr/bin/open'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

  opens folder based on localStorage lastPath */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  if (ISMAC) var opener = macOpener
  else       var opener = pcOpener

//  var path  = localStorage.lastPath
  path = MYDOCS

  if (path == ''){
    lert('Pas de projet Svija enregistré')
    return true
  }

  if (ISMAC)
    path = path.substr(0, path.lastIndexOf('/'))
  else
    path = path.substr(0, path.lastIndexOf('\\'))

  path = path.replace(/\\\\/g, "\\")
  window.cep.process.createProcess(opener, path)

  //lert(path)
  // C:/Users/andy/Desktop/pixside.fr/sync/Example Pages/sync

//path = "C:\\Users\\andy\\Desktop\\pixside.fr\\sync" // worked
//path = "C:\\Users\\andy\\Desktop\\pixside.fr\\sync\\Example Pages" // worked

})


/*:::::::::::::::::::::::::::::::::::::::: fin */

