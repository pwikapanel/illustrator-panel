#target illustrator  

/* vim: set foldmethod=marker fmr=/*\—,///: */
// translate line 205 alerts

//:::::::::::::::::::::::::::::::::::::::: save.js / save.jsx
alert(8)
/*———————————————————————————————————————— notes

    if errors or warnings:
    provides an alert and returns ''

    otherwise returns a localized success message */
///

//:::::::::::::::::::::::::::::::::::::::: main VALIDATED

/*———————————————————————————————————————— savePages(saveAll) */

function savePages(saveAll){

  /*—————————————————————————————————————— initialization */

  var              d = new Date()
  var        startMs = d.getTime()           // elapsed time for user
  var     filesSaved = 0                     // # of files saved, for user
              ERRORS = []                    // error messages for user
            WARNINGS = []                    // warnings for user

  var     docsOpen   = app.documents.length  // number of open documents
  var activeDocState = app.activeDocument    // active document, to restore state
  ///
  /*—————————————————————————————————————— loop through documents */

  for (var index=0; index<docsOpen; index++){

    app.activeDocument = app.documents[index]

    if (!ISSVIJAPAGE()) continue;

    var          doc = app.activeDocument
    var originalPath = getDocPath(doc)
   
    /*———————————————————————————————————— export SVG then save as */

    if (isValid(doc)){
      if (doc.artboards.length == 1)
           { if (exportSvgFile(doc))  filesSaved += 1 }
      else { if (exportSvgFiles(doc)) filesSaved += 1 }

      var aiFile = new File(originalPath)
      doc.saveAs(aiFile, aiSaveOptions())
    }
    ///

    if (!saveAll) break;
  }

  app.activeDocument = activeDocState

  ///
  /*—————————————————————————————————————— alert if problems */

  if (ERRORS.length > 0 || WARNINGS.length > 0){
    issueListAlert(startMs)
    return ''
  }
  ///

  // must be in locale/messages.properties WRONG BECAUSE IF IT'S ONE SVIJA PAGE & SEVERAL NON & HE CLICKED SAVE ALL
  if (filesSaved > 1) return "pagesSaved"
  else if (filesSaved == 1) return "pageSaved"
  else return 'noPagesSaved'
}
///

//:::::::::::::::::::::::::::::::::::::::: complex functions

/*———————————————————————————————————————— exportSvgFile(doc) VALIDATED

  - removes any existing files that would provoke a confirmation dialog
  - deletes non-printing layers
  - saves in SYNC/Svija/SVG Files
  - restores the non-printing layers
  - resets the locked/visible status of non-printing layers

  - if artboardName is given, use it as extension & save normally
  - else save using artboards */

function exportSvgFile(doc){

  //—————————————————————————————————————— variables */

  var      svgFolder = getFolderPath(doc) // string
  var    svgFilePath = CONCATENATEPATH(svgFolder, makeSvgName(doc, 0))
  var        svgFile = File(svgFilePath)
  var    layerStates = DELETENONPRINTINGLAYERS(doc) // info about locked & visible
  var        svgOpts = svgOptions(doc)

  //—————————————————————————————————————— delete existing SVG */

  if (svgFile.exists) svgFile.remove() // tested OK

  //—————————————————————————————————————— save SVG */

  addViewboxReference()
  doc.exportFile(svgFile, ExportType.WOSVG, svgOpts)
  repairViewbox(doc, svgFile)

  //—————————————————————————————————————— restore state */

  app.undo() // get rid of reference rectangle
  RESTORENONPRINTINGLAYERS(layerStates)

  return true
}
///
/*———————————————————————————————————————— exportSvgFiles(doc) VALIDATED */

function exportSvgFiles(doc){

  //—————————————————————————————————————— variables */

  var      svgFolder = getFolderPath(doc) // string
  var  artboardIndex = doc.artboards.getActiveArtboardIndex()
  var    layerStates = DELETENONPRINTINGLAYERS(doc) // info about locked & visible
  var        svgOpts = svgOptions(doc)

  //—————————————————————————————————————— delete existing SVGs */

  for (x=0; x<doc.artboards.length; x++){
    var path = CONCATENATEPATH(svgFolder, makeSvgName(doc, x))
    var svgFile = File(path)
    if (svgFile.exists) svgFile.remove()
  }

  //—————————————————————————————————————— export SVG files */

  doc.exportFile(Folder(svgFolder), ExportType.WOSVG, svgOpts) 

  //—————————————————————————————————————— restore state */

  RESTORENONPRINTINGLAYERS(layerStates)
  doc.artboards.setActiveArtboardIndex(artboardIndex)

  return true
}
///
/*———————————————————————————————————————— isValid(doc) VALIDATED

    three possible results:
    • everything's fine                 return true
    • warning message, proceed anyway   return true
    • error message, skip this file     return false

    ERRORS = []                   // error messages for user
    WARNINGS = []                   // warnings for user

    errors:
    • file was not yet saved, user refuses to save */

function isValid(doc){

  var err

  err = linksFolderExists(doc)   // is there a Links folder?
  if (err != '')
    WARNINGS.push(err)

  err = nonNativeItems(doc)   // are there non-native items?
  if (err != '')
    WARNINGS.push(err)

  err = embeddedImages(doc)   // are there embedded images?
  if (err != '')
    WARNINGS.push(err)

  err = externalImageLinks(doc)  // are there placed images not in Links?
  if (err != '')
    WARNINGS.push(err)

  return true
}
///
/*———————————————————————————————————————— issueListAlert(fileSizes)

    alert with:
    - elapsed time
    - errors (files not saved)
    - warnings (files saved) */

function issueListAlert(startMs){

  var d = new Date()
  var ms = d.getTime() - startMs

  if (ms > 1000)
    ms =' (' + ms/1000 +' sec)'
  else
    ms = ' (' + ms + ' ms)'

alert('issueListAlert\nnot finished: '+ms)
return true

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
/*———————————————————————————————————————— replaceViewboxCoords(svgSource, viewBox) */

  //<rect id="COORDS00" class="cls-1" x="63" y="50.431" width="100" height="100"/>

  //if there is nothing above or to the left, there will be no x or y coords */

function replaceViewboxCoords(svgSource, viewBox){

  // get x & y offset

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

  // make final viewbox string

  viewBox = 'viewBox="' + x + ' ' + y + ' ' + viewBox

  // replace viewbox in SVG source

  var parts = svgSource.split('viewBox="')
  var dims  = parts[1].split('"', 1)[0]

  parts[1]  = parts[1].substr(dims.length, parts[1].length-1)
  svgSource = parts[0] + viewBox + parts[1]

  return svgSource
}
///
/*———————————————————————————————————————— repairViewbox() */

function repairViewbox(doc, svgFile){

  var viewBox = artboardDimensions(doc, 0)

  var tries = 10000

  while (tries > 0 && !svgFile.open("r"))
    tries -= 1

  if (tries == 0) return false

  // alert(tries) // 9186 test OK

  var svgSource = svgFile.read()
  svgSource = replaceViewboxCoords(svgSource, viewBox)
  svgFile.close()

  svgFile.open("w")
  svgFile.write(svgSource)
  svgFile.close()

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
  if (SYNCPATH == '')
    return doc.name + ' is not inside a \"SYNC\" folder'

  if (getFolderPath(doc) == '')
    return '"SYNC/SVIJA/SVG Files" not found'

  return ''
}
///
/*———————————————————————————————————————— linksFolderExists(sourceDoc) VERIFIED

    tests for existence of /Links folder */

function linksFolderExists(doc){

  var path = getLinksPath(doc) 
  if (!Folder(path).exists)
    return doc.name + TRANSLATE[LC].noLinksFolder

  return ''
}
///
/*———————————————————————————————————————— nonNativeItems(sourceDoc)

    has file been saved at least once?
    returns '' or error message */

function nonNativeItems(doc){

  if (doc.nonNativeItems.length > 0)
    return doc.name + ' ' + TRANSLATE[LC].hasNonNative

  return ''
}
///
/*———————————————————————————————————————— embeddedImages(sourceDoc)

    has file been saved at least once?
    returns '' or error message */

function embeddedImages(doc){

  if (doc.rasterItems.length > 0)
    return doc.name + ' ' + TRANSLATE[LC].containsEmbedded

  return ''
}
///
/*———————————————————————————————————————— externalImageLinks(sourceDoc)

    has file been saved at least once?
    returns '' or error message */

function externalImageLinks(doc){

  if (doc.placedItems.length == 0) return ''


  var linksPath = getLinksPath(doc)  // ~/Desktop/svija.dev/SYNC/Links/


  for (var x=0; x<doc.placedItems.length; x++){

    var img = doc.placedItems[0]

    try{
      var imgPath = String(img.file.fsName)
    }
    catch(e){
      alert(e)
      return doc.name + ' ' + TRANSLATE[LC].imageSansSource
    }

        // if image path is shorter, image can't be in Links folder
        if (imgPath.length < linksPath.length+4) 
          return doc.name + ' ' + TRANSLATE[LC].containsExternal
    


//       use split for below, then we have the two parts we need



        // if image path doesn't match doc path, it can't be in links folder
        var str = imgPath.slice(0, linksPath.length)
    
        if (str != linksPath)
          return doc.name + ' ' + TRANSLATE[LC].containsExternal
    
        // if what's longer than doc path contains a /, it's in some subfolder
        var str = imgPath.slice(linksPath.length, imgPath.length)
        if (str.indexOf('/') > 0 || str.indexOf('\\') > 0)
          return doc.name + ' ' + TRANSLATE[LC].containsExternal
  }

  return ''
}
///

//:::::::::::::::::::::::::::::::::::::::: other functions

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
/*———————————————————————————————————————— addViewboxReference(obj)

    create rectangle at 0,0 coords to be able to
    reset the artboard */ 

function addViewboxReference(){
  var doc = app.activeDocument

  doc.rulerOrigin = [0, doc.height]
  doc.layers.add()

  var recName = 'COORDS00'
  var alertColor = new RGBColor()
  alertColor.red = 192; alertColor.green = 255; alertColor.blue = 0
  
  var rLeft   = 0
  var rNegTop = 0
  var rWidth  = 100
  var rHeight = 100

  // unlock activeLayer

  var lock = doc.activeLayer.locked
  var vis  = doc.activeLayer.visible

  // isg81 -top, left, width, height
  var rec = doc.pathItems.rectangle( rNegTop, rLeft, rWidth, rHeight )

  rec.filled = true
  rec.stroked = false
  rec.fillColor = alertColor
  rec.opacity = 0
  rec.name = recName
  
//var returnDict = {'locked':lock, 'visible':vis, 'name':recName}
  return
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
/*———————————————————————————————————————— artboardDimensions(doc, 0) */

function artboardDimensions(doc, artboardNumber){
  var ab = doc.artboards[artboardNumber].artboardRect  // left, top, right, bottom

  var w = ab[2] - ab [0] // right - left
  var l = ab[1] - ab [3] // top - bottom

  return w + ' ' + l
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
/*———————————————————————————————————————— getFolderPath(doc)

    returns SVG folder path from SYNC folder */

function getFolderPath(doc){
 
  var s = SYNCPATH
  if (s == '') return ''

  if (ISMAC) return s + '/SVIJA/SVG Files'
  else return s + '\\SVIJA\\SVG Files'
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
/*———————————————————————————————————————— makeSvgName(doc, artboardNumber)

    creates SVG filename from doc & artboard n° */

function makeSvgName(doc, artboardNumber){
  var name = doc.name.slice(0, -3)  // remove .ai
  var artboardName = doc.artboards[artboardNumber].name
  return name + '_' + artboardName + '.svg' 
}
///

//:::::::::::::::::::::::::::::::::::::::: fin

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ START AT LINE 130
