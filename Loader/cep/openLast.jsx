#target illustrator  

/*———————————————————————————————————————— openFolder(lastPath)

    open dialog with folder of most recent document */

function openLast(){

  if (LASTPATH == ''){
    app.executeMenuCommand("open")
    return true
  }

  try{
    myFolder = File(LASTPATH)
    app.open(myFolder)
  }
  catch(errMsg){
    alert('error message\n'+errMsg)
    app.executeMenuCommand("open")
  }
}


