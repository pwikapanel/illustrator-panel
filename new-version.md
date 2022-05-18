[logo]: http://files.svija.love/github/readme-logo.png?1 "Svija: SVG-based websites built in Adobe Illustrator"

*Updated 18 May, 2021 · Toulouse*

![Svija: SVG-based websites built in Adobe Illustrator][logo]

# Version Update

Instructions for releasing a new version of Svija Tools.

---
### 1. New Master Version

The beta version **does not** need to be signed.

Create a temporary **master version**:

- duplicate the **beta version** folder to a folder called **Svija Tools** (do *not* add it to the repository)
- remove the word **Beta** from **CSXS/manifest.xml**
```
vi ~/Documents/tools/Svija\ Tools/CSXS/manifest.xml
```
- Edit **panel/less.html** and **panel/more.html** and remove Beta from the page title
```
vi -O ~/Documents/tools/Svija\ Tools/panel/less.html ~/Documents/tools/Svija\ Tools/panel/more.html
```
- [sign][cs] the new version and move the .zip to the **master** folder

[cs]: https://github.com/svijalove/tools/tree/beta/code-signing

---
### 2. Test the New Version and copy to DMG repository

Code-signing is a delicate process and Illustrator is very picky about it.

**After pasting the correct icon**, install the new version of Svija Tools and **verify that the panel displays correctly** before proceeding.

If all goes well, copy Svija Tools to the **dmg-installation** repository.

---
### 3. Git Merge to Master

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
### 4. Update the Documentation

Copy info from/to:

- [github.com/svijalove/tools/commits/beta](https://github.com/svijalove/tools/commits/beta)
- [tech.svija.love/manual/changelog-tools](https://tech.svija.love/manual/changelog-tools)

---
### 5. Create A New Github Release

On github, create a new release from the **master branch**.

- use the current version number
- use the month & year for the title
- use the changelog text for the description

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
vi -O README.md Svija\ Tools\ Beta/panel/*info* Svija\ Tools\ Beta/CSXS/manifest.xml
```

---
### 8. Update tutorial content at tech.svija.com

Read through the [changelog](https://tech.svija.love/reference/changelogs/changelog-tools) and make a list of modfications for the new version.

Update the [documentation pages](https://tech.svija.love) if necessary.

---
### 9. Post to Social Media

Find a nice picture or make an ad to accompany the update, then

- [facebook.com/svijalove](https://facebook.com/svijalove)
- [twitter.com/svijalove](https://twitter.com/svijalove)
- [instagram/svijalove](https://instagram/svijalove) (make it 3x wide · has to be posted from phone)
- [linkedin.com/company/svijalove](https://linkedin.com/company/svijalove) (add text before adding image)
