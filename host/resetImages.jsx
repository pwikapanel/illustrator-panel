//———————————————————————————————————————— resetImages.jsx

var doc = app.activeDocument;
var placed = doc.placedItems.length;
var treated = 0;

//———————————————————————————————————————— placed images

for (var x=0; x<placed; x++){
  treated += placedItem(doc.placedItems[x]);
}




//———————————————————————————————————————— fin

alert(treated + ' issue(s) were corrected');

// — — — — — — — — — — — — — — — — — — — —  functions

//———————————————————————————————————————— placed images

// https://extendscript.docsforadobe.dev/file-system-access/file-object.html#file-class-properties
// isg675
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

// isG749
// app.activeDocument.rasterItems.length

function rasterItem(index){
  alert('embedded, oh no! '+ index);
  return 1;

}

//———————————————————————————————————————— fin
