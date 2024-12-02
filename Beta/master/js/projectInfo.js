
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

setInterval(function(){
  CEP.evalScript('getProjectInfo()', setURL)
}, INTMS)

/*———————————————————————————————————————— setURL(arg)

    */

var notAlertedPIJ = true

function setURL(arg){

  ISSVIJA = false
  if (arg == '') return true
    
  var results = JSON.parse(arg)

  if (typeof results.syncPath == 'undefined'){
    notALertedPIJ = false
    if (notALertedPIJ)
      lert("Script Error\nprojectInfo.js#50") 
    return true
  }

  if (typeof results.siteURL == 'undefined'){
    notALertedPIJ = false
    if (notALertedPIJ)
      lert("Script Error\nprojectInfo.js#55") 
    return true
  }

  if (typeof results.lastPath == 'undefined'){
    notALertedPIJ = false
    if (notALertedPIJ)
      lert("Script Error\nprojectInfo.js#60") 
    return true
  }

  if (results.syncPath  != ''){

    ISSVIJA = true
    SYNCPATH = results.syncPath

    if (results.siteURL  != ''){
      SITEURL = results.siteURL 
    }

    if (results.lastPath != ''){
      LASTPATH = results.lastPath
    }

  harmonize('js')

  if (typeof SITEURL != 'undefined')
    if (SITEURL != '') CEP.setWindowTitle(SITEURL)
  }
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

