#target illustrator  

/*:::::::::::::::::::::::::::::::::::::::: open.js / open.jsx

    open dialog inside folder of most recent document */

/*———————————————————————————————————————— notes

2210 Javascript Tools Guide CC (UI).pdf

openDlg

Opens the built-in platform-specific file-browsing dialog, in which the
user can select an existing file or files, and creates new File objects to
represent the selected files.

Differs from the class method openDialog() in that it presets the current
folder to this File object’s parent folder and the current file to this
object’s associated file.

If the user clicks OK, returns a File or Folder object for the selected file
or folder, or an array of objects. If the user cancels, returns null. */


//———————————————————————————————————————— openFile()

function openFile(){


  if (LASTPATH == ''){
    app.executeMenuCommand("open")
    return 
  }

  if (ISMAC) var slashPos = LASTPATH.lastIndexOf('/')
  else var slashPos = LASTPATH.lastIndexOf('\\')

  var newPath     = LASTPATH.substr(0, slashPos)
  var localFolder = Folder(newPath)
  var promptTitle = SITEURL

  try{

    myFolder = File(localFolder)
    fileRef = myFolder.openDlg(promptTitle, '', true)
    if (fileRef == null) return true

    if (fileRef.length == 1){
      var actualFile = File(fileRef)
      app.open(actualFile)
    }
    else{
      for (x=0; x<fileRef.length; x++){
      var actualFile = File(fileRef[x])
      app.open(actualFile)
      }
    }
  }
  catch(e){
    alert(e)
    app.executeMenuCommand("open")
  }
}


