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

  //———————————————————— create panel

  panel = new Window ('palette', 'Alert', undefined, {resizeable: false, borderless: true, closeButton: false})
  panel.graphics.backgroundColor = panel.graphics.newBrush (panel.graphics.BrushType.SOLID_COLOR, [0.2, 0.2, 0.2])

  panel.preferredSize = [400, 60] // +28px where title bar was
  panel.margins       = [0, 0, 0, 0]
  panel.orientation   = 'row'
  panel.alignChildren = ['fill', 'fill']
  panel.spacing=0

  var content = panel.add ('group');
  content.spacing=0
  content.orientation   = 'column'
  content.preferredSize = [310,292]
  content.margins = [0, 0, 0, 0]
  content.graphics.backgroundColor = content.graphics.newBrush(content.graphics.BrushType.SOLID_COLOR,[0.7,0.7,0.7], 1);
  content.addEventListener("click", function(e){ panel.hide() })

  //———————————————————— paragraph

  var  paraLine1 = content.add("statictext")

  paraLine1.graphics.foregroundColor = paraLine1.graphics.newPen (paraLine1.graphics.PenType.SOLID_COLOR, [0.75, 0.75, 0.75], 1);

  paraLine1.text = arg




  if(panel.show() == 1){} 
  else return ''

}

//:::::::::::::::::::::::::::::::::::::::: fin

