#target illustrator  

/*———————————————————————————————————————— Propagate Layers.jsx

    github.com/svijasvg/svija-tools
  
    version 2.1.23
  
    (c) 2021 Svija
    svija.love
    contact@svija.love

//———————————————————————————————————————— what it does

    recursive delete in case multiple layers share same name

    Copies all unlocked layers from the active document to all other documents

    the top left corner of the document is set to illustrator's default
    top left corner. Rulers have no effect, and destination
    documents should have the top left corner in the default place

//———————————————————————————————————————— iterate for all open documents */

var msgSingle   = 'Only One Document is Open\n' +
                  'This tool copies unlocked layers to all other open documents.\n\n' +
                  'To bottom-align a layer add any object named "bottom-align" to it.';

var msgNoUnlocked = 'No Unlocked Layers\n' +
                  'This tool copies unlocked layers to all other open documents.\n\n' +
                  'To be copied, a layer must be named.';

var msgConfirm  = 'Is the correct document active?\n' +
                  'You can undo changes by typing cmd-Z in each destination document.\n\n' +
                  'To bottom-align a layer add any object\nnamed "bottom-align" to it.\n';

var msgComplete = ' completed';
var msgNoChange = 'No changes made.';
var msgCopied   = 'Layers copied\nLayer source:';

//———————————————————————————————————————— chain of checks

var sourceDoc   = app.activeDocument;
var openDocs    = app.documents.length;
var workDone    = false;

//———————————————————————————————————————— chain of checks

if (openDocs < 2) alert(msgSingle);
else if (unlockedLayers(sourceDoc) == 0) alert(msgNoUnlocked);
else if (confirm(msgConfirm)){

//———————————————————————————————————————— main program

  // set by function findZ
  var messages     = [];

  // iterate through all open documents
  for (i = openDocs-1 ; i > 0; i--){

    var destDoc = app.documents[i];
    layersLock(destDoc, false);

    workDone = copyUnlockedLayers(sourceDoc, destDoc);
    layersLock(destDoc, true);
  }

//———————————————————————————————————————— alert user and end

  text = messages.join ("\n");

  if (workDone == true)
    var finalMessage = msgCopied + ' "'+sourceDoc.name+'"\n\n' + text;
  else
    var finalMessage = msgNoChange;
}

alert(finalMessage);

// - - - - - - - - - - - - - - - - - - - - functions

//———————————————————————————————————————— lock or unlock all layers

function layersLock(docName, val){
  allLayers = docName.layers;
  for (z = 0; z < allLayers.length; z++){
    myLayer = allLayers[z];
    myLayer.locked = val;
  }
}

//———————————————————————————————————————— get Z index by layer name from specified parent object

function getZbyName(name, parentObj){
  try{ var layer = parentObj.layers.getByName(name); }
  catch(e){ return -1; }
  return layer.zOrderPosition;
}

/*———————————————————————————————————————— delete a named layer

    if a layer exists, it's deleted
    and its z index is returned

*/

function deleteExistingLayer(name, parentObj){
  try { var oldLayer = parentObj.layers.getByName(name);}
  catch (e) { return -1 };

  z = oldLayer.zOrderPosition
  oldLayer.locked = false;
  oldLayer.visible = true;
  oldLayer.remove();
  return z;
}

/*———————————————————————————————————————— determines correct z index for layer

    top layers stay on top
    bottom layers stay on bottom
    otherwise try to match adjacent layers
    otherwise just use existing index

    IMPT: z order starts at 1, not 0
*/

function findZ(sourceLayer, destLayer){

  var srcZ          = sourceLayer.zOrderPosition;

  var srcParent     = sourceLayer.parent;
  var srcLayersLen  = srcParent.layers.length;

  var destParent    = destLayer.parent;
  var destLayersLen = destParent.layers.length;

  // if it's same as number of layers, it's on top
  if (srcZ == srcLayersLen+1){
    messages.push('"' + sourceLayer.name + '" added as top layer of ' + destParent.name);
    return destLayersLen + 1;
  }

  // if it's 1, it's on bottom
  if (srcZ == 1){
    messages.push('"' + sourceLayer.name + '" added as bottom layer of ' + destParent.name);
    return srcZ;
  }

  // otherwise it's in the middle, go by name
  var index     = srcLayersLen - srcZ;
  var aboveName = srcParent.layers[index-1].name;
  var belowName = srcParent.layers[index+1].name;

  // does the aboveName exist in new document?
  var aboveZ = getZbyName(aboveName, destParent);
  var belowZ = getZbyName(belowName, destParent);

  // layers above and below found, no ambiguity
  if (aboveZ > 0 && belowZ > 0) return aboveZ;

  // no exact placement possible
  messages.push('verify layer "' + sourceLayer.name + '" in ' + destParent.name);
  
  // only layer above found
  if (aboveZ > 0) return aboveZ;
      
  // only layer below found
  if (belowZ > 0) return belowZ + 1;
      
  // no matching layers found, use index
  return srcZ;
}

/*———————————————————————————————————————— returns vertical shift

    of copied content if object 'bottom-align'

*/

function getVoffset(sourceLayer, destDocHeight){
  try{ isShifted = sourceLayer.pageItems.getByName('bottom-align'); }
  catch(e){ return 0; }

  return sourceLayer.parent.height-destDocHeight;
}

//———————————————————————————————————————— returns number of unlocked layers in active document

function unlockedLayers(doc){
  var unlocked = 0;
  for (var x=0; x<doc.layers.length; x++)
    if (!doc.layers[x].locked && !(doc.layers[x].name.slice(0,1)=='<')) unlocked += 1;
  return unlocked;
}

/*———————————————————————————————————————— set Z index of a layer

   can't send behind an invisible layer because
   that modifies the index of the layer
   and an invisible layer is considered locked */

function setZ(layer, newZ){
  var thisZ = layer.zOrderPosition;
  var howMany = layer.parent.layers.length;

  while (thisZ > newZ){
    nextIndex = howMany - thisZ+1;

    vis = layer.parent.layers[nextIndex].visible;
    layer.parent.layers[nextIndex].visible = true;

    layer.zOrder(ZOrderMethod.SENDBACKWARD);
    layer.parent.layers[nextIndex-1].visible = vis;

    thisZ -= 1;
  }
}

/*———————————————————————————————————————— creates empty layer

    with correct name, at correct Z-index
    if layer exists, it's deleted & re-created

*/

function newEmptyLayer(sourceLayer, parentObj){

  // returns -1 if layer doesn't exist
  var zIndex = deleteExistingLayer(sourceLayer.name, parentObj);

  var destLayer = parentObj.layers.add();  
  destLayer.name = sourceLayer.name;

  // if we're not replacing a layer of the same name
  if (zIndex < 0)
    var zIndex = findZ(sourceLayer, destLayer);

  setZ(destLayer,zIndex);
  return destLayer;
}

//———————————————————————————————————————— copy unlocked layers from first doc to second
//  need to copy sublayers

function copyUnlockedLayers(sourceDoc, destDoc){
  
  var workDone = false; 
  var howMany = sourceDoc.layers.length;

  for(q = 0; q < howMany; q++){
    var sourceLayer = sourceDoc.layers[q];
    if (sourceLayer.locked || sourceLayer.name.slice(0,1)=='<') continue;

    // create destination layer & copy all contents to new layer
    var destLayer = newEmptyLayer(sourceLayer, destDoc);

    //  is layer bottom aligned?
    var voffset = getVoffset(sourceLayer, destDoc.height);

    // copy layer contents to new layer, vertical shifting if necessary
    var workDone = copyAllItems(sourceLayer, destLayer, voffset);

    // match old layer quantities
    destLayer.color     = sourceLayer.color;
    destLayer.printable = sourceLayer.printable;
    destLayer.visible   = sourceLayer.visible;

  }
  return workDone;
}

/*———————————————————————————————————————— copy all layer elements

    copies all layer items to an existing empty layer

*/

function copyAllItems(sourceLayer, destLayer, voffset){

  //————————— regular page items

  var itemsLen = sourceLayer.pageItems.length;

  for (var y = 0; y < itemsLen; y++) {  
    sourceLayer.pageItems[y].duplicate(destLayer, ElementPlacement.PLACEATEND);
    destLayer.pageItems[y].top += voffset;
  }

  //————————— sublayers

  // Layer.layers
  // app.activeDocument.layers[index].zOrderPosition

  var subLayersLen = sourceLayer.layers.length;
  for (var y=0; y<subLayersLen; y++){
    var srcSubLayer  = sourceLayer.layers[y];
    alert('treating sublayer '+srcSubLayer.name);

    var destSubLayer = newEmptyLayer(srcSubLayer, destLayer);
    var resultats = copyAllItems(srcSubLayer, destSubLayer, voffset);
  }

  //————————— return results

  return true;
}

//———————————————————————————————————————— fin
