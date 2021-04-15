*Updated 15 April, 2021 · managed from Andrew Swift's computer*

![Svija: SVG-based websites built in Adobe Illustrator](http://files.svija.love/github/readme-logo.png?2 "Svija: SVG-based websites built in Adobe Illustrator")

**Creating a DMG Installer**
----------------------------

**Before starting:** update any icons, programs, etc. so that everything is ready for the installer.

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

*Based on [Justin Mitchel's article](https://www.codingforentrepreneurs.com/blog/create-icns-icons-for-macos-apps) on codingforentrepreneurs.com.*

Create an 1024x1024 transparent PNG image, then in terminal:

    $ cd [folder containing PNG] 
    $ src_img="[name of PNG]"

The following can just be pasted into terminal
```
output_iconset_name="VolumeIcon.iconset"
mkdir $output_iconset_name
sips -z 16 16     "$src_img" --out "${output_iconset_name}/icon_16x16.png"
sips -z 32 32     "$src_img" --out "${output_iconset_name}/icon_16x16@2x.png"
sips -z 32 32     "$src_img" --out "${output_iconset_name}/icon_32x32.png"
sips -z 64 64     "$src_img" --out "${output_iconset_name}/icon_32x32@2x.png"
sips -z 128 128   "$src_img" --out "${output_iconset_name}/icon_128x128.png"
sips -z 256 256   "$src_img" --out "${output_iconset_name}/icon_128x128@2x.png"
sips -z 256 256   "$src_img" --out "${output_iconset_name}/icon_256x256.png"
sips -z 512 512   "$src_img" --out "${output_iconset_name}/icon_256x256@2x.png"
sips -z 512 512   "$src_img" --out "${output_iconset_name}/icon_512x512.png"
iconutil -c icns $output_iconset_name
rm -R $output_iconset_name
```
The image will be renamed to add a leading dot when it is installed later.

* * * * *

### Creating the Background Images

* * * * *

### Creating the Folder Hierarchy

Create a new folder in the current folder, containing all the elements of the DMG, named with a date:

    Svija-Install-210415
    ├─ Adobe Extensions (alias of /Library/Application Support/Adobe/CEP/extensions)
    ├─ Applications (alias of /Applications)
    ├─ For installation instructions, View as Icons (empty file)
    ├─ Svija Shortcuts
    │  ├─ Scripts
    │  │  ├─ 0. Show Svija Tools — ⇧ F1.jsx
    │  │  ├─ 1. Save as Svija — ⌘ F1.jsx
    │  │  ├─ 2. Duplicate Layers — ⌘ F2.jsx
    │  │  ├─ 3. Reset Image Links — ⌘ F3.jsx
    │  │  └─ 4. Reset Object IDs — ⌘ F4.jsx
    │  └─ Svija Shortcuts.aia
    ├─ Svija Sync.app
    ├─ Svija Tools (signed folder from ST repo)
    ├─ VolumeIcon.icns
    ├─ bg_main.png
    ├─ bg_scripts.png
    └─ bg_shortcuts.png

Check the size of the folder — it should be just under 10MB.

* * * * *

### Pasting New Icons

**NOTE: Svija Sync doesn't support Mojave, and Ai 17 is not supported by Catalina, so I don't have to support Ai 17**

Because modifying the Svija Sync icon **requires re-notarizing the app**, the other icons should be color-consistant with the Sync icon.

The next step is to paste the six icons for the following aliases and folders:

    Svija-Install-210415
    ├─ Adobe Extensions · alias
    ├─ Applications · alias
    ├─ Svija Shortcuts · folder
    │  ├─ Scripts · folder
    │  └─ Svija Shortcuts.aia
    └─ Svija Tools · folder

* * * * *

### Rename Hidden Files

**Note:** to enable hidden files type fn-shift-cmd-.

Rename the following files to begin with a dot:

    VolumeIcon.icns
    bg_main.png
    bg_scripts.png
    bg_shortcuts.png

### Installing the ICNS Icon File

The following is based on [Parag Bafna's answer](https://stackoverflow.com/a/18443866/72958) on Stack Overflow.

The ICNS file should already be on the writeable DMG. Then:

$ SetFile -c icnC [drag ICNS on writeable DMG]
$ SetFile -a C [drag writeable DMG]

### Create the Empty DMG File

*Hidden files are still enabled for this step.*

In Disk Utility:

1. File › New Image › Blank Image...
2. stored in same folder as the previous folder
3. Save As: Svija Install RW.dmg
4. Name: Svija Install
5. Size: measured size +2MB
6. Format: Mac OS Extended (Journaled)
7. Image Format: read/write disk image

Open the DMG to mount it, then copy all the files, including hidden files, from the previous folder to the mounted DMG.

* * * * *

### Arrange the DMG Appearance

Open three folders in Icon View:

- the main DMG
- Svija Shortcuts
- Svija Shortcuts/Scripts

In a separate window, open the DMG in list view.

For each Icon View window, type cmd-J and set Background to Picture, then drag the appropriate background image from the List View window to the View Preferences panel.

Turn off hidden files and close the List View window.

Look in the accompanying **view-options** folder to see the correct view options for each window.

Make sure that the text size is **13pt**.

The empty file called "For installation instructions, View as Icons" should be in the white space to the right of the colored background.

* * * * *

### Resizing the Windows

**Hide the Sidebar for the three windows**.

**Horizontal resizing:** drag the right edge of the window to the edge of the **background image**.

**Vertical resizing:** drag the bottom edge up so the icons are cut off, then drag it down until the vertical scrollbar disappears.

The **Scripts Folder** should just be made the same height as the other two.

**Note:** the backgrounds have enough extra width that for most users (side bar visible, not extremely wide), the content should look nice.

Make sure that all *other* windows are closed, then eject the DMG file.

* * * * *

### Making the Read-Only DMG

In **Disk Utility**, go to **Images › Convert…** and choose **Svija Install RW.dmg**.

Change the Image Format to compressed and save it without the " RW".

Note: "compressed" and "read-only" both work, but compressed images **loaded faster££ and were roughly **half the size** in testing.

* * * * *

### Outstanding Issues

* The alias icons are missing on Catalina & Mojave

* * * * *

### Miscellaneous Notes

If the user's status bar is visible, it will cover part of the window. It is NOT visible by default.

Some defaults:

* sidebar width on a new Big Sur account is 290 px.
* sidebar icon size (prefs › general) is Medium.
* the minimum sidebar width is 258px, before it disappears.

Realistically, the Sidebar will be between 258-490px – very few people will have wider sidebars or no sidebars.

### whether or not the side bar is showing:

if the user has "open new windows in tabs" checked, then the window will just be the same as the other window size, no fun at all.

It is possible to use an animated .gif as backgorund, but it will not be hi-res.

Hidig and showing the sidebar pushes the content off to the right — it does *not* cause the window width to change.
