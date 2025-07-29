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

//:::::::::::::::::::::::::::::::::::::::: fin

