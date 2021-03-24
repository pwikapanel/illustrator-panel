*Updated 15 March, 2021*

![Svija: SVG-based websites built in Adobe Illustrator](http://files.svija.com/github/readme-logo.png "Svija: SVG-based websites built in Adobe Illustrator")

**Svija Tools 1.0**
-------------------

use Document.fullName, which includes path

**Don't forget to test on versions prior to CC25, and Engine 10.0**

it all works, but I am iterating through the artboards for no reason.

I should just delete the files quickly, then save in a single go

* * * * *

**NEW BRANCH:** dedicated to saving using artboards.

**Save as SVG** saves artwork from all artboards, even if it is outside the artboards.

**Use Artboards** deletes artwork outside of artboard boundaries, and is therefore more efficient.

If we want to contain multiple pages (desktop, mobile) in a single file, we should use artboards. Otherwise the resulting pages will contain double the necessary artwork. 

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
