var map;


$(document).ready(function(ev) {

	var height_content = $('div#upper_area div.content').height();
	$('a#zoom_in').css('top',height_content + 15 + 'px');
	$('a#zoom_out').css('top',height_content + 15 + 'px');
	$('a#terrain').css('top',height_content + 15 + 'px');
	$('a#satellite').css('top',height_content + 15 + 'px');
	$('a#hide_markers').css('top',height_content + 15 + 'px');
	
	$('a#zoom_in').fadeIn();
	$('a#zoom_out').fadeIn();
	$('a#terrain').fadeIn();
	$('a#satellite').fadeIn();
	
	$('div#percent_protected').fadeIn();
	$('div#pas_within').fadeIn();
	
	$('a#zoom_in').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		map.setZoom(map.getZoom()+1);
	});

	$('a#zoom_out').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		map.setZoom(map.getZoom()-1);
	});

	$('a#satellite').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		if (!$(this).hasClass('selected')) {
			$('a#terrain').removeClass('selected');
			$('a#satellite').addClass('selected');
			map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
			
		}
	});
	
	$('a#terrain').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		if (!$(this).hasClass('selected')) {
			$('a#satellite').removeClass('selected');
			$('a#terrain').addClass('selected');
			map.setMapTypeId(google.maps.MapTypeId.TERRAIN);		
		}
	});
	
	$('a#terrain').addClass('selected');
	
	var myOptions = {
      zoom: 3,
      center: new google.maps.LatLng(0,0),
      disableDefaultUI: true,
  	  scrollwheel:false,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    }
  map = new google.maps.Map(document.getElementById("js_map"), myOptions);



	
	
	/*	JAVASCRIPT - COUNTRY PAGE  */
	
	$('div#right_container_countries div.gallery ul li div.pic_area').live('mouseenter',
        function () {
            $(this).css('z-index','9999');
            $(this).parent().find('div.hidden').show();
        }
    );

    $('div#right_container_countries div.gallery ul li div.pic_area').live('mouseleave',
        function () {
            $(this).css('z-index','1');
            $(this).parent().find('div.hidden').hide();
        }
    );

	
	var bkg_position;    
	
	/* TOOLTIP */
	$('div#right_container_countries div.designation_splits a').hover(function(ev){
		ev.stopPropagation();
		ev.preventDefault();
		
		bkg_position = $(this).children('span').css('background-position');
		$(this).css('background-position','0 -26px');
		$(this).children('span').css('background-position','0 -26px');
	},function(){
		$(this).css('background-position','0 0');
		$(this).children('span').css('background-position',bkg_position);
	});
	
	$('div.protection_endangered a.type').hover(function(ev){
		$(this).children('div.tooltip').show();
	},function(){
		$(this).children('div.tooltip').hide();
	});

	
	$('div#left_container_countries div.content_area div.activity_pa h3 a.period').click(
		
	);
	
	
});
