#target illustrator  

//:::::::::::::::::::::::::::::::::::::::: checkAndRepair.jsx

/*———————————————————————————————————————— notes

    check.jsx

    1.0.5

    notes:

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

    Copyright (c) Svija

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


function checkAndRepair(){

  var syncErr = ' is not inside a \"SYNC\" folder'

  var d = new Date()
  var env_start_ms = d.getTime()

//———————————————————————————————————————— no open docs

if (app.documents.length < 1){
  alert('No open documents.')
  return true
}

//———————————————————————————————————————— initialization

var doc            = app.activeDocument

var env_repairs        = []   // repaired messages for user
var env_warnings       = []   // warnings for user
var env_errors         = []   // error messages for user
var env_imagesModified = []   // [name, boolean warning/error, message]

var env_imagesFixed    = []
var env_imagesFailed   = []

var linksFolderObj = Folder(concatenatePath(doc.path, 'Links'))

var nonNatives = doc.nonNativeItems.length
var rasters    = doc.rasterItems.length
var placed     = doc.placedItems.length

if (rasters + placed > 0) var hasImages = true
else                      var hasImages = false

  //———————————————————————————————————————— has not saved then quit
  
  var pathErr = hasPath(doc)
  
  if (pathErr != ''){
    alert(pathErr)
    return true
  }
  
  //———————————————————————————————————————— if not in SYNC folder then quit

  
  var syncPath = SYNCPATH
  
  if (syncPath == ''){
    alert(doc.name + syncErr + '::'+syncPath)
    return true
  }

//———————————————————————————————————————— create Links folder if images

if (hasImages)
  if (!Folder(linksFolderObj).exists){
    Folder(linksFolderObj).create();
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
   
alertUser(doc)

}

//:::::::::::::::::::::::::::::::::::::::: primary functions

/*———————————————————————————————————————— artboardNames(sourceDoc)

    artboard names have to be two-letter codes

    returns '' or warning message */

function artboardNames(doc){

  for(x=0; x<doc.artboards.length; x++)
    if (!isTwoLetters(doc.artboards[x].name))
      return doc.name + " has artboard names that are not screen codes";

  return '';

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
  var linksFolder   = concatenatePath(doc.path, 'Links')

  if (thisFolder == linksFolder) // image is already in /Links
    return [];

  //———————————————————— need to repair

  var neme     = img.file.name;
  var destPath = concatenatePath(linksFolder, neme)

  //———————————————————— is it a cloud image?

  var isCloud = String(img.file).indexOf('Creative%20Cloud%20Libraries');
  if (isCloud > 0){
    var ext = getExtension(img.file);
    neme = img.name + ' Cloud' + ext;
    destPath = concatenatePath(linksFolder, neme)
  }
  
  //———————————————————— continue PROBLEM IS HERE

  var newFile = new File(destPath); // hypothetical until we actually create it

  // we copy file to /Links, then if it was with AI file, we delete original
  // changing the "copy" to a "move"

  if(newFile.exists) var msg = 'link updated'; /* seems to work — copies files in finder, but AI file is untouched */
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

/*———————————————————————————————————————— alertUser(doc)

    alert with:
    - elapsed time
    - errors (big problems)
    - warnings (minor problems)
    - image fixes
    - failed image repairs */

function alertUser(doc){

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
    alert('All Good!\nline 449: THIS SCRIPT IS BROKEN');
    return;
  }

  body = bodyParts.join('\n\n');
  var msg = decodeURI(title + '\n' + body);

  if (ms > 1000)
    ms = ms/1000 +' sec';
  else
    ms = ms + ' ms';

  showResults = confirm(doc.name + ' verified\n' + fileSize + ' MB in ' + ms + ' — show report?\n\nline 461: THIS SCRIPT IS BROKEN');
  if (showResults) alert(msg);
}


//:::::::::::::::::::::::::::::::::::::::: utility functions

/*———————————————————————————————————————— drawYellowRectangle(obj)

  create translucent rectangle to signal embedded images
  that can't be found and need to be replaced */

function drawYellowRectangle(obj){
  var alertColor = new RGBColor();
  alertColor.red = 192; alertColor.green = 255; alertColor.blue = 0;
  
  var r = obj.geometricBounds; // coords [left -top right -bottom]

  var rLeft   = r[0];
  var rNegTop = r[1];
  var rWidth  = r[2]-r[0];
  var rHeight = r[1]-r[3];

  // unlock activeLayer

  // isg81 -top, left, width, height
  var rec = obj.parent.pathItems.rectangle( rNegTop, rLeft, rWidth, rHeight );

  rec.filled = true;
  rec.stroked = false;
  rec.fillColor = alertColor;
  rec.opacity = 50;
  rec.name = 'UNFIXABLE IMAGE'

  return rec;
}

/*———————————————————————————————————————— hasEmbeds(doc)

    embedded images will be re-linked, converting
    them to placed images (if possible) */

function hasEmbeds(doc){

  var l = doc.fixEmbeddedImages.length;
  var fixes = [];  

  for (var x = l; x > 0; x--){

    var val = relink(doc.fixEmbeddedImages[x-1]); // val = array // returns false if non-printing layer
    if (val != false) fixes.push(val);

  }

  // prepare messages
  for (var x=0; x<fixes.length; x++){
  
    var skip = false;

    for (var y=0; y<names.length; y++)
      if (fixes[x][0] == names[y]) skip = true;

    if(skip) continue; 
  
    if (fixes[x][1]) fixed.push(fixes[x][0] + ' ' + fixes[x][2]);
    else failed.push(fixes[x][0] + ' ' + fixes[x][2]);
  }
 
}

/*———————————————————————————————————————— nameExists(list)
      
    var index = nameExists(name, env_imagesFixed);

    accepts a name, and an array of 3-element arrays
    of which the first is a name.

    if the name is found in the first element of an existing
    member of the list, return the index

    else return -1 */

function nameExists(neme, arrayList){

  for (var x=0; x<arrayList.length; x++)
    if (neme == arrayList[x][0]) return x;
  

  return -1;
}

/*———————————————————————————————————————— convertArray(envArray)

    accepts an array of three-element arrays:
    name, success/fail boolean, message

    returns string */

// empty arrays were added to beginning of envArray

function convertArray(arr){
  if (arr.length == 0) return '';

  var result = [];
  for (var x=0; x<arr.length; x++){
    result.push(arr[x][0] + ' ' + arr[x][2]);
}

  return result.join('\n');
}

/*———————————————————————————————————————— getAlertDepth(img)
    
    This exists so that yellow highlight boxes will be:
    - in front of image if image is not grouped
    - in front of group if image is grouped */

function getAlertDepth(img){

  if (img.parent.typename != 'GroupItem')
    return img.absoluteZOrderPosition;

  var obj = img;
  while (obj.parent.typename == 'GroupItem')
     obj = obj.parent;

  alert('Group depth: '+obj.absoluteZOrderPosition);
  return obj.absoluteZOrderPosition;
}


//:::::::::::::::::::::::::::::::::::::::: fin

