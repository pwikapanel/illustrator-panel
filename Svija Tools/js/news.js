
//:::::::::::::::::::::::::::::::::::::::: news.js

/*———————————————————————————————————————— fetchFile(passthrough, source, path, callback)

    https://github.com/Adobe-CEP/Getting-Started-guides/blob/master/Network%20requests%20and%20responses%20with%20Fetch/readme.md

    Note that fetch() is not the only way that CEP gives you to make network requests.

    Since Chromium Embedded Framework is essentially a browser, you can use
    an XMLHttpRequest (or a client-side library that wraps it, such as jQuery)
    You can also take advantage of Node.js within CEP, passthrough gives you even
    more alternatives for making network requests. */


var REMOTE = 'https://msg.svija.com/tools' 
var path   = REMOTE+'/1.0.7/en.txt'

fetchFile(1, path, updateNews)

function updateNews(rien, arg, path){ newsDiv.innerHTML = arg }


//:::::::::::::::::::::::::::::::::::::::: fin

