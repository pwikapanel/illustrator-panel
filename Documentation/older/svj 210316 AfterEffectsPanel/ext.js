function onLoaded() {
    var csInterface = new CSInterface();
  
    keyEventsInterest = JSON.stringify([
        {"keyCode": 3}, // "f"
        {"keyCode": 3, "shiftKey" : true},
        {"keyCode": 3, "altKey"   : true},
        {"keyCode": 3, "ctrltKey" : true},
        {"keyCode": 3, "shiftKey" : true},
        {"keyCode": 3, "metaKey"  : true}
        ]);
        
    csInterface.registerKeyEventsInterest(keyEventsInterest);

}

/**
 * Load JSX file into the scripting context of the product. All the jsx files in 
 * folder [ExtensionRoot]/jsx will be loaded. 
 */

function evalScript(script, callback) {
    new CSInterface().evalScript(script, callback);
}

function onClickButton(ppid) {
  var extScript = "$._ext_" + ppid + ".run()";
  evalScript(extScript);
}

