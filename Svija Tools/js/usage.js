
/* vim: set foldmethod=marker fmr=/*\—,///: */

/*:::::::::::::::::::::::::::::::::::::::: usage.js */

/*———————————————————————————————————————— startup time */

var d = new Date()
var STARTUPTIME = d.getTime() - TIMER
elapse(8, `startup took ${STARTUPTIME} MS`)
///
/*———————————————————————————————————————— javascript use */

var USEDHEAP = 'n/a'

if (performance && performance.memory) {
  USEDHEAP = performance.memory.usedJSHeapSize/1000000
  elapse(14, `usedJSHeapSize: ${USEDHEAP} MB`)
}
///
/*———————————————————————————————————————— send to CEP */

VARTOCEP('STARTUPTIME', STARTUPTIME)
VARTOCEP('USEDHEAP'   , USEDHEAP   )
///

//:::::::::::::::::::::::::::::::::::::::: fin

