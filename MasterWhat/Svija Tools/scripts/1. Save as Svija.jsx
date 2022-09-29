#target illustrator  

/*———————————————————————————————————————— 1. Save as Svija.jsx

    1. Save as Svija — ⌘ F1.jsx

    1.0.3

    notes:

    JSR = JavaScript Scripting Reference.pdf
    ISG = Illustrator Scripting Guide
    using ampersands in // comments causes crashes

/*———————————————————————————————————————— copyright

    (c) 2021 Svija SAS
    All Rights Reserved
   
    NOTICE:  Svija permits you to use, modify, and distribute this file in
    accordance with the terms of the Svija license agreement accompanying it.
    If you have received this file from a source other than Svija, then your
    use, modification, or distribution of it requires the prior written
    permission of Svija.

    github.com/svijasvg/Presets-Scripts
    svija.love · contact@svija.love */


//:::::::::::::::::::::::::::::::::::::::: program

//———————————————————————————————————————— if run as standalone

if (typeof param == 'undefined'){

  var msgWhat = 'Save All Open Documents?\n' +
                'Click no to save only this document.';

  if (app.documents.length == 1)
    var param = 'save';
  else {
    if (confirm(msgWhat)) param = 'save all'
    else param = 'save';
  }
}

//———————————————————————————————————————— capture param

var _param = param;


//———————————————————————————————————————— ▼ begin program()

var program = new function(){ // can use "return" to quit at any time

//———————————————————————————————————————— initialization

var   execute = true;
var   appDocs = app.documents;
var  docsOpen = appDocs.length;
var activeDoc = app.activeDocument;
var aiOptions = optionsForVersion(0);
var         d = new Date();
var        ms = d.getTime();

//———————————————————————————————————————— check for unsupported techniques

var infringingDocs = [];

//———————————————————————————————— check all open docs

for (var index=0; index<docsOpen; index++){

  // ISG251: moves this doc to 0 in appDocs array
  app.activeDocument = appDocs[index];

  var sourceDoc = app.activeDocument;
  var testResults = checkForInfringement(sourceDoc);

  if (testResults.length>0)
    infringingDocs.push(testResults);

  if (_param=='save') break;
}

//———————————————————————————————— stop if infringing

if (infringingDocs.length > 0){

  var word = 'File contains';
  if (infringingDocs.length > 1) word = 'Files contain'
  
  var msg = 'Could Not Save\n' + word + ' embedded images:\n\n';
  for (var index=0; index<infringingDocs.length; index++){
    msg += infringingDocs[index][1] + '\n';
  }
  msg += '\nPlease click Relink Images in Svija Tools.';
  msg += '\n\nFor more information, visit tech.svija.love.';

  execute = false;
  app.activeDocument = activeDoc;
  alert(msg);
  return
}

//———————————————————————————————————————— loop through documents

var count = 0;

for (var index=0; index<docsOpen; index++){
  count += 1;

  // ISG251: moves this doc to 0 in appDocs array
  app.activeDocument = appDocs[index];

  var sourceDoc = app.activeDocument;

  //———————————————————————————————— store original path & active artboard

  var realPath    = sourceDoc.path + '/' + sourceDoc.name;
  var activeBoard = sourceDoc.artboards.getActiveArtboardIndex();

  //———————————————————————————————— save artboard SVG's then Illustrator file

  saveAsSvgs(sourceDoc);

  var aiFile = new File(realPath);
  sourceDoc.saveAs(aiFile, aiOptions);

  //———————————————————————————————— reset active artboard or close document

  sourceDoc.artboards.setActiveArtboardIndex(activeBoard);

  if (_param == 'close'){
    sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
    docsOpen -= 1;
    index -= 1;
  }

  //———————————————————————————————— close document list loop

  if (_param == 'save') break;


}

//———————————————————————————————————————— restore frontmost doc and alert user

if (_param != 'close') app.activeDocument = activeDoc;

if (count < 2) var msg = 'File saved.';
else var msg = 'Files saved.';

var d = new Date(); ms = d.getTime() - ms;
alert(msg + ' ('+ms+' ms)');

//———————————————————————————————————————— ▲ end program()

} // program()


//:::::::::::::::::::::::::::::::::::::::: main functions

/*———————————————————————————————————————— checkForInfringement(sourceDoc)

  checks for embedded images
  in the future will check for:
  - mesh
  - freeform gradients
  - layer blending modes
  - effect › stylize

  returns array [x, doc name, type of infringement] */

function checkForInfringement(sourceDoc){
  if (hasRasterImages(sourceDoc))
    return [1, sourceDoc.name, 2];
  else return [];
}

/*———————————————————————————————————————— saveAsSvgs(doc)

  saves file as SVG:

  - saves in sync/Svija/SVG Files
  - removes any existing files that would provoke a confirmation dialog
  - deletes non-printing layers
  - saves the SVG
  - restores the non-printing layers
  - resets the locked/visible status of non-printing layers */

function saveAsSvgs(doc){

  var destName   = doc.name.slice(0, -3);
  var boardsLen  = doc.artboards.length;
  var layersLen  = doc.layers.length;

  //———————————————————————————————— get save path

  var savePath = '' + app.activeDocument.path;
  var splitChar = savePath.indexOf('/sync');
  if (splitChar < 0) return false;

  savePath = savePath.substr(0,splitChar) + '/sync/Svija/SVG%20files';
  var folder = Folder(savePath);

  //———————————————————————————————— avoid overwrite confirmations

  for (j=0; j<boardsLen; j++){
    var name = destName + '_' + doc.artboards[j].name + '.svg';
    var file = newFile(folder, name);
    file.remove();
  }

  //———————————————————————————————— delete non-printing layers

  // array w/ information about locked & visible
  var backupLayers = deleteNonPrintingLayers(doc);

  //———————————————————————————————— save svg files

  var options  = getSvgOptions();
  doc.exportFile(folder, ExportType.SVG, options);

  //———————————————————————————————— restore to original state

  // restore layers
  while (doc.layers.length<layersLen) app.undo();

  // restore visibile & locked layer states
  for (var r=0; r<layersLen; r++){
    if (backupLayers[r] == 1 || backupLayers[r] == 3){doc.layers[r].locked  = true; }
    if (backupLayers[r] == 2 || backupLayers[r] == 3){doc.layers[r].visible = false;}
  }

  return true;
}


//:::::::::::::::::::::::::::::::::::::::: utility functions

/*———————————————————————————————————————— newFile(folder, name)

  returns file to save into
  https://extendscript.docsforadobe.dev */

function newFile(folder, name) {

//var folder = Folder(app.activeDocument.path);
  var newFile = new File(folder + '/' + name);

  // check access rights
  if (newFile.open("w")){ newFile.close(); }
  //else { throw new Error(access_is_denied); }
  else { alert('File missing — did you move it?'); }

  return newFile;
}

/*———————————————————————————————————————— getSvgOptions()

  sets options for SVG file */

function getSvgOptions(){

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
  options.saveMultipleArtboards = true;                          // Deletes all artwork outside active artboard
  options.slices = false;                                        // Include Slicing Data
  // options.sVGAutoKerning = true/false;
  options.sVGTextOnPath = false;                                 // Use <textpath> for Text on Path
  // options.typename

  // not available                                               // Output fewer <tspan> elements
  // not available                                               // Responsive

  return options;
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

/*———————————————————————————————————————— optionsForVersion(version)

  options for Illustrator File
  ISG409 & JSRp84 */

function optionsForVersion(version){

  var options = new IllustratorSaveOptions();

  if (version > 0) // JSRp244
    options.compatibility = Compatibility['ILLUSTRATOR' + version];

  options.pdfCompatible = false; // much faster
  options.compressed    = false; // a bit faster

  return options;
}

/*———————————————————————————————————————— hasRasterImages(doc)

  checks if document has any embedded images */

function hasRasterImages(doc){
  if (doc.rasterItems.length == 0) return false;
  else return true;
}


//:::::::::::::::::::::::::::::::::::::::: fin
