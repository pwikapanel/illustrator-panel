
/* vim: set foldmethod=marker fmr=/*\—,///: */

//:::::::::::::::::::::::::::::::::::::::: projectManager.jsx / projectManager.js

/*———————————————————————————————————————— recover localStorage
///
    get values from LS if possible*/

var LASTPATH = ''    // string     last file path for a svija page
var SITEURL  = ''     // string     url of most recent svija site
var SYNCPATH = ''    // string     absolute path to SYNC folder

if (typeof localStorage.lastPath != 'undefined')
  LASTPATH = localStorage.lastPath

if (typeof localStorage.siteUrl != 'undefined')
  SITEURL = localStorage.siteUrl

if (typeof localStorage.syncPath != 'undefined')
  SYNCPATH = localStorage.syncPath

varToCep('LASTPATH', LASTPATH)
varToCep('SITEURL' , SITEURL )
varToCep('SYNCPATH', SYNCPATH)

/*———————————————————————————————————————— request info from CEP */

setInterval(function(){
  CEP.evalScript('projectManager()', projectManagerCallback)
}, INTMS)
///
/*———————————————————————————————————————— projectManagerCallback(arg)

    jsx/projectManager.jsx:

    resArray.push( '"isSvija":"' +ISSVIJA+'"' )
    resArray.push('"syncPath":"' +SYNCPATH+'"')
    resArray.push( '"siteURL":"' +SITEURL +'"')
    resArray.push('"lastPath":"' +LASTPATH+'"')  */

function projectManagerCallback(arg){

  /*—————————————————————————————————————— set panel title */

if (typeof SITEURL != 'undefined')
  if (SITEURL != ''){
    var panelTitle = SITEURL
  
    if (panelTitle.length > 22)
      panelTitle=SITEURL.slice(0, 20)+'...'
  
//  elapse(52, `setting title to ${panelTitle}`)
    CEP.setWindowTitle(panelTitle)
  }
  ///
  /*—————————————————————————————————————— guard no file open */

  if (arg == '' || !arg.includes(':')){
    ISSVIJA = false
    elapse(29, `projectManagerCallback arg has no : in it`)
    return true
  }
  ///
  /*—————————————————————————————————————— parse JSON */

  try{
    var results = JSON.parse(arg)
  } catch(e){
    elapse(65, `              projectManagerCallback received unparsable JSON:\n${arg}`) 
    return true
  }
  ///
  /*—————————————————————————————————————— guards */

  if (typeof results.isSvija == 'undefined'){
    elapse(38, "projectManagerCallback did not receive isSvija") 
    return true
  }

  if (typeof results.syncPath == 'undefined'){
    elapse(43, "projectManagerCallback did not receive syncPath") 
    return true
  }

  if (typeof results.siteURL == 'undefined'){
    elapse(48, "projectManagerCallback did not receive siteURL") 
    return true
  }

  if (typeof results.lastPath == 'undefined'){
    elapse(53, "projectManagerCallback did not receive lastPath") 
    return true
  }
  ///
  /*—————————————————————————————————————— not svija site */

  if (results.isSvija == 'false'){
    ISSVIJA = false
    return
  }
  ///
  /*—————————————————————————————————————— is svija site */

  ISSVIJA = true

  SYNCPATH = results.syncPath
  localStorage.syncPath = SYNCPATH
  elapse(109, `SYNCPATH=${SYNCPATH}`)

  SITEURL  = results.siteURL 
  localStorage.siteUrl = SITEURL
  elapse(113, `SITEURL=${SITEURL}`)

  LASTPATH = results.lastPath
  localStorage.lastPath = LASTPATH
  elapse(117, `LASTPATH=${LASTPATH}`)
  ///


}
///

/*:::::::::::::::::::::::::::::::::::::::: fin */

