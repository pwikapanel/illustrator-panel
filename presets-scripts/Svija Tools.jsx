#target illustrator  

// https://github.com/Adobe-CEP/CEP-Resources/issues/238
// sean256

function sendEvent(type) {
    new ExternalObject('lib:\PlugPlugExternalObject');
    var event = new CSXSEvent();
    event.type = type;
    event.dispatch();
}

sendEvent('svija-tools');

// run file directly · verified working
// $.evalFile('/Library/Application Support/Adobe/CEP/extensions/Svija Tools.extension/host/resetObjects.jsx');

