
	$(document).ready(function() {


		$('.more_facet_link').hoverIntent(function(ev){
			var more_box = $(this).siblings(".more_facet_list");
			more_box.fadeIn("fast");
		},function(){
			 $(this).siblings(".more_facet_list").delay(1000).fadeOut("normal");		
		});

		$(".more_facet_list").mouseleave(function(){
				$(this).delay(1000).fadeOut("normal");
		 });

		$(".more_facet_list").mouseover(function(){
			$(this).clearQueue();
		});


		var map_data = $('#search_map_data').text().replace('\\','');
		initialize(jQuery.parseJSON(map_data));

		if ($.browser.msie && $.browser.version.substr(0,3)=="7.0"){
			var zIndexNumber = 1000;  

			$('ul').each(function() {  
		         $(this).css('zIndex', zIndexNumber);  
		         zIndexNumber -= 10;  
		     });
			$('li').each(function() {  
		         $(this).css('zIndex', zIndexNumber);  
		         zIndexNumber -= 10;  
		     });
			$('a').each(function() {  
		         $(this).css('zIndex', zIndexNumber);  
		         zIndexNumber -= 10;  
		     });		
		}


		if ($('div.search_Container span.search_input input').val()!="Search for Protected Areas, Points of interest, Countries, etc..") {
				$('div.search_Container span.search_input input').css('color','#666666');
		}

		$('div.search_Container span.search_input input').click(function(){
				if ($('div.search_Container span.search_input input').val()=="Search for Protected Areas, Points of interest, Countries, etc..") {
					$('div.search_Container span.search_input input').val('');
					$('div.search_Container span.search_input input').css('color','#666666');
				}
		});


		if ($.cookies.get("search_view_map") == null){
			$.cookies.set("search_view_map", "true");
		}

		//set height of element on page depending on current height and search tab
		$('div.flash_container').height(getSearchHeight($.cookies.get("search_view_map")));
		setSearchButton($.cookies.get("search_view_map"));

		$('#button_map').click(function(){			
			new_state = (($.cookies.get("search_view_map") == "false") ? "true" : "false");
			setSearchButton(new_state);
			setSearchMap(new_state);
			$.cookies.set("search_view_map", new_state);
			return false;	
		});

		$('#zoom_in').click(function(){map.setZoom(map.getZoom()+1);});
		$('#zoom_out').click(function(){map.setZoom(map.getZoom()-1);});
	});
