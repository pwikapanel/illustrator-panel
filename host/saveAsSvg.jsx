//———————————————————————————————————————— saveAsSvg.jsx

//    JSR = JavaScript Scripting Reference.pdf
//    ISG = Illustrator Scripting Guide
//    using ampersands in // comments causes crashes

//———————————————————————————————————————— program

//  if (app.documents.length > 0 ) {

var activeDoc = app.activeDocument;
var aiOptions = st_optionsForVersion(17);
var docList = app.documents;

for (x=0; x<app.documents.length; x++){

  var sourceDoc = docList[x]; // ISG251
  app.activeDocument = sourceDoc; // otherwise properties are not updated correctly

  var undos = st_deleteNonPrintingLayers(sourceDoc); 
  st_saveSvg(sourceDoc);

  for (y=0; y<undos; y++){ app.undo(); }
  sourceDoc.saveAs(sourceDoc.path, aiOptions);

  if (arg == 'save') x = 1000;
  if (arg == 'close') sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
}

if (arg != 'close') app.activeDocument = activeDoc;

var fb = 'done';
alert(fb);

// — — — — — — — — — — — — — — — — — — — — functions — — — — — — — — — 

//———————————————————————————————————————— save the actual SVG's

function st_saveSvg(source){

  if (source.artboards.length < 2){
    var options  = st_getSvgOptions(false, 1);
    var destName = source.name.replace(".ai", ".svg");
    var destFile = st_getTargetSvg(destName);
    source.exportFile(destFile, ExportType.SVG, options);
    return true;
  }

  alert(source.name + '\n multiple artboards coming soon');
  return true;
  var abRange    = 1;
  var options = st_getSvgOptions(multipleArtboards,abRange);
  //source.exportFile(destFolder, ExportType.SVG, options);
}

//———————————————————————————————————————— returns file to save into

//    Returns the file to save or export the document into.
//    param docName the name of the document
//    param ext the extension the file extension to be applied
//    param destFolder the output folder
//    return File object

function st_getTargetSvg(name) {

  var folder = Folder(app.activeDocument.path);
  var newFile = new File(folder + '/' + name);

  // check access rights
  if (newFile.open("w")){ newFile.close(); }
  else { throw new Error(access_is_denied); }

  return newFile;
}

//———————————————————————————————————————— options for SVG file
// accepts boolean multiple artboards · ISG 335

function st_getSvgOptions(m,ar){
  
  var options = new ExportOptionsSVG();

  options.artboardRange = ar;                                    // artboard range
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
  options.saveMultipleArtboards = m;
  options.slices = false;                                        // Include Slicing Data
  // options.sVGAutoKerning = true/false;
  options.sVGTextOnPath = false;                                 // Use <textpath> for Text on Path
  // options.typename

  // not available                                               // Output fewer <tspan> elements
  // not available                                               // Responsive

  return options;
}

//———————————————————————————————————————— delete any layers that are not printable

function st_deleteNonPrintingLayers(sDoc){
  var layers = sDoc.layers.length;
  var undos = 0;
  for (z=0; z<layers; z++){
    if (!sDoc.layers[z].printable){
      if (sDoc.layers[z].locked  == true ){ sDoc.layers[z].locked  = false; undos += 1; } 
      if (sDoc.layers[z].visible == false){ sDoc.layers[z].visible = true;  undos += 1; } // Error 9021: Trying to delete hidden layer [layer name]
      sDoc.layers[z].remove(); undos += 1;

      z -= 1;
      layers -= 1;
    }
  }
  return undos;
}

//———————————————————————————————————————— options for Illustrator File

function st_optionsForVersion(v){

  var options = new IllustratorSaveOptions();          // JSRp84

  var comp = Compatibility['ILLUSTRATOR' + v]; // JSRp244
  if (v > 0) options.compatibility = comp;

  options.pdfCompatible = false; // much faster
  options.compressed = false;    // a bit faster

  return options;
}

//———————————————————————————————————————— fin
