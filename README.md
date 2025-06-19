
*Updated 19 June 2025 · Toulouse*

![Svija: SVG-based websites built in Adobe Illustrator][logo]

[logo]: http://files.svija.love/github/readme-logo.png?1 "Svija: SVG-based websites built in Adobe Illustrator"

Working on Svija Tools requires:
1. enabling `debug mode` for Adobe Illustrator
2. clone the repository to your computer
3. link the repository to the Illustrator extensions folder

![](images/divider.jpg "————————————————————————————————————————")
### 1. Enable `debug mode`:

Determine which version of CEP is being used:
```
ls /Users/Main/Library/Preferences/com.adobe.CSXS*
```
This will return:
```
/Users/Main/Library/Preferences/com.adobe.CSXS.11.plist
```
To enable/disable `debug mode` for this CEP version:
```
defaults write com.adobe.CSXS.11 PlayerDebugMode 1
```
To see whether `debug mode` is activated:
```
defaults read /Users/Main/Library/Preferences/com.adobe.CSXS.*.plist
```

>[Adobe Page](https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Client-side%20Debugging#set-the-debug-mode).


![](images/divider.jpg "————————————————————————————————————————")
### 2. Clone this Repository

You can download this repository by clicking on `Code` › `Download ZIP` from the main page, or you can clone it:
```
git clone htts://git@github.com/svijasvg/tools.git
```
![](images/divider.jpg "————————————————————————————————————————")
### 3. Link the Repository to the Extensions Folder

On macOS, Illustrator extensions are stored in:
```
/Library/Application Support/Adobe/CEP/extensions/
```
To use the `Svija Tools` panel inside the repository, create a symlink:

First, drag the repository Finder window onto Terminal then move the address between the quotes.

From within the repository, at the top level:
```
repo=""
```
It should look like this:
```
repo="/Users/XXX/Repositories/tools"
```
Create the symlink:
```
sudo ln -s "$repo/Svija Tools" "/Library/Application Support/Adobe/CEP/extensions/Svija Tools Dev"
```
Restart Illustrator; Svija Tools should be available under menu `Window` › `Extensions`

![](images/divider.jpg "————————————————————————————————————————")

![](images/shadow.jpg "————————————————————————————————————————")
<details><summary>previous chaos</summary>

[debugging info](https://fenomas.com/2014/08/cep-5-html-debug-en/)

Open [this link](http://localhost:8080/) in Chrome

Rsync to get remote version for local
```
rsync -vaPur --delete -n root@apache.svija.love:/home/tools.svija.love/master/ ./local/
```
Remove the `-n` to do it for real.

---

[localization info](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_11.x/Documentation/CEP%2011.1%20HTML%20Extension%20Cookbook.md)

Related locale codes

fr_BE – French (Belgium)
fr_BF – French (Burkina Faso)
fr_BI – French (Burundi)
fr_BJ – French (Benin)
fr_BL – French (Saint Barthélemy)
fr_CA – French (Canada)
fr_CD – French (Democratic Republic of the Congo)
fr_CF – French (Central African Republic)
fr_CG – French (Congo)
fr_CH – French (Switzerland)
fr_CI – French (Côte d'Ivoire)
fr_CM – French (Cameroon)
fr_DJ – French (Djibouti)
fr_DZ – French (Algeria)
fr_FR – French (France)
fr_GA – French (Gabon)
fr_GF – French (French Guiana)
fr_GN – French (Guinea)
fr_GP – French (Guadeloupe)
fr_GQ – French (Equatorial Guinea)
fr_HT – French (Haiti)
fr_KM – French (Comoros)
fr_LU – French (Luxembourg)
fr_MA – French (Morocco)
fr_MC – French (Monaco)
fr_MF – French (Saint Martin)
fr_MG – French (Madagascar)
fr_ML – French (Mali)
fr_MQ – French (Martinique)
fr_MR – French (Mauritania)
fr_MU – French (Mauritius)
fr_NC – French (New Caledonia)
fr_NE – French (Niger)
fr_PF – French (French Polynesia)
fr_PM – French (Saint Pierre and Miquelon)
fr_RE – French (Réunion)
fr_RW – French (Rwanda)
fr_SC – French (Seychelles)
fr_SN – French (Senegal)
fr_SY – French (Syria)
fr_TD – French (Chad)
fr_TG – French (Togo)
fr_TN – French (Tunisia)
fr_VU – French (Vanuatu)
fr_WF – French (Wallis and Futuna)
fr_YT – French (Mayotte)

---

CEP versions

---

### Svija Tools 1.0.5
---

**this is 1/2 of the repo — the rest is repo tools.svija.com — not public**

note: font locations seem to be relative to stylesheet, not to document using font

---

### dev setup

the "installed" version in /Library/Application Support/Adobe/CEP is just a simlink towards `Svija Tools Beta` in this repo.

To create it:
```
repos="/Users/Main/Library/Mobile Documents/com~apple~CloudDocs/Repositories"
sudo ln -s "$repos/tools/Svija Tools Beta" "/Library/Application Support/Adobe/CEP/extensions/Svija Tools Beta"
```
Additionally, the scripts in Svija Tools Beta/scripts are symlinks to the `scripts-presets` repos, created by:
```
rm "$repos/tools/Svija Tools Beta/scripts/*" # remove previous links

ln -s "$repos/scripts-presets/Create Group.jsx" "$repos/tools/Svija Tools Beta/scripts/Create Group.jsx"
ln -s "$repos/scripts-presets/Duplicate Layers.jsx" "$repos/tools/Svija Tools Beta/scripts/Duplicate Layers.jsx"
ln -s "$repos/scripts-presets/Import Styles.jsx" "$repos/tools/Svija Tools Beta/scripts/Import Styles.jsx"
ln -s "$repos/scripts-presets/Save.jsx" "$repos/tools/Svija Tools Beta/scripts/Save.jsx"
ln -s "$repos/scripts-presets/Show Svija Tools.jsx" "$repos/tools/Svija Tools Beta/scripts/Show Svija Tools.jsx"
ln -s "$repos/scripts-presets/Verify.jsx" "$repos/tools/Svija Tools Beta/scripts/Verify.jsx"
```
Connect the SVG files from the Interface folder to the beta panel:
```
rm "$repos/tools/Svija Tools Beta/panel/svg"
ln -s "$repos/tools/Interface/SVG exports" "$repos/tools/Svija Tools Beta/panel/svg"
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

### debugging in Chrome

https://blog.developer.adobe.com/debugging-your-adobe-panel-cf73f00f6961

---

not sure if it's necessary, but I typed the following in terminal:
```
sudo apachectl start
```
and now going to `localhost:8088` in the browser shows "Inspectable WebContents"

Restart Illustrator.

It is necessary that the contents of /.debug match CSXS/manifest.xml

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

# Svija Tools 1.0.5

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

</details>
