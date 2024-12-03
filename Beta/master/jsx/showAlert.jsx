#target illustrator  

/*:::::::::::::::::::::::::::::::::::::::: channel.js */

/*———————————————————————————————————————— notes

    1906 Beginning ScriptUI.pdf
    2210 Javascript Tools Guide CC (UI).pdf

    each element is in a group because only
    groups can have margins & spacing */

//  page 106 default & cancel elements


/*:::::::::::::::::::::::::::::::::::::::: program */

function showAlert(arg){

  //———————————————————— create panel

  panel = new Window ('palette', 'Alert', undefined, {resizeable: false, borderless: true, closeButton: false})
  panel.graphics.backgroundColor = panel.graphics.newBrush (panel.graphics.BrushType.SOLID_COLOR, [0.2, 0.2, 0.2])

  panel.preferredSize = [400, 60] // +28px where title bar was
  panel.margins       = [0, 0, 0, 0]
  panel.orientation   = 'row'
  panel.alignChildren = ['fill', 'fill']
  panel.spacing=0
  
  //———————————————————— alert text

  // separate lines because only single lines can be centered

  var para = panel.add('group')
  para.margins = [0, 28, 30, 0]
  para.alignment = 'center'
  para.orientation = 'column'
  para.spacing   = 2
  //ra.graphics.backgroundColor = para.graphics.newBrush(para.graphics.BrushType.SOLID_COLOR,[0.3, 0.3, 0.3], 1)

  var  paraLine1 = panel.add("statictext")

  paraLine1.graphics.foregroundColor = paraLine1.graphics.newPen (paraLine1.graphics.PenType.SOLID_COLOR, [0.75, 0.75, 0.75], 1);

  paraLine1.text = arg


  //———————————————————— cancel & apply buttons

  cancelButton = panel.add("button", undefined, "Close")
//  applyButton  = panel.add("button", undefined, "Apply")

  cancelButton.alignment = ['', 'fill'] 
//  applyButton.alignment  = ['', 'fill']  // permits smaller buttons

  //———————————————————— button functionality

  var local = true

 // panel.defaultElement = applyButton
  panel.cancelElement = cancelButton

  cancelButton.onClick = function(e){
    panel.hide()
  }

  if(panel.show() == 1) return '|' + local // clicked apply
  else return ''                                     // clicked cancel

}

//:::::::::::::::::::::::::::::::::::::::: fin

