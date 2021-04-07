*Updated 2 April, 2021*

![Svija: SVG-based websites built in Adobe Illustrator](http://files.svija.love/github/readme-logo.png?2 "Svija: SVG-based websites built in Adobe Illustrator")

**Svija Tools 1.0**
-------------------

These are the scripts that are used in Svija Tools.

They are stored in a separate repo because to facilitate development they are stored in:

    Adobe Illustrator 2021/Presets/en_US/Scripts

* * * * *

from notes:

need to pass parent entity, not parent doc, when creating layer

use parentObj instead of destDoc



copyUnlockedLayers
    destLayer = newEmptyLayer(sourceLayer, destDoc);
        deleteExistingLayer
        findZ
    √ voffset = getVoffset(sourceLayer, destDoc);
    var didSome = copyAllItems(sourceLayer, destLayer, voffset);

* * * * *

### Tests

recursive sublayers

A set of testing Ai documents should be prepared instead of just listing problems here.

