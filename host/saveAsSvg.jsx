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


//   the problem is that the artboard name is automatically added at the moment of exportFile
//   so even thoght I've created the file, it isn't used
//   it's weird taht i have to creat it, I didn't in the prvious script.
//   I could delete other artboards and save just the one
//
//   I could create new svg, copy artboard to it, save and close it

//   because I'm saving multiple artboards, use folder not doc

//   if (multipleArtboards)
//     sourceDoc.exportFile(destFolder, ExportType.SVG, svgOptions);
//   else {
//     var destDoc   = this.getTargetFile(sourceDoc.name, '.svg', destFolder);
//     sourceDoc.exportFile(destDoc, ExportType.SVG, svgOptions);

function backupArtboard(oldBoard){
  var newBoard = {};
  for(var key in oldBoard){ newBoard[key] = oldBoard[key]; }
  return newBoard;
}

function st_saveSvg(source){

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

  boardOrder = [];
  for (j=0; j<boards; j++){
    boardOrder.push(source.artboards[j].name);
  }

  for (j=0; j<boards; j++){
    beforeArtboards = j;
    afterArtboards  = boards - j - 1;
    var undox = 0;

    backupArtboards = [];

    // delete preceeding artboards
    for (k=0; k<beforeArtboards; k++){
      backupArtboards.push(backupArtboard(source.artboards[0]));
      source.artboards.remove(0);
      undox += 1;
    }

    // delete following artboards
    for (k=0; k<afterArtboards; k++){
      backupArtboards.push(backupArtboard(source.artboards[1]));
      source.artboards.remove(1);
      undox += 1;
    }


    // put them all back
    for (jy=0; jy<undox; jy++){

      thisBoard = backupArtboards[jy];
      source.artboards.add(thisBoard['artboardRect']);

      for(var key in thisBoard){
        source.artboards[source.artboards.length-1][key] = thisBoard[key];
      }

    }

    if (source.artboards.length != boards){
      alert('Error, undo didn\'t work!');
      return true;
    }
  }

  // put artboards back in original order
  // would be better to put them in order in loop, just above
//  for (j=0; j<boards; j++){
//    thisName = boardOrder[j];
//    app.activeDocument.artboardByName[thisName].index = j;
//  }

  return true;
  }
//
//    // should have only one artboard left
//    // save file here
//
////    alert(source.artboards.length + ':' + source.artboards[0].name);
//
//  }



//   for (j=0; j<boards; j++){
//     //var finalName = destName + '_' + source.artboards[j].name + '.svg';
// 
//     var whichBoard = '' + (j+1);
//     var options = st_getSvgOptions();
// 
//     //var destFile = st_newFile(finalName);
//     source.exportFile(folder, ExportType.SVG, options);
//   }
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

function st_optionsForVersion(v){

  var options = new IllustratorSaveOptions();          // JSRp84

  var comp = Compatibility['ILLUSTRATOR' + v]; // JSRp244
  if (v > 0) options.compatibility = comp;

  options.pdfCompatible = false; // much faster
  options.compressed = false;    // a bit faster

  return options;
}

//———————————————————————————————————————— fin
