
/*:::::::::::::::::::::::::::::::::::::::: launchSite.js */

/*———————————————————————————————————————— parameters */

var objID    = 'butt11'
var objLabel = translate('launch site')

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

  depends on having localStorage URL so not yet */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  url = 'https://' + SITEURL + '/'
  CEP.openURLInDefaultBrowser(url)
})

/*:::::::::::::::::::::::::::::::::::::::: fin */


