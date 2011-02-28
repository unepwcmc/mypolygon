
function Fluster2ClusterMarker(_fluster, _cluster) {
	this.fluster = _fluster;
	this.cluster = _cluster;
	this.position = this.cluster.getPosition();
	this.markerCount = this.cluster.getMarkerCount();
	this.map = this.fluster.getMap();
	this.style = null;
	this.div = null;
	
	// Assign style
	var styles = this.fluster.getStyles();
	for(var i in styles) {
		if(this.markerCount > i) {
			this.style = styles[i];
		} else {
			break;
		}
	}
	
	google.maps.OverlayView.call(this);
	this.setMap(this.map);
	
  var geodesic_line = [pa_position,this.position];
  var geodesic_path = new google.maps.Polyline({
    path: geodesic_line,
    strokeColor: "#326696",
    strokeOpacity: 1.0,
    strokeWeight: 1.5,
		geodesic: true
  });

  geodesic_path.bindTo('map', this);

	this.draw();
};

Fluster2ClusterMarker.prototype = new google.maps.OverlayView();

Fluster2ClusterMarker.prototype.draw = function() {
	if(this.div == null)
	{
		var me = this;
		
		// Create div
		this.div = document.createElement('div');
		
		// Set styles
		this.div.style.position = 'absolute';
		this.div.style.width = '32px';
		this.div.style.height = '31px';
		this.div.style.lineHeight = '31px';
		this.div.style.background = 'transparent url("/images/activity/cluster_marker.png") 50% 50% no-repeat';
		this.div.style.color = '#FFFFFF';
		this.div.style.position = 'relative';
		
		// Marker count
		this.div.style.textAlign = 'center';
		this.div.style.fontFamily = 'Arial';
		this.div.style.padding = '0 0 0 2px';
		this.div.style.fontSize = '15px';
		this.div.style.fontWeight = 'bold';
		this.div.innerHTML = this.markerCount;
		
		//Create the hover
		this.img = document.createElement('img');
		this.img.src = '/images/activity/view_more.png'
		this.img.style.width = '72px';
		this.img.style.height = '30px';
		this.img.style.position = 'absolute';
		this.img.style.top = '-31px';
		this.img.style.left = '-18px';
		this.img.style.display = 'none';
		$(this.img).css('z-index','100000');
		
		$(this.div).append(this.img);
		
		// Cursor and onlick
		this.div.style.cursor = 'pointer';
		google.maps.event.addDomListener(this.div, 'click', function() {
			me.map.fitBounds(me.cluster.getMarkerBounds());
		});
		
		// Hover effect
		$(this.div).hover(
			function(ev){
				$(this).children('img').show();
				$(this).children('img').hover(
					function(ev) {
						$(this).hide();
					}
				);
			},
			function(ev){
				$(this).children('img').hide();
			}
		);
		
		this.getPanes().overlayImage.appendChild(this.div);
	}
	
	// Position
	var position = this.getProjection().fromLatLngToDivPixel(this.position);
	this.div.style.left = (position.x - parseInt((this.style.width) / 2)) + 'px';
	this.div.style.top = (position.y - parseInt((this.style.height) / 2)) + 'px';
};

Fluster2ClusterMarker.prototype.hide = function() {
	this.div.style.display = 'none';
};

Fluster2ClusterMarker.prototype.show = function() {
	this.div.style.display = 'block';
};