#target illustrator  

/* vim: set foldmethod=marker fmr=/*\—,///: */

//:::::::::::::::::::::::::::::::::::::::: checkAndRepair.js / checkAndRepair.jsx

/*———————————————————————————————————————— notes

    this checks images for being
    - embedded
    - placed from outside Links folder

    if errors or warnings provides an alert 
    and returns ''

    otherwise returns a success message (localized)

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
  /*—————————————————————————————————————— store layer & pageItem states */

  var stateArray = saveLayerStates(doc, [])
  var itemArray = saveItemStates(doc, [])
//alert('itemArray\n'+itemArray.join('\n'))
  ///

  //:::::::::::::::::::::::::::::::::::::: checking & repairing

  /*—————————————————————————————————————— Links folder      create if necessary */

  var linksFolderObj = Folder(CONCATENATEPATH(doc.path, 'Links'))
  if (!Folder(linksFolderObj).exists){
    Folder(linksFolderObj).create()
    REPAIRS.push(TRANSLATE[LC].linksCreated)
  }
  ///
  /*—————————————————————————————————————— artboards         delete erroneous */

  var msgArray = removeExtraArtboards(doc)
  if (msgArray.length > 0) REPAIRS.push(msgArray)
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
  /*—————————————————————————————————————— placed images     move to Links
  
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

  /*—————————————————————————————————————— restore layer & pageItem states */

  var res1 = restoreItemStates(doc, itemArray)
  var res2 = restoreLayerStates(doc, stateArray)
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

  if (!alertChecked(doc)) return 'noProblems' // must be in locale/messages.properties
  else return ''

}
///

//:::::::::::::::::::::::::::::::::::::::: primary functions

/*———————————————————————————————————————— removeExtraArtboards(doc)

    deletes artboards that have been created by error */

function removeExtraArtboards(doc){
  var len = doc.artboards.length
  var res = []
//alert(len)
  for (var x=len-1; x>-1; x--){
//  alert('x: '+x)
//  alert('name: '+doc.artboards[x].name)
    if (doc.artboards[x].name.indexOf(' ') > 0){
      var tmp = TRANSLATE[LC].artboardRemoved1 + ' "' + doc.artboards[x].name + '" ' + TRANSLATE[LC].artboardRemoved2
      res.push(tmp)
      doc.artboards[x].remove()
      
    }
  }
  return res
}
///
/*———————————————————————————————————————— fixEmbeddedImage(obj)

    looks for the original file for an embedded image
    adds new, placed image and deletes embedded image

    takes an embedded image and tries to change it to
    a link to an external file. Not sure what happens
    if the original cannot be found, a yellow rectangle
    is placed over the image — function yellowRectangle()

    returns image filename, succes/failure, message if modification
    returns [] if no change */

function fixEmbeddedImage(doc, originalImage){

  if (!originalImage.layer.printable) return []
 
  /*—————————————————————————————————————— setup */

  var imageParent = originalImage.parent
  var imageDepth  = originalImage.absoluteZOrderPosition
  var imageName
  var replacementImage

  try{      imageName = filenameFromPath('' + originalImage.file) }
  catch(e){
    if(originalImage.name.length > 0) imageName = originalImage.name
    else imageName = TRANSLATE[LC].missingImage
  }
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

// alert('status: '+originalImage.status) // RasterLinkState.DATAFROMFILE

  if (originalImage.status != 'RasterLinkState.DATAFROMFILE') // this is a precaution
    missingOriginal = true                                    // not encountered so far
  ///
  /*—————————————————————————————————————— can't fix: create new yellow square  */

  if(!supportedFormat || missingOriginal)
    replacementImage = yellowRectangle(originalImage)
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
  /*—————————————————————————————————————— fix the image depth */

  app.redraw() // or use while loop to wait for absoluteZOrderPosition to be defined

  while (replacementImage.absoluteZOrderPosition > imageDepth+1) // NECESSARY BUT THROWS ERROR RIGHT NOW
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
/*———————————————————————————————————————— fixPlacedImage(doc, img) ADD YELLOW BOX

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

  if (!image.layer.printable) return []

  /*—————————————————————————————————————— no file */

  try{ var x = image.file } // didn't work with typeof
  catch(e){
    var n
    if (image.name != '') n = image.name
    else n = TRANSLATE[LC].missingImage

    var imageDepth  = image.absoluteZOrderPosition
    var replacementImage = yellowRectangle(image)
    app.redraw() // or use while loop to wait for absoluteZOrderPosition to be defined

    while (replacementImage.absoluteZOrderPosition > imageDepth+1) // NECESSARY BUT THROWS ERROR RIGHT NOW
      replacementImage.zOrder(ZOrderMethod.SENDBACKWARD)
    replacementImage.name = TRANSLATE[LC].missingOriginal

    msg = TRANSLATE[LC].hasNoFile
    return [n, false, msg]
  }
  ///
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
  /*—————————————————————————————————————— is it a Creative Cloud image? */

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
/*———————————————————————————————————————— alertChecked(doc)

    if problems, shows alert else returns ''
    alert with:
    - elapsed time
    - errors (big problems)
    - warnings (minor problems)
    - image fixes
    - failed image repairs */

function alertChecked(doc){



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
  else ms += ' ms'

  msg += '\n\n' + ms
  alert(msg)
  return true
}
///

//:::::::::::::::::::::::::::::::::::::::: utility functions

/*———————————————————————————————————————— yellowRectangle(obj)

  create translucent rectangle to signal embedded images
  that can't be found and need to be replaced */

function yellowRectangle(obj){

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

//alert('Group depth: '+obj.absoluteZOrderPosition)
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
  catch(e){ return true }

  var ext = parts[parts.length - 1]
  var neme = img.file.name

  const legalImages = /ai|pdf|jpg|jpeg|png|gif/gi

  if (ext.match(legalImages) === null)
    return false

  return true 
}
///
/*———————————————————————————————————————— saveLayerStates(obj, stateArray)

    recursive function to save layer state, including
    locked, visible and name (for debugging) */

function saveLayerStates(obj, stateArray){

  var len = obj.layers.length
//alert('treating "'+obj.name +'"\n'+ len +' layers to be treated')

  for (var x=0; x<len; x++) {
    var layer = obj.layers[x]
//  alert(x + ': adding layer "'+layer.name +'"')

    var thisData = [layer.visible, layer.locked, layer.name]
    stateArray.push(thisData)
//  alert('layer: '+layer.name+'\nvisible: '+layer.visible+' • locked: '+layer.locked)
    layer.visible = true
    layer.locked = false

    if (layer.layers.length > 0){
//    alert('"' + layer.name +'" has sublayers')
      stateArray = stateArray.concat(saveLayerStates(layer, stateArray))
    }
  }
  return stateArray
}
/// */
/*———————————————————————————————————————— restoreLayerStates(obj, stateArray) */

function restoreLayerStates(obj, stateArray){

//alert('treating "'+obj.name +'"')
  var len = obj.layers.length
//alert(len +' layers to be treated')

  for (var x=len-1; x>-1; x--) {
    var layer     = obj.layers[x]

    if (layer.layers.length > 0){
//    alert('"' + layer.name +'" has sublayers')
      stateArray = restoreLayerStates(layer, stateArray)
    }

//  alert(x + ': restoring layer "'+layer.name +'"')
    var thisData  = stateArray.pop()
//  alert('layer: '+thisData[2]+'\nvisible: '+thisData[0]+' • locked: '+thisData[1])
    layer.visible = thisData[0]
    layer.locked  = thisData[1]
    var debugName = thisData[2]

  }
  return stateArray
}
///
/*———————————————————————————————————————— saveItemStates(obj, itemArray)

    saves locked & hidden status for every item
    excluding layers, which are saved separately */

function saveItemStates(obj, itemArray){

  var len = obj.pageItems.length

  for (var x=0; x<len; x++) {

//  if (x==0) DUMPKEYS(obj.pageItems[x])

    var pageItem = obj.pageItems[x]

    var tempName = pageItem.typename + ' ('+pageItem.name+') ' + pageItem.uuid

    var thisData = [pageItem.hidden, pageItem.locked, tempName]
    itemArray.push(thisData)

//  alert(x + ' saving item: '+tempName+'\nhidden: '+pageItem.hidden+' • locked: '+pageItem.locked)

    pageItem.hidden = false
    pageItem.locked = false
  }
  return itemArray
}
/// */
/*———————————————————————————————————————— restoreItemStates(obj, stateArray) */

function restoreItemStates(obj, stateArray){

  var len = obj.pageItems.length

  for (var x=len-1; x>-1; x--) {
    var pageItem  = obj.pageItems[x]

    if (pageItem.name.slice(0,1) == '▼') continue;

    var thisData  = stateArray.pop()

//  alert(x + ' restoring item: '+thisData[2]+'\nhidden: '+thisData[0]+' • locked: '+thisData[1])

    pageItem.hidden = thisData[0]
    pageItem.locked  = thisData[1]
  }
  return stateArray
}
///
/*———————————————————————————————————————— filenameFromPath(originalImage.file)

    returns last part of path = image filename */

function filenameFromPath(str){
  if (str.indexOf('/') < 0) return '<image>'

  var parts = str.split('/')
  var res = parts[parts.length -1 ]
  return decodeURI(res)
}
///

//:::::::::::::::::::::::::::::::::::::::: fin

