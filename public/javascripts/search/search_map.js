	var map;
	var bounds;
	var lastMask = 1000;
	var ppeOverlay;


		function setSearchButton(mapState){
			if (mapState == "false") {
				$("#button_map").html('show map');
				$("#button_map").css('background','url("../images/icons/double_arrow.gif") no-repeat left 2px');			
			} else {
				$("#button_map").html('hide map');
				$("#button_map").css('background','url("../images/icons/double_arrow.gif") no-repeat left -11px');
			}
		}



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


		function initialize(data) {
		  var myOptions = {
		      zoom: 5,
		      center: new google.maps.LatLng(0,0),
		      disableDefaultUI: true,
		      scrollwheel:true,
		      mapTypeId: google.maps.MapTypeId.TERRAIN
		  };
		  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
			var bounds = new google.maps.LatLngBounds();
			
			
			//ppe TileOverlay
			ppeOverlay=new SparseTileLayerOverlay();
			ppeOverlay.setUrl = function SetUrl(xy,z){
				var q=[];
				q[0]= UTILITY_SERVER_URL+"/blue/" + z + "/"+ xy.x + "/" + xy.y;
				return q;
			};
			ppeOverlay.setMap(map);
			google.maps.event.addListener(map,"idle",function(){ppeOverlay.idle();});
			


			$.each(data,function(i,val){
        var latLong = new google.maps.LatLng(val.y,val.x);
        bounds.extend(latLong); // Center point.
				new SearchMarker({latlng: latLong, map: map, paInformation: val});
				var poly = createGeoJsonPolygon(val.the_geom);
				poly.setMap(map);
        coords = val.the_geom.coordinates[0][0];
        for(var i=0;i<coords.length; i++) {
          bounds.extend(new google.maps.LatLng(coords[i][1], coords[i][0]));
        }
			});
	
			map.fitBounds(bounds);
		  map.setCenter( bounds.getCenter());
		}

	

		function showBottom(){
			if ($.browser.msie && $.browser.version.substr(0,3)=="7.0"){
				$('#bottom_right_container').show();
			}
		}
		function hideBottom(){
			if ($.browser.msie && $.browser.version.substr(0,3)=="7.0"){
				$('#bottom_right_container').hide();
			}			
		}