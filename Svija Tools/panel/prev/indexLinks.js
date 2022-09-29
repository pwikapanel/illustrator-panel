/*———————————————————————————————————————— client/indexLinks.js

     adds links to Illustrator objects
     executes scripts etc. */

/*———————————————————————————————————————— button action attribution

    title                    script                            param  */

var buttons = [
  ['Loading Text Styles…',  'Update Styles from File.jsx',     ''     ],
  ['Resetting Object Ids…', '4. Reset Object IDs — ⌘ F4.jsx',  ''     ],
  ['Duplicating Layers…',   '2. Duplicate Layers — ⌘ F2.jsx',  ''     ],
  ['Resetting Links…',      '3. Reset Image Links — ⌘ F3.jsx', ''     ],
  ['Closing All…',          '1. Save as Svija — ⌘ F1.jsx',     'close'],
  ['Saving All…',           '1. Save as Svija — ⌘ F1.jsx',     'all'  ],
  ['Saving as Svija…',      '1. Save as Svija — ⌘ F1.jsx',     'save' ],
  ['',                      'show info panel',                 'x'    ]
];

//———————————————————————————————————————— add listeners

for (var x=0; x<buttons.length; x++){

  var obj = document.getElementById('link' + (x+1));
  var button = 'btn' + (x+1);

  var script = buttons[x][1];
  var param  = buttons[x][2];
  var title  = buttons[x][0];

  obj.addEventListener('mouseover', funcMov.bind(null, button), false);
  obj.addEventListener('mouseout',  funcMot.bind(null, button), false);
  obj.addEventListener('mousedown', funcMod.bind(null, button), false);
  obj.addEventListener('mouseup',   funcExec.bind(null, button, script, param, title), false);
}

//———————————————————————————————————————— mouseup = execution

var path = csif.getSystemPath(SystemPath.EXTENSION) + '/scripts/';

function funcExec(btnId, scriptName, arg, titl){
  funcMou(btnId);
  changeTitle(titl);

  if (arg=='x') {location.href = 'info.html';}
  else {
    file = path + encodeURI(scriptName);
    csif.evalScript("arg = '" + arg + "'");
    csif.evalScript("$.evalFile('" + file + "')");
  }
}

//———————————————————————————————————————— utility functions

/*———————————————————————————————————————— changeTitle(newTitle){

    changes panel title for a given delay */

function changeTitle(newTitle){
  prevTitle = csif.getWindowTitle();
  csif.setWindowTitle(newTitle);
  delay = 500;
  setTimeout(function(){ csif.setWindowTitle(prevTitle); }, delay);
}

//———————————————————————————————————————— mouse interactions

function funcMov(btnId){
  var btnmo = document.getElementById(btnId+'mo' );
  var btnmd = document.getElementById(btnId+'md');
  btnmo.style.display = 'block';
  btnmd.style.display = 'none';
}

function funcMot(btnId){
  var btnmo = document.getElementById(btnId+'mo' );
  var btnmd = document.getElementById(btnId+'md');
  btnmo.style.display = 'none';
  btnmd.style.display = 'none';
}

function funcMod(btnId){
  var btnmo = document.getElementById(btnId+'mo' );
  var btnmd = document.getElementById(btnId+'md');
  btnmo.style.display = 'none';
  btnmd.style.display = 'block';
}

function funcMou(btnId){
  var btnmo = document.getElementById(btnId+'mo' );
  var btnmd = document.getElementById(btnId+'md');
  btnmo.style.display = 'block';
  btnmd.style.display = 'none';
}


//———————————————————————————————————————— fin
