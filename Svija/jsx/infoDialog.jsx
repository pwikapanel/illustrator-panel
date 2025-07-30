#target illustrator  

/* vim: set foldmethod=marker fmr=/*\—,///: */

//:::::::::::::::::::::::::::::::::::::::: infoDialog.css .js .jsx

// switch version & website name

/*———————————————————————————————————————— notes

    2019 Beginning ScriptUI.pdf
    2022 Javascript Tools Guide CC (UI).pdf

    each element is in a group because only
    groups can have margins & spacing

    page 106 default & cancel elements */
///

/*:::::::::::::::::::::::::::::::::::::::: load colors */

/*—— must be outside of function to be accessible with this['varname'] */

var colorWindow0
var colorUrl0
var colorText0

var colorWindow1
var colorUrl1
var colorText1

var colorWindow2
var colorUrl2
var colorText2

var colorWindow3
var colorUrl3
var colorText3
///

/*:::::::::::::::::::::::::::::::::::::::: program */

function infoDialog(extensionPath){

  /*———————————————————— image scaling function */

  Image.prototype.onDraw = function() {

    //2019 Beginning ScriptUI.pdf, p. 63
    // "this" is the container ("window" in regular JS)
    // "this.image" is the graphic

    if( !this.image ) return ''

    var scale = 0.5
  
    // resize proportionally
    var imageSize = this.image.size
    imageSize = [scale*imageSize[0],scale*imageSize[1]]
  
//  // center
//  var dialogSize = this.size
//  var xy = [ (dialogSize[0]-imageSize[0])/2, (dialogSize[1]-imageSize[1])/2 ]

    xy = [0, 0]

    this.graphics.drawImage(this.image,xy[0],xy[1],imageSize[0],imageSize[1])

    // save memory
    dialogSize = imageSize = xy = null

  }
/// 
  /*———————————————————— color defs */

  colorWindow0  = panelBg0
  colorUrl0     = checkedBox0
  colorText0    = fieldContents0
  
  colorWindow1  = panelBorder1
  colorUrl1     = checkedBox1
  colorText1    = labelText1
  
  colorWindow2  = inputField2
  colorUrl2     = hamburger2
  colorText2    = checkedBox2
  
  colorWindow3  = inputField3
  colorUrl3     = hamburger3
  colorText3    = checkedBox3

  var colorWindow = this['colorWindow' + INTERFACE]
  var colorUrl    = this[   'colorUrl' + INTERFACE]
  var colorText   = this[  'colorText' + INTERFACE]
  ///

  //:::::::::::::::::::: create panel

  /*———————————————————— create panel */

  var dialogHeight = 250

  if (ISMAC) dialogHeight -= 28 // because no title bar

  panel = new Window ('dialog', 'Svija Settings', undefined, {resizeable: false, borderless: true, closeButton: false})

  panel.preferredSize = [500, dialogHeight]
  panel.margins       = [53, 0, 0, 0]   // left top right bottom // enforced 28px bottom margin when no title bar
  panel.orientation   = 'row'
  panel.alignChildren = ['left', 'top']
  panel.spacing       = 0

  var panelBGcolor = panel.graphics.newBrush(panel.graphics.BrushType.SOLID_COLOR, colorWindow, 1)
  panel.graphics.backgroundColor = panelBGcolor
  /// 

  //:::::::::::::::::::: two content blocks

  /*———————————————————— left: splash image */

  var imgPath = extensionPath + '/png/vecteezy-374998.png'
  var splash  = panel.add ("image", undefined, File (imgPath))
  splash.size = [90,222]      // does not affect image size; affects panel size
                              // if I use a smaller size, things can be drawn on top of image
  ///
  /*———————————————————— right: content group */
  
  var content = panel.add ('group')

  content.spacing       = 0
  content.orientation   = 'column'
  content.alignment     = 'top'
  content.preferredSize = [357,222]
  content.margins       = [0, 0, 0, 0] // left top right bottom

//var testBg = content.graphics.newBrush(content.graphics.BrushType.SOLID_COLOR, [0.5, 0, 0.5], 1)
//content.graphics.backgroundColor = testBg 

  ///

  //:::::::::::::::::::: right-side sub blocks

  /*———————————————————— site url */
  
  var siteUrl = content.add('group')
  siteUrl.margins = [0, 9, 13, 0] // left top right bottom
  siteUrl.alignment = 'right'
  
  var  siteUrlTxt = siteUrl.add ("statictext")
  siteUrlTxt.text = SITEURL

  var siteUrlTxtColor = siteUrlTxt.graphics.newPen(siteUrlTxt.graphics.PenType.SOLID_COLOR, colorUrl, 1)
  siteUrlTxt.graphics.foregroundColor = siteUrlTxtColor

//var testBg2 = siteUrl.graphics.newBrush(siteUrl.graphics.BrushType.SOLID_COLOR, [0.5, 0.5, 0], 1)
//siteUrl.graphics.backgroundColor = testBg2 

   ///
   /*———————————————————— logo */
   
  var logo = content.add('group')
  logo.margins = [52, 35, 0, 0] // left top right bottom
  logo.alignment = 'left'
  
  var imgPath  = extensionPath + '/png/infoDialogSvija_' + INTERFACE + '.png'
  var logoImg  = logo.add ("image", undefined, File (imgPath))
  logoImg.size = [230,69]

//var testBg3 = logo.graphics.newBrush(logo.graphics.BrushType.SOLID_COLOR, [0, 0.5, 0.5], 1)
//logo.graphics.backgroundColor = testBg3 

  ///
  /*———————————————————— paragraph */

  // separate lines because only single lines can be centered

  var para = content.add('group')
  para.margins = [0, 19, 22, 0] // left top right bottom
  para.alignment = 'center'
  para.orientation = 'column'
  para.spacing   = 3 // line height

  var  paraLine1  = para.add ("statictext")
  var  paraLine2  = para.add ("statictext")

  paraLine1.text  = "Svija " + PANELVERSION + " · Illustrator " + AIVERSION
  paraLine2.text  = "error"

  paraLine2.text  = TRANSLATE[LC].startupTime +' '+ STARTUPTIME + ' MS · '
  paraLine2.text += TRANSLATE[LC].memoryUsed  +' '+ USEDHEAP    + ' ' + TRANSLATE[LC].mb

  var paraTxtColor = paraLine1.graphics.newPen(paraLine1.graphics.PenType.SOLID_COLOR, colorText, 1)
  paraLine1.graphics.foregroundColor = paraTxtColor
  paraLine2.graphics.foregroundColor = paraTxtColor

//var testBg4 = para.graphics.newBrush(para.graphics.BrushType.SOLID_COLOR, [0, 0.5, 0], 1)
//para.graphics.backgroundColor = testBg4 

  ///
  /*———————————————————— OK button */

  //var buttons = content.add('group', [0,0,310, 38])
  var buttons = content.add('group')
  //buttons.preferredSize = [357, 10]      // window will be 250px

  buttons.margins = [131, 17, 0, 0] // left top right bottom
  buttons.alignment   = 'left'
  buttons.orientation = 'row'

  applyButton  = buttons.add ("button", undefined, "OK")
  applyButton.preferredSize = [70, 20]

//var testBg5 = buttons.graphics.newBrush(buttons.graphics.BrushType.SOLID_COLOR, [0.5, 0.5, 0], 1)
//buttons.graphics.backgroundColor = testBg5
///

  panel.defaultElement = applyButton

  if(panel.show() == 1) return 'true'   // clicked apply
  else return 'false'                   // clicked cancel

}

//:::::::::::::::::::::::::::::::::::::::: fin

