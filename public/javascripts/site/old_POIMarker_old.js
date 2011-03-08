
function POIMarker(opts) {
    this.latlng = opts.latlng;

    if (!opts) opts = {};
	  this.offsetVertical_ = -18;
	  this.offsetHorizontal_ = -18;
	  this.height_ = 37;
	  this.width_ = 37;
		this.poi_information_ = opts.poi_information;
}


POIMarker.prototype = new GOverlay();

POIMarker.prototype.initialize = function(map) {
    var me = this;

    // Create the DIV representing our MarkerLight
    var div = document.createElement("div");
    div.style.border = "0px none";
    div.style.position = "absolute";
    div.style.background = "url('/images/sites/poiMarker.png') no-repeat 0 0";
    div.style.width = "37px";
    div.style.height = "37px";
		div.style.cursor = 'pointer';
	
		var hiddenDiv = document.createElement('div');
		hiddenDiv.style.position = "absolute";
		hiddenDiv.style.display = 'none';
		hiddenDiv.style.top = '-30px';
		hiddenDiv.style.left = '-42px';
		hiddenDiv.style.width = '120px';
		hiddenDiv.style.background = 'none';		
		hiddenDiv.alt = this.poi_information_.slug;

		var arrow = document.createElement("img");
		arrow.style.position = "absolute";
		arrow.style.bottom = '-8px';
		arrow.style.left = '52px';
		arrow.style.width = "16px";
		arrow.style.height = "8px";
		arrow.style.border = 'none';
		arrow.src = '/images/sites/arrow_tooltip.png';
		hiddenDiv.appendChild(arrow);

		var poi_name = document.createElement('p');
		poi_name.style.padding = '4px 1px';
		poi_name.style.font = 'bold 11px Arial';
		poi_name.style.color = '#FFFFFF';
		poi_name.style.background = "url('/images/sites/bkg_tooltip.png') repeat-x 0 0";
		$(poi_name).css('text-align','center');
		var poiNameLength = this.poi_information_.title.length;
		if (poiNameLength>16) {
			var poiNameValue = this.poi_information_.title.substring(0,16);
			$(poi_name).html(poiNameValue + '...');
		}	else {
			$(poi_name).html(this.poi_information_.title);
		} 
		hiddenDiv.appendChild(poi_name);
    div.appendChild(hiddenDiv);

    GEvent.addDomListener(div, "mouseover", function(event) {
				$(this).css('z-index',global_index+1);
				global_index++;
				$(this).children('div').show();
				$(this).children('div').hover(
					function (ev) {
						$(this).hide();
					}
				);
    });
    GEvent.addDomListener(div, "mouseout", function(event) {
				$(this).children('div').hide();
    });

    map.getPane(G_MAP_MARKER_PANE).appendChild(div);

    this.map_ = map;
    this.div_ = div;
};


POIMarker.prototype.remove = function() {
    this.div_.parentNode.removeChild(this.div_);
};


POIMarker.prototype.copy = function() {
    var opts = {};
		opts.latlng = this.latlng;
		opts.poi_information_ = this.poi_information_;
    return new POIMarker(opts);
};


POIMarker.prototype.redraw = function(force) {

    if (!force) return;

    var divPixel = this.map_.fromLatLngToDivPixel(this.latlng);

    this.div_.style.width = this.width_ + "px";
    this.div_.style.left = (divPixel.x) + "px"
    this.div_.style.height = (this.height_) + "px";
    this.div_.style.top = (divPixel.y) - this.height_ + "px";
};

POIMarker.prototype.getZIndex = function(m) {
    return GOverlay.getZIndex(marker.getPoint().lat());
}

POIMarker.prototype.getPoint = function() {
    return this.latlng;
}; 
