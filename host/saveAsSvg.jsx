//———————————————————————————————————————— saveAsSvg.jsx
// JSR = JavaScript Scripting Reference.pdf
// using ampersands in comments causes crashes

art = 'boo';
switch(arg) {
  case '1': task = 'save'; break;
  case '2': task = 'save all'; break;
  case '3': task = 'close & save all'; break;
  default: task = 'error'; break;
}

//———————————————————————————————————————— program

var aiVersion = 17;
var aiOptions = st_getAiOptions(aiVersion);

var docList  = [];

if (arg < 2) docList[0] = app.activeDocument;
else docList = app.documents;

for (x=0; x<docList.length; x++){
  var sourceDoc = docList[x];

  if (sourceDoc.artboards.length > 1) multipleArtboards = true;
  else multipleArtboards = false;

  var svgOptions = st_getSvgOptions(multipleArtboards);
  undos = st_deleteNonPrintingLayers(sourceDoc); // Can't use templates because it's scripting so we use non-printing
  st_saveSVGs(sourceDoc, svgOptions, multipleArtboards); // changes open file to .svg

  // undo changes & resave file as Ai
  for (y=0; y<undos; y++){ app.undo(); }
  sourceDoc.saveAs(sourceDoc.path, aiOptions);
}

//--    
//--  // because I'm saving multiple artboards, use folder not doc
//--  if (multipleArtboards)
//--    sourceDoc.exportFile(destFolder, ExportType.SVG, svgOptions);
//--  else {
//--    var destDoc   = this.getTargetFile(sourceDoc.name, '.svg', destFolder);
//--    sourceDoc.exportFile(destDoc, ExportType.SVG, svgOptions);
//--  }
//--
//--  sourceDoc.close(SaveOptions.DONOTSAVECHANGES);

// reopen all the closed files
// destFolder = decodeURIComponent(destFolder);
// 
// while (docList.length > 0){
//   filePath = docList.pop();
//   var newDoc = open(new File(filePath));
// }
var fb = 'done : undos='+undos;
alert(fb);

// — — — — — — — — — — — — — — — — — — — — functions — — — — — — — — — 
//  
//———————————————————————————————————————— save the actual SVG's

function st_saveSVGs(source, options, artboards){
  var destFolder = Folder(app.activeDocument.path);

  // because I'm saving multiple artboards, use folder not doc
  if (artboards)
    source.exportFile(destFolder, ExportType.SVG, options);
  else {
    var destDoc = this.getTargetFile(sourceDoc.name, '.svg', destFolder);
    sourceDoc.exportFile(destDoc, ExportType.SVG, svgOptions);
  }
}

//———————————————————————————————————————— options for Illustrator File
// 
// function st_getAiOptions(v){
// 
//   var options = new IllustratorSaveOptions();          // JSRp84
// 
//   var comp = Compatibility['ILLUSTRATOR' + aiVersion]; // JSRp244
//   if (v > 0) options.compatibility = comp;
// 
//   options.pdfCompatible = false; // much faster
//   options.compressed = false;    // a bit faster
// 
//   return options;
// }

//———————————————————————————————————————— options for SVG file

// JSRp61

function st_getSvgOptions(multipleArtboards){
  // Create the required options object
  var options = new ExportOptionsSVG();


  options.DTD = SVGDTDVersion.SVG1_1;                            // SVG Profiles
  options.fontType = SVGFontType.SVGFONT;                        // Fonts Type
  options.fontSubsetting = SVGFontSubsetting.None;               // Fonts Subsetting
  options.embedRasterImages = false;                             // Image Location Link
  options.preserveEditability = false;                           // Preserve Illustrator Editing Capabilities
  options.cssProperties = SVGCSSPropertyLocation.STYLEELEMENTS;  // CSS Properties: Style Elements
  options.includeUnusedStyles = false;                           // Include Unused Graphic Styles
  options.coordinatePrecision = 3;                               // Decimal Places
  options.documentEncoding = SVGDocumentEncoding.UTF8            // Encoding:
                                                                 // Output fewer <tspan> elements
  options.sVGTextOnPath = false;                                 // Use <textpath> for Text on Path
                                                                 // Responsive
  options.slices = false;                                        // Include Slicing Data
  options.includeFileInfo = false;                               // Include XMP
  options.saveMultipleArtboards = multipleArtboards;

// options.DTD = SVGDTDVersion.SVGTINY1_1;
// options.artboardRange
// options.compressed                                          // compressed ornot
// options.includeVariablesAndDatasets
// options.optimizeForSVGViewer
// options.sVGAutoKerning = true/false;
// options.typename
  
  return options;
}
//  
//  //———————————————————————————————————————— returns file to save into
//  
//   Returns the file to save or export the document into.
//    param docName the name of the document
//    param ext the extension the file extension to be applied
//    param destFolder the output folder
//    return File object
//  
//  
//  function getTargetFile(docName, ext, destFolder) {
//    var newName = "";
//  
//    // if name has no dot (and hence no extension),
//    // just append the extension
//    if (docName.indexOf('.') < 0) {
//      newName = docName + ext;
//    } else {
//      var dot = docName.lastIndexOf('.');
//      newName += docName.substring(0, dot);
//      newName += ext;
//    }
//    
//    // Create the file object to save to
//    var myFile = new File( destFolder + '/' + newName );
//    
//    // Preflight access rights
//    if (myFile.open("w")) {
//      myFile.close();
//    }
//    else {
//      throw new Error(access_is_denied);
//    }
//    return myFile;
//  }

//———————————————————————————————————————— delete any layers that are not printable

function st_deleteNonPrintingLayers(sourceDoc){
  var layers = sourceDoc.layers.length;
  var undos = 0;
  for (x=0; x<layers; x++){
    if (!sourceDoc.layers[x].printable){
      if (sourceDoc.layers[x].locked  == true ){ sourceDoc.layers[x].locked  = false; undos += 1; } 
      if (sourceDoc.layers[x].visible == false){ sourceDoc.layers[x].visible = true;  undos += 1; } // Error 9021: Trying to delete hidden layer [layer name]
      sourceDoc.layers[x].remove(); undos += 1;

      x -= 1;
      layers -= 1;
    }
  }
  return undos;
}

//———————————————————————————————————————— fin
