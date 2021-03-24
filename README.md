*Updated 15 March, 2021*

![Svija: SVG-based websites built in Adobe Illustrator](http://files.svija.com/github/readme-logo.png "Svija: SVG-based websites built in Adobe Illustrator")

**Svija Tools 1.0**
-------------------

blanket rule: save as svg keeps all artwork for all artboards even artwork that is outside artboards

use artboards only saves artwork that is within the artwork boudns

if I want to have multiple versions in a single file, I need to always use artboards, otherwase pages will be double sizd

so always use artboards, then I have to keep track of artboard names

will I have the "save as" problem if I only save one artboard?
how can I even get a file?

this is a problem for the next version

* * * * *

Need to restore locked & invisibel non-printin layers

* need to add the index to each rect, then make sure they're correctly attributed afterwards
* multiple artboards still doesn't actually save the SVG file
* need to see if it will mess up the global undo for re-saving as .ai if there are hidden layers

* * * * *

Remaining tasks

* change title while processing
* change title for help pane
* jsx scripts for all buttons
* actions for all buttons
* line 52-ish in saveassvg just deletes all ".ai" in the file name, should only be at end

* * * * *

Don't forget to remove the ai version from shipping version, that should just be for us to set up templates

* * * * *

Next version:

* preference pane with Ai version, prompts etc.
* popup progress bar panel : "processing"
* investigate svg options  // options.sVGAutoKerning = true/false;     ISG339
and exportOptionsSVG.typename

Description
The class name of the referenced object.


**old svija sync fixed a problem where home 2.svg was renamed to home.svg**

* * * * *

##A note about the logic

The main functionality of saving as svg involves:

a loop through all artboards ———

save a copy of all artboard info
make an array of all layers to say if locked/hidden

deleting any non-printing layers
- unlock layer if locked
- make visible if hidden
- delete non-printing layer

delete all but current artboards

save as svg

undo until the number of artboards is correct
undo until the number of layers is correct

restore all artboard parameters
restore all non-printing layer locked & visible flags
