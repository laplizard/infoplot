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


// #########  STEVE VARIABLES: START #####################

var count = 0;

//var startZoomLevel=0.1;
var startZoomLevel=0.25;

var blank = 0;


//ovalLineWidth = 2; // was orignally set to 2 
var ovalLineWidth = 14;
var selectedOvalLineOffsetInner = 2.0;
var selectedOvalLineOffsetOuter = 6.0;
// Steve orange
//var nodeSelectedCircleColourRed = 242;
//var nodeSelectedCircleColourGreen = 153;
//var nodeSelectedCircleColourBlue = 10;

var nodeSelectedCircleColourRed = 255;
var nodeSelectedCircleColourGreen = 131;
var nodeSelectedCircleColourBlue = 0;



var loginPageTermsAndConditionsIFramePage = "./login_terms_and_conditions.html";



var centredZoom = false;
//var offsetAdjustmentAfterZoomIn = 27;
//var offsetAdjustmentAfterZoomOut = 18;
//var offsetAdjustmentAfterZoomIn = 36;
//var offsetAdjustmentAfterZoomOut = 18;

var offsetAdjustmentAfterZoomInX = 40;
var offsetAdjustmentAfterZoomInY = 61;

var offsetAdjustmentAfterZoomOutX = 26;
var offsetAdjustmentAfterZoomOutY = 30;

 // note: default value for this.m_nodeArea.m_contentView.m_frame.m_x=-24000 and also: this.m_nodeArea.m_contentView.m_frame.m_y=-24000
//var startMapCentrePositionX = -19000.0;
//var startMapCentrePositionY = -22400.0
var startMapCentrePositionX = -21400.0;
var startMapCentrePositionY = -22700.0;

var NavLinkstext ="<p style=\"padding-bottom: 0pt; padding-top: 0pt; \" class=\"paragraph_style_2\"><span style=\"color:rgb(66, 66, 66)\">Home</span>&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"./information.html\" target=\"_blank\">Information</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"./manual.html\" target=\"_blank\">Manual</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"./credits.html\" target=\"_blank\">Credits</a>";

/*
// Top bar X layout positions 
var nodeButtonsPositionOnTopBarX = 250;
var colorPickerPositionOnTopBarX = 375;
var nodeNameTextfieldPositionOnTopBarX = 480;
var nav_linksPositionOnTopBarX = 890;
var adaptivelabelPositionOnTopBarX = 895;
var topbartextPositionOnTopBarX  = 1350;
*/

// Top bar X layout positions 
var nodeButtonsPositionOnTopBarX = 250;
var colorPickerPositionOnTopBarX = 375;
var nodeNameTextfieldPositionOnTopBarX = 480;
var nav_linksPositionOnTopBarX = 893;
var adaptivelabelPositionOnTopBarX = 894;
var topbartextPositionOnTopBarX  = 1290;

// #########  STEVE VARIABLES: END #####################

function centreZoomIn(currentScaleX, currentScaleY, x, y)
{
    var newPos = new Object();
	newPos['x'] =  x - (10 - currentScaleX) * ( (1 / currentScaleX) * offsetAdjustmentAfterZoomInX);
    newPos['y'] =  y - ((10 - currentScaleY) * ( (1 / currentScaleY) * offsetAdjustmentAfterZoomInY) * 0.4);
		
	print("Steve func X: "+newPos.x);
	print("Steve func Y: "+newPos.y);

    return newPos;
}

function centreZoomOut(currentScaleX, currentScaleY, x, y)
{
    var newPos = new Object();
    newPos['x'] =  x + (10 - currentScaleX) * ( (1 / currentScaleX) * offsetAdjustmentAfterZoomOutX);
    newPos['y'] =  y + ((10 - currentScaleY) * ( (1 / currentScaleY) * offsetAdjustmentAfterZoomOutY) * 0.4);
	
	print("Steve func X: "+newPos.x);
	print("Steve func Y: "+newPos.y);

    return newPos;
}


// ####### Start: Steve testing scrollwheel handler

if(window.addEventListener) { document.addEventListener('DOMMouseScroll', zoom_handler, false); } 
document.onmousewheel = zoom_handler;

function zoom_handler(event) {

    var delta = 0;

    if (!event) event = window.event;
    // normalize the delta
    if (event.wheelDelta) {
        // IE and Opera
        delta = event.wheelDelta / 60;
    } else if (event.detail) {
        // W3C
        delta = -event.detail / 2;
    }

	print("Delta value from scrollwheel: " + delta);
	
if (delta)
{ 
// DO SOMETHING 
}

}



// ################################ End: Steve testing scrollwheel handler

var hideConnectedList = true;

// Steve edit...adding default map that appears at start for all users - logged in, or not
var DEFAULT_MAP_ID = "1";

// Steve add:
var doYouAgreeToConditionsText = "Do you agree to the terms and conditions on this page?";

var TopBarText = "A catergorised overview of adaptations<BR>and their causes, methods of adaptation<BR>and the effect of adaptations<BR>in Adaptive Architecture.<BR>Explore connections and examples.<BR>Log in to copy, add and share.";

//Change this to true for a stretchy canvas!
//
var RESIZEABLE_CANVAS=true;

var encouragementToRegisterText = "Remember, there are lots of benefits to Infoplot registration. These include: being able to create, edit, save and share your own maps.";

//Start us up!
//
window.onload=function( e ){

	if( RESIZEABLE_CANVAS ){
		window.onresize=function( e ){
			var canvas=document.getElementById( "GameCanvas" );

			//This vs window.innerWidth, which apparently doesn't account for scrollbar?
			var width=document.body.clientWidth;
			
			//This vs document.body.clientHeight, which does weird things - document seems to 'grow'...perhaps canvas resize pushing page down?
			var height=window.innerHeight;			

			canvas.width=width;
			canvas.height=height;
		}
		window.onresize( null );
	}

	BBMonkeyGame.Main( document.getElementById( "GameCanvas" ) );
}

//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_BRL_THREAD_IMPLEMENTED="1";
CFG_CD="";
CFG_CONFIG="release";
CFG_HOST="macos";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_LANG="js";
CFG_MODPATH="";
CFG_MOJO_AUTO_SUSPEND_ENABLED="0";
CFG_MONKEYDIR="";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_GLES20_ENABLED="0";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.txt|*.xml|*.json|*.fnt";
CFG_TRANSDIR="";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[angel_verdana_0.png];type=image/png;width=256;height=256;\n[arrowup.png];type=image/png;width=26;height=14;\n[guide.jpg];type=image/jpg;width=439;height=831;\n[guide2.jpg];type=image/jpg;width=439;height=831;\n[logo.jpg];type=image/jpg;width=1024;height=768;\n[logo_small.jpg];type=image/jpg;width=330;height=60;\n[logo_small.png];type=image/png;width=330;height=60;\n[scale9button.png];type=image/png;width=133;height=44;\n[scale9button2.png];type=image/png;width=74;height=73;\n[scale9button3.png];type=image/png;width=74;height=73;\n[scale9button4.png];type=image/png;width=24;height=46;\n[scale9buttonSmall.png];type=image/png;width=12;height=23;\n[thumb.png];type=image/png;width=40;height=40;\n[trash.png];type=image/png;width=85;height=122;\n[trashSmall.png];type=image/png;width=43;height=61;\n[mojo_font.png];type=image/png;width=864;height=13;\n";
//${METADATA_END}

//${TRANSCODE_BEGIN}
// Javascript infoplot runtime.

//***** JavaScript Runtime *****

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

var err_info="";
var err_stack=[];

var dbg_index=0;

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	if( !err_info.length ) return "";
	var str=err_info+"\n";
	for( var i=err_stack.length-1;i>0;--i ){
		str+=err_stack[i]+"\n";
	}
	return str;
}

function print( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function alertError( err ){
	if( typeof(err)=="string" && err=="" ) return;
	alert( "Infoplot Runtime Error : "+err.toString()+"\n\n"+stackTrace() );
}

function error( err ){
	throw err;
}

function debugLog( str ){
	if( window.console!=undefined ) window.console.log( str );
}

function debugStop(){
	debugger;	//	error( "STOP" );
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_charCodeAt( str,index ){
	if( index<0 || index>=str.length ) error( "Character index out of range" );
	return str.charCodeAt( index );
}

function dbg_array( arr,index ){
	if( index<0 || index>=arr.length ) error( "Array index out of range" );
	dbg_index=index;
	return arr;
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=false;
	return arr;
}

function resize_number_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=0;
	return arr;
}

function resize_string_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]="";
	return arr;
}

function resize_array_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=[];
	return arr;
}

function resize_object_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=null;
	return arr;
}

function string_compare( lhs,rhs ){
	var n=Math.min( lhs.length,rhs.length ),i,t;
	for( i=0;i<n;++i ){
		t=lhs.charCodeAt(i)-rhs.charCodeAt(i);
		if( t ) return t;
	}
	return lhs.length-rhs.length;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_startswith( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_endswith( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function string_tochars( str ){
	var arr=new Array( str.length );
	for( var i=0;i<str.length;++i ) arr[i]=str.charCodeAt(i);
	return arr;
}

function string_fromchars( chars ){
	var str="",i;
	for( i=0;i<chars.length;++i ){
		str+=String.fromCharCode( chars[i] );
	}
	return str;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function object_implements( obj,iface ){
	if( obj && obj.implments && obj.implments[iface] ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}

function ThrowableObject(){
}

ThrowableObject.prototype.toString=function(){ 
	return "Uncaught Infoplot Exception"; 
}

function BBGameEvent(){}
BBGameEvent.KeyDown=1;
BBGameEvent.KeyUp=2;
BBGameEvent.KeyChar=3;
BBGameEvent.MouseDown=4;
BBGameEvent.MouseUp=5;
BBGameEvent.MouseMove=6;
BBGameEvent.TouchDown=7;
BBGameEvent.TouchUp=8;
BBGameEvent.TouchMove=9;
BBGameEvent.MotionAccel=10;

function BBGameDelegate(){}
BBGameDelegate.prototype.StartGame=function(){}
BBGameDelegate.prototype.SuspendGame=function(){}
BBGameDelegate.prototype.ResumeGame=function(){}
BBGameDelegate.prototype.UpdateGame=function(){}
BBGameDelegate.prototype.RenderGame=function(){}
BBGameDelegate.prototype.KeyEvent=function( ev,data ){}
BBGameDelegate.prototype.MouseEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.TouchEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.MotionEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.DiscardGraphics=function(){}

function BBGame(){
	BBGame._game=this;
	this._delegate=null;
	this._keyboardEnabled=false;
	this._updateRate=0;
	this._started=false;
	this._suspended=false;
	this._debugExs=(CFG_CONFIG=="debug");
	this._startms=Date.now();
}

BBGame.Game=function(){
	return BBGame._game;
}

BBGame.prototype.SetDelegate=function( delegate ){
	this._delegate=delegate;
}

BBGame.prototype.Delegate=function(){
	return this._delegate;
}

BBGame.prototype.SetUpdateRate=function( updateRate ){
	this._updateRate=updateRate;
}

BBGame.prototype.SetKeyboardEnabled=function( keyboardEnabled ){
	this._keyboardEnabled=keyboardEnabled;
}

BBGame.prototype.Started=function(){
	return this._started;
}

BBGame.prototype.Suspended=function(){
	return this._suspended;
}

BBGame.prototype.Millisecs=function(){
	return Date.now()-this._startms;
}

BBGame.prototype.GetDate=function( date ){
	var n=date.length;
	if( n>0 ){
		var t=new Date();
		date[0]=t.getFullYear();
		if( n>1 ){
			date[1]=t.getMonth()+1;
			if( n>2 ){
				date[2]=t.getDate();
				if( n>3 ){
					date[3]=t.getHours();
					if( n>4 ){
						date[4]=t.getMinutes();
						if( n>5 ){
							date[5]=t.getSeconds();
							if( n>6 ){
								date[6]=t.getMilliseconds();
							}
						}
					}
				}
			}
		}
	}
}

BBGame.prototype.SaveState=function( state ){
	localStorage.setItem( "monkeystate@"+document.URL,state );	//key can't start with dot in Chrome!
	return 1;
}

BBGame.prototype.LoadState=function(){
	var state=localStorage.getItem( "monkeystate@"+document.URL );
	if( state ) return state;
	return "";
}

BBGame.prototype.LoadString=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );
	
	xhr.send( null );
	
	if( xhr.status==200 || xhr.status==0 ) return xhr.responseText;
	
	return "";
}

BBGame.prototype.PollJoystick=function( port,joyx,joyy,joyz,buttons ){
	return false;
}

BBGame.prototype.OpenUrl=function( url ){
	window.location=url;
}

BBGame.prototype.SetMouseVisible=function( visible ){
	if( visible ){
		this._canvas.style.cursor='default';	
	}else{
		this._canvas.style.cursor="url('data:image/cur;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA55ZXBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeWVxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnllcGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9////////////////////+////////f/////////8%3D'), auto";
	}
}

BBGame.prototype.PathToFilePath=function( path ){
	return "";
}

//***** js Game *****

BBGame.prototype.PathToUrl=function( path ){
	return path;
}

BBGame.prototype.LoadData=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );

	if( xhr.overrideMimeType ) xhr.overrideMimeType( "text/plain; charset=x-user-defined" );

	xhr.send( null );
	if( xhr.status!=200 && xhr.status!=0 ) return null;

	var r=xhr.responseText;
	var buf=new ArrayBuffer( r.length );
	var bytes=new Int8Array( buf );
	for( var i=0;i<r.length;++i ){
		bytes[i]=r.charCodeAt( i );
	}
	return buf;
}

//***** INTERNAL ******

BBGame.prototype.Die=function( ex ){

	this._delegate=new BBGameDelegate();
	
	if( !ex.toString() ){
		return;
	}
	
	if( this._debugExs ){
		print( "Infoplot Runtime Error : "+ex.toString() );
		print( stackTrace() );
	}
	
	throw ex;
}

BBGame.prototype.StartGame=function(){

	if( this._started ) return;
	this._started=true;
	
	if( this._debugExs ){
		try{
			this._delegate.StartGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.StartGame();
	}
}

BBGame.prototype.SuspendGame=function(){

	if( !this._started || this._suspended ) return;
	this._suspended=true;
	
	if( this._debugExs ){
		try{
			this._delegate.SuspendGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.SuspendGame();
	}
}

BBGame.prototype.ResumeGame=function(){

	if( !this._started || !this._suspended ) return;
	this._suspended=false;
	
	if( this._debugExs ){
		try{
			this._delegate.ResumeGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.ResumeGame();
	}
}

BBGame.prototype.UpdateGame=function(){

	if( !this._started || this._suspended ) return;

	if( this._debugExs ){
		try{
			this._delegate.UpdateGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.UpdateGame();
	}
}

BBGame.prototype.RenderGame=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.RenderGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.RenderGame();
	}
}

BBGame.prototype.KeyEvent=function( ev,data ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.KeyEvent( ev,data );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.KeyEvent( ev,data );
	}
}

BBGame.prototype.MouseEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MouseEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MouseEvent( ev,data,x,y );
	}
}

BBGame.prototype.TouchEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.TouchEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.TouchEvent( ev,data,x,y );
	}
}

BBGame.prototype.MotionEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MotionEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MotionEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.DiscardGraphics=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.DiscardGraphics();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.DiscardGraphics();
	}
}

function BBHtml5Game( canvas ){
	BBGame.call( this );
	BBHtml5Game._game=this;
	this._canvas=canvas;
	this._loading=0;
	this._timerSeq=0;
	this._gl=null;
	if( CFG_OPENGL_GLES20_ENABLED=="1" ){
		this._gl=this._canvas.getContext( "webgl" );
		if( !this._gl ) this._gl=this._canvas.getContext( "experimental-webgl" );
		if( !this._gl ) this.Die( "Can't create WebGL" );
		gl=this._gl;
	}
}

BBHtml5Game.prototype=extend_class( BBGame );

BBHtml5Game.Html5Game=function(){
	return BBHtml5Game._game;
}

BBHtml5Game.prototype.ValidateUpdateTimer=function(){

	++this._timerSeq;

	if( !this._updateRate || this._suspended ) return;
	
	var game=this;
	var updatePeriod=1000.0/this._updateRate;
	var nextUpdate=Date.now()+updatePeriod;
	var seq=game._timerSeq;
	
	function timeElapsed(){
		if( seq!=game._timerSeq ) return;

		var time;		
		var updates;
		
		for( updates=0;updates<4;++updates ){
		
			nextUpdate+=updatePeriod;
			
			game.UpdateGame();
			if( seq!=game._timerSeq ) return;
			
			if( nextUpdate-Date.now()>0 ) break;
		}
		
		game.RenderGame();
		if( seq!=game._timerSeq ) return;
		
		if( updates==4 ){
			nextUpdate=Date.now();
			setTimeout( timeElapsed,0 );
		}else{
			var delay=nextUpdate-Date.now();
			setTimeout( timeElapsed,delay>0 ? delay : 0 );
		}
	}

	setTimeout( timeElapsed,updatePeriod );
}

//***** BBGame methods *****

BBHtml5Game.prototype.SetUpdateRate=function( updateRate ){

	BBGame.prototype.SetUpdateRate.call( this,updateRate );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.GetMetaData=function( path,key ){
	if( path.indexOf( "monkey://data/" )!=0 ) return "";
	path=path.slice(14);

	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

BBHtml5Game.prototype.PathToUrl=function( path ){
	if( path.indexOf( "monkey:" )!=0 ){
		return path;
	}else if( path.indexOf( "monkey://data/" )==0 ) {
		return "data/"+path.slice( 14 );
	}
	return "";
}

BBHtml5Game.prototype.GetLoading=function(){
	return this._loading;
}

BBHtml5Game.prototype.IncLoading=function(){
	++this._loading;
	return this._loading;
}

BBHtml5Game.prototype.DecLoading=function(){
	--this._loading;
	return this._loading;
}

BBHtml5Game.prototype.GetCanvas=function(){
	return this._canvas;
}

BBHtml5Game.prototype.GetWebGL=function(){
	return this._gl;
}

//***** INTERNAL *****

BBHtml5Game.prototype.UpdateGame=function(){

	if( !this._loading ) BBGame.prototype.UpdateGame.call( this );
}

BBHtml5Game.prototype.SuspendGame=function(){

	BBGame.prototype.SuspendGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.ResumeGame=function(){

	BBGame.prototype.ResumeGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.Run=function(){

	var game=this;
	var canvas=game._canvas;
	
	var touchIds=new Array( 32 );
	for( i=0;i<32;++i ) touchIds[i]=-1;
	
	function eatEvent( e ){
		if( e.stopPropagation ){
			e.stopPropagation();
			e.preventDefault();
		}else{
			e.cancelBubble=true;
			e.returnValue=false;
		}
	}
	
	function keyToChar( key ){
		switch( key ){
		case 8:case 9:case 13:case 27:case 32:return key;
		case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 45:return key|0x10000;
		case 46:return 127;
		}
		return 0;
	}
	
	function mouseX( e ){
		var x=e.clientX+document.body.scrollLeft;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x;
	}
	
	function mouseY( e ){
		var y=e.clientY+document.body.scrollTop;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y;
	}

	function touchX( touch ){
		var x=touch.pageX;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x;
	}			
	
	function touchY( touch ){
		var y=touch.pageY;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y;
	}
	
	canvas.onkeydown=function( e ){
		game.KeyEvent( BBGameEvent.KeyDown,e.keyCode );
		var chr=keyToChar( e.keyCode );
		if( chr ) game.KeyEvent( BBGameEvent.KeyChar,chr );
		if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<122) ) eatEvent( e );
	}

	canvas.onkeyup=function( e ){
		game.KeyEvent( BBGameEvent.KeyUp,e.keyCode );
	}

	canvas.onkeypress=function( e ){
		if( e.charCode ){
			game.KeyEvent( BBGameEvent.KeyChar,e.charCode );
		}else if( e.which ){
			game.KeyEvent( BBGameEvent.KeyChar,e.which );
		}
	}

	canvas.onmousedown=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseDown,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseDown,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseDown,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmouseup=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmousemove=function( e ){
		game.MouseEvent( BBGameEvent.MouseMove,-1,mouseX(e),mouseY(e) );
		eatEvent( e );
	}

	canvas.onmouseout=function( e ){
		game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );
		eatEvent( e );
	}

	canvas.ontouchstart=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=-1 ) continue;
				touchIds[j]=touch.identifier;
				game.TouchEvent( BBGameEvent.TouchDown,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchmove=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				game.TouchEvent( BBGameEvent.TouchMove,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchend=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				touchIds[j]=-1;
				game.TouchEvent( BBGameEvent.TouchUp,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	window.ondevicemotion=function( e ){
		var tx=e.accelerationIncludingGravity.x/9.81;
		var ty=e.accelerationIncludingGravity.y/9.81;
		var tz=e.accelerationIncludingGravity.z/9.81;
		var x,y;
		switch( window.orientation ){
		case   0:x=+tx;y=-ty;break;
		case 180:x=-tx;y=+ty;break;
		case  90:x=-ty;y=-tx;break;
		case -90:x=+ty;y=+tx;break;
		}
		game.MotionEvent( BBGameEvent.MotionAccel,0,x,y,tz );
		eatEvent( e );
	}

	canvas.onfocus=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.ResumeGame();
		}
	}
	
	canvas.onblur=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.SuspendGame();
		}
	}
	
	canvas.focus();
	
	game.StartGame();

	game.RenderGame();
}

function BBMonkeyGame( canvas ){
	BBHtml5Game.call( this,canvas );
}

BBMonkeyGame.prototype=extend_class( BBHtml5Game );

BBMonkeyGame.Main=function( canvas ){

	var game=new BBMonkeyGame( canvas );

	try{

		bbInit();
		bbMain();

	}catch( ex ){
	
		game.Die( ex );
		return;
	}

	if( !game.Delegate() ) return;
	
	game.Run();
}


//***** gxtkGraphics class *****

//Steve says: graphics class starts here....  the terms "gxtkGraphics" and "BBHtml5Game" indicate that this code comes from 
// the Monkey X game engine (commercial) http://www.monkey-x.com/ 

function gxtkGraphics(){
	this.game=BBHtml5Game.Html5Game();
	this.canvas=this.game.GetCanvas()
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	this.gl=null;
	this.gc=this.canvas.getContext( '2d' );
	this.tmpCanvas=null;
	this.r=255;
	this.b=255;
	this.g=255;
	this.white=true;
	this.color="rgb(255,255,255)"
	this.alpha=1;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	if( !this.gc ) return 0;
	this.gc.save();
	if( this.game.GetLoading() ) return 2;
	return 1;
}

gxtkGraphics.prototype.EndRender=function(){
	if( this.gc ) this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var game=this.game;

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	function onloadfun(){
		game.DecLoading();
	}
	
	game.IncLoading();

	var image=new Image();
	image.onload=onloadfun;
	image.meta_width=parseInt( game.GetMetaData( path,"width" ) );
	image.meta_height=parseInt( game.GetMetaData( path,"height" ) );
	image.src=game.PathToUrl( path );

	return new gxtkSurface( image,this );
}

gxtkGraphics.prototype.CreateSurface=function( width,height ){
	var canvas=document.createElement( 'canvas' );
	
	canvas.width=width;
	canvas.height=height;
	canvas.meta_width=width;
	canvas.meta_height=height;
	canvas.complete=true;
	
	var surface=new gxtkSurface( canvas,this );
	
	surface.gc=canvas.getContext( '2d' );
	
	return surface;
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.r=r;
	this.g=g;
	this.b=b;
	this.white=(r==255 && g==255 && b==255);
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;	
	this.gc.globalAlpha=this.alpha;	
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.Cls2=function( r,g,b,a ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=a;
	this.gc.globalCompositeOperation="source-out";	//source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}


gxtkGraphics.prototype.DrawPoint=function( x,y ){
	if( this.tformed ){
		var px=x;
		x=px * this.ix + y * this.jx + this.tx;
		y=px * this.iy + y * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
		this.gc.fillRect( x,y,1,1 );
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
		this.gc.fillRect( x,y,1,1 );
	}
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h, dotted, filled ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
	if (dotted) {
		if ( this.gc.setLineDash !== undefined )   this.gc.setLineDash([10,15]);
		if ( this.gc.mozDash !== undefined )       this.gc.mozDash = [10,15];
	}  	
	if (filled) {
		this.gc.fillRect( x,y,w,h );	
	} else {
		this.gc.strokeRect( x,y,w,h );
	}
	
	if (dotted) {
		if ( this.gc.setLineDash !== undefined )   this.gc.setLineDash([]);
		if ( this.gc.mozDash !== undefined )       this.gc.mozDash = null;	  	
	}
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2, thickness, dotted ){
	if( this.tformed ){
		var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
		var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
		var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
		var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1_t,y1_t );
	  	this.gc.lineTo( x2_t,y2_t );
	  	this.gc.lineWidth = thickness;
	  	if (dotted) {
//			if ( this.gc.setLineDash !== undefined )   this.gc.setLineDash([10,15]);
//			if ( this.gc.mozDash !== undefined )       this.gc.mozDash = [10,15];	  	
			if ( this.gc.setLineDash !== undefined )   this.gc.setLineDash([5,10]);
			if ( this.gc.mozDash !== undefined )       this.gc.mozDash = [5,10];	  	
		}
	  	this.gc.stroke();
	  	this.gc.closePath();
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	  	if (dotted) {
			if ( this.gc.setLineDash !== undefined )   this.gc.setLineDash([]);
			if ( this.gc.mozDash !== undefined )       this.gc.mozDash = null;	  	
		}
	}else{
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1,y1 );
	  	this.gc.lineTo( x2,y2 );
	  	this.gc.lineWidth = thickness;
	  	this.gc.stroke();
	  	this.gc.closePath();
	}
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h, filled ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
  	var w2=w/2,h2=h/2;
	this.gc.save();
	if (filled) {
		this.gc.translate( x+w2,y+h2 );
		this.gc.scale( w2,h2 );
	  	this.gc.beginPath();
		this.gc.arc( 0,0,1,0,Math.PI*2,false );
		this.gc.fill();
	} else {
		//this.gc.translate( x,y );
		//this.gc.scale( w2,h2 );
	  	this.gc.beginPath();
		this.gc.arc( x+w2,y+h2,w2,0,Math.PI*2,false );
	  	// this.gc.lineWidth = 1;
		this.gc.lineWidth = ovalLineWidth;
		//if ( this.gc.setLineDash !== undefined )   this.gc.setLineDash([]);
		//if ( this.gc.mozDash !== undefined )       this.gc.mozDash = null;	  	
		this.gc.stroke();
	}
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawPoly=function( verts ){
	if( verts.length<2 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=2;i<verts.length;i+=2 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawPoly2=function( verts,surface,srx,srcy ){
	if( verts.length<4 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=4;i<verts.length;i+=4 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( !surface.image.complete ) return;
	
	if( this.white ){
		this.gc.drawImage( surface.image,x,y );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,0,0,surface.swidth,surface.sheight );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( !surface.image.complete ) return;

	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;

	if( this.white ){
		this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,srcx,srcy,srcw,srch  );
}

gxtkGraphics.prototype.DrawImageTinted=function( image,dx,dy,sx,sy,sw,sh ){

	if( !this.tmpCanvas ){
		this.tmpCanvas=document.createElement( "canvas" );
	}

	if( sw>this.tmpCanvas.width || sh>this.tmpCanvas.height ){
		this.tmpCanvas.width=Math.max( sw,this.tmpCanvas.width );
		this.tmpCanvas.height=Math.max( sh,this.tmpCanvas.height );
	}
	
	var tmpGC=this.tmpCanvas.getContext( "2d" );
	tmpGC.globalCompositeOperation="copy";
	
	tmpGC.drawImage( image,sx,sy,sw,sh,0,0,sw,sh );
	
	var imgData=tmpGC.getImageData( 0,0,sw,sh );
	
	var p=imgData.data,sz=sw*sh*4,i;
	
	for( i=0;i<sz;i+=4 ){
		p[i]=p[i]*this.r/255;
		p[i+1]=p[i+1]*this.g/255;
		p[i+2]=p[i+2]*this.b/255;
	}
	
	tmpGC.putImageData( imgData,0,0 );
	
	this.gc.drawImage( this.tmpCanvas,0,0,sw,sh,dx,dy,sw,sh );
}

gxtkGraphics.prototype.ReadPixels=function( pixels,x,y,width,height,offset,pitch ){

	var imgData=this.gc.getImageData( x,y,width,height );
	
	var p=imgData.data,i=0,j=offset,px,py;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			pixels[j++]=(p[i+3]<<24)|(p[i]<<16)|(p[i+1]<<8)|p[i+2];
			i+=4;
		}
		j+=pitch-width;
	}
}

gxtkGraphics.prototype.WritePixels2=function( surface,pixels,x,y,width,height,offset,pitch ){

	if( !surface.gc ){
		if( !surface.image.complete ) return;
		var canvas=document.createElement( "canvas" );
		canvas.width=surface.swidth;
		canvas.height=surface.sheight;
		surface.gc=canvas.getContext( "2d" );
		surface.gc.globalCompositeOperation="copy";
		surface.gc.drawImage( surface.image,0,0 );
		surface.image=canvas;
	}

	var imgData=surface.gc.createImageData( width,height );

	var p=imgData.data,i=0,j=offset,px,py,argb;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			argb=pixels[j++];
			p[i]=(argb>>16) & 0xff;
			p[i+1]=(argb>>8) & 0xff;
			p[i+2]=argb & 0xff;
			p[i+3]=(argb>>24) & 0xff;
			i+=4;
		}
		j+=pitch-width;
	}
	
	surface.gc.putImageData( imgData,x,y );
}

//***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

//***** GXTK API *****

gxtkSurface.prototype.Discard=function(){
	if( this.image ){
		this.image=null;
	}
}

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.image.complete;
}

gxtkSurface.prototype.OnUnsafeLoadComplete=function(){
	return true;
}

//***** gxtkChannel class *****
function gxtkChannel(){
	this.sample=null;
	this.audio=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.flags=0;
	this.state=0;
}

//***** gxtkAudio class *****
function gxtkAudio(){
	this.game=BBHtml5Game.Html5Game();
	this.okay=typeof(Audio)!="undefined";
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
		if( !this.okay ) this.channels[i].state=-1;
	}
}

gxtkAudio.prototype.Suspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ) chan.audio.pause();
	}
}

gxtkAudio.prototype.Resume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ) chan.audio.play();
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	if( !this.okay ) return null;

	var audio=new Audio( this.game.PathToUrl( path ) );
	if( !audio ) return null;
	
	return new gxtkSample( audio );
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;
	
	var chan=this.channels[channel];

	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
	
	for( var i=0;i<33;++i ){
		var chan2=this.channels[i];
		if( chan2.state==1 && chan2.audio.ended && !chan2.audio.loop ) chan.state=0;
		if( chan2.state==0 && chan2.sample ){
			chan2.sample.FreeAudio( chan2.audio );
			chan2.sample=null;
			chan2.audio=null;
		}
	}

	var audio=sample.AllocAudio();
	if( !audio ) return;

	audio.loop=(flags&1)!=0;
	audio.volume=chan.volume;
	audio.play();

	chan.sample=sample;
	chan.audio=audio;
	chan.flags=flags;
	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
}

gxtkAudio.prototype.PauseChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==1 ){
		if( chan.audio.ended && !chan.audio.loop ){
			chan.state=0;
		}else{
			chan.audio.pause();
			chan.state=2;
		}
	}
}

gxtkAudio.prototype.ResumeChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==2 ){
		chan.audio.play();
		chan.state=1;
	}
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.state==1 && chan.audio.ended && !chan.audio.loop ) chan.state=0;
	return chan.state;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.state>0 ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	this.StopMusic();
	
	this.music=this.LoadSample( path );
	if( !this.music ) return;
	
	this.PlaySample( this.music,32,flags );
}

gxtkAudio.prototype.StopMusic=function(){
	this.StopChannel( 32 );

	if( this.music ){
		this.music.Discard();
		this.music=null;
	}
}

gxtkAudio.prototype.PauseMusic=function(){
	this.PauseChannel( 32 );
}

gxtkAudio.prototype.ResumeMusic=function(){
	this.ResumeChannel( 32 );
}

gxtkAudio.prototype.MusicState=function(){
	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.SetVolume( 32,volume );
}

//***** gxtkSample class *****

function gxtkSample( audio ){
	this.audio=audio;
	this.free=new Array();
	this.insts=new Array();
}

gxtkSample.prototype.FreeAudio=function( audio ){
	this.free.push( audio );
}

gxtkSample.prototype.AllocAudio=function(){
	var audio;
	while( this.free.length ){
		audio=this.free.pop();
		try{
			audio.currentTime=0;
			return audio;
		}catch( ex ){
			print( "AUDIO ERROR1!" );
		}
	}
	
	//Max out?
	if( this.insts.length==8 ) return null;
	
	audio=new Audio( this.audio.src );
	
	//yucky loop handler for firefox!
	//
	audio.addEventListener( 'ended',function(){
		if( this.loop ){
			try{
				this.currentTime=0;
				this.play();
			}catch( ex ){
				print( "AUDIO ERROR2!" );
			}
		}
	},false );

	this.insts.push( audio );
	return audio;
}

gxtkSample.prototype.Discard=function(){
}

function BBThread(){
	this.result=null;
	this.running=false;
}

BBThread.prototype.Start=function(){
	this.result=null;
	this.running=true;
	this.Run__UNSAFE__();
}

BBThread.prototype.IsRunning=function(){
	return this.running;
}

BBThread.prototype.Result=function(){
	return this.result;
}

BBThread.prototype.Run__UNSAFE__=function(){
	this.running=false;
}

function BBAsyncImageLoaderThread(){
	BBThread.call(this);
}

BBAsyncImageLoaderThread.prototype=extend_class( BBThread );

BBAsyncImageLoaderThread.prototype.Start=function(){

	var thread=this;

	var image=new Image();
	
	image.onload=function( e ){
		image.meta_width=image.width;
		image.meta_height=image.height;
		thread._surface=new gxtkSurface( image,thread._device )
		thread.running=false;
	}
	
	image.onerror=function( e ){
		thread._surface=null;
		thread.running=false;
	}
	
	thread.running=true;
	
	image.src=BBGame.Game().PathToUrl( thread._path );
}


function BBAsyncSoundLoaderThread(){
	BBThread.call(this);
}

BBAsyncSoundLoaderThread.prototype=extend_class( BBThread );

BBAsyncSoundLoaderThread.prototype.Start=function(){
	this._sample=this._device.LoadSample( this._path );
}
var GCanvas, GCanvasRC;

function initRenderContext(id)
{
	GCanvas = document.getElementById(id);
	GCanvasRC = GCanvas.getContext("2d");
}

function SetCanvasFont(fnt)
{
	if (!GCanvasRC) initRenderContext("GameCanvas");

	GCanvasRC.font = fnt;
	SetCanvasTextBaseline("top");
	SetCanvasTextAlign("left");
}

function DrawCanvasText(txt, x, y)
{
	GCanvasRC.fillText(txt, x, y);
}

function FitCanvasText(txt, x, y, maxwidth)
{
	GCanvasRC.fillText(txt, x, y, maxwidth);
}

function SetCanvasTextAlign(ta)
{
	GCanvasRC.textAlign = ta;
}

function SetCanvasTextBaseline(bl)
{
	GCanvasRC.textBaseline = bl;
}

function GetCanvasTextWidth(txt)
{
	return GCanvasRC.measureText(txt).width;
}

function StrokeCanvasText(txt, x,y) {
	GCanvasRC.strokeText(txt, x,y);
}

//function SetCanvasTextFillStyle(fs) {
//	GCanvasRC.fillStyle=fs;
//}


// ----------------------------------------------------------------------------------------------



// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}


var fileLoadResult = "";

function handleFileSelect(evt) {
	//global fileLoadResult;
	
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      //if (!f.type.match('image.*')) {
      //  continue;
      //}

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          //var span = document.createElement('span');
          //span.appendChild(document.createTextNode(e.target.result));
          fileLoadResult = e.target.result;
          //document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsText(f);		//, "US-ASCII");		//readAsDataURL(f);
    }
}

var filesDocElement = document.getElementById('files');
if (filesDocElement != null) {
	filesDocElement.addEventListener('change', handleFileSelect, false);
}
  
  
  // Init
var h5 = new Object();
var h5EventStack = new Array;
function h5Event() {
	this.id = "";
	this.type = "";
	this.index = 0;
	this.keycode = 0;
}


// Polling
function EventStacker(event) {
//	console.log(event);
	var ev = new h5Event;
	ev.id = event.target.id;
	ev.type = event.type;
	ev.keycode = event.keyCode;
//	ev.index = 
	h5EventStack.push(ev);
}

function PollEvents() {
	copy = h5EventStack.slice();
	h5EventStack = new Array;
	return copy;
}



// Gadget Creation
h5.CreateButton = function (id, text, x, y, w, h, type) {
	if (type != "button" & type != "checkbox" & type != "radio") return;
	var button = document.createElement("input");
	button.id = id;
	button.name = id;
	button.value = text;
	button.type = type;
	button.style.position = "absolute";
	button.style.left = x + "px";
	button.style.top = y + "px";
	button.style.width = w + "px";
	button.style.height = h + "px";
	button.onclick = EventStacker;
	document.body.appendChild(button);
	
	// Todo: append text properly to checkbox and radios
	if (type === "checkbox" || type === "radio") {
		var label = document.createElement("label");
		label.innerHTML = text;
		label.id = id + "_label";
		label.name = label.id;
		label.style.position = "absolute";
		label.style.left = x + 24 + "px";
		label.style.top = y + 8 + "px";
		document.body.appendChild(label);
	}
}

h5.CreateUnorderedList = function (id, x,y,w,h) {
	var ul = document.createElement("ul");
	ul.id = id;
	ul.name = id;
	ul.style.position = "absolute";
	ul.style.left = x + "px";
	ul.style.top = y + "px";
	ul.style.width = w + "px";
	ul.style.height = h + "px";
	//uolist.onchange = EventStacker;
	document.body.appendChild(ul);

}

h5.AddListItem = function (toId, id) {
	var ul = document.getElementById(toId);
	if (!ul) return;
	
	var li = document.createElement("li");
	li.id = id;
	ul.appendChild(li);
}


h5.CreateCombobox = function (id, x, y, w, h) {
	var button = document.createElement("select");
	button.id = id;
	button.name = id;
	button.style.position = "absolute";
	button.style.left = x + "px";
	button.style.top = y + "px";
	button.style.width = w + "px";
	button.style.height = h + "px";
	button.onchange = EventStacker;
	document.body.appendChild(button);
}

h5.CreateTextfield = function (id, x, y, w, h, type, placeholder) {
	if (type != "text" & type != "number") return;
	var button = document.createElement("input");
	button.id = id;
	button.type = type;
	button.style.position = "absolute";
	button.style.left = x + "px";
	button.style.top = y + "px";
	button.style.width = w + "px";
	button.style.height = h + "px";
	if (type === "number") {
		button.onchange = EventStacker;
	}
	button.placeholder = placeholder;
	button.onchange = EventStacker;
	button.onkeydown = EventStacker;
	document.body.appendChild(button);
}



h5.CreateTextarea = function (id, x, y, w, h, type, placeholder) {
	if (type != "text" & type != "number") return;
	var button = document.createElement("textarea");
	button.id = id;
	button.type = type;
	button.style.position = "absolute";
	button.style.left = x + "px";
	button.style.top = y + "px";
	button.style.width = w + "px";
	button.style.height = h + "px";
	if (type === "number") {
		button.onchange = EventStacker;
	}
	//button.disabled = true;
	//button.readOnly = true;
	button.style.resize = "none";
	button.placeholder = placeholder;
	button.onselect = EventStacker;
	button.onclick = EventStacker;
	button.onkeydown = EventStacker;
	document.body.appendChild(button);
}

h5.CreateListbox = function (id, x, y, w, h) {
	var listbox = document.createElement("select");
	listbox.multiple = "multiple";
	listbox.id = id;
	listbox.name = id;
	listbox.style.position = "absolute";
	listbox.style.left = x + "px";
	listbox.style.top = y + "px";
	listbox.style.width = w + "px";
	listbox.style.height = h + "px";
	listbox.onchange = EventStacker;
	document.body.appendChild(listbox);
}

h5.CreateLabel = function (id, text, x, y) {
	var label = document.createElement("label");
	label.id = id;
	label.name = id;
	label.type = "label";
	label.innerHTML = text;
	label.style.position = "absolute";
	label.style.left = x + "px";
	label.style.top = y + "px";
	document.body.appendChild(label);
}

h5.CreateSlider = function (id, x, y, w, h) {
	var slider = document.createElement("input");
	slider.id = id;
	slider.name = id;
	slider.type = "range";
	slider.style.position = "absolute";
	slider.style.left = x + "px";
	slider.style.top = y + "px";
	slider.style.width = w + "px";
	slider.style.height = h + "px";
	slider.onchange = EventStacker;
	document.body.appendChild(slider);
}



// Gadget Modification
h5.SetGadgetPosition = function (id, x, y) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	gadget.style.left = x + "px";
	gadget.style.top = y + "px";
}


//static		Elements renders in order, as they appear in the document flow. This is default.
//absolute	The element is positioned relative to its first positioned (not static) ancestor element
//fixed		The element is positioned relative to the browser window
//relative	The element is positioned relative to its normal position, so "left:20" adds 20 pixels to the element's LEFT position
//initial	Sets this property to its default value. Read about initial
//inherit	Inherits this property from its parent element. Read about inherit
h5.SetGadgetStylePosition = function (id, style) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	gadget.style.position = style;
}


h5.SetGadgetColor = function (id, col) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	gadget.style.color = col;
}

h5.MoveGadget = function (id, x, y) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	gadget.style.left = parseInt(gadget.style.left) + x + "px";
	gadget.style.top = parseInt(gadget.style.top) + y + "px";
	if (gadget.type === "checkbox" || gadget.type === "radio") {
		var label = document.getElementById(id + "_label");
		if (label) {
			label.style.left = parseInt(label.style.left) + x + "px";
			label.style.top = parseInt(label.style.top) + y + "px";
		}
	}
}

h5.ResizeGadget = function (id, w, h) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	gadget.style.width = w + "px";
	gadget.style.height = h + "px";
}

h5.RenameGadget = function (id, text) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	gadget.value = text;
}


h5.SetGadgetTooltip = function (id, text) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	gadget.title = text;
}

h5.SetGadgetFontSize = function (id, size) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	gadget.style.fontSize = size+"pt";
}

h5.SetTextfieldTitle = function (id, title) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	gadget.title = title;
}


h5.GadgetExists = function (id) {
	var gadget = document.getElementById(id);
	if (!gadget) return false;
	return true;
}

h5.SetParent = function (id, parentId) {
	var gadget = document.getElementById(id);
	if (!gadget) return false;
	
	if (parentId == "") {
		if (gadget.parentNode) {
			gadget.parentNode.removeChild(gadget);
		}
		return;	
	}
		
	var newParent = document.getElementById(parentId);
	if (!newParent) return false;
	
	newParent.appendChild(gadget);
}



h5.RemoveGadget = function (id) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	if (gadget.type === "checkbox" || gadget.type === "radio") {
		var label = document.getElementById(id + "_label");
		if (label) label.parentNode.removeChild(label);
	}
	gadget.parentNode.removeChild(gadget);
}

h5.RemoveGadgetItem = function (fromId, value) {
	var parentGadget = document.getElementById(fromId);
	if (!parentGadget) return;
	
	// remove label corresponding to radio button(if radio button) - ugly!
	if (parentGadget.type === "radio") {
		var radios = document.getElementsByName(fromId);
		for (var i=0; i < radios.length; i++) {
			if (radios[i].value === value) {
				var radio = radios[i];
				if (radio.nextSibling) {
					radio.nextSibling.parentNode.removeChild(radio.nextSibling);
				}
				radios[i].parentNode.removeChild(radios[i]);
				return;
			}
		};
		return;
	}
	
	// remove item itself
    for (i = 0; i < parentGadget.length; i++) {
        if (parentGadget[i].value === value) {
            parentGadget.removeChild(parentGadget[i]);
			return;
        }
    }
}

h5.AddGadgetItem = function(toId, value) {
	var gadget = document.getElementById(toId);
	if (!gadget) return;
	var item = document.createElement("option");
	if (item) {
		item.value = value;
		item.innerHTML = value;
		gadget.appendChild(item);
	}
}

h5.ClearGadgetItems = function (id) {
	var gadget = document.getElementById(id);
	if (!gadget) return;

    var i;
    for(i=gadget.options.length-1;i>=0;i--) {
        gadget.remove(i);
    }
}

h5.SetGadgetValue = function (id, value) {
	var gadget = document.getElementById(id);
	if (!gadget) return "";
	if (gadget.type === "label")
		gadget.innerHTML = value;
	else if (gadget.type === "radio") {
		var selectedRadio = h5.GadgetValue(id);
		if (selectedRadio != "") {
			var allRadios = document.getElementsByName(id);
			for (var i=0; i < allRadios.length; i++) {
				if (allRadios[i].value === value) {
					allRadios[i].checked = true;
					return;
				}
			}
		}
	}
	else if (gadget.type === "checkbox") {
		gadget.checked = parseInt(value);
	}
	else {
		gadget.value = value;
	}
}

h5.AddButtonClickToTextfield = function (tf, butt) {
	var go = document.getElementById(butt);
	var txt = document.getElementById(tf);
	
	txt.addEventListener("keypress", function() {
	    if (event.keyCode == 13) go.click();
	});
}
/*
h5.RemoveButtonClickFromTextfield = function (tf) {
	var txt = document.getElementById(tf);
	txt.removeEventListener("keypress");
}
*/

// Enable & Disable
h5.DisableGadget = function(id) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	gadget.disabled = true;
}

h5.EnableGadget = function(id) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	gadget.disabled = false;
}

h5.GadgetIsEnabled = function(id) {
	var gadget = document.getElementById(id);
	if (!gadget) return false;
	return !gadget.disabled;
}


// Visibility
h5.HideGadget = function(id) {
	var gadget = document.getElementById(id);
	if (!gadget) return false;
	gadget.style.display = "none";
}

h5.ShowGadget = function(id) {
	var gadget = document.getElementById(id);
	if (!gadget) return false;
	gadget.style.display = "block";
}

h5.GadgetIsVisible = function(id) {
	var gadget = document.getElementById(id);
	if (!gadget) return false;
	if (gadget.style.display === "none")
		return false;
	else
		return true;
}

h5.SelectText = function(id) {
	var gadget = document.getElementById(id);
	gadget.select();
}


// Getters
h5.GadgetX = function (id) {
	var gadget = document.getElementById(id);
	if (!gadget) return 0;
	return gadget.offsetLeft;
}

h5.GadgetY = function (id) {
	var gadget = document.getElementById(id);
	if (!gadget) return 0;
	return gadget.offsetTop;
}

h5.GadgetWidth = function (id) {
	var gadget = document.getElementById(id);
	if (!gadget) return 0;
	return gadget.offsetWidth;
}

h5.GadgetHeight = function (id) {
	var gadget = document.getElementById(id);
	if (!gadget) return 0;
	return gadget.offsetHeight;
}

h5.GadgetValue = function (id) {
	var gadget = document.getElementById(id);
	if (!gadget) return "";
	// console.log(gadget); //Steve: commented to prevent silly verbosity!
	if (gadget.type === "label")
		return gadget.textContent;
	else
		return gadget.value;
}

h5.ButtonStatus = function (id) {
	var gadget = document.getElementById(id);
	if (!gadget) return false;
	if (!gadget.checked) return false;
	return gadget.checked;
}

h5.SelectedGadgetItem = function (id) {
    var parent = document.getElementById(id);
	if (!parent) return "";

	// radio buttons
	if (parent.type === "radio") {
		var radios = document.getElementsByName(id);
		for (i = 0; i < radios.length; i++) {
		    if (radios[i].checked) {
		        return radios[i].value;
		    }
		}
		return "";
	}
	
	// listbox/combobox
	var selected = parent.selectedIndex;
	if (selected === -1) return "";
    return parent.options[selected].text;
}

h5.SelectedGadgetValue = function (id) {
    var parent = document.getElementById(id);
	if (!parent) return -1;

	
	// listbox/combobox
	return parent.selectedIndex;
}


h5.SelectedGadgetItems = function (id) {
    var parent = document.getElementById(id);
	if (!parent) return "";
	var selected = parent.selectedOptions;
	if (selected.length === 0) return [""];
	var multipleReturn = new Array(selected.length);
	for (var i=0; i < selected.length; i++) {
		multipleReturn[i] = selected[i].text;
	};
	console.log(multipleReturn);
	return multipleReturn;
}

h5.OpenUrl2 = function (url) {
	window.open(url);
}



// Dialogs
function Notify(text) {
	alert(text);
}

function ConfirmDialog(text) {
	return confirm(text);
}

function PromptDialog(text, def) {
    var res = prompt(text, def);
    
    if (res == null) return "";
    return res;
}


function getTextAsync(filename) {
	var client = new XMLHttpRequest();
	client.open('GET', filename, false);	// '/foo.txt');
	client.send();
	if (client.readyState == 4 && client.status == 200) {
//	alert(client.responseText);
		return client.responseText;
	}
	return "";
}


function getText(filename) {
	var client = new XMLHttpRequest();
	client.open('GET', filename);	// '/foo.txt');
	client.onloadend = function() {
//	client.onreadystatechange = function() {
		if (client.readyState == 4 && client.status == 200) {
			alert(client.responseText);
		}
	}
	client.send();
	return "";
}


function decodeHtmlNumeric( str ) {
    return str.replace( /&#([0-9]{1,7});/g, function( g, m1 ){
        return String.fromCharCode( parseInt( m1, 10 ) );
    }).replace( /&#[xX]([0-9a-fA-F]{1,6});/g, function( g, m1 ){
        return String.fromCharCode( parseInt( m1, 16 ) );
    });
}

function reloadPage() {
	window.onbeforeunload = undefined;
	location.reload();
}

var reloadMessage = "";
function setPageReloadMessage(msg, setCallback) {
	reloadMessage = msg;
	if (setCallback){
		window.onbeforeunload = ReloadExit;
	} else {
		window.onbeforeunload = undefined;
	}

}

function ReloadExit() {
	return reloadMessage;
}






function SaveString(content){
	uriContent = "data:application/octet-stream," + encodeURIComponent(content);
	window.open(uriContent,"Download File");
}


function saveTextAsFile(content)
{
	var textToWrite = content;	//document.getElementById("inputTextToSave").value;
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = "export.xml";	//document.getElementById("inputFileNameToSaveAs").value;

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function SaveString3(content) {
	var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "export.mm");	
}

function SaveString4(content) {
	var newwindow = window.open();
	var newdocument = newwindow.document;
	content =  content.split('>').join('&gt;');	//content.replace("<","&lt;");
	content =  content.split('<').join('&lt;');	//content.replace("<","&lt;");
//	content =  content.split('~r~n').join('<br>');	//content.replace("<","&lt;");
//	content =  content.split('~n').join('<br>');	//content.replace("<","&lt;");
//	content =  content.split('~r').join('<br>');	//content.replace("<","&lt;");
	//content = content.replace(">","&gt;");
	newdocument.write("<html><head><title>export.xml</title></head><body><pre>"+content+"</pre></body></html>");
	newdocument.close();
}
/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 2013-01-23
 *
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See LICENSE.md
 */

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs
  || (navigator.msSaveBlob && navigator.msSaveBlob.bind(navigator))
  || (function(view) {
	"use strict";
	var
		  doc = view.document
		  // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, URL = view.URL || view.webkitURL || view
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link =  !view.externalHost && "download" in save_link
		, click = function(node) {
			var event = doc.createEvent("MouseEvents");
			event.initMouseEvent(
				"click", true, false, view, 0, 0, 0, 0, 0
				, false, false, false, false, 0, null
			);
			node.dispatchEvent(event);
		}
		, webkit_req_fs = view.webkitRequestFileSystem
		, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
		, throw_outside = function (ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		, fs_min_size = 0
		, deletion_queue = []
		, process_deletion_queue = function() {
			var i = deletion_queue.length;
			while (i--) {
				var file = deletion_queue[i];
				if (typeof file === "string") { // file is an object URL
					URL.revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			}
			deletion_queue.length = 0; // clear queue
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, FileSaver = function(blob, name) {
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, blob_changed = false
				, object_url
				, target_view
				, get_object_url = function() {
					var object_url = get_URL().createObjectURL(blob);
					deletion_queue.push(object_url);
					return object_url;
				}
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					// don't create more object URLs than needed
					if (blob_changed || !object_url) {
						object_url = get_object_url(blob);
					}
					if (target_view) {
						target_view.location.href = object_url;
					} else {
                        window.open(object_url, "_blank");
                    }
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
				}
				, abortable = function(func) {
					return function() {
						if (filesaver.readyState !== filesaver.DONE) {
							return func.apply(this, arguments);
						}
					};
				}
				, create_if_not_found = {create: true, exclusive: false}
				, slice
			;
			filesaver.readyState = filesaver.INIT;
			if (!name) {
				name = "download";
			}
			if (can_use_save_link) {
				object_url = get_object_url(blob);
				save_link.href = object_url;
				save_link.download = name;
				click(save_link);
				filesaver.readyState = filesaver.DONE;
				dispatch_all();
				return;
			}
			// Object and web filesystem URLs have a problem saving in Google Chrome when
			// viewed in a tab, so I force save with application/octet-stream
			// http://code.google.com/p/chromium/issues/detail?id=91158
			if (view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = true;
			}
			// Since I can't be sure that the guessed media type will trigger a download
			// in WebKit, I append .download to the filename.
			// https://bugs.webkit.org/show_bug.cgi?id=65440
			if (webkit_req_fs && name !== "download") {
				name += ".download";
			}
			if (type === force_saveable_type || webkit_req_fs) {
				target_view = view;
			}
			if (!req_fs) {
				fs_error();
				return;
			}
			fs_min_size += blob.size;
			req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
				fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
					var save = function() {
						dir.getFile(name, create_if_not_found, abortable(function(file) {
							file.createWriter(abortable(function(writer) {
								writer.onwriteend = function(event) {
									target_view.location.href = file.toURL();
									deletion_queue.push(file);
									filesaver.readyState = filesaver.DONE;
									dispatch(filesaver, "writeend", event);
								};
								writer.onerror = function() {
									var error = writer.error;
									if (error.code !== error.ABORT_ERR) {
										fs_error();
									}
								};
								"writestart progress write abort".split(" ").forEach(function(event) {
									writer["on" + event] = filesaver["on" + event];
								});
								writer.write(blob);
								filesaver.abort = function() {
									writer.abort();
									filesaver.readyState = filesaver.DONE;
								};
								filesaver.readyState = filesaver.WRITING;
							}), fs_error);
						}), fs_error);
					};
					dir.getFile(name, {create: false}, abortable(function(file) {
						// delete file if it already exists
						file.remove();
						save();
					}), abortable(function(ex) {
						if (ex.code === ex.NOT_FOUND_ERR) {
							save();
						} else {
							fs_error();
						}
					}));
				}), fs_error);
			}), fs_error);
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name) {
			return new FileSaver(blob, name);
		}
	;
	FS_proto.abort = function() {
		var filesaver = this;
		filesaver.readyState = filesaver.DONE;
		dispatch(filesaver, "abort");
	};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	view.addEventListener("unload", process_deletion_queue, false);
	return saveAs;
}(self));
/* Blob.js
 * A Blob implementation.
 * 2013-06-20
 * 
 * By Eli Grey, http://eligrey.com
 * By Devin Samarin, https://github.com/eboyjr
 * License: X11/MIT
 *   See LICENSE.md
 */

/*global self, unescape */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */

if (typeof Blob !== "function" || typeof URL === "undefined")
if (typeof Blob === "function" && typeof webkitURL !== "undefined") var URL = webkitURL;
else var Blob = (function (view) {
	"use strict";

	var BlobBuilder = view.BlobBuilder || view.WebKitBlobBuilder || view.MozBlobBuilder || view.MSBlobBuilder || (function(view) {
		var
			  get_class = function(object) {
				return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
			}
			, FakeBlobBuilder = function BlobBuilder() {
				this.data = [];
			}
			, FakeBlob = function Blob(data, type, encoding) {
				this.data = data;
				this.size = data.length;
				this.type = type;
				this.encoding = encoding;
			}
			, FBB_proto = FakeBlobBuilder.prototype
			, FB_proto = FakeBlob.prototype
			, FileReaderSync = view.FileReaderSync
			, FileException = function(type) {
				this.code = this[this.name = type];
			}
			, file_ex_codes = (
				  "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR "
				+ "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR"
			).split(" ")
			, file_ex_code = file_ex_codes.length
			, real_URL = view.URL || view.webkitURL || view
			, real_create_object_URL = real_URL.createObjectURL
			, real_revoke_object_URL = real_URL.revokeObjectURL
			, URL = real_URL
			, btoa = view.btoa
			, atob = view.atob
			, can_apply_typed_arrays = false
			, can_apply_typed_arrays_test = function(pass) {
				can_apply_typed_arrays = !pass;
			}
			
			, ArrayBuffer = view.ArrayBuffer
			, Uint8Array = view.Uint8Array
		;
		FakeBlob.fake = FB_proto.fake = true;
		while (file_ex_code--) {
			FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
		}
		try {
			if (Uint8Array) {
				can_apply_typed_arrays_test.apply(0, new Uint8Array(1));
			}
		} catch (ex) {}
		if (!real_URL.createObjectURL) {
			URL = view.URL = {};
		}
		URL.createObjectURL = function(blob) {
			var
				  type = blob.type
				, data_URI_header
			;
			if (type === null) {
				type = "application/octet-stream";
			}
			if (blob instanceof FakeBlob) {
				data_URI_header = "data:" + type;
				if (blob.encoding === "base64") {
					return data_URI_header + ";base64," + blob.data;
				} else if (blob.encoding === "URI") {
					return data_URI_header + "," + decodeURIComponent(blob.data);
				} if (btoa) {
					return data_URI_header + ";base64," + btoa(blob.data);
				} else {
					return data_URI_header + "," + encodeURIComponent(blob.data);
				}
			} else if (real_create_object_URL) {
				return real_create_object_URL.call(real_URL, blob);
			}
		};
		URL.revokeObjectURL = function(object_URL) {
			if (object_URL.substring(0, 5) !== "data:" && real_revoke_object_URL) {
				real_revoke_object_URL.call(real_URL, object_URL);
			}
		};
		FBB_proto.append = function(data/*, endings*/) {
			var bb = this.data;
			// decode data to a binary string
			if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
				if (can_apply_typed_arrays) {
					bb.push(String.fromCharCode.apply(String, new Uint8Array(data)));
				} else {
					var
						  str = ""
						, buf = new Uint8Array(data)
						, i = 0
						, buf_len = buf.length
					;
					for (; i < buf_len; i++) {
						str += String.fromCharCode(buf[i]);
					}
				}
			} else if (get_class(data) === "Blob" || get_class(data) === "File") {
				if (FileReaderSync) {
					var fr = new FileReaderSync;
					bb.push(fr.readAsBinaryString(data));
				} else {
					// async FileReader won't work as BlobBuilder is sync
					throw new FileException("NOT_READABLE_ERR");
				}
			} else if (data instanceof FakeBlob) {
				if (data.encoding === "base64" && atob) {
					bb.push(atob(data.data));
				} else if (data.encoding === "URI") {
					bb.push(decodeURIComponent(data.data));
				} else if (data.encoding === "raw") {
					bb.push(data.data);
				}
			} else {
				if (typeof data !== "string") {
					data += ""; // convert unsupported types to strings
				}
				// decode UTF-16 to binary string
				bb.push(unescape(encodeURIComponent(data)));
			}
		};
		FBB_proto.getBlob = function(type) {
			if (!arguments.length) {
				type = null;
			}
			return new FakeBlob(this.data.join(""), type, "raw");
		};
		FBB_proto.toString = function() {
			return "[object BlobBuilder]";
		};
		FB_proto.slice = function(start, end, type) {
			var args = arguments.length;
			if (args < 3) {
				type = null;
			}
			return new FakeBlob(
				  this.data.slice(start, args > 1 ? end : this.data.length)
				, type
				, this.encoding
			);
		};
		FB_proto.toString = function() {
			return "[object Blob]";
		};
		return FakeBlobBuilder;
	}(view));

	return function Blob(blobParts, options) {
		var type = options ? (options.type || "") : "";
		var builder = new BlobBuilder();
		if (blobParts) {
			for (var i = 0, len = blobParts.length; i < len; i++) {
				builder.append(blobParts[i]);
			}
		}
		return builder.getBlob(type);
	};
}(self));
/* BlobBuilder.js
 * A BlobBuilder implementation.
 * 2012-04-21
 * 
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See LICENSE.md
 */

/*global self, unescape */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/BlobBuilder.js/blob/master/BlobBuilder.js */

var BlobBuilder = BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder || (function(view) {
"use strict";
var
	  get_class = function(object) {
		return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
	}
	, FakeBlobBuilder = function(){
		this.data = [];
	}
	, FakeBlob = function(data, type, encoding) {
		this.data = data;
		this.size = data.length;
		this.type = type;
		this.encoding = encoding;
	}
	, FBB_proto = FakeBlobBuilder.prototype
	, FB_proto = FakeBlob.prototype
	, FileReaderSync = view.FileReaderSync
	, FileException = function(type) {
		this.code = this[this.name = type];
	}
	, file_ex_codes = (
		  "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR "
		+ "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR"
	).split(" ")
	, file_ex_code = file_ex_codes.length
	, real_URL = view.URL || view.webkitURL || view
	, real_create_object_URL = real_URL.createObjectURL
	, real_revoke_object_URL = real_URL.revokeObjectURL
	, URL = real_URL
	, btoa = view.btoa
	, atob = view.atob
	, can_apply_typed_arrays = false
	, can_apply_typed_arrays_test = function(pass) {
		can_apply_typed_arrays = !pass;
	}
	
	, ArrayBuffer = view.ArrayBuffer
	, Uint8Array = view.Uint8Array
;
FakeBlobBuilder.fake = FB_proto.fake = true;
while (file_ex_code--) {
	FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
}
try {
	if (Uint8Array) {
		can_apply_typed_arrays_test.apply(0, new Uint8Array(1));
	}
} catch (ex) {}
if (!real_URL.createObjectURL) {
	URL = view.URL = {};
}
URL.createObjectURL = function(blob) {
	var
		  type = blob.type
		, data_URI_header
	;
	if (type === null) {
		type = "application/octet-stream";
	}
	if (blob instanceof FakeBlob) {
		data_URI_header = "data:" + type;
		if (blob.encoding === "base64") {
			return data_URI_header + ";base64," + blob.data;
		} else if (blob.encoding === "URI") {
			return data_URI_header + "," + decodeURIComponent(blob.data);
		} if (btoa) {
			return data_URI_header + ";base64," + btoa(blob.data);
		} else {
			return data_URI_header + "," + encodeURIComponent(blob.data);
		}
	} else if (real_create_object_URL) {
		return real_create_object_URL.call(real_URL, blob);
	}
};
URL.revokeObjectURL = function(object_URL) {
	if (object_URL.substring(0, 5) !== "data:" && real_revoke_object_URL) {
		real_revoke_object_URL.call(real_URL, object_URL);
	}
};
FBB_proto.append = function(data/*, endings*/) {
	var bb = this.data;
	// decode data to a binary string
	if (Uint8Array && data instanceof ArrayBuffer) {
		if (can_apply_typed_arrays) {
			bb.push(String.fromCharCode.apply(String, new Uint8Array(data)));
		} else {
			var
				  str = ""
				, buf = new Uint8Array(data)
				, i = 0
				, buf_len = buf.length
			;
			for (; i < buf_len; i++) {
				str += String.fromCharCode(buf[i]);
			}
		}
	} else if (get_class(data) === "Blob" || get_class(data) === "File") {
		if (FileReaderSync) {
			var fr = new FileReaderSync;
			bb.push(fr.readAsBinaryString(data));
		} else {
			// async FileReader won't work as BlobBuilder is sync
			throw new FileException("NOT_READABLE_ERR");
		}
	} else if (data instanceof FakeBlob) {
		if (data.encoding === "base64" && atob) {
			bb.push(atob(data.data));
		} else if (data.encoding === "URI") {
			bb.push(decodeURIComponent(data.data));
		} else if (data.encoding === "raw") {
			bb.push(data.data);
		}
	} else {
		if (typeof data !== "string") {
			data += ""; // convert unsupported types to strings
		}
		// decode UTF-16 to binary string
		bb.push(unescape(encodeURIComponent(data)));
	}
};
FBB_proto.getBlob = function(type) {
	if (!arguments.length) {
		type = null;
	}
	return new FakeBlob(this.data.join(""), type, "raw");
};
FBB_proto.toString = function() {
	return "[object BlobBuilder]";
};
FB_proto.slice = function(start, end, type) {
	var args = arguments.length;
	if (args < 3) {
		type = null;
	}
	return new FakeBlob(
		  this.data.slice(start, args > 1 ? end : this.data.length)
		, type
		, this.encoding
	);
};
FB_proto.toString = function() {
	return "[object Blob]";
};
return FakeBlobBuilder;
}(self));

function BBHttpRequestThread(){
	BBThread.call(this);

	this.response = {
		text: '',
		status: -1,
		length: 0
	}
}

BBHttpRequestThread.prototype=extend_class( BBThread );

BBHttpRequestThread.prototype.Init=function( requestMethod, url ){
	if ( !this.xhr ) this.xhr=new XMLHttpRequest();

	//IE9
	if (window.XDomainRequest) {
		var location = document.createElement('a');
		location.href = url;

		if ( location.hostname !== window.location.hostname){
			if ( !('withCredentials' in this.xhr) && !(this.xhr instanceof XDomainRequest) ){
				this.xhr=new XDomainRequest();
			}
		} else if (this.xhr instanceof XDomainRequest) {
			this.xhr=new XMLHttpRequest();
		}
	}

	var request = this;

	if ( !this.xhr.onload ){
		this.xhr.onload=function(e){
			request.response.status=(e.target.status) ? e.target.status : 200;
			request.response.text=e.target.responseText;

			if ( request.response.length===0 ) {
				request.response.length=e.target.responseText.length;
			}
			
			request.running=false;
		}
	}

	if ( !this.xhr.onprogress ){
		this.xhr.onprogress=function(e){
			if (e.lengthComputable) request.response.length = e.loaded;
		}
	}

	if ( !this.xhr.onerror ){
		this.xhr.onerror=function(e){
			request.response.status=(e.target.status) ? e.target.status : 0;
			request.running=false;
		}
	}

	this.response.text='';
	this.response.status=-1;
	this.response.length=0;

	this.xhr.open( requestMethod, url );
}

BBHttpRequestThread.prototype.Discard=function(){
	if ( this.xhr ) this.xhr.abort();
	this.response=null;
	this.xhr=null;
}

BBHttpRequestThread.prototype.SendRequest=function( data, mimeType  ){
	if ( data.length===0 ) data=null;
	if ( mimeType.length!==0 ) this.SetHeader( 'Content-Type', mimeType );

	this.data=data;
	this.Start();
}

BBHttpRequestThread.prototype.Run__UNSAFE__=function(){
	if ( this.xhr ){
		this.xhr.send( this.data );
	} else{
		this.running = false;
	}
}

BBHttpRequestThread.prototype.SetHeader=function( name, value ){
	if ( this.xhr && this.xhr.setRequestHeader ) this.xhr.setRequestHeader( name, value );
}

BBHttpRequestThread.prototype.BytesReceived=function(){
	return this.response.length;
}

BBHttpRequestThread.prototype.ResponseText=function(){
	return this.response.text;
}

BBHttpRequestThread.prototype.Status=function(){
	return this.response.status;
}
function c_App(){
	Object.call(this);
}
c_App.m_new=function(){
	if((bb_app__app)!=null){
		error("App has already been created");
	}
	bb_app__app=this;
	bb_app__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	bb_app__game.SetDelegate(bb_app__delegate);
	return this;
}
c_App.prototype.p_OnCreate=function(){
	return 0;
}
c_App.prototype.p_OnSuspend=function(){
	return 0;
}
c_App.prototype.p_OnResume=function(){
	return 0;
}
c_App.prototype.p_OnUpdate=function(){
	return 0;
}
c_App.prototype.p_OnLoading=function(){
	return 0;
}
c_App.prototype.p_OnRender=function(){
	return 0;
}
c_App.prototype.p_OnClose=function(){
	bb_app_EndApp();
	return 0;
}
c_App.prototype.p_OnBack=function(){
	this.p_OnClose();
	return 0;
}

// STEVE: START MINDMAP ##############################################################################################

function c_MindMapApp(){
	c_App.call(this);
	this.m_fullUrl="";
	this.m_logoSmall=null;
	this.m_userName="";
	this.m_userId="";
	this.m_loggingIn=false;
	this.m_nodeArea=null;
	this.m_topBar=null;
	this.m_sideBar=null;
	this.m_exampleMoveToComboNodes=new_object_array(512); // Steve: array for examples Move To
	this.m_download_get_req=null;
	this.m_loginLogo=null;
	this.m_screenWidth=0;
	this.m_screenHeight=0;
	this.m_movingExample=false;
	this.m_exampleToMove=null;
	this.m_connectListHtml="";
	this.m_exampleListHtml="";
	this.m_showGuide=false;
	this.m_register_post_req=null;
	this.m_changepassword_post_req=null; // Steve add
	this.m_login_get_req=null;
	this.m_upload_post_req=null;
	this.m_share_post_req=null;
	this.m_listuploads_get_req=null;
	this.m_usernames_get_req=null;
	this.m_delete_post_req=null;
	this.m_unshare_post_req=null;
	this.m_showingUploads=false;
	this.m_importLayers=c_Stack3.m_new.call(new c_Stack3);
	this.m_relaxingTime=0;
	this.m_zoomLevel=1.0;
	this.implments={c_h5GuiHandler:1,c_IOnHttpRequestComplete:1};
}
c_MindMapApp.prototype=extend_class(c_App);
c_MindMapApp.m_new=function(){
	c_App.m_new.call(this);
	return this;
}
c_MindMapApp.m_serverUrl="";
c_MindMapApp.m_serverFolder="";
c_MindMapApp.m_serverFile="";
c_MindMapApp.m_uploadFile="";
c_MindMapApp.m_colorList=[];

c_MindMapApp.prototype.p_RefreshMoveToCombo=function(){
	h5.ClearGadgetItems("exampleMoveToCombo");
	h5.AddGadgetItem("exampleMoveToCombo","Move to..");
	h5.ClearGadgetItems("exampleCopyToCombo");
	h5.AddGadgetItem("exampleCopyToCombo","Copy to..");
	var t_i=1;
	var t_=this.m_nodeArea.m_contentView.m_subviews;
	var t_2=0;
	
	//Steve; add next line for temp sort array
	var sort_array = [];
	
	while(t_2<t_.length){
		var t_v=t_[t_2];
		t_2=t_2+1;
		var t_n=object_downcast((t_v),c_NodeView);
		if((t_n)!=null){
		// Steve: remove next three, as want to alpha sort nodes before adding to HTML lists for drop-downs
		//	h5.AddGadgetItem("exampleMoveToCombo",t_n.p_title2());
		//	h5.AddGadgetItem("exampleCopyToCombo",t_n.p_title2());
		//	this.m_exampleMoveToComboNodes[t_i]=t_n;
		
		// Steve: add next line 'cose putting nodes into temp array to resort
			sort_array[t_i]=t_n;
	// console.log(sort_array[t_i].p_title2());
		
			t_i+=1;
		}
	}
	
/** STEVE: alpha sort nodes on 'move to' and 'copy to' dropdown menus **/

sort_array.sort(function (a, b) {
//console.log(a.p_title2());
//console.log(b.p_title2());
a2=a.p_title2();
b2=b.p_title2();
//console.log(a2);
//console.log(b2);
	if (a2 < b2)
		return -1;
  else if (a2 > b2)
    return 1;
  else 
    return 0;
});

// Steve: copy from sorted array into m_exampleMoveToComboNodes (which is used elsewhere when determining which node is effected)
// Also, copy from sorted array to HTML for 'move to' and 'copy to' dropdown menus

blank = 0;

for (var i=1;i<sort_array.length;i++) {

if(sort_array[i]!=null){
//console.log(sort_array[i].p_title2());

this.m_exampleMoveToComboNodes[i]=sort_array[i];

if(sort_array[i].p_title2()!=""){
h5.AddGadgetItem("exampleMoveToCombo",sort_array[i].p_title2());
h5.AddGadgetItem("exampleCopyToCombo",sort_array[i].p_title2());
}
//else console.log("blank!!");
else  blank++;


}
}

console.log("Blank node count= "+blank);

/*** Steve: end new node sorting bit***/
	
}


c_MindMapApp.prototype.p_MainOnCreate=function(){



	c_MindMapApp.m_colorList=[c_JoffColor.m_red,c_JoffColor.m_green,c_JoffColor.m_cyan,c_JoffColor.m_purple,c_JoffColor.m_mustard,c_JoffColor.m_navy,c_JoffColor.m_mint,c_JoffColor.m_grey,c_JoffColor.m_black];
	var t_topBarHeight=80;
	var t_sideBarWidth=210;
	if(this.m_nodeArea==null){
		this.m_nodeArea=c_NodeAreaView.m_new.call(new c_NodeAreaView,(t_sideBarWidth+1),(t_topBarHeight),(bb_graphics_DeviceWidth()-t_sideBarWidth-1),(bb_graphics_DeviceHeight()-t_topBarHeight));
		this.m_nodeArea.m_showTrash=false;
	}
	if(this.m_topBar==null){
		this.m_topBar=c_TopBarView.m_new.call(new c_TopBarView,0.0,0.0,(bb_graphics_DeviceWidth()),(t_topBarHeight));
		this.m_topBar.p_Setup(this.m_userName);
	}
	if(this.m_sideBar==null){
		this.m_sideBar=c_SideBarView.m_new.call(new c_SideBarView,0.0,this.m_topBar.m_frame.m_height,(t_sideBarWidth),(bb_graphics_DeviceHeight())-this.m_topBar.m_frame.m_height);
		this.m_sideBar.p_Setup2();
	}
	if(bb_mindmap_loginComplete){
		this.m_sideBar.p_ShowGadgets();
		this.m_topBar.p_ShowGadgets();
		h5.ShowGadget("examplelist");
		h5.ShowGadget("connectlist");
		h5.ShowGadget("inputWrapperId");
		this.m_nodeArea.p_SortSubviews();
		this.p_RefreshMoveToCombo();
		this.m_nodeArea.m_showTrash=true;
		// Steve: hide red "MAPS" label
		//h5.CreateLabel("mapsAreaLabel","MAPS",10,bb_graphics_DeviceHeight()-50);
		//h5.SetGadgetColor("mapsAreaLabel","red");
		return;
	}
	setPageReloadMessage("You have attempted to leave this page. Your map will be lost. Are you sure you want to exit this page?",true);
	// Steve: remove NODES area label
	//h5.CreateLabel("nodesAreaLabel","NODES",t_sideBarWidth+10,60);
	//h5.SetGadgetColor("nodesAreaLabel","red");
	//h5.CreateLabel("canvasAreaLabel","CANVAS",t_sideBarWidth+10,t_topBarHeight+10);
	//h5.SetGadgetColor("canvasAreaLabel","red");
	var t_testNode=c_NodeView.m_new.call(new c_NodeView,200.0,200.0,0.5);
	t_testNode.p_title("Node 1");
	t_testNode.m_name="Node 1";
	t_testNode.m_titleColor=c_UIColor.m_white;
	t_testNode.m_tintColor=c_MindMapApp.m_colorList[((bb_random_Rnd2(0.0,(c_MindMapApp.m_colorList.length)))|0)];
	this.m_nodeArea.p_AddSubview(t_testNode);
	var t_testNode2=c_NodeView.m_new.call(new c_NodeView,300.0,300.0,0.5);
	t_testNode2.p_title("Node 2");
	t_testNode2.m_name="Node 2";
	t_testNode2.m_titleColor=c_UIColor.m_white;
	t_testNode2.m_tintColor=c_MindMapApp.m_colorList[((bb_random_Rnd2(0.0,(c_MindMapApp.m_colorList.length)))|0)];
	this.m_nodeArea.p_AddSubview(t_testNode2);
	t_testNode=c_NodeView.m_new.call(new c_NodeView,-50000.0,-50000.0,0.1);
	var t_line=c_LineView.m_new.call(new c_LineView,(t_testNode),(t_testNode));
	t_testNode2.p_AddExample2("bbc","www.bbc.co.uk","","");
	this.m_download_get_req=c_HttpRequest.m_new.call(new c_HttpRequest,"POST",this.m_fullUrl,(this));
	// Steve edit...made default map ID customisable with variable at head of this file
	//this.m_download_get_req.p_Send2("action=getrows&p1=map&p2=id&p3=144","application/x-www-form-urlencoded","utf8");
	this.m_download_get_req.p_Send2("action=getrows&p1=map&p2=id&p3="+DEFAULT_MAP_ID,"application/x-www-form-urlencoded","utf8");
	this.m_nodeArea.p_SortSubviews();
	this.p_RefreshMoveToCombo();
}
c_MindMapApp.prototype.p_LoginOnCreate=function(){
	// h5.CreateButton("loginButton","Login",250,10,100,25,"button");
	// h5.CreateButton("loginButton","Login",250,115,100,25,"button");
	
	h5.CreateButton("loginButton","Login",(bb_graphics_DeviceWidth()/2)-50,145,100,25,"button");
	
	h5.SetGadgetTooltip("loginButton","Enter your username and pass. Email is not required."); // Steve add
	
	//h5.CreateButton("registerButton","Register",360,10,100,25,"button");
	//h5.CreateButton("registerButton","Register",250,10,100,25,"button");
	h5.CreateButton("registerButton","Register",(bb_graphics_DeviceWidth()/2)-102,40,100,25,"button");
	
	
		// Steve add next:
	h5.SetGadgetTooltip("registerButton","Username, pass and email address all required. Email needs to be genuine, as used for password reset."); 
		
	// Steve add next:
	// h5.CreateButton("resetPasswordButton","Reset Password",250,115,150,25,"button");
	//h5.CreateButton("resetPasswordButton","Reset Password",250,10,108,25,"button");
	//h5.CreateButton("resetPasswordButton","Reset Password",352,10,108,25,"button");
	h5.CreateButton("resetPasswordButton","Reset Password",(bb_graphics_DeviceWidth()/2),40,108,25,"button");
	
var iframe = document.createElement('iframe');
//iframe.style.display = "none";
iframe.src = loginPageTermsAndConditionsIFramePage;
iframe.setAttribute("id", "info_iframe");
document.body.appendChild(iframe);
	
	
	h5.SetGadgetTooltip("resetPasswordButton","Only enter your username. New pass is emailed to your registered address.");
	
	//h5.CreateTextfield("loginNameTextfield",250,40,205,14,"text","username");
	//h5.CreateTextfield("loginPasswordTextfield",250,65,205,14,"text","password");
	//h5.CreateTextfield("loginEmailTextfield",250,90,205,14,"text","email (not needed to login)");
	
	h5.CreateTextfield("loginNameTextfield",(bb_graphics_DeviceWidth()/2)-102.5,70,205,14,"text","username");
	h5.CreateTextfield("loginPasswordTextfield",(bb_graphics_DeviceWidth()/2)-102.5,95,205,14,"text","password");

	// Steve: make passwords *********
	document.getElementById("loginPasswordTextfield").type="password";
	
	h5.CreateTextfield("loginEmailTextfield",(bb_graphics_DeviceWidth()/2)-102.5,120,205,14,"text","email (not needed to login)");
	
	// Steve add: encouragement to register text
	h5.CreateLabel("encouragementToRegisterLabel",encouragementToRegisterText,(bb_graphics_DeviceWidth()/2)-350,10);
	
	h5.SelectText("loginNameTextfield");
	
	// Steve: remove logo from login page
	//this.m_loginLogo=bb_graphics_LoadImage("logo.jpg",1,c_Image.m_DefaultFlags);
	
	this.m_loggingIn=true;
	h5.HideGadget("examplelist");
	h5.HideGadget("connectlist");
	h5.HideGadget("inputWrapperId");
	h5.SetGadgetValue("logoutButton","Log out");
	
	// Steve add:
	h5.SetGadgetValue("logoutButton2","Log out");

}
c_MindMapApp.prototype.p_OnCreate=function(){

	var t_response=getTextAsync("serverinfo.txt");
	var t_parts=t_response.split("\n");
	var t_=t_parts;
	var t_2=0;
	while(t_2<t_.length){
		var t_p=t_[t_2];
		t_2=t_2+1;
		if(string_trim(t_p)==""){
			continue;
		}
		var t_p2=t_p.split("=");
		if(t_p2.length!=2){
			continue;
		}
		print(t_p);
		var t_key=t_p2[0];
		var t_val=t_p2[1];
		if(t_key=="server"){
			c_MindMapApp.m_serverUrl=t_val;
		}else{
			if(t_key=="folder"){
				c_MindMapApp.m_serverFolder=t_val;
			}else{
				if(t_key=="beanfile"){
					c_MindMapApp.m_serverFile=t_val;
				}else{
					if(t_key=="uploadfile"){
						c_MindMapApp.m_uploadFile=t_val;
					}
				}
			}
		}
	}
	this.m_fullUrl=this.m_fullUrl+c_MindMapApp.m_serverUrl;
	if(!string_endswith(this.m_fullUrl,"/")){
		this.m_fullUrl=this.m_fullUrl+"/";
	}
	this.m_fullUrl=this.m_fullUrl+c_MindMapApp.m_serverFolder;
	if(!string_endswith(this.m_fullUrl,"/")){
		this.m_fullUrl=this.m_fullUrl+"/";
	}
	this.m_fullUrl=this.m_fullUrl+c_MindMapApp.m_serverFile;
	bb_app_SetUpdateRate(30);
	this.m_logoSmall=bb_graphics_LoadImage("logo_small.png",1,c_Image.m_DefaultFlags);
	var t_state=bb_app_LoadState();
	if(t_state!=""){
		var t_stateParts=t_state.split("&");
		if(t_stateParts.length==3){
			if(string_startswith(t_stateParts[0],"user=") && string_startswith(t_stateParts[1],"pass=") && string_startswith(t_stateParts[2],"id=")){
				this.m_userName=t_stateParts[1].split("=")[1];
				this.m_userId=t_stateParts[2].split("=")[1];
				this.m_loggingIn=false;
				setBrowseButton(true);
				this.p_MainOnCreate();
			}else{
				bb_app_SaveState("");
				this.p_LoginOnCreate();
			}
		}else{
			bb_app_SaveState("");
			this.p_LoginOnCreate();
		}
	}else{
		if(this.m_loggingIn){
			this.p_LoginOnCreate();
		}else{
			this.p_MainOnCreate();
		}
	}
	return 1;
}
c_MindMapApp.prototype.p_EnableExampleDetails=function(){
	h5.EnableGadget("exampleTitleTextfield");
	h5.EnableGadget("exampleLinkTextfield");
	h5.EnableGadget("exampleDateTextfield");
	h5.EnableGadget("exampleNotesTextfield");
}
c_MindMapApp.prototype.p_ClearConnectListButtons=function(t_update){
	this.m_connectListHtml="";
	if(t_update){
		updateConnectText(this.m_connectListHtml);
	}
}
c_MindMapApp.prototype.p_AddConnectListButton=function(t_title,t_id,t_col,t_update,t_exampleText){
	this.m_connectListHtml=this.m_connectListHtml+("<li><button id='"+t_id+"' style='color: #"+t_col.p_ToHex()+"' class='connectclass' title='"+t_exampleText+"' onclick='myFunction(this.id)'>"+t_title+"</button></li>");
	if(t_update){
		updateConnectText(this.m_connectListHtml);
	}
}
c_MindMapApp.prototype.p_RefreshConnectListButtons=function(t_node){
	if(t_node==null){
		this.p_ClearConnectListButtons(true);
		return;
	}
	this.p_ClearConnectListButtons(true);
	

	if(!hideConnectedList)
	this.p_AddConnectListButton("Connected to:","-1",c_UIColor.m_black,true,"");
	var t_connectedNodes=t_node.p_GetConnectedNodes();
	var t_=t_connectedNodes.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_v=t_.p_NextObject();
		var t_n=object_downcast((t_v),c_NodeView);
		var t_exampleText="";
		if(t_n.m_examples!=null){
			t_exampleText="Examples:\n";
			var t_2=t_n.m_examples.p_ObjectEnumerator();
			while(t_2.p_HasNext()){
				var t_ex=t_2.p_NextObject();
				t_exampleText=t_exampleText+(t_ex.m_title+"\n");
			}
		}
		if(!hideConnectedList)
		this.p_AddConnectListButton(t_n.p_title2(),t_n.m_id,t_n.m_tintColor,true,t_exampleText);
	}

	}
	
// Steve: examples sorting starts here!
	
c_MindMapApp.prototype.p_ClearExampleListButtons=function(t_update){
	if(t_update){
		print("ClearExampleListButtons() update=true");
	}else{
		print("ClearExampleListButtons() update=false");
	}
	this.m_exampleListHtml="";
	if(t_update){
		updateExampleText(this.m_exampleListHtml);
	}

	
	}
c_MindMapApp.prototype.p_AddExampleListButton=function(t_title,t_id,t_url,t_col,t_update,t_nodeTitle){
	if(t_title.length>18){
		t_title=t_title.slice(0,18)+"..";
	}
	var t_backgroundColor="transparent";
	if(this.m_nodeArea.m_currentNode!=null){
		if(this.m_nodeArea.m_currentNode.m_currentExample!=null){
			if(this.m_nodeArea.m_currentNode.m_currentExample.m_id==t_id){
				t_backgroundColor="lightgreen";
			}
		}
	}
	if(h5.GadgetValue("exampleEditButton")=="done"){
		this.m_exampleListHtml=this.m_exampleListHtml+("<li style='background-color:"+t_backgroundColor+"'><button id='"+t_id+"' style='color: #"+t_col.p_ToHex()+" background-color:"+t_backgroundColor+"' title='"+t_nodeTitle+"' class='exampleclass' onclick='exampleButtonClick(this.id)'>"+t_title+"</button><button id='"+"_delete_"+t_id+"' onclick='exampleButtonClick(this.id)' title='Delete example'>-</button></li>");
	}else{
		if(h5.GadgetValue("exampleMoveButton")=="done"){
			this.m_exampleListHtml=this.m_exampleListHtml+("<li style='background-color:"+t_backgroundColor+"'><button id='"+t_id+"' style='color: #"+t_col.p_ToHex()+" background-color:"+t_backgroundColor+"' title='"+t_nodeTitle+"' Class='exampleclass' onclick='exampleButtonClick(this.id)'>"+t_title+"</button><button id='"+"_move_"+t_id+"' onclick='exampleButtonClick(this.id)' title='Move example to another node'>&gt;</button></li>");
		}else{
			if(!string_startswith(t_url,"http://")){
				t_url="http://"+t_url;
			}
			this.m_exampleListHtml=this.m_exampleListHtml+("<li style='background-color:"+t_backgroundColor+"'><button id='"+t_id+"' style='color: #"+t_col.p_ToHex()+" background-color:"+t_backgroundColor+"' title='"+t_nodeTitle+"' Class='exampleclass' onclick='exampleButtonClick(this.id)'>"+t_title+"</button><button id='"+"_internet_"+t_id+"' onclick=\"open_win('"+t_url+"')\" title='Open link: "+t_url+"'>i</button></li>");
		}
	}
	if(t_update){
		updateExampleText(this.m_exampleListHtml);
	}
}
c_MindMapApp.prototype.p_SelectExamplesFromSearch=function(t_node){
	this.p_ClearExampleListButtons(true);
	var t_searchText=string_trim(h5.GadgetValue("exampleSearchTextfield")).toLowerCase();
	var t_tempExampleList=c_List3.m_new.call(new c_List3);
	var t_nodes=this.m_nodeArea.p_GetNodes();
	var t_=t_nodes.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_node2=t_.p_NextObject();
		if(t_node2.m_examples!=null){
			var t_2=t_node2.m_examples.p_ObjectEnumerator();
			while(t_2.p_HasNext()){
				var t_e=t_2.p_NextObject();
				t_e.m_parentNodeText="";
			}
		}
	}
	var t_3=t_nodes.p_ObjectEnumerator();
	while(t_3.p_HasNext()){
		var t_node22=t_3.p_NextObject();
		if(t_node22.m_examples!=null){
			var t_4=t_node22.m_examples.p_ObjectEnumerator();
			while(t_4.p_HasNext()){
				var t_e2=t_4.p_NextObject();
				t_e2.m_parentNodeText=t_e2.m_parentNodeText+(t_node22.m_screenTitle+"\n");
			}
		}
	}
	if(t_searchText==""){
		if(t_node==null){
			var t_5=t_nodes.p_ObjectEnumerator();
			while(t_5.p_HasNext()){
				var t_node23=t_5.p_NextObject();
				if(t_node23.m_examples!=null){
					var t_6=t_node23.m_examples.p_ObjectEnumerator();
					while(t_6.p_HasNext()){
						var t_e3=t_6.p_NextObject();
						if(t_tempExampleList.p_Contains(t_e3)==false){
							t_tempExampleList.p_AddLast3(t_e3);
						}
					}
				}
			}
		}else{
			var t_7=t_node.m_examples.p_ObjectEnumerator();
			while(t_7.p_HasNext()){
				var t_e4=t_7.p_NextObject();
				t_tempExampleList.p_AddLast3(t_e4);
			}
		}
	}else{
		if(t_node==null){
			var t_8=t_nodes.p_ObjectEnumerator();
			while(t_8.p_HasNext()){
				var t_node24=t_8.p_NextObject();
				if(t_node24.m_examples!=null){
					var t_9=t_node24.m_examples.p_ObjectEnumerator();
					while(t_9.p_HasNext()){
						var t_e5=t_9.p_NextObject();
						if(string_trim(t_e5.m_title).toLowerCase().indexOf(t_searchText)!=-1){
							if(t_tempExampleList.p_Contains(t_e5)==false){
								t_tempExampleList.p_AddLast3(t_e5);
							}
						}
					}
				}
			}
		}else{
			var t_10=t_node.m_examples.p_ObjectEnumerator();
			while(t_10.p_HasNext()){
				var t_e6=t_10.p_NextObject();
				if(string_trim(t_e6.m_title).toLowerCase().indexOf(t_searchText)!=-1){
					t_tempExampleList.p_AddLast3(t_e6);
				}
			}
		}
	}
	var t_11=t_tempExampleList.p_ObjectEnumerator();
	
	
	

// Steve: fix for sorting examples into alpha order. Here's how: copies object to new array with keys, alpha sorts and then uses this to add to HTML examples list, using function p_AddExampleListButton()

// Array to hold examples
var sort_array = [];

// Steve: check what's in array of objects!
//console.log(Object.keys(t_11)); // ["m__list", "m__curr"]
//console.log(Object.keys(t_11.m__list)); 

// Go through array of example objects
while(t_11.p_HasNext()){

// Get an object (an instance of an example) out of object array
var t_e777=t_11.p_NextObject();

// Check that example title is present
//console.log("Steve: "+t_e777.key+": "+t_e777.m_title);

// Verify keys in object
//console.log(Object.keys(t_e777)); //["m_title", "m_link", "m_date", "m_notes", "m_id", "m_parentNodeText", "m_color", "m_touched"]

// For current object, push everything into new array, keeping key names
sort_array.push({m_title:t_e777.m_title,m_link:t_e777.m_link,m_date:t_e777.m_date,
m_notes:t_e777.m_notes,m_id:t_e777.m_id,m_parentNodeText:t_e777.m_parentNodeText,m_color:t_e777.m_color,m_touched:t_e777.m_touched});

} // close go through array of example objects

/*
// Next loop checks that new array really contains examples copied from objects
for (var i=0;i<sort_array.length;i++) {
console.log("Steve: "+sort_array[i].m_title);
}
*/

// Now, alpha sort new array of examples, by the values in the 'm_title' key
sort_array.sort(function (a, b) {
  if (a.m_title < b.m_title)
    return -1;
  else if (a.m_title > b.m_title)
    return 1;
  else 
    return 0;
});

/*
// Next loop checks that new array really contains sorted examples
for (var i=0;i<sort_array.length;i++) {
console.log("Steve: "+sort_array[i].m_title);
}
*/

// Instead of going through array of objects (as originally did), now go through new array of sorted examples 
// Note: key names are in array, so rest of the code below should still work
	for (var i=0;i<sort_array.length;i++) {
	var t_e7=sort_array[i];

/***** END: new bit from STEVE ********/


// Steve: next two lines are the original code to loop-through array of objects...replaced by loop through array (above)
	// while(t_11.p_HasNext()){
	// var t_e7=t_11.p_NextObject();
		
		if(t_e7.m_parentNodeText.length>0){
			t_e7.m_parentNodeText=t_e7.m_parentNodeText.slice(0,t_e7.m_parentNodeText.length-1);
		}
		if(t_e7.m_parentNodeText!=""){
			this.p_AddExampleListButton(t_e7.m_title,t_e7.m_id,t_e7.m_link,t_e7.m_color,true,"Owned by:\n"+t_e7.m_parentNodeText);
			//console.log("Steve: "+t_e7.m_title);
		}else{
			this.p_AddExampleListButton(t_e7.m_title,t_e7.m_id,t_e7.m_link,t_e7.m_color,true,"");
		}
	}
	if(t_node==null){
		h5.HideGadget("exampleAddButton");
	}else{
		h5.ShowGadget("exampleAddButton");
	}
	if(this.m_exampleListHtml==""){
		h5.HideGadget("exampleEditButton");
	}else{
		h5.ShowGadget("exampleEditButton");
	}
}
c_MindMapApp.prototype.p_RefreshExampleListButtons=function(t_node){
	print("RefreshExampleListButtons()");
	if(t_node==null){
		this.p_SelectExamplesFromSearch(t_node);
		return;
	}
	if(t_node.m_examples==null){
		this.p_ClearExampleListButtons(true);
		h5.HideGadget("exampleEditButton");
		h5.ShowGadget("exampleAddButton");
		return;
	}
	this.p_SelectExamplesFromSearch(t_node);
}
c_MindMapApp.prototype.p_MainOnUpdate=function(){
	c_UIView.m_UpdateAll();
	
	if(bb_graphics_DeviceWidth()!=this.m_screenWidth){
		h5.SetGadgetPosition("logoutButton",bb_graphics_DeviceWidth()-160,h5.GadgetY("logoutButton"));
		h5.SetGadgetPosition("helpButton",bb_graphics_DeviceWidth()-50,h5.GadgetY("helpButton"));
		this.m_screenWidth=bb_graphics_DeviceWidth();
		this.m_nodeArea.m_frame.m_width=(bb_graphics_DeviceWidth())-this.m_sideBar.m_frame.m_width-1.0;
	}
	if(bb_graphics_DeviceHeight()!=this.m_screenHeight){
		this.m_screenHeight=bb_graphics_DeviceHeight();
		this.m_sideBar.p_PositionGadgets();
		this.m_nodeArea.m_frame.m_height=(bb_graphics_DeviceHeight())-this.m_topBar.m_frame.m_height;
	}
	while(c_UIEvent.m_eventStack.p_Length()>0){
		var t_ev=c_UIEvent.m_ProcessEvent();
		if(t_ev==null){
			continue;
		}
		if(t_ev.m_event==15){
			if(this.m_movingExample){
				this.m_nodeArea.m_currentNode.p_AddExample(this.m_exampleToMove);
				this.m_exampleToMove=null;
				this.m_movingExample=false;
			}
			if((t_ev.m_sender)!=null){
				h5.SetGadgetValue("nodeNameTextfield",object_downcast((t_ev.m_sender),c_NodeView).p_realTitle());
				this.m_topBar.m_colorPicker.m_current=object_downcast((t_ev.m_sender),c_NodeView).m_tintColor;
			}
			var t_n=object_downcast((t_ev.m_sender),c_NodeView);
			if((t_n)!=null){
				if((t_n.m_currentExample)!=null){
					var t_ex=t_n.m_currentExample;
					h5.SetGadgetValue("exampleTitleTextfield",t_ex.m_title);
					h5.SetGadgetValue("exampleLinkTextfield",t_ex.m_link);
					h5.SetGadgetValue("exampleDateTextfield",t_ex.m_date);
					h5.SetGadgetValue("exampleNotesTextfield",t_ex.m_notes);
					
					if(bb_mindmap_loginComplete){
						this.p_EnableExampleDetails();
					}
				}else{
					h5.SetGadgetValue("exampleTitleTextfield","");
					h5.SetGadgetValue("exampleLinkTextfield","");
					h5.SetGadgetValue("exampleDateTextfield","");
					h5.SetGadgetValue("exampleNotesTextfield","");
					h5.DisableGadget("exampleTitleTextfield");
					h5.DisableGadget("exampleLinkTextfield");
					h5.DisableGadget("exampleDateTextfield");
					h5.DisableGadget("exampleNotesTextfield");
				}
			}
			this.p_RefreshConnectListButtons(this.m_nodeArea.m_currentNode);
			this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
			print("** Select Node Event **");
		}else{
			if(t_ev.m_event==9){
				print("View Clicked Event "+t_ev.m_sender.m_controlType);
				if(t_ev.m_sender==(this.m_topBar.m_colorPicker)){
					if(this.m_topBar.m_colorPicker.m_collapsed){
						if((this.m_nodeArea.m_currentNode)!=null){
							this.m_nodeArea.m_currentNode.m_tintColor=this.m_topBar.m_colorPicker.m_current;
						}
					}
				}
				this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
				this.p_RefreshConnectListButtons(this.m_nodeArea.m_currentNode);
				if(this.m_nodeArea.m_currentNode==null){
					h5.SetGadgetValue("exampleTitleTextfield","");
					h5.SetGadgetValue("exampleLinkTextfield","");
					h5.SetGadgetValue("exampleDateTextfield","");
					h5.SetGadgetValue("exampleNotesTextfield","");
					h5.DisableGadget("exampleTitleTextfield");
					h5.DisableGadget("exampleLinkTextfield");
					h5.DisableGadget("exampleDateTextfield");
					h5.DisableGadget("exampleNotesTextfield");
				}
			}else{
				if(t_ev.m_event==16){
					this.p_RefreshConnectListButtons(this.m_nodeArea.m_currentNode);
				}else{
					if(t_ev.m_event==17){
						this.p_RefreshMoveToCombo();
						if(t_ev.m_sender==(this.m_nodeArea.m_currentNode)){
							this.m_nodeArea.m_currentNode=null;
						}
						this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
						this.p_RefreshConnectListButtons(this.m_nodeArea.m_currentNode);
					}
				}
			}
		}
		if((bb_input_KeyDown(32))!=0){
			if(t_ev.m_event==8){
				if(t_ev.m_sender==(this.m_nodeArea.m_currentNode)){
					print("mindmap StopMouseDragEvent");
					var t_nodes=this.m_nodeArea.p_GetNodes();
					t_ev.m_sender=null;
					t_ev.m_event=20;
					var t_=t_nodes.p_ObjectEnumerator();
					while(t_.p_HasNext()){
						var t_node=t_.p_NextObject();
						if(t_node.m_current){
							continue;
						}
						if(!t_node.m_selected){
							continue;
						}
					}
				}
			}else{
				if(t_ev.m_event==6){
					if(t_ev.m_sender==(this.m_nodeArea.m_currentNode)){
						print("mindmap StartMouseDragEvent");
						var t_nodes2=this.m_nodeArea.p_GetNodes();
						t_ev.m_sender=null;
						t_ev.m_event=18;
						var t_2=t_nodes2.p_ObjectEnumerator();
						while(t_2.p_HasNext()){
							var t_node2=t_2.p_NextObject();
							if(t_node2.m_current){
								continue;
							}
							if(!t_node2.m_selected){
								continue;
							}
							t_node2.p_SendEvent(t_ev);
						}
					}
				}else{
					if(t_ev.m_event==7){
						if(t_ev.m_sender==(this.m_nodeArea.m_currentNode)){
							print("mindmap MouseDragEvent");
							var t_nodes3=this.m_nodeArea.p_GetNodes();
							t_ev.m_sender=null;
							t_ev.m_event=19;
							var t_3=t_nodes3.p_ObjectEnumerator();
							while(t_3.p_HasNext()){
								var t_node3=t_3.p_NextObject();
								if(t_node3.m_current){
									continue;
								}
								if(!t_node3.m_selected){
									continue;
								}
								t_node3.p_SendEvent(t_ev);
							}
						}
					}
				}
			}
		}
	}
	if((bb_input_KeyHit(112))!=0){
		this.m_showGuide=!this.m_showGuide;
	}
	if(connectButtonText!=""){
		var t_nodes4=this.m_nodeArea.p_GetNodes();
		var t_n2=c_NodeView.m_FindFromId(t_nodes4,connectButtonText);
		if(t_n2!=null){
			var t_4=t_nodes4.p_ObjectEnumerator();
			while(t_4.p_HasNext()){
				var t_n22=t_4.p_NextObject();
				t_n22.m_current=false;
			}
			this.m_nodeArea.m_currentNode=t_n2;
			t_n2.m_current=true;
			t_n2.m_selected=true;
			this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
			this.p_RefreshConnectListButtons(this.m_nodeArea.m_currentNode);
		}
		connectButtonText="";
	}
	if(exampleButtonText!=""){
		if(string_startswith(exampleButtonText,"_delete_")){
			if(this.m_nodeArea.m_currentNode!=null){
				c_Example.m_RemoveFirst(this.m_nodeArea.m_currentNode.m_examples,string_replace(exampleButtonText,"_delete_",""));
				h5.SetGadgetValue("exampleTitleTextfield","");
				h5.SetGadgetValue("exampleLinkTextfield","");
				h5.SetGadgetValue("exampleDateTextfield","");
				h5.SetGadgetValue("exampleNotesTextfield","");
				h5.DisableGadget("exampleTitleTextfield");
				h5.DisableGadget("exampleLinkTextfield");
				h5.DisableGadget("exampleDateTextfield");
				h5.DisableGadget("exampleNotesTextfield");
				this.m_nodeArea.m_currentNode.m_currentExample=null;
				this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
				this.p_RefreshConnectListButtons(this.m_nodeArea.m_currentNode);
			}
		}else{
			if(string_startswith(exampleButtonText,"_internet_")){
				if(this.m_nodeArea.m_currentNode!=null){
					var t_ex2=c_Example.m_FindFromId(this.m_nodeArea.m_currentNode.m_examples,string_replace(exampleButtonText,"_internet_",""));
					var t_link=t_ex2.m_link;
					if(!(string_startswith(string_trim(t_ex2.m_link),"http://") || string_startswith(string_trim(t_ex2.m_link),"https://"))){
						t_link="http://"+t_link;
					}
					if((bb_input_KeyDown(16))!=0){
						h5.OpenUrl2(t_link);
					}else{
						bb_app_OpenUrl(t_link);
					}
				}
			}else{
				if(string_startswith(exampleButtonText,"_move_")){
					if(this.m_movingExample==false){
						if((this.m_nodeArea.m_currentNode)!=null){
							this.m_movingExample=true;
							this.m_exampleToMove=this.m_nodeArea.m_currentNode.m_currentExample;
							this.m_exampleToMove.p_RemoveFirst3(this.m_nodeArea.m_currentNode.m_examples);
							this.m_nodeArea.m_currentNode.m_currentExample=null;
							h5.DisableGadget("exampleTitleTextfield");
							h5.DisableGadget("exampleLinkTextfield");
							h5.DisableGadget("exampleDateTextfield");
							h5.DisableGadget("exampleNotesTextfield");
							this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
							this.p_RefreshConnectListButtons(this.m_nodeArea.m_currentNode);
						}
					}
				}else{
					if(this.m_nodeArea.m_currentNode!=null){
						this.m_nodeArea.m_currentNode.m_currentExample=c_Example.m_FindFromId(this.m_nodeArea.m_currentNode.m_examples,exampleButtonText);
						var t_ex3=this.m_nodeArea.m_currentNode.m_currentExample;
						if(t_ex3!=null){
							h5.SetGadgetValue("exampleTitleTextfield",t_ex3.m_title);
							h5.SetGadgetValue("exampleLinkTextfield",t_ex3.m_link);
							h5.SetGadgetValue("exampleDateTextfield",t_ex3.m_date);
							h5.SetGadgetValue("exampleNotesTextfield",t_ex3.m_notes);
							this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
							this.p_RefreshConnectListButtons(this.m_nodeArea.m_currentNode);
							if(bb_mindmap_loginComplete){
								this.p_EnableExampleDetails();
							}
						}
					}else{
						var t_nodes5=this.m_nodeArea.p_GetNodes();
						var t_5=t_nodes5.p_ObjectEnumerator();
						while(t_5.p_HasNext()){
							var t_node4=t_5.p_NextObject();
							if(t_node4.m_examples!=null){
								var t_ex4=c_Example.m_FindFromId(t_node4.m_examples,exampleButtonText);
								if(t_ex4!=null){
									if(this.m_nodeArea.m_currentNode==null){
										t_node4.m_current=true;
									}
									this.m_nodeArea.m_currentNode=t_node4;
									t_node4.m_selected=true;
									t_node4.m_currentExample=t_ex4;
									h5.SetGadgetValue("exampleTitleTextfield",t_ex4.m_title);
									h5.SetGadgetValue("exampleLinkTextfield",t_ex4.m_link);
									h5.SetGadgetValue("exampleDateTextfield",t_ex4.m_date);
									// Steve: this is where initial example values are set...!!!
									h5.SetGadgetValue("exampleNotesTextfield",t_ex4.m_notes);
									// print("!!!!!!!!!!!!!!!!!!!!!!!"+t_ex4.m_notes);
									//h5.SetGadgetValue("exampleNotesTextfield","gosh");
									this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
									this.p_RefreshConnectListButtons(this.m_nodeArea.m_currentNode);
									if(bb_mindmap_loginComplete){
										this.p_EnableExampleDetails();
									}
								}
							}
						}
					}
				}
			}
		}
		exampleButtonText="";
	}
}
c_MindMapApp.prototype.p_OnUpdate=function(){
	bb_h5_UpdateGuiEvents(this);
	if(this.m_loggingIn){
	}else{
		this.p_MainOnUpdate();
	}
	// Steve changed next line
	if(this.m_register_post_req!=null || this.m_login_get_req!=null || this.m_changepassword_post_req!=null || this.m_upload_post_req!=null || this.m_share_post_req!=null || this.m_listuploads_get_req!=null || this.m_download_get_req!=null || this.m_usernames_get_req!=null || this.m_delete_post_req!=null || this.m_unshare_post_req!=null){
		bb_asyncevent_UpdateAsyncEvents();
	}
	return 1;
}
c_MindMapApp.prototype.p_ProcessXmlNode=function(t_xmlNode,t_parentNode,t_weighting,t_color,t_layerIndex){
	if(t_xmlNode.p_HasAttribute("LINK")){
		if(t_parentNode!=null){
			if(!t_xmlNode.p_HasAttribute("EXAMPLE_INSTANCE")){
			
			// Steve change: the bug causing example 'notes' field to contain the contents of the title ('text') field?
		
			//	var t_ex=t_parentNode.p_AddExample2(t_xmlNode.p_GetAttribute("TEXT"),t_xmlNode.p_GetAttribute("LINK"),t_xmlNode.p_GetAttribute("MODIFIED"),t_xmlNode.p_GetAttribute("TEXT"));
				
			var t_ex=t_parentNode.p_AddExample2(t_xmlNode.p_GetAttribute("TEXT"),t_xmlNode.p_GetAttribute("LINK"),t_xmlNode.p_GetAttribute("MODIFIED"),t_xmlNode.p_GetAttribute("NOTES"));
				
				if(t_xmlNode.p_HasAttribute("COLOR")){
					t_ex.m_color=c_UIColor.m_new2.call(new c_UIColor,t_xmlNode.p_GetAttribute("COLOR"));
				}
				if(t_xmlNode.p_HasAttribute("ID")){
					t_ex.m_id=t_xmlNode.p_GetAttribute("ID");
				}
				if(t_xmlNode.p_HasAttribute("DATE")){
					t_ex.m_date=t_xmlNode.p_GetAttribute("DATE");
				}
			}else{
				var t_exId=t_xmlNode.p_GetAttribute("ID");
				var t_globalExampleList=c_List3.m_new.call(new c_List3);
				var t_nodes=this.m_nodeArea.p_GetNodes();
				var t_found=false;
				var t_=t_nodes.p_ObjectEnumerator();
				while(t_.p_HasNext()){
					var t_n=t_.p_NextObject();
					if((t_n.m_examples)!=null){
						var t_2=t_n.m_examples.p_ObjectEnumerator();
						while(t_2.p_HasNext()){
							var t_ex2=t_2.p_NextObject();
							if(t_ex2.m_id==t_exId){
								t_parentNode.p_AddExample(t_ex2);
								t_found=true;
								break;
							}
						}
					}
					if(t_found==true){
						break;
					}
				}
			}
			return;
		}
	}
	var t_attr=t_xmlNode.p_GetAttribute("TEXT");
	if(t_attr.toLowerCase().indexOf("[example]")!=-1){
		if(t_parentNode!=null){
			var t_pos=t_attr.toLowerCase().indexOf("[example]",0);
			var t_txt=string_replace(t_attr,t_attr.slice(t_pos,t_pos+9),"");
			var t_ex3=t_parentNode.p_AddExample2(t_txt,t_txt,t_xmlNode.p_GetAttribute("MODIFIED"),t_txt);
			if(t_xmlNode.p_HasAttribute("COLOR")){
				t_ex3.m_color=c_UIColor.m_new2.call(new c_UIColor,t_xmlNode.p_GetAttribute("COLOR"));
			}
			if(t_xmlNode.p_HasAttribute("ID")){
				t_ex3.m_id=t_xmlNode.p_GetAttribute("ID");
			}
			if(t_xmlNode.p_HasAttribute("DATE")){
				t_ex3.m_date=t_xmlNode.p_GetAttribute("DATE");
			}
			return;
		}
	}
	if(t_weighting<0.0){
		t_weighting=0.0;
	}
	if(t_xmlNode.p_HasAttribute("WEIGHTING")){
		t_weighting=parseFloat(t_xmlNode.p_GetAttribute("WEIGHTING"));
	}
	var t_x=400.0;
	var t_y=400.0;
	if(t_xmlNode.p_HasAttribute("XY")){
		t_x=parseFloat(t_xmlNode.p_GetAttribute("XY").split(",")[0]);
		t_y=parseFloat(t_xmlNode.p_GetAttribute("XY").split(",")[1]);
		this.m_nodeArea.m_offset=0.0;
	}
	var t_node=c_NodeView.m_new.call(new c_NodeView,t_x,t_y,t_weighting);
	if(t_xmlNode.p_HasAttribute("ID")){
		t_node.m_id=t_xmlNode.p_GetAttribute("ID");
	}
	if(t_xmlNode.p_HasAttribute("OTHER_CHILDREN")){
		t_node.m_otherChildren=t_xmlNode.p_GetAttribute("OTHER_CHILDREN");
	}
	if(this.m_importLayers.p_Length()<t_layerIndex+1){
		this.m_importLayers.p_Push7(c_List4.m_new.call(new c_List4));
	}
	var t_layer=this.m_importLayers.p_Get(t_layerIndex);
	t_layer.p_AddLast4(t_node);
	t_node.m_layer=t_layerIndex;
	t_node.p_title(t_xmlNode.p_GetAttribute("TEXT"));
	t_node.m_titleColor=c_UIColor.m_white;
	if(t_color==null){
		if(t_xmlNode.p_HasAttribute("COLOR")){
			t_node.m_tintColor=c_UIColor.m_new2.call(new c_UIColor,t_xmlNode.p_GetAttribute("COLOR"));
		}else{
			t_node.m_tintColor=c_MindMapApp.m_colorList[((bb_random_Rnd2(0.0,(c_MindMapApp.m_colorList.length)))|0)];
		}
	}else{
		t_node.m_tintColor=t_color;
	}
	this.m_nodeArea.p_AddSubview(t_node);
	if(t_parentNode!=null){
		var t_line=c_LineView.m_new.call(new c_LineView,(t_parentNode),(t_node));
		t_node.m_parentNode=t_parentNode;
		this.m_nodeArea.p_AddSubview(t_line);
	}
	if(t_xmlNode.p_HasAttribute("LINK")){
		if(t_parentNode==null){
			var t_ex4=t_node.p_AddExample2(t_xmlNode.p_GetAttribute("TEXT"),t_xmlNode.p_GetAttribute("LINK"),t_xmlNode.p_GetAttribute("MODIFIED"),t_xmlNode.p_GetAttribute("TEXT"));
			if(t_xmlNode.p_HasAttribute("COLOR")){
				t_ex4.m_color=c_UIColor.m_new2.call(new c_UIColor,t_xmlNode.p_GetAttribute("COLOR"));
			}
			if(t_xmlNode.p_HasAttribute("ID")){
				t_ex4.m_id=t_xmlNode.p_GetAttribute("ID");
			}
			if(t_xmlNode.p_HasAttribute("DATE")){
				t_ex4.m_date=t_xmlNode.p_GetAttribute("DATE");
			}
		}
	}
	var t_childXmlNodes=t_xmlNode.p_GetChildren("node");
	var t_3=t_childXmlNodes.p_ObjectEnumerator();
	while(t_3.p_HasNext()){
		var t_childXmlNode=t_3.p_NextObject();
		this.p_ProcessXmlNode(t_childXmlNode,t_node,t_weighting-0.1,null,t_layerIndex+1);
	}
}
c_MindMapApp.prototype.p_LoadNewXmlData=function(t_data){
	this.m_nodeArea.p_ClearNodes();
	h5.SetGadgetValue("exampleSearchTextfield","");
	this.m_importLayers=c_Stack3.m_new.call(new c_Stack3);
	t_data=string_replace(t_data,"&apos;","'");
	t_data=string_replace(t_data,"{apos}","'");
	t_data=string_replace(t_data,"&amp;","&");
	t_data=decodeHtmlNumeric(t_data);
	var t_xmlDoc=bb_xml2_ParseXML(t_data,null,1);
	var t_node=t_xmlDoc.p_GetChildAtPath("node");
	while(t_node.m_valid){
		this.p_ProcessXmlNode(t_node,null,0.7,null,0);
		t_node=t_node.p_GetNextSibling("node");
	}
	var t_nodes=this.m_nodeArea.p_GetNodes();
	var t_=t_nodes.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_n=t_.p_NextObject();
		if(t_n.m_otherChildren==""){
			continue;
		}
		var t_otherParts=t_n.m_otherChildren.split(",");
		var t_2=t_otherParts;
		var t_3=0;
		while(t_3<t_2.length){
			var t_part=t_2[t_3];
			t_3=t_3+1;
			var t_n2=c_NodeView.m_FromId(t_part,t_nodes);
			var t_line=c_LineView.m_new.call(new c_LineView,(t_n),(t_n2));
			this.m_nodeArea.p_AddSubview(t_line);
			t_n2.m_parentNode=t_n;
		}
	}
	this.p_RefreshMoveToCombo();
	this.m_nodeArea.p_SortSubviews();
	this.m_relaxingTime=0;
	if(this.m_nodeArea.m_offset>1.0){
		var t_rad=0.0;
		var t_4=this.m_importLayers.p_ObjectEnumerator();
		while(t_4.p_HasNext()){
			var t_layer=t_4.p_NextObject();
			var t_ang=0.0;
			var t_stepAng=((360/(t_layer.p_Count()+1))|0);
			var t_5=t_layer.p_ObjectEnumerator();
			while(t_5.p_HasNext()){
				var t_n3=t_5.p_NextObject();
				t_n3.p_Position(400.0+Math.cos((t_ang)*D2R)*t_rad+this.m_nodeArea.m_offset,400.0+Math.sin((t_ang)*D2R)*t_rad+this.m_nodeArea.m_offset);
				t_ang+=t_stepAng;
			}
			t_rad=t_rad+230.0;
		}
		t_rad=0.0;
		var t_6=this.m_importLayers.p_ObjectEnumerator();
		while(t_6.p_HasNext()){
			var t_layer2=t_6.p_NextObject();
			if(t_rad<1.0){
				continue;
			}
			t_layer2.p_AddLast4(t_layer2.p_First());
			t_rad=t_rad+230.0;
		}
		this.m_relaxingTime=1000;
	}
	h5.DisableGadget("exampleTitleTextfield");
	h5.DisableGadget("exampleLinkTextfield");
	h5.DisableGadget("exampleDateTextfield");
	h5.DisableGadget("exampleNotesTextfield");
	this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
	this.p_RefreshConnectListButtons(this.m_nodeArea.m_currentNode);
}
c_MindMapApp.prototype.p_RelaxNodes=function(t_n,t_n2){
	var t_k=0.4;
	var t_restLength=t_n.m_frame.m_width+t_n2.m_frame.m_width;
	var t_dx=t_n.m_frame.m_x-t_n2.m_frame.m_x;
	var t_dy=t_n.m_frame.m_y-t_n2.m_frame.m_y;
	var t_dist=Math.sqrt(t_dx*t_dx+t_dy*t_dy);
	var t_w=t_n.m_mass+t_n2.m_mass;
	if(bb_math_Abs2(t_dist)<0.00001){
		t_dist=1.0;
	}
	if(t_dist>t_restLength && (t_n.m_parentNode!=t_n2 && t_n2.m_parentNode!=t_n)){
		return;
	}
	if(t_n.m_parentNode!=null){
		t_n.m_frame.m_x-=t_dx/t_dist*((t_dist-t_restLength)*t_k)*(t_n.m_mass/t_w);
		t_n.m_targetFrame.m_x=t_n.m_frame.m_x;
		t_n.m_frame.m_y-=t_dy/t_dist*((t_dist-t_restLength)*t_k)*(t_n.m_mass/t_w);
		t_n.m_targetFrame.m_y=t_n.m_frame.m_y;
	}
	if(t_n2.m_parentNode!=null){
		t_n2.m_frame.m_x+=t_dx/t_dist*((t_dist-t_restLength)*t_k)*(t_n2.m_mass/t_w);
		t_n2.m_targetFrame.m_x=t_n2.m_frame.m_x;
		t_n2.m_frame.m_y+=t_dy/t_dist*((t_dist-t_restLength)*t_k)*(t_n2.m_mass/t_w);
		t_n2.m_targetFrame.m_y=t_n2.m_frame.m_y;
	}
}
c_MindMapApp.prototype.p_Relax=function(){
	var t_nodes=this.m_nodeArea.p_GetNodes().p_ToArray();
	var t_nodeCount=t_nodes.length;
	for(var t_cnt=0;t_cnt<=4;t_cnt=t_cnt+1){
		for(var t_i=0;t_i<t_nodeCount-1;t_i=t_i+1){
			var t_n=t_nodes[t_i];
			for(var t_i2=t_i+1;t_i2<t_nodeCount;t_i2=t_i2+1){
				var t_n2=t_nodes[t_i2];
				this.p_RelaxNodes(t_n,t_n2);
			}
		}
	}
}







c_MindMapApp.prototype.p_MainOnRender=function(){

// Note: this function is called on each frame refresh.
count++

if(count<5)
{
// Steve: setting start zoom level
this.m_nodeArea.m_xscale=startZoomLevel;
this.m_nodeArea.m_yscale=startZoomLevel;
}

					

//##########

//this.m_nodeArea.m_x+=1500;
//this.m_nodeArea.m_y+=100;

// Steve tweak - canvas background colour set here
// The old yellow: #FFFCE3
	// bb_graphics_Cls(255.0,252.0,227.0);
	
	// This is the grey #ababab
	// bb_graphics_Cls(171.0,171.0,171.0);
	
	// This is white!
	bb_graphics_Cls(255.0,255.0,255.0);
	
	bb_graphics_SetColor(0.0,0.0,0.0);
	
	// Steve topmost panel with logo and login button
	bb_graphics_DrawRect(this.m_sideBar.m_frame.m_width,this.m_topBar.m_frame.m_height,(bb_graphics_DeviceWidth()),1.0,false,true);
	
	// Steve: testing the new top panel for text
	//x,y,w,h,dotted,filled);
	// bb_graphics_DrawRect(this.m_sideBar.m_frame.m_width,this.m_topBar.m_frame.m_height+50,(bb_graphics_DeviceWidth()),1.0,false,true);

	
	// Steve: zoom box
	bb_graphics_DrawRect(this.m_sideBar.m_frame.m_width-1.0,0.0,2.0,this.m_topBar.m_frame.m_height,false,true);
	bb_graphics_SetColor(255.0,255.0,255.0);
	
	// Steve: logo box - top right - DISABLED!
	//bb_graphics_DrawImage(this.m_logoSmall,970.0,10.0,0);
	c_UIView.m_DrawAll();
	if(this.m_showingUploads){
		// bb_graphics_SetColor(255.0,252.0,227.0);
		// Steve tweak:
		bb_graphics_SetColor(171.0,171.0,171.0);
		
		
		bb_graphics_DrawRect(280.0,100.0,660.0,(bb_graphics_DeviceHeight()-100),false,true);
	}
	if(fileLoadResult!=""){
		this.p_LoadNewXmlData(fileLoadResult);
		fileLoadResult="";
	}
	if(((bb_input_KeyDown(113))!=0) || this.m_relaxingTime>0){
		this.p_Relax();
		this.m_relaxingTime-=1;
		if(this.m_relaxingTime<0){
			this.m_relaxingTime=0;
		}
	}
}
c_MindMapApp.prototype.p_LoginOnRender=function(){
	bb_graphics_Cls(255.0,255.0,255.0);
	// Steve: comment out next to disable logo on login page
	// bb_graphics_DrawImage(this.m_loginLogo,0.0,0.0,0);
}
c_MindMapApp.prototype.p_OnRender=function(){
	if(!this.m_loggingIn){
		this.p_MainOnRender();
	}else{
		this.p_LoginOnRender();
	}
	return 1;
}
c_MindMapApp.prototype.p_LoginEnd=function(){
// Steve: comment out next to disable logo on login page
	// this.m_loginLogo.p_Discard();
	this.m_loggingIn=false;
	bb_mindmap_loginComplete=true;
	h5.RemoveGadget("loginNameTextfield");
	h5.RemoveGadget("loginPasswordTextfield");
	h5.RemoveGadget("loginEmailTextfield");
	h5.RemoveGadget("loginButton");
	h5.RemoveGadget("registerButton");
	// Steve add next:
	h5.RemoveGadget("resetPasswordButton");
	setBrowseButton(true);
	this.p_MainOnCreate();
}
c_MindMapApp.prototype.p_TryLogin=function(){
	print("login button click");
	if(h5.GadgetValue("loginPasswordTextfield")=="test" && h5.GadgetValue("loginNameTextfield")=="test"){
		this.p_LoginEnd();
	}else{
		if(string_trim(h5.GadgetValue("loginPasswordTextfield"))!=""){
			if(string_trim(h5.GadgetValue("loginNameTextfield"))!="" || string_trim(h5.GadgetValue("loginEmailTextfield"))!=""){
				h5.CreateLabel("StatusLabel","Attempting login..",10,5);
				if(h5.GadgetValue("loginEmailTextfield")!=""){
					this.m_login_get_req=c_HttpRequest.m_new.call(new c_HttpRequest,"POST",this.m_fullUrl,(this));
				}else{
					this.m_login_get_req=c_HttpRequest.m_new.call(new c_HttpRequest,"POST",this.m_fullUrl,(this));
				}
				//this.m_login_get_req.p_Send2("action=getrows&p1=user&p2=username&p3="+h5.GadgetValue("loginNameTextfield"),"application/x-www-form-urlencoded","utf8");
				
				// Steve edit: send entered password as p4 (p1 = database table to search by = 'user', p2= field in database table to search by ='username', 
				// p3 = username entered)
									
				this.m_login_get_req.p_Send2("action=getrows&p1=user&p2=username&p3="+h5.GadgetValue("loginNameTextfield")+"&p4="+h5.GadgetValue("loginPasswordTextfield"),"application/x-www-form-urlencoded","utf8");
				
			}else{
				Notify("Please type in your username or email. Or register if you haven't already.");
			}
		}else{
			Notify("Please type in your password. Or register if you haven't already.");
		}
	}
}
c_MindMapApp.prototype.p_TryRegister=function(){

	print("register button click");
	
	
	
	if(string_trim(h5.GadgetValue("loginNameTextfield"))!="" && string_trim(h5.GadgetValue("loginPasswordTextfield"))!="" && string_trim(h5.GadgetValue("loginEmailTextfield"))!=""){
		h5.CreateLabel("StatusLabel","Attempting registration..",10,5);
		this.m_register_post_req=c_HttpRequest.m_new.call(new c_HttpRequest,"POST",this.m_fullUrl,(this));
		this.m_register_post_req.p_Send2("action=register&e="+h5.GadgetValue("loginEmailTextfield")+"&p="+h5.GadgetValue("loginPasswordTextfield")+"&u="+h5.GadgetValue("loginNameTextfield"),"application/x-www-form-urlencoded","utf8");
		
	}else{
		Notify("Please type your username, email and password.");
	}
}


// Steve add new function

c_MindMapApp.prototype.p_TryResetPassword=function(){

	// print("reset password button click");
	
	if(string_trim(h5.GadgetValue("loginNameTextfield"))!=""){
	
	h5.CreateLabel("StatusLabel","Resetting password..check your email",10,5);
		
	this.m_changepassword_post_req=c_HttpRequest.m_new.call(new c_HttpRequest,"POST",this.m_fullUrl,(this));
	
	this.m_changepassword_post_req.p_Send2("action=resetpassword&u="+h5.GadgetValue("loginNameTextfield"),"application/x-www-form-urlencoded","utf8");
		
	}else{
		Notify("Please type your username.");
	}
}





c_MindMapApp.prototype.p_ClearMap=function(){
	this.m_nodeArea.p_ClearNodes();
	h5.SetGadgetValue("exampleSearchTextfield","");
	h5.DisableGadget("exampleTitleTextfield");
	h5.DisableGadget("exampleLinkTextfield");
	h5.DisableGadget("exampleDateTextfield");
	h5.DisableGadget("exampleNotesTextfield");
	h5.SetGadgetValue("exampleTitleTextfield","no title");
	h5.SetGadgetValue("exampleLinkTextfield","");
	h5.SetGadgetValue("exampleDateTextfield","");
	h5.SetGadgetValue("exampleNotesTextfield","");
	this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
	this.p_RefreshConnectListButtons(this.m_nodeArea.m_currentNode);
	this.p_RefreshMoveToCombo();
}
c_MindMapApp.prototype.p_ProcessNodeForExport=function(t_parentXmlNode,t_node){
	var t_xmlNode=t_parentXmlNode.p_AddChild("node","");
	t_xmlNode.p_SetAttribute5("COLOR","#"+t_node.m_tintColor.p_ToHex());
	t_xmlNode.p_SetAttribute5("ID",t_node.m_id);
	t_xmlNode.p_SetAttribute5("TEXT",t_node.p_realTitle());
	t_xmlNode.p_SetAttribute5("XY",String((t_node.m_frame.m_x)|0)+","+String((t_node.m_frame.m_y)|0));
	t_xmlNode.p_SetAttribute4("WEIGHTING",t_node.m_weighting);
	if((t_node.m_examples)!=null){
		var t_=t_node.m_examples.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_ex=t_.p_NextObject();
			if(t_ex.m_touched){
				var t_xmlLink=t_xmlNode.p_AddChild("node","");
				t_xmlLink.p_SetAttribute5("EXAMPLE_INSTANCE","YES");
				t_xmlLink.p_SetAttribute5("ID",t_ex.m_id);
				t_xmlLink.p_SetAttribute5("LINK","INSTANCE");
			}else{
				var t_xmlLink2=t_xmlNode.p_AddChild("node","");
				t_xmlLink2.p_SetAttribute5("COLOR","#"+t_ex.m_color.p_ToHex());
				t_xmlLink2.p_SetAttribute5("ID",t_ex.m_id);
				t_xmlLink2.p_SetAttribute5("TEXT",t_ex.m_title);
				t_xmlLink2.p_SetAttribute5("LINK",t_ex.m_link);
				t_xmlLink2.p_SetAttribute5("NOTES",t_ex.m_notes);
				t_xmlLink2.p_SetAttribute5("DATE",t_ex.m_date);
				t_ex.m_touched=true;
			}
		}
	}
	var t_otherChildren="";
	t_node.m_touched=true;
	var t_2=t_node.p_GetChildNodes().p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_child=t_2.p_NextObject();
		if(t_child.m_touched){
			t_otherChildren=t_otherChildren+(t_child.m_id+",");
		}else{
			this.p_ProcessNodeForExport(t_xmlNode,t_child);
		}
	}
	if(string_endswith(t_otherChildren,",")){
		t_otherChildren=t_otherChildren.slice(0,t_otherChildren.length-1);
	}
	if(t_otherChildren!=""){
		t_xmlNode.p_SetAttribute5("OTHER_CHILDREN",t_otherChildren);
	}
}
c_MindMapApp.prototype.p_ConvertNodesToXmlText=function(){
	var t_i=0;
	var t_nodes=this.m_nodeArea.p_GetNodes();
	var t_rootNodes=c_List4.m_new.call(new c_List4);
	var t_=t_nodes.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_n=t_.p_NextObject();
		t_n.m_id=String(t_i);
		t_n.m_touched=false;
		t_i+=1;
		if(t_n.m_parentNode==null){
			t_rootNodes.p_AddLast4(t_n);
		}
		if((t_n.m_examples)!=null){
			var t_2=t_n.m_examples.p_ObjectEnumerator();
			while(t_2.p_HasNext()){
				var t_ex=t_2.p_NextObject();
				t_ex.m_touched=false;
			}
		}
	}
	var t_xmlDoc=c_XMLDoc2.m_new.call(new c_XMLDoc2,"root_element","1.0","utf8");
	if(t_xmlDoc.m_valid){
		print("xmlDoc is valid");
	}
	var t_3=t_rootNodes.p_ObjectEnumerator();
	while(t_3.p_HasNext()){
		var t_n2=t_3.p_NextObject();
		if(!t_n2.m_touched){
			this.p_ProcessNodeForExport((t_xmlDoc),t_n2);
		}
	}
	return t_xmlDoc.p_Export(0);
}
c_MindMapApp.prototype.p_RemoveDownloadMap=function(t_umap){
	h5.RemoveGadget("downloadNameTextfield_"+t_umap.m_id);
	h5.RemoveGadget("downloadOwnerNameTextfield_"+t_umap.m_id);
	h5.RemoveGadget("downloadButton_"+t_umap.m_id);
	h5.RemoveGadget("shareButton_"+t_umap.m_id);
	if(t_umap.m_owner==this.m_userId){
		h5.RemoveGadget("usernameCombobox_"+t_umap.m_id);
		h5.RemoveGadget("deleteButton_"+t_umap.m_id);
	}
}
c_MindMapApp.prototype.p_RemoveDownloadList=function(t_removeGadgetsOnly){
	this.m_showingUploads=false;
	h5.RemoveGadget("downloadBackgroundWindow");
	h5.RemoveGadget("downloadNameLabel");
	h5.RemoveGadget("downloadOwnerNameLabel");
	h5.RemoveGadget("downloadShareLabel");
	h5.RemoveGadget("downloadPrevPageButt");
	h5.RemoveGadget("downloadNextPageButt");
	h5.RemoveGadget("downloadListCancelButton");
	h5.RemoveGadget("pageCountLabel");
	if(!t_removeGadgetsOnly){
		c_User.m_Clear();
	}
	if(c_UploadedMap.m__list==null){
		return;
	}
	var t_=c_UploadedMap.m__list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_umap=t_.p_NextObject();
		this.p_RemoveDownloadMap(t_umap);
	}
	if(!t_removeGadgetsOnly){
		c_UploadedMap.m_Clear();
	}
}
c_MindMapApp.prototype.p_ShowUploadedGrid=function(){
	this.m_showingUploads=true;
	h5.CreateButton("downloadBackgroundWindow","",280,100,660,bb_graphics_DeviceHeight()-100,"button");
	h5.DisableGadget("downloadBackgroundWindow");
	h5.CreateButton("downloadPrevPageButt","<",880,100,30,30,"button");
	h5.CreateButton("downloadNextPageButt",">",910,100,30,30,"button");
	h5.CreateLabel("pageCountLabel",String(c_UploadedMap.m_page+1)+" of "+String((Math.ceil((c_UploadedMap.m__list.p_Count())/10.0))|0),780,110);
	h5.CreateButton("downloadListCancelButton","Done",690,100,80,30,"button");
	h5.SetGadgetTooltip("downloadListCancelButton","Hide this panel.");
	h5.CreateLabel("downloadNameLabel","Map name",300,170);
	h5.CreateLabel("downloadOwnerNameLabel","Owner",455,170);
	h5.CreateLabel("downloadShareLabel","Share with..",765,170);
	var t_y=200;
//	var t_cnt=0;
	
	// Steve tweak
	var t_cnt=1;
	
	var t_=c_UploadedMap.m__list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_umap=t_.p_NextObject();
		if(t_cnt>(c_UploadedMap.m_page+1)*10){
			break;
		}
		
		//print(t_umap.m_name+"!!!!!!!!!!!!!!!!!!!!");
		// print(c_UploadedMap.m_page+"!!!!!!!!!!!!!!!!!!!!");
		
//		if(t_cnt>c_UploadedMap.m_page*10){
		// Steve tweak: setting t_cnt=1 above solved the problem of only showing maps when n>1, but if no maps for user, displayed an undefined entry. 
		// Checking map t_umap.m_id is not undefined, prevents this. 
		if(t_cnt>c_UploadedMap.m_page*10 && t_umap.m_id){
	
			h5.CreateLabel("downloadNameTextfield_"+t_umap.m_id,"",300,t_y);
			h5.SetGadgetValue("downloadNameTextfield_"+t_umap.m_id,t_umap.m_name);
			h5.CreateLabel("downloadOwnerNameTextfield_"+t_umap.m_id,"",455,t_y);
			h5.SetGadgetValue("downloadOwnerNameTextfield_"+t_umap.m_id,t_umap.m_ownerName);
			h5.CreateButton("downloadButton_"+t_umap.m_id,"Download",610,t_y,80,20,"button");
			h5.SetGadgetTooltip("downloadButton_"+t_umap.m_id,"Download this map. NB: map will not be stored on your local drive.");
			if(t_umap.m_owner==this.m_userId){
				h5.CreateButton("shareButton_"+t_umap.m_id,"Share",700,t_y,60,20,"button");
				h5.SetGadgetTooltip("shareButton_"+t_umap.m_id,"Share this map with one or all other users.");
				h5.CreateButton("deleteButton_"+t_umap.m_id,"Delete",870,t_y,50,20,"button");
				h5.SetGadgetTooltip("deleteButton_"+t_umap.m_id,"Permanently delete this map from the server.");
			}else{
				if(t_umap.m_borrower==this.m_userId){
					h5.CreateButton("shareButton_"+t_umap.m_id,"Return",700,t_y,60,20,"button");
					h5.SetGadgetTooltip("shareButton_"+t_umap.m_id,"Unborrow! Return this map and make it no longer visible.");
				}
			}
			t_umap.m_y=t_y;
			t_y+=24;
		} // THIS ONE
		t_cnt+=1;
	}
}
c_MindMapApp.prototype.p_ShowUsers=function(){

// Steve tweak: setting cnt=1 ensures that first map in list has the combo dropdown box with the usernames
	var t_cnt=1;
	//var t_cnt=0;
	var t_=c_UploadedMap.m__list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_umap=t_.p_NextObject();
		if(t_cnt>(c_UploadedMap.m_page+1)*10){
			break;
		}
		if(t_cnt>c_UploadedMap.m_page*10){
			if(t_umap.m_owner==this.m_userId){
				h5.CreateCombobox("usernameCombobox_"+t_umap.m_id,765,t_umap.m_y,100,20);
				h5.AddGadgetItem("usernameCombobox_"+t_umap.m_id,"All");
				var t_2=c_User.m__list.p_ObjectEnumerator();
				while(t_2.p_HasNext()){
					var t_user=t_2.p_NextObject();
					if(t_user.m_id==this.m_userId){
						continue;
					}
					h5.AddGadgetItem("usernameCombobox_"+t_umap.m_id,t_user.m_username);
				}
			}
		}
		t_cnt+=1;
	}
}


// Steve: event handling
c_MindMapApp.prototype.p_OnGuiEvent=function(t_event){
	if(this.m_loggingIn){
		var t_3=t_event.type;
		if(t_3=="click"){
			print("login click");
			if(t_event.id=="loginButton"){

		
			// Steve add: confirmation dialog
			if(ConfirmDialog(doYouAgreeToConditionsText))
			{
			this.p_TryLogin();
			}
			
			}else{
				if(t_event.id=="registerButton"){
				
				    // Steve add: confirmation dialog
					if(ConfirmDialog(doYouAgreeToConditionsText))
					{
					this.p_TryRegister();
					}
				}
				
		// Steve add next 		
				else{
				if(t_event.id=="resetPasswordButton"){
						if(ConfirmDialog("You are about to reset your password. A replacement will be sent to your registered email. Are you sure?"))
						{
						this.p_TryResetPassword();
						}
				}
				}
		// Steve: end add		
				
				
			}
		}else{
			if(t_3=="keydown"){
				if(t_event.id=="loginNameTextfield" || t_event.id=="loginPasswordTextfield"){
					h5.SetGadgetValue("loginNameTextfield",string_replace(h5.GadgetValue("loginNameTextfield")," ",""));
					h5.SetGadgetValue("loginPasswordTextfield",string_replace(h5.GadgetValue("loginPasswordTextfield")," ",""));
					h5.SetGadgetValue("loginEmailTextfield",string_replace(h5.GadgetValue("loginEmailTextfield")," ",""));
				}
				if(t_event.keycode==13){
					if(t_event.id=="loginEmailTextfield" && string_trim(h5.GadgetValue("loginEmailTextfield"))!=""){
						this.p_TryRegister();
					}else{
						if(t_event.id=="loginPasswordTextfield"){
							this.p_TryLogin();
						}
					}
				}
			}
		}
		return;
	}
	var t_4=t_event.type;
	if(t_4=="click"){
		if(t_event.id=="exampleSearchClearButton"){
			h5.SetGadgetValue("exampleSearchTextfield","");
			this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
		}else{
			if(t_event.id=="groupsTextarea"){
				print("groupsTextarea clicked");
			}else{
				if(t_event.id=="newMapButton"){
					if(ConfirmDialog("Delete all nodes and create a new map? Are you sure?")){
						this.p_ClearMap();
					}
				}else{
					if(t_event.id=="addNodeButton"){
						print("Clicked: "+t_event.id+" nodearea.contentView.x="+String(this.m_nodeArea.m_contentView.m_frame.m_x)+" y="+String(this.m_nodeArea.m_contentView.m_frame.m_y));
						var t_newNode=c_NodeView.m_new.call(new c_NodeView,-this.m_nodeArea.m_contentView.m_frame.m_x+100.0,-this.m_nodeArea.m_contentView.m_frame.m_y+100.0,0.5);
						t_newNode.p_title("New node");
						t_newNode.m_titleColor=c_UIColor.m_white;
						t_newNode.m_tintColor=this.m_topBar.m_colorPicker.m_current;
						this.m_nodeArea.p_AddSubview2((t_newNode),false);
						this.p_RefreshMoveToCombo();
					}else{
						if(t_event.id=="logoutButton" || t_event.id=="logoutButton2"){
							if(bb_mindmap_loginComplete){
								if(ConfirmDialog("Logging out will delete the current map. Are you sure?")){
								//console.log("here");
									bb_app_SaveState("");
									reloadPage();
								}
							}else{
								this.m_loggingIn=true;
								if((this.m_topBar)!=null){
									this.m_topBar.p_HideGadgets();
								}
								if((this.m_sideBar)!=null){
									this.m_sideBar.p_HideGadgets();
								}
								h5.RemoveGadget("nodesAreaLabel");
								h5.RemoveGadget("canvasAreaLabel");
								h5.RemoveGadget("mapsAreaLabel");

							
								bb_app_SaveState("");
								this.p_LoginOnCreate();
							}
						}else{
							if(t_event.id=="helpButton"){
								var t_helpUrl=c_MindMapApp.m_serverUrl;
								if(!string_endswith(t_helpUrl,"/")){
									t_helpUrl=t_helpUrl+"/";
								}
								t_helpUrl=t_helpUrl+c_MindMapApp.m_serverFolder;
								open_win(t_helpUrl+"/help.html");
								//open_win(t_helpUrl+"/help.pdf");
							}else{
								if(t_event.id=="groupNodesButton"){
									print("Clicked: "+t_event.id);
									this.m_nodeArea.p_GroupNodes();
								}else{
									if(t_event.id=="zoomInButton"){
										print("Clicked: "+t_event.id);
										this.m_nodeArea.m_xscale*=1.5;
										this.m_nodeArea.m_yscale*=1.5;
										this.m_zoomLevel*=1.5;
						
										if (centredZoom)
										{
										// Steve: pan map back to centre after zoom
										var x = this.m_nodeArea.m_contentView.m_targetFrame.m_x;
										var y = this.m_nodeArea.m_contentView.m_targetFrame.m_y;
										var newCentre = centreZoomIn(this.m_nodeArea.m_xscale, this.m_nodeArea.m_yscale, x, y);
										this.m_nodeArea.m_contentView.m_targetFrame.m_x = newCentre.x;
										this.m_nodeArea.m_contentView.m_targetFrame.m_y = newCentre.y;
										}
				
									}else{
										if(t_event.id=="zoomOutButton"){
											print("Clicked: "+t_event.id);
											this.m_nodeArea.m_xscale*=0.666666666;
											this.m_nodeArea.m_yscale*=0.666666666;
											this.m_zoomLevel*=0.666666666;
											
											
										if (centredZoom)
										{
										// Steve: pan map back to centre after zoom						
										var x = this.m_nodeArea.m_contentView.m_targetFrame.m_x;
										var y = this.m_nodeArea.m_contentView.m_targetFrame.m_y;
										var newCentre = centreZoomOut(this.m_nodeArea.m_xscale, this.m_nodeArea.m_yscale, x, y);
										this.m_nodeArea.m_contentView.m_targetFrame.m_x = newCentre.x;
										this.m_nodeArea.m_contentView.m_targetFrame.m_y = newCentre.y;
										}
											
											
										}else{
											if(string_startswith(t_event.id,"buttonCheck")){
												print(t_event.id+": "+String((h5.ButtonStatus(t_event.id))?1:0));
											}else{
												if(string_startswith(t_event.id,"button")){
													print("Clicked: "+t_event.id);
													if(t_event.id=="button1"){
														h5.AddGadgetItem("combo1","Option 1");
													}else{
														if(t_event.id=="button2"){
															h5.RemoveGadgetItem("combo1","Option 1");
														}
													}
												}else{
													if(t_event.id=="exampleAddButton"){
														if((this.m_nodeArea.m_currentNode)!=null){
															this.m_nodeArea.m_currentNode.p_AddExample2("no title","","","");
															if(bb_mindmap_loginComplete){
																this.p_EnableExampleDetails();
															}
															h5.SetGadgetValue("exampleTitleTextfield","no title");
															h5.SetGadgetValue("exampleLinkTextfield","");
															h5.SetGadgetValue("exampleDateTextfield","");
															h5.SetGadgetValue("exampleNotesTextfield","");
															h5.SetGadgetValue("exampleSearchTextfield","");
															h5.SelectText("exampleTitleTextfield");
															this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
														}else{
															Notify("You need to select a node before adding an example.");
														}
													}else{
														if(t_event.id=="exampleUpdateButton"){
															if((this.m_nodeArea.m_currentNode)!=null){
																var t_ex=this.m_nodeArea.m_currentNode.m_currentExample;
																if((t_ex)!=null){
																	t_ex.m_title=h5.GadgetValue("exampleTitleTextfield");
																	t_ex.m_link=h5.GadgetValue("exampleLinkTextfield");
																	t_ex.m_date=h5.GadgetValue("exampleDateTextfield");
																	t_ex.m_notes=h5.GadgetValue("exampleNotesTextfield");
																	this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
																}
															}
														}else{
															if(t_event.id=="exampleEditButton"){
																if((this.m_nodeArea.m_currentNode)!=null){
																	if(h5.GadgetValue("exampleEditButton")=="edit"){
																		h5.SetGadgetValue("exampleEditButton","done");
																		h5.DisableGadget("exampleMoveButton");
																	}else{
																		h5.SetGadgetValue("exampleEditButton","edit");
																		h5.EnableGadget("exampleMoveButton");
																	}
																	this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
																}
															}else{
																if(t_event.id=="exampleMoveButton"){
																	if((this.m_nodeArea.m_currentNode)!=null){
																		if(h5.GadgetValue("exampleMoveButton")=="move"){
																			h5.SetGadgetValue("exampleMoveButton","done");
																			h5.DisableGadget("exampleEditButton");
																		}else{
																			h5.SetGadgetValue("exampleMoveButton","move");
																			if(bb_mindmap_loginComplete){
																				h5.EnableGadget("exampleEditButton");
																			}
																		}
																		this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
																	}
																}else{
																	if(t_event.id=="exportXmlButton"){
																		var t_txt=this.p_ConvertNodesToXmlText();
																		SaveString3(t_txt);
																	}else{
																		if(t_event.id=="saveToServerXmlButton"){
																			print("saveToServer button click");
																			// print("user id is "+this.m_userId);
																			var t_res=PromptDialog("Type a cloud name","");
																			if(t_res==""){
																				return;
																			}
																			h5.SetGadgetValue("uploadNameTextfield",t_res);
																			h5.CreateLabel("StatusLabel","Attempting upload..",10,5);
																			var t_txt2=this.p_ConvertNodesToXmlText();
																			t_txt2=decodeHtmlNumeric(t_txt2);
																			t_txt2=string_replace(t_txt2,"&apos;","{apos}");
																			t_txt2=string_replace(t_txt2,"&","%26");
																			t_txt2=string_replace(t_txt2,"'","{apos}");
																			var t_fullUrl2=c_MindMapApp.m_serverUrl;
																			if(!string_endswith(t_fullUrl2,"/")){
																				t_fullUrl2=t_fullUrl2+"/";
																			}
																			t_fullUrl2=t_fullUrl2+c_MindMapApp.m_serverFolder;
																			if(!string_endswith(t_fullUrl2,"/")){
																				t_fullUrl2=t_fullUrl2+"/";
																			}
																			t_fullUrl2=t_fullUrl2+c_MindMapApp.m_uploadFile;
																			this.m_upload_post_req=c_HttpRequest.m_new.call(new c_HttpRequest,"POST",t_fullUrl2,(this));
																			this.m_upload_post_req.p_Send2("owner="+this.m_userId+"&name2="+h5.GadgetValue("uploadNameTextfield")+"&url="+t_txt2,"application/x-www-form-urlencoded","utf8");
																		}else{
																			if(t_event.id=="browseUploadsButton"){
																				this.p_RemoveDownloadList(false);
																				h5.DisableGadget("browseUploadsButton");
																				this.m_listuploads_get_req=c_HttpRequest.m_new.call(new c_HttpRequest,"POST",this.m_fullUrl,(this));
																				this.m_listuploads_get_req.p_Send2("action=listvisiblemaps&p1="+this.m_userId,"application/x-www-form-urlencoded","utf8");
																			}else{
																				if(t_event.id=="downloadListCancelButton"){
																					this.p_RemoveDownloadList(false);
																				}else{
																					if(t_event.id=="downloadPrevPageButt"){
																						if(c_UploadedMap.m_page>0){
																							c_UploadedMap.m_page-=1;
																							this.p_RemoveDownloadList(true);
																							this.p_ShowUploadedGrid();
																							this.p_ShowUsers();
																						}
																					}else{
																						if(t_event.id=="downloadNextPageButt"){
																							if(c_UploadedMap.m_page*10<c_UploadedMap.m__list.p_Count()-10){
																								c_UploadedMap.m_page+=1;
																								this.p_RemoveDownloadList(true);
																								this.p_ShowUploadedGrid();
																								this.p_ShowUsers();
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		if(c_UploadedMap.m__list!=null){
			var t_=c_UploadedMap.m__list.p_ObjectEnumerator();
			while(t_.p_HasNext()){
				var t_umap=t_.p_NextObject();
				if(t_event.id=="downloadButton_"+t_umap.m_id){
					this.m_download_get_req=c_HttpRequest.m_new.call(new c_HttpRequest,"POST",this.m_fullUrl,(this));
					this.m_download_get_req.p_Send2("action=getrows&p1=map&p2=id&p3="+t_umap.m_id,"application/x-www-form-urlencoded","utf8");
					break;
				}
				if(t_umap.m_owner==this.m_userId){
					if(t_event.id=="shareButton_"+t_umap.m_id){
						this.m_share_post_req=c_HttpRequest.m_new.call(new c_HttpRequest,"POST",this.m_fullUrl,(this));
						var t_user=c_User.m_FromIndex(h5.SelectedGadgetValue("usernameCombobox_"+t_umap.m_id));
						if(t_user==null){
							if(h5.GadgetValue("usernameCombobox_"+t_umap.m_id)=="All"){
								this.m_share_post_req.p_Send2("action=import&filter=mapid,owner,borrower&table=share&mapid="+t_umap.m_id+"&owner="+this.m_userId+"&borrower=[all]","application/x-www-form-urlencoded","utf8");
							}
						}else{
							this.m_share_post_req.p_Send2("action=import&filter=mapid,owner,borrower&table=share&mapid="+t_umap.m_id+"&owner="+this.m_userId+"&borrower="+t_user.m_id,"application/x-www-form-urlencoded","utf8");
						}
						break;
					}
					if(t_event.id=="deleteButton_"+t_umap.m_id){
						if(ConfirmDialog("Delete map from server? Are you sure?")){
							this.m_delete_post_req=c_HttpRequest.m_new.call(new c_HttpRequest,"POST",this.m_fullUrl,(this));
							this.m_delete_post_req.p_Send2("action=trash&p1=map&p2="+t_umap.m_id,"application/x-www-form-urlencoded","utf8");
							break;
						}
					}
				}else{
					if(t_event.id=="shareButton_"+t_umap.m_id){
						if(ConfirmDialog("Remove your ability to access this map? Are you sure?")){
							this.m_unshare_post_req=c_HttpRequest.m_new.call(new c_HttpRequest,"POST",this.m_fullUrl,(this));
							this.m_unshare_post_req.p_Send2("action=trash&p1=share&p2="+t_umap.m_shareid,"application/x-www-form-urlencoded","utf8");
							break;
						}
					}
				}
			}
		}
	}else{
		if(t_4=="select"){
			print("select "+t_event.id);
		}else{
			if(t_4=="keydown"){
				if(t_event.id=="nodeNameTextfield"){
					if((this.m_nodeArea.m_currentNode)!=null){
						this.m_nodeArea.m_currentNode.p_title(h5.GadgetValue(t_event.id));
						this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
						this.p_RefreshMoveToCombo();
					}
				}else{
					if(t_event.id=="exampleSearchTextfield"){
						this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
					}else{
						if(t_event.id=="exampleTitleTextfield" || t_event.id=="exampleLinkTextfield" || t_event.id=="exampleDateTextfield" || t_event.id=="exampleNotesTextfield"){
							if((this.m_nodeArea.m_currentNode)!=null){
								var t_ex2=this.m_nodeArea.m_currentNode.m_currentExample;
								if((t_ex2)!=null){
									t_ex2.m_title=h5.GadgetValue("exampleTitleTextfield");
									t_ex2.m_link=h5.GadgetValue("exampleLinkTextfield");
									t_ex2.m_date=h5.GadgetValue("exampleDateTextfield");
									t_ex2.m_notes=h5.GadgetValue("exampleNotesTextfield");
									this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
								}
							}
						}
					}
				}
			}else{
				if(t_4=="change"){
					print("CHANGE event");
					if(string_startswith(t_event.id,"usernameCombobox_")){
					}else{
						if(t_event.id=="groupsTextarea"){
							print("Textfield: "+h5.GadgetValue("groupsTextarea"));
						}else{
							if(t_event.id=="nodeNameTextfield"){
								print("***** "+t_event.id);
							}else{
								if(t_event.id=="exampleMoveToCombo"){
									print("exampleMoveToCombo "+h5.SelectedGadgetItem(t_event.id)+" "+h5.GadgetValue(t_event.id)+" "+String(h5.SelectedGadgetValue(t_event.id)));
									if((this.m_nodeArea.m_currentNode)!=null){
										if((this.m_nodeArea.m_currentNode.m_currentExample)!=null){
											
											//Steve: adjust index to look in m_exampleMoveToComboNodes array, by +10. This is something to do with stripping white space and null array elements durring sorting.
											// I never quite worked out why +10!!
											//var t_moveToNode=this.m_exampleMoveToComboNodes[h5.SelectedGadgetValue(t_event.id)]; //Steve: get node from m_exampleMoveToComboNodes array, using index of item in Move To list
											//var t_moveToNode=this.m_exampleMoveToComboNodes[h5.SelectedGadgetValue(t_event.id)+10]; //Steve: get node from m_exampleMoveToComboNodes array, using index of item in Move To list
											var t_moveToNode=this.m_exampleMoveToComboNodes[h5.SelectedGadgetValue(t_event.id)+blank]; //Steve: get node from m_exampleMoveToComboNodes array, using index of item in Move To list
											
											if(this.m_nodeArea.m_currentNode!=t_moveToNode){
												if(t_moveToNode.m_examples==null){
													t_moveToNode.p_AddExample(this.m_nodeArea.m_currentNode.m_currentExample);
													this.m_nodeArea.m_currentNode.p_RemoveExample(this.m_nodeArea.m_currentNode.m_currentExample);
													this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
													h5.SetGadgetValue("exampleTitleTextfield","");
													h5.SetGadgetValue("exampleLinkTextfield","");
													h5.SetGadgetValue("exampleDateTextfield","");
													h5.SetGadgetValue("exampleNotesTextfield","");
													h5.DisableGadget("exampleTitleTextfield");
													h5.DisableGadget("exampleLinkTextfield");
													h5.DisableGadget("exampleDateTextfield");
													h5.DisableGadget("exampleNotesTextfield");
												}else{
													if(t_moveToNode.m_examples.p_Contains(this.m_nodeArea.m_currentNode.m_currentExample)){
														Notify("Cannot move this example because it already exists in target node.");
													}else{
														t_moveToNode.p_AddExample(this.m_nodeArea.m_currentNode.m_currentExample);
														this.m_nodeArea.m_currentNode.p_RemoveExample(this.m_nodeArea.m_currentNode.m_currentExample);
														this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
														h5.SetGadgetValue("exampleTitleTextfield","");
														h5.SetGadgetValue("exampleLinkTextfield","");
														h5.SetGadgetValue("exampleDateTextfield","");
														h5.SetGadgetValue("exampleNotesTextfield","");
														h5.DisableGadget("exampleTitleTextfield");
														h5.DisableGadget("exampleLinkTextfield");
														h5.DisableGadget("exampleDateTextfield");
														h5.DisableGadget("exampleNotesTextfield");
													}
												}
											}
										}
									}
									this.p_RefreshMoveToCombo();
								}else{
									if(t_event.id=="exampleCopyToCombo"){
										print("exampleCopyToCombo "+h5.SelectedGadgetItem(t_event.id)+" "+h5.GadgetValue(t_event.id)+" "+String(h5.SelectedGadgetValue(t_event.id)));
										if((this.m_nodeArea.m_currentNode)!=null){
											if((this.m_nodeArea.m_currentNode.m_currentExample)!=null){
												//var t_copyToNode=this.m_exampleMoveToComboNodes[h5.SelectedGadgetValue(t_event.id)];
												//Steve: 
												//var t_copyToNode=this.m_exampleMoveToComboNodes[h5.SelectedGadgetValue(t_event.id)+10];
												var t_copyToNode=this.m_exampleMoveToComboNodes[h5.SelectedGadgetValue(t_event.id)+blank]; //Steve: get node from m_exampleMoveToComboNodes array, using index of item in Move To list
												if(this.m_nodeArea.m_currentNode!=t_copyToNode){
													if(t_copyToNode.m_examples==null){
														t_copyToNode.p_AddExample(this.m_nodeArea.m_currentNode.m_currentExample);
														this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
													}else{
														if(t_copyToNode.m_examples.p_Contains(this.m_nodeArea.m_currentNode.m_currentExample)){
															Notify("Cannot copy this example because it already exists in target node.");
														}else{
															t_copyToNode.p_AddExample(this.m_nodeArea.m_currentNode.m_currentExample);
															this.p_RefreshExampleListButtons(this.m_nodeArea.m_currentNode);
														}
													}
												}
											}
										}
										this.p_RefreshMoveToCombo();
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
c_MindMapApp.prototype.p_OnHttpRequestComplete=function(t_req){
	print("OnHttpRequestComplete");
	h5.RemoveGadget("StatusLabel");
	h5.RemoveGadget("encouragementToRegisterLabel");
	h5.RemoveGadget("info_iframe");
		
	var t_resp=string_trim(t_req.ResponseText());
	// Steve: removed next 2 because was being verbose about XML nodes 
	//print("Status="+String(t_req.Status()));
	//print("ResponseText="+t_resp);
	if(t_req.Status()==200){
		var t_1=t_req;
		if(t_1==this.m_download_get_req){
			print("Http download POST complete!");
			var t_xmlStart=t_resp.indexOf("<?xml version=",0);
			if(t_xmlStart>-1){
				var t_xmlEnd=t_resp.indexOf("</root_element>",0);
				if(t_xmlEnd>-1){
					t_xmlEnd+="</root_element>".length;
					var t_xml=string_replace(t_resp.slice(t_xmlStart,t_xmlEnd),"\\\"","\"");
					this.p_LoadNewXmlData(t_xml);
					this.p_RemoveDownloadList(false);
				}else{
					Notify("Error: Can't find end of xml data.");
				}
			}else{
				Notify("Error: Can't find start of xml data.");
			}
		}else{
			if(t_1==this.m_delete_post_req){
				print("Http delete POST complete!");
				if((t_resp.indexOf("Error:")!=-1) || !(t_resp.indexOf("id=")!=-1)){
					Notify("Couldn't delete map. "+t_resp);
				}else{
					var t_id=t_resp.split("=")[1];
					var t_=c_UploadedMap.m__list.p_ObjectEnumerator();
					while(t_.p_HasNext()){
						var t_umap=t_.p_NextObject();
						if(t_umap.m_id==t_id){
							this.p_RemoveDownloadMap(t_umap);
							c_UploadedMap.m__list.p_Remove3(t_umap);
							break;
						}
					}
					Notify("Map deleted successfully.");
				}
			}else{
				if(t_1==this.m_share_post_req){
					print("Http share POST complete!");
					if(t_resp.indexOf("id=")!=-1){
						Notify("Map shared.");
					}else{
						Notify("Error: map didn't share. Try again, or contact admin.");
					}
				}else{
					if(t_1==this.m_unshare_post_req){
						print("Http unshare POST complete!");
						if((t_resp.indexOf("Error:")!=-1) || !(t_resp.indexOf("id=")!=-1)){
							Notify("Couldn't unshare map. "+t_resp);
						}else{
							var t_shareid=t_resp.split("=")[1];
							var t_2=c_UploadedMap.m__list.p_ObjectEnumerator();
							while(t_2.p_HasNext()){
								var t_umap2=t_2.p_NextObject();
								if(t_umap2.m_shareid==t_shareid){
									this.p_RemoveDownloadMap(t_umap2);
									c_UploadedMap.m__list.p_Remove3(t_umap2);
									break;
								}
							}
							Notify("Map unshared successfully.");
						}
					}else{
						if(t_1==this.m_listuploads_get_req){
							print("Http listuploads GET complete!");
							var t_y=0;
							var t_respParts=t_resp.split("|");
							if(t_respParts.length==0){
								Notify("There are no maps to view yet. Please upload your own maps or get a friend to upload and share one of their own.");
								h5.EnableGadget("browseUploadsButton");
							}else{
								var t_3=t_respParts;
								var t_4=0;
								while(t_4<t_3.length){
									var t_mapData=t_3[t_4];
									t_4=t_4+1;
									var t_mapDataParts=t_mapData.split(",");
									var t_id2=t_mapDataParts[0];
									var t_name=t_mapDataParts[1];
									var t_url=t_mapDataParts[2];
									var t_owner=t_mapDataParts[3];
									var t_ownerName=t_mapDataParts[4];
									var t_shareid2=t_mapDataParts[5];
									var t_borrower=t_mapDataParts[6];
									if(t_owner==this.m_userId && t_ownerName!="you"){
										continue;
									}
									var t_umap3=c_UploadedMap.m_FindFromId(t_id2);
									if(t_umap3!=null){
										continue;
									}
									t_umap3=c_UploadedMap.m_new.call(new c_UploadedMap,t_id2,t_name,t_url,t_owner,t_ownerName);
									t_umap3.m_shareid=t_shareid2;
									t_umap3.m_borrower=t_borrower;
									t_umap3.m_y=200+t_y;
									t_y+=27;
								}
								this.p_ShowUploadedGrid();
								this.m_usernames_get_req=c_HttpRequest.m_new.call(new c_HttpRequest,"POST",this.m_fullUrl,(this));
								this.m_usernames_get_req.p_Send2("action=getallusers","application/x-www-form-urlencoded","utf8");
							}
						}else{
							if(t_1==this.m_usernames_get_req){
								print("Http usernames GET complete!");
								if(c_UploadedMap.m__list!=null){
									var t_respData=t_resp.split("|");
									var t_cnt=1;
									var t_5=t_respData;
									var t_6=0;
									while(t_6<t_5.length){
										var t_userData=t_5[t_6];
										t_6=t_6+1;
										var t_userParts=t_userData.split("&");
										var t_id3="";
										var t_username="";
										var t_7=t_userParts;
										var t_8=0;
										while(t_8<t_7.length){
											var t_keyVal=t_7[t_8];
											t_8=t_8+1;
											var t_key=t_keyVal.split("=")[0];
											var t_val=t_keyVal.split("=")[1];
											if(t_key=="id"){
												t_id3=t_val;
											}
											if(t_key=="username"){
												t_username=t_val;
											}
										}
										if(t_id3==this.m_userId){
											continue;
										}
										var t_user=c_User.m_new.call(new c_User,t_id3,t_username,t_cnt);
										t_cnt+=1;
									}
									this.p_ShowUsers();
								}
								this.m_usernames_get_req=null;
								h5.EnableGadget("browseUploadsButton");
							}else{
								if(t_1==this.m_upload_post_req){
									print("Http upload POST complete!");
									if((t_resp.indexOf("id=")!=-1) && (t_resp.indexOf("name=")!=-1)){
										var t_parts=t_resp.split("&");
										var t_parts2=t_parts[1].split("=");
										Notify("Upload complete. Named: "+t_parts2[1]);
									}else{
										Notify("Error: upload failed. Try again, or contact admin. Response: "+t_resp);
									}
								}else{
									if(t_1==this.m_register_post_req){
										print("Http register POST complete!");
										if(string_startswith(t_resp,"id=")){
											this.m_userId=string_trim(t_resp.split("=")[1]);
											if(this.m_userId!="" && parseInt((this.m_userId),10)>0){
												this.m_userName=h5.GadgetValue("loginNameTextfield");
												bb_app_SaveState("user="+h5.GadgetValue("loginNameTextfield")+"&pass="+h5.GadgetValue("loginPasswordTextfield")+"&id="+this.m_userId);
												this.p_LoginEnd();
												Notify("Registration complete. "+t_resp);
											}
										}else{
											Notify("Cannot register at this time. "+t_resp);
										}
										
		
								// Steve 
								
											if(t_1==this.m_changepassword_post_req){
													
				
											print("Http change password POST complete!");
																			
										if(string_startswith(t_resp,"id=")){
										
/*
										this.m_userId=string_trim(t_resp.split("=")[1]);
											if(this.m_userId!="" && parseInt((this.m_userId),10)>0){
												this.m_userName=h5.GadgetValue("loginNameTextfield");
												bb_app_SaveState("user="+h5.GadgetValue("loginNameTextfield")+"&pass="+h5.GadgetValue("loginPasswordTextfield")+"&id="+this.m_userId);
												this.p_LoginEnd();
*/
												Notify("Password change complete. Check your email!"+t_resp);
											}
										
										
										else
										{
											Notify("Cannot change password at this time. "+t_resp);
										}
										
										}
										
															

										// end
										
										
										
									}else{
										if(t_1==this.m_login_get_req){
											print("Http login GET complete! ");
											if((t_resp.indexOf("&")!=-1) && (t_resp.indexOf("=")!=-1) && (t_resp.indexOf("email")!=-1) && (t_resp.indexOf("password")!=-1)){
												var t_respParts2=string_trim(t_resp).split("&");
												var t_pass="";
												for(var t_i=0;t_i<t_respParts2.length;t_i=t_i+1){
													var t_part=t_respParts2[t_i];
													var t_keyValue=t_part.split("=");
													if(t_keyValue[0]=="id"){
														this.m_userId=string_trim(t_keyValue[1]);
													}
													if(t_keyValue[0]=="password"){
														t_pass=t_keyValue[1];
														// console.log(t_pass); // Steve: checking that plain text of unhashed password from PHP really is correct
													}
												}
												if(this.m_userId!="" && parseInt((this.m_userId),10)>0){
													if(t_pass!=""){
														if(t_pass==h5.GadgetValue("loginPasswordTextfield")){ // Steve: PASSWORD CHECKED HERE!
															bb_app_SaveState("user="+h5.GadgetValue("loginNameTextfield")+"&pass="+h5.GadgetValue("loginPasswordTextfield")+"&id="+this.m_userId);
															this.m_userName=h5.GadgetValue("loginNameTextfield");
															this.p_LoginEnd();
														}else{
															Notify("Login details not recognised. Have you registered? (1)");
														}
													}else{
														Notify("Login details not recognised. Have you registered? (2)\n");
													}
												}else{
													Notify("Login details not recognised. Have you registered? (3)");
												}
											}else{
												Notify("Login details not recognised. Have you registered? (4) \n");
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}else{
		h5.EnableGadget("browseUploadsButton");
		var t_22=t_req;
		if(t_22==this.m_download_get_req){
			Notify("Couldn't fetch requested map from server.\nStatus: "+String(t_req.Status())+"\n"+t_resp);
		}else{
			Notify("An unknown error occured.\nStatus: "+String(t_req.Status())+"\n"+t_resp);
		}
	}
	this.m_listuploads_get_req=null;
	this.m_upload_post_req=null;
	this.m_register_post_req=null;
	this.m_changepassword_post_req=null; // Steve add
	this.m_login_get_req=null;
	this.m_download_get_req=null;
	this.m_unshare_post_req=null;
}
var bb_app__app=null;
function c_GameDelegate(){
	BBGameDelegate.call(this);
	this.m__graphics=null;
	this.m__audio=null;
	this.m__input=null;
}
c_GameDelegate.prototype=extend_class(BBGameDelegate);
c_GameDelegate.m_new=function(){
	return this;
}
c_GameDelegate.prototype.StartGame=function(){
	this.m__graphics=(new gxtkGraphics);
	bb_graphics_SetGraphicsDevice(this.m__graphics);
	bb_graphics_SetFont(null,32);
	this.m__audio=(new gxtkAudio);
	bb_audio_SetAudioDevice(this.m__audio);
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	bb_input_SetInputDevice(this.m__input);
	bb_app__app.p_OnCreate();
}
c_GameDelegate.prototype.SuspendGame=function(){
	bb_app__app.p_OnSuspend();
	this.m__audio.Suspend();
}
c_GameDelegate.prototype.ResumeGame=function(){
	this.m__audio.Resume();
	bb_app__app.p_OnResume();
}
c_GameDelegate.prototype.UpdateGame=function(){
	this.m__input.p_BeginUpdate();
	bb_app__app.p_OnUpdate();
	this.m__input.p_EndUpdate();
}
c_GameDelegate.prototype.RenderGame=function(){
	var t_mode=this.m__graphics.BeginRender();
	if((t_mode)!=0){
		bb_graphics_BeginRender();
	}
	if(t_mode==2){
		bb_app__app.p_OnLoading();
	}else{
		bb_app__app.p_OnRender();
	}
	if((t_mode)!=0){
		bb_graphics_EndRender();
	}
	this.m__graphics.EndRender();
}
c_GameDelegate.prototype.KeyEvent=function(t_event,t_data){
	this.m__input.p_KeyEvent(t_event,t_data);
	if(t_event!=1){
		return;
	}
	var t_1=t_data;
	if(t_1==432){
		bb_app__app.p_OnClose();
	}else{
		if(t_1==416){
			bb_app__app.p_OnBack();
		}
	}
}
c_GameDelegate.prototype.MouseEvent=function(t_event,t_data,t_x,t_y){
	this.m__input.p_MouseEvent(t_event,t_data,t_x,t_y);
}
c_GameDelegate.prototype.TouchEvent=function(t_event,t_data,t_x,t_y){
	this.m__input.p_TouchEvent(t_event,t_data,t_x,t_y);
}
c_GameDelegate.prototype.MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	this.m__input.p_MotionEvent(t_event,t_data,t_x,t_y,t_z);
}
c_GameDelegate.prototype.DiscardGraphics=function(){
	this.m__graphics.DiscardGraphics();
}
var bb_app__delegate=null;
var bb_app__game=null;
function bbMain(){
	c_MindMapApp.m_new.call(new c_MindMapApp);
	return 1;
}
var bb_graphics_device=null;
function bb_graphics_SetGraphicsDevice(t_dev){
	bb_graphics_device=t_dev;
	return 0;
}
function c_Image(){
	Object.call(this);
	this.m_surface=null;
	this.m_width=0;
	this.m_height=0;
	this.m_frames=[];
	this.m_flags=0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_source=null;
}
c_Image.m_DefaultFlags=0;
c_Image.m_new=function(){
	return this;
}
c_Image.prototype.p_SetHandle=function(t_tx,t_ty){
	this.m_tx=t_tx;
	this.m_ty=t_ty;
	this.m_flags=this.m_flags&-2;
	return 0;
}
c_Image.prototype.p_ApplyFlags=function(t_iflags){
	this.m_flags=t_iflags;
	if((this.m_flags&2)!=0){
		var t_=this.m_frames;
		var t_2=0;
		while(t_2<t_.length){
			var t_f=t_[t_2];
			t_2=t_2+1;
			t_f.m_x+=1;
		}
		this.m_width-=2;
	}
	if((this.m_flags&4)!=0){
		var t_3=this.m_frames;
		var t_4=0;
		while(t_4<t_3.length){
			var t_f2=t_3[t_4];
			t_4=t_4+1;
			t_f2.m_y+=1;
		}
		this.m_height-=2;
	}
	if((this.m_flags&1)!=0){
		this.p_SetHandle((this.m_width)/2.0,(this.m_height)/2.0);
	}
	if(this.m_frames.length==1 && this.m_frames[0].m_x==0 && this.m_frames[0].m_y==0 && this.m_width==this.m_surface.Width() && this.m_height==this.m_surface.Height()){
		this.m_flags|=65536;
	}
	return 0;
}
c_Image.prototype.p_Init=function(t_surf,t_nframes,t_iflags){
	this.m_surface=t_surf;
	this.m_width=((this.m_surface.Width()/t_nframes)|0);
	this.m_height=this.m_surface.Height();
	this.m_frames=new_object_array(t_nframes);
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_i*this.m_width,0);
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
c_Image.prototype.p_Grab=function(t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_source){
	this.m_source=t_source;
	this.m_surface=t_source.m_surface;
	this.m_width=t_iwidth;
	this.m_height=t_iheight;
	this.m_frames=new_object_array(t_nframes);
	var t_ix=t_x;
	var t_iy=t_y;
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		if(t_ix+this.m_width>t_source.m_width){
			t_ix=0;
			t_iy+=this.m_height;
		}
		if(t_ix+this.m_width>t_source.m_width || t_iy+this.m_height>t_source.m_height){
			error("Image frame outside surface");
		}
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_ix+t_source.m_frames[0].m_x,t_iy+t_source.m_frames[0].m_y);
		t_ix+=this.m_width;
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
c_Image.prototype.p_GrabImage=function(t_x,t_y,t_width,t_height,t_frames,t_flags){
	if(this.m_frames.length!=1){
		return null;
	}
	return (c_Image.m_new.call(new c_Image)).p_Grab(t_x,t_y,t_width,t_height,t_frames,t_flags,this);
}
c_Image.prototype.p_WritePixels=function(t_pixels,t_x,t_y,t_width,t_height,t_offset,t_pitch){
	if(!((t_pitch)!=0)){
		t_pitch=t_width;
	}
	bb_graphics_device.WritePixels2(this.m_surface,t_pixels,t_x,t_y,t_width,t_height,t_offset,t_pitch);
	return 0;
}
c_Image.prototype.p_Discard=function(){
	if(((this.m_surface)!=null) && !((this.m_source)!=null)){
		this.m_surface.Discard();
		this.m_surface=null;
	}
	return 0;
}
c_Image.prototype.p_Width=function(){
	return this.m_width;
}
c_Image.prototype.p_Height=function(){
	return this.m_height;
}
function c_GraphicsContext(){
	Object.call(this);
	this.m_defaultFont=null;
	this.m_font=null;
	this.m_firstChar=0;
	this.m_matrixSp=0;
	this.m_ix=1.0;
	this.m_iy=.0;
	this.m_jx=.0;
	this.m_jy=1.0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_tformed=0;
	this.m_matDirty=0;
	this.m_color_r=.0;
	this.m_color_g=.0;
	this.m_color_b=.0;
	this.m_alpha=.0;
	this.m_blend=0;
	this.m_scissor_x=.0;
	this.m_scissor_y=.0;
	this.m_scissor_width=.0;
	this.m_scissor_height=.0;
	this.m_matrixStack=new_number_array(192);
}
c_GraphicsContext.m_new=function(){
	return this;
}
c_GraphicsContext.prototype.p_Validate=function(){
	if((this.m_matDirty)!=0){
		bb_graphics_renderDevice.SetMatrix(bb_graphics_context.m_ix,bb_graphics_context.m_iy,bb_graphics_context.m_jx,bb_graphics_context.m_jy,bb_graphics_context.m_tx,bb_graphics_context.m_ty);
		this.m_matDirty=0;
	}
	return 0;
}
var bb_graphics_context=null;
function bb_data_FixDataPath(t_path){
	var t_i=t_path.indexOf(":/",0);
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		return t_path;
	}
	if(string_startswith(t_path,"./") || string_startswith(t_path,"/")){
		return t_path;
	}
	return "monkey://data/"+t_path;
}
function c_Frame(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
}
c_Frame.m_new=function(t_x,t_y){
	this.m_x=t_x;
	this.m_y=t_y;
	return this;
}
c_Frame.m_new2=function(){
	return this;
}
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
	}
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	var t_atlas=bb_graphics_LoadImage(t_path,1,0);
	if((t_atlas)!=null){
		return t_atlas.p_GrabImage(0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags);
	}
	return null;
}
function bb_graphics_SetFont(t_font,t_firstChar){
	if(!((t_font)!=null)){
		if(!((bb_graphics_context.m_defaultFont)!=null)){
			bb_graphics_context.m_defaultFont=bb_graphics_LoadImage("mojo_font.png",96,2);
		}
		t_font=bb_graphics_context.m_defaultFont;
		t_firstChar=32;
	}
	bb_graphics_context.m_font=t_font;
	bb_graphics_context.m_firstChar=t_firstChar;
	return 0;
}
var bb_audio_device=null;
function bb_audio_SetAudioDevice(t_dev){
	bb_audio_device=t_dev;
	return 0;
}
function c_InputDevice(){
	Object.call(this);
	this.m__joyStates=new_object_array(4);
	this.m__keyDown=new_bool_array(512);
	this.m__keyHitPut=0;
	this.m__keyHitQueue=new_number_array(33);
	this.m__keyHit=new_number_array(512);
	this.m__charGet=0;
	this.m__charPut=0;
	this.m__charQueue=new_number_array(32);
	this.m__mouseX=.0;
	this.m__mouseY=.0;
	this.m__touchX=new_number_array(32);
	this.m__touchY=new_number_array(32);
	this.m__accelX=.0;
	this.m__accelY=.0;
	this.m__accelZ=.0;
}
c_InputDevice.m_new=function(){
	for(var t_i=0;t_i<4;t_i=t_i+1){
		this.m__joyStates[t_i]=c_JoyState.m_new.call(new c_JoyState);
	}
	return this;
}
c_InputDevice.prototype.p_PutKeyHit=function(t_key){
	if(this.m__keyHitPut==this.m__keyHitQueue.length){
		return;
	}
	this.m__keyHit[t_key]+=1;
	this.m__keyHitQueue[this.m__keyHitPut]=t_key;
	this.m__keyHitPut+=1;
}
c_InputDevice.prototype.p_BeginUpdate=function(){
	for(var t_i=0;t_i<4;t_i=t_i+1){
		var t_state=this.m__joyStates[t_i];
		if(!BBGame.Game().PollJoystick(t_i,t_state.m_joyx,t_state.m_joyy,t_state.m_joyz,t_state.m_buttons)){
			break;
		}
		for(var t_j=0;t_j<32;t_j=t_j+1){
			var t_key=256+t_i*32+t_j;
			if(t_state.m_buttons[t_j]){
				if(!this.m__keyDown[t_key]){
					this.m__keyDown[t_key]=true;
					this.p_PutKeyHit(t_key);
				}
			}else{
				this.m__keyDown[t_key]=false;
			}
		}
	}
}
c_InputDevice.prototype.p_EndUpdate=function(){
	for(var t_i=0;t_i<this.m__keyHitPut;t_i=t_i+1){
		this.m__keyHit[this.m__keyHitQueue[t_i]]=0;
	}
	this.m__keyHitPut=0;
	this.m__charGet=0;
	this.m__charPut=0;
}
c_InputDevice.prototype.p_KeyEvent=function(t_event,t_data){
	var t_1=t_event;
	if(t_1==1){
		if(!this.m__keyDown[t_data]){
			this.m__keyDown[t_data]=true;
			this.p_PutKeyHit(t_data);
			if(t_data==1){
				this.m__keyDown[384]=true;
				this.p_PutKeyHit(384);
			}else{
				if(t_data==384){
					this.m__keyDown[1]=true;
					this.p_PutKeyHit(1);
				}
			}
		}
	}else{
		if(t_1==2){
			if(this.m__keyDown[t_data]){
				this.m__keyDown[t_data]=false;
				if(t_data==1){
					this.m__keyDown[384]=false;
				}else{
					if(t_data==384){
						this.m__keyDown[1]=false;
					}
				}
			}
		}else{
			if(t_1==3){
				if(this.m__charPut<this.m__charQueue.length){
					this.m__charQueue[this.m__charPut]=t_data;
					this.m__charPut+=1;
				}
			}
		}
	}
}
c_InputDevice.prototype.p_MouseEvent=function(t_event,t_data,t_x,t_y){
	var t_2=t_event;
	if(t_2==4){
		this.p_KeyEvent(1,1+t_data);
	}else{
		if(t_2==5){
			this.p_KeyEvent(2,1+t_data);
			return;
		}else{
			if(t_2==6){
			}else{
				return;
			}
		}
	}
	this.m__mouseX=t_x;
	this.m__mouseY=t_y;
	this.m__touchX[0]=t_x;
	this.m__touchY[0]=t_y;
}
c_InputDevice.prototype.p_TouchEvent=function(t_event,t_data,t_x,t_y){
	var t_3=t_event;
	if(t_3==7){
		this.p_KeyEvent(1,384+t_data);
	}else{
		if(t_3==8){
			this.p_KeyEvent(2,384+t_data);
			return;
		}else{
			if(t_3==9){
			}else{
				return;
			}
		}
	}
	this.m__touchX[t_data]=t_x;
	this.m__touchY[t_data]=t_y;
	if(t_data==0){
		this.m__mouseX=t_x;
		this.m__mouseY=t_y;
	}
}
c_InputDevice.prototype.p_MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	var t_4=t_event;
	if(t_4==10){
	}else{
		return;
	}
	this.m__accelX=t_x;
	this.m__accelY=t_y;
	this.m__accelZ=t_z;
}
c_InputDevice.prototype.p_MouseX=function(){
	return this.m__mouseX;
}
c_InputDevice.prototype.p_MouseY=function(){
	return this.m__mouseY;
}
c_InputDevice.prototype.p_KeyDown=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyDown[t_key];
	}
	return false;
}
c_InputDevice.prototype.p_KeyHit=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyHit[t_key];
	}
	return 0;
}
function c_JoyState(){
	Object.call(this);
	this.m_joyx=new_number_array(2);
	this.m_joyy=new_number_array(2);
	this.m_joyz=new_number_array(2);
	this.m_buttons=new_bool_array(32);
}
c_JoyState.m_new=function(){
	return this;
}
var bb_input_device=null;
function bb_input_SetInputDevice(t_dev){
	bb_input_device=t_dev;
	return 0;
}
var bb_graphics_renderDevice=null;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	bb_graphics_context.m_ix=t_ix;
	bb_graphics_context.m_iy=t_iy;
	bb_graphics_context.m_jx=t_jx;
	bb_graphics_context.m_jy=t_jy;
	bb_graphics_context.m_tx=t_tx;
	bb_graphics_context.m_ty=t_ty;
	bb_graphics_context.m_tformed=((t_ix!=1.0 || t_iy!=0.0 || t_jx!=0.0 || t_jy!=1.0 || t_tx!=0.0 || t_ty!=0.0)?1:0);
	bb_graphics_context.m_matDirty=1;
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	bb_graphics_SetMatrix(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	bb_graphics_context.m_color_r=t_r;
	bb_graphics_context.m_color_g=t_g;
	bb_graphics_context.m_color_b=t_b;
	bb_graphics_renderDevice.SetColor(t_r,t_g,t_b);
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	bb_graphics_context.m_alpha=t_alpha;
	bb_graphics_renderDevice.SetAlpha(t_alpha);
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	bb_graphics_context.m_blend=t_blend;
	bb_graphics_renderDevice.SetBlend(t_blend);
	return 0;
}
function bb_graphics_DeviceWidth(){
	return bb_graphics_device.Width();
}
function bb_graphics_DeviceHeight(){
	return bb_graphics_device.Height();
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	bb_graphics_context.m_scissor_x=t_x;
	bb_graphics_context.m_scissor_y=t_y;
	bb_graphics_context.m_scissor_width=t_width;
	bb_graphics_context.m_scissor_height=t_height;
	bb_graphics_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	return 0;
}
function bb_graphics_BeginRender(){
	bb_graphics_renderDevice=bb_graphics_device;
	bb_graphics_context.m_matrixSp=0;
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	bb_graphics_SetColor(255.0,255.0,255.0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_SetBlend(0);
	bb_graphics_SetScissor(0.0,0.0,(bb_graphics_DeviceWidth()),(bb_graphics_DeviceHeight()));
	return 0;
}
function bb_graphics_EndRender(){
	bb_graphics_renderDevice=null;
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
function bb_app_EndApp(){
	error("");
	return 0;
}
var bb_app__updateRate=0;
function bb_app_SetUpdateRate(t_hertz){
	bb_app__updateRate=t_hertz;
	bb_app__game.SetUpdateRate(t_hertz);
	return 0;
}
function bb_app_LoadState(){
	return bb_app__game.LoadState();
}
function c_JoffColor(){
	Object.call(this);
}
c_JoffColor.m_red=null;
c_JoffColor.m_green=null;
c_JoffColor.m_cyan=null;
c_JoffColor.m_purple=null;
c_JoffColor.m_mustard=null;
c_JoffColor.m_navy=null;
c_JoffColor.m_mint=null;
c_JoffColor.m_grey=null;
c_JoffColor.m_black=null;
function c_UIColor(){
	Object.call(this);
	this.m_r=255.0;
	this.m_g=255.0;
	this.m_b=255.0;
	this.m_a=1.0;
}
c_UIColor.m_new=function(t_r,t_g,t_b,t_alpha){
	this.m_r=t_r;
	this.m_g=t_g;
	this.m_b=t_b;
	this.m_a=this.m_a;
	return this;
}
c_UIColor.m_HexToDecimal=function(t_token){
	var t_val=0;
	var t_hex=t_token.toUpperCase();
	for(var t_i=0;t_i<t_hex.length;t_i=t_i+1){
		t_val*=16;
		if(t_hex.charCodeAt(t_i)>=48 && t_hex.charCodeAt(t_i)<=57){
			t_val+=t_hex.charCodeAt(t_i)-48;
		}else{
			t_val+=t_hex.charCodeAt(t_i)-55;
		}
	}
	return t_val;
}
c_UIColor.m_new2=function(t_col){
	if(t_col.slice(0,1)=="#"){
		t_col=t_col.slice(1);
	}
	if(t_col.slice(0,1)=="$"){
		t_col=t_col.slice(1);
	}
	this.m_r=(c_UIColor.m_HexToDecimal(t_col.slice(0,2)));
	this.m_g=(c_UIColor.m_HexToDecimal(t_col.slice(2,4)));
	this.m_b=(c_UIColor.m_HexToDecimal(t_col.slice(4,6)));
	return this;
}
c_UIColor.m_new3=function(){
	return this;
}
c_UIColor.m_black=null;
c_UIColor.m_white=null;
c_UIColor.m_DecToHex=function(t_v){
	var t_n="";
	for(var t_i=0;t_i<8;t_i=t_i+1){
		t_n=t_n+String.fromCharCode("0123456789ABCDEF".charCodeAt(t_v>>28-t_i*4&15));
	}
	return t_n.slice(-6);
}
c_UIColor.prototype.p_ToHex=function(){
	var t_v=((this.m_r)|0)<<16|((this.m_g)|0)<<8|((this.m_b)|0);
	return c_UIColor.m_DecToHex(t_v);
}
function c_UIView(){
	Object.call(this);
	this.m_frame=null;
	this.m_targetFrame=null;
	this.m_transform=[];
	this.m_superview=null;
	this.m_subviews=[];
	this.m_name="";
	this.m_controlType="view";
	this.m_outlineColor=null;
	this.m_clip=false;
	this.m_draggable=false;
	this.m_lockHorizontal=true;
	this.m_lockVertical=true;
	this.m_interactive=false;
	this.m_drawOutline=false;
	this.m_dottedOutline=false;
	this.m_visible=true;
	this.m_limitDragToRect=true;
	this.m_limitClickToRect=true;
	this.m_targetSpeed=0.3;
	this.m_fluidLayout=false;
	this.m_dragging=false;
	this.m_localMouse=[-1,-1,-1];
	this.m_alpha=1.0;
	this.m_startDragPosition=new_number_array(2);
	this.m_updateSiblingsVertical=false;
	this.m_prevScissor=new_number_array(4);
	this.m_rotation=.0;
	this.m_xscale=1.0;
	this.m_yscale=1.0;
	this.m_cacheView=false;
	this.m_cachedImage=null;
	this.m_cacheAlpha=false;
}
c_UIView.m_root=null;
c_UIView.m_new=function(){
	return this;
}
c_UIView.prototype.p_RemoveSubview=function(t_view){
	if(t_view.m_superview==null){
		return;
	}
	if(t_view.m_superview.m_subviews.length==0){
		return;
	}
	var t_viewList=c_List.m_new2.call(new c_List,t_view.m_superview.m_subviews);
	t_viewList.p_RemoveFirst2(t_view);
	t_view.m_superview.m_subviews=t_viewList.p_ToArray();
	t_view.m_superview=null;
}
c_UIView.prototype.p_AddSubview=function(t_view){
	this.p_RemoveSubview(t_view);
	this.m_subviews=resize_object_array(this.m_subviews,this.m_subviews.length+1);
	this.m_subviews[this.m_subviews.length-1]=t_view;
	t_view.m_superview=this;
}
c_UIView.m_new2=function(t_frame){
	this.m_frame=t_frame;
	this.m_targetFrame=c_Rect.m_new.call(new c_Rect,t_frame.m_x,t_frame.m_y,t_frame.m_width,t_frame.m_height);
	this.m_transform=bb_graphics_GetMatrix();
	if(c_UIView.m_root==null){
		c_UIView.m_root=c_UIView.m_new.call(new c_UIView);
		c_UIView.m_root.m_transform=[1.0,0.0,0.0,1.0,0.0,0.0];
		c_UIView.m_root.m_frame=c_Rect.m_new.call(new c_Rect,0.0,0.0,0.0,0.0);
	}
	c_UIView.m_root.p_AddSubview(this);
	return this;
}
c_UIView.m_new3=function(t_x,t_y,t_w,t_h){
	this.m_frame=c_Rect.m_new.call(new c_Rect,t_x,t_y,t_w,t_h);
	this.m_targetFrame=c_Rect.m_new.call(new c_Rect,t_x,t_y,t_w,t_h);
	this.m_transform=bb_graphics_GetMatrix();
	if(c_UIView.m_root==null){
		c_UIView.m_root=c_UIView.m_new.call(new c_UIView);
		c_UIView.m_root.m_transform=[1.0,0.0,0.0,1.0,0.0,0.0];
		c_UIView.m_root.m_frame=c_Rect.m_new.call(new c_Rect,0.0,0.0,3000.0,3000.0);
		c_UIView.m_root.m_name="_root";
		c_UIView.m_root.m_controlType="root view";
	}
	this.m_outlineColor=c_UIColor.m_black;
	c_UIView.m_root.p_AddSubview(this);
	return this;
}
c_UIView.prototype.p_Position=function(t_x,t_y){
	this.m_frame.m_x=t_x;
	this.m_frame.m_y=t_y;
	this.m_targetFrame.m_x=t_x;
	this.m_targetFrame.m_y=t_y;
}
c_UIView.prototype.p_Unlock=function(){
	this.m_lockHorizontal=false;
	this.m_lockVertical=false;
}
c_UIView.prototype.p_Move=function(t_x,t_y){
	this.m_frame.m_x+=t_x;
	this.m_frame.m_y+=t_y;
	this.m_targetFrame.m_x+=t_x;
	this.m_targetFrame.m_y+=t_y;
}
c_UIView.prototype.p_Update=function(){
	if(this.m_fluidLayout){
		var t_x=0.0;
		var t_y=0.0;
		var t_maxHeight=0.0;
		for(var t_i=0;t_i<this.m_subviews.length;t_i=t_i+1){
			if(t_x+this.m_subviews[t_i].m_frame.m_width>this.m_frame.m_width){
				t_x=0.0;
				t_y+=t_maxHeight;
				t_maxHeight=0.0;
			}
			if(!this.m_subviews[t_i].m_dragging){
				if(this.m_subviews[t_i].m_targetFrame==null){
					this.m_subviews[t_i].m_targetFrame=c_Rect.m_new.call(new c_Rect,t_x,t_y,this.m_subviews[t_i].m_frame.m_width,this.m_subviews[t_i].m_frame.m_height);
				}
			}
			if(this.m_subviews[t_i].m_frame.m_height>t_maxHeight){
				t_maxHeight=this.m_subviews[t_i].m_frame.m_height;
			}
			t_x+=this.m_subviews[t_i].m_frame.m_width;
		}
	}
	if(this.m_targetFrame!=null){
		var t_eps=0.1;
		if(bb_math_Abs2(this.m_targetFrame.m_x-this.m_frame.m_x)>t_eps || bb_math_Abs2(this.m_targetFrame.m_y-this.m_frame.m_y)>t_eps){
			this.m_frame.m_x+=(this.m_targetFrame.m_x-this.m_frame.m_x)*this.m_targetSpeed;
			this.m_frame.m_y+=(this.m_targetFrame.m_y-this.m_frame.m_y)*this.m_targetSpeed;
			c_UIEvent.m_eventStack.p_Push4(c_UIEvent.m_new2.call(new c_UIEvent,this,10,null));
		}
	}
	if(!((bb_input_MouseDown(0))!=0)){
		this.m_dragging=false;
	}
	for(var t_i2=0;t_i2<this.m_subviews.length;t_i2=t_i2+1){
		this.m_subviews[t_i2].p_Update();
	}
}
c_UIView.m_UpdateAll=function(){
	c_UIView.m_root.p_Update();
}
c_UIView.prototype.p_ConvertPointToView=function(t_x,t_y){
	bb_graphics_PushMatrix();
	bb_graphics_Transform(this.m_transform[0],this.m_transform[1],this.m_transform[2],this.m_transform[3],this.m_transform[4],this.m_transform[5]);
	var t_coords=bb_graphics_InvTransform([t_x,t_y]);
	bb_graphics_PopMatrix();
	return t_coords;
}
c_UIView.prototype.p_ConvertPointToView2=function(t_point){
	return this.p_ConvertPointToView(t_point.m_x,t_point.m_y);
}
c_UIView.prototype.p_PointInside=function(t_x,t_y,t_rect){
	var t_p=this.p_ConvertPointToView(t_x,t_y);
	if(!this.m_limitClickToRect){
		return t_p;
	}
	if(t_rect==null){
		if(t_p[1]<0.0){
			return [];
		}
		if(t_p[1]>this.m_frame.m_height){
			return [];
		}
		if(t_p[0]<0.0){
			return [];
		}
		if(t_p[0]>this.m_frame.m_width){
			return [];
		}
	}else{
		if(t_p[1]<t_rect.m_y*(1.0/this.m_transform[3])){
			return [];
		}
		if(t_p[1]>(t_rect.m_y+t_rect.m_height)*(1.0/this.m_transform[3])){
			return [];
		}
		if(t_p[0]<t_rect.m_x*(1.0/this.m_transform[0])){
			return [];
		}
		if(t_p[0]>(t_rect.m_x+t_rect.m_width)*(1.0/this.m_transform[0])){
			return [];
		}
	}
	return t_p;
}
c_UIView.prototype.p_PointInside2=function(t_x,t_y){
	return this.p_PointInside(t_x,t_y,null);
}
c_UIView.prototype.p_HitTest=function(t_x,t_y){
	var t_mousePos=this.p_PointInside2(t_x,t_y);
	if(t_mousePos.length==0){
		if(this.m_clip){
			return null;
		}
	}else{
		this.m_localMouse[0]=((t_mousePos[0])|0);
		this.m_localMouse[1]=((t_mousePos[1])|0);
		for(var t_i=this.m_subviews.length-1;t_i>=0;t_i=t_i+-1){
			var t_view=this.m_subviews[t_i].p_HitTest(t_x,t_y);
			if(t_view!=null){
				return t_view;
			}
		}
	}
	if(this.m_alpha<0.0001){
		return null;
	}
	if(t_mousePos.length>0 && this.m_interactive){
		return this;
	}
	return null;
}
c_UIView.prototype.p_HitTest2=function(t_point){
	return this.p_HitTest(t_point.m_x,t_point.m_y);
}
c_UIView.m_HitTestAll=function(t_x,t_y){
	return c_UIView.m_root.p_HitTest(t_x,t_y);
}
c_UIView.m_HitTestAll2=function(t_point){
	return c_UIView.m_HitTestAll(t_point.m_x,t_point.m_y);
}
c_UIView.prototype.p_PointInsideDrag=function(t_x,t_y,t_rect){
	var t_p=this.p_ConvertPointToView(t_x,t_y);
	if(!this.m_limitDragToRect){
		return t_p;
	}
	if(t_rect==null){
		if(t_p[1]<0.0){
			return [];
		}
		if(t_p[1]>this.m_frame.m_height){
			return [];
		}
		if(t_p[0]<0.0){
			return [];
		}
		if(t_p[0]>this.m_frame.m_width){
			return [];
		}
	}else{
		if(t_p[1]<t_rect.m_y*(1.0/this.m_transform[3])){
			return [];
		}
		if(t_p[1]>(t_rect.m_y+t_rect.m_height)*(1.0/this.m_transform[3])){
			return [];
		}
		if(t_p[0]<t_rect.m_x*(1.0/this.m_transform[0])){
			return [];
		}
		if(t_p[0]>(t_rect.m_x+t_rect.m_width)*(1.0/this.m_transform[0])){
			return [];
		}
	}
	return t_p;
}
c_UIView.prototype.p_PointInsideDrag2=function(t_x,t_y){
	return this.p_PointInsideDrag(t_x,t_y,null);
}
c_UIView.prototype.p_DragTest=function(t_x,t_y){
	this.m_localMouse[2]=-1;
	var t_mousePos=this.p_PointInsideDrag2(t_x,t_y);
	if(t_mousePos.length>0){
		this.m_localMouse[0]=((t_mousePos[0])|0);
		this.m_localMouse[1]=((t_mousePos[1])|0);
		if(t_mousePos.length>2){
			this.m_localMouse[2]=3;
		}
		for(var t_i=this.m_subviews.length-1;t_i>=0;t_i=t_i+-1){
			var t_view=this.m_subviews[t_i].p_DragTest(t_x,t_y);
			if(t_view!=null){
				return t_view;
			}
		}
	}
	if(this.m_alpha<0.0001){
		return null;
	}
	if(t_mousePos.length>0 && this.m_draggable){
		return this;
	}
	return null;
}
c_UIView.prototype.p_DragTest2=function(t_point){
	return this.p_DragTest(t_point.m_x,t_point.m_y);
}
c_UIView.m_DragTestAll=function(t_x,t_y){
	return c_UIView.m_root.p_DragTest(t_x,t_y);
}
c_UIView.m_DragTestAll2=function(t_point){
	return c_UIView.m_DragTestAll(t_point.m_x,t_point.m_y);
}
c_UIView.prototype.p_SendEvent=function(t_ev){
	var t_1=t_ev.m_event;
	if(t_1==8){
		print("Stop mouse drag");
		if(t_ev.m_sender==null){
			t_ev.m_sender=this;
		}
		this.m_dragging=false;
		if(this==c_UIView.m_root){
			c_UIEvent.m_eventStack.p_Push4(t_ev);
		}else{
			this.m_superview.p_SendEvent(t_ev);
		}
	}else{
		if(t_1==6){
			print("UIView: StartMouseDragEvent");
			if(this.m_draggable){
				if(t_ev.m_sender==null){
					print("StartMouseDrag");
					this.m_startDragPosition[0]=((this.m_frame.m_x)|0);
					this.m_startDragPosition[1]=((this.m_frame.m_y)|0);
					this.m_dragging=true;
				}
			}
			if(t_ev.m_sender==null){
				t_ev.m_sender=this;
			}
			if(this==c_UIView.m_root){
				c_UIEvent.m_eventStack.p_Push4(t_ev);
			}else{
				this.m_superview.p_SendEvent(t_ev);
			}
		}else{
			if(t_1==7){
				print("UIView: MouseDragEvent");
				if(this.m_draggable){
					if(t_ev.m_sender==null){
						if(!this.m_lockHorizontal){
						this.m_targetFrame.m_x=(this.m_startDragPosition[0])+((t_ev.m_x)-object_downcast((t_ev.m_extra),c_Point).m_x)*(1.0/this.m_transform[0]);
						//print("Steve value: "+this.m_targetFrame.m_x);
						}
						if(!this.m_lockVertical){
							this.m_targetFrame.m_y=(this.m_startDragPosition[1])+((t_ev.m_y)-object_downcast((t_ev.m_extra),c_Point).m_y)*(1.0/this.m_transform[3]);
						}
						
						
						if(this.m_updateSiblingsVertical && this.m_superview!=c_UIView.m_root){
							var t_siblings=this.m_superview.m_subviews;
							var t_selfIndex=-1;
							for(var t_i=0;t_i<t_siblings.length;t_i=t_i+1){
								if(t_siblings[t_i]==this){
									t_selfIndex=t_i;
									break;
								}
							}
							if(t_selfIndex!=-1){
								if(t_selfIndex>0 && (this.m_superview.m_localMouse[1])<t_siblings[t_selfIndex-1].m_frame.m_y+t_siblings[t_selfIndex-1].m_frame.m_height && (this.m_superview.m_localMouse[1])>t_siblings[t_selfIndex-1].m_frame.m_y){
									var t_tempView=t_siblings[t_selfIndex-1];
									t_siblings[t_selfIndex-1]=this;
									t_siblings[t_selfIndex]=t_tempView;
								}else{
									if(t_selfIndex<t_siblings.length-1){
										if((this.m_superview.m_localMouse[1])<t_siblings[t_selfIndex+1].m_frame.m_y+t_siblings[t_selfIndex+1].m_frame.m_height && (this.m_superview.m_localMouse[1])>t_siblings[t_selfIndex+1].m_frame.m_y){
											var t_tempView2=t_siblings[t_selfIndex+1];
											t_siblings[t_selfIndex+1]=this;
											t_siblings[t_selfIndex]=t_tempView2;
										}
									}
								}
							}
						} 
					}
				}
				if(t_ev.m_sender==null){
					t_ev.m_sender=this;
				}
				if(this==c_UIView.m_root){
					c_UIEvent.m_eventStack.p_Push4(t_ev);
				}else{
					this.m_superview.p_SendEvent(t_ev);
				}
			}else{
				if(t_1==20){
					print("Stop mouse drag2");
					this.m_dragging=false;
				}else{
					if(t_1==18){
						print("UIView: StartMouseDragEvent2");
						if(this.m_draggable){
							if(t_ev.m_sender==null){
								print("StartMouseDrag");
								this.m_startDragPosition[0]=((this.m_frame.m_x)|0);
								this.m_startDragPosition[1]=((this.m_frame.m_y)|0);
								this.m_dragging=true;
							}
						}
					}else{
						if(t_1==19){
							print("UIView: MouseDragEvent2");
							if(this.m_draggable){
								if(t_ev.m_sender==null){
									if(!this.m_lockHorizontal){
										this.m_targetFrame.m_x=(this.m_startDragPosition[0])+((t_ev.m_x)-object_downcast((t_ev.m_extra),c_Point).m_x)*(1.0/this.m_transform[0]);
									}
									if(!this.m_lockVertical){
										this.m_targetFrame.m_y=(this.m_startDragPosition[1])+((t_ev.m_y)-object_downcast((t_ev.m_extra),c_Point).m_y)*(1.0/this.m_transform[3]);
									}
								}
							}
						}else{
							if(t_ev.m_sender==null){
								t_ev.m_sender=this;
							}
							if(this==c_UIView.m_root){
								c_UIEvent.m_eventStack.p_Push4(t_ev);
							}else{
								this.m_superview.p_SendEvent(t_ev);
							}
						}
					}
				}
			}
		}
	}
}
c_UIView.m_pixels=[];
c_UIView.m_tempCol=[];
c_UIView.prototype.p_PreDrawCache=function(){
	print("make cache image");
	if(this.m_frame.m_width>(bb_graphics_DeviceWidth())){
		error("image too big to cache - turn off uiimage cache flag");
	}
	if(this.m_frame.m_height>(bb_graphics_DeviceHeight())){
		error("image too big to cache - turn off uiimage cache flag");
	}
	this.m_prevScissor=bb_graphics_GetScissor();
	bb_graphics_SetScissor(0.0,0.0,(bb_graphics_DeviceWidth()),(bb_graphics_DeviceHeight()));
	this.m_cachedImage=bb_graphics_CreateImage(((this.m_frame.m_width)|0),((this.m_frame.m_height)|0),1,c_Image.m_DefaultFlags);
	c_UIView.m_pixels=new_number_array(((this.m_frame.m_width*this.m_frame.m_height)|0));
	bb_graphics_ReadPixels(c_UIView.m_pixels,0,0,((this.m_frame.m_width)|0),((this.m_frame.m_height)|0),0,0);
	this.m_cachedImage.p_WritePixels(c_UIView.m_pixels,0,0,((this.m_frame.m_width)|0),((this.m_frame.m_height)|0),0,0);
	bb_graphics_GetColor2(c_UIView.m_tempCol);
	c_UIView.m_tempCol[3]=bb_graphics_GetAlpha();
	bb_graphics_SetAlpha(1.0);
	bb_graphics_SetColor(0.0,0.0,0.0);
	bb_graphics_DrawRect(0.0,0.0,this.m_frame.m_width,this.m_frame.m_height,false,true);
	bb_graphics_SetColor(255.0,255.0,255.0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_PushMatrix();
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
}
c_UIView.prototype.p_PostDrawCache=function(){
	bb_graphics_ReadPixels(c_UIView.m_pixels,0,0,((this.m_frame.m_width)|0),((this.m_frame.m_height)|0),0,0);
	if(this.m_cacheAlpha){
		bb_graphics_SetAlpha(1.0);
		bb_graphics_SetColor(255.0,255.0,255.0);
		bb_graphics_DrawRect(0.0,0.0,this.m_frame.m_width,this.m_frame.m_height,false,true);
		bb_graphics_SetColor(0.0,0.0,0.0);
	}
}
c_UIView.prototype.p_PostDrawCache2=function(){
	if(this.m_cacheAlpha){
		var t_alphaPixels=new_number_array(((this.m_frame.m_width*this.m_frame.m_height)|0));
		bb_graphics_ReadPixels(t_alphaPixels,0,0,((this.m_frame.m_width)|0),((this.m_frame.m_height)|0),0,0);
		for(var t_i=0;t_i<c_UIView.m_pixels.length;t_i=t_i+1){
			t_alphaPixels[t_i]&=255;
			t_alphaPixels[t_i]=255-t_alphaPixels[t_i]<<24;
			c_UIView.m_pixels[t_i]&=16777215;
			c_UIView.m_pixels[t_i]|=t_alphaPixels[t_i];
		}
	}
	bb_graphics_SetColor(255.0,255.0,255.0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_DrawImage(this.m_cachedImage,0.0,0.0,0);
	this.m_cachedImage.p_WritePixels(c_UIView.m_pixels,0,0,((this.m_frame.m_width)|0),((this.m_frame.m_height)|0),0,0);
	bb_graphics_SetAlpha(c_UIView.m_tempCol[3]);
	bb_graphics_SetColor(c_UIView.m_tempCol[0],c_UIView.m_tempCol[1],c_UIView.m_tempCol[2]);
	bb_graphics_PopMatrix();
	bb_graphics_SetScissor(this.m_prevScissor[0],this.m_prevScissor[1],this.m_prevScissor[2],this.m_prevScissor[3]);
	bb_graphics_DrawImage(this.m_cachedImage,0.0,0.0,0);
}
c_UIView.prototype.p_StoreTransform=function(t_rect){
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_rect.m_x,t_rect.m_y);
	bb_graphics_Rotate(this.m_rotation);
	bb_graphics_Scale(this.m_xscale,this.m_yscale);
	bb_graphics_GetMatrix2(this.m_transform);
	for(var t_i=0;t_i<this.m_subviews.length;t_i=t_i+1){
		this.m_subviews[t_i].p_StoreTransform(this.m_subviews[t_i].m_frame);
	}
	bb_graphics_PopMatrix();
}
c_UIView.prototype.p_Draw=function(t_rect,t_tint){
	if(!this.m_visible){
		return;
	}
	this.m_prevScissor=bb_graphics_GetScissor();
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_rect.m_x,t_rect.m_y);
	bb_graphics_Rotate(this.m_rotation);
	bb_graphics_Scale(this.m_xscale,this.m_yscale);
	bb_graphics_GetMatrix2(this.m_transform);
	if(this.m_clip){
		bb_graphics_SetScissor(this.m_transform[4],this.m_transform[5],t_rect.m_width,t_rect.m_height);
	}
	if(this.m_cacheView){
		if(this.m_cachedImage==null){
			this.p_PreDrawCache();
			for(var t_i=0;t_i<this.m_subviews.length;t_i=t_i+1){
				this.m_subviews[t_i].p_Draw(this.m_subviews[t_i].m_frame,t_tint);
			}
			this.p_PostDrawCache();
			if(this.m_cacheAlpha){
				for(var t_i2=0;t_i2<this.m_subviews.length;t_i2=t_i2+1){
					this.m_subviews[t_i2].p_Draw(this.m_subviews[t_i2].m_frame,false);
				}
			}
			this.p_PostDrawCache2();
		}else{
			bb_graphics_SetColor(255.0,255.0,255.0);
			bb_graphics_DrawImage(this.m_cachedImage,0.0,0.0,0);
		}
	}else{
		for(var t_i3=0;t_i3<this.m_subviews.length;t_i3=t_i3+1){
			this.m_subviews[t_i3].p_Draw(this.m_subviews[t_i3].m_frame,t_tint);
		}
	}
	if(this.m_drawOutline){
		bb_graphics_SetColor(this.m_outlineColor.m_r,this.m_outlineColor.m_g,this.m_outlineColor.m_b);
		
		// Steve: left sidebar boundary containing examples and other bits (this seems to draw various boxes in the sidebar
		bb_graphics_DrawRect(0.0,0.0,this.m_frame.m_width,this.m_frame.m_height,this.m_dottedOutline,false);
	}
	bb_graphics_PopMatrix();
	bb_graphics_SetScissor(this.m_prevScissor[0],this.m_prevScissor[1],this.m_prevScissor[2],this.m_prevScissor[3]);
	if(this.m_cacheView){
		this.p_StoreTransform(this.m_frame);
	}
}
c_UIView.prototype.p_Draw2=function(){
	this.p_Draw(this.m_frame,true);
}
c_UIView.m_DrawAll=function(){
	c_UIView.m_root.p_Draw2();
}
function c_UIScrollView(){
	c_UIView.call(this);
	this.m__contentSize=null;
	this.m_contentView=null;
	this.m_pageWidth=.0;
	this.m_pageHeight=.0;
	this.m_drawBackground=true;
	this.m_lockToContentFrame=true;
	this.m_verticalScrollbar=null;
	this.m_inertia=c_Point.m_new2.call(new c_Point);
	this.m_pagingEnabled=false;
}
c_UIScrollView.prototype=extend_class(c_UIView);
c_UIScrollView.m_new=function(t_x,t_y,t_w,t_h){
	c_UIView.m_new3.call(this,t_x,t_y,t_w,t_h);
	this.m_clip=true;
	this.m__contentSize=c_Size.m_new.call(new c_Size,t_w,t_h);
	this.m_controlType="scrollview";
	this.m_contentView=c_UIView.m_new3.call(new c_UIView,0.0,0.0,t_w,t_h);
	this.m_contentView.m_draggable=true;
	this.m_contentView.m_lockHorizontal=false;
	this.m_contentView.m_lockVertical=false;
	this.m_contentView.m_name="Scrollview ContentView";
	c_UIView.prototype.p_AddSubview.call(this,this.m_contentView);
	this.m_pageWidth=this.m_frame.m_width;
	this.m_pageHeight=this.m_frame.m_height;
	return this;
}
c_UIScrollView.m_new2=function(){
	c_UIView.m_new.call(this);
	return this;
}
c_UIScrollView.prototype.p_AddSubview=function(t_view){
	this.m_contentView.p_RemoveSubview(t_view);
	this.m_contentView.m_subviews=resize_object_array(this.m_contentView.m_subviews,this.m_contentView.m_subviews.length+1);
	this.m_contentView.m_subviews[this.m_contentView.m_subviews.length-1]=t_view;
	t_view.m_superview=this.m_contentView;
}
c_UIScrollView.prototype.p_Draw=function(t_rect,t_tint){
	if(this.m_lockToContentFrame){
		if(this.m_contentView.m_frame.m_y>0.0001){
			print("content 0");
			this.m_contentView.m_targetFrame.m_y=0.0;
			this.m_contentView.m_frame.m_y=0.0;
		}
		if(this.m_contentView.m_frame.m_y+0.0001<-this.m_contentView.m_frame.m_height+this.m_frame.m_height){
			print("content height");
			this.m_contentView.m_frame.m_y=-this.m_contentView.m_frame.m_height+this.m_frame.m_height;
			this.m_contentView.m_targetFrame.m_y=this.m_contentView.m_frame.m_y;
		}
	}
	var t_sc=bb_graphics_GetScissor();
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_rect.m_x,t_rect.m_y);
	bb_graphics_Rotate(this.m_rotation);
	bb_graphics_Scale(this.m_xscale,this.m_yscale);
	if(this.m_drawBackground){
		bb_graphics_SetColor(50.0,50.0,50.0);
		bb_graphics_DrawRect(0.0,0.0,t_rect.m_width,t_rect.m_height,false,true);
	}
	bb_graphics_SetColor(255.0,255.0,255.0);
	bb_graphics_GetMatrix2(this.m_transform);
	if(this.m_cacheView){
	}else{
		for(var t_i=0;t_i<this.m_subviews.length;t_i=t_i+1){
			if(this.m_subviews[t_i]==(this.m_verticalScrollbar)){
				this.m_subviews[t_i].p_Draw(this.m_subviews[t_i].m_frame,t_tint);
			}else{
				if(this.m_clip){
					bb_graphics_SetScissor(this.m_transform[4],this.m_transform[5],t_rect.m_width,t_rect.m_height);
				}
				this.m_subviews[t_i].p_Draw(this.m_subviews[t_i].m_frame,t_tint);
				bb_graphics_SetScissor(t_sc[0],t_sc[1],t_sc[2],t_sc[3]);
			}
		}
	}
	bb_graphics_PopMatrix();
	if(this.m_cacheView){
		this.p_StoreTransform(this.m_frame);
	}
}
c_UIScrollView.prototype.p_Update=function(){
	c_UIView.prototype.p_Update.call(this);
	return;
}
c_UIScrollView.prototype.p_SendEvent=function(t_ev){
	var t_1=t_ev.m_event;
	if(t_1==4){
		if(this.m_verticalScrollbar!=null){
			if(t_ev.m_sender==(this.m_verticalScrollbar.m_upButton)){
				this.m_contentView.m_targetFrame.m_y+=this.m_pageHeight;
				this.m_verticalScrollbar.p_value2(-this.m_contentView.m_targetFrame.m_y);
			}else{
				if(t_ev.m_sender==(this.m_verticalScrollbar.m_downButton)){
					this.m_contentView.m_targetFrame.m_y-=this.m_pageHeight;
					this.m_verticalScrollbar.p_value2(-this.m_contentView.m_targetFrame.m_y);
				}else{
					if(t_ev.m_sender==(this.m_verticalScrollbar)){
						if(this.m_verticalScrollbar.m_thumb.m_frame.m_y>(t_ev.m_sender.m_localMouse[1])){
							this.m_contentView.m_targetFrame.m_y+=this.m_pageHeight;
						}else{
							this.m_contentView.m_targetFrame.m_y-=this.m_pageHeight;
						}
					}
				}
			}
		}
	}else{
		if(t_1==7){
			if(this.m_verticalScrollbar!=null){
				if(t_ev.m_sender==(this.m_verticalScrollbar.m_thumb)){
					this.m_contentView.m_targetFrame.m_y=-this.m_verticalScrollbar.p_value();
				}else{
					if(t_ev.m_sender==this.m_contentView){
						this.m_verticalScrollbar.p_value2(-this.m_contentView.m_frame.m_y);
					}
				}
			}
		}
	}
	c_UIView.prototype.p_SendEvent.call(this,t_ev);
}
function c_NodeAreaView(){
	c_UIScrollView.call(this);
	this.m_selectBox=null;
	this.m_trash=null;
	this.m_showTrash=true;
	this.m_offset=24000.0;
	this.m_currentNode=null;
	this.m_selectedNodes=c_List4.m_new.call(new c_List4);
}
c_NodeAreaView.prototype=extend_class(c_UIScrollView);
c_NodeAreaView.m_new=function(t_x,t_y,t_width,t_height){
	c_UIScrollView.m_new.call(this,t_x,t_y,t_width,t_height);
	this.m_clip=true;
	this.m_drawBackground=false;
	this.m_interactive=true;
	this.m_selectBox=c_UIView.m_new3.call(new c_UIView,0.0,0.0,100.0,100.0);
	this.m_selectBox.m_drawOutline=true;
	this.m_selectBox.m_dottedOutline=true;
	this.m_selectBox.m_visible=false;
	this.m_trash=bb_graphics_LoadImage("trashSmall.png",1,c_Image.m_DefaultFlags);
	this.m_lockToContentFrame=false;
	this.m_contentView.m_frame.m_width=48000.0;
	this.m_contentView.m_frame.m_height=48000.0;
	this.m_contentView.p_Position(-24000.0,-24000.0);
	this.m_limitDragToRect=false;
	this.m_limitClickToRect=false;
	return this;
}
c_NodeAreaView.m_new2=function(){
	c_UIScrollView.m_new2.call(this);
	return this;
}
c_NodeAreaView.prototype.p_SortSubviews=function(){
	var t_done=false;
	while(t_done==false){
		t_done=true;
		for(var t_i=0;t_i<this.m_contentView.m_subviews.length-1;t_i=t_i+1){
			if(object_downcast((this.m_contentView.m_subviews[t_i]),c_NodeView)!=null && object_downcast((this.m_contentView.m_subviews[t_i+1]),c_LineView)!=null){
				var t_temp=this.m_contentView.m_subviews[t_i];
				this.m_contentView.m_subviews[t_i]=this.m_contentView.m_subviews[t_i+1];
				this.m_contentView.m_subviews[t_i+1]=t_temp;
				t_done=false;
			}
		}
	}
}
c_NodeAreaView.prototype.p_AddSubview=function(t_view){
	c_UIScrollView.prototype.p_AddSubview.call(this,t_view);
	if((object_downcast((t_view),c_NodeView))!=null){
		t_view.p_Move(this.m_offset,this.m_offset);
	}
}
c_NodeAreaView.prototype.p_GetNodes=function(){
	var t_nodes=c_List4.m_new.call(new c_List4);
	for(var t_i=0;t_i<this.m_contentView.m_subviews.length;t_i=t_i+1){
		var t_n=object_downcast((this.m_contentView.m_subviews[t_i]),c_NodeView);
		if(t_n==null){
			continue;
		}
		t_nodes.p_AddLast4(t_n);
	}
	return t_nodes;
}
c_NodeAreaView.prototype.p_ClearNodes=function(){
	this.m_contentView.m_subviews=new_object_array(0);
	this.m_offset=24000.0;
	this.m_currentNode=null;
	this.m_selectedNodes=c_List4.m_new.call(new c_List4);
	
	// Steve: changed so that I can set start position
	//this.m_contentView.p_Position(-24000.0,-24000.0);
	this.m_contentView.p_Position(startMapCentrePositionX,startMapCentrePositionY);
	
	c_UIEvent.m_ClearUp();
	var t_testNode=c_NodeView.m_new.call(new c_NodeView,-50000.0,-50000.0,0.1);
	this.p_AddSubview(t_testNode);
	var t_line=c_LineView.m_new.call(new c_LineView,(t_testNode),(t_testNode));
}
c_NodeAreaView.prototype.p_AddSubview2=function(t_view,t_useOffset){
	c_UIScrollView.prototype.p_AddSubview.call(this,t_view);
	if(t_useOffset){
		if((object_downcast((t_view),c_NodeView))!=null){
			t_view.p_Move(this.m_offset,this.m_offset);
		}
	}
}
c_NodeAreaView.prototype.p_GroupNodes=function(){
	if(this.m_currentNode==null){
		Notify("Select a parent node.");
		return;
	}
	var t_selectedNodes=c_List4.m_new.call(new c_List4);
	for(var t_i=0;t_i<this.m_contentView.m_subviews.length;t_i=t_i+1){
		var t_n=object_downcast((this.m_contentView.m_subviews[t_i]),c_NodeView);
		if(t_n==null){
			continue;
		}
		if(t_n==this.m_currentNode){
			continue;
		}
		if(t_n.m_selected){
			t_selectedNodes.p_AddLast4(t_n);
		}
	}
	if(t_selectedNodes.p_Count()>0){
		var t_=t_selectedNodes.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_n2=t_.p_NextObject();
			t_n2.m_tintColor=this.m_currentNode.m_tintColor;
		}
	}else{
		Notify("Select two or more nodes.");
	}
}
c_NodeAreaView.prototype.p_Draw=function(t_rect,t_tint){
	c_UIScrollView.prototype.p_Draw.call(this,t_rect,t_tint);
	if(this.m_showTrash){
		bb_graphics_DrawImage(this.m_trash,(bb_graphics_DeviceWidth()-100),(bb_graphics_DeviceHeight()-100),0);
	}
}
c_NodeAreaView.prototype.p_SendEvent=function(t_ev){

	c_UIScrollView.prototype.p_SendEvent.call(this,t_ev);
	var t_1=t_ev.m_event;
	if(t_1==15){
		print("NodeAreaView: SelectNodeEvent");
		this.m_currentNode=object_downcast((t_ev.m_sender),c_NodeView);
		c_UIEvent.m_eventStack.p_Push4(t_ev);
	}else{
		if(t_1==14){
			var t_curr=true;
			for(var t_i=0;t_i<this.m_contentView.m_subviews.length;t_i=t_i+1){
				var t_n=object_downcast((this.m_contentView.m_subviews[t_i]),c_NodeView);
				if(t_n==null){
					continue;
				}
				if((t_n)==t_ev.m_sender){
					continue;
				}
				t_n.m_selected=false;
				t_n.m_current=false;
			}
		}else{
			if(t_1==9){
				print("nodeareaview: mouse clicked "+t_ev.m_sender.m_controlType);
				if(t_ev.m_sender==(this)){
					for(var t_i2=0;t_i2<this.m_contentView.m_subviews.length;t_i2=t_i2+1){
						var t_n2=object_downcast((this.m_contentView.m_subviews[t_i2]),c_NodeView);
						if(t_n2==null){
							continue;
						}
						t_n2.m_selected=false;
					}
					this.m_currentNode=null;
				}
			}else{
				if(t_1==6){
					print("**"+String(this.m_startDragPosition[0])+" "+String(this.m_startDragPosition[1]));
					this.m_selectBox.m_visible=true;
					this.m_selectBox.m_frame.m_x=0.0;
					this.m_selectBox.m_frame.m_y=0.0;
					this.m_selectBox.m_targetFrame.m_x=0.0;
					this.m_selectBox.m_targetFrame.m_y=0.0;
					this.m_selectBox.m_frame.m_width=0.0;
					this.m_selectBox.m_frame.m_height=0.0;
				}else{
					if(t_1==7){
						print("Mouse drag event");
						if((bb_input_KeyDown(16))!=0){
						
							this.m_selectBox.m_frame.m_x=(c_UIEvent.m_startDragMousePosition[0]);
							this.m_selectBox.m_frame.m_y=(c_UIEvent.m_startDragMousePosition[1]);
							this.m_selectBox.m_targetFrame.m_x=this.m_selectBox.m_frame.m_x;
							this.m_selectBox.m_targetFrame.m_y=this.m_selectBox.m_frame.m_y;
							this.m_selectBox.m_frame.m_width=bb_input_MouseX()-this.m_selectBox.m_frame.m_x;
							this.m_selectBox.m_frame.m_height=bb_input_MouseY()-this.m_selectBox.m_frame.m_y;
							var t_p=this.m_contentView.p_ConvertPointToView(this.m_selectBox.m_frame.m_x,this.m_selectBox.m_frame.m_y);
							
							for(var t_i3=0;t_i3<this.m_contentView.m_subviews.length;t_i3=t_i3+1){
								var t_n3=object_downcast((this.m_contentView.m_subviews[t_i3]),c_NodeView);
								if(t_n3==null){
									continue;
								}
								t_n3.m_selected=false;
								if(t_p[0]>t_n3.m_frame.m_x+t_n3.m_frame.m_width/2.0){
									continue;
								}
								if(t_p[1]>t_n3.m_frame.m_y+t_n3.m_frame.m_width/2.0){
									continue;
								}
								if(t_p[0]+this.m_selectBox.m_frame.m_width*(1.0/this.m_transform[0])<t_n3.m_frame.m_x+t_n3.m_frame.m_width/2.0){
									continue;
								}
								if(t_p[1]+this.m_selectBox.m_frame.m_height*(1.0/this.m_transform[3])<t_n3.m_frame.m_y+t_n3.m_frame.m_width/2.0){
									continue;
								}
								t_n3.m_selected=true;
							}
							
			
						}
					}else{
						if(t_1==8){
							this.m_selectBox.m_visible=false;
						}
					}
				}
			}
		}
	}
}
c_NodeAreaView.prototype.p_Update=function(){
	c_UIScrollView.prototype.p_Update.call(this);
	this.m_contentView.m_lockHorizontal=false;
	this.m_contentView.m_lockVertical=false;
	if((bb_input_KeyDown(16))!=0){
		this.m_contentView.m_lockHorizontal=true;
		this.m_contentView.m_lockVertical=true;
		for(var t_i=0;t_i<this.m_contentView.m_subviews.length;t_i=t_i+1){
			var t_n=object_downcast((this.m_contentView.m_subviews[t_i]),c_NodeView);
			if(t_n==null){
				continue;
			}
			if(t_n.m_draggable==false){
				break;
			}
			t_n.m_draggable=false;
		}
	}else{
		for(var t_i2=0;t_i2<this.m_contentView.m_subviews.length;t_i2=t_i2+1){
			var t_n2=object_downcast((this.m_contentView.m_subviews[t_i2]),c_NodeView);
			if(t_n2==null){
				continue;
			}
			if(t_n2.m_draggable==true){
				break;
			}
			t_n2.m_draggable=true;
		}
	}
}
function c_Rect(){
	Object.call(this);
	this.m_x=.0;
	this.m_y=.0;
	this.m_width=.0;
	this.m_height=.0;
}
c_Rect.m_new=function(t_x,t_y,t_width,t_height){
	this.m_x=t_x;
	this.m_y=t_y;
	this.m_width=t_width;
	this.m_height=t_height;
	return this;
}
c_Rect.m_new2=function(){
	return this;
}
c_Rect.prototype.p_right=function(){
	return this.m_x+this.m_width;
}
c_Rect.prototype.p_right2=function(t_val){
	this.m_width=t_val-this.m_x;
}
c_Rect.prototype.p_bottom=function(){
	return this.m_y+this.m_height;
}
c_Rect.prototype.p_bottom2=function(t_val){
	this.m_height=t_val-this.m_y;
}
function bb_graphics_GetMatrix(){
	return [bb_graphics_context.m_ix,bb_graphics_context.m_iy,bb_graphics_context.m_jx,bb_graphics_context.m_jy,bb_graphics_context.m_tx,bb_graphics_context.m_ty];
}
function bb_graphics_GetMatrix2(t_matrix){
	t_matrix[0]=bb_graphics_context.m_ix;
	t_matrix[1]=bb_graphics_context.m_iy;
	t_matrix[2]=bb_graphics_context.m_jx;
	t_matrix[3]=bb_graphics_context.m_jy;
	t_matrix[4]=bb_graphics_context.m_tx;
	t_matrix[5]=bb_graphics_context.m_ty;
	return 0;
}
function c_List(){
	Object.call(this);
	this.m__head=(c_HeadNode.m_new.call(new c_HeadNode));
}
c_List.m_new=function(){
	return this;
}
c_List.prototype.p_AddLast=function(t_data){
	return c_Node.m_new.call(new c_Node,this.m__head,this.m__head.m__pred,t_data);
}
c_List.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast(t_t);
	}
	return this;
}
c_List.prototype.p_RemoveFirst=function(){
	var t_data=this.m__head.p_NextNode().m__data;
	this.m__head.m__succ.p_Remove();
	return t_data;
}
c_List.prototype.p_Equals=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_List.prototype.p_Find=function(t_value,t_start){
	while(t_start!=this.m__head){
		if(this.p_Equals(t_value,t_start.m__data)){
			return t_start;
		}
		t_start=t_start.m__succ;
	}
	return null;
}
c_List.prototype.p_Find2=function(t_value){
	return this.p_Find(t_value,this.m__head.m__succ);
}
c_List.prototype.p_RemoveFirst2=function(t_value){
	var t_node=this.p_Find2(t_value);
	if((t_node)!=null){
		t_node.p_Remove();
	}
}
c_List.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator.m_new.call(new c_Enumerator,this);
}
c_List.prototype.p_ToArray=function(){
	var t_arr=new_object_array(this.p_Count());
	var t_i=0;
	var t_=this.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_t=t_.p_NextObject();
		t_arr[t_i]=t_t;
		t_i+=1;
	}
	return t_arr;
}
function c_Node(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node.m_new2=function(){
	return this;
}
c_Node.prototype.p_GetNode=function(){
	return this;
}
c_Node.prototype.p_NextNode=function(){
	return this.m__succ.p_GetNode();
}
c_Node.prototype.p_Remove=function(){
	this.m__succ.m__pred=this.m__pred;
	this.m__pred.m__succ=this.m__succ;
	return 0;
}
function c_HeadNode(){
	c_Node.call(this);
}
c_HeadNode.prototype=extend_class(c_Node);
c_HeadNode.m_new=function(){
	c_Node.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
c_HeadNode.prototype.p_GetNode=function(){
	return null;
}
function c_Enumerator(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator.m_new2=function(){
	return this;
}
c_Enumerator.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_Size(){
	Object.call(this);
	this.m_width=.0;
	this.m_height=.0;
}
c_Size.m_new=function(t_width,t_height){
	this.m_width=t_width;
	this.m_height=t_height;
	return this;
}
c_Size.m_new2=function(){
	return this;
}
function c_TopBarView(){
	c_UIView.call(this);
	this.m_colorPicker=null;
}
c_TopBarView.prototype=extend_class(c_UIView);
c_TopBarView.m_new=function(t_x,t_y,t_width,t_height){
	c_UIView.m_new3.call(this,t_x,t_y,t_width,t_height);
	return this;
}
c_TopBarView.m_new2=function(){
	c_UIView.m_new.call(this);
	return this;
}
c_TopBarView.prototype.p_SetupGadgets=function(t_userName){

	// h5.CreateButton("addNodeButton","NEW NODE",250,10,100,25,"button");
	// h5.CreateButton("addNodeButton","NEW NODE",250,10,110,25,"button");
	h5.CreateButton("addNodeButton","NEW NODE",nodeButtonsPositionOnTopBarX,10,110,25,"button");
			
	h5.SetGadgetTooltip("addNodeButton","Create a new node");
	h5.DisableGadget("addNodeButton");
//	h5.CreateButton("helpButton","?",bb_graphics_DeviceWidth()-50,10,40,40,"button");
//	h5.SetGadgetTooltip("helpButton","Open the Quick Guide");

	//h5.SetGadgetTooltip("helpButton","Open the guide PDF");
	//h5.SetGadgetFontSize("helpButton","20");

// Steve: deactive original login/out button - top right	
	/*
	if(bb_mindmap_loginComplete){
		h5.CreateButton("logoutButton","Log out",bb_graphics_DeviceWidth()-160,10,80,20,"button");
		h5.SetGadgetTooltip("logoutButton","Log out "+t_userName);
	}else{
		h5.CreateButton("logoutButton","Log in",bb_graphics_DeviceWidth()-160,10,80,20,"button");
		h5.SetGadgetTooltip("logoutButton","Log in");
	}
	*/
	
	// Steve add:
	// h5.CreateLabel("adaptivelabel","Adaptive Architecture Framework",740,50);
	//h5.CreateLabel("adaptivelabel","Adaptive Architecture Framework",895,40);
	h5.CreateLabel("adaptivelabel","Adaptive Architecture Framework",adaptivelabelPositionOnTopBarX,40);
	h5.SetGadgetColor("adaptivelabel","blue");
	// h5.SetGadgetFontSize("adaptivelabel","18");
	h5.SetGadgetFontSize("adaptivelabel","15");
	document.getElementById("adaptivelabel").style.whiteSpace = 'nowrap';
	document.getElementById("adaptivelabel").style.fontFamily = "arial,sans-serif";
	
		// Steve add:
	//h5.CreateLabel("topbartext",TopBarText,980,2);
	//h5.CreateLabel("topbartext",TopBarText,1350,2);
	h5.CreateLabel("topbartext",TopBarText,topbartextPositionOnTopBarX,2);
	h5.SetGadgetColor("topbartext","black");
	h5.SetGadgetFontSize("topbartext","7.5");
	document.getElementById("topbartext").style.whiteSpace = 'nowrap';
	document.getElementById("topbartext").style.fontFamily = "arial,sans-serif";
	
	// Steve add:
	//h5.CreateLabel("nav_links",NavLinkstext,890,10);
	h5.CreateLabel("nav_links", NavLinkstext,nav_linksPositionOnTopBarX,10);
	//h5.SetGadgetColor("nav_links","grey");
	//h5.SetGadgetFontSize("nav_links","18");
	document.getElementById("nav_links").style.whiteSpace = 'nowrap';
	//document.getElementById("nav_links").style.fontFamily = "arial,sans-serif";
	// links are restyled in index.html
			
	// h5.CreateButton("groupNodesButton","GROUP NODES",360,10,110,25,"button");
	//h5.CreateButton("groupNodesButton","GROUP NODES",250,45,110,25,"button");
	h5.CreateButton("groupNodesButton","GROUP NODES",nodeButtonsPositionOnTopBarX,45,110,25,"button");
	h5.SetGadgetTooltip("groupNodesButton","Change all the selected nodes to the parent colour");
	h5.DisableGadget("groupNodesButton");
	
	//h5.CreateTextarea("nodeNameTextfield",550,10,405,60,"text","");
	// h5.CreateTextarea("nodeNameTextfield",480,8,305,60,"text","");
	h5.CreateTextarea("nodeNameTextfield",nodeNameTextfieldPositionOnTopBarX,8,305,60,"text","");
	 
	h5.SetGadgetValue("nodeNameTextfield","node name");
	h5.SetGadgetFontSize("nodeNameTextfield","11");
	h5.DisableGadget("nodeNameTextfield");
}
c_TopBarView.prototype.p_Setup=function(t_userName){
	//this.m_colorPicker=c_UIColorPicker.m_new.call(new c_UIColorPicker,470.0,10.0,c_MindMapApp.m_colorList,3);
	//this.m_colorPicker=c_UIColorPicker.m_new.call(new c_UIColorPicker,475.0,12.0,c_MindMapApp.m_colorList,3);
	// this.m_colorPicker=c_UIColorPicker.m_new.call(new c_UIColorPicker,375.0,12.0,c_MindMapApp.m_colorList,3);
	this.m_colorPicker=c_UIColorPicker.m_new.call(new c_UIColorPicker,colorPickerPositionOnTopBarX,12.0,c_MindMapApp.m_colorList,3);
	this.p_AddSubview(this.m_colorPicker);
	this.p_SetupGadgets(t_userName);
}
c_TopBarView.prototype.p_ShowGadgets=function(){
	h5.ShowGadget("addNodeButton");
	h5.EnableGadget("addNodeButton");
	h5.ShowGadget("helpButton");
	h5.ShowGadget("logoutButton");
	h5.ShowGadget("groupNodesButton");
	h5.EnableGadget("groupNodesButton");
	h5.ShowGadget("nodeNameTextfield");
	h5.EnableGadget("nodeNameTextfield");
	
		// Steve add:
	h5.ShowGadget("topbartext");
	h5.ShowGadget("adaptivelabel");
	document.getElementById("nav").style.display = 'block';
	document.getElementById("nav_links").style.display = 'block';
	document.getElementById('logoutButton2').style.visibility = 'visible';
	
	}
c_TopBarView.prototype.p_HideGadgets=function(){
	h5.HideGadget("addNodeButton");
	h5.HideGadget("helpButton");
	h5.HideGadget("logoutButton");
	document.getElementById('logoutButton2').style.visibility = 'hidden';
	h5.HideGadget("groupNodesButton");
	h5.HideGadget("nodeNameTextfield");
	
	// Steve add:
	h5.HideGadget("topbartext");
	h5.HideGadget("adaptivelabel");
	document.getElementById("nav").style.display = 'none';
	document.getElementById("nav_links").style.display = 'none';

	
}
function c_UIColorPicker(){
	c_UIView.call(this);
	this.m_colors=[];
	this.m_columns=0;
	this.m_current=null;
	this.m_collapsed=true;
}
c_UIColorPicker.prototype=extend_class(c_UIView);
c_UIColorPicker.m_chipSize=0;
c_UIColorPicker.m_new=function(t_x,t_y,t_colors,t_columns){
	c_UIView.m_new3.call(this,t_x,t_y,(t_columns*c_UIColorPicker.m_chipSize),Math.ceil((t_colors.length)/(t_columns))*(c_UIColorPicker.m_chipSize));
	this.m_colors=t_colors;
	this.m_columns=t_columns;
	this.m_current=t_colors[0];
	this.m_controlType="colorpicker";
	this.m_interactive=true;
	return this;
}
c_UIColorPicker.m_new2=function(){
	c_UIView.m_new.call(this);
	return this;
}
c_UIColorPicker.prototype.p_Draw=function(t_rect,t_tint){
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_rect.m_x,t_rect.m_y);
	bb_graphics_Rotate(this.m_rotation);
	bb_graphics_Scale(this.m_xscale,this.m_yscale);
	bb_graphics_GetMatrix2(this.m_transform);
	if(this.m_collapsed){
		this.m_frame.m_width=(c_UIColorPicker.m_chipSize);
		this.m_frame.m_height=(c_UIColorPicker.m_chipSize);
		bb_graphics_SetColor(this.m_current.m_r,this.m_current.m_g,this.m_current.m_b);
		bb_graphics_DrawRect(0.0,0.0,(c_UIColorPicker.m_chipSize),(c_UIColorPicker.m_chipSize),false,true);
	}else{
		this.m_frame.m_width=(this.m_columns*c_UIColorPicker.m_chipSize);
		this.m_frame.m_height=Math.ceil((this.m_colors.length)/(this.m_columns))*(c_UIColorPicker.m_chipSize);
		bb_graphics_SetColor(0.0,0.0,0.0);
		bb_graphics_DrawRect(0.0,0.0,t_rect.m_width,t_rect.m_height,false,true);
		var t_x=0;
		var t_y=0;
		for(var t_i=0;t_i<this.m_colors.length;t_i=t_i+1){
			bb_graphics_SetColor(this.m_colors[t_i].m_r,this.m_colors[t_i].m_g,this.m_colors[t_i].m_b);
			bb_graphics_DrawRect((t_x),(t_y),(c_UIColorPicker.m_chipSize),(c_UIColorPicker.m_chipSize),false,true);
			t_x+=c_UIColorPicker.m_chipSize;
			if((t_x+c_UIColorPicker.m_chipSize)>t_rect.m_width){
				t_y+=c_UIColorPicker.m_chipSize;
				t_x=0;
			}
		}
	}
	bb_graphics_PopMatrix();
}
c_UIColorPicker.prototype.p_Update=function(){
	if(!this.m_collapsed){
		if((bb_input_KeyHit(27))!=0){
			this.m_collapsed=true;
		}
	}
}
c_UIColorPicker.prototype.p_SendEvent=function(t_ev){
	c_UIView.prototype.p_SendEvent.call(this,t_ev);
	var t_1=t_ev.m_event;
	if(t_1==9){
		this.m_collapsed=!this.m_collapsed;
		print(String(t_ev.m_x)+" "+String(t_ev.m_y)+" "+String(this.m_localMouse[0])+" "+String(this.m_localMouse[1]));
		var t_column=((this.m_localMouse[0]/c_UIColorPicker.m_chipSize)|0);
		var t_row=((this.m_localMouse[1]/c_UIColorPicker.m_chipSize)|0);
		var t_index=t_row*this.m_columns+t_column;
		if(t_index>=this.m_colors.length){
			t_index=this.m_colors.length-1;
		}
		this.m_current=this.m_colors[t_index];
		t_ev.m_sender=(this);
		c_UIEvent.m_eventStack.p_Push4(t_ev);
	}else{
		if(t_1==2){
			if(!this.m_collapsed){
				this.m_collapsed=true;
			}
		}
	}
}
var bb_mindmap_loginComplete=false;
function c_SideBarView(){
	c_UIView.call(this);
	this.m_groupsView=null;
	this.m_nodeView=null;
	this.m_connectedView=null;
}
c_SideBarView.prototype=extend_class(c_UIView);
c_SideBarView.m_new=function(t_x,t_y,t_width,t_height){
	c_UIView.m_new3.call(this,t_x,t_y,t_width,t_height);
	return this;
}
c_SideBarView.m_new2=function(){
	c_UIView.m_new.call(this);
	return this;
}
c_SideBarView.prototype.p_PositionGadgets=function(){


// Steve: this is the place to set positions, as overrides initial creation of gadget (below)
	// log in / out - 80px
	h5.SetGadgetPosition("logoutButton2",5,bb_graphics_DeviceHeight()-30);
	
	// Steve: browse local file...(it's defined in index.html, not as a gadget
	h5.SetGadgetPosition("inputWrapperId",90,bb_graphics_DeviceHeight()-30);
	
	// Steve: on top of examples list
	document.getElementById("inputWrapperId").style.zIndex = "400";

	// new map - 80px
	//h5.SetGadgetPosition("newMapButton",5,bb_graphics_DeviceHeight()-30);
	h5.SetGadgetPosition("newMapButton",238,bb_graphics_DeviceHeight()-30);
		// Steve: on top of examples list
	document.getElementById("newMapButton").style.zIndex = "400";
	
	// save file - 80px
	//h5.SetGadgetPosition("exportXmlButton",270,bb_graphics_DeviceHeight()-30);
	h5.SetGadgetPosition("exportXmlButton",325,bb_graphics_DeviceHeight()-30);
		// Steve: on top of examples list
	document.getElementById("exportXmlButton").style.zIndex = "400";
	
	// save to cloud - 130px
	//h5.SetGadgetPosition("saveToServerXmlButton",360,bb_graphics_DeviceHeight()-30);
	h5.SetGadgetPosition("saveToServerXmlButton",410,bb_graphics_DeviceHeight()-30);
			// Steve: on top of examples list
	document.getElementById("saveToServerXmlButton").style.zIndex = "400";
	
	// Browse cloud maps - 150px
	//h5.SetGadgetPosition("browseUploadsButton",495,bb_graphics_DeviceHeight()-30);
	h5.SetGadgetPosition("browseUploadsButton",550,bb_graphics_DeviceHeight()-30);
				// Steve: on top of examples list
	document.getElementById("browseUploadsButton").style.zIndex = "400";

	h5.SetGadgetPosition("uploadNameTextfield",495,bb_graphics_DeviceHeight()-30);
	
	h5.SetGadgetPosition("mapsAreaLabel",h5.GadgetX("mapsAreaLabel"),bb_graphics_DeviceHeight()-50);
}
c_SideBarView.prototype.p_SetupGadgets2=function(){
	h5.CreateLabel("zoomLabel","ZOOM",10,10);
	// Steve add next:
	h5.SetGadgetColor("zoomLabel","red");
	h5.CreateButton("zoomOutButton","-",140,3,30,30,"button");
	h5.CreateButton("zoomInButton","+",175,3,30,30,"button");
	h5.CreateLabel("groupsLabel","EXAMPLE",10,70);
	h5.SetGadgetColor("groupsLabel","red");
	h5.HideGadget("groupsLabel");
	h5.CreateTextfield("exampleTitleTextfield",10,110,190,14,"text","title");
	h5.CreateTextfield("exampleLinkTextfield",10,135,190,14,"text","link");
	h5.CreateTextfield("exampleDateTextfield",10,160,190,14,"text","date");
	h5.CreateTextarea("exampleNotesTextfield",10,185,190,100,"text","notes");
	h5.DisableGadget("exampleTitleTextfield");
	h5.DisableGadget("exampleLinkTextfield");
	h5.DisableGadget("exampleDateTextfield");
	h5.DisableGadget("exampleNotesTextfield");
	h5.CreateButton("exampleAddButton","new",140,70,60,30,"button");
	h5.SetGadgetTooltip("exampleAddButton","Create new empty example and add to selected node.");
	h5.DisableGadget("exampleAddButton");
	h5.CreateCombobox("exampleMoveToCombo",10,295,190,20);
	h5.AddGadgetItem("exampleMoveToCombo","Move to..");
	h5.HideGadget("exampleMoveToCombo");
	h5.CreateCombobox("exampleCopyToCombo",10,320,190,20);
	h5.AddGadgetItem("exampleCopyToCombo","Copy to..");
	h5.HideGadget("exampleCopyToCombo");
	h5.CreateTextfield("exampleSearchTextfield",10,370,145,14,"text","search examples");
	h5.CreateButton("exampleSearchClearButton","X",165,370,24,24,"button");
	h5.SetGadgetTooltip("exampleSearchClearButton","Click to clear this example search field");
	h5.CreateButton("exampleEditButton","edit",150,400,60,20,"button");
	h5.SetGadgetTooltip("exampleEditButton","Click to delete one or more examples");
	h5.DisableGadget("exampleEditButton");
	
	


	// Steve: new login / out button position - bottom left
		if(bb_mindmap_loginComplete){
		h5.CreateButton("logoutButton2","Log out",5,bb_graphics_DeviceHeight()-50,80,20,"button");
		h5.SetGadgetTooltip("logoutButton2","Log out "+t_userName);
	}else{
		h5.CreateButton("logoutButton2","Log in",5,bb_graphics_DeviceHeight()-50,80,20,"button");
		h5.SetGadgetTooltip("logoutButton2","Log in");
	}
	
//Steve: fix login/logout button being overlapped by examples panel at lower screen resolutions	
	document.getElementById("logoutButton2").style.zIndex = "400";
		
	// new map
	//h5.CreateButton("newMapButton","new map",5,bb_graphics_DeviceHeight()+5,80,20,"button");
	h5.CreateButton("newMapButton","new map",120,bb_graphics_DeviceHeight()+5,80,20,"button");
	h5.SetGadgetTooltip("newMapButton","Clear all nodes and make a new empty map");
	h5.HideGadget("newMapButton");
	
	
	// browse local file
	//h5.SetGadgetPosition("inputWrapperId",120,bb_graphics_DeviceHeight()-30);
	h5.SetGadgetPosition("inputWrapperId",270,bb_graphics_DeviceHeight()-30);
	
	// save file
	//h5.CreateButton("exportXmlButton","save file",270,905,80,20,"button");
	h5.CreateButton("exportXmlButton","save file",360,905,80,20,"button");
	h5.SetGadgetTooltip("exportXmlButton","Click to export to mindmap (.mm)");
	h5.HideGadget("exportXmlButton");
	
	// save to cloud
	//h5.CreateButton("saveToServerXmlButton","save to cloud",360,bb_graphics_DeviceHeight()-30,130,20,"button");
	h5.CreateButton("saveToServerXmlButton","save to cloud",495,bb_graphics_DeviceHeight()-30,130,20,"button");
	h5.SetGadgetTooltip("saveToServerXmlButton","Click to upload mindmap (.mm)");
	h5.HideGadget("saveToServerXmlButton");
	
	// Browse cloud maps
	//h5.CreateButton("browseUploadsButton","browse cloud maps",495,905,150,20,"button");
	h5.CreateButton("browseUploadsButton","browse cloud maps",650,905,150,20,"button");
	h5.SetGadgetTooltip("browseUploadsButton","Click to browse uploads (yours and shared).");
	h5.HideGadget("browseUploadsButton");
	

	h5.CreateTextfield("uploadNameTextfield",495,905,160,15,"text","upload name");
	h5.HideGadget("uploadNameTextfield");
		
	if(bb_mindmap_loginComplete){
		h5.ShowGadget("inputWrapperId");
	}else{
		h5.HideGadget("inputWrapperId");
	}
	this.p_PositionGadgets();
}
c_SideBarView.prototype.p_ShowGadgets=function(){
	h5.ShowGadget("zoomLabel");
	h5.ShowGadget("zoomOutButton");
	h5.ShowGadget("zoomInButton");
	h5.ShowGadget("groupsLabel");
	h5.ShowGadget("exampleTitleTextfield");
	h5.ShowGadget("exampleLinkTextfield");
	h5.ShowGadget("exampleDateTextfield");
	h5.ShowGadget("exampleNotesTextfield");
	h5.ShowGadget("exampleAddButton");
	h5.EnableGadget("exampleAddButton");
	h5.ShowGadget("exampleMoveToCombo");
	h5.ShowGadget("exampleCopyToCombo");
	h5.ShowGadget("exampleSearchTextfield");
	h5.ShowGadget("exampleSearchClearButton");
	h5.ShowGadget("exampleEditButton");
	h5.EnableGadget("exampleEditButton");
	h5.ShowGadget("newMapButton");
	h5.ShowGadget("exportXmlButton");
	h5.ShowGadget("saveToServerXmlButton");
	h5.ShowGadget("browseUploadsButton");
}
c_SideBarView.prototype.p_Setup2=function(){
	this.m_groupsView=c_UIView.m_new3.call(new c_UIView,0.0,-30.0,this.m_frame.m_width,310.0);
	this.m_groupsView.m_drawOutline=true;
	this.p_AddSubview(this.m_groupsView);
	// Steve: next is outline for Example box in left sidebar
	// this.m_nodeView=c_UIView.m_new3.call(new c_UIView,0.0,320.0,this.m_frame.m_width,240.0);
	this.m_nodeView=c_UIView.m_new3.call(new c_UIView,0.0,320.0,this.m_frame.m_width,440.0);
	this.m_nodeView.m_drawOutline=true;
	this.p_AddSubview(this.m_nodeView);
	this.m_connectedView=c_UIView.m_new3.call(new c_UIView,0.0,this.m_nodeView.m_frame.m_y+this.m_nodeView.m_frame.m_height,this.m_frame.m_width,145.0);
	// Steve: next line sets whether connected pane (below examples, left sidebar) is visible
	this.m_connectedView.m_drawOutline=false;
	this.p_AddSubview(this.m_connectedView);
	if(!h5.GadgetExists("exampleTitleTextfield")){
		this.p_SetupGadgets2();
	}else{
		this.p_ShowGadgets();
	}
}
c_SideBarView.prototype.p_HideGadgets=function(){
	h5.HideGadget("zoomLabel");
	h5.HideGadget("zoomOutButton");
	h5.HideGadget("zoomInButton");
	h5.HideGadget("groupsLabel");
	h5.HideGadget("exampleTitleTextfield");
	h5.HideGadget("exampleLinkTextfield");
	h5.HideGadget("exampleDateTextfield");
	h5.HideGadget("exampleNotesTextfield");
	h5.HideGadget("exampleAddButton");
	h5.HideGadget("exampleMoveToCombo");
	h5.HideGadget("exampleCopyToCombo");
	h5.HideGadget("exampleSearchTextfield");
	h5.HideGadget("exampleSearchClearButton");
	h5.HideGadget("exampleEditButton");
	h5.HideGadget("newMapButton");
	h5.HideGadget("exportXmlButton");
	h5.HideGadget("saveToServerXmlButton");
	h5.HideGadget("uploadNameTextfield");
	h5.HideGadget("browseUploadsButton");
}
function c_UIControl(){
	c_UIView.call(this);
	this.m_enabled=true;
}
c_UIControl.prototype=extend_class(c_UIView);
c_UIControl.m_new=function(t_x,t_y,t_w,t_h){
	c_UIView.m_new3.call(this,t_x,t_y,t_w,t_h);
	return this;
}
c_UIControl.m_new2=function(t_x,t_y,t_w,t_h){
	c_UIView.m_new3.call(this,(t_x),(t_y),(t_w),(t_h));
	return this;
}
c_UIControl.m_new3=function(){
	c_UIView.m_new.call(this);
	return this;
}
function c_UIButton(){
	c_UIControl.call(this);
	this.m__title="";
	this.m_screenTitle="";
	this.m_tintColor=null;
	this.m_titleColor=null;
	this.m_font=null;
	this.m_canvasFontSize=10;
	this.m_canvasFont="pt helvetica";
	this.m_canvasTextAlign="center";
	this.m_canvasTextBaseline="middle";
	this.m_backgroundType=1;
	this.m_image=null;
	this.m_padding=10;
}
c_UIButton.prototype=extend_class(c_UIControl);
c_UIButton.prototype.p_title=function(t_txt){
	this.m__title=t_txt;
	var t_words=t_txt.split(" ");
	if(t_words.length<5){
		this.m_screenTitle=t_txt;
	}else{
		t_words=t_words.slice(0,4);
		this.m_screenTitle=t_words.join(" ")+"..";
	}
}
c_UIButton.prototype.p_title2=function(){
	return this.m_screenTitle;
}
c_UIButton.m_defaultFont=null;
c_UIButton.m_new=function(t_x,t_y,t_w,t_h){
	c_UIControl.m_new.call(this,t_x,t_y,t_w,t_h);
	this.m_tintColor=c_UIColor.m_white;
	this.m_titleColor=c_UIColor.m_white;
	this.m_interactive=true;
	if(c_UIButton.m_defaultFont==null){
		c_UIButton.m_defaultFont=c_AngelFont.m_new.call(new c_AngelFont,"");
		c_UIButton.m_defaultFont.p_LoadFontXml("angel_verdana");
	}
	this.m_font=c_UIButton.m_defaultFont;
	this.m_controlType="button";
	SetCanvasFont(String(this.m_canvasFontSize)+"pt "+this.m_canvasFont);
	SetCanvasTextAlign(this.m_canvasTextAlign);
	SetCanvasTextBaseline(this.m_canvasTextBaseline);
	return this;
}
c_UIButton.m_new2=function(){
	c_UIControl.m_new3.call(this);
	return this;
}
c_UIButton.prototype.p_realTitle=function(){
	return this.m__title;
}
c_UIButton.prototype.p_DrawProper=function(t_rect,t_tint){
	if(t_tint){
		bb_graphics_SetColor(this.m_tintColor.m_r,this.m_tintColor.m_g,this.m_tintColor.m_b);
	}
	if(this.m_image!=null){
		this.m_image.p_Draw4(0.0,0.0,t_rect.m_width,t_rect.m_height);
	}else{
		var t_1=this.m_backgroundType;
		if(t_1==1){
			bb_graphics_DrawRect(0.0,0.0,t_rect.m_width,t_rect.m_height,false,true);
		}else{
			if(t_1==2){
				bb_graphics_DrawOval(0.0,0.0,t_rect.m_width,t_rect.m_width,true);
				t_rect.m_height=t_rect.m_width;
			}
		}
	}
	if(this.p_title2()!=""){
		if(t_tint){
			bb_graphics_SetColor(this.m_titleColor.m_r,this.m_titleColor.m_g,this.m_titleColor.m_b);
		}
		if(this.m_canvasFont!=""){
			var t_titles=string_trim(this.p_title2()).split(" ");
			if(this.m_backgroundType!=2){
				SetCanvasFont(String(this.m_canvasFontSize)+"pt "+this.m_canvasFont);
			}else{
				SetCanvasFont(String(t_rect.m_width/10.0)+this.m_canvasFont);
			}
			SetCanvasTextAlign(this.m_canvasTextAlign);
			SetCanvasTextBaseline(this.m_canvasTextBaseline);
			var t_2=this.m_canvasTextAlign.slice(0,1);
			if(t_2=="c"){
				var t_blockHeight=(t_titles.length)*(0.75*(t_rect.m_height/8.0))+(t_titles.length-1)*(0.25*(t_rect.m_height/8.0));
				t_blockHeight=0.0;
				var t_finalTitle="";
				var t_=t_titles;
				var t_3=0;
				while(t_3<t_.length){
					var t_t=t_[t_3];
					t_3=t_3+1;
					if(t_finalTitle.length+t_t.length>7){
						t_blockHeight+=t_rect.m_height/8.0;
						t_finalTitle=t_t;
					}else{
						if(t_finalTitle!=""){
							t_finalTitle=t_finalTitle+" ";
						}
						t_finalTitle=t_finalTitle+t_t;
					}
				}
				if(t_finalTitle!=""){
					t_blockHeight+=t_rect.m_height/8.0;
				}
				t_finalTitle="";
				var t_yoff=-t_blockHeight/2.0;
				if(t_titles.length==1){
					t_yoff=0.0;
				}
				var t_4=t_titles;
				var t_5=0;
				while(t_5<t_4.length){
					var t_t2=t_4[t_5];
					t_5=t_5+1;
					if(t_finalTitle.length+t_t2.length>7){
						DrawCanvasText(t_finalTitle,t_rect.m_width/2.0,t_rect.m_height/2.0+t_yoff);
						t_yoff+=t_rect.m_height/8.0;
						t_finalTitle=t_t2;
					}else{
						if(t_finalTitle!=""){
							t_finalTitle=t_finalTitle+" ";
						}
						t_finalTitle=t_finalTitle+t_t2;
					}
				}
				if(t_finalTitle!=""){
					DrawCanvasText(t_finalTitle,t_rect.m_width/2.0,t_rect.m_height/2.0+t_yoff);
				}
			}else{
				if(t_2=="l"){
					DrawCanvasText(this.p_title2(),(this.m_padding),t_rect.m_height/2.0);
				}else{
					DrawCanvasText(this.p_title2(),t_rect.m_width-(this.m_padding),t_rect.m_height/2.0);
				}
			}
		}else{
			this.m_font.p_DrawText2(this.p_title2(),((t_rect.m_width/2.0)|0),((t_rect.m_height/2.0-((this.m_font.p_TextHeight(this.p_title2())/2)|0))|0),1);
		}
	}
}
c_UIButton.prototype.p_Draw=function(t_rect,t_tint){
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_rect.m_x,t_rect.m_y);
	bb_graphics_Rotate(this.m_rotation);
	bb_graphics_Scale(this.m_xscale,this.m_yscale);
	bb_graphics_GetMatrix2(this.m_transform);
	if(this.m_enabled){
		if(this.m_cacheView){
			if(this.m_cachedImage==null){
				bb_graphics_SetScissor(0.0,0.0,(bb_graphics_DeviceWidth()),(bb_graphics_DeviceHeight()));
				this.p_PreDrawCache();
				this.p_DrawProper(t_rect,true);
				this.p_PostDrawCache();
				this.p_DrawProper(t_rect,false);
				this.p_PostDrawCache2();
			}else{
				bb_graphics_SetColor(255.0,255.0,255.0);
				bb_graphics_DrawImage(this.m_cachedImage,0.0,0.0,0);
			}
		}else{
			this.p_DrawProper(t_rect,t_tint);
		}
	}
	bb_graphics_PopMatrix();
}
function c_NodeView(){
	c_UIButton.call(this);
	this.m_id="";
	this.m_weighting=0.5;
	this.m_selected=false;
	this.m_examples=null;
	this.m_currentExample=null;
	this.m_current=false;
	this.m_parentNode=null;
	this.m_otherChildren="";
	this.m_layer=0;
	this.m_mass=30.0;
	this.m_touched=false;
}
c_NodeView.prototype=extend_class(c_UIButton);
c_NodeView.m_idCounter=0;
c_NodeView.m_new=function(t_x,t_y,t_weighting){
	c_UIButton.m_new.call(this,t_x,t_y,280.0*t_weighting+20.0,280.0*t_weighting+20.0);
	this.m_draggable=true;
	this.p_Unlock();
	this.m_backgroundType=2;
	this.m_controlType="nodeview";
	this.m_id=String(c_NodeView.m_idCounter);
	c_NodeView.m_idCounter+=1;
	this.m_weighting=t_weighting;
	return this;
}
c_NodeView.m_new2=function(t_x,t_y,t_w,t_h){
	c_UIButton.m_new.call(this,t_x,t_y,t_w,t_h);
	this.m_draggable=true;
	this.p_Unlock();
	this.m_backgroundType=2;
	this.m_selected=true;
	this.m_controlType="nodeview";
	this.m_id=String(c_NodeView.m_idCounter);
	c_NodeView.m_idCounter+=1;
	this.m_weighting=this.m_weighting;
	return this;
}
c_NodeView.m_new3=function(){
	c_UIButton.m_new2.call(this);
	return this;
}
c_NodeView.prototype.p_AddExample=function(t_example){
	if(this.m_examples==null){
		this.m_examples=c_List3.m_new.call(new c_List3);
	}
	this.m_examples.p_AddLast3(t_example);
	this.m_currentExample=t_example;
}
c_NodeView.prototype.p_AddExample2=function(t_title,t_link,t_date,t_notes){
	if(this.m_examples==null){
		this.m_examples=c_List3.m_new.call(new c_List3);
	}
	var t_example=c_Example.m_new.call(new c_Example,t_title,t_link,t_date,t_notes);
	this.m_examples.p_AddLast3(t_example);
	this.m_currentExample=t_example;
	return t_example;
}
c_NodeView.prototype.p_GetConnectedNodes=function(){
	var t_connectedNodes=c_List.m_new.call(new c_List);
	var t_=this.m_superview.m_subviews;
	var t_2=0;
	while(t_2<t_.length){
		var t_sibling=t_[t_2];
		t_2=t_2+1;
		var t_lineSibling=object_downcast((t_sibling),c_LineView);
		if(t_lineSibling==null){
			continue;
		}
		if(t_lineSibling.m_nodes[0]==(this)){
			t_connectedNodes.p_AddLast(t_lineSibling.m_nodes[1]);
		}
		if(t_lineSibling.m_nodes[1]==(this)){
			t_connectedNodes.p_AddLast(t_lineSibling.m_nodes[0]);
		}
	}
	return t_connectedNodes;
}
c_NodeView.prototype.p_SetPosFromCenter=function(t_x,t_y){
	this.m_frame.m_x=t_x-this.m_frame.m_width*0.5;
	this.m_frame.m_y=t_y-this.m_frame.m_width*0.5;
	this.m_targetFrame.m_x=this.m_frame.m_x;
	this.m_targetFrame.m_y=this.m_frame.m_y;
}
c_NodeView.prototype.p_SendEvent=function(t_ev){
	c_UIView.prototype.p_SendEvent.call(this,t_ev);
	var t_1=t_ev.m_event;
	if(t_1==9){
		print("NodeView: ViewClickedEvent");
		if(!((bb_input_KeyDown(16))!=0)){
			this.m_superview.m_superview.p_SendEvent(c_UIEvent.m_new2.call(new c_UIEvent,(this),14,null));
			this.m_selected=true;
			this.m_current=true;
			this.m_superview.m_superview.p_SendEvent(c_UIEvent.m_new2.call(new c_UIEvent,(this),15,null));
			object_downcast((this.m_superview.m_superview),c_NodeAreaView).m_currentNode=this;
		}else{
			this.m_selected=!this.m_selected;
			if(this.m_selected){
				var t_foundCurrent=false;
				var t_=this.m_superview.m_subviews;
				var t_2=0;
				while(t_2<t_.length){
					var t_sibling=t_[t_2];
					t_2=t_2+1;
					var t_n=object_downcast((t_sibling),c_NodeView);
					if((t_n)!=null){
						if(t_n.m_current){
							t_foundCurrent=true;
						}
					}
				}
				if(!t_foundCurrent){
					this.m_superview.m_superview.p_SendEvent(c_UIEvent.m_new2.call(new c_UIEvent,(this),15,null));
					this.m_current=true;
					object_downcast((this.m_superview.m_superview),c_NodeAreaView).m_currentNode=this;
				}
			}else{
				this.m_current=false;
			}
		}
	}else{
		if(t_1==6){
			print("NodeView StartMouseDragEvent");
			if(t_ev.m_sender==(this)){
				this.m_superview.p_AddSubview(this);
			}
		}else{
			if(t_1==8){
				print("NodeView StopMouseDragEvent");
				if(t_ev.m_sender==(this)){
					var t_foundSibling=false;
					var t_3=this.m_superview.m_subviews;
					var t_4=0;
					while(t_4<t_3.length){
						var t_sibling2=t_3[t_4];
						t_4=t_4+1;
						if(t_sibling2==(this)){
							continue;
						}
						var t_nodeSibling=object_downcast((t_sibling2),c_NodeView);
						if(t_nodeSibling==null){
							continue;
						}
						var t_dx=t_nodeSibling.m_frame.m_x+t_nodeSibling.m_frame.m_width*0.5-(this.m_superview.m_localMouse[0]);
						var t_dy=t_nodeSibling.m_frame.m_y+t_nodeSibling.m_frame.m_width*0.5-(this.m_superview.m_localMouse[1]);
						if(Math.sqrt(t_dx*t_dx+t_dy*t_dy)<t_nodeSibling.m_frame.m_width*0.5){
							t_foundSibling=true;
							var t_foundLine=false;
							var t_5=this.m_superview.m_subviews;
							var t_6=0;
							while(t_6<t_5.length){
								var t_sibling22=t_5[t_6];
								t_6=t_6+1;
								var t_lineSibling=object_downcast((t_sibling22),c_LineView);
								if(t_lineSibling==null){
									continue;
								}
								if(t_lineSibling.m_nodes[0]==(t_nodeSibling) && t_lineSibling.m_nodes[1]==(this) || t_lineSibling.m_nodes[1]==(t_nodeSibling) && t_lineSibling.m_nodes[0]==(this)){
									this.m_superview.p_RemoveSubview(t_lineSibling);
									t_foundLine=true;
									break;
								}
							}
							if(t_foundLine==false){
								var t_lineView=c_LineView.m_new.call(new c_LineView,(t_nodeSibling),(this));
								this.m_superview.p_AddSubview(t_lineView);
								object_downcast((this.m_superview.m_superview),c_NodeAreaView).p_SortSubviews();
							}
							this.m_targetFrame.m_x=(this.m_startDragPosition[0]);
							this.m_targetFrame.m_y=(this.m_startDragPosition[1]);
							c_UIEvent.m_eventStack.p_Push4(c_UIEvent.m_new2.call(new c_UIEvent,(this),16,null));
							break;
						}
					}
					if(t_foundSibling==false){
						if(bb_input_MouseX()>(bb_graphics_DeviceWidth()-200) && bb_input_MouseY()>(bb_graphics_DeviceHeight()-200)){
							if(ConfirmDialog("Delete node? Are you sure?")){
								var t_7=this.m_superview.m_subviews;
								var t_8=0;
								while(t_8<t_7.length){
									var t_sibling3=t_7[t_8];
									t_8=t_8+1;
									if(t_sibling3==(this)){
										continue;
									}
									var t_lineSibling2=object_downcast((t_sibling3),c_LineView);
									if((t_lineSibling2)!=null){
										if(t_lineSibling2.m_nodes[0]==(this)){
											this.m_superview.p_RemoveSubview(t_sibling3);
										}else{
											if(t_lineSibling2.m_nodes[1]==(this)){
												this.m_superview.p_RemoveSubview(t_sibling3);
											}
										}
									}
									var t_nodeSibling2=object_downcast((t_sibling3),c_NodeView);
									if(t_nodeSibling2==null){
										continue;
									}
									if(t_nodeSibling2.m_parentNode==this){
										t_nodeSibling2.m_parentNode=null;
									}
								}
								this.m_superview.p_RemoveSubview(this);
								c_UIEvent.m_eventStack.p_Push4(c_UIEvent.m_new2.call(new c_UIEvent,(this),17,null));
							}
						}
					}
				}
			}else{
				if(t_1==13){
					print("Stop mouse edge drag");
				}else{
					if(t_1==11){
						if(this.m_draggable){
							if(t_ev.m_sender==null){
								this.m_startDragPosition[0]=((this.m_frame.m_x)|0);
								this.m_startDragPosition[1]=((this.m_frame.m_y)|0);
								this.m_dragging=true;
							}
						}
					}else{
						if(t_1==12){
							print("Mouse Edge Drag ");
							if(this.m_draggable){
								if(t_ev.m_sender==(this)){
									var t_p=[(this.m_localMouse[0]),(this.m_localMouse[1])];
									var t_radius=this.m_frame.m_width*0.5;
									var t_dx2=t_p[0]-t_radius;
									var t_dy2=t_p[1]-t_radius;
									var t_dist=Math.sqrt(t_dx2*t_dx2+t_dy2*t_dy2);
									var t_oldx=this.m_frame.m_x+t_radius;
									var t_oldy=this.m_frame.m_y+t_radius;
									this.m_frame.m_width=t_dist*2.0;
									if(this.m_frame.m_width<20.0){
										this.m_frame.m_width=20.0;
									}
									if(this.m_frame.m_width>300.0){
										this.m_frame.m_width=300.0;
									}
									this.m_weighting=(this.m_frame.m_width-20.0)/280.0;
									this.m_weighting=((this.m_weighting*10.0)|0)/10.0;
									this.m_frame.m_width=280.0*this.m_weighting+20.0;
									this.p_SetPosFromCenter(t_oldx,t_oldy);
								}
							}
							if(t_ev.m_sender==null){
								t_ev.m_sender=(this);
							}
							if((this)==c_UIView.m_root){
								c_UIEvent.m_eventStack.p_Push4(t_ev);
							}else{
								this.m_superview.p_SendEvent(t_ev);
							}
						}
					}
				}
			}
		}
	}
}
c_NodeView.m_FindFromId=function(t_list,t_id){
	var t_=t_list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_n=t_.p_NextObject();
		if(t_n.m_id==t_id){
			return t_n;
		}
	}
	return null;
}
c_NodeView.m_FromId=function(t_id,t_list){
	var t_=t_list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_n=t_.p_NextObject();
		if(t_n.m_id==t_id){
			return t_n;
		}
	}
	return null;
}
c_NodeView.prototype.p_GetChildNodes=function(){
	var t_childNodes=c_List4.m_new.call(new c_List4);
	var t_=this.m_superview.m_subviews;
	var t_2=0;
	while(t_2<t_.length){
		var t_sibling=t_[t_2];
		t_2=t_2+1;
		var t_lineSibling=object_downcast((t_sibling),c_LineView);
		if(t_lineSibling==null){
			continue;
		}
		if(t_lineSibling.m_nodes[0]==(this)){
			t_childNodes.p_AddLast4(object_downcast((t_lineSibling.m_nodes[1]),c_NodeView));
		}
	}
	return t_childNodes;
}
c_NodeView.prototype.p_RemoveExample=function(t_ex){
	this.m_examples.p_RemoveEach(t_ex);
	if(this.m_currentExample==t_ex){
		this.m_currentExample=null;
	}
}

// Steve: next bit is all about indicating node selection

c_NodeView.prototype.p_Draw=function(t_rect,t_tint){
	if(this.m_selected){
		var t_offset=3.0*(1.0/this.m_transform[0]);
		
		// Steve: originally, colour was set to same as current node!
		// bb_graphics_SetColor(this.m_tintColor.m_r,this.m_tintColor.m_g,this.m_tintColor.m_b);
		// bb_graphics_SetColor(242,153,10); // Steve orange
		
		bb_graphics_SetColor(nodeSelectedCircleColourRed,nodeSelectedCircleColourGreen,nodeSelectedCircleColourBlue); // Steve: set colour
				
		// Steve: draws inner selection line around a clicked node!
		// bb_graphics_DrawOval(t_rect.m_x-t_offset,t_rect.m_y-t_offset,t_rect.m_width+t_offset*8.0,t_rect.m_width+t_offset*8.0,false); // original
		// bb_graphics_DrawOval(t_rect.m_x-t_offset,t_rect.m_y-t_offset,t_rect.m_width+t_offset*2.0,t_rect.m_width+t_offset*2.0,false); // Steve version
		
		bb_graphics_DrawOval(t_rect.m_x-t_offset,t_rect.m_y-t_offset,t_rect.m_width+t_offset*selectedOvalLineOffsetInner,t_rect.m_width+t_offset*selectedOvalLineOffsetInner,false);
		
		if(this.m_current){
			//bb_graphics_DrawOval(t_rect.m_x-t_offset*2.0,t_rect.m_y-t_offset*2.0,t_rect.m_width+t_offset*4.0,t_rect.m_width+t_offset*4.0,false); // original 
			// bb_graphics_DrawOval(t_rect.m_x-t_offset*6.0,t_rect.m_y-t_offset*6.0,t_rect.m_width+t_offset*12.0,t_rect.m_width+t_offset*12.0,false); // Steve version
			bb_graphics_DrawOval(t_rect.m_x-t_offset*selectedOvalLineOffsetOuter,t_rect.m_y-t_offset*selectedOvalLineOffsetOuter,t_rect.m_width+t_offset*(selectedOvalLineOffsetOuter*2),t_rect.m_width+t_offset*(selectedOvalLineOffsetOuter*2),false);
		}
	}
	if(this.p_title2()==""){
		this.p_title("no name");
	}
	c_UIButton.prototype.p_Draw.call(this,t_rect,t_tint);
	if(this.p_title2()=="no name"){
		this.p_title("");
	}
}
c_NodeView.prototype.p_PointInside=function(t_x,t_y,t_rect){
	var t_p=this.p_ConvertPointToView(t_x,t_y);
	var t_radius=.0;
	var t_dx=.0;
	var t_dy=.0;
	if(t_rect==null){
		t_radius=this.m_frame.m_width*0.5;
		t_dx=t_p[0]-t_radius;
		t_dy=t_p[1]-t_radius;
	}else{
		t_radius=t_rect.m_width*0.5;
		t_dx=t_p[0]-(t_rect.m_x+t_radius);
		t_dy=t_p[1]-(t_rect.m_y+t_radius);
	}
	var t_dist=Math.sqrt(t_dx*t_dx+t_dy*t_dy);
	if(t_dist>t_radius){
		if(t_dist>t_radius+30.0){
			return [];
		}
		return [t_p[0],t_p[1],1.0];
	}
	return t_p;
}
c_NodeView.prototype.p_PointInside2=function(t_x,t_y){
	return this.p_PointInside(t_x,t_y,null);
}
c_NodeView.prototype.p_PointInsideDrag2=function(t_x,t_y){
	return this.p_PointInside(t_x,t_y,null);
}
c_NodeView.prototype.p_PointInsideDrag=function(t_x,t_y,t_rect){
	var t_p=this.p_ConvertPointToView(t_x,t_y);
	var t_radius=.0;
	var t_dx=.0;
	var t_dy=.0;
	if(t_rect==null){
		t_radius=this.m_frame.m_width*0.5;
		t_dx=t_p[0]-t_radius;
		t_dy=t_p[1]-t_radius;
	}else{
		t_radius=t_rect.m_width*0.5;
		t_dx=t_p[0]-(t_rect.m_x+t_radius);
		t_dy=t_p[1]-(t_rect.m_y+t_radius);
	}
	var t_dist=Math.sqrt(t_dx*t_dx+t_dy*t_dy);
	if(t_dist>t_radius){
		if(t_dist>t_radius+30.0){
			return [];
		}
		return [t_p[0],t_p[1],1.0];
	}
	return t_p;
}
function c_LineView(){
	c_UIView.call(this);
	this.m_nodes=new_object_array(2);
	this.m_dotted=false;
}
c_LineView.prototype=extend_class(c_UIView);
c_LineView.m_new=function(t_node1,t_node2){
	c_UIView.m_new3.call(this,0.0,0.0,100.0,100.0);
	this.m_nodes[0]=t_node1;
	this.m_nodes[1]=t_node2;
	this.m_controlType="lineview";
	return this;
}
c_LineView.m_new2=function(t_x,t_y,t_w,t_h){
	c_UIView.m_new3.call(this,t_x,t_y,t_w,t_h);
	this.m_controlType="lineview";
	this.m_targetSpeed=1.0;
	return this;
}
c_LineView.m_new3=function(){
	c_UIView.m_new.call(this);
	return this;
}
c_LineView.m_DrawDottedLine=function(t_x1,t_y1,t_x2,t_y2,t_thickness){
	var t_dx=t_x2-t_x1;
	var t_dy=t_y2-t_y1;
	var t_d=Math.sqrt(t_dx*t_dx+t_dy*t_dy);
	var t_vx=(t_dx)/t_d;
	var t_vy=(t_dy)/t_d;
	for(var t_i=0;(t_i)<=t_d;t_i=t_i+16){
		var t_l=6;
		if((t_i+t_l)>t_d){
			t_l=((t_d-(t_i))|0);
		}
		bb_graphics_DrawLine((t_x1)+t_vx*(t_i),(t_y1)+t_vy*(t_i),(t_x1)+t_vx*(t_i+t_l),(t_y1)+t_vy*(t_i+t_l),t_thickness,false);
	}
}
c_LineView.prototype.p_Draw=function(t_rect,t_tint){
	c_UIView.prototype.p_Draw.call(this,t_rect,t_tint);
	var t_parent=object_downcast((this.m_nodes[0]),c_NodeView);
	bb_graphics_SetColor(t_parent.m_tintColor.m_r,t_parent.m_tintColor.m_g,t_parent.m_tintColor.m_b);
	if(!this.m_dotted){
		bb_graphics_DrawLine(t_rect.m_x,t_rect.m_y,t_rect.m_width,t_rect.m_height,1.0,true);
	}else{
		c_LineView.m_DrawDottedLine(((t_rect.m_x)|0),((t_rect.m_y)|0),((t_rect.m_width)|0),((t_rect.m_height)|0),2.0);
	}
}
c_LineView.prototype.p_Update=function(){
	c_UIView.prototype.p_Update.call(this);
	this.m_frame.m_x=this.m_nodes[0].m_frame.m_x+this.m_nodes[0].m_frame.m_width*0.5;
	this.m_frame.m_y=this.m_nodes[0].m_frame.m_y+this.m_nodes[0].m_frame.m_width*0.5;
	this.m_frame.m_width=this.m_nodes[1].m_frame.m_x+this.m_nodes[1].m_frame.m_width*0.5;
	this.m_frame.m_height=this.m_nodes[1].m_frame.m_y+this.m_nodes[1].m_frame.m_width*0.5;
}
function c_AngelFont(){
	Object.call(this);
	this.m_iniText="";
	this.m_kernPairs=c_IntMap2.m_new.call(new c_IntMap2);
	this.m_chars=new_object_array(256);
	this.m_height=0;
	this.m_heightOffset=9999;
	this.m_image=new_object_array(1);
	this.m_name="";
	this.m_xOffset=0;
	this.m_useKerning=true;
}
c_AngelFont.m_err="";
c_AngelFont.m_current=null;
c_AngelFont.m_firstKp=null;
c_AngelFont.prototype.p_LoadFont=function(t_url){
	c_AngelFont.m_err="";
	c_AngelFont.m_current=this;
	this.m_iniText=bb_app_LoadString(t_url+".txt");
	var t_lines=this.m_iniText.split(String.fromCharCode(10));
	var t_=t_lines;
	var t_2=0;
	while(t_2<t_.length){
		var t_line=t_[t_2];
		t_2=t_2+1;
		t_line=string_trim(t_line);
		if(string_startswith(t_line,"id,") || t_line==""){
			continue;
		}
		if(string_startswith(t_line,"first,")){
			continue;
		}
		var t_data=t_line.split(",");
		for(var t_i=0;t_i<t_data.length;t_i=t_i+1){
			t_data[t_i]=string_trim(t_data[t_i]);
		}
		c_AngelFont.m_err=c_AngelFont.m_err+(String(t_data.length)+",");
		if(t_data.length>0){
			if(t_data.length==3){
				var t_first=parseInt((t_data[0]),10);
				c_AngelFont.m_firstKp=this.m_kernPairs.p_Get(t_first);
				if(c_AngelFont.m_firstKp==null){
					this.m_kernPairs.p_Add2(t_first,c_IntMap.m_new.call(new c_IntMap));
					c_AngelFont.m_firstKp=this.m_kernPairs.p_Get(t_first);
				}
				var t_second=parseInt((t_data[1]),10);
				c_AngelFont.m_firstKp.p_Add(t_second,c_KernPair.m_new.call(new c_KernPair,parseInt((t_data[0]),10),parseInt((t_data[1]),10),parseInt((t_data[2]),10)));
			}else{
				if(t_data.length>=8){
					this.m_chars[parseInt((t_data[0]),10)]=c_Char.m_new.call(new c_Char,parseInt((t_data[1]),10),parseInt((t_data[2]),10),parseInt((t_data[3]),10),parseInt((t_data[4]),10),parseInt((t_data[5]),10),parseInt((t_data[6]),10),parseInt((t_data[7]),10),parseInt((t_data[8]),10));
					var t_ch=this.m_chars[parseInt((t_data[0]),10)];
					if(t_ch.m_height>this.m_height){
						this.m_height=t_ch.m_height;
					}
					if(t_ch.m_yOffset<this.m_heightOffset){
						this.m_heightOffset=t_ch.m_yOffset;
					}
				}
			}
		}
	}
	this.m_image[0]=bb_graphics_LoadImage(t_url+".png",1,c_Image.m_DefaultFlags);
}
c_AngelFont.m__list=null;
c_AngelFont.m_new=function(t_url){
	if(t_url!=""){
		this.p_LoadFont(t_url);
		this.m_name=t_url;
		c_AngelFont.m__list.p_Insert(t_url,this);
	}
	return this;
}
c_AngelFont.prototype.p_LoadFontXml=function(t_url){
	c_AngelFont.m_current=this;
	this.m_iniText=bb_app_LoadString(t_url+".fnt");
	var t_error=c_XMLError.m_new.call(new c_XMLError);
	var t_pageCount=0;
	var t_config=bb_xml_ParseXML(this.m_iniText,null,1);
	if(t_config==null && t_error.m_error){
		print(t_error.p_ToString());
	}else{
		var t_nodes=t_config.p_GetChildrenAtPath("chars/char");
		var t_=t_nodes.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_node=t_.p_NextObject();
			var t_id=parseInt((t_node.p_GetAttribute("id")),10);
			var t_page=parseInt((t_node.p_GetAttribute("page")),10);
			if(t_pageCount<t_page){
				t_pageCount=t_page;
			}
			this.m_chars[t_id]=c_Char.m_new.call(new c_Char,parseInt((t_node.p_GetAttribute("x")),10),parseInt((t_node.p_GetAttribute("y")),10),parseInt((t_node.p_GetAttribute("width")),10),parseInt((t_node.p_GetAttribute("height")),10),parseInt((t_node.p_GetAttribute("xoffset")),10),parseInt((t_node.p_GetAttribute("yoffset")),10),parseInt((t_node.p_GetAttribute("xadvance")),10),t_page);
			var t_ch=this.m_chars[t_id];
			if(t_ch.m_height>this.m_height){
				this.m_height=t_ch.m_height;
			}
			if(t_ch.m_yOffset<this.m_heightOffset){
				this.m_heightOffset=t_ch.m_yOffset;
			}
		}
		t_nodes=t_config.p_GetChildrenAtPath("kernings/kerning");
		var t_2=t_nodes.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_node2=t_2.p_NextObject();
			var t_first=parseInt((t_node2.p_GetAttribute("first")),10);
			c_AngelFont.m_firstKp=this.m_kernPairs.p_Get(t_first);
			if(c_AngelFont.m_firstKp==null){
				this.m_kernPairs.p_Add2(t_first,c_IntMap.m_new.call(new c_IntMap));
				c_AngelFont.m_firstKp=this.m_kernPairs.p_Get(t_first);
			}
			var t_second=parseInt((t_node2.p_GetAttribute("second")),10);
			c_AngelFont.m_firstKp.p_Add(t_second,c_KernPair.m_new.call(new c_KernPair,t_first,t_second,parseInt((t_node2.p_GetAttribute("amount")),10)));
		}
		if(t_pageCount==0){
			this.m_image[0]=bb_graphics_LoadImage(t_url+".png",1,c_Image.m_DefaultFlags);
			if(this.m_image[0]==null){
				this.m_image[0]=bb_graphics_LoadImage(t_url+"_0.png",1,c_Image.m_DefaultFlags);
			}
		}else{
			for(var t_page2=0;t_page2<=t_pageCount;t_page2=t_page2+1){
				if(this.m_image.length<t_page2+1){
					this.m_image=resize_object_array(this.m_image,t_page2+1);
				}
				this.m_image[t_page2]=bb_graphics_LoadImage(t_url+"_"+String(t_page2)+".png",1,c_Image.m_DefaultFlags);
			}
		}
	}
}
c_AngelFont.prototype.p_TextHeight=function(t_txt){
	var t_h=0;
	for(var t_i=0;t_i<t_txt.length;t_i=t_i+1){
		var t_asc=t_txt.charCodeAt(t_i);
		var t_ac=this.m_chars[t_asc];
		if(t_ac.m_height+t_ac.m_yOffset>t_h){
			t_h=t_ac.m_height+t_ac.m_yOffset;
		}
	}
	return t_h;
}
c_AngelFont.m_secondKp=null;
c_AngelFont.prototype.p_DrawText=function(t_txt,t_x,t_y){
	var t_prevChar=0;
	this.m_xOffset=0;
	for(var t_i=0;t_i<t_txt.length;t_i=t_i+1){
		var t_asc=t_txt.charCodeAt(t_i);
		var t_ac=this.m_chars[t_asc];
		var t_thisChar=t_asc;
		if(t_ac!=null){
			if(this.m_useKerning){
				c_AngelFont.m_firstKp=this.m_kernPairs.p_Get(t_prevChar);
				if(c_AngelFont.m_firstKp!=null){
					c_AngelFont.m_secondKp=c_AngelFont.m_firstKp.p_Get(t_thisChar);
					if(c_AngelFont.m_secondKp!=null){
						this.m_xOffset+=c_AngelFont.m_secondKp.m_amount;
					}
				}
			}
			t_ac.p_Draw3(this.m_image[t_ac.m_page],t_x+this.m_xOffset,t_y);
			this.m_xOffset+=t_ac.m_xAdvance;
			t_prevChar=t_thisChar;
		}
	}
}
c_AngelFont.prototype.p_TextWidth=function(t_txt){
	var t_prevChar=0;
	var t_width=0;
	for(var t_i=0;t_i<t_txt.length;t_i=t_i+1){
		var t_asc=t_txt.charCodeAt(t_i);
		var t_ac=this.m_chars[t_asc];
		var t_thisChar=t_asc;
		if(t_ac!=null){
			if(this.m_useKerning){
				var t_firstKp=this.m_kernPairs.p_Get(t_prevChar);
				if(t_firstKp!=null){
					var t_secondKp=t_firstKp.p_Get(t_thisChar);
					if(t_secondKp!=null){
						this.m_xOffset+=t_secondKp.m_amount;
					}
				}
			}
			t_width+=t_ac.m_xAdvance;
			t_prevChar=t_thisChar;
		}
	}
	return t_width;
}
c_AngelFont.prototype.p_DrawText2=function(t_txt,t_x,t_y,t_align){
	this.m_xOffset=0;
	var t_1=t_align;
	if(t_1==1){
		this.p_DrawText(t_txt,t_x-((this.p_TextWidth(t_txt)/2)|0),t_y);
	}else{
		if(t_1==2){
			this.p_DrawText(t_txt,t_x-this.p_TextWidth(t_txt),t_y);
		}else{
			if(t_1==0){
				this.p_DrawText(t_txt,t_x,t_y);
			}
		}
	}
}
function bb_app_LoadString(t_path){
	return bb_app__game.LoadString(bb_data_FixDataPath(t_path));
}
function c_KernPair(){
	Object.call(this);
	this.m_first="";
	this.m_second="";
	this.m_amount=0;
}
c_KernPair.m_new=function(t_first,t_second,t_amount){
	this.m_first=String(t_first);
	this.m_second=String(t_second);
	this.m_amount=t_amount;
	return this;
}
c_KernPair.m_new2=function(){
	return this;
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	return this;
}
c_Map.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map.prototype.p_RotateLeft=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_RotateRight=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_InsertFixup=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map.prototype.p_Add=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return false;
			}
		}
	}
	t_node=c_Node3.m_new.call(new c_Node3,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_IntMap(){
	c_Map.call(this);
}
c_IntMap.prototype=extend_class(c_Map);
c_IntMap.m_new=function(){
	c_Map.m_new.call(this);
	return this;
}
c_IntMap.prototype.p_Compare=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_Map2(){
	Object.call(this);
	this.m_root=null;
}
c_Map2.m_new=function(){
	return this;
}
c_Map2.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map2.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map2.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
c_Map2.prototype.p_RotateLeft2=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map2.prototype.p_RotateRight2=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map2.prototype.p_InsertFixup2=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight2(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft2(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map2.prototype.p_Add2=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return false;
			}
		}
	}
	t_node=c_Node2.m_new.call(new c_Node2,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup2(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
function c_IntMap2(){
	c_Map2.call(this);
}
c_IntMap2.prototype=extend_class(c_Map2);
c_IntMap2.m_new=function(){
	c_Map2.m_new.call(this);
	return this;
}
c_IntMap2.prototype.p_Compare=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_Node2(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node2.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node2.m_new2=function(){
	return this;
}
function c_Node3(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node3.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node3.m_new2=function(){
	return this;
}
function c_Char(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
	this.m_width=0;
	this.m_height=0;
	this.m_xOffset=0;
	this.m_yOffset=0;
	this.m_xAdvance=0;
	this.m_page=0;
}
c_Char.m_new=function(t_x,t_y,t_w,t_h,t_xoff,t_yoff,t_xadv,t_page){
	this.m_x=t_x;
	this.m_y=t_y;
	this.m_width=t_w;
	this.m_height=t_h;
	this.m_xOffset=t_xoff;
	this.m_yOffset=t_yoff;
	this.m_xAdvance=t_xadv;
	this.m_page=t_page;
	return this;
}
c_Char.m_new2=function(){
	return this;
}
c_Char.prototype.p_Draw3=function(t_fontImage,t_linex,t_liney){
	bb_graphics_DrawImageRect(t_fontImage,(t_linex+this.m_xOffset),(t_liney+this.m_yOffset),this.m_x,this.m_y,this.m_width,this.m_height,0);
	return 0;
}
function c_Map3(){
	Object.call(this);
	this.m_root=null;
}
c_Map3.m_new=function(){
	return this;
}
c_Map3.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map3.prototype.p_RotateLeft3=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map3.prototype.p_RotateRight3=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map3.prototype.p_InsertFixup3=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight3(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft3(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map3.prototype.p_Set=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node4.m_new.call(new c_Node4,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup3(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map3.prototype.p_Insert=function(t_key,t_value){
	return this.p_Set(t_key,t_value);
}
function c_StringMap(){
	c_Map3.call(this);
}
c_StringMap.prototype=extend_class(c_Map3);
c_StringMap.m_new=function(){
	c_Map3.m_new.call(this);
	return this;
}
c_StringMap.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Node4(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node4.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node4.m_new2=function(){
	return this;
}
function c_XMLError(){
	Object.call(this);
	this.m_error=false;
	this.m_message="";
	this.m_line=0;
	this.m_column=0;
	this.m_offset=0;
}
c_XMLError.m_new=function(){
	return this;
}
c_XMLError.prototype.p_Reset=function(){
	this.m_error=false;
	this.m_message="";
	this.m_line=-1;
	this.m_column=-1;
	this.m_offset=-1;
}
c_XMLError.prototype.p_Set2=function(t_message,t_line,t_column,t_offset){
	this.m_error=true;
	this.m_message=t_message;
	this.m_line=t_line;
	this.m_column=t_column;
	this.m_offset=t_offset;
}
c_XMLError.prototype.p_ToString=function(){
	if(this.m_error==false){
		return "";
	}
	var t_buffer=c_XMLStringBuffer.m_new.call(new c_XMLStringBuffer,256);
	t_buffer.p_Add4("XMLError: ");
	if((this.m_message.length)!=0){
		t_buffer.p_Add4(this.m_message);
	}else{
		t_buffer.p_Add4("unknown error");
	}
	t_buffer.p_Add4(" [line:");
	if(this.m_line>-1){
		t_buffer.p_Add4(String(this.m_line));
	}else{
		t_buffer.p_Add4("??");
	}
	t_buffer.p_Add4("  column:");
	if(this.m_column>-1){
		t_buffer.p_Add4(String(this.m_column));
	}else{
		t_buffer.p_Add4("??");
	}
	t_buffer.p_Add4("  offset:");
	if(this.m_offset>-1){
		t_buffer.p_Add4(String(this.m_offset)+"]");
	}else{
		t_buffer.p_Add4("??]");
	}
	return t_buffer.p_value();
}
function c_XMLNode(){
	Object.call(this);
	this.m_value="";
	this.m_name="";
	this.m_valid=false;
	this.m_doc=null;
	this.m_path="";
	this.m_pathList=null;
	this.m_parent=null;
	this.m_line=0;
	this.m_column=0;
	this.m_offset=0;
	this.m_attributes=c_StringMap3.m_new.call(new c_StringMap3);
	this.m_lastChild=null;
	this.m_nextSibling=null;
	this.m_previousSibling=null;
	this.m_firstChild=null;
	this.m_children=c_List2.m_new.call(new c_List2);
}
c_XMLNode.m_new=function(t_name,t_valid){
	if((t_name.length)!=0){
		this.m_name=t_name.toLowerCase();
	}
	this.m_valid=t_valid;
	return this;
}
c_XMLNode.m_new2=function(){
	return this;
}
c_XMLNode.prototype.p_SetAttribute=function(t_id){
	if(this.m_valid==false){
		return;
	}
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		this.m_attributes.p_Insert3(t_id,c_XMLAttribute.m_new.call(new c_XMLAttribute,t_id,""));
	}else{
		t_attribute.m_value="";
	}
}
c_XMLNode.prototype.p_SetAttribute2=function(t_id,t_value){
	if(this.m_valid==false){
		return;
	}
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		this.m_attributes.p_Insert3(t_id,c_XMLAttribute.m_new.call(new c_XMLAttribute,t_id,String((t_value)?1:0)));
	}else{
		t_attribute.m_value=String((t_value)?1:0);
	}
}
c_XMLNode.prototype.p_SetAttribute3=function(t_id,t_value){
	if(this.m_valid==false){
		return;
	}
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		this.m_attributes.p_Insert3(t_id,c_XMLAttribute.m_new.call(new c_XMLAttribute,t_id,String(t_value)));
	}else{
		t_attribute.m_value=String(t_value);
	}
}
c_XMLNode.prototype.p_SetAttribute4=function(t_id,t_value){
	if(this.m_valid==false){
		return;
	}
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		this.m_attributes.p_Insert3(t_id,c_XMLAttribute.m_new.call(new c_XMLAttribute,t_id,String(t_value)));
	}else{
		t_attribute.m_value=String(t_value);
	}
}
c_XMLNode.prototype.p_SetAttribute5=function(t_id,t_value){
	if(this.m_valid==false){
		return;
	}
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		this.m_attributes.p_Insert3(t_id,c_XMLAttribute.m_new.call(new c_XMLAttribute,t_id,t_value));
	}else{
		t_attribute.m_value=t_value;
	}
}
c_XMLNode.prototype.p_AddChild=function(t_name,t_attributes){
	if(this.m_valid==false){
		return null;
	}
	var t_child=c_XMLNode.m_new.call(new c_XMLNode,t_name,true);
	t_child.m_doc=this.m_doc;
	t_child.m_parent=this;
	t_child.m_path=this.m_path+"/"+t_child.m_name;
	t_child.m_pathList=this.m_doc.m_paths.p_Get2(t_child.m_path);
	if(t_child.m_pathList==null){
		t_child.m_pathList=c_List2.m_new.call(new c_List2);
		this.m_doc.m_paths.p_Set3(t_child.m_path,t_child.m_pathList);
	}
	t_child.m_pathList.p_AddLast2(t_child);
	if((t_attributes.length)!=0){
		var t_query=c_XMLAttributeQuery.m_new.call(new c_XMLAttributeQuery,t_attributes);
		if(t_query.m_count>0){
			for(var t_index=0;t_index<t_query.m_items.length;t_index=t_index+1){
				t_child.p_SetAttribute5(t_query.m_items[t_index].m_id,t_query.m_items[t_index].m_value);
			}
		}
	}
	if((this.m_lastChild)!=null){
		this.m_lastChild.m_nextSibling=t_child;
		t_child.m_previousSibling=this.m_lastChild;
		this.m_lastChild=t_child;
	}else{
		this.m_firstChild=t_child;
		this.m_lastChild=t_child;
	}
	this.m_children.p_AddLast2(t_child);
	return t_child;
}
c_XMLNode.prototype.p_GetChildrenAtPath=function(t_path){
	var t_result=c_List2.m_new.call(new c_List2);
	if(t_path.length==0){
		return t_result;
	}
	var t_pathList=this.m_doc.m_paths.p_Get2(this.m_path+"/"+t_path);
	if(t_pathList==null || t_pathList.p_IsEmpty()){
		return t_result;
	}
	var t_=t_pathList.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_node=t_.p_NextObject();
		t_result.p_AddLast2(t_node);
	}
	return t_result;
}
c_XMLNode.prototype.p_GetXMLAttribute=function(t_id){
	return this.m_attributes.p_Get2(t_id.toLowerCase());
}
c_XMLNode.prototype.p_GetChildrenAtPath2=function(t_path,t_attributes){
	var t_result=c_List2.m_new.call(new c_List2);
	if(t_path.length==0){
		return t_result;
	}
	var t_query=c_XMLAttributeQuery.m_new.call(new c_XMLAttributeQuery,t_attributes);
	var t_pathList=this.m_doc.m_paths.p_Get2(this.m_path+"/"+t_path);
	if(t_pathList==null || t_pathList.p_IsEmpty()){
		return t_result;
	}
	var t_=t_pathList.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_node=t_.p_NextObject();
		if(t_query.p_Test(t_node)){
			t_result.p_AddLast2(t_node);
		}
	}
	return t_result;
}
c_XMLNode.prototype.p_GetAttribute=function(t_id){
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		return "";
	}
	return t_attribute.m_value;
}
c_XMLNode.prototype.p_GetAttribute2=function(t_id,t_defaultValue){
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		return t_defaultValue;
	}
	return t_attribute.m_value=="true" || parseInt((t_attribute.m_value),10)==1;
}
c_XMLNode.prototype.p_GetAttribute3=function(t_id,t_defaultValue){
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		return t_defaultValue;
	}
	return parseInt((t_attribute.m_value),10);
}
c_XMLNode.prototype.p_GetAttribute4=function(t_id,t_defaultValue){
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		return t_defaultValue;
	}
	return parseFloat(t_attribute.m_value);
}
c_XMLNode.prototype.p_GetAttribute5=function(t_id,t_defaultValue){
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		return t_defaultValue;
	}
	return t_attribute.m_value;
}
function c_XMLDoc(){
	c_XMLNode.call(this);
	this.m_nullNode=null;
	this.m_version="";
	this.m_encoding="";
	this.m_paths=c_StringMap2.m_new.call(new c_StringMap2);
}
c_XMLDoc.prototype=extend_class(c_XMLNode);
c_XMLDoc.m_new=function(t_name,t_version,t_encoding){
	c_XMLNode.m_new2.call(this);
	this.m_valid=true;
	this.m_nullNode=c_XMLNode.m_new.call(new c_XMLNode,"",false);
	this.m_nullNode.m_doc=this;
	this.m_name=t_name.toLowerCase();
	this.m_version=t_version;
	this.m_encoding=t_encoding;
	this.m_path=t_name;
	this.m_pathList=c_List2.m_new.call(new c_List2);
	this.m_pathList.p_AddLast2(this);
	this.m_paths.p_Insert2(this.m_path,this.m_pathList);
	return this;
}
c_XMLDoc.m_new2=function(){
	c_XMLNode.m_new2.call(this);
	return this;
}
function c_XMLStringBuffer(){
	Object.call(this);
	this.m_chunk=128;
	this.m_count=0;
	this.m_data=[];
	this.m_dirty=0;
	this.m_cache="";
}
c_XMLStringBuffer.m_new=function(t_chunk){
	this.m_chunk=t_chunk;
	return this;
}
c_XMLStringBuffer.prototype.p_Length=function(){
	return this.m_count;
}
c_XMLStringBuffer.prototype.p_Last=function(t_defaultValue){
	if(this.m_count==0){
		return t_defaultValue;
	}
	return this.m_data[this.m_count-1];
}
c_XMLStringBuffer.prototype.p_Add3=function(t_asc){
	if(this.m_count==this.m_data.length){
		this.m_data=resize_number_array(this.m_data,this.m_data.length+this.m_chunk);
	}
	this.m_data[this.m_count]=t_asc;
	this.m_count+=1;
	this.m_dirty=1;
}
c_XMLStringBuffer.prototype.p_Add4=function(t_text){
	if(t_text.length==0){
		return;
	}
	if(this.m_count+t_text.length>=this.m_data.length){
		this.m_data=resize_number_array(this.m_data,(((this.m_data.length)+(this.m_chunk)*Math.ceil((t_text.length)/(this.m_chunk)))|0));
	}
	for(var t_textIndex=0;t_textIndex<t_text.length;t_textIndex=t_textIndex+1){
		this.m_data[this.m_count]=t_text.charCodeAt(t_textIndex);
		this.m_count+=1;
	}
	this.m_dirty=1;
}
c_XMLStringBuffer.prototype.p_Add5=function(t_text,t_offset,t_suggestedLength){
	var t_realLength=t_text.length-t_offset;
	if(t_suggestedLength>0 && t_suggestedLength<t_realLength){
		t_realLength=t_suggestedLength;
	}
	if(t_realLength==0){
		return;
	}
	if(this.m_count+t_realLength>=this.m_data.length){
		this.m_data=resize_number_array(this.m_data,(((this.m_data.length)+(this.m_chunk)*Math.ceil((t_realLength)/(this.m_chunk)))|0));
	}
	for(var t_textIndex=t_offset;t_textIndex<t_offset+t_realLength;t_textIndex=t_textIndex+1){
		this.m_data[this.m_count]=t_text.charCodeAt(t_textIndex);
		this.m_count+=1;
	}
	this.m_dirty=1;
}
c_XMLStringBuffer.prototype.p_value=function(){
	if((this.m_dirty)!=0){
		this.m_dirty=0;
		if(this.m_count==0){
			this.m_cache="";
		}else{
			this.m_cache=string_fromchars(this.m_data.slice(0,this.m_count));
		}
	}
	return this.m_cache;
}
c_XMLStringBuffer.prototype.p_Clear=function(){
	this.m_count=0;
	this.m_cache="";
	this.m_dirty=0;
}
c_XMLStringBuffer.prototype.p_Trim=function(){
	if(this.m_count==0){
		return false;
	}
	if(this.m_count==1 && (this.m_data[0]==32 || this.m_data[0]==9) || this.m_count==2 && (this.m_data[0]==32 || this.m_data[0]==9) && (this.m_data[1]==32 || this.m_data[1]==9)){
		this.p_Clear();
		return true;
	}
	var t_startIndex=0;
	for(t_startIndex=0;t_startIndex<this.m_count;t_startIndex=t_startIndex+1){
		if(this.m_data[t_startIndex]!=32 && this.m_data[t_startIndex]!=9){
			break;
		}
	}
	if(t_startIndex==this.m_count){
		this.p_Clear();
		return true;
	}
	var t_endIndex=0;
	for(t_endIndex=this.m_count-1;t_endIndex>=0;t_endIndex=t_endIndex+-1){
		if(this.m_data[t_endIndex]!=32 && this.m_data[t_endIndex]!=9){
			break;
		}
	}
	if(t_startIndex==0 && t_endIndex==this.m_count-1){
		return false;
	}
	this.m_count=t_endIndex-t_startIndex+1;
	if(t_startIndex>0){
		for(var t_trimIndex=0;t_trimIndex<this.m_count;t_trimIndex=t_trimIndex+1){
			this.m_data[t_trimIndex]=this.m_data[t_trimIndex+t_startIndex];
		}
	}
	return true;
}
function c_List2(){
	Object.call(this);
	this.m__head=(c_HeadNode2.m_new.call(new c_HeadNode2));
}
c_List2.m_new=function(){
	return this;
}
c_List2.prototype.p_AddLast2=function(t_data){
	return c_Node5.m_new.call(new c_Node5,this.m__head,this.m__head.m__pred,t_data);
}
c_List2.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast2(t_t);
	}
	return this;
}
c_List2.prototype.p_RemoveLast=function(){
	var t_data=this.m__head.p_PrevNode().m__data;
	this.m__head.m__pred.p_Remove();
	return t_data;
}
c_List2.prototype.p_Equals2=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_List2.prototype.p_FindLast=function(t_value,t_start){
	while(t_start!=this.m__head){
		if(this.p_Equals2(t_value,t_start.m__data)){
			return t_start;
		}
		t_start=t_start.m__pred;
	}
	return null;
}
c_List2.prototype.p_FindLast2=function(t_value){
	return this.p_FindLast(t_value,this.m__head.m__pred);
}
c_List2.prototype.p_RemoveLast2=function(t_value){
	var t_node=this.p_FindLast2(t_value);
	if((t_node)!=null){
		t_node.p_Remove();
	}
}
c_List2.prototype.p_IsEmpty=function(){
	return this.m__head.m__succ==this.m__head;
}
c_List2.prototype.p_Last2=function(){
	return this.m__head.p_PrevNode().m__data;
}
c_List2.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator2.m_new.call(new c_Enumerator2,this);
}
function c_Node5(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node5.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node5.m_new2=function(){
	return this;
}
c_Node5.prototype.p_GetNode=function(){
	return this;
}
c_Node5.prototype.p_PrevNode=function(){
	return this.m__pred.p_GetNode();
}
c_Node5.prototype.p_Remove=function(){
	this.m__succ.m__pred=this.m__pred;
	this.m__pred.m__succ=this.m__succ;
	return 0;
}
function c_HeadNode2(){
	c_Node5.call(this);
}
c_HeadNode2.prototype=extend_class(c_Node5);
c_HeadNode2.m_new=function(){
	c_Node5.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
c_HeadNode2.prototype.p_GetNode=function(){
	return null;
}
function bb_xml_HasStringAtOffset(t_needle,t_haystack,t_offset){
	if(t_offset+t_needle.length>t_haystack.length){
		return false;
	}
	for(var t_index=0;t_index<t_needle.length;t_index=t_index+1){
		if(t_needle.charCodeAt(t_index)!=t_haystack.charCodeAt(t_offset+t_index)){
			return false;
		}
	}
	return true;
}
function c_Map4(){
	Object.call(this);
	this.m_root=null;
}
c_Map4.m_new=function(){
	return this;
}
c_Map4.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map4.prototype.p_RotateLeft4=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map4.prototype.p_RotateRight4=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map4.prototype.p_InsertFixup4=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft4(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight4(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight4(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft4(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map4.prototype.p_Set3=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node6.m_new.call(new c_Node6,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup4(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map4.prototype.p_Insert2=function(t_key,t_value){
	return this.p_Set3(t_key,t_value);
}
c_Map4.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map4.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_StringMap2(){
	c_Map4.call(this);
}
c_StringMap2.prototype=extend_class(c_Map4);
c_StringMap2.m_new=function(){
	c_Map4.m_new.call(this);
	return this;
}
c_StringMap2.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Node6(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node6.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node6.m_new2=function(){
	return this;
}
function c_XMLAttributeQuery(){
	Object.call(this);
	this.m_count=0;
	this.m_items=[];
	this.m_chunk=32;
}
c_XMLAttributeQuery.m_new=function(t_query){
	var t_queryIndex=0;
	var t_queryAsc=0;
	var t_buffer=c_XMLStringBuffer.m_new.call(new c_XMLStringBuffer,256);
	var t_isEscaped=false;
	var t_processBuffer=false;
	var t_processItem=false;
	var t_hasId=false;
	var t_hasValue=false;
	var t_hasEquals=false;
	var t_hasSepcial=false;
	var t_itemId="";
	var t_itemValue="";
	for(t_queryIndex=0;t_queryIndex<t_query.length;t_queryIndex=t_queryIndex+1){
		t_queryAsc=t_query.charCodeAt(t_queryIndex);
		if(t_isEscaped){
			t_isEscaped=false;
			t_buffer.p_Add3(t_queryAsc);
		}else{
			var t_1=t_queryAsc;
			if(t_1==38){
				t_processBuffer=true;
				t_processItem=true;
			}else{
				if(t_1==61){
					t_processBuffer=true;
					t_hasEquals=true;
				}else{
					if(t_1==64){
						if(t_hasId==false){
							if(t_buffer.p_Length()==0){
								t_hasSepcial=true;
							}
						}else{
							t_buffer.p_Add3(t_queryAsc);
						}
					}else{
						if(t_1==92){
							t_isEscaped=true;
						}else{
							if(t_hasId || (t_queryAsc==95 || t_queryAsc>=48 && t_queryAsc<=57 || t_queryAsc>=65 && t_queryAsc<=90 || t_queryAsc>=97 && t_queryAsc<=122)){
								t_buffer.p_Add3(t_queryAsc);
							}
						}
					}
				}
			}
		}
		if(t_queryIndex==t_query.length-1){
			t_processBuffer=true;
			t_processItem=true;
			if(t_isEscaped && t_hasId){
				t_buffer.p_Add3(92);
			}
			if(t_hasEquals && t_buffer.p_Length()==0){
				t_hasValue=true;
			}
		}
		if(t_processBuffer){
			t_processBuffer=false;
			if(t_hasId==false){
				t_itemId=t_buffer.p_value();
				t_buffer.p_Clear();
				t_hasId=t_itemId.length>0;
			}else{
				t_itemValue=t_buffer.p_value();
				t_buffer.p_Clear();
				t_hasValue=true;
			}
		}
		if(t_processItem){
			t_processItem=false;
			if(t_hasId){
				if(this.m_count==this.m_items.length){
					this.m_items=resize_object_array(this.m_items,this.m_items.length+this.m_chunk);
				}
				this.m_items[this.m_count]=c_XMLAttributeQueryItem.m_new.call(new c_XMLAttributeQueryItem,t_itemId,t_itemValue,t_hasValue,t_hasSepcial);
				this.m_count+=1;
				t_itemId="";
				t_itemValue="";
				t_hasId=false;
				t_hasValue=false;
				t_hasSepcial=false;
			}
		}
	}
	return this;
}
c_XMLAttributeQuery.m_new2=function(){
	return this;
}
c_XMLAttributeQuery.prototype.p_Test=function(t_node){
	var t_attribute=null;
	for(var t_index=0;t_index<this.m_count;t_index=t_index+1){
		if(this.m_items[t_index].m_special==false){
			t_attribute=t_node.p_GetXMLAttribute(this.m_items[t_index].m_id);
			if(t_attribute==null || this.m_items[t_index].m_required && t_attribute.m_value!=this.m_items[t_index].m_value){
				return false;
			}
		}else{
			var t_2=this.m_items[t_index].m_id;
			if(t_2=="value"){
				if(this.m_items[t_index].m_required && t_node.m_value!=this.m_items[t_index].m_value){
					return false;
				}
			}
		}
	}
	return true;
}
function c_XMLAttributeQueryItem(){
	Object.call(this);
	this.m_id="";
	this.m_value="";
	this.m_required=false;
	this.m_special=false;
}
c_XMLAttributeQueryItem.m_new=function(t_id,t_value,t_required,t_special){
	this.m_id=t_id;
	this.m_value=t_value;
	this.m_required=t_required;
	this.m_special=t_special;
	return this;
}
c_XMLAttributeQueryItem.m_new2=function(){
	return this;
}
function c_XMLAttribute(){
	Object.call(this);
	this.m_id="";
	this.m_value="";
}
c_XMLAttribute.m_new=function(t_id,t_value){
	this.m_id=t_id;
	this.m_value=t_value;
	return this;
}
c_XMLAttribute.m_new2=function(){
	return this;
}
function c_Map5(){
	Object.call(this);
	this.m_root=null;
}
c_Map5.m_new=function(){
	return this;
}
c_Map5.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map5.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map5.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
c_Map5.prototype.p_RotateLeft5=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map5.prototype.p_RotateRight5=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map5.prototype.p_InsertFixup5=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft5(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight5(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight5(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft5(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map5.prototype.p_Set4=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node7.m_new.call(new c_Node7,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup5(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map5.prototype.p_Insert3=function(t_key,t_value){
	return this.p_Set4(t_key,t_value);
}
function c_StringMap3(){
	c_Map5.call(this);
}
c_StringMap3.prototype=extend_class(c_Map5);
c_StringMap3.m_new=function(){
	c_Map5.m_new.call(this);
	return this;
}
c_StringMap3.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Node7(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node7.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node7.m_new2=function(){
	return this;
}
function bb_xml_ParseXML(t_raw,t_error,t_options){
	var t_rawLine=1;
	var t_rawColumn=1;
	var t_rawIndex=0;
	var t_rawAsc=0;
	var t_rawPos=0;
	var t_rawChunkStart=0;
	var t_rawChunkLength=0;
	var t_rawChunkEnd=0;
	var t_rawChunk="";
	var t_rawChunkIndex=0;
	var t_rawChunkAsc=0;
	var t_doc=null;
	var t_parent=null;
	var t_current=null;
	var t_whitespaceBuffer=c_XMLStringBuffer.m_new.call(new c_XMLStringBuffer,128);
	var t_attributeBuffer=c_XMLStringBuffer.m_new.call(new c_XMLStringBuffer,128);
	var t_processAttributeBuffer=false;
	var t_processTag=false;
	var t_tagName="";
	var t_formatVersion="";
	var t_formatEncoding="";
	var t_attributeId="";
	var t_attributeValue="";
	var t_inTag=false;
	var t_inQuote=false;
	var t_inFormat=false;
	var t_isCloseSelf=false;
	var t_isSingleAttribute=false;
	var t_hasFormat=false;
	var t_hasTagName=false;
	var t_hasTagClose=false;
	var t_hasAttributeId=false;
	var t_hasAttributeValue=false;
	var t_hasEquals=false;
	var t_waitTagClose=false;
	var t_stack=c_List2.m_new.call(new c_List2);
	var t_quoteAsc=0;
	if((t_error)!=null){
		t_error.p_Reset();
	}
	for(t_rawIndex=0;t_rawIndex<t_raw.length;t_rawIndex=t_rawIndex+1){
		t_rawAsc=t_raw.charCodeAt(t_rawIndex);
		if(t_inTag==false){
			var t_3=t_rawAsc;
			if(t_3==9 || t_3==32){
				if(((t_whitespaceBuffer.p_Length())!=0) || ((t_parent)!=null) && ((t_parent.m_value.length)!=0)){
					var t_lastAsc=t_whitespaceBuffer.p_Last(-1);
					if((t_options&1)==0 || ((t_whitespaceBuffer.p_Length())!=0) && t_lastAsc!=9 && t_lastAsc!=32){
						if(t_parent==null){
							if((t_error)!=null){
								t_error.p_Set2("illegal character",t_rawLine,t_rawColumn,t_rawIndex);
							}
							return null;
						}
						t_whitespaceBuffer.p_Add3(t_rawAsc);
					}
				}
				t_rawColumn+=1;
			}else{
				if(t_3==10){
					t_rawLine+=1;
					t_rawColumn=1;
				}else{
					if(t_3==13){
					}else{
						if(t_3==60){
							if(bb_xml_HasStringAtOffset("<?xml",t_raw,t_rawIndex)){
								if(t_hasFormat){
									if((t_error)!=null){
										t_error.p_Set2("duplicate xml format",t_rawLine,t_rawColumn,t_rawIndex);
									}
									return null;
								}
								t_inTag=true;
								t_inFormat=true;
								t_rawColumn+="<?xml".length;
								t_rawIndex=t_rawPos+"<?xml".length-1;
							}else{
								if(bb_xml_HasStringAtOffset("<!--",t_raw,t_rawIndex)){
									t_rawPos=t_raw.indexOf("-->",t_rawIndex+"<!--".length);
									if(t_rawPos==-1){
										if((t_error)!=null){
											t_error.p_Set2("comment not closed",t_rawLine,t_rawColumn,t_rawIndex);
										}
										return null;
									}
									t_rawChunkStart=t_rawIndex+"<!--".length;
									t_rawChunkLength=t_rawPos-(t_rawIndex+"<!--".length);
									t_rawChunkEnd=t_rawChunkStart+t_rawChunkLength;
									for(t_rawChunkIndex=t_rawChunkStart;t_rawChunkIndex<t_rawChunkEnd;t_rawChunkIndex=t_rawChunkIndex+1){
										t_rawChunkAsc=t_raw.charCodeAt(t_rawChunkIndex);
										if(t_rawChunkAsc==10){
											t_rawLine+=1;
											t_rawColumn=1;
										}else{
											t_rawColumn+=1;
										}
									}
									t_rawIndex=t_rawPos+"-->".length-1;
								}else{
									if(bb_xml_HasStringAtOffset("<![CDATA[",t_raw,t_rawIndex)){
										t_rawPos=t_raw.indexOf("]]>",t_rawIndex+"<![CDATA[".length);
										if(t_rawPos==-1){
											if((t_error)!=null){
												t_error.p_Set2("cdata not closed",t_rawLine,t_rawColumn,t_rawIndex);
											}
											return null;
										}
										if(t_parent==null){
											if((t_error)!=null){
												t_error.p_Set2("unexepcted cdata",t_rawLine,t_rawColumn,t_rawIndex);
											}
											return null;
										}
										t_rawChunkStart=t_rawIndex+"<![CDATA[".length;
										t_rawChunkLength=t_rawPos-(t_rawIndex+"<![CDATA[".length);
										t_rawChunkEnd=t_rawChunkStart+t_rawChunkLength;
										for(t_rawChunkIndex=t_rawChunkStart;t_rawChunkIndex<t_rawChunkEnd;t_rawChunkIndex=t_rawChunkIndex+1){
											t_rawChunkAsc=t_raw.charCodeAt(t_rawChunkIndex);
											if(t_rawChunkAsc==10){
												t_rawLine+=1;
												t_rawColumn=1;
											}else{
												t_rawColumn+=1;
											}
										}
										t_whitespaceBuffer.p_Add5(t_raw,t_rawChunkStart,t_rawChunkLength);
										t_rawIndex=t_rawPos+"]]>".length-1;
									}else{
										t_inTag=true;
										if((t_whitespaceBuffer.p_Length())!=0){
											if((t_options&1)==0){
												t_parent.m_value=t_parent.m_value+t_whitespaceBuffer.p_value();
												t_whitespaceBuffer.p_Clear();
											}else{
												t_whitespaceBuffer.p_Trim();
												if((t_whitespaceBuffer.p_Length())!=0){
													t_parent.m_value=t_parent.m_value+t_whitespaceBuffer.p_value();
													t_whitespaceBuffer.p_Clear();
												}
											}
										}
										t_rawColumn+=1;
									}
								}
							}
						}else{
							if(t_3==62){
								if((t_error)!=null){
									t_error.p_Set2("unexpected close bracket",t_rawLine,t_rawColumn,t_rawIndex);
								}
								return null;
							}else{
								if(t_parent==null){
									if((t_error)!=null){
										t_error.p_Set2("illegal character",t_rawLine,t_rawColumn,t_rawIndex);
									}
									return null;
								}
								t_whitespaceBuffer.p_Add3(t_rawAsc);
								t_rawColumn+=1;
							}
						}
					}
				}
			}
		}else{
			if(t_waitTagClose){
				var t_4=t_rawAsc;
				if(t_4==9){
					t_rawColumn+=1;
				}else{
					if(t_4==10){
						t_rawLine+=1;
						t_rawColumn=1;
					}else{
						if(t_4==13){
						}else{
							if(t_4==32){
								t_rawColumn+=1;
							}else{
								if(t_4==62){
									t_waitTagClose=false;
									t_processTag=true;
								}else{
									if((t_error)!=null){
										t_error.p_Set2("unexpected character",t_rawLine,t_rawColumn,t_rawIndex);
									}
									return null;
								}
							}
						}
					}
				}
			}else{
				if(t_inQuote==false){
					var t_5=t_rawAsc;
					if(t_5==9){
						t_rawColumn+=1;
						if((t_attributeBuffer.p_Length())!=0){
							t_processAttributeBuffer=true;
						}
					}else{
						if(t_5==10){
							t_rawLine+=1;
							t_rawColumn=1;
							if((t_attributeBuffer.p_Length())!=0){
								t_processAttributeBuffer=true;
							}
						}else{
							if(t_5==13){
							}else{
								if(t_5==32){
									t_rawColumn+=1;
									if((t_attributeBuffer.p_Length())!=0){
										t_processAttributeBuffer=true;
									}
								}else{
									if(t_5==34 || t_5==39){
										t_quoteAsc=t_rawAsc;
										t_inQuote=true;
										if(t_hasTagClose || t_hasTagName==false && t_inFormat==false || t_hasEquals==false || ((t_attributeBuffer.p_Length())!=0)){
											if((t_error)!=null){
												t_error.p_Set2("unexpected quote",t_rawLine,t_rawColumn,t_rawIndex);
											}
											return null;
										}
										t_rawColumn+=1;
										if((t_attributeBuffer.p_Length())!=0){
											t_processAttributeBuffer=true;
										}
									}else{
										if(t_5==47){
											if(t_hasTagClose || t_hasEquals){
												if((t_error)!=null){
													t_error.p_Set2("unexpected slash",t_rawLine,t_rawColumn,t_rawIndex);
												}
												return null;
											}
											if(t_hasTagName){
												t_waitTagClose=true;
												t_isCloseSelf=true;
											}
											if((t_attributeBuffer.p_Length())!=0){
												t_processAttributeBuffer=true;
											}
											t_hasTagClose=true;
											t_rawColumn+=1;
										}else{
											if(t_5==61){
												t_rawColumn+=1;
												if(t_hasTagClose || t_hasTagName==false && t_inFormat==false || t_hasEquals || t_hasAttributeId || t_attributeBuffer.p_Length()==0){
													if((t_error)!=null){
														t_error.p_Set2("unexpected equals",t_rawLine,t_rawColumn,t_rawIndex);
													}
													return null;
												}
												t_processAttributeBuffer=true;
												t_hasEquals=true;
											}else{
												if(t_5==62){
													if(t_hasEquals || t_hasTagName==false && t_attributeBuffer.p_Length()==0){
														if((t_error)!=null){
															t_error.p_Set2("unexpected close bracket",t_rawLine,t_rawColumn,t_rawIndex);
														}
														return null;
													}
													if((t_attributeBuffer.p_Length())!=0){
														t_processAttributeBuffer=true;
													}
													t_processTag=true;
													t_rawColumn+=1;
												}else{
													if(t_5==63){
														if(t_inFormat==false || t_rawIndex==t_raw.length-1 || t_raw.charCodeAt(t_rawIndex+1)!=62){
															if((t_error)!=null){
																t_error.p_Set2("unexpected questionmark",t_rawLine,t_rawColumn,t_rawIndex);
															}
															return null;
														}
														t_processTag=true;
														t_rawIndex+=1;
														t_rawColumn+=1;
													}else{
														if(t_rawAsc==95 || t_rawAsc>=48 && t_rawAsc<=57 || t_rawAsc>=65 && t_rawAsc<=90 || t_rawAsc>=97 && t_rawAsc<=122){
															if(t_hasTagClose==true && t_hasTagName==true){
																if((t_error)!=null){
																	t_error.p_Set2("unexpected character",t_rawLine,t_rawColumn,t_rawIndex);
																}
																return null;
															}
															if(t_hasAttributeId && t_hasEquals==false){
																t_isSingleAttribute=true;
																t_processAttributeBuffer=true;
															}else{
																t_attributeBuffer.p_Add3(t_rawAsc);
															}
															t_rawColumn+=1;
														}else{
															if((t_error)!=null){
																t_error.p_Set2("illegal character",t_rawLine,t_rawColumn,t_rawIndex);
															}
															return null;
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}else{
					if(t_rawAsc==t_quoteAsc){
						t_inQuote=false;
						t_processAttributeBuffer=true;
					}else{
						t_attributeBuffer.p_Add3(t_rawAsc);
					}
				}
				if(t_processAttributeBuffer){
					t_processAttributeBuffer=false;
					if(t_hasTagName==false && t_inFormat==false){
						if(t_hasTagClose==false){
							t_tagName=t_attributeBuffer.p_value();
							if(t_parent==null){
								if(t_doc==null){
									t_doc=c_XMLDoc.m_new.call(new c_XMLDoc,t_tagName,t_formatVersion,t_formatEncoding);
									t_doc.m_doc=t_doc;
									t_doc.m_parent=null;
									t_doc.m_line=t_rawLine;
									t_doc.m_column=t_rawColumn;
									t_doc.m_offset=t_rawIndex;
									t_current=(t_doc);
								}else{
									if((t_error)!=null){
										t_error.p_Set2("duplicate root",t_rawLine,t_rawColumn,t_rawIndex);
									}
									return null;
								}
							}else{
								t_current=t_parent.p_AddChild(t_tagName,"");
								t_current.m_line=t_rawLine;
								t_current.m_column=t_rawColumn;
								t_current.m_offset=t_rawIndex;
							}
							t_hasTagName=true;
						}else{
							t_tagName=t_attributeBuffer.p_value().toLowerCase();
							if(t_parent==null || t_tagName!=t_parent.m_name){
								if((t_error)!=null){
									t_error.p_Set2("mismatched end tag",t_rawLine,t_rawColumn,t_rawIndex);
								}
								return null;
							}
							t_waitTagClose=true;
							t_hasTagName=true;
						}
					}else{
						if(t_hasAttributeId==false){
							t_attributeId=t_attributeBuffer.p_value().toLowerCase();
							t_hasAttributeId=true;
						}else{
							t_attributeValue=t_attributeBuffer.p_value();
							t_hasAttributeValue=true;
						}
						if(t_processTag && t_hasAttributeId || t_hasAttributeId && t_hasAttributeValue || t_isSingleAttribute || t_hasTagClose){
							if(t_inFormat==false){
								t_current.p_SetAttribute5(t_attributeId,t_attributeValue);
							}else{
								var t_6=t_attributeId;
								if(t_6=="version"){
									t_formatVersion=t_attributeValue;
								}else{
									if(t_6=="encoding"){
										t_formatEncoding=t_attributeValue;
									}
								}
							}
							t_attributeId="";
							t_attributeValue="";
							t_hasAttributeId=false;
							t_hasAttributeValue=false;
							t_hasEquals=false;
						}
					}
					t_attributeBuffer.p_Clear();
				}
				if(t_isSingleAttribute){
					t_isSingleAttribute=false;
					t_attributeBuffer.p_Add3(t_rawAsc);
				}
			}
			if(t_processTag){
				t_processTag=false;
				if(t_inFormat==false){
					if(t_hasTagClose==false){
						t_parent=t_current;
						t_current=null;
						t_stack.p_AddLast2(t_parent);
					}else{
						if(t_isCloseSelf==false){
							if((t_whitespaceBuffer.p_Length())!=0){
								t_parent.m_value=t_parent.m_value+t_whitespaceBuffer.p_value();
								t_whitespaceBuffer.p_Clear();
							}
							t_stack.p_RemoveLast();
							if(t_stack.p_IsEmpty()){
								t_parent=null;
							}else{
								t_parent=t_stack.p_Last2();
							}
						}else{
							t_isCloseSelf=false;
						}
					}
				}else{
					t_hasFormat=true;
					t_inFormat=false;
				}
				t_inTag=false;
				t_hasTagClose=false;
				t_hasTagName=false;
				t_waitTagClose=false;
				t_tagName="";
			}
		}
	}
	if(t_inTag || ((t_parent)!=null) || t_doc==null){
		if((t_error)!=null){
			t_error.p_Set2("unexpected end of xml",t_rawLine,t_rawColumn,t_rawIndex);
		}
		return null;
	}
	return t_doc;
}
function c_Enumerator2(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator2.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator2.m_new2=function(){
	return this;
}
c_Enumerator2.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator2.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
var bb_random_Seed=0;
function bb_random_Rnd(){
	bb_random_Seed=bb_random_Seed*1664525+1013904223|0;
	return (bb_random_Seed>>8&16777215)/16777216.0;
}
function bb_random_Rnd2(t_low,t_high){
	return bb_random_Rnd3(t_high-t_low)+t_low;
}
function bb_random_Rnd3(t_range){
	return bb_random_Rnd()*t_range;
}
function c_Example(){
	Object.call(this);
	this.m_title="";
	this.m_link="";
	this.m_date="";
	this.m_notes="";
	this.m_id="";
	this.m_parentNodeText="";
	this.m_color=c_UIColor.m_black;
	this.m_touched=false;
}
c_Example.m_idCounter=0;
c_Example.m_new=function(t_title,t_link,t_date,t_notes){
	this.m_title=t_title;
	this.m_link=t_link;
	this.m_date=t_date;
	this.m_notes=t_notes;
	this.m_id=String(c_Example.m_idCounter);
	c_Example.m_idCounter+=1;
	return this;
}
c_Example.m_new2=function(){
	return this;
}
c_Example.m_RemoveFirst=function(t_list,t_id){
	var t_=t_list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_ex=t_.p_NextObject();
		if(t_ex.m_id==t_id){
			t_list.p_RemoveFirst4(t_ex);
			return t_ex;
		}
	}
	return null;
}
c_Example.prototype.p_RemoveFirst3=function(t_list){
	t_list.p_RemoveFirst4(this);
}
c_Example.m_FindFromId=function(t_list,t_id){
	var t_=t_list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_ex=t_.p_NextObject();
		if(t_ex.m_id==t_id){
			return t_ex;
		}
	}
	return null;
}
function c_List3(){
	Object.call(this);
	this.m__head=(c_HeadNode3.m_new.call(new c_HeadNode3));
}
c_List3.m_new=function(){
	return this;
}
c_List3.prototype.p_AddLast3=function(t_data){
	return c_Node8.m_new.call(new c_Node8,this.m__head,this.m__head.m__pred,t_data);
}
c_List3.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast3(t_t);
	}
	return this;
}
c_List3.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator3.m_new.call(new c_Enumerator3,this);
}
c_List3.prototype.p_Equals3=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_List3.prototype.p_Contains=function(t_value){
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		if(this.p_Equals3(t_node.m__data,t_value)){
			return true;
		}
		t_node=t_node.m__succ;
	}
	return false;
}
c_List3.prototype.p_RemoveFirst=function(){
	var t_data=this.m__head.p_NextNode().m__data;
	this.m__head.m__succ.p_Remove();
	return t_data;
}
c_List3.prototype.p_Find3=function(t_value,t_start){
	while(t_start!=this.m__head){
		if(this.p_Equals3(t_value,t_start.m__data)){
			return t_start;
		}
		t_start=t_start.m__succ;
	}
	return null;
}
c_List3.prototype.p_Find4=function(t_value){
	return this.p_Find3(t_value,this.m__head.m__succ);
}
c_List3.prototype.p_RemoveFirst4=function(t_value){
	var t_node=this.p_Find4(t_value);
	if((t_node)!=null){
		t_node.p_Remove();
	}
}
c_List3.prototype.p_RemoveEach=function(t_value){
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		var t_succ=t_node.m__succ;
		if(this.p_Equals3(t_node.m__data,t_value)){
			t_node.p_Remove();
		}
		t_node=t_succ;
	}
	return 0;
}
function c_Node8(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node8.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node8.m_new2=function(){
	return this;
}
c_Node8.prototype.p_GetNode=function(){
	return this;
}
c_Node8.prototype.p_NextNode=function(){
	return this.m__succ.p_GetNode();
}
c_Node8.prototype.p_Remove=function(){
	this.m__succ.m__pred=this.m__pred;
	this.m__pred.m__succ=this.m__succ;
	return 0;
}
function c_HeadNode3(){
	c_Node8.call(this);
}
c_HeadNode3.prototype=extend_class(c_Node8);
c_HeadNode3.m_new=function(){
	c_Node8.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
c_HeadNode3.prototype.p_GetNode=function(){
	return null;
}
function c_HttpRequest(){
	BBHttpRequestThread.call(this);
	this.m__onComplete=null;
	this.implments={c_IAsyncEventSource:1};
}
c_HttpRequest.prototype=extend_class(BBHttpRequestThread);
c_HttpRequest.prototype.p_Open=function(t_req,t_url,t_onComplete){
	this.m__onComplete=t_onComplete;
	this.Init(t_req,((c_Url.m_new.call(new c_Url,t_url,"http",80)).p_ToString()));
}
c_HttpRequest.m_new=function(t_req,t_url,t_onComplete){
	this.p_Open(t_req,t_url,t_onComplete);
	return this;
}
c_HttpRequest.m_new2=function(){
	return this;
}
c_HttpRequest.prototype.SendRequest=function(t_data,t_mimeType){
	bb_asyncevent_AddAsyncEventSource(this);
	BBHttpRequestThread.prototype.SendRequest.call(this,t_data,t_mimeType);
}
c_HttpRequest.prototype.p_Send=function(){
	this.SendRequest("","");
}
c_HttpRequest.prototype.p_Send2=function(t_data,t_mimeType,t_encoding){
	this.SendRequest(t_data,t_mimeType);
}
c_HttpRequest.prototype.p_UpdateAsyncEvents=function(){
	if(this.IsRunning()){
		return;
	}
	bb_asyncevent_RemoveAsyncEventSource(this);
	this.m__onComplete.p_OnHttpRequestComplete(this);
}
function c_Url(){
	Object.call(this);
	this.m__defaultScheme="";
	this.m__defaultPort=0;
	this.m__url="";
	this.m__scheme="";
	this.m__username="";
	this.m__password="";
	this.m__domain="";
	this.m__port=0;
	this.m__path="";
	this.m__query="";
	this.m__fragment="";
}
c_Url.prototype.p_Set5=function(t_url){
	this.m__url=t_url;
	this.m__scheme=this.m__defaultScheme;
	this.m__username="";
	this.m__password="";
	this.m__domain="";
	this.m__port=this.m__defaultPort;
	this.m__path="/";
	this.m__query="";
	this.m__fragment="";
	var t_pos1=0;
	var t_pos2=0;
	var t_cursor=0;
	var t_queryPos=t_url.indexOf("?",0);
	var t_anchorPos=t_url.indexOf("#",0);
	var t_nonDataLength=0;
	if(t_queryPos==-1 && t_anchorPos==-1){
		t_nonDataLength=t_url.length;
	}else{
		if(t_queryPos>-1 && t_anchorPos>-1){
			if(t_queryPos<t_anchorPos){
				t_nonDataLength=t_queryPos;
			}else{
				t_nonDataLength=t_anchorPos;
				t_queryPos=-1;
			}
		}else{
			if(t_queryPos>-1){
				t_nonDataLength=t_queryPos;
			}else{
				t_nonDataLength=t_anchorPos;
			}
		}
	}
	t_pos1=t_url.indexOf("://",t_cursor);
	if(t_pos1>-1 && t_pos1<t_nonDataLength){
		this.m__scheme=t_url.slice(t_cursor,t_pos1);
		t_cursor=t_pos1+3;
	}
	t_pos1=t_url.indexOf("@",t_cursor);
	if(t_pos1>-1 && t_pos1<t_nonDataLength){
		t_pos2=t_url.indexOf(":",t_cursor);
		if(t_pos2>-1 && t_pos2<t_pos1){
			this.m__username=t_url.slice(t_cursor,t_pos2);
			this.m__password=t_url.slice(t_pos2+1,t_pos1);
		}else{
			this.m__username=t_url.slice(t_cursor,t_pos1);
		}
		t_cursor=t_pos1+1;
	}
	var t_portStart=t_url.indexOf(":",t_cursor);
	var t_pathStart=t_url.indexOf("/",t_cursor);
	var t_serverLength=0;
	if(t_portStart>-1 && t_portStart>=t_nonDataLength){
		t_portStart=-1;
	}
	if(t_pathStart>-1 && t_pathStart>=t_nonDataLength){
		t_pathStart=-1;
	}
	if(t_portStart==-1 && t_pathStart==-1){
		this.m__domain=t_url.slice(t_cursor,t_nonDataLength);
	}else{
		if(t_portStart>-1 && t_pathStart>-1){
			if(t_portStart<t_pathStart){
				this.m__domain=t_url.slice(t_cursor,t_portStart);
				this.m__port=parseInt((t_url.slice(t_portStart+1,t_pathStart)),10);
				this.m__path=t_url.slice(t_pathStart,t_nonDataLength);
			}else{
				this.m__domain=t_url.slice(t_cursor,t_pathStart);
				this.m__path=t_url.slice(t_pathStart,t_nonDataLength);
			}
		}else{
			if(t_portStart>-1){
				this.m__domain=t_url.slice(t_cursor,t_portStart);
				this.m__port=parseInt((t_url.slice(t_portStart+1,t_nonDataLength)),10);
			}else{
				this.m__domain=t_url.slice(t_cursor,t_pathStart);
				this.m__path=t_url.slice(t_pathStart,t_nonDataLength);
			}
		}
	}
	if(t_queryPos>-1){
		if(t_anchorPos>-1){
			this.m__query=t_url.slice(t_queryPos+1,t_anchorPos);
		}else{
			this.m__query=t_url.slice(t_queryPos+1);
		}
	}
	if(t_anchorPos>-1){
		this.m__fragment=t_url.slice(t_anchorPos+1);
	}
}
c_Url.m_new=function(t_url,t_defaultScheme,t_defaultPort){
	this.m__defaultScheme=t_defaultScheme;
	this.m__defaultPort=t_defaultPort;
	this.p_Set5(t_url);
	return this;
}
c_Url.m_new2=function(){
	return this;
}
c_Url.prototype.p_ToString=function(){
	return this.m__url;
}
function c_Stack(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack.m_new=function(){
	return this;
}
c_Stack.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack.prototype.p_Equals4=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_Stack.prototype.p_Contains2=function(t_value){
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		if(this.p_Equals4(this.m_data[t_i],t_value)){
			return true;
		}
	}
	return false;
}
c_Stack.prototype.p_Push=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack.prototype.p_Push2=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push(t_values[t_offset+t_i]);
	}
}
c_Stack.prototype.p_Push3=function(t_values,t_offset){
	this.p_Push2(t_values,t_offset,t_values.length-t_offset);
}
c_Stack.m_NIL=null;
c_Stack.prototype.p_Length2=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack.prototype.p_Length=function(){
	return this.m_length;
}
c_Stack.prototype.p_Get=function(t_index){
	return this.m_data[t_index];
}
c_Stack.prototype.p_RemoveEach2=function(t_value){
	var t_i=0;
	var t_j=this.m_length;
	while(t_i<this.m_length){
		if(!this.p_Equals4(this.m_data[t_i],t_value)){
			t_i+=1;
			continue;
		}
		var t_b=t_i;
		var t_e=t_i+1;
		while(t_e<this.m_length && this.p_Equals4(this.m_data[t_e],t_value)){
			t_e+=1;
		}
		while(t_e<this.m_length){
			this.m_data[t_b]=this.m_data[t_e];
			t_b+=1;
			t_e+=1;
		}
		this.m_length-=t_e-t_b;
		t_i+=1;
	}
	t_i=this.m_length;
	while(t_i<t_j){
		this.m_data[t_i]=c_Stack.m_NIL;
		t_i+=1;
	}
}
var bb_asyncevent__sources=null;
function bb_asyncevent_AddAsyncEventSource(t_source){
	if(bb_asyncevent__sources.p_Contains2(t_source)){
		error("Async event source is already active");
	}
	bb_asyncevent__sources.p_Push(t_source);
}
function bb_app_SaveState(t_state){
	return bb_app__game.SaveState(t_state);
}
function bb_h5_UpdateGuiEvents(t_handler){
	var t_events=PollEvents();
	for(var t_i=0;t_i<t_events.length;t_i=t_i+1){
		t_handler.p_OnGuiEvent(t_events[t_i]);
	}
}
function bb_math_Abs(t_x){
	if(t_x>=0){
		return t_x;
	}
	return -t_x;
}
function bb_math_Abs2(t_x){
	if(t_x>=0.0){
		return t_x;
	}
	return -t_x;
}
function c_UIEvent(){
	Object.call(this);
	this.m_sender=null;
	this.m_event=0;
	this.m_time=0;
	this.m_x=0;
	this.m_y=0;
	this.m_extra=null;
	this.m_text="";
}
c_UIEvent.m_new=function(t_sender,t_event,t_text,t_extra){
	this.m_sender=t_sender;
	this.m_event=t_event;
	this.m_time=bb_app_Millisecs();
	this.m_x=((bb_input_MouseX())|0);
	this.m_y=((bb_input_MouseY())|0);
	this.m_extra=t_extra;
	this.m_text=t_text;
	return this;
}
c_UIEvent.m_new2=function(t_sender,t_event,t_extra){
	this.m_sender=t_sender;
	this.m_event=t_event;
	this.m_time=bb_app_Millisecs();
	this.m_x=((bb_input_MouseX())|0);
	this.m_y=((bb_input_MouseY())|0);
	this.m_extra=t_extra;
	var t_eventText="unknown";
	var t_1=t_event;
	if(t_1==1){
		t_eventText="MouseEnter";
	}else{
		if(t_1==2){
			t_eventText="MouseLeave";
		}else{
			if(t_1==3){
				t_eventText="MouseMove";
			}else{
				if(t_1==4){
					t_eventText="MouseDown";
				}else{
					if(t_1==5){
						t_eventText="MouseUp";
					}else{
						if(t_1==7){
							t_eventText="MouseDrag";
						}else{
							if(t_1==6){
								t_eventText="StartMouseDrag";
							}else{
								if(t_1==8){
									t_eventText="StopMouseDrag";
								}else{
									if(t_1==9){
										t_eventText="ViewClicked";
									}else{
										if(t_1==12){
											t_eventText="MouseEdgeDrag";
										}else{
											if(t_1==11){
												t_eventText="StartMouseEdgeDrag";
											}else{
												if(t_1==13){
													t_eventText="StopMouseEdgeDrag";
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	if(t_sender==null){
	}else{
		var t_title="";
		if((object_downcast((t_sender),c_UIButton))!=null){
			t_title=object_downcast((t_sender),c_UIButton).p_title2();
		}
	}
	return this;
}
c_UIEvent.m_new3=function(){
	return this;
}
c_UIEvent.m_eventStack=null;
c_UIEvent.m_viewWithFocus=null;
c_UIEvent.m_prevViewWithFocus=null;
c_UIEvent.m_viewWithDragFocus=null;
c_UIEvent.m_startDragMousePosition=[];
c_UIEvent.m_prevMouseX=0;
c_UIEvent.m_prevMouseY=0;
c_UIEvent.m_mouseState=0;
c_UIEvent.m_prevMouseDownEvent=null;
c_UIEvent.m_mouseDownView=null;
c_UIEvent.m_prevMouseDownEvent2=null;
c_UIEvent.m_ProcessEvent=function(){
	while(c_UIEvent.m_eventStack.p_Length()>100){
		c_UIEvent.m_eventStack.p_Remove2(0);
	}
	if((bb_input_MouseDown(0))!=0){
		c_UIEvent.m_viewWithFocus=c_UIView.m_HitTestAll(bb_input_MouseX(),bb_input_MouseY());
		if(c_UIEvent.m_viewWithFocus!=c_UIEvent.m_prevViewWithFocus){
			if(c_UIEvent.m_prevViewWithFocus!=null){
				c_UIEvent.m_eventStack.p_Push4(c_UIEvent.m_new2.call(new c_UIEvent,c_UIEvent.m_prevViewWithFocus,2,null));
			}
			if(c_UIEvent.m_viewWithFocus!=null){
				c_UIEvent.m_eventStack.p_Push4(c_UIEvent.m_new2.call(new c_UIEvent,c_UIEvent.m_viewWithFocus,1,null));
			}
			c_UIEvent.m_prevViewWithFocus=c_UIEvent.m_viewWithFocus;
		}
		if(c_UIEvent.m_viewWithDragFocus==null){
			c_UIEvent.m_viewWithDragFocus=c_UIView.m_DragTestAll(bb_input_MouseX(),bb_input_MouseY());
			if((c_UIEvent.m_viewWithDragFocus)!=null){
				if(c_UIEvent.m_viewWithDragFocus.m_localMouse[2]==-1){
					c_UIEvent.m_viewWithDragFocus.p_SendEvent(c_UIEvent.m_new2.call(new c_UIEvent,null,6,null));
				}else{
					c_UIEvent.m_viewWithDragFocus.p_SendEvent(c_UIEvent.m_new2.call(new c_UIEvent,null,11,null));
				}
				c_UIEvent.m_startDragMousePosition[0]=((bb_input_MouseX())|0);
				c_UIEvent.m_startDragMousePosition[1]=((bb_input_MouseY())|0);
			}
		}else{
			if(c_UIEvent.m_viewWithDragFocus.m_dragging==false){
				c_UIEvent.m_viewWithDragFocus=c_UIView.m_DragTestAll(bb_input_MouseX(),bb_input_MouseY());
				if((c_UIEvent.m_viewWithDragFocus)!=null){
					if(c_UIEvent.m_viewWithDragFocus.m_localMouse[2]==-1){
						c_UIEvent.m_viewWithDragFocus.p_SendEvent(c_UIEvent.m_new2.call(new c_UIEvent,null,6,null));
					}
					c_UIEvent.m_startDragMousePosition[0]=((bb_input_MouseX())|0);
					c_UIEvent.m_startDragMousePosition[1]=((bb_input_MouseY())|0);
				}
			}
		}
	}
	if((c_UIEvent.m_prevMouseX)!=bb_input_MouseX() || (c_UIEvent.m_prevMouseY)!=bb_input_MouseY()){
		c_UIEvent.m_eventStack.p_Push4(c_UIEvent.m_new2.call(new c_UIEvent,null,3,null));
		if(c_UIEvent.m_mouseState==4){
			if((c_UIEvent.m_viewWithDragFocus)!=null){
				var t_ev=null;
				if(c_UIEvent.m_viewWithDragFocus.m_localMouse[2]==-1){
					if(c_UIEvent.m_prevMouseDownEvent==null){
						t_ev=c_UIEvent.m_new2.call(new c_UIEvent,null,7,(c_Point.m_new.call(new c_Point,(c_UIEvent.m_startDragMousePosition[0]),(c_UIEvent.m_startDragMousePosition[1]))));
					}else{
						if(c_UIEvent.m_prevMouseDownEvent.m_event!=12){
							t_ev=c_UIEvent.m_new2.call(new c_UIEvent,null,7,(c_Point.m_new.call(new c_Point,(c_UIEvent.m_startDragMousePosition[0]),(c_UIEvent.m_startDragMousePosition[1]))));
						}else{
							t_ev=c_UIEvent.m_new2.call(new c_UIEvent,null,12,(c_Point.m_new.call(new c_Point,(c_UIEvent.m_startDragMousePosition[0]),(c_UIEvent.m_startDragMousePosition[1]))));
						}
					}
				}else{
					t_ev=c_UIEvent.m_new2.call(new c_UIEvent,null,12,(c_Point.m_new.call(new c_Point,(c_UIEvent.m_startDragMousePosition[0]),(c_UIEvent.m_startDragMousePosition[1]))));
				}
				if((t_ev)!=null){
					c_UIEvent.m_prevMouseDownEvent=t_ev;
					c_UIEvent.m_viewWithDragFocus.p_SendEvent(t_ev);
				}
			}
		}
		c_UIEvent.m_prevMouseX=((bb_input_MouseX())|0);
		c_UIEvent.m_prevMouseY=((bb_input_MouseY())|0);
	}
	var t_2=c_UIEvent.m_mouseState;
	if(t_2==0){
		if((bb_input_MouseDown(0))!=0){
			c_UIEvent.m_mouseState=4;
			var t_ev2=c_UIEvent.m_new2.call(new c_UIEvent,null,4,null);
			if((c_UIEvent.m_viewWithFocus)!=null){
				c_UIEvent.m_viewWithFocus.p_SendEvent(t_ev2);
			}
			c_UIEvent.m_mouseDownView=c_UIEvent.m_viewWithFocus;
			c_UIEvent.m_prevMouseDownEvent2=t_ev2;
		}
	}else{
		if(t_2==4){
			if(!((bb_input_MouseDown(0))!=0)){
				c_UIEvent.m_mouseState=5;
				if((c_UIEvent.m_viewWithFocus)!=null){
					c_UIEvent.m_viewWithFocus.p_SendEvent(c_UIEvent.m_new2.call(new c_UIEvent,null,5,null));
				}
				if(c_UIEvent.m_viewWithFocus==c_UIEvent.m_mouseDownView && c_UIEvent.m_viewWithFocus!=null){
					if(bb_app_Millisecs()-c_UIEvent.m_prevMouseDownEvent2.m_time<500){
						c_UIEvent.m_viewWithFocus.p_SendEvent(c_UIEvent.m_new2.call(new c_UIEvent,null,9,null));
						//print("here3");
					}
				}
			}
		}else{
			if(t_2==5){
				c_UIEvent.m_mouseState=0;
				if(((c_UIEvent.m_viewWithDragFocus)!=null) && ((c_UIEvent.m_prevMouseDownEvent)!=null)){
					if(c_UIEvent.m_viewWithDragFocus.m_localMouse[2]==-1){
						c_UIEvent.m_viewWithDragFocus.p_SendEvent(c_UIEvent.m_new2.call(new c_UIEvent,null,8,null));
					}else{
						c_UIEvent.m_viewWithDragFocus.p_SendEvent(c_UIEvent.m_new2.call(new c_UIEvent,null,13,null));
					}
					c_UIEvent.m_viewWithDragFocus.m_dragging=false;
				}
				c_UIEvent.m_prevMouseDownEvent=null;
			}
		}
	}
	if(c_UIEvent.m_eventStack.p_Length()==0){
		return null;
	}
	var t_ev3=c_UIEvent.m_eventStack.p_Get(0);
	c_UIEvent.m_eventStack.p_Remove2(0);
	return t_ev3;
}
c_UIEvent.m_ClearUp=function(){
	c_UIEvent.m_mouseDownView=null;
	c_UIEvent.m_eventStack=c_Stack2.m_new.call(new c_Stack2);
}
function bb_app_Millisecs(){
	return bb_app__game.Millisecs();
}
function bb_input_MouseX(){
	return bb_input_device.p_MouseX();
}
function bb_input_MouseY(){
	return bb_input_device.p_MouseY();
}
function c_Stack2(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack2.m_new=function(){
	return this;
}
c_Stack2.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack2.prototype.p_Push4=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack2.prototype.p_Push5=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push4(t_values[t_offset+t_i]);
	}
}
c_Stack2.prototype.p_Push6=function(t_values,t_offset){
	this.p_Push5(t_values,t_offset,t_values.length-t_offset);
}
c_Stack2.m_NIL=null;
c_Stack2.prototype.p_Length2=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack2.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack2.prototype.p_Length=function(){
	return this.m_length;
}
c_Stack2.prototype.p_Remove2=function(t_index){
	for(var t_i=t_index;t_i<this.m_length-1;t_i=t_i+1){
		this.m_data[t_i]=this.m_data[t_i+1];
	}
	this.m_length-=1;
	this.m_data[this.m_length]=c_Stack2.m_NIL;
}
c_Stack2.prototype.p_Get=function(t_index){
	return this.m_data[t_index];
}
function bb_input_MouseDown(t_button){
	return ((bb_input_device.p_KeyDown(1+t_button))?1:0);
}
function bb_math_Max(t_x,t_y){
	if(t_x>t_y){
		return t_x;
	}
	return t_y;
}
function bb_math_Max2(t_x,t_y){
	if(t_x>t_y){
		return t_x;
	}
	return t_y;
}
function c_Point(){
	Object.call(this);
	this.m_x=.0;
	this.m_y=.0;
}
c_Point.m_new=function(t_x,t_y){
	this.m_x=t_x;
	this.m_y=t_y;
	return this;
}
c_Point.m_new2=function(){
	return this;
}
function bb_graphics_PushMatrix(){
	var t_sp=bb_graphics_context.m_matrixSp;
	bb_graphics_context.m_matrixStack[t_sp+0]=bb_graphics_context.m_ix;
	bb_graphics_context.m_matrixStack[t_sp+1]=bb_graphics_context.m_iy;
	bb_graphics_context.m_matrixStack[t_sp+2]=bb_graphics_context.m_jx;
	bb_graphics_context.m_matrixStack[t_sp+3]=bb_graphics_context.m_jy;
	bb_graphics_context.m_matrixStack[t_sp+4]=bb_graphics_context.m_tx;
	bb_graphics_context.m_matrixStack[t_sp+5]=bb_graphics_context.m_ty;
	bb_graphics_context.m_matrixSp=t_sp+6;
	return 0;
}
function bb_graphics_Transform(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	var t_ix2=t_ix*bb_graphics_context.m_ix+t_iy*bb_graphics_context.m_jx;
	var t_iy2=t_ix*bb_graphics_context.m_iy+t_iy*bb_graphics_context.m_jy;
	var t_jx2=t_jx*bb_graphics_context.m_ix+t_jy*bb_graphics_context.m_jx;
	var t_jy2=t_jx*bb_graphics_context.m_iy+t_jy*bb_graphics_context.m_jy;
	var t_tx2=t_tx*bb_graphics_context.m_ix+t_ty*bb_graphics_context.m_jx+bb_graphics_context.m_tx;
	var t_ty2=t_tx*bb_graphics_context.m_iy+t_ty*bb_graphics_context.m_jy+bb_graphics_context.m_ty;
	bb_graphics_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
	return 0;
}
function bb_graphics_Transform2(t_m){
	bb_graphics_Transform(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics_InvTransform(t_coords){
	var t_m00=bb_graphics_context.m_ix;
	var t_m10=bb_graphics_context.m_jx;
	var t_m20=bb_graphics_context.m_tx;
	var t_m01=bb_graphics_context.m_iy;
	var t_m11=bb_graphics_context.m_jy;
	var t_m21=bb_graphics_context.m_ty;
	var t_det=t_m00*t_m11-t_m01*t_m10;
	var t_idet=1.0/t_det;
	var t_r00=t_m11*t_idet;
	var t_r10=-t_m10*t_idet;
	var t_r20=(t_m10*t_m21-t_m11*t_m20)*t_idet;
	var t_r01=-t_m01*t_idet;
	var t_r11=t_m00*t_idet;
	var t_r21=(t_m01*t_m20-t_m00*t_m21)*t_idet;
	var t_ix=t_r00;
	var t_jx=t_r10;
	var t_tx=t_r20;
	var t_iy=t_r01;
	var t_jy=t_r11;
	var t_ty=t_r21;
	var t_out=new_number_array(t_coords.length);
	for(var t_i=0;t_i<t_coords.length-1;t_i=t_i+2){
		var t_x=t_coords[t_i];
		var t_y=t_coords[t_i+1];
		t_out[t_i]=t_x*t_ix+t_y*t_jx+t_tx;
		t_out[t_i+1]=t_x*t_iy+t_y*t_jy+t_ty;
	}
	return t_out;
}
function bb_graphics_PopMatrix(){
	var t_sp=bb_graphics_context.m_matrixSp-6;
	bb_graphics_SetMatrix(bb_graphics_context.m_matrixStack[t_sp+0],bb_graphics_context.m_matrixStack[t_sp+1],bb_graphics_context.m_matrixStack[t_sp+2],bb_graphics_context.m_matrixStack[t_sp+3],bb_graphics_context.m_matrixStack[t_sp+4],bb_graphics_context.m_matrixStack[t_sp+5]);
	bb_graphics_context.m_matrixSp=t_sp;
	return 0;
}
function c_Enumerator3(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator3.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator3.m_new2=function(){
	return this;
}
c_Enumerator3.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator3.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_List4(){
	Object.call(this);
	this.m__head=(c_HeadNode4.m_new.call(new c_HeadNode4));
}
c_List4.m_new=function(){
	return this;
}
c_List4.prototype.p_AddLast4=function(t_data){
	return c_Node9.m_new.call(new c_Node9,this.m__head,this.m__head.m__pred,t_data);
}
c_List4.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast4(t_t);
	}
	return this;
}
c_List4.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator4.m_new.call(new c_Enumerator4,this);
}
c_List4.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List4.prototype.p_First=function(){
	return this.m__head.p_NextNode().m__data;
}
c_List4.prototype.p_ToArray=function(){
	var t_arr=new_object_array(this.p_Count());
	var t_i=0;
	var t_=this.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_t=t_.p_NextObject();
		t_arr[t_i]=t_t;
		t_i+=1;
	}
	return t_arr;
}
function c_Node9(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node9.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node9.m_new2=function(){
	return this;
}
c_Node9.prototype.p_GetNode=function(){
	return this;
}
c_Node9.prototype.p_NextNode=function(){
	return this.m__succ.p_GetNode();
}
function c_HeadNode4(){
	c_Node9.call(this);
}
c_HeadNode4.prototype=extend_class(c_Node9);
c_HeadNode4.m_new=function(){
	c_Node9.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
c_HeadNode4.prototype.p_GetNode=function(){
	return null;
}
function c_Enumerator4(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator4.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator4.m_new2=function(){
	return this;
}
c_Enumerator4.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator4.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function bb_input_KeyDown(t_key){
	return ((bb_input_device.p_KeyDown(t_key))?1:0);
}
function bb_input_KeyHit(t_key){
	return bb_input_device.p_KeyHit(t_key);
}
function bb_app_OpenUrl(t_url){
	bb_app__game.OpenUrl(t_url);
	return 0;
}
var bb_asyncevent__current=null;
function bb_asyncevent_UpdateAsyncEvents(){
	if((bb_asyncevent__current)!=null){
		return 0;
	}
	var t_i=0;
	while(t_i<bb_asyncevent__sources.p_Length()){
		bb_asyncevent__current=bb_asyncevent__sources.p_Get(t_i);
		bb_asyncevent__current.p_UpdateAsyncEvents();
		if((bb_asyncevent__current)!=null){
			t_i+=1;
		}
	}
	bb_asyncevent__current=null;
	return 0;
}
function bb_graphics_Cls(t_r,t_g,t_b){
	bb_graphics_renderDevice.Cls(t_r,t_g,t_b);
	return 0;
}
function bb_graphics_DrawRect(t_x,t_y,t_w,t_h,t_dotted,t_filled){
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawRect(t_x,t_y,t_w,t_h,t_dotted,t_filled);
	return 0;
}
function bb_graphics_DrawImage(t_image,t_x,t_y,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics_renderDevice.DrawSurface(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty);
	}else{
		bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	return 0;
}
function bb_graphics_Translate(t_x,t_y){
	bb_graphics_Transform(1.0,0.0,0.0,1.0,t_x,t_y);
	return 0;
}
function bb_graphics_Rotate(t_angle){
	bb_graphics_Transform(Math.cos((t_angle)*D2R),-Math.sin((t_angle)*D2R),Math.sin((t_angle)*D2R),Math.cos((t_angle)*D2R),0.0,0.0);
	return 0;
}
function bb_graphics_Scale(t_x,t_y){
	bb_graphics_Transform(t_x,0.0,0.0,t_y,0.0,0.0);
	return 0;
}
function bb_graphics_DrawImage2(t_image,t_x,t_y,t_rotation,t_scaleX,t_scaleY,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_x,t_y);
	bb_graphics_Rotate(t_rotation);
	bb_graphics_Scale(t_scaleX,t_scaleY);
	bb_graphics_Translate(-t_image.m_tx,-t_image.m_ty);
	bb_graphics_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics_renderDevice.DrawSurface(t_image.m_surface,0.0,0.0);
	}else{
		bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,0.0,0.0,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	bb_graphics_PopMatrix();
	return 0;
}
function bb_graphics_GetScissor(){
	return [bb_graphics_context.m_scissor_x,bb_graphics_context.m_scissor_y,bb_graphics_context.m_scissor_width,bb_graphics_context.m_scissor_height];
}
function bb_graphics_GetScissor2(t_scissor){
	t_scissor[0]=bb_graphics_context.m_scissor_x;
	t_scissor[1]=bb_graphics_context.m_scissor_y;
	t_scissor[2]=bb_graphics_context.m_scissor_width;
	t_scissor[3]=bb_graphics_context.m_scissor_height;
	return 0;
}
function bb_graphics_CreateImage(t_width,t_height,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.CreateSurface(t_width*t_frameCount,t_height);
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
	}
	return null;
}
function bb_graphics_ReadPixels(t_pixels,t_x,t_y,t_width,t_height,t_offset,t_pitch){
	if(!((t_pitch)!=0)){
		t_pitch=t_width;
	}
	bb_graphics_renderDevice.ReadPixels(t_pixels,t_x,t_y,t_width,t_height,t_offset,t_pitch);
	return 0;
}
function bb_graphics_GetColor(){
	return [bb_graphics_context.m_color_r,bb_graphics_context.m_color_g,bb_graphics_context.m_color_b];
}
function bb_graphics_GetColor2(t_color){
	t_color[0]=bb_graphics_context.m_color_r;
	t_color[1]=bb_graphics_context.m_color_g;
	t_color[2]=bb_graphics_context.m_color_b;
	return 0;
}
function bb_graphics_GetAlpha(){
	return bb_graphics_context.m_alpha;
}
function c_Stack3(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack3.m_new=function(){
	return this;
}
c_Stack3.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack3.m_NIL=null;
c_Stack3.prototype.p_Length2=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack3.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack3.prototype.p_Length=function(){
	return this.m_length;
}
c_Stack3.prototype.p_Push7=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack3.prototype.p_Push8=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push7(t_values[t_offset+t_i]);
	}
}
c_Stack3.prototype.p_Push9=function(t_values,t_offset){
	this.p_Push8(t_values,t_offset,t_values.length-t_offset);
}
c_Stack3.prototype.p_Get=function(t_index){
	return this.m_data[t_index];
}
c_Stack3.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator6.m_new.call(new c_Enumerator6,this);
}
function c_XMLNode2(){
	Object.call(this);
	this.m_value="";
	this.m_name="";
	this.m_valid=false;
	this.m_doc=null;
	this.m_path="";
	this.m_pathList=null;
	this.m_pathListNode=null;
	this.m_parent=null;
	this.m_line=0;
	this.m_column=0;
	this.m_offset=0;
	this.m_attributes=c_StringMap5.m_new.call(new c_StringMap5);
	this.m_lastChild=null;
	this.m_nextSibling=null;
	this.m_previousSibling=null;
	this.m_firstChild=null;
	this.m_children=c_List5.m_new.call(new c_List5);
}
c_XMLNode2.m_new=function(t_name,t_valid){
	if((t_name.length)!=0){
		this.m_name=t_name.toLowerCase();
	}
	this.m_valid=t_valid;
	return this;
}
c_XMLNode2.m_new2=function(){
	return this;
}
c_XMLNode2.prototype.p_SetAttribute=function(t_id){
	if(this.m_valid==false){
		return;
	}
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		this.m_attributes.p_Insert5(t_id,c_XMLAttribute2.m_new.call(new c_XMLAttribute2,t_id,""));
	}else{
		t_attribute.m_value="";
	}
}
c_XMLNode2.prototype.p_SetAttribute2=function(t_id,t_value){
	if(this.m_valid==false){
		return;
	}
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		this.m_attributes.p_Insert5(t_id,c_XMLAttribute2.m_new.call(new c_XMLAttribute2,t_id,String((t_value)?1:0)));
	}else{
		t_attribute.m_value=String((t_value)?1:0);
	}
}
c_XMLNode2.prototype.p_SetAttribute3=function(t_id,t_value){
	if(this.m_valid==false){
		return;
	}
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		this.m_attributes.p_Insert5(t_id,c_XMLAttribute2.m_new.call(new c_XMLAttribute2,t_id,String(t_value)));
	}else{
		t_attribute.m_value=String(t_value);
	}
}
c_XMLNode2.prototype.p_SetAttribute4=function(t_id,t_value){
	if(this.m_valid==false){
		return;
	}
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		this.m_attributes.p_Insert5(t_id,c_XMLAttribute2.m_new.call(new c_XMLAttribute2,t_id,String(t_value)));
	}else{
		t_attribute.m_value=String(t_value);
	}
}
c_XMLNode2.prototype.p_SetAttribute5=function(t_id,t_value){
	if(this.m_valid==false){
		return;
	}
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		this.m_attributes.p_Insert5(t_id,c_XMLAttribute2.m_new.call(new c_XMLAttribute2,t_id,t_value));
	}else{
		t_attribute.m_value=t_value;
	}
}
c_XMLNode2.prototype.p_AddChild=function(t_name,t_attributes){
	if(this.m_valid==false){
		return null;
	}
	var t_child=c_XMLNode2.m_new.call(new c_XMLNode2,t_name,true);
	t_child.m_doc=this.m_doc;
	t_child.m_parent=this;
	t_child.m_path=this.m_path+"/"+t_child.m_name;
	t_child.m_pathList=this.m_doc.m_paths.p_Get2(t_child.m_path);
	if(t_child.m_pathList==null){
		t_child.m_pathList=c_List5.m_new.call(new c_List5);
		this.m_doc.m_paths.p_Set6(t_child.m_path,t_child.m_pathList);
	}
	t_child.m_pathListNode=t_child.m_pathList.p_AddLast5(t_child);
	if((t_attributes.length)!=0){
		var t_query=c_XMLAttributeQuery2.m_new.call(new c_XMLAttributeQuery2,t_attributes);
		if(t_query.p_Length()>0){
			for(var t_index=0;t_index<t_query.p_Length();t_index=t_index+1){
				t_child.p_SetAttribute5(t_query.m_items[t_index].m_id,t_query.m_items[t_index].m_value);
			}
		}
	}
	if((this.m_lastChild)!=null){
		this.m_lastChild.m_nextSibling=t_child;
		t_child.m_previousSibling=this.m_lastChild;
		this.m_lastChild=t_child;
	}else{
		this.m_firstChild=t_child;
		this.m_lastChild=t_child;
	}
	this.m_children.p_AddLast5(t_child);
	return t_child;
}
c_XMLNode2.prototype.p_GetChildAtPath=function(t_path){
	if(t_path.length==0){
		return this.m_doc.m_nullNode;
	}
	var t_pathList=this.m_doc.m_paths.p_Get2(this.m_path+"/"+t_path);
	if(t_pathList==null || t_pathList.p_IsEmpty()){
		return this.m_doc.m_nullNode;
	}
	return t_pathList.p_First();
}
c_XMLNode2.prototype.p_GetXMLAttribute=function(t_id){
	return this.m_attributes.p_Get2(t_id.toLowerCase());
}
c_XMLNode2.prototype.p_GetChildAtPath2=function(t_path,t_attributes){
	if(t_path.length==0){
		return this.m_doc.m_nullNode;
	}
	var t_query=c_XMLAttributeQuery2.m_new.call(new c_XMLAttributeQuery2,t_attributes);
	var t_pathList=this.m_doc.m_paths.p_Get2(this.m_path+"/"+t_path);
	if(t_pathList==null || t_pathList.p_IsEmpty()){
		return this.m_doc.m_nullNode;
	}
	var t_=t_pathList.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_node=t_.p_NextObject();
		if(t_query.p_Test2(t_node)){
			return t_node;
		}
		t_node=t_node.m_nextSibling;
	}
	return this.m_doc.m_nullNode;
}
c_XMLNode2.prototype.p_HasAttribute=function(t_id){
	t_id=t_id.toLowerCase();
	return this.m_attributes.p_Get2(t_id)!=null;
}
c_XMLNode2.prototype.p_GetAttribute=function(t_id){
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		return "";
	}
	return t_attribute.m_value;
}
c_XMLNode2.prototype.p_GetAttribute2=function(t_id,t_defaultValue){
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		return t_defaultValue;
	}
	return t_attribute.m_value=="true" || parseInt((t_attribute.m_value),10)==1;
}
c_XMLNode2.prototype.p_GetAttribute3=function(t_id,t_defaultValue){
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		return t_defaultValue;
	}
	return parseInt((t_attribute.m_value),10);
}
c_XMLNode2.prototype.p_GetAttribute4=function(t_id,t_defaultValue){
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		return t_defaultValue;
	}
	return parseFloat(t_attribute.m_value);
}
c_XMLNode2.prototype.p_GetAttribute5=function(t_id,t_defaultValue){
	t_id=t_id.toLowerCase();
	var t_attribute=this.m_attributes.p_Get2(t_id);
	if(t_attribute==null){
		return t_defaultValue;
	}
	return t_attribute.m_value;
}
c_XMLNode2.prototype.p_GetChildren=function(t_name){
	var t_result=c_List5.m_new.call(new c_List5);
	if(this.m_firstChild==null || t_name.length==0){
		return t_result;
	}
	t_name=t_name.toLowerCase();
	if(this.m_firstChild!=null){
		var t_child=this.m_firstChild;
		while((t_child)!=null){
			if(t_child.m_name==t_name){
				t_result.p_AddLast5(t_child);
			}
			t_child=t_child.m_nextSibling;
		}
	}
	return t_result;
}
c_XMLNode2.prototype.p_GetChildren2=function(t_name,t_attributes){
	var t_result=c_List5.m_new.call(new c_List5);
	if(this.m_firstChild==null || t_name.length==0 && t_attributes.length==0){
		return t_result;
	}
	t_name=t_name.toLowerCase();
	var t_query=c_XMLAttributeQuery2.m_new.call(new c_XMLAttributeQuery2,t_attributes);
	if(this.m_firstChild!=null){
		var t_child=this.m_firstChild;
		while((t_child)!=null){
			if((t_name.length==0 || t_child.m_name==t_name) && t_query.p_Test2(t_child)){
				t_result.p_AddLast5(t_child);
			}
			t_child=t_child.m_nextSibling;
		}
	}
	return t_result;
}
c_XMLNode2.prototype.p_GetNextSibling=function(t_name){
	if(this.m_nextSibling==null){
		return this.m_doc.m_nullNode;
	}
	if(t_name.length==0){
		return this.m_nextSibling;
	}
	t_name=t_name.toLowerCase();
	var t_pointer=this.m_nextSibling;
	while((t_pointer)!=null){
		if(t_pointer.m_name==t_name){
			return t_pointer;
		}
		t_pointer=t_pointer.m_nextSibling;
	}
	return null;
}
c_XMLNode2.prototype.p_GetNextSibling2=function(t_name,t_attributes){
	if(this.m_nextSibling==null){
		return this.m_doc.m_nullNode;
	}
	if(t_name.length==0 && t_attributes.length==0){
		return this.m_nextSibling;
	}
	t_name=t_name.toLowerCase();
	var t_query=c_XMLAttributeQuery2.m_new.call(new c_XMLAttributeQuery2,t_attributes);
	var t_pointer=this.m_nextSibling;
	while((t_pointer)!=null){
		if((t_name.length==0 || t_pointer.m_name==t_name) && t_query.p_Test2(t_pointer)){
			return t_pointer;
		}
		t_pointer=t_pointer.m_nextSibling;
	}
	return null;
}
c_XMLNode2.prototype.p_Export=function(t_options){
	var t_buffer=c_XMLStringBuffer2.m_new.call(new c_XMLStringBuffer2,1024);
	this.p_Export2(t_options,t_buffer,0);
	return t_buffer.p_value();
}
c_XMLNode2.prototype.p_Export2=function(t_options,t_buffer,t_depth){
	if(t_buffer==null){
		t_buffer=c_XMLStringBuffer2.m_new.call(new c_XMLStringBuffer2,1024);
	}
	var t_index=0;
	if((t_options&1)==0){
		for(t_index=0;t_index<t_depth;t_index=t_index+1){
			t_buffer.p_Add3(9);
		}
	}
	t_buffer.p_Add3(60);
	t_buffer.p_Add4(this.m_name);
	var t_=this.m_attributes.p_Keys().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_id=t_.p_NextObject();
		t_buffer.p_Add3(32);
		t_buffer.p_Add4(t_id);
		t_buffer.p_Add3(61);
		t_buffer.p_Add3(34);
		t_buffer.p_Add4(this.m_attributes.p_Get2(t_id).m_value);
		t_buffer.p_Add3(34);
	}
	if(this.m_children.p_IsEmpty() && ((t_options&4)!=0)){
		t_buffer.p_Add3(32);
		t_buffer.p_Add3(47);
		t_buffer.p_Add3(62);
		if((t_options&2)==0){
			t_buffer.p_Add3(10);
		}
	}else{
		t_buffer.p_Add3(62);
		if((t_options&2)==0){
			t_buffer.p_Add3(10);
		}
		if(this.m_children.p_IsEmpty()==false){
			var t_2=this.m_children.p_ObjectEnumerator();
			while(t_2.p_HasNext()){
				var t_child=t_2.p_NextObject();
				t_child.p_Export2(t_options,t_buffer,t_depth+1);
			}
		}
		if((this.m_value.length)!=0){
			t_buffer.p_Add4(this.m_value);
		}
		if((t_options&1)==0){
			for(t_index=0;t_index<t_depth;t_index=t_index+1){
				t_buffer.p_Add3(9);
			}
		}
		t_buffer.p_Add3(60);
		t_buffer.p_Add3(47);
		t_buffer.p_Add4(this.m_name);
		t_buffer.p_Add3(62);
		if((t_options&2)==0){
			t_buffer.p_Add3(10);
		}
	}
}
function c_XMLDoc2(){
	c_XMLNode2.call(this);
	this.m_nullNode=null;
	this.m_version="";
	this.m_encoding="";
	this.m_paths=c_StringMap4.m_new.call(new c_StringMap4);
}
c_XMLDoc2.prototype=extend_class(c_XMLNode2);
c_XMLDoc2.m_new=function(t_name,t_version,t_encoding){
	c_XMLNode2.m_new2.call(this);
	this.m_valid=true;
	this.m_doc=this;
	this.m_nullNode=c_XMLNode2.m_new.call(new c_XMLNode2,"",false);
	this.m_nullNode.m_doc=this;
	this.m_name=t_name.toLowerCase();
	this.m_version=t_version;
	this.m_encoding=t_encoding;
	this.m_path=t_name;
	this.m_pathList=c_List5.m_new.call(new c_List5);
	this.m_pathListNode=this.m_pathList.p_AddLast5(this);
	this.m_paths.p_Insert4(this.m_path,this.m_pathList);
	return this;
}
c_XMLDoc2.m_new2=function(){
	c_XMLNode2.m_new2.call(this);
	return this;
}
c_XMLDoc2.prototype.p_Export=function(t_options){
	var t_buffer=c_XMLStringBuffer2.m_new.call(new c_XMLStringBuffer2,1024);
	t_buffer.p_Add4("<?xml");
	if((this.m_version.length)!=0){
		t_buffer.p_Add4(" version=");
		t_buffer.p_Add3(34);
		t_buffer.p_Add4(this.m_version);
		t_buffer.p_Add3(34);
	}
	if((this.m_encoding.length)!=0){
		t_buffer.p_Add4(" encoding=");
		t_buffer.p_Add3(34);
		t_buffer.p_Add4(this.m_encoding);
		t_buffer.p_Add3(34);
	}
	t_buffer.p_Add4("?>");
	if((t_options&2)==0){
		t_buffer.p_Add3(10);
	}
	c_XMLNode2.prototype.p_Export2.call(this,t_options,t_buffer,0);
	return t_buffer.p_value();
}
function c_XMLError2(){
	Object.call(this);
	this.m_error=false;
	this.m_message="";
	this.m_line=0;
	this.m_column=0;
	this.m_offset=0;
}
c_XMLError2.prototype.p_Reset=function(){
	this.m_error=false;
	this.m_message="";
	this.m_line=-1;
	this.m_column=-1;
	this.m_offset=-1;
}
c_XMLError2.prototype.p_Set2=function(t_message,t_line,t_column,t_offset){
	this.m_error=true;
	this.m_message=t_message;
	this.m_line=t_line;
	this.m_column=t_column;
	this.m_offset=t_offset;
}
function c_XMLStringBuffer2(){
	Object.call(this);
	this.m_chunk=128;
	this.m_count=0;
	this.m_data=[];
	this.m_dirty=0;
	this.m_cache="";
}
c_XMLStringBuffer2.m_new=function(t_chunk){
	this.m_chunk=t_chunk;
	return this;
}
c_XMLStringBuffer2.prototype.p_Length=function(){
	return this.m_count;
}
c_XMLStringBuffer2.prototype.p_Last=function(t_defaultValue){
	if(this.m_count==0){
		return t_defaultValue;
	}
	return this.m_data[this.m_count-1];
}
c_XMLStringBuffer2.prototype.p_Add3=function(t_asc){
	if(this.m_count==this.m_data.length){
		this.m_data=resize_number_array(this.m_data,this.m_data.length+this.m_chunk);
	}
	this.m_data[this.m_count]=t_asc;
	this.m_count+=1;
	this.m_dirty=1;
}
c_XMLStringBuffer2.prototype.p_Add4=function(t_text){
	if(t_text.length==0){
		return;
	}
	if(this.m_count+t_text.length>=this.m_data.length){
		this.m_data=resize_number_array(this.m_data,(((this.m_data.length)+(this.m_chunk)*Math.ceil((t_text.length)/(this.m_chunk)))|0));
	}
	for(var t_textIndex=0;t_textIndex<t_text.length;t_textIndex=t_textIndex+1){
		this.m_data[this.m_count]=t_text.charCodeAt(t_textIndex);
		this.m_count+=1;
	}
	this.m_dirty=1;
}
c_XMLStringBuffer2.prototype.p_Add5=function(t_text,t_offset,t_suggestedLength){
	var t_realLength=t_text.length-t_offset;
	if(t_suggestedLength>0 && t_suggestedLength<t_realLength){
		t_realLength=t_suggestedLength;
	}
	if(t_realLength==0){
		return;
	}
	if(this.m_count+t_realLength>=this.m_data.length){
		this.m_data=resize_number_array(this.m_data,(((this.m_data.length)+(this.m_chunk)*Math.ceil((t_realLength)/(this.m_chunk)))|0));
	}
	for(var t_textIndex=t_offset;t_textIndex<t_offset+t_realLength;t_textIndex=t_textIndex+1){
		this.m_data[this.m_count]=t_text.charCodeAt(t_textIndex);
		this.m_count+=1;
	}
	this.m_dirty=1;
}
c_XMLStringBuffer2.prototype.p_value=function(){
	if((this.m_dirty)!=0){
		this.m_dirty=0;
		if(this.m_count==0){
			this.m_cache="";
		}else{
			this.m_cache=string_fromchars(this.m_data.slice(0,this.m_count));
		}
	}
	return this.m_cache;
}
c_XMLStringBuffer2.prototype.p_Clear=function(){
	this.m_count=0;
	this.m_cache="";
	this.m_dirty=0;
}
c_XMLStringBuffer2.prototype.p_Trim=function(){
	if(this.m_count==0){
		return false;
	}
	if(this.m_count==1 && (this.m_data[0]==32 || this.m_data[0]==9) || this.m_count==2 && (this.m_data[0]==32 || this.m_data[0]==9) && (this.m_data[1]==32 || this.m_data[1]==9)){
		this.p_Clear();
		return true;
	}
	var t_startIndex=0;
	for(t_startIndex=0;t_startIndex<this.m_count;t_startIndex=t_startIndex+1){
		if(this.m_data[t_startIndex]!=32 && this.m_data[t_startIndex]!=9){
			break;
		}
	}
	if(t_startIndex==this.m_count){
		this.p_Clear();
		return true;
	}
	var t_endIndex=0;
	for(t_endIndex=this.m_count-1;t_endIndex>=0;t_endIndex=t_endIndex+-1){
		if(this.m_data[t_endIndex]!=32 && this.m_data[t_endIndex]!=9){
			break;
		}
	}
	if(t_startIndex==0 && t_endIndex==this.m_count-1){
		return false;
	}
	this.m_count=t_endIndex-t_startIndex+1;
	if(t_startIndex>0){
		for(var t_trimIndex=0;t_trimIndex<this.m_count;t_trimIndex=t_trimIndex+1){
			this.m_data[t_trimIndex]=this.m_data[t_trimIndex+t_startIndex];
		}
	}
	return true;
}
function c_List5(){
	Object.call(this);
	this.m__head=(c_HeadNode5.m_new.call(new c_HeadNode5));
}
c_List5.m_new=function(){
	return this;
}
c_List5.prototype.p_AddLast5=function(t_data){
	return c_Node10.m_new.call(new c_Node10,this.m__head,this.m__head.m__pred,t_data);
}
c_List5.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast5(t_t);
	}
	return this;
}
c_List5.prototype.p_RemoveLast=function(){
	var t_data=this.m__head.p_PrevNode().m__data;
	this.m__head.m__pred.p_Remove();
	return t_data;
}
c_List5.prototype.p_Equals5=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_List5.prototype.p_FindLast3=function(t_value,t_start){
	while(t_start!=this.m__head){
		if(this.p_Equals5(t_value,t_start.m__data)){
			return t_start;
		}
		t_start=t_start.m__pred;
	}
	return null;
}
c_List5.prototype.p_FindLast4=function(t_value){
	return this.p_FindLast3(t_value,this.m__head.m__pred);
}
c_List5.prototype.p_RemoveLast3=function(t_value){
	var t_node=this.p_FindLast4(t_value);
	if((t_node)!=null){
		t_node.p_Remove();
	}
}
c_List5.prototype.p_IsEmpty=function(){
	return this.m__head.m__succ==this.m__head;
}
c_List5.prototype.p_Last2=function(){
	return this.m__head.p_PrevNode().m__data;
}
c_List5.prototype.p_First=function(){
	return this.m__head.p_NextNode().m__data;
}
c_List5.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator5.m_new.call(new c_Enumerator5,this);
}
function c_Node10(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node10.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node10.m_new2=function(){
	return this;
}
c_Node10.prototype.p_GetNode=function(){
	return this;
}
c_Node10.prototype.p_PrevNode=function(){
	return this.m__pred.p_GetNode();
}
c_Node10.prototype.p_Remove=function(){
	this.m__succ.m__pred=this.m__pred;
	this.m__pred.m__succ=this.m__succ;
	return 0;
}
c_Node10.prototype.p_NextNode=function(){
	return this.m__succ.p_GetNode();
}
function c_HeadNode5(){
	c_Node10.call(this);
}
c_HeadNode5.prototype=extend_class(c_Node10);
c_HeadNode5.m_new=function(){
	c_Node10.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
c_HeadNode5.prototype.p_GetNode=function(){
	return null;
}
function bb_xml2_HasStringAtOffset(t_needle,t_haystack,t_offset){
	if(t_offset+t_needle.length>t_haystack.length){
		return false;
	}
	for(var t_index=0;t_index<t_needle.length;t_index=t_index+1){
		if(t_needle.charCodeAt(t_index)!=t_haystack.charCodeAt(t_offset+t_index)){
			return false;
		}
	}
	return true;
}
function c_Map6(){
	Object.call(this);
	this.m_root=null;
}
c_Map6.m_new=function(){
	return this;
}
c_Map6.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map6.prototype.p_RotateLeft6=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map6.prototype.p_RotateRight6=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map6.prototype.p_InsertFixup6=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft6(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight6(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight6(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft6(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map6.prototype.p_Set6=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node11.m_new.call(new c_Node11,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup6(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map6.prototype.p_Insert4=function(t_key,t_value){
	return this.p_Set6(t_key,t_value);
}
c_Map6.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map6.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_StringMap4(){
	c_Map6.call(this);
}
c_StringMap4.prototype=extend_class(c_Map6);
c_StringMap4.m_new=function(){
	c_Map6.m_new.call(this);
	return this;
}
c_StringMap4.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Node11(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node11.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node11.m_new2=function(){
	return this;
}
function c_XMLAttributeQuery2(){
	Object.call(this);
	this.m_count=0;
	this.m_items=[];
	this.m_chunk=32;
}
c_XMLAttributeQuery2.m_new=function(t_query){
	var t_queryIndex=0;
	var t_queryAsc=0;
	var t_buffer=c_XMLStringBuffer2.m_new.call(new c_XMLStringBuffer2,256);
	var t_isEscaped=false;
	var t_processBuffer=false;
	var t_processItem=false;
	var t_hasId=false;
	var t_hasValue=false;
	var t_hasEquals=false;
	var t_hasSepcial=false;
	var t_itemId="";
	var t_itemValue="";
	for(t_queryIndex=0;t_queryIndex<t_query.length;t_queryIndex=t_queryIndex+1){
		t_queryAsc=t_query.charCodeAt(t_queryIndex);
		if(t_isEscaped){
			t_isEscaped=false;
			t_buffer.p_Add3(t_queryAsc);
		}else{
			var t_1=t_queryAsc;
			if(t_1==38){
				t_processBuffer=true;
				t_processItem=true;
			}else{
				if(t_1==61){
					t_processBuffer=true;
					t_hasEquals=true;
				}else{
					if(t_1==64){
						if(t_hasId==false){
							if(t_buffer.p_Length()==0){
								t_hasSepcial=true;
							}
						}else{
							t_buffer.p_Add3(t_queryAsc);
						}
					}else{
						if(t_1==92){
							t_isEscaped=true;
						}else{
							if(t_hasId || (t_queryAsc==45 || t_queryAsc==95 || t_queryAsc>=48 && t_queryAsc<=57 || t_queryAsc>=65 && t_queryAsc<=90 || t_queryAsc>=97 && t_queryAsc<=122)){
								t_buffer.p_Add3(t_queryAsc);
							}
						}
					}
				}
			}
		}
		if(t_queryIndex==t_query.length-1){
			t_processBuffer=true;
			t_processItem=true;
			if(t_isEscaped && t_hasId){
				t_buffer.p_Add3(92);
			}
			if(t_hasEquals && t_buffer.p_Length()==0){
				t_hasValue=true;
			}
		}
		if(t_processBuffer){
			t_processBuffer=false;
			if(t_hasId==false){
				t_itemId=t_buffer.p_value();
				t_buffer.p_Clear();
				t_hasId=t_itemId.length>0;
			}else{
				t_itemValue=t_buffer.p_value();
				t_buffer.p_Clear();
				t_hasValue=true;
			}
		}
		if(t_processItem){
			t_processItem=false;
			if(t_hasId){
				if(this.m_count==this.m_items.length){
					this.m_items=resize_object_array(this.m_items,this.m_items.length+this.m_chunk);
				}
				this.m_items[this.m_count]=c_XMLAttributeQueryItem2.m_new.call(new c_XMLAttributeQueryItem2,t_itemId,t_itemValue,t_hasValue,t_hasSepcial);
				this.m_count+=1;
				t_itemId="";
				t_itemValue="";
				t_hasId=false;
				t_hasValue=false;
				t_hasSepcial=false;
			}
		}
	}
	return this;
}
c_XMLAttributeQuery2.m_new2=function(){
	return this;
}
c_XMLAttributeQuery2.prototype.p_Length=function(){
	return this.m_count;
}
c_XMLAttributeQuery2.prototype.p_Test2=function(t_node){
	var t_attribute=null;
	for(var t_index=0;t_index<this.m_count;t_index=t_index+1){
		if(this.m_items[t_index].m_special==false){
			t_attribute=t_node.p_GetXMLAttribute(this.m_items[t_index].m_id);
			if(t_attribute==null || this.m_items[t_index].m_required && t_attribute.m_value!=this.m_items[t_index].m_value){
				return false;
			}
		}else{
			var t_2=this.m_items[t_index].m_id;
			if(t_2=="value"){
				if(this.m_items[t_index].m_required && t_node.m_value!=this.m_items[t_index].m_value){
					return false;
				}
			}
		}
	}
	return true;
}
function c_XMLAttributeQueryItem2(){
	Object.call(this);
	this.m_id="";
	this.m_value="";
	this.m_required=false;
	this.m_special=false;
}
c_XMLAttributeQueryItem2.m_new=function(t_id,t_value,t_required,t_special){
	this.m_id=t_id;
	this.m_value=t_value;
	this.m_required=t_required;
	this.m_special=t_special;
	return this;
}
c_XMLAttributeQueryItem2.m_new2=function(){
	return this;
}
function c_XMLAttribute2(){
	Object.call(this);
	this.m_id="";
	this.m_value="";
}
c_XMLAttribute2.m_new=function(t_id,t_value){
	this.m_id=t_id;
	this.m_value=t_value;
	return this;
}
c_XMLAttribute2.m_new2=function(){
	return this;
}
function c_Map7(){
	Object.call(this);
	this.m_root=null;
}
c_Map7.m_new=function(){
	return this;
}
c_Map7.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map7.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map7.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
c_Map7.prototype.p_RotateLeft7=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map7.prototype.p_RotateRight7=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map7.prototype.p_InsertFixup7=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft7(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight7(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight7(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft7(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map7.prototype.p_Set7=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node12.m_new.call(new c_Node12,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup7(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map7.prototype.p_Insert5=function(t_key,t_value){
	return this.p_Set7(t_key,t_value);
}
c_Map7.prototype.p_Keys=function(){
	return c_MapKeys.m_new.call(new c_MapKeys,this);
}
c_Map7.prototype.p_FirstNode=function(){
	if(!((this.m_root)!=null)){
		return null;
	}
	var t_node=this.m_root;
	while((t_node.m_left)!=null){
		t_node=t_node.m_left;
	}
	return t_node;
}
function c_StringMap5(){
	c_Map7.call(this);
}
c_StringMap5.prototype=extend_class(c_Map7);
c_StringMap5.m_new=function(){
	c_Map7.m_new.call(this);
	return this;
}
c_StringMap5.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Node12(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node12.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node12.m_new2=function(){
	return this;
}
c_Node12.prototype.p_NextNode=function(){
	var t_node=null;
	if((this.m_right)!=null){
		t_node=this.m_right;
		while((t_node.m_left)!=null){
			t_node=t_node.m_left;
		}
		return t_node;
	}
	t_node=this;
	var t_parent=this.m_parent;
	while(((t_parent)!=null) && t_node==t_parent.m_right){
		t_node=t_parent;
		t_parent=t_parent.m_parent;
	}
	return t_parent;
}
function bb_xml2_ParseXML(t_raw,t_error,t_options){
	var t_rawLine=1;
	var t_rawColumn=1;
	var t_rawIndex=0;
	var t_rawAsc=0;
	var t_rawPos=0;
	var t_rawChunkStart=0;
	var t_rawChunkLength=0;
	var t_rawChunkEnd=0;
	var t_rawChunk="";
	var t_rawChunkIndex=0;
	var t_rawChunkAsc=0;
	var t_doc=null;
	var t_parent=null;
	var t_current=null;
	var t_whitespaceBuffer=c_XMLStringBuffer2.m_new.call(new c_XMLStringBuffer2,1024);
	var t_attributeBuffer=c_XMLStringBuffer2.m_new.call(new c_XMLStringBuffer2,1024);
	var t_processAttributeBuffer=false;
	var t_processTag=false;
	var t_tagName="";
	var t_formatVersion="";
	var t_formatEncoding="";
	var t_attributeId="";
	var t_attributeValue="";
	var t_inTag=false;
	var t_inQuote=false;
	var t_inFormat=false;
	var t_isCloseSelf=false;
	var t_isSingleAttribute=false;
	var t_hasFormat=false;
	var t_hasTagName=false;
	var t_hasTagClose=false;
	var t_hasAttributeId=false;
	var t_hasAttributeValue=false;
	var t_hasEquals=false;
	var t_waitTagClose=false;
	var t_stack=c_List5.m_new.call(new c_List5);
	var t_quoteAsc=0;
	if((t_error)!=null){
		t_error.p_Reset();
	}
	for(t_rawIndex=0;t_rawIndex<t_raw.length;t_rawIndex=t_rawIndex+1){
		t_rawAsc=t_raw.charCodeAt(t_rawIndex);
		if(t_inTag==false){
			var t_3=t_rawAsc;
			if(t_3==9 || t_3==32){
				if(((t_whitespaceBuffer.p_Length())!=0) || ((t_parent)!=null) && ((t_parent.m_value.length)!=0)){
					var t_lastAsc=t_whitespaceBuffer.p_Last(-1);
					if((t_options&1)==0 || ((t_whitespaceBuffer.p_Length())!=0) && t_lastAsc!=9 && t_lastAsc!=32){
						if(t_parent==null){
							if((t_error)!=null){
								t_error.p_Set2("illegal character",t_rawLine,t_rawColumn,t_rawIndex);
							}
							return null;
						}
						t_whitespaceBuffer.p_Add3(t_rawAsc);
					}
				}
				t_rawColumn+=1;
			}else{
				if(t_3==10){
					t_rawLine+=1;
					t_rawColumn=1;
				}else{
					if(t_3==13){
					}else{
						if(t_3==60){
							if(bb_xml2_HasStringAtOffset("<?xml",t_raw,t_rawIndex)){
								if(t_hasFormat){
									if((t_error)!=null){
										t_error.p_Set2("duplicate xml format",t_rawLine,t_rawColumn,t_rawIndex);
									}
									return null;
								}
								t_inTag=true;
								t_inFormat=true;
								t_rawColumn+="<?xml".length;
								t_rawIndex=t_rawPos+"<?xml".length-1;
							}else{
								if(bb_xml2_HasStringAtOffset("<!--",t_raw,t_rawIndex)){
									t_rawPos=t_raw.indexOf("-->",t_rawIndex+"<!--".length);
									if(t_rawPos==-1){
										if((t_error)!=null){
											t_error.p_Set2("comment not closed",t_rawLine,t_rawColumn,t_rawIndex);
										}
										return null;
									}
									t_rawChunkStart=t_rawIndex+"<!--".length;
									t_rawChunkLength=t_rawPos-(t_rawIndex+"<!--".length);
									t_rawChunkEnd=t_rawChunkStart+t_rawChunkLength;
									for(t_rawChunkIndex=t_rawChunkStart;t_rawChunkIndex<t_rawChunkEnd;t_rawChunkIndex=t_rawChunkIndex+1){
										t_rawChunkAsc=t_raw.charCodeAt(t_rawChunkIndex);
										if(t_rawChunkAsc==10){
											t_rawLine+=1;
											t_rawColumn=1;
										}else{
											t_rawColumn+=1;
										}
									}
									t_rawIndex=t_rawPos+"-->".length-1;
								}else{
									if(bb_xml2_HasStringAtOffset("<![CDATA[",t_raw,t_rawIndex)){
										t_rawPos=t_raw.indexOf("]]>",t_rawIndex+"<![CDATA[".length);
										if(t_rawPos==-1){
											if((t_error)!=null){
												t_error.p_Set2("cdata not closed",t_rawLine,t_rawColumn,t_rawIndex);
											}
											return null;
										}
										if(t_parent==null){
											if((t_error)!=null){
												t_error.p_Set2("unexepcted cdata",t_rawLine,t_rawColumn,t_rawIndex);
											}
											return null;
										}
										t_rawChunkStart=t_rawIndex+"<![CDATA[".length;
										t_rawChunkLength=t_rawPos-(t_rawIndex+"<![CDATA[".length);
										t_rawChunkEnd=t_rawChunkStart+t_rawChunkLength;
										for(t_rawChunkIndex=t_rawChunkStart;t_rawChunkIndex<t_rawChunkEnd;t_rawChunkIndex=t_rawChunkIndex+1){
											t_rawChunkAsc=t_raw.charCodeAt(t_rawChunkIndex);
											if(t_rawChunkAsc==10){
												t_rawLine+=1;
												t_rawColumn=1;
											}else{
												t_rawColumn+=1;
											}
										}
										t_whitespaceBuffer.p_Add5(t_raw,t_rawChunkStart,t_rawChunkLength);
										t_rawIndex=t_rawPos+"]]>".length-1;
									}else{
										t_inTag=true;
										if((t_whitespaceBuffer.p_Length())!=0){
											if((t_options&1)==0){
												t_parent.m_value=t_parent.m_value+t_whitespaceBuffer.p_value();
												t_whitespaceBuffer.p_Clear();
											}else{
												t_whitespaceBuffer.p_Trim();
												if((t_whitespaceBuffer.p_Length())!=0){
													t_parent.m_value=t_parent.m_value+t_whitespaceBuffer.p_value();
													t_whitespaceBuffer.p_Clear();
												}
											}
										}
										t_rawColumn+=1;
									}
								}
							}
						}else{
							if(t_3==62){
								if((t_error)!=null){
									t_error.p_Set2("unexpected close bracket",t_rawLine,t_rawColumn,t_rawIndex);
								}
								return null;
							}else{
								if(t_parent==null){
									if((t_error)!=null){
										t_error.p_Set2("illegal character",t_rawLine,t_rawColumn,t_rawIndex);
									}
									return null;
								}
								t_whitespaceBuffer.p_Add3(t_rawAsc);
								t_rawColumn+=1;
							}
						}
					}
				}
			}
		}else{
			if(t_waitTagClose){
				var t_4=t_rawAsc;
				if(t_4==9){
					t_rawColumn+=1;
				}else{
					if(t_4==10){
						t_rawLine+=1;
						t_rawColumn=1;
					}else{
						if(t_4==13){
						}else{
							if(t_4==32){
								t_rawColumn+=1;
							}else{
								if(t_4==62){
									t_waitTagClose=false;
									t_processTag=true;
								}else{
									if((t_error)!=null){
										t_error.p_Set2("unexpected character",t_rawLine,t_rawColumn,t_rawIndex);
									}
									return null;
								}
							}
						}
					}
				}
			}else{
				if(t_inQuote==false){
					var t_5=t_rawAsc;
					if(t_5==9){
						t_rawColumn+=1;
						if((t_attributeBuffer.p_Length())!=0){
							t_processAttributeBuffer=true;
						}
					}else{
						if(t_5==10){
							t_rawLine+=1;
							t_rawColumn=1;
							if((t_attributeBuffer.p_Length())!=0){
								t_processAttributeBuffer=true;
							}
						}else{
							if(t_5==13){
							}else{
								if(t_5==32){
									t_rawColumn+=1;
									if((t_attributeBuffer.p_Length())!=0){
										t_processAttributeBuffer=true;
									}
								}else{
									if(t_5==34 || t_5==39){
										t_quoteAsc=t_rawAsc;
										t_inQuote=true;
										if(t_hasTagClose || t_hasTagName==false && t_inFormat==false || t_hasEquals==false || ((t_attributeBuffer.p_Length())!=0)){
											if((t_error)!=null){
												t_error.p_Set2("unexpected quote",t_rawLine,t_rawColumn,t_rawIndex);
											}
											return null;
										}
										t_rawColumn+=1;
										if((t_attributeBuffer.p_Length())!=0){
											t_processAttributeBuffer=true;
										}
									}else{
										if(t_5==47){
											if(t_hasTagClose || t_hasEquals){
												if((t_error)!=null){
													t_error.p_Set2("unexpected slash",t_rawLine,t_rawColumn,t_rawIndex);
												}
												return null;
											}
											if(t_hasTagName){
												t_waitTagClose=true;
												t_isCloseSelf=true;
											}
											if((t_attributeBuffer.p_Length())!=0){
												t_processAttributeBuffer=true;
											}
											t_hasTagClose=true;
											t_rawColumn+=1;
										}else{
											if(t_5==61){
												t_rawColumn+=1;
												if(t_hasTagClose || t_hasTagName==false && t_inFormat==false || t_hasEquals || t_hasAttributeId || t_attributeBuffer.p_Length()==0){
													if((t_error)!=null){
														t_error.p_Set2("unexpected equals",t_rawLine,t_rawColumn,t_rawIndex);
													}
													return null;
												}
												t_processAttributeBuffer=true;
												t_hasEquals=true;
											}else{
												if(t_5==62){
													if(t_hasEquals || t_hasTagName==false && t_attributeBuffer.p_Length()==0){
														if((t_error)!=null){
															t_error.p_Set2("unexpected close bracket",t_rawLine,t_rawColumn,t_rawIndex);
														}
														return null;
													}
													if((t_attributeBuffer.p_Length())!=0){
														t_processAttributeBuffer=true;
													}
													t_processTag=true;
													t_rawColumn+=1;
												}else{
													if(t_5==63){
														if(t_inFormat==false || t_rawIndex==t_raw.length-1 || t_raw.charCodeAt(t_rawIndex+1)!=62){
															if((t_error)!=null){
																t_error.p_Set2("unexpected questionmark",t_rawLine,t_rawColumn,t_rawIndex);
															}
															return null;
														}
														t_processTag=true;
														t_rawIndex+=1;
														t_rawColumn+=1;
													}else{
														if(t_rawAsc==45 || t_rawAsc==95 || t_rawAsc>=48 && t_rawAsc<=57 || t_rawAsc>=65 && t_rawAsc<=90 || t_rawAsc>=97 && t_rawAsc<=122){
															if(t_hasTagClose==true && t_hasTagName==true){
																if((t_error)!=null){
																	t_error.p_Set2("unexpected character",t_rawLine,t_rawColumn,t_rawIndex);
																}
																return null;
															}
															if(t_hasAttributeId && t_hasEquals==false){
																t_isSingleAttribute=true;
																t_processAttributeBuffer=true;
															}else{
																t_attributeBuffer.p_Add3(t_rawAsc);
															}
															t_rawColumn+=1;
														}else{
															if((t_error)!=null){
																t_error.p_Set2("illegal character",t_rawLine,t_rawColumn,t_rawIndex);
															}
															return null;
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}else{
					if(t_rawAsc==t_quoteAsc){
						t_inQuote=false;
						t_processAttributeBuffer=true;
					}else{
						t_attributeBuffer.p_Add3(t_rawAsc);
					}
				}
				if(t_processAttributeBuffer){
					t_processAttributeBuffer=false;
					if(t_hasTagName==false && t_inFormat==false){
						if(t_hasTagClose==false){
							t_tagName=t_attributeBuffer.p_value();
							if(t_parent==null){
								if(t_doc==null){
									t_doc=c_XMLDoc2.m_new.call(new c_XMLDoc2,t_tagName,t_formatVersion,t_formatEncoding);
									t_doc.m_doc=t_doc;
									t_doc.m_parent=null;
									t_doc.m_line=t_rawLine;
									t_doc.m_column=t_rawColumn;
									t_doc.m_offset=t_rawIndex;
									t_current=(t_doc);
								}else{
									if((t_error)!=null){
										t_error.p_Set2("duplicate root",t_rawLine,t_rawColumn,t_rawIndex);
									}
									return null;
								}
							}else{
								t_current=t_parent.p_AddChild(t_tagName,"");
								t_current.m_line=t_rawLine;
								t_current.m_column=t_rawColumn;
								t_current.m_offset=t_rawIndex;
							}
							t_hasTagName=true;
						}else{
							t_tagName=t_attributeBuffer.p_value().toLowerCase();
							if(t_parent==null || t_tagName!=t_parent.m_name){
								if((t_error)!=null){
									t_error.p_Set2("mismatched end tag",t_rawLine,t_rawColumn,t_rawIndex);
								}
								return null;
							}
							t_waitTagClose=true;
							t_hasTagName=true;
						}
					}else{
						if(t_hasAttributeId==false){
							t_attributeId=t_attributeBuffer.p_value().toLowerCase();
							t_hasAttributeId=true;
						}else{
							t_attributeValue=t_attributeBuffer.p_value();
							t_hasAttributeValue=true;
						}
						if(t_processTag && t_hasAttributeId || t_hasAttributeId && t_hasAttributeValue || t_isSingleAttribute || t_hasTagClose){
							if(t_inFormat==false){
								t_current.p_SetAttribute5(t_attributeId,t_attributeValue);
							}else{
								var t_6=t_attributeId;
								if(t_6=="version"){
									t_formatVersion=t_attributeValue;
								}else{
									if(t_6=="encoding"){
										t_formatEncoding=t_attributeValue;
									}
								}
							}
							t_attributeId="";
							t_attributeValue="";
							t_hasAttributeId=false;
							t_hasAttributeValue=false;
							t_hasEquals=false;
						}
					}
					t_attributeBuffer.p_Clear();
				}
				if(t_isSingleAttribute){
					t_isSingleAttribute=false;
					t_attributeBuffer.p_Add3(t_rawAsc);
				}
			}
			if(t_processTag){
				t_processTag=false;
				if(t_inFormat==false){
					if(t_hasTagClose==false){
						t_parent=t_current;
						t_current=null;
						t_stack.p_AddLast5(t_parent);
					}else{
						if(t_isCloseSelf==false){
							if((t_whitespaceBuffer.p_Length())!=0){
								t_parent.m_value=t_parent.m_value+t_whitespaceBuffer.p_value();
								t_whitespaceBuffer.p_Clear();
							}
							t_stack.p_RemoveLast();
							if(t_stack.p_IsEmpty()){
								t_parent=null;
							}else{
								t_parent=t_stack.p_Last2();
							}
						}else{
							t_isCloseSelf=false;
						}
					}
				}else{
					t_hasFormat=true;
					t_inFormat=false;
				}
				t_inTag=false;
				t_hasTagClose=false;
				t_hasTagName=false;
				t_waitTagClose=false;
				t_tagName="";
			}
		}
	}
	if(t_inTag || ((t_parent)!=null) || t_doc==null){
		if((t_error)!=null){
			t_error.p_Set2("unexpected end of xml",t_rawLine,t_rawColumn,t_rawIndex);
		}
		return null;
	}
	return t_doc;
}
function c_Enumerator5(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator5.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator5.m_new2=function(){
	return this;
}
c_Enumerator5.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator5.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_Enumerator6(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator6.m_new=function(t_stack){
	this.m_stack=t_stack;
	return this;
}
c_Enumerator6.m_new2=function(){
	return this;
}
c_Enumerator6.prototype.p_HasNext=function(){
	return this.m_index<this.m_stack.p_Length();
}
c_Enumerator6.prototype.p_NextObject=function(){
	this.m_index+=1;
	return this.m_stack.m_data[this.m_index-1];
}
function c_MapKeys(){
	Object.call(this);
	this.m_map=null;
}
c_MapKeys.m_new=function(t_map){
	this.m_map=t_map;
	return this;
}
c_MapKeys.m_new2=function(){
	return this;
}
c_MapKeys.prototype.p_ObjectEnumerator=function(){
	return c_KeyEnumerator.m_new.call(new c_KeyEnumerator,this.m_map.p_FirstNode());
}
function c_KeyEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_KeyEnumerator.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_KeyEnumerator.m_new2=function(){
	return this;
}
c_KeyEnumerator.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_KeyEnumerator.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t.m_key;
}
function c_User(){
	Object.call(this);
	this.m_id="";
	this.m_username="";
	this.m_index=0;
}
c_User.m__list=null;
c_User.m_Clear=function(){
	c_User.m__list=c_List6.m_new.call(new c_List6);
}
c_User.m_FromIndex=function(t_i){
	if(c_User.m__list==null){
		return null;
	}
	var t_=c_User.m__list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_u=t_.p_NextObject();
		print("*"+String(t_u.m_index)+"*");
		if(t_u.m_index==t_i){
			return t_u;
		}
	}
	return null;
}
c_User.m_new=function(t_id,t_username,t_index){
	this.m_id=t_id;
	this.m_username=t_username;
	this.m_index=t_index;
	if(c_User.m__list==null){
		c_User.m__list=c_List6.m_new.call(new c_List6);
	}
	c_User.m__list.p_AddLast6(this);
	return this;
}
c_User.m_new2=function(){
	return this;
}
function c_List6(){
	Object.call(this);
	this.m__head=(c_HeadNode6.m_new.call(new c_HeadNode6));
}
c_List6.m_new=function(){
	return this;
}
c_List6.prototype.p_AddLast6=function(t_data){
	return c_Node13.m_new.call(new c_Node13,this.m__head,this.m__head.m__pred,t_data);
}
c_List6.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast6(t_t);
	}
	return this;
}
c_List6.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator8.m_new.call(new c_Enumerator8,this);
}
function c_Node13(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node13.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node13.m_new2=function(){
	return this;
}
function c_HeadNode6(){
	c_Node13.call(this);
}
c_HeadNode6.prototype=extend_class(c_Node13);
c_HeadNode6.m_new=function(){
	c_Node13.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_UploadedMap(){
	Object.call(this);
	this.m_id="";
	this.m_owner="";
	this.m_name="";
	this.m_ownerName="";
	this.m_borrower="";
	this.m_y=0;
	this.m_shareid="";
	this.m_url="";
}
c_UploadedMap.m__list=null;
c_UploadedMap.m_Clear=function(){
	c_UploadedMap.m__list=c_List7.m_new.call(new c_List7);
}
c_UploadedMap.m_page=0;
c_UploadedMap.m_FindFromId=function(t_id){
	if(c_UploadedMap.m__list==null){
		return null;
	}
	var t_=c_UploadedMap.m__list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_u=t_.p_NextObject();
		if(t_u.m_id==t_id){
			return t_u;
		}
	}
	return null;
}
c_UploadedMap.m_new=function(t_id,t_name,t_url,t_owner,t_ownerName){
	this.m_id=t_id;
	this.m_name=t_name;
	this.m_url=t_url;
	this.m_owner=t_owner;
	this.m_ownerName=t_ownerName;
	if(c_UploadedMap.m__list==null){
		c_UploadedMap.m__list=c_List7.m_new.call(new c_List7);
	}
	c_UploadedMap.m__list.p_AddLast7(this);
	return this;
}
c_UploadedMap.m_new2=function(){
	return this;
}
function c_List7(){
	Object.call(this);
	this.m__head=(c_HeadNode7.m_new.call(new c_HeadNode7));
}
c_List7.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator7.m_new.call(new c_Enumerator7,this);
}
c_List7.m_new=function(){
	return this;
}
c_List7.prototype.p_AddLast7=function(t_data){
	return c_Node14.m_new.call(new c_Node14,this.m__head,this.m__head.m__pred,t_data);
}
c_List7.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast7(t_t);
	}
	return this;
}
c_List7.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List7.prototype.p_Equals6=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_List7.prototype.p_RemoveEach3=function(t_value){
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		var t_succ=t_node.m__succ;
		if(this.p_Equals6(t_node.m__data,t_value)){
			t_node.p_Remove();
		}
		t_node=t_succ;
	}
	return 0;
}
c_List7.prototype.p_Remove3=function(t_value){
	this.p_RemoveEach3(t_value);
}
function c_Enumerator7(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator7.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator7.m_new2=function(){
	return this;
}
c_Enumerator7.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator7.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_Node14(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node14.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node14.m_new2=function(){
	return this;
}
c_Node14.prototype.p_Remove=function(){
	this.m__succ.m__pred=this.m__pred;
	this.m__pred.m__succ=this.m__succ;
	return 0;
}
function c_HeadNode7(){
	c_Node14.call(this);
}
c_HeadNode7.prototype=extend_class(c_Node14);
c_HeadNode7.m_new=function(){
	c_Node14.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Enumerator8(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator8.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator8.m_new2=function(){
	return this;
}
c_Enumerator8.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator8.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_UIScrollbar(){
	c_UIScrollView.call(this);
	this.m_thumb=null;
	this.m__value=0.0;
	this.m_minValue=0.0;
	this.m_maxValue=100.0;
	this.m_valueStep=1.0;
	this.m_upButton=null;
	this.m_downButton=null;
}
c_UIScrollbar.prototype=extend_class(c_UIScrollView);
c_UIScrollbar.prototype.p_value=function(){
	return this.m__value;
}
c_UIScrollbar.prototype.p_valueNormalized=function(){
	return this.m__value/(this.m_maxValue-this.m_minValue);
}
c_UIScrollbar.prototype.p_valueNormalized2=function(t_val){
	this.m__value=t_val*(this.m_maxValue-this.m_minValue);
	this.m__value=Math.floor(this.m__value/this.m_valueStep)*this.m_valueStep+this.m_minValue;
	this.m__value=bb_math_Clamp2(this.m__value,this.m_minValue,this.m_maxValue);
}
c_UIScrollbar.prototype.p_value2=function(t_val){
	this.m__value=bb_math_Clamp2(t_val,this.m_minValue,this.m_maxValue);
	this.m_thumb.m_targetFrame.m_y=this.p_valueNormalized()*(this.m_contentView.m_frame.m_height-this.m_thumb.m_frame.m_height);
}
c_UIScrollbar.prototype.p_Draw=function(t_rect,t_tint){
	if(this.m_lockHorizontal==true){
		this.m_thumb.m_frame.m_x=0.0;
	}
	this.m_thumb.m_frame.m_y=bb_math_Clamp2(this.m_thumb.m_frame.m_y,0.0,this.m_contentView.m_frame.m_height-this.m_thumb.m_frame.m_height);
	c_UIScrollView.prototype.p_Draw.call(this,t_rect,t_tint);
}
c_UIScrollbar.prototype.p_Update=function(){
	c_UIScrollView.prototype.p_Update.call(this);
}
c_UIScrollbar.prototype.p_SendEvent=function(t_ev){
	var t_1=t_ev.m_event;
	if(t_1==4){
		var t_2=t_ev.m_sender;
		if(t_2==(this.m_upButton)){
		}else{
			if(t_2==(this.m_downButton)){
			}else{
				if(t_2==null){
					t_ev.m_sender=(this);
					if(this.m_thumb.m_frame.m_y<(this.m_localMouse[1])){
					}
				}
			}
		}
	}else{
		if(t_1==7){
			this.p_valueNormalized2(this.m_thumb.m_frame.m_y/(this.m_contentView.m_frame.m_height-this.m_thumb.m_frame.m_height));
		}
	}
	c_UIScrollView.prototype.p_SendEvent.call(this,t_ev);
}
function bb_math_Clamp(t_n,t_min,t_max){
	if(t_n<t_min){
		return t_min;
	}
	if(t_n>t_max){
		return t_max;
	}
	return t_n;
}
function bb_math_Clamp2(t_n,t_min,t_max){
	if(t_n<t_min){
		return t_min;
	}
	if(t_n>t_max){
		return t_max;
	}
	return t_n;
}
function c_UIImage(){
	Object.call(this);
	this.m_image=null;
	this.m_cache=false;
	this.m_cachedImage=null;
	this.m_insets=null;
	this.m_resizingMode=0;
	this.m_scissor=new_number_array(4);
}
c_UIImage.prototype.p_DrawScale9=function(t_x,t_y,t_width,t_height,t_kludge){
	bb_graphics_Translate(t_x,t_y);
	var t_xScale=(t_width-((this.m_image.p_Width())-this.m_insets.m_width))/this.m_insets.m_width;
	var t_yScale=(t_height-((this.m_image.p_Height())-this.m_insets.m_height))/this.m_insets.m_height;
	bb_graphics_DrawImageRect(this.m_image,0.0,0.0,0,0,((this.m_insets.m_x+(t_kludge))|0),((this.m_insets.m_y+(t_kludge))|0),0);
	bb_graphics_DrawImageRect2(this.m_image,this.m_insets.m_x,0.0,((this.m_insets.m_x)|0),0,((this.m_insets.m_width)|0),((this.m_insets.m_y)|0),0.0,t_xScale,1.0,0);
	bb_graphics_DrawImageRect(this.m_image,this.m_insets.m_x+this.m_insets.m_width*t_xScale-(t_kludge),0.0,((this.m_insets.p_right()-(t_kludge))|0),0,(((this.m_image.p_Width())-this.m_insets.p_right()+(t_kludge))|0),((this.m_insets.m_y+(t_kludge))|0),0);
	bb_graphics_DrawImageRect2(this.m_image,0.0,this.m_insets.m_y,0,((this.m_insets.m_y)|0),((this.m_insets.m_x)|0),((this.m_insets.m_height)|0),0.0,1.0,t_yScale,0);
	bb_graphics_DrawImageRect2(this.m_image,this.m_insets.m_x-(t_kludge),this.m_insets.m_y-(t_kludge),((this.m_insets.m_x)|0),((this.m_insets.m_y)|0),((this.m_insets.m_width+(t_kludge))|0),((this.m_insets.m_height+(t_kludge))|0),0.0,t_xScale,t_yScale,0);
	bb_graphics_DrawImageRect2(this.m_image,this.m_insets.m_x+this.m_insets.m_width*t_xScale,this.m_insets.m_y,((this.m_insets.p_right())|0),((this.m_insets.m_y)|0),(((this.m_image.p_Width())-this.m_insets.p_right())|0),((this.m_insets.m_height)|0),0.0,1.0,t_yScale,0);
	bb_graphics_DrawImageRect(this.m_image,0.0,this.m_insets.m_y+this.m_insets.m_height*t_yScale-(t_kludge),0,((this.m_insets.p_bottom()-(t_kludge))|0),((this.m_insets.m_x+(t_kludge))|0),(((this.m_image.p_Height())-this.m_insets.p_bottom()+(t_kludge))|0),0);
	bb_graphics_DrawImageRect2(this.m_image,this.m_insets.m_x,this.m_insets.m_y+this.m_insets.m_height*t_yScale-(t_kludge),((this.m_insets.m_x)|0),((this.m_insets.p_bottom()-(t_kludge))|0),((this.m_insets.m_width)|0),(((this.m_image.p_Height())-this.m_insets.p_bottom()+(t_kludge))|0),0.0,t_xScale,1.0,0);
	bb_graphics_DrawImageRect(this.m_image,this.m_insets.m_x+this.m_insets.m_width*t_xScale-(t_kludge),this.m_insets.m_y+this.m_insets.m_height*t_yScale-(t_kludge),((this.m_insets.p_right()-(t_kludge))|0),((this.m_insets.p_bottom()-(t_kludge))|0),(((this.m_image.p_Width())-this.m_insets.p_right()+(t_kludge))|0),(((this.m_image.p_Height())-this.m_insets.p_bottom()+(t_kludge))|0),0);
}
c_UIImage.prototype.p_Draw4=function(t_x,t_y,t_width,t_height){
	if(t_width<0.0){
		bb_graphics_DrawImage(this.m_image,t_x,t_y,0);
		return;
	}
	if(this.m_cache){
		if(this.m_cachedImage!=null){
			bb_graphics_DrawImage(this.m_cachedImage,t_x,t_y,0);
			return;
		}else{
			if(t_width>(bb_graphics_DeviceWidth())){
				error("image too big to cache - turn off uiimage cache flag");
			}
			if(t_height>(bb_graphics_DeviceHeight())){
				error("image too big to cache - turn off uiimage cache flag");
			}
			this.m_cachedImage=bb_graphics_CreateImage(((t_width)|0),((t_height)|0),1,c_Image.m_DefaultFlags);
			bb_graphics_Cls(0.0,0.0,0.0);
			var t_tempCol=new_number_array(4);
			bb_graphics_GetColor2(t_tempCol);
			bb_graphics_SetColor(255.0,255.0,255.0);
			t_tempCol[3]=bb_graphics_GetAlpha();
			bb_graphics_SetAlpha(1.0);
			bb_graphics_PushMatrix();
			bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
			this.p_DrawScale9(0.0,0.0,t_width,t_height,0);
			var t_pixels=new_number_array(((t_width*t_height)|0));
			bb_graphics_ReadPixels(t_pixels,0,0,((t_width)|0),((t_height)|0),0,0);
			bb_graphics_Cls(255.0,255.0,255.0);
			bb_graphics_SetColor(0.0,0.0,0.0);
			this.p_DrawScale9(0.0,0.0,t_width,t_height,0);
			var t_alphaPixels=new_number_array(((t_width*t_height)|0));
			bb_graphics_ReadPixels(t_alphaPixels,0,0,((t_width)|0),((t_height)|0),0,0);
			for(var t_i=0;t_i<t_pixels.length;t_i=t_i+1){
				t_alphaPixels[t_i]&=255;
				t_alphaPixels[t_i]=255-t_alphaPixels[t_i]<<24;
				t_pixels[t_i]&=16777215;
				t_pixels[t_i]|=t_alphaPixels[t_i];
			}
			this.m_cachedImage.p_WritePixels(t_pixels,0,0,((t_width)|0),((t_height)|0),0,0);
			bb_graphics_PopMatrix();
			bb_graphics_SetAlpha(t_tempCol[3]);
			bb_graphics_SetColor(t_tempCol[0],t_tempCol[1],t_tempCol[2]);
			bb_graphics_Cls(0.0,0.0,0.0);
			return;
		}
	}
	bb_graphics_PushMatrix();
	var t_1=this.m_resizingMode;
	if(t_1==0){
		this.p_DrawScale9(t_x,t_y,t_width,t_height,0);
	}else{
		if(t_1==1){
			this.m_scissor=bb_graphics_GetScissor();
			bb_graphics_SetScissor(t_x,t_y,t_width,t_height);
			bb_graphics_Translate(t_x,t_y);
			var t_xStep=0.0;
			while(t_xStep<t_width){
				var t_yStep=0.0;
				while(t_yStep<t_height){
					bb_graphics_DrawImage(this.m_image,t_xStep,t_yStep,0);
					t_yStep=t_yStep+(this.m_image.p_Height());
				}
				t_xStep=t_xStep+(this.m_image.p_Width());
			}
			bb_graphics_SetScissor(this.m_scissor[0],this.m_scissor[1],this.m_scissor[2],this.m_scissor[3]);
		}else{
			print("Unknown resizing mode");
		}
	}
	bb_graphics_PopMatrix();
}
function bb_graphics_DrawImageRect(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,-t_image.m_tx+t_x,-t_image.m_ty+t_y,t_srcX+t_f.m_x,t_srcY+t_f.m_y,t_srcWidth,t_srcHeight);
	return 0;
}
function bb_graphics_DrawImageRect2(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_rotation,t_scaleX,t_scaleY,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_x,t_y);
	bb_graphics_Rotate(t_rotation);
	bb_graphics_Scale(t_scaleX,t_scaleY);
	bb_graphics_Translate(-t_image.m_tx,-t_image.m_ty);
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,0.0,0.0,t_srcX+t_f.m_x,t_srcY+t_f.m_y,t_srcWidth,t_srcHeight);
	bb_graphics_PopMatrix();
	return 0;
}
function bb_graphics_DrawOval(t_x,t_y,t_w,t_h,t_filled){
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawOval(t_x,t_y,t_w,t_h,t_filled);
	return 0;
}
function bb_graphics_DrawLine(t_x1,t_y1,t_x2,t_y2,t_thickness,t_dotted){
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawLine(t_x1,t_y1,t_x2,t_y2,t_thickness,t_dotted);
	return 0;
}
function bb_asyncevent_RemoveAsyncEventSource(t_source){
	if(t_source==bb_asyncevent__current){
		bb_asyncevent__current=null;
	}
	bb_asyncevent__sources.p_RemoveEach2(t_source);
}
function bbInit(){
	bb_app__app=null;
	bb_app__delegate=null;
	bb_app__game=BBGame.Game();
	bb_graphics_device=null;
	bb_graphics_context=c_GraphicsContext.m_new.call(new c_GraphicsContext);
	c_Image.m_DefaultFlags=0;
	bb_audio_device=null;
	bb_input_device=null;
	bb_graphics_renderDevice=null;
	c_MindMapApp.m_serverUrl="";
	c_MindMapApp.m_serverFolder="";
	c_MindMapApp.m_serverFile="";
	c_MindMapApp.m_uploadFile="";
	bb_app__updateRate=0;
	c_JoffColor.m_red=c_UIColor.m_new.call(new c_UIColor,216.0,35.0,42.0,1.0);
	c_JoffColor.m_green=c_UIColor.m_new.call(new c_UIColor,72.0,173.0,71.0,1.0);
	c_JoffColor.m_cyan=c_UIColor.m_new.call(new c_UIColor,5.0,172.0,176.0,1.0);
	c_JoffColor.m_purple=c_UIColor.m_new.call(new c_UIColor,218.0,36.0,123.0,1.0);
	c_JoffColor.m_mustard=c_UIColor.m_new2.call(new c_UIColor,"#caab34");
	c_JoffColor.m_navy=c_UIColor.m_new2.call(new c_UIColor,"#113469");
	c_JoffColor.m_mint=c_UIColor.m_new2.call(new c_UIColor,"#83c5a2");
	c_JoffColor.m_grey=c_UIColor.m_new.call(new c_UIColor,127.0,127.0,127.0,1.0);
	c_JoffColor.m_black=c_UIColor.m_new.call(new c_UIColor,0.0,0.0,0.0,1.0);
	c_MindMapApp.m_colorList=[];
	c_UIView.m_root=null;
	c_UIColor.m_black=c_UIColor.m_new.call(new c_UIColor,0.0,0.0,0.0,1.0);
	c_UIColorPicker.m_chipSize=20;
	bb_mindmap_loginComplete=false;
	c_UIColor.m_white=c_UIColor.m_new.call(new c_UIColor,255.0,255.0,255.0,1.0);
	c_UIButton.m_defaultFont=null;
	c_AngelFont.m_err="";
	c_AngelFont.m_current=null;
	c_AngelFont.m_firstKp=null;
	c_AngelFont.m__list=c_StringMap.m_new.call(new c_StringMap);
	c_NodeView.m_idCounter=1;
	bb_random_Seed=1234;
	c_Example.m_idCounter=1;
	bb_asyncevent__sources=c_Stack.m_new.call(new c_Stack);
	c_UIEvent.m_eventStack=c_Stack2.m_new.call(new c_Stack2);
	c_Stack2.m_NIL=null;
	c_UIEvent.m_viewWithFocus=null;
	c_UIEvent.m_prevViewWithFocus=null;
	c_UIEvent.m_viewWithDragFocus=null;
	c_UIEvent.m_startDragMousePosition=new_number_array(2);
	c_UIEvent.m_prevMouseX=-1;
	c_UIEvent.m_prevMouseY=-1;
	c_UIEvent.m_mouseState=0;
	c_UIEvent.m_prevMouseDownEvent=null;
	c_UIEvent.m_mouseDownView=null;
	c_UIEvent.m_prevMouseDownEvent2=null;
	bb_asyncevent__current=null;
	c_Stack.m_NIL=null;
	c_UIView.m_pixels=[];
	c_UIView.m_tempCol=new_number_array(4);
	c_Stack3.m_NIL=null;
	c_User.m__list=null;
	c_UploadedMap.m__list=null;
	c_UploadedMap.m_page=0;
	c_AngelFont.m_secondKp=null;
}
//${TRANSCODE_END}

