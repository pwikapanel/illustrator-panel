#target illustrator  

//:::::::::::::::::::::::::::::::::::::::: createGroup.js / createGroup.jsx

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

