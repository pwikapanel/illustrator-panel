#target illustrator  

/*:::::::::::::::::::::::::::::::::::::::: channel.js */

/*———————————————————————————————————————— notes

    1906 Beginning ScriptUI.pdf
    2210 Javascript Tools Guide CC (UI).pdf */


/*:::::::::::::::::::::::::::::::::::::::: program */

function channelDialog(CHANNEL){

  panel = new Window ('dialog', 'Svija Tools Settings', undefined, {resizeable: false})
  panel.graphics.backgroundColor = panel.graphics.newBrush (panel.graphics.BrushType.SOLID_COLOR, [0.0, 0.35, 0.41])

  panel.preferredSize = [500, 322] // gives 500x350 with title bar
  panel.margins       = [0, 0, 0, 0]
  panel.orientation   = 'row'
  panel.alignChildren = ['fill', 'fill']
  
  //this.dlg = new Window('palette', 'Please choose a distribution') // can keep working
//this.dlg = new Window('dialog', 'Svija Tools Settings') // can't do anything else
//
//var panel = this.dlg
//panel.preferredSize = [500, 350]
//panel.margins = [0, 0, 0, 0]

  //———————————————————— left image 190px wide

  var imgPath = TOOLSPATH + '/jpg/splash 190x322.jpg'

  var splash = panel.add ("image", undefined, File (imgPath));
  splash.size = [190,322]
  
  //———————————————————— right content group 310px wide

//panel.add ('button {text: "Button 1"}');

  var content = panel.add ("group");
  content.orientation   = 'column'
  content.preferredSize = [295,322]
  content.margins = [0, 0, 0, 0]

  //———————————————————— version

 // TEST "ALIGN RIGHT", USE SPACES TO MARGINIFIY

  var version = content.add ('statictext {text: "Centre", characters: 20, justify: "right"}');
// dd ("edittext", [0, 0, 150, 70],
  version.text = "Version 2.4.2  "

  version.graphics.foregroundColor = version.graphics.newPen (version.graphics.PenType.SOLID_COLOR, [0.67, 1, 0], 1);
  version.alignment = 'right'

  //———————————————————— logo

  var imgPath = TOOLSPATH + '/jpg/Svija Tennis 213x61.jpg'

  var splash = content.add ("image", undefined, File (imgPath));
  splash.size = [213,61]

  //———————————————————— paragraph

// w.add ('statictext', [0,0,200,50], 'One\rTwo', {multiline: true});
// w.add ('statictext {text: "Centre", characters: 20, justify: "center"}');


  var para = content.add ('statictext', [30,0,315,50], '', {multiline:true});
  para.alignment = 'right'

//var para = content.add ('statictext {text: "Centre", justify: "center", properties: {multiline: true}}');



//var para = content.add ('statictext', [0,0,295,80], txt, {multiline: true,justify: "center"});
//para.justify='center'


  var txt = " The stable release is appropriate for most\rusers. If you use the beta release, please let\r                    us know how it goes!"
  para.text = txt

// ('statictext {text: "No break: ", characters: 10, justify: "center"}');

//Choose the release you would like to use:

  //———————————————————— introductory paragraph

//var myMessage = panel.add ("statictext")
//myMessage.text = "Please choose\rwhich release\ryou would like\rto use:"

  //———————————————————— radio buttons

//var radio_group = panel.add ("panel")

//var myMessage = radio_group.add ("statictext")
//myMessage.text = 'Channel currently active: '+CHANNEL

//radio_group.alignChildren = "left"
//radio_group.add ("radiobutton", undefined, "Stable Release")
//radio_group.add ("radiobutton", undefined, "Beta Release")
//radio_group.add ("radiobutton", undefined, "Alpha Release")

//// set dialog defaults
//radio_group.children[1].value = true

//// cancel & apply buttons

//var buttons = radio_group.add ("group")
//buttons.add ("button", undefined, "Cancel")
//buttons.add ("button", undefined, "Apply")

//function selected_rbutton (rbuttons) {
//  for (var i = 0; i < rbuttons.children.length; i++) {
//    if (rbuttons.children[i].value == true) {
//      return rbuttons.children[i].text
//    }
//  }
//}

  //———————————————————— description

//var msg = "This is a multiline explanation of the differences betwenen the different channels "
//msg += "as you can imageine, it goes on for quite a long time! klmjqsdf mlkqjsdfm qsdfmlkjmqsdf mlqsdkfjq qsdfmlkjqsdf mlqsdfqf mlqksdf"
//panel.add ('statictext', [0,0,600,50], msg, {multiline: true})

  //———————————————————— artboard type row
  
//var row = panel.add('group', undefined, '')

//ropanel.orientation = 'row'
//ropanel.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]

//var typeSt = ropanel.add('statictext', undefined, 'Export artboards:') 
//typeSt.size = [ 100,20 ]  
//
//var artboardNames = []
//for(var i=0; i<4; ++i){
//  artboardNames.push(i)
//}
//for(var i=0; i<3; i++){
//  artboardNames.push(i+1)
//}

//this.artboardList = ropanel.add('dropdownlist', undefined, artboardNames)
//this.artboardList.selection = 3

  //———————————————————— prefix grp

//var row = panel.add('group', undefined, '')

//ropanel.orientation = 'row'
//ropanel.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]

//var prefixSt = ropanel.add('statictext', undefined, 'File prefix:') 
//prefixSt.size = [100,20]

//this.prefixEt = ropanel.add('edittext', undefined, this.prefix) 
//this.prefixEt.size = [ 300,20 ]

  //———————————————————— suffix row

//var row = panel.add('group', undefined, '')

//ropanel.orientation = 'row'
//ropanel.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]

//var row = panel.add('group', undefined, '')
//ropanel.orientation = 'row'
//ropanel.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]

//var suffixSt = ropanel.add('statictext', undefined, 'File suffix:') 
//suffixSt.size = [100,20]

//this.suffixEt = ropanel.add('edittext', undefined, this.suffix) 
//this.suffixEt.size = [ 300,20 ]

  //———————————————————— scaling row

//var row = panel.add('group', undefined, '')

//ropanel.orientation = 'row'
//ropanel.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]

//var scalingLabel = ropanel.add('statictext', undefined, 'Scaling:') 
//scalingLabel.size = [100,20]

//this.scalingInput = ropanel.add('edittext', undefined, this.scaling) 
//this.scalingInput.size = [ 100,20 ]

//var scalingTip = ropanel.add('statictext', undefined, '(Normally 100%; Use 200% for Retina display exports)') 
//scalingTip.size = [300,20]

  //———————————————————— progress bar

//var progBar = panel.add( 'progressbar', undefined, 30, 100 )

//progBar.size = [400,10]

//this.progLabel = panel.add('statictext', undefined, 'line 104' ) 
//this.progLabel.size = [ 400,20 ]

//
//panel.progBar = progBar
  
  //———————————————————— buttons row

//var row = panel.add('group', undefined, '') 

//ropanel.orientation = 'row'

//var cancelBtn = ropanel.add('button', undefined, 'Cancel', {name:'cancel'})
//cancelBtn.onClick = function() { multi_exporter.dlg.close() }

//var saveBtn = ropanel.add('button', undefined, 'Save and Close', {name:'saveClose'})
//saveBtn.onClick = function() {
//  multi_exporter.saveOptions()
//  multi_exporter.dlg.close()
//}

//// OK button
//var okBtn = ropanel.add('button', undefined, 'Apply', {name:'ok'})

//okBtn.onClick = function() { 
//  
//  return('line 164 saved')

//}
//
//this.ignoreCheckBox = ropanel.add('checkbox', undefined, 'Ignore Warnings')
//this.ignoreCheckBox.value = this.ignoreWarnings
//

//if (panel.show () == 1) {
//  return ("You picked " + selected_rbutton (radio_group))
//}

////panel.show()
//return '0'

//}

  panel.show();
  return 0

  //———————————————————— image scaling function

  Image.prototype.onDraw = function() { // written by Marc Autret · 1906 Beginning ScriptUI.pdf
  
    // "this" is the container; "this.image" is the graphic
    if( !this.image ) return;
    var WH = this.size,
      wh = this.image.size,
      k = Math.min(WH[0]/wh[0], WH[1]/wh[1]),
      xy;
  
    // Resize proportionally:
    wh = [k*wh[0],k*wh[1]];
  
    // Center:
    xy = [ (WH[0]-wh[0])/2, (WH[1]-wh[1])/2 ];
    this.graphics.drawImage(this.image,xy[0],xy[1],wh[0],wh[1]);
    WH = wh = xy = null;

  }
  

}
//:::::::::::::::::::::::::::::::::::::::: fin

