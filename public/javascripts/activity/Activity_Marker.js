
function Activity_Marker(opts) {
  google.maps.OverlayView.call(this);
  this.latlng_ = opts.latlng;
  this.map_ = opts.map;
  this.offsetVertical_ = -20;
  this.offsetHorizontal_ = -20;
  this.height_ = 41;
  this.width_ = 41;
	this.user_information_ = opts.user_information;

  var me = this;

  var geodesic_line = [pa_position,this.latlng_];
    var geodesic_path = new google.maps.Polyline({
      path: geodesic_line,
      strokeColor: "#326696",
      strokeOpacity: 1.0,
      strokeWeight: 1.5,
  		geodesic: true
    });

	geodesic_path.bindTo('map', this);
	
}

Activity_Marker.prototype = new google.maps.OverlayView();

Activity_Marker.prototype.remove = function() {
  if (this.div_) {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
};

Activity_Marker.prototype.draw = function() {
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
	
  this.div_.style.display = 'block';
};

Activity_Marker.prototype.createElement = function() {
  var panes = this.getPanes();
  var div = this.div_;
  if (!div) {

    div = this.div_ = document.createElement("div");
    div.style.border = "0px none";
    div.style.position = "absolute";
    div.style.background = "url('/images/activity/user_marker.png') no-repeat 0 0";
    div.style.width = "32px";
    div.style.height = "32px";
		div.style.cursor = 'pointer';
	
		var hiddenDiv = document.createElement('div');
		hiddenDiv.style.position = "absolute";
		hiddenDiv.style.display = 'none';
		hiddenDiv.style.top = '-77px';
		hiddenDiv.style.left = '-70px';
    hiddenDiv.style.width = "170px";
    hiddenDiv.style.height = "63px";
		hiddenDiv.style.padding = '7px';
		hiddenDiv.style.background = 'url(/images/activity/user_rollover.png) no-repeat 0 0';
    hiddenDiv.style.cursor = "pointer";
		hiddenDiv.alt = this.user_information_.slug;

		var user_avatar = document.createElement("img");
		user_avatar.style.position = "absolute";
		user_avatar.style.left = '8px';
		user_avatar.style.top = '7px';
    user_avatar.style.width = "48px";
    user_avatar.style.height = "48px";
    user_avatar.style.cursor = "pointer";
		user_avatar.style.border = '1px solid #cccccc';
		user_avatar.style.padding = '3px';
    user_avatar.src = this.user_information_.image;
    hiddenDiv.appendChild(user_avatar);

		var user_name = document.createElement('p');
		user_name.style.position = "relative";
		user_name.style.float = "left";
		user_name.style.padding = '0';
		user_name.style.margin = '0 0 0 63px';
		user_name.style.font = 'bold 13px Arial';
		user_name.style.color = '#006699';
		$(user_name).html(this.user_information_.username);
    user_name.style.width = "103px";
		hiddenDiv.appendChild(user_name);
		
		var activity_ago = document.createElement('p');
		activity_ago.style.position = "relative";
		activity_ago.style.float = "left";
		activity_ago.style.padding = '0';
		activity_ago.style.margin = '0 0 0 63px';
		activity_ago.style.font = 'normal 11px Arial';
		activity_ago.style.color = '#666666';
		$(activity_ago).html(this.user_information_.ago);
    activity_ago.style.width = "103px";
		hiddenDiv.appendChild(activity_ago);
		
		var activity_kind = document.createElement('p');
		activity_kind.style.position = "relative";
		activity_kind.style.float = "left";
		activity_kind.style.padding = '0';
		activity_kind.style.margin = '11px 0 0 63px';
		activity_kind.style.font = 'bold 11px Arial';
		activity_kind.style.color = '#006699';
		$(activity_kind).html(this.user_information_.kind);
    activity_kind.style.width = "103px";
		hiddenDiv.appendChild(activity_kind);

    div.appendChild(hiddenDiv);

    function removeInfoBox(ib) {
      return function() {
        ib.setMap(null);
      };
    }

		// div.style.display = 'none';

		$(div).hover(
			function (ev) {
				lastMask++;
				$(this).children('div').css('z-index',lastMask+1);
				$(this).css('z-index',lastMask);
				$(this).children('div').show();
				$(this).children('div').hover(
					function (ev) {
						$(this).hide();
					}
				);
			},
			function (ev) {
				$(this).children('div').hide();
			}
		);

    panes.floatPane.appendChild(div);				
		
  } else if (div.parentNode != panes.floatPane) {
    // The panes have changed.  Move the div.
    div.parentNode.removeChild(div);
    panes.floatPane.appendChild(div);
  }
}

Activity_Marker.prototype.getPosition = function() {
    return this.latlng_;
};

