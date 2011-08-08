/*drawing polygon*/
var allPolys = []; // Array of all the Polys on the map

// Represents a polygon with its markers and path
var Poly = (function() {
  // Constructor -
  // Creates and initialises a new google.maps.Polygon 
  function Poly(polygon, markers, path) {
    this.markers = [];
    this.path = new google.maps.MVCArray;

    this.polygon = new google.maps.Polygon({
        strokeWeight: 2,
        fillColor: '#FF6600',
        strokeColor: '#FF6600'
      });
    this.polygon.setMap(map);
    this.polygon.setPaths(new google.maps.MVCArray([this.path]));

    allPolys.push(this); // Add to the allPolys collection
  }

  // Add a point to the polygon using a latLng
  // @param latLng
  Poly.prototype.addPointUsingLatLng = function (latLng) {
    this.path.insertAt(this.path.length, latLng);

    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      draggable: true,
      icon: vertexIcon
    });
    this.markers.push(marker);
    marker.setTitle("#" + this.path.length);

    google.maps.event.addListener(marker, 'click', function() {
      if (this.markers.length < 4) {
        if (!$('#done').hasClass('disabled')) {
            $('#done').addClass('disabled');
        }
      }

      marker.setMap(null);
      for (var i = 0, I = this.markers.length; i < I && this.markers[i] != marker; ++i);
      this.markers.splice(i, 1);
      this.path.removeAt(i);
      }
    );


    google.maps.event.addListener(marker, 'dragend', function() {
      for (var i = 0, I = this.markers.length; i < I && this.markers[i] != marker; ++i);
      this.path.setAt(i, marker.getPosition());
      }
    );

    if (this.markers.length > 2) {//do we have a polygon?
      if ($('#done').hasClass('disabled')) {
        $('#done').removeClass('disabled');
      }
    }
  }

  // Returns an JSON point array
  Poly.prototype.toPointArray = function () {
    var pathArray=[];
    var _i, numPoints;
    for(var _i=0, numPoints = this.path.length; _i < numPoints; _i++) {
      var lat = this.path.getAt(_i).lat();
      var lng = this.path.getAt(_i).lng();
      pathArray.push([lng,lat]);
    }
    pathArray.push([this.path.getAt(0).lng(),this.path.getAt(0).lat()]); //google maps will automatically close the polygon; postgis requires the last coordinate to be repeted
    return pathArray;
  }

  return Poly;
})();


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
  var _i, _len;
  for(_i = 0, _len = points.length; _i<_len; _i++) {
    myPolyCoords[_i] = new google.maps.LatLng(points[_i][1], points[_i][0]); // First 1, then 0 ?!?
  }

  var bounds = new google.maps.LatLngBounds();

  var p = new Poly();
  for(_i=0, _len = myPolyCoords.length - 1; _i<_len; _i++) {
    p.addPointUsingLatLng(myPolyCoords[_i]);
    bounds.extend(myPolyCoords[_i]);
  }

  map.fitBounds(bounds);
  map.setCenter( bounds.getCenter());
}



function addPoint(event) {
  alert("refactor this method to use the addPointUsingLatLong method on a Poly object");
  addPointUsingLatLong(event.latLng)
}

/**
 * Converts an array of Polys to GeoJSON
 * @param polys An array of Polys
 */
function polys2geoJson(polys) {
  var geojson={"type":"MultiPolygon"};
  var json_polys = [];
  var _i, _len;
  for (_i=0, _len = polys.length; _i<_len; _i++) {
    var poly = polys[_i];

    json_polys.push([poly.toPointArray()]);
  }
  geojson['coordinates'] = json_polys;

  return $.toJSON(geojson);
}

function submitPolygon(){
  $('#done').addClass('loading');
  var geojson = polys2geoJson(allPolys);
  var sources = [];
  $('#layers input:checkbox:checked').each(function() {
    sources.push($(this).val());
  });

  area = google.maps.geometry.spherical.computeArea(poly.getPath());
  if(area > MAX_POLYGON_AREA_KM2 * 1000 * 1000)
  {
    alert("Your polygon is too large ("+Math.round(area/1000/1000)+" km2), please limit its area to "+MAX_POLYGON_AREA_KM2+" km2.");
    $('#done').removeClass('loading');
    return false;
  }

	var dataObj = {"data": geojson, "sources": sources};
	$.ajax({
      type: 'POST',
  		url: "assesments/createFromPolygon",
  		data: dataObj,
  		cache: false,
			dataType: 'json',
  		success: function(result){
        if(typeof(result.assesment) != "undefined") {
          window.location = 'assesments/' + result.assesment.id;
        } else {
          alert( result.error ||"Unknown error while uploading polygon.\nIs the polygon too big?\nOr perhaps its edges intersect each-other?" );
        }
        $('#done').removeClass('loading');
  		},
    	error:function (xhr, ajaxOptions, thrownError){
        alert(thrownError);
        $('#done').removeClass('loading');
     	}
		});
}
