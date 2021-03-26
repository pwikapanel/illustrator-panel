//———————————————————————————————————————— resetImages.jsx

var doc = app.activeDocument;
var placed = doc.placedItems.length;
var raster = doc.rasterItems.length;
var treated = 0;

//———————————————————————————————————————— raster images
// before placed, because will be changed to placed then fixed with others

for (var x=raster; x>0; x--)
  treated += rasterItem(doc.rasterItems[x-1]);

//———————————————————————————————————————— placed images

for (var x=placed; x>0; x--)
  treated += placedItem(doc.placedItems[x-1]);

//———————————————————————————————————————— get out

doc.selection = null;
alert(treated + ' issue(s) were corrected');

// — — — — — — — — — — — — — — — — — — — —  functions

/*———————————————————————————————————————— placed images

  notes

*/

function placedItem(obj){

  var origFolder = obj.file.path;
  var goodFolder = Folder(app.activeDocument.path)+'/links';
  if (origFolder == goodFolder) return 0;

  var imgName = obj.file.name;
  var destFullName = goodFolder+'/'+imgName;

  var newFile = new File(destFullName);
  if(!newFile.exists) obj.file.copy(newFile);
  obj.file = newFile;

  return 1;
}

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
  //  alert(obj.embedded); // always true so far
 
  // we don't care about non-printing information layers
  if (!obj.layer.printable) return 0;

  app.activeDocument.activeLayer = obj.layer;
  app.activeDocument.activeLayer.visible = true;

	try{
    var str = obj.file;
    var newName = obj.file;
    var newFile = new File(newName);
    var fileMissing = false;
	}
	catch(e){ var fileMissing = true; }

  // this is a precaution, not encountered so far
  if (obj.status != 'RasterLinkState.DATAFROMFILE') fileMissing = true;

  if(fileMissing){ var rec = alertRec(obj); return 1; }

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

  return 1;

}

//———————————————————————————————————————— fin
