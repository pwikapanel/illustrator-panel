#target illustrator  

// https://github.com/Adobe-CEP/CEP-Resources/issues/238
// sean256

function sendEvent(type) {
    new ExternalObject('lib:\PlugPlugExternalObject');
    var event = new CSXSEvent();
    event.type = type;
    event.dispatch();
}

sendEvent('save-all');
