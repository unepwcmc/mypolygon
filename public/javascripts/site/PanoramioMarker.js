
function PanoramioMarker(opts) {
    this.latlng = opts.latlng;

    if (!opts) opts = {};
		  this.offsetVertical_ = -9;
		  this.offsetHorizontal_ = -9;
		  this.height_ = 18;
		  this.width_ = 18;
			this.image_information_ = opts.image_information;
}


PanoramioMarker.prototype = new GOverlay();

PanoramioMarker.prototype.initialize = function(map) {
    var me = this;

    // Create the DIV representing our MarkerLight
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.paddingLeft = "0px";
    div.style.cursor = 'pointer';
	  div.style.background = "url('/images/sites/panoramio-marker.png') no-repeat 0 0";
	  div.style.width = "18px";
	  div.style.height = "18px";
	
		var hiddenDiv = document.createElement('div');
		hiddenDiv.style.position = "absolute";
		hiddenDiv.style.display = 'none';
		hiddenDiv.style.bottom = '25px';
		hiddenDiv.style.left = '-' + (this.image_information_.width/2 - 5) + 'px';
		hiddenDiv.style.width = (this.image_information_.width + 8 )+'px';
		hiddenDiv.style.height = (this.image_information_.height + 8 )+'px';
		hiddenDiv.style.background = '#FFFFFF';		
		hiddenDiv.alt = this.image_information_.slug;
	
		var arrow = document.createElement("img");
		arrow.style.position = "absolute";
		arrow.style.bottom = '-7px';
		arrow.style.left = (this.image_information_.width/2 - 4) + 'px';
		arrow.style.width = "16px";
		arrow.style.height = "8px";
		arrow.style.border = 'none';
		arrow.src = '/images/sites/arrow_tooltip_2.png';
		hiddenDiv.appendChild(arrow);
	
		var img_bkg = document.createElement('div');
		img_bkg.style.padding = '4px 4px 1px';
		img_bkg.style.margin = '0';
		img_bkg.style.height = '0';
		img_bkg.style.font = 'bold 11px Arial';
		img_bkg.style.color = '#FFFFFF';
		img_bkg.style.background = "white";
	
		var img = document.createElement('img');
		img.style.width = (this.image_information_.width)+'px';
		img.style.height = (this.image_information_.height)+'px';
		$(img).attr('alt',this.image_information_.photo_url);
		$(img).attr('src',this.image_information_.url);
		img_bkg.appendChild(img);
		
		$(img).click(
			function (ev) {
				window.open ($(img).attr('alt'));
			}
		);
		
		var close_button = document.createElement('a');
		close_button.style.position = "absolute";
		close_button.style.right = "-7px";
		close_button.style.top = "-5px";
		close_button.style.padding = '0';
		close_button.style.width = '20px';
		close_button.style.height = '23px';
		close_button.style.background = "url('/images/sites/x.png') no-repeat 0 0";
		
		$(close_button).click(
			function (ev) {
				click_panoramio_marker = false;
				setTimeout(function() {
					click_panoramio_marker = true;
		    }, 200);
				ev.preventDefault();
				ev.stopPropagation();
				$(this).parent().trigger("close_image");
			}
		);
	
		hiddenDiv.appendChild(close_button);
		hiddenDiv.appendChild(img_bkg);
	  div.appendChild(hiddenDiv);


    GEvent.addDomListener(div, "click", function(event) {
				event.stopPropagation();
				event.preventDefault();
				$(this).parent().trigger("close_image");
				$(this).parent().bind('close_image', function() {
					$(this).children('div').children('div').hide();
				});
				$(this).children('div').css('z-index',global_index+1);
				global_index++;
				$(this).children('div').show();
    });

    GEvent.addDomListener(div, "mouseover", function(event) {
				$(this).css('z-index',global_index+1);
				global_index++;
    });

    map.getPane(G_MAP_FLOAT_PANE).appendChild(div);

    this.map_ = map;
    this.div_ = div;
};


PanoramioMarker.prototype.remove = function() {
    this.div_.parentNode.removeChild(this.div_);
};


PanoramioMarker.prototype.copy = function() {
    var opts = {};
		opts.latlng = this.latlng;
		opts.image_information = this.image_information_;
    return new PanoramioMarker(opts);
};


PanoramioMarker.prototype.redraw = function(force) {

    if (!force) return;

    var divPixel = this.map_.fromLatLngToDivPixel(this.latlng);

    this.div_.style.width = this.width_ + "px";
    this.div_.style.left = (divPixel.x) + "px"
    this.div_.style.height = (this.height_) + "px";
    this.div_.style.top = (divPixel.y) - this.height_ + "px";
};

PanoramioMarker.prototype.getZIndex = function(m) {
    return GOverlay.getZIndex(marker.getPoint().lat());
}

PanoramioMarker.prototype.getPoint = function() {
    return this.latlng;
}; 
