*Updated 25 March, 2021*

![Svija: SVG-based websites built in Adobe Illustrator](http://files.svija.love/github/readme-logo.png?3 "Svija: SVG-based websites built in Adobe Illustrator")

**Documentation**
-----------------

The Adobe Exchange [website](https://partners.adobe.com/exchangeprogram/creativecloud) does not work in Safari.

* * * * *

Testing a CEP panel requires setting the CEP engine to debug mode:

    $ defaults write com.adobe.CSXS.10 PlayerDebugMode 1 # 0 to reset
    $ defaults read /Users/Base/Library/Preferences/com.adobe.CSXS.10.plist

To set debug mode back to the default:

   $ defaults write com.adobe.CSXS.10 PlayerDebugMode 0

more info: [here](https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Client-side%20Debugging#set-the-debug-mode)
