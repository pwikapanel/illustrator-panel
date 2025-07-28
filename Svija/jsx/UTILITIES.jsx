#target illustrator  

/* vim: set foldmethod=marker fmr=/*\—,///: */

/*:::::::::::::::::::::::::::::::::::::::: utilities.jsx */

/*———————————————————————————————————————— CONCATENATEPATH(part1, part2)

    given a part1 and part2, returns a correct path */

function CONCATENATEPATH(part1, part2){

  if (ISMAC) return part1 + '/' + part2
  else return part1 + '\\' + part2
}
///
/*———————————————————————————————————————— PREPARELAYERS(obj, stateArray)

    recursive function to delete any nonprinting layers
    while storing their locked/visible state */

// need to make at least one change or app.undo() will undo user change after script runs

function PREPARELAYERS(obj){

  //—————————————————————————————————————— ensure that there will be at least one action to undo

  if (obj.typename == 'Document'){
    obj.layers[0].locked = !obj.layers[0].locked 
    obj.layers[0].locked = !obj.layers[0].locked 

    // delete erroneous artboards: Plan de travail 81 or Artboard 80
    var len = obj.artboards.length
    for (var x=len-1; x>-1; x--)
      if (obj.artboards[x].name.indexOf(' ') > 0)
        obj.artboards[x].remove()
  }

  //—————————————————————————————————————— remove/unlock layers

  var len = obj.layers.length

  for (var x=len-1; x>-1; x--) {

    var layer = obj.layers[x]
    layer.locked = false
    layer.visible = true

    if (!layer.printable)
      layer.remove()
    else if (layer.layers.length > 0)
      PREPARELAYERS(layer)
  }
  return
}
/// */
/*———————————————————————————————————————— DUMPKEYS(obj) */

function DUMPKEYS(obj){
  var str = ''

  for (var i in obj){
    try{
      str += '\n'+i+': '+obj[i]
    }
    catch(e){
      str += '\n'+i+': [error]'
    }
  }
  alert(str)
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
/*———————————————————————————————————————— STRCONTAINSSYNC(arr, str)

    must work on both ~/Documents/myFiles and C:\Users\Main\myFiles */

function STRCONTAINSSYNC(arg){

  var arr

  if (arg.indexOf('/') > 0)
    arr = arg.split('/')
  else
    arr = arg.split('\\')

  for (var i = 0; i < arr.length; i++)
    if (arr[i] == 'SYNC') return true

  return false
}
///

//:::::::::::::::::::::::::::::::::::::::: fin


