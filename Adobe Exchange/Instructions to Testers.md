*Updated 22 September, 2022 · Andrew's Mac*

![Svija: SVG-based websites built in Adobe Illustrator](http://files.svija.love/github/readme-logo.png?2 "Svija: SVG-based websites built in Adobe Illustrator")

### Preliminary note:

Svija Tools is an Illustrator panel that functions within a larger system to publish web content built in Illustrator.

A free account is required, available by signing up at https://svija.love/access

To see how it works, visit https://youtube.com/video/to_come (3 minutes).

Here, I have only included steps to test the functioning of the Svija Tools panel, without a website.

If you prefer to test the process on a real website, reject this application with a note to that effect and I will submit revisted testing instructions including a test account.

------------------------------
### In the Finder:

1. make a new folder called sync
2. inside, make a new folder called Svija
3. inside, make a new folder called SVG files

The result is three nested folders:

> sync/Svija/SVG Files

------------------------------
### In Illustrator:

1. make a new file using preset Web › Web-Large (1920x1080 px)
2. add some text and a rectangle
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
4. press space for Quick Look or open the SVG in Safari to verify that it matches the Illustrator file

------------------------------
### 3. & 4. Test the "Save All" buttons

1. make a second Illustrator file using preset Web › Web-Large (1920x1080 px)
2. add some text and a rectangle
3. save it as "page2.ai" in folder "sync"
4. click the "Save All" button    
—you will get a "replace files" confirmation alert
5. click "OK" when finished
6. verify in the Finder that sync/Svija/SVG Files/page1-01.svg and page2-01.svg were created
7. press space for Quick Look or open the SVG in Safari to verify that it matches the Illustrator file

Repeat steps 3-7 but use the "Save All & Close" button

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

1. in file "page1.ai" place a JPG image that is on the local hard drive but NOT in the working folders    
—make sure the "Link" is checked in the "Place" dialog box
2. click the "Relink Images" button    
—it is NOT necessary for the image to be selected
3. click "Yes" to create a "Links" folder
4. click "No" to view the report
5. in the Finder, verify that the image has been copied to sync/Links
6. in Illustrator, verify that "Location" in the Links panel shows the path to the Links folder
7. delete the image in Illustrator
8. delete the image in the Links folder
9. repeat steps 1-6 but do NOT check "Link" in the "Place" dialog

------------------------------
### 07:45 Test the "Reset Names" button

This button changes the name of any named element in the "Layers" palette by adding extra characters, then changes it back.

It exists to fix a probem where naming conflicts in exported SVG file objects are not fixed even when the conflict is eliminated within Illustrator.

It has no visible effect with Illustrator.

1. in file "page1.ai" delete everything
2. create two rectangles, both named "henry"
3. rename one of the rectangles to "joe"
4. click the button "Reset Names"
5. click "OK" when complete
6. click the button "Save" in Svija Tools
7. open the SVG file in sync/Svija/SVG Files and verify that there are rectangles named henry and joe

------------------------------
### 08:05 Test the "Duplicate Layers" button

1. open files "page1.ai" and "page2.ai"
2. in file "page1.ai" create a new layer called "test"
3. draw a rectangle on the new layer
4. lock any other layers
5. click the "Duplicate Layers" button
6. click "Yes" when asked if the correct document is active
7. click "OK" when the process is complete
8. in "page2.ai" verify that the layer was copied correctly

Note: the confirmation dialog specifies that it is possible to add any object called "bottom-align" to a layer to cause the contents to be aligned relative to the bottom edge of the artboard. This function is currently broken but will be fixed soon.

------------------------------


<details><summary>more content</summary>










------------------------------
### Introduction

Hello,

Thank you for considering our app, Svija Tools, for Adobe Exchange.

The app is used primarily to save SVG files from Adobe Illustrator that will become pages in a website.

However, Svija Tools also can be used to:

- duplicate layers
- reset names
- import styles
- relink images

You will want to test the specific functionality of the Svija Tools panel, but I will also include instructions for modifying an actual web site, ashley.svija.site

preliminary note: Svija Tools has two interfaces
- a "less" interface with 2 buttons
- a "more" interface with 7 buttons

The "less" interface uses the same scripts as the "more" interface, so you will be mainly testing the "more" interface.

------------------------------
### 1. Interface Functionality

*Testing interface functionality:*

Open any Illustrator file then:

1. navigate to "Window › Extensions › Svija Tools"
2. click "Instructions" to see the help pane
3. click "Return" or click anywhere to return
4. click "More" to show the full interface
5. click "Instructions" to see the help pane
6. click "Return" or click anywhere to return

If necessary you can test with different Illustrator interface sizes and colors:  
> Illustrator Preferences > User Interface

I believe that changing the size of the interface requires a restart to take effect.

------------------------------
### 2. The Folder Hierarchy

Svija Tools requires a specific folder hierarchy to be present.

This hierarchy is synched with a web server to serve a website.

Create the following folder hiearchy:
```
sync/  
  ├ empty_illustrator_file.ai (can be named anything)
  └ Links/      
    └any_image.jpg (can be named anything)
  └ Svija/  
    └ SVG Files/
```
Lines ending in "/" represent folders.
- put a new empty illustrator file in the "sync/" folder
- put a JPG image (100-500kb) in the "Links" folder
- the SVG output will be saved in "Svija/SVG Files/"

------------------------------
### 3. Save as Svija

*Testing the "Save" button:* 

Open the empty Illustrator file in "sync/" and draw anything (rectangle, text, etc.).

1. navigate to "Window › Extensions › Svija Tools"

2. at the bottom of the Svija Tools panel, click "more" to show the full interface

3. click "Save"

4. in the Finder, navigate to sync/Svija/SVG Files and verify that the SVG file (or files: there will be one per artboard) was saved correctly

*Test 2: the "Save All" button*

Duplicate the Illustrator file in the Finder and open both in Illustrator

Make some changes to both files

At the bottom of the Svija Tools panel, click "Save All"

4. in the Finder, navigate to sync/Svija/SVG Files and verify that the SVG files were saved correctly
------------------------------




| ashley.svija.site/  
| └─ sync/  
|         ├─ Blank Page.ait      
|         └─ Links/      
|                ├─Half Shadow.png      
|                ├─Horizontal Glow.png      
|                └─Horizontal Shadow.png      
|         ┌─ Missing.ai      
|         ├─ Modules/      
|                ├─Computer Header.ai  
|                ├─Footer.ai  
|                ├─Links/  
|                         Half Shadow.png  
|         Horizontal Glow.png  
|         Horizontal Shadow.png  
|         Menu Shadow Collapsed.png  
|         Menu Shadow Expanded.png  
|                ├─Mobile Menu.ai  
|             
|         ├─ Page 1.ai      
|         ├─ Page 2.ai      
|         ├─ Page 3.ai  
|         ├─ Svija/  
|                 ├─ Svija  
|                 ├─ Svija  
|                 └─ Svija  
|                 Fonts  
|                 Images  
|                 Scripts  
|                 Shared Files  
|                 SVG Files  
|                 Svija Admin  




---

Test user:

Ann Davidson URL: ann.svija.site Connect ID: ann Connect PW: D87p9yXSvUeYnGPX

Admin ID: ann Admin PW: 5PdzfpyeFAF6Dk7S

Changes will not be visible unless you sign in to Svija Admin (link on app) The cache is refreshed every 24 hours

---

Login information for testing:

Nickname: Ann
URL: ann.svija.site
Connect ID: ann
Password: D87p9yXSvUeYnGPX

Login information for clicking on Admin icon:

Username: ann
Password: 5PdzfpyeFAF6Dk7S

————————————————————————————————————————

You will modify the test website https://ann.svija.site:

1. Configure the app

2. Download website files
3. Verify the downloaded files

4. Connect to Svija Admin

5. Start uploading
6. Modify files & verify publication of modifications

7. Verify functioning of icon buttons

————————————————————————————————————————

1. CONFIGURE THE APP

- Launch Svija Sync
- Click on "Click here to get started…" or go to menu Svija Sync › Preferences
- Add a Nickname (suggestion: "Ann")
- Paste the following information into the other fields:

URL: ann.svija.site
Connect ID: ann
Password: D87p9yXSvUeYnGPX

- Click "Set Folder" to select a new empty folder on your computer (suggestion: "ann.svija.site")
- Click "Done" or press Escape to return to the main screen

————————————————————————————————————————

2. DOWNLOAD WEBSITE FILES

Begin by downloading the website files:

- Click Download
- Wait for the message "Download Complete" (approx. 17MB)

————————————————————————————————————————

3. VERIFY THE DOWNLOADED FILES

- Click the "Folder" icon to open the local folder
- You will see the files used for designing the website
- Open the "Svija" folder containing the actual website content

————————————————————————————————————————

4. CONNECT TO SVIJA ADMIN

For modifications to be visible without waiting 24 hours, it is necessary to connect to Svija Admin:

- In Svija Sync, click the "Admin" icon to launch Svija Admin in a browser window
- Connect using the following information:

Username: ann
Password: 5PdzfpyeFAF6Dk7S

You can close the browser window. As long as you're signed in, changes are visible immediately.

————————————————————————————————————————

5. START UPLOADING

A design session begins by uploading:

- Click "Upload" or press the space bar
- Click "Continue" at the alert that someone else has modified the website

The progress bar should advance slowly:

- When the right edge advances, a sync has started
- When the left edge advances, the sync has finished
- There is a 3-second wait between each transfer

————————————————————————————————————————

6. MODIFY FILES & VERIFY PUBLICATION OF MODIFICATIONS

NOTE: Svija Sync should be continuously uploading during this phase.

To verify uploading, you will modify some files in the "Svija" folder.

Suggestions:

- Create a text file in Svija/Shared Files (suggestion: "test.txt")
- Visit the file at https://ann.svija.site/files/test.txt

You can also put a pdf in sync/files and it should be available at the corresponding web address.

Arbitrary folders will not work (e.g. ann.svija.site/myfolder/test.pdf). This is intentional.

To modify the website pages:

- Open Svija/SVG Files/page_1_1200.svg with a text editor and replace the text "Page One" near the bottom
- After uploading, visiting https://ann.svija.love on a computer will show the new text as the headline

Or for mobile:

- Open Svija/SVG Files/page_1_300.svg with a text editor and replace the text "Page One" near the bottom
- After uploading, visiting ann.svija.love on mobile should show the new text as the headline

It will be necessary to click the Cache icon for the change to be visible.

When you are done with these tests, press the Pause button or spacebar to stop synchronizing.

————————————————————————————————————————

7. verify functioning of icon buttons

- Click on Site and verify that the website opens in a browser window
- Click on Admin and verify that Svija Admin opens in a browser window
- Click on Cache and verify that an alert "Cache Cleard" is shown
- Click on Folder and verify that the local folder is opened
- Click on Answers and verify that the "Next Steps" web page opens
---

Test user:

Ashley Davidson URL: ashley.svija.site

Admin ID: ann Admin PW: 5PdzfpyeFAF6Dk7S

Changes will not be visible unless you sign in to Svija Admin (link on app) The cache is refreshed every 24 hours

```
ashley.svija.site ashley  BG9cxc5amdq5ELvW
```
```
ashley  rnh6C6h3qjtGq4gm
```

---


**Description** (255 chars): **UNUSED??**
```
Svija is a website builder based on Adobe Illustrator. 

What you create in Adobe illustrator is what you see online, instantly.

Svija is lightweight and fast. You'll be able to create rich, detailed web pages that would be impossible with other tools.
```
Contact Email
```
tech@svija.com  
```
Support Email
```
support@svija.com  
```
> Developer: edit profile to change (down in Edge on 240407)  


# to preview what submission will look like:

```
https://partners.adobe.com/exchangeprogram/creativecloud/exchange.details.108899.html
```

---

version information

Svija has been updated, and with this new version the folder hierarchy has been radically simplified.
You now get immediate access to your most important files. And, a link to helpful answers has been
added to the main panel.

---

#### promotional text

Svija Sync works with Svija: effortlessly create amazing web content with the
most powerful design software available — Adobe Illustrator.

---
#### description

Description · 4000 chars

NEEDS TO BE REPLACED · TWO TYPOS WERE FIXED

A description of your app, detailing features and functionality.
Users will only see the first five lines unless they click the “more” link.
The first few lines of the app description should include the value proposition and mention your best features, to entice users to click the link to read more.
Svija makes it easy to publish online from within Adobe Illustrator.

Before Svija, publishing on the internet was a cumbersome process, with limited and hard-to-use tools.

With Svija, you can use the most powerful design software available, effortlessly creating amazing web content.

Svija is only possible because of Svija Sync, a streamlined app that does just two things:

• Download changed or missing content
• Continuously upload modifications

————————————————————————————————————————

DOWNLOAD CHANGED OR MISSING CONTENT

Clicking the Download button will retrieve any files that have been modified or that are missing from your computer.

The first time you use Svija Sync, downloading will retrieve your entire website.

Later, it's most useful when working with a team or if you use more than one computer.

————————————————————————————————————————

CONTINUOUSLY UPLOAD MODIFICATIONS

Each time you start a design session, you'll launch Svija Sync and click Upload.

While you're creating, Svija Sync will check for any changes and continuously update your website.

As the site owner, you'll see the changes right away. Other people will see them after a 24-hour delay.

Of course, you can always choose to publish immediately or to keep content private if it's not ready.

————————————————————————————————————————

Use Svija Sync to manage up to 100 websites.
Music: The Duel · Michael Ramir C. · https://www.youtube.com/watch?v=deJklhkybZw


---

### Previous rejection

**Mon, Apr 12, 2021, 10:01 AM**
  
Hello Andrew,

Your product Svija Tools 1.0.0 does not currently meet the requirements to be published on Adobe Exchange. Your Product has been rejected for the following reasons:

Rejection Reason: The submission does not adhere to the Adobe branding guidelines for the following reason: The Featured Image contains Adobe Illustrator Icon without the Adobe Branding team's approval.

Please refer to Adobe Brand Guidelines for more info.

The .ZXP file included with the product submission could not be installed. The error we encountered was: [-402]. kindly refer this site for error code https://community.adobe.com/t5/exchange/every-exman-command-error-code-exmancmd-error-code-list/m-p/11386103?page&equals;1

We tried to signup using the form we got an error while submitting that form. For attaching Licenses you can attach them to the Upload and Docs Segment.

You may resubmit your product after applying the above mentioned changes.

---

**Note to approver:**

Q: I would have liked to include the license in the ZXP file, but I could not find documentation about where to put it. Can I just include it as a text file in the root directory?

Q: I am not clear about what kind of information would be helpful for a CCT/Enterprise user. I inserted the Extension Manager link because I know it works, but I'm not sure it's appropriate. Please advise.

We intend to use this build to test the installation process and make sure everything works smoothly. There will be a further update before we start promoting this project.

Thanks for your time,
Andrew Swift


0x6a j ┘
0x6b k ┐
0x6c l ┌
0x6d m └
0x6e n ┼
0x71 q ─
0x74 t ├
0x75 u ┤
0x76 v ┴
0x77 w ┬
0x78 x │

┘
┐
┌
└
┼
─
├
┤
┴
┬
│
</details>
