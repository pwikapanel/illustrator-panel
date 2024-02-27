#target illustrator  

//:::::::::::::::::::::::::::::::::::::::: utility functions

// file.fsName replaces ~ with /Users/Main/
// https://github.com/Adobe-CEP/Getting-Started-guides/blob/master/Exporting%20files%20from%20the%20host%20app/readme.md

/*———————————————————————————————————————— addMb(x)

    givent a number of bytes, returns a value
    in KB or MB for human consumption */

function addMb(x){

  var ext = ' MB'
  var div = 1000

  if (x < 1000000){
    ext = ' KB'
    div = 1
  }

  x = Math.round(x / div / 1000 * 100)/100
  return x + ext
}

/*———————————————————————————————————————— convertArray(envArray)

    accepts an array of three-element arrays:
    name, success/fail boolean, message

    returns string */

// empty arrays were added to beginning of envArray

function convertArray(arr){
  if (arr.length == 0) return '';

  var result = [];
  for (var x=0; x<arr.length; x++){
    result.push(arr[x][0] + ' ' + arr[x][2]);
}

  return result.join('\n');
}

/*———————————————————————————————————————— drawYellowRectangle(obj)

  create translucent rectangle to signal embedded images
  that can't be found and need to be replaced */

function drawYellowRectangle(obj){
  var alertColor = new RGBColor();
  alertColor.red = 192; alertColor.green = 255; alertColor.blue = 0;
  
  var r = obj.geometricBounds; // coords [left -top right -bottom]

  var rLeft   = r[0];
  var rNegTop = r[1];
  var rWidth  = r[2]-r[0];
  var rHeight = r[1]-r[3];

  // unlock activeLayer

  // isg81 -top, left, width, height
  var rec = obj.parent.pathItems.rectangle( rNegTop, rLeft, rWidth, rHeight );

  rec.filled = true;
  rec.stroked = false;
  rec.fillColor = alertColor;
  rec.opacity = 50;
  rec.name = 'UNFIXABLE IMAGE'

  return rec;
}

/*———————————————————————————————————————— dumpKeys(obj)

    provides a alert listing all keys in a dictionary */

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

/*———————————————————————————————————————— getAlertDepth(img)
    
    This exists so that yellow highlight boxes will be:
    - in front of image if image is not grouped
    - in front of group if image is grouped */

function getAlertDepth(img){

  if (img.parent.typename != 'GroupItem')
    return img.absoluteZOrderPosition;

  var obj = img;
  while (obj.parent.typename == 'GroupItem')
     obj = obj.parent;

  alert('Group depth: '+obj.absoluteZOrderPosition);
  return obj.absoluteZOrderPosition;
}

//———————————————————————————————————————— getExtension(path)

function getExtension(path){
  var ending = String(path).substr(-5);
  var bits = ending.split('.');
  return '.' + bits[1];
}

/*———————————————————————————————————————— getFileSize(page){

    page.path = parent folder
    page.name = filename

    returns -1 if error  */

function getFileSize(page){
  try{
    var ref = File(page.path+'/'+page.name)
    var fileSize = ref.length / 1000 / 1000
    var fileSize = Math.round(fileSize * 100)/100
    return fileSize
  }
  catch(e){ return -1 }
}

//———————————————————————————————————————— isInteger(n)

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

/*———————————————————————————————————————— menuCommand(arg)

    sumpn */

function menuCommand(arg){
  app.executeMenuCommand(arg);
}

/*———————————————————————————————————————— nameExists(list)
      
    var index = nameExists(name, env_imagesFixed);

    accepts a name, and an array of 3-element arrays
    of which the first is a name.

    if the name is found in the first element of an existing
    member of the list, return the index

    else return -1 */

function nameExists(neme, arrayList){

  for (var x=0; x<arrayList.length; x++)
    if (neme == arrayList[x][0]) return x;
  

  return -1;
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

/*———————————————————————————————————————— setPreference(pref, val) DOESN'T WORK

    sets a given preference with a given value

    used to set pixel snapping */

function setPreference(pref, val){
alert('pre try')
  try{
  appPreferences.setIntegerPreference('snapToPixelOnUserAction', val)
  }
  catch(e){ alert(e) }
alert('post try: '+appPreferences.setIntegerPreference('snapToPixelOnUserAction'))
}

// var zop = appPreferences.getIntegerPreference('snapToPoint')
// WORKSvar zop = appPreferences.getIntegerPreference('snapToPixelOnUserAction')

//dumpKeys(app.activeDocument)
//alert('snapToPoint: '+zop)

/*———————————————————————————————————————— svgOptions(includeCanvas)

  sets options for SVG file */

function svgOptions(includeCanvas){

  var options = new ExportOptionsSVG();

  if (includeCanvas)
    options.saveMultipleArtboards = false;                       // Preserves all artwork outside active artboard
  else
    options.saveMultipleArtboards = true;                        // Deletes all artwork outside active artboard

  // options.artboardRange
  // options.compressed
  options.coordinatePrecision = 3;                               // Decimal Places
  options.cssProperties = SVGCSSPropertyLocation.STYLEELEMENTS;  // CSS Properties: Style Elements
  options.documentEncoding = SVGDocumentEncoding.UTF8            // Encoding:
  // options.DTD = SVGDTDVersion.SVGTINY1_1;
  options.DTD = SVGDTDVersion.SVG1_1;                            // SVG Profiles
  options.embedRasterImages = false;                             // Image Location Link
  options.fontSubsetting = SVGFontSubsetting.None;               // Fonts Subsetting
  options.fontType = SVGFontType.SVGFONT;                        // Fonts Type
  options.includeFileInfo = false;                               // Include XMP
  options.includeUnusedStyles = false;                           // Include Unused Graphic Styles
  // options.includeVariablesAndDatasets
  // options.optimizeForSVGViewer
  options.preserveEditability = false;                           // Preserve Illustrator Editing Capabilities
  options.slices = false;                                        // Include Slicing Data
  // options.sVGAutoKerning = true/false;
  options.sVGTextOnPath = false;                                 // Use <textpath> for Text on Path
  // options.typename

  // not available                                               // Output fewer <tspan> elements
  // not available                                               // Responsive

  return options;
}

/*———————————————————————————————————————— unlockHierarchy(obj) & relockHierarchy(obj)

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

/*———————————————————————————————————————— relockHierarchy(obj)

    relocks elements unlocked by unlockHierarchy() */

function relockHierarchy(arr){
  for(var x=0; x<arr.length; x++){
    arr[x][0].visible = arr[x][2];
    arr[x][0].locked = arr[x][1];
  }
}


/*:::::::::::::::::::::::::::::::::::::::: fin */

