
//:::::::::::::::::::::::::::::::::::::::: addListeners.js

var objId = 'button4r'

var obj = document.getElementById(objId)

if (obj === null) lert('button4r is null')

obj.addEventListener('click', test)

function test(){
  lert('function test')
}
