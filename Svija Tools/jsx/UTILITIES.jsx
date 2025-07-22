#target illustrator  

/* vim: set foldmethod=marker fmr=/*\—,///: */

/*:::::::::::::::::::::::::::::::::::::::: utilities.jsx */

alert(10)

/*———————————————————————————————————————— CONCATENATEPATH(part1, part2)

    given a part1 and part2, returns a correct path */

function CONCATENATEPATH(part1, part2){

  if (ISMAC) return part1 + '/' + part2
  else return part1 + '\\' + part2
}
///
/*———————————————————————————————————————— SAVELAYERSTATES(obj, stateArray)

    recursive function to delete any nonprinting layers
    while storing their locked/visible state */

function SAVELAYERSTATES(obj, stateArray){

  var len = obj.layers.length
  alert('treating '+obj.name +'\n'+ len +' layers to be treated')

  for (var x=0; x<len; x++) {
    if (x > obj.layers.length -1) continue; // otherwise deleted layers will cause an error

    var layer = obj.layers[x]
    alert(x + ': adding layer '+layer.name)

    stateArray.push([layer.locked, layer.visible, layer.printable])
    layer.locked = false
    layer.visible = true

    if (!layer.printable){
      alert(layer.name + ' deleted')
      layer.remove()
      x -= 1
    }
    else if (layer.layers.length > 0){
      alert(layer.name +' has sublayers')
      stateArray.concat(SAVELAYERSTATES(layer, stateArray))
    }
  }
  return stateArray
}
/// */
/*———————————————————————————————————————— RESTORELAYERSTATES(doc, stateArray) */

function RESTORELAYERSTATES(doc, stateArray){
  return

  var len = stateArray.length

  for (x=0; x<len; x++)
    app.undo()
  
  return

  var loopLimit = 200

  while (doc.layers.length<layerStates.length){
    app.undo()
    loopLimit -= 1
    if (loopLimit == 0){
      alert('layerStates.length=' + layerStates.length + '\nlimit hit')
      break
    }
  }

  //———————————————————————————————— restore non-printing layer states

  for (var r=0; r<layerStates.length; r++){
    if (layerStates[r] == 1 || layerStates[r] == 3){doc.layers[r].locked  = true }
    if (layerStates[r] == 2 || layerStates[r] == 3){doc.layers[r].visible = false}
  }
}
///
/*———————————————————————————————————————— DELETENONPRINTINGLAYERS(doc)

  delete any layers that are not printable
  returns array with locked & visible status of deleted layers */

function DELETENONPRINTINGLAYERS(doc){

  var layersLen = doc.layers.length
  var layerStates = new Array(layersLen)

  for (z=layersLen-1; z>=0; z--){
    layerStates[z] = 0
    if (!doc.layers[z].printable){

      if (doc.layers[z].locked){
        layerStates[z] += 1
        doc.layers[z].locked  = false
      }

      if (!doc.layers[z].visible){ // Error 9021: Trying to delete hidden layer [layer name]
        layerStates[z] += 2
        doc.layers[z].visible = true
      }

      doc.layers[z].remove()
    }
  }

  return layerStates
}
///
/*———————————————————————————————————————— DERIVESYNCFOLDER()

    used when saving an unsaved document — tries to
    find a sync folder from other open documents */

function DERIVESYNCFOLDER(){
  if (ISMAC)
    var comparator = '/sync'
  else
    var comparator = '\\sync'

  for(var x=1; x<app.documents.length; x++){
    var docPath = String(app.documents[x].path.fsName);
    if (docPath.indexOf(comparator) > 0) return concatenatePath(docPath, '/Page Name.ai')
  }

  return ''
}
///
/*———————————————————————————————————————— DUMPKEYS(obj) */

function DUMPKEYS(obj){
  var str = ''

  for (var i in obj){
    try{
      str += '\n'+i+': '+obj[i]
    }
    catch(e){
      str += '\n'+i+': error'
    }
  }
  alert(str)
}
///
/*———————————————————————————————————————— HASPATH(doc)

    has file been saved at least once?
    returns '' or error message */

function HASPATH(doc){

  if (doc.path != '') return ''

  var syncPath = DERIVESYNCFOLDER()
  if (syncPath == '') return TRANSLATE[LC].saveNormally.replace('*', doc.name)

  var f = new File(syncPath).saveDlg('','')

  if (f == null)  return TRANSLATE[LC].saveNormally.replace('*', doc.name)

  app.activeDocument.saveAs(f, undefined)
  return ''
    
}
///

// all changes were undone with ONE undo

/*———————————————————————————————————————— RESTORENONPRINTINGLAYERS(src)

    restores non-printing layers that were deleted
    including locked/visible state */

function RESTORENONPRINTINGLAYERS(layerStates){

  var doc = app.activeDocument            // active document

  //———————————————————————————————— restore to original state
  
  var loopLimit = 200

  while (doc.layers.length<layerStates.length){
    app.undo()
    loopLimit -= 1
    if (loopLimit == 0){
      alert('layerStates.length=' + layerStates.length + '\nlimit hit')
      break
    }
  }

  //———————————————————————————————— restore non-printing layer states

  for (var r=0; r<layerStates.length; r++){
    if (layerStates[r] == 1 || layerStates[r] == 3){doc.layers[r].locked  = true }
    if (layerStates[r] == 2 || layerStates[r] == 3){doc.layers[r].visible = false}
  }
}
///
/*———————————————————————————————————————— ISSVIJAPAGE()

    returns true if in a SYNC folder */

function ISSVIJAPAGE(){

  var currPath = String(app.activeDocument.path)

  if (currPath.indexOf('/') == -1) return false

  if (!STRCONTAINSSYNC(currPath)) return false

  return true
}
///
/*———————————————————————————————————————— STRCONTAINSSYNC(arr, str) */

function STRCONTAINSSYNC(arg){

  var arr = arg.split('/')

  for (var i = 0; i < arr.length; i++)
    if (arr[i] == 'SYNC') return true

  return false;
}
///

//:::::::::::::::::::::::::::::::::::::::: fin


