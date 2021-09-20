// selectSource.jsx
// https://forums.adobe.com/thread/1991539

//---------------------------------------- update text styles from file

//	updates character styles in open documents from a specified
//	source file. The user has a choice of updating styles that are used in
//	the document or importing all styles from the source document.

//---------------------------------------- 

//	copyright 2017 © Ozaké Communication
//	ozake.com · contact@ozake.com ·	+33 618-260-961

//---------------------------------------- dialog boxes

var msgSelect  = 'Select resources file:';
var msgNoFile  = 'Selection canceled.';
var msgSrcOpen = 'Error: source document open.';

//---------------------------------------- dialog boxes

var selectedPath = File.openDialog(msgSelect); // get source of Character Styles

//---------------------------------------- validate path

if (selectedPath == null){ // cancel if the user didn't choose file
 	alert(msgNoFile);
} 

else if (docIsOpen(selectedPath)){ // verify that source file is closed
	alert(msgSrcOpen);
	selectedPath = null;
}

libraryPath  = selectedPath;

//---------------------------------------- determine if a document is already open

function docIsOpen(newPt){
	for (k=0; k<app.documents.length; k++){
		var nm = encodeURIComponent(app.documents[k].name);
		var pt = app.documents[k].path + '/' + nm;
		if(pt == newPt){ return 'true'; }
	 }
	return false;
}

//---------------------------------------- fin
