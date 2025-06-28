#target illustrator  

//:::::::::::::::::::::::::::::::::::::::: projectInfo.jsx / projectInfo.js

/*———————————————————————————————————————— notes

    returns:

     isSvija   boolean is a Svija site
    syncPath   path to sync folder or ''
     siteURL   site url or ''
    lastPath   file path of most recent open page or ''
    
    also sets global variables used in CEP
    with the same names, but ALL CAPS */


//———————————————————————————————————————— initialization

var ISSVIJA  = false // is current file part of a Svija project?
var SYNCPATH = ''    // path to most recent SYNC folder, if any
var SITEURL  = ''    // URL of most recent Svija site
var LASTPATH = ''    // path to most recent svija site page (for reopen button)

//———————————————————————————————————————— projectInfo()

function projectInfo(){

  if (app.documents.length == 0) return ''

  ISSVIJA  =     isSvija()

  if (ISSVIJA){
    SYNCPATH = getSyncPath()
    SITEURL  =  getSiteURL()
    LASTPATH = getLastPath()
  }

  var resArray = []

  // `${variable}` is not supported by CEP
  resArray.push( '"isSvija":"' +ISSVIJA+'"' )
  resArray.push('"syncPath":"' +SYNCPATH+'"')
  resArray.push( '"siteURL":"' +SITEURL +'"')
  resArray.push('"lastPath":"' +LASTPATH+'"')

  return '{' + resArray.join(',') +'}'
}


/*:::::::::::::::::::::::::::::::::::::::: functions */

/*———————————————————————————————————————— isSvija()

    returns true if in a SYNC folder */

function isSvija(){

  var currPath = String(app.activeDocument.path)

  if (currPath.indexOf('SYNC') > 0) return true
  else return false
}

/*———————————————————————————————————————— getSyncPath()

    returns real path of current SYNC folder
    if possible or '' */

function getSyncPath(){

  var res = app.activeDocument.path.fsName
  var i = res.indexOf('SYNC')

  if (i < 0) return ''

  res = res.substr(0, i) + 'SYNC'
  return res
}

/*———————————————————————————————————————— getSiteURL()

    using the frontmost document's location, returns
    the URL of the website, stored in

    sync/SVIJA/System/URL.txt */

var notYetNotified = true

function getSiteURL(){

  if (typeof ISMAC == 'undefined'){
    if (notYetNotified) { alert("ISMAC not set\nprojectInfo.jsx#77"); notYetNotified = false }
    return ''
  }

  if (ISMAC) destPath = getSyncPath() + '/SVIJA/System/URL.txt';
  else       destPath = getSyncPath() + '\\SVIJA\\System\\URL.txt';

// https://community.adobe.com/t5/indesign-discussions/file-read-returns-nothing-for-txt-file/td-p/9335635

  var fileObj = new File(destPath)
  fileObj.encoding = 'UTF8'; // set to 'UTF8' or 'UTF-8'

  if (!fileObj.open('r')) return ''

  var res = fileObj.read()
  if (res.length == 0) return ''

  fileObj.close()

  return res
}

/*———————————————————————————————————————— getLastPath()

    returns real path of current document */

function getLastPath(){

  if (typeof ISMAC == 'undefined'){
    if (notYetNotified) { alert("ISMAC not set\nprojectInfo.jsx#109"); notYetNotified = false }
    return ''
  }

  if (ISMAC)
    res = app.activeDocument.path.fsName + '/'
  else
    res = app.activeDocument.path.fsName + '\\'

  return res + app.activeDocument.name
}


/*:::::::::::::::::::::::::::::::::::::::: fin */


