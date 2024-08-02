#target illustrator  

/*———————————————————————————————————————— Create Group.jsx

    1.0.6

    Adobe Illustrator Script
    
    Copy into Applications/Adobe Illustrator 202x/Presets-Scripts/.../Scripts
    
    Creates a group with the selection. Differs from the 
    standard Illustrator function in that the group can have
    only a single sub-object.

    The result is a group that can be used for animation. */

/*———————————————————————————————————————— EULA

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

  	svija.com · hello@svija.com*/


//:::::::::::::::::::::::::::::::::::::::: program

function createGroup(){

//———————————————————————————————————————— validate selection

  if (app.selection.length < 1)  return ''
  if (app.selection[0].clipping) return('Cannot create group from Clipping Mask.')

//———————————————————————————————————————— multiple selection

  if (app.selection.length > 1){
    app.executeMenuCommand("group")
    return ''
  }

//———————————————————————————————————————— make obj from selection

  var obj    = selection[0]
  var zOrder = obj.absoluteZOrderPosition

//———————————————————————————————————————— create group behind obj

  var group  = obj.parent.groupItems.add()
  group.zOrder(ZOrderMethod.SENDBACKWARD)
  
  while(group.absoluteZOrderPosition > zOrder)
    group.zOrder(ZOrderMethod.SENDBACKWARD)

//———————————————————————————————————————— add obj to group

  obj.moveToBeginning(group)
  group.selected = true


  return ''
}

//:::::::::::::::::::::::::::::::::::::::: fin

