#target illustrator  

/*———————————————————————————————————————— Verify.jsx

    Verify.jsx

    1.0.3

    Does a lot */

/*———————————————————————————————————————— EULA

    Copyright (c) 2023 Svija

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

  	svija.com · hello@svija.com*/


//:::::::::::::::::::::::::::::::::::::::: program

/*———————————————————————————————————————— ▼ program:{

    can use "break program;" to quit at any moment */

program:{ // can use "return" to quit at any time

  var d = new Date();
  var env_start_ms = d.getTime();

//———————————————————————————————————————— initialization

var doc = app.activeDocument;
var err, warn;
var env_errs = [];                   // error messages for user
var env_warn = [];                   // warnings for user

//———————————————————————————————————————— check if doc has been saved

err = hasPath(doc);           // has file been saved at least once?
if (err != '')
  env_errs.push(err);

err = hasLinks(doc);          // is there a Links folder?
if (err != '')
  env_warn.push(err);

err = hasEmbeds(doc);         // are there embedded images?
if (err != '')
  env_warn.push(err);

// rasterItem can return either warning or error depending on if image can be fixed
// we'll deal with that later

// rasterItem (embedded images)

/*  to add once old functionality has been repaired
    • embedded images 
    • non-native items
    • artboard names don't match likely screen codes
    • artboard sizes don't match likely screen sizes
    • unsupported techniques (mesh, filters)
    • missing font
    • correct text tracking
    • effect › stylize
    • opacity masks
    • freeform gradients
    • layer blending modes
    • gradient midpoints
    • cloud images
    • TT automatic uppercase see JavaScript Scripting Reference p24 */

//———————————————————————————————————————— placed images

// var placed = doc.placedItems.length;
// var placedFixes = [];
// 
// for (var x=placed; x>0; x--){
//   var val = placedItem(doc.placedItems[x-1]);
//   if (val != false) placedFixes.push(val);
// }

//———————————————————————————————————————— prepare report

// do placedFixes first, make list of names
// when doing rasterFixes, skip any that have names in names list
// [name, fixed boolean, message]

// var names = [];
// var fixed = [];
// var failed = [];
// 
// for (var x=0; x<placedFixes.length; x++){
//   names.push(placedFixes[x][0]);
//   if (placedFixes[x][1]) fixed.push(placedFixes[x][0] + ': ' + placedFixes[x][2]);
//   else failed.push(placedFixes[x][0] + ': ' + placedFixes[x][2]);
// }
// 
// var report_parts = [];
// if (fixed.length>0) report_parts.push('——— FIXED IMAGES ———\n' + fixed.join('\n'));
// if (failed.length>0) report_parts.push('——— BROKEN IMAGES ———\n' + failed.join('\n'));
// 
// report_parts.push("See \"Links\" panel for information.");
// report = decodeURI(report_parts.join('\n\n'));

//———————————————————————————————————————— present report

// doc.selection = null;
// 
// var d = new Date();
// var elapsedMs = ' (' + (d.getTime()-env_start_ms) + ' ms)';
// 
// var treated = fixed.length + failed.length;
// 
// if (treated==0)
//   alert('No issues found' + elapsedMs);
// 
// if (treated == 1) msg = 'One issue found';
// else msg = treated + ' issues found';
// 
// msg += '\nSkip the report?'
// skip = confirm('Images Relinked' + elapsedMs + '\n' + msg);
// 
// if (!skip) alert('Issues Found:\n' + report);

//———————————————————————————————————————— alert user
   
finalFeedback(doc);

//———————————————————————————————————————— ▲ } // program 

} // program 


//:::::::::::::::::::::::::::::::::::::::: main functions

/*———————————————————————————————————————— placedItem(obj)

  image can't be missing unless it
  was moved after document was opened */

function placedItem(obj){

  try{ var thisFolder = obj.file.path; }
	catch(e){ return false; }

  var docFolder = Folder(app.activeDocument.path);
  var linksFolder    = docFolder + '/Links';

  if (thisFolder == linksFolder) return false;

  var imgName = obj.file.name;
  var destFullName = linksFolder+'/'+imgName;

  // copy if outside of current folder, otherwise move

  // three cases:
  // image is far away
  // image is in same folder as Ai doc
  // image is in links folder already

  var newFile = new File(destFullName);

  if(newFile.exists) var report = 'link updated';
  else{
    obj.file.copy(newFile);
    var report = 'copied to Links';
  }

  // if the file was in Ai folder we delete orig
  if (thisFolder == docFolder){
    obj.file.remove();
    var report = 'moved to Links';
  }

  obj.file = newFile;
  return [imgName, true, report];
}

/*———————————————————————————————————————— finalFeedback(count)

    alert with:
    - elapsed time
    - errors (big problems)
    - warnings (minor problems) */

function finalFeedback(doc){

  var d = new Date();
  var ms = ' (' + (d.getTime()-env_start_ms) + ' ms)';

  var title = doc.name+' Verified' + ms;
  var body = '';

  if (env_errs.length > 0)
    body += '\nErrors\n' + env_errs.join('\n');
  
  if (env_warn.length > 0)
    body += '\nWarnings\n' + env_warn.join('\n');

  if (env_errs.length == 0 && env_warn.length == 0)
    body = '\nNo issues found';

  alert(title + body);
}


//:::::::::::::::::::::::::::::::::::::::: utility functions

/*———————————————————————————————————————— alertRec(obj)

  create translucent rectangle to signal embedded images
  that can't be found and need to be replaced

*/

function alertRec(obj){
  var alertColor = new RGBColor();
  alertColor.red = 192; alertColor.green = 255; alertColor.blue = 0;
  
  var r = obj.geometricBounds; // coords [left -top right -bottom]

  var rLeft   = r[0];
  var rNegTop = r[1];
  var rWidth  = r[2]-r[0];
  var rHeight = r[1]-r[3];

  // isg81 -top, left, width, height
  var rec = app.activeDocument.activeLayer.pathItems.rectangle( rNegTop, rLeft, rWidth, rHeight );

  rec.filled = true;
  rec.stroked = false;
  rec.fillColor = alertColor;
  rec.opacity = 50;
  return rec;
}

/*———————————————————————————————————————— hasPath(sourceDoc)

    has file been saved at least once?
    returns '' or error message */

function hasPath(doc){

  if (doc.path != '') return '';

  var f = File.saveDialog('Save ' + doc.name + ' to continue','');
  if (f == null)
    return 'You chose not to save ' + doc.name;

  app.activeDocument.saveAs(f, undefined);
  return '';
    
}

/*———————————————————————————————————————— hasLinks(sourceDoc) FIX

    has file been saved at least once?
    returns '' or error message */

function hasLinks(doc){

  var linksFolder = Folder(app.activeDocument.path + '/Links');

  if (Folder(linksFolder).exists)
    return '';

  var msg = 'No "Links" folder found.\nDo you want to create it?';
  if (confirm(msg)){
    Folder(linksFolder).create();
    return '';
  }
  else
    return "Missing \"Links\" folder for images";
}

/*———————————————————————————————————————— hasEmbeds(doc)

    embedded images will be re-linked, converting
    them to placed images (if possible) */

function hasEmbeds(doc){

  var l = doc.rasterItems.length;

  var fixes = [];  

  for (var x = l; x > 0; x--){

    var val = relink(doc.rasterItems[x-1]); // val = array // returns false if non-printing layer
    if (val != false) fixes.push(val);

  }

  // prepare messages
  for (var x=0; x<fixes.length; x++){
  
    var skip = false;

    for (var y=0; y<names.length; y++)
      if (fixes[x][0] == names[y]) skip = true;

    if(skip) continue; 
  
    if (fixes[x][1]) fixed.push(fixes[x][0] + ': ' + fixes[x][2]);
    else failed.push(fixes[x][0] + ': ' + fixes[x][2]);
  }
 
}

/*———————————————————————————————————————— relink(obj) 

  tries to relink embedded files

  returns [filename, true, message] if success
  returns [filename, true, message] if success
  notes */

function relink(img){
 
  if (!img.layer.printable) return false;

  app.activeDocument.activeLayer         = img.layer;
  app.activeDocument.activeLayer.visible = true;

	try{
    var newName = img.file;
    var newFile = new File(newName);
    var fileMissing = false;
	}

	catch(e){ var fileMissing = true; }

  // this is a precaution, not encountered so far
  if (img.status != 'RasterLinkState.DATAFROMFILE') fileMissing = true;

  if(fileMissing){
    var rec = alertRec(img);
    var report = 'missing, highlighted';

    if (img.name == '')
      var imageName = '<image>';
    else
      var imageName = img.name;

    return [imageName, false, report];
  }

  // ————— we have the original file, need to re-link it

  newObj = app.activeDocument.activeLayer.placedItems.add()
  newObj.file = newFile;

  for (var key in img)
    if (key != 'parent' && key != 'embedded' && key != 'wrapOffset' && key != 'wrapInside')
      newObj[key] = img[key];
 
  // imgects were appearing upside down
  var moveMatrix = app.getScaleMatrix(100,-100);
  var totalMatrix = concatenateRotationMatrix(moveMatrix, 10);
  newObj.transform(moveMatrix);

  // remove the rasterItem
  img.remove();

  var report = ' file relinked';
  return [newObj.file.name, true, report];

}

//:::::::::::::::::::::::::::::::::::::::: fin

/*———————————————————————————————————————— embeddedImages(sourceDoc)

    are there embedded images?

    returns '' or error message */

//   err = embeddedImages(sourceDoc);     // are there embedded images?
//   if (err != '')
//     return dontSave(err);
// 
// function embeddedImages(doc){
//   if (doc.rasterItems.length == 0) return '';
//   return doc.name + " was not saved; use \"Collect Images\" to link embedded images";
// }

/*———————————————————————————————————————— nonNative(sourceDoc)

    are there non-native items?

    returns '' or warning message */

//   warn = nonNative(sourceDoc);         // are there non-native items? 
//   if (warn != '')
//     env_warn.push(warn);
// 
// function nonNative(doc){
//   if (doc.nonNativeItems.length == 0) return '';
//   return doc.name + " may not display correctly; check the \"Links\" panel for non-native items";
// }

/*———————————————————————————————————————— liveEffects(doc)

    these are technically called "Live Effects"

    https://mark1bean.github.io/live-effect-functions-for-illustrator/

    right now I have no way to find them

    returns '' or warning message */

//   warn = liveEffects(sourceDoc);       // are there unsupported techniques?
//   if (warn != '')
//     env_warn.push(warn);
// 
// function liveEffects(doc){
//   //alert(doc.pageItems.getByName('thisOne'));
//   return '';
// }

/*———————————————————————————————————————— artboardNames(sourceDoc)

    artboard names have to be two-letter codes

    returns '' or warning message */

//   warn = artboardNames(sourceDoc);     // do artboard names seem likely? 
//   if (warn != '')
//     env_warn.push(warn);
// 
// function artboardNames(doc){
// 
//   for(x=0; x<doc.artboards.length; x++)
//     if (!isTwoLetters(doc.artboards[x].name))
//       return doc.name + " contains artboards that don't correspond to screen codes";
// 
//   return '';
// 
// }

/*———————————————————————————————————————— artboardSizes(doc)

    do artboard sizes seem likely? (round numbers)

    returns '' or warning message */

//   warn = artboardSizes(sourceDoc);     // do artboard sizes seem likely?
//   if (warn != '')
//     env_warn.push(warn);
// 
// function artboardSizes(doc){
// 
//   for(x=0; x<doc.artboards.length; x++){
//     var w = doc.artboards[x].artboardRect[2]-doc.artboards[x].artboardRect[0];
// 
//     if (!isRoundNumber(w))
//       return doc.name + " contains artboards with widths that may not correspond to screen codes: " + w + " px";
//   }
// 
//   return '';
// }

/*———————————————————————————————————————— missingFonts(doc)

    are there missing fonts?
    p228
    https://community.adobe.com/t5/illustrator-discussions/change-a-font-using-extendscript-in-illustrator/td-p/6322550

    returns '' or warning message */

//   warn = missingFonts(sourceDoc);      // are there missing fonts?
//   if (warn != '')
//     env_warn.push(warn);
// 
// function missingFonts(doc){
//   return '';
// 
//   var o = doc.pageItems.getByName('thisOne'); 
//   alert(o.textRange.characterAttributes.textFont); // crashes AI
// }

