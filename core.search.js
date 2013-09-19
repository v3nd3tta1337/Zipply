/*
	core.search.js
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
function search(){
	var xmlDoc = null;
	var query = escape($("searchField").value);
	
	// Move the logo and search field to the top
	$("home").style.marginTop = "2%";
	$("results").style.display = "block";
	
	// Show the player!
	$("player").style.display = "block";
	
	// footer, be gone!
	//$("footer").style.display = "none";
	
	//Generate random google domain
	//dom = ["be", "com"];
	//var g = dom[Math.floor(Math.random()*dom.length)];
	
	try{
	  	xmlhttp=new XMLHttpRequest();

		//xmlhttp.open("GET", "stuff/GoogleResults.html", false);
		//xmlhttp.open("GET", "http://www.google."+g+"/search?q=" + query + "+site%3Azippyshare.com+inurl%3A%2Fv%2F", false)
		//xmlhttp.open("GET", "stuff/GoogleResults2.html", false);
		xmlhttp.open("GET", "http://www.zippysharesmp3.com/search/?cx=001760994154815480584%3Aztmpfifoen0&cof=FORID%3A9&ie=UTF-8&q=" + query + "&sa=Search&siteurl=www.zippysharemp3.com%2F&ref=www.google.de%2F&ss=3618j1474344j14", false)

		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState != 4) {
		        log("[STATUS] Could not connect. Google down?");
				return;
		    }else{
				xmlDoc = xmlhttp.responseText;
			}
		}

		xmlhttp.send();

	}catch(e){
		log("[ERR] Error while trying to reach Google: " + e.message);
	}

	proces(xmlDoc);
}



/**
 * Process results
 */
function proces(a){
	log("[LOG] Processing data got from Google");


	/**
 	* Grabbing the links
 	*/
	var regex = /<cite>(.+?)<\/cite>/gi;
	var links = [];
	var e;

	while (e = regex.exec(a)) links.push(e[1].replace(/<.*?>/g, ''));

	/**
 	* Grabbing the titles
 	*/
	var regex = /<h3 class="r">(.+?)<\/h3>/gi;
	var titles = [];
	var e = null;

	while (e = regex.exec(a)) titles.push(e[1].replace(/<.*?>/g, '')); //Clean the tags and push them to array

	/**
 	* Cleaning the titles
 	*/
	for(i=0; i <= titles.length-1; i++){			
		removeFromArray(titles, "Zippyshare.com -"); //Filter known dead files

		titles[i] = titles[i].replace(/Zippyshare.com - /g, '').replace(/ - Zippyshare.com/g, '').replace(/.mp3/g, '');
	}


	/**
 	* Writing them out!
 	*/
	$("results").innerHTML = "" //clean previous search results

	for(i=0; i <= titles.length -1; i++){
		zippywww= links[i].split(".", 1);
		zippyfile= links[i].split("/")[2];
		
		
		toWrite = '<a href="javascript:directDL(\'http://' + links[i] +'\')"><img src="img/dl.png" width="16" alt="Download"></a>' +
			'<a href="javascript:zippyWrite(\'' + zippywww +'\', \'' + zippyfile + '\')">'+
			'<img src="img/play.png" width="16" style="padding-right: 5px" alt="Preview"></a>' +
			'<a href="javascript:gotoURL(\'http://' + links[i] +'\')">' + titles[i] + '</a>';

		$("results").innerHTML +=  toWrite +  "<br><br><div style='clear:both;'></div>";
	}
}