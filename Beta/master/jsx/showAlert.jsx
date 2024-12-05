#target illustrator  

/*:::::::::::::::::::::::::::::::::::::::: channel.js */

/*———————————————————————————————————————— notes

    1906 Beginning ScriptUI.pdf
    2210 Javascript Tools Guide CC (UI).pdf

    each element is in a group because only
    groups can have margins & spacing */

//  page 106 default & cancel elements


/*:::::::::::::::::::::::::::::::::::::::: program */

// the goal is to show a minimal alert that will close itself after x seconds, or if the user clicks anywhere

function showAlert(arg){

  //———————————————————— create palette

  palette = new Window ('palette', 'Alert', undefined, {resizeable: false, borderless: true, closeButton: false})
  palette.graphics.backgroundColor = palette.graphics.newBrush (palette.graphics.BrushType.SOLID_COLOR, [0.2, 0.2, 0.2])

  palette.preferredSize = [400, 60] // +28px where title bar was
  palette.margins       = [0, 0, 0, 0]
  palette.orientation   = 'row'
  palette.alignChildren = ['fill', 'fill']
  palette.spacing=0
  
  //———————————————————— alert text

  var para = palette.add('group')
  para.margins = [0, 28, 30, 0]
  para.alignment = 'center'
  para.orientation = 'column'
  para.spacing   = 2
  para.graphics.backgroundColor = para.graphics.newBrush(para.graphics.BrushType.SOLID_COLOR,[0.3, 0.3, 0.3], 1)


  para.addEventListener('click', function(e){ palette.hide() })

  var  paraLine1 = para.add("statictext")

  paraLine1.graphics.foregroundColor = paraLine1.graphics.newPen (paraLine1.graphics.PenType.SOLID_COLOR, [0.75, 0.75, 0.75], 1);

  paraLine1.text = arg


  //———————————————————— cancel & apply buttons

  cancelButton = palette.add("button", undefined, "Close")
//  applyButton  = palette.add("button", undefined, "Apply")

  cancelButton.alignment = ['', 'fill'] 
//  applyButton.alignment  = ['', 'fill']  // permits smaller buttons

  //———————————————————— button functionality

  palette.cancelElement = cancelButton

  cancelButton.onClick = function(e){
    palette.hide()
  }

  if(palette.show() == 1){} 
  else return ''                                     // clicked cancel

}

//:::::::::::::::::::::::::::::::::::::::: fin

