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
/*———————————————————————————————————————— HASPATH(sourceDoc)

    has file been saved at least once?
    returns '' or error message */

function HASPATH(doc){

  if (doc.path != '') return ''

  var syncPath = deriveSyncFolder()
  if (syncPath == '') return 'Please save ' + doc.name + ' normally.'

  var f = new File(syncPath).saveDlg('','')

  if (f == null) return 'Please save ' + doc.name + ' normally.'

  app.activeDocument.saveAs(f, undefined)
  return ''
    
}
///

//:::::::::::::::::::::::::::::::::::::::: fin

