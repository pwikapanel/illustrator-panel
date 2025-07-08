#target illustrator

/* vim: set foldmethod=marker fmr=/*—,;: */

//:::::::::::::::::::::::::::::::::::::::: ALERTPALETTE .css .js .jsx

// see also jsx/settings.jsx

// alert('engine: ' + $.engineName);
// #target illustrator  

/*———————————————————————————————————————— notes

    1906 Beginning ScriptUI.pdf
    2210 Javascript Tools Guide CC (UI).pdf

    each element is in a group because only
    groups can have margins & spacing */

//  page 106 default & cancel elements
;

/*:::::::::::::::::::::::::::::::::::::::: program */

// the goal is to show a minimal alert that will close itself after x seconds, or if the user clicks anywhere

var progBar

function ALERTPALETTE(arg){

  /*———————————————————— colors */

  var paletteBackground=this['labelText' + INTERFACE]
  var       paletteText=this['panelBg' + INTERFACE]
  ;
  //———————————————————— create palette

//palette = new Window ('palette', " ", undefined, {resizeable: false, borderless: true, closeButton: false})

  // to avoid title bar
  palette = new Window ( 'dialog', ' ', undefined, {resizeable: false, borderless: true, closeButton: false})

  palette.margins = [0, 0, 0, 0]
  palette.spacing = 0
  palette.graphics.backgroundColor = palette.graphics.newBrush(palette.graphics.BrushType.SOLID_COLOR,paletteBackground, 1)
  
  //———————————————————— container // necessary for onclick

  var div = palette.add('group')
  div.preferredSize = [300, 20]
  div.orientation   = 'column'
  div.spacing   = 2
  div.alignment = 'center'
  div.margins = [0, 10, 0, 10]
//               L      R

  //———————————————————— message

  var  message = div.add('statictext')
  message.alignment = 'center'
  message.graphics.foregroundColor = message.graphics.newPen (message.graphics.PenType.SOLID_COLOR, paletteText, 1);

  message.text = arg

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

