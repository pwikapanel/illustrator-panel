The main scripts are stored inside the extension, at:

    /Library/Application Support/Adobe/CEP/extensions/Svija Tools.extension

In order to be able to use the scripts in the File › Scripts menu, via keyboard shortcuts.

First create a link to the scripts folder:

    $ cd host
    $ ln -s /Applications/Adobe\ Illustrator\ 2021/Presets.localized/en_US/Scripts presets

Then, each time a commit is made, update them:

    $ copy *.jsx presets

* * * * *

**Keyboard Shortcuts**
----------------------

The scripts work independently of the panel.

The proposed shortcuts, implemented through the Actions panel, are:

* cmd-F1 · show/hide Svija Tools
* cmd-F2 · Save as Svija
* cmd-F3 · Propagate Layers
* cmd-F4 · Reset Image Links
