#target illustrator  

/*———————————————————————————————————————— Propagate Layers.jsx

    github.com/svijasvg/svija-tools
  
    version 2.1.23
  
  	(c) 2021 Svija
  	svija.love
  	contact@svija.love

//———————————————————————————————————————— what it does

  	recursive delete in case multiple layers share same name
  	if I copy to empty document, results should stay in correct order

   	copies all unlocked layers from the active document to all other documents

  	the top left corner of the document is set to illustrator's default
  	top left corner. Rulers have no effect, and destination
  	documents should have the top left corner in the default place
  	7711 in from top left corner of workspace
  	7914 down from top left corner of workspace

  	does NOT copy sublayers
  	to keep a layer bottom-aligned, add a guide rectangle somewhere called "align-bottom"

  	uses 'Print' in the layer options as a proxy for template,
  	since scripting does not support a template boolean

//———————————————————————————————————————— future additions

  	need to recursively copy sublayers

//———————————————————————————————————————— iterate for all open documents */

var msgConfirm = 'Is the correct document active?\n' +
				 'Press cmd-shift-period to cancel.\n\n' +
				 'To bottom align a layer add any object\nnamed "align-bottom" to it.\n';

var msgComplete = ' completed';
var msgNoChange = 'No changes made.';
var msgCopied = 'Layers copied\nUnlocked layer source:';

var sourceDoc    = app.activeDocument;
var openDocs     = app.documents.length;
var didSomething = false;
var messages     = [];

var cont = confirm(msgConfirm);
//var cont = true;

var docRef = app.activeDocument;
 
if (cont) {

	// iterate through all open documents
	for (i = openDocs-1 ; i > 0; i--){
		var destDoc = app.documents[i];

		lockLayers(destDoc, false);
		copyUnlockedLayers(sourceDoc, destDoc);
		lockLayers(destDoc, true);
		//alert(destDoc.name+msgComplete);
	}

	if (didSomething == true){
		text = messages.join ("\n");
		alert(msgCopied + ' "'+sourceDoc.name+'"\n\n' + text);
	}
	else
		alert(msgNoChange);
}

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  functions

//———————————————————————————————————————— lock or unlock all layers

function lockLayers(docName, val){
	allLayers = docName.layers;
	for (z = 0; z < allLayers.length; z++){
  	myLayer = allLayers[z];
  	myLayer.locked = val;
	}
}

//———————————————————————————————————————— copy unlocked layers from first doc to second
//	need to copy sublayers

function copyUnlockedLayers(sourceDoc, destDoc){
	
	var howMany = sourceDoc.layers.length;

	for(q = 0; q < howMany; q++){
		var sourceLayer = sourceDoc.layers[q];
		if (sourceLayer.locked == true) continue;

		// create destination layer & copy all contents to new layer
		var destLayer = createDuplicateLayer(sourceLayer, destDoc);

		//	is layer bottom aligned?
		vShift = getShift(sourceLayer, destDoc);

		// copy layer contents to new layer, shifting if necessary
		didSomething = copyAllItems(sourceLayer, destLayer, vShift);

		// match old layer quantities
		destLayer.color     = sourceLayer.color;
		destLayer.printable = sourceLayer.printable;
		destLayer.visible   = sourceLayer.visible;
	}
}

//———————————————————————————————————————— get Z index by layer name from specified document

function getZbyName(name, doc){
	try{
		var layer = doc.layers.getByName(name);
		return layer.zOrderPosition;
	}
	catch(e){
		return -1;
	}
}

//———————————————————————————————————————— creates specified layer in new doc, sans contents

function createDuplicateLayer(sourceLayer, destDoc){

	// delete layer if it exists, then create new layer
	var prevZ = getZandDelete(sourceLayer.name, destDoc);
	var destLayer = destDoc.layers.add();  
	destLayer.name      = sourceLayer.name;

	// match old layer position
	matchZindex(sourceLayer, destLayer, prevZ);

	return destLayer;
}

//———————————————————————————————————————— delete a named layer

function getZandDelete(name, doc){
	try {  
		var destLayer = doc.layers.getByName(name);
		z = destLayer.zOrderPosition
		destLayer.locked = false;
		destLayer.visible = true; // not visible is considered locked
		destLayer.remove();
		return z;
	}
	catch (e) {
		return -1
	};  
}

//———————————————————————————————————————— creates specified layer in new doc, sans contents

function matchZindex(sourceLayer, destLayer, prevZ){

	// if layer already existed, keep Z index
	if (prevZ > 0){
//		messages.push('- Layer "' + sourceLayer.name + '" already existed');
		setZ(destLayer,prevZ);
		return true;
	}

	var oldZ              = sourceLayer.zOrderPosition;

	var sourceDoc         = sourceLayer.parent;
	var sourceTotalLayers = sourceDoc.layers.length;

	var destDoc           = destLayer.parent;
	var destTotalLayers   = destDoc.layers.length;

	// if it's same as number of layers, it's on top
	if (oldZ == sourceTotalLayers){
		messages.push('"' + sourceLayer.name + '" added as top layer of ' + destDoc.name);
		return true;
	}

	// if it's 1, it's on bottom
	if (oldZ == 1){
		messages.push('"' + sourceLayer.name + '" added as bottom layer of ' + destDoc.name);
		setZ(destLayer,1);
		return true;
	}

	// otherwise it's in the middle, go by name
	var index = sourceTotalLayers - oldZ;
	var aboveName = sourceDoc.layers[index-1].name;
	var belowName = sourceDoc.layers[index+1].name;

	// does the aboveName exist in new document?
	var aboveZ = getZbyName(aboveName, destDoc);
	var belowZ = getZbyName(belowName, destDoc);

	// layers above and below found, no ambiguity
	if (aboveZ > 0 && belowZ > 0){
			setZ(destLayer, aboveZ);
			return true;
	}

	// no exact placement possible
	messages.push('verify layer "' + sourceLayer.name + '" in ' + destDoc.name);
	
	// only layer above found
	if (aboveZ > 0){
		setZ(destLayer, aboveZ);
		return true;
	}
			
	// only layer below found
	if (belowZ > 0){
		setZ(destLayer, belowZ + 1);
		return true;
	}
			
	// no matching layers found, use index
	setZ(destLayer, oldZ);
	return true;
}

//———————————————————————————————————————— copy all layer elements

function copyAllItems(sourceLayer, destLayer, vShift){

	var iterations = sourceLayer.pageItems.length;

	for (var y = 0; y < iterations; y++) {  
		sourceLayer.pageItems[y].duplicate(destLayer, ElementPlacement.PLACEATEND);
		destLayer.pageItems[y].top += vShift;
	}

	return true;
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

//———————————————————————————————————————— returns vertical shift of copied content (sublayer called '<Bottom Align>')

// UNUSED KEEP FOR INFO ONLY
function XgetShift(sourceLayer, destDoc){

	var hasText = sourceLayer.textFrames.length;
	if (hasText == 0) return 0; // not bottom aligned

	for (x=0; x < hasText; x++){
		if (sourceLayer.textFrames[x].contents == 'align-bottom'){
			messages.push('Layer "' + sourceLayer.name + '" is bottom-aligned.');
			return sourceLayer.parent.height-destDoc.height;
		}
	}
	
	return 0;
}

//———————————————————————————————————————— returns vertical shift of copied content (sublayer called '<Bottom Align>')

function getShift(sourceLayer, destDoc){

	try{
		isShifted = sourceLayer.pageItems.getByName('align-bottom');
		return sourceLayer.parent.height-destDoc.height;
	} catch(e) { return 0; }
}

//———————————————————————————————————————— fin
