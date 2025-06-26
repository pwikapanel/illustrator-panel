
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
var objLabel = TRANSLATE.more

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
var objLabel = TRANSLATE.less

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

/*:::::::::::::::::::::::::::::::::::::::: fin */

