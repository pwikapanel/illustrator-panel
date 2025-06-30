
//:::::::::::::::::::::::::::::::::::::::: jsxLoader.js

// localStorage.clear()

/*———————————————————————————————————————— read directory listing

    requires node.js */

var jsxList = dirListArray('jsx', 'jsx', 'jsxList')

/*———————————————————————————————————————— try to load each one */

elapseGroup(10, `requesting JSX content (${jsxList.length} files)...`)

for (var x=0; x<jsxList.length; x++){
  var  path = `jsx/${jsxList[x]}`
  elapse(18, `   requested ${path}`)
  fetchFile (jsxList[x], path, fileToCep)
}

elapseGroupEnd()


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


//:::::::::::::::::::::::::::::::::::::::: fin

