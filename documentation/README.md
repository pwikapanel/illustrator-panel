*Updated 25 March, 2021*

![Svija: SVG-based websites built in Adobe Illustrator](http://files.svija.love/github/readme-logo.png?3 "Svija: SVG-based websites built in Adobe Illustrator")

**Documentation**
-----------------

The Adobe Exchange [website](https://partners.adobe.com/exchangeprogram/creativecloud) does not work in Safari.

* * * * *

Testing a CEP panel requires setting the CEP engine to debug mode:

    $ defaults write com.adobe.CSXS.10 PlayerDebugMode 1

    $ defaults read /Users/Base/Library/Preferences/com.adobe.CSXS.10.plist
    {
        LogLevel = 1;
        PlayerDebugMode = 1;
    }

To set debug mode back to the default:

    $ defaults write com.adobe.CSXS.10 PlayerDebugMode 0

Place the extension folder (containing CSXS, client & host subfolders) in:

    /Library/Application Support/Adobe/CEP/extensions

For information:

The META-INF folder is created during the signing process and contains certificate information.

*More info [here](https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Client-side%20Debugging#set-the-debug-mode).*
