
/*:::::::::::::::::::::::::::::::::::::::: channel.js */

/*———————————————————————————————————————— parameters */

var objId    = 'linkChannel'

    // ⚙ 🫧 ☁️  ⚙️  🍄 🌕 ✨ 🎛️ 🔋 🔅 ★

var objLabel = '   ⚙'

/*———————————————————————————————————————— configure button */

var obj = document.getElementById(objId)
if (obj === null) lert(objId + ' is null')

obj.text = objLabel
obj.style.display = 'inline'

/*———————————————————————————————————————— mouseup function

    will be utilised for Verify, forms etc. */

obj.addEventListener('mouseup', (evn) => {
  var alt = evn.altKey
  var extensionPath = CEP.getSystemPath(SystemPath.EXTENSION)
  var cmd = 'channelDialog("' + extensionPath + '", ' +  CHANNEL + ')'
  CEP.evalScript(cmd, setChannel)
})

/*———————————————————————————————————————— setChannel(channel)

    receives a string from channel.jsx */

function setChannel(str){

  var bits    = str.split('|')
  var channel = bits[0]
  var local   = (bits[1] === 'true')

  if (typeof channel == 'undefined') return true
  if (       channel == ''         ) return true
  if ( isNaN(channel)              ) return true // notNumber, notANumber not a number
  if (   0 > channel || 2 < channel) return true

  switch(channel){
    case '0':
    case '1':
    case '2':
      var ab = localStorage.accentBright
      var ad = localStorage.accentDim

      localStorage.clear();

      localStorage.CHANNEL      = channel
      localStorage.LOCAL        = local
      localStorage.accentBright = ab
      localStorage.accentDim    = ad
      location.reload(); break

    default :
      lert('Invalid channel: ' + channel);
  }
}

/*:::::::::::::::::::::::::::::::::::::::: fin */

