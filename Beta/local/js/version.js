
/*:::::::::::::::::::::::::::::::::::::::: version.js */

var AIVERSIONMIN = 26   // number    required for xref links
var AIVERSION    = HOSTENV.appVersion

//———————————————————————————————————————— clean up version


var parts  = AIVERSION.split('.')
var points = parts.length - 1

if (points > 1)
  var vers = parts[0] + '.' + parts[1]
else
  var vers = AIVERSION

vers = parseFloat(vers)

//———————————————————————————————————————— is it useable?

if (vers < AIVERSIONMIN){
  versionDiv.style.display = 'block'
  versionBanner.innerHTML = translate('versionAlert')

  versionBanner.addEventListener('mouseup', (evn) => {
    var url = 'https://tech.svija.love/illustrator-version'
    CEP.openURLInDefaultBrowser(url)
    return true
  })

}

/*:::::::::::::::::::::::::::::::::::::::: fin */

