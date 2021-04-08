#target illustrator  

/*———————————————————————————————————————— Save as Svija.jsx

    JSR = JavaScript Scripting Reference.pdf
    ISG = Illustrator Scripting Guide
    using ampersands in // comments causes crashes


    github.com/svijasvg/svija-tools
  
    version 2.1.23
  
    (c) 2021 Svija
    svija.love
    contact@svija.love

//———————————————————————————————————————— what it does

//———————————————————————————————————————— setup */

var appDocs   = app.documents;
var iters = app.documents.length;

//———————————————————————————————————————— if run as standalone */

var msgWhat = 'Save All Documents?\n' +
              'Press return to save all documents.\n\n' +
              'Type command-period to save this document only.';

if (typeof arg == 'undefined'){
  if (iters == 1) var arg = 'save';
  else {
    if (confirm(msgWhat)) arg = 'save all'
    else arg = 'save';
  }
}

//———————————————————————————————————————— program

var d = new Date(); var ms = d.getTime();
var activeDoc = app.activeDocument;
var aiOptions = st_optionsForVersion(17);

for (index=0; index<iters; index++){

  // moves the doc to place 0
  app.activeDocument = appDocs[index]; // ISG251
  var sourceDoc = app.activeDocument;   

  //———————————————————————————————— save state

  var realPath    = sourceDoc.path + '/' + sourceDoc.name;
  var activeBoard = sourceDoc.artboards.getActiveArtboardIndex();

  //———————————————————————————————— save SVG's then Illustrator

  st_saveAsSvgs(sourceDoc);
  var aiFile = new File(realPath);
  sourceDoc.saveAs(aiFile, aiOptions);

  //————— housekeeping after SVG export

  sourceDoc.artboards.setActiveArtboardIndex(activeBoard);

  if (arg == 'save') break;
  if (arg == 'close'){
    sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
    iters -= 1;
    index -= 1;
  }
}

if (arg != 'close') app.activeDocument = activeDoc;

var d = new Date(); ms = d.getTime() - ms;
if (index < 2) var msg = 'File saved.';
else var msg = 'Files saved.';
alert(msg + ' ('+ms+' ms)');

// — — — — — — — — — — — — — — — — — — — — functions — — — — — — — — —

//———————————————————————————————————————— save the actual SVG's

function st_saveAsSvgs(doc){

  var destName   = doc.name.slice(0, -3);
  var boardsLen  = doc.artboards.length;
  var layersLen  = doc.layers.length;

  //———————————————————————————————— avoid overwrite confirmations

  for (j=0; j<boardsLen; j++){
    var name = destName + '_' + doc.artboards[j].name + '.svg';
    var file = st_newFile(name);
    file.remove();
  }

  //———————————————————————————————— delete non-printing layers

  // array w/ information about locked & visible
  var backupLayers = st_deleteNonPrintingLayers(doc);

  //———————————————————————————————— save svg files

  var options  = st_getSvgOptions();
  var folder = Folder(app.activeDocument.path);
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

//———————————————————————————————————————— returns file to save into
// https://extendscript.docsforadobe.dev

function st_newFile(name) {

  var folder = Folder(app.activeDocument.path);
  var newFile = new File(folder + '/' + name);

  // check access rights
  if (newFile.open("w")){ newFile.close(); }
  else { throw new Error(access_is_denied); }

  return newFile;
}

//———————————————————————————————————————— options for SVG file

function st_getSvgOptions(){

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

//———————————————————————————————————————— delete any layers that are not printable
// returns array with information about locked & visible for deleted layers

function st_deleteNonPrintingLayers(src){
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

//———————————————————————————————————————— options for Illustrator File
// ISG409 & JSRp84

function st_optionsForVersion(version){

  var options = new IllustratorSaveOptions();

  if (version > 0) // JSRp244
    options.compatibility = Compatibility['ILLUSTRATOR' + version];

  options.pdfCompatible = false; // much faster
  options.compressed    = false; // a bit faster

  return options;
}

//———————————————————————————————————————— fin
