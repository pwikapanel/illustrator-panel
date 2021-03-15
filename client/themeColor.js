//———————————————————————————————————————— manage interface color

window.__adobe_cep__.addEventListener("com.adobe.csxs.events.ThemeColorChanged", () => { setId(); })

setId();

//———————————————————————————————————————— buttons

function setId(){
  let color = JSON.parse(window.__adobe_cep__.getHostEnvironment())
    .appSkinInfo.panelBackgroundColor.color;
  
  var list = document.getElementsByTagName("svg");
  var svg = list[0];

  switch(color.red) {
    case  50: svg.setAttribute('id', 'gray1'); break;
    case  83: svg.setAttribute('id', 'gray2'); break;
    case 184: svg.setAttribute('id', 'gray3'); break;
    case 240: svg.setAttribute('id', 'gray4'); break;
     default: svg.setAttribute('id', 'gray2'); break;
  }
}

//———————————————————————————————————————— fin
