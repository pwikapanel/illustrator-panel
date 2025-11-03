#target illustrator  

/* vim: set foldmethod=marker fmr=/*\—,///: */

/*:::::::::::::::::::::::::::::::::::::::: projectManager.jsx / projectManager.js */

/*———————————————————————————————————————— notes

    returns:

     ISPAGE   boolean is a Pwika site
    syncPath   path to sync folder or ''
     siteURL   site url or ''
    lastPath   file path of most recent open page or ''
    
    also sets global variables used in CEP
    with the same names, but ALL CAPS */
///
/*———————————————————————————————————————— initialization */

var ISPAGE = false // is current file part of a Pwika project?
///
/*———————————————————————————————————————— recover from localStorage */

// path to most recent SYNC folder, if any
if (typeof localStorage.ISPAGE != 'undefined')
     var SYNCHPATH = localStorage.ISPAGE
else var SYNCHPATH = false

// URL of most recent Pwika site
if (typeof localStorage.SITEURL != 'undefined')
     var SITEURL = localStorage.SITEURL
else var SITEURL = false

// path to most recent pwika site page (for reopen button)
if (typeof localStorage.LASTPATH != 'undefined')
     var LASTPATH = localStorage.LASTPATH
else var LASTPATH = false
///

/*:::::::::::::::::::::::::::::::::::::::: main function */

/*———————————————————————————————————————— projectManager() */

function projectManager(){

  if (app.documents.length == 0) return 'app.documents.length=0'

  ISPAGE = ISWEBPAGE()

  if (ISPAGE){
    SYNCPATH = getSyncPath()
    SITEURL  =  getSiteURL()
    LASTPATH = getLastPath()
  }

  var resArray = []

  // `${variable}` is not supported by CEP
  resArray.push( '"isPwika":"' +               ISPAGE   + '"')
  resArray.push('"syncPath":"' + escapeSlashes(SYNCPATH) + '"')
  resArray.push( '"siteURL":"' +               SITEURL   + '"')
  resArray.push('"lastPath":"' + escapeSlashes(LASTPATH) + '"')

  return '{' + resArray.join(',') +'}'
}
///

/*:::::::::::::::::::::::::::::::::::::::: functions */

/*———————————————————————————————————————— getSyncPath()

    returns real path of current SYNC folder
    if possible or '' */

function getSyncPath(){
  var res = app.activeDocument.path.fsName

  if (!STRCONTAINSSYNC(res)) return ''

  var i = res.indexOf('SYNC')
  res = res.substr(0, i+4)

  return res
}
///
/*———————————————————————————————————————— getSiteURL()

    using the frontmost document's location, returns
    the URL of the website, stored in

    sync/CONFIG/System/URL.txt */

function getSiteURL(){

  if (ISMAC) destPath = getSyncPath() + '/CONFIG/System/URL.txt'
  else       destPath = getSyncPath() + '\\CONFIG\\System\\URL.txt'

// https://community.adobe.com/t5/indesign-discussions/file-read-returns-nothing-for-txt-file/td-p/9335635

  var fileObj = new File(destPath)
  fileObj.encoding = 'UTF8' // set to 'UTF8' or 'UTF-8'

  if (!fileObj.open('r')) return ''

  var res = fileObj.read()
  if (res.length < 5) return ''

  fileObj.close()

  // get rid of invisible line feed at end
  if (res.charCodeAt(res.length-1) == 10)
    res = res.slice(0,-1)

  return res
}
///
/*———————————————————————————————————————— getLastPath()

    returns real path of current document */

function getLastPath(){

  if (typeof ISMAC == 'undefined'){
    if (notYetNotified) {
      alert("⚠️ ISMAC not set\nprojectManager.jsx#109")
      notYetNotified = false
    }
    return ''
  }

  if (ISMAC)
    res = app.activeDocument.path.fsName + '/'
  else
    res = app.activeDocument.path.fsName + '\\'

  return res + app.activeDocument.name
}
///
/*———————————————————————————————————————— escapeSlashes(arg){

    adds extra \\ so JSON parser will understand */

function escapeSlashes(arg){
  return arg.replace(/\\/g, '\\\\')
}
///

/*:::::::::::::::::::::::::::::::::::::::: fin */

