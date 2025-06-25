
/*:::::::::::::::::::::::::::::::::::::::: projectInfo.js */

//———————————————————————————————————————— request info from CEP

setInterval(function(){
  CEP.evalScript('projectInfo()', projectInfoCallback)
}, INTMS)

/*———————————————————————————————————————— setURL(arg)

    jsx/projectInfo.jsx:

    resArray.push( '"isSvija":"' +ISSVIJA+'"' )
    resArray.push('"syncPath":"' +SYNCPATH+'"')
    resArray.push( '"siteURL":"' +SITEURL +'"')
    resArray.push('"lastPath":"' +LASTPATH+'"')  */

function projectInfoCallback(arg){

  //—————————————————————————————————————— guard

  if (arg == '' || !arg.includes(':')){
    elapse(29, `projectInfoCallback arg has no : in it`)
    return true
  }
    
  //—————————————————————————————————————— parse JSON

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


  //—————————————————————————————————————— not svija site

  if (results.isSvija == 'false'){
    ISSVIJA = false
    return
  }

  //—————————————————————————————————————— is svija site

  ISSVIJA = true

  SYNCPATH = results.syncPath
  SITEURL = results.siteURL 
  LASTPATH = results.lastPath

  CEP.setWindowTitle(SITEURL)


}


/*:::::::::::::::::::::::::::::::::::::::: fin */

