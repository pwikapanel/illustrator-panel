#target illustrator  

//:::::::::::::::::::::::::::::::::::::::: changeCase.jsx

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

/*———————————————————————————————————————— (c) & EULA

    Copyright (c) 2019-2023 Svija

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    The software is provided "as is", without warranty of any kind, express or
    implied, including but not limited to the warranties of merchantability,
    fitness for a particular purpose and noninfringement. In no event shall the
    authors or copyright holders be liable for any claim, damages or other
    liability, whether in an action of contract, tort or otherwise, arising from,
    out of or in connection with the software or the use or other dealings in
    the software.

  	svija.com · hello@svija.com */


//:::::::::::::::::::::::::::::::::::::::: program

function changeCase(alt){

  // if no selection, do nothing ———————————————————————————————————————————————

  if (app.documents.length < 1)  return ''
  if (app.activeDocument.selection.length < 1) return ''

  // variable declarations —————————————————————————————————————————————————————

  var textRange     // is it the entire path (vs selected with cursor)
  var selection     // active selection at a given moment
  var initSelection // what was selected when script was called

  // get selection —————————————————————————————————————————————————————————————

  var selection = app.activeDocument.selection;

  // is it selected characters? ————————————————————————————————————————————————
  
  if (selection instanceof TextRange)
    textRange = true
  else
    textRange = false

  // get selected text —————————————————————————————————————————————————————————

  if (textRange)
    var allChars = getTextRange(selection)
  else
    var allChars = getTextMulti(selection)

  alert('83: '+allChars)

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

/*———————————————————————————————————————— getTextRange(selection)

     */

function getTextRange(selection){
  return selection.contents
}

/*———————————————————————————————————————— getTextMulti(sel)

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

  // remove groups —————————————————————————————————————————————————————————————

// this should only happen if group length is 1

//while (selection[0] instanceof GroupItem){
//  app.activeDocument.selection = selection[0].pageItems[0]
//  var selection = app.activeDocument.selection;
//  alert('Group Removed')
//}

  // selected item is not text ———————————————————————————————————————————————

//if (!textRange && !(selection[0] instanceof TextFrame)){
//  alert('Please select text')
//  return true
//}

// I don't need to return an error, because there is no alert anyway

