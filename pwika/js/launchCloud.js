
/*:::::::::::::::::::::::::::::::::::::::: launchCloud.js */

/*———————————————————————————————————————— parameters */

var objLabel = TRANSLATE.launchCloudButton
var objWidth = TRANSLATE.launchCloudButtonWidth
var objID    = 'butt12'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) LERT(objID + ' is null')

obj.value = objLabel
obj.style.width = objWidth + 'px'
obj.style.display = 'inline'

/*———————————————————————————————————————— listener function

  depends on having localStorage URL so not yet */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  if (!alt){
    var url = 'https://' + SITEURL + '/cloud/'
    CEP.openURLInDefaultBrowser(url)
    return true
  }

  clearCache()

})


//:::::::::::::::::::::::::::::::::::::::: cache clearing function

var cacheSuccess = TRANSLATE.cacheSuccess
var cacheFailure = TRANSLATE.cacheFailure

//———————————————————————————————————————— fetchRemote(path, callback)

function clearCache() {
  var path = 'https://' + SITEURL + '/csync'

  var pathRand = path + '?' + Math.random()

  fetch(pathRand)
    .then(function(res ){ if (res.ok){ return res.text() } })
    .then(function(text){
      if (typeof text != 'undefined'){
        if (text != '') clearCacheCallback(text); else { clearCacheCallback('2') }
      }
      else clearCacheCallback('3')
    })

  .catch(function(err){ clearCacheCallback('4') })
}

//———————————————————————————————————————— clearCacheCallback(arg)

function clearCacheCallback(arg){

  switch(arg){
    case '1': LERT(cacheSuccess); break    // success
    case '2': LERT(cacheFailure); break    // empty file
    case '3': LERT(cacheFailure); break    // 404 error (server found)
    case '4': LERT(cacheFailure); break    // server not found
    default : LERT(cacheFailure)           // server returned 200 but not 1
  }

}


/*:::::::::::::::::::::::::::::::::::::::: fin */


