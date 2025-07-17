#target illustrator  

/* vim: set foldmethod=marker fmr=/*\—,///: */

//:::::::::::::::::::::::::::::::::::::::: save.js / save.jsx

/*———————————————————————————————————————— notes

    if errors or warnings provides an alert 
    and returns ''

    otherwise returns a success message (localized) */
///

//:::::::::::::::::::::::::::::::::::::::: main

/*———————————————————————————————————————— program */

function savePages(saveAll){

  /*—————————————————————————————————————— initialization */

            ERRORS = []                    // error messages for user
          WARNINGS = []                    // warnings for user

  var            d = new Date()
  var      STARTMS = d.getTime()
  var    fileSizes = []
  var      appDocs = app.documents         // array of open documents
  var     docsOpen = appDocs.length        // number of open documents
  var frontmostDoc = app.activeDocument    // active document, to restore state
  ///
  /*—————————————————————————————————————— "for" loop through documents */

  for (var index=0; index<docsOpen; index++){

    app.activeDocument = appDocs[index]
    var doc            = app.activeDocument

    /*———————————————————————————————————— export SVG then save as */

    if (isValid(doc)){

      var  artboardState = doc.artboards.getActiveArtboardIndex()
      var   originalPath = getDocPath(doc)

      var theseFileSizes = exportSvgFile(doc)
      var         aiFile = new File(originalPath)
      doc.saveAs( aiFile, aiSaveOptions())

      doc.artboards.setActiveArtboardIndex(artboardState)

    }
    ///

    if (!saveAll) break
  }

  app.activeDocument = frontmostDoc

  ///
  /*—————————————————————————————————————— alert if problems */

  if (ERRORS.length > 0 || WARNINGS.length > 0){
    alertUserSave(fileSizes)
    return ''
  }
  ///

  // must be in locale/messages.properties
  if (docsOpen > 1) return "pagesSaved"
  else return 'pageSaved'
}
///

//:::::::::::::::::::::::::::::::::::::::: complex functions

/*———————————————————————————————————————— exportSvgFile(doc)

  - removes any existing files that would provoke a confirmation dialog
  - deletes non-printing layers
  - saves in SYNC/Svija/SVG Files
  - restores the non-printing layers
  - resets the locked/visible status of non-printing layers

  - if artboardName is given, use it as extension & save normally
  - else save using artboards */

function exportSvgFile(doc){

  var layerInfo = DELETENONPRINTINGLAYERS(doc) // info about locked & visible
  var replaceViewbox = false

  /*—————————————————————————————————————— "SYNC/SVIJA/SVG Files" */

  var svgFolderPath = getSvgFolderPath(doc) // string
  var   diskObject = Folder(svgFolderPath)
  ///
  //———————————————————————————————— avoid overwrite confirmations */

  for (x=0; x<doc.artboards.length; x++){
    var path = CONCATENATEPATH(svgFolderPath, makeSvgName(doc, x))
    if (File(path).exists){
      File(path).remove()
    }
  }
  ///
  //———————————————————————————————— create different obj if single artboard */

  if (doc.artboards.length == 1){
    var path = CONCATENATEPATH(svgFolderPath, svgNameSingleArtboard(doc))
    diskObject = new File(path)
  }
  ///

  //———————————————————————————————— add marker rectangle to find artboard */

  if (doc.artboards.length == 1){
    app.activeDocument.rulerOrigin = [0,doc.height]
    doc.layers.add()
    var rectDict = rectAt00()
    var replaceViewbox = true
  }
  ///

  //———————————————————————————————— export SVG files */

  var svgOpts = svgOptions(doc)
  doc.exportFile(diskObject, ExportType.WOSVG, svgOpts) 
  ///

  //———————————————————————————————— is single artboard: get viewBox size */

  if (replaceViewbox){
    var ab = doc.artboards[0].artboardRect  // left, top, right, bottom

    var w = ab[2] - ab [0] // right - left
    var l = ab[1] - ab [3] // top - bottom

    var viewBox =  w + ' ' + l
  }
  ///

  //———————————————————————————————— get SVG contents */

  // we will need to update the viewBox coordinates after saving */

  if (replaceViewbox){
    var tries = 500

    while (tries > 0 && !diskObject.open("r"))
      tries -= 1

    if (tries > 0){
      var svgSource = diskObject.read()
      diskObject.close()
    }
    else{
      alert('Temporary Error\nPlease add a second artboard and re-save.')
      svgSource = ''
      replaceViewbox = false
    }
  }
  ///

  //———————————————————————————————— get correct viewBox */

  //<rect id="COORDS00" class="cls-1" x="63" y="50.431" width="100" height="100"/>

  //if there is nothing above or to the left, there will be no x or y coords */

  if (replaceViewbox){

    var parts = svgSource.split('COORDS00" ')
    var piece = parts[1].split(' width=', 1)[0]

    var x = 0
    var y = 0

    var regx = /x="([0-9\.]*)"/g
    var regy = /y="([0-9\.]*)"/g

    var resx = regx.exec(piece)
    var resy = regy.exec(piece)

    if (resx != null) x = resx[1]
    if (resy != null) y = resy[1]

    viewBox = 'viewBox="' + x + ' ' + y + ' ' + viewBox
  ///

  }

  //———————————————————————————————— replace viewBox in SVG source */

  if (replaceViewbox){
    var parts = svgSource.split('viewBox="')
    var dims  = parts[1].split('"', 1)[0]

    parts[1]  = parts[1].substr(dims.length, parts[1].length-1)
    svgSource = parts[0] + viewBox + parts[1]

    diskObject.open("w")
    diskObject.write(svgSource)
    diskObject.close()
  }
  ///

  /*—————————————————————————————————————— restore state */

  if (replaceViewbox) app.undo()

  RESTORENONPRINTINGLAYERS(layerInfo)
  ///

  //———————————————————————————————— get file sizes */

  var sizes = []

  for (x=0; x<doc.artboards.length; x++){

    var path = CONCATENATEPATH(svgFolderPath, makeSvgName(doc, x))

    path = encodeURI(path)
    var fileSize = File(path).length

    sizes.push(doc.artboards[x].name)
    sizes.push(fileSize)
  }
  ///


  return sizes
}
///
/*———————————————————————————————————————— isValid(doc)

    three possible results:
    • everything's fine                 return true
    • warning message, proceed anyway   return true
    • error message, skip this file     return false

    ERRORS = []                   // error messages for user
    WARNINGS = []                   // warnings for user

    errors:
    • file was not yet saved, user refuses to save */

function isValid(doc){
//const isValid =(doc)=> { // DID NOT WORK

  var err, warn

//———————————————————— fatal errors


  err = HASPATH(doc)           // has file been saved at least once?
  if (err != '')
    return dontSave(err)

  err = isAi(doc)              // is it an AI file?
  if (err != '')
    return dontSave(err)

  err = hasFolders(doc)        // is file in a /SYNC/ folder?
  if (err != '')
    return dontSave(err)

//———————————————————— non fatal errors

  err = hasLinks(doc)           // is there a Links folder?
  if (err != '')
    WARNINGS.push(err)

  err = hasNonNative(doc)       // are there non-native items?
  if (err != '')
    WARNINGS.push(err)

  err = hasEmbedded(doc)        // are there embedded images?
  if (err != '')
    WARNINGS.push(err)

  err = hasPlaced(doc)          // are there placed images not in Links?
  if (err != '')
    WARNINGS.push(err)

  return true
}
///

//:::::::::::::::::::::::::::::::::::::::: validity functions

/*———————————————————————————————————————— isAi(doc)

    just checks if file is a .ai and not a PDF
    or SVG or whatever */

function isAi(doc){
  var fileExt  = doc.name.slice(-3)

  if (fileExt != '.ai')
    return 'File ' + doc.name + ' is not a .ai file and was not saved'

  return ''
}
///
/*———————————————————————————————————————— hasFolders(sourceDoc) VERIFIED

    checks for a SYNC folder first
    checks for an SVG Files folder second

    returns '' or error message */

function hasFolders(doc){
try{
  if (SYNCPATH == '')
    return doc.name + ' is not inside a \"SYNC\" folder'
}catch(e){alert(e)}

  if (getSvgFolderPath(doc) == '')
    return '"SYNC/SVIJA/SVG Files" not found'

  return ''
}
///
/*———————————————————————————————————————— hasLinks(sourceDoc)

    tests for existence of /Links folder */

function hasLinks(doc){

  var linksFolder = getLinksPath(doc) 

  if (!Folder(path).exists) return doc.name + ' has no \"Links\" folder'
  else                      return ''
}
///
/*———————————————————————————————————————— hasNonNative(sourceDoc)

    has file been saved at least once?
    returns '' or error message */

function hasNonNative(doc){
  if (doc.nonNativeItems.length > 0)
    return doc.name + ' contains non-native items (see "Appearance" panel)'
  else
    return ''
}
///
/*———————————————————————————————————————— hasEmbedded(sourceDoc)

    has file been saved at least once?
    returns '' or error message */

function hasEmbedded(doc){
  if (doc.rasterItems.length > 0)
    return doc.name + ' contains embedded images. Please run "Check & Repair"'
  else
    return ''
}
///

// CAUSES ERRORS v

/*———————————————————————————————————————— hasPlaced(sourceDoc)

    has file been saved at least once?
    returns '' or error message */

function hasPlaced(doc){
  if (doc.placedItems.length == 0) return ''

  var linksPath = getLinksPath(doc)  // ~/Desktop/svija.dev/SYNC/Links/

  for (var x=0; x<doc.placedItems.length; x++){

    var img = doc.placedItems[0]
    if (!img.layer.printable) continue;

    try{
      var imgPath = String(img.file.fsName) // ~/Captures/capture%2029.jpg  // THIS LINE THROWS UNCATCHABLE ERROR
    }
    catch(e){
      alert(e)
      return doc.name + ' contains an image with no source. Please run "Check & Repair"'
    }

        // if image path is shorter, image can't be in Links folder
        if (imgPath.length < linksPath.length+4) 
          return doc.name + ' contains external images. Please run "Check & Repair"'
    
        // if image path doesn't match doc path, it can't be in links folder
        var str = imgPath.slice(0, linksPath.length)
    
        if (str != linksPath)
          return doc.name + ' contains external images. Please run "Check & Repair"'
    
        // if what's longer than doc path contains a /, it's in some subfolder
        var str = imgPath.slice(linksPath.length, imgPath.length)
        if (str.indexOf('/') > 0 || str.indexOf('\\') > 0)
          return doc.name + ' contains external images. Please run "Check & Repair"'
  }

  return ''
}
///

//:::::::::::::::::::::::::::::::::::::::: other functions

//  rec.opacity = 100 returns name not dict

/*———————————————————————————————————————— alertUserSave(fileSizes)

    alert with:
    - elapsed time
    - errors (files not saved)
    - warnings (files saved) */

function alertUserSave(fileSizes){

  count = fileSizes.length

  var d = new Date()
  var ms = d.getTime() - STARTMS

  if (ms > 1000)
    ms =' (' + ms/1000 +' sec)'
  else
    ms = ' (' + ms + ' ms)'

  switch(count){
    case  0: var title = 'File(s) Not Saved';  break;
    case  1: var title = 'File Saved' + ms;    break;
    default: var title = count + ' Files Saved' + ms;
  }

  var body = ''

  if (fileSizes.length == 1)
    body += '\n' + fileSizeReport(fileSizes)

  if (ERRORS.length > 0)
    body += '\n' + ERRORS.join('\n')
  
  if (WARNINGS.length > 0)
    body += '\n' + WARNINGS.join('\n')

  alert(title + body)
  return true
}
///
/*———————————————————————————————————————— svgOptions(doc)

  sets options for SVG file */

function svgOptions(doc){

  var options = new ExportOptionsWebOptimizedSVG()

  options.artboardRange         = '' // or '1-3'
  options.coordinatePrecision   = 3
  options.cssProperties         = SVGCSSPropertyLocation.STYLEELEMENTS
  options.fontSubsetting        = SVGFontSubsetting.None   // probably not supported
  options.fontType              = SVGFontType.SVGFONT
  options.rasterImageLocation   = RasterImageLocation.PRESERVE
  options.saveMultipleArtboards = true    // Deletes all artwork outside active artboard
  options.svgId                 = SVGIdType.SVGIDREGULAR
  options.svgMinify             = false // should use in future
  options.svgResponsive         = true

//options.fontType              = SVGFontType.OUTLINEFONT

  if (doc.artboards.length == 1)
    options.saveMultipleArtboards = false   // Preserves all artwork outside active artboard

  return options
}
///
/*———————————————————————————————————————— aiSaveOptions() */

function aiSaveOptions(){

//options.compatibility = Compatibility['ILLUSTRATOR0' ] // user's version
//options.compatibility = Compatibility['ILLUSTRATOR17'] // CC Legacy

  var         options   = new IllustratorSaveOptions()

  options.pdfCompatible = false // much faster
  options.compressed    = false // a bit faster

  return options
}
///
/*———————————————————————————————————————— rectAt00(obj)

    create rectangle at 0,0 coords to be able to
    reset the artboard */ 

function rectAt00(){
  var recName = 'COORDS00'
  var alertColor = new RGBColor()
  alertColor.red = 192; alertColor.green = 255; alertColor.blue = 0
  
  var rLeft   = 0
  var rNegTop = 0
  var rWidth  = 100
  var rHeight = 100

  // unlock activeLayer

  var lock = app.activeDocument.activeLayer.locked
  var vis  = app.activeDocument.activeLayer.visible

  // isg81 -top, left, width, height
  var rec = app.activeDocument.pathItems.rectangle( rNegTop, rLeft, rWidth, rHeight )

  rec.filled = true
  rec.stroked = false
  rec.fillColor = alertColor
  rec.opacity = 0
  rec.name = recName
  
//var returnDict = {'locked':lock, 'visible':vis, 'name':recName}
  return rec.name
}
///
/*———————————————————————————————————————— dontSave(err)

    permits deleting braces in function isValid */

function dontSave(err){
  ERRORS.push(err)
  return false
}
///
/*———————————————————————————————————————— fileSizeReport(fileSizes)

    returns a text snippet with file sizes */

function fileSizeReport(fileSizes){

  var thisFile = fileSizes[0]

  var aiName = thisFile[0]
  var aiSize = makeMB(thisFile[1])
  var report

  var svgSizes = []

  for (var y=2; y<thisFile.length; y+=2){
    var artbName = thisFile[y]
    var svgSize = makeMB(thisFile[y+1])
    svgSizes.push(artbName+' page '+svgSize)
  }

  report  = svgSizes.join('\n')
  report += '\nIllustrator file '+aiSize

  return report

}
///
/*———————————————————————————————————————— getLinksPath(doc)

    returns path of links folder */

function getLinksPath(doc){
  var path = doc.path.fsName

  return CONCATENATEPATH(path, 'Links')
}
///

//:::::::::::::::::::::::::::::::::::::::: moved from utilities.jsx

/*———————————————————————————————————————— getDocPath(doc)

    returns full path of doc */

function getDocPath(doc){
  if (ISMAC) return doc.path.fsName + '/' + doc.name
  else return doc.path.fsName + '\\' + doc.name
}
///
/*———————————————————————————————————————— getSvgFolderPath(doc)

    returns SVG folder path from SYNC folder */

function getSvgFolderPath(doc){
 
  var s = SYNCPATH
  if (s == '') return ''

  if (ISMAC) return s + '/SVIJA/SVG Files'
  else return s + '\\SVIJA\\SVG Files'
}
///
/*———————————————————————————————————————— svgNameSingleArtboard(doc)

    creates SVG name for single-artboard files */

function svgNameSingleArtboard(doc){
  var radical = doc.name.substr(0,doc.name.length-3)
  var artboard = doc.artboards[0].name
  var result = radical + '_' + artboard + '.svg'
  return result
}
///
/*———————————————————————————————————————— makeMB(x)

    givent a number of bytes, returns a value
    in KB or MB for human consumption */

function makeMB(x){

  var ext = ' MB'
  var div = 1000

  if (x < 1000000){
    ext = ' KB'
    div = 1
  }

  x = Math.round(x / div / 1000 * 100)/100
  return x + ext
}
///
/*———————————————————————————————————————— makeSvgName(doc, ab)

    creates SVG filename from doc & artboard n° */

function makeSvgName(doc, ab){
  var name = doc.name.slice(0, -3)  // remove .ai
  return name + '_' + doc.artboards[ab].name + '.svg' 
}
///

//:::::::::::::::::::::::::::::::::::::::: fin

