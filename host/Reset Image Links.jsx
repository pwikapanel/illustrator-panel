#target illustrator  

/*———————————————————————————————————————— Reset Image Links.jsx


    github.com/svijasvg/svija-tools
  
    version 2.1.23
  
  	(c) 2021 Svija
  	svija.love
  	contact@svija.love

//———————————————————————————————————————— what it does

*/

var doc = app.activeDocument;

//———————————————————————————————————————— raster images
// before placed, because will be changed to placed then fixed with others

var raster = doc.rasterItems.length;
var rasterFixes = [];

for (var x=raster; x>0; x--){
  var val = rasterItem(doc.rasterItems[x-1]);
  if (val != false) rasterFixes.push(val);
}

//———————————————————————————————————————— placed images

var placed = doc.placedItems.length;
var placedFixes = [];

for (var x=placed; x>0; x--){
  var val = placedItem(doc.placedItems[x-1]);
  if (val != false) placedFixes.push(val);
}

//———————————————————————————————————————— prepare report

// do placedFixes first, make list of names
// when doing rasterFixes, skip any that have names in names list
// [name, fixed boolean, message]

var names = [];
var fixed = [];
var failed = [];

for (var x=0; x<placedFixes.length; x++){
  names.push(placedFixes[x][0]);
  if (placedFixes[x][1]) fixed.push(placedFixes[x][0] + ': ' + placedFixes[x][2]);
  else failed.push(placedFixes[x][0] + ': ' + placedFixes[x][2]);
}

for (var x=0; x<rasterFixes.length; x++){

  var skip = false;
  for (var y=0; y<names.length; y++)
    if (rasterFixes[x][0] == names[y]) skip = true;
  if(skip) continue; 

  if (rasterFixes[x][1]) fixed.push(rasterFixes[x][0] + ': ' + rasterFixes[x][2]);
  else failed.push(rasterFixes[x][0] + ': ' + rasterFixes[x][2]);
}

var repoxt = [];
if (fixed.length>0) repoxt.push('——— FIXED IMAGES ———\n' + fixed.join('\n'));
if (failed.length>0) repoxt.push('——— BROKEN IMAGES ———\n' + failed.join('\n'));

repoxt.push("See Links panel for more information.");
report = decodeURI(repoxt.join('\n\n'));

//———————————————————————————————————————— get out

var treated = fixed.length + failed.length;

doc.selection = null;
if (treated==0) alert('No issues found');
else{
  if (treated == 1) msg = 'One issue found';
  else msg = treated + ' issues found';

  showResults = confirm('View Report?\n' + msg + '\n\nType cmd-period to skip');
  if (showResults) alert('Issues Found:\n' + report);
}

// — — — — — — — — — — — — — — — — — — — —  functions

/*———————————————————————————————————————— make alert rectangle

  create translucent rectangle to signal embedded images
  that can't be found and need to be replaced

*/

function alertRec(obj){
  var alertColor = new RGBColor();
  alertColor.red = 192; alertColor.green = 255; alertColor.blue = 0;
  
  var r = obj.geometricBounds; // coords [left -top right -bottom]

  var rLeft   = r[0];
  var rNegTop = r[1];
  var rWidth  = r[2]-r[0];
  var rHeight = r[1]-r[3];

  // isg81 -top, left, width, height
  var rec = app.activeDocument.activeLayer.pathItems.rectangle( rNegTop, rLeft, rWidth, rHeight );

  rec.filled = true;
  rec.stroked = false;
  rec.fillColor = alertColor;
  rec.opacity = 50;
  return rec;
}

/*———————————————————————————————————————— embedded images

  notes

*/

function rasterItem(obj){
 
  // we don't care about non-printing information layers
  if (!obj.layer.printable) return false;

  app.activeDocument.activeLayer = obj.layer;
  app.activeDocument.activeLayer.visible = true;

	try{
    var newName = obj.file;
    var newFile = new File(newName);
    var fileMissing = false;
	}
	catch(e){ var fileMissing = true; }

  // this is a precaution, not encountered so far
  if (obj.status != 'RasterLinkState.DATAFROMFILE') fileMissing = true;

  if(fileMissing){
    var rec = alertRec(obj);
    var report = 'missing, highlighted';
    if (obj.name == '') var nm = '<image>';
    else var nm = obj.name;
    return [nm, false, report];
  }

  // ————— we have the original file, need to re-link it

  newObj = app.activeDocument.activeLayer.placedItems.add()
  newObj.file = newFile;

  for (var key in obj)
    if (key != 'parent' && key != 'embedded' && key != 'wrapOffset' && key != 'wrapInside')
      newObj[key] = obj[key];
 
  // objects were appearing upside down
  var moveMatrix = app.getScaleMatrix(100,-100);
  var totalMatrix = concatenateRotationMatrix(moveMatrix, 10);
  newObj.transform(moveMatrix);

  // remove the rasterItem
  obj.remove();

  var report = ' file relinked';
  return [newObj.file.name, true, report];

}

/*———————————————————————————————————————— placed images

  image can't be missing unless it
  was moved after document was opened

*/

function placedItem(obj){

  try{ var origFolder = obj.file.path; }
	catch(e){ return false; }

  var currentFolder = Folder(app.activeDocument.path);
  var goodFolder    = currentFolder + '/links';

  if (origFolder == goodFolder) return false;

  var imgName = obj.file.name;
  var destFullName = goodFolder+'/'+imgName;

  // copy if outside of current folder, otherwise move


  var newFile = new File(destFullName);
  if(!newFile.exists) obj.file.copy(newFile);

  // if the file is almost in the right place, just move it
  if (origFolder == currentFolder){
    obj.file.remove();
    var report = 'moved to links';
  }
  else var report = 'copied to links';

  obj.file = newFile;

  return [imgName, true, report];
}

//———————————————————————————————————————— fin
