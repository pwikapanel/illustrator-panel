
/*:::::::::::::::::::::::::::::::::::::::: launchCloud.js */

/*———————————————————————————————————————— parameters */

var objID    = 'buttCloud'
var objLabel = 'svija cloud'

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
  url += '/cloud/'

  CEP.openURLInDefaultBrowser(url)
})


/*:::::::::::::::::::::::::::::::::::::::: interval function */

var ms   = 5000
var naam = 'getURL.jsx'
var file = TOOLSPATH + '/cep/' + naam

CEP.evalScript("$.evalFile('" + file + "')")

setInterval(function(){ CEP.evalScript('getURL()', lc_setURL) }, ms)

/*———————————————————————————————————————— lc_setURL(arg) */

function lc_setURL(arg){
//lert(arg+' received from function')
  if (arg != '') localStorage.url = arg
}

/*:::::::::::::::::::::::::::::::::::::::: fin */


