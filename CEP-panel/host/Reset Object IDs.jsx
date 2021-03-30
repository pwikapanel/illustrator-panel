#target illustrator  

/*———————————————————————————————————————— Reset Object IDs.jsx

    github.com/svijasvg/svija-tools
  
    version 2.1.23
  
  	(c) 2021 Svija
  	svija.love
  	contact@svija.love

//———————————————————————————————————————— what it does

//———————————————————————————————————————— variables */

var doc = app.activeDocument;
var items = doc.pageItems.length;
var treated = 0;
var randString = 'lkjsdfslqe';

//———————————————————————————————————————— change all names

for (var x=0; x<items; x++)
  if (doc.pageItems[x].name){
    doc.pageItems[x].name = doc.pageItems[x].name + randString;
    treated += 1;
  }

//———————————————————————————————————————— reset names

for (var x=0; x<items; x++)
  if (doc.pageItems[x].name)
    doc.pageItems[x].name = doc.pageItems[x].name.slice(0, 0-randString.length);

alert(treated + ' Objects Reset');

//————————————————————————————————————————  fin
