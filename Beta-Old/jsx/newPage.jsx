
//:::::::::::::::::::::::::::::::::::::::: new-page.jsx

/*———————————————————————————————————————— notes 

    new-page.jsx

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

function newPage(module, lastPath, isMac){

  if (isMac == 'true' ) isMac = true
  if (isMac == 'false') isMac = false

  // initialization ——————————————————————————————————————————————————————————

  var doc            = app.activeDocument

  var wholePath      = String(doc.path.fsName)
//alert(wholePath)// returns correct path for current folder

  if (isMac)
    var syncIndex      = wholePath.indexOf('/sync')
  else
    var syncIndex      = wholePath.indexOf('\\sync')


  if (isMac)
    var templateFolder = wholePath.substr(0, syncIndex) + '/sync/SVIJA/Templates/'
  else
    var templateFolder = wholePath.substr(0, syncIndex) + '\\sync\\SVIJA\\Templates\\'

  var pagePath       = templateFolder + 'Page.ait'
  var modulePath     = templateFolder + 'Module.ait'

  // open template if possible ———————————————————————————————————————————————

  if (module){
    var openFile = new File(modulePath)
    try{ app.open(openFile) }
    catch(e){ alert('Fichier manquant\nMerci de créer\nsync/SVIJA/Templates/Module.ait'); return }
  }
  else{
    var openFile = new File(pagePath)
    try{ app.open(openFile) }
    catch(e){ alert('Fichier manquant\nMerci de créer\nsync/SVIJA/Templates/Page.ait'); return }
  }

  // save file in last known location ————————————————————————————————————————


  if (isMac)
    var lastSlash = lastPath.lastIndexOf('/')
  else
    var lastSlash = lastPath.lastIndexOf('\\')

  var lastDir   = lastPath.substr(0, lastSlash+1)

  if (module) var str = 'Nom de module.ai'
  else        var str = 'Nom de page.ai'

  var aiFile  = new File(lastDir + str).saveDlg('','')

  // close file if save canceled —————————————————————————————————————————————

  if (aiFile == null){
    app.documents[0].close()
    return ''
  }

  var aiOptions = newAiOptions()
  app.activeDocument.saveAs(aiFile, aiOptions)

}

//:::::::::::::::::::::::::::::::::::::::: functions

//:::::::::::::::::::::::::::::::::::::::: fin

