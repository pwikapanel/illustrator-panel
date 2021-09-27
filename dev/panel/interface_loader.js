/*———————————————————————————————————————— manage interface color

    gets the interface color from the Host Environment
    then loads the appropriate SVG file */

//———————————————————————————————————————— set interface color

interface_code = get_interface_color('');
read_SVG('svg/' + svg +'_'+ interface_code +'.svg');

//———————————————————————————————————————— check for change

csif.addEventListener( CSInterface.THEME_COLOR_CHANGED_EVENT, reload_page );


//———————————————————————————————————————— functions

//———————————————————————————————————————— reload_page()

function reload_page(){
  location.href=location.href;
}

/*———————————————————————————————————————— get_interface_color()

    https://fenomas.com/2014/09/cep-5-events-en/

    returns 0-3, corresponding to the 4 shades
    of interface colors availablein Ai prefs */

function get_interface_color() { // did have (event) as arg
  var hostEnv = window.__adobe_cep__.getHostEnvironment();
  var skinInfo = JSON.parse(hostEnv).appSkinInfo;
  var color = skinInfo.panelBackgroundColor.color;

  switch(color.red) {
    case  50: code = 0; break;
    case  83: code = 1; break;
    case 184: code = 2; break;
    case 240: code = 3; break;
     default: code = 1; break;
  }
  return code;
}

/*———————————————————————————————————————— read_SVG(file)

    autoedit.gitbook.io/documentation/adobe-panel/autoedit-adobe-cep-panel-dev-setup/manifest.xml */

function read_SVG(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                document.write(allText);
            }
        }
    }
    rawFile.send(null);
}


//———————————————————————————————————————— fin
