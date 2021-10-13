*Updated 30 March, 2021 · this should be moved to a document*

![Svija: SVG-based websites built in Adobe Illustrator](http://files.svija.love/github/readme-logo.png?2 "Svija: SVG-based websites built in Adobe Illustrator")

**Installing a CEP Panel on Mac**
---------------------------------

There are three ways install a CEP panel on a Mac:

1. through Adobe Exchange
2. an extension installer application
2. by enabling CEP debug mode, then dragging the folder to the /Extensions folder

* * * * *

### Adobe Exchange

A signed version is created and sent to Adobe. A response will be received in 2-3 days.

* * * * *

### Extension Installer

The extension installer seems to work fine.

It is available at [install.anastasiy.com](http://install.anastasiy.com/), and quickly installs or uninstalls the extension. It is useful for debugging.

A second installer is available at [zxpinstaller.com](http://zxpinstaller.com/), but it cannot uninstall or manage extensions. Therefore, it is not useful for development, and would make installing upgrades difficult for Svija clients.

* * * * *

### Enabling Debug Mode

Debug mode is useful for the development process, but opens a vulnerability in the system and should probably not be recommended to our clients.

The only drawback so far is that it is not possible to show the panel with a keyboard shortcut.

*To enable/disable debug mode for a given CEP version:*

    $ defaults read /Users/Base/Library/Preferences/com.adobe.CSXS.10.plist
    $ defaults write com.adobe.CSXS.10 PlayerDebugMode 1

More info: [here](https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Client-side%20Debugging#set-the-debug-mode).