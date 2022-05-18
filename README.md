[logo]: http://files.svija.love/github/readme-logo.png?1 "Svija: SVG-based websites built in Adobe Illustrator"

*Updated 18 May, 2021 · Toulouse*

![Svija: SVG-based websites built in Adobe Illustrator][logo]

# Svija Tools 1.0.3

This repository is *only* for development of the **user interface**.

**Specific functionality** is developed in the [scripts-presets][l1] repository.

[l1]: https://github.com/svijalove/scripts-presets

<details><summary>Test website login (Expand ▸)</summary>

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

To enable both versions to be installed at the same time, the beta version has a separate bundle identifier including the word **beta**.

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
