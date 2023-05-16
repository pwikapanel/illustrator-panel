#target illustrator  

/*———————————————————————————————————————— 0 Show Svija Tools — ⇧ F1.jsx

    0. Show Svija Tools — ⇧ F1.jsx

    1.0.3

    A very simple script that dispatches a custom event
    that can be listened for by a CEP panel (the launcher).

    When the launcher hears the event, it will cause
    the Svija Tools panel to become visible

    The script is called by including it in an action,
    so everything is executed on the spot — no functions. */

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

/*———————————————————————————————————————— functionality

    The script executed when loaded, so there
    are no functions. */

new ExternalObject('lib:\PlugPlugExternalObject');
var event = new CSXSEvent();
event.type = 'show-svija-tools';
event.dispatch();

//———————————————————————————————————————— deprecated

/*sendEvent('show-svija-tools');

function sendEvent(type) {
    new ExternalObject('lib:\PlugPlugExternalObject');
    var event = new CSXSEvent();
    event.type = type;
    event.dispatch();
}*/


//———————————————————————————————————————— fin
