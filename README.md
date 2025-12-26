
<!-- vim: set foldmethod=marker fmr=###,--- :-->

*Updated 26 December 2025*

![Pwika: SVG-based websites built in Adobe Illustrator][logo]

[logo]: http://files.pwika.com/github/github_banner.png "Svija: SVG-based websites built in Adobe Illustrator"

### Svija
Working on Svija requires:
1. enabling `debug mode` for Adobe Illustrator
2. clone the repository to your computer
3. link the repository to the Illustrator extensions folder
4. enabling the Chrome debugger

---
### 1. Enable `debug mode`:

Determine which version of CEP is being used:
```
ls /Users/Main/Library/Preferences/com.adobe.CSXS*
```
This will return:
```
/Users/Main/Library/Preferences/com.adobe.CSXS.12.plist
```
To enable/disable `debug mode` for this CEP version:
```
defaults write com.adobe.CSXS.12 PlayerDebugMode 1
```
To see whether `debug mode` is activated:
```
defaults read /Users/Main/Library/Preferences/com.adobe.CSXS.*.plist
```

>[Adobe Page](https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Client-side%20Debugging#set-the-debug-mode).


---
### 2. Clone this Repository

You can download this repository by clicking on `Code` › `Download ZIP` from the main page, or you can clone it:
```
git clone htts://git@github.com/pwikapanel/illustrator-panel.git
```
---
### 3. Link the Repository to the Extensions Folder

On macOS, Illustrator extensions are stored in:
```
/Library/Application Support/Adobe/CEP/extensions/
```
To use the `Svija` panel inside the repository, create a symlink:


From within the repository, at the top level, paste:
```
repo=
```
Then drag the repository Finder window onto the Terminal window.

It should look like this:
```
repo=/Users/XXX/Repositories/illustrator-panel
```
Create the symlink by pasting:
```
sudo ln -s "$repo/illustrator-panel" "/Library/Application Support/Adobe/CEP/extensions/pwika beta"
```
Restart Illustrator; Svija should be available under menu `Window` › `Extensions`

---
### 4. Enabling the Chrome debugger

*Drawn from [Andy Hall's tutorial](https://fenomas.com/2014/08/cep-5-html-debug-en/)*

This should work in any Chrome-based browser (we are using [unGoogled Chromium](https://github.com/ungoogled-software/ungoogled-chromium)).

Create or edit `Pwika/.debug`, containing:
```
<?xml version="1.0" encoding="UTF-8"?> 
<ExtensionList>
    <Extension Id="com.pwika.Pwika.panel">
        <HostList>
            <Host Name="ILST" Port="8080"/> 
        </HostList>
    </Extension>
</ExtensionList>
```
The extension ID line should match the line in `CSXS/manifest.xml`.

After restarting Illustrator, it should be possible to visit [http://localhost:8080/](http://localhost:8080/) in the browser and see:

> Inspectable WebContents  
> [shell.html]()

Clicking on [shell.html]() will display the Svija panel in the browser

The main tool we'll be using is the console.

---
### 5. Things to Know

These are some gotchas that can make your life complicated:

- if there is a syntax error (missing `}` for example) in a JSX file, Illustrator will revert to the previous known good version rather than throw the error
- in JSX, `window` is undefined, so you can't access a variable with window[varname]. Instead use `this`.

---

### Installation

Apart from Adobe Exchange, there are two ways to install a CEP panel:

1. copy the CEP panel folder directly to the appropriate location on disk
2. use an extension manager to install the ZXP file

**1. Copy to Folder**  
- PC: `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\`
- macOS: `/Library/Application Support/Adobe/CEP/extensions/`

**2. Extension Manager**

There are three extension manager apps available:
1. [ZXP/UXP Installer](https://aescripts.com/learn/post/zxp-installer)
2. [Anastasiy's](https://install.anastasiy.com/)
3. [Elements ZXP Installer](https://zxpinstaller.com/)

All of them are available for both Windows and macOS.

---
