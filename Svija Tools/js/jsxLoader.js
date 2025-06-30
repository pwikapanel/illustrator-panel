
//:::::::::::::::::::::::::::::::::::::::: jsxLoader.js

// localStorage.clear()

/*———————————————————————————————————————— read directory listing

    requires node.js */

var jsxList = dirListArray('jsx', 'jsx', 'jsxList')

/*———————————————————————————————————————— try to load each one */

elapseGroup(10, `        loading JSX content (${jsxList.length} files)...`)

for (var x=0; x<jsxList.length; x++){
  var  path = `jsx/${jsxList[x]}`
  elapse(33, `          requesting JSX file NEW - ${path}`)
  fetchFile (jsxList[x], path, fileToCep)
}

console.groupEnd()

elapseGroup(40, `        installing JSX content...`)


//:::::::::::::::::::::::::::::::::::::::: fin

