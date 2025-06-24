#target illustrator

// see also jsx/settings.jsx

// alert('engine: ' + $.engineName);
// #target illustrator  

/*:::::::::::::::::::::::::::::::::::::::: paletteAlert.js */

/*———————————————————————————————————————— notes

    1906 Beginning ScriptUI.pdf
    2210 Javascript Tools Guide CC (UI).pdf

    each element is in a group because only
    groups can have margins & spacing */

//  page 106 default & cancel elements


/*:::::::::::::::::::::::::::::::::::::::: program */

// the goal is to show a minimal alert that will close itself after x seconds, or if the user clicks anywhere

var progBar

function paletteAlert(arg){

  //———————————————————— create palette

  palette = new Window ('palette', 'Alert', undefined, {resizeable: false, borderless: true, closeButton: false})

  palette.margins = [0, 0, 0, 0]
  palette.spacing = 0
  palette.graphics.backgroundColor = palette.graphics.newBrush(palette.graphics.BrushType.SOLID_COLOR,[0.3, 0.3, 0.3], 1)
  
  //———————————————————— container // necessary for onclick

  var div = palette.add('group')
  div.preferredSize = [300, 30]
  div.orientation   = 'column'
  div.spacing   = 2
  div.alignment = 'center'
  div.margins = [0, 10, 0, 10]
//               L      R

  //———————————————————— message

  var  message = div.add('statictext')
  message.alignment = 'center'
  message.graphics.foregroundColor = message.graphics.newPen (message.graphics.PenType.SOLID_COLOR, [0.75, 0.75, 0.75], 1);

  message.text = arg

  //———————————————————— progress bar background
                                                             
  progBarTrack = div.add('group')
  progBarTrack.preferredSize.width = 300;
  progBarTrack.preferredSize.height= 3;
  progBarTrack.margins = [0, 8, 0, 0] // LTRB

  //progBarTrack.graphics.backgroundColor = div.graphics.newBrush(div.graphics.BrushType.SOLID_COLOR,[0, 0.3, 1.0], 1)








/* need to create a container for the progress bar, or for the message, to increase
the margin between the two of them. I also need to know why the palette
doesn't work for the save.jsx script */









  //———————————————————— progress bar
                                                             
  progBar = progBarTrack.add( 'progressbar', undefined, 0, 100 ); 
  progBar.preferredSize.width = 300;
  progBar.preferredSize.height= 1;

  //———————————————————— close palette

  palette.addEventListener ("keydown", function(k) {
    if(k.keyName == 'Escape'){ palette.hide() }
  })

  div.addEventListener('click', function(e){ palette.hide() })

  //———————————————————— show palette

  palette.show()
  return 'palette'

}

function progBarUpdate(pct){
  progBar.value = pct
}

//:::::::::::::::::::::::::::::::::::::::: fin

