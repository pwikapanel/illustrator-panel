#target illustrator  

/*———————————————————————————————————————— Place File.jsx

    1.0.3

    Adobe Illustrator Script
    
    Copy into Applications/Adobe Illustrator 202x/Presets-Scripts/.../Scripts
    
    Cause the Place File dialog box to open, already in the
    folder appropriate for the active document. */
    
/*———————————————————————————————————————— EULA

    Copyright (c) 2023 Svija

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

  	svija.love · hello@svija.com */

//———————————————————————————————————————— initialize

var instr = '\nYou must select at least one object.';

//———————————————————————————————————————— start program

program:{

var aseFile = File(app.activeDocument.path);
// alert(aseFile);
// aseFile.place();
var layer  = app.activeDocument.activeLayer;
var newItem = layer.placedItems.add(); // creates new empty placeditem

var aseFile = File(app.activeDocument.path+'/Links');
newItem.file = aseFile.openDlg();

// FIX PREVIOUS LINE SO MULTIPLE LINES CAN BE SELECTED
// DO THE SAME FOR THE OPEN SCRIPT

break program;

//———————————————————————————————————————— end program

}


//———————————————————————————————————————— fin
