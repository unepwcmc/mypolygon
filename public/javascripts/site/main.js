

/* VARIABLES */
	var editRecordsList;
	var editRecordsListCompressed;
/* */

$(document).ready(function() {
	
	$('.myselectbox').selectbox();

	//admin
	$('.abs_link').hoverIntent(function(ev){
		var more_box = $(this).siblings(".abs_text");
		position = $(this).offset();
		height = $(this).height();
		more_box.css("top", position.top+height);
		more_box.css("left", position.left);		
		more_box.fadeIn("fast");
		
	},function(){
		 $(this).siblings(".abs_text").delay(1000).fadeOut("normal");		
	});

	$(".abs_text").mouseleave(function(){
			$(this).delay(1000).fadeOut("normal");
	 });

	$(".abs_text").mouseover(function(){
		$(this).clearQueue();
	});
	
	//hide disabled pagination buttons
	$("div.pagination span.disabled").hide();
	
	
	$("#slider").easySlider({
		auto: false, 
		continuous: true,
		numeric: true,
		speed: 		500,
		numericId: 		'controls'
	});

	$("#slider2").easySlider({
		auto: false, 
		continuous: true,
		numeric: true,
		speed: 		500,
		numericId: 		'controls_img_site'
	});
	
	if ($("div.pa_images").length>0) {
			var link_flickr = $('a.flickr_button');
			$('a.flickr_button').remove();
			$('ol#controls_img_site').append(link_flickr);		
	}
	

	
	/* NEED OPERATIONS FOR PA RECORDS ALIGNMENT */
	
	editRecordsList = $('div#right_container div.protected_area ul').height();
	
	$('div#right_container div.protected_area ul li .last').hide();
	editRecordsListCompressed = $('div#right_container div.protected_area ul').height();
	$('div#right_container div.protected_area ul').height(editRecordsListCompressed);
	var wikipediaHeight = $('div#left_container div.content_area div.wikipedia').height();
	var containerHeight = $('div#right_container div.protected_area').height();
	var imagesContainer = $('div.pa_images').height();
	
	if (wikipediaHeight>200) {
		var containerHeight = $('div#right_container div.protected_area').height();
		var linkToWikipedia = $('div.content_area div.bottomWikipedia p a').attr('href');
		if (imagesContainer != null) {
			$('div#left_container div.content_area div.wikipedia').height(containerHeight-221);
			var wikipediaContent = $('div#left_container div.content_area div.wikipedia').html().substring(0,1200);
			$('div#left_container div.content_area div.wikipedia').html(wikipediaContent + '...' + ' <a href="'+ linkToWikipedia +'" target="_blank">read more</a>');
		} else {
			$('div#left_container div.content_area div.wikipedia').height(containerHeight-45);
			if (imagesContainer != null) {
				$('div#left_container div.content_area div.wikipedia').css('margin-top','0');
			}
			var wikipediaContent = $('div#left_container div.content_area div.wikipedia').html().substring(0,1550);
			$('div#left_container div.content_area div.wikipedia').html(wikipediaContent + '...' + ' <a href="'+ linkToWikipedia +'" target="_blank">read more</a>');
		}
	}

	
	/* VIEW MORE EDIT PA CONTAINER */
	$("#view_more").click(
	   function (ev) {
				var sizeContainer = $('div#right_container div.protected_area').height();
	      if (sizeContainer<editRecordsList) {
					$('div#right_container div.protected_area ul li .last').show();
					$('div#right_container div.protected_area ul').animate({ height: editRecordsList},500);
					$('#view_more').css('background-position','40px -18px');
					$('#view_more').css('padding-left','50px');
					$('#view_more').text('close');
				} else {
					$('div#right_container div.protected_area ul').animate({ height: editRecordsListCompressed},500, function() {
					    $('div#right_container div.protected_area ul li .last').hide();
					  }
					);
					$('#view_more').css('background-position','24px 4px');
					$('#view_more').css('padding-left','36px');
					$('#view_more').text('view more');
				}
	     }
	   );
	

	
	// PA SITE JAVASCRIPT --------------------------------------------------
	
	/* PA IMAGES RANKING */	
	$('div#left_container div.content_area div.pa_images div').hover(function(){
		$(this).children('span.classified_container').stop(true).fadeTo("fast",1);
	},
	function(){
		$(this).children('span.classified_container').stop(true).fadeTo("normal",0);
	});
	
	
	$('span.classified_container span a').click( function (ev) {
		ev.preventDefault();
		if (!$(this).hasClass('voted') && !$(this).hasClass('discard')) {
			var image_id = $(this).parent().parent().attr('id');
			if (image_id == 'ban') {
				var position = $('a#loginLink').offset();
				$("div#signUp").css("left",position.left - 185+"px");
				$("div#signUp").css("top",position.top - 14+"px");
				$('div#signUp').fadeIn('fast');
				$.scrollTo('div#header',500, function() {
					$('#username_field_home').focus();
					$('div.login_tooltip').fadeIn('fast').delay(2000).fadeOut('slow');
				});
			} else {
				var get_class = $(this).attr('class');
				var obj = $(this).parent().parent().get(0);
				var pa_id = $('div.wikipedia').attr('id');
		
				var images_ids = [];
				$("span.classified_container").each(function(ev){ 
					images_ids.push($(this).attr('id')); 
				});
		
				var url_request = '/sites/' + pa_id + '/images/' + image_id + '/' + get_class;
		
				var text = $(this).text();
				
				if (get_class == 'vote_up') {
					$(this).addClass('voted');
					var temp = text.substring(7,text.length-2);
					var count = parseInt(temp) + 1;
					$(this).text('good ('+ count + ')');
					$(this).parent().children('a.vote_down').addClass('discard');
				} else {
					$(this).addClass('voted');
					var temp = text.substring(6,text.length-2);
					var count = parseInt(temp) + 1;
					$(this).text('bad ('+ count + ')');
					$(this).parent().children('a.vote_up').addClass('discard');
				}

				var url_request = '/sites/' + pa_id + '/images/' + image_id + '/' + get_class;

				$.ajax({
				  url: url_request,
					type: 'POST',
					dataType: 'json',
				  data: {param: get_class},
				  success: function(data) {}
				});
			}
		}


	});
	
	function check_pa_images (data,image_id,image_ids) {
		var object = new Object();
		$.each(data, function(key, value) { 
		  alert(key + ': ' + value.id); 
		});
	}
	


	
	/*WIKIPEDIA VOTE*/
	$('#bad_wiki_link').click(function(e){
		e.stopPropagation();
		e.preventDefault();
		$.post($(this).attr('href'), function(data) {
			$('span#learn_more').html('Infomation take from Wikipedia. You voted <strong style="color:#ff104b">down</strong> this article');
			$.modal.close();
		});		
		return(false);
	});
	

	$('#mark_wrong').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		show_modal(510, 330, '#wikipedia_url_description','url(../images/common/modal_wikipedia_bkg.png)');
	});
	
	$('#new_wiki_link').click(function(ev){
		ev.stopPropagation();
		ev.preventDefault();
		show_modal(510, 330, '#wikipedia_url_description','');
	});
	
	$('#flickr_button').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		show_modal(510, 381, '#flickr_window','url(../images/sites/flickr_bkg.png)');
	});
	
	// TO SHOW THE MODAL WINDOW IF THE GEOMETRY CAN BE EDITED
	$('a#edit_map_button_no_edit').click(function(ev) {
		console.log('entra');
		ev.stopPropagation();
		ev.preventDefault();
		show_modal(510, 280, '#not_editable_geo','url(../images/sites/non_editable_bkg.png)');
	});
	

	$('.ban_download').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		var position = $('a#loginLink').offset();
		$("div#signUp").css("left",position.left - 185+"px");
		$("div#signUp").css("top",position.top - 14+"px");
		$('div#signUp').fadeIn('fast');
		$.scrollTo('div#header',500, function() {
			$('#username_field_home').focus();
			$('div.login_tooltip').fadeIn('fast').delay(2000).fadeOut('slow');
		});
	});
	
	$('#ban_flickr').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		var position = $('a#loginLink').offset();
		$("div#signUp").css("left",position.left - 185+"px");
		$("div#signUp").css("top",position.top - 14+"px");
		$('div#signUp').fadeIn('fast');
		$.scrollTo('div#header',500, function() {
			$('#username_field_home').focus();
			$('div.login_tooltip').fadeIn('fast').delay(2000).fadeOut('slow');
		});
	});
	
	$('#wikipedia_submit_images').click(function(e) {
		show_modal(510, 381, '#flickr_window','url(../images/sites/flickr_bkg.png)');
	});
	
	$('#ban_wikipedia_submit_images').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		var position = $('a#loginLink').offset();
		$("div#signUp").css("left",position.left - 185+"px");
		$("div#signUp").css("top",position.top - 14+"px");
		$('div#signUp').fadeIn('fast');
		$.scrollTo('div#header',500, function() {
			$('#username_field_home').focus();
			$('div.login_tooltip').fadeIn('fast').delay(2000).fadeOut('slow');
		});
	});
	
	//Click event for interestBox
	$('div.interestBox div.bottomData').click(function(ev){
		ev.stopPropagation();
		ev.preventDefault();
		var url = $(this).children("a").attr('href');
		window.open(url);
	});

	$('div.relatedBox div.bottomData').click(function(ev){
		ev.stopPropagation();
		ev.preventDefault();
		var url = $(this).children("a").attr('href');
		location.href = url;
	});

	
	/* EFFECTS FOR EDIT PA CONTAINER*/
	$("div#right_container div.view_more").hover(
     function (ev) {
       $('div#right_container div.protected_area').css('border-color','#254C72');
     }, 
     function (ev) {
       $('div#right_container div.protected_area').css('border-color','#cccccc');
     }
   );

	/* SHOW THE CONFLICT BOX*/
	$("li .conflict").hover(			
    function (ev) {
    	$(this).children('div.message').fadeIn();
    }, 
    function (ev) {
			$(this).children('div.message').fadeOut();	
    });


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
		
		
	$('a.classified_button').hover(function(ev){
		$(this).children("span").show();
	},function(){
		$(this).children("span").fadeOut("normal");		
	});



	

	/*tipsy tips*/
	$('a.tipsy').tipsy({fade: true, gravity: 's'});
	$('a.tipsy_conflict').tipsy({fade: true, gravity: 's'});
	$('img.tipwhee').tipsy({fade: false, gravity: 'e'});
	$('a.what_is_this').tipsy({fade: true, gravity: 's'});
	
	
	/* edit PA carousel form */
	$('#mycarousel').jcarousel({
         		initCallback: mycarousel_initCallback,
         		buttonNextHTML: null,
         		buttonPrevHTML: null,
						size:3,
						scroll:1,
						start:1,
						vertical:true
	});
	

	
	//toggle the modal window login box from login to
	//forgot password form
	$('a#login_form_switch').click(function(){
		$('#login_form').toggle();
		$('#password_forget').toggle();
	});

	//show tooltips in edit box
	$('#edit_data_container div.data_edit div span a').hover(
		function () {
			$(this).children('div.tooltip').show();
		}, 
		function () {
		  $(this).children('div.tooltip').hide();
		}
	);	
	
	//show login box
	$('#open_login_container').click( function(ev) {
		ev.preventDefault();
		ev.stopPropagation();
		var position = $('a#loginLink').offset();
		$("div#signUp").css("left",position.left - 185+"px");
		$("div#signUp").css("top",position.top - 14+"px");		
		$('div#signUp').fadeIn('fast');
		$.scrollTo('div#header',500, function() {
			$('#username_field_home').focus();
			$('div.login_tooltip').fadeIn('fast').delay(2000).fadeOut('slow');
		});
	});
	
		
	//show edit box	
	$('#open_edit_container').click( function(ev) {
			ev.preventDefault();
			var height_mamufas = $(document).height();
			var width_mamufas = $(document).width();
			$('div#mamufas').css('height',height_mamufas+'px');
			$('div#mamufas').css('width',width_mamufas+'px');
			var position = $('div#right_container').position();
			$('div#mamufas').fadeIn('fast',function(ev){
				 $.scrollTo('div#right_container',300, function(ev){
					$('#edit_data_container').css('left',position.left-10+'px');
					$('#edit_data_container').css('top',(position.top+20)+'px');
					$('#edit_data_container').fadeIn('fast');
				 });
			});
			
	});
	

	
	//hide edit box
	$('#edit_close').click( function(ev) {
		ev.preventDefault();
		// 		$('#edit_data_container').fadeIn();
		// 		$('#mamufas').fadeIn();
	});	
	
	$('#cancel_close').click( function(ev) {
		ev.preventDefault();
		$('#edit_data_container').fadeOut();
		$('#mamufas').fadeOut();
	});
	
	$('#cancel_window_edit').click( function(ev) {
		ev.preventDefault();
		$.modal.close();
		$('#not_editable_geo').fadeOut();
		$('#mamufas').fadeOut();
	});
	
	
		
	//share it dropdown	
	$('div#left_container div.latest_from li div.opinion a').click(function(ev){
		if ($(this).parent().parent().find('div.visible').is (':visible')) {
			$(this).parent().parent().find('div.visible').hide();
			$(this).hover(function(){
				$(this).children('span.dif').css('background','url(/images/common/download_right.gif) no-repeat right -27px');
				$(this).children('span.dif').css('color','#333333');
			}, function() {
				$(this).children('span.dif').css('background','url(/images/common/download_right.gif) no-repeat right 0');
				$(this).children('span.dif').css('color','#666666');
			})
			ev.preventDefault();
		} else {
			$(this).parent().parent().find('div.visible').show();
			$(this).hover(function(){
				$(this).children('span.dif').css('background','url(/images/common/download_right.gif) no-repeat right -27px');
				$(this).children('span.dif').css('color','#333333');
			}, function() {
				$(this).children('span.dif').css('background','url(/images/common/download_right.gif) no-repeat right -27px');
				$(this).children('span.dif').css('color','#333333');
			})
			ev.preventDefault();
		}
	});	

});

