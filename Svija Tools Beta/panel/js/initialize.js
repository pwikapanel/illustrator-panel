//:::::::::::::::::::::::::::::::::::::::: initialize.js

/*———————————————————————————————————————— notes

  in parent html file:

  var title = 'Svija Tools Beta';
  var svg   = 'interface_less';
  var more  = 0;

  var panel_width  = 240;
  var panel_height = 82; */


//:::::::::::::::::::::::::::::::::::::::: program

//———————————————————————————————————————— variables

  var csif  = new CSInterface();

//———————————————————————————————————————— constants

const env_sizes={
    'index.html'     : [240,  82],
    'less.html'      : [240,  82],
    'lessHelp.html'  : [240, 160],
    'more.html'      : [240, 152],
    'moreHelp.html'  : [240, 339],
    'vibe.html'      : [240, 641]
}

const actions = [

  // title when running      script                params

  //————— less

  [''                     , 'vibe.html?less.html' , ''      ], // top
  ['Verifying File…'      , 'Verify.jsx'          , ''      ], // bot
  ['Saving File…'         , 'Save.jsx'            , 'save'  ], // bot

  //————— more

  [''                     , 'vibe.html?more.html' , ''      ], // top
  ['Duplicating Layers…'  , 'Duplicate Layers.jsx', ''      ], // top

  ['Creating Group…'      , 'Create Group.jsx'    , ''      ], // 2nd
  ['Importing Styles…'    , 'Import Styles.jsx'   , ''      ], // 2nd

  ['Verifying File…'      , 'Verify.jsx'          , ''      ], // 3rd

  ['Saving File…'         , 'Save.jsx'            , 'canvas'], // bot
  ['Saving Files…'        , 'Save.jsx'            , 'all'   ], // bot
  ['Saving File…'         , 'Save.jsx'            , 'save'  ]  // bot

];


const env_bgColors = ['#252525', '#464646', '#aaaaaa', '#dcdcdc']; // bottom bar of panel

const env_path = csif.getSystemPath(SystemPath.EXTENSION) + '/scripts/';

//———————————————————————————————————————— title & cookie

csif.setWindowTitle(title);

if (typeof more != 'undefined')
  setCookie('more', more);

/*———————————————————————————————————————— getInterfaceCode()*/

var env_interface = getInterfaceCode(); // 0-3 dark to light in AI prefs


//:::::::::::::::::::::::::::::::::::::::: functions

/*———————————————————————————————————————— getInterfaceCode()

  https://fenomas.com/2014/09/cep-5-events-en/

  returns 0-3, corresponding to the 4 shades
  of interface colors availablein Ai prefs */

function getInterfaceCode() { // did have (event) as arg
  var hostEnv = window.__adobe_cep__.getHostEnvironment();
  var skinInfo = JSON.parse(hostEnv).appSkinInfo;
  var color = skinInfo.panelBackgroundColor.color;

  switch(color.red) {
  case  50: code = 0; break;
  case 184: code = 2; break;
  case 240: code = 3; break;
   default: code = 1; break; // case 83
  }

  return code;
}

/*———————————————————————————————————————— openLink(url)

    the vibe page calles 'vibeBack' as url, and then
    the query string is used to get the real url

    it will either be ?less.html or ?more.html */

function openLink(url){

  if (url == 'vibeBack'){ // vibe pages call
    url = document.URL;
    bits = url.split('?');
    url = bits[1];
  }

  if (url.indexOf('?') > 0)
    var address = url.split('?');
  else
    var address = [url, ''];


  setSize(address[0]);

  location.href = url;
}

//———————————————————————————————————————— setSize(url)

function setSize(url){
  url = stripQuery(url);

  var w = env_sizes[url][0];
  var h = env_sizes[url][1];

  var factor = window.__adobe_cep__.getScaleFactor()

  var xFactor = Math.round(w/factor);
  var yFactor = Math.round((h-0.5)/factor);

  csif.resizeContent(xFactor, yFactor);
  setTimeout(setSize, 500, url);
}

//———————————————————————————————————————— stripQuery(url)

function stripQuery(url){
  if (url.indexOf('?') < 0) return url;

  var bits = url.split('?');
  return bits[0]
}


//:::::::::::::::::::::::::::::::::::::::: fin

