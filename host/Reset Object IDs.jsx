//———————————————————————————————————————— resetObjects.jsx

var doc = app.activeDocument;
var items = doc.pageItems.length;
var itemsTreated = 0;

for (x=0; x<items; x++){
  if (doc.pageItems[x].name){
    var thisName = doc.pageItems[x].name;
    doc.pageItems[x].name = 'x';
    doc.pageItems[x].name = thisName;
    itemsTreated += 1;
  }
}

alert('Objects Re-Linked: ' + itemsTreated);

//————————————————————————————————————————  fin
