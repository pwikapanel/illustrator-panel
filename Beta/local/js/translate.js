
LANGDEFAULT    = 'en'                   // string    2-letter abbreviation
LANG           = HOSTENV.appUILocale.substr(0,2) // or appLocale

/*———————————————————————————————————————— translate(key)

    DICTIONARY is object filled from json file by manifest */

function translate(key){
  res = DICTIONARY.filter(record=> record.key==key && record.lang==LANG)

  if (res.length == 0) elapse(762, ' translate() - Missing translation key: "' + key + '"')
  else return res[0].text
}


