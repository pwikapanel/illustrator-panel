//———————————————————————————————————————— saveAsSvg.jsx

//    JSR = JavaScript Scripting Reference.pdf
//    ISG = Illustrator Scripting Guide
//    using ampersands in // comments causes crashes

//———————————————————————————————————————— program

//  if (app.documents.length > 0 ) {

var activeDoc = app.activeDocument;
var aiOptions = st_optionsForVersion(17);
var docList = app.documents;
var filesTreated = 0;

for (x=0; x<app.documents.length; x++){
  filesTreated += 1;

  var sourceDoc = docList[x]; // ISG251
  app.activeDocument = sourceDoc; // otherwise properties are not updated correctly
  var realPath = sourceDoc.path + '/' + sourceDoc.name;

  var undos = st_deleteNonPrintingLayers(sourceDoc);
//undos += 
  st_saveAsSvgs(sourceDoc);

  // undo delete non-printing layers
  for (y=0; y<undos; y++){ app.undo(); }

  var destFile = new File(realPath);
  sourceDoc.saveAs(destFile, aiOptions);

  //————— housekeeping after SVG export

  if (arg == 'save') break;
  if (arg == 'close') sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
}

if (arg != 'close') app.activeDocument = activeDoc;

if (filesTreated < 2) var msg = 'File saved.';
else var msg = 'Files saved.';
alert(msg);


// — — — — — — — — — — — — — — — — — — — — functions — — — — — — — — —

//———————————————————————————————————————— save the actual SVG's

function st_saveAsSvgs(source){

  var folder = Folder(app.activeDocument.path);
  var destName = source.name.replace('.ai', '');
  var boards = source.artboards.length

  if (boards < 2){
    var finalName = destName + '.svg';
    var options  = st_getSvgOptions();
    var destFile = st_newFile(finalName);
    source.exportFile(destFile, ExportType.SVG, options);
    return true;
  }

  //———————————————————————————————————————— multiple artboards

  // need to copy each value, otherwise it acts like an alias


  var backupBoards = [];
  for (t=0; t<boards; t++){
    backupBoards[t] = st_copyArtboard(source.artboards[t]);
  }

  // x, y, x, y lower left corner, upper right corner
  tempRect = [0,0,100,-100];

  for (j=0; j<boards; j++){

    beforeBoards = j;
    afterBoards  = boards-j-1;

    // delete preceeding artboards
    for (k=0; k<beforeBoards; k++){
      source.artboards.remove(0); };

    // delete following artboards
    for (k=0; k<afterBoards; k++){
      source.artboards.remove(1); };

    var finalName = destName +'-'+j+'.svg';
    var options  = st_getSvgOptions();
    var destFile = st_newFile(finalName);
    source.exportFile(destFile, ExportType.SVG, options);

    // add preceeding artboards
    for (k=0; k<beforeBoards; k++){
      source.artboards.insert(tempRect,k);

      var sb = source.artboards[k];
      var bb = backupBoards[k];
      for (var key in bb) sb[key] = bb[key];

    }

    //add following artboards
    for (k=1; k<=afterBoards; k++){
      source.artboards.insert(tempRect,k+j);

      var sb = source.artboards[k+j];
      var bb = backupBoards[k+j];
      for (var key in bb) sb[key] = bb[key];
    }

  }

  return true;
  }

//———————————————————————————————————————— copy an array key by key, skipping objects (parent)

function st_copyArtboard(src){
  var result = {};
  for (var key in src){
    if (key != 'parent'){
      result[key] = src[key];
    }
  }
  return result;
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
// accepts boolean multiple artboards · ISG 335

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
  options.saveMultipleArtboards = false;
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
