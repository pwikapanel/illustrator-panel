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

  var boardsToRestore = st_saveAsSvgs(sourceDoc);

alert('artboards on 25: '+sourceDoc.artboards.length);

  var destFile = new File(realPath);

alert('artboards on 27: '+sourceDoc.artboards.length);
  sourceDoc.saveAs(destFile, aiOptions); // adds artboards back

  alert('artboards on 30: '+sourceDoc.artboards.length);
  //————— housekeeping after SVG export

  if (arg == 'save') break;
  if (arg == 'close') sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
}

app.activeDocument.artboards.add([0,0,100,-100]);
alert('artboards on 37: '+app.activeDocument.artboards.length);
if (arg != 'close') app.activeDocument = activeDoc;

if (filesTreated < 2) var msg = 'File saved.';
else var msg = 'Files saved.';
alert(msg);


// — — — — — — — — — — — — — — — — — — — — functions — — — — — — — — —

//———————————————————————————————————————— save the actual SVG's

see isg.169, activeartboardindex

I have a suspicion, that as a document has to be active to be maniuputaed,
and artboard must be activated to be manipulated
could potentially even active each artboard in turn, then save as svg
and everything will take care of itself.

function st_saveAsSvgs(source){

  var folder = Folder(app.activeDocument.path);
  var destName = source.name.slice(0, -3);
  var boardsLen = source.artboards.length;
  var layersLen  = source.layers.length;
  var backupBoards = [];

  for (t=0; t<boardsLen; t++) backupBoards[t] = st_copyArtboard(source.artboards[t]);

  for (t=boardsLen-1; t>0; t--) source.artboards[t].remove();

  for (j=0; j<boardsLen; j++){

    //———————————————————————————————— configure artboard

    var bb = backupBoards[j];
    alert('69: restoring artboard '+bb['name']);
    for (var key in bb) source.artboards[0][key] = bb[key];

    //———————————————————————————————— delete unneeded layers

    // array w/ information about locked & visible
    var backupLayers = st_deleteNonPrintingLayers(sourceDoc);

    //———————————————————————————————— save svg file

    var abName = source.artboards[0].name;
    var finalName = destName + '-' + abName + '.svg';
    var options  = st_getSvgOptions();
    var destFile = st_newFile(finalName);

    //———————————————————————————————— restore to original state

    // restore layers & artboards

    source.exportFile(destFile, ExportType.SVG, options);

    while (source.layers.length<layersLen) app.undo();

    // restore visibile & locked values
    for (var r=0; r<layersLen; r++){
      if (backupLayers[r] == 1 || backupLayers[r] == 3){source.layers[r].locked  = true; }
      if (backupLayers[r] == 2 || backupLayers[r] == 3){source.layers[r].visible = false;}
    }
  }

  return backupBoards;
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
