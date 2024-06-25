#target illustrator  

/*:::::::::::::::::::::::::::::::::::::::: Utilities.jsx */

/*———————————————————————————————————————— notes

    Utilities.jsx

    1.0.5

    notes:

    JSR = JavaScript Scripting Reference.pdf
    ISG = Illustrator Scripting Guide
    using ampersands in // comments causes crashes

		This same script is used for both Save as Svija
    and "Save CC (Legacy).jsx" but Version(0) is
    changed to Version(17) for the latter. */

/*———————————————————————————————————————— EULA

    Copyright (c) Svija SAS

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

    svija.com · hello@svija.com*/


//:::::::::::::::::::::::::::::::::::::::: environmental variable

/*———————————————————————————————————————— macOS boolean variable

    is platform is Mac or PC based on  path */

    var pathOrig = app.activeDocument.path.fsName

    var macOS = pathOrig.substr(0,1) == '/'


//:::::::::::::::::::::::::::::::::::::::: functions

/*———————————————————————————————————————— aiOptions(version)

  options for Illustrator File
  ISG409 & JSRp84 */

function aiOptions(version){

  var options = new IllustratorSaveOptions();

  if (version > 0) // JSRp244
    options.compatibility = Compatibility['ILLUSTRATOR' + version];

  options.pdfCompatible = false; // much faster
  options.compressed    = false; // a bit faster

  return options;
}

/*———————————————————————————————————————— concatenatePath(part1, part2)

    given a part1 and part2, returns a correct path */

function concatenatePath(part1, part2){
  if (macOS) return part1 + '/' + part2
  else return part1 + '\\' + part2
}

/*———————————————————————————————————————— deriveSyncFolder()

    used when saving an unsaved document — tries to
    find a sync folder from other open documents */

function deriveSyncFolder(){
  if (isMac == 'true')
    var comparator = '/sync'
  else
    var comparator = '\\sync'

  for(var x=1; x<app.documents.length; x++){
    var docPath = String(app.documents[x].path.fsName);
    if (docPath.indexOf(comparator) > 0) return concatenatePath(docPath, '/Page Name.ai')
  }

  return ''
}

//———————————————————————————————————————— dumpKeys(obj)

function dumpKeys(obj){
  var str = '';

  for (var i in obj){
    try{
      str += '\n'+i+': '+obj[i]
    }
    catch(e){
      str += '\n'+i+': error';
    }
  }
  alert(str);
}

/*———————————————————————————————————————— fileExists(path)

    https://community.adobe.com/t5/premiere-pro-discussions/cep-engine-extension-api-to-check-for-file-existence/m-p/9042102 */

function fileExists(path){
  return File(path).exists
}

/*———————————————————————————————————————— getDocPath(doc)

    returns full path of doc */

function getDocPath(doc){
  if (macOS) return doc.path.fsName + '/' + doc.name
  else return doc.path.fsName + '\\' + doc.name
}

/*———————————————————————————————————————— getExtension(path)

    */

function getExtension(path){
  var ending = String(path).substr(-5);
  var bits = ending.split('.');
  return '.' + bits[1];
}

/*———————————————————————————————————————— getFileSize(page)

// page.path = parent folder
// page.name = filename
// together is full pagh */

function getFileSize(page){
  try{
    var ref = File(concatenatePath(page.path, page.name))
    var fileSize = Math.round(ref.length / 1000 / 1000 * 100)/100
    return fileSize
  }
  catch(e){ return -1 }
}

/*———————————————————————————————————————— getLinksPath(doc)

    returns path of links folder */

function getLinksPath(doc){
  var path = doc.path.fsName

  return concatenatePath(path, 'Links')
}

/*———————————————————————————————————————— getSvgFilesPath(doc)

    returns SVG folder path from sync folder */

function getSvgFilesPath(doc){
 
  var s = getSyncPath(doc)
  if (s == '') return ''

  if (macOS) return s + '/SVIJA/SVG Files'
  else return s + '\\SVIJA\\SVG Files'
}

/*———————————————————————————————————————— svgNameSingleArtboard(doc)

    creates SVG name for single-artboard files */

function svgNameSingleArtboard(doc){
  var radical = doc.name.substr(0,doc.name.length-3)
  var artboard = doc.artboards[0].name
  var result = radical + '_' + artboard + '.svg'
  return result
}

/*———————————————————————————————————————— getSyncPath(doc)

    gets sync folder path from doc */

function getSyncPath(doc){
  //var path = String(doc.path.fsName)

  var path = doc.path.fsName

  if (macOS) var index = path.indexOf('/sync')
  else       var index = path.indexOf('\\sync')

  if (index>0) return path.substr(0,index + 5)
  else return ''
}

/*———————————————————————————————————————— hasPath(sourceDoc)

    has file been saved at least once?
    returns '' or error message */

function hasPath(doc){

  if (doc.path != '') return ''

  var syncPath = deriveSyncFolder()
  if (syncPath == '') return 'Please save ' + doc.name + ' normally.'

  var f = new File(syncPath).saveDlg('','')

  if (f == null) return 'Please save ' + doc.name + ' normally.'

  app.activeDocument.saveAs(f, undefined)
  return ''
    
}

/*———————————————————————————————————————— isInteger(n)

    */

function isInteger(n){
  if (n == Math.round(n)) return true;
  else return false;
}

/*———————————————————————————————————————— isRoundNumber(n)

    returns true if n is a nice round number:

    30, 120, 168, etc. */

// 6, 24, 336 etc.

function isRoundNumber(n){

  n = n/5;

  if (isInteger(n/3)) return true;
  if (isInteger(n/4)) return true;
  if (isInteger(n/5)) return true;
  if (isInteger(n/6)) return true;

  return false;
}

/*———————————————————————————————————————— isTwoLetters(n)

    returns true if n is two letters or numbers
    a-z, A-Z, 0-9 */

function isTwoLetters(n){
  const regex = /^[a-zA-Z\d][a-zA-Z\d]$/g
  if(n.match(regex) === null) return false
  return true;
}

/*———————————————————————————————————————— makeMb(x)

    givent a number of bytes, returns a value
    in KB or MB for human consumption */

function makeMb(x){

  var ext = ' MB'
  var div = 1000

  if (x < 1000000){
    ext = ' KB'
    div = 1
  }

  x = Math.round(x / div / 1000 * 100)/100
  return x + ext
}

/*———————————————————————————————————————— makeSvgName(doc, ab)

    creates SVG filename from doc & artboard n° */

function makeSvgName(doc, ab){
  var name = doc.name.slice(0, -3);  // remove .ai
  return name + '_' + doc.artboards[ab].name + '.svg' 
}

/*———————————————————————————————————————— newFile(folder, name)

    returns file to save into

    https://extendscript.docsforadobe.dev */

function newFile(folder, name) {

  var f = new File(folder + '/' + name);

  if (f.open("w")){ f.close(); } // check access rights
  else alert('File ' + f + ' could not be written');

  return f;
}

/*———————————————————————————————————————— relockHierarchy(obj)

    relocks elements unlocked by unlockHierarchy() */

function relockHierarchy(arr){
  for(var x=0; x<arr.length; x++){
    arr[x][0].visible = arr[x][2];
    arr[x][0].locked = arr[x][1];
  }
}

/*———————————————————————————————————————— svgOptions(includeCanvas)

  sets options for SVG file */

function svgOptions(artboards){

  var multipleArtboards = (artboards > 1)
  var options= new ExportOptionsWebOptimizedSVG()

  options.artboardRange         = '' // or '1-3'
  options.coordinatePrecision   = 3
  options.cssProperties         = SVGCSSPropertyLocation.STYLEELEMENTS
  options.fontType              = SVGFontType.SVGFONT
  options.rasterImageLocation   = RasterImageLocation.PRESERVE
  options.saveMultipleArtboards = multipleArtboards
  options.svgId                 = SVGIdType.SVGIDREGULAR
  options.svgMinify             = false // should use in future
  options.svgResponsive         = true

  return options;
}

/*———————————————————————————————————————— unlockHierarchy(obj)

    unlocks the hierarchy above an element and returns an array

    each element of the array is a sub array containing
    [obj, obj.locked, obj.visible] */

function unlockHierarchy(obj){

  var parentLocks = [];
  var thisParent = obj.parent;

  while (thisParent.typename != 'Document'){
    parentLocks[parentLocks.length] = [thisParent, thisParent.locked, thisParent.visible];
    thisParent = thisParent.parent
  }

  for(var x=parentLocks.length-1; x>-1; x--){
    try{
      parentLocks[x][0].visible= true;
      parentLocks[x][0].locked = false;
    }
    catch(e){ alert('Page item couldn\'t be accessed: ' + e+'\n'+parentLocks[x][0].typename + ' inside ' + parentLocks[x][0].parent.name) }
  }

  return parentLocks;
}


//:::::::::::::::::::::::::::::::::::::::: fin

