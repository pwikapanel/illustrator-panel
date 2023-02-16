/*:::::::::::::::::::::::::::::::::::::::: svgLoader.js

/*———————————————————————————————————————— notes

  gets the interface color from the Host Environment
  then loads the appropriate SVG file
  
  "svg" is set in each HTML page */

//———————————————————————————————————————— set interface color

interfaceCode = getInterfaceCode();
readSvg('svg/' + svg + interfaceCode);

csif.addEventListener( CSInterface.THEME_COLOR_CHANGED_EVENT, reloadPage );


//:::::::::::::::::::::::::::::::::::::::: functions

//———————————————————————————————————————— reloadPage()

function reloadPage(){
  location.href=location.href;
}

/*———————————————————————————————————————— getInterfaceCode()

  https://fenomas.com/2014/09/cep-5-events-en/

  returns 0-3, corresponding to the 4 shades
  of interface colors availablein Ai prefs */

function getInterfaceCode() { // did have (event) as arg
  var hostEnv = window.__adobe_cep__.getHostEnvironment();
  var skinInfo = JSON.parse(hostEnv).appSkinInfo;
  var color = skinInfo.panelBackgroundColor.color;

  switch(color.red) {
  case  50: code = '_0.svg'; break;
  case 184: code = '_2.svg'; break;
  case 240: code = '_3.svg'; break;
   default: code = '_1.svg'; break; // case 83
  }
  return code;
}

/*———————————————————————————————————————— readSvg(file)

  autoedit.gitbook.io/documentation/adobe-panel/autoedit-adobe-cep-panel-dev-setup/manifest.xml */

function readSvg(file){
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function ()
  {
    if(rawFile.readyState === 4)
      if(rawFile.status === 200 || rawFile.status == 0)
      {
        var allText = rawFile.responseText;
        document.write(allText);
      }
  }
  rawFile.send(null);
}


//:::::::::::::::::::::::::::::::::::::::: fin
