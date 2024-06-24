
*Updated 21 June 2024 · Toulouse*

![Svija: SVG-based websites built in Adobe Illustrator][logo]

[logo]: http://files.svija.love/github/readme-logo.png?1 "Svija: SVG-based websites built in Adobe Illustrator"

### Validation Tests

These tests can be run through quickly on both Mac and PC to validate the six buttons.
---

Need to create two test sites that I can work with locally and copy to PC.

---
#### Save Page

››› create new page from new page.ait and try saving with Svija Tools

The Illustrator file must already have been saved at least once in the "sync" folder.

1. click the "Save" button
2. click "OK" when finished
3. verify in the Finder that "sync/Svija/SVG Files/page1_cp.svg" was created
4. press the spacebar to Quick Look, or open the SVG in Safari, to verify that it matches the Illustrator file

----
#### Save

- save an AI page
- save SVG, PDF and EPS pages
- save new-from-template page with other docs open
- save new-from-template page with no other docs open
- save page with missing Links folder
- save page with embedded image
- save page with missing linked image
- save page with nonnative artwork
- missing SVG Files folder

----
#### Save All

- save multiple AI pages
- save pages from two different sites

----
#### Check & Repair

- placed images outside sync
- placed images inside sync
- embedded images inside/outside sync
- file not in sync folder at all
- missing SVG Files folder

----
#### Import Styles

----
#### Duplicate Layers

----
#### Create Group

----
#### Check & Repair

with no links folder

1. in file "page1.ai" place a JPG image that is on the local hard drive but NOT in the test folders    
    — make sure that "Link" is checked in the "Place" dialog box
2. click the "Check & Repair" button (it is not necessary for the image to be selected)
3. when asked whether to create a "Links" folder, click "Yes"
4. when finished, click "No" to view the report

5. in the Finder, verify that the image has been copied to sync/Links
6. in Illustrator, verify that "Location" in the Links panel shows the path to the new image in the Links folder
7. delete the image in Illustrator
8. delete the image in the Links folder
9. repeat steps 1-6 but do NOT check "Link" in the "Place" dialog box

#### Animation Tip

1. click "Animation Tips"
2. click anywhere to close the tips
3. click "MORE" to show full button panel
4. click "Animation Tips"
5. click anywhere to close the tips
6. if desired, change Illustrator interface preferences (color & size) to verify that Svija Tools adapts correctly

#### Save All

Save All is the same as Save Page, except that it saves all open documents.

1. make a second Illustrator file using preset "Web › Web-Large" (1920x1080 px)
2. change the artboard name to "cp"
2. draw some text and a rectangle
3. save it as "page2.ai" in folder "sync"
4. click the "Save All" button    
5. click "OK" when finished
6. verify in the Finder that "sync/Svija/SVG Files/page1_cp.svg" and "page2_cp.svg" were created
7. press the spacebar for Quick Look or open the SVG in Safari to verify that they matches the Illustrator files

#### Import Styles

1. in file "page1.ai" create some area text with at least two paragraphs
2. modify the font and the paragraph spacing
3. in the "Character Styles" panel, create a new style called "Char Test"
4. in the "Paragraph Styles" panel, create a new style called "Para Test"
5. save changes and close page1.ai
6. in file "page2.ai" click the "Import Styles" button
7. select "page1.ai" when prompted
8. when asked "Include all styles?" click "Yes"
9. click "OK" in confirmation window
10. create some area text and apply the imported styles  

note: it will be necessary to choose a fill color after applying the styles

#### Create Group

Create Group has the same functionality as the menu item "Object › Group", except that it works when a single item is selected.

It is useful for animation objects, where the inside object and the surrounding group may be animated in different ways.

1. in file "page1.ai" select any single object
2. open the Layers panel and locate the object
3. click "Create Group"
4. verify that that the object is now part of a group in the Layers panel

#### Duplicate Layers

This button will copy any unlocked layers from the frontmost document to any other open documents.

Any layers with the same names are replaced, and an effort is made to be intelligent about which order the layers are added.

In the event of a mistake, the user can simply undo any modifications.

1. open files "page1.ai" and "page2.ai"
2. in file "page1.ai" create a new layer called "test"
3. draw a rectangle on the new layer
4. lock any other layers
5. click the "Duplicate Layers" button
6. click "Yes" when asked if the correct document is active
7. click "OK" when the process is complete
8. in "page2.ai" verify that the layer was copied correctly



Thank you for your time,
Andrew Swift, Svija
