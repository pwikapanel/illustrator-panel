
/*:::::::::::::::::::::::::::::::::::::::: moreLess.js */

/*———————————————————————————————————————— more/less status on load

    need to restore user's status when they last used Tools */


if (typeof localStorage.moreLess == 'undefined')
  localStorage.moreLess = 'less'

if (localStorage.moreLess == 'less'){
  moreSwitch.style.display = 'none'

    linkMore.style.display = 'inline'
    linkLess.style.display = 'none'
}
else{
  moreSwitch.style.display = 'block'

    linkMore.style.display = 'none'
    linkLess.style.display = 'inline'
}


/*:::::::::::::::::::::::::::::::::::::::: more link */

/*———————————————————————————————————————— parameters */

var objId    = 'linkMore'
var objLabel = '＋ more'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel

/*———————————————————————————————————————— mouseup function

 */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  if (!alt){
    localStorage.moreLess    = 'more'
    moreSwitch.style.display = 'block'
    linkMore.style.display   = 'none'
    linkLess.style.display   = 'inline'
    return true
  }
})


/*:::::::::::::::::::::::::::::::::::::::: less link */

/*———————————————————————————————————————— parameters */

var objId    = 'linkLess'
var objLabel = '— less'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel

/*———————————————————————————————————————— mouseup function

                                            */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  if (!alt){
    localStorage.moreLess  = 'less'
    moreSwitch.style.display   = 'none'
    linkMore.style.display = 'inline'
    linkLess.style.display = 'none'
    return true
  }
})


/*:::::::::::::::::::::::::::::::::::::::: fin */

