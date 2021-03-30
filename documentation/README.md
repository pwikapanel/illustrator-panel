*Updated 25 March, 2021*

![Svija: SVG-based websites built in Adobe Illustrator](http://files.svija.love/github/readme-logo.png?3 "Svija: SVG-based websites built in Adobe Illustrator")

**Documentation**
-----------------

The Adobe Exchange [website](https://partners.adobe.com/exchangeprogram/creativecloud) does not work in Safari.

* * * * *

Testing a CEP panel requires setting the CEP engine to **debug mode**. To check if this is the case:

    $ defaults read /Users/Base/Library/Preferences/com.adobe.CSXS.8.plist
    {
        LogLevel = 1;
        PlayerDebugMode = 1;
    }

### To enter debug mode

    $ defaults write com.adobe.CSXS.8 PlayerDebugMode 1

### To turn off debug mode

    $ defaults write com.adobe.CSXS.8 PlayerDebugMode 0

### Installing the extension

Place the extension folder (containing subfolders **CSXS**, **client** and **host**) in:

    /Library/Application Support/Adobe/CEP/extensions

For information:

The META-INF folder is created during the signing process and contains certificate information.

*More info [here](https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Client-side%20Debugging#set-the-debug-mode).*
