<?php

/*
Design: Joff&Ollie Studio http://www.joffandollie.co.uk/ and Holger Schnädelbach, from an original concept by Holger Schnädelbach 
Authors:  Robin Shackford - robin@littlebighead.com (original prototype) and Steve North (further development and expansion)
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

require 'setup.php';


function getExtension($str) {
	$i = strrpos($str,".");
	if (!$i) { return ""; }
	$l = strlen($str) - $i;
	return substr($str,$i+1,$l);
}

function removeExtension($strName) { 
	$ext = strrchr($strName, '.'); 

	if($ext !== false) { 
		$strName = substr($strName, 0, -strlen($ext)); 
	} 
	return $strName; 
}  




if (!isset($_POST['owner'])) die("Error: no owner set");
$owner = $_POST['owner'];

if (!isset($_POST['name2'])) die("Error: no name2 set");
$name2 = $_POST['name2'];

if (!isset($_POST['url'])) die("Error: no url set");
$url = $_POST['url'];

$findbean = R::findOne('map', ' name = ? ', array($name2));		
$count = 1;
$name3 = $name2;
while($findbean != null) {
	$name3 = $name2 . "_" . $count;
	$findbean = R::findOne('map', ' name = ? ', array($name3));		
	$count++;
}
$bean = R::dispense('map');
$bean->owner = $owner;
$bean->name = $name3;
$bean->url = $url;
R::store($bean);

echo "id=".$bean->id . "&name=".$name3;

?>
