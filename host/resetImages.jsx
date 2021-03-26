//———————————————————————————————————————— resetImages.jsx

var doc = app.activeDocument;
var placed = doc.placedItems.length;
var raster = doc.rasterItems.length;
var treated = 0;

//———————————————————————————————————————— raster images
// before placed, because will be changed to placed then fixed with others

for (var x=0; x<raster; x++){
  //treated += rasterItem(doc.rasterItems[0]); put back when images are deleted
  treated += rasterItem(doc.rasterItems[x]);
}

//———————————————————————————————————————— placed images

// for (var x=0; x<placed; x++){
//   treated += placedItem(doc.placedItems[0]);
// }

//———————————————————————————————————————— get out

alert(treated + ' issue(s) were corrected');

// — — — — — — — — — — — — — — — — — — — —  functions

/*———————————————————————————————————————— placed images

https://extendscript.docsforadobe.dev/file-system-access/file-object.html#file-class-properties
placedItems isg675
app.activeDocument.placedItems.length
isg537 app.activeDocument.placedItems[index].blendingMode

isg537 for placedItem properties & methods

PlacedItem.contentVariable
PlacedItem.file · readonly
app.activeDocument.placedItems[index].selected
PlacedItem.uRL

methods:

relink: app.activeDocument.placedItems[index].relink(linkFile) returns nothing

if file notin links folder, can copy it easily

*/

function placedItem(obj){
  // check for tiff format (or other than jpg/png)
  var origFolder = obj.file.path;
  var goodFolder = Folder(app.activeDocument.path)+'/links';
  if (origFolder == goodFolder) return 0;


  var imgName = obj.file.name;
  var destFullName = goodFolder+'/'+imgName;

  var newFile = new File(destFullName);
  if(!newFile.exists){
    obj.file.copy(newFile);
  }

  obj.file = newFile;

  return 1;
}

/*———————————————————————————————————————— embedded images

isG749 & isg 561
methods 572
app.activeDocument.rasterItems.length
typename = RasterItem
length = undefined
name = ''

embedded = true
file.name = rasterisedimage.png

obj.file caused crash when file had been deleted

can relink & copy to links if file exists

if original file exists, relink it
otherwise draw a lime square in same place

name is what is attributed in layers panel, that's why it's empty

————— logic

start with an embedded object

create the associated file object

if the file object exists, we have a source
if the file object doesn't exist, need to mark the image somehow

*/

function rasterItem(obj){
//  check  app.activeDocument.rasterItems[index].embedded
//alert(obj.status); // isg 569 & isg131 should return DATAFROMFILE or I can't treat

  app.activeDocument.activeLayer = obj.layer;

	try{
    var newName = obj.file.fullName;
    var newFile = new File(newName);
    var fileMissing = true;
	}
	catch(e){ alert(e);var fileMissing = false; }

  if(fileMissing){
    // when it's working, make smaller with fat stroke
    var r = obj.geometricBounds;
//    alert(r); //69, 108, 223, 27; upper left corner & lower right corner
    //height is 
    var myLine = app.activeDocument.activeLayer.pathItems.rectangle( r[1]-(r[1]-r[3]), r[0], r[2]-r[0], r[3]-r[1] );
    myLine.stroked = true;
    myLine.filled = false;
    var newRGBColor = new RGBColor(); newRGBColor.red = 192; newRGBColor.green = 255; newRGBColor.blue = 0;
    
    myLine.strokeColor = newRGBColor;
    myLine.strokeWidth = 4;
    // isg81 top left width height


    // app.activeDocument.rasterItems[index].controlBounds
    // RasterItem.geometricBounds The bounds of the object excluding stroke width.
    // app.activeDocument.rasterItems[index].zOrderPosition
    //alert('Unfixable item on layer '+app.activeDocument.activeLayer.name);
    return 1;
  }

  return 1
  newObj = app.activeDocument.placedItems.add()
  newObj.file = newFile;

  for (var key in obj) {
    if (key != 'parent' && key != 'embedded' && key != 'wrapOffset' && key != 'wrapInside') newObj[key] = obj[key];
  }
  var moveMatrix = app.getScaleMatrix(100,-100);
  var totalMatrix = concatenateRotationMatrix(moveMatrix, 10);
  newObj.transform(moveMatrix);

  obj.remove();

  return 1;

}

//———————————————————————————————————————— fin
