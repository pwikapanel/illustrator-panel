#target illustrator  

//---------------------------------------- update text styles from file

//	updates character styles in open documents from a specified
//	source file. The user has a choice of updating styles that are used in
//	the document or importing all styles from the source document.

//	stroked text has stroke removed because there's no way to know
//	if a style has noColor for stroke (AI lies)

//---------------------------------------- 

//	copyright 2017 © Ozaké Communication
//	ozake.com · contact@ozake.com ·	+33 618-260-961

//---------------------------------------- messages

var msgSelect  = 'Select Character Style source file:';
var msgAll	   = 'Exclude unused styles?\nPress cmd-shift-period to include all styles.';
var msgDone	   = 'Styles imported.';

var msgNoFile  = 'Update canceled.';
var msgSrcOpen = 'Error: source document open.\nScript canceled.';

//---------------------------------------- dialog boxes

var CSpath = File.openDialog(msgSelect); // get source of Character Styles

	   if (CSpath == null)   { alert(msgNoFile);  } // cancel if the user didn't choose file
else if (docIsOpen(CSpath)){ alert(msgSrcOpen); } // verify that source file is closed
else {

//---------------------------------------- do we import all styles or used styles?

	var exclUnused = confirm(msgAll);
	var sourceDoc  = app.open(File(CSpath));
	var srcCScount = sourceDoc.characterStyles.length;

//---------------------------------------- loop through open docs except doc[0], style source

	var docs = app.documents.length;

	for(docIndex=1; docIndex<docs; docIndex++){

//---------------------------------------- for each document

		var destDoc  = app.documents[docIndex];

		for (i=0; i<srcCScount; i++){ // start style loop

			var currentCS	 = sourceDoc.characterStyles[i]; 
			var currentCSName = currentCS.name;
			var destCS = null;

			try { // style exists

				destCS = destDoc.characterStyles.getByName(currentCSName);

			} catch(err) { // style doesn't already exist

        if (!exclUnused){
          destDoc.characterStyles.add(currentCSName);
          destCS = destDoc.characterStyles.getByName(currentCSName);
        }
			}

			if (destCS){ updateStyle(currentCS, destCS); }
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

//---------------------------------------- update destCS based on currentCS
	
function updateStyle(currentCS, destCS){
  // bug in Illustrator, stroke color is not reported correctly
  var noColor = new NoColor();

	if (currentCS.name.substr(0,1) == '[') return true; // exclude default style


	var csca = currentCS.characterAttributes;




// left blank to match para styles script




	//----- character styles
	// doesn't work for unstroked text (noColor is not correctly applied)
	// Robot 15/23/11

	for (var prop in csca) {
		var attr = null;
		try{ attr = csca[prop]; } catch(err){}
		if (attr){
			if (prop == 'strokeColor') destCS.characterAttributes[prop] = noColor;
			else destCS.characterAttributes[prop] = attr;
		} else {
			try{ attr = destCS.characterAttributes[prop]; } catch(err){}
			if (attr) destCS.characterAttributes[prop] = sourceDoc.characterStyles[0][prop]; // set to default
		}
	}
}
	
//---------------------------------------- fin
