
/* vim: set foldmethod=marker fmr=/*\—,//: */

//:::::::::::::::::::::::::::::::::::::::: jsxLoader.js

// localStorage.clear()

/*———————————————————————————————————————— read directory listing

    requires node.js */

var jsxList = dirListArray('jsx', 'jsx', 'jsxList')
//
/*———————————————————————————————————————— try to load each one */

elapseGroup(10, `requesting JSX content (${jsxList.length} files)...`)

for (var x=0; x<jsxList.length; x++){
  var  path = `jsx/${jsxList[x]}`
  elapse(18, `   requested ${path}`)
  getLocalFile(jsxList[x], path, fileToCep)
}

elapseGroupEnd()
//

//:::::::::::::::::::::::::::::::::::::::: calback function

/*———————————————————————————————————————— fileToCep(passthrough, contents, path)

     evaluates the contents of a file so that it will
     be available in CEP */

function fileToCep(passthrough, contents, path){

  if (ELAPSEDEPTH == 0){
    elapseGroup(37, 'importing JSX into CEP')
  }

  if (contents == ''){
     elapse(108, `   ${passthrough} returned empty file`)
     return
  }

  CEP.evalScript(contents)
  elapse(111, `   ${passthrough} imported`)

  setTimeout(elapseGroupEnd, 1000)
}
//
/*———————————————————————————————————————— dirListArray(dir, ext, lsName)

    using node adds approx. 1 second to startup time

    returns a file list from a given local directory in
    the plugin, containing files with a given extension

    this can only be done at Illustrator startup, so we
    store the result in localStorage

    requires the following in manifest.xml:
 
     <CEFCommandLine>
       <Parameter>--enable-nodejs</Parameter>
     </CEFCommandLine>    */

function dirListArray(dir, ext, lsName){

  if (typeof localStorage[lsName] == 'undefined'){
    elapse(134, `setting localStorage[${lsName}] to ''`)
    localStorage[lsName] = ''
  }

  elapse(138, `typeof require: ${typeof require}, localStorage[lsName].length: ${localStorage[lsName].length}`)
  if (typeof require != 'undefined' && localStorage[lsName].length == 0){

    elapse(140, 'getting fresh directory listing')
    var path    = CEP.getSystemPath(SystemPath.EXTENSION)
    var fs      = require('fs')
    var rawList = fs.readdirSync(path+'/'+dir)

    var tempArray = []
    for (x=0; x<rawList.length; x++)
      if (rawList[x].slice(-3) == ext) tempArray.push(rawList[x])
    
    localStorage[lsName] = tempArray.join('|')
  }
  else
    elapse(152, `directory listing in LS — didn't get fresh listing`)

  if (typeof require == 'undefined' && localStorage[lsName].length == 0)
    lert('Restart Illustrator\nFresh directory listing needed')
  
  if (!localStorage[lsName].includes('|')){
    elapse(156, `returning empty directory listing`)
    return []
  }

  elapse(159, `returning correct directory listing`)
  return localStorage[lsName].split('|')
}
//

//:::::::::::::::::::::::::::::::::::::::: fin

