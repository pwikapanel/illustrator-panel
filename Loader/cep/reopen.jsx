#target illustrator  

/*———————————————————————————————————————— reopen()

    reopen the most recently closed page */

function reopen(){

  if (LASTPATH == ''){
    app.executeMenuCommand("open")
    return true
  }

  try{
    app.open(File(LASTPATH))
  }
  catch(errMsg){
    alert('error message\n'+errMsg)
    app.executeMenuCommand("open")
  }
}


