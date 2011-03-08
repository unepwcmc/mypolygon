
function PAMarker(opts) {
    this.latlng = opts.latlng;

    if (!opts) opts = {};
	  this.offsetVertical_ = -75;
	  this.offsetHorizontal_ = -40;
	  this.height_ = 80;
	  this.width_ = 80;
		this.pa_information_ = opts.pa_information;
}


PAMarker.prototype = new GOverlay();

PAMarker.prototype.initialize = function(map) {
    var me = this;

    // Create the DIV representing our MarkerLight
    var div = document.createElement("div");
    div.style.border = "0px none";
    div.style.position = "absolute";
		div.style.visibility = "visible";
    div.style.background = "url('../images/icons/marker.png') no-repeat 0 0";
    div.style.width = this.width_ + "px";
    div.style.height = this.height_ + "px";

    var paImage = document.createElement("img");
		paImage.style.position = "absolute";
		paImage.style.top = '13px';
		paImage.style.left = '16px';
    paImage.style.width = "48px";
    paImage.style.height = "48px";
    paImage.src = this.pa_information_.image;
    div.appendChild(paImage);

    GEvent.addDomListener(div, "mouseover", function(event) {
				$(this).css('z-index',global_index+1);
				global_index++;
    });

    map.getPane(G_MAP_FLOAT_PANE).appendChild(div);

    this.map_ = map;
    this.div_ = div;
};


PAMarker.prototype.remove = function() {
    this.div_.parentNode.removeChild(this.div_);
};


PAMarker.prototype.copy = function() {
    var opts = {};
		opts.latlng = this.latlng;
		opts.pa_information_ = this.pa_information_;
    return new PAMarker(opts);
};


PAMarker.prototype.redraw = function(force) {

    if (!force) return;

    var divPixel = this.map_.fromLatLngToDivPixel(this.latlng);

    this.div_.style.width = this.width_ + "px";
    this.div_.style.left = (divPixel.x) + this.offsetHorizontal_ + "px";
    this.div_.style.height = (this.height_) +"px";
    this.div_.style.top = (divPixel.y) + this.offsetVertical_ + "px";
};

PAMarker.prototype.getZIndex = function(m) {
    return GOverlay.getZIndex(marker.getPoint().lat());
}

PAMarker.prototype.getPoint = function() {
    return this.latlng;
}; 
