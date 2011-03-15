/*drawing polygon*/
var poly;
var markers = [];
var path = new google.maps.MVCArray;

var vertexIcon = new google.maps.MarkerImage('/images/sites/delete_vertex_noover.png',
    new google.maps.Size(12, 12),
    // The origin for this image 
    new google.maps.Point(0,0),
    // The anchor for this image
    new google.maps.Point(6, 6)
    );

/**
 * Adds a polygon with the defined points.
 * @param points an array of latitude/longitude pairs.
 */
var polysToPreDraw = [];

function addPolygonToMap(points, repopulating) {
  if (points.length <= 2) //do we have a polygon?
  {
    return;
  }

  if(typeof(map) == "undefined")
  {
    if( repopulating ) {
      throw "Map should be loaded already.";
    } else {
      polysToPreDraw[polysToPreDraw.length] = points;
    }
    return;
  }

  var myPolyCoords = [];
  for(var i =0; i<points.length; i++) {
    myPolyCoords[i] = new google.maps.LatLng(points[i][1], points[i][0]); // First 1, then 0 ?!?
  }

  var bounds = new google.maps.LatLngBounds();

  startPolygon();
  for(i=0; i<myPolyCoords.length - 1; i++) {
    addPointUsingLatLong(myPolyCoords[i]);
    bounds.extend(myPolyCoords[i]);
  }

  map.fitBounds(bounds);
  map.setCenter( bounds.getCenter());
}



function addPoint(event) {
  addPointUsingLatLong(event.latLng)
}
function addPointUsingLatLong(latLng) {
  path.insertAt(path.length, latLng);

  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    draggable: true,
    icon: vertexIcon
  });
  markers.push(marker);
  marker.setTitle("#" + path.length);

  google.maps.event.addListener(marker, 'click', function() {
      if (markers.length < 4)
      {
        if (!$('#done').hasClass('disabled')) {
            $('#done').addClass('disabled');
        }
      }

    marker.setMap(null);
    for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
    markers.splice(i, 1);
    path.removeAt(i);
    }

  );


  google.maps.event.addListener(marker, 'dragend', function() {
    for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
    path.setAt(i, marker.getPosition());
    }
  );

  if (markers.length > 2) //do we have a polygon?
  {
    if ($('#done').hasClass('disabled')) {
		$('#done').removeClass('disabled');
	}
  }
}

function startPolygon()  //destroy old polygon?
{
  poly = new google.maps.Polygon({
    strokeWeight: 2,
    fillColor: '#FF6600',
    strokeColor: '#FF6600'
  });
  poly.setMap(map);
  poly.setPaths(new google.maps.MVCArray([path]));

  google.maps.event.addListener(map, 'click', addPoint);
}

/*adapted from Lifeweb's calculator.js*/
function polys2geoJson(polygons) {
    var geojson={"type":"MultiPolygon"};
    var polys = [];
    for (var i=0; i<polygons.length; i++)
    {
        var pol = polygons[i];
        var polyArray =[];
        var pathArray=[];
        var numPoints = path.length;
        for(var i=0; i < numPoints; i++) {
            var lat = path.getAt(i).lat();
            var lng = path.getAt(i).lng();
            pathArray.push([lng,lat]);
        }
        pathArray.push([path.getAt(0).lng(),path.getAt(0).lat()]); //google maps will automatically close the polygon; postgis requires the last coordinate to be repeted
        polyArray.push(pathArray);
        polys.push(polyArray);
    }
    geojson['coordinates'] = polys;

    return $.toJSON(geojson);
}

function submitPolygon(){
	var geojson = polys2geoJson([poly]);
	var dataObj = {"data": geojson};
	$.ajax({
      type: 'POST',
  		url: "assesments/createFromPolygon",
  		data: dataObj,
  		cache: false,
			dataType: 'json',
  		success: function(result){
				$('#loader_image').hide();
                window.location = 'assesments/' + result.assesment.id;
  		},
    	error:function (xhr, ajaxOptions, thrownError){
				$('#loader_image').hide();
     	}
		});
}