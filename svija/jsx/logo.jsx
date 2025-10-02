#target illustrator  

/* vim: set foldmethod=marker fmr=/*\—,///: */

//:::::::::::::::::::::::::::::::::::::::: logo.jsx .js

/*———————————————————————————————————————— svijaLogo()

    returns hex color */

function svijaLogo(){
  var color = $.colorPicker()

  var r = Math.floor(color/65536); color -= r*65536
  var g = Math.floor(color/256  ); color -= g*256
  var b = color

  return  r+':'+g+':'+b
}
///

//:::::::::::::::::::::::::::::::::::::::: fin

