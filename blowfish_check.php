<?PHP

/*
Authors:  Robin Shackford - robin@littlebighead.com (original prototype) Steve North (further development and expansion)
Contact name: Holger Schnädelbach
Contact email: Holger.Schnadelbach@nottingham.ac.uk 
Contact URI:  http://www.adaptivearchitecture.org.uk
License: AGPLv3 or later
License URI: http://www.gnu.org/licenses/agpl-3.0.en.html
Can: Commercial Use, Modify, Distribute, Place Warranty
Can't: Sublicence, Hold Liable
Must: Include Copyright, Include License, State Changes, Disclose Source

Copyright (c) 2016, The University of Nottingham
*/

  if(defined("CRYPT_BLOWFISH") && CRYPT_BLOWFISH) {
    echo "CRYPT_BLOWFISH is enabled!";
  } else {
    echo "CRYPT_BLOWFISH is NOT enabled!";
  }
?>



