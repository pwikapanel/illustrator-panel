
/*:::::::::::::::::::::::::::::::::::::::: launchSite.js */

/*———————————————————————————————————————— parameters */

var objID    = 'buttSite'
var objLabel = 'launch site'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

  depends on having localStorage URL so not yet */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

//if(localStorage.url == ''){
//  lert('Fichier manquant\nMerci de créer\nsync/SVIJA/System/URL.txt\navec l\'url du site (sans https://)')
//  return true
//}

//url = 'https://' + localStorage.url

  url = "https://example.svija.site"
  if (alt) url += '/c'

  CEP.openURLInDefaultBrowser(url)
})


/*:::::::::::::::::::::::::::::::::::::::: interval function */

var ms   = 5000
var naam = 'getURL.jsx'
var file = TOOLSPATH + '/cep/' + naam

CEP.evalScript("$.evalFile('" + file + "')")

setInterval(function(){ CEP.evalScript('getURL()', ls_setURL) }, ms)

/*———————————————————————————————————————— ls_setURL(arg) */

function ls_setURL(arg){
//lert(arg+' received from function')
  if (arg != '') localStorage.url = arg
}

/*:::::::::::::::::::::::::::::::::::::::: fin */


