
/* vim: set foldmethod=marker fmr=/*\—,///: */

//:::::::::::::::::::::::::::::::::::::::: reopen.js / reopen.jsx

{

  /*—————————————————————————————————————— button config */

  let objLabel = TRANSLATE.closedReopenButton
  let objWidth = TRANSLATE.closedReopenButtonWidth
  let objID    = 'buttC3'

  let obj = document.getElementById(objID)
  if (obj === null) LERT(objID + ' is null')
  
  obj.value = objLabel
  obj.style.width = objWidth+'px'
  obj.style.display = 'inline'
  ///
  /*—————————————————————————————————————— listener function
  
    opens file based on localStorage lastPath */
  
  obj.addEventListener('mouseup', (evn) => {
  
    let alt = evn.getModifierState('Alt')
    let errmsg = TRANSLATE.noProject

    if (LASTPATH == ''){
      let cmd = 'app.executeMenuCommand("open")'
      CEP.evalScript(cmd)
      return
    }

    let cmd = `app.open(File(LASTPATH))`
    CEP.evalScript(cmd)
  
  })
///

}

/*:::::::::::::::::::::::::::::::::::::::: fin */

