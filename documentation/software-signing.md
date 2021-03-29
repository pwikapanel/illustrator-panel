*Updated 29 March, 2021*

![Svija: SVG-based websites built in Adobe Illustrator](http://files.svija.love/github/readme-logo.png?2 "Svija: SVG-based websites built in Adobe Illustrator")

**Software Signing**
--------------------

To be installed normally, an Adobe extension has to be signed.

Most of the information on this page comes from [this Adobe PDF](https://wwwimages2.adobe.com/content/dam/acom/en/devnet/creativesuite/pdfs/SigningTechNote_CC.pdf):

#### The software signing tool: ZXPSignCMD

[ZXPSignCMD](https://github.com/Adobe-CEP/CEP-Resources/tree/master/ZXPSignCMD) is available from the [Adobe CEP repository](https://github.com/Adobe-CEP).

Download the **.dmg file** for the most recent version, and open it. It contains four files:

    ZXPSignCmd-64bit
    ZXPSignCmd-64bit-minimal
    ZXPSignCmd-64bit-minimal.dSYM
    ZXPSignCmd-64bit.dSYM

#### To create a self-signed certificate:

    ZXPSignCmd -selfSignedCert <countryCode> <stateOrProvince> <organization>
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

If you already have a certificate, you can use that. Otherwise, begin by creating a self-signed certificate:

    ./ZXPSignCmd -selfSignedCert US NY MyCompany MyCommonName abc123 MyCert.p12

This generates a file named MyCert.p12 in the current folder. You can use this certificate to sign your
extension:

    ./ZXPSignCmd -sign myExtProject myExtension.zxp MyCert.p12 abc123

This generates the file **myExtension.zxp** in the current folder, adding these two files to the packaged and
signed extension in the final ZXP archive:

* mimetype : A file with the ASCII name of mimetype that holds the MIME type for the ZIP container
(application/vnd.adobe.air-ucf-package+zip).
* signatures.xml: A file in the META-INF directory at the root level of the container file system that
holds digital signatures of the container and its contents.

#### more stuff

https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Package%20Distribute%20Install

make certificate:

$ ./ZXPSignCmd-64bit -selfSignedCert <countryCode> <stateOrProvince> <organization> <commonName> <password> <outputPath.p12> [options]

$ ./ZXPSignCmd-64bit -selfSignedCert FR HG Svija AndrewSwift q8BZeCLqx3a TestCert.p12
Self-signed certificate generated successfully

create zxp:

$ ./ZXPSignCmd-64bit -sign <inputDirectory> <outputZxp> <p12> <p12Password> [options]

option -tsa [time stamp server]
see list here: https://gist.github.com/Manouchehri/fd754e402d98430243455713efada710

./ZXPSignCmd-64bit -sign /Library/Application\ Support/Adobe/CEP/extensions/Svija\ Tools.extension SvijaTools.zxp TestCert.p12 q8BZeCLqx3a -tsa http://timestamp.digicert.com

Signed successfully

———————————————————————————————————————— installing

https://zxpinstaller.com "could not parse"
http://install.anastasiy.com

The extension is damaged or file is not accessible, please re-download it and repair disk permissions (error code: 268)

————————————————————————————————————————

You can install ZXP files of the required extensions using the ExMan command-line tool
https://helpx.adobe.com/creative-cloud/kb/installingextensionsandaddons.html

https://www.adobe.com/go/ExManCmdMac

drag dmg contents to HD

in Terminal:

$ cd [drag MacOS folder from .dmg]

$ ./ExManCmd --install [drag zxp extension]

Failed to install, status = -268!

so there's something wrong, possibly that I have lots of extra files in the repo.

I'll try to create a clean folder, and do everything from the beginning

———————————————————————————————————————— 

1. copied to WF

2. changed permissions to 777

3. changed name to SvijaTools

4. removed custom icon

5. removed all hidden files

6. removed META-INF  presets-scripts  test.html  Svija Shortcuts.aia  interface colors.ai  svija tools panel 08.ai  svija tools_info.svg  svija tools_main.svg  versions  links  notes.txt  keyboard shortcut.txt  untracked  links.txt  README.md

in terminal, in signing tool folder

$ ./ZXPSignCmd-64bit -sign /Users/Base/Work\ Folder/SvijaTools signed.zxp TestCert.p12 q8BZeCLqx3a

ZXPInstaller.app failed same
ExtensionManager.app failed same

changed permissions to 777, didn't work

———————————————————————————————————————— more info from adobe

https://partners.adobe.com/exchangeprogram/creativecloud/support/exman-com-line-tool.html

rename downloaded ExMan folder to ExMan_root

copy .zxp to ExMan_root

$ cd ExMan_root
$ ./Contents/MacOS/ExManCmd ––install signed.zxp

didn't give an error, but 

$ ./Contents/MacOS/ExManCmd ––list all

didn't say anything

————————————————————————————————————————- 

had skipped this step:

Use the Creative Cloud desktop application to install or uninstall any Adobe application, in order to refresh the list of installed Adobe applications in the Extension Manager database.

so I updated Illustrator, tried again

no feedback is what happens when it doesn't find a file.

when I typed

$ ./Contents/MacOS/ExManCmd --install signed.zxp
Installing extension with file path = signed.zxp
Failed to install, status = -268!

looked in:
/Users/Base/Library/Application Support/Adobe/Extension Manager CC/Log

and found errors:

03/25/21 10:29:08:927 | [ERROR] |  | ExManCmd | EMCL |  |  |  | 29558 | CExtensionManager::createDBPath: makeWritableForAllUsers() failed, status = -163!
03/25/21 10:29:09:191 | [ERROR] |  | ExManCmd | EMCL |  |  |  | 29558 | Only support version >= 2.0 
03/25/21 10:29:09:197 | [ERROR] |  | ExManCmd | EMCL |  |  |  | 29558 | Failed initial installation attempt, reinitializing product list, status = -268!
03/25/21 10:29:09:529 | [WARN]  |  | ExManCmd | EMCL |  |  |  | 29558 | Failed to get version from file path "/Applications/Adobe Bridge 2020"!
03/25/21 10:29:09:530 | [WARN]  |  | ExManCmd | EMCL |  |  |  | 29558 | Failed to get version from file path "/Applications/Adobe Bridge 2021"!
03/25/21 10:29:09:530 | [WARN]  |  | ExManCmd | EMCL |  |  |  | 29558 | Failed to get version from file path "/Applications/Adobe Illustrator 2020"!
03/25/21 10:29:09:530 | [WARN]  |  | ExManCmd | EMCL |  |  |  | 29558 | Failed to get version from file path "/Applications/Adobe Illustrator 2021"!
03/25/21 10:29:09:530 | [WARN]  |  | ExManCmd | EMCL |  |  |  | 29558 | Failed to get version from file path "/Applications/Adobe Photoshop 2021"!
03/25/21 10:29:09:549 | [ERROR] |  | ExManCmd | EMCL |  |  |  | 29558 | Product list reinitialized - about to retry install
03/25/21 10:29:09:579 | [ERROR] |  | ExManCmd | EMCL |  |  |  | 29558 | Only support version >= 2.0 


https://community.adobe.com/t5/exchange/exmancmd-fails-with-abort-trap-6-error/m-p/10746851
proposes to rename the following:

/Library/Application Support/Adobe/Extension Manager CC/Configuration/DB/
/Library/Application Support/Adobe/Extension Manager CC/Configuration/XManConfigV2.xml

$ mv "/Library/Application Support/Adobe/Extension Manager CC/Configuration/DB" "/Library/Application Support/Adobe/Extension Manager CC/Configuration/DB-old"
$  mv "/Library/Application Support/Adobe/Extension Manager CC/Configuration/XManConfigV2.xml" "/Library/Application Support/Adobe/Extension Manager CC/Configuration/XManConfigV2-old.xml"

same error

———————————————————————————————————————— verbose

$ ./Contents/MacOS/ExManCmd --verbose --install signed.zxp

Installing extension with file path = signed.zxp
Failed to install, status = -268!
For detailed description of the error code, please visit : https://www.adobe.com/go/exman_error_details
redirects to: https://helpx.adobe.com/in/creative-cloud/kb/troubleshoot-common-addon-installation-issues.html#find-your-error-code

———————————————————————————————————————— https://community.adobe.com/t5/adobe-xd/plugins-update-to-adobe-xd-31-uninstalled-my-plugins/m-p/11321296

ExManCoreLibLog.YES (create an empty text file with this name) at:
Mac : /Users/<username>/Library/Application Support/Adobe/Extension Manager CC/Log/

created
~/Library/Application Support/Adobe/Extension Manager CC/Log/ExManCoreLibLog.YES
~/Library/Logs/asu.trace

then looked at following:
~/Library/Application Support/Adobe/Extension Manager CC/Log/EMCL.log
~/Library/Logs/CreativeCloud/ACC/ACC.log

nothing really useful

tried startig cc & quitting Illustrator

———————————————————————————————————————— https://community.adobe.com/t5/adobe-xd/plugins-update-to-adobe-xd-31-uninstalled-my-plugins/td-p/11303440?page=1

Please navigate to this location for macOS: /Library/Application Support/Adobe/Extension Manager CC/Configuration/DB/
Before renaming the file, please end all Adobe related processes from the Activity Monitor. Once renamed, please reboot and check again and let us know how it goes.

———————————————————————————————————————— 
go to the exchange portal to 
https://partners.adobe.com/exchangeprogram/creativecloud.html

https://www.adobe.io/creative-cloud/

https://console.adobe.io/servicesandapis

just brings me back to downloading SDK

https://www.adobe.io/illustrator/
