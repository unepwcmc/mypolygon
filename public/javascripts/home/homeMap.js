var map;
var bounds;
var clickedLat;
var paDictionary = new Object();
var lastMask = 10000;
var ppeOverlay;
var current_latlng;

var stopNow = false;
var boundsAppearingMarkers;
var firstLoad = true;
var params;
var searchBoxVisible=true;
var pixelsMoved=0;
var startLatLng;
var moveMaplistener;
var onDragMovement=false;
var drag_timeout=0;

/* event variables */
var drag_start_event;
var drag_end_event;
var click_event;
var drag_end_event_tiny;


//DEEP LINKING
function pageload(hash) {
    if(hash) {
		if($.browser.msie) {
			hash = encodeURIComponent(hash);
		}
		params = hash.split("_");
	}
}

function getMapHash() {
    if(map) {
        var vis=0;
        if(searchBoxVisible) {
            vis=1;
        }
				anchor = map.getZoom() +"_"+ rnd(map.getCenter().lat()) +"_"+ rnd(map.getCenter().lng())+"_"+vis;
				$.cookies.set("home_anchor", anchor);
        return anchor;
    }
    return "";
}




//-----FUNCTION WITH HOME MAP----------------------------------------------------------------------
function initialize() {
	 
	bounds = new google.maps.LatLngBounds();
	boundsAppearingMarkers = new google.maps.LatLngBounds();
	

  var zoom=8;
  if(params) {
		
		//Get location thanks to the url params
		zoom=Number(params[0]);
	  lat=params[1];
	  lon=params[2];
   
	  if(params[3]=="0") {
	  	hideExploreInput();
	  }
		current_latlng = new google.maps.LatLng(lat, lon);
	
  } else {
		//Get current location if there is not any url param
		var zoom=8;
		if (google.loader.ClientLocation) {
      current_latlng = new google.maps.LatLng(google.loader.ClientLocation.latitude, google.loader.ClientLocation.longitude);
    } else {
		 	current_latlng = new google.maps.LatLng(40.4166909, -3.7003454);
		}
	}

	clickedLat = current_latlng;
	startLatLng = current_latlng;

	//start the map
	var myOptions = {
	  zoom: zoom,
	  center: current_latlng,
	  disableDefaultUI: true,
		scrollwheel:true,
	  mapTypeId: google.maps.MapTypeId.TERRAIN
	}    
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);



	//ppe TileOverlay
	ppeOverlay=new SparseTileLayerOverlay();
	ppeOverlay.setUrl = function SetUrl(xy,z){
		var q=[];
		q[0]= UTILITY_SERVER_URL+"/blue/" + z + "/"+ xy.x + "/" + xy.y;
		return q;
	};
	ppeOverlay.setMap(map);
	google.maps.event.addListener(map,"idle",function(){ppeOverlay.idle();});    
    


  click_event = google.maps.event.addListener(map, 'click', function(event) {
      clickedLat=event.latLng;
      getData(event.latLng);
  });

  google.maps.event.addListener(this.map, 'tilesloaded', function(event) {
			google.maps.event.clearListeners(map, 'tilesloaded');
			getTenPAS(current_latlng.b,current_latlng.c);
   });

	drag_start_event = google.maps.event.addListener(map, 'dragstart', function(event) {
			stopNow = true;
	});
	drag_end_event = google.maps.event.addListener(map, 'dragend', function(event) {
		onDragMovement=true;
		stopNow = false;
		clickedLat = map.getCenter();
		clearMap();
		getTenPAS(clickedLat.lat(),clickedLat.lng());	
		$.historyLoad(getMapHash());	
		if(drag_timeout !=0 ){
		    clearTimeout(drag_timeout);
		}	
        drag_timeout = setTimeout(function() {
		    drag_timeout = 0;
		    onDragMovement=false;
		    }, 150);			
		
	});
	

	drag_end_event_tiny = google.maps.event.addListener(map, 'dragend', function(event) {
		clickedLat = map.getCenter();
		$.historyLoad(getMapHash());			
	});
	

	google.maps.event.addListener(map, 'zoom_changed', function(event) {
		$.historyLoad(getMapHash());
	});		
	
	
	if(searchBoxVisible) {
    	//control the user moves too much to move it to explore mode
    	moveMaplistener = google.maps.event.addListener(map, 'dragend', function() { 
            var changeInLng = Math.abs(startLatLng.lng() - map.getCenter().lng());
            var changeInLat = Math.abs(startLatLng.lat() - map.getCenter().lat());
            if(changeInLng>3 || changeInLat>2) {
                google.maps.event.removeListener(moveMaplistener);
                hideExploreInput();
            }
        });	    
	}
	
			
}

	function getTileLayerOverlay(layer) {
	    var overlay = new SparseTileLayerOverlay();
	    overlay.setUrl = function SetUrl(xy,z){
	    	var q=[];
	    	q[0]= UTILITY_SERVER_URL+"/geoserver/gwc/service/gmaps?layers="+layer+"&zoom=" + z + "&x=" + xy.x + "&y=" + xy.y;
	    	return q;
	    };
	    overlay.setMap(map);
	    overlay.setMap(null);
	    //google.maps.event.addListener(map,"idle",function(){overlay.idle();});
	    return overlay;
	}


	function rnd(dd){
		return 0.25 * parseInt(4*dd);
	}

	function rnd_rad(rad){
		return ((parseInt(rad) + 24) /25) * 25
	}

	function getTenPAS(lat,lng) {
		var script = document.createElement('script');
	
		bounds = map.getBounds();
		var bottomRightPosition = bounds.getSouthWest();
		var centre = map.getCenter();
	
		var distance = distanceBetween(bottomRightPosition.lat(),bottomRightPosition.lng(),centre.lat(),centre.lng());
	
	
	  script.setAttribute('src', BASE_APP_URL+'/api/search_by_point/'+rnd(lng)+'/'+rnd(lat)+'?radius=' + rnd_rad(distance) + '&callback=loadTenPAS');
	  script.setAttribute('id', 'jsonScript');
	  script.setAttribute('type', 'text/javascript');
	  document.documentElement.firstChild.appendChild(script);
  
	  displayLoading();
  
	}



	function loadTenPAS(json) {
		if(json.length>0) {
			boundsAppearingMarkers = map.getBounds();
			recursiveFunction(json);	 
	  }
  
	  hideLoading();
  
	}
		
	function recursiveFunction(paItems) {
		if (stopNow) {
			stopNow = false;
		} else {
			var latlng = new google.maps.LatLng(paItems[0].centre[1], paItems[0].centre[0]);
			//if (boundsAppearingMarkers.contains(latlng)) {
				if (!belongToMap(paItems[0].id)) {
					var infoBox = new PAInfoWindow({latlng: latlng, map: map, paInformation: paItems[0]});
					var id = paItems[0].id;
					paDictionary[id] = infoBox;
					paItems.splice(0,1);
					setTimeout(function(ev) {
								if (paItems.length>0) {
									recursiveFunction(paItems);
								}
					    }, 1); //reduced delay to 1 to speed up image loading
				} else {
					paItems.splice(0,1);
					setTimeout(function(ev) {
								if (paItems.length>0) {
									recursiveFunction(paItems);
								}
					    }, 1); //reduced delay to 1 to speed up image loading
				}
			//}
		}
	}

	function getData(latlng) {
	  // Retrieve the JSON feed.
	  var script = document.createElement('script');

		//ROUND TO 0.25
		//lat = rnd(latlng.lat());
		//lng = rnd(latlng.lng());

	  script.setAttribute('src', BASE_APP_URL+'/api/sites_by_point/'+latlng.lng()+'/'+latlng.lat()+'?callback=loadJson');
	  script.setAttribute('id', 'jsonScript');
	  script.setAttribute('type', 'text/javascript');
	  document.documentElement.firstChild.appendChild(script);
  
	  displayLoading();
	}  

	function loadJson(json) {
	    var find = false;

	    if(json.length>0) {
	       var name= json[0].name;
	       var id=json[0].id;

					if (!belongToMap(id)) {
						var infoBox = new PAInfoWindow({latlng: clickedLat, map: map, paInformation: json[0]});	
						paDictionary[id] = infoBox;					
					}

	    }
    
	    hideLoading();
	}

	function clearMap() {
		bounds = map.getBounds();
		// alert(bounds);
		for( var i in paDictionary ){
				var itemPosition = new google.maps.LatLng(paDictionary[i].paInformation_.centre[1],paDictionary[i].paInformation_.centre[0]);
				if (!bounds.contains(itemPosition)) {
					paDictionary[i].setMap(null);
					paDictionary[i] = null;
					delete paDictionary[i];
				}
		}
	}

	function belongToMap(paID) {
		for( var i in paDictionary ){
				if (i == paID) {
					return true;
				}
		}
		return false;
	}
				
	function distanceBetween(lat1,lon1,lat2,lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
		var dLon = (lon2-lon1).toRad(); 
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
		        Math.sin(dLon/2) * Math.sin(dLon/2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; // Distance in km
	
		//drawCircle(lat2,lon2,d*0.55);
		return d*(50/100);
	}

	Number.prototype.toRad = function() {  // convert degrees to radians 
	  return this * Math.PI / 180; 
	}

	function ratelimit(fn, ms) {
	    var last = (new Date()).getTime();
	    return (function() {
	        var now = (new Date()).getTime();
	        if (now - last > ms) {
	            last = now;
	            fn.apply(null, arguments);
	        }
	    });
	}
		

//-----------SEARCH SUGGEST---------------//

	function goToSearch() {
		var searchString = $('#search_inputText').val();
		var url = BASE_APP_URL+'/search?q=' + searchString + '&commit=Search';
		if (searchString.length>0) {
				window.location = url;
		}
	}

	function goToSearchSecond() {
		var searchString = $('#searchHeader').val();
		var url = BASE_APP_URL+'/search?q=' + searchString + '&commit=Search';
		if (searchString.length>0) {
				window.location = url;
		}
	}




