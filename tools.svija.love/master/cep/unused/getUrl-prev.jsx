#target illustrator  

/*:::::::::::::::::::::::::::::::::::::::: getURL.jsx */

function getURL(){

  return "working"



/*using the frontmost document's location, returns
  the url of the website, stored in

  sync/SVIJA/System/URL.txt */

  if (openFilesVal==0 || isSvijaVal==0) return urlVal

  var destPath  = String(app.activeDocument.path.fsName);   // current folder

  if (isMac == true)
    var syncIndex = destPath.indexOf('/sync')
  else
    var syncIndex = destPath.indexOf('\\sync')

  if (syncIndex < 0) return urlVal

  if (isMac)
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

/*:::::::::::::::::::::::::::::::::::::::: fin */

