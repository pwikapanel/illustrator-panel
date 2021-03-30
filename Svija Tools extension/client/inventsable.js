    // relativePath (STRING) - Path to script file in the form './script/myscript.jsx'
    function loadScript(relativePath) {
      // 
      // Retrieve the panel's current absolute location in file system
      let root = decodeURI(
        window.__adobe_cep__.getSystemPath("extension")
    //).replace(/file\:\/{1,}/, "");
    // following line from https://github.com/Inventsable/CEP-Spy/issues/1
      ).replace(/file\:\/{1,}/, "/").replace(/\s/g, "\ ");
      //
      // Remove the relative prefix and concatenate relative and absolute positions
      let fullpath = `${root}${relativePath.replace(/^\./, "")}`;
      // 
      // Use $.evalFile within an evalScript call to load the script into memory
      window.__adobe_cep__.evalScript(`$.evalFile('${fullpath}')`);
    }
