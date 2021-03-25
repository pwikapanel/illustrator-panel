#target illustrator  

evt = 'save-all';

function sendEvent(type) {
    new ExternalObject('lib:\PlugPlugExternalObject');
    var event = new CSXSEvent();
    event.type = type;
    event.dispatch();
}

sendEvent(evt);
