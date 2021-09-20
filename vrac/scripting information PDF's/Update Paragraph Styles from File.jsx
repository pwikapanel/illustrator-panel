#target illustrator  

//---------------------------------------- update text styles from file

//	updates paragraph styles in open documents from a specified
//	source file. The user has a choice of updating styles that are used in
//	the document or importing all styles from the source document.

//	because AI doesn't correctly report stroke color, any stroked text styles
//	are changed to noColor

//---------------------------------------- 

//	copyright 2017 © Ozaké Communication
//	ozake.com · contact@ozake.com ·	+33 618-260-961

//---------------------------------------- messages

var msgSelect  = 'Select Paragraph Style source file:';
var msgAll	   = 'Exclude unused styles?\nPress cmd-shift-period to include all styles.';
var msgDone	   = 'Styles imported.';

var msgNoFile  = 'Update canceled.';
var msgSrcOpen = 'Error: source document open.\nScript canceled.';

//---------------------------------------- dialog boxes

var PSpath = File.openDialog(msgSelect); // get source of Paragraph Styles

	   if (PSpath == null)   { alert(msgNoFile);  } // cancel if the user didn't choose file
else if (docIsOpen(PSpath)){ alert(msgSrcOpen); } // verify that source file is closed
else {

//---------------------------------------- do we import all styles or used styles?

	var exclUnused = confirm(msgAll);
	var sourceDoc  = app.open(File(PSpath));
	var srcPScount = sourceDoc.paragraphStyles.length;

//---------------------------------------- loop through open docs except doc[0], style source

	var docs = app.documents.length;

	for(docIndex=1; docIndex<docs; docIndex++){

//---------------------------------------- for each document

		var destDoc  = app.documents[docIndex];

		for (i=0; i<srcPScount; i++){ // start style loop

			var currentPS	 = sourceDoc.paragraphStyles[i]; 
			var currentPSName = currentPS.name;
			var destPS = null;

			try { // style exists

				destPS = destDoc.paragraphStyles.getByName(currentPSName);

			} catch(err) { // style doesn't already exist

				if (!exclUnused){
					destDoc.paragraphStyles.add(currentPSName);
					destPS = destDoc.paragraphStyles.getByName(currentPSName);
				}
			}

			if (destPS){ updateStyle(currentPS, destPS); }
		}

//---------------------------------------- terminate program

	} // close document loop
	
	sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
	alert(msgDone);
}

//--------------------------------------------------------------------------------

//---------------------------------------- determine if a document is already open

function docIsOpen(addr){
	for (k=0; k<app.documents.length; k++){
		var thisPath = app.documents[k].path + '/' + app.documents[k].name;
		if(thisPath == addr) { return true; }
	}
	return false;
}

//---------------------------------------- update destPS based on currentPS
	
function updateStyle(currentPS, destPS){
	// bug in Illustrator, stroke color is not reported correctly
	var noColor = new NoColor();

	if (currentPS.name.substr(0,1) == '[') return true; // exclude default style

	var pspa = currentPS.paragraphAttributes;
	var csca = currentPS.characterAttributes;

	//----- paragraph styles

	for (var prop in pspa) {
		var attr = null;
		try{ attr = pspa[prop]; } catch(err){}
		if (attr){ destPS.paragraphAttributes[prop] = attr; }
	}

	//----- character styles
	// doesn't work for unstroked text (noColor is not correctly applied)
	// Robot 15/23/11

	for (var prop in csca) {
		var attr = null;
		try{ attr = csca[prop]; } catch(err){}
		if (attr){
			if (prop == 'strokeColor') destPS.characterAttributes[prop] = noColor;
			else destPS.characterAttributes[prop] = attr;
		} else {
			try{ attr = destPS.characterAttributes[prop]; } catch(err){}
			if (attr) destPS.characterAttributes[prop] = sourceDoc.characterStyles[0][prop]; // set to default
		}
	}
}
	
//---------------------------------------- fin
