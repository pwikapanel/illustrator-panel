#target illustrator  

evt = 'propagate-layers';

function sendEvent(type) {
    new ExternalObject('lib:\PlugPlugExternalObject');
    var event = new CSXSEvent();
    event.type = type;
    event.dispatch();
}

sendEvent(evt);
