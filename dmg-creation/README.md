*Updated 15 April, 2021 · managed from Andrew Swift's computer*

![Svija: SVG-based websites built in Adobe Illustrator](http://files.svija.love/github/readme-logo.png?2 "Svija: SVG-based websites built in Adobe Illustrator")

**Creating a DMG Installer**
----------------------------

This page has several parts:

- creating the disk icon
- creating the folder hierarchy
- creating the empty disk image
- adding everything to the disk image
- adding background images
- adding the disk icon
- arranging the windows & icons

* * * * *

### Creating the ICNS Icon File

how to create an icns file?

Based on [Justin Mitchel's article](https://www.codingforentrepreneurs.com/blog/create-icns-icons-for-macos-apps) on codingforentrepreneurs.com.

cd to folder containing icon

input_filepath="cfe_icon_1024_x_1024.png"
output_iconset_name="CFE.iconset"
mkdir $output_iconset_name
sips -z 16 16     "$input_filepath" --out "${output_iconset_name}/icon_16x16.png"
sips -z 32 32     "$input_filepath" --out "${output_iconset_name}/icon_16x16@2x.png"
sips -z 32 32     "$input_filepath" --out "${output_iconset_name}/icon_32x32.png"
sips -z 64 64     "$input_filepath" --out "${output_iconset_name}/icon_32x32@2x.png"
sips -z 128 128   "$input_filepath" --out "${output_iconset_name}/icon_128x128.png"
sips -z 256 256   "$input_filepath" --out "${output_iconset_name}/icon_128x128@2x.png"
sips -z 256 256   "$input_filepath" --out "${output_iconset_name}/icon_256x256.png"
sips -z 512 512   "$input_filepath" --out "${output_iconset_name}/icon_256x256@2x.png"
sips -z 512 512   "$input_filepath" --out "${output_iconset_name}/icon_512x512.png"
iconutil -c icns $output_iconset_name
rm -R $output_iconset_name



* * * * *
outstanding issues:

icon for DMG file
icon for mounted DMG file
folder icons on Catalina are wrong

————————————————————————————————————————

DON'T FORGET TO OPEN ALL FOLDERS ON DISK AND SET APPEARANCE

all folders should be open when DMG is ejected

————————————————————————————————————————


problem: the window size of the read-only dmg is respected, but I can't
predict the width of the sidebar, and
the sidebar pushes the content to the right.

so the width needs to look good from no sidebar to wide sidebar (0-400px)

if status bar is visible, it will be on top of image, meaning: if the DMG was created without the status bar, but opened on a computer where the status bar is being shown, the visible height will be reduced as if the status bar is OVER the window content.

status bar is NOT visible by default

default sidebar width on vierge account is 290 px
default sidebar icon size (prefs › general) is Medium
min sidebar width is 258px, before it disappears

realistically, sidebar will be between 258-490px, very few people will have wider sidebars or no sidebars


divide by 2 for actual Ai width, will assume at least default, so range of (290-490)/2
————————————————————————————————————————

image will be wider, but WINDOW will have 100px extra marge for wide sidebars

————————————————————————————————————————


if you have different windows open (for chaging background image) make sure that if you close all and reopen DMG it's the right size

————————————————————————————————————————

the backgrond images need to be on the DMG (just stat the names with dot)

————————————————————————————————————————

whether or not the side bar is showing:

if the user has "open new windows in tabs" checked, then the window will just be the same as the other window size, no fun at all.

get terminal command to convet to cmpresses, annnoying to use dkis utiliity

————————————————————————————————————————

	FINAL WORKIG SOLUTION: ADD THE EXTRA WIDTH
WHEN CREATING THE DMG, HIDE THE SIDEBAR, AND USE THE WHOLE WIDTH OF THE 
BACKGROUND IMAGE (WHIHC WILL BE EATEN UP BY THE SIDEBARS IF PEOPLE HAE HTEM)

————————————————————————————————————————


on catalina, I could get the background image by converting the DMG on Catalina, but the height of the window was wrong.

In any case, the width was right but the height was wrong, but it's not a minimmum height because when I redid it I cold make a much shorter window

the custom folder icons for the aliases were missing

———————————————————————————————————————— 

make initial DMG with suffix "READ-WRITE"
has all final contents, plus an extra file that can be deleted to make space

doesn't work to make read-only first: all formatting is lost when disk image is created, so done't bother formatting before creating

keep all icons in same repo for color compatibility

the mounted DMG icon is automatically a silver disk

don't forget to chang the icon of hte DMG FILE itself

can't change DMG icon if it's read only ;-) try changing permissions?


the first screen is good, but the second screen doesn't resize to the right size, so
it needs to be teh same sise as the first screen, so lots of explanation

compressed is half the size of read only

IT IS POSSIBLE TO USE AN ANIMATED .GIF AS BACKGORUND, BUT NO HI-RES

————————————————————————————————————————
https://stackoverflow.com/questions/96882/how-do-i-create-a-nice-looking-dmg-for-mac-os-x-using-command-line-tools

If you want to set custom volume icon then use below command

$ cp "/Volumes/customIcon.icns" "/Volumes/dmgName/.VolumeIcon.icns" 
didn't show up immediately

———————————————————————————————————————— 

———————————————————————————————————————— sidebar pushes content off to right, hidden


the window opened 10px wider than expected, so I added 10px extra padding on right side
it also opened 12,5px shorter than expected, scrolling content up (hiding top)



NOTE : I HAD TO CHECK MANUALLY WHEN SCROOLBARS APPEARED IN THE DMG WINDOW TO MAKE IT THE RIGHT SIZE




* * * * *
=====


managed from Andrew Swift's computer
*Updated 8 April, 2021*

![Svija: SVG-based websites built in Adobe Illustrator](http://files.svija.love/github/readme-logo.png?2 "Svija: SVG-based websites built in Adobe Illustrator")

**Creating the DMG installer**
------------------------------

*Based on [this page](https://gist.github.com/jadeatucker/5382343).*

Create an empty folder with the name of the DMG, then in Disk Utility:

* New Disk Image from Folder (sh-cmd N)
* select the folder
* choose **Read/Write**
* click Save

Then open the .dmg file.

* * * * *

### Adding the Aliases

Cmd-Alt drag the applications and extensions folders into the disk image.

In Finder press __CMD+1__ to switch to icon view and arrange icons as needed.

Press __CMD+J__ to show the View Options window and
adjust view settings as needed.

* Group By: **None**
* Sort By: **Snap to Grid**
* Icon Size: **128x128**
* Grid Spacing: [maximum]
* Text Size: **13**

From **Background:** section choose **Picture**.

**Unmount/Eject** the DMG file.

* * * * *

In **Disk Utility**:

* Images › Convert
* Image Format: **read-only**
* Use a new name

*Disk must be ejected.*

* * * * *

Open the new DMG to make sure it looks correct.
### Installing the ICNS Icon File

The following is based on [Parag Bafna's answer](https://stackoverflow.com/a/18443866/72958) on Stack Overflow.

The DMG icon is held in a .icns file in the root directory called **.VolumeIcon.icns**.

Start with a 1024x1024 transparent png image

***
dragged and renamed to .VolumeIcon.icns
$ SetFile -c icnC [drag ICNS on writeable DMG]
$ SetFile -a C [drag writeable DMG]
