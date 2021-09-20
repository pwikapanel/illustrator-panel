// Svija Tools.jsx
#target illustrator
#targetengine 'whileAIopen'
$.level = 2; // full debugging

var ip = new File($.fileName); var scriptsFolder = ip.path;
function incScript(sn){File(scriptsFolder + '/' + sn).execute(); }

//---------------------------------------- global variables

var paletteName = 'Resource Sharing Tools';
var svijaFolder = 'Svija Tools';
var librarySource = null;

//---------------------------------------- load functions & palette

incScript(svijaFolder+'/modFunctions.jsx');
incScript(svijaFolder+'/modPalette.jsx');

//---------------------------------------- bridgetalk stuff
//https://forums.adobe.com/thread/1243877

var msgSelect  = 'Select styles source file:';
var msgSrcOpen = 'Error: source document open.';

//---------------------------------------------------------------------------------
//---------------------------------------- each function corresponds to a button
//---------------------------------------- one function to excute immediately
//---------------------------------------- one function to excute when done
//---------------------------------------------------------------------------------

//---------------------------------------- logo

function logoClick(){
	var file = new File(scriptsFolder+svijaFolder+'/logo.url');  
	if (file.exists) file.execute();  
}

//---------------------------------------- select source

function buttonSource(){
	var args = {}
	var scriptPath = scriptsFolder+'/'+svijaFolder+'/modSelect.jsx';
	var returnVar = 'newSource';
	var doneFunction = 'buttonSourceDone();';
	loadScript(args, scriptPath, returnVar, doneFunction);
}

function buttonSourceDone(){
	updatePaletteSource(newSource);
	librarySource = newSource;
}

//---------------------------------------- synchronize
// verify that at least one checkbox is checked
//if (!params.chrs && !params.para && !params.symb){
//	msg = msgNothing;
//	contnue = false;
//}

function buttonSync(){
	pan2.row0.txt0.text = 'working...';

	var args = {
		file: pan0.rad0.value,
		conf: pan0.cbx0.value,
		chrs: pan1.row0.cbx0.value,
		para: pan1.row0.cbx1.value,
		symb: pan1.row0.cbx2.value,
		unus: pan1.row1.rad0.value,
		srce: librarySource}
	var scriptPath = scriptsFolder+'/'+svijaFolder+'/modSynchronize.jsx';
	var returnVar = 'msg';
	var doneFunction = 'buttonSyncDone();';
	loadScript(args, scriptPath, returnVar, doneFunction);
}

function buttonSyncDone(){
	updatePaletteSource(librarySource);
	app.beep(); // has to be before alert
	escapeAlert(msg);
}

//---------------------------------------- fin
