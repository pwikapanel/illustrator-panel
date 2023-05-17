
*Updated 17 May, 2023 · Toulouse*

![Svija: SVG-based websites built in Adobe Illustrator][logo]

[logo]: http://files.svija.love/github/readme-logo.png?1 "Svija: SVG-based websites built in Adobe Illustrator"

### Version Update

Instructions for releasing a new version of Svija Tools.

Unfortunately it is not possible to use the same signed version for Adobe Excange and DMG distribution:
- the Adobe Exchange version does not have a custom icon
- the DMB version does have a custom icon

This time we will try the signed version *with* the icon to see if it breaks or not.

Otherwise, once the AE version has been created, redo the process with a custom icon.

---
### 1. New Master Version

Create a temporary **master version**:

- duplicate the **beta version** folder, replacing the folder called **Svija Tools**
```
cd ~/Documents/tools
rm -rf 'Svija Tools'
cp -r 'Svija Tools Beta' 'Svija Tools'
```
- remove " **Beta**" and "**Beta**" from **manifest.xml** and **initialize.js**:
```
vi -O 'Svija Tools/CSXS/manifest.xml' 'Svija Tools/panel/js/initialize.js'
```
- for **Adobe Exchange**, remove the custom icon from the folder [MAYBE NOT].
---
### 2. Code Signing

‹— See [Code Signing][cs] at left.

[cs]: Code%20Signing

---
### 3. Test the New Version

Code-signing is a delicate process and Illustrator is very picky about it.

<details><summary>installing an extension</summary>
<br>
- from Adobe CC
- via Anastasiy's Extension Manager ([link](https://install.anastasiy.com))
- installing the unzipped ZXP file manually

**Important:** if the **archive utility** is set to delete .zip files once expanded, make a copy *before* unzipping!

To install the bundle:

1. unzip the .zip file, and copy it 
2. paste it into the Adobe extensions folder  
in the Finder, type **cmd-shift-G**, then paste:
```
/Library/Application Support/Adobe/CEP/extensions
```
**Note:** the custom icon has to be re-pasted onto the folder after unzipping: open [Svija Tools.png][stp] in **Preview**, copy it, and paste it into the bundle's folder information window.

</details>

---
### 4. Git Merge to Master

**VERY IMPORTANT**

The last time I did this, iCloud caused duplicates of every single file, with a " 2" added before the extension.

It might be good to temporarily move the directory into Downloads before proceeding.

---

Check out the **destination branch** and merge ([list of commits](https://github.com/svijalove/Svija-Tools/commits/beta)):
```
git status
```
```
git checkout master
git merge beta --no-ff
```
Push the new version:
```
git push origin master
```
---
### 5. Update the Documentation

Copy info from/to:

- [github.com/svijalove/tools/commits/beta](https://github.com/svijalove/tools/commits/beta)
- [tech.svija.love/manual/changelog-tools](https://tech.svija.love/manual/changelog-tools)

---
### 6. Create A New Github Release

On github, create a [new release](./releases) from the **master branch**.

- use the current version number
- use the month & year for the title
- use the [commit list][cl] for the description (see also [presets-scripts][ps])

[cl]: https://github.com/svijalove/tools/commits/beta
[ps]: https://github.com/svijalove/scripts-presets/releases

---
### 7. Check Out the Beta Branch

Commit any changes, then check out the beta branch:
```
git status
git commit -m "last commit before going back to beta" -a
```
Commit any changes, then check out the beta branch:
```
git checkout beta 
git merge master --no-ff -m "starting new version"
git push -u
```
---
### 8. Increment the Version Number

Places to update the version number:
```
vi -O README.md Svija\ Tools\ Beta/js/initialize.js Svija\ Tools\ Beta/CSXS/manifest.xml
```
The following file did not need to be updated last time.
```
vi Adobe\ Exchange/README.md
```
**Note:** this will break signing for the **Svija Tools Beta** folder, but that folder has no utility until it is updated for other reasons.

---
### 9. Update tutorial content at tech.svija.com

Read through the [changelog](https://tech.svija.love/reference/changelogs/changelog-tools) and make a list of modfications for the new version.

Update the [documentation pages](https://tech.svija.love) if necessary.

---
### 10. Post to Social Media

Find a nice picture or make an ad to accompany the update, then

- [facebook.com/svijalove](https://facebook.com/svijalove)
- [twitter.com/svijalove](https://twitter.com/svijalove)
- [instagram/svijalove](https://instagram/svijalove) (make it 3x wide · has to be posted from phone)
- [linkedin.com/company/svijalove](https://linkedin.com/company/svijalove) (add text before adding image)
