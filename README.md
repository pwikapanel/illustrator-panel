[logo]: http://files.svija.love/github/readme-logo.png?1 "Svija: SVG-based websites built in Adobe Illustrator"

*Updated 29 January, 2021 · Toulouse*

![Svija: SVG-based websites built in Adobe Illustrator][logo]

# Svija Tools 1.0.0

This repository contains *only* development of the **user interface** and **specific functionality** that cannot be tested with scripts-presets.

**Script develompent** happens in the [scripts-presets][l1] repository.

[l1]: https://github.com/svijalove/scripts-presets

---

### Tools Versions

There is a second issue where there need to be two signed programs — beta and master. This is because it is not possible to run an unsigned panel in recent versions of Illustrator, making debugging complicated.

**Svija Tools Beta**: contains the contents of **/Library/Application Support/Adobe/CEP/extensions/Svija Tools Beta**

It is updated manually as the aformentioned code is modified.

**Svija Tools**: contains the **unsigned** contents of the final extension.

It is generally the same as **Svija Tools Beta** except that the bundle identifier does not contain dev.

**Distribution** contains:
- the final, signed .zip extension
- the most recent DMG

---
### Version Updates

Following are the instructions for releasing a new version of Svija Sync.

1. create new signed version, zipped in the distribution folder
2. create a [new DMG](https://github.com/svijalove/dmg-installation), in the distribution folder

---
### 1. Merge to Master

Check out the **destination branch** and merge ([list of commits](https://github.com/svijalove/Svija-Tools/commits/beta)):
```
git status
```
```
git checkout master
git merge beta --no-ff
```
Push the new version:
```
git push origin master
```
---
### 2. Update the Documentation

Copy info from/to:

- [github.com/svijalove/tools/commits/beta](https://github.com/svijalove/tools/commits/beta)
- [tech.svija.love/manual/changelog-tools](https://tech.svija.love/manual/changelog-tools)

---
### 3. Create A New Github Release

On github, create a new release from the **master branch**.

- use the current version number
- use the month & year for the title
- use the changelog text for the description

---
### 4. Check Out the Beta Branch

Commit any changes, then check out the beta branch:
```
git status
git commit -m "last commit before going back to beta" -a
```
Commit any changes, then check out the beta branch:
```
git checkout beta 
git merge master --no-ff -m "starting new version"
git push -u
```
---
### 7. Increment the Version Number

Places to update the version number:
- this README.md

---
### 8. Update tutorial content at tech.svija.com

Read through the [changelog](https://tech.svija.love/reference/changelogs/changelog-tools) and make a list of modfications for the new version.

Update the [documentation pages](https://tech.svija.love) if necessary.

---
### 7. Post to Social Media

Find a nice picture or make an ad to accompany the update, then

- [facebook.com/svijalove](https://facebook.com/svijalove)
- [twitter.com/svijalove](https://twitter.com/svijalove)
- [instagram/svijalove](https://instagram/svijalove) (make it 3x wide · has to be posted from phone)
- [linkedin.com/company/svijalove](https://linkedin.com/company/svijalove) (add text before adding image)

---
---

# older content

The Svija Tools folder contains the **unsigned** plugin.

To use the **signed version** copy the **ZXP file** from the code signing and unzip it.

---

### Run JSX files directly to see errors

### no longer true V

**IMPORTANT NOTE:** the actual scripts are developed in a separate repository called [Presets-Scripts](https://github.com/svijasvg/Presets-Scripts).

This is because scripts stored in:

    Adobe Illustrator 2021/Presets/en_US/Scripts

can be worked on in real-time, whereas scripts that are integrated into the CEP panel need to be signed and installed each time they are updated.

The scripts are written in such a way that they can be run from the **File › Scripts** menu with shortcut keys or called from the panel. Although the scripts could be developed separately, making the scripts identical in both places accelerates development and also provides a more unified user experience.

* * * * *

next big thing is to add recursive sublayers to **Propagate Layers**.

then add warnings for everything from **trouble** page to **Save as Svija**.

* * * * *

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
