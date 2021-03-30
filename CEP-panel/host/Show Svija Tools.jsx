#target illustrator  

/*———————————————————————————————————————— Show Svija Tools.jsx


    github.com/svijasvg/svija-tools
  
    version 2.1.23
  
  	(c) 2021 Svija
  	svija.love
  	contact@svija.love

//———————————————————————————————————————— what it does

//———————————————————————————————————————— program */

sendEvent('show-svija-tools');

function sendEvent(type) {
    new ExternalObject('lib:\PlugPlugExternalObject');
    var event = new CSXSEvent();
    event.type = type;
    event.dispatch();
}

//———————————————————————————————————————— fin
