//———————————————————————————————————————— resetImages.jsx

var doc = app.activeDocument;
var items = doc.pageItems.length;
var imagesTreated = 0;

for (x=0; x<items; x++){

  arg = doc.pageItems[x].typename;

  switch(arg) {
    case 'RasterItem': imagesTreated += rasterItem(1); break;
    case 'PlacedItem': imagesTreated += placedItem(1); break;
    default: trash = null; break;
  }

}

//————————————————————————————————————————  fin

alert('Images Re-Linked: '+imagesTreated);

//————————————————————————————————————————  fin

function rasterItem(index){
  return 1;

}

//————————————————————————————————————————  fin

function placedItem(index){
  alert('placed, oh no!');
  return 9;
}

//————————————————————————————————————————  fin
