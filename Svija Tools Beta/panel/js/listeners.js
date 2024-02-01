//:::::::::::::::::::::::::::::::::::::::: addListeners.js

/*———————————————————————————————————————— notes

    Theoretically, this script is totally generic — it should never
    have to be modified if used correctly. */


//:::::::::::::::::::::::::::::::::::::::: program

//———————————————————————————————————————— button listeners

// alert(actions.length); // 10
for (var x=0; x<actions.length; x++){ try{

  var dbl = twoDigits(x)
  var objId = 'link' + env_interface + '-' + dbl

  var obj = document.getElementById(objId)

  obj.addEventListener('mouseover',  mouseEffect.bind(null, 'mov', x), false)
  obj.addEventListener('mouseout' ,  mouseEffect.bind(null, 'mot', x), false)
  obj.addEventListener('mousedown',  mouseEffect.bind(null, 'mod', x), false)
  obj.addEventListener('mouseup'  , launchScript.bind(null,        x), false)

} catch(e){
  // expected: 3-10 fail on less panel · 0-2 fail on more panel
}}

//———————————————————————————————————————— onresize listener

window.onresize = resizeFunc

/*———————————————————————————————————————— right-click listener

  https://stackoverflow.com/questions/6789843/disable-right-click-menu-in-chrome */

(function (){

  var blockContextMenu = function (evt) { evt.preventDefault() }
  document.body.addEventListener('contextmenu', blockContextMenu)

})()


//:::::::::::::::::::::::::::::::::::::::: functions

//———————————————————————————————————————— resizeFunc()

function resizeFunc(){
  var parts = document.URL.split('/')
  var url = parts[parts.length-1]

  setSize(url)
}

//———————————————————————————————————————— launchScript(buttonCode)

function launchScript(buttonCode){

  mouseEffect('mou', buttonCode) 

  let [title, script, param] = actions[buttonCode]

  if (script.indexOf('.html') > 0) openLink(script)

  changeTitle(title)
  file = env_path + encodeURI(script)

  csif.evalScript("param = '" + param + "'")
  csif.evalScript("$.evalFile('" + file + "')")
}

//———————————————————————————————————————— mouseEffect(which, buttonCode)

function mouseEffect(which, buttonCode){

  buttonCode = twoDigits(buttonCode)
  
  var mov_id = 'mov' + env_interface + '-' + buttonCode
  var mod_id = 'mod' + env_interface + '-' + buttonCode

  var mov_obj = document.getElementById(mov_id)
  var mod_obj = document.getElementById(mod_id)

  switch(which) {
    case 'mov': mov_obj.style.display = 'block'; mod_obj.style.display = 'none' ; break
    case 'mod': mov_obj.style.display = 'none' ; mod_obj.style.display = 'block'; break
    case 'mou': mov_obj.style.display = 'block'; mod_obj.style.display = 'none' ; break
    default:    mov_obj.style.display = 'none' ; mod_obj.style.display = 'none' ; break
  }
}

//———————————————————————————————————————— twoDigits(n)

function twoDigits(n){
  if (n > 9) return n
  return '0' + n
}

/*———————————————————————————————————————— changeTitle(newTitle)

    changes title while script is running

    the setTimeout is fake — it won't be executed until
    the script finishes running */

var staticTitle = csif.getWindowTitle()

function changeTitle(newTitle){

  csif.setWindowTitle(newTitle)

  setTimeout(function(){ csif.setWindowTitle(staticTitle) }, 500)

}


//:::::::::::::::::::::::::::::::::::::::: fin
