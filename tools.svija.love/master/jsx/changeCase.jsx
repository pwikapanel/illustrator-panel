#target illustrator  

//:::::::::::::::::::::::::::::::::::::::: changeCase.jsx

/*———————————————————————————————————————— notes


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

  var textRange // is it the entire path (vs selected with cursor)

  if (app.documents.length < 1)  return ''
  var selection = app.activeDocument.selection;

  /* needs to work with

     • selected characters
     • a selected block
     • several selected objects
     • mix of objects & groups

     all I need is case of first letter
     the rest I can do with a menu command

     two cases:

     • some characters selected with cursor
     • objects with text selected

  */

  // which type of selection is it? ——————————————————————————————————————————
  
  if (typeof selection.typename == 'undefined')
    textRange = false
  else
    textRange = true

  // get all letters  ————————————————————————————————————————————————————————

  if (textRange)
    var allChars = getCharsRange(selection)
  else
    var allChars = getCharsBlock(selection)

  // is first letter upper or lower? —————————————————————————————————————————

  var isLower
  var noLetters = true

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

  // execute appropriate menu command ————————————————————————————————————————

  if (alt)
    app.executeMenuCommand('Title Case Change Case Item')
  else if (isLower)
    app.executeMenuCommand('UpperCase Change Case Item')
  else
    app.executeMenuCommand('LowerCase Change Case Item')


  return ''

}

//:::::::::::::::::::::::::::::::::::::::: functions

/*———————————————————————————————————————— getCharsRange(selection)

     */

function getCharsRange(selection){
  return selection.contents
}

/*———————————————————————————————————————— getCharsBlock(selection)

    */

function getCharsBlock(selection){
  var allChars = ''

  for (var x=0; x<selection.length; x++)
    allChars += selection[x].contents

  return allChars
}


//:::::::::::::::::::::::::::::::::::::::: fin

