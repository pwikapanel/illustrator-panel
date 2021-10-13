#target illustrator 

/*———————————————————————————————————————— 4 Reset Object IDs — ⌘ F4.jsx

    4. Reset Object IDs — ⌘ F4.jsx

    1.0.1

    description */

/*———————————————————————————————————————— copyright

    (c) 2021 Svija SAS
    All Rights Reserved
   
    NOTICE:  Svija permits you to use, modify, and distribute this file in
    accordance with the terms of the Svija license agreement accompanying it.
    If you have received this file from a source other than Svija, then your
    use, modification, or distribution of it requires the prior written
    permission of Svija.

    github.com/svijasvg/Presets-Scripts
  	svija.love · contact@svija.love */

//———————————————————————————————————————— variables */

var doc = app.activeDocument;
var items = doc.pageItems.length;
var layers = doc.layers.length;
var treated = 0;
var randString = 'lkjsdfslqe';

//———————————————————————————————————————— change layer & item names

for (var x=0; x<layers; x++)
  treated += unsetLayerName(doc.layers[x], randString)

for (var x=0; x<items; x++)
  treated += unsetItemName(doc.pageItems[x], randString)

//———————————————————————————————————————— reset layer & item names

for (var x=0; x<layers; x++)
  resetLayerName(doc.layers[x], randString)

for (var x=0; x<items; x++)
  resetItemName(doc.pageItems[x], randString)

//———————————————————————————————————————— terminate

if (treated == 0) alert('No named objects found');
else alert(treated + ' Objects Reset');


//———————————————————————————————————————— main functions

/*———————————————————————————————————————— unsetLayerName(layer, randString){

    */

function unsetLayerName(layer, randString){
  var t = 0;

  if (layer.name && layer.name.slice(0,1) != '<'){
    layer.name = layer.name + randString;
    t += 1;
  }

  thisLength = layer.layers.length;
  if (thisLength > 0)
    for (var x=0; x<thisLength; x++)  
      t += unsetLayerName(layer.layers[x], randString);

  return t;
}

/*———————————————————————————————————————— unsetItemName(item, randString){

    */

function unsetItemName(item, randString){
  if (!item.name) return 0;

  item.name = item.name + randString;
  return 1;
}

/*———————————————————————————————————————— resetLayerName(layer, randString){

    */

function resetLayerName(layer, randString){
  if (layer.name)
    layer.name = layer.name.slice(0, 0-randString.length);

  thisLength = layer.layers.length;
  if (thisLength > 0)
    for (var x=0; x<thisLength; x++)  
      resetLayerName(layer.layers[x], randString);
}


/*———————————————————————————————————————— resetItemName(item, randString){

    */

function resetItemName(item, randString){
  if (item.name)
    item.name = item.name.slice(0, 0-randString.length);
}


//———————————————————————————————————————— fin
