
/*:::::::::::::::::::::::::::::::::::::::: moreLess.js */

/*———————————————————————————————————————— more/less status on load

    need to restore user's status when they last used Tools */

if (typeof localStorage.moreLess == 'undefined')
  localStorage.moreLess = 'less'

if (localStorage.moreLess == 'less') showLess()
else showMore()


/*:::::::::::::::::::::::::::::::::::::::: more link */

/*———————————————————————————————————————— parameters */

var objId    = 'linkMore'
var objLabel = translate('more')

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel

/*———————————————————————————————————————— mouseup function

 */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  if (!alt){
    showMore()
    return true
  }
})


/*:::::::::::::::::::::::::::::::::::::::: less link */

/*———————————————————————————————————————— parameters */

var objId    = 'linkLess'
var objLabel = translate('less')

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel

/*———————————————————————————————————————— mouseup function

                                            */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  if (!alt){
    showLess()
    return true
  }
})


/*:::::::::::::::::::::::::::::::::::::::: functions */

function showMore(){
   moreDiv.style.display   = 'block'

  localStorage.moreLess    = 'more'

  linkMore.style.display   = 'none'
  linkLess.style.display   = 'inline'

  setPanelSize('bottomBar')
}

function showLess(){
   moreDiv.style.display = 'none'

  localStorage.moreLess  = 'less'

  linkMore.style.display = 'inline'
  linkLess.style.display = 'none'

  setPanelSize('bottomBar')
}

/*:::::::::::::::::::::::::::::::::::::::: fin */

