#target illustrator  

/* vim: set foldmethod=marker fmr=/*\—,///: */

//alert(0)

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

//:::::::::::::::::::::::::::::::::::::::: main

/*———————————————————————————————————————— program */

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

  var layerStates = DELETENONPRINTINGLAYERS(doc)
  ///

  //:::::::::::::::::::::::::::::::::::::: checking & repairing

  /*—————————————————————————————————————— "Links" folder    create if necessary */

  var linksFolderObj = Folder(CONCATENATEPATH(doc.path, 'Links'))
  if (!Folder(linksFolderObj).exists){
    Folder(linksFolderObj).create()
    REPAIRS.push(TRANSLATE[LC].linksCreated)
  }
  ///
  /*—————————————————————————————————————— embedded images   place if possible (rasterItems)
  
      these are treated before placed images, because they will be
      changed to placed in the next step
  
      fixEmbeddedImage() returns image filename, success/failure, message

      negative loop because length gets shorter as we go */

  var len = doc.rasterItems.length
  for (var x=len-1; x>-1; x--){
    var img = doc.rasterItems[x]
    var msgArray = fixEmbeddedImage(doc, img)
  
    if (msgArray.length > 0)
      IMAGESMODIFIED.push(msgArray)
  }
  /// 
  /*—————————————————————————————————————— placed images      move to Links
  
      fixPlacedImage() returns image filename, success/failure, message */

  var len = doc.placedItems.length
  for (var x=len; x>0; x--){
    var img = doc.placedItems[x-1]
    var msgArray = fixPlacedImage(doc, img)
  
    if (msgArray.length > 0)
      IMAGESMODIFIED.push(msgArray)
  }
  ///

  //:::::::::::::::::::::::::::::::::::::: clean up

  /*—————————————————————————————————————— restore non-printing layers */

  RESTORENONPRINTINGLAYERS(layerStates)
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
  
      var imageName = IMAGESMODIFIED[x][0]
      var index     = nameExists(imageName, IMAGESFIXED)
  
      if (index < 0) IMAGESFIXED[IMAGESFIXED.length] = IMAGESMODIFIED[x]
      else           IMAGESFIXED[index] = IMAGESMODIFIED[x]
    }
  }
  ///
  //———————————————————————————————————————— alert user

  if (!alertUser(doc)) return 'noProblems' // must be in locale/messages.properties
  else return ''

}
///

//:::::::::::::::::::::::::::::::::::::::: primary functions

/*———————————————————————————————————————— fixEmbeddedImage(obj)

    looks for the original file for an embedded image
    adds new, placed image and deletes embedded image

    takes an embedded image and tries to change it to
    a link to an external file. Not sure what happens
    if the original cannot be found, a yellow rectangle
    is placed over the image — function drawYellowRectangle()

    returns image filename, succes/failure, message if modification
    returns [] if no change */

function fixEmbeddedImage(doc, originalImage){
 
  /*—————————————————————————————————————— setup */

  var imageParent = originalImage.parent
  var imageDepth  = originalImage.absoluteZOrderPosition
  var imageName
  var replacementImage

  if (originalImage.name != '') imageName = originalImage.name
  else
    imageName = TRANSLATE[LC].missingImage 
  ///
  /*—————————————————————————————————————— is format supported? */

  var supportedFormat = checkSupportedFormat(originalImage) // boolean
  ///
  /*—————————————————————————————————————— is original findable? */

  var missingOriginal = true

  try{
    var originalPath = originalImage.file   // usually contains original file, even if image is embedded
    var originalFile = new File(originalPath)
     missingOriginal = false
  } catch(e){  }

  if (originalImage.status != 'RasterLinkState.DATAFROMFILE') // this is a precaution
    missingOriginal = true                                    // not encountered so far
  ///
  /*—————————————————————————————————————— can't fix: create new yellow square  */

  if(!supportedFormat || missingOriginal)
    replacementImage = drawYellowRectangle(originalImage)
  ///
  /*—————————————————————————————————————— can fix: create new image for fix */

  if(supportedFormat && !missingOriginal){

    replacementImage      = imageParent.placedItems.add()
    replacementImage.file = originalFile
  
    for (var key in originalImage){
      try{ replacementImage[key] = originalImage[key] }
      catch(e){}
    }
   
    var moveMatrix  = app.getScaleMatrix(100,-100)
    var totalMatrix = concatenateRotationMatrix(moveMatrix, 10) // maybe has an effect — test when done
    replacementImage.transform(moveMatrix)
  }
  ///
  /*—————————————————————————————————————— correct the image depth */

  while (replacementImage.absoluteZOrderPosition > imageDepth+1)
    replacementImage.zOrder(ZOrderMethod.SENDBACKWARD)
  ///
  /*—————————————————————————————————————— prepare response */

  if (!supportedFormat){                                // unsupported format = yellow triangle
    replacementImage.name = TRANSLATE[LC].badFormat
    var success = false
    var msg = TRANSLATE[LC].unsupportedFormat
  }
  else if (missingOriginal){                            // missing original = yellow triangle
    replacementImage.name = TRANSLATE[LC].embeddedImage 
    var success = false
    var msg = TRANSLATE[LC].highlighted 
  }
  else{                                                 // image successfully relinked
    replacementImage.name = imageName
    var success = true
    var msg = TRANSLATE[LC].relinked

    originalImage.remove()
  }
  ///

  return [imageName, success, msg]
}
///
/*———————————————————————————————————————— fixPlacedImage(doc, img)

    three cases:

    image is far away
    image is in same folder as Ai doc
    image is in links folder already

    image can't be missing unless it
    was moved after document was opened


    copy if outside of current folder, otherwise move

    returns image filename, succes/failure, message if modification
    returns [] if no change */

function fixPlacedImage(doc, image){

  /*—————————————————————————————————————— setup */

  var imageName        = image.file.name
  var imageFolder      = image.file.path
  var currentImagePath = CONCATENATEPATH(imageFolder, imageName)

  var pageFolder       = Folder(app.activeDocument.path)
  var linksFolder      = CONCATENATEPATH(pageFolder, 'Links')
  var correctImagePath = CONCATENATEPATH(linksFolder, imageName)

  var msg // message for user
  ///
  /*—————————————————————————————————————— no need to repair */

  if (currentImagePath == correctImagePath) return []
  ///
  /*—————————————————————————————————————— is it a Creative Cloud image? CHECK THIS */

  var isCloud = String(image.file).indexOf('Creative%20Cloud%20Libraries')
  if (isCloud > 0){
    var ext = getExtension(image.file)
    imageName = image.name + '-CC' + ext
    correctImagePath = CONCATENATEPATH(linksFolder, imageName)
  }
  ///
  /*—————————————————————————————————————— is image already in correct location ? */

  var replacementFile = new File(correctImagePath) // hypothetical until actually created

  if(replacementFile.exists) msg = TRANSLATE[LC].linkUpdated
  else{
    image.file.copy(replacementFile)
    msg = TRANSLATE[LC].copiedToLinks
  }
  ///
  /*—————————————————————————————————————— delete original if moved */

  if (imageFolder == pageFolder){
    image.file.remove()
    msg = TRANSLATE[LC].movedToLinks
  }
  ///

  image.file = replacementFile
  return [imageName, true, msg]
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



  var fileSize = getFileSize(doc)

  var title = doc.name
  var bodyParts = []

  if (WARNINGS.length > 0)
    bodyParts.push(TRANSLATE[LC].checkWarnings + '\n' + WARNINGS.join('\n'))

  if (ERRORS.length > 0)
    bodyParts.push(TRANSLATE[LC].checkErrors + '\n' + ERRORS.join('\n'))
  
  if (REPAIRS.length > 0)
    bodyParts.push(TRANSLATE[LC].checkRepairs + '\n' + REPAIRS.join('\n'))

  if (IMAGESFIXED.length > 0)
    bodyParts.push(TRANSLATE[LC].checkFixed + '\n' + convertArray(IMAGESFIXED))

  if (IMAGESFAILED.length > 0)
    bodyParts.push(TRANSLATE[LC].checkFailed + '\n' + convertArray(IMAGESFAILED))

  if (bodyParts.length == 0){
    return false
  }

  body = bodyParts.join('\n\n')
  var msg = decodeURI(title + '\n' + body)

  var d = new Date()
  var ms = (d.getTime()-STARTMS)

  if (ms > 1000) ms = ms/1000 +' ' + TRANSLATE[LC].seconds
  else ms += ' MS'

  msg += '\n\n' + ms
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

  // isg81 -top, left, width, height
  var rec = obj.parent.pathItems.rectangle( rNegTop, rLeft, rWidth, rHeight )

  rec.filled = true
  rec.stroked = false
  rec.fillColor = alertColor
  rec.opacity = 50

  return rec
}
///
/*———————————————————————————————————————— nameExists(str, arrayList)
      
    var index = nameExists(name, IMAGESFIXED)

    accepts a name, and an array of 3-element arrays
    of which the first is a name.

    if the name is found in the first element of an existing
    member of the list, return the index

    else return -1 */

function nameExists(str, arrayList){

  for (var x=0; x<arrayList.length; x++)
    if (str == arrayList[x][0]) return x
  
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
/*———————————————————————————————————————— supportedFormat(img)

    exclude all but the most common image formats:

    ai|pdf|jpg|jpeg|png|gif   */


function checkSupportedFormat(img){

  try{ var parts = String(img.file).split('.') }
  catch(e){ return false }

  var ext = parts[parts.length - 1]
  var neme = img.file.name

  const legalImages = /ai|pdf|jpg|jpeg|png|gif/gi

  if (ext.match(legalImages) === null)
    return false

  return true 
}
///

//:::::::::::::::::::::::::::::::::::::::: fin

// add >TRANSLATE to alertUser function
// translate drawYellowRectangle
