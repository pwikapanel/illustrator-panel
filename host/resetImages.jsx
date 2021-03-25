//———————————————————————————————————————— resetImages.jsx

var doc = app.activeDocument;
var placed = doc.placedItems.length;
var raster = doc.rasterItems.length;
var treated = 0;

//———————————————————————————————————————— raster images
// before placed, because will be changed to placed then fixed with others

alert(raster + ' rasterItems to fix');
for (var x=0; x<raster; x++){
  treated += rasterItem(doc.rasterItems[0]);
}

//———————————————————————————————————————— placed images

for (var x=0; x<placed; x++){
  treated += placedItem(doc.placedItems[0]);
}





//———————————————————————————————————————— fin

alert(treated + ' issue(s) were corrected');

// — — — — — — — — — — — — — — — — — — — —  functions

//———————————————————————————————————————— placed images

// https://extendscript.docsforadobe.dev/file-system-access/file-object.html#file-class-properties
// placedItems isg675
// app.activeDocument.placedItems.length
// isg537 app.activeDocument.placedItems[index].blendingMode

// isg537 for placedItem properties & methods

// PlacedItem.contentVariable
// PlacedItem.file · readonly
// app.activeDocument.placedItems[index].selected
// PlacedItem.uRL

// methods:

// relink: app.activeDocument.placedItems[index].relink(linkFile) returns nothing

// if file notin links folder, can copy it easily

function placedItem(obj){
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

//———————————————————————————————————————— embedded images

// isG749 & isg 561
// methods 572
// app.activeDocument.rasterItems.length
// typename = undefined
// length = undefined
// name = ''

// embedded = true
// file.name = rasterisedimage.png

// obj.file caused crash when file had been deleted

// can relink & copy to links if file exists

// if original file exists, relink it
// otherwise draw a lime square in same place

// name is what is attributed in layers panel, that's why it's empty

function rasterItem(obj){
  alert('fixing '+obj.file.fullName); // rasterizedimage.tif
  var newFile = new File(obj.file.fullName);
  
  if(newFile.exists){
    // get active layer

    newObj = app.activeDocument.placedItems.add()
    newObj.file = newFile;

    for (var key in obj) {
      if (key != 'parent' && key != 'embedded' && key != 'wrapOffset' && key != 'wrapInside') newObj[key] = obj[key];
    }
    var moveMatrix = app.getScaleMatrix(100,-100);
    var totalMatrix = concatenateRotationMatrix(moveMatrix, 10);
    newObj.transform(moveMatrix);

    alert('removing object');
    obj.remove();
    alert('object successfully removed');
    return 1
  }

  alert('draw lime box over embedded image');
  return 1;

}

//———————————————————————————————————————— fin
