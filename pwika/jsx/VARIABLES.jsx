
#target illustrator  

/* vim: set foldmethod=marker fmr=/*\—,///: */

//:::::::::::::::::::::::::::::::::::::::: VARIABLES.jsx

app.preferences.setBooleanPreference("ShowExternalJSXWarning", true)

// used by save.jsx & checkAndRepair.jsx

var STARTMS        // integer            ms at start of task

var ERRORS         // array of strings   errors, for user
var REPAIRS        // array of strings   repairs made, for user
var WARNINGS       // array of strings   warnings, for user

var IMAGESMODIFIED // array of arrays [name, boolean warning/error, message]
var IMAGESFIXED    // array of arrays [name, boolean warning/error, message]
var IMAGESFAILED   // array of arrays [name, boolean warning/error, message]

//:::::::::::::::::::::::::::::::::::::::: fin

