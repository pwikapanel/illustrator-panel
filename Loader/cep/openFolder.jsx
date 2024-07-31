#target illustrator  

/*———————————————————————————————————————— openFolder(lastPath)

    open dialog with folder of most recent document */

function openFolder(){

  if (LASTPATH == ''){
    app.executeMenuCommand("open")
    return true
  }


  if (ISMAC) var slashPos = LASTPATH.lastIndexOf('/')
  else var slashPos = LASTPATH.lastIndexOf('\\')

  var newPath     = LASTPATH.substr(0, slashPos)
  var localFolder = Folder(newPath)
  var prpt        = SITEURL

/*

2210 Javascript Tools Guide CC (UI).pdf

openDlg

Opens the built-in platform-specific file-browsing dialog, in which the
user can select an existing file or files, and creates new File objects to
represent the selected files.

Differs from the class method openDialog() in that it presets the current
folder to this File object’s parent folder and the current file to this
object’s associated file.

If the user clicks OK, returns a File or Folder object for the selected file
or folder, or an array of objects. If the user cancels, returns null.

*/

  try{

    myFolder = File(localFolder)
    fileRef = myFolder.openDlg(prpt, '', true)
    if (fileRef == null) return true

    if (fileRef.length == 1){
      var zoopy = File(fileRef)
      app.open(zoopy)
    }
    else{
      for (x=0; x<fileRef.length; x++){
      var zoopy = File(fileRef[x])
      app.open(zoopy)
      }
    }
  }
  catch(errMsg){
    alert('error message\n'+errMsg)
    app.executeMenuCommand("open")
  }
}


