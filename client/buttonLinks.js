//———————————————————————————————————————— client/index.js


/* Make a reference to your HTML button and add a click handler. */
//var openButton = document.querySelector("#open-button");
//openButton.addEventListener("click", openDoc);

//———————————————————————————————————————— reset link

linkLogo.addEventListener('mouseup', refreshPanel);
function refreshPanel() { location.reload; alert('Panel reloaded.'); }

linkInfo.addEventListener('mouseup', showInfo);
function showInfo(){ location.href='info.html'; }

//———————————————————————————————————————— listeners

linkImages.addEventListener('mouseover', funcMov.bind(null, 'btnImages'), false);
linkImages.addEventListener('mouseout',  funcMot.bind(null, 'btnImages'), false);
linkImages.addEventListener('mousedown', funcMod.bind(null, 'btnImages'), false);
linkImages.addEventListener('mouseup',   funcMou.bind(null, 'btnImages', 'resetImages.jsx', 'null'), false);

linkObjects.addEventListener('mouseover', funcMov.bind(null, 'btnObjects'), false);
linkObjects.addEventListener('mouseout',  funcMot.bind(null, 'btnObjects'), false);
linkObjects.addEventListener('mousedown', funcMod.bind(null, 'btnObjects'), false);
linkObjects.addEventListener('mouseup',   funcMou.bind(null, 'btnObjects', 'resetObjects.jsx', 'null'), false);

linkLayers.addEventListener('mouseover', funcMov.bind(null, 'btnLayers'), false);
linkLayers.addEventListener('mouseout',  funcMot.bind(null, 'btnLayers'), false);
linkLayers.addEventListener('mousedown', funcMod.bind(null, 'btnLayers'), false);
linkLayers.addEventListener('mouseup',   funcMou.bind(null, 'btnLayers', 'propagateLayers.jsx', 'null'), false);

//—————

linkClose.addEventListener('mouseover', funcMov.bind(null, 'btnClose'), false);
linkClose.addEventListener('mouseout',  funcMot.bind(null, 'btnClose'), false);
linkClose.addEventListener('mousedown', funcMod.bind(null, 'btnClose'), false);
linkClose.addEventListener('mouseup',   funcMou.bind(null, 'btnClose', 'saveAsSvg.jsx', 1), false);

linkSave.addEventListener('mouseover', funcMov.bind(null, 'btnSave'), false);
linkSave.addEventListener('mouseout',  funcMot.bind(null, 'btnSave'), false);
linkSave.addEventListener('mousedown', funcMod.bind(null, 'btnSave'), false);
linkSave.addEventListener('mouseup',   funcMou.bind(null, 'btnSave', 'saveAsSvg.jsx', 2), false);

linkSaveAll.addEventListener('mouseover', funcMov.bind(null, 'btnSaveAll'), false);
linkSaveAll.addEventListener('mouseout',  funcMot.bind(null, 'btnSaveAll'), false);
linkSaveAll.addEventListener('mousedown', funcMod.bind(null, 'btnSaveAll'), false);
linkSaveAll.addEventListener('mouseup',   funcMou.bind(null, 'btnSaveAll', 'saveAsSvg.jsx', 3), false);

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

var csif = new CSInterface();
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

// resetImages.jsx\')');
// resetObjects.jsx\')');
// propagateLayers.jsx\')');
// saveAsSvg.jsx\')');

//———————————————————————————————————————— fin
