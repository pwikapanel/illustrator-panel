
/*:::::::::::::::::::::::::::::::::::::::: help.js */

/*———————————————————————————————————————— parameters */

var helpURL  = 'tech.svija.com/fromtools'
var objId    = 'linkHelp'
var objLabel = translate('help')

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— mouseup function

    will be utilised for Verify, forms etc. */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  if (!alt){
    var url = 'https://' + helpURL
    CEP.openURLInDefaultBrowser(url)
    return true
  }
//  clearCache()
})

/*:::::::::::::::::::::::::::::::::::::::: fin */

