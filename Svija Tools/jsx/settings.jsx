#target illustrator  

/*:::::::::::::::::::::::::::::::::::::::: settings.js */

/*———————————————————————————————————————— notes

    1906 Beginning ScriptUI.pdf
    2210 Javascript Tools Guide CC (UI).pdf

    each element is in a group because only
    groups can have margins & spacing */

//  page 106 default & cancel elements


/*:::::::::::::::::::::::::::::::::::::::: program */

function settingsDialog(extensionPath, source){

  //———————————————————— image scaling function

  Image.prototype.onDraw = function() { // written by Marc Autret · 1906 Beginning ScriptUI.pdf
  
    // "this" is the container
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

  panel.preferredSize = [500, 292] // +28px where title bar was
  panel.margins       = [0, 0, 0, 0]
  panel.orientation   = 'row'
  panel.alignChildren = ['fill', 'fill']
  panel.spacing=0
  
  //———————————————————— splash image

  var imgPath = extensionPath + '/png/splash_190x292.png'

  var splash = panel.add ("image", undefined, File (imgPath));

  splash.size    = [190,292]
  splash.margins = [0, 0, 0, 0]
  splash.spacing = 0
  
  //———————————————————— right content group
  
  var content = panel.add ('group');
  content.spacing=0
  content.orientation   = 'column'
  content.preferredSize = [310,292]
  content.margins = [0, 0, 0, 0]
  

  //:::::::::::::::::::: right-side content blocks

  //———————————————————— version
  
  var version = content.add('group')
  version.margins = [0, 8, 8, 0]
  version.alignment = 'right'
  
  var  versionTxt = version.add ("statictext")

  var srcLabel = ut_translate('sourceName' + source)
  versionTxt.text = "Version " + TOOLSVERSION + " " + srcLabel + " · Illustrator " + AIVERSION
  
  //———————————————————— logo
  
  var logo = content.add('group')
  logo.margins = [32, 25, 16, 0]
  logo.alignment = 'left'
  
  var imgPath  = extensionPath + '/png/splash_213x61_' + INTERFACE + '.png'
  var logoImg  = logo.add ("image", undefined, File (imgPath));
  logoImg.size = [213,61]

  //———————————————————— paragraph

  // separate lines because only single lines can be centered

  var para = content.add('group')
  para.margins = [0, 28, 30, 0]
  para.alignment = 'center'
  para.orientation = 'column'
  para.spacing   = 2

  var  paraLine1 = para.add ("statictext")
  var  paraLine2 = para.add ("statictext")

  paraLine1.text = "The stable release is best for most users. If you"
  paraLine2.text = "use the beta release, let us know how it goes!"

  //———————————————————— instructions

  var instructions = content.add('group')
  instructions.margins = [0, 18, 33, 0]
  instructions.alignment = 'center'

  var  instructionsTxt = instructions.add ("statictext")

  instructionsTxt.text = "Choose the release you would like to use:"

  //———————————————————— radio buttons

  var radio = content.add('group')
  radio.margins = [92, 8, 0, 0]
  radio.alignment = 'left'

  radio.alignChildren = 'left'
  radio.orientation   = 'column'
  radio.spacing       = 2

  radioButton0 = radio.add ("radiobutton", undefined, "Stable Release")
  radioButton1 = radio.add ("radiobutton", undefined, "Beta Release")

  if (source == 3)
    radioButton0.value = true
  else
    radioButton1.value = true

  //———————————————————— cancel & apply buttons

  var buttons = content.add('group', [0,0,310, 38])

  buttons.margins = [0, 18, 32, 0]
  buttons.alignment = 'left'

  buttons.orientation = 'row'
  buttons.spacing = 50

  cancelButton = buttons.add ("button", undefined, "Cancel")
  applyButton  = buttons.add ("button", undefined, "Apply")

  applyButton.alignment  = ['', 'fill']  // permits smaller buttons
  cancelButton.alignment = ['', 'fill']

  //———————————————————— colors

/* sent from source.js 

        transmitToCEP('AIVERSION'    , AIVERSION )
        transmitToCEP('LANG'         , LANG      )
        transmitToCEP('DICTIONARY'   , DICTIONARY)
        transmitToCEP('INTERFACE'    , INTERFACE )
        transmitToCEP('ACCENTDIM'    , localStorage.ACCENTDIM )
  ut_transmitCSStoCEP('aboutBG')
  ut_transmitCSStoCEP('aboutVersion')
  ut_transmitCSStoCEP('aboutParagraph')
  ut_transmitCSStoCEP('aboutInstructions')
  ut_transmitCSStoCEP('aboutButtons') */

  var panelBGcolor    =           panel.graphics.newBrush (        panel.graphics.BrushType.SOLID_COLOR, aboutBG             )
  var versionTxtColor =      versionTxt.graphics.newPen   (     versionTxt.graphics.PenType.SOLID_COLOR, aboutVersion     , 1)
  var para1TxtColor   =       paraLine1.graphics.newPen   (      paraLine1.graphics.PenType.SOLID_COLOR, aboutParagraph   , 1)
  var para2TxtColor   =       paraLine1.graphics.newPen   (      paraLine2.graphics.PenType.SOLID_COLOR, aboutParagraph   , 1)
  var instrTxtColor   = instructionsTxt.graphics.newPen   (instructionsTxt.graphics.PenType.SOLID_COLOR, aboutInstructions, 1)

          panel.graphics.backgroundColor = panelBGcolor
     versionTxt.graphics.foregroundColor = versionTxtColor
      paraLine1.graphics.foregroundColor = para1TxtColor
      paraLine2.graphics.foregroundColor = para2TxtColor
instructionsTxt.graphics.foregroundColor = instrTxtColor
/* foregroundColor
Object
The foregroundcolorfora container,orthe parent foreground color ofa control element. A ScriptUIPen object.


backgroundColor
Object
The background colorof acontainer,orthe parentbackground colorfor acontrolelement. A ScriptUIBrush object.
*/

  try{
  
  var radioBGcolor = radio.graphics.newBrush(radio.graphics.BrushType.SOLID_COLOR, aboutInstructions, 0)
  var radioColor   = radio.graphics.newPen  (  radio.graphics.PenType.SOLID_COLOR, aboutInstructions, 1)

  //radio.graphics.backgroundColor = radioBGcolor
  //radio.graphics.foregroundColor = radioColor
  
  } catch(msg){alert(msg)}

  /*———————————————————— 2210 Javascript Tools Guide CC (UI).pdf

     if the user changes the state of a Checkbox or Radio Button,
     the new state is found in the control’s value property

     if you need to respond to a user action while the dialog is still
     active, you must assign the control a callback function for the
     interaction event, either onClick or onChange. The callback function
     is the value of the onClick or onChange property of the control.

     Sometimes, a modal dialog presents choices to the user that must be
     correct before your script allows the dialog to be dismissed. If your
     script needs to validate the state of a dialog after the user clicks
     OK, you can define an onClose event handler for the dialog. This
     callback function is invoked whenever a window is closed. If the
     function returns true,the window is closed, but if it returns false,
     the close operation is cancelled and the window remains open.

     You can define onClick callbacks for the buttons that close the
     parent dialog by calling its close method. You have the option of
     sending a value to the close method, which is in turn passed on to
     and returned from the show method that invoked the dialog. This
     return value allows your script to distinguish different closing
     events; for example, clicking OK can return 1, clicking Cancel can
     return 2.

     ——————————————————————————————————————————————————————————————————

     defaults

     To determine which control is notified by which keyboard shortcut,
     set the Dialog object’s defaultElement and cancelElement properties.
     The value is the control object that should be notified when the user
     types the associated keyboard shortcut.

     For buttons assigned as the defaultElement,if there is no onClick
     handler associated with the button, clicking the button or typing
     ENTER calls the parent dialog’s close method, passing a value of 1
     to be returned by the "show" call that opened the dialog.

     For buttons assigned as the cancelElement,if there is no onClick
     handler associated with the button, clicking the button or typing
     ESC calls the parent dialog’s close method, passing a value of 2
     to be returned by the show call that opened the dialog.

     If you do not set the defaultElement and cancelElement properties
     explicitly,ScriptUI tries to choose reasonable defaults when the
     dialog is about to be shown for the first time. For the default
     element, it looks for a button whose name or text value is "ok"
     (disregarding case). For the cancel element, it looks for a button
     whose name or text value is "cancel" (disregarding case).  */

  //———————————————————— button functionality

  radioButton0.active = true
  radioButton0.onClick = function(e){
    var alt   = ScriptUI.environment.keyboardState.altKey
    var shift = ScriptUI.environment.keyboardState.shiftKey

    source = 3
  }

  radioButton1.onClick = function(e){
    var alt   = ScriptUI.environment.keyboardState.altKey
    var shift = ScriptUI.environment.keyboardState.shiftKey

    if (alt) source = 1
    else source = 2
  }

  panel.defaultElement = applyButton
  panel.cancelElement = cancelButton


  if(panel.show() == 1) return source   // clicked apply
  else return ''                        // clicked cancel
}

//:::::::::::::::::::::::::::::::::::::::: fin

