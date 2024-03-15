
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

  if (localStorage.pointSnap == '1') indPoint.style.color = 'var(--indicatorOn)'
  else                               indPoint.style.color = 'var(--indicatorOff)'

  // pixel indicator  ———————————————————————————————————————————————

  if (localStorage.pixelSnap == '1') indPixel.style.color = 'var(--indicatorOn)'
  else                               indPixel.style.color = 'var(--indicatorOff)'


}


/*:::::::::::::::::::::::::::::::::::::::: indicators */

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

indPoint.addEventListener('mouseup', (evn) => {
  setPoint()
})

function setPoint(){

  if (localStorage.pointSnap == 'true') indPoint.style.color = 'var(--indicatorOff)'
  else                                  indPoint.style.color = 'var(--indicatorOn)'

  jsx.evalScript('menuCommand("snappoint")')
}

/*———————————————————————————————————————— pixel indicator

    menu command is pixelconstraints but it doesn't work */

indPixel.addEventListener('mouseup', (evn) => {
  setPixel()
})

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

/*———————————————————————————————————————— reload

    for development only */

indReload.addEventListener('click', (evn) => {
  location.reload()
})

/*———————————————————————————————————————— local storage FIX AFTER DEBUGGING

    ALSO FIX status-update.jsx

    localStorage.removeItem('isSvija') */

dumpLS.addEventListener('click', (evn) => {

  file = env_path + 'preferences-update.jsx'
  jsx.evalScript("$.evalFile('" + file + "')")

  jsx.evalScript('returnGrid()',lert)

})






/*

  var res = 'localStorage contains '+localStorage.length + ' items:\n\n'

  for (var key in localStorage){
    if (localStorage.hasOwnProperty(key)){
      if (key.length       == 0      ) localStorage.removeItem(key)
      if (key.substr(0, 5) == 'Error') localStorage.removeItem(key)
      else
        res += key +': '+ localStorage[key] + '\n'
    }
  }

  alert(res) */

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

createGrp.addEventListener("click", createGroupInit)

function createGroupInit(){
  jsx.evalScript("createGroup()", feedbackSimple)
}

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

/*———————————————————————————————————————— 1.4 open folder */

const pcOpener  = 'C:\\Windows\\explorer.exe'
const macOpener = '/usr/bin/open'

showFolder.addEventListener('mouseup', openFolder);

function openFolder(){

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

}

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

/*———————————————————————————————————————— 2.1 check & repair

    */

chkRepair.addEventListener('click', (evn) => {
  aiTimeout('checkRepair()', 'feedback', 100)
})

/*———————————————————————————————————————— 2.2 new page/module

    alt = create module instead of page */
newPage.addEventListener('click', (evn) => {
  var alt   = evn.getModifierState('Alt');
  var doubleLastPath = doubleSlashes(localStorage.lastPath)
  jsx.evalScript('newPage(' + alt + ', "' + doubleLastPath +'",' + localStorage.isMac+')')
})

/*———————————————————————————————————————— 2.3 new project

    sends an email requesting new project */

newProject.addEventListener('click', (evn) => {
  var alt = evn.getModifierState('Alt')

  //url = 'mailto:support@svija.com'
  //url = 'mailto:support@svija.com?subject=Demande de nouveau projet Svija&body=Bonjour\n\nJe voudrais démarrer un nouveau projet Svija à l\'adresse suivante :\n\n       ______.svija.site\n\nCordialement,'
  url = 'mailto:support@svija.com?subject=Demande de nouveau projet Svija&body=Bonjour\n\nJe voudrais démarrer un nouveau projet Svija à l\'adresse suivante :\n\n       ______.svija.site\n\nCordialement,'

  url = encodeURI(url)
  jsx.openURLInDefaultBrowser(url)
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

/*———————————————————————————————————————— 2.5 launch support */

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

  ['createGrp'    , 'Groupe' , 'Groupe'   , 'Créer un groupe'                                                       ],
  ['placeImage'   , 'Image'  , 'Image'    , 'Importer une image'                                                    ],
  ['changeCase'   , 'Casse'  , 'Mot mot'  , 'Changer la casse · alt = Premières Lettres En Maj'                     ],
  ['showFolder'   , 'Dossier', 'Dossier'  , 'Ouvrir le dossier local'                                               ],
  ['launchSite'   , 'Site'   , 'Cloud'    , 'Ouvrir le site web · alt = ouvrir Svija Cloud'                         ],
  ['btnSave'      , '↯'      , '↯ tous'   , 'Sauvegarder la page · alt = sauvegarder toutes les pages ouvertes'     ],
  ['btnOpen'      , 'OUVRIR' , 'Récent'   , 'Ouvrir un ficher · alt = ouvrir le fichier le plus récent'             ],

  ['chkRepair'    , 'Valider', 'Valider'  , 'Vérifier & réparer les problèmes'                                      ],
  ['newPage'      , '+Page'  , 'Module'   , 'Nouvelle page · alt = nouveau module'                                  ],
  ['newProject'   , '+Projet', '+Projet'  , 'Créer un nouveau projet Svija'                                         ],
  ['clearCache'   , 'Cache'  , 'Cache'    , 'Vider le cache (si activé)'                                            ],
  ['launchSupport', 'Support', 'Mail'     , 'Ouvrir le site de support technique · alt = envoyer un mail au support']
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

/*———————————————————————————————————————— alt key listeners

    get information about alt key state
    alt is keyCode 18  */

document.body.addEventListener('mouseover', buttonLabels)
document.body.addEventListener('mouseout' , buttonLabels)
document.body.addEventListener('mousemove', buttonLabels)
document.body.addEventListener('mouseup'  , buttonLabels)
document.body.addEventListener('mousedown', buttonLabels)

/*———————————————————————————————————————— buttonLabels(evn)

    alt text should show only when cursor is over panel
    whether or not alt is pressed before entering airspace

    when mouse moves away from panel it should revert

    the only tricky part is when the mouse moves away from
    the panel but panel has focus — alt key needs
    to stop having effect */

// area = flag that alt/title have been swapped


function buttonLabels(evn){
  var alt   = evn.getModifierState('Alt');

  if (alt) // set to alt state
    for (var x=0; x<buttons.length; x++)
      window[buttons[x][0]].value = window[buttons[x][0]].alt

  else // set to normal state
    for (var x=0; x<buttons.length; x++)
      window[buttons[x][0]].value = window[buttons[x][0]].name

}

/*———————————————————————————————————————— mouse over window COMMENTED OUT

    store info about mouse over window state
    and alt key if it happened before window
    got focus */

/*
window.addEventListener('mouseover', altOver )
window.addEventListener('mouseout',  altOut  )

localStorage.isOver = false

function altOver(event) {
  jsx.registerKeyEventsInterest(keyStr)
  localStorage.isOver = true

  // handle case where alt key was pressed
  // before panel was mouseovered
  if (event.altKey){
    localStorage.altDown = true
    buttonLabels(true)
  }
}

function altOut(event) {
  jsx.registerKeyEventsInterest(null)
  localStorage.isOver = false
  buttonLabels(false)
}
*/

/*———————————————————————————————————————— tooltips

    need to set a delay and if still over, show tooltip

    tooltip for save needs to change depending on whether
    a document is open (changes from save to open)  */

var ttText  = mouseover.innerHTML
var ttDelay = 1500

var targetList = ['indOnline',  'indGrid',    'indGuide', 'indPoint', 'indPixel', 'indSmart', 'indReload', 'dumpLS',
                  'btnSave',    
                  'placeImage', 'changeCase', 'launchSite', 'showFolder', 'createGrp',
                  'chkRepair',  'clearCache', 'newPage', 'newProject', 'launchSupport']

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

/*———————————————————————————————————————— lert(msg)

    alerts in ai-land don't exit program space */

function lert(msg){
  msg = JSON.stringify(String(msg));
  msg = msg.substr(1, msg.length-2)
  //alert(msg)
  jsx.evalScript('alert("' + msg + '")')
}


/*:::::::::::::::::::::::::::::::::::::::: end */

