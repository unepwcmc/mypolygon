var map_changed = 0;
var edit_map;
var loadedGeoJson;
var activePolygons;
var copyActivePolygons;
var previousActivePolygons;
var vertexDelMarkers=[];
var deleteMarkers;
var origPaBBox;

var parsedBounds;
var listeners=[];
var iconDel;

var COLORS = [["red", "#ff0000"], ["orange", "#ff8800"], ["green","#008000"],
              ["blue", "#000080"], ["purple", "#800080"]];
var options = {};
var lineCounter_ = 0;
var shapeCounter_ = 0;
var markerCounter_ = 0;
var colorIndex_ = 0;
var featureTable_;

var textInputSource;

$(document).ready(function() {
	
	textInputSource = $('#citationInput').attr('value');
	
	$('a#edit_map_button_ban').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		$('div#signUp').fadeIn('fast');
		$.scrollTo('div#header',500, function() {
			$('#username_field_home').focus();
			$('div.login_tooltip').fadeIn('fast').delay(2000).fadeOut('slow');
		});
	});
	
	$('#citationInput').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		
		if ($(this).attr('value') == textInputSource)
			$(this).attr('value','');
	});
	
	
	$('a#edit_map_button').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();	

		var height_mamufas = $(document).height();
		var width_mamufas = $(document).width();
		$('div#mamufas').css('height',height_mamufas+'px');
		$('div#mamufas').css('width',width_mamufas+'px');
		var map_position = $('div.pa_map').offset();
		if (map_position == null ){
                  map_position = $('div.admin_pa_map').offset();
                }
		var zooms_position = $('a#zoom_in').offset();
		var map_type_position = $('a#satellite').position();
		$('div#mamufas').fadeIn('fast',function(ev){
			 $.scrollTo('div.content',300, function(ev){
				$('div.geometry_container').css('left','0');
				$('div.geometry_container').css('top',(map_position.top)+'px');				
				$('div.geometry_container').fadeIn('fast');
				$('a#zoom_in_geometry').fadeIn();
				$('a#zoom_out_geometry').fadeIn();
				$('a#terrain_geometry').fadeIn();
				$('a#satellite_geometry').fadeIn();
				$('a#terrain_geometry').addClass('selected');
				$('a#edit_polygon').addClass('selected');
				$('a#remove_polygon').removeClass('selected');
				$('a#draw_polygon').removeClass('selected');
				$('a#remove_vertex').removeClass('selected');	
				init();
			 });
		});		    
	});
	
	$('a#cancel_editing').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		
		if (map_changed == 1) {
			$('div.tools_container div.exit_without_save').show();
		}
		else {			
			$('div#mamufas').fadeOut();				
			$('div.geometry_container').fadeOut();
		} 
		
		// $('div#mamufas').fadeOut();				
		// $('div.geometry_container').fadeOut();
	});
	
	$('a#ok_exit_edit_map').click(function(ev) {
		$('div.tools_container div.exit_without_save').fadeOut();
		$('div#mamufas').fadeOut();				
		$('div.geometry_container').fadeOut();
	});
	

	$('a#cancel_exit_edit_map').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
	
		$('div.tools_container div.exit_without_save').fadeOut();
		
	});
	
	$('a#cancel_window_edit').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		hideLoader();
		$('div#mamufas').fadeOut();				
		$('div.geometry_container').fadeOut();
	});	
	
	
	$('a#zoom_in_geometry').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		edit_map.setZoom(edit_map.getZoom()+1);
	});

	$('a#zoom_out_geometry').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		edit_map.setZoom(edit_map.getZoom()-1);
	});
	
	$('a#terrain_geometry').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		if (!$(this).hasClass('selected')) {
			$('a#satellite_geometry').removeClass('selected');
			$('a#terrain_geometry').addClass('selected');
			edit_map.setMapType(G_PHYSICAL_MAP);
		}
	});
	
	$('a#satellite_geometry').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		if (!$(this).hasClass('selected')) {
			$('a#terrain_geometry').removeClass('selected');
			$('a#satellite_geometry').addClass('selected');
			edit_map.setMapType(G_SATELLITE_MAP);
		}
	});
	
	$('a#edit_polygon').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		if (!$(this).hasClass('selected')) {
			$('a#remove_polygon').removeClass('selected');
			$('a#draw_polygon').removeClass('selected');
			$('a#remove_vertex').removeClass('selected');
			$('a#edit_polygon').addClass('selected');
			enterEditMode();
		}
	});
	
	$('a#remove_vertex').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		if (!$(this).hasClass('selected')) {
			$('a#remove_polygon').removeClass('selected');
			$('a#draw_polygon').removeClass('selected');
			$('a#remove_vertex').addClass('selected');
			$('a#edit_polygon').removeClass('selected');
			enterVertexDel();
		}
	});
	
	$('a#draw_polygon').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		if (!$(this).hasClass('selected')) {
			$('a#remove_polygon').removeClass('selected');
			$('a#draw_polygon').addClass('selected');
			$('a#remove_vertex').removeClass('selected');
			$('a#edit_polygon').removeClass('selected');
			enterPolygonAdd();
		}
	});
	
	$('a#remove_polygon').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		if (!$(this).hasClass('selected') && !$(this).hasClass('disabled')) {
			$('a#remove_polygon').addClass('selected');
			$('a#draw_polygon').removeClass('selected');
			$('a#remove_vertex').removeClass('selected');
			$('a#edit_polygon').removeClass('selected');
			enterPolygonDel();
		}
	});
	
	$('a#undo_editing').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
        undo();
	});	
	
	$('a#done_geometry').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		showLoader();
		onDoneClick();
	});
	
	$('a#skip_edit_window').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		$('#citationInput').attr('value',textInputSource);
		showLoader();
	});
	
	$('div#errors_geo_tool a').click(function(ev){
		ev.stopPropagation();
		ev.preventDefault();
		hideLoader();
	});

});	

function getColor(named) {
    return "#fe6905#";
}

function enterVertexDel() {

    clearListeners();
    deleteMarkers=new Object();
    _.each(activePolygons,function(pol) {      
        
		var vertexIcon = new GIcon(false,'/images/sites/delete_vertex_noover.png'); 
		vertexIcon.iconSize = new GSize(12, 12);
		vertexIcon.iconAnchor = new GPoint(6,6);        
        
        
        //add the markers of the vertexes
        var vertCount = pol.getVertexCount();
        for (var i = 0; i < vertCount; i++) {
            var ma = new GMarker(pol.getVertex(i),{icon:vertexIcon});
            deleteMarkers[pol.getVertex(i).toUrlValue()]=ma;
			listeners.push(GEvent.addListener(ma, "mouseover", function() {
				this.setImage('/images/sites/delete_vertex.png');
			}));

			listeners.push(GEvent.addListener(ma, "mouseout", function() {
				this.setImage('/images/sites/delete_vertex_noover.png');
			}));
			
			listeners.push(GEvent.addListener(ma,"click",function() {
                var vertCount = pol.getVertexCount();
                for (var i = 0; i < vertCount; i++) {
                 if ( this.getLatLng().equals(pol.getVertex(i)) ){
                   pol.deleteVertex(i);
                   edit_map.removeOverlay(deleteMarkers[this.getLatLng().toUrlValue()]);
                   break;
                 }
                }			    
			}));
			
			edit_map.addOverlay(ma);
			vertexDelMarkers.push(ma);
        }

    });
}

function enterPolygonDel() {
	
    clearListeners();
    if(activePolygons.length>1) {
        _.each(activePolygons,function(pol) {
            listeners.push(GEvent.addListener(pol, "click", function() {
								
								if (activePolygons.length>1) {
	                map_changed = 1;
									pol.toberemoved=true;
	                activePolygons = _.reject(activePolygons,function(poly) {return poly.toberemoved==true});
	                edit_map.removeOverlay(pol);                
								}

            }));     

            listeners.push(GEvent.addListener(pol, "mouseover", function() {
    			pol.setStrokeStyle({color:"#00FF33"});
    			pol.setFillStyle({color:"#00FF33"});
            }));      
            listeners.push(GEvent.addListener(pol, "mouseout", function() {
    			pol.setStrokeStyle({color:getColor(false)});
    			pol.setFillStyle({color:getColor(false)});
            }));        


        });        
    }   
}

function enterPolygonAdd() {
  clearListeners();
  var poly = new GPolygon([], getColor(false), 2, 0.7, getColor(false), 0.2);
  edit_map.addOverlay(poly);
  poly.enableDrawing();
  poly.enableEditing();

  GEvent.addListener(poly, "endline", function() {
		if (activePolygons.lenghth>1) {
			$('a#remove_polygon').removeClass('disabled');
		}
		GEvent.bind(poly, "lineupdated", null, function(){
			if (activePolygons.lenghth>1) {
				$('a#remove_polygon').removeClass('disabled');
			}
			map_changed = 1;
		});
    activePolygons.push(poly);
    enterEditMode();
		$('a#draw_polygon').removeClass('selected');
		$('a#edit_polygon').addClass('selected');
  });
  
}


/*
function undo() {
	clearListeners();
	_.each(activePolygons,function(pol) {
		edit_map.removeOverlay(pol);
	});
	activePolygons=jQuery.extend(true, {}, previousActivePolygons);
	copyActivePolygons=jQuery.extend(true, {}, previousActivePolygons);
	_.each(activePolygons,function(pol) {
		edit_map.addOverlay(pol);
	});	
}
*/

function enterEditMode() {
	
    clearListeners();
		if (activePolygons.lenghth>1) {
			$('a#remove_polygon').removeClass('disabled');
		}
    _.each(activePolygons,function(pol) {
        pol.enableEditing();
        listeners.push(GEvent.addListener(pol, "lineupdated", function() {
					map_changed = 1;
        }));
    });
}

function clearListeners() {

	if (activePolygons.length>1) {
		$('a#remove_polygon').removeClass('disabled');
	} else {
		$('a#remove_polygon').addClass('disabled');
	}
	
    _.each(listeners,function(eventListener) {
        GEvent.removeListener(eventListener);       
    });
    listeners=[];
	_.each(activePolygons,function(pol) {
		pol.disableEditing();
	});
	_.each(vertexDelMarkers,function(ma) {
		edit_map.removeOverlay(ma);
		vertexDelMarkers=[];
	});			 
}

function init() {
    if(activePolygons!=null) {
        edit_map.clearOverlays();
    }
    if($("a#is_pa_editable").text()=="true") {
        showLoader();
        var url = "/sites/"+siteId+"/protected_areas/geom";
        $.ajax({
          url: url,
          type:"GET",
          dataType: 'jsonp',
          success: function(data) {
              loadedGeoJson=data.the_geom;
              initialize_geometry();
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
              alert('Sorry there has been an error while contacting the server, please refresh page.');
          }
        });        
    } else {
        displayNonEditableWindow();
    }          

}

function displayNonEditableWindow() {
    //Do something
}

function initialize_geometry() {
  if (GBrowserIsCompatible()) {   
    if(activePolygons==null) {
        edit_map = new GMap2(document.getElementById("geometry_map"));
    }
	edit_map.setCenter(pa_center,pa_zoom);
	edit_map.checkResize();
   
    parsedBounds = new GLatLngBounds();
    activePolygons = geoJson2Polys(loadedGeoJson,parsedBounds);
    //Copy the object for undo
    //copyActivePolygons = jQuery.extend(true, {}, activePolygons);
    var z = edit_map.getBoundsZoomLevel(parsedBounds);
    edit_map.setCenter(parsedBounds.getCenter(),edit_map.getBoundsZoomLevel(parsedBounds));
    
    //save the original Bounds for later
    origPaBBox=parsedBounds;

    //Add the polygons to the map
    _.each(activePolygons,function(pol) {
        edit_map.addOverlay(pol);    
    });

    //Default to edit mode
    enterEditMode();
		hideLoader();
  }
}

function geoJson2Polys(areajson, bounds){
  var coords = areajson.coordinates;
  var polygons = _(coords).reduce([], function(memo_n, n) {
    var polygonpaths = _(n).reduce([], function(memo_o, o) {
      var polygoncords = _(o).reduce([], function(memo_p, p) {
        var mylatlng = new GLatLng(p[1], p[0]);
        if(bounds){
          bounds.extend(mylatlng);
        }
        memo_p.push(mylatlng);
        return memo_p;
      });
      memo_o.push(polygoncords);
      return memo_o;
    });
    var _polygon = new GPolygon(polygonpaths[0],getColor(false),2,0.7,getColor(false),0.2);
    memo_n.push(_polygon);
    return memo_n;
  });
  return polygons;
}

function polys2geoJson(polygons) {
    var geojson={"type":"MultiPolygon"};
    var polys = [];
    _.each(polygons,function(pol) {
        var poly =[];
        //fake the paths, we dont support yet inner rings
        var path=[];
        var numPoints = pol.getVertexCount();
        for(var i=0; i < numPoints; i++) {
            var lat = pol.getVertex(i).lat();
            var lng = pol.getVertex(i).lng();
            path.push([lng,lat]);
        }
        poly.push(path);
        polys.push(poly);
    });
    geojson['coordinates'] = polys;
    
    return $.toJSON(geojson);
}

function onDoneClick() {
		
    var url = "/sites/"+siteId+"/protected_areas/validate";
    $.ajax({
          url: url,
          type: "POST",
          data:{the_geom:polys2geoJson(activePolygons)},
      	  dataType: 'jsonp',
      	  success: function(data) {
		      if(data.errors.length>0) {
		              displayErrorsWindow(data.errors);
		          } else {
									map_changed = 0;
									refreshLayers();
		              displayCitationWindow();
		          }
		      },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
              alert('Sorry there has been an error while contacting the server, please refresh page.');
          }		      
    });    

}



function saveGeomChanges(has_citation) {
	
		showLoader();

    //calculate the new bounds.
    _.each(activePolygons,function(pol) {
        var pb = pol.getBounds();
        origPaBBox.extend(pb.getSouthWest());
        origPaBBox.extend(pb.getNorthEast());
    });
    var bbox = origPaBBox.getSouthWest().lng() + "," + origPaBBox.getSouthWest().lat() 
        + "," + origPaBBox.getNorthEast().lng() + "," + origPaBBox.getNorthEast().lat();

    var url = "/sites/"+siteId+"/protected_areas/update";
    json_data = {
              bbox_to_invalid: bbox,
              the_geom:polys2geoJson(activePolygons)
    };
    if (has_citation){
        json_data['citation'] = $('#citationInput').attr('value')
    }
    $.ajax({
          url: url + ".json",
          type: "POST",
          data: json_data,
      		dataType: 'jsonp',
      		success: function(data) {
          if(data.errors.length>0) {
              displayErrorsWindow(data.errors);
          } else {
              closeEditingToolWindow();
              $("div.geometry_container").fadeOut(function() {
                  $("div#mamufas").fadeOut();
              });
             //forse a reload of the PA tiles. 
			refreshLayers();
          }
          
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert('Sorry there has been an error while contacting the server, please refresh page.');
      }      
    });
}

function showLoader() {
	$('div.loader img').show();
	$('div#errors_geo_tool').hide();
	$('div#not_editable_geo').hide();
	$('div#editing_modal_window').hide();
	$('div.loader').fadeIn();
}

function displayCitationWindow() {
	$('div.loader img').hide();
	$('div#errors_geo_tool').hide();
	$('div#not_editable_geo').hide();
	var loader_position = $('div.loader').offset();
	var wscr = $(window).width();

  var mleft = ( wscr - 510 ) / 2;
	$('div#editing_modal_window').css('left',(mleft)+'px');
	$('div#editing_modal_window').css('top',(loader_position.top)+ 70 +'px');
	$('div#editing_modal_window').show();
	$('div.loader').fadeIn();
}

function displayErrorsWindow(errors) {
	
	$('div#errors_geo_tool ul').html('');
	for (var i=0; i<errors.length;i++) {
		var li_html = '<li>';
		li_html += errors[0];
		li_html += '</li>';
		$('div#errors_geo_tool ul').append(li_html);
	}	
	
	$('div.loader img').hide();
	$('div#not_editable_geo').hide();
	$('div#editing_modal_window').hide();
	var loader_position = $('div.loader').offset();
	var wscr = $(window).width();

  var mleft = ( wscr - 470 ) / 2;
	$('div#errors_geo_tool').css('left',(mleft)+'px');
	$('div#errors_geo_tool').css('top',(loader_position.top)+ 100 +'px');
	$('div#errors_geo_tool').show();
	$('div.loader').fadeIn();
}

function displayNonEditableWindow() {
	$('div.loader img').hide();
	$('div#errors_geo_tool').hide();
	$('div#editing_modal_window').hide();
	var loader_position = $('div.loader').offset();
	var wscr = $(window).width();

  var mleft = ( wscr - 510 ) / 2;
	$('div#not_editable_geo').css('left',(mleft)+'px');
	$('div#not_editable_geo').css('top',(loader_position.top)+ 70 +'px');
	$('div#not_editable_geo').show();
	$('div.loader').fadeIn();
}

function hideLoader() {
	$('div.loader').fadeOut();
	$('div#errors_geo_tool').hide();
	$('div#not_editable_geo').hide();
	$('div#editing_modal_window').hide();
}

function closeEditingToolWindow() {
	$('div.loader img').show();
	$('div#errors_geo_tool').hide();
	$('div#not_editable_geo').hide();
	$('div#editing_modal_window').hide();
	$('div.loader').hide();
}
