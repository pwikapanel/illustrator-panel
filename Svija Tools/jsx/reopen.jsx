#target illustrator  

/*:::::::::::::::::::::::::::::::::::::::: reopen.js / reopen.jsx

    reopen the most recently closed page */

//———————————————————————————————————————— reopen(errmsg)

function reopen(errmsg){

  if (LASTPATH == ''){
    alert(errmsg)
    return
  }

  try{
    app.open(File(LASTPATH))
  }
  catch(e){ alert(e) }
}


//:::::::::::::::::::::::::::::::::::::::: fin

