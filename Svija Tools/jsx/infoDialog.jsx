#target illustrator  

//:::::::::::::::::::::::::::::::::::::::: infoDialog.css .js .jsx

/*———————————————————————————————————————— notes

    1906 Beginning ScriptUI.pdf
    2210 Javascript Tools Guide CC (UI).pdf

    each element is in a group because only
    groups can have margins & spacing

    page 106 default & cancel elements */


/*:::::::::::::::::::::::::::::::::::::::: program */

// it's not clear how panel size affects image size

//alert(27)

function infoDialog(extensionPath){

  //———————————————————— image scaling function

  Image.prototype.onDraw = function() { // written by Marc Autret · 1906 Beginning ScriptUI.pdf
  
    // "this" is the container (it would be "window" in regular JS)
    // "this.image" is the graphic

    if( !this.image ) return '';
    var WH = this.size,
      wh = this.image.size,
      k = Math.min(WH[0]/wh[0], WH[1]/wh[1]), xy;
  
    // resize proportionally
    wh = [k*wh[0],k*wh[1]];
  
    // center
    xy = [ (WH[0]-wh[0])/2, (WH[1]-wh[1])/2 ];
    this.graphics.drawImage(this.image,xy[0],xy[1],wh[0],wh[1]);
    WH = wh = xy = null;

  }
  
  //———————————————————— create panel

  panel = new Window ('dialog', 'Svija Tools Settings', undefined, {resizeable: false, borderless: true, closeButton: false})

  panel.preferredSize = [500, 250]    // +28px where title bar was // height is not used because it's forced by contents
  panel.margins       = [40, 0, 0, 0] // left top right bottom // like padding in CSS — affects contents of shape
  panel.orientation   = 'row'
  panel.alignChildren = ['fill', 'fill']
  panel.spacing       = 0
  
  //———————————————————— splash image

  var imgPath = extensionPath + '/png/vecteezy-374998.png'
  var splash  = panel.add ("image", undefined, File (imgPath));
  splash.size = [87,250]      // half of actual resolution for retina
  
  //———————————————————— right content group
  
  var content = panel.add ('group');

  content.spacing       = 0
  content.orientation   = 'column'
  content.alignment     = 'center'
  content.preferredSize = [310,250]
  content.margins       = [0, 0, 8, 0] // left top right bottom


  //:::::::::::::::::::: right-side content blocks

  //———————————————————— version info
  
   var version = content.add('group')
   version.margins = [0, 8, 0, 0] // left top right bottom
   version.alignment = 'right'
   
   var  versionTxt = version.add ("statictext")
   versionTxt.text = "Svija Tools " + TOOLSVERSION + " · Illustrator " + AIVERSION
   
   //———————————————————— logo
   
  var logo = content.add('group')
  logo.margins = [0, 40, 0, 0] // left top right bottom
  
  var imgPath  = extensionPath + '/png/splash_213x61_' + INTERFACE + '.png'
  var logoImg  = logo.add ("image", undefined, File (imgPath));
  logoImg.size = [213,61]

  //———————————————————— paragraph 1

  // separate lines because only single lines can be centered

  var para = content.add('group')
  para.margins = [0, 20, 0, 0] // left top right bottom
  para.alignment = 'center'
  para.orientation = 'column'
  para.spacing   = 5 // line height

  var  paraLine1 = para.add ("statictext")
  var  paraLine2 = para.add ("statictext")

  paraLine1.text = para1line1
  paraLine2.text = para1line2

  //———————————————————— paragraph 2

  // separate lines because only single lines can be centered

  var usage = content.add('group')
  usage.margins = [0, 10, 0, 0] // left top right bottom
  usage.alignment = 'center'
  usage.orientation = 'column'
  usage.spacing   = 5 // line height

  var  usageLine1 = usage.add ("statictext")
  var  usageLine2 = usage.add ("statictext")

  usageLine1.text = para2line1
  usageLine2.text = para2line2

  //———————————————————— OK button

  //var buttons = content.add('group', [0,0,310, 38])
  var buttons = content.add('group')

  buttons.margins = [0, 10, 0, 0] // left top right bottom
  buttons.alignment = 'right'

  buttons.orientation = 'row'
//buttons.spacing = 50

  applyButton  = buttons.add ("button", undefined, "OK")
//cancelButton = buttons.add ("button", undefined, "Cancel")

  applyButton.alignment  = ['', 'fill']  // permits smaller buttons

  //———————————————————— imported colors

  var infoBg           = this['infoBg'+INTERFACE]
  var infoVersion      = this['infoVersion'+INTERFACE]
  var infoParagraph    = this['infoParagraph'+INTERFACE]
  var infoUsage        = this['infoUsage'+INTERFACE]
  var infoButtons      = this['infoButtons'+INTERFACE]

  //———————————————————— colors
  // it's not possible to style buttons

  var panelBGcolor = panel.graphics.newBrush(panel.graphics.BrushType.SOLID_COLOR, infoBg, 1)
  panel.graphics.backgroundColor = panelBGcolor

  var versionTxtColor =      versionTxt.graphics.newPen   (     versionTxt.graphics.PenType.SOLID_COLOR, infoVersion,       1)
  var paraTxtColor    =       paraLine1.graphics.newPen   (      paraLine1.graphics.PenType.SOLID_COLOR, infoParagraph,     1)
  var usageTxtColor   =      usageLine1.graphics.newPen   (     usageLine1.graphics.PenType.SOLID_COLOR, infoUsage,         1)

  versionTxt.graphics.foregroundColor = versionTxtColor
   paraLine1.graphics.foregroundColor = paraTxtColor
   paraLine2.graphics.foregroundColor = paraTxtColor
  usageLine1.graphics.foregroundColor = usageTxtColor
  usageLine2.graphics.foregroundColor = usageTxtColor

  //———————————————————— button functionality

  panel.defaultElement = applyButton
  //panel.cancelElement = cancelButton


  if(panel.show() == 1) return 'true'   // clicked apply
  else return 'false'                   // clicked cancel

}

//:::::::::::::::::::::::::::::::::::::::: fin

