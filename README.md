[logo]: http://files.svija.love/github/readme-logo.png?1 "Svija: SVG-based websites built in Adobe Illustrator"

*Updated 24 February 2023 · Toulouse*

![Svija: SVG-based websites built in Adobe Illustrator][logo]

### dev setup

the "installed" version in /Library/Application Support/Adobe/CEP is just a simlink towards `Svija Tools Beta` in this repo.

To create it:
```
ln -s /Users/Main/Documents/tools/Svija\ Tools\ Beta /Library/Application\ Support/Adobe/CEP/extensions/Svija\ Tools\ Beta
```
Additionally, the scripts in Svija Tools Beta/scripts are symlinks to the `scripts-presets` repo, created by:
```
ln -s /Users/Main/Documents/scripts-presets/Create\ Group.jsx /Users/Main/Documents/tools/Svija\ Tools\ Beta/scripts/Create\ Group.jsx 
ln -s /Users/Main/Documents/scripts-presets/Duplicate\ Layers.jsx /Users/Main/Documents/tools/Svija\ Tools\ Beta/scripts/Duplicate\ Layers.jsx 
ln -s /Users/Main/Documents/scripts-presets/Import\ Styles.jsx /Users/Main/Documents/tools/Svija\ Tools\ Beta/scripts/Import\ Styles.jsx 
ln -s /Users/Main/Documents/scripts-presets/Save.jsx /Users/Main/Documents/tools/Svija\ Tools\ Beta/scripts/Save.jsx 
ln -s /Users/Main/Documents/scripts-presets/Show\ Svija\ Tools.jsx /Users/Main/Documents/tools/Svija\ Tools\ Beta/scripts/Show\ Svija\ Tools.jsx 
ln -s /Users/Main/Documents/scripts-presets/Verify.jsx /Users/Main/Documents/tools/Svija\ Tools\ Beta/scripts/Verify.jsx 
```

The goal is to avoid having multiple copies of the same files. With this system:
- all interface & panel dev happens in the **tools** repo
- all script development happens in the **scripts-presets** repo

---
### add this

csif.getScaleFactor returns a number between 1 (smallest interface) and 2 (biggest interface):
- 1
- 1.25
- 1.5
- 1.75
- 2

This number is used to resize the panel itself, and the panel contents automatically fill the width.

The minimum width and height in `manifest.xml` must be much smaller than the real minimum size of the panel — they are half the values.

I don't know if this is a coincidence — to test I'd have to change the panel sizes (not that complicated — they're all in initialize.js).

```

    MinSize in manifest must be no more than 60x20
  
    this is 1/2 the minimum size below, but may be coincidence */

function setSize(url){
  url = stripQuery(url);

  var factor = csif.getScaleFactor()

  var widthOrig  = env_sizes[url][0]      ;
  var heightOrig = env_sizes[url][1]      ;
//var heightOrig = env_sizes[url][1] - 0.5;

  var widthNew  = Math.round( widthOrig / factor);
  var heightNew = Math.round(heightOrig / factor);

  csif.setWindowTitle(widthOrig + 'x' + heightOrig + ' · ' + widthNew+'x'+heightNew);
  csif.resizeContent(widthNew, heightNew);

}


//                    factor  widthNew      heightNew

// less.html on max size: 2.00, 120, 41   BROKEN
// less.html on max-1   : 1.75, 137, 47   BROKEN
// less.html on max-2   : 1.50, 160, 54   BROKEN
// less.html on min+1   : 1.25, 192, 65   WORKS
// less.html on min     : 1.00, 240, 82   WORKS

// 240x640.5 is biggest, with more anim tips
```
---

https://blog.developer.adobe.com/debugging-your-adobe-panel-cf73f00f6961

---

not sure if it's necessary, but I typed the following in terminal:
```
sudo apachectl start
```
and now going to `localhost:8088` in the browser shows "Inspectable WebContents"

I restarted Illustrator, not sure if it's necessary

1. click on "more.html" (this is my panel page more)

it's not working — I'm not sure if I'm supposed to be using the panel in Illustrator or in the browser.

There's a JS error in the browser, and no console messages.

The panel doesn't load in the browser, so if it's that, this is useless.

---

how resizing works:

the function setSize, in initialize.js is used to size the window correctly.

right now, the only time it is called is in the onResize listener

I will look in non-beta version and see when it was called previously

PROBLEM WAS WRONG LIMITS IN MANIFEST.XML

# Svija Tools 1.0.4

This repository is *only* for development of the **user interface**.

**Specific functionality** is developed in the [scripts-presets][l1] repository.

[l1]: https://github.com/svijalove/scripts-presets

---
### Two Versions

Two versions of Svija Tools are maintained:
- **beta** (a folder)
- **master** (a folder and a ZXP archive)

> **Svija Tools Beta**: used for testing and user interface development.

The beta is updated and signed when a new release of **presets-scripts** is available.

> **master**: based on beta version but any beta references are removed from `CSXS/manifest.xml` 

The master is updated *only* when a **new release** is prepared.

---
### Illustrator Interface Files

The **interface** folder contains two Illustrator files:

- **layout.ai** · used for testing layout ideas
- **interface.ai** · the actual interface of Svija Tools
- **colors.ai** · used for evaluating color choices

Once colors are finalized in **colors.ai**, the final values are **applied to swatches** in interface.ai.
```
File › Save As…
Name: interface.svg
Format: SVG
In folder "SVG Exports"
√ Use Artboards

Fonts › Type: SVG
Subsetting: None
Image Location: Link
Uncheck Preserve Illustrator Editing Capabilities
CSS Properties: Style Elements
Decimal Places: 3
Check Output fewer <tspan> elements
Check Responsive
```
After exporting, copy the contents of **SVG Exports** to **Svija Tools Beta/panel/svg**

The bundle will need to be re-signed before the panel will function.

After creating a new signed version, **unzip it** and replace the **folder Svija Tools Beta**.
### Installing the Signed Version

There are three ways to install an extension:
- from Adobe CC
- via Anastasiy's Extension Manager ([link](https://install.anastasiy.com))
- installing the unzipped ZXP file manually

**Important:** if the **archive utility** is set to delete .zip files once expanded, make a copy *before* unzipping!

To install the bundle:

1. unzip the .zip file, and copy it 
2. paste it into the Adobe extensions folder  
in the Finder, type **cmd-shift-G**, then paste:
```
/Library/Application Support/Adobe/CEP/extensions
```
**Note:** the custom icon has to be re-pasted onto the folder after unzipping: open [Svija Tools.png][stp] in **Preview**, copy it, and paste it into the bundle's folder information window.

