/*:::::::::::::::::::::::::::::::::::::::: svgLoader.js

/*———————————————————————————————————————— notes

  gets the interface color from the Host Environment
  then loads the appropriate SVG file
  
  "svg" is set in each HTML page */

//———————————————————————————————————————— set interface color

var thisSvg = 'svg/' + svg + '_' + env_interface + '.svg';
readSvg(thisSvg);

csif.addEventListener( CSInterface.THEME_COLOR_CHANGED_EVENT, reloadPage );

document.body.style.backgroundColor = env_bgColors[env_interface];


//:::::::::::::::::::::::::::::::::::::::: functions

//———————————————————————————————————————— reloadPage()

function reloadPage(){
  location.href = location.href;
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
