
//:::::::::::::::::::::::::::::::::::::::: usage.js

//———————————————————————————————————————— startup time

var d = new Date()
var t = d.getTime() - TIMER
str = 'startup took '+t+'ms'
elapse(8, str)

//———————————————————————————————————————— javascript use

if (performance && performance.memory) {
  elapse(14, 'usedJSHeapSize: '+performance.memory.usedJSHeapSize/1000000   +' MB')
//elapse(15, 'totalJSHeapSize: '+performance.memory.totalJSHeapSize/1000000+' MB')
//elapse(16, 'jsHeapSizeLimit: '+performance.memory.jsHeapSizeLimit/1000000+' MB')
}


//:::::::::::::::::::::::::::::::::::::::: fin

