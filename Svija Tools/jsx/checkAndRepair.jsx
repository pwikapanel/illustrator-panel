#target illustrator  

/* vim: set foldmethod=marker fmr=/*\—,///: */

/*

SyntaxError: Unexpected number
received: Error 24: checkAndRepair is not a function.
Line: 1
->  checkAndRepair()

*/
alert(5)

//:::::::::::::::::::::::::::::::::::::::: checkAndRepair.js / checkAndRepair.jsx

/*———————————————————————————————————————— notes

    if errors or warnings provides an alert 
    and returns ''

    otherwise returns a success message

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

///

//:::::::::::::::::::::::::::::::::::::::: program function

//———————————————————————————————————————— program

function checkAndRepair(){

  /*—————————————————————————————————————— initialization */
  
  var d = new Date()
  STARTMS = d.getTime()

  var doc            = app.activeDocument
  
  ERRORS         = []   // array of strings   errors, for user
  REPAIRS        = []   // array of strings   repairs made, for user
  WARNINGS       = []   // array of strings   warnings, for user
  
  IMAGESMODIFIED = []   // array of arrays [name, boolean warning/error, message]
  IMAGESFIXED    = []   // array of arrays [name, boolean warning/error, message]
  IMAGESFAILED   = []   // array of arrays [name, boolean warning/error, message]
  
  ///
  /*—————————————————————————————————————— remove non-printing layers */

  var layerInfo = DELETENONPRINTINGLAYERS(doc)
  ///

  //:::::::::::::::::::::::::::::::::::::: checking & repairing

  /*—————————————————————————————————————— Links folder      create if necessary */

  var linksFolderObj = Folder(CONCATENATEPATH(doc.path, 'Links'))
  if (!Folder(linksFolderObj).exists){
    Folder(linksFolderObj).create()
    REPAIRS.push(TRANSLATE[LC].linksCreated)
  }
  ///
  /*—————————————————————————————————————— embedded images   place if possible (rasterItems)
  
      these are treated before placed images, because they will be
      changed to placed in the next step
  
      fixEmbeddedImage() returns image filename, succes/failure, message */

//for (var x=doc.rasterItems.length; x>0; x--){
//  var msgArray = fixEmbeddedImage(doc, doc.rasterItems[x-1])
//
//  if (msgArray.length > 0)
//    IMAGESMODIFIED.push(msgArray)
//}
  /// 
  /*—————————————————————————————————————— placedImages      move to Links
  
      fixPlacedImage() returns image filename, succes/failure, message */

//for (var x=doc.placedItems.length; x>0; x--){
//  var msgArray = fixPlacedImage(doc, doc.placedItems[x-1])
//
//  if (msgArray.length > 0)
//    IMAGESMODIFIED.push(msgArray)
//}
  ///

  //:::::::::::::::::::::::::::::::::::::: clean up

  /*—————————————————————————————————————— restore non-printing layers */

  RESTORENONPRINTINGLAYERS(layerInfo)
  ///
  /*—————————————————————————————————————— sort image messages into success/failed
  
      two lists of messages are created:
      - fixed images
      - failed repairs
  
      an image that has two fixes:
      - embedded › linked
      - moved to Links
  
      should show only one message, the second */
  
  for (var x=0; x<IMAGESMODIFIED.length; x++){
  
    if (!IMAGESMODIFIED[x][1])
      IMAGESFAILED.push(IMAGESMODIFIED[x]) // repair failed
    else{
  
      var nme   = IMAGESMODIFIED[x][0]
      var index = nameExists(nme, IMAGESFIXED)
  
      if (index < 0) IMAGESFIXED[IMAGESFIXED.length] = IMAGESMODIFIED[x]
      else           IMAGESFIXED[index] = IMAGESMODIFIED[x]
    }
  }
  ///
  //———————————————————————————————————————— alert user

  if (!alertUser(doc)) return 'allGood' // must be in locale/messages.properties
  else return ''

}

//:::::::::::::::::::::::::::::::::::::::: primary functions

/*———————————————————————————————————————— artboardNames(sourceDoc)

    artboard names have to be two-letter codes

    returns '' or warning message */

function artboardNames(doc){

  for(x=0; x<doc.artboards.length; x++)
    if (!isTwoLetters(doc.artboards[x].name))
      return doc.name + " has artboard names that are not screen codes"

  return ''

}
///
/*———————————————————————————————————————— fixEmbeddedImage(obj)

    takes an embedded image and tries to change it to
    a link to an external file. Not sure what happens
    if the original cannot be found, a yellow rectangle
    is placed over the image — function drawYellowRectangle()

    returns image filename, succes/failure, message if modification
    returns [] if no change */

function fixEmbeddedImage(doc, img){
 
  if (!img.layer.printable) return [] // we don't care about non-printing information layers

  // setup

  var activeLayer  = img.layer
  var activeParent = img.parent

  // save state

  var activeLayerLocked   = img.layer.locked
  var activeParentLocked  = img.parent.locked

  var activeLayerVisible  = img.layer.visible
  var activeParentVisible = img.parent.visible

  if (img.name == '') var imgName = TRANSLATE[LC].missingImage 
  else var imgName = img.name

  var imgDepth    = img.absoluteZOrderPosition
  var parentLocks = unlockHierarchy(img)

  // is original findable?

  var fileMissing

  try{
    var newName = img.file   // usually contains original file, even if image is embedded
    var newFile = new File(newName)
    fileMissing = false
  }
  catch(e){ fileMissing = true }

  if (img.status != 'RasterLinkState.DATAFROMFILE') // this is a precaution
    fileMissing = true                             // not encountered so far

  // original is missing so highlight it

  if(fileMissing)
    var newImg = drawYellowRectangle(img)

  // original is found so re-link it

  else{
    var newImg  = activeParent.placedItems.add()
    newImg.file = newFile
  
    for (var key in img){
      try{ newImg[key] = img[key] }
      catch(e){}
    }
   
    var moveMatrix  = app.getScaleMatrix(100,-100)
    var totalMatrix = concatenateRotationMatrix(moveMatrix, 10)
    newImg.transform(moveMatrix)
  }

  // correct depth of image

  while (newImg.absoluteZOrderPosition > imgDepth+1)
    newImg.zOrder(ZOrderMethod.SENDBACKWARD)

  // clean up & prepare response
  if (fileMissing){
    var msg = TRANSLATE[LC].highlighted 
    var success = false
    newImg.name = TRANSLATE[LC].embeddedImage 
  }
  else{
    var msg = TRANSLATE[LC].relinked
    var success = true
    newImg.name = imgName
    img.remove()
  }

  relockHierarchy(parentLocks)

  return [imgName, success, msg]
}
///
/*———————————————————————————————————————— fixPlacedImage(doc, img)

    image can't be missing unless it
    was moved after document was opened

    returns image filename, succes/failure, message if modification
    returns [] if no change

    copy if outside of current folder, otherwise move

    three cases:
    image is far away
    image is in same folder as Ai doc
    image is in links folder already  */

function fixPlacedImage(doc, img){

  if (!img.layer.printable) return []

  try{ var thisFolder = img.file.path } // not sure what would cause this
  catch(e){ return [] }                 // just in case

  var currentFolder = Folder(app.activeDocument.path)

  var linksFolder   = CONCATENATEPATH(doc.path, 'Links')

  if (thisFolder == linksFolder) // image is already in /Links
    return []

  //———————————————————— need to repair

  var neme     = img.file.name
  var destPath = CONCATENATEPATH(linksFolder, neme)

  //———————————————————— is it a cloud image?

  var isCloud = String(img.file).indexOf('Creative%20Cloud%20Libraries')
  if (isCloud > 0){
    var ext = getExtension(img.file)
    neme = img.name + ' Cloud' + ext
    destPath = CONCATENATEPATH(linksFolder, neme)
  }
  
  //———————————————————— continue PROBLEM IS HERE

  var newFile = new File(destPath) // hypothetical until we actually create it

  // we copy file to /Links, then if it was with AI file, we delete original
  // changing the "copy" to a "move"

  if(newFile.exists) var msg = TRANSLATE[LC].linkUpdated /* seems to work — copies files in finder, but AI file is untouched */
  else{
    img.file.copy(newFile)
    var msg = TRANSLATE[LC].copiedToLinks
  }

  // if the file was in Ai folder we delete orig      SEEMS TO WORK — NOT USED IN THIS CASE
  if (thisFolder == currentFolder){
    img.file.remove()
    var msg = TRANSLATE[LC].movedToLinks
  }

  var parentLocks = unlockHierarchy(img)

  img.file = newFile

  relockHierarchy(parentLocks)

  return [neme, true, msg]
}
///
/*———————————————————————————————————————— alertUser(doc)

    if problems, shows alert else returns ''
    alert with:
    - elapsed time
    - errors (big problems)
    - warnings (minor problems)
    - image fixes
    - failed image repairs */

function alertUser(doc){

  var d = new Date()

  var ms = (d.getTime()-STARTMS)

  var fileSize = getFileSize(doc)

  var title = doc.name
  var bodyParts = []

  if (WARNINGS.length > 0)
    bodyParts.push('— Warnings —\n' + WARNINGS.join('\n'))

  if (ERRORS.length > 0)
    bodyParts.push('— Errors —\n' + ERRORS.join('\n'))
  
  if (REPAIRS.length > 0)
    bodyParts.push('— Repairs —\n' + REPAIRS.join('\n'))

  if (IMAGESFIXED.length > 0)
    bodyParts.push('— Fixed images —\n' + convertArray(IMAGESFIXED))

  if (IMAGESFAILED.length > 0)
    bodyParts.push('— Unrepairable images —\n' + convertArray(IMAGESFAILED))

  if (bodyParts.length == 0){
    return false
  }

  body = bodyParts.join('\n\n')
  var msg = decodeURI(title + '\n' + body)

  if (ms > 1000)
    ms = ms/1000 +' sec'
  else
    ms = ms + ' ms'

  alert(msg)
  return true
}
///

//:::::::::::::::::::::::::::::::::::::::: utility functions

/*———————————————————————————————————————— drawYellowRectangle(obj)

  create translucent rectangle to signal embedded images
  that can't be found and need to be replaced */

function drawYellowRectangle(obj){
  var alertColor = new RGBColor()
  alertColor.red = 192; alertColor.green = 255; alertColor.blue = 0
  
  var r = obj.geometricBounds // coords [left -top right -bottom]

  var rLeft   = r[0]
  var rNegTop = r[1]
  var rWidth  = r[2]-r[0]
  var rHeight = r[1]-r[3]

  // unlock activeLayer

  // isg81 -top, left, width, height
  var rec = obj.parent.pathItems.rectangle( rNegTop, rLeft, rWidth, rHeight )

  rec.filled = true
  rec.stroked = false
  rec.fillColor = alertColor
  rec.opacity = 50
  rec.name = 'UNFIXABLE IMAGE'

  return rec
}
///
/*———————————————————————————————————————— hasEmbeds(doc)

    embedded images will be re-linked, converting
    them to placed images (if possible) */

function hasEmbeds(doc){

  var l = doc.fixEmbeddedImages.length
  var fixes = []  

  for (var x = l; x > 0; x--){

    var val = relink(doc.fixEmbeddedImages[x-1]) // val = array // returns false if non-printing layer
    if (val != false) fixes.push(val)

  }

  // prepare messages
  for (var x=0; x<fixes.length; x++){
  
    var skip = false

    for (var y=0; y<names.length; y++)
      if (fixes[x][0] == names[y]) skip = true

    if(skip) continue 
  
    if (fixes[x][1]) fixed.push(fixes[x][0] + ' ' + fixes[x][2])
    else failed.push(fixes[x][0] + ' ' + fixes[x][2])
  }
 
}
///
/*———————————————————————————————————————— nameExists(list)
      
    var index = nameExists(name, IMAGESFIXED)

    accepts a name, and an array of 3-element arrays
    of which the first is a name.

    if the name is found in the first element of an existing
    member of the list, return the index

    else return -1 */

function nameExists(neme, arrayList){

  for (var x=0; x<arrayList.length; x++)
    if (neme == arrayList[x][0]) return x
  

  return -1
}
///
/*———————————————————————————————————————— convertArray(envArray)

    accepts an array of three-element arrays:
    name, success/fail boolean, message

    returns string */

// empty arrays were added to beginning of envArray

function convertArray(arr){
  if (arr.length == 0) return ''

  var result = []
  for (var x=0; x<arr.length; x++){
    result.push(arr[x][0] + ' ' + arr[x][2])
}

  return result.join('\n')
}
///
/*———————————————————————————————————————— getAlertDepth(img)
    
    This exists so that yellow highlight boxes will be:
    - in front of image if image is not grouped
    - in front of group if image is grouped */

function getAlertDepth(img){

  if (img.parent.typename != 'GroupItem')
    return img.absoluteZOrderPosition

  var obj = img
  while (obj.parent.typename == 'GroupItem')
     obj = obj.parent

  alert('Group depth: '+obj.absoluteZOrderPosition)
  return obj.absoluteZOrderPosition
}
///

//:::::::::::::::::::::::::::::::::::::::: were in UTILITIES.jsx

/*———————————————————————————————————————— getExtension(path)

    */

function getExtension(path){
  var ending = String(path).substr(-5)
  var bits = ending.split('.')
  return '.' + bits[1]
}
///
/*———————————————————————————————————————— getFileSize(page)

// page.path = parent folder
// page.name = filename
// together is full pagh */

function getFileSize(page){
  try{
    var ref = File(CONCATENATEPATH(page.path, page.name))
    var fileSize = Math.round(ref.length / 1000 / 1000 * 100)/100
    return fileSize
  }
  catch(e){ return -1 }
}
///
/*———————————————————————————————————————— isTwoLetters(n)

    returns true if n is two letters or numbers
    a-z, A-Z, 0-9 */

function isTwoLetters(n){
  const regex = /^[a-zA-Z\d][a-zA-Z\d]$/g
  if(n.match(regex) === null) return false
  return true
}
///
/*———————————————————————————————————————— newFile(folder, name)

    returns file to save into

    https://extendscript.docsforadobe.dev */

function newFile(folder, name) {

  var f = new File(folder + '/' + name)

  if (f.open("w")){ f.close() } // check access rights
  else alert('File ' + f + ' could not be written')

  return f
}
///
/*———————————————————————————————————————— relockHierarchy(obj)

    relocks elements unlocked by unlockHierarchy() */

function relockHierarchy(arr){
  for(var x=0; x<arr.length; x++){
    arr[x][0].visible = arr[x][2]
    arr[x][0].locked = arr[x][1]
  }
}
///
/*———————————————————————————————————————— unlockHierarchy(obj)

    unlocks the hierarchy above an element and returns an array

    each element of the array is a sub array containing
    [obj, obj.locked, obj.visible] */

function unlockHierarchy(obj){

  var parentLocks = []
  var thisParent = obj.parent

  while (thisParent.typename != 'Document'){
    parentLocks[parentLocks.length] = [thisParent, thisParent.locked, thisParent.visible]
    thisParent = thisParent.parent
  }

  for(var x=parentLocks.length-1; x>-1; x--){
    try{
      parentLocks[x][0].visible= true
      parentLocks[x][0].locked = false
    }
    catch(e){ alert('Page item couldn\'t be accessed: ' + e+'\n'+parentLocks[x][0].typename + ' inside ' + parentLocks[x][0].parent.name) }
  }

  return parentLocks
}
///

/*———————————————————————————————————————— validExtensionNew(img)

    exclude all but the most common image formats:

    ai|pdf|jpg|jpeg|png|gif   */


//function validExtension(img){
//
//  try{ var parts = String(img.file).split('.') }
//  catch(e){ return false }
//
//  var ext = parts[parts.length - 1]
//  var neme = img.file.name
//
//  const legalImages = /ai|pdf|jpg|jpeg|png|gif/gi
//
//  if (ext.match(legalImages) === null)
//    return false
//
//  return true 
//}
///


//:::::::::::::::::::::::::::::::::::::::: fin

// remove function artboardNames(doc){
// add >TRANSLATE to alertUser function
// translate drawYellowRectangle
