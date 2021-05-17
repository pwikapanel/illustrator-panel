//———————————————————————————————————————— client/indexLinks.js

// link to info pane
linkInfo.addEventListener('mouseup', callURL);
function callURL(){ location.href='info.html'; }

//———————————————————————————————————————— reset link


linkLogo.addEventListener('mouseup', refreshPanel);
function refreshPanel() {
  csif.setWindowTitle('Reloading…');
  setTimeout(doReload, 200);
}

function doReload(){
  location.href='index.html?'+Math.random();
}

//———————————————————————————————————————— script names

var scriptShow = '0. Show Svija Tools — ⇧ F1.jsx';
var scriptSave = '1. Save as Svija — ⌘ F1.jsx';
var scriptDupe = '2. Duplicate Layers — ⌘ F2.jsx';
var scriptImgs = '3. Reset Image Links — ⌘ F3.jsx';
var scriptObjs = '4. Reset Object IDs — ⌘ F4.jsx';
var scriptStyl = 'Update Styles from File.jsx';

//———————————————————————————————————————— listeners

linkImages.addEventListener('mouseover', funcMov.bind(null, 'btnImages'), false);
linkImages.addEventListener('mouseout',  funcMot.bind(null, 'btnImages'), false);
linkImages.addEventListener('mousedown', funcMod.bind(null, 'btnImages'), false);
linkImages.addEventListener('mouseup',   funcMou.bind(null, 'btnImages', scriptImgs, 'null', 'Resetting Links…'), false);

linkObjects.addEventListener('mouseover', funcMov.bind(null, 'btnObjects'), false);
linkObjects.addEventListener('mouseout',  funcMot.bind(null, 'btnObjects'), false);
linkObjects.addEventListener('mousedown', funcMod.bind(null, 'btnObjects'), false);
linkObjects.addEventListener('mouseup',   funcMou.bind(null, 'btnObjects', scriptObjs, 'null', 'Resetting Object Ids…'), false);

//—————

linkStyles.addEventListener('mouseover', funcMov.bind(null, 'btnStyles'), false);
linkStyles.addEventListener('mouseout',  funcMot.bind(null, 'btnStyles'), false);
linkStyles.addEventListener('mousedown', funcMod.bind(null, 'btnStyles'), false);
linkStyles.addEventListener('mouseup',   funcMou.bind(null, 'btnStyles', scriptStyl, 'null', 'Loading Text Styles…'), false);

linkLayers.addEventListener('mouseover', funcMov.bind(null, 'btnLayers'), false);
linkLayers.addEventListener('mouseout',  funcMot.bind(null, 'btnLayers'), false);
linkLayers.addEventListener('mousedown', funcMod.bind(null, 'btnLayers'), false);
linkLayers.addEventListener('mouseup',   funcMou.bind(null, 'btnLayers', scriptDupe, 'null', 'Propagating Layers…'), false);

//—————

linkClose.addEventListener('mouseover', funcMov.bind(null, 'btnClose'), false);
linkClose.addEventListener('mouseout',  funcMot.bind(null, 'btnClose'), false);
linkClose.addEventListener('mousedown', funcMod.bind(null, 'btnClose'), false);
linkClose.addEventListener('mouseup',   funcMou.bind(null, 'btnClose', scriptSave, 'close', 'Closing All…'), false);

linkSave.addEventListener('mouseover', funcMov.bind(null, 'btnSave'), false);
linkSave.addEventListener('mouseout',  funcMot.bind(null, 'btnSave'), false);
linkSave.addEventListener('mousedown', funcMod.bind(null, 'btnSave'), false);
linkSave.addEventListener('mouseup',   funcMou.bind(null, 'btnSave', scriptSave, 'save', 'Saving as Svija…'), false);

// linkSaveAll.addEventListener('mouseover', funcMov.bind(null, 'btnSaveAll'), false);
// linkSaveAll.addEventListener('mouseout',  funcMot.bind(null, 'btnSaveAll'), false);
// linkSaveAll.addEventListener('mousedown', funcMod.bind(null, 'btnSaveAll'), false);
// linkSaveAll.addEventListener('mouseup',   funcMou.bind(null, 'btnSaveAll', scriptSave, 'all', 'Saving All…'), false);

//———————————————————————————————————————— functions

function funcMov(btnId){
  var btnHover = document.getElementById(btnId+'Hover' );
  var btnActive = document.getElementById(btnId+'Active');

  btnHover.style.display = 'block';
  btnActive.style.display = 'none';
}

function funcMot(btnId){
  var btnHover = document.getElementById(btnId+'Hover' );
  var btnActive = document.getElementById(btnId+'Active');

  btnHover.style.display = 'none';
  btnActive.style.display = 'none';
}

function funcMod(btnId){
  var btnHover = document.getElementById(btnId+'Hover' );
  var btnActive = document.getElementById(btnId+'Active');

  btnHover.style.display = 'none';
  btnActive.style.display = 'block';
}

//———————————————————————————————————————— execution

// var csif = new CSInterface(); // now in index.html
var path = csif.getSystemPath(SystemPath.EXTENSION) + '/host/';

function funcMou(btnId, scriptName, arg, titl){
  var btnHover = document.getElementById(btnId+'Hover' );
  var btnActive = document.getElementById(btnId+'Active');

  btnHover.style.display = 'block';
  btnActive.style.display = 'none';

  // need to pass argument as well

  changeTitle(titl);
  file = path + encodeURI(scriptName);
  csif.evalScript("arg = '" + arg + "'");
  csif.evalScript("$.evalFile('" + file + "')");
}

//———————————————————————————————————————— momentary title change

function changeTitle(newTitle){
  prevTitle = csif.getWindowTitle();
  csif.setWindowTitle(newTitle);
  delay = 500;
  setTimeout(function(){ csif.setWindowTitle(prevTitle); }, delay);
}

//———————————————————————————————————————— fin
