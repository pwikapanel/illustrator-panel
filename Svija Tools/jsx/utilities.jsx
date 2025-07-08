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
/*———————————————————————————————————————— HASPATH(doc)

    has file been saved at least once?
    returns '' or error message */

function HASPATH(doc){

  if (doc.path != '') return ''

  var syncPath = DERIVESYNCFOLDER()
  if (syncPath == '') return 'Please save ' + doc.name + ' normally.'

  var f = new File(syncPath).saveDlg('','')

  if (f == null) return 'Please save ' + doc.name + ' normally.'

  app.activeDocument.saveAs(f, undefined)
  return ''
    
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

//:::::::::::::::::::::::::::::::::::::::: fin

