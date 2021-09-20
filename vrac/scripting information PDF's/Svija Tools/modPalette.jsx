#target illustrator
#targetengine 'whileAIopen'
// palette.jsx

//---------------------------------------- create palette

palette = new Window( "palette", paletteName);

var palSize = [380, 390];

palette.orientation = "column";
palette.alignChildren = ["fill", "fill"];
palette.size = palSize;

//---------------------------------------- collapse window

palette.onDeactivate = function(){ palette.size = [247, 0]; }
palette.onActivate   = function(){ palette.size = palSize; }

// code formatting tips: https://forums.adobe.com/thread/1113367

//---------------------------------------- module: logo

var imgPath = scriptPath+'/'+filesFolder+'/logo.png';  
var img = new File (imgPath);  
logo = palette.add ('image', [0,0,366,95], img);
logo.helpTip = 'Script by Andrew Swift at Ozaké Communications. Click to visit us!';
logo.addEventListener('click',logoClick,false);

//---------------------------------------- module: files to update

var pan0 = palette.add('panel', undefined, 'Files to Update');

pan0.rad0 = pan0.add ('radiobutton', undefined, 'File on Disk');
pan0.rad1 = pan0.add ('radiobutton', undefined, 'Open Documents');
pan0.cbx0  = pan0.add ('checkbox',    undefined, 'Confirm?');

pan0.margins = [10, 15, 10, 6];
pan0.orientation = 'row';
pan0.alignChildren = ['fill', 'fill'];

pan0.rad0.value = false;
pan0.rad1.value = true;
pan0.cbx0.value  = false;

pan0.rad0.helpTip = 'Update library file from active document';
pan0.rad1.helpTip = 'Update open documents from library file';
pan0.cbx0.helpTip = 'No undo is possible - confirm each synchronization?';

//---------------------------------------- module: elements to update

var pan1 = palette.add('panel', undefined, 'Resources to Update');

pan1.margins = [10, 15, 10, 6];
pan1.orientation = 'column';

pan1.row0 = pan1.add('group', undefined,);
pan1.row1 = pan1.add('group', undefined);

pan1.row0.cbx0 = pan1.row0.add ('checkbox', undefined, 'Character Styles');
pan1.row0.cbx1 = pan1.row0.add ('checkbox', undefined, 'Paragraph Styles');
pan1.row0.cbx2 = pan1.row0.add ('checkbox', undefined, 'Symbols');
pan1.row1.rad0 = pan1.row1.add ('radiobutton', undefined, 'Update Unused');
pan1.row1.rad1 = pan1.row1.add ('radiobutton', undefined, 'Exclude Unused');

pan1.row0.cbx0.value = false;
pan1.row0.cbx1.value = false;
pan1.row0.cbx2.value = false;
pan1.row1.rad0.value = false;
pan1.row1.rad1.value = true; 

pan1.row0.cbx0.helpTip = 'Update Character Styles';
pan1.row0.cbx1.helpTip = 'Update Paragraph Styles';
pan1.row0.cbx2.helpTip = 'Update Symbols';
pan1.row1.rad0.helpTip = 'Include all elements from the source document';
pan1.row1.rad1.helpTip = 'Exlude elements that are not used in destination document(s).';

//---------------------------------------- choice of source file

var pan2 = palette.add('panel', undefined, 'File on Disk');

pan2.row0 = pan2.add('group', undefined,);
pan2.row1 = pan2.add('group', undefined,);

pan2.row0.txt0 = pan2.row0.add('statictext', undefined, '/...');
pan2.row1.btn0 = pan2.row1.add('button', undefined, 'Select Source');
pan2.row1.btn1 = pan2.row1.add('button', undefined, 'Syncronize');

pan2.row0.margins  = [0, 9, 0, 6];
pan2.alignChildren = 'center';
pan2.row0.txt0.preferredSize.width = 320;

pan2.row0.txt0.helpTip = '/Applications/Adobe\ Illustrator\ CC\ 2017/Presets.localized/en_US/Scripts/Library\ Tools.jsx';
pan2.row1.btn0.helpTip = 'Choose source file to synchronize';
pan2.row1.btn1.helpTip = 'Synchronize according to the above preferences';

pan2.row1.btn0.onClick = buttonSource;
pan2.row1.btn1.onClick = buttonSync;

pan2.row1.btn0.active  = true;
pan2.row1.btn1.enabled = false;

//---------------------------------------- show the palette

palette.show();

//---------------------------------------- fin
