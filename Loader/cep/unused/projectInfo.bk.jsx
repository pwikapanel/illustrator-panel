
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

function gotURL(){

  if (openFilesVal==0 || isSvijaVal==0) return urlVal

  var destPath  = String(app.activeDocument.path.fsName);   // current folder

  if (ISMAC)
    var syncIndex = destPath.indexOf('/sync')
  else
    var syncIndex = destPath.indexOf('\\sync')

  if (syncIndex < 0) return urlVal

  if (ISMAC)
    destPath = destPath.substr(0, syncIndex) + '/sync/SVIJA/System/URL.txt';
  else
    destPath = destPath.substr(0, syncIndex) + '\\sync\\SVIJA\\System\\URL.txt';

// https://community.adobe.com/t5/indesign-discussions/file-read-returns-nothing-for-txt-file/td-p/9335635

  var urlFile = new File(destPath)
  urlFile.encoding = 'UTF8'; // set to 'UTF8' or 'UTF-8'

  if (!urlFile.open('r')) return urlVal

  var result = urlFile.read()

  if (result.length == 0) return urlVal

  urlFile.close()

  urlVal = result
  return urlVal
}

function syncPath(){ //———————————————————————————————————————————————————————

// file.fsName replaces ~ with /Users/Main/

  if (openFilesVal < 1 || !isSvijaVal) return syncPathVal;

  var destPath = app.activeDocument.path.fsName;   // current folder

  var sync = destPath.indexOf('/sync')
  destPath = destPath.substr(0,sync) + '/sync/';

  return destPath
}


function lastPath(isMac){ //———————————————————————————————————————————————————————
  if (app.documents.length<1 || !isSvijaVal) return lastPathVal

  if (isMac)
    lastPathVal  = app.activeDocument.path.fsName + '/'
  else
    lastPathVal  = app.activeDocument.path.fsName + '\\'

  lastPathVal += app.activeDocument.name

  return lastPathVal
}


