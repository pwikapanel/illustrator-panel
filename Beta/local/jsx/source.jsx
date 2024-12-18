#target illustrator  

/*:::::::::::::::::::::::::::::::::::::::: source.js */

/*———————————————————————————————————————— notes

    1906 Beginning ScriptUI.pdf
    2210 Javascript Tools Guide CC (UI).pdf

    each element is in a group because only
    groups can have margins & spacing */

//  page 106 default & cancel elements


/*:::::::::::::::::::::::::::::::::::::::: program */

function sourceDialog(extensionPath, source){

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
  panel.graphics.backgroundColor = panel.graphics.newBrush (panel.graphics.BrushType.SOLID_COLOR, [0.2, 0.2, 0.2])

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
  
  //ntent.graphics.backgroundColor = content.graphics.newBrush(content.graphics.BrushType.SOLID_COLOR,[0.7,0.7,0.7], 1);
  
  //———————————————————— version
  
  var version = content.add('group')
  version.margins = [0, 8, 8, 0]
  version.alignment = 'right'
  //rsion.graphics.backgroundColor = content.graphics.newBrush(content.graphics.BrushType.SOLID_COLOR,[0.7,0.7,0.7], 1)
  
  var  versionTxt = version.add ("statictext")
  versionTxt.graphics.foregroundColor = versionTxt.graphics.newPen (versionTxt.graphics.PenType.SOLID_COLOR, [0.67, 1, 0], 1);
  versionTxt.text = "Svija Tools " + TOOLSVERSION + " · Illustrator " + AIVERSION
  
  //———————————————————— logo
  
  var logo = content.add('group')
  logo.margins = [32, 25, 16, 0]
  logo.alignment = 'left'
  //go.graphics.backgroundColor = content.graphics.newBrush(content.graphics.BrushType.SOLID_COLOR,[0.7,0.7,0.7], 1)
  
  var imgPath = extensionPath + '/png/splash_213x61.png'
  
  var logoImg = logo.add ("image", undefined, File (imgPath));
  
  logoImg.size = [213,61]

  //———————————————————— paragraph

  // separate lines because only single lines can be centered

  var para = content.add('group')
  para.margins = [0, 28, 30, 0]
  para.alignment = 'center'
  para.orientation = 'column'
  para.spacing   = 2
  //ra.graphics.backgroundColor = para.graphics.newBrush(para.graphics.BrushType.SOLID_COLOR,[0.3, 0.3, 0.3], 1)

  var  paraLine1 = para.add ("statictext")
  var  paraLine2 = para.add ("statictext")

  paraLine1.graphics.foregroundColor = paraLine1.graphics.newPen (paraLine1.graphics.PenType.SOLID_COLOR, [0.75, 0.75, 0.75], 1);
  paraLine2.graphics.foregroundColor = paraLine2.graphics.newPen (paraLine2.graphics.PenType.SOLID_COLOR, [0.75, 0.75, 0.75], 1);

  paraLine1.text = "The stable release is best for most users. If you"
  paraLine2.text = "use the beta release, let us know how it goes!"
  try{
  paraLine2.text = ut_translate('folder') + INTERFACE
  }catch(e){alert(e)}

  //———————————————————— instructions

  var instructions = content.add('group')
  instructions.margins = [0, 18, 33, 0]
  instructions.alignment = 'center'
  //structions.graphics.backgroundColor = instructions.graphics.newBrush(instructions.graphics.BrushType.SOLID_COLOR,[0.3, 0.3, 0.3], 1)

  var  instructionsTxt = instructions.add ("statictext")
  instructionsTxt.graphics.foregroundColor = instructionsTxt.graphics.newPen (instructionsTxt.graphics.PenType.SOLID_COLOR, [1, 1, 1], 1);

  instructionsTxt.text = "Choose the release you would like to use:"

  //———————————————————— radio buttons

  var radio = content.add('group')
  radio.margins = [92, 8, 0, 0]
  radio.alignment = 'left'
  //dio.graphics.backgroundColor = radio.graphics.newBrush(radio.graphics.BrushType.SOLID_COLOR,[0.3, 0.3, 0.3], 1)

  radio.alignChildren = 'left'
  radio.orientation = 'column'
    radio.spacing = 2

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
  //ttons.graphics.backgroundColor = buttons.graphics.newBrush(buttons.graphics.BrushType.SOLID_COLOR,[0.3, 0.3, 0.3], 1)

  buttons.orientation = 'row'
  buttons.spacing = 50 

  cancelButton = buttons.add ("button", undefined, "Cancel")
  applyButton  = buttons.add ("button", undefined, "Apply")

//cancelButton.name = 'cancel'
//applyButton.name = 'ok'

  applyButton.alignment  = ['', 'fill']  // permits smaller buttons
  cancelButton.alignment = ['', 'fill'] 

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

  var local = true

  radioButton0.active = true
  radioButton0.onClick = function(e){
    var alt = ScriptUI.environment.keyboardState.altKey

    var shift = ScriptUI.environment.keyboardState.shiftKey
    if (shift) local = false

    source = 3
  }

  radioButton1.onClick = function(e){
    var alt = ScriptUI.environment.keyboardState.altKey

    var shift = ScriptUI.environment.keyboardState.shiftKey
    if (shift) local = false

    if (alt) source = 1
    else source = 2
  }

  panel.defaultElement = applyButton
  panel.cancelElement = cancelButton


  if(panel.show() == 1) return source + '|' + local // clicked apply
  else return ''                                     // clicked cancel

}

//:::::::::::::::::::::::::::::::::::::::: fin

