
/*:::::::::::::::::::::::::::::::::::::::: projectInfo.js */

//———————————————————————————————————————— transmit platform in CEP


//———————————————————————————————————————— request info from CEP

setInterval(function(){
  CEP.evalScript('getProjectInfo()', setURL)
}, INTMS)

//———————————————————————————————————————— use info from CEP (callback)

/*———————————————————————————————————————— setURL(arg)

    getProjectInfo() in CEP returns an array

    resArray.push('"syncPath":"' + getSyncPath() + '"')
    resArray.push( '"siteURL":"' +  getSiteURL() + '"')
    resArray.push('"lastPath":"' + getLastPath() + '"')

    return '{' + resArray.join(',') +'}'
    */

function setURL(arg){

  ISSVIJA = false

  if (arg == ''){
    elapse(32, 'setURL received empty string from getProjectInfo()')
    return true
  }
    
  elapse(36, 'processing projectInfo')

  var results = JSON.parse(arg)

  //—————————————————————————————————————— exit if missing info

  if (typeof results.syncPath == 'undefined'){
    elapse(42, "Script Error\nprojectInfo.js#50") 
    return true
  }

  if (typeof results.siteURL == 'undefined'){
    elapse(47, "Script Error\nprojectInfo.js#55") 
    return true
  }

  if (typeof results.lastPath == 'undefined'){
    elapse(52, "Script Error\nprojectInfo.js#60") 
    return true
  }

  if (results.syncPath  == '') return true


  ISSVIJA = true

  SYNCPATH = results.syncPath

  if (results.siteURL  != ''){
    SITEURL = results.siteURL 
    CEP.setWindowTitle(SITEURL)
  }

  if (results.lastPath != '')
    LASTPATH = results.lastPath

//elapse(71, `ISSVIJA: ${ISSVIJA}\nSYNCPATH: ${SYNCPATH}\nSITEURL: ${SITEURL}\nLASTPATH: ${LASTPATH}`)
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

