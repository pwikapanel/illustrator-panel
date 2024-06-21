
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

  	svija.com · hello@svija.com*/


//:::::::::::::::::::::::::::::::::::::::: program

/*———————————————————————————————————————— ▼ program:{

    can use "break program;" to quit at any moment */

program:{

//———————————————————————————————————————— no open docs

if (app.documents.length < 1){
  alert('No open documents.');
  break program;
}

//———————————————————————————————————————— validate selection

  if (app.selection.length < 1){
    alert('Please select at least one object.');
    break program;
  }

  if (app.selection.length > 1){
    alert('Please select only one object.');
    break program;
  }

  if (app.selection[0].clipping){
    alert('Cannot create group from Clipping Mask.');
    break program;
  }

//———————————————————————————————————————— save correct depth

var activeObj = selection[0];
var zOrder = activeObj.absoluteZOrderPosition;
// var parentLocks = unlockHierarchy(activeObj); // can't actually be locked, because it's selected ;-)

//———————————————————————————————————————— create group

var newGroup = activeObj.parent.groupItems.add();

//———————————————————————————————————————— move group to correct placement

newGroup.zOrder(ZOrderMethod.SENDBACKWARD);

while(newGroup.absoluteZOrderPosition > zOrder)
  newGroup.zOrder(ZOrderMethod.SENDBACKWARD);

//———————————————————————————————————————— move selection to new group

activeObj.moveToBeginning(newGroup);

//    for(var i=0; i<selection.length; i++) {
//      var item = selection[selection.length - 1];
//      item.moveToBeginning(newGroup);
//    }

//———————————————————————————————————————— make internal item the selection

newGroup.selected = true;

//———————————————————————————————————————— ▲ } // program 

  // relockHierarchy(parentLocks) // can't actually be locked, because it's selected ;-)

} // program 


//:::::::::::::::::::::::::::::::::::::::: functions

//———————————————————————————————————————— dumpKeys(obj)

function dumpKeys(obj){
  var str = '';

  for (var i in obj){
    try{
      str += '\n'+i+': '+obj[i]
    }
    catch(e){
      str += '\n'+i+': error';
    }
  }
  alert(str);
}

/*———————————————————————————————————————— unlockHierarchy(obj)

    unlocks the hierarchy above an element and returns an array

    each element of the array is a sub array containing
    [obj, obj.locked] */

function unlockHierarchy(obj){

  var parentLocks = [];
  var thisParent = obj.parent;

  while (thisParent.typename != 'Document'){
    parentLocks[parentLocks.length] = [thisParent, thisParent.locked];
    thisParent = thisParent.parent
  }

  for(var x=parentLocks.length-1; x>-1; x--)
    parentLocks[x][0].locked = false;

  return parentLocks;
}

/*———————————————————————————————————————— relockHierarchy(obj)

    relocks elements unlocked by unlockHierarchy() */

function relockHierarchy(arr){
  for(var x=0; x<arr.length; x++)
    arr[x][0].locked = arr[x][1];
}


//:::::::::::::::::::::::::::::::::::::::: keys

/* 1st dumpkeys

closed: undefined
area: undefined
length: undefined
guides: undefined
filled: undefined
fillColor: RGBColor
fillOverprint: undefined
stroked: undefined
strokeColor: RGBColor
strokeOverprint: undefined
strokeWidth: undefined
strokeDashes: undefined
strokeDashOffset: undefined
strokeCap: StrokeCap.BUTTENDCAP
strokeJoin: StrokeJoin.MITERENDJOIN
strokeMiterLimit: undefined
clipping: undefined
evenodd: undefined
resolution: undefined
selectedPathPoints: undefined
polarity: PolarityValues.POSITIVE
pathPoints: PathPoints
typename: undefined
uRL: undefined
note: undefined
layer: Layer
locked: undefined
hidden: undefined
selected: undefined
position: undefined
width: undefined
height: undefined
geometricBounds: undefined
visibleBounds: undefined
controlBounds: undefined
name: undefined
uuid: undefined
blendingMode: BlendModes.NORMAL
opacity: undefined
isIsolated: undefined
artworkKnockout: KnockoutState.DISABLED
zOrderPosition: error
absoluteZOrderPosition: undefined
editable: undefined
sliced: undefined
top: undefined
left: undefined
visibilityVariable: error
tags: Tags
pixelAligned: undefined
wrapped: undefined
wrapOffset: error
wrapInside: error
parent: Layer */
/* 2nd dumpkeys: values

closed: true
area: 8446.32046769559
length: 368.371093750001
guides: false
filled: true
fillColor: [RGBColor]
fillOverprint: false
stroked: true
strokeColor: [RGBColor]
strokeOverprint: false
strokeWidth: 0.5
strokeDashes: 
strokeDashOffset: 0
strokeCap: StrokeCap.BUTTENDCAP
strokeJoin: StrokeJoin.MITERENDJOIN
strokeMiterLimit: 10
clipping: false
evenodd: false
resolution: 800
selectedPathPoints: [PathPoint],[PathPoint],[PathPoint],[PathPoint]
polarity: PolarityValues.POSITIVE
pathPoints: [PathPoints]
typename: PathItem
uRL: 
note: 
layer: [Layer content]
locked: false
hidden: false
selected: true
position: 831.16748046875,-473.231018066406
width: 97.9884033203125
height: 86.197143554688
geometricBounds: 831.16748046875,-473.231018066406,929.155883789062,-559.428161621094
visibleBounds: 830.91748046875,-472.981018066406,929.405883789062,-559.678161621094
controlBounds: 830.91748046875,-472.981018066406,929.405883789062,-559.678161621094
name: 
uuid: 418
blendingMode: BlendModes.NORMAL
opacity: 100
isIsolated: false
artworkKnockout: KnockoutState.DISABLED
zOrderPosition: error
absoluteZOrderPosition: 18
editable: true
sliced: false
top: -472.981018066406
left: 830.91748046875
visibilityVariable: null
tags: [Tags]
pixelAligned: false
wrapped: false
wrapOffset: error
wrapInside: error
parent: [Layer content] */

//:::::::::::::::::::::::::::::::::::::::: fin

/* dump

clipped: false
groupItems: [GroupItems]
pageItems: [PageItems]
compoundPathItems: [CompoundPathItems]
pathItems: [PathItems]
rasterItems: [RasterItems]
placedItems: [PlacedItems]
meshItems: [MeshItems]
pluginItems: [PluginItems]
graphItems: [GraphItems]
nonNativeItems: [NonNativeItems]
textFrames: [TextFrames]
symbolItems: [SymbolItems]
legacyTextItems: [LegacyTextItems]
symmetryRepeatItems: [SymmetryRepeatItems]
radialRepeatItems: [RadialRepeatItems]
gridRepeatItems: [GridRepeatItems]
typename: GroupItem
uRL: 
note: 
layer: [Layer compass MB]
locked: false
hidden: false
selected: true
position: -70.1688226150127,-91.5583377656606
width: 527.901726078551
height: 351.969681020472
geometricBounds: -70.1688226150127,-91.5583377656606,457.732903463539,-443.528018786132
visibleBounds: -70.1688226150127,-91.5583377656606,457.732903463539,-443.528018786132
controlBounds: -70.1688226150127,-91.5583377656606,457.732903463539,-443.528018786132
name: 
uuid: 724
blendingMode: BlendModes.NORMAL
opacity: 100
isIsolated: false
artworkKnockout: KnockoutState.INHERITED
zOrderPosition: 1
absoluteZOrderPosition: 2
editable: true
sliced: false
top: -91.5583377656606
left: -70.1688226150127
visibilityVariable: null
tags: [Tags]
pixelAligned: false
wrapped: false
wrapOffset: error
wrapInside: error
parent: [GroupItem ] */
