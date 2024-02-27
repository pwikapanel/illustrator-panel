#target illustrator  

//:::::::::::::::::::::::::::::::::::::::: Verify.jsx

/*———————————————————————————————————————— notes

    fixEmbeddedImage can return either warning or error depending on if image can be fixed
    we'll deal with that later

    fixEmbeddedImage (embedded images)

    to add once old functionality has been repaired
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

/*———————————————————————————————————————— (c) & EULA

    Copyright (c) 2019-2023 Svija

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

  	svija.com · hello@svija.com */


//:::::::::::::::::::::::::::::::::::::::: program

/*———————————————————————————————————————— ▼ program:{

    can use "break program;" to quit at any moment */

function checkRepairx(){ // can use "return" to quit at any time

  var d = new Date();
  var env_start_ms = d.getTime();

//———————————————————————————————————————— no open docs

if (app.documents.length < 1){
  return('No open documents.');
}

//———————————————————————————————————————— initialization

var env_repairs        = [];   // repaired messages for user
var env_warnings       = [];   // warnings for user
var env_errors         = [];   // error messages for user
var env_imagesModified = [];   // [name, boolean warning/error, message]

var env_imagesFixed  = [];
var env_imagesFailed = [];
  
var doc         = app.activeDocument;
var linksFolder = Folder(doc.path) + '/Links';

var nonNatives = doc.nonNativeItems.length;
var rasters = doc.rasterItems.length;
var placed  = doc.placedItems.length;

if (rasters + placed > 0) var hasImages = true;
else                      var hasImages = false;


//———————————————————————————————————————— has not saved then quit

if (!hasPath(doc)) return 'Merci de sauvegarder en premier'

//———————————————————————————————————————— if not in sync folder then quit

if (!inSync(doc)) return 'Ceci n\'est pas un fichier Svija' 

//———————————————————————————————————————— check artboard names

var msg = artboardNames(doc);     // do artboard names seem likely? 

if (msg != '')
  env_errors.push(msg);

//———————————————————————————————————————— check artboard sizes

warn = artboardSizes(doc);     // do artboard sizes seem likely?

if (warn != '')
  env_warnings.push(warn);

//———————————————————————————————————————— create Links folder if necessary

if (hasImages)
  if (!Folder(linksFolder).exists){
    Folder(linksFolder).create();
    env_repairs.push('"Links" folder created for images.');
  }

/*———————————————————————————————————————— check for non-native items NOT IMPLEMENTED

   alert(nonNatives);

   there are 51 in Fusion 2018 PDF
   the function fixEmbeddedImage should be copied */

/*———————————————————————————————————————— change embedded images to linked images

    these are treated before placed images, because they will be
    changed to placed in the next step

    fixEmbeddedImage() returns image filename, succes/failure, message */

if (hasImages)
  for (var x=rasters; x>0; x--){
    var name_fixed_msg = fixEmbeddedImage(doc.rasterItems[x-1]);

    if (name_fixed_msg.length > 0){
      env_imagesModified[env_imagesModified.length] = name_fixed_msg;
      if(name_fixed_msg[1])
        placed += 1; // if it succeeded, we add a new placed image
    }
  }

/*———————————————————————————————————————— copy/move placed images to Links

    rasterItem() returns image filename, succes/failure, message */

if (hasImages)
  for (var x=placed; x>0; x--){
    var name_fixed_msg = fixPlacedImage(doc.placedItems[x-1]);

    if (name_fixed_msg.length > 0) // if something was modified
      env_imagesModified[env_imagesModified.length] = name_fixed_msg;
}

/*———————————————————————————————————————— check for illegal image formats

    reject anything but .ai, .pdf, .jpg, .png & .gif */

if (hasImages){
  for (var x=0; x<placed; x++){
    var name_fixed_msg = checkImageExt(doc.placedItems[x]);

//alert(name_fixed_msg.join(' : ');
    
    if (name_fixed_msg.length > 0) // if something was modified
      env_imagesModified[env_imagesModified.length] = name_fixed_msg;
  }
}

/*———————————————————————————————————————— separate image messages into success/failed

    two lists of messages are created:
    - fixed images
    - failed repairs

    an image that has two fixes:
    - embedded › linked
    - moved to Links

    should show only one message, the second */

if (hasImages){
  for (var x=0; x<env_imagesModified.length; x++){

    if (!env_imagesModified[x][1])
      env_imagesFailed.push(env_imagesModified[x]); // repair failed
    else{

      var nme   = env_imagesModified[x][0];
      var index = nameExists(nme, env_imagesFixed);

      if (index < 0) env_imagesFixed[env_imagesFixed.length] = env_imagesModified[x];
      else           env_imagesFixed[index] = env_imagesModified[x];
    }
  }
}

//———————————————————————————————————————— alert user
   
return alertUser(doc, env_start_ms, env_warnings, env_errors, env_repairs, env_imagesFixed, env_imagesFailed);

//———————————————————————————————————————— ▲ } // function

}

//:::::::::::::::::::::::::::::::::::::::: primary functions · called by program

/*———————————————————————————————————————— hasPath(doc) √

    has file been saved at least once?
    if not, ask user to save

    returns true or false */

function hasPath(doc){

  if (doc.path != '') return true;

  var f = File.saveDialog('Navigate to "sync" folder then save','');

  if (f == null){
    alert('Operation Canceled');
    return false;
  }

  app.activeDocument.saveAs(f, undefined);
  return true;
    
}

/*———————————————————————————————————————— inSync(doc)

    checks if file is inside a sync folder
    and throws fatal exception if not */

function inSync(doc){
  var path = String(doc.path)
  
  if (path.indexOf('/sync') < 0){
    alert('Not a Svija Page\nPlease move this file to the folder called "sync" in your Project Folder.');
    return false;
  }

  return true;
}

/*———————————————————————————————————————— artboardNames(sourceDoc)

    artboard names have to be two-letter codes

    returns '' or warning message */

function artboardNames(doc){

  for(x=0; x<doc.artboards.length; x++)
    if (!isTwoLetters(doc.artboards[x].name))
      return doc.name + " has artboard names that are not screen codes";

  return '';

}

/*———————————————————————————————————————— artboardSizes(doc)

    do artboard sizes seem likely? (round numbers)

    returns '' or warning message */

function artboardSizes(doc){

  for(x=0; x<doc.artboards.length; x++){
    var w = doc.artboards[x].artboardRect[2]-doc.artboards[x].artboardRect[0];

    if (!isRoundNumber(w))
      return doc.name + ' has ' + w + 'px wide artboard (must match page or screen settings)';
  }

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

/*———————————————————————————————————————— fixEmbeddedImage(obj)

    takes an embedded image and tries to change it to
    a link to an external file. Not sure what happens
    if the original cannot be found, a yellow rectangle
    is placed over the image — function drawYellowRectangle()

    returns image filename, succes/failure, message if modification
    returns [] if no change */

function fixEmbeddedImage(img){
 
  if (!img.layer.printable) return []; // we don't care about non-printing information layers

  // setup

  var activeLayer  = img.layer;
  var activeParent = img.parent;

  // save state

  var activeLayerLocked   = img.layer.locked;
  var activeParentLocked  = img.parent.locked;

  var activeLayerVisible  = img.layer.visible;
  var activeParentVisible = img.parent.visible;

  if (img.name == '') var imgName = 'Missing image';
  else var imgName = img.name;

  var imgDepth    = img.absoluteZOrderPosition;
  var parentLocks = unlockHierarchy(img);

  // is original findable?

  var fileMissing

	try{
    var newName = img.file;   // usually contains original file, even if image is embedded
    var newFile = new File(newName);
    fileMissing = false;
	}
	catch(e){ fileMissing = true; }

  if (img.status != 'RasterLinkState.DATAFROMFILE') // this is a precaution
    fileMissing = true;                             // not encountered so far

  // original is missing so highlight it

  if(fileMissing)
    var newImg = drawYellowRectangle(img);

  // original is found so re-link it

  else{
    var newImg  = activeParent.placedItems.add();
    newImg.file = newFile;
  
    for (var key in img){
      try{ newImg[key] = img[key]; }
      catch(e){}
    }
   
    var moveMatrix  = app.getScaleMatrix(100,-100);
    var totalMatrix = concatenateRotationMatrix(moveMatrix, 10);
    newImg.transform(moveMatrix);
  }

  // correct depth of image

  while (newImg.absoluteZOrderPosition > imgDepth+1)
    newImg.zOrder(ZOrderMethod.SENDBACKWARD); 

  // clean up & prepare response
  if (fileMissing){
    var msg = '(highlighted)';
    var success = false;
    newImg.name = '▼ embedded image';
  }
  else{
    var msg = 'file relinked';
    var success = true;
    newImg.name = imgName;
    img.remove();
  }

  relockHierarchy(parentLocks)

  return [imgName, success, msg];
}

/*———————————————————————————————————————— fixPlacedImage(obj)

    image can't be missing unless it
    was moved after document was opened

    returns image filename, succes/failure, message if modification
    returns [] if no change

    copy if outside of current folder, otherwise move

    three cases:
    image is far away
    image is in same folder as Ai doc
    image is in links folder already  */

function fixPlacedImage(img){
  if (!img.layer.printable) return [];

  try{ var thisFolder = img.file.path; } // not sure what would cause this
	catch(e){ return []; }                 // just in case

  var currentFolder = Folder(app.activeDocument.path);
  var linksFolder   = currentFolder + '/Links';

  if (thisFolder == linksFolder) // image is already in /Links
    return [];

  //———————————————————— need to repair

  var neme     = img.file.name;
  var destPath = linksFolder+'/'+neme;

/*

if (neme != 'Animation%20-%20Button%20Shadow.png')
  alert(neme + ' : '+destPath)

Animation%20-%20Groups%20and%20Animations%201.jpg    : ~/Desktop/eman-int.svija.site/sync/Links/Animation%20-%20Groups%20and%20Animations%201.jpg
Animation%20-%20Groups%20and%20Animations%202.jpg    : ~/Desktop/eman-int.svija.site/sync/Links/Animation%20-%20Groups%20and%20Animations%202.jpg
Animation%20-%20Svija%20Vibe%20Shadow.png            : ~/Desktop/eman-int.svija.site/sync/Links/Animation%20-%20Svija%20Vibe%20Shadow.png
Animation%20-%20Pointer.ai                           : ~/Desktop/eman-int.svija.site/sync/Links/Animation%20-%20Pointer.ai
Animation%20-%20Layers%20Panel%20Trigger%20Event.jpg : ~/Desktop/eman-int.svija.site/sync/Links/Animation%20-%20Layers%20Panel%20Trigger%20Event.jpg
Animation%20-%20Svija%20Vibe%20Shadow.png            : ~/Desktop/eman-int.svija.site/sync/Links/Animation%20-%20Svija%20Vibe%20Shadow.png

*/

  //———————————————————— is it a cloud image?

  var isCloud = String(img.file).indexOf('/Creative%20Cloud%20Libraries/');
  if (isCloud > 0){
    var ext = getExtension(img.file);
    neme = img.name + ' Cloud' + ext;
    destPath = linksFolder + '/' + neme;
  }
	
  //———————————————————— continue PROBLEM IS HERE

  var newFile = new File(destPath); // hypothetical until we actually create it

  // we copy file to /Links, then if it was with AI file, we delete original
  // changing the "copy" to a "move"

/*
if (neme != 'Animation%20-%20Button%20Shadow.png')
  alert(newFile.exists)

answers are correct */

  if(newFile.exists) var msg = 'link corrected'; /* seems to work — copies files in finder, but AI file is untouched */
  else{
    img.file.copy(newFile);
    var msg = 'copied to "Links" folder';
  }

  // if the file was in Ai folder we delete orig      SEEMS TO WORK — NOT USED IN THIS CASE
  if (thisFolder == currentFolder){
    img.file.remove();
    var msg = 'moved to "Links" folder';
  }

  var parentLocks = unlockHierarchy(img);

  img.file = newFile;

  relockHierarchy(parentLocks)

  return [neme, true, msg];
}

/*———————————————————————————————————————— checkImageExt(img)

    exclude all but the most common image formats:

    ai|pdf|jpg|jpeg|png|gif   */


function checkImageExt(img){
  if (!img.layer.printable) return [];

  try{
    var parts = String(img.file).split('.');
  }
  catch(e){
    drawYellowRectangle(img)
    return ['Unknown image', false, 'has no file'];
  }

  var ext = parts[parts.length - 1];
  var neme = img.file.name;

  const legalImages = /ai|pdf|jpg|jpeg|png|gif/gi;

  if (ext.match(legalImages) === null)
    return [neme, false, 'is an unsupported format'];

  return []
}

/*———————————————————————————————————————— alertUser(count)

    alert with:
    - elapsed time
    - errors (big problems)
    - warnings (minor problems)
    - image fixes
    - failed image repairs */

function alertUser(doc, env_start_ms, env_warnings, env_errors, env_repairs, env_imagesFixed, env_imagesFailed){

  var d = new Date();
  var ms = (d.getTime()-env_start_ms)
  var fileSize = getFileSize(doc)

  var title = doc.name;
  var bodyParts = [];

  if (env_warnings.length > 0)
    bodyParts.push('— Warnings —\n' + env_warnings.join('\n'));

  if (env_errors.length > 0)
    bodyParts.push('— Errors —\n' + env_errors.join('\n'));
  
  if (env_repairs.length > 0)
    bodyParts.push('— Repairs —\n' + env_repairs.join('\n'));
  
  if (env_imagesFixed.length > 0)
    bodyParts.push('— Fixed images —\n' + convertArray(env_imagesFixed));

  if (env_imagesFailed.length > 0)
    bodyParts.push('— Unrepairable images —\n' + convertArray(env_imagesFailed));

  if (bodyParts.length == 0){
    return 'All Good!';
  }

  body = bodyParts.join('\n\n');
  var msg = decodeURI(title + '\n' + body);

  return doc.name + ' verified\n' + fileSize + ' MB in ' + ms + ' ms'

//showResults = confirm(doc.name + ' verified\n' + fileSize + ' MB in ' + ms + ' ms — show report?');
//if (showResults) alert(msg);
}


//:::::::::::::::::::::::::::::::::::::::: to add later

/*———————————————————————————————————————— nonNative(sourceDoc) DISABLED

    are there non-native items?

    returns '' or warning message */

//   warn = nonNative(sourceDoc);         // are there non-native items? 
//   if (warn != '')
//     env_warnings.push(warn);
// 
// function nonNative(doc){
//   if (doc.nonNativeItems.length == 0) return '';
//   return doc.name + " may not display correctly; check the \"Links\" panel for non-native items";
// }

/*———————————————————————————————————————— liveEffects(doc) DISABLED

    these are technically called "Live Effects"

    https://mark1bean.github.io/live-effect-functions-for-illustrator/

    right now I have no way to find them

    returns '' or warning message */

//   warn = liveEffects(sourceDoc);       // are there unsupported techniques?
//   if (warn != '')
//     env_warnings.push(warn);
// 
// function liveEffects(doc){
//   //alert(doc.pageItems.getByName('thisOne'));
//   return '';
// }

/*———————————————————————————————————————— missingFonts(doc) DISABLED

    are there missing fonts?
    p228
    https://community.adobe.com/t5/illustrator-discussions/change-a-font-using-extendscript-in-illustrator/td-p/6322550

    returns '' or warning message */

//   warn = missingFonts(sourceDoc);      // are there missing fonts?
//   if (warn != '')
//     env_warnings.push(warn);
// 
// function missingFonts(doc){
//   return '';
// 
//   var o = doc.pageItems.getByName('thisOne'); 
//   alert(o.textRange.characterAttributes.textFont); // crashes AI
// }


//:::::::::::::::::::::::::::::::::::::::: fin

