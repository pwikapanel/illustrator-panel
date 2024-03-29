#target illustrator  

/*———————————————————————————————————————— Import Styles.jsx

    Import Styles.jsx

    1.0.3

    Updates paragraph styles in all open documents from a specified
    source file. The user has a choice of updating styles that are used in
    the document or importing all styles from the source document.

    Because AI doesn't correctly report stroke color, any stroked text styles
    are changed to noColor

    A complete paragraph style includes character styles as part of
    the style definition; copying a paragraph style requires copying
    the associated character styles.

/*———————————————————————————————————————— EULA

    Copyright (c) 2023 Svija

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    The software is provided "as is", without warranty of any kind, express or
    implied, including but not limited to the warranties of merchantability,
    fitness for a particular purpose and noninfringement. In no event shall the
    authors or copyright holders be liable for any claim, damages or other
    liability, whether in an action of contract, tort or otherwise, arising from,
    out of or in connection with the software or the use or other dealings in
    the software.

  	svija.com · hello@svija.com*/


//:::::::::::::::::::::::::::::::::::::::: program

//———————————————————————————————————————— user messages

var msgSelect  = 'Select style source file — all open files will be updated:';
var msgInclude = 'Include all styles?\nPress "No" to exclude any unused styles.';
var msgDone    = 'Styles Updated\nSource styles were copied to all open documents.\n\nTo undo, go to File › Revert in each affected document.';

var msgNoFile  = 'Update canceled.';
var msgSrcOpen = 'Error: source document open.\nScript canceled.';

/*———————————————————————————————————————— ▼ program:{

    can use "break program;" to quit at any moment */

program:{

//———————————————————————————————————————— no open docs

if (app.documents.length < 1){
  alert('No open documents.');
  break program;
}

//———————————————————————————————————————— select source file

  var srcPath = File.openDialog(msgSelect);
  if (srcPath == null) { alert(msgNoFile);  break program; }

  var inclUnused = confirm(msgInclude);

  //—————————————————————————————————————— if src is open document
  //—————————————————————————————————————— store frontmost doc name

  var docIndex = indexIfOpen(srcPath);
  if (!docIndex){
    var wasActiveDoc = false;
    var activeDoc  = app.open(File(srcPath));
  }
  else{
    var wasActiveDoc = app.activeDocument.name;
    app.activeDocument = app.documents[docIndex];
    activeDoc = app.activeDocument;
  }

/*———————————————————————————————————————— loop through open docs

    doc[0] = style source */

  var docs = app.documents.length;

  for(docIndex=1; docIndex<docs; docIndex++){
    var destDoc  = app.documents[docIndex];
    copyAllStyles(activeDoc.paragraphStyles, destDoc.paragraphStyles, inclUnused);
    copyAllStyles(activeDoc.characterStyles, destDoc.characterStyles, inclUnused);
    makeChange(destDoc);
  }

//———————————————————————————————————————— finish up

  if (!wasActiveDoc) activeDoc.close(SaveOptions.DONOTSAVECHANGES);
  else makeActiveByName(wasActiveDoc);
  alert(msgDone);

//———————————————————————————————————————— ▲ } // program 

} // program 



//:::::::::::::::::::::::::::::::::::::::: main functions

/*———————————————————————————————————————— copyAllStyles(activeDoc, destDoc, inclUnused){

    copies all paragraph styles between two documents */

function copyAllStyles(srcStyles, dstStyles, inclUnused){

    count = srcStyles.length;

    for (x=0; x<count; x++){
      var srcStyle  = srcStyles[x]; 
      var srcName   = srcStyle.name;
      var dstStyle  = null;

      try { // style exists in destination document
        dstStyle = dstStyles.getByName(srcName);
        dstStyle.clear();
      }

      catch(err) { // style does not exist in destination document
        if (inclUnused){
          dstStyles.add(srcName);
          dstStyle = dstStyles.getByName(srcName);
        }
      }

      if (dstStyle && srcStyle.name.substr(0,1) != '['){
          if (srcStyle.typename == 'ParagraphStyle')
            copyAttrs(srcStyle, dstStyle, 'paragraphAttributes');
          copyAttrs(srcStyle, dstStyle, 'characterAttributes');

        // this needs to be made conditional
        dstStyle.characterAttributes.autoLeading = false;
      }
    }
}

/*———————————————————————————————————————— copyAttrs(srcStyle, dstStyle, className){

    update dstStyle attributes based on srcStyle
    bug in Illustrator, stroke color is not reported correctly
    the second-to-last if is necessary or Ilustrator crashes */

function copyAttrs(srcStyle, dstStyle, className){
  var none = new NoColor();

  var attrs = srcStyle[className];
  for (var attrName in attrs) {
    var thisAttr = null;
    try{ thisAttr = attrs[attrName]; } catch(err){ continue; }

    if (thisAttr){
      dstStyle[className][attrName] = thisAttr;
      if (attrName == 'strokeColor') dstStyle[className][attrName] = none;
    }
  }
}


//:::::::::::::::::::::::::::::::::::::::: utility functions

/*———————————————————————————————————————— indexIfOpen(p){

    determine if a document is already open
    if it's open, return it else return false */

function indexIfOpen(p){
  for (var index=0; index<app.documents.length; index++){
    var thisPath = app.documents[index].path + '/' + app.documents[index].name;
    if(thisPath == p) return index;
  }
  return false;
}

/*———————————————————————————————————————— makeActiveByName(n){

    */

function makeActiveByName(n){
  for (var index=0; index<app.documents.length; index++)
    if (app.documents[index].name == n){
      app.activeDocument = app.documents[index];
      break;
    }
}

/*———————————————————————————————————————— makeChange(destDoc);

    makes a small change in the document;
    without this, the revert function
    would be disabled */

function makeChange(d){
  var wasLocked = d.activeLayer.locked;

  d.activeLayer.locked = true;
  d.activeLayer.locked = false;
  d.activeLayer.locked = wasLocked;
}


//:::::::::::::::::::::::::::::::::::::::: fin
