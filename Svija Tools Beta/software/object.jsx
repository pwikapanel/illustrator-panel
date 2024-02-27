
//:::::::::::::::::::::::::::::::::::::::: Object.jsx

/*———————————————————————————————————————— notes


/*———————————————————————————————————————— (c) & EULA

   Copyright (c) Svija

   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:
   
   The above copyright notice and this permission notice shall be included in
   all copies or substantial portions of the Software.
   
   The software is provided "as is", without warranty of any kind, express or
   implied, including but not limited to the warranties of merchantability,
   fitness for a particular purpose and noninfringement. In no event shall the
   authors or copyright holders be liable for any claim, damages or other
   liability, whether in an action of contract, tort or otherwise, arising from,
   out of or in connection with the software or the use or other dealings in
   the software.

  	svija.com · hello@svija.com */


//:::::::::::::::::::::::::::::::::::::::: program

#target illustrator  

/*———————————————————————————————————————— getEnvironment(which)

    supplies any environmental variables */

var openFilesVal  = 0
var isSvijaVal    = 0
var syncPathVal   = ''
var lastPathVal   = ''
var urlVal        = ''

var selectVal     = ''
var selectTypeVal = ''

// var zop = appPreferences.getIntegerPreference('snapToPoint')
// WORKSvar zop = appPreferences.getIntegerPreference('snapToPixelOnUserAction')

//dumpKeys(app.activeDocument)
//alert('snapToPoint: '+zop)

function getEnvironment(myDocs){

  var valArray = []

  valArray[ 0] = 'openFiles|'  + openFiles()
  valArray[ 1] = 'isSvija|'    + isSvija()
  valArray[ 2] = 'syncPath|'   + syncPath(myDocs)
  valArray[ 3] = 'lastPath|'   + lastPath(myDocs)
  valArray[ 4] = 'url|'        + url()

                                 //prf loaded in Preferences.jsx
  valArray[ 5] = 'gridLine|'   + appPreferences.getRealPreference('Grid/Horizontal/Spacing')
  valArray[ 6] = 'gridSub|'    + appPreferences.getIntegerPreference('Grid/Horizontal/Ticks')

  valArray[ 7] = 'pointSnap|'  + appPreferences.getIntegerPreference('snapToPoint')
  valArray[ 8] = 'pixelSnap|'  + appPreferences.getIntegerPreference('snapToPixelOnUserAction')

  objectProperties() // sets selectVal & selectTypeVal
  valArray[ 9] = 'select|'     + selectVal
  valArray[10] = 'selectType|' + selectTypeVal

  return valArray.join('¬') 
}

function openFiles(){
  openFilesVal = app.documents.length
  return openFilesVal
}

function isSvija(){
  var currPath = ''

  if (openFilesVal < 1) isSvijaVal = 0
  else
    currPath = String(app.activeDocument.path)

  if (currPath.indexOf('/sync') < 0) isSvijaVal = 0
  else isSvijaVal = 1

  return isSvijaVal
}

function syncPath(myDocs){

  if (openFilesVal < 1 || !isSvijaVal) return syncPathVal;

  var destPath  = String(app.activeDocument.path);   // current folder
  destPath = fixTilde(destPath, myDocs)

  var sync = destPath.indexOf('/sync')
  destPath = destPath.substr(0,sync) + '/sync/';
  return destPath
}

function lastPath(myDocs){
  if (app.documents.length<1 || !isSvijaVal) return lastPathVal

  var destPath  = String(app.activeDocument.path)+'/'+String(app.activeDocument.name)
  lastPathVal   = fixTilde(destPath, myDocs)

  return lastPathVal
}

function url(){

/*———————————————————————————————————————— url()

  using the frontmost document's location, returns
  the url of the website, stored in

  sync/SVIJA/System/URL.txt */

  if (openFilesVal==0 || isSvijaVal==0) return urlVal

  var destPath  = String(app.activeDocument.path);   // current folder
  var syncIndex = destPath.indexOf('/sync')

  if (syncIndex < 0) return urlVal

  destPath = destPath.substr(0, syncIndex) + '/sync/SVIJA/System/URL.txt';

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


/*———————————————————————————————————————— open url()
*/

//  function onClickOpenUrlInDefaultBrowser() {
//       CSLibrary.openURLInDefaultBrowser(document.getElementById("OpenUrlInDefaultBrowser").value);
//    }

function callOpenURLInDefaultBrowser(arg){
  url = 'https://'+arg
  openURLInDefaultBrowser(url)
  return true
}

/*———————————————————————————————————————— objectProperties()

absoluteZOrderPosition: 4
area: -619.59375
artworkKnockout: KnockoutState.DISABLED
blendingMode: BlendModes.NORMAL
clipping: false
closed: true
controlBounds: 616.5,-579.25,654.75,-612.75
editable: true
evenodd: false
fillColor: [RGBColor]
fillOverprint: false
filled: true
geometricBounds: 616.5,-579.25,654.75,-612.75
guides: false
height: 33.5
hidden: false
isIsolated: false
layer: [Layer 3s Logo rouge]
left: 616.5
length: 102.368480608085
locked: false
name: 
note: 
opacity: 100
parent: [Layer 3s Logo rouge]
pathPoints: [PathPoints]
pixelAligned: true
polarity: PolarityValues.NEGATIVE
position: 616.5,-579.25
resolution: 800
selected: true
selectedPathPoints: [PathPoint],[PathPoint],[PathPoint],[PathPoint]
sliced: false
strokeCap: StrokeCap.BUTTENDCAP
strokeColor: [NoColor]
strokeDashOffset: 0
strokeDashes: 
strokeJoin: StrokeJoin.MITERENDJOIN
strokeMiterLimit: 10
strokeOverprint: false
strokeWidth: 1
stroked: false
tags: [Tags]
top: -579.25
typename: PathItem
uRL: 
uuid: 321
visibilityVariable: null
visibleBounds: 616.5,-579.25,654.75,-612.75
width: 38.25
wrapInside: error
wrapOffset: error
wrapped: false
zOrderPosition: error

*/

function objectProperties(){

  if (app.documents.length < 1){
    selectVal = '—'
    selectTypeVal = ' '
    return true
  }

  var sourceDoc  = app.activeDocument;
  var selection  = sourceDoc.selection

// dumpKeys(selection[0])

  if (selection.length == 0){
    selectVal     = '—'
    selectTypeVal = ' '
    return true
  }

  if (selection.length > 1){
    selectVal     = 'Sélection multiple'
    selectTypeVal = ' '
    return true
  }

  if (selection[0].name == ''){
    selectVal     = 'générique'
    selectTypeVal = selection[0].typename
    return true
  }

  selectVal     = selection[0].name
  selectTypeVal = selection[0].typename
  return true
}

/*———————————————————————————————————————— updateName() UNUSED

    will be used to update the name of an object */

function updateName(){
  var sourceDoc  = app.activeDocument
  var selection  = sourceDoc.selection
  selection[0].name = newName
}

/*———————————————————————————————————————— getState() COMMENTED OUT

    used in "set object" part of panel.html  */

//  function getState(){
//  
//  str = 'Svija'
//  
//  
//  try {
//    app.switchWorkspace(str)
//  } catch (e) {
//    return("Error executing command:\n" + result + "\n\n" + e);
//  }
//  return " worked"
//  }

/*———————————————————————————————————————— reading preference tests COMMENTED OUT

var str = 'Grid/Horizontal/Ticks';
var str = 'SettingsToolTip';
var str = 'GenAI/AILegalTermsAccepted_V2';
var str = 'useProcessorSpecificCode';
var str = 'Workspaces/Essentials/collection1/attributes/ControlPanel\ OIMirrorV'

// Error 1200: an Illustrator error occurred: 1312902469 ('EMAN')Line: 62->  var res = app.preferences.getIntegerPreference(str);


var res = app.preferences.getIntegerPreference(str);

return str + ' = '+res
*/

/*———————————————————————————————————————— openFolder(lastPath)

    open dialog with folder of most recent document */

function openFolder(lastPath, url){
  var slashPos = lastPath.lastIndexOf('/')
  var newPath = lastPath.substr(0, slashPos)
  var localFolder = Folder(newPath)
  var prpt = url
  try{      localFolder.openDlg(prpt, '', true) }
  catch(errMsg){ alert(errMsg)                  }
}

/*———————————————————————————————————————— openPage(lastPath)

    opens most recently closed file */

function openPage(lastPath, url){
  var slashPos = lastPath.lastIndexOf('/')
  var newPath = lastPath.substr(0, slashPos)
  var openFile = new File(lastPath)
  try{
    app.open(openFile)
  }catch(e){ openFolder(lastPath, url) }
}


//:::::::::::::::::::::::::::::::::::::::: utility functions

/*———————————————————————————————————————— fixTilde(arg, myDocs)

    replaces ~/Documents with /Users/Main/Documents */

function fixTilde(arg, myDocs){
  myDocs = myDocs.replace('Documents', '')
  if (arg.substr(0,1) != '~') return arg

  var stem = '/Users/Main'
  return stem + arg.substr(1)
}


//:::::::::::::::::::::::::::::::::::::::: fin

