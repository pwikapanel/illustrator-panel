[logo]: http://files.svija.love/github/readme-logo.png?1 "Svija: SVG-based websites built in Adobe Illustrator"

*Updated 31 January, 2022 · Toulouse*

![Svija: SVG-based websites built in Adobe Illustrator][logo]

# Code Signing

*Based on [this page](https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Package%20Distribute%20Install) and [this Adobe PDF](https://wwwimages2.adobe.com/content/dam/acom/en/devnet/creativesuite/pdfs/SigningTechNote_CC.pdf)*.


All the commands below start from the **/code-signing** directory.

*N.B. the word **bundle** refers to the installable folder containing the program.*

---
### Preparing the Bundle

Remove all invisible files from the bundle:
```
cd ~/Documents/tools/Svija\ Tools   # add \ Beta if needed
```
Remove invisible files:
```
rm -rf \.[!.]*
rm -rf */\.[!.]*
rm -rf */*/\.[!.]*
cd ~/Documents/tools/code-signing
```
*Note: this will remove Vim undo's.*

Copy and paste the **custom icon** from the previous Svija Tools folder (in the DMG)

---
### Generate the Certificate

Use the included password below *or* generate a 16-character password at [passwordsgenerator.net](https://passwordsgenerator.net) (check all but the first box):

```
cd ZXPSignCmd-64bit\ 4.1.2
./ZXPSignCmd-64bit -selfSignedCert FR HG Svija AndrewSwift UjfcXTWjW8q3b35h signed-certificate.p12
mv signed-certificate.p12 ../
cd ..
```
Then add it to the repository:
```
git add signed-certificate.p12
git commit -m "signed certificate created" signed-certificate.p12
git push -u
```

If the password was changed:

    vi passwords.txt     # paste the entire ./ZXP... command line

Then commit the change:
```
git commit -m "signed certificate password added" passwords.txt
git push -u
```
---
### Sign the Bundle

If this is a public release, a **custom icon** needs to be added to the folder *before* the bundle is signed.

To sign **Svija Tools Beta**:
```
bundle=../../Svija\ Tools\ Beta
filename=../../Svija\ Tools\ Beta.zip
```
To sign the **Public Release**:
```
bundle=../../Svija\ Tools
filename=../svija-tools.zip
```
**Sign the bundle**:
```
cd ZXPSignCmd-64bit\ 4.1.2

certificate=../signed-certificate.p12
password=UjfcXTWjW8q3b35h
tsa=http://timestamp.digicert.com

./ZXPSignCmd-64bit -sign "$bundle" "$filename" "$certificate" "$password" -tsa "$tsa"

cd ..
```
At this point, you can delete the previous version in the finder and replace it with the new version.

---
### Installing the Signed Version

To install the bundle:

1. unzip the .zip file, and copy it 
2. paste it into the Adobe extensions folder  
in the Finder, type **cmd-shift-G**, then paste:
```
/Library/Application Support/Adobe/CEP/extensions
```
*Reminder: you can drag a file or folder onto the terminal window to insert its path.*

---

# More Information

To be installed normally, an Adobe extension has to be signed.

### The software signing tool: ZXPSignCmd-64bit

[ZXPSignCMD-64bit](https://github.com/Adobe-CEP/CEP-Resources/tree/master/ZXPSignCMD) is available from the [Adobe CEP repository](https://github.com/Adobe-CEP).

Download the **.dmg file** for the most recent version, and open it. It contains four files:

```
ZXPSignCmd-64bit
ZXPSignCmd-64bit-minimal
ZXPSignCmd-64bit-minimal.dSYM
ZXPSignCmd-64bit.dSYM
```

We will keep these files in the local Mac folder associated with **Svija Tools**.

---

### Creating a self-signed certificate:

```
ZXPSignCmd-64bit -selfSignedCert <countryCode> <stateOrProvince> <organization>
                                 <commonName> <password> <outputPath.p12> [options]
```

The various options:

```
countryCode                  certificate identifying information
stateOrProvince
organization
commonName
password                     password for the new certificate
outputPath.p12               path and file name for the new certificate
options -locality <code>     locale code to associate with this certificate
        -orgUnit <name>      organizational unit to associate with this certificate
        -email <addr>        email address to associate with this certificate
        -validityDays <num>  number of days from today certificate remains valid
```

*Example:*

To create a self-signed certificate:

    ./ZXPSignCmd-64bit -selfSignedCert US NY MyCompany MyCommonName abc123 MyCert.p12

This generates a file named MyCert.p12 in the current folder. You can use this certificate to sign your
extension:

    ./ZXPSignCmd-64bit -sign myExtProject myExtension.zxp MyCert.p12 abc123

This generates the file **myExtension.zxp** in the current folder, adding these two files to the packaged and
signed extension in the final ZXP archive:

* mimetype : A file with the ASCII name of mimetype that holds the MIME type for the ZIP container
(application/vnd.adobe.air-ucf-package+zip).
* signatures.xml: A file in the META-INF directory at the root level of the container file system that
holds digital signatures of the container and its contents.

---

### Using ZXPSignCmd-64bit

You can use this tool to create a self-signed certificate, create a signed ZXP package, or verify an existing ZXP package.

*To create a signed package:*

    ZXPSignCmd-64bit -sign <inputDir> <outputZxp> <p12> <p12Password> [options]

The various options

```
inputDir         path to the folder containing the files to package
outputZxp        path and file name for the resulting ZXP package
p12              path to the signing certificate
p12Password      certificate password
options          -tsa <timestampURL> timestamp server
```

---

### more stuff

make certificate:

```
./ZXPSignCmd-64bit -selfSignedCert <countryCode> <stateOrProvince> <organization> <commonName> <password> <outputPath.p12> [options]

./ZXPSignCmd-64bit -selfSignedCert FR HG Svija AndrewSwift q8BZeCLqx3a TestCert.p12
Self-signed certificate generated successfully
```

create zxp:

```
./ZXPSignCmd-64bit -sign <inputDirectory> <outputZxp> <p12> <p12Password> [options]

option -tsa [time stamp server]
```
see list here: https://gist.github.com/Manouchehri/fd754e402d98430243455713efada710

    ./ZXPSignCmd-64bit -sign /Library/Application\ Support/Adobe/CEP/extensions/Svija\ Tools.extension SvijaTools.zxp TestCert.p12 q8BZeCLqx3a -tsa http://timestamp.digicert.com

Signed successfully

---

You can then sign the package as described below.

At the end, change the extension .zxp to .zip, and put the file in the **master** folder.
