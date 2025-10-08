
*Updated 18 July, 2024 · Toulouse*

![Svija: SVG-based websites built in Adobe Illustrator][logo]

[logo]: http://files.svija.com/github/readme-logo.png?1 "Svija: SVG-based websites built in Adobe Illustrator"

### Version Update

Instructions for releasing a new version of Svija.

It is not possible to use the same signed version for Adobe Exchange and DMG distribution:
- the PC & Adobe Exchange versions do not have a custom icon
- the DMG version does have a custom icon

Otherwise, once the Exchange/PC version has been created, redo the process with a custom icon.

---
### to integrate below

- remove `.debug`
- also remove color of reset square
- remove extra versions of manifest.xml from the CSXS folder

(and add it back to beta after publication)

---
### 1. New Master Version

Set the repo address:
```
repo="Library/Mobile Documents/com~apple~CloudDocs/Repositories"
cd ~/"$repo/tools"
```
Note: it is important that the beta version folder never have had a custom icon.

Create a temporary **master version**:

- duplicate the **beta version** folder, replacing the folder called **svija**
```
rm -rf 'svija'
cp -r 'Beta' 'svija'
```
- remove " **Beta**" and "**Beta**" from **manifest.xml** and **initialize.js**:
```
vi -O 'svija/CSXS/manifest.xml' 'svija/panel/js/initialize.js'
```
If necessary update the verson number:
```
windo %s/1.0.5/1.0.6/g
```
---
### 2. Code Signing

‹— See [Code Signing][cs] at left. Come back here when done.

[cs]: Code%20Signing

---
### 3. Git Merge to Master

**VERY IMPORTANT**

The last time I did this, iCloud caused duplicates of every single file, with a " 2" added before the extension.

To delete all uncommitted files:
```
git clean -n # test run
git clean -f # for real
```
---

Check out the **destination branch** and merge ([list of commits](https://github.com/svijasvg/svija/commits/beta)):
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
### 4. Update the Documentation

Copy info from/to:

- [github.com/svijasvg/tools/commits/master](https://github.com/svijasvg/tools/commits/master)
- [tech.svija.com/programs/tools/changelog](https://tech.svija.com/programs/tools/changelog)

---
### 5. Create A New Github Release

On github, create a [new release](./releases) from the **master branch**.

- use the current version number
- use the month & year for the title
- use the [commit list][cl] for the description (see also [presets-scripts][ps])

[cl]: https://github.com/svijasvg/tools/commits/beta
[ps]: https://github.com/svijasvg/scripts-presets/releases

---
### 6. Check Out the Beta Branch

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
### 7. Increment the Version Number

Places to update the version number:
```
vi -O README.md svija\ Beta/js/initialize.js svija\ beta/CSXS/manifest.xml
```
The following file did not need to be updated last time.
```
vi Adobe\ Exchange/README.md
```
**Note:** this will break signing for the **svija beta** folder, but that folder has no utility until it is updated for other reasons.

---
### 8. Update tutorial content at tech.svija.com

Read through the [changelog](https://tech.svija.com/reference/changelogs/changelog-tools) and make a list of modfications for the new version.

Update the [documentation pages](https://tech.svija.com) if necessary.

---
### 9. Post to Social Media

Find a nice picture or make an ad to accompany the update, then

- [facebook.com/svijasvg](https://facebook.com/svijasvg)
- [twitter.com/svijasvg](https://twitter.com/svijasvg)
- [instagram/svijasvg](https://instagram/svijasvg) (make it 3x wide · has to be posted from phone)
- [linkedin.com/company/svijasvg](https://linkedin.com/company/svijasvg) (add text before adding image)
