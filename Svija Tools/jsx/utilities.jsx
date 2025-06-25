#target illustrator  

/*:::::::::::::::::::::::::::::::::::::::: utilities.jsx */

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

/*———————————————————————————————————————— ut_getSvgFilesPath(doc)

    returns SVG folder path from SYNC folder */

function ut_getSvgFilesPath(doc){
 
  var s = SYNCPATH
  if (s == '') return ''

  if (ISMAC) return s + '/SVIJA/SVG Files'
  else return s + '\\SVIJA\\SVG Files'
}

/*———————————————————————————————————————— ut_hslToRgbArray(hsl)

    accepts a string of format 'hsl(120, 50%, 50%)'
    with or without commas

    returns an array of three 0-1 values */

function ut_hslToRgbArray(str){
  str = str.replace(/,/g,'')
  str = str.replace(/%/g,'')
  str = str.slice(4, -1)             // 53 100 50

  var hsl = str.split(' ')            // ['80 100', '50']

  var h = parseFloat(hsl[0])            // 80
  var s = parseFloat(hsl[1])            // 100
  var l = parseFloat(hsl[2])            // 50

  return us_hslToRgb(h, s, l)
}

/*———————————————————————————————————————— us_hslToRgb(h, s, l)

    accepts three values: 0-360, 0-100, 0-100

    returns an array of three 0-1 values */

function us_hslToRgb(h, s, l){
  // https://stackoverflow.com/a/9493060

  h = h/360
  s = s/100
  l = l/100

  var r, g, b

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = us_hueToRgb(p, q, h + 1/3);
    g = us_hueToRgb(p, q, h);
    b = us_hueToRgb(p, q, h - 1/3);
  }

  return [r, g, b];
}

/*———————————————————————————————————————— us_hueToRgb(m1, m2, h)

    accepts three 0-1 values

    returns a number from 0-1 */

function us_hueToRgb(m1, m2, h){
  // https://stackoverflow.com/a/9493060

  if (h < 0) h +=  1
  if (h > 1) h -=  1

  if (h*6 < 1) return m1 + (m2-m1) * h * 6
  if (h*2 < 1) return m2
  if (h*3 < 2) return m1 + (m2-m1) * (2/3-h) * 6

  return m1
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

