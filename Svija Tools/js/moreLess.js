
/*:::::::::::::::::::::::::::::::::::::::: moreLess.js */

/*———————————————————————————————————————— more/less status on load

    need to restore user's status when they last used Tools */

if (typeof localStorage.more == 'undefined') localStorage.more = 'false'

if (localStorage.more == 'true') showMore()
                            else showLess()


/*:::::::::::::::::::::::::::::::::::::::: more link */

/*———————————————————————————————————————— parameters */

var objId    = 'linkMore'
var objLabel = TRANSLATE.more

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel

//———————————————————————————————————————— mouseup function

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');
  if (!alt) showMore()
})


/*:::::::::::::::::::::::::::::::::::::::: less link */

/*———————————————————————————————————————— parameters */

var objId    = 'linkLess'
var objLabel = TRANSLATE.less

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel

//———————————————————————————————————————— mouseup function

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');
  if (!alt) showLess()
})


/*:::::::::::::::::::::::::::::::::::::::: more/less functions */

/*———————————————————————————————————————— showMore()

    also used in more.js */

function showMore(){
  localStorage.more      = 'true'
  moreDiv.style.display  = 'block'
  linkLess.style.display = 'inline'

  linkMore.style.display = 'none'

  setPanelSize('bottomBar')
}

/*———————————————————————————————————————— showLess()

    also used in more.js */

function showLess(){
  localStorage.more      = 'false'
  linkMore.style.display = 'inline'

  moreDiv.style.display  = 'none'
  linkLess.style.display = 'none'

  setPanelSize('bottomBar')
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

