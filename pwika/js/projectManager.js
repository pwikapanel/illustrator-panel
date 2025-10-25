
/* vim: set foldmethod=marker fmr=/*\—,///: */

//:::::::::::::::::::::::::::::::::::::::: projectManager.jsx / projectManager.js

/*———————————————————————————————————————— initialization */

ISPAGE  = false // boolean    if frontmost doc is a pwika page (in a SYNC folder)
LASTPATH = ''    // string     last file path for a pwika page
SITEURL  = ''    // string     url of most recent pwika site
SYNCPATH = ''    // string     absolute path to SYNC folder
///
/*———————————————————————————————————————— recover localStorage */

if (typeof localStorage.LASTPATH != 'undefined')
  LASTPATH = localStorage.LASTPATH

if (typeof localStorage.SITEURL != 'undefined')
  SITEURL = localStorage.SITEURL

if (typeof localStorage.SYNCPATH != 'undefined')
  SYNCPATH = localStorage.SYNCPATH

VARTOCEP('LASTPATH', LASTPATH)
VARTOCEP('SITEURL' , SITEURL )
VARTOCEP('SYNCPATH', SYNCPATH)
///
/*———————————————————————————————————————— setInterval CEP.evalScript('projectManager()') */

var projectManagerInterval = setInterval(function(){
  CEP.evalScript('projectManager()', projectManagerCallback)
}, INTMS)
///
/*———————————————————————————————————————— projectManagerCallback(arg)

    jsx/projectManager.jsx:

    resArray.push( '"isPwika":"' +ISPAGE+'"' )
    resArray.push('"syncPath":"' +SYNCPATH+'"')
    resArray.push( '"siteURL":"' +SITEURL +'"')
    resArray.push('"lastPath":"' +LASTPATH+'"')  */

function projectManagerCallback(arg){

//elapse(46, `\n ISPAGE = ${ISPAGE}\n SITEURL = ${SITEURL}\nSYNCPATH = ${SYNCPATH}\nLASTPATH = ${LASTPATH}`)

  /*—————————————————————————————————————— set panel title */

if (typeof SITEURL != 'undefined')
  if (SITEURL != ''){
    var panelTitle = SITEURL
  
    if (panelTitle.length > 22)
      panelTitle=SITEURL.slice(0, 20)+'...'
  
    CEP.setWindowTitle(panelTitle)
  }
  else
    CEP.setWindowTitle('Pwika')
  ///
  /*—————————————————————————————————————— guard no file open */

  if (arg == '' || !arg.includes(':')){
    ISPAGE = false
    elapse(65, 'no file open (argument was empty or did not include a colon)')
    return true
  }
  ///
  /*—————————————————————————————————————— parse JSON */

  try{
    var results = JSON.parse(arg)
  } catch(e){
    elapse(74, `              projectManagerCallback received unparsable JSON:\n${arg}`) 
    elapse(75, `⚠️ projectManagerCallback received "${arg}"\n             stopping projectManager`)
    clearInterval(projectManagerInterval)
    return true
  }
  ///
  /*—————————————————————————————————————— guards */

  if (typeof results.isPwika == 'undefined'){
    elapse(38, "⚠️ projectManagerCallback did not receive isPwika") 
    return true
  }

  if (typeof results.syncPath == 'undefined'){
    elapse(43, "⚠️ projectManagerCallback did not receive syncPath") 
    return true
  }

  if (typeof results.siteURL == 'undefined'){
    elapse(48, "⚠️ projectManagerCallback did not receive siteURL") 
    return true
  }

  if (typeof results.lastPath == 'undefined'){
    elapse(53, "⚠️ projectManagerCallback did not receive lastPath") 
    return true
  }
  ///
  /*—————————————————————————————————————— not pwika site */

  if (results.isPwika == 'false'){
    ISPAGE = false
    elapse(106, 'ISPAGE = false')
    return
  }
  ///
  /*—————————————————————————————————————— is pwika site */

  SYNCPATH = results.syncPath
  localStorage.SYNCPATH = SYNCPATH
//elapse(109, `SYNCPATH=${SYNCPATH}`)

  SITEURL  = results.siteURL 
  localStorage.SITEURL = SITEURL
//elapse(113, `SITEURL=${SITEURL}`)

  if (SITEURL == '') siteUrlAlert()

  LASTPATH = results.lastPath
  localStorage.LASTPATH = LASTPATH
//elapse(117, `LASTPATH=${LASTPATH}`)
  ///

  ISPAGE = true

//elapse(129, `ISPAGE = true\n        SYNCPATH = ${SYNCPATH}\n         SITEURL = ${SITEURL}\n        LASTPATH = ${LASTPATH}`)

}
///
/*———————————————————————————————————————— siteUrlAlert() */

let urlWasWarned = false

function siteUrlAlert(){
  if (urlWasWarned) return  

  urlWasWarned = true
}
///

/*:::::::::::::::::::::::::::::::::::::::: fin */

