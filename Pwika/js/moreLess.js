
/* vim: set foldmethod=marker fmr=/*\—,///: */

/*:::::::::::::::::::::::::::::::::::::::: moreLess.js */

// functions showMore() and showLess() are in panelManager

/*:::::::::::::::::::::::::::::::::::::::: more link */

/*———————————————————————————————————————— parameters */

var objId    = 'linkMore'
var objLabel = TRANSLATE.more
///
/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) LERT(objId + ' is null')

obj.text = objLabel
///
/*———————————————————————————————————————— mouseup function */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');
  if (!alt) showMore()
})
///

/*:::::::::::::::::::::::::::::::::::::::: less link */

/*———————————————————————————————————————— parameters */

var objId    = 'linkLess'
var objLabel = TRANSLATE.less
///
/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) LERT(objId + ' is null')

obj.text = objLabel
///
/*———————————————————————————————————————— mouseup function */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');
  if (!alt) showLess()
})
///

/*:::::::::::::::::::::::::::::::::::::::: fin */

