
/*:::::::::::::::::::::::::::::::::::::::: bottomBar.js */

/*———————————————————————————————————————— params */

var helpURL = 'tech.svija.love/fromtools'

/*:::::::::::::::::::::::::::::::::::::::: startup */ 

/*———————————————————————————————————————— more/less status on load

    need to restore user's status when they last used Tools */


if (typeof localStorage.moreLess == 'undefined')
  localStorage.moreLess = 'less'

if (localStorage.moreLess == 'less'){
  moreSwitch.style.display = 'none'

    moreLink.style.display = 'inline'
    lessLink.style.display = 'none'
}
else{
  moreSwitch.style.display = 'block'

    moreLink.style.display = 'none'
    lessLink.style.display = 'inline'
}


/*:::::::::::::::::::::::::::::::::::::::: help */

/*———————————————————————————————————————— parameters */

var objId    = 'helpLink'
var objLabel = 'help'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— mouseup function

    will be utilised for Verify, forms etc. */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  if (!alt){
    var url = 'https://' + helpURL
    CEP.openURLInDefaultBrowser(url)
    return true
  }
//  clearCache()
})


/*:::::::::::::::::::::::::::::::::::::::: channel */

/*———————————————————————————————————————— parameters */

var objId    = 'channelLink'

    // 🫧 ☁️  ⚙️  🍄 🌕 ✨ 🎛️ 🔋  

var objLabel = '   ⚙'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— mouseup function

    will be utilised for Verify, forms etc. */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  var file = TOOLSPATH + '/cep/channel.jsx'
  CEP.evalScript("$.evalFile('" + file + "')")
  CEP.evalScript("channelDialog(" + CHANNEL + ")", setChannel)
})

/*———————————————————————————————————————— setChannel(channel)

    receives a string from channel.jsx */

function setChannel(channel){
  if (typeof channel == 'undefined') return true
  if (       channel == ''         ) return true
  if ( isNaN(channel)              ) return true // notNumber, notANumber not a number
  if (   0 > channel || 2 < channel) return true

  lert('Switching to '+CHANNELNAMES[channel] + ' channel.')
  return true

  switch(channel){
    case '0':
    case '1':
    case '2':
      lert('Changing channel to '+channel)
      localStorage.clear();
      localStorage.CHANNEL = channel;
      location.reload();
      break
    default :
      lert('Invalid channel: ' + channel);
  }
}


/*:::::::::::::::::::::::::::::::::::::::: more */

/*———————————————————————————————————————— parameters */

var objId    = 'moreLink'
var objLabel = '＋ more'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel
//obj.style.display = 'inline' // handled in previous section

/*———————————————————————————————————————— mouseup function

 */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  if (!alt){
    localStorage.moreLess    = 'more'
    moreSwitch.style.display = 'block'
    moreLink.style.display   = 'none'
    lessLink.style.display   = 'inline'
    return true
  }
})


/*:::::::::::::::::::::::::::::::::::::::: less */

/*———————————————————————————————————————— parameters */

var objId    = 'lessLink'
var objLabel = '— less'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel
//obj.style.display = 'inline' // handled in previous section

/*———————————————————————————————————————— mouseup function

    will be utilised for Verify, forms etc. */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.getModifierState('Alt');

  if (!alt){
    localStorage.moreLess  = 'less'
    moreSwitch.style.display   = 'none'
    moreLink.style.display = 'inline'
    lessLink.style.display = 'none'
    return true
  }
})


/*:::::::::::::::::::::::::::::::::::::::: fin */

