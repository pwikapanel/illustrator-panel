
/*:::::::::::::::::::::::::::::::::::::::: bottomBar.js */

/*:::::::::::::::::::::::::::::::::::::::: startup */ 

/*———————————————————————————————————————— more/less status on load

    need to restore user's status when they last used Tools */

if (typeof localStorage.less == 'undefined')
  localStorage.less = 'true'

if (localStorage.less == 'true'){
    moreOn.style.display  = 'none'
  moreLink.style.display = 'inline'
  lessLink.style.display = 'none'
}
else{
    moreOn.style.display = 'block'
  moreLink.style.display = 'none'
  lessLink.style.display = 'inline'
}

//else moreLink.style.display = 'inline'

/*———————————————————————————————————————— help */

var helpURL = 'tech.svija.love/fromtools'

/*———————————————————————————————————————— parameters 1 */

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


/*:::::::::::::::::::::::::::::::::::::::: more */

/*———————————————————————————————————————— parameters */

var objId    = 'moreLink'
var objLabel = 'more+'

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
    localStorage.less  = true
    moreOn.style.display   = 'block'
    moreLink.style.display = 'none'
    lessLink.style.display = 'inline'
    return true
  }
})


/*:::::::::::::::::::::::::::::::::::::::: less */

/*———————————————————————————————————————— parameters */

var objId    = 'lessLink'
var objLabel = 'less-'

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
    localStorage.less  = false
    moreOn.style.display   = 'none'
    moreLink.style.display = 'inline'
    lessLink.style.display = 'none'
    return true
  }
})

