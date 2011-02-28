var map;
var fluster;
var bounds;
var pa_marker;
var pa_position;
var lastMask = 10000;


$(document).ready(function() {

	var height_content = $('div#upper_area div.content').height();
	$('a#zoom_in').css('top',height_content + 15 + 'px');
	$('a#zoom_out').css('top',height_content + 15 + 'px');
	$('a#terrain').css('top',height_content + 15 + 'px');
	$('a#satellite').css('top',height_content + 15 + 'px');
	
	$('a#zoom_in').fadeIn();
	$('a#zoom_out').fadeIn();
	$('a#terrain').fadeIn();
	$('a#satellite').fadeIn();
		
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

	$('a#satellite').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		if (!$(this).hasClass('selected')) {
			$('a#terrain').removeClass('selected');
			$('a#satellite').addClass('selected');
			map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
		}
	});

	$('a#terrain').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		if (!$(this).hasClass('selected')) {
			$('a#satellite').removeClass('selected');
			$('a#terrain').addClass('selected');
			map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
		}
	});


	$('a#terrain').addClass('selected');
	
	var url_request = $('#activity_json_link').attr('href');

	var script = document.createElement('script');
	 	
	script.setAttribute('src', url_request+'?callback=loadJson');
	script.setAttribute('id', 'jsonScript');
	script.setAttribute('type', 'text/javascript');
	document.documentElement.firstChild.appendChild(script);

});


function loadJson(json) {

    var myOptions = {
        zoom: 12,
        center: new google.maps.LatLng(0,0),
        disableDefaultUI: true,
        scrollwheel:false,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    map = new google.maps.Map(document.getElementById("js_map"), myOptions);
		pa_position = new google.maps.LatLng(json.site.y,json.site.x);
		

    fluster = new Fluster2(map);

    bounds = new google.maps.LatLngBounds();
    bounds.extend (new google.maps.LatLng(json.site.y,json.site.x));
    if (json.activities.length != 0) {
        for (var i = 0; i < json.activities.length; i++) {
            var user_information = new Object();
            user_information.username = json.activities[i].username;
            user_information.ago = json.activities[i].created_at;
            user_information.kind = json.activities[i].type;
            user_information.image = json.activities[i].image;
            var marker = new Activity_Marker({latlng: new google.maps.LatLng(json.activities[i].y,json.activities[i].x), map: null, user_information: user_information});
            fluster.addMarker(marker);
            bounds.extend (new google.maps.LatLng(json.activities[i].y,json.activities[i].x));
        }
    }

    fluster.currentZoomLevel = map.getZoom();
		fluster.styles = {
				0: {
					image: '/images/activity/cluster_marker.png',
					textColor: '#FFFFFF',
					width: 32,
					height: 31
				},
				10: {
					image: '/images/activity/cluster_marker.png',
					textColor: '#FFFFFF',
					width: 32,
					height: 31
				},
				20: {
					image: '/images/activity/cluster_marker.png',
					textColor: '#FFFFFF',
					width: 32,
					height: 31
				},
				30: {
					image: '/images/activity/cluster_marker.png',
					textColor: '#FFFFFF',
					width: 32,
					height: 31
				}
			};


    var image = new google.maps.MarkerImage('/images/activity/pa_marker.png',
            new google.maps.Size(84, 84),
            new google.maps.Point(0,0),
            new google.maps.Point(42,42));


    pa_marker = new google.maps.Marker({
        position: new google.maps.LatLng(json.site.y,json.site.x),
        title: json.site.url_slug,
        icon: image
    });
    pa_marker.setMap(map);


    map.fitBounds (bounds);
    map.setCenter( bounds.getCenter());
    fluster.initialize();
}

// Loads extra activities to the map on callback from ajax request
function loadMoreActivities(json) {

    old_markers = fluster.markers;
    fluster.clearMarkers();

    fluster = new Fluster2(map);
    for(var m in old_markers) {
        fluster.addMarker(old_markers[m]);
    }

    if (json.activities.length != 0) {
        for (var i = 0; i < json.activities.length; i++) {
            var user_information = new Object();
            user_information.username = json.activities[i].username;
            user_information.ago = json.activities[i].created_at;
            user_information.kind = json.activities[i].type;
            user_information.image = json.activities[i].image;
            var marker = new Activity_Marker({latlng: new google.maps.LatLng(json.activities[i].y,json.activities[i].x), map: null, user_information: user_information});
            fluster.addMarker(marker);
            bounds.extend (new google.maps.LatLng(json.activities[i].y,json.activities[i].x));
        }
    }

    fluster.currentZoomLevel = map.getZoom();
    var image = new google.maps.MarkerImage('/images/activity/pa_marker.png',
            new google.maps.Size(84, 84),
            new google.maps.Point(0,0),
            new google.maps.Point(42,42));

    map.fitBounds (bounds);
    map.setCenter( bounds.getCenter());
    fluster.initialize();
}

// Create a new marker. Don't add it to the map!
// var image = '/images/activity/user_marker.png';
// 		
// 		var marker = new google.maps.Marker({
// 			position: new google.maps.LatLng(pos[0], pos[1]),
// 			title: 'Marker ' + i,
// 			icon: image
// 		});



