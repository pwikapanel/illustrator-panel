// functions.jsx
#target illustrator
#targetengine 'whileAIopen'

//---------------------------------------- determine if a document is already open

function docIsOpen(addr){
	for (k=0; k<app.documents.length; k++){
		var nm = encodeURIComponent(app.documents[k].name);
		var thisPath = app.documents[k].path + '/' + nm;
		if(thisPath == addr){ return 'true'; }
	 }
	return addr;
}

//---------------------------------------- functions

function lert(msg){ alert(msg); }

//---------------------------------------- bridgetalk
// https://forums.adobe.com/thread/287542

function btExec(arg,inFunc,outFunc){
	var bt          = new BridgeTalk();
	    bt.body     = inFunc + '("' + arg + '");'; 
	    bt.body    += eval(inFunc).toString()
	    bt.onResult = eval(outFunc);
	    bt.target   = 'illustrator'; 
	    bt.send();
}

//---------------------------------------- fix folder name

function fixFolder(str){
	var cutOff = 50;
	var spaces = 84;
	str = decodeURIComponent(str);
	if (str.length > cutOff){
		str = str.substring(str.length-cutOff, str.length);
		str = removeLeadingSpaces(str);
		str = '...' + str;
	}
	else{
		var ajout = Math.round(spaces/2 - str.length/1.2)
		var padding = '                                                         ';
		str = padding.substring(0,ajout) + str;
	}
	return str;
}

//---------------------------------------- remove leading white spaces

function removeLeadingSpaces(str){
	while (str.substr(0,1) == ' ' && str.length>1) str = str.substring(1,str.length);
	return str;
}

//---------------------------------------- load specified script
// receives arguments, script file to execute
// variable to receive return value & function to excute when done

function loadScript(a,s,v,f){

	var body = 'var args = ' + a.toSource() + ';\n';

	var scptxt = new File(s); scptxt.open("r");
	var script = scptxt.read();
	scptxt.close();

	body += script;

	var bt = new BridgeTalk;
	    bt.target = "illustrator";
	    bt.body   = body;

			bt.onResult = function(resObj) {  
				if (v == '') v = 'var noVariable';
				eval(v +' = resObj.body;' + f);
			}

	    bt.send();
}

//---------------------------------------- update buttons when source changes

// need to check that source has changed, alert if not

function updatePaletteSource(thisPath){
	if (thisPath == 'null'){
		pan2.row0.txt0.text = '.../'; // must match modPalette.jsx
		pan2.row1.btn1.enabled = false;
		pan2.row1.btn0.active  = true;
		return true;
	}

//	interferes with sync button change "working" back to source

//	if (thisPath == librarySource){
//		alert('Source file unchanged.');
//		return true;
//	}

	var pathElements = thisPath.split('/');
	var vileName = pathElements[pathElements.length-1];
	    vileName = decodeURIComponent(vileName);

	pathElements.pop();

	var vileFolder = pathElements.join('/');
			vileFolder = thisPath;
	    vileFolder = fixFolder(vileFolder);

	//pan2.text              = vileName;
	pan2.row0.txt0.text    = vileFolder;
	pan2.row1.btn1.enabled = true;
	pan2.row1.btn1.active  = true;
}

//---------------------------------------- convert \n to return and alert

function escapeAlert(m){
	alert(m.replace(/\\n/g,'\n'));
}

//---------------------------------------- fin
