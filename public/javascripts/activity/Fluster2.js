
function Fluster2(_map, _debug)
{
	// Private variables
	var map = _map;
	var projection = new Fluster2ProjectionOverlay(map);
	var me = this;
	var clusters = new Object();
	var markersLeft = new Object();
	
	// Properties
	this.debugEnabled = _debug;
	this.gridSize = 80;
	this.markers = new Array();
	this.currentZoomLevel = 5;
	this.styles = {
		0: {
			image: 'http://gmaps-utility-library.googlecode.com/svn/trunk/markerclusterer/1.0/images/m1.png',
			textColor: '#FFFFFF',
			width: 53,
			height: 52
		},
		10: {
			image: 'http://gmaps-utility-library.googlecode.com/svn/trunk/markerclusterer/1.0/images/m2.png',
			textColor: '#FFFFFF',
			width: 56,
			height: 55
		},
		20: {
			image: 'http://gmaps-utility-library.googlecode.com/svn/trunk/markerclusterer/1.0/images/m3.png',
			textColor: '#FFFFFF',
			width: 66,
			height: 65
		}
	};
	
	// Timeouts
	var zoomChangedTimeout = null;
	
	/**
	 * Create clusters for the current zoom level and assign markers.
	 */
	function createClusters()
	{
		var zoom = map.getZoom();
		
		if(clusters[zoom])
		{
			me.debug('Clusters for zoom level ' + zoom + ' already initialized.');
		}
		else
		{
			// Create clusters array
			var clustersThisZoomLevel = new Array();
			
			// Set cluster count
			var clusterCount = 0;
			
			// Get marker count
			var markerCount = me.markers.length;
			
			// Walk all markers
			for(var i = 0; i < markerCount; i++)
			{
				var marker = me.markers[i];
				var markerPosition = marker.getPosition();
				var done = false;
				
				// Find a cluster which contains the marker
				for(var j = clusterCount - 1; j >= 0; j--)
				{
					var cluster = clustersThisZoomLevel[j];
					if(cluster.contains(markerPosition))
					{
						cluster.addMarker(marker);
						done = true;
						break;
					}
				}
				
				if(!done)
				{
					// No cluster found, create a new one
					var cluster = new Fluster2Cluster(me, marker);
					clustersThisZoomLevel.push(cluster);
					
					// Increase cluster count
					clusterCount++;
				}
			}
			
			clusters[zoom] = clustersThisZoomLevel;
			
			me.debug('Initialized ' + clusters[zoom].length + ' clusters for zoom level ' + zoom + '.');
		}
		
		// Hide markers of previous zoom level
		if(clusters[me.currentZoomLevel])
		{
			for(var i = 0; i < clusters[me.currentZoomLevel].length; i++)
			{
				clusters[me.currentZoomLevel][i].hide();
			}
		}
		
		// Set current zoom level
		me.currentZoomLevel = zoom;
		
		// Show clusters
		showClustersInBounds();
	}
	
	/**
	 * Displays all clusters inside the current map bounds.
	 */
	function showClustersInBounds()
	{
		var mapBounds = map.getBounds();
		
		for(var i = 0; i < clusters[me.currentZoomLevel].length; i++)
		{
			var cluster = clusters[me.currentZoomLevel][i];
			if(mapBounds.contains(cluster.getPosition()))
			{
				cluster.show();
			}
		}
	}
	
	/**
	 * Callback which is executed 500ms after the map's zoom level has changed.
	 */
	this.zoomChanged = function()
	{
		window.clearInterval(zoomChangedTimeout);
		zoomChangedTimeout = window.setTimeout(createClusters, 500);
	};
	
	/**
	 * Returns the map assigned to this Fluster.
	 */
	this.getMap = function()
	{
		return map;
	};
	
	/**
	 * Returns the map projection.
	 */
	this.getProjection = function()
	{
		return projection.getP();
	};
	
	/**
	 * Prints debug messages to console if debugging is enabled.
	 */
	this.debug = function(message)
	{
		if(me.debugEnabled)
		{
			console.log('Fluster2: ' + message);
		}
	};
	
	/**
	 * Adds a marker to the Fluster.
	 */
	this.addMarker = function(_marker)
	{
		me.markers.push(_marker);
	};
	
	/**
	 * Returns the currently assigned styles.
	 */
	this.getStyles = function()
	{
		return me.styles;
	};
	
	/**
	 * Sets map event handlers and setup's the markers for the current
	 * map state.
	 */
	this.initialize = function()
	{		
		// Add event listeners
		google.maps.event.addListener(map, 'zoom_changed', this.zoomChanged);
		google.maps.event.addListener(map, 'dragend', showClustersInBounds);

		// Setup markers for the current state
        window.setTimeout(createClusters, 1000);
    };

    /**
     * Internet found function to clear all, may have bugs!
     */
    function clearAll()
    {
        for(var i = 0; i<15; i++)
        {
            for (var j=0; clusters[i] && j<clusters[i].length; j++)
            {
                if (clusters[i][j].marker)
                    clusters[i][j].marker.setMap(null);
                clusters[i][j].hide();
                clusters[i][j] = null;
            }
            clusters[i]= null;
        }

        for (i = 0; i < me.markers.length; i++) {
            me.markers[i].setMap(null);
        }
        me.markers = new Array();
        clusters = new Object();
    }

    /**
     * Remove all markers
     */
    this.clearMarkers = function()
    {
        clearAll();
    };
}