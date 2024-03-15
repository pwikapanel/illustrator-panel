
//:::::::::::::::::::::::::::::::::::::::: place-image.jsx

/*———————————————————————————————————————— notes 

    place-image.jsx

    1.0.3

    notes:

    JSR = JavaScript Scripting Reference.pdf
    ISG = Illustrator Scripting Guide
    using ampersands in // comments causes crashes

    This same script is used for both Save as Svija
    and "Save CC (Legacy).jsx" but Version(0) is
    changed to Version(17) for the latter. */

/*———————————————————————————————————————— EULA

    Copyright (c) Svija SAS

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

    svija.com · hello@svija.com   */


//:::::::::::::::::::::::::::::::::::::::: program

// allow multiple selection?

/*———————————————————————————————————————— placeImage()

    • opens a place dialog in the correct links folder
    • creates a Links folder if needed */

#target illustrator  

function placeImage(replaceImg, isMac){

  if (isMac == 'true' ) isMac = true
  if (isMac == 'false')  isMac = false

  // initialization ——————————————————————————————————————————————————————————

  var doc       = app.activeDocument
  var layer     = doc.activeLayer

  if (isMac)
    var linksPath = doc.path.fsName + '/Links'
  else
    var linksPath = doc.path.fsName + '\\Links'

  // get layer & unlock if necessary —————————————————————————————————————————

  layer.locked = false

  // create Links folder if necessary ————————————————————————————————————————

  if (!Folder(linksPath).exists) Folder(linksPath).create();

  // get positon if possible —————————————————————————————————————————————————

  var centerX = centerY = -1

  if (doc.selection.length > 0){
    var selection  = doc.selection[0]
    var r = selection.geometricBounds // global coords [L T R B]

    var rLeft   = r[0]
    var rTop    =   0 -r[1]
    var rWidth  = r[2]-r[0]
    var rHeight = r[1]-r[3]

    var centerX = rLeft + rWidth / 2
    var centerY = rTop  + rHeight / 2
  }

  // place image —————————————————————————————————————————————————————————————

  var placedImage  = layer.placedItems.add()
  var aseFile      = Folder(linksPath)

  try{
    placedImage.file = aseFile.openDlg('Choisir l\'image à importer…')
  } catch(e){
    placedImage.remove()
    return ''
  }

  // position image ——————————————————————————————————————————————————————————

  var selection  = doc.selection[0]
  var r = selection.geometricBounds // global coords [L T R B]

  var rLeft   = r[0]
  var rTop    =   0 -r[1]
  var rWidth  = r[2]-r[0]
  var rHeight = r[1]-r[3]

  var centerXnew = rLeft + rWidth / 2
  var centerYnew = rTop  + rHeight / 2

  if (centerX != -1)
    selection.translate(centerX-centerXnew, centerYnew-centerY)


  return ''

}


//:::::::::::::::::::::::::::::::::::::::: functions

/*———————————————————————————————————————— fileFilter() UNUSED

    decides which type of files can be selected
    in finder dialog */

function fileFilter(){ return true; }


//:::::::::::::::::::::::::::::::::::::::: fin

