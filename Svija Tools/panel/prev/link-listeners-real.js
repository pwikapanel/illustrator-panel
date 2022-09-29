/*———————————————————————————————————————— button action attribution

  title                    script                            param  */

var actions = [
  [''                     , 'info-simple.html'               , ''      ],
  ['Relinking Images…'    , '3. Reset Image Links — ⌘ F3.jsx', ''      ],
  ['Saving File…'         , '1. Save as Svija — ⌘ F1.jsx'    , 'save'  ],

  [''                     , 'info-advanced.html'             , ''      ],
  ['Resetting ID\'s'      , '4. Reset Object IDs- F1.jsx'    , ''      ],
  ['Duplicating Layers…'  , '2. Duplicate Layers — ⌘ F2.jsx' , ''      ],
  ['Importing Styles…'    , '5. Save as Svija — ⌘ F1.jsx'    , ''      ],
  ['Relinking Images…'    , '3. Reset Image Links — ⌘ F3.jsx', ''      ],
  ['Saving Files…'        , '1. Save as Svija — ⌘ F1.jsx'    , 'close' ],
  ['Saving Files…'        , '1. Save as Svija — ⌘ F1.jsx'    , 'all'   ],
  ['Saving File…'         , '1. Save as Svija — ⌘ F1.jsx'    , 'save'  ],
];

//———————————————————————————————————————— add listeners

// interface_code = 0-3, set in interface_loader.js
var how_many = 11;

for (x=0; x<how_many; x++){ try{
  var obj = document.getElementById('link' + interface_code + '-' + x);

  obj.addEventListener('mouseover', mov.bind(null, x, interface_code), false);
  obj.addEventListener('mouseout',  mot.bind(null, x, interface_code), false);
  obj.addEventListener('mousedown', mod.bind(null, x, interface_code), false);

  obj.addEventListener('mouseup',   exe.bind(null, x, interface_code), false);
} catch(err){ }}

//———————————————————————————————————————— add listeners

function mov(button, c){ try{
  var mov_id = 'mov' + c + '-' + button;
  var mod_id = 'mod' + c + '-' + button;

  var mov_obj = document.getElementById(mov_id);
  var mod_obj = document.getElementById(mod_id);

  mov_obj.style.display = 'block';
  mod_obj.style.display = 'none';
} catch(err){alert(err + '\n'+mov_id+'\n'+mod_id);}}

function mot(button, c){ try{
  var mov_id = 'mov' + c + '-' + button;
  var mod_id = 'mod' + c + '-' + button;

  var mov_obj = document.getElementById(mov_id);
  var mod_obj = document.getElementById(mod_id);

  mov_obj.style.display = 'none';
  mod_obj.style.display = 'none';
} catch(err){alert(err);}}


function mod(button, c){ try{
  var mov_id = 'mov' + c + '-' + button;
  var mod_id = 'mod' + c + '-' + button;

  var mov_obj = document.getElementById(mov_id);
  var mod_obj = document.getElementById(mod_id);

  mov_obj.style.display = 'none';
  mod_obj.style.display = 'block';
} catch(err){alert(err);}}

function exe(button, c){ try{
  var mov_id = 'mov' + c + '-' + button;
  var mod_id = 'mod' + c + '-' + button;

  var mov_obj = document.getElementById(mov_id);
  var mod_obj = document.getElementById(mod_id);

  mov_obj.style.display = 'block';
  mod_obj.style.display = 'none';

  alert(actions[button][1]);

//   var path = csif.getSystemPath(SystemPath.EXTENSION) + '/scripts/';
//   
//   function funcExec(btnId, scriptName, arg, titl){
//     funcMou(btnId);
//     changeTitle(titl);
//   
//     if (arg=='x') {location.href = 'info.html';}
//     else {
//       file = path + encodeURI(scriptName);
//       csif.evalScript("arg = '" + arg + "'");
//       csif.evalScript("$.evalFile('" + file + "')");
//     }
//   }

} catch(err){alert(err);}}

//———————————————————————————————————————— add listeners

//   for (var x=0; x<buttons.length; x++){
//   
//     var obj = document.getElementById('link' + (x+1));
//     var button = 'btn' + (x+1);
//   
//     var script = buttons[x][1];
//     var param  = buttons[x][2];
//     var title  = buttons[x][0];
//   
//     obj.addEventListener('mouseover', funcMov.bind(null, button), false);
//     obj.addEventListener('mouseout',  funcMot.bind(null, button), false);
//     obj.addEventListener('mousedown', funcMod.bind(null, button), false);
//     obj.addEventListener('mouseup',   funcExec.bind(null, button, script, param, title), false);
//   }

//———————————————————————————————————————— mouseup = execution


//———————————————————————————————————————— utility functions

/*———————————————————————————————————————— changeTitle(newTitle){
//   
//       changes panel title for a given delay */
//   
//   function changeTitle(newTitle){
//     prevTitle = csif.getWindowTitle();
//     csif.setWindowTitle(newTitle);
//     delay = 500;
//     setTimeout(function(){ csif.setWindowTitle(prevTitle); }, delay);
//   }


//———————————————————————————————————————— fin
