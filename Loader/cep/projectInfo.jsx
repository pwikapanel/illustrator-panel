#target illustrator  

/*:::::::::::::::::::::::::::::::::::::::: projectInfo.jsx */

/*———————————————————————————————————————— notes

    need
    - url to launch site
    - sync folder to open it
    - most recent file path to reopen it */

 /*———————————————————————————————————————————————————————

  using the frontmost document's location, returns
  the url of the website, stored in

  sync/SVIJA/System/URL.txt */

function getURL(){

  if (app.documents.length == 0) return 'No Open Pages'

  if (!isSvija()) return 'Not a Sveeeeja'

//var destPath  = String(app.activeDocument.path.fsName);   // current folder

  return syncPath()

}

/*:::::::::::::::::::::::::::::::::::::::: utilities */

function isSvija(){ //————————————————————————————————————————————————————————

  if (app.documents.length < 1) return false

  var currPath = String(app.activeDocument.path)

  if (currPath.indexOf('SYNC') > 0) return true
  else return false
}

function syncPath(){ //———————————————————————————————————————————————————————

// file.fsName replaces ~ with /Users/Main/


  var destPath = app.activeDocument.path.fsName

  var i = destPath.indexOf('SYNC')
  destPath = destPath.substr(0, i) + 'SYNC'

  return destPath
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

