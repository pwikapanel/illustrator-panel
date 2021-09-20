// modSynchronize.jsx
// https://forums.adobe.com/thread/1991539

//---------------------------------------- parameters passed from palette

//		file: pan0.rad0.value,
//		conf: pan0.cbx0.value,
//		chrs: pan1.row0.cbx0.value,
//		para: pan1.row0.cbx1.value,
//		symb: pan1.row0.cbx2.value,
//		unus: pan1.row1.rad0.value,
//		srce: librarySource}

var params = eval(args);

var msg = '';
var msgConfirm = 'Are you sure?';
var msgCanceled = 'Operation canceled.';

//---------------------------------------- confirm if necessary

var canceled = false;

if (params.conf == true)
canceled = !confirm(msgConfirm);

if(canceled){ r = msgCanceled; }

else { // begin main if loop ------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------

if (params.chrs == true){ msg += '\n√ characters'; }
if (params.para == true){ msg += '\n√ paragraphs'; }
if (params.symb == true){ msg += '\n√ symbols';    }

msg += '\n';

if (params.unus == true){ msg += '\nunused resources were included'; } else {msg += '\nunused resources were excluded'}
if (params.file == true){ msg += '\nfile was updated'; } else {msg += '\nopen documents were updated'}

//---------------------------------------- open source document 
// active document is always 0 on stack

//app.open(File(params.srce));

//---------------------------------------- source doc index & array of dest doc indices

// this is not necessary, because I can just use the numbers.
// still, it might be the cleanest, avoids flags

//if (params.file == false){// file to update: open documents
//	var sourceDoc = 0;
//	var destDocs = [];
//  var i = app.documents.length;
//	for (x=1; x<i; x++){
//		destDocs.push(x);
//	}
//	msg += msgOpenSyn;
//}
//else{ // file to update: library file
//	var sourceDoc = 1;
//	var destDocs  = [0];
//	msg += msgFileSyn;
//}

//---------------------------------------- next steps...


// if an already-open doc will be modified, I need to save, close & reopen it or revert, or undo all changes

//var docs = destDocs.length;
//
//for(var docIndex=0; docIndex<docs; docIndex++){
//	var thisIndex = destDocs[docIndex];
//	var destDoc  = app.documents[thisIndex];
//
//	msg += ' '+destDoc.name+' ';

//------------------------------------------------------------------------------------------------------------------------
//}



//---------------------------------------- close source document

// if the source was updated, we save changes. Otherwise not.

//if (params.file == true){
//	app.documents[0].close(SaveOptions.SAVECHANGES);
//	msg += msgScSaved;
//}
//else{
//	app.documents[sourceDoc].close(SaveOptions.DONOTSAVECHANGES);
//	msg += msgScNtSvd;
//}

//---------------------------------------- finish

//var msg += 'successfully completed';
//r = msg;

//---------------------------------------- whole thing was canceled


////------------------------------------------------------------------------------------------------------------------------
////---------------------------------------- determine if a document is already open
//
//function docIsOpen(addr){
//	for (k=0; k<app.documents.length; k++){
//		var nm = encodeURIComponent(app.documents[k].name);
//		var thisPath = app.documents[k].path + '/' + nm;
//		if(thisPath == addr){ return 'true'; }
//	 }
//	return addr;
//}
////---------------------------------------- dialog boxes
//
//var selectedPath = File.openDialog(msgSelect); // get source of Character Styles
//
////---------------------------------------- validate path
//
//	if (selectedPath == null){ // cancel if the user didn't choose file
//	 	alert(msgNoFile);
//	}
//
//	else if (docIsOpen(selectedPath)){ // verify that source file is closed
//		alert(msgSrcOpen);
//		selectedPath = null;
//	}
//
//libraryPath  = selectedPath;
//
//
r = 'Operation Completed\n' + msg;

} // end main if loop ------------------------------------------------------------------------------------------------------------------------

//---------------------------------------- fin
