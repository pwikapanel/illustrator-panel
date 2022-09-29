//———————————————————————————————————————— link-listeners.js

//———————————————————————————————————————— variables

// interface_code = 0-3, set in interface_loader.js

var    c = interface_code;
var    l = actions.length - 1;
var path = csif.getSystemPath(SystemPath.EXTENSION) + '/scripts/';

//———————————————————————————————————————— add listeners

for (b=0; b<l; b++){ try{

  var obj = document.getElementById('link' + c + '-' + b);

  obj.addEventListener('mouseover', mse.bind(null, 'mov', c, b), false);
  obj.addEventListener('mouseout' , mse.bind(null, 'mot', c, b), false);
  obj.addEventListener('mousedown', mse.bind(null, 'mod', c, b), false);
  obj.addEventListener('mouseup'  , exe.bind(null,        c, b), false);

} catch(e){} }

//———————————————————————————————————————— exe(c, b)

function exe(c, b){
  mse('mou', c, b); 

  let [title, script, param] = actions[b];

  if (script.endsWith('.html')) location.href = script;

  changeTitle(title);
  file = path + encodeURI(script);

  csif.evalScript("param = '" + param + "'");
  csif.evalScript("$.evalFile('" + file + "')");
}

//———————————————————————————————————————— mse(which, c, b)

function mse(which, c, b){
  var mov_id = 'mov' + c + '-' + b;
  var mod_id = 'mod' + c + '-' + b;

  var mov_obj = document.getElementById(mov_id);
  var mod_obj = document.getElementById(mod_id);

  switch(which) {
  case 'mov': mov_obj.style.display = 'block'; mod_obj.style.display = 'none' ; break;
  case 'mod': mov_obj.style.display = 'none' ; mod_obj.style.display = 'block'; break;
  case 'mou': mov_obj.style.display = 'block'; mod_obj.style.display = 'none' ; break;
  default:    mov_obj.style.display = 'none' ; mod_obj.style.display = 'none' ; break;
  }
}

//———————————————————————————————————————— changeTitle(newTitle){

function changeTitle(newTitle){
  prevTitle = csif.getWindowTitle();
  csif.setWindowTitle(newTitle);
  delay = 500;
  setTimeout(function(){
    csif.setWindowTitle(prevTitle);
  }, delay);
}


//———————————————————————————————————————— fin
