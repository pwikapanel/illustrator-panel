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

function getProjectInfo(){

  if (app.documents.length == 0) return 'No Open Pages'

  if (!isSvija()) return 'Not a Sveeeeja'

//var destPath  = String(app.activeDocument.path.fsName);   // current folder

  var rcnt = docPath()
//alert(rcnt)

  var        url = '       "url":"' + 'getURL()' + '"'
  var syncFolder = '"syncFolder":"' + syncPath() + '"'
  var    recont  = '    "recent":"' + rcnt       + '"'


  var res = '{' + url + ',' + syncFolder + ', '+recont+'}'

  return res

}

/*:::::::::::::::::::::::::::::::::::::::: utilities */

function isSvija(){ //————————————————————————————————————————————————————————

  if (app.documents.length < 1) return false

  var currPath = String(app.activeDocument.path)

  if (currPath.indexOf('SYNC') > 0) return true
  else return false
}

/*———————————————————————————————————————— syncPath()
    */

function syncPath(){

  var destPath = app.activeDocument.path.fsName
  var i = destPath.indexOf('SYNC')
  if (i < 0) return ''

  destPath = destPath.substr(0, i) + 'SYNC'
  return destPath
}

/*———————————————————————————————————————— recent()

    */

function docPath(){
  if (app.documents.length < 1) return ''

  if (ISMAC)
    recentVal  = app.activeDocument.path.fsName + '/'
  else
    recentVal  = app.activeDocument.path.fsName + '\\'

  recentVal += app.activeDocument.name

  return recentVal

}

/*:::::::::::::::::::::::::::::::::::::::: fin */

