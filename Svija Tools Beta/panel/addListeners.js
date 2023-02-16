//:::::::::::::::::::::::::::::::::::::::: addListeners.js

/*———————————————————————————————————————— notes

    Theoretically, this script is totally generic — it should never
    have to be modified if used correctly. */


//:::::::::::::::::::::::::::::::::::::::: program

//———————————————————————————————————————— initialize

// interfaceCode = 0-3, set in svgLoader.js

var path = csif.getSystemPath(SystemPath.EXTENSION) + '/scripts/';

//———————————————————————————————————————— add listeners

for (var x=0; x<actions.length-1; x++){ try{

  var dbl = twoDigits(x);
  var obj = document.getElementById('link' + c + '-' + dbl);

  obj.addEventListener('mouseover',  mouseEffect.bind(null, 'mov', interfaceCode, x), false);
  obj.addEventListener('mouseout' ,  mouseEffect.bind(null, 'mot', interfaceCode, x), false);
  obj.addEventListener('mousedown',  mouseEffect.bind(null, 'mod', interfaceCode, x), false);
  obj.addEventListener('mouseup'  , launchScript.bind(null,        interfaceCode, x), false);

} catch(e){} }


//:::::::::::::::::::::::::::::::::::::::: functions

//———————————————————————————————————————— launchScript(c, b)

function launchScript(c, b){
  mouseEffect('mou', c, b); 

  let [title, script, param] = actions[b];

  if (script.indexOf('.html') > 0) openLink(script);

  changeTitle(title);
  file = path + encodeURI(script);

  csif.evalScript("param = '" + param + "'");
  csif.evalScript("$.evalFile('" + file + "')");
}

//———————————————————————————————————————— mouseEffect(which, c, b)

function mouseEffect(which, interfaceCode, b){

  b = twoDigits(b);
  
  var mov_id = 'mov' + interfaceCode + '-' + b;
  var mod_id = 'mod' + interfaceCode + '-' + b;

  var mov_obj = document.getElementById(mov_id);
  var mod_obj = document.getElementById(mod_id);

  switch(which) {
    case 'mov': mov_obj.style.display = 'block'; mod_obj.style.display = 'none' ; break;
    case 'mod': mov_obj.style.display = 'none' ; mod_obj.style.display = 'block'; break;
    case 'mou': mov_obj.style.display = 'block'; mod_obj.style.display = 'none' ; break;
    default:    mov_obj.style.display = 'none' ; mod_obj.style.display = 'none' ; break;
  }
}

//———————————————————————————————————————— twoDigits(n)

function twoDigits(n){
  if (n > 9) return n;
  return '0' + n;
}

/*———————————————————————————————————————— changeTitle(newTitle)

    changes title while script is running

    the setTimeout is fake — it won't be executed until
    the script finishes running */

function changeTitle(newTitle){

  prevTitle = csif.getWindowTitle();

  csif.setWindowTitle(newTitle);

  setTimeout(function(){
      csif.setWindowTitle(prevTitle);
    }, 500);

}


//:::::::::::::::::::::::::::::::::::::::: fin
