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

