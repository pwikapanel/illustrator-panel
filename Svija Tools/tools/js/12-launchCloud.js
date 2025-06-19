
/*:::::::::::::::::::::::::::::::::::::::: launchCloud.js */

/*———————————————————————————————————————— parameters */

var objID    = 'butt12'
var objLabel = 'svija cloud'

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

/*———————————————————————————————————————— fetchRemote(path, callback)

    https://github.com/Adobe-CEP/Getting-Started-guides/blob/master/Network%20requests%20and%20responses%20with%20Fetch/readme.md

    Note that fetch() is not the only way that CEP gives you to make network requests.

    Since Chromium Embedded Framework is essentially a browser, you can use
    an XMLHttpRequest (or a client-side library that wraps it, such as jQuery)
    You can also take advantage of Node.js within CEP, which gives you even
    more alternatives for making network requests.

    three params: ID, path, and callback function */

var cacheSuccess = 'Cache Cleared\nVisitors will see recent changes.'
var cacheFailure = 'Unable to Connect\nEmpty the cache from Svija Cloud.'

function cacheCallback(arg){

  switch(arg){
    case '1': lert(cacheSuccess); break    // success
    case '2': lert(cacheFailure); break    // empty file
    case '3': lert(cacheFailure); break    // 404 error (server found)
    case '4': lert(cacheFailure); break    // server not found
    default : lert(cacheFailure)           // server returned 200 but not 1
  }

}

function clearCache() {
  var path = 'https://' + SITEURL + '/csync'

  var pathRand = path + '?' + Math.random()

  fetch(pathRand)
    .then(function(res ){ if (res.ok){ return res.text() } })
    .then(function(text){
      if (typeof text != 'undefined'){
        if (text != '') cacheCallback(text); else { cacheCallback('2') }
      }
      else cacheCallback('3')
    })

  .catch(function(err){ cacheCallback('4') })
}


/*:::::::::::::::::::::::::::::::::::::::: fin */


