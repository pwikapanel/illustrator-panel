//———————————————————————————————————————— title & cookie

var csif = new CSInterface();
csif.setWindowTitle(title);
setCookie('more', more);

//———————————————————————————————————————— set size

var interface_scale = window.__adobe_cep__.getScaleFactor()

function setSize(){
  var xFactor = Math.round(panel_width/interface_scale);
  var yFactor = Math.round((panel_height-.5)/interface_scale);
  csif.resizeContent(xFactor, yFactor);
  setTimeout(setSize, 500);
}

setSize();

//———————————————————————————————————————— fin
