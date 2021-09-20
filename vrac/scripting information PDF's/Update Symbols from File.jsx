#target illustrator  

//---------------------------------------- update symbols from file

//	description of what it does

//---------------------------------------- credits

//	ozake communication, toulouse france
//	ozake.com
//	contact@ozake.com

//---------------------------------------- resources

//	https://forums.adobe.com/thread/1911253
//	https://stackoverflow.com/questions/31655365/how-to-load-a-symbol-library-in-illustrator-using-javascript/35191849#35191849

//---------------------------------------- messages

var msgSelect   = 'Update Symbols: select symbol source file:';
var msgAll      = 'Exclude unused symbols?\nPress cmd-shift-period to include all symbols.';

var msgCancel   = 'Cancel message not supplied.';
var msgPeriod   = 'Update canceled.';
var msgSrcOpen  = 'Error: source document open.\nScript canceled.';

var msgConflict = '-old already exists.\nUse "undo" to revert.';
var msgDone     = '';
var msgComplete = 'Symbols imported.';
var msgExit     = 'Exit message not supplied.';
var canceled    = false;

//---------------------------------------- list of symbols to delete at the end

var replacedSymbols = [];

//---------------------------------------- get source & verify that it's closed

var symbolSourcePath = File.openDialog(msgSelect);

if(symbolSourcePath == null) {
	canceled = true;
	msgCancel = msgPeriod;
}

else if (docIsOpen(symbolSourcePath)){
	canceled = true;
	msgCancel = msgSrcOpen;
}

//---------------------------------------- cancel or start the program

if (canceled){ alert(msgCancel); } else {

//---------------------------------------- do we import all symbols or used symbols?

	var importAll   = !confirm(msgAll); // exclude unused symbols?
	var sourceDoc   = app.open(File(symbolSourcePath));
	var sourceCount = sourceDoc.symbols.length;

//---------------------------------------- if layers are locked it's a problem

	sourceDoc.activeLayer.locked = false;
	sourceDoc.activeLayer.visible = true;

//---------------------------------------- loop through all open docs except first (symbols)

	var docsOpen = app.documents.length;

	for(docIndex=1; docIndex<docsOpen; docIndex++){ //---------------------------------------- start document loop

		var destDoc  = app.documents[docIndex];

		for (sourceSymbolIndex=0; sourceSymbolIndex<sourceCount; sourceSymbolIndex++){ // start symbol loop
	
			var currentSymbolName = sourceDoc.symbols[sourceSymbolIndex].name;
			var destSymbolIndex   = symbolIn(destDoc, currentSymbolName);

//---------------------------------------- ERROR exit if symbol exists with "-old"

			var oldExists = symbolIn(destDoc, currentSymbolName+'-old');
	
			if (oldExists >= 0){
				msgDone = destDoc.name + ': ' + currentSymbolName + msgConflict;
				sourceSymbolIndex = 99999;
			}
	
//---------------------------------------- symbol exists in both documents, so rename version to delete
	
			else if (destSymbolIndex >= 0){
	
				oldSymbol       = destDoc.symbols[destSymbolIndex];
				oldSymbol.name += '-old';
				replacedSymbols.push(oldSymbol.name);

				currentSymbol   = copySymbol(sourceDoc, sourceSymbolIndex, destDoc);

				replaceOldSymbol(destDoc, currentSymbol);
			}
	
//---------------------------------------- otherwise, only copy if "import all" chosen

			else if (importAll){
				currentSymbol = copySymbol(sourceDoc, sourceSymbolIndex, destDoc);
			}

//---------------------------------------- end symbol & document loops
	
		}

//---------------------------------------- delete all symbols ending in "-old" & end document loop

		deleteSymbols(destDoc, '-old');

	}

//---------------------------------------- close out the program

	sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
	alert(msgComplete+'\n'+msgDone);
}


//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------
//---------------------------------------- FUNCTIONS
//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------


//---------------------------------------- get symbol object by name
// can't fail or everything crashes

function getSymbolByName(doc,nom){
	var r = doc.symbolItems.length;
	for(j=0; j<r; j++){
		var nx = doc.symbolItems[j].symbol.name;
		if (nx == nom){
			return doc.symbolItems[j];
		}
	}
	alert('getSymbolByName failed: '+nom);
}

//---------------------------------------- find all symbolItemss with a given name

//go through doc.symbolItems

function getSymbolItemsByName(doc, n){

	var allMyArt = doc.symbolItems;  
	var toSelect = Array();  

	for ( var i = 0; i < allMyArt.length; i++ ) {  

		// symbol, typename, note, URL, Layer, locked, hidden,selected
		// position,width,height geometric bounds visible bounds control bounds
		// name,blendingMode,opacity,isIsolated,artworkKnockout,zOrderPosition
		// absoluteZOrderPosition,editable,sliced,top,left,visibilityVariable,pixelAligned,wrapped,wrapOffset,wrapInside,parent

		if (allMyArt[i].symbol.name == n){
			toSelect.push(allMyArt[i])
		}
	}  
	return toSelect; 
}

//---------------------------------------- find occurence of symbol in document

function symbolIn(doc, nam){
	for(y=0; y<doc.symbols.length; y++){
		symb = doc.symbols[y].name;
		if (symb == nam) return y;
	}
	return -1;
}

//---------------------------------------- determine if a document is already open

function docIsOpen(addr){
	for (k=0; k<app.documents.length; k++){
		var thisPath = app.documents[k].path + '/' + app.documents[k].name;
		if(thisPath == addr) { return true; }
	}
	return false;
}

//---------------------------------------- 85: go through all symbols and replace those that have this name
	
function replaceOldSymbol(destDoc, currentSymbol){
	var p = destDoc.symbolItems.length;
	
	for(q=0; q<p; q++){
		var f = destDoc.symbolItems[q].symbol.name;
		if (f == currentSymbol.name+'-old'){
			destDoc.symbolItems[q].symbol = currentSymbol;
		}
	}
}

//---------------------------------------- return list of symbol names

//var sourceSymbols = symbolList(sourceDoc.symbols);
//var destSymbols   = symbolList(  destDoc.symbols);

function symbolList(syms){
	var results = '';
	var l = syms.length;
	for (x=0; x<l; x++){
		results += ' "'+syms[x].name+'" ';
	}
	if (results == '') return 'empty';
	else return results;
}

//---------------------------------------- delete previous symbols

function deleteOldSymbols(){
				try{ oldSymbol.remove(); }

				// ugly solution for a symbol used in another symbol
				// would be better to add offending symbol to end of a
				// removal list, to remove parent symbol first

				catch(err){
					msgDone = 'nested symbol: '+ oldSymbol.name + '\n' + msgDone;
				}
}

//---------------------------------------- copy symbol from source doc to dest doc, return dest symbol

function copySymbol(sourceDoc, sourceSymbolIndex, destDoc){

	var lockLayer = false;
	var hideLayer = false;

	if (destDoc.activeLayer.locked == true){
		destDoc.activeLayer.locked = false;
		lockLayer = true;
	}

	if (destDoc.activeLayer.visible == false){
		destDoc.activeLayer.visible = true;
		hideLayer = true;
	}

	var currentSymbol     = sourceDoc.symbols[sourceSymbolIndex];     // get symbol to copy

// check if the symbol already exists (with " 2" at the end)
// this means that it was already copied as part of another symbol

	var namePlusTwo = currentSymbol.name + ' 2';
	var placeFound = symbolIn(destDoc, namePlusTwo);

	if (placeFound >= 0) {
		destDoc.symbols[placeFound].name = currentSymbol.name;
		return destDoc.symbols[placeFound];
	}

	// it is necessary to copy symbol instance from source doc to dest doc

	var currentSymbolItem = sourceDoc.symbolItems.add(currentSymbol); // add an instance to the source doc

	// this appends a 2 to the symbol name for unknown reasons
	var symbolItemCopy    = currentSymbolItem.duplicate(destDoc);     // copy the instance to the dest doc
//alert(symbolItemCopy.symbol);
	    symbolItemCopy.remove();                                      // delete dest instance now that it's in the list
	    currentSymbolItem.remove();

	if (lockLayer) { destDoc.activeLayer.locked = true; }
	if (hideLayer) { destDoc.activeLayer.visible = false; }

//alert(destDoc.symbols[destDoc.symbols.length-1].name);
	return destDoc.symbols[destDoc.symbols.length-1];                 // return last symbol in list
}

//---------------------------------------- delete all symbols ending in "-old"

function deleteSymbols(whichDoc, endStr){
	for (destSymbolIndex=0; destSymbolIndex < whichDoc.symbols.length; destSymbolIndex++){
		var naame = whichDoc.symbols[destSymbolIndex].name;
		if (naame.substr(-4) == endStr){
			whichDoc.symbols[destSymbolIndex].remove();
			destSymbolIndex -= 1;
		}
	}
}

//---------------------------------------- fin
