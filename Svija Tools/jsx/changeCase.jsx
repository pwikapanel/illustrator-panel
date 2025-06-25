#target illustrator  

//:::::::::::::::::::::::::::::::::::::::: changeCase.js / changeCase.jsx

/* remove groups —————————————————————————————————————————————————————————————

    this should only happen if group length is 1

    while (selection[0] instanceof GroupItem){
      app.activeDocument.selection = selection[0].pageItems[0]
      var selection = app.activeDocument.selection;
      alert('Group Removed')
    }
  
    // selected item is not text ———————————————————————————————————————————————
  
    if (!selectedChars && !(selection[0] instanceof TextFrame)){
      alert('Please select text')
      return true
    }

    I don't need to return an error, because there is no alert anyway */

/*———————————————————————————————————————— notes

     needs to work with

     • selected characters
     • a selected block
     • several selected objects
     • mix of objects & groups
     • a group of one member (text and group are both selected)

     all I need is case of first letter
     the rest I can do with a menu command

     two cases:

     • some characters selected with cursor
     • objects with text selected */


//:::::::::::::::::::::::::::::::::::::::: program SHOULD WORK FOR MULTIPLE SELECTION

function changeCase(alt){

  // guards  ———————————————————————————————————————————————

  // no open documents
  if (app.documents.length < 1)  return

  // no selection
  if (app.activeDocument.selection.length < 1) return // triggered by 1-element group where only sub-element is selected

  // extract text from selection  ————————————————————————————————————————

  var selection = app.activeDocument.selection;

  allChars = selectionText(selection)

  // is first letter upper or lower? ———————————————————————————————————————————

  var isLower

  for (var x=0; x<allChars.length; x++){
    var thisChar = allChars.substr(x,1)
    if (thisChar >= 'a' && thisChar <= 'z'){
      isLower = true
      break
    }
    else if  (thisChar >= 'A' && thisChar <= 'Z'){
      isLower = false
      break
    }
  }

  if (typeof isLower == 'undefined') return

  // execute appropriate menu command ——————————————————————————————————————————

  if (alt)
    app.executeMenuCommand('Title Case Change Case Item')
  else if (isLower)
    app.executeMenuCommand('UpperCase Change Case Item')
  else
    app.executeMenuCommand('LowerCase Change Case Item')


  return
}

//:::::::::::::::::::::::::::::::::::::::: functions

/*———————————————————————————————————————— selectionText(selection)

    app.activeDocument.selection is always an Array, even if one
    item is selected. If only a character range is selected (i.e. a
    TextRange), Illustrator actually returns a TextRange object, not
    an array. That distinction is key.

    Thanks ChatGPT !*/

function selectionText(selection) {
  var res = ''

  // selected characters
  if (selection.typename === 'TextRange') {
    return selection.contents
  }

  // multiple selected objects
  else if (selection instanceof Array) {
    for (var i = 0; i < selection.length; i++) {
      res += selectionText(selection[i])  // Recursive call
    }
  }

  // single object
  else if (selection.typename === 'TextFrame') {
    res += selection.contents
  }

  // group
  else if (selection.typename === 'GroupItem') {
    for (var i = 0; i < selection.pageItems.length; i++) {
      res += selectionText(selection.pageItems[i])  // Dive into group
    }
  }

  return res
}

/*———————————————————————————————————————— isGroup(sel){

    returns true if selection is a group, false otherwise
    no protection against empty selection */

function isGroup(selection){
  if (selection[0].typename === "GroupItem") return true
  return false
}

/*———————————————————————————————————————— groupLength(sel)

    returns number of items in a group
    no protection against empty selection */

function groupLength(sel){
  if (!isGroup(sel)) return 0
  return  sel[0].pageItems.length
}


//:::::::::::::::::::::::::::::::::::::::: fin


