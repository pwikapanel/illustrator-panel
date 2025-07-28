
/* vim: set foldmethod=marker fmr=/*—,///: */

//:::::::::::::::::::::::::::::::::::::::: jsxLoader.js

/*———————————————————————————————————————— CEP command string

     returns a directory listing of the jsx subdirectory
     based on a function written by ChatGPT */

var dirPath = `${PANELPATH}/jsx`

var cmd = `(function(){
  var folder = new Folder("${dirPath}")

  if (!folder.exists)
    return "⚠️ JSX folder doesn't exist"

  var files = folder.getFiles()
  var fileNames = []

  for (var i = 0; i < files.length; i++)
    if (files[i] instanceof File)
      fileNames.push(decodeURI(files[i].name))

  return fileNames.join('|')
})()`
///

/*:::::::::::::::::::::::::::::::::::::::: program

    this is a chain:
 
    get from LS if possible, otherwise...
 
    CEP command:
    1. send directory request to CEP with callback directoryListFilter
 
    directoryListFilter:
    2A. remove any non-jsx files
    2B. request actual file, with callback jsxToCep
 
    jsxToCep:
    3. send file contents to CEP */

/*———————————————————————————————————————— get from LS if possible */

if (typeof localStorage.jsxList != 'undefined'){

  var jsxList = localStorage.jsxList.split('|')
  elapse(50, `loading JSX from localStorage (${jsxList.length} files)`)

  for (var x=0; x<jsxList.length-1; x++){
    CEP.evalScript(localStorage[jsxList[x]])
    elapse(53, `${jsxList[x]} loaded from localStorage`)
  }

}
else
  CEP.evalScript(cmd, directoryListFilter)

///
/*———————————————————————————————————————— directoryListFilter(result)

    using node adds approx. 1 second to startup time

    returns a file list from a given local directory in
    the plugin, containing files with a given extension

    this can only be done at Illustrator startup, so we
    store the result in localStorage

    requires the following in manifest.xml:
 
     <CEFCommandLine>
       <Parameter>--enable-nodejs</Parameter>
     </CEFCommandLine>    */

function directoryListFilter(result){
  elapseGroup(10, `received jsx directory listing from CEP`)

  var jsxList = result.split('|')

  for (x=0; x<jsxList.length; x++){
    if (jsxList[x].slice(-4) != '.jsx'){
      jsxList.splice(x, 1)
      x -= 1
      if (x > jsxList.length-1) break
    }
  }

  if (jsxList.length == 0){
    elapseGroup(80, `⚠️ jsxList.length is zero, aborting`)
    return
  }

  localStorage.jsxList = jsxList.join('|')
  elapseGroup(85, `jsxList stored in localStorage.jsxList`)
    
  elapseGroup(87, `requesting JSX content (${jsxList.length} files)...`)
  
  for (var x=0; x<jsxList.length; x++){
    var  path = `jsx/${jsxList[x]}`
    elapse(18, `   requested ${path}`)
    GETLOCALFILE(jsxList[x], path, jsxToCep)
  }
  
  elapseGroupEnd()
}


///
/*———————————————————————————————————————— jsxToCep(fileName, contents, path)

     evaluates the contents of a file so that it will
     be available in CEP */

function jsxToCep(fileName, contents, path){

  if (ELAPSEDEPTH == 0){
    elapseGroup(37, 'importing JSX into CEP')
  }

  if (contents == ''){
     elapse(108, `   ${fileName} returned empty file`)
     return
  }

  localStorage[fileName] = contents
  CEP.evalScript(contents)
  elapse(111, `   ${fileName} imported`)

  setTimeout(elapseGroupEnd, 1000)
}
///

//:::::::::::::::::::::::::::::::::::::::: fin

