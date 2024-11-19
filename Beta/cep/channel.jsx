
#target illustrator  

show_dialog: {
  
  //this.dlg = new Window('palette', 'Please choose a distribution') // can keep working
  this.dlg = new Window('dialog', 'Svija Tools Settings') // can't do anything else
  
  var panel = this.dlg
  panel.preferredSize = [900, 400]
  panel.graphics.backgroundColor = panel.graphics.newBrush (panel.graphics.BrushType.SOLID_COLOR, [0.5, 0.0, 0.0])

  //———————————————————— introductory paragraph

  var myMessage = panel.add ("statictext")
  myMessage.text = "Please choose which release you would like to use:"

  //———————————————————— image

  var imgpath = TOOLSPATH + "/CSXS/panelicon_dark.png"
  var flowers = panel.add ("image", undefined, File(imgpath));

  //———————————————————— radio buttons

  var radio_group = panel.add ("panel")

  var myMessage = radio_group.add ("statictext")
  myMessage.text = 'Channel currently active: '+CHANNEL

  radio_group.alignChildren = "left"
  radio_group.add ("radiobutton", undefined, "Stable Release")
  radio_group.add ("radiobutton", undefined, "Beta Release")
  radio_group.add ("radiobutton", undefined, "Alpha Release")

  // set dialog defaults
  radio_group.children[1].value = true

  // cancel & apply buttons

  var buttons = radio_group.add ("group")
  buttons.add ("button", undefined, "Cancel")
  buttons.add ("button", undefined, "Apply")

  function selected_rbutton (rbuttons) {
    for (var i = 0; i < rbuttons.children.length; i++) {
      if (rbuttons.children[i].value == true) {
        return rbuttons.children[i].text
      }
    }
  }

  //———————————————————— description

  var msg = "This is a multiline explanation of the differences betwenen the different channels "
  msg += "as you can imageine, it goes on for quite a long time! klmjqsdf mlkqjsdfm qsdfmlkjmqsdf mlqsdkfjq qsdfmlkjqsdf mlqsdfqf mlqksdf"
  panel.add ('statictext', [0,0,600,50], msg, {multiline: true})

  //———————————————————— radio buttons


  //———————————————————— artboard type row
  
  var row = panel.add('group', undefined, '')

  row.orientation = 'row'
  row.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]

  var typeSt = row.add('statictext', undefined, 'Export artboards:') 
  typeSt.size = [ 100,20 ]  
  
  var artboardNames = []
  for(var i=0; i<4; ++i){
    artboardNames.push(i)
  }
  for(var i=0; i<3; i++){
    artboardNames.push(i+1)
  }

  this.artboardList = row.add('dropdownlist', undefined, artboardNames)
  this.artboardList.selection = 3
//    
//    this.exportArtboardsCheckBox = row.add('checkbox', undefined, 'Export Artboard Images')
//    this.exportArtboardsCheckBox.value = this.whole_artboard_mode
//  

  //———————————————————— prefix grp

  var row = panel.add('group', undefined, '')

  row.orientation = 'row'
  row.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]

  var prefixSt = row.add('statictext', undefined, 'File prefix:') 
  prefixSt.size = [100,20]

  this.prefixEt = row.add('edittext', undefined, this.prefix) 
  this.prefixEt.size = [ 300,20 ]

  //———————————————————— suffix row

  var row = panel.add('group', undefined, '')

  row.orientation = 'row'
  row.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]

  var row = panel.add('group', undefined, '')
  row.orientation = 'row'
  row.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]

  var suffixSt = row.add('statictext', undefined, 'File suffix:') 
  suffixSt.size = [100,20]

  this.suffixEt = row.add('edittext', undefined, this.suffix) 
  this.suffixEt.size = [ 300,20 ]

  //———————————————————— scaling row

  var row = panel.add('group', undefined, '')

  row.orientation = 'row'
  row.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]

  var scalingLabel = row.add('statictext', undefined, 'Scaling:') 
  scalingLabel.size = [100,20]

  this.scalingInput = row.add('edittext', undefined, this.scaling) 
  this.scalingInput.size = [ 100,20 ]

  var scalingTip = row.add('statictext', undefined, '(Normally 100%; Use 200% for Retina display exports)') 
  scalingTip.size = [300,20]

  //———————————————————— progress bar

  var progBar = panel.add( 'progressbar', undefined, 30, 100 )

  progBar.size = [400,10]

  this.progLabel = panel.add('statictext', undefined, 'line 104' ) 
  this.progLabel.size = [ 400,20 ]

  
  panel.progBar = progBar
  
  //———————————————————— buttons row

  var row = panel.add('group', undefined, '') 

  row.orientation = 'row'

  var cancelBtn = row.add('button', undefined, 'Cancel', {name:'cancel'})
  cancelBtn.onClick = function() { multi_exporter.dlg.close() }

  var saveBtn = row.add('button', undefined, 'Save and Close', {name:'saveClose'})
  saveBtn.onClick = function() {
    multi_exporter.saveOptions()
    multi_exporter.dlg.close()
  }

  // OK button
  var okBtn = row.add('button', undefined, 'Apply', {name:'ok'})

  okBtn.onClick = function() { 
    
    alert('saved')

  }
  
  this.ignoreCheckBox = row.add('checkbox', undefined, 'Ignore Warnings')
  this.ignoreCheckBox.value = this.ignoreWarnings
  
  if (panel.show () == 1) {
    alert ("You picked " + selected_rbutton (radio_group))
  }

  //panel.show()

}

//:::::::::::::::::::::::::::::::::::::::: fin

