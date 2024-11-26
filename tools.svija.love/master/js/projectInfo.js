
/*:::::::::::::::::::::::::::::::::::::::: projectInfo.js */

/*———————————————————————————————————————— notes

    need
    - url to launch site
    - sync folder to open it
    - most recent file path to reopen it */



//      var ms   = 5000
//      var naam = 'projectInfo.jsx'
//      var file = TOOLSPATH + '/cep/' + naam
//      
//      CEP.evalScript("$.evalFile('" + file + "')")
//      
//      //setInterval(function(){ CEP.evalScript('getURL()', setURL) }, ms)
//      z = function(){ CEP.evalScript('getURL()', setURL) }

/*———————————————————————————————————————— setup */

var naam      = 'projectInfo.jsx'
var ISMAC     = 'true'
var MYDOCS    = '/Users/Main/Documents'

var file = TOOLSPATH + '/master/cep/' + naam

CEP.evalScript("$.evalFile('" + file + "')")

/*———————————————————————————————————————— get info */

var ms = 500

setInterval(function(){
  CEP.evalScript('getProjectInfo()', setURL)
}, ms)

/*———————————————————————————————————————— setURL(arg)

    */

function setURL(arg){

  ISSVIJA = false
  if (arg == '') return true
    
  var results = JSON.parse(arg)

  if (results.syncPath  != ''){

    ISSVIJA = true
    SYNCPATH = results.syncPath

    if (results.siteURL  != ''){
      SITEURL  = results.siteURL 
    }

    if (results.lastPath != ''){
      LASTPATH = results.lastPath
    }

  harmonize('js')

    // 🫧 ☁️  ⚙️  🍄 🌕 ✨ 🎛️ 🔋  
    if (SITEURL != '') CEP.setWindowTitle(SITEURL)
  }
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

