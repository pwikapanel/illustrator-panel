
*Updated 24 June 2024 · Toulouse*

![Svija: SVG-based websites built in Adobe Illustrator][logo]

[logo]: http://files.svija.love/github/readme-logo.png?1 "Svija: SVG-based websites built in Adobe Illustrator"

### Validation Tests

These tests can be run through quickly on both Mac and PC to validate the six buttons.

Need to create two test sites that I can work with locally and copy to PC.

---
### Save Page

Saving an unsaved file:

1. open `new page.ait`
2. save with Svija Tools

Expected result: alert "File(s) not saved / Please save Untitled-1 normally."

---

Saving normally:

1. draw a shape on the larger of the two artboards (it may be necessary to unlock a layer)
2. save file as `test.ai` in the `sync` folder
3. click the "Save Page" button, then click "OK" when finished
4. verify in the Finder that "sync/Svija/SVG Files/page1_CP.svg" was created
5. open the SVG in a browser to verify that it matches the Illustrator file

Expected result: the exported SVG matches the contents of the Illustrator page.

---

Saving the wrong file type:

1. save the page as `test.pdf`
2. click "Save Page"

Expected result: an alert "File(s) Not Saved / File Test.pdf is not a .ai file and was not saved"

---

Saving an unsaved file with another page from the same site open:

1. create a new page from template and open another page from the site
2. click "Save Page" for new template

Expected result: correct sync folder should be opened.

----
### Saving with Images

Missing `Links` folder:

1. save page with missing Links folder (no placed images)

Expected result: page saved normally

Saving with an embedded image:

1. place image from elsewhere on HD *without* checking "link"
2. click "Save Page"

Expected result: page saved normally with alert "Test.ai contains embedded images. Please run "Check & Repair"

Saving with an external image:

1. delete the embedded image
2. rename or delete `Links` folder so it is not available
3. place an image from outside the site and check "link"

Expected result: page saved normally with alert "Test.ai contains external image(s) — please run "Check & Repair"

Missing `SVIJA` folder:

1. rename or delete `SVIJA` folder so it is not available
2. click "Save Page"

Expected result: alert "File(s) Not Saved / Missing "SVIJA" folder"

Missing `SVG Files` folder

1. rename or delete `SVG Files` folder so it is not available
2. click "Save Page"

Expected result: alert "File(s) Not Saved / Missing "SVG Files" folder"

Missing `sync` folder:

1. close the file, rename `sync` to `syncx`
2. reopen the file
3. click "Save Page"

Expected result: alert "File(s) Not Saved / Page not in "sync" folder"

----
### Save All

1. open two different pages from two different sites
2. click "Save All"

Expected result: the appropriate `SVG Files` folders contain updated SVG files

----
### Check & Repair

Page not in `sync` folder:

1. close any open files
2. rename `sync` folder to `xsync`
3. open test page in Illustrator from within `xsync`
4. click "Check & Repair"

Expected result: alert "Page is not in a sync folder \ Is it a Svija page?"

Restore name of `sync` folder.

---

Missing `SVIJA` folder

1. close any open files
2. rename `SVIJA` folder to `xSVIJA`
3. open test page in Illustrator
4. click "Check & Repair"

Expected result: alert "Page is not in a sync folder \ Is it a Svija page?"

---

Missing `SVG Files` folder

1. close any open files
2. rename `sync` folder to `xsync`
3. open test page in Illustrator from within `xsync`
4. click "Check & Repair"

Expected result: alert "Page is not in a sync folder \ Is it a Svija page?"

---

With a missing `Links` folder:

1. in file "Home.ai" place a JPG image that is on the local hard drive but NOT in the test folders    
    — make sure that "Link" is checked in the "Place" dialog box
2. click the "Check & Repair" button (it is not necessary for the image to be selected)
3. when asked whether to create a "Links" folder, click "Yes"
4. when finished, click "Yes" to view the report

Expected result:
- alert "Links" folder created for images. / [image name] copied to 'Links' folder"
- the `Links` panel in Illustrator shows that the image is in the `Links` folder with the AI file
- a `Links` folder was created in the Finder
- the linked image is in the `Links` folder

---

An embedded image with missing `Links` folder

1. delete the image in Illustrator
2. delete the image in the Links folder
3. in file "Home.ai" place a JPG image that is on the local hard drive but NOT in the test folders    
    — make sure that "Link" is **unchecked** in the "Place" dialog box
4. click the "Check & Repair" button (it is not necessary for the image to be selected)
5. when asked whether to create a "Links" folder, click "Yes"
6. when finished, click "Yes" to view the report

Expected result:
- alert ""Links" folder created for images. / Missing image file relinked / [image name] copied to "Links" folder"
- the `Links` panel in Illustrator shows that the image is in the `Links` folder with the AI file
- a `Links` folder was created in the Finder
- the linked image is in the `Links` folder

---

A placed image in the same folder as the AI file

1. delete the previous image from the `Links` folder and from the AI page
2. copy a JPG image to the sync folder
3. place the image in the AI file (check "Link")
4. click "Check and Repair"

Expected result: alert "[image name] moved to "Links" folder"

---

An embedded image in the same folder as the AI file:

1. delete the previous image from the `Links` folder and from the AI page
2. copy a JPG image to the sync folder
3. place the image in the AI file (DO NOT check "Link")
4. click "Check and Repair"

Expected result: alert "Missing image file relinked / [image name] moved to "Links" folder"

----

### Import Styles

1. in one Illustrator page, create some area text with at least two paragraphs
2. modify the font and the paragraph spacing
3. in the "Paragraph Styles" panel, create a new style called "Para Test"
4. select a few words, change the style (make it italic, for example)
3. in the "Character Styles" panel, create a new style called "Char Test"
5. save changes and close the page
6. open or create a second Illustrator page
7. click the "Import Styles" button
7. select the first AI page when prompted
8. when asked "Include all styles?" click "Yes"
9. click "OK" in confirmation window
10. create some area text and apply the imported styles  

note: it will be necessary to choose a fill color after applying the styles

----
### Duplicate Layers

1. open two Illustrator pages
2. in one, create a new layer called "test"
3. draw a rectangle on the new layer
4. lock any other layers
5. click the "Duplicate Layers" button
6. click "Yes" when asked if the correct document is active
7. click "OK" when the process is complete

Expected result: the layer was copied correctly to the second page.

----
### Create Group

1. in an Illustrator page, select any single object
2. open the Layers panel and locate the object
3. click "Create Group"

Expected result: the object is now part of a group in the Layers panel

----
### Animation Tips

1. click "Animation Tips"
2. click anywhere to close the tips
3. click "MORE" to show full button panel
4. click "Animation Tips"
5. click anywhere to close the tips
6. if desired, change Illustrator interface preferences (color & size) to verify that Svija Tools adapts correctly

----
