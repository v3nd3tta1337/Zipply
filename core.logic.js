/*
	core.logic.js
	This file is part of Zipply.

	Zipply is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Zipply is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with Zipply.  If not, see <http://www.gnu.org/licenses/>.
*/

var debug = false; //Debugging is off


/**
 * Variables for Zippyshare player
 */
var zippywww;
var zippyfile;
var zippydown="ffffff";
var zippyfront="005DC4";
var zippyback="ffffff";
var zippylight="005DC4"
var zippywidth=200;
var zippyauto=false;
var zippyvol=80;

/**
 * Super simple log script. Logs when debug = 1.
 */
function log(a){
	if (debug) console.log(a);
}

/**
 * pico.js
 */
function $(a){ 
	return document.getElementById(a);
}

/**
 * Creating a new tab in Chrome
 */
function gotoURL(a){
	chrome.tabs.create({'url': a});
	self.close();
	_gaq.push(['_trackEvent', 'gotoZippyshare', 'clicked']);
}


/**
 * Download a song directly from zippyshare.
 */
function directDL(a){
	chrome.tabs.create({
	        'url': a,
	        'selected': false
	    }, function(tab) {
			tabID = tab;
	        chrome.tabs.executeScript(tab.id, {
	            code: "window.location = document.getElementById('dlbutton').href;"
	        });
	    });
	_gaq.push(['_trackEvent', 'DirectDownload', 'clicked']);
}


/**
 * Writing the zippshare preview player. Modified original API.
 */
function zippyWrite(){
return '<div style="width: '+zippywidth+'px;float:right"><div style="float: left;"><object id=mpl classid=clsid:D27CDB6E-AE6D-11cf-96B8-444553540000 width='+(zippywidth)+' height=20><param name="flashvars" VALUE="height=20&amp;width='+(zippywidth)+'&amp;file=http://'+zippywww+'.zippyshare.com/downloadMusic%3Fkey%3D'+zippyfile+'xx&amp;volume='+zippyvol+'&autostart='+zippyauto+'&frontcolor=0x'+zippyfront+'&backcolor=0x'+zippyback+'&lightcolor=0x'+zippylight+'&type=flv"></param><param name="src" VALUE="http://api.zippyshare.com/api/mediaplayer/mediaplayer.swf"></param><embed width="'+(zippywidth)+'" height="20" flashvars="height=20&amp;width='+(zippywidth)+'&amp;file=http://'+zippywww+'.zippyshare.com/downloadMusic%3Fkey%3D'+zippyfile+'xx&amp;volume='+zippyvol+'&autostart='+zippyauto+'&frontcolor=0x'+zippyfront+'&backcolor=0x'+zippyback+'&lightcolor=0x'+zippylight+'&type=flv" allowfullscreen="false" quality="high" name="mpl" id="mpl" style="" src="http://api.zippyshare.com/api/mediaplayer/mediaplayer.swf" type="application/x-shockwave-flash"></object></div></div>';
}


/**
 * Remove elements out array with specific value
 * 	@author: http://www.roseindia.net/java/javascript-array/javascript-remove-an-element.shtml
 */
function removeFromArray(arrayName,arrayElement){
	for(var i=0; i<arrayName.length;i++ ){ 
		if(arrayName[i]==arrayElement){
			arrayName.splice(i,1); 
		}
	} 
}