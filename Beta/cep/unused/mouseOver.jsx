#target illustrator  

var winObj

function popperUp(opn){
  winObj = popper()
  alert(typeof winObj)
}

function popper(){
  
  this.dlg = new Window('dialog', 'Save Button');

  var row = this.dlg.add('group', undefined, ''); 
  row.orientation = 'row'

  var cancelBtn = row.add('button', undefined, 'Cancel', {name:'cancel'});
  cancelBtn.onClick = function() { this.dlg.close() };

  this.dlg.show();

  return this.dlg
}

