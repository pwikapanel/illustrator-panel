
/*:::::::::::::::::::::::::::::::::::::::: projectInfo.js */

//———————————————————————————————————————— transmit platform in CEP


//———————————————————————————————————————— request info from CEP

setInterval(function(){
  CEP.evalScript('projectInfo()', projectInfoCallback)
}, INTMS)

//———————————————————————————————————————— use info from CEP (callback)

/*———————————————————————————————————————— setURL(arg)

    projectInfo() in CEP returns an array

    resArray.push('"syncPath":"' + getSyncPath() + '"')
    resArray.push( '"siteURL":"' +  getSiteURL() + '"')
    resArray.push('"lastPath":"' + getLastPath() + '"')

    return '{' + resArray.join(',') +'}'
    */

function projectInfoCallback(arg){

  if (arg == '' || !arg.includes(':')){
    elapse(29, `projectInfoCallback arg has no : in it`)
    return true
  }
    
  elapse(33, `projectInfoCallback received JSON`)
  var results = JSON.parse(arg)

  //—————————————————————————————————————— guards

  if (typeof results.isSvija == 'undefined'){
    elapse(38, "projectInfoCallback did not receive isSvija") 
    return true
  }

  if (typeof results.syncPath == 'undefined'){
    elapse(43, "projectInfoCallback did not receive syncPath") 
    return true
  }

  if (typeof results.siteURL == 'undefined'){
    elapse(48, "projectInfoCallback did not receive siteURL") 
    return true
  }

  if (typeof results.lastPath == 'undefined'){
    elapse(53, "projectInfoCallback did not receive lastPath") 
    return true
  }



  if (results.isSvija == 'false'){
    return true




///////////////////////////////// START HERE




  }


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

