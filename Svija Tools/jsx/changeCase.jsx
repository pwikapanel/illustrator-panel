#target illustrator  

//:::::::::::::::::::::::::::::::::::::::: changeCase.jsx

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


//:::::::::::::::::::::::::::::::::::::::: program

function changeCase(alt){

  // if no file or selection, do nothing ———————————————————————————————————————————————

  if (app.documents.length < 1)  return ''
  if (app.activeDocument.selection.length < 1) return ''

  // get selection & type of selection —————————————————————————————————————————————————————————————

  var selection = app.activeDocument.selection;

  if (selection instanceof TextRange)
    selectedChars = true
  else
    selectedChars = false

  // get selected text —————————————————————————————————————————————————————————

  if (selectedChars)
    var allChars = selection.contents
  else
    var allChars = getTextMulti(selection) ////////////////////////////////////////////////////////// THIS IS WHERE PROBLEM STARTS

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

  if (typeof isLower == 'undefined') return ''

  // execute appropriate menu command ——————————————————————————————————————————

  if (alt)
    app.executeMenuCommand('Title Case Change Case Item')
  else if (isLower)
    app.executeMenuCommand('UpperCase Change Case Item')
  else
    app.executeMenuCommand('LowerCase Change Case Item')


  return ''
}

//:::::::::::::::::::::::::::::::::::::::: functions

/*———————————————————————————————————————— getTextMulti(sel) /////////////////////////////////////// START WORK HERE

    need to iterate through every element of selection
    need all text, because it could be lots of numbers followed by a letter
    and we need the letter to know how to proceed */

function getTextMulti(sel){

  var allText

  if (sel.length == 1 && !(selection[0] instanceof GroupItem))
    return getTextObj(sel)

try{

  alert('144 sel[0].pageItems.length: ' + sel[0].pageItems.length)

  for(x=0; x<sel[0].pageItems.length; x++)
    allTxt += getTextObj(sel[0].pageItems[x])

} catch(e){alert(e)}

  alert('155 returning '+allTxt)
  return allTxt

}
  
/*———————————————————————————————————————— getTextObj(selection)

    selection has no length
    selection.textFrames has no length */

function getTextObj(selection){
  try{
  alert('166: selection.typeof: '+selection.typename)
  } catch(e){ alert('167: no typename') }

  var allChars = ''

  alert('164 selection.textFrames.length: '+selection.textFrames.length)

  for (var x=0; x<selection.length; x++){
    alert('167 typeof '+ selection[x].textFrames.length)
    // error if simple text selected
    // one if single-member group
    // zero if deep group
    allChars += selection[x].contents

  }
  alert('174 returning text '+allChars)
  return allChars
}


//:::::::::::::::::::::::::::::::::::::::: fin

