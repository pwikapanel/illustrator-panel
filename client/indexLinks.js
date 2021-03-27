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

// from example panel
//function onclickSetWindowTitleBtn() {
//	CSLibrary.setWindowTitle(document.getElementById("SetWindowTitle").value);
//}

//function onclickGetWindowTitleBtn() {
//	document.getElementById("GetWindowTitle").value = CSLibrary.getWindowTitle();
//}

//function onClickRestoreDefaultWindowTitle() {
//	CSLibrary.setWindowTitle(CSLibrary.getExtensionID());
//}


//———————————————————————————————————————— listeners

linkImages.addEventListener('mouseover', funcMov.bind(null, 'btnImages'), false);
linkImages.addEventListener('mouseout',  funcMot.bind(null, 'btnImages'), false);
linkImages.addEventListener('mousedown', funcMod.bind(null, 'btnImages'), false);
linkImages.addEventListener('mouseup',   funcMou.bind(null, 'btnImages', 'Reset\ Image\ Links.jsx', 'null'), false);

linkObjects.addEventListener('mouseover', funcMov.bind(null, 'btnObjects'), false);
linkObjects.addEventListener('mouseout',  funcMot.bind(null, 'btnObjects'), false);
linkObjects.addEventListener('mousedown', funcMod.bind(null, 'btnObjects'), false);
linkObjects.addEventListener('mouseup',   funcMou.bind(null, 'btnObjects', 'Reset\ Object\ IDs.jsx', 'null'), false);

linkLayers.addEventListener('mouseover', funcMov.bind(null, 'btnLayers'), false);
linkLayers.addEventListener('mouseout',  funcMot.bind(null, 'btnLayers'), false);
linkLayers.addEventListener('mousedown', funcMod.bind(null, 'btnLayers'), false);
linkLayers.addEventListener('mouseup',   funcMou.bind(null, 'btnLayers', 'Propagate\ Layers.jsx', 'null'), false);

//—————

linkClose.addEventListener('mouseover', funcMov.bind(null, 'btnClose'), false);
linkClose.addEventListener('mouseout',  funcMot.bind(null, 'btnClose'), false);
linkClose.addEventListener('mousedown', funcMod.bind(null, 'btnClose'), false);
linkClose.addEventListener('mouseup',   funcMou.bind(null, 'btnClose', 'Save\ as\ Svija.jsx', 'close'), false);

linkSave.addEventListener('mouseover', funcMov.bind(null, 'btnSave'), false);
linkSave.addEventListener('mouseout',  funcMot.bind(null, 'btnSave'), false);
linkSave.addEventListener('mousedown', funcMod.bind(null, 'btnSave'), false);
linkSave.addEventListener('mouseup',   funcMou.bind(null, 'btnSave', 'Save\ as\ Svija.jsx', 'save'), false);

linkSaveAll.addEventListener('mouseover', funcMov.bind(null, 'btnSaveAll'), false);
linkSaveAll.addEventListener('mouseout',  funcMot.bind(null, 'btnSaveAll'), false);
linkSaveAll.addEventListener('mousedown', funcMod.bind(null, 'btnSaveAll'), false);
linkSaveAll.addEventListener('mouseup',   funcMou.bind(null, 'btnSaveAll', 'Save\ as\ Svija.jsx', 'all'), false);

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

function funcMou(btnId, scriptName, arg){
  var btnHover = document.getElementById(btnId+'Hover' );
  var btnActive = document.getElementById(btnId+'Active');

  btnHover.style.display = 'block';
  btnActive.style.display = 'none';

  // need to pass argument as well

  file = path + scriptName;
  csif.evalScript("arg = '" + arg + "'");
  csif.evalScript("$.evalFile('" + file + "')");
}

//———————————————————————————————————————— fin
