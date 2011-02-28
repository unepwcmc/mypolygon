jQuery.ajaxSetup({ 
  'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
})

/* VARIABLES */
	var offset = 1;
	var closeEmail = true;
	var readyDocument = false;
	var editRecordsList;
	var editRecordsListCompressed;
/* */

$(document).ready(function() {
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
		numericId: 		'controls2'
	});
	
	if ($("div.pa_images").length>0) {
			var link_flickr = $('a.flickr_button');
			$('a.flickr_button').remove();
			$('ol#controls2').append(link_flickr);		
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
					$('#view_more').css('background','url(../images/icons/viewMoreArrows.png) no-repeat 39px -19px');
					$('#view_more').css('padding-left','50px');
					$('#view_more').html('close');
				} else {
					$('div#right_container div.protected_area ul').animate({ height: editRecordsListCompressed},500, function() {
					    $('div#right_container div.protected_area ul li .last').hide();
					  }
					);
					$('#view_more').css('background','url(../images/icons/viewMoreArrows.png) no-repeat 24px 4px');
					$('#view_more').css('padding-left','36px');
					$('#view_more').html('view more');
					
				}
	     }
	   );
	
	
	/* EFFECTS FOR ABOUT PAGE*/
	var configCraig = {    
	     sensitivity: 10,    
	     interval: 0, 
	     over: function(ev){
								$("#overCraig").show();
			 },
	     timeout: 0, 
	     out: function(ev){
								$("#overCraig").hide();	
			}
	};
	var configSimon = {    
	     sensitivity: 10,    
	     interval: 0, 
	     over: function(ev){
								$("#overSimon").show();
			 },
	     timeout: 0, 
	     out: function(ev){
								$("#overSimon").hide();	
			}
	};
	var configVizz= {    
	     sensitivity: 10,    
	     interval: 0, 
	     over: function(ev){
								$("#overVizz").show();
			 },
	     timeout: 0, 
	     out: function(ev){
								$("#overVizz").hide();	
			}
	};
	var configSoler = {    
	     sensitivity: 10,    
	     interval: 0, 
	     over: function(ev){
								$("#overSoler").show();
			 },
	     timeout: 0, 
	     out: function(ev){
								$("#overSoler").hide();	
			}
	};
	
	
	$('#craig').hoverIntent(configCraig);
	$('#simon').hoverIntent(configSimon);
	$('#vizz').hoverIntent(configVizz);
	$('#soler').hoverIntent(configSoler);
	
	
	/* ---  HEADER LOGIN EFFECTS --- */
	$('a#loginLink').click(function(ev){
		ev.stopPropagation();
		ev.preventDefault();
		$('div#signUp').fadeIn('fast');
		$('form#forgot_pass').hide();
		$('form.new_user_session').show();		
		$('#username_field_home').focus();
	});
	$('div#header div#signUp div.loginTop a').click(function(ev){
		ev.stopPropagation();
		ev.preventDefault();
		$('div#signUp').fadeOut('fast');
	});
	
	$('a#go_forget').click(function(ev){
		ev.stopPropagation();
		ev.preventDefault();
	
		$('form.new_user_session').hide();
		$('form#forgot_pass').show();
	});
	$('a#back_login').click(function(ev){
		ev.stopPropagation();
		ev.preventDefault();

		$('form#forgot_pass').hide();
		$('form.new_user_session').show();
	});
	
	
	$('#new_user_session').submitWithAjax();
	
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
	
	//USER IMAGE VOTING ON PROFILE PAGE
	$('#user_image_vote a.ko').live("click", function(e){
		e.stopPropagation();
		e.preventDefault();
		$.post($(this).attr('href'),{game: true}, function(data) {
			var img_src = $('#user_image_vote img').attr('src').replace('small','square');
			var pa_name = $('#pa_voted_name').html();
			var link = $('#user_image_vote .left a').clone();
			//APPEND INTO ACTIVITY
			if ($('#activity_list').children().size() >= 10) {
				var add_li = '<li style="display:none"><div class="image"><img src="'+ img_src +'" /><span class="bad"></span></div><div class="data"><p>You marked an <strong>Image</strong> as bad</p><p>for <a href="'+ link +'">'+ pa_name +'</a></p><p class="ago">less than a minute</p></div></li>';
				$('#activity_list').prepend(add_li);
				$('#activity_list li:first').fadeIn('slow');
				$('#activity_list li:last').fadeOut('slow',function(ev){
					$('#activity_list li:last').remove();
				});
			} else {
				if ($('div.empty_activity').length!=0) {
					$('div.empty_activity').fadeOut('fast', function(ev){
						var add_ul_li = '<ul id="activity_list"><li style="display:none"><div class="image"><img src="'+ img_src +'" /><span class="bad"></span></div><div class="data"><p>You marked an <strong>Image</strong> as bad</p><p>for <a href="'+ link +'">'+ pa_name +'</a></p><p class="ago">less than a minute</p></div></li></ul>';
						$('div.left_container div.user_menu').after(add_ul_li);
						$('#activity_list li:first').fadeIn('slow');
						$('div.empty_activity').remove();
					});
				} else {
					var add_li = '<li style="display:none"><div class="image"><img src="'+ img_src +'" /><span class="bad"></span></div><div class="data"><p>You marked an <strong>Image</strong> as bad</p><p>for <a href="'+ link +'">'+ pa_name +'</a></p><p class="ago">less than a minute</p></div></li>';
					var height_right_container = $('#right_container_user_photos').height();
					$('#right_container_user_photos').height(height_right_container + 95);
					$('#activity_list').prepend(add_li);
					$('#activity_list li:first').fadeIn('slow');
				}
			}
			$('#user_image_vote').html(data);
			$('#user_image_vote div.image div img').attr('style','display:none');
			$('#user_image_vote div.image div img').fadeIn(1000);
		});		
		return(false);
	}); 
	
	$('#user_image_vote a.ok').live("click", function(e){
		e.stopPropagation();
		e.preventDefault();
		$.post($(this).attr('href'),{game: true}, function(data) {
			var img_src = $('#user_image_vote img').attr('src').replace('small','square');			
			var link = $('#user_image_vote .left a').clone();
			var pa_name = $('#pa_voted_name').html();
			//APPEND INTO ACTIVITY
			if ($('#activity_list').children().size() >= 10) {
				var add_li = '<li style="display:none"><div class="image"><img src="'+ img_src +'" /><span class="good"></span></div><div class="data"><p>You marked an <strong>Image</strong> as good</p><p>for <a href="'+ link +'">'+ pa_name +'</a></p><p class="ago">less than a minute</p></div></li>';
				$('#activity_list').prepend(add_li);
				$('#activity_list li:first').fadeIn('slow');
				$('#activity_list li:last').fadeOut('slow',function(ev){
					$('#activity_list li:last').remove();
				});
			} else {
				if ($('div.empty_activity').length!=0) {
					$('div.empty_activity').fadeOut('fast', function(ev){
						var add_ul_li = '<ul id="activity_list"><li style="display:none"><div class="image"><img src="'+ img_src +'" /><span class="good"></span></div><div class="data"><p>You marked an <strong>Image</strong> as good</p><p>for <a href="'+ link +'">'+ pa_name +'</a></p><p class="ago">less than a minute</p></div></li></ul>';
						$('div.left_container div.user_menu').after(add_ul_li);
						$('#activity_list li:first').fadeIn('slow');
						$('div.empty_activity').remove();
					});
				} else {
					var add_li = '<li style="display:none"><div class="image"><img src="'+ img_src +'" /><span class="good"></span></div><div class="data"><p>You marked an <strong>Image</strong> as good</p><p>for <a href="'+ link +'">'+ pa_name +'</a></p><p class="ago">less than a minute</p></div></li>';
					var height_right_container = $('#right_container_user_photos').height();
					$('#right_container_user_photos').height(height_right_container + 95);
					$('#activity_list').prepend(add_li);
					$('#activity_list li:first').fadeIn('slow');
				}
			}
			//FILL IN NEW IMAGE
			$('#user_image_vote').html(data);
			$('#user_image_vote div.image div img').attr('style','display:none');
			$('#user_image_vote div.image div img').fadeIn(1000);
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

	$('.ban_download').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('div#signUp').fadeIn('fast');
		$.scrollTo('div#header',500, function() {
			$('#username_field_home').focus();
			$('div.login_tooltip').fadeIn('fast').delay(2000).fadeOut('slow');
		});
	});
	
	$('#ban_flickr').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
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
     	}
   	);


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

	//ADD POP UP BEHAVIOUR
	/*
	$("#more_designations").hoverIntent(function(ev){
		e = $(this).offset();
		h = $(this).height();
		$("#more_designations_container").css("top",e.top+h);
		$("#more_designations_container").css("left",e.left);
		$("#more_designations_container").fadeIn("fast");
	},function(){
		$("#more_designations_container").delay(2000).fadeOut("normal");		
	});
	
	$("#more_designations_container").mouseleave(function(){
			$(this).delay(1000).fadeOut("normal");
	 });
	
	$("#more_designations_container").mouseover(function(){
		$(this).clearQueue();
	});
	*/
	
	//JS SEARCH DROPDOWN
	$('#searchHeader').click(
		function (ev) {
			if ($(this).val()=='Search PAs, countries,...') {
				$(this).val('');
				$(this).css('font-style','normal');
				$(this).css('color','#666666');
				$(this).focus();
			}
		}
	);
		$('#searchHeader').autocomplete('/api/search_suggest',{
					dataType: 'json',
					parse: function(data){
                        var rowsPas = new Array();
						var rowsCountries = new Array();
                        pas = data["pas"]
						countries = data["countries"]
						
						var pas_to_show;

						// TO GIVE PRIORITY TO THE COUNTRIES (5 is the max)
						if (pas.length > countries.length) {
							if (countries.length < 5) pas_to_show = pas.length - countries.length;
							else pas_to_show = 0;
						}
                        for(var i=0; i<pas_to_show; i++){
                          rowsPas[i] = { data:pas[i], value:pas[i].english_name, result:pas[i].english_name };
                        }

                         for(var i=0; i<countries.length; i++){	
							countries[i].pas_length = pas.length;		
                            rowsCountries[i] = { data:countries[i], value:countries[i].name, result:countries[i].name}; 
                         }
						var allData = rowsPas.concat(rowsCountries);
                        return allData;
					}, 
					formatItem: function(row, i, n) {
						// PA
						if (row.iso == undefined) {

							var menu_string = '<div style="margin-top:1px;float:left;width:169px;font-size:11px;">' + row.english_name + '<br><span style="color:#aaa;font-size:9px;">' + row.designation + '</span></div><div style="float:left;margin-top:1px; width:10px;">';

							if (row.marine == true){
								menu_string = menu_string + '<img src="/images/icons/circle.gif">';
							}
							if (row.whs == true){
								menu_string = menu_string + '<img src="/images/icons/green_star.gif">';
							}
							menu_string = menu_string + '</div>';
						}
						// is a COUNTRY
						else {
							// In the future we have to change the example image to the default flag or 'images/countries/#{country.iso_3}.png'
							var menu_string = '<div style="margin-top:1px;float:left;width:169px;font-size:11px;">PAs in <b>' + row.name + '</b><br><span style="color:#aaa;font-size:9px;">' + row.pas + ' PAs in this country</span></div><div style="float:left;margin-top:1px; width:10px;">';
							menu_string = menu_string + '</div>';
						}
						return menu_string;
		      },
					resultsClass: "ac_results ac_results_small",
					loadingClass: "ac_loading_small",					
					width: 194,
					height: 50,
					minChars: 4,
					max: 5,
					selectFirst: false,
					multiple: false,
					scroll: false
				}).result(function(event,row){
					location.href = row.url;
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
	
	//style selects
	// $('.myselectbox').selectbox();
	$('.custom_dropbox').sSelect();
	$('.country_dropbox').sSelect({ddMaxHeight: '300px'});
	
	// REGISTER ERROR BUTTON
	
	//short country texts in magic combobox
	$('div.country select#user_country_id').change(function(ev){
		setTimeout('shortCountry()',25);
	});

	
	$('div.register_page li.error').each( function(index){
		$(this).append('<img src="../images/register/error_i.png"  style="position:absolute; right:10px; top:29px; width:14px; height:14px; z-index:1000"/>');
		$(this).append('<img id="vertex_error" src="../images/register/vertex_inlineError.png" style="position:absolute; right:10px; top:22px; width:15px; height:5px; z-index:1000; display:none;"/>');		
	});
	
	$('div.register_page li.error img').hover( function(ev){
		var error_width = $(this).parent().children('p.inline-errors').width();
		var error_height = $(this).parent().children('p.inline-errors').height();
		$(this).parent().children('p.inline-errors').css('right','-'+ parseInt(error_width/2 - 12)+'px');
		$(this).parent().children('p.inline-errors').css('top','-'+ parseInt(error_height-12)+'px');
		$(this).parent().children('img#vertex_error').stop(true).fadeTo('fast',1);
		$(this).parent().children('p.inline-errors').stop(true).fadeTo('fast',1);
		
	},function(ev) {
		$(this).parent().children('p.inline-errors').fadeOut("normal");
		$(this).parent().children('img#vertex_error').fadeOut("normal");
	});

	//generic to allow submition of forms by clicking on "a" links
	//NOTE: Link must be INSIDE the form
	$('a#form_submit, a.form_submit' ).click(function(){
		$(this).parents('form:first').submit();
		return false;
	});
	
	//toggle the modal window login box from login to
	//forgot password form
	$('a#login_form_switch').click(function(){
		$('#login_form').toggle();
		$('#password_forget').toggle();
	});
	
	/**
	* Displays a cute flash message and then fades it out.
	*/		
	setTimeout(function() {$("#flash").fadeOut("normal")}, 3000);
		
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
					$('#edit_data_container').css('left',position.left+'px');
					$('#edit_data_container').css('top',(position.top+20)+'px');
					$('#edit_data_container').fadeIn('fast');
				 });
			});
			
	});
	
	//show login box in activity create comment action
	$('a.create_comment').click( function(ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$('div#signUp').fadeIn('fast');
		$.scrollTo('div#header',500, function() {
			$('#username_field_home').focus();
			$('div.login_tooltip').fadeIn('fast').delay(2000).fadeOut('slow');
		});
	});	
	$('a.create_bottom_comment').click( function(ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$('div#signUp').fadeIn('fast');
		$.scrollTo('div#header',500, function() {
			$('#username_field_home').focus();
			$('div.login_tooltip').fadeIn('fast').delay(2000).fadeOut('slow');
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

	//cool hover
	$('div#right_container div.gallery ul li div.pic_area').live('mouseenter',
        function () {
            $(this).css('z-index','9999');
            $(this).parent().find('div.hidden').show();
        }
    );

    $('div#right_container div.gallery ul li div.pic_area').live('mouseleave',
        function () {
            $(this).css('z-index','1');
            $(this).parent().find('div.hidden').hide();
        }
    );



	
	var zIndexNumber = 1000;
	$('div.pic_area').each(function() {
		$(this).css('zIndex', zIndexNumber);
		zIndexNumber -= 10;
	});
	
	// USER MODAL WINDOW
	
	$('div#user_layout div.user_content div.header div.avatar').hover(function(ev){
		$(this).children('img.edit').show();
	}, function(ev) {
		$(this).children('img.edit').hide();
	});
	
	
	$('div#user_layout div.user_content div.header div.avatar').click(function(ev){
		ev.stopPropagation();
		ev.preventDefault();
		show_modal(510, 347, '#upload_user_image','url(../images/user/upload_bkg.png)');
	});
	
	$('div#user_layout li.error').each( function(){
		$(this).append('<img src="../images/register/error_i.png"/>');
	});
	
	$('div#user_layout li.error img').hover( function(ev){
			var error_width = $(this).parent().children('p.inline-errors').width();
			var error_height = $(this).parent().children('p.inline-errors').height();
			$(this).parent().children('p.inline-errors').css('right','-'+ parseInt(error_width/2 - 8)+'px');
			$(this).parent().children('p.inline-errors').css('top','-'+ parseInt(error_height-13)+'px');
			$(this).parent().children('p.inline-errors').stop(true).fadeTo('fast',1);
		},function(ev) {
			$(this).parent().children('p.inline-errors').fadeOut("normal");
	});
	
	$('input#input_none').change(
		function (ev) {
			$('#input_fake').html($(this).attr('value'));
		}
	);
	
	$('input#input_none').css('opacity','0');
	
	$('div#user_layout div.user_content div.data div.right_container').height($('div#user_layout div.user_content div.data div.left_container').height());
	
	var html_photo = $('div.pa_image').html();
	var html_graders = $('div.graders').html();
	
	$("#view_ranking").click(function(ev){
		ev.stopPropagation();
		ev.preventDefault();
		if ($(this).text()!='view ranking') {
			$(this).text('view ranking');
			$("div.pa_image").flip({
				direction: 'rl',
				color: 'white',
				content: '<div class="pa_image">'+html_photo+'</div>',
				speed: 300
			})
			return false;
		} else {
			$(this).text('grade photos');
			$("div.pa_image").flip({
				direction: 'lr',
				color: 'white',
				content: '<div class="graders">'+html_graders+'</div>',
				speed: 300
			})
			return false;
		}
	});
	
	var animating = false;
	$('#all_activity').click(function(ev){
		ev.stopPropagation();
		ev.preventDefault();
		if (!animating) {
			if (!$(this).hasClass('selected')) {
				animating = true;
				$('div.user_menu img').animate({
					left: '-=97'
				},800, function(){
					$('#downloads').removeClass('selected');
					$('#all_activity').addClass('selected');
					animating = false;
				});
				if ($('div.empty_activity').length!=0) {
					if ($('div.empty_download').length!=0) {
						$('div.empty_download').fadeOut(500,function(ev){
							$('div.empty_activity').fadeIn(500);
						});
					} else {
						$('#downloads_list').fadeOut(500,function(ev){
							$('div.empty_activity').fadeIn(500);
						});
					}
				} else {
					if ($('div.empty_download').length!=0) {
						$('div.empty_download').fadeOut(500,function(ev){
							$('#activity_list').fadeIn(500);
						});
					} else {
						$('#downloads_list').fadeOut(500,function(ev){
							$('#activity_list').fadeIn(500);
						});
					}
				}
			}
		}
	});
	
	$('#downloads').click(function(ev){
		ev.stopPropagation();
		ev.preventDefault();
		if (!animating) {
			if (!$(this).hasClass('selected')) {
				animating = true;
				$('div.user_menu img').animate({
					left: '+=97'
				},800, function(){
					$('#all_activity').removeClass('selected');
					$('#downloads').addClass('selected');
					animating = false;
				});
				if ($('div.empty_download').length!=0) {
					if ($('div.empty_activity').length!=0) {
						$('div.empty_activity').fadeOut(500,function(ev){
							$('div.empty_download').fadeIn(500);
						});
					} else {
						$('#activity_list').fadeOut(500,function(ev){
							$('div.empty_download').fadeIn(500);
						});
					}
				} else {
					if ($('div.empty_activity').length!=0) {
						$('div.empty_activity').fadeOut(500,function(ev){
							$('#downloads_list').fadeIn(500);
						});
					} else {
						$('#activity_list').fadeOut(500,function(ev){
							$('#downloads_list').fadeIn(500);
						});
					}
				}
			}
		}
	});
});

function toggleContent(divID,buttonImageId){
	var img=document.getElementById(buttonImageId);
  if($(buttonImageId).attr('src') != "/images/icons/drop_btn.gif") {
		$(buttonImageId).attr('src','/images/icons/drop_btn.gif');
		$(divID).slideDown("fast");
	} else {
		$(buttonImageId).attr('src','/images/icons/down_btn.gif');
	  $(divID).slideUp("fast");     
  }
}

function mycarousel_initCallback(carousel) {
    $('#mycarousel-next').bind('click', function() {
				if (offset<2) {
					carousel.next();
					offset++;
					$('span.paginator label').html('page ' + offset + ' of 2');
				}
        return false;
    });

    $('#mycarousel-prev').bind('click', function() {
				if (offset>1) {
					carousel.prev();
					offset--;
					$('span.paginator label').html('page ' + offset + ' of 2');
				}
        return false;
    });
};


function show_modal(width_modal, height_modal, element, bkg) {
	$(element).modal();

	var wscr = $(window).width();
  var hscr = $(window).height();

  var mleft = ( wscr - width_modal ) / 2;
  var mtop = ( hscr - height_modal ) / 2;

  $('#simplemodal-container').css("left", mleft+'px');
  $('#simplemodal-container').css("top", mtop+'px');
 	

	$('#simplemodal-container').css("width",width_modal + 'px');
	$('#simplemodal-container').css("height",height_modal + 'px');
	
	$('#simplemodal-container').css('background-image', bkg);
}


function goToSearch() {
	var searchString = $('#searchHeader').val();
	var url = '/search?q=' + searchString + '&commit=Search';
	if (searchString.length>0) {
			window.location = url;
	}
	
}


/*
Jquery and Rails powered default application.js
Easy Ajax replacement for remote_functions and ajax_form based on class name
All actions will reply to the .js format
Unostrusive, will only works if Javascript enabled, if not, respond to an HTML as a normal link
respond_to do |format|
  format.html
  format.js {render :layout => false}
end
*/
 
function _ajax_request(url, data, callback, type, method) {
    if (jQuery.isFunction(data)) {
        callback = data;
        data = {};
    }
    return jQuery.ajax({
        type: method,
        url: url,
        data: data,
        success: callback,
        dataType: type
        });
}
 
jQuery.extend({
    put: function(url, data, callback, type) {
        return _ajax_request(url, data, callback, type, 'PUT');
    },
    delete_: function(url, data, callback, type) {
        return _ajax_request(url, data, callback, type, 'DELETE');
    }
});
 
/*
Submit a form with Ajax
Use the class ajaxForm in your form declaration
<% form_for @comment,:html => {:class => "ajaxForm"} do |f| -%>
*/
jQuery.fn.submitWithAjax = function() {
  this.unbind('submit', false);
  this.submit(function() {
    $.post(this.action, $(this).serialize(), null, "script");
    return false;
  })
 
  return this;
};


/*
Retreive a page with get
Use the class get in your link declaration
<%= link_to 'My link', my_path(),:class => "get" %>
*/
jQuery.fn.getWithAjax = function() {
  this.unbind('click', false);
  this.click(function() {
    $.get($(this).attr("href"), $(this).serialize(), null, "script");
    return false;
  })
  return this;
};
 
/*
Post data via html
Use the class post in your link declaration
<%= link_to 'My link', my_new_path(),:class => "post" %>
*/
jQuery.fn.postWithAjax = function() {
  this.unbind('click', false);
  this.click(function() {
    $.post($(this).attr("href"), $(this).serialize(), null, "script");
    return false;
  })
  return this;
};
 
/*
Update/Put data via html
Use the class put in your link declaration
<%= link_to 'My link', my_update_path(data),:class => "put",:method => :put %>
*/
jQuery.fn.putWithAjax = function() {
  this.unbind('click', false);
  this.click(function() {
    $.put($(this).attr("href"), $(this).serialize(), null, "script");
    return false;
  })
  return this;
};
 
/*
Delete data
Use the class delete in your link declaration
<%= link_to 'My link', my_destroy_path(data),:class => "delete",:method => :delete %>
*/
jQuery.fn.deleteWithAjax = function() {
  this.removeAttr('onclick');
  this.unbind('click', false);
  this.click(function() {
    $.delete_($(this).attr("href"), $(this).serialize(), null, "script");
    return false;
  })
  return this;
};
 
/*
Ajaxify all the links on the page.
This function is called when the page is loaded. You'll probaly need to call it again when you write render new datas that need to be ajaxyfied.'
*/
function ajaxLinks(){
    $('.ajaxForm').submitWithAjax();
    $('a.get').getWithAjax();
    $('a.post').postWithAjax();
    $('a.put').putWithAjax();
    $('a.delete').deleteWithAjax();
}

function close_flickr_window() {
	$.modal.close();
}
 
$(document).ready(function() {
// All non-GET requests will add the authenticity token
 $(document).ajaxSend(function(event, request, settings) {
       if (typeof(window.AUTH_TOKEN) == "undefined") return;
       // IE6 fix for http://dev.jquery.com/ticket/3155
       if (settings.type == 'GET' || settings.type == 'get') return;
 
       settings.data = settings.data || "";
       settings.data += (settings.data ? "&" : "") + "authenticity_token=" + encodeURIComponent(window.AUTH_TOKEN);
     });
 
  ajaxLinks();
});

	function shortCountry() {
		if ($("div.country div.selectedTxt").text().length>30) {
			$("div.country div.selectedTxt").text($("div.country div.selectedTxt").text().substring(0,27)+"...");
		}	
	}

