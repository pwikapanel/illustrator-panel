
This is meant to go through the process by which the panel starts up.

1. shell.html
2. all CSS
   Illustrator interface CSS references are set programatically later
3. `CSXS/CSInterface.js`
4. essential javascript
   - CEP resources (localization, host environment, file path)  
   - an event listener to show alerts in case of JS errors  
   - timer scripts to monitor program execution
5. `utilities.js` (no effect)
6. `colorUtilities.js` (no effect)
7. `jsxLoader.js` loads JSX files into CEP (no effect)
8. `globalVariables.js` initializes program

Following the loading of HTML, the management script is loaded, run on interrupts (the delay is set in `globalVariables.js`):

- `projectManager.js` which keeps track of the Svija project

`projectManager.js` must be first so the panel can display the correct content on startup (not show the closed buttons when it's a Svija page).

Next, scripts are loaded for each element of the panel, 
beginning with buttons shown when the panel is "closed" (no Svija
page is open):

 1. news (loaded from msg.svija.com)
 2. open folder
 3. open a page
 4. reopen the last page
 5. launch site
 6. launch svija cloud
 7. create group
 8. change case
 9. svija logo
10. check & repair
11. save all pages
12. save page
13. more/less link
14. help link
15. info link

Lastly:
1. `panelManager.js` which manages panel display
2. `usage.js` which reports on startup time and memor usage

Theoretically, these scripts are independent; each script is unaffected by modifications to other scripts.

`utilities.js` contains functions that are used in more than one place.

