#target illustrator  

/*———————————————————————————————————————— Create Group.jsx

    1.0.3

    Adobe Illustrator Script
    
    Copy into Applications/Adobe Illustrator 202x/Presets-Scripts/.../Scripts
    
    Creates a group with the selection. Differs from the 
    standard Illustrator function in that the group can have
    only a single sub-object.

    The result is a group that can be used for animation. */

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

  	svija.love · hello@svija.com*/

//———————————————————————————————————————— initialize

var instr = '\nYou must select at least one object.';

//———————————————————————————————————————— start program

program:{

//———————————————————————————————————————— validate selection

  if (app.selection.length < 1){
    alert(instr);
    break program;
  }

//———————————————————————————————————————— save correct depth

var zOrder = selection[0].zOrderPosition;

//———————————————————————————————————————— create group

var layer  = app.activeDocument.activeLayer;
var newGroup = layer.groupItems.add();

//———————————————————————————————————————— move group to correct placement

for (var x=0; x<zOrder; x++){
  newGroup.zOrder(ZOrderMethod.SENDBACKWARD);
}

//———————————————————————————————————————— move selection to new group

for(var i=0; i<selection.length; i++) {
  var item = selection[selection.length - 1];
  item.moveToBeginning(newGroup);
}

//———————————————————————————————————————— end program

}


//———————————————————————————————————————— fin
