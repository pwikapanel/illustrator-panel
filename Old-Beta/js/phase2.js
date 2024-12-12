
//:::::::::::::::::::::::::::::::::::::::: phase 2

//:::::::::::::::::::::::::::::::::::::::: 1. initialization

/*———————————————————————————————————————— 1. initialization */

var  cssList = [ 'fonts'            ,
                 'colors-1'         ,
                 'layout'           ]

var htmlList = [ 'body'             ]

var  jsxList = [ 'preferencesUpdate',
                 'utilities'        ,
                 'statusUpdate'     ,
                 'savePage'         ,
                 'placeImage'       ,
                 'createGroup'      ,
                 'changeCase'       ,
                 'checkRepair'      ,
                 'newPage'          ]

var   jsList = [ 'tools'            ]

var  varList = [ 'version'          ,
                 'complete'         ]


//:::::::::::::::::::::::::::::::::::::::: 2. load files (if necessary)

if(typeof localStorage.completeVal == 'undefined'){

/*———————————————————————————————————————— load css */

  var    ext =   'css'
  var folder =   'css'

  readFiles(ext, folder, cssList)

/*———————————————————————————————————————— load html */

  var    ext =   'html'
  var folder =   'html'

  readFiles(ext, folder, htmlList)

/*———————————————————————————————————————— load jsx */

  var    ext =   'jsx'
  var folder =   'jsx'

  readFiles(ext, folder, jsxList)

/*———————————————————————————————————————— load js */

  var    ext =   'js'
  var folder =   'js'

  readFiles(ext, folder, jsList)

/*———————————————————————————————————————— load completion */

  var    ext =   'val'
  var folder =   'val'

  readFiles(ext, folder, varList)


}

else lert('already loaded')

/*———————————————————————————————————————— 3. check if more recent on server NOT DONE
    */






//:::::::::::::::::::::::::::::::::::::::: 4. build panel from localStorage

/* clear existing content, possibly unnecessary

document.querySelectorAll('[style]').forEach(el => el.removeAttribute('style'))
document.body.innerHTML = ''

*/

setTimeout(build, 100)

function build(){
  for (var x=0; x<cssList.length; x++){ // CSS ———————————————————————————————
    var thisScript = cssList[x]
    var thisIndex = thisScript+'Css'
    var script = document.createElement('style')
    script.innerHTML = localStorage[thisIndex]
    document.head.appendChild(script)
  }
  
  for (var x=0; x<htmlList.length; x++){ // HTML —————————————————————————————
    var thisScript = htmlList[x]
    var thisIndex = thisScript+'Html'
    document.body.innerHTML += localStorage[thisIndex]
  }

  for (var x=0; x<jsxList.length; x++){ // JSX ———————————————————————————————
    var thisScript = jsxList[x]
    var thisIndex = thisScript+'Jsx'
    jsx.evalScript(localStorage[thisIndex])
  }

  for (var x=0; x<jsList.length; x++){ // JS —————————————————————————————————
    var thisScript = jsList[x]
    var thisIndex = thisScript+'Js'
    var script = document.createElement('script')
    script.innerHTML = localStorage[thisIndex]
    document.body.appendChild(script)
  }
}


//:::::::::::::::::::::::::::::::::::::::: utility functions

/*———————————————————————————————————————— readFiles */

function readFiles(ext, folder, list){
  for (var x=0; x<list.length; x++)
    readFile(ext, folder, list[x], '');
}

/*———————————————————————————————————————— readFile */

function readFile(extension, folderName, fileName){

  file = folderName + '/' + fileName + '.' + extension

// autoedit.gitbook.io/documentation/adobe-panel/autoedit-adobe-cep-panel-dev-setup/manifest.xml

  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function ()
  {
    if(rawFile.readyState === 4)
      if(rawFile.status === 200 || rawFile.status == 0)
      {
        var varName = fileName + firstLetterCap(extension)
        localStorage[varName] = rawFile.responseText
      }
  }
  rawFile.send(null);
}


//:::::::::::::::::::::::::::::::::::::::: fin

