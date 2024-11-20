#target illustrator  

/*:::::::::::::::::::::::::::::::::::::::: channel.js */

/*———————————————————————————————————————— notes

    1906 Beginning ScriptUI.pdf
    2210 Javascript Tools Guide CC (UI).pdf */


/*:::::::::::::::::::::::::::::::::::::::: program */

function channelDialog(CHANNEL){

  //———————————————————— create panel

  panel = new Window ('dialog', 'Svija Tools Settings', undefined, {resizeable: false})
  panel.graphics.backgroundColor = panel.graphics.newBrush (panel.graphics.BrushType.SOLID_COLOR, [0.0, 0.35, 0.41])

  panel.preferredSize = [500, 322] // gives 500x350 with title bar
  panel.margins       = [0, 0, 0, 0]
  panel.orientation   = 'row'
  panel.alignChildren = ['fill', 'fill']
  panel.spacing=0
  
  //———————————————————— splash image

  var imgPath = TOOLSPATH + '/jpg/splash 190x322.jpg'

  var splash = panel.add ("image", undefined, File (imgPath));

  splash.size = [190,322]
  splash.margins = [0, 0, 0, 0]
  splash.spacing=0
  
  //———————————————————— right content group

  var content = panel.add ('group');
  content.spacing=0
  content.orientation   = 'column'
  content.preferredSize = [310,322]
  content.margins = [0, 0, 0, 0]

//content.graphics.backgroundColor = content.graphics.newBrush(content.graphics.BrushType.SOLID_COLOR,[0.7,0.7,0.7], 1);

  //———————————————————— version

  var version = content.add('group')
  version.margins = [0, 8, 8, 0]
  version.alignment = 'right'
//version.graphics.backgroundColor = content.graphics.newBrush(content.graphics.BrushType.SOLID_COLOR,[0.7,0.7,0.7], 1)

  var  versionText = version.add ("statictext")
  versionText.graphics.foregroundColor = versionText.graphics.newPen (versionText.graphics.PenType.SOLID_COLOR, [0.67, 1, 0], 1);
  versionText.text = "Version 2.4.2"



  //———————————————————— logo

  var logo = content.add('group')
  logo.margins = [0, 19, 0, 0]
  logo.alignment = 'center'
//logo.graphics.backgroundColor = content.graphics.newBrush(content.graphics.BrushType.SOLID_COLOR,[0.7,0.7,0.7], 1)

  var imgPath = TOOLSPATH + '/png/Svija Tennis 213x61.png'

  var logoImg = logo.add ("image", undefined, File (imgPath));

  logoImg.size = [213,61]

  //———————————————————— paragraph NOT USED

  // the staticText can only be left-aligned
  // I have to give dimensions for the box
  // I want to leave a little extra in box so it won't be
  // cut off if the font changes

  // so, it's all left-aligned, and I use the margins to push it
  // to the right enough to look good

//var para = content.add('group')
//para.margins = [28, 18, 0, 0]
//para.alignment = 'left'
//para.graphics.backgroundColor = para.graphics.newBrush(para.graphics.BrushType.SOLID_COLOR,[0.7,1.0,0.7], 1)

//var paraText = para.add ('statictext', [0,0,270,50], '', {multiline:true});
//paraText.graphics.foregroundColor = paraText.graphics.newPen (paraText.graphics.PenType.SOLID_COLOR, [0.55, 0.71, 0.74], 1)

//var txt  = " The stable release is appropriate for most\r"
//    txt += "users. If you use the beta release, please let\r"
//    txt += "                   us know how it goes!"

//paraText.text = txt

  //———————————————————— paragraph

  var para = content.add('group')
  para.margins = [0, 20, 0, 0]
  para.alignment = 'center'
  para.orientation = 'column'
  para.spacing   = 2
//para.graphics.backgroundColor = content.graphics.newBrush(content.graphics.BrushType.SOLID_COLOR,[1.0,0.7,0.7], 1)

  var  paraText1 = para.add ("statictext")
  var  paraText2 = para.add ("statictext")
  var  paraText3 = para.add ("statictext")

  paraText1.graphics.foregroundColor = paraText1.graphics.newPen (paraText1.graphics.PenType.SOLID_COLOR, [0.55, 0.71, 0.74], 1);
  paraText2.graphics.foregroundColor = paraText2.graphics.newPen (paraText2.graphics.PenType.SOLID_COLOR, [0.55, 0.71, 0.74], 1);
  paraText3.graphics.foregroundColor = paraText3.graphics.newPen (paraText3.graphics.PenType.SOLID_COLOR, [0.55, 0.71, 0.74], 1);

  paraText1.text = "The stable release is appropriate for most"
  paraText2.text = "users. If you use the beta release, please let"
  paraText3.text = "us know how it goes!"

  //———————————————————— instructions

  var instructions = content.add('group')
  instructions.margins = [0, 15, 0, 0]
  instructions.alignment = 'center'
//instructions.graphics.backgroundColor = content.graphics.newBrush(content.graphics.BrushType.SOLID_COLOR,[1.0,0.7,0.7], 1)

  var  instructionsText = instructions.add ("statictext")
  instructionsText.graphics.foregroundColor = instructionsText.graphics.newPen (instructionsText.graphics.PenType.SOLID_COLOR, [1, 1, 1], 1);

  instructionsText.text = "Choose the release you would like to use"

  //———————————————————— radio buttons

  var radio = content.add('group')
  radio.margins = [8, 16, 0, 0]
  radio.alignment = 'center'
//radio.graphics.backgroundColor = content.graphics.newBrush(content.graphics.BrushType.SOLID_COLOR,[0.7,1.0,0.7], 1)

  radio.alignChildren = 'left'
  radio.orientation = 'column'
    radio.spacing = 4

  radio.add ("radiobutton", undefined, "Stable Release")
  radio.add ("radiobutton", undefined, "Beta Release")

  if (CHANNEL == 2)
    radio.children[0].value = true
  else
    radio.children[1].value = true

  //———————————————————— cancel & apply buttons

  var buttons = content.add('group')
  buttons.margins = [0, 20, 15, 0]
  buttons.alignment = 'right'
//buttons.graphics.backgroundColor = content.graphics.newBrush(content.graphics.BrushType.SOLID_COLOR,[0.7,1.0,0.7], 1)

  buttons.orientation = 'row'
  buttons.spacing = 15

  cancelButton = buttons.add ("button", undefined, "Cancel")
  applyButton  = buttons.add ("button", undefined, "Apply")


  panel.show();
  return 0

  //———————————————————— image scaling function

  Image.prototype.onDraw = function() { // written by Marc Autret · 1906 Beginning ScriptUI.pdf
  
    // "this" is the container
    // "this.image" is the graphic

    if( !this.image ) return;
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
  

}
//:::::::::::::::::::::::::::::::::::::::: fin

