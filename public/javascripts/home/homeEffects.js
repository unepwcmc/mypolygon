var searchBoxVisible=true;

jQuery.ajaxSetup({ 
  'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
})

jQuery.fn.submitWithAjax = function() {
  this.submit(function() {
    $.post(this.action, $(this).serialize(), null, "script");
    return false;
  })
  return this;
};


$(document).ready(function() {
    
   //Deep linking support
   $.historyInit(pageload, "jquery_history.html");
	
	 $('#new_user_session').submitWithAjax();

		$('#loginBox a#sign_in').click (
			function (ev) {	
				ev.stopPropagation();
				ev.preventDefault();
				$('#signUp').fadeIn('fast');
				$('form#forgot_pass').hide();
				$('form.new_user_session').show();
				$('#username_field_home').focus();
			}
		);

		$('#signUp div.loginTop a').click (
			function (ev) {
				ev.stopPropagation();
				ev.preventDefault();		    
				$('#signUp').fadeOut('fast');
			}
		);
		
		$('#tinyExplore a').click (
			function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				$('#categoryBox').fadeIn('fast');
			}
		);

		$('#close_options').click (
			function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				$('#categoryBox').fadeOut('fast');
			}
		);
		
		$('#backToStart').click (
			function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				$('#searchBox').fadeIn('slow');
				$('#tinyExplore').fadeOut('slow');
				$('#search_inputText').focus();
			}
		);
		
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
				
		$('#zoomIn').click (
			function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				if ($('#searchBox').is(":visible")) {
					hideExploreInput();
				}
		    if(map.getZoom()==2) {
	         $('#zoomOut').fadeIn('slow');
	      }
	
				if($('#container').is(":visible") && map.getZoom()==4) {
					$('#zoomIn').fadeOut('slow');
				}
			    
				map.setZoom(map.getZoom()+1);
			}
		);
	
		$('#zoomOut').click (
			function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				if ($('#searchBox').is(":visible")) {
					hideExploreInput();
				}
		    if(map.getZoom()==3) {
		        $('#zoomOut').fadeOut('slow');
		    }
				if ($('#zoomIn').is(":hidden")) {
		        $('#zoomIn').fadeIn('slow');
		    }
		
			  map.setZoom(map.getZoom()-1);
			}
		);
		
				
		$('#search_inputText').focus().autocomplete('/api/search_suggest',{
					dataType: 'json',
					parse: function(data){
					
                                            var rowsPas = new Array();
                                            var rowsCountries = new Array();
											// var rowsMarine = new Array();
											
                                            pas = data["pas"];
                                            countries = data["countries"];
											//                                             marine = data["marine"];
											// rowsMarine = { data:marine, value:"marine", result:marine}; 
 											
											var pas_to_show;
                                            var max_elements = 5;

                                            // TO GIVE PRIORITY TO THE COUNTRIES (5 is the )
                                            if (pas.length > countries.length) {
                                              if (countries.length < max_elements) pas_to_show = pas.length - countries.length;
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
											// allData = allData.concat(rowsMarine);											
                                            return allData;
					},
					formatItem: function(row, i, n) {
						// PA
						if (row.iso == undefined) {
							// IS A PA
							if (row.not_marine == undefined) {
								var menu_string = '<img src="'+ row.image + '" style="float:left;margin:7px 7px 5px 2px;border:1px solid #ccc;"><div style="margin-top:7px;float:left;width:270px;font-size:13px;">' + row.english_name + '<br><span style="color:#aaa;font-size:10px; line-height:5px;">' + row.designation + '</span></div><div style="float:right;margin-top:7px; width:10px;">';
								if (row.marine == true){
									menu_string = menu_string + '<img src="/images/icons/circle.gif">';
								}
								if (row.whs == true){
									menu_string = menu_string + '<img src="/images/icons/green_star.gif">';
								}
							}
							// ALL DATA ABOUT MARINE SITES
							// else {
							// 	if (row.marine > 0){																	
							// 		var menu_string = '<img src="http://mw2.google.com/mw-panoramio/photos/mini_square/26598734.jpg" style="float:left;margin:7px 7px 5px 2px;border:1px solid #ccc;"><div style="margin-top:7px;float:left;width:270px;font-size:13px;"><b>' + row.marine + '</b> marine protected areas<br><span style="color:#aaa;font-size:10px; line-height:5px;"></span></div><div style="float:right;margin-top:7px; width:10px;">';
							// 		menu_string = menu_string + '<img src="/images/icons/circle.gif">';
							// 		var string_to_search = $('#search_inputText').val();
							// 		row.url = '/search?q=' + "string_to_search" + '&commit=Search&marine=true';
							// 	}
							// }
						}
						// is a COUNTRY
						else {
							// In the future we have to change the example image to the default flag or 'images/countries/#{country.iso_3}.png'
							var menu_string = '<img style="float:left; margin:5px 7px 5px 2px; width:35px; height:35px;" src="/images/flags/32/'+ row.iso + '.png"><div style="margin-top:7px;float:left;width:270px;font-size:13px;">Protected Areas <b>in ' + row.name + '</b><br><span style="color:#aaa;font-size:10px; line-height:5px;">' + row.pas + ' Protected Areas in this country</span></div><div style="float:right;margin-top:7px; width:10px;">';
						}
						menu_string = menu_string + '</div>';
						return menu_string;
		      		},					
					width: 335,
					height: 100,
					minChars: 4,
					max: 5,
					selectFirst: false,
					multiple: false,
					scroll: false
				}).result(function(event,row){
					location.href = row.url;
				});


		$('#searchHeader').autocomplete('/api/search_suggest',{
					dataType: 'json',
					parse: function(data){
						 var rowsPas = new Array();
                          var rowsCountries = new Array();
						  // var rowsMarine = new Array();
						
                          pas = data["pas"];
                          countries = data["countries"];
						  // marine = data["marine"];
						  // rowsMarine = { data:marine, value:"marine", result:marine};

                          var pas_to_show;
						  var max_elements = 5;
						
                          // TO GIVE PRIORITY TO THE COUNTRIES (5 is the max)
                          if (pas.length > countries.length) {
                              if (countries.length < max_elements) pas_to_show = pas.length - countries.length;
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
						  // allData = allData.concat(rowsMarine);											
                          return allData;
					}, 
					formatItem: function(row, i, n) {
						// PA or MARINE
						if (row.iso == undefined) {
							
							// ALL DATA ABOUT MARINE SITES
							if (row.not_marine == undefined) {
								var menu_string = '<div style="margin-top:1px;float:left;width:169px;font-size:11px;">' + row.english_name + '<br><span style="color:#aaa;font-size:9px;">' + row.designation + '</span></div><div style="float:left;margin-top:1px; width:10px;">';

								if (row.marine == true){
									menu_string = menu_string + '<img src="/images/icons/circle.gif">';
								}
								if (row.whs == true){
									menu_string = menu_string + '<img src="/images/icons/green_star.gif">';
								}
								menu_string = menu_string + '</div>';
								
							}
							// IS A PA
							// else {								
							// 	if (row.marine > 0){																	
							// 	var menu_string = '<div style="margin-top:1px;float:left;width:169px;font-size:11px;"><b>' + row.marine + '</b>  marine protected areas<br> <span style="color:#aaa;font-size:9px;">' + row.designation + '</span></div><div style="float:left;margin-top:1px; width:10px;">';
							// 
							// 	menu_string = menu_string + '<img src="/images/icons/circle.gif">';
							// 	menu_string = menu_string + '</div>';
							// 	}	
							// }
						}
						// is a COUNTRY
						else {
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

		$('#searchHeader').click(
			function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				if ($(this).val()=='Search PAs, countries,...') {
					$(this).val('');
					$(this).css('font-style','normal');
					$(this).css('color','#666666');
					$(this).focus();
				}
			}
		);

		$('div#explore_input a').click( 
			function(ev) {
				ev.stopPropagation();
				ev.preventDefault();
       	hideExploreInput();
			}
		);

});


function hideExploreInput() {
    $('#searchBox').fadeOut('slow');
		$('#tinyExplore').fadeIn('slow');
		$('#header_home').fadeIn('slow');
		$('#login_error_home').fadeOut('fast');
		searchBoxVisible=false;
}

function showExploreInput() {
    $('#searchBox').fadeIn('slow');
		$('#tinyExplore').fadeOut('slow');
		$('#header_home').fadeOut('slow');
		searchBoxVisible=true;
}

function displayLoading() {
    $('#loading').fadeIn('fast');
}

function hideLoading() {
    $('#loading').fadeOut('fast');
}
