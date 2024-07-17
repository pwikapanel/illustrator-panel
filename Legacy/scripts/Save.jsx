#target illustrator  

/*:::::::::::::::::::::::::::::::::::::::: Save.jsx */

/*———————————————————————————————————————— notes

    Save.jsx

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


//:::::::::::::::::::::::::::::::::::::::: program

/*———————————————————————————————————————— ▼ program:{

    can use "break program;" to quit at any moment */

program:{

  var d = new Date()
  var env_start_ms = d.getTime()
  var fileSizes = []

/*———————————————————————————————————————— no open docs */

if (app.documents.length < 1){
  alert('No open documents.')
  break program
}

/*———————————————————————————————————————— get param if standalone

    save or all */

if (typeof param == 'undefined'){

  var msg   = 'Please enter param\nsave  all'

  var param = prompt(msg, 'save')
  if (param == null)
    param = '' 

  const regex = /save|all/g
  if(param.match(regex) === null){
    alert('Invalid Param\nSave operation canceled')
    break program
  }
}

/*———————————————————————————————————————— initialization */

var  env_errs = []                   // error messages for user
var  env_warn = []                   // warnings for user
var   appDocs = app.documents        // array of open documents
var  docsOpen = appDocs.length       // number of open documents
var activeDoc = app.activeDocument   // active document
var aiVersion = 0                    // 0=default, 17=CC Legacy
var aiOpts    = aiOptions(aiVersion)

var single = param == 'all'    ? false : true // save only frontmost doc?

/*———————————————————————————————————————— "for" loop through documents */

// var extraLayer = false;

for (var index=0; index<docsOpen; index++){

  app.activeDocument = appDocs[index];

  var doc            = app.activeDocument;

  if (isValid(doc)){

    var activeBoard    = doc.artboards.getActiveArtboardIndex();
    var originalPath   = getDocPath(doc)

    var theseFileSizes = saveSvg(doc) ///////////////  MAIN SAVE AS SVG FUNCTION  \\\\\\\\\\\\\\\
  
    var aiFile = new File(originalPath);
    doc.saveAs(aiFile, aiOpts);

    //————————————————————————————————————————

    theseFileSizes.unshift(aiFile.length)
    theseFileSizes.unshift(doc.name)
    fileSizes[fileSizes.length] = (theseFileSizes)

    //————————————————————————————————————————

    doc.artboards.setActiveArtboardIndex(activeBoard);

  }

  if (single) break;
}

/*———————————————————————————————————————— restore frontmost doc and alert user */

if (!single)
  app.activeDocument = activeDoc;

app.beep()

finalFeedback(fileSizes);

/*———————————————————————————————————————— ▲ } // program */

} // program 


//:::::::::::::::::::::::::::::::::::::::: main functions

/*———————————————————————————————————————— saveSvg(doc)

  saves file as SVG:

  - saves in SYNC/Svija/SVG Files
  - removes any existing files that would provoke a confirmation dialog
  - deletes non-printing layers
  - saves the SVG
  - restores the non-printing layers
  - resets the locked/visible status of non-printing layers

  - if artboardName is given, use it as extension & save normally
  - else save using artboards */

function saveSvg(doc){

  var layerInfo = deleteNonPrintingLayers(doc) // info about locked & visible
  var replaceVB = false

  //———————————————————————————————— "SYNC/SVIJA/SVG Files"

  var svgFilesPath = getSvgFilesPath(doc) // string
  var diskObject = Folder(svgFilesPath)

  //———————————————————————————————— avoid overwrite confirmations

  for (x=0; x<doc.artboards.length; x++){
    var path = concatenatePath(svgFilesPath, makeSvgName(doc, x))
    if (File(path).exists){
      File(path).remove()
    }
  }

  //———————————————————————————————— create different obj if single artboard

  if (doc.artboards.length == 1){
    var path = concatenatePath(svgFilesPath, svgNameSingleArtboard(doc))
    diskObject = new File(path)
  }

  /*———————————————————————————————— add marker rectangle to find artboard */


  var markerAdded = false

  if (doc.artboards.length == 1){
    app.activeDocument.rulerOrigin = [0,doc.height]
    doc.layers.add()
    var rectDict = rectAt00()
    var markerAdded = true
  }

  /*———————————————————————————————— export SVG files */

  var svgOpts = svgOptions(doc)
  doc.exportFile(diskObject, ExportType.WOSVG, svgOpts) 

  /*———————————————————————————————— is single artboard: get viewBox size */

  if (doc.artboards.length == 1){
    replaceVB = true
    var ab = doc.artboards[0].artboardRect  // left, top, right, bottom

    var w = ab[2] - ab [0] // right - left
    var l = ab[1] - ab [3] // top - bottom

    var viewBox =  w + ' ' + l
  }

  /*———————————————————————————————— get SVG contents

  we will need to update the viewBox coordinates after saving */

  var tries = 500

  if (replaceVB){
    while (tries > 0 && !diskObject.open("r"))
      tries -= 1

    if (tries > 0){
      var svgSource = diskObject.read()
      diskObject.close()
    }
    else{
      alert('Temporary Error\nPlease add a second artboard and re-save.')
      svgSource = ''
    }
  }

  /*———————————————————————————————— get viewPort correction

  <rect id="COORDS00" class="cls-1" x="63" y="50.431" width="100" height="100"/>

  if there is nothing above or to the left, there will be no x or y coords */

  if (replaceVB && svgSource != ''){
    var parts = svgSource.split('COORDS00')

    var pieces = parts[1].split('x="')

    if (pieces.length > 1){ // else no need to modify viewBox
      var bits   = pieces[1].split('"')
      var x = bits[0]
      var y = bits[2]
      viewBox = 'viewBox="' + x + ' ' + y + ' ' + viewBox
    }
    else replaceVB = false
  }

  /*———————————————————————————————— replace viewBox in SVG source */

  if (replaceVB && svgSource != ''){
    var parts = svgSource.split('viewBox="')
    var dims  = parts[1].split('"', 1)[0]

    parts[1]  = parts[1].substr(dims.length, parts[1].length-1)
    svgSource = parts[0] + viewBox + parts[1]

    diskObject.open("w")
    diskObject.write(svgSource)
    diskObject.close()
  }

  //———————————————————————————————— remove coords box

  if (markerAdded) app.undo()

  //———————————————————————————————— restore to original state
  
  while (doc.layers.length<layerInfo.length)
    app.undo()

  //———————————————————————————————— restore non-printing layer states

  for (var r=0; r<layerInfo.length; r++){
    if (layerInfo[r] == 1 || layerInfo[r] == 3){doc.layers[r].locked  = true }
    if (layerInfo[r] == 2 || layerInfo[r] == 3){doc.layers[r].visible = false}
  }

  /*———————————————————————————————— get file sizes */

  var sizes = []

  for (x=0; x<doc.artboards.length; x++){

    var path = concatenatePath(svgFilesPath, makeSvgName(doc, x))

    path = encodeURI(path)
    var fileSize = File(path).length

    sizes.push(doc.artboards[x].name)
    sizes.push(fileSize)
  }


  return sizes
}

/*———————————————————————————————————————— svgOptions(includeCanvas)

  sets options for SVG file */

function svgOptions(doc){

  var options= new ExportOptionsWebOptimizedSVG()

  if (doc.artboards.length == 1)
    options.saveMultipleArtboards = false;                       // Preserves all artwork outside active artboard
  else
    options.saveMultipleArtboards = true;                        // Deletes all artwork outside active artboard

  options.artboardRange         = '' // or '1-3'
  options.coordinatePrecision   = 3
  options.cssProperties         = SVGCSSPropertyLocation.STYLEELEMENTS
  options.fontSubsetting        = SVGFontSubsetting.None                         ///////////////////// probably not supported
  options.fontType              = SVGFontType.SVGFONT
//options.fontType              = SVGFontType.OUTLINEFONT
  options.rasterImageLocation   = RasterImageLocation.PRESERVE
  options.svgId                 = SVGIdType.SVGIDREGULAR
  options.svgMinify             = false // should use in future
  options.svgResponsive         = true

  return options;
}

/*———————————————————————————————————————— finalFeedback(fileSizes)

    alert with:
    - elapsed time
    - errors (files not saved)
    - warnings (files saved) */

function finalFeedback(fileSizes){
  count = fileSizes.length

  var d = new Date();
  var ms = d.getTime() - env_start_ms

  if (ms > 1000)
    ms =' (' + ms/1000 +' sec)';
  else
    ms = ' (' + ms + ' ms)';

  switch(count){
    case  0: var title = 'File(s) Not Saved';  break;
    case  1: var title = 'File Saved' + ms;    break;
    default: var title = count + ' Files Saved' + ms;
  }

  var body = '';

  if (fileSizes.length == 1)
    body += '\n' + fileSizeReport(fileSizes)

  if (env_errs.length > 0)
    body += '\n' + env_errs.join('\n');
  
  if (env_warn.length > 0)
    body += '\n' + env_warn.join('\n');

  alert(title + body);
  return true;
}


//:::::::::::::::::::::::::::::::::::::::: validity functions

/*———————————————————————————————————————— isValid(doc) VERIFIED

    three possible results:
    • everything's fine                 return true
    • warning message, proceed anyway   return true
    • error message, skip this file     return false

    env_errs = []                   // error messages for user
    env_warn = [];                   // warnings for user

    errors:
    • file was not yet saved, user refuses to save */

function isValid(doc){
  var err, warn;

//———————————————————— fatal errors

  err = hasPath(doc);           // has file been saved at least once?
  if (err != '')
    return dontSave(err);

  err = isAi(doc);              // is it an AI file?
  if (err != '')
    return dontSave(err);

  err = hasFolders(doc);        // is file in a /SYNC/ folder?
  if (err != '')
    return dontSave(err);

//———————————————————— non fatal errors

  err = hasLinks(doc);           // is there a Links folder?
  if (err != '')
    env_warn.push(err);

  err = hasNonNative(doc);       // are there non-native items?
  if (err != '')
    env_warn.push(err);

  err = hasEmbedded(doc);        // are there embedded images?
  if (err != '')
    env_warn.push(err);

  err = hasPlaced(doc);          // are there placed images not in Links?
  if (err != '')
    env_warn.push(err);


  return true;
}

/*———————————————————————————————————————— isAi(doc)

    just checks if file is a .ai and not a PDF
    or SVG or whatever */

function isAi(doc){
  var fileExt  = doc.name.slice(-3);

  if (fileExt != '.ai')
    return 'File ' + doc.name + ' is not a .ai file and was not saved';

  return '';
}

/*———————————————————————————————————————— hasFolders(sourceDoc) VERIFIED

    checks for a SYNC folder first
    checks for an SVG Files folder second

    returns '' or error message */

function hasFolders(doc){

  if (getSyncPath(doc) == '')
    return doc.name + ' is not inside a \"SYNC\" folder'

  if (getSvgFilesPath(doc) == '')
    return '"SYNC/SVIJA/SVG Files" not found'

  return ''
}

/*———————————————————————————————————————— hasLinks(sourceDoc)

    tests for existence of /Links folder */

function hasLinks(doc){

  var linksFolder = getLinksPath(doc) 

  if (!Folder(path).exists) return doc.name + ' has no \"Links\" folder'
  else                      return ''
}

/*———————————————————————————————————————— hasNonNative(sourceDoc)

    has file been saved at least once?
    returns '' or error message */

function hasNonNative(doc){
  if (doc.nonNativeItems.length > 0)
    return doc.name + ' contains non-native items (see "Appearance" panel)';
  else
    return '';
}

/*———————————————————————————————————————— hasEmbedded(sourceDoc)

    has file been saved at least once?
    returns '' or error message */

function hasEmbedded(doc){
  if (doc.rasterItems.length > 0)
    return doc.name + ' contains embedded images. Please run "Check & Repair"';
  else
    return '';
}

/*———————————————————————————————————————— hasPlaced(sourceDoc)

    has file been saved at least once?
    returns '' or error message */

function hasPlaced(doc){
  if (doc.placedItems.length == 0) return '';

  var linksPath = getLinksPath(doc)  // ~/Desktop/svija.dev/SYNC/Links/

  for (var x=0; x<doc.placedItems.length; x++){

    var img = doc.placedItems[0];
    if (!img.layer.printable) continue;

    try{
      var imgPath = String(img.file.fsName); // ~/Captures/capture%2029.jpg
    }
    catch(e){
      return doc.name + ' contains an image with no source. Please run "Check & Repair"';
    }

    // if image path is shorter, image can't be in Links folder
    if (imgPath.length < linksPath.length+4) 
      return doc.name + ' contains external images. Please run "Check & Repair"';

    // if image path doesn't match doc path, it can't be in links folder
    var str = imgPath.slice(0, linksPath.length);

    if (str != linksPath)
      return doc.name + ' contains external images. Please run "Check & Repair"';

    // if what's longer than doc path contains a /, it's in some subfolder
    var str = imgPath.slice(linksPath.length, imgPath.length);
    if (str.indexOf('/') > 0 || str.indexOf('\\') > 0)
      return doc.name + ' contains external images. Please run "Check & Repair"';
  }

  return '';
}


//:::::::::::::::::::::::::::::::::::::::: other functions

//  rec.opacity = 100 returns name not dict

/*———————————————————————————————————————— rectAt00(obj)

    create rectangle at 0,0 coords to be able to
    reset the artboard */ 



function rectAt00(){
  var recName = 'COORDS00'
  var alertColor = new RGBColor()
  alertColor.red = 192; alertColor.green = 255; alertColor.blue = 0
  
  var rLeft   = 0
  var rNegTop = 0
  var rWidth  = 100
  var rHeight = 100

  // unlock activeLayer

  var lock = app.activeDocument.activeLayer.locked
  var vis  = app.activeDocument.activeLayer.visible

  // isg81 -top, left, width, height
  var rec = app.activeDocument.pathItems.rectangle( rNegTop, rLeft, rWidth, rHeight )

  rec.filled = true
  rec.stroked = false
  rec.fillColor = alertColor
  rec.opacity = 0
  rec.name = recName
  
//var returnDict = {'locked':lock, 'visible':vis, 'name':recName}
  return rec.name
}

/*———————————————————————————————————————— deleteNonPrintingLayers(src)

  delete any layers that are not printable
  returns array with locked & visible status of deleted layers */

function deleteNonPrintingLayers(src){
  var layersLen = src.layers.length;
  var results = new Array(layersLen);

  for (z=layersLen-1; z>=0; z--){
    results[z] = 0;
    if (!src.layers[z].printable){

      if (src.layers[z].locked){
        results[z] += 1;
        src.layers[z].locked  = false;
      }

      if (!src.layers[z].visible){ // Error 9021: Trying to delete hidden layer [layer name]
        results[z] += 2;
        src.layers[z].visible = true;
      }

      src.layers[z].remove();
    }
  }

  return results;
}

/*———————————————————————————————————————— dontSave(err)

    permits deleting braces in function isValid */

function dontSave(err){
  env_errs.push(err);
  return false;
}

/*———————————————————————————————————————— fileSizeReport(fileSizes)

    returns a text snippet with file sizes */

function fileSizeReport(fileSizes){

  var thisFile = fileSizes[0]

  var aiName = thisFile[0]
  var aiSize = makeMb(thisFile[1])
  var report

  var svgSizes = []

  for (var y=2; y<thisFile.length; y+=2){
    var artbName = thisFile[y]
    var svgSize = makeMb(thisFile[y+1])
    svgSizes.push(artbName+' page '+svgSize)
  }

  report  = svgSizes.join('\n')
  report += '\nIllustrator file '+aiSize

  return report

}


//:::::::::::::::::::::::::::::::::::::::: fin

