
/*:::::::::::::::::::::::::::::::::::::::: projectInfo.js */

/*———————————————————————————————————————— notes

    need
    - url to launch site
    - sync folder to open it
    - most recent file path to reopen it */



//      var ms   = 5000
//      var naam = 'projectInfo.jsx'
//      var file = PATH + '/cep/' + naam
//      
//      CEP.evalScript("$.evalFile('" + file + "')")
//      
//      //setInterval(function(){ CEP.evalScript('getURL()', setURL) }, ms)
//      z = function(){ CEP.evalScript('getURL()', setURL) }

/*———————————————————————————————————————— setup */

var naam      = 'projectInfo.jsx'
var ISMAC     = 'true'
var MYDOCS    = '/Users/Main/Documents'

var file = PATH + '/cep/' + naam

CEP.evalScript("$.evalFile('" + file + "')")

/*———————————————————————————————————————— get info */

function projectInfo(){
  CEP.evalScript('getProjectInfo()', setURL)
}

projectInfo()

/*———————————————————————————————————————— setURL(arg)

    */

function setURL(arg){

  var results = JSON.parse(arg)
  lert('got:\nurl: '+results.url+'\n\n\nsyncFolder: '+results.syncFolder+'\n\n\nrecent: '+results.recent)
  return true

//if (arg != '') localStorage.url = arg
  if (arg != '') lert('set uRL to '+arg)
}

/*:::::::::::::::::::::::::::::::::::::::: fin */

