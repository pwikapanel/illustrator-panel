
### App Icons

SVG/PNG icon

according to [CEP_6.1_HTML_Extension_Cookbook.pdf](https://raw.githubusercontent.com/Adobe-CEP/CEP-Resources/master/CEP_6.x/CEP_6.1_HTML_Extension_Cookbook.pdf):

### High DPI Panel Icons

In high DPI display mode, panel extensions may want to use high DPI icons. You set these icons
in extension's manifest.
```
<Icons>
  <Icon Type="Normal">./images/IconLight.png</Icon>
  <Icon Type="RollOver">./images/IconLight.png</Icon>
  <Icon Type="DarkNormal">./images/IconDark.png</Icon>
  <Icon Type="DarkRollOver">./images/IconDark.png</Icon>
</Icons>
```
You pack both normal icon files (IconLight.png and IconDark.png) and high DPI icon files (IconLight@2X.png and IconDark@2X.png) in your extension.

Host applications will be able to find and use

- IconLight.png and IconDark.png for normal display
- IconLight@2X.png and IconDark@2X.png for 200% high DPI display

@2X.ext is the industry standard. Please see more details on https://developer.apple.com/library/ios/qa/qa1686/_index.html.

---
From looking at the Apple page, this is apparently specific to macOS.

---

everything displays correctly in 29. need to test earler version & on windows
- the icons need to be 24 & 48 px
- the expected icons are used on macOS (@2X works)
- 1 pixel (2 pixels at retina resolution) are cut off above and below
- non-retina icons are _not_ resized, so get the retina icon the right size then use 1/2 for the regular one
