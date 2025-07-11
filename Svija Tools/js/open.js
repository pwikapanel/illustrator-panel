
/* vim: set foldmethod=marker fmr=/*\—,///: */

//:::::::::::::::::::::::::::::::::::::::: open.js / open.jsx

{

  /*—————————————————————————————————————— button config */

  let objLabel = TRANSLATE.closedOpenButton
  let objWidth = TRANSLATE.closedOpenButtonWidth
  let objID    = 'buttC2'
  
  let obj = document.getElementById(objID)
  if (obj === null) LERT(objID + ' is null')
  
  obj.value = objLabel
  obj.style.width = objWidth+'px'
  obj.style.display = 'inline'
  ///
  /*—————————————————————————————————————— listener function
  
    opens folder based on localStorage lastPath */
  
  obj.addEventListener('mouseup', (evn) => {
  
    let alt = evn.altKey

    if (LASTPATH == ''){
      let cmd = 'app.executeMenuCommand("open")'
      CEP.evalScript(cmd)
      return
    }

    CEP.evalScript('openFile()')
  
  })
  ///

}

/*:::::::::::::::::::::::::::::::::::::::: fin */

