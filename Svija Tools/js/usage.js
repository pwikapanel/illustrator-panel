
/*:::::::::::::::::::::::::::::::::::::::: usage.js */

//———————————————————————————————————————— startup time

var d = new Date()
var STARTUPTIME = d.getTime() - TIMER + ' ms'
str = 'startup took '+STARTUPTIME
elapse(8, str)

//———————————————————————————————————————— javascript use

var USEDHEAP = 'n/a'

if (performance && performance.memory) {
  USEDHEAP = performance.memory.usedJSHeapSize/1000000   +' ' + TRANSLATE.mb
  elapse(14, 'usedJSHeapSize: '+USEDHEAP)
}


//:::::::::::::::::::::::::::::::::::::::: fin

