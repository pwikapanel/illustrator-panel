//———————————————————————————————————————— resetImages.jsx

var doc = app.activeDocument;
var placed = doc.placedItems.length;
var raster = doc.rasterItems.length;

//———————————————————————————————————————— raster images
// before placed, because will be changed to placed then fixed with others

var rasterFixes = [];

for (var x=raster; x>0; x--){
  var val = rasterItem(doc.rasterItems[x-1]);
  if (val !='') rasterFixes.push(val);
}

//———————————————————————————————————————— placed images

var placedFixes = [];

for (var x=placed; x>0; x--){
  var val = placedItem(doc.placedItems[x-1]);
  if (val !='') placedFixes.push(val);
}

//———————————————————————————————————————— get out

var treated = rasterFixes.length + placedFixes.length;

doc.selection = null;
if (treated==0) alert('No issues found');
else{
  if (treated == 1) msg = 'One image fixed';
  else msg = treated + ' images fixed';

  showResults = confirm(msg + '\nView report (or cmd-period)?');

  if (showResults){
    var report = rasterFixes.join('\n') + '\n' + placedFixes.join('\n');
    report += "\n\nSee Links panel for more information."
    report = decodeURI(report);
    alert('Issues Found:\n' + report);
  }
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
    var report = 'The original for embedded image "' + obj.name + '" on layer "' + obj.layer.name + '" was not found';
    return report;
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

  var report = newObj.file.name + ' file relinked';
  return report;

}

/*———————————————————————————————————————— placed images

  image can't be missing unless it
  was moved after document was opened

*/

function placedItem(obj){

  try{ var origFolder = obj.file.path; }
	catch(e){ return false; }

  var goodFolder = Folder(app.activeDocument.path)+'/links';
  if (origFolder == goodFolder) return false;

  var imgName = obj.file.name;
  var destFullName = goodFolder+'/'+imgName;

  var newFile = new File(destFullName);
  if(!newFile.exists) obj.file.copy(newFile);
  obj.file = newFile;

  var report = imgName + ' put in links folder';
  return report;
}

//———————————————————————————————————————— fin
