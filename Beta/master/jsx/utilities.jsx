#target illustrator  

/*:::::::::::::::::::::::::::::::::::::::: utilities.jsx */

/*———————————————————————————————————————— notes

    utilities.jsx

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


//:::::::::::::::::::::::::::::::::::::::: functions

/*———————————————————————————————————————— ut_aiOptions(version)

  options for Illustrator File
  ISG409 & JSRp84 */

function ut_aiOptions(version){

  var options = new IllustratorSaveOptions();

  if (version > 0) // JSRp244
    options.compatibility = Compatibility['ILLUSTRATOR' + version];

  options.pdfCompatible = false; // much faster
  options.compressed    = false; // a bit faster

  return options;
}

/*———————————————————————————————————————— ut_concatenatePath(part1, part2)

    given a part1 and part2, returns a correct path */

function ut_concatenatePath(part1, part2){

  if (ISMAC) return part1 + '/' + part2
  else return part1 + '\\' + part2
}

/*———————————————————————————————————————— ut_decodeJSON(obj)

    returns a JSON object */

var   maxErrors = 5
var parseErrors = 0

function ut_decodeJSON(str){
  str = decodeURI(str)

  try{
    newObj = JSON.parse(str)
    return newObj
  }
  catch(mst){
    parseErrors += 1
    if (parseErrors < maxErrors)
      alert( '92: JSON parse error\n'+msg)
    return '93: JSON parse error'
  }
}

//———————————————————————————————————————— ut_dumpKeys(obj)

function ut_dumpKeys(obj){
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

/*———————————————————————————————————————— ut_fileExists(path)

    https://community.adobe.com/t5/premiere-pro-discussions/cep-engine-extension-api-to-check-for-file-existence/m-p/9042102 */

function ut_fileExists(path){
  return File(path).exists
}

/*———————————————————————————————————————— ut_getDocPath(doc)

    returns full path of doc */

function ut_getDocPath(doc){
  if (ISMAC) return doc.path.fsName + '/' + doc.name
  else return doc.path.fsName + '\\' + doc.name
}

/*———————————————————————————————————————— ut_getExtension(path)

    */

function ut_getExtension(path){
  var ending = String(path).substr(-5);
  var bits = ending.split('.');
  return '.' + bits[1];
}

/*———————————————————————————————————————— ut_getFileSize(page)

// page.path = parent folder
// page.name = filename
// together is full pagh */

function ut_getFileSize(page){
  try{
    var ref = File(ut_concatenatePath(page.path, page.name))
    var fileSize = Math.round(ref.length / 1000 / 1000 * 100)/100
    return fileSize
  }
  catch(e){ return -1 }
}

/*———————————————————————————————————————— ut_getLinksPath(doc)

    returns path of links folder */

function ut_getLinksPath(doc){
  var path = doc.path.fsName

  return ut_concatenatePath(path, 'Links')
}

/*———————————————————————————————————————— ut_getSvgFilesPath(doc)

    returns SVG folder path from SYNC folder */

function ut_getSvgFilesPath(doc){
 
  var s = SYNCPATH
  if (s == '') return ''

  if (ISMAC) return s + '/SVIJA/SVG Files'
  else return s + '\\SVIJA\\SVG Files'
}

/*———————————————————————————————————————— ut_svgNameSingleArtboard(doc)

    creates SVG name for single-artboard files */

function ut_svgNameSingleArtboard(doc){
  var radical = doc.name.substr(0,doc.name.length-3)
  var artboard = doc.artboards[0].name
  var result = radical + '_' + artboard + '.svg'
  return result
}

/*———————————————————————————————————————— ut_hasPath(sourceDoc)

    has file been saved at least once?
    returns '' or error message */

function ut_hasPath(doc){

  if (doc.path != '') return ''

  var syncPath = deriveSyncFolder()
  if (syncPath == '') return 'Please save ' + doc.name + ' normally.'

  var f = new File(syncPath).saveDlg('','')

  if (f == null) return 'Please save ' + doc.name + ' normally.'

  app.activeDocument.saveAs(f, undefined)
  return ''
    
}

/*———————————————————————————————————————— ut_isInteger(n)

    */

function ut_isInteger(n){
  if (n == Math.round(n)) return true;
  else return false;
}

/*———————————————————————————————————————— ut_isRoundNumber(n)

    returns true if n is a nice round number:

    30, 120, 168, etc. */

// 6, 24, 336 etc.

function ut_isRoundNumber(n){

  n = n/5;

  if (ut_isInteger(n/3)) return true;
  if (ut_isInteger(n/4)) return true;
  if (ut_isInteger(n/5)) return true;
  if (ut_isInteger(n/6)) return true;

  return false;
}

/*———————————————————————————————————————— ut_isTwoLetters(n)

    returns true if n is two letters or numbers
    a-z, A-Z, 0-9 */

function ut_isTwoLetters(n){
  const regex = /^[a-zA-Z\d][a-zA-Z\d]$/g
  if(n.match(regex) === null) return false
  return true;
}

/*———————————————————————————————————————— ut_makeMB(x)

    givent a number of bytes, returns a value
    in KB or MB for human consumption */

function ut_makeMB(x){

  var ext = ' MB'
  var div = 1000

  if (x < 1000000){
    ext = ' KB'
    div = 1
  }

  x = Math.round(x / div / 1000 * 100)/100
  return x + ext
}

/*———————————————————————————————————————— ut_makeSvgName(doc, ab)

    creates SVG filename from doc & artboard n° */

function ut_makeSvgName(doc, ab){
  var name = doc.name.slice(0, -3);  // remove .ai
  return name + '_' + doc.artboards[ab].name + '.svg' 
}

/*———————————————————————————————————————— ut_newFile(folder, name)

    returns file to save into

    https://extendscript.docsforadobe.dev */

function ut_newFile(folder, name) {

  var f = new File(folder + '/' + name);

  if (f.open("w")){ f.close(); } // check access rights
  else alert('File ' + f + ' could not be written');

  return f;
}

/*———————————————————————————————————————— ut_relockHierarchy(obj)

    relocks elements unlocked by ut_unlockHierarchy() */

function ut_relockHierarchy(arr){
  for(var x=0; x<arr.length; x++){
    arr[x][0].visible = arr[x][2];
    arr[x][0].locked = arr[x][1];
  }
}

//———————————————————————————————————————— ut_startTimer()

function ut_startTimer(){
  var d = new Date()
  return d.getTime()
}

//———————————————————————————————————————— ut_elapsed(startTime)

function ut_elapsed(startTime){
  var d = new Date()
  return d.getTime()-startTime
}

/*———————————————————————————————————————— ut_translate(key)
    */

function ut_translate(key){

  for (x=0; x<DICTIONARY.length; x++)
    if (typeof DICTIONARY[x]['key'] != 'undefined' && typeof DICTIONARY[x]['lang'] != 'undefined')
      if (DICTIONARY[x]['key'] == key && DICTIONARY[x]['lang'] == LANG)
        return DICTIONARY[x]['text']

  return 'missing DICTIONARY key: '+key

}

/*———————————————————————————————————————— ut_unlockHierarchy(obj)

    unlocks the hierarchy above an element and returns an array

    each element of the array is a sub array containing
    [obj, obj.locked, obj.visible] */

function ut_unlockHierarchy(obj){

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

