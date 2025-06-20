
/*:::::::::::::::::::::::::::::::::::::::: projectInfo.js */

//———————————————————————————————————————— determine platform

ISMAC = CEP.getOSInformation().substring(0,3) == 'Mac'

ut_transmitToCEP('ISMAC', ISMAC)

elapse(10, `        ISMAC is ` + ISMAC)

/*———————————————————————————————————————— get info */

setInterval(function(){
  CEP.evalScript('getProjectInfo()', setURL)
}, INTMS)

/*———————————————————————————————————————— setURL(arg)

    */

var notAlertedPIJ = true

function setURL(arg){

  // return function from CEP.evalScript('getProjectInfo()', setURL)
  return true

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

//elapse('85———————————————————————————————————— projectInfo interrupt ')

  sh_harmonize('js')

  if (typeof SITEURL != 'undefined')
    if (SITEURL != '') CEP.setWindowTitle(SITEURL)
  }
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

