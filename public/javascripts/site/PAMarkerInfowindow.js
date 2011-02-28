
function PAMarkerInfowindow(opts) {
    this.latlng = opts.latlng;

    if (!opts) opts = {};
	  this.offsetVertical_ = -75;
	  this.offsetHorizontal_ = -40;
	  this.height_ = 80;
	  this.width_ = 80;
		this.pa_information_ = opts.pa_information;
}


PAMarkerInfowindow.prototype = new GOverlay();

PAMarkerInfowindow.prototype.initialize = function(map) {
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
    paImage.style.cursor = "pointer";
    paImage.src = this.pa_information_.image;
    div.appendChild(paImage);
	
		var hiddenDiv = document.createElement('div');
		hiddenDiv.style.position = "absolute";
		hiddenDiv.style.display = 'none';
		hiddenDiv.style.top = '-7px';
		hiddenDiv.style.left = '-5px';
    hiddenDiv.style.width = "208px";
    hiddenDiv.style.height = "88px";
		hiddenDiv.style.background = 'url(../images/markers/backgroundMarker.png) no-repeat 0 0';
    hiddenDiv.style.cursor = "pointer";
		hiddenDiv.alt = this.pa_information_.slug;

		var paImageOver = document.createElement("img");
		paImageOver.style.position = "absolute";
		paImageOver.style.top = '19px';
		paImageOver.style.left = '20px';
    paImageOver.style.width = "48px";
    paImageOver.style.height = "48px";
    paImageOver.style.cursor = "pointer";
		paImageOver.style.border = '1px solid #005783'
    paImageOver.src = this.pa_information_.image;
    hiddenDiv.appendChild(paImageOver);

		var paName = document.createElement('p');
		paName.style.position = "relative";
		paName.style.float = "left";
		paName.style.padding = '18px 0 0 76px';
		paName.style.font = 'bold 12px Arial';
		paName.style.color = '#FFFFFF';
		if (this.pa_information_.name != null) {
			var paNameLength = this.pa_information_.name.length;
			if (paNameLength>28) {
				var paNameValue = this.pa_information_.name.substring(0,22);
				$(paName).html(paNameValue + '...');
			}	else {
				$(paName).html(this.pa_information_.name);
			} 
		}
    paName.style.width = "112px";
    paName.style.cursor = "pointer";
		hiddenDiv.appendChild(paName);
		
		$(hiddenDiv).click( function(ev){
		    if(!onDragMovement) {
		        window.location = '/sites/' + $(this).attr('alt');
		    } else {
		        onDragMovement=false;
		    }
				ev.stopPropagation();
				ev.preventDefault();
		});
		
		var localName = document.createElement('p');
		localName.style.position = "relative";
		localName.style.float = "left";
		localName.style.margin = '0 0 0 76px';
		localName.style.font = 'italic 11px Arial';
		localName.style.color = '#FFFFFF';
		if (this.pa_information_.local_name != null) {
			var localNameLength = this.pa_information_.local_name.length;
			if (localNameLength>16) {
				var localNameValue = this.pa_information_.local_name.substring(0,16);
				$(localName).html(localNameValue + '...');
			} else {
				$(localName).html(this.pa_information_.local_name);
			}
		}
    localName.style.width = "112px";
    localName.style.cursor = "pointer";
		hiddenDiv.appendChild(localName);
		
		var poI = document.createElement('p');
		poI.style.position = "absolute";
		poI.style.float = "left";
		poI.style.bottom = '18px';
		poI.style.left = '76px';
		poI.style.font = 'normal 10px Arial';
		poI.style.color = '#004669';
		if (this.pa_information_.poi_count>0) {
			if (this.pa_information_.poi_count==1) {
				$(poI).html(this.pa_information_.poi_count + ' Point of interest');
			} else {
				$(poI).html(this.pa_information_.poi_count + ' Points of interest');
			}
		} else {
			$(poI).html('');
		}
    poI.style.width = "112px";
    poI.style.cursor = "pointer";
		hiddenDiv.appendChild(poI);
    div.appendChild(hiddenDiv);



    GEvent.addDomListener(div, "mouseover", function(event) {
				$(this).children('div').stop().fadeTo('fast',1);
    });

    GEvent.addDomListener(hiddenDiv, "mouseout", function(event) {
				$(this).stop().fadeTo("fast",0);
    });

    map.getPane(G_MAP_FLOAT_PANE).appendChild(div);

    this.map_ = map;
    this.div_ = div;
};


PAMarkerInfowindow.prototype.remove = function() {
    this.div_.parentNode.removeChild(this.div_);
};


PAMarkerInfowindow.prototype.copy = function() {
    var opts = {};
		opts.latlng = this.latlng;
		opts.pa_information_ = this.pa_information_;
    return new PAMarkerInfowindow(opts);
};


PAMarkerInfowindow.prototype.redraw = function(force) {

    if (!force) return;

    var divPixel = this.map_.fromLatLngToDivPixel(this.latlng);

    this.div_.style.width = this.width_ + "px";
    this.div_.style.left = (divPixel.x) + this.offsetHorizontal_ + "px";
    this.div_.style.height = (this.height_) +"px";
    this.div_.style.top = (divPixel.y) + this.offsetVertical_ + "px";

};

PAMarkerInfowindow.prototype.getZIndex = function(m) {
    return GOverlay.getZIndex(marker.getPoint().lat());
}

PAMarkerInfowindow.prototype.getPoint = function() {
    return this.latlng;
}; 
