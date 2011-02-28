function PAInfoWindow(opts) {
  google.maps.OverlayView.call(this);
  this.latlng_ = opts.latlng;
  this.map_ = opts.map;
  this.offsetVertical_ = -75;
  this.offsetHorizontal_ = -40;
  this.height_ = 80;
  this.width_ = 80;
	this.paInformation_ = opts.paInformation;

  var me = this;
  this.boundsChangedListener_ =
    google.maps.event.addListener(this.map_, "bounds_changed", function() {
      return me.panMap.apply(me);
    });

  // Once the properties of this OverlayView are initialized, set its map so
  // that we can display it.  This will trigger calls to panes_changed and
  // draw.
	
  this.setMap(this.map_);
}

PAInfoWindow.prototype = new google.maps.OverlayView();

PAInfoWindow.prototype.remove = function() {
  if (this.div_) {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
};

PAInfoWindow.prototype.draw = function() {
  // Creates the element if it doesn't exist already.
  this.createElement();
  if (!this.div_) return;

  // Calculate the DIV coordinates of two opposite corners of our bounds to
  // get the size and position of our Bar
  var pixPosition = this.getProjection().fromLatLngToDivPixel(this.latlng_);
  if (!pixPosition) return;

  // Now position our DIV based on the DIV coordinates of our bounds
  this.div_.style.width = this.width_ + "px";
  this.div_.style.left = (pixPosition.x + this.offsetHorizontal_) + "px";
  this.div_.style.height = this.height_ + "px";
  this.div_.style.top = (pixPosition.y + this.offsetVertical_) + "px";
	
	$(this.div_).fadeIn('fast');
  // this.div_.style.display = 'block';
};

PAInfoWindow.prototype.createElement = function() {
  var panes = this.getPanes();
  var div = this.div_;
  if (!div) {
    // This does not handle changing panes.  You can set the map to be null and
    // then reset the map to move the div.
    div = this.div_ = document.createElement("div");
    div.style.border = "0px none";
    div.style.position = "absolute";
    div.style.background = "url('../images/icons/marker.png') no-repeat 0 0";
    div.style.width = this.width_ + "px";
    div.style.height = this.height_ + "px";

    // var topDiv = document.createElement("div");
    var paImage = document.createElement("img");
		paImage.style.position = "absolute";
		paImage.style.top = '13px';
		paImage.style.left = '16px';
    paImage.style.width = "48px";
    paImage.style.height = "48px";
    paImage.style.cursor = "pointer";
    paImage.src = this.paInformation_.image;
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
		hiddenDiv.alt = this.paInformation_.slug;

		var paImageOver = document.createElement("img");
		paImageOver.style.position = "absolute";
		paImageOver.style.top = '19px';
		paImageOver.style.left = '20px';
    paImageOver.style.width = "48px";
    paImageOver.style.height = "48px";
    paImageOver.style.cursor = "pointer";
		paImageOver.style.border = '1px solid #005783'
    paImageOver.src = this.paInformation_.image;
    hiddenDiv.appendChild(paImageOver);

		var paName = document.createElement('p');
		paName.style.position = "relative";
		paName.style.float = "left";
		paName.style.padding = '18px 0 0 76px';
		paName.style.font = 'bold 12px Arial';
		paName.style.color = '#FFFFFF';
		if (this.paInformation_.name != null) {
			var paNameLength = this.paInformation_.name.length;
			if (paNameLength>28) {
				var paNameValue = this.paInformation_.name.substring(0,22);
				$(paName).html(paNameValue + '...');
			}	else {
				$(paName).html(this.paInformation_.name);
			} 
		}
    paName.style.width = "112px";
    paName.style.cursor = "pointer";
		hiddenDiv.appendChild(paName);
		
		$(hiddenDiv).click( function(ev){
		    if(!onDragMovement) {
		        window.location = 'http://stage-www.tinypla.net/sites/' + $(this).attr('alt');
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
		if (this.paInformation_.local_name != null) {
			var localNameLength = this.paInformation_.local_name.length;
			if (localNameLength>16) {
				var localNameValue = this.paInformation_.local_name.substring(0,16);
				$(localName).html(localNameValue + '...');
			} else {
				$(localName).html(this.paInformation_.local_name);
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
		if (this.paInformation_.poi_count>0) {
			if (this.paInformation_.poi_count==1) {
				$(poI).html(this.paInformation_.poi_count + ' Point of interest');
			} else {
				$(poI).html(this.paInformation_.poi_count + ' Points of interest');
			}
		} else {
			$(poI).html('');
		}
    poI.style.width = "112px";
    poI.style.cursor = "pointer";
		hiddenDiv.appendChild(poI);
		
		

    div.appendChild(hiddenDiv);


    function removeInfoBox(ib) {
      return function() {
        ib.setMap(null);
      };
    }


		var config = {    
		     sensitivity: 10,    
		     interval: 0, 
		     over: function(ev){
									lastMask++;
									$(this).children('div').css('z-index',lastMask+1);
									$(this).css('z-index',lastMask);
		      				$(this).children('div').fadeIn("fast");
				 },
		     timeout: 0, 
		     out: function(ev){
									$(this).children('div').fadeOut("fast");
				}
		};


    div.style.display = 'none';
		$(div).hoverIntent(config);


    panes.floatPane.appendChild(div);				
		
    this.panMap();
  } else if (div.parentNode != panes.floatPane) {
    // The panes have changed.  Move the div.
    div.parentNode.removeChild(div);
    panes.floatPane.appendChild(div);
  } else {
    // The panes have not changed, so no need to create or move the div.
  }
}

PAInfoWindow.prototype.getPosition = function() {
    return this.latlng_;
};

PAInfoWindow.prototype.panMap = function() {

};


