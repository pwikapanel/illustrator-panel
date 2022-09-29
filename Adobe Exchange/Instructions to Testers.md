*Updated 29 September, 2022 · Andrew's Mac*

![Svija: SVG-based websites built in Adobe Illustrator](http://files.svija.love/github/readme-logo.png?2 "Svija: SVG-based websites built in Adobe Illustrator")

<details><summary>Pasteable Version</summary>

<br>*paste between ticks from Github, then go to the end in Vim and replace `### ` with a carriage return up to top*

```
Preliminary note:

Svija Tools is an Illustrator panel that functions within a larger system to publish web content built in Illustrator.

A free account is required, available by signing up at https://svija.love/access

To see how it works, visit https://www.youtube.com/watch?v=PgCX6D9pHm8 (2 minutes).

Here, I have only included steps to test the functioning of the Svija Tools panel, without a website.

If you prefer to test the process on a real website, reject this application with a note to that effect and I will submit revisted testing instructions including a test account.

------------------------------

In the Finder:

1. make a new folder called sync
2. inside, make a new folder called Svija
3. inside, make a new folder called SVG files

The result is three nested folders:

> sync/Svija/SVG Files

------------------------------

In Illustrator:

1. make a new file using preset "Web › Web-Large" (1920x1080 px)
2. draw some text and a rectangle
3. save it as "page1.ai" in folder "sync"

------------------------------

1. Test the Interface:

Open Svija Tools (under menu Window › Extensions › Svija Tools), then:

1. click "Instructions"
2. click anywhere to close instructions
3. click "MORE" to show full button panel
4. click "Instructions"
5. click anywhere to close instructions
6. if desired, change Illustrator interface preferences (color & size) to verify that Svija Tools adapts correctly

------------------------------

2. Test the "Save" button

The Illustrator file must already have been saved at least once in the "sync" folder.

1. click the "Save" button
2. click "OK" when finished
3. verify in the Finder that sync/Svija/SVG Files/page1-01.svg was created
4. press the spacebar for Quick Look or open the SVG in Safari to verify that it matches the Illustrator file

------------------------------

3. & 4. Test the "Save All" buttons

1. make a second Illustrator file using preset "Web › Web-Large" (1920x1080 px)
2. draw some text and a rectangle
3. save it as "page2.ai" in folder "sync"
4. click the "Save All" button    
— you will get a "replace files" confirmation alert
5. click "OK" when finished
6. verify in the Finder that sync/Svija/SVG Files/page1-01.svg and page2-01.svg were created
7. press the spacebar for Quick Look or open the SVG in Safari to verify that it matches the Illustrator file

Repeat steps 3-7 but click the "Save All & Close" button

------------------------------

5. Test the "Import Styles" button

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

------------------------------

6. Test the "Relink Images" button

This button copies any placed images to a "Links" adjacent to the active Illustrator file.

If a placed image file is in the SAME folder as the Illustrator file, it will be moved rather than copied.

1. in file "page1.ai" place a JPG image that is on the local hard drive but NOT in the test folders    
— make sure that "Link" is checked in the "Place" dialog box
2. click the "Relink Images" button (it is NOT necessary for the image to be selected)
3. when asked whether to create a "Links" folder, click "Yes"
4. when finished, click "No" to view the report
5. in the Finder, verify that the image has been copied to sync/Links
6. in Illustrator, verify that "Location" in the Links panel shows the path to the new image in the Links folder
7. delete the image in Illustrator
8. delete the image in the Links folder
9. repeat steps 1-6 but do NOT check "Link" in the "Place" dialog box

------------------------------

7. Test the "Reset Names" button

This button fixes a naming conflicts in exported SVG file objects when two objects have had the same name in Illustrator. 

It works by renaming all named elements in the active Illustrator file then renaming them BACK to the correct values.

This has no visible effect for the user, but forces Illustrator to reset the internal object ID's.

1. in file "page1.ai" delete everything
2. create two rectangles, both named "henry"
3. rename one of the rectangles to "joe"
4. click the button "Reset Names"
5. click "OK" when complete
6. click the button "Save" in Svija Tools
7. open the SVG file in sync/Svija/SVG Files and verify that there are rectangles named henry and joe

The problem varies depending on the Illustrator version; this issue may not affect your version.

------------------------------

8. Test the "Duplicate Layers" button

This button will copy any unlocked layers from the frontmost document to any other open documents.

Any layers with the same names are replaced, and it tries to be intelligent about which order the layers are added.

In the event of a mistake, the user can simply undo any modifications.

1. open files "page1.ai" and "page2.ai"
2. in file "page1.ai" create a new layer called "test"
3. draw a rectangle on the new layer
4. lock any other layers
5. click the "Duplicate Layers" button
6. click "Yes" when asked if the correct document is active
7. click "OK" when the process is complete
8. in "page2.ai" verify that the layer was copied correctly

------------------------------

Conclusion

Thank you for your time.

Sincerely,
Andrew Swift, Svija
```

</details>

### Preliminary note:

Svija Tools is an Illustrator panel that functions within a larger system to publish web content built in Illustrator.

A free account is required, available by signing up at https://svija.love/access

To see how it works, visit https://www.youtube.com/watch?v=PgCX6D9pHm8 (2 minutes).

Here, I have only included steps to test the functioning of the Svija Tools panel, without a website.

If you prefer to test the process on a real website, reject this application with a note to that effect and I will submit revisted testing instructions, including a test account.

------------------------------
### In the Finder:

1. make a new folder called sync
2. inside, make a new folder called Svija
3. inside, make a new folder called SVG files

The result is three nested folders:

> sync/Svija/SVG Files

------------------------------
### In Illustrator:

1. make a new file using preset "Web › Web-Large" (1920x1080 px)
2. draw some text and a rectangle
3. save it as "page1.ai" in folder "sync"

------------------------------
### 1. Test the Interface:

Open Svija Tools (under menu Window › Extensions › Svija Tools), then:

1. click "Instructions"
2. click anywhere to close instructions
3. click "MORE" to show full button panel
4. click "Instructions"
5. click anywhere to close instructions
6. if desired, change Illustrator interface preferences (color & size) to verify that Svija Tools adapts correctly

------------------------------
### 2. Test the "Save" button

The Illustrator file must already have been saved at least once in the "sync" folder.

1. click the "Save" button
2. click "OK" when finished
3. verify in the Finder that sync/Svija/SVG Files/page1-01.svg was created
4. press the spacebar for Quick Look or open the SVG in Safari to verify that it matches the Illustrator file

------------------------------
### 3. & 4. Test the "Save All" buttons

1. make a second Illustrator file using preset "Web › Web-Large" (1920x1080 px)
2. draw some text and a rectangle
3. save it as "page2.ai" in folder "sync"
4. click the "Save All" button    
— you will get a "replace files" confirmation alert
5. click "OK" when finished
6. verify in the Finder that sync/Svija/SVG Files/page1-01.svg and page2-01.svg were created
7. press the spacebar for Quick Look or open the SVG in Safari to verify that it matches the Illustrator file

Repeat steps 3-7 but click the "Save All & Close" button

------------------------------
### 5. Test the "Import Styles" button

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

------------------------------
### 6. Test the "Relink Images" button

This button copies any placed images to a "Links" adjacent to the active Illustrator file.

If a placed image file is in the SAME folder as the Illustrator file, it will be moved rather than copied.

1. in file "page1.ai" place a JPG image that is on the local hard drive but NOT in the test folders    
— make sure that "Link" is checked in the "Place" dialog box
2. click the "Relink Images" button (it is NOT necessary for the image to be selected)
3. when asked whether to create a "Links" folder, click "Yes"
4. when finished, click "No" to view the report
5. in the Finder, verify that the image has been copied to sync/Links
6. in Illustrator, verify that "Location" in the Links panel shows the path to the new image in the Links folder
7. delete the image in Illustrator
8. delete the image in the Links folder
9. repeat steps 1-6 but do NOT check "Link" in the "Place" dialog box

------------------------------
### 7. Test the "Reset Names" button

This button fixes a naming conflicts in exported SVG file objects when two objects have had the same name in Illustrator. 

It works by renaming all named elements in the active Illustrator file then renaming them BACK to the correct values.

This has no visible effect for the user, but forces Illustrator to reset the internal object ID's.

1. in file "page1.ai" delete everything
2. create two rectangles, both named "henry"
3. rename one of the rectangles to "joe"
4. click the button "Reset Names"
5. click "OK" when complete
6. click the button "Save" in Svija Tools
7. open the SVG file in sync/Svija/SVG Files and verify that there are rectangles named henry and joe

The problem varies depending on the Illustrator version; this issue may not affect your version.

------------------------------
### 8. Test the "Duplicate Layers" button

This button will copy any unlocked layers from the frontmost document to any other open documents.

Any layers with the same names are replaced, and it tries to be intelligent about which order the layers are added.

In the event of a mistake, the user can simply undo any modifications.

1. open files "page1.ai" and "page2.ai"
2. in file "page1.ai" create a new layer called "test"
3. draw a rectangle on the new layer
4. lock any other layers
5. click the "Duplicate Layers" button
6. click "Yes" when asked if the correct document is active
7. click "OK" when the process is complete
8. in "page2.ai" verify that the layer was copied correctly

------------------------------
### Conclusion

Thank you for your time.

Sincerely,
Andrew Swift, Svija
