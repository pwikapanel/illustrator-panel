
/*:::::::::::::::::::::::::::::::::::::::: launchCloud.js */

/*———————————————————————————————————————— parameters */

var objLabel = TRANSLATE.launchCloudButton
var objID    = 'butt12'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objID)
if (obj === null) lert(objID + ' is null')

obj.value = objLabel
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

var cacheSuccess = 'Cache Cleared\nVisitors will see recent changes.'
var cacheFailure = 'Unable to Connect\nEmpty the cache from Svija Cloud.'

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
    case '1': lert(cacheSuccess); break    // success
    case '2': lert(cacheFailure); break    // empty file
    case '3': lert(cacheFailure); break    // 404 error (server found)
    case '4': lert(cacheFailure); break    // server not found
    default : lert(cacheFailure)           // server returned 200 but not 1
  }

}


/*:::::::::::::::::::::::::::::::::::::::: fin */


