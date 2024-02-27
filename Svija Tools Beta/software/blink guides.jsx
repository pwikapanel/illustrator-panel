#target illustrator  

//:::::::::::::::::::::::::::::::::::::::: Object.jsx

/*———————————————————————————————————————— notes


/*———————————————————————————————————————— (c) & EULA

    Copyright (c) Svija

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


function getState(){
result="showguide"
try {
  app.executeMenuCommand(result);
} catch (e) {
  alert("Error executing command:\n" + result + "\n\n" + e);
}
return "worked"


  var sourceDoc   = app.activeDocument;
  var selection   = sourceDoc.selection
  if (selection.length > 1) return "multiple items"
  if (selection.length == 0) return "no selection"
  if (selection[0].name == '') return selection[0].typename 
  return selection[0].name
}


//:::::::::::::::::::::::::::::::::::::::: fin


// get grid state
// get guide state
