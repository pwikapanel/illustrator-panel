*Updated 3 July, 2025*

![Svija: SVG-based websites built in Adobe Illustrator](http://files.svija.love/github/readme-logo.png?3 "Svija: SVG-based websites built in Adobe Illustrator")

**CEP Versions**
-----------------

This document is meant to clarify which versions of Adobe Illustrator will be supported by **Svija Tools**.

- quick note: CEP 11 does not support local file fetch, so there are two versions of the fetch function, local and remote

---

I am writing a CEP panel for Adobe Illustrator. in CSXS/manifest.xml, there is the following xml:
```
<?xml version='1.0' encoding='UTF-8'?>                                                                                          
<ExtensionManifest ExtensionBundleId="com.svija.SvijaToolsBeta" ExtensionBundleVersion="1.0.7" Version="11.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                                                                                                                                
  <ExtensionList>                                                                                                               
    <Extension Id="com.svija.SvijaToolsBeta.panel" Version="1.0.7" />                                                           
  </ExtensionList>                                                                                                              
                                                                                                                                
  <ExecutionEnvironment>                                                                                                        
    <HostList>                                                                                                                  
      <Host Name="ILST" Version="17" />                                                                                         
    </HostList>                                                                                                                 
    <LocaleList>                                                                                                                
      <Locale Code="All" />                                                                                                     
    </LocaleList>                                                                                                               
    <RequiredRuntimeList>                                                                                                       
      <RequiredRuntime Name="CSXS" Version="11.0" />                                                                            
    </RequiredRuntimeList>                                                                                                      
  </ExecutionEnvironment>                                                                                                       
```
what is the difference in meaning between Version="11.0" in the ExtensionManifest tag at the beginning and version=11 in <RequiredRuntime Name="CSXS" Version="11.0" />?


ChatGPT said: The two Version="11.0" attributes in your manifest.xml refer to different things, even though they look similar:

1. ExtensionManifest Version="11.0"  
Located in: the root <ExtensionManifest> tag  
Meaning: Specifies the schema version of the manifest format itself.  

This tells the Adobe CEP framework how to interpret the manifest file.

As of CEP 11 (used in Illustrator 2024), Version="11.0" is the correct schema version.

Think of this as: "This manifest uses the syntax rules defined in version 11.0 of the manifest specification."

2. <RequiredRuntime Name="CSXS" Version="11.0" />  
Located in: <RequiredRuntimeList>  
Meaning: Specifies the minimum required version of the CEP runtime that your panel depends on.  

If you put Version="11.0", it means your extension requires CEP 11.0 or later.

This is enforced by the host app — if the CEP version is too old, the panel won’t load.

Think of this as: "This panel won’t run unless the CEP engine is at least version 11.0."

---

* * * * *

### Illustrator Releases

Creative Cloud and subscription pricing were introduced in 2013, with Illustrator CC (17).

Since that year, there has been a new release every year:

    year  12    13    14    15    16    17    18    19    20    21
    vers  16    17    18    19    20    21    22    23    24    25

Versions through 20 were released in mid year (June). Beginning with 21, they were released at the end of the previous year. Only four months elapsed between versions 20 and 21.

Each version carries the name of the year (CC 2018 was released at the end of 2017 etc.).

* * * * *

### File formats

Saving files as **Ai 17** means that they will be openable by all CC versions (since 2013).

* * * * *

### CEP Version

Since the oldest easily cracked version of Ai dates to 2017, we want to provide support to that year.

    CEP 10.0 released on Sep 23, 2020
    CEP  9.0 released on Oct 16, 2018
    CEP  8.0 released on Oct 25, 2017

By using CEP 8, Svija Tools will be usable by any version of Illustrator released since the end of 2017.
