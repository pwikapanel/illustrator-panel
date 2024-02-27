
//:::::::::::::::::::::::::::::::::::::::: save-page.jsx

/*———————————————————————————————————————— notes 

    save-page.jsx

    1.0.3

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

    svija.com · hello@svija.com   */


/* kerning

ExportOptionsSVG.sVGAutoKerning¶

exportOptionsSVG.sVGAutoKerning

Description

If true, SVG automatic kerning is allowed in the file. Default: false.

Type

Boolean.

*/

//:::::::::::::::::::::::::::::::::::::::: program

/*———————————————————————————————————————— savePage(saveAllDocs)

// https://stackoverflow.com/questions/40084490/adobe-illustrator-script-save-as-copy */

#target illustrator  

function savePage(saveAllDocs){

  if (app.documents.length < 1) return('')

  // initialization ——————————————————————————————————————————————————————————

  var    restoreDoc = app.activeDocument    // active document to be restored

  var             d = new Date()            // to calculate time required
  var  env_start_ms = d.getTime() 

  var    errorArray = []                    // error messages to return
  var  warningArray = []                    // warnings tor return

  var     docsArray = app.documents         // array of open documents
  var      openDocs = docsArray.length      // number of open documents
  
  var fileSizeArray = []                    // sizes of saved files, two-
                                            // value arrays: size, name
  // main loop  ——————————————————————————————————————————————————————————————

  for (var index=0; index<openDocs; index++){
  
    app.activeDocument = docsArray[index]    // bring next doc forward
    var doc            = app.activeDocument  // simplify treatment
  
    // determine if there fatal errors ———————————————————————————————————————

    var validity = checkValidity(doc)
    if (validity.warnMsg != '') warningArray.push(validity.warnMsg)
    if (validity.errMsg  != '') errorArray.push(validity.errMsg)

    // treat active file if not fatal ————————————————————————————————————————

    if (!validity.fatal)
      var fileSizeArray = saveSvgs(doc) 

    if (!saveAllDocs) break 
  }

  // restore frontmost doc and alert user ————————————————————————————————————
  
  if (saveAllDocs) app.activeDocument = restoreDoc 

  return finalFeedback(fileSizeArray, env_start_ms, errorArray, warningArray) 


}


/*———————————————————————————————————————— saveSvgs(doc)

  saves file as SVG:

  - saves in sync/SVIJA/SVG Files
  - removes any existing files that would provoke a confirmation dialog
  - adds a layer if there's only one layer
  - deletes non-printing layers
  - saves the SVG
  - restores the non-printing layers
  - deletes any extra added layers
  - resets the locked/visible status of non-printing layers

  - if artboardName is given, use it as extension & save normally
  - else save using artboards

  - if only one artboard, don't "save using artboards"
    because we need to keep artwork that's outside the artbaords

  in testing, saving the illustrator file before saving the SVG's added
  0.266 seconds to the overall save time, so the effect is negligible
  compared to the utility of being able to undo to get back to the
  original state */

function saveSvgs(doc){

  var artboards       = doc.artboards
  var artboardsLength = doc.artboards.length
  var artboardState   = doc.artboards.getActiveArtboardIndex();
  var fileSizeArray   = []

  // save AI file ————————————————————————————————————————————————————————————

  // necessary to uncheck PDF compatibility and compression
  // it's not faster to "save" than to "save as"

  var aiOptions = newAiOptions();
  var aiFile  = new File(doc.path + '/' + doc.name);

  doc.saveAs(aiFile, aiOptions);

  // add widths to artboard names ————————————————————————————————————————————

  addArtboardWidths(doc)

  // delete unused layers ————————————————————————————————————————————————————

  var layerStates = deleteTemplateLayers(doc); // info about locked & visible

  if (doc.layers.length == 1){   // necessary so that resulting SVG
     doc.layers.add();           // won't have wrong ID
     var extraLayer = true;
  }
  else var extraLayer = false;

  // create destination file objects —————————————————————————————————————————

  var wholePath  = String(app.activeDocument.path)
  var syncIndex  = wholePath.indexOf('/sync')
  var svgFolder  = wholePath.substr(0, syncIndex) + '/sync/SVIJA/SVG%20files'
 
  var folderObj       = Folder(svgFolder)
  var fileObjSingle   = Folder(svgFolder + '/artboard_' + doc.artboards[0].name)
  var fileObjMultiple = Folder(svgFolder + '/artboard')

  // save actual SVGs ———————————————————————————————————————————————————————

  clearConflicts(folderObj, artboards) // BROKEN

  var svgOptions       = newSvgOptions();

  if (artboardsLength > 1){
    svgOptions.saveMultipleArtboards = true;
    doc.exportFile(fileObjMultiple, ExportType.SVG, svgOptions);
  }
  else{
    svgOptions.saveMultipleArtboards = false;
    doc.exportFile(fileObjSingle, ExportType.SVG, svgOptions);
  }

  // get file sizes ——————————————————————————————————————————————————————————

  fileSizeArray = getFileSizes(svgFolder, doc)

  // undo changes & resave as AI —————————————————————————————————————————————

  // necessary to re-establish as AI file after SVG

  while (!doc.saved) app.undo()

  app.undo() // necessary to remove artboard name changes
             // while loop stops 1 too soon

  doc.saveAs(aiFile, aiOptions);
  doc.artboards.setActiveArtboardIndex(artboardState)


  return fileSizeArray

}

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


//:::::::::::::::::::::::::::::::::::::::: main functions

/*———————————————————————————————————————— getFileSizes(doc)

    can't do at save time; all artboards are saved at once

    doc = open document, file = file on disk */

function getFileSizes(svgFolder, doc){

  var fileSizes = []

  for (x=0; x<doc.artboards.length; x++){
    var artboard = doc.artboards[x]
    var name     = svgFolder +'/artboard_' + artboard.name + '.svg'
    var fileObj  = File(name)

    var artboardName = artboard.name
    var underscore   = artboardName.lastIndexOf('_')
    artboardName     = artboardName.substr(0, underscore)

    fileSizes.push(artboardName)
    fileSizes.push(fileObj.length)
  }

  return fileSizes
}

/*———————————————————————————————————————— clearConflicts(artboards)

    creates files at new addresses then deletes them
    to avoid overwrite confirmation dialogs */

function clearConflicts(destFolder, artboards){
  for (x=0; x<artboards.length; x++){
    var name = 'artboard_' + artboards[x].name + '.svg'
    var file = newFile(destFolder, name);
    file.remove();
  }
}

/*———————————————————————————————————————— checkValidity(doc)

    returns:

    - boolean continue to save
    - warning message
    - error message   */

function checkValidity(doc){

  var err, warn;

  err = hasPath(doc);           // has file been saved at least once?
  if (err != '')
    return {fatal:true, warnMsg: '', errMsg:err}

  err = isAi(doc);              // has file been saved at least once?
  if (err != '')
    return {fatal:true, warnMsg: '', errMsg:err}

  err = hasFolders(doc);        // is file in a /sync/ folder?
  if (err != '')
    return {fatal:true, warnMsg: '', errMsg:err}

  err = hasLinks(doc);           // is there a Links folder?
  if (err != '')
    return {fatal:false, warnMsg: err, errMsg:''}

  err = hasNonNative(doc);       // are there non-native items?
  if (err != '')
    return {fatal:false, warnMsg: err, errMsg:''}

  err = hasEmbedded(doc);        // are there embedded images?
  if (err != '')
    return {fatal:false, warnMsg: err, errMsg:''}

  err = hasPlaced(doc);          // are there placed images not in Links?
  if (err != '')
    return {fatal:false, warnMsg: err, errMsg:''}

  return {fatal:false, warnMsg: '', errMsg: ''}
}

/*———————————————————————————————————————— checkValidity(doc) PREVIOUS

    three possible results:
    • everything's fine                 return true
    • warning message, proceed anyway   return true
    • error message, skip this file     return false

    errorArray = [];                   // error messages for user
    warningArray = [];                   // warnings for user

    errors:
    • file was not yet saved, user refuses to save */

function XcheckValidity(doc, errorArray, warningArray){

  var err, warn;

  err = hasPath(doc);           // has file been saved at least once?
  if (err != '')
    return dontSave(err, errorArray);

  err = isAi(doc);              // has file been saved at least once?
  if (err != '')
    return dontSave(err, errorArray);

  err = hasFolders(doc);        // is file in a /sync/ folder?
  if (err != '')
    return dontSave(err, errorArray);

  err = hasLinks(doc);           // is there a Links folder?
  if (err != '')
    warningArray.push(err);

  err = hasNonNative(doc);       // are there non-native items?
  if (err != '')
    warningArray.push(err);

  err = hasEmbedded(doc);        // are there embedded images?
  if (err != '')
    warningArray.push(err);

  err = hasPlaced(doc);          // are there placed images not in Links?
  if (err != '')
    warningArray.push(err);

  return true;
}

/*———————————————————————————————————————— finalFeedback(fileSizeArray)

    alert with:
    - elapsed time
    - errors (files not saved)
    - warnings (files saved) */

function finalFeedback(fileSizeArray,env_start_ms, errorArray, warningArray){

  var body  = '';
  var count = fileSizeArray.length

  var d = new Date();
  var ms = '(' + (d.getTime()-env_start_ms) + ' ms)';

  switch(count){
    case  0: var title = ' fichier(s) Pas Sauvegardés';  break;
    case  1: var title = ' fichier sauvegardé' + ms;    break;
    default: var title = count + ' fichiers sauvegardés' + ms;
  }

  if (fileSizeArray.length > 0)
    body += '\n' + fileSizeReport(fileSizeArray)

  return ' ' + title + '\n' + body
}

/*———————————————————————————————————————— hasEmbeds(doc)

    embedded images will be re-linked, converting
    them to placed images (if possible) */

function hasEmbeds(doc){

  var l = doc.fixEmbeddedImages.length;
  var fixes = [];  

  for (var x = l; x > 0; x--){

    var val = relink(doc.fixEmbeddedImages[x-1]); // val = array // returns false if non-printing layer
    if (val != false) fixes.push(val);

  }

  // prepare messages
  for (var x=0; x<fixes.length; x++){
  
    var skip = false;

    for (var y=0; y<names.length; y++)
      if (fixes[x][0] == names[y]) skip = true;

    if(skip) continue; 
  
    if (fixes[x][1]) fixed.push(fixes[x][0] + ' ' + fixes[x][2]);
    else failed.push(fixes[x][0] + ' ' + fixes[x][2]);
  }
 
}

/*———————————————————————————————————————— hasPlaced(sourceDoc)

    has file been saved at least once?
    returns '' or error message */

function hasPlaced(doc){
  if (doc.placedItems.length == 0) return '';

  var linksPath = String(doc.path) + '/Links/';  // ~/Desktop/svija.dev/sync/Links/

  for (var x=0; x<doc.placedItems.length; x++){

    var img = doc.placedItems[0];
    if (!img.layer.printable) continue;

    try{
      var imgPath = String(img.file); // ~/Captures/capture%2029.jpg
    }
    catch(e){
      return doc.name + ' contains an image with no source — please run "Check & Repair"';
    }

    // if image path is shorter, image can't be in Links folder
    if (imgPath.length < linksPath.length+4) 
      return doc.name + ' contains external image(s) — please run "Check & Repair"';

    // if image path doesn't match doc path, it can't be in links folder
    var str = imgPath.slice(0, linksPath.length);
    if (str != linksPath)
      return doc.name + ' contains external image(s) — please run "Check & Repair"';

    // if what's longer than doc path contains a /, it's in some subfolder
    var str = imgPath.slice(linksPath.length, imgPath.length);
    if (str.indexOf('/') > 0)
      return doc.name + ' contains external image(s) — please run "Check & Repair"';
  }

  return '';
}

/*———————————————————————————————————————— newSvgOptions(artboardsLength)

  sets options for SVG file */

function newSvgOptions(){

  var options = new ExportOptionsSVG();

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

/*———————————————————————————————————————— deleteTemplateLayers(src)

  delete any layers that are not printable and
  returns array with locked & visible status of deleted layers

  permits undo-ing to get layers back then making them visible/locked
  as they were before the operation

  array is same length as all doc layers (we don't skip layers we keep)

  so the index in the array will permit finding the correct layer by
  index later on to restore it */

function deleteTemplateLayers(src){

  var layersLen = src.layers.length
  var results = new Array(layersLen)

  for (z=layersLen-1; z>=0; z--){

    results[z]           = {}
    results[z].locked    = null
    results[z].visible   = null

    if (!src.layers[z].printable){

      if (src.layers[z].locked){
        results[z].locked    = true
        src.layers[z].locked = false
      }

      if (!src.layers[z].visible){
        results[z].visible    = false
        src.layers[z].visible = true
      }

      src.layers[z].remove()
    }
  }

  return results
}

/*———————————————————————————————————————— addArtboardWidths(doc)

    adds _300 to artboard name (where 300 is width of artboard) */

function addArtboardWidths(doc){
  for (x=0; x<doc.artboards.length; x++){
    var artboard = doc.artboards[x]
    var width    = artboardWidth(artboard)
    var name     = artboard.name + '_' + width

    artboard.name = name
  }
}

/*———————————————————————————————————————— clearArtboardWidths(doc)

    removes _300 from artboard name (where 300 is width of artboard) */

function clearArtboardWidths(doc){
  for (x=0; x<doc.artboards.length; x++){
    var artboard = doc.artboards[x]
    var width    = artboardWidth(artboard)
    var name     = artboard.name.replace('_' + width, '')

    artboard.name = name
  }
}


//:::::::::::::::::::::::::::::::::::::::: utility functions

/*———————————————————————————————————————— artboardWidth(doc.artboards[x])

    returns the width of an artboard */

function artboardWidth(artboard){
  var thisRect = artboard.artboardRect
  return thisRect[2] - thisRect[0]
}

/*———————————————————————————————————————— newAiOptions()

  options for Illustrator File
  ISG409 & JSRp84 */

function newAiOptions(){

  var options = new IllustratorSaveOptions();

  options.pdfCompatible = false; // much faster
  options.compressed    = false; // a bit faster

  return options;
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

/*———————————————————————————————————————— dontSave(err)

    permits not having to use braces after "if"s in function checkValidity */

function dontSave(err, errorArray){
  errorArray.push(err);
  return false;
}

/*———————————————————————————————————————— hasEmbedded(sourceDoc)

    does file contain raster items?
    returns '' or error message */

function hasEmbedded(doc){
  if (doc.rasterItems.length > 0)
    return doc.name + ' contains embedded images. Please run "Check & Repair"';
  else
    return '';
}

/*———————————————————————————————————————— hasPath(sourceDoc)

    has file been saved at least once?
    returns '' or error message */

function hasPath(doc){
  if (doc.path != '') return '';

  var f = new File(getSync()).saveDlg('','');

  if (f == null)
    return 'File ' + doc.name + ' was not saved';

  app.activeDocument.saveAs(f, undefined);
  return '';
    
}

/*———————————————————————————————————————— getSync() NEEDS UPDATING FOR PC

    used when saving an unsaved document — tries to
    find a sync folder from other open documents */

function getSync(){
  for(var x=1; x<app.documents.length; x++){
    var docPath = String(app.documents[x].path);
    if (docPath.indexOf('/sync') > 0) return docPath + '/Page Name.ai';
  }
  return '~/Documents/Page Name.ai';
}

/*———————————————————————————————————————— hasNonNative(sourceDoc)

    does file contain non-native artwork?
    returns '' or error message */

function hasNonNative(doc){
  if (doc.nonNativeItems.length > 0)
    return doc.name + ' contains non-native items (see "Appearance" panel)';
  else
    return '';
}

/*———————————————————————————————————————— hasLinks(sourceDoc)

    is there a Links folder available?
    returns '' or error message */

function hasLinks(doc){

  var linksFolder = Folder(app.activeDocument.path + '/Links');

  if (!Folder(linksFolder).exists)
    return doc.name + ' has no \"Links\" folder';
  else
    return '';
}

/*———————————————————————————————————————— hasFolders(sourceDoc)

    is file inside a /sync/ folder?
    does the SVG Files folder exist?
    returns '' or error message */

function hasFolders(doc){

  var folderPath = String(app.activeDocument.path);
  var syncIndex = folderPath.indexOf('/sync');

  if (syncIndex < 0) return doc.name + ' is not inside a \"sync\" folder and was not saved';

  folderPath = folderPath.substr(0,syncIndex) + '/sync/SVIJA/SVG%20files';

  var destFolder = Folder(folderPath);
  if(!destFolder.exists)
    return doc.name + ' was not saved ("sync/SVIJA/SVG Files" missing)';

  return '';
}

/*———————————————————————————————————————— fileSizeReport(fileSizeArray)

    returns a text snippet with file sizes
    for the report to the user at end  */

function fileSizeReport(fileSizeArray){

/* ~/Desktop/example.svija.site/sync/SVIJA/SVG%20files/artboard_wtfcomputer_1680.svg,78530
   ~/Desktop/example.svija.site/sync/SVIJA/SVG%20files/artboard_wtf mobile_3030.svg,78427   */

  var report
  var svgSizes = []

  for (var y=0; y<fileSizeArray.length; y+=2){
    var artboard = fileSizeArray[y]
//  var svgSize = fileSizeArray[y+1]
    var svgSize = addMb(fileSizeArray[y+1])
    svgSizes.push(' '+artboard+' page '+svgSize)
  }

  report  = svgSizes.join('\n')

  return report

}


//:::::::::::::::::::::::::::::::::::::::: fin

/*———————————————————————————————————————— appendix A — all doc keys

  var res = '';
  for (var i in doc){
    try{
      res += '\n'+i+': '+doc[i].typename;
    }
    catch(e){
      res += '\n'+i+': error';
    }
  }
  alert(res);

XMPString: undefined
activeDataSet: error
activeLayer: Layer
activeView: View
artboards: Artboards
assets: Assets
brushes: Brushes
characterStyles: CharacterStyles
cloudPath: error
colorProfileName: undefined
compoundPathItems: CompoundPathItems
cropBox: undefined
cropStyle: CropOptions.Standard
dataSets: DataSets
defaultFillColor: RGBColor
defaultFillOverprint: undefined
defaultFilled: undefined
defaultStrokeCap: StrokeCap.BUTTENDCAP
defaultStrokeColor: NoColor
defaultStrokeDashOffset: undefined
defaultStrokeDashes: undefined
defaultStrokeJoin: StrokeJoin.MITERENDJOIN
defaultStrokeMiterLimit: undefined
defaultStrokeOverprint: undefined
defaultStrokeWidth: undefined
defaultStroked: undefined
documentColorSpace: DocumentColorSpace.RGB
embeddedItems: EmbeddedItems
fullName: undefined
geometricBounds: undefined
gradients: Gradients
graphItems: GraphItems
graphicStyles: GraphicStyles
gridRepeatItems: GridRepeatItems
groupItems: GroupItems
height: undefined
inkList: undefined
isCloudDocument: undefined
kinsokuSet: undefined
layers: Layers
legacyTextItems: LegacyTextItems
listStyles: ListStyles
meshItems: MeshItems
mojikumiSet: undefined
name: undefined
nonNativeItems: NonNativeItems
outputResolution: undefined
pageItems: PageItems
pageOrigin: undefined
paragraphStyles: ParagraphStyles
parent: Application
path: undefined
pathItems: PathItems
patterns: Patterns
placedItems: PlacedItems
pluginItems: PluginItems
printTiles: undefined
radialRepeatItems: RadialRepeatItems
rasterEffectSettings: RasterEffectOptions
rasterItems: RasterItems
rulerOrigin: undefined
rulerUnits: RulerUnits.Picas
saved: undefined
scaleFactor: undefined
selection: undefined
showPlacedImages: undefined
splitLongPaths: undefined
spots: Spots
stationery: undefined
stories: Stories
swatchGroups: SwatchGroups
swatches: Swatches
symbolItems: SymbolItems
symbols: Symbols
symmetryRepeatItems: SymmetryRepeatItems
tags: Tags
textFrames: TextFrames
tileFullPages: undefined
typename: undefined
useDefaultScreen: undefined
variables: Variables
variablesLocked: undefined
views: Views
visibleBounds: undefined
width: undefined */
