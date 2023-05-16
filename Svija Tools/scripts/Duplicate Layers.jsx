#target illustrator  

/*———————————————————————————————————————— Duplicate Layers.jsx

    Duplicate Layers.jsx

    1.0.3

    recursive delete in case multiple layers share same name

    Copies all unlocked layers from the active document to all other documents

    the top left corner of the document is set to illustrator's default
    top left corner. Rulers have no effect, and destination
    documents should have the top left corner in the default place */

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

/*———————————————————————————————————————— user messages */

var msgSingle     = 'Only One Document is Open\n' +
                    'This tool copies unlocked layers to all other open documents.\n\n' +
                    'To bottom-align a layer add any object named "bottom-align" to it.';

var msgNoUnlocked = 'No Unlocked Layers\n' +
                    'This tool copies unlocked layers to all other open documents.\n\n' +
                    'Only named layers are copied.';

var msgConfirm    = 'Is the correct document active?\n' +
                    'You can undo changes by typing cmd-Z in each destination document.\n\n' +
                    'To bottom-align a layer add any object\nnamed "bottom-align" to it.';

var msgComplete   = ' completed';
var msgNoChange   = 'No changes made.';
var msgCopied     = 'Layers copied\nLayer source:';
var finalMessage  = '';

//———————————————————————————————————————— main program

var sourceDoc   = app.activeDocument;
var openDocs    = app.documents.length;
var workDone    = false;

//———————————————————————————————————————— check if possible

if (openDocs < 2) alert(msgSingle);
//else if (1==1) testFunction();
else if (unlockedLayers(sourceDoc) == 0) alert(msgNoUnlocked);
else if (confirm(msgConfirm)){

//———————————————————————————————————————— do the duplication

  var messages     = [];

  // iterate through all open documents
  for (i = openDocs-1 ; i > 0; i--){

    var destDoc = app.documents[i];
    layersLock(destDoc, false);

    workDone = copyUnlockedLayers(sourceDoc, destDoc);
    layersLock(destDoc, true);
  }

//———————————————————————————————————————— give feedback & quit

  text = messages.join ("\n");

  if (workDone == true)
    var finalMessage = msgCopied + ' "'+sourceDoc.name+'"\n\n' + text;
  else
    var finalMessage = msgNoChange;
}

if (finalMessage != '') alert(finalMessage);

//———————————————————————————————————————— ▲ } // program 

} // program 



//:::::::::::::::::::::::::::::::::::::::: main functions

/*———————————————————————————————————————— copyUnlockedLayers(srcdoc, destdoc){

    copy unlocked layers from first doc to second
    need to copy sublayers */

function copyUnlockedLayers(srcdoc, destdoc){
  
  var workdone = false; 
  var howmany = srcdoc.layers.length;

  for(q = 0; q < howmany; q++){
    var srcLayer = srcdoc.layers[q];
    if (srcLayer.locked || srcLayer.name.slice(0,1)=='<') continue;

    // create destination layer & copy all contents to new layer
    var destLayer = newEmptyLayer(srcLayer, destdoc);

    //  is layer bottom aligned?
    var voffset = getVoffset(srcLayer, destdoc.height);

    // copy layer contents to new layer, vertical shifting if necessary
    var workdone = copyAllItems(srcLayer, destLayer, voffset);

    // match old layer quantities
    destLayer.color     = srcLayer.color;
    destLayer.printable = srcLayer.printable;
    destLayer.visible   = srcLayer.visible;

  }
  return workdone;
}

/*———————————————————————————————————————— 1 newEmptyLayer(srcLayer, parentObj){

    creates empty layer

    with correct name, at correct Z-index
    if layer exists, it's deleted & re-created */

function newEmptyLayer(srcLayer, parentObj){

  var layerName = srcLayer.name;

  // returns -1 if layer doesn't exist
  var z = getZandDelete(srcLayer, parentObj);

  var destLayer = parentObj.layers.add();  
  destLayer.name = layerName;

  // if we're not replacing a layer of the same name
  if (!isSublayer(srcLayer) && z<0) z = determineCorrectZ(srcLayer, destLayer);

  setZnew(destLayer,z);
  return destLayer;
}

/*———————————————————————————————————————— 1.1 getZandDelete(srcLayer, destParent){

    given a layer in the source document
    deletes a layer in the destination document
    
    if there was an existing layer in the
    destination document, returns its z index

    if there was no equivalent layer, returns -1 */

function getZandDelete(srcLayer, destParent){

  var name=srcLayer.name;
  try { var oldLayer = destParent.layers.getByName(name);}
  catch (e) { return -1 };

  z = getZindex(oldLayer);

  oldLayer.locked = false;
  oldLayer.visible = true;
  oldLayer.remove();
  return z;
}

/*———————————————————————————————————————— 1.2 determineCorrectZ(srcLayer, destLayer){

    determines correct z index for layer

    top layers stay on top
    bottom layers stay on bottom

    otherwise try to find matching adjacent layers
    otherwise just use existing index

    groups of layers should stay together (not implemented)

    z order starts at 1, not 0
    1 is bottom */

function determineCorrectZ(srcLayer, destLayer){

  var srcZ          = getZindex(srcLayer); // can't get it directly because sublayers

  var srcParent     = srcLayer.parent;
  var destParent    = destLayer.parent;

  var srcLayersLen  = srcParent.layers.length;
  var destLayersLen = destParent.layers.length;

  // if it's same as number of layers, it's on top
  if (srcZ == srcLayersLen) return destLayersLen;

  // if it's 1, it's on bottom
  if (srcZ == 1) return srcZ;

  // otherwise it's in the middle, go by name
  var index     = srcLayersLen - srcZ;
  var aboveName = srcParent.layers[index-1].name;
  var belowName = srcParent.layers[index+1].name;

  // does the aboveName exist in new document?
  var aboveZ = getZbyName(aboveName, destParent);
  var belowZ = getZbyName(belowName, destParent);

  // layers above and below found, no ambiguity
  if (aboveZ > 0 && belowZ > 0) return aboveZ;

  // only layer above found
  if (aboveZ > 0) return aboveZ;
      
  // only layer below found
  if (belowZ > 0) return belowZ + 1;
      
  // no matching layers found, use index
  return srcZ;
}

/*———————————————————————————————————————— 1.3 setZ(layer, newZ){

   set Z index of a layer

   can't send behind an invisible layer because
   that modifies the index of the layer
   and an invisible layer is considered locked

   new layers are created on top, so zOrderPosition will be highest
   however new sublayers may have index 1 if they are alone */

function setZ(layer, newZ){
  var thisZ = layer.zOrderPosition;
  var neighbors = layer.parent.layers.length;

  if (!isSublayer(layer)) while (thisZ > newZ){
    nextIndex = neighbors - thisZ+1;

    var v= layer.parent.layers[nextIndex].visible;
    layer.parent.layers[nextIndex].visible = true;

    sendBackward(layer);
    layer.parent.layers[nextIndex-1].visible = v;

    thisZ -= 1;
  }

  else{
    // sublayers also have pageItems in the z hierarchy
    neighbors = neighbors+layer.parent.pageItems.length;

    alert('Sublayer not positioned correctly');
    //alert(layer.name + ', '+thisZ+':'+newZ);
    // unlockedLayer, 3:2
    // thissublayer, 1:2
    
    // can get this.absoluteZ - parent.absoluteZ?
  }
}

/*———————————————————————————————————————— 1.3 setZnew(layer, newZ){

    set Z index of a layer

    can't send behind an invisible layer because
    that modifies the index of the layer
    and an invisible layer is considered locked

    new layers are created on top, so zOrderPosition will be highest
    however new sublayers may have index 1 if they are alone

    rewriting to use absolute z position for everything, so will work
    with sublayers too */

function setZnew(layer, newZ){
  var thisZ = layer.zOrderPosition;

  if (newZ == thisZ) return true;

  var neighborLayers = layer.parent.layers.length;
	var iters = neighborLayers - newZ + 1;

  for (var x=1; x<iters; x++) sendBackward(layer);

}

/*———————————————————————————————————————— 2 copyAllItems(srcLayer, destLayer, voffset){

    copies all layer items to an existing empty layer
    
    objects will be bottom aligned to document if there
    is any item named "bottom-align"

    similar to copyunlockedlayers() */

function copyAllItems(srcLayer, destLayer, voffset){

  //  function thingsToDraw(layer){
  //  array [abs Z, boolean is item, name, index reference]
    
  var toDraw = thingsToDraw(srcLayer);
  var itemCount = 0;

  for (var x=0; x<toDraw.length; x++){

    var thisItem = toDraw[x];
    var absZordr = thisItem[0];
    var isLayer  = thisItem[1];
    var itemName = thisItem[2];
    var srcIndex = thisItem[3];

    if (isLayer){ // is item
      srcLayer.pageItems[srcIndex].duplicate(destLayer, ElementPlacement.PLACEATBEGINNING);
      
      destLayer.pageItems[itemCount].top += voffset;
//    alert(destLayer.pageItems[itemCount].name + ':' + destLayer.pageItems[itemCount].absoluteZOrderPosition);
      itemCount += 1;
    }

    else{ // is layer
      newSublayer = destLayer.layers.add();
      newSublayer.name = itemName;
      copyAllItems(srcLayer.layers[srcIndex], newSublayer, 0);
//    alert(newSublayer.name + ':' + newSublayer.absoluteZOrderPosition);
    }
  }

  //————————— return results

  return true;
}


//:::::::::::::::::::::::::::::::::::::::: utility functions

/*———————————————————————————————————————— getVoffset(sourceLayer, destDocHeight){

    returns vertical shift of copied
    content if object 'bottom-align' */

function getVoffset(sourceLayer, destDocHeight){
  try{ var shifted = sourceLayer.pageItems.getByName('bottom-align'); }
  catch(e){ return 0; }

  return sourceLayer.parent.height-destDocHeight;
}

/*———————————————————————————————————————— getZbyName(name, parentObj){

    get Z index by layer name from specified parent object

    Z value is relative to layers not pageItems */

function getZbyName(name, parentObj){
  try{ var layer = parentObj.layers.getByName(name); }
  catch(e){ return -1; }
  return layer.zOrderPosition;
}

/*———————————————————————————————————————— getZindex(layer){

   layer.zOrderPosition returns the Z index relative to
   other layers but doesn't take into account pageItems

   For sublayers, which have pageItems above and
   below, the Z index has to be calculated from the
   absolute Z index which is relative to everything */

function getZindex(layer){
  if (!isSublayer(layer)){
    var z = layer.zOrderPosition;
    return z;
  }
  var parentLayer = layer.parent
  var z = parentLayer.absoluteZOrderPosition - layer.absoluteZOrderPosition; 
  return z;
}

/*———————————————————————————————————————— layerslock(docname, bool){

    lock or unlock all layers */

function layersLock(docObj, bool){
  allLayers = docObj.layers;
  for (z = 0; z < allLayers.length; z++)
    allLayers[z].locked = bool;
}

/*———————————————————————————————————————— isSublayer(layer){

    accepts a layer
    returns true if the layer is a sublayer
    returns false if it is a top-level layer */

function isSublayer(layer){
  if (layer.parent.typename == 'Layer') return true;
  else return false;
}

/*———————————————————————————————————————— unlockedLayers(doc){

    returns number of unlocked layers in specified document

*/

function unlockedLayers(doc){
  var unlocked = 0;
  for (var x=0; x<doc.layers.length; x++)
    if (!doc.layers[x].locked && !(doc.layers[x].name.slice(0,1)=='<')) unlocked += 1;
  return unlocked;
}

/*———————————————————————————————————————— sendBackward(layer){

    sends a layer backward

    for sublayers, ZOrderMethod.SENDBACKWARD doesn't work
    so we bring an item behind forward */

function sendBackward(layer){
  if (!isSublayer(layer)) layer.zOrder(ZOrderMethod.SENDBACKWARD);
  else{
    var z = layer.absoluteZOrderPosition;
    var parentLayer = layer.parent;
    var items = parentLayer.pageItems.length;
    for (var x=0; x<items; x++){
      var p = parentLayer.pageItems[x].absoluteZOrderPosition;
      if (p < z){
//      alert('bringing forward '+parentLayer.pageItems[x].name + ', '+parentLayer.pageItems[x].absoluteZOrderPosition);
        parentLayer.pageItems[x].zOrder(ZOrderMethod.BRINGFORWARD);
//      alert('brought forward '+parentLayer.pageItems[x].name + ', '+parentLayer.pageItems[x].absoluteZOrderPosition);
        break;
      }
    }
  }
}

/*———————————————————————————————————————— thingsToDraw(layer){

    http://jongware.mit.edu/idcs6js/pc_Layer.html#duplicate
    so it works, but not if there is a layer in front */

function thingsToDraw(layer){
  
  var allItems = [];
  var sublayerLen = layer.layers.length;
  var itemsLen = layer.pageItems.length;

  for (var x=0; x<sublayerLen; x++)
    allItems.push([layer.layers[x].absoluteZOrderPosition, false, layer.layers[x].name, x]);

  for (var x=0; x<itemsLen; x++)
    allItems.push([layer.pageItems[x].absoluteZOrderPosition, true, layer.pageItems[x].name, x]);

  allItems.sort(function(a,b){return a[0] > b[0]})

  var f = 'R E S U L T S';
  for (var x=0; x<allItems.length; x++) f+= '\n'+allItems[x][0]+':'+allItems[x][1]+':'+allItems[x][2]+':'+allItems[x][3];

  return allItems;
}

/*———————————————————————————————————————— testFunction(){

    http://jongware.mit.edu/idcs6js/pc_Layer.html#duplicate
    so it works, but not if there is a layer in front */

function testFunction(layer){
  
  var allItems = [];
  var sublayerLen = layer.layers.length;
  var itemsLen = layer.pageItems.length;

  for (var x=0; x<sublayerLen; x++)
    allItems.push([layer.layers[x].absoluteZOrderPosition, layer.layers[x].name, 'layer', x]);

  for (var x=0; x<itemsLen; x++)
    allItems.push([layer.pageItems[x].absoluteZOrderPosition, layer.pageItems[x].name, 'pageItem', x]);

  allItems.sort(function(a,b){return a[0] > b[0]})

  var f = 'R E S U L T S';
  for (var x=0; x<allItems.length; x++) f+= '\n'+allItems[x][0]+':'+allItems[x][1]+':'+allItems[x][2]+':'+allItems[x][3];

  return allItems;
}


//:::::::::::::::::::::::::::::::::::::::: fin
