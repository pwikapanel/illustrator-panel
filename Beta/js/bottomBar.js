
/*:::::::::::::::::::::::::::::::::::::::: bottomBar.js */

/*———————————————————————————————————————— params */

var helpURL = 'tech.svija.love/fromtools'

/*:::::::::::::::::::::::::::::::::::::::: startup */ 

/*———————————————————————————————————————— more/less status on load

    need to restore user's status when they last used Tools */


if (typeof localStorage.moreLess == 'undefined')
  localStorage.moreLess = 'less'

if (localStorage.moreLess == 'less'){
  moreSwitch.style.display = 'none'

    moreLink.style.display = 'inline'
    lessLink.style.display = 'none'
}
else{
  moreSwitch.style.display = 'block'

    moreLink.style.display = 'none'
    lessLink.style.display = 'inline'
}


/*:::::::::::::::::::::::::::::::::::::::: help */

/*———————————————————————————————————————— parameters */

var objId    = 'helpLink'
var objLabel = 'help'

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


/*:::::::::::::::::::::::::::::::::::::::: channel */

/*———————————————————————————————————————— parameters */

var objId    = 'channelLink'
var objLabel = '   ⚙'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— mouseup function

    will be utilised for Verify, forms etc. */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  var file = TOOLSPATH + '/cep/channel.jsx'
  CEP.evalScript("$.evalFile('" + file + "')")
})


/*:::::::::::::::::::::::::::::::::::::::: more */

/*———————————————————————————————————————— parameters */

var objId    = 'moreLink'
var objLabel = '＋ more'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel
//obj.style.display = 'inline' // handled in previous section

/*———————————————————————————————————————— mouseup function

 */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  if (!alt){
    localStorage.moreLess    = 'more'
    moreSwitch.style.display = 'block'
    moreLink.style.display   = 'none'
    lessLink.style.display   = 'inline'
    return true
  }
})


/*:::::::::::::::::::::::::::::::::::::::: less */

/*———————————————————————————————————————— parameters */

var objId    = 'lessLink'
var objLabel = '— less'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel
//obj.style.display = 'inline' // handled in previous section

/*———————————————————————————————————————— mouseup function

    will be utilised for Verify, forms etc. */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  if (!alt){
    localStorage.moreLess  = 'less'
    moreSwitch.style.display   = 'none'
    moreLink.style.display = 'inline'
    lessLink.style.display = 'none'
    return true
  }
})


/*:::::::::::::::::::::::::::::::::::::::: fin */

