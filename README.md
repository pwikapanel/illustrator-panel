[logo]: http://files.svija.love/github/readme-logo.png?1 "Svija: SVG-based websites built in Adobe Illustrator"

*Updated 1 February, 2021 · Toulouse*

![Svija: SVG-based websites built in Adobe Illustrator][logo]

# NOTE TO MYSELF

the version should be the TITLE in the MANIFEST for the INSTRUCTIONS panel

# Svija Tools 1.0.1

This repository contains *only* development of the **user interface** and **specific functionality** that cannot be tested with scripts-presets.

**Script development** happens in the [scripts-presets][l1] repository.

[l1]: https://github.com/svijalove/scripts-presets

---

<details><summary>Expand test codes</summary>
```
svija.dev
svija210901
r2vv5Qf6cS7D6hPy

newuser.svija.dev
newuser220303
CqGlXJM1tUXIkOIn
```
</details>

---
### Two Versions

Two versions of Svija Tools are maintained: **beta** (a folder), and **master** (a ZIP archive).

> **Svija Tools Beta**: used for testing and user interface development.

The beta is updated and signed when a new release **presets-scripts** is prepared.

> **master**: the zipped, signed contents of the final public release.

The master is updated *only* when a **new release** is prepared, and is simply the signed ZXP file, renamed.

To enable both versions to be installed at the same time, the beta version as a separate bundle identifier including the word **beta**.

---
### Illustrator Interface Files

The **interface** folder contains two Illustrator files:

- **interface.ai** · the actual interface of Svija Tools
- **colors.ai** · used for evaluating color choices

Once colors are finalized in **colors.ai**, the final values are **applied to swatches** in interface.ai.
```
File › Save As…
Name: interface.svg
Format: SVG
In folder "SVG Exports"
√ Use Artboards

Fonts › Type: SVG
Subsetting: None
Image Location: Link
Uncheck Preserve Illustrator Editing Capabilities
CSS Properties: Style Elements
Decimal Places: 3
Check Output fewer <tspan> elements
Check Responsive
```
After exporting, copy the contents of **SVG Exports** to **Svija Tools Beta/panel/svg**

The bundle will need to be re-signed before the panel will function.

After creating a new signed version, **unzip it** and replace the **folder Svija Tools Beta**.

---
### Version Updates

Instructions for releasing a new version of Svija Tools.

---
### 1. New Master Version

Create a temporary master version:

- duplicate the **beta version folder** to **Svija Tools**
- remove the word **beta** from the bundle identifier in **CSXS/manifest.xml**
- create new signed version, zipped in the **master** folder

---
### 2. Git Merge to Master

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
### 3. Update the Documentation

Copy info from/to:

- [github.com/svijalove/tools/commits/beta](https://github.com/svijalove/tools/commits/beta)
- [tech.svija.love/manual/changelog-tools](https://tech.svija.love/manual/changelog-tools)

---
### 4. Create A New Github Release

On github, create a new release from the **master branch**.

- use the current version number
- use the month & year for the title
- use the changelog text for the description

---
### 5. Check Out the Beta Branch

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
### 6. Increment the Version Number

Places to update the version number:
```
vi -O README.md Svija\ Tools\ Beta/panel/*info*
```
---
### 7. Update tutorial content at tech.svija.com

Read through the [changelog](https://tech.svija.love/reference/changelogs/changelog-tools) and make a list of modfications for the new version.

Update the [documentation pages](https://tech.svija.love) if necessary.

---
### 8. Post to Social Media

Find a nice picture or make an ad to accompany the update, then

- [facebook.com/svijalove](https://facebook.com/svijalove)
- [twitter.com/svijalove](https://twitter.com/svijalove)
- [instagram/svijalove](https://instagram/svijalove) (make it 3x wide · has to be posted from phone)
- [linkedin.com/company/svijalove](https://linkedin.com/company/svijalove) (add text before adding image)
