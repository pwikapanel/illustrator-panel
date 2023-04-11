[logo]: http://files.svija.love/github/readme-logo.png "Svija: SVG-based websites built in Adobe Illustrator"

*Updated 11 April, 2023*

![Svija: SVG-based websites built in Adobe Illustrator][logo]

### Documentation

The Adobe Exchange [website](https://partners.adobe.com/exchangeprogram/creativecloud) does not work in Safari.

---

For Svija Actions:

you can't directly add the shortcut using "add a menu item":

1. Add a menu item
2. **Search** for the term ("save as")

---
### Debug Mode

**Correction:** when I added the mimetype file to the plugin, it started working in Ai 25.

Testing a CEP panel requires setting the CEP engine to **debug mode**. To check if this is the case:
```
defaults read ~/Library/Preferences/com.adobe.CSXS.11.plist
```
If debug mode is enabled, it should output:
```
{
    LogLevel = 1;
    PlayerDebugMode = 1;
}
```
To enable or disable:
```
defaults write com.adobe.CSXS.11 PlayerDebugMode 1
```
```
defaults write com.adobe.CSXS.11 PlayerDebugMode 0
```

---
### Installing the extension

Place the extension folder (containing subfolders **CSXS**, **client** and **host**) in:

    /Library/Application Support/Adobe/CEP/extensions

For information:

The META-INF folder is created during the signing process and contains certificate information.

*Valuable debugging information [here](https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Client-side%20Debugging#set-the-debug-mode).*
