//———————————————————————————————————————— saveAsSvg.jsx
// JSR = JavaScript Scripting Reference.pdf

art = 'boo';
switch(arg) {
  case '1': task = 'save'; break;
  case '2': task = 'save all'; break;
  case '3': task = 'close & save all'; break;
  default: task = 'error'; break;
}

alert(task + "\nSaveAsSvg.jsx);

//———————————————————————————————————————— program

var aiVersion = 17;
var destFolder = Folder(app.activeDocument.path);
var docList  = [];
var aiOptions = getAiOptions(aiVersion);

while (app.documents.length > 0){
  var sourceDoc = app.activeDocument;
  docList.push(sourceDoc.path+ '/' + sourceDoc.name);

  if (sourceDoc.artboards.length > 1) multipleArtboards = true;
  else multipleArtboards = false;

  var svgOptions = getSvgOptions(multipleArtboards);

  app.activeDocument.saveAs(sourceDoc.path, aiOptions);
  
  // Can't use templates because it's scripting so we use non-printing
  deleteNonPrintingLayers(sourceDoc);
    
  // because I'm saving multiple artboards, use folder not doc
  if (multipleArtboards)
    sourceDoc.exportFile(destFolder, ExportType.SVG, svgOptions);
  else {
    var destDoc   = this.getTargetFile(sourceDoc.name, '.svg', destFolder);
    sourceDoc.exportFile(destDoc, ExportType.SVG, svgOptions);
  }

  sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
}

destFolder = decodeURIComponent(destFolder);

while (docList.length > 0){
  filePath = docList.pop();
  var newDoc = open(new File(filePath));
}

alert('files_saved');

// — — — — — — — — — — — — — — — — — — — — functions — — — — — — — — — 

//———————————————————————————————————————— options for Illustrator File

function getAiOptions(v){

  var options = new IllustratorSaveOptions();          // JSRp84

  var comp = Compatibility['ILLUSTRATOR' + aiVersion]; // JSRp244
  if (v > 0) options.compatibility = comp;

  options.pdfCompatible = false; // much faster
  options.compressed = false;    // a bit faster

  return options;
}

//———————————————————————————————————————— options for SVG file

// JavaScript Scripting Reference.pdf, page 61

function getSvgOptions(multipleArtboards){
  // Create the required options object
  var options = new ExportOptionsSVG();

  // alt-cmd-G 61 in the guide
  // For example, uncomment to set the compatibility of the generated svg to SVG Tiny 1.1  
  // options.DTD = SVGDTDVersion.SVGTINY1_1;



  options.DTD = SVGDTDVersion.SVG1_1;                            // SVG Profiles
  options.fontType = SVGFontType.SVGFONT;                        // Fonts Type
  options.fontSubsetting = SVGFontSubsetting.None;              // Fonts Subsetting
  options.embedRasterImages = false;                            // Image Location Link
  options.preserveEditability = false;                          // Preserve Illustrator Editing Capabilities
  options.cssProperties = SVGCSSPropertyLocation.STYLEELEMENTS;  // CSS Properties: Style Elements
  options.includeUnusedStyles = false;                          //  Include Unused Graphic Styles
  options.coordinatePrecision = 3;                              //  Decimal Places
  options.documentEncoding = SVGDocumentEncoding.UTF8            //  Encoding:
//                                                              //  Output fewer <tspan> elements
  options.sVGTextOnPath = false;                                //  Use <textpath> for Text on Path
//                                                              // Responsive
  options.slices = false;                                        // Include Slicing Data
  options.includeFileInfo = false;                               // Include XMP

//  options.artboardRange
//  options.compressed                                          // compressed ornot
//  options.includeVariablesAndDatasets
//  options.optimizeForSVGViewer
//  options.saveMultipleArtboards
//  options.sVGAutoKerning = true/false;
//  options.typename
  
  if (multipleArtboards)
    options.saveMultipleArtboards = true;
  return options;
}

//———————————————————————————————————————— returns file to save into

/** Returns the file to save or export the document into.
  @param docName the name of the document
  @param ext the extension the file extension to be applied
  @param destFolder the output folder
  @return File object
*/

function getTargetFile(docName, ext, destFolder) {
  var newName = "";

  // if name has no dot (and hence no extension),
  // just append the extension
  if (docName.indexOf('.') < 0) {
    newName = docName + ext;
  } else {
    var dot = docName.lastIndexOf('.');
    newName += docName.substring(0, dot);
    newName += ext;
  }
  
  // Create the file object to save to
  var myFile = new File( destFolder + '/' + newName );
  
  // Preflight access rights
  if (myFile.open("w")) {
    myFile.close();
  }
  else {
    throw new Error(access_is_denied);
  }
  return myFile;
}

//———————————————————————————————————————— delete any layers that are not printable

function deleteNonPrintingLayers(sourceDoc){
  var u = sourceDoc.layers.length;
  for (e = 0; e < u; e++){
    if (!sourceDoc.layers[e].printable){
      sourceDoc.layers[e].locked = false;
// Error 9021: Trying to delete hidden layer [layer name] fix was this line:
      sourceDoc.layers[e].visible = true;
      sourceDoc.layers[e].remove();
      e -= 1;
      u -= 1;
    }
  }
}

//———————————————————————————————————————— fin
//———————————————————————————————————————— fin
