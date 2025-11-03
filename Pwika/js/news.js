
//:::::::::::::::::::::::::::::::::::::::: news.js

/*———————————————————————————————————————— GETREMOTEFILE(passthrough, source, path, callback)

    https://github.com/Adobe-CEP/Getting-Started-guides/blob/master/Network%20requests%20and%20responses%20with%20Fetch/readme.md

    Note that fetch() is not the only way that CEP gives you to make network requests.

    Since Chromium Embedded Framework is essentially a browser, you can use
    an XMLHttpRequest (or a client-side library that wraps it, such as jQuery)
    You can also take advantage of Node.js within CEP, passthrough gives you even
    more alternatives for making network requests. */

var host = 'https://msg.pwika.com/panel' 
var path = `${host}/${VERSION}/${LC}.html`

GETREMOTEFILE(1, path, updateNews)

function updateNews(rien, arg, path){
  elapse(21, `Got result from ${path}\n${arg}`)
  newsDiv.innerHTML = arg

}


//:::::::::::::::::::::::::::::::::::::::: fin

