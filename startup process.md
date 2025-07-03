
This is meant to go through the process by which the panel starts up.

1. shell.html is loaded
2. all CSS is loaded  
   Illustrator interface CSS references are set programatically later
3. `CSXS/CSInterface.js` is loaded
4. essential javascript is loaded  
   - CEP resources (localization, host environment, file path)  
   - an event listener to show alerts in case of JS errors  
   - timer scripts to monitor program execution
