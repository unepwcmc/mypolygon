var map;
var biodiversity_map;
var ppeOverlay;
var paOverlay;
var clickedLat;
var paDictionary = new Object();
var onDragMovement=false;
var siteId;
var global_index = 1000;
var lastMask = 500;
var click_event;
var click_panoramio_marker = true;
var pa_center;
var markers_array = [];
var pois_icon;
var pa_zoom;
var panoramio_icon;
var tilelayer;
var tilelayer_pa;

$(document).ready(function() {
	
	var height_content = $('div#upper_area div.content').height();
	$('a#zoom_in').css('top',height_content + 15 + 'px');
	$('a#zoom_out').css('top',height_content + 15 + 'px');
	$('a#terrain').css('top',height_content + 15 + 'px');
	$('a#satellite').css('top',height_content + 15 + 'px');
	$('a#hide_markers').css('top',height_content + 15 + 'px');

	
	$('a#zoom_in').fadeIn();
	$('a#zoom_out').fadeIn();
	$('a#terrain').fadeIn();
	$('a#satellite').fadeIn();
	$('a#hide_markers').fadeIn();
	$('a.edit_map_button').fadeIn();
	
	$('a#zoom_in').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		map.setZoom(map.getZoom()+1);
	});

	$('a#zoom_out').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		map.setZoom(map.getZoom()-1);
	});
	
	$('a#zoomin_biodiversity').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		biodiversity_map.setZoom(biodiversity_map.getZoom()+1);
	});

	$('a#zoomout_biodiversity').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		biodiversity_map.setZoom(biodiversity_map.getZoom()-1);
	});
	

	$('a#satellite').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		if (!$(this).hasClass('selected')) {
			$('a#terrain').removeClass('selected');
			$('a#satellite').addClass('selected');
			map.setMapType(G_SATELLITE_MAP);
		}
	});
	
	$('a#hide_markers').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		if (!$(this).hasClass('disabled')) {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				displayLoading();
				show_markers();
			} else {
				$(this).addClass('selected');
				displayLoading();
				clear_markers();
			}
		}
	});

	$('a#terrain').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		if (!$(this).hasClass('selected')) {
			$('a#satellite').removeClass('selected');
			$('a#terrain').addClass('selected');
			map.setMapType(G_PHYSICAL_MAP);
		}
	});

	
	$('a#terrain').addClass('selected');
	if (GBrowserIsCompatible()) {
    	map = new GMap2(document.getElementById("js_map"));
		map.setMapType(G_PHYSICAL_MAP);
		
		biodiversity_map = new GMap2(document.getElementById("biodiversity_map"));		
		biodiversity_map.setMapType(G_PHYSICAL_MAP);
		
		// Interactivity with the map disabled
		biodiversity_map.disableDragging();
		biodiversity_map.disableDoubleClickZoom();
  }


	function setSearchButton(mapState){
		if (mapState == "false") {
			$("#button_map").html('show map');
			$("#button_map").css('background','url("../images/icons/double_arrow.gif") no-repeat left 2px');			
		} else {
			$("#button_map").html('hide map');
			$("#button_map").css('background','url("../images/icons/double_arrow.gif") no-repeat left -11px');
		}
	}
	
	$('#toogle_size_map').click(function(ev){
				ev.stopPropagation();
				ev.preventDefault();
        var map_height;
				var maximize = false;
        if ($("#toogle_size_map").text() =='expand') {
					$("#toogle_size_map").html('close');
					$("#toogle_size_map").css('background','url("../images/icons/double_arrow.gif") no-repeat 8px -11px');
					$("#toogle_size_map").css('padding','0 0 0 21px');
					map_height=500;
					maximize=true;
					map.setZoom(map.getZoom()+1);
        } else {
					$("#toogle_size_map").html('expand');
					$("#toogle_size_map").css('background','url("../images/icons/double_arrow.gif") no-repeat 5px 2px');
					$("#toogle_size_map").css('padding','0 0 0 18px');
					map_height=306;		 
					map.setZoom(map.getZoom()-1);   
        }
        $('div.pa_map').stop().animate({height: map_height}, 500,'',refreshGoogleMapsSize);
				
	});	
	
	function refreshGoogleMapsSize() {	
			map.checkResize();
			map.setCenter(pa_center);
	}

	
	function getSearchHeight(mapState){
		return ((mapState == "true") ? 305 : $('#advanced_search_box').height()+68);
	}
	
	function setSearchMap(mapState){						
		map_height = getSearchHeight(mapState);
		var userAgent = navigator.userAgent.toLowerCase();
		if (/mozilla/.test (userAgent) && !/(compatible|webkit)/.test(userAgent)) {
			$('div.flash_container').height(map_height);
		} else {
			$('div.flash_container').stop().animate({height: map_height}, 200);
		}	
	}


	siteId = $('#pa_map_json_link').attr('href');
	var url_request = "/api/site/" + $('#pa_map_json_link').attr('href') + "/json";
	
	
	var script = document.createElement('script');
	script.setAttribute('src', url_request+'?callback=loadJson');
	script.setAttribute('id', 'jsonScript');
	script.setAttribute('type', 'text/javascript');
	document.documentElement.firstChild.appendChild(script);

  GEvent.addListener(map, "click", function(overlay,latLng) {
	 	setTimeout(function() {
	 		if (click_panoramio_marker) {
	       clickedLat=latLng;
	       getData(latLng);
	 		}
	     }, 50);
	   });

});



function getBBox(x,y,zoom) {
      var lon      = -180; // x 
      var lonWidth = 360; // width 360 
      var lat       = -1; 
      var latHeight = 2;    
      var tilesAtThisZoom = (1 << zoom); 
      lonWidth  = 360.0 / tilesAtThisZoom; 
      lon       = -180 + (x * lonWidth); 
      latHeight = 2.0 / tilesAtThisZoom; 
      lat       = ((tilesAtThisZoom/2 - y-1) * latHeight);
      latHeight += lat; 
      latHeight = (2 * Math.atan(Math.exp(Math.PI * latHeight))) - (Math.PI / 2); 
      latHeight *= (180 / Math.PI); 
      lat = (2 * Math.atan(Math.exp(Math.PI * lat))) - (Math.PI / 2); 
      lat *= (180 / Math.PI); 
      latHeight -= lat; 
      if (lonWidth < 0) { 
         lon      = lon + lonWidth; 
         lonWidth = -lonWidth; 
      } 
      if (latHeight < 0) { 
         lat       = lat + latHeight; 
         latHeight = -latHeight; 
      } 
      
      return lon +","+lat + "," + (lon+lonWidth) + "," + (lat+latHeight);
}

function getData(latlng) {
  var script = document.createElement('script');
  script.setAttribute('src', BASE_APP_URL+'/api/sites_by_point/'+latlng.lng()+'/'+latlng.lat()+'?callback=loadClickedJson');
  script.setAttribute('id', 'json2Script');
  script.setAttribute('type', 'text/javascript');
  document.documentElement.firstChild.appendChild(script);
  
  displayLoading();
}


function loadClickedJson(json) {

    if(json.length>0) {
       var id=json[0].id;
       for (var i in json) {
           if(belongToMap(json[i].id)) {
               hideLoading();
               return;
           }
       }      
	   var infoBox = new PAMarkerInfowindow({latlng: clickedLat, pa_information: json[0]});
		 map.addOverlay(infoBox);
	   paDictionary[id] = infoBox;
    } 
    hideLoading();
}


function loadJson(json) {
		 var bounds = new GLatLngBounds();
		 var empty_pois = false;
		 bounds.extend(new GLatLng(json.bbox[0].y,json.bbox[0].x));
		 bounds.extend(new GLatLng(json.bbox[2].y,json.bbox[2].x));
		 pa_center=bounds.getCenter();

		
		map.setCenter( pa_center,map.getBoundsZoomLevel(bounds));
		biodiversity_map.setCenter( pa_center,biodiversity_map.getBoundsZoomLevel(bounds));
				
		pois_icon = new GIcon(false,'/images/sites/poiMarker.png'); 
		pois_icon.iconSize = new GSize(37, 37);
		pois_icon.iconAnchor = new GPoint(19,19);
		
		panoramio_icon = new GIcon(true,'/images/sites/panoramio-marker.png'); 
		panoramio_icon.iconSize = new GSize(18, 18);
		panoramio_icon.iconAnchor = new GPoint(9,9);
		
	
		if (json.pois.length>0) {
		 for(var im = 0; im<json.pois.length; im++) {
			var poi_information = new Object();
			poi_information.title = json.pois[im].name;
			var pois_marker = new POIMarker({latlng: new google.maps.LatLng(json.pois[im].y,json.pois[im].x), map: map, poi_information: poi_information});		
			map.addOverlay(pois_marker);
			markers_array.push(pois_marker);
		 }
		} else {
			empty_pois = true;
		}

		if (json.pictures != null && json.pictures.length>1) {
			for(var im = 0; im<json.pictures.length; im++) {
				var image_information = new Object();
				image_information.url = json.pictures[im].url;
				image_information.photo_url = json.pictures[im].photo_url;
				image_information.width = json.pictures[im].width;
				image_information.height = json.pictures[im].height;
				var images_marker = new PanoramioMarker({latlng: new google.maps.LatLng(json.pictures[im].y,json.pictures[im].x), image_information: image_information});
				map.addOverlay(images_marker);     
				markers_array.push(images_marker);
			}
			
			var pa_information = new Object();
			pa_information.image = json.pictures[0].url;
			var site_marker = new PAMarker({latlng: new google.maps.LatLng(json.pictures[0].y,json.pictures[0].x), pa_information: pa_information});
			map.addOverlay(site_marker); 
			paDictionary[$('#pa_map_json_link').attr('href')] = site_marker;
			markers_array.push(site_marker);
		} else {
			if (empty_pois) {
				$('a#hide_markers').addClass('disabled');
			}
		}
		
		
		var copy_wcmc = new GCopyrightCollection("g");
		copy_wcmc.addCopyright(new GCopyright('Demo',new GLatLngBounds(new GLatLng(-90,-180), new GLatLng(90,180)),0,'2010 UNEP-WCMC'));
		tilelayer = new GTileLayer(copy_wcmc);
		tilelayer.getTileUrl = function(xy,z) { return UTILITY_SERVER_URL+"/blue/" + z + "/"+ xy.x + "/" + xy.y;};
		tilelayer.isPng = function() { return true;};
		tilelayer.getOpacity = function() { return 1.0; }

		ppeOverlay = new GTileLayerOverlay(tilelayer);
		map.addOverlay(ppeOverlay);
		
		var copy_gbif = new GCopyrightCollection("©");
		copy_gbif.addCopyright(new GCopyright(' ',new GLatLngBounds(new GLatLng(-90,-180), new GLatLng(90,180)),0,' '));
		var tilelayer_gbif = new GTileLayer(copy_gbif);
		tilelayer_gbif.getTileUrl = function(xy,z) { return GBIF_DENSITY_URL+"?tile=" + xy.x + "_" + xy.y +"_" + z +"_13140803"; };
		tilelayer_gbif.isPng = function() { return true;};
		tilelayer_gbif.getOpacity = function() { return 1.0; }
		
		var gbif_overlay = new GTileLayerOverlay(tilelayer_gbif);
		biodiversity_map.addOverlay(gbif_overlay);
		
		
		tilelayer_pa = new GTileLayer(copy_wcmc);
		tilelayer_pa.getTileUrl = function(xy,z) { return UTILITY_SERVER_URL+"/orange/"+siteId+"/"+z+"/"+xy.x+"/"+xy.y;};
		tilelayer_pa.isPng = function() { return true;};
		tilelayer_pa.getOpacity = function() { return 1.0; }
		
		paOverlay = new GTileLayerOverlay(tilelayer_pa);
		map.addOverlay(paOverlay);
		
		
   	hideLoading(); 

}



function orderOfCreation(marker,b) {
 return 1;
}


function displayLoading() {
    $('#loadingPa').fadeIn('fast');
}

function hideLoading() {
    $('#loadingPa').fadeOut('fast');
}

function belongToMap(_paID) {

	for( var i in paDictionary ){
			if (i == _paID || _paID==siteId) {
				return true;
			}
	}
	return false;
}

function clear_markers() {
  if (markers_array) {
    for (var i=0; i < markers_array.length; i++) {
      map.removeOverlay(markers_array[i]);
    }
		hideLoading();
  }
}

function show_markers() {
  if (markers_array) {
    for (var i=0; i < markers_array.length; i++) {
      map.addOverlay(markers_array[i]);
    }
		hideLoading();
  }
}



function refreshLayers() {
	tilelayer.getTileUrl = function(xy,z) { return UTILITY_SERVER_URL+"/blue/" + z + "/"+ xy.x + "/" + xy.y +"?v="+ ((Math.random(1)*100).toFixed(0));};
	ppeOverlay.refresh();
	tilelayer_pa.getTileUrl = function(xy,z) { return UTILITY_SERVER_URL+"/orange/"+siteId+"/"+z+"/"+xy.x+"/"+xy.y+"?v="+ ((Math.random(1)*100).toFixed(0));};
	paOverlay.refresh();
}


