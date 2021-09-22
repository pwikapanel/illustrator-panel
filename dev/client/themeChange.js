//———————————————————————————————————————— manage interface color

// https://fenomas.com/2014/09/cep-5-events-en/

// csif.addEventListener( CSInterface.THEME_COLOR_CHANGED_EVENT, setAppTheme );
//setAppTheme('');

//———————————————————————————————————————— buttons

function setAppTheme(event) {
  var hostEnv = window.__adobe_cep__.getHostEnvironment();
  var skinInfo = JSON.parse(hostEnv).appSkinInfo;
  var color = skinInfo.panelBackgroundColor.color;

  switch(color.red) {
    case  50: newId = 'gray1'; break;
    case  83: newId = 'gray2'; break;
    case 184: newId = 'gray3'; break;
    case 240: newId = 'gray4'; break;
     default: newId = 'gray2'; break;
  }

  var list = document.getElementsByTagName("svg");
  var svg = list[0];
  svg.setAttribute('id', newId);
}

//———————————————————————————————————————— fin
