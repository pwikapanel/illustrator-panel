[logo]: http://files.svija.love/github/readme-logo.png?1 "Svija: SVG-based websites built in Adobe Illustrator"

*Updated 1 October, 2021 · Toulouse*

![Svija: SVG-based websites built in Adobe Illustrator][logo]

# Code Signing

*Updated 30 March, 2021 · based on [this page](https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Package%20Distribute%20Install) and [this Adobe PDF](https://wwwimages2.adobe.com/content/dam/acom/en/devnet/creativesuite/pdfs/SigningTechNote_CC.pdf)*


*See below for more complete instructions*

---

### Prepare the Bundle

1. Rename **Svija Tools** to **Svija Tools Prev**

2. Duplicate **extensions** and rename to **Svija Tools**

3. Copy the **custom icon** from the previous Svija Tools folder

4. Edit **CSXS/manifest.xml** and remove all occurences of **Dev**

---

### Generate the certificate

Generate a 16-character password at [passwordsgenerator.net](https://passwordsgenerator.net) (check all but the first box).

    $ cd ZXPSignCmd-64bit 4.1.2
    $ ./ZXPSignCmd-64bit -selfSignedCert FR HG Svija AndrewSwift [password] ../[filename].p12

    # Self-signed certificate generated successfully

Copy the terminal command to the top of signing-records.txt for our records.

---

### Sign the bundle

**Note:** the bundle (**Svija Tools** in the root directory of this repository) should already have a custom icon. It is not possile to add a custom icon after signing if it was not in place at the time of signing.
```
program    destination    certificate    password    timestamp
    $ ./ZXPSignCmd-64bit -sign [bundle folder] ../[filename].zxp [certficate] [pwd] -tsa http://timestamp.digicert.com
# Signed successfully
```

*Reminder: you can drag a file or folder onto the terminal window to insert its path.*

---

# More Information

To be installed normally, an Adobe extension has to be signed.

### The software signing tool: ZXPSignCmd-64bit

[ZXPSignCMD-64bit](https://github.com/Adobe-CEP/CEP-Resources/tree/master/ZXPSignCMD) is available from the [Adobe CEP repository](https://github.com/Adobe-CEP).

Download the **.dmg file** for the most recent version, and open it. It contains four files:

    ZXPSignCmd-64bit
    ZXPSignCmd-64bit-minimal
    ZXPSignCmd-64bit-minimal.dSYM
    ZXPSignCmd-64bit.dSYM

We will keep these files in the local Mac folder associated with **Svija Tools**.

---

### Creating a self-signed certificate:

    ZXPSignCmd-64bit -selfSignedCert <countryCode> <stateOrProvince> <organization>
                                     <commonName> <password> <outputPath.p12> [options]

The various options:

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

    inputDir         path to the folder containing the files to package
    outputZxp        path and file name for the resulting ZXP package
    p12              path to the signing certificate
    p12Password      certificate password
    options          -tsa <timestampURL> timestamp server

---

### more stuff

make certificate:

    $ ./ZXPSignCmd-64bit -selfSignedCert <countryCode> <stateOrProvince> <organization> <commonName> <password> <outputPath.p12> [options]

    $ ./ZXPSignCmd-64bit -selfSignedCert FR HG Svija AndrewSwift q8BZeCLqx3a TestCert.p12
Self-signed certificate generated successfully

create zxp:

    $ ./ZXPSignCmd-64bit -sign <inputDirectory> <outputZxp> <p12> <p12Password> [options]

option -tsa [time stamp server]
see list here: https://gist.github.com/Manouchehri/fd754e402d98430243455713efada710

    $ ./ZXPSignCmd-64bit -sign /Library/Application\ Support/Adobe/CEP/extensions/Svija\ Tools.extension SvijaTools.zxp TestCert.p12 q8BZeCLqx3a -tsa http://timestamp.digicert.com

Signed successfully
