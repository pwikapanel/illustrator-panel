#target illustrator  

/*:::::::::::::::::::::::::::::::::::::::: projectInfo.jsx */

/*———————————————————————————————————————— notes

    need
    - URL to launch site
    - sync folder to open it
    - most recent file path to reopen it */

 /*———————————————————————————————————————— getProjectInfo()

  using the frontmost document's location, returns
  the URL of the website, stored in

  sync/SVIJA/System/URL.txt */

function getProjectInfo(){

  if (app.documents.length == 0) return ''
  if (!isSvija())                return ''

  var resArray = []

  resArray.push(   '"syncPath":"' +    gctSyncPath() + '"')
  resArray.push(    '"siteURL":"' +     getSiteURL() + '"')
  resArray.push('"lastPath":"' + getLastPath() + '"')

  return '{' + resArray.join(',') +'}'
}


/*:::::::::::::::::::::::::::::::::::::::: utilities */

/*———————————————————————————————————————— isSvija()

    returns true if in a SYNC folder */

function isSvija(){
  return true

  var currPath = String(app.activeDocument.path)

  if (currPath.indexOf('SYNC') > 0) return true
  else return false
}

/*———————————————————————————————————————— gctSyncPath()

    returns real path of current SYNC folder
    if possible or '' */

function gctSyncPath(){

  var res = app.activeDocument.path.fsName
  var i = res.indexOf('SYNC')

  if (i < 0) return ''

  res = res.substr(0, i) + 'SYNC'
  return res
}

/*———————————————————————————————————————— getLastPath()

    returns real path of current document */

function getLastPath(){

  if (ISMAC)
    res = app.activeDocument.path.fsName + '/'
  else
    res = app.activeDocument.path.fsName + '\\'

  return res + app.activeDocument.name
}

/*———————————————————————————————————————— getSiteURL()

    using the frontmost document's location, returns
    the URL of the website, stored in

    sync/SVIJA/System/URL.txt */

function getSiteURL(){

  if (ISMAC) destPath = gctSyncPath() + '/SVIJA/System/URL.txt';
  else       destPath = gctSyncPath() + '\\SVIJA\\System\\URL.txt';

// https://community.adobe.com/t5/indesign-discussions/file-read-returns-nothing-for-txt-file/td-p/9335635

  var fileObj = new File(destPath)
  fileObj.encoding = 'UTF8'; // set to 'UTF8' or 'UTF-8'

  if (!fileObj.open('r')) return ''

  var res = fileObj.read()
  if (res.length == 0) return ''

  fileObj.close()

  return res
}


/*:::::::::::::::::::::::::::::::::::::::: fin */


