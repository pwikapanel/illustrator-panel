
/*:::::::::::::::::::::::::::::::::::::::: tools.js */

/*———————————————————————————————————————— notes

/*———————————————————————————————————————— (c) & EULA

   Copyright (c) Svija

   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:
   
   The above copyright notice and this permission notice shall be included in
   all copies or substantial portions of the Software.
   
   The software is provided "as is", without warranty of any kind, express or
   implied, including but not limited to the warranties of merchantability,
   fitness for a particular purpose and noninfringement. In no event shall the
   authors or copyright holders be liable for any claim, damages or other
   liability, whether in an action of contract, tort or otherwise, arising from,
   out of or in connection with the software or the use or other dealings in
   the software.

  	svija.com · hello@svija.com */


/*:::::::::::::::::::::::::::::::::::::::: control functions */


/*———————————————————————————————————————— statusUpdate(arg)

    gets info about ai-land and updates
    environmental variables in panel-land constantly.

    all info is stored in localStorage unless empty */

localStorage.myDocs = jsx.getSystemPath(SystemPath.MY_DOCUMENTS);
localStorage.isMac  = jsx.getOSInformation().substring(0,3) == 'Mac'

var envInterval = 300
var scrpt = 'statusUpdate("' + localStorage.isMac + '")'

//setTimeout(function(){
setInterval(function(){
  jsx.evalScript(scrpt, statusUpdate)
}, envInterval);

function statusUpdateInit(){ jsx.evalScript('statusUpdate("' + localStorage.myDocs + '")', statusUpdate) }

var btnSaveTitle = btnSave.title

const env_path = jsx.getSystemPath(SystemPath.EXTENSION) + encodeURI('/');

function statusUpdate(val){

  file = env_path + 'preferences-update.jsx'
  jsx.evalScript("$.evalFile('" + file + "')")

  var lines = val.split('¬')

  for (var x=0; x<lines.length; x+=1){
    var [key_, value_] = lines[x].split('|')
    if (value_ != '')
      localStorage.setItem(key_, value_);
  }

  // set online status light ————————————————————————————————————————

  if (navigator.onLine) indOnline.style.backgroundColor = 'var(--system-highlight)'
                   else indOnline.style.backgroundColor = 'var(--offline)'

  // set title ——————————————————————————————————————————————————————

  if (typeof localStorage.url == 'undefined')
    localStorage.url = ''

  if (localStorage.url != '')
    jsx.setWindowTitle(localStorage.url)
  else
    jsx.setWindowTitle('Svija Tools 2.0')

  // set save button mouseover ——————————————————————————————————————

  if (localStorage.openFiles == 0) btnSave.style.display = 'none'
  else                             btnSave.style.display = 'inline'

  if (localStorage.openFiles != 0) btnOpen.style.display = 'none'
  else                             btnOpen.style.display = 'inline'

  // set grid spacing ———————————————————————————————————————————————

  if (typeof localStorage.gridLine == 'undefined')
    var gridLine = 'xx'
  else
    var gridLine = localStorage.gridLine

  if (typeof localStorage.gridSub == 'undefined')
    var gridSub  = 'xx'
  else
    var gridSub  = localStorage.gridSub

  indGrid.value = gridLine + '⋮' + gridSub

  // point indicator  ———————————————————————————————————————————————

//if (localStorage.pointSnap == '1') indPoint.style.color = 'var(--indicatorOn)'
//else                               indPoint.style.color = 'var(--indicatorOff)'

  // pixel indicator  ———————————————————————————————————————————————

//if (localStorage.pixelSnap == '1') indPixel.style.color = 'var(--indicatorOn)'
//else                               indPixel.style.color = 'var(--indicatorOff)'


}


/*:::::::::::::::::::::::::::::::::::::::: indicators */

//———————————————————————————————————————— online indicator color matches system

var hue = systemHue()
var lightness = 50
var dimness = 30

if (hue>190 && hue < 290) lightness += 10

var highlight = 'hsl('+hue+', 100%, ' + lightness + '%)'
var  dimlight = 'hsl('+hue+',  30%, ' + dimness   + '%)'

if (typeof localStorage.highlight != 'undefined') highlight = localStorage.highlight
if (typeof localStorage.dimlight  != 'undefined') dimlight  = localStorage.dimlight

document.documentElement.style.setProperty('--system-highlight', highlight);
document.documentElement.style.setProperty('--system-dimlight',   dimlight);

/*———————————————————————————————————————— online indicator */

indOnline.addEventListener('mouseup', (evn) => {
  jsx.evalScript('colorPicker()', setAccent)
})

// https://community.adobe.com/t5/illustrator-discussions/show-color-picker-dialog-jsx-csaw/td-p/5877341

function setAccent(arg){
  var parts = arg.split(':')

  var r = parts[0]
  var g = parts[1]
  var b = parts[2]
  
  var hsl        = rgbToHsl(r, g, b)
  var hue        = Math.round(hsl[0])
  var saturation = Math.round(hsl[1])
  
  var lightness = 50
  var dimness   = 30
  
  if (hue>190 && hue < 290) lightness += 10
  
  var highlight = 'hsl('+hue+', 100%, ' + lightness + '%)'
  var  dimlight = 'hsl('+hue+',  30%, ' + dimness   + '%)'
  
  localStorage.highlight = highlight
  localStorage.dimlight  = dimlight

  document.documentElement.style.setProperty('--system-highlight', highlight)
  document.documentElement.style.setProperty('--system-dimlight',   dimlight)
}

/*———————————————————————————————————————— grid indicator */

indGrid.addEventListener('mouseup', (evn) => {
  var swap = evn.getModifierState('Alt');
  if (swap) setGrid(true); else setGrid(false)
})

                                              // will be swapped at startup v
if (typeof localStorage.gridSnap == 'undefined') localStorage.gridSnap = 'true';
if (localStorage.gridSnap == 'true')             localStorage.gridSnap = 'false'
else                                             localStorage.gridSnap = 'true'

setGrid(true)

function setGrid(swap){

  if (localStorage.gridSnap == 'true'){
    localStorage.gridSnap = 'false'
    indGrid.style.color = 'var(--indicatorOff)'
  }
  else{
    localStorage.gridSnap = 'true'
    indGrid.style.color = 'var(--indicatorOn)'
  }

  if (!swap) jsx.evalScript('menuCommand("snapgrid")')
}

/*———————————————————————————————————————— guides indicator */

indGuide.addEventListener('mouseup', (evn) => {
  var swap = evn.getModifierState('Alt');
  if (swap) setGuide(true); else setGuide(false)
})

if (typeof localStorage.guideSnap == 'undefined') localStorage.guideSnap = 'true';
if (localStorage.guideSnap == 'true')             localStorage.guideSnap = 'false'
else                                              localStorage.guideSnap = 'true'

setGuide(true)

function setGuide(swap){

  if (localStorage.guideSnap == 'true'){
    localStorage.guideSnap = 'false'
    indGuide.style.color = 'var(--indicatorOff)'
  }
  else{
    localStorage.guideSnap = 'true'
    indGuide.style.color = 'var(--indicatorOn)'
  }

  if (!swap) jsx.evalScript('menuCommand("showguide")')
}

/*———————————————————————————————————————— point indicator */

//indPoint.addEventListener('mouseup', (evn) => {
//  setPoint()
//})

function setPoint(){

  if (localStorage.pointSnap == 'true') indPoint.style.color = 'var(--indicatorOff)'
  else                                  indPoint.style.color = 'var(--indicatorOn)'

  jsx.evalScript('menuCommand("snappoint")')
}

/*———————————————————————————————————————— pixel indicator

    menu command is pixelconstraints but it doesn't work */

//indPixel.addEventListener('mouseup', (evn) => {
//  setPixel()
//})

function setPixel(){
  lert('Menu « Affichage »\r(en bas du menu)')
}

/*———————————————————————————————————————— smart guides indicator */

indSmart.addEventListener('mouseup', (evn) => {
  var swap = evn.getModifierState('Alt');
  if (swap) setSmart(true); else setSmart(false)
})

if (typeof localStorage.smartSnap == 'undefined') localStorage.smartSnap = 'true';
if (localStorage.smartSnap == 'true')             localStorage.smartSnap = 'false'
else                                              localStorage.smartSnap = 'true'

setSmart(true)

function setSmart(swap){

  if (localStorage.smartSnap == 'true'){
    localStorage.smartSnap = 'false'
    indSmart.style.color = 'var(--indicatorOff)'
  }
  else{
    localStorage.smartSnap = 'true'
    indSmart.style.color = 'var(--indicatorOn)'
  }

  if (!swap) jsx.evalScript('menuCommand("Snapomatic on-off menu item")')
}

/*———————————————————————————————————————— local storage

    localStorage.removeItem('isSvija') */

dumpLS.addEventListener('click', (evn) => {

  localStorage.clear()
  lert('localStorage cleared')
  return

  var res = 'localStorage contains '+localStorage.length + ' items:\n\n'

  for (var key in localStorage){
    if (localStorage.hasOwnProperty(key)){
      if (key.length       == 0      ) localStorage.removeItem(key)
      if (key.substr(0, 5) == 'Error') localStorage.removeItem(key)
      else
        res += key +': '+ localStorage[key] + '\n'
    }
  }

  alert(res)
})

/*———————————————————————————————————————— show more •••

    manages the panel height and the expand button */

var collapsedHeight = 75
var expandedHeight  = 105

showMore.addEventListener('click', windowExpand)
windowExpand()

function windowExpand(){
  var currentWidth  = parent.window.innerWidth
  var currentHeight = parent.window.innerHeight

  if (currentHeight != collapsedHeight){
    bottomSection.style.display='none'
    jsx.resizeContent(currentWidth, collapsedHeight)
  }
  else{
    bottomSection.style.display='block'
    jsx.resizeContent(currentWidth, expandedHeight)
  }
}


/*:::::::::::::::::::::::::::::::::::::::: buttons top */

/*———————————————————————————————————————— 1.1 create group

    */

createGrp.addEventListener("click", (evn) => {
  jsx.evalScript("createGroup()", feedbackSimple)
})

/*———————————————————————————————————————— 1.2 place image

    */

placeImage.addEventListener('click', (evn) => {
  var alt   = evn.getModifierState('Alt');
  jsx.evalScript('placeImage(' + alt + ', ' + localStorage.isMac + ')')
})

/*———————————————————————————————————————— 1.3 change case */

changeCase.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  if (alt) str = 'changeCase(true)'
  else str = 'changeCase(false)'
  jsx.evalScript(str, feedbackSimple)
})

/*———————————————————————————————————————— 1.4 open folder

    */ 

const pcOpener  = 'C:\\Windows\\explorer.exe'
const macOpener = '/usr/bin/open'

showFolder.addEventListener('mouseup', (evn) => {

  if (localStorage.isMac == 'true') var opener = macOpener
  else                              var opener = pcOpener

  var path  = localStorage.lastPath

  if (path == ''){
    lert('Pas de projet Svija enregistré')
    return true
  }

  if (localStorage.isMac == 'true')
    path = path.substr(0, path.lastIndexOf('/'))
  else
    path = path.substr(0, path.lastIndexOf('\\'))

  path = path.replace(/\\\\/g, "\\")

  //lert(path)
  // C:/Users/andy/Desktop/pixside.fr/sync/Example Pages/sync

//path = "C:\\Users\\andy\\Desktop\\pixside.fr\\sync" // worked
//path = "C:\\Users\\andy\\Desktop\\pixside.fr\\sync\\Example Pages" // worked
  window.cep.process.createProcess(opener, path)

})

/*———————————————————————————————————————— 1.5 launch site & cloud

    should launch site & cloud if there was ever:
    • a URL.txt
    • a sync folder   */

launchSite.addEventListener('click', (evn) => {
  var alt = evn.getModifierState('Alt');

  if(localStorage.url == ''){
    lert('Fichier manquant\nMerci de créer\nsync/SVIJA/System/URL.txt\navec l\'url du site (sans https://)')
    return true
  }

  url = 'https://' + localStorage.url
  if (alt) url += '/c'

  jsx.openURLInDefaultBrowser(url)
})

/*———————————————————————————————————————— 1.6A save

    saves file
    +alt saves all files

    if no open file, will open a file
    +alt opens most recently closed file */

btnSave.addEventListener('click', (evn) => {
  var shift = evn.getModifierState('Shift');
  var ctrl  = evn.getModifierState('Control');
  var alt   = evn.getModifierState('Alt');

  // functions as a save button
  if (localStorage.openFiles > 0){
    aiTimeout('savePage(' + alt + ')',  'feedback', 100)
    return true
  }
})

/*———————————————————————————————————————— 1.6B save open

    saves file
    +alt saves all files

    if no open file, will open a file
    +alt opens most recently closed file */

btnOpen.addEventListener('click', (evn) => {
  var shift = evn.getModifierState('Shift');
  var ctrl  = evn.getModifierState('Control');
  var alt   = evn.getModifierState('Alt');

  // open, no useful path
  if (localStorage.lastPath == ''){
    jsx.evalScript('menuCommand("open")'); 
    return true
  }

  // open, use last known path or file
  var str = localStorage.lastPath + '", "' + localStorage.url

  if (alt){ jsx.evalScript(  'openPage("' + str + '")') }
  else    { jsx.evalScript('openFolder("' + str + '")') }

})


/*:::::::::::::::::::::::::::::::::::::::: buttons bottom */

/*———————————————————————————————————————— 2.1 import default styles

*/

/*———————————————————————————————————————— 2.2 set default styles

*/

/*———————————————————————————————————————— 2.3 new page/module

    alt = create module instead of page */
newPage.addEventListener('click', (evn) => {
  var alt   = evn.getModifierState('Alt');
  var doubleLastPath = doubleSlashes(localStorage.lastPath)
  jsx.evalScript('newPage(' + alt + ', "' + doubleLastPath +'",' + localStorage.isMac+')')
})

/*———————————————————————————————————————— 2.4 empty cache NEEDS HELP

    enable-nodejs
    mixed-context

  • cache doesn't work (/csync) */

clearCache.addEventListener('click', (evn) => {
  lert('bientôt')
})

/*

async function testFetch(){
  lert('so far')
}

const timeoutId = setTimeout(() => controller.abort(), 5000)

async function testFetch(){
  var url = 'https://example.svija.site/csync'

  fetch(url, { signal: controller.signal }).then(
    function(response) {
      return response.text().then(
        function(text) {
          fetchReturn(text);
})})
  }
}
*/

/*———————————————————————————————————————— 2.5 check & repair

    */

chkRepair.addEventListener('click', (evn) => {
  aiTimeout('checkRepair()', 'feedback', 100)
})

/*———————————————————————————————————————— 2.6 launch support */

launchSupport.addEventListener('click', (evn) => {
  var alt = evn.getModifierState('Alt')

  if (alt) url = 'mailto:support@svija.com?subject=Demande de support Svija&body=\n\n_____________________________\n    Envoyé depuis Svija Tools'
  else     url = 'https://tech.svija.love/svija-tools-2.0'

  url = encodeURI(url)
  jsx.openURLInDefaultBrowser(url)
})


/*:::::::::::::::::::::::::::::::::::::::: interface functions */

/*———————————————————————————————————————— initializeLabels()

    the area attribute serves as a flag whether title and
    alt have been exchanged */

buttons = [

//  id               label      alt-label      tooltip

  ['createGrp'    , 'Groupe'  , 'Groupe'   , 'Créer un groupe'                                                              ],
  ['placeImage'   , 'Image'   , 'Image'    , 'Importer une image'                                                           ],
  ['changeCase'   , 'Casse'   , 'Mot mot'  , 'Changer la casse · alt/option = Premières Lettres En Maj'                     ],
  ['showFolder'   , 'Dossier' , 'Dossier'  , 'Ouvrir le dossier local'                                                      ],
  ['launchSite'   , 'Site'    , 'Cloud'    , 'Ouvrir le site web dans un navigateur (alt/option = Svija Cloud)'             ],
  ['btnSave'      , 'Sauv.'   , 'Tous'     , 'Sauvegarder la page · alt/option = sauvegarder toutes les pages ouvertes'     ],
  ['btnOpen'      , 'Ouvrir'  , 'Récent'   , 'Ouvrir un ficher · alt/option = ouvrir le fichier le plus récent'             ],

  ['impStyles'    , '^Styles' , '^Styles'  , 'Importer styles par défaut'                                                   ],
  ['expStyles'    , 'vStyes'  , 'vStyes'   , 'Établir comme styles par défaut'                                              ],
  ['newPage'      , '+Page'   , 'Module'   , 'Nouvelle page · alt/option = nouveau module'                                  ],
  ['clearCache'   , 'Cache'   , 'Cache'    , 'Vider le cache (si activé)'                                                   ],
  ['chkRepair'    , 'Vérifier', 'Vérifier' , 'Vérifier & réparer les problèmes'                                             ],
  ['launchSupport', 'Support' , 'Mail'     , 'Ouvrir le site de support technique · alt/option = envoyer un mail au support']
]

function initializeLabels(){
  for (var x=0; x<buttons.length; x++){
    window[buttons[x][0]].value = buttons[x][1]
    window[buttons[x][0]].name  = buttons[x][1]

    window[buttons[x][0]].alt   = buttons[x][2]
    window[buttons[x][0]].title = buttons[x][3]
  }
}

initializeLabels()

/*———————————————————————————————————————— tooltips

    need to set a delay and if still over, show tooltip

    tooltip for save needs to change depending on whether
    a document is open (changes from save to open)  */

var ttText  = mouseover.innerHTML
var ttDelay = 1000

var targetList = ['indOnline',  'indGrid',    'indGuide', 'indSmart', 'indReload', 'dumpLS',
                  'createGrp', 'placeImage', 'changeCase', 'showFolder', 'launchSite', 'btnSave',    
                  
                  'chkRepair',  'clearCache', 'newPage',  'launchSupport']

for (x=0; x<targetList.length; x++){
  window[targetList[x]].addEventListener('mouseover', function(e){
    e.currentTarget.over = true
    setTimeout(showTip, ttDelay, e.currentTarget.id)
  })

  window[targetList[x]].addEventListener('mouseout' , function(e){
    e.currentTarget.over = false
    mouseover.innerHTML = ttText
    mouseover.style.color = 'var(--tooltipOff)'
  })
}

function showTip(objName){
  if(window[objName].over){
    mouseover.innerHTML = window[objName].title
    mouseover.style.color = 'var(--tooltipOn)'
  }
}

/*———————————————————————————————————————— mouse over window COMMENTED OUT

    store info about mouse over window state
    and alt key if it happened before window
    got focus */

// proved: mouseover/mouseout triggered on document.body even when there's no focus
// proved: I can focus() an input field only if the panel already has focus

/*
window.addEventListener('mouseover', (evn) => {
  document.body.style.backgroundColor="#550000"
  testInput.focus()
  //alert(evn)
})

window.addEventListener('mouseout'  , (evn) => {
  document.body.style.backgroundColor="#444444"
  testInput.blur()
  //alert(evn)
})

var keyStr = 18 // option on mac
jsx.registerKeyEventsInterest(keyStr)

document.body.addEventListener('keydown', (evn) => {
  alert(evn)
})

document.body.addEventListener('keyup'  , (evn) => {
  alert(evn)
})
*/

/*———————————————————————————————————————— buttonLabels(evn) COMMENTED OUT

    alt text should show only when cursor is over panel
    whether or not alt is pressed before entering airspace

    when mouse moves away from panel it should revert

    the only tricky part is when the mouse moves away from
    the panel but panel has focus — alt key needs
    to stop having effect */

// area = flag that alt/title have been swapped

/*
function buttonLabels(evn){
  var alt   = evn.getModifierState('Alt');

function buttonLabels(alt){

  if (alt) // set to alt state
    for (var x=0; x<buttons.length; x++)
      window[buttons[x][0]].value = window[buttons[x][0]].alt

  else // set to normal state
    for (var x=0; x<buttons.length; x++)
      window[buttons[x][0]].value = window[buttons[x][0]].name

}
*/


/*:::::::::::::::::::::::::::::::::::::::: utility functions */

/*———————————————————————————————————————— doubleSlashes()
 
     doubles backslashes for passing Windows paths
     to JSX files */

function doubleSlashes(arg){
  return arg.replaceAll("\\", "\\\\")
}

/*———————————————————————————————————————— showSpinner()

    starts the wait screen during long operations
    called by aiTimeout() */

function showSpinner(){
  spinner.style.display='block'
}

/*———————————————————————————————————————— aiTimeout(script, callback, delay)

    executes a script after a short delay to give the spinner
    time to be displayed correctly */

function aiTimeout(script, callback, delay){
  showSpinner()
  setTimeout(jsx.evalScript, 1*delay, script, window[callback])
}

/*———————————————————————————————————————— feedbackSimple()

    feedback only if error, for simple operations */

  function feedbackSimple(arg){
    if (arg != ''){
      spinner.style.display='none'
      doneMsg.style.display='block'
      doneMsg.innerHTML = '<pre>' + arg + '</pre><span class=\'closeX\'>×</span>'
      setTimeout(clearFeedback, 2000)
    }
  }

/*———————————————————————————————————————— feedback(arg)

    fils out feedback square */

var showTime = 6000

function feedback(arg){
  spinner.style.display='none'

  if (arg=='') return true

  doneMsg.style.display='block'
  doneMsg.innerHTML = '<pre>' + arg + '</pre><span class=\'closeX\'>×</span>'
  setTimeout(clearFeedback, showTime)
}

/*———————————————————————————————————————— clear feedback */

  function clearFeedback(){
    doneMsg.style.display = 'none'
  }

/*———————————————————————————————————————— rgbToHsl(r, g, b)

    https://www.30secondsofcode.org/js/s/rgb-to-hsl/  */

function rgbToHsl(r, g, b){
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
}

/*———————————————————————————————————————— systemHue

    returns hue of system highlight color, except...

    - if it's windows default blue, we return Svija color
    - if it's less than 10% saturated we return Svija color */

function systemHue(){

  var hostEnv     = jsx.getHostEnvironment();
  var RGBColorObj = hostEnv.appSkinInfo.systemHighlightColor;
  
  var r = RGBColorObj.red
  var g = RGBColorObj.green
  var b = RGBColorObj.blue
  
  var hsl        = rgbToHsl(r, g, b)
  var hue        = Math.round(hsl[0])
  var saturation = Math.round(hsl[1])
  
  if (''+r+g+b == '0120215') hue = 72
  
  if (saturation < 10) hue = 72   // if system highlight is gray, use official color
  
  return hue
}
  

/*:::::::::::::::::::::::::::::::::::::::: end */


