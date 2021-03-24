//———————————————————————————————————————— saveAsSvg.jsx

//    JSR = JavaScript Scripting Reference.pdf
//    ISG = Illustrator Scripting Guide
//    using ampersands in // comments causes crashes

//———————————————————————————————————————— program

var d = new Date(); var ms = d.getTime();
var activeDoc = app.activeDocument;
var aiOptions = st_optionsForVersion(17);
var appDocs   = app.documents;

for (index=0; index<app.documents.length; index++){

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
  if (arg == 'close') sourceDoc.close(SaveOptions.DONOTSAVECHANGES);

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

  //———————————————————————————————— delete unneeded layers

  // array w/ information about locked & visible
  var backupLayers = st_deleteNonPrintingLayers(doc);

  for (j=0; j<boardsLen; j++){
    doc.artboards.setActiveArtboardIndex(j);

    //———————————————————————————————— save svg file
    // need to take into account a single artboard

    var finalName = destName + '-' + doc.artboards[j].name + '.svg';
    var options  = st_getSvgOptions();
    var destFile = st_newFile(finalName);
    doc.exportFile(destFile, ExportType.SVG, options);

    //———————————————————————————————— restore to original state

    // restore layers
    while (doc.layers.length<layersLen) app.undo();

    // restore visibile & locked values
    for (var r=0; r<layersLen; r++){
      if (backupLayers[r] == 1 || backupLayers[r] == 3){doc.layers[r].locked  = true; }
      if (backupLayers[r] == 2 || backupLayers[r] == 3){doc.layers[r].visible = false;}
    }
  }

  return true;
}

//———————————————————————————————————————— returns file to save into

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
  // options.saveMultipleArtboards
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

function st_deleteNonPrintingLayers(sDoc){
  numLayers = sDoc.layers.length;
  var lyers = new Array(numLayers);

  for (z=numLayers-1; z>=0; z--){
    lyers[z] = 0;
    if (!sDoc.layers[z].printable){

      if (sDoc.layers[z].locked){
        lyers[z] += 1;
        sDoc.layers[z].locked  = false;
      }

      if (!sDoc.layers[z].visible){ // Error 9021: Trying to delete hidden layer [layer name]
        lyers[z] += 2;
        sDoc.layers[z].visible = true;
      }

      sDoc.layers[z].remove();
    }
  }

  return lyers;
}

//———————————————————————————————————————— options for Illustrator File
// ISG409

function st_optionsForVersion(v){

  var options = new IllustratorSaveOptions();          // JSRp84

  var comp = Compatibility['ILLUSTRATOR' + v]; // JSRp244
  if (v > 0) options.compatibility = comp;

  options.pdfCompatible = false; // much faster
  options.compressed = false;    // a bit faster

  return options;
}

//———————————————————————————————————————— fin
