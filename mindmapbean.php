 
 
<?php
 
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
 
    require 'setup.php';
  
    $params = array();

	
	$createPasswordFromSpecificPlainTextPassword = false;
	$outputDebugPasswordToServersideFile = false;
	$specificPlainTextPassword = "PUTPLAINTEXTPASSWORDHERE";
	
	
	
    if (isset($_POST['action'])) {
      // param was set in the query string
        if(empty($_POST['action'])) {
            die("Error: Empty action requested.");    
            // query string had param set to nothing ie ?param=&param2=something
        } else {
            $action = $_POST['action'];
        
       }
    } else {
        die("Error: No action parameter.");    
    }
    
//    if (!$action) die("Error: No action requested.");

    if (isset($_POST['param1'])) {
      // param was set in the query string
        if(empty($_POST['param1'])) {
//            die("Error: Empty action requested.");    
            // query string had param set to nothing ie ?param=&param2=something
        } else {
            $params[0] = $_POST['param1'];        
       }
    }
    
    if (isset($_POST['param2'])) {
      // param was set in the query string
        if(empty($_POST['param2'])) {
//            die("Error: Empty action requested.");    
            // query string had param set to nothing ie ?param=&param2=something
        } else {
            $params[1] = $_POST['param2'];        
       }
    }
    
    if (isset($_POST['param3'])) {
      // param was set in the query string
        if(empty($_POST['param3'])) {
//            die("Error: Empty action requested.");    
            // query string had param set to nothing ie ?param=&param2=something
        } else {
            $params[2] = $_POST['param3'];        
       }
    }

    if (isset($_POST['param4'])) {
      // param was set in the query string
        if(empty($_POST['param4'])) {
//            die("Error: Empty action requested.");    
            // query string had param set to nothing ie ?param=&param2=something
        } else {
            $params[3] = $_POST['param4'];        
       }
    }
    
    if (isset($_POST['params'])) {
      // param was set in the query string
        if(empty($_POST['params'])) {
//            die("Error: Empty action requested.");    
            // query string had param set to nothing ie ?param=&param2=something
        } else {
            $params = explode("|", $_POST['params']);            
       }
    }
    
    
// ---------------------------------------------

    if (isset($_POST['p1'])) {
      // param was set in the query string
        if(empty($_POST['p1'])) {
//            die("Error: Empty action requested.");    
            // query string had param set to nothing ie ?param=&param2=something
        } else {
            $params[0] = $_POST['p1'];        
       }
    }
    
    if (isset($_POST['p2'])) {
      // param was set in the query string
        if(empty($_POST['p2'])) {
//            die("Error: Empty action requested.");    
            // query string had param set to nothing ie ?param=&param2=something
        } else {
            $params[1] = $_POST['p2'];        
       }
    }
    
    if (isset($_POST['p3'])) {
      // param was set in the query string
        if(empty($_POST['p3'])) {
//            die("Error: Empty action requested.");    
            // query string had param set to nothing ie ?param=&param2=something
        } else {
            $params[2] = $_POST['p3'];        
       }
    }

    if (isset($_POST['p4'])) {
      // param was set in the query string
        if(empty($_POST['p4'])) {
//            die("Error: Empty action requested.");    
            // query string had param set to nothing ie ?param=&param2=something
        } else {
            $params[3] = $_POST['p4'];        
       }
    }
    
    if (isset($_POST['ps'])) {
      // param was set in the query string
        if(empty($_POST['ps'])) {
//            die("Error: Empty action requested.");    
            // query string had param set to nothing ie ?param=&param2=something
        } else {
            $params = explode("|", $_POST['ps']);            
       }
    }
    

    switch (strtolower($action)) {
        case "register":
			if (!isset($_POST['u'])) {
				die ("Error: something not set");
			}
			if (!isset($_POST['p'])) {
				die ("Error: something not set");
			}
			if (!isset($_POST['e'])) {
				die ("Error: something not set");
			}
			$bean = R::findOne('user','username = ? ',array($_POST['u']));
            //$bean = R::load('user', $_POST['u']);
            
			if ($bean != null) {
                die("Error: username taken.");
            }          
			
		
            $bean = R::dispense('user');
			$bean->username = $_POST['u'];
	
// Steve add next bit to use Blowfish (a.k.a. bcrypt) hashing when registering user passwords 
	
		//	$bean->password = crypt($_POST['p']); // this is the standard Blowfish implementation, without a random salt
		
		//for improved security, better_crypt() creates a blowfish hash from the input value using a random salt made up of letters and numbers
		// Note: you can still use the crypt() function to test because it recognises that the better_crypt() password hash was generated using blowfish.
			$bean->password = better_crypt($_POST['p']);
		//  $bean->password = better_crypt($_POST['p']); // will take longer
		//  $bean->password = better_crypt($_POST['p']); // will take a LOT longer
			
		//	$bean->password = $_POST['p'];
			$bean->email = $_POST['e'];
            R::store($bean);
            echo "id=". $bean->id;
            break;
			
		
		// Steve add:
		
		case "resetpassword":
		
		//debug('reset');
		
			if (!isset($_POST['u'])) {
				die ("Error: something not set");
			}

			$bean = R::findOne('user','username = ? ',array($_POST['u']));
			
           
			if ($bean == null) {
                die("Error: username does not exist.");
            }          
			

	// Create a new random password for the submitted username
	
	$requiredPasswordLengthInChars = 8;
	$inputForOpenSSL = round($requiredPasswordLengthInChars/2);
	
	$bytes = openssl_random_pseudo_bytes($inputForOpenSSL);
	
	$p = bin2hex($bytes);
	

	if($createPasswordFromSpecificPlainTextPassword)
	{
	$p = $specificPlainTextPassword;
	}
	
	// You can use the following to retrieve a new plain text password in debug.out
	//debug($p);
	
// Steve add next bit to use Blowfish (a.k.a. bcrypt) hashing when registering user passwords 
	
		//	$bean->password = crypt($p); // this is the standard Blowfish implementation, without a random salt
		
		//for improved security, better_crypt() creates a blowfish hash from the input value using a random salt made up of letters and numbers
		// Note: you can still use the crypt() function to test because it recognises that the better_crypt() password hash was generated using blowfish.
			$bean->password = better_crypt($p);
		//  $bean->password = better_crypt($p); // will take longer
		//  $bean->password = better_crypt($p); // will take a LOT longer
			
		    R::store($bean);
            echo "id=". $bean->id;

if ($outputDebugPasswordToServersideFile)
{
// You can use the following to retrieve the new plain text password, along with its hash in debug.out
debug($p.'='.$bean->password);
}			

// Now, let's email the user with the new plain-text password (not the hashed version saved to the DB)...

/* ##################  START SENDGRID STUFF ################################################ */

$emailAddress = $bean->email;
$username = $bean->username;

require 'PHPMailer-master/PHPMailerAutoload.php';

$mail = new PHPMailer;

//$mail->SMTPDebug = 3;                          // Enable verbose debug output

$mail->isSMTP();                                        // Set mailer to use SMTP 
$mail->Host = 'smtp.sendgrid.net';             // Specify main/backup SMTP servers 
$mail->SMTPAuth = true;                           // Enable SMTP authentication 
$mail->Username = '<YOUR SMTP USERNAME>';    // SMTP username 
$mail->Password = '<YOUR SMTP PASSWORD>';    // SMTP password 
$mail->SMTPSecure = 'tls';                        // Enable TLS/SSL encryption 
$mail->Port = 587;                                      // TCP port to connect to

$mail->From = 'NOREPLY_INFOPLOT_ADMIN@mrl-vm.cloudapp.net'; 
$mail->FromName = 'InfoPlot Admin'; 
//$mail->addAddress('<YOUR TEST EMAIL>', 'Username');     // Add a recipient

$mail->addAddress($emailAddress, $username);     // Add a recipient

$mail->WordWrap = 50;                              // Set word wrap to 50 characters 
$mail->isHTML(true);                                  // Set email format to HTML
//$mail->isHTML(false);                                  // Set email format to HTML

$mail->Subject = 'InfoPlot - your password has been changed'; 
$mail->Body    = 'Your new password is: '.$p.'<BR>For any InfoPlot queries, please email: sitw@cs.nott.ac.uk';

if(!$mail->send()) { 
    echo 'Message could not be sent.'; 
    echo 'Mailer Error: ' . $mail->ErrorInfo; 
} else { 
    echo 'Message has been sent'; 
}

			
/* ##################  END SENDGRID STUFF ################################################ */			
			
 //mail('steve@stevenorth.com', 'test', 'you done that');
 
 
 
 
 
 
 echo 'ok'; // check that script is end the execution 
			
            break;
		
		
		// end Steve add
		
		
        case "import":
            $bean = R::dispense($_POST['table']);
            unset($_POST['table']);
            
            if (isset($_POST['filter']) && !empty($_POST['filter'])) {
                    $filter = $_POST['filter'];
                    unset($_POST['filter']);
                    $bean->import($_POST, $filter); //$_POST['titles']);
            } else {
                $bean->import($_POST);
            }
            R::store($bean);
            echo "id=". $bean->id;
            break;
        case "dispense":
            $bean = R::dispense($params[0]);
            R::store($bean);
            echo "id=". $bean->id;
            break;
        case "load":
            $bean = R::load($params[0], $params[1]);
            if (!$bean->id) {
                die("Error: No bean found.");
            } else {
                echo 'id='. $bean->id;
            }          
            break;
        case "setproperty":
            $bean = R::load($params[0], $params[1]);
            if (!$bean->id) die("Error: Bean not found. '".$params[0]."' id=".$params[1]);
            $bean[$params[2]] = $params[3];
            R::store($bean);
            echo "id=". $bean->id;
            break;
        case "getproperty":
            $bean = R::load($params[0], $params[1]);
            $property = $bean[$params[2]];
            echo 'property='. $property;
            break;
        case "count":
            echo "count=". R::count($params[0]);
            break;
        case "trash":
            $bean = R::load($params[0], $params[1]);
            if (!$bean->id) die("Error: Bean not found. '".$params[0]."' id=".$params[1]);
            $id = $bean->id;
            R::trash($bean);
            echo "id=".$id;
            break;
        case "trashall":
            $ids = explode("|", $params[1]);
            $beans = array();
            foreach($ids as $id) {
                $beans[] = R::load($params[0], $id);
            }
            R::trashAll($beans);
        case "wipe":
            R::wipe($params[0]);
            break;
        case "find":
            $beans = R::find($params[0]);
            $ret = "";
            foreach($beans as $bean) $ret .= $bean->id."|";
            echo rtrim($ret,"|");
            break;
         case "listownermaps":
            $beans = R::find( 'map', 'owner = ? ', array( $params[0] ) );
            $ret = "";
            foreach($beans as $bean) {
               $ret .= $bean->id.",".$bean->name.",".$bean->version.",".$bean->owner."|";
            }
            echo rtrim($ret,"|");
            break;
         case "listborrowedmaps":
            $shares = R::find( 'share', 'borrower = ? ', array( $params[0], '[all]' ) );
            $ret = "";
            foreach($shares as $share) {
               $map = R::load('map', $share->mapid);
               $ret .= $map->id.",".$map->name.",".$map->version.",".$map->owner."|";
            }
            
         case "listvisiblemaps":
		    //debug('id='.$params[0]);
            $beans = R::find( 'map', 'owner = ? ', array( $params[0] ) );
            $ret = "";
            foreach($beans as $bean) {
               $ret .= $bean->id.",".$bean->name.",".$bean->version.",".$bean->owner.",you,0,0|";
            }
//            echo rtrim($ret,"|");
            $shares = R::find( 'share', 'borrower = ? OR borrower = ?', array( $params[0], '[all]' ) );
            foreach($shares as $share) {
               $map = R::load('map', $share->mapid);
               $owner = R::load('user', $share->owner);
               if ($owner->id != $params[0]) {
                  $ret .= $map->id.",".$map->name.",".$map->version.",".$map->owner.",".$owner->username.",".$share->id.",".$share->borrower."|";
               }
            }
            echo rtrim($ret,"|");
            break;
         case "find2":
            $beans = R::find( $params[0], $params[1].' = ? ', array( $params[2] ) );
            $ret = "";
            foreach($beans as $bean) $ret .= $bean->id."|";
            echo rtrim($ret,"|");
            break;
        case "getallusers":
            $rows = R::getAll('select * from user');
            $ret = '';
            foreach ($rows as $k => $v) {
                //echo "\$retarr[$k] => $v.\n";
                foreach ($v as $k2 => $v2) {
                    if (($v2 != null) && ($k2 != 'password') && ($k2 != 'email') && ($k2 != 'creation')) $ret .= "$k2=$v2&";
                }
                $ret = rtrim($ret, "&");
                $ret .= "|";
            }
            echo rtrim($ret,"|");
            break;
        case "getall":
            $rows = R::getAll('select * from '.$params[0]);
            $ret = '';
            foreach ($rows as $k => $v) {
                //echo "\$retarr[$k] => $v.\n";
                foreach ($v as $k2 => $v2) {
                    if ($v2 != null) $ret .= "$k2=$v2&";
                }
                $ret = rtrim($ret, "&");
                $ret .= "|";
            }
            echo rtrim($ret,"|");
            break;
        case "getrow":
            $row = R::getRow('select * from '.$params[0].' where '.$params[1].' = ? limit 1', array($params[2]));
            $ret = '';
            foreach ($row as $k => $v) {
                if ($v != null) $ret .= "$k=$v&";
            }
		
            echo rtrim($ret, "&");
            break;
        
		
		
		case "getrowlike":
            $row = R::getRow('select * from '.$params[0].' where '.$params[1].' like ? limit 1', array('%'.$params[2].'%'));    // params[2] example: '%Jazz%'
            $ret = '';
            foreach ($row as $k => $v) {
                if ($v != null) $ret .= "$k=$v&";
            }
            echo rtrim($ret, "&");
            break;
        case "getrows":
		
		
		//  	debug($params[3]);
		
            $rows = R::getAll('select * from '.$params[0].' where '.$params[1].' = ?', array($params[2]));
            $ret = '';
            foreach ($rows as $k => $v) {
               //echo "\$retarr[$k] => $v.\n";
               foreach ($v as $k2 => $v2) {
                  if ($v2 != null) $ret .= "$k2=$v2&";
               }
               $ret = rtrim($ret, "&");
               $ret .= "|";
            }
			
			// Steve insert #################################


			
//if ($_POST['p1']=="user" && $_POST['p2']=="username") // if is a login password check
if ($params[0]=="user" && $params[1]=="username") // if is a login password check

{

// $params[3] contains P4 sent from main.js
$submittedPasswordFromForm = $params[3];

$arrayOfFieldAndValuePairsFromDBRow = explode('password=', $ret);

// arrayOfFieldAndValuePairsFromDBRow[0] now contains everything up to and including 'password='
// arrayOfFieldAndValuePairsFromDBRow[1] now starts with the hashed password and then contains any other values in the row

//debug(arrayOfFieldAndValuePairsFromDBRow[1]);

$stringStartingWithCorrectHashedPassword = $arrayOfFieldAndValuePairsFromDBRow[1];

$hashedPassword = strtok($stringStartingWithCorrectHashedPassword, '&');

// Only do the next bit, if crypt vetifies that submitted password in $submittedPasswordFromForm is correct!
// Note: crypt() can check hashes even if created with better_crypt().
if(crypt($submittedPasswordFromForm, $hashedPassword ) == $hashedPassword ) 		
{

// replace plain text password back into return text, instead of hashed password 

$tagOne = "password=";
$tagTwo = "&";

//Get the char position of the first character in the preceeding bit of text (to be retained)  
    $pos = strpos($ret, $tagOne);

// Get the char position to start replacement, by adding legth of preceeding text to start position
    $start = $pos === false ? 0 : $pos + strlen($tagOne);

    $pos = strpos($ret, $endTagPos, $start);
    $end = $pos === false ? strlen($ret) : $pos;

// replace hashed password with submitted plain text, as already checked OK
    $ret = substr_replace($ret, $submittedPasswordFromForm, $start, $end - $start);

} // close if submitted password matches hashed password

} // close: if is a login password check


			
// END Steve insert #################################	
			
	
			
            echo rtrim($ret,"|");
            break;
        case "getrowslike":
            $rows = R::getAll('select * from '.$params[0].' where '.$params[1].' like ?', array('%'.$params[2].'%'));    // params[2] example: '%Jazz%'
            $ret = '';
             foreach ($rows as $k => $v) {
                //echo "\$retarr[$k] => $v.\n";
                foreach ($v as $k2 => $v2) {
                    if ($v2 != null) $ret .= "$k2=$v2&";
                }
                $ret = rtrim($ret, "&");
                $ret .= "|";
            }
            echo rtrim($ret,"|");
            break;
         
        case "freeze":
            R::freeze(true);
            break;
        case "addchild":
            $parent = R::load($params[0], $params[1]);
            if (!$parent->id) die("Error: Parent bean not found. '".$params[0]."' id=".$params[1]);
            $child = R::load($params[2], $params[3]);
            if (!$child->id) die("Error: Child bean not found. '".$params[2]."' id=".$params[3]);
            $params[2] = ucfirst($params[2]);
            eval("\$parent->own".$params[2]."[] = \$child;");
//            $parent['own'.$params[2].'[]'] = $child;
            R::store($parent);
            break;
        case "getchildren":
            $parent = R::load($params[0], $params[1]);
            if (!$parent->id) die("Error: Parent bean not found. '".$params[0]."' id=".$params[1]);
            $params[2] = ucfirst($params[2]);
            eval("\$children = \$parent->own".$params[2].";");
            $ret = "";
            foreach($children as $bean) $ret .= $bean->id."|";
            echo rtrim($ret,"|");
           break;
        default:
            die("Error: action not recognised: "+$action);    
            
    }

        
/*        
    $book = R::dispense('book');
    
    $book->title = 'Gifted Programmers';
    $book->author = 'Charles Xavier';
    
    $id = R::store($book);
    
    //---------------------
*/

/*
    $book = R::load('book', 1); //$id);
    
    if (!$book->id) {
        echo 'bean not found';
    } else {
        $field = 'title';
        echo $book->id;
        echo '<br>';
        echo $book['id'];
        echo '<br>';
        echo $book[$field];
    }
*/    
   

   
  // Original PHP code by Chirp Internet: www.chirp.com.au
  // Please acknowledge use of this code by including this header.

  // increasing the value of $rounds will increase significantly the time taken to generate, test, or try to brute-force the hash.

  /*
Random salting: guarantees that even if two people were to have the same password 
you would have different resulting hashes. It also makes brute force 'dictionary attacks using rainbow tables'much more difficult.
The process: 
1. A random salt is generated for each password.
2. The plain-text salt (starting with the characters "$2a$") and the plain-text password are concatenated.
3. The resulting string is hashed (converted into a fixed-size alphanumeric string, which is a digest of the original string)..
4. The salt (in plain text) is then stored along with the hash (of both password and salt) in the password field of the database, in a point-separated format: 
"<plaintextsalt>.<hashofsaltandpassword>"
Example:
password: "mypassword"
random salt: "$2a$abcdefg12345"
resulting concatenated plain text: "$2a$abcdefg12345.mypassword".
hash of concatenated plain text: "$2a$abcdefg12345.gh5TyJ4fRjuRTS".
to test whether a password matches, the hash function is applied to: (1) the submitted plain text password, (2) the plain text salt (from the database) and (3) the hash (of the salt and the password - from the database). This will confirm if it matches or not. 
*/

  function better_crypt($input, $rounds = 7)
  {
    $salt = "";
    $salt_chars = array_merge(range('A','Z'), range('a','z'), range(0,9));
    for($i=0; $i < 22; $i++) {
      $salt .= $salt_chars[array_rand($salt_chars)];
    }
    return crypt($input, sprintf('$2a$%02d$', $rounds) . $salt);
  }

  
  
function debug($data) {
$file = 'debug.out';
file_put_contents($file, $data);
}
    
 
?>

    
    
