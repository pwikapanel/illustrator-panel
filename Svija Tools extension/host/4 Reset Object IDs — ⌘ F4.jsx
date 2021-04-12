#target illustrator 

/*———————————————————————————————————————— 4 Reset Object IDs — ⌘ F4.jsx

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


//———————————————————————————————————————— fin
