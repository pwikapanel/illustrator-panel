
LANGDEFAULT    = 'en'                   // string    2-letter abbreviation
LANG           = HOSTENV.appUILocale.substr(0,2) // or appLocale

/*———————————————————————————————————————— translate(key)

    DICTIONARY is object filled from json file by manifest */

function translate(key){
  try{
    res = DICTIONARY.filter(record=> record.key==key && record.lang==LANG)
  }catch(msg){
    elapse(13, `translate.js - corrupt JSON\n\n ${msg}\n `)
    return 'ERROR'
  }

  if (res.length == 0) elapse(762, ' translate() - Missing translation key: "' + key + '"')
  else return res[0].text
}


