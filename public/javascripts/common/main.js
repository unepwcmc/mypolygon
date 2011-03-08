jQuery.ajaxSetup({ 
  'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
})

/* VARIABLES */
	var offset = 1;
	var closeEmail = true;
	var readyDocument = false;


$(document).ready(function() {

	/* ---  HEADER LOGIN EFFECTS --- */
	$('a#loginLink').click(function(ev){
		ev.stopPropagation();
		ev.preventDefault();
		
		var position = $(this).offset();
		$("div#signUp").css("left",position.left - 185+"px");
		$("div#signUp").css("top",position.top - 14+"px");
		
		$('div#signUp').fadeIn('fast');
		$('form#forgot_pass').hide();
		$('form.new_user_session').show();		
		$('#username_field_home').focus();
	});
	$('div#signUp div.loginTop a').click(function(ev){
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
					// PA
					if (row.iso == undefined) {
						if (row.not_marine == undefined) {
							var menu_string = '<div style="margin-top:1px;float:left;width:169px;font-size:11px;">' + row.english_name + '<br><span style="color:#aaa;font-size:9px;">' + row.designation + '</span></div><div style="float:left;margin-top:1px; width:10px;">';

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
						// 		var menu_string = '<div style="margin-top:1px;float:left;width:169px;font-size:11px;"><b>' + row.marine + '</b> marine protected areas<br><span style="color:#aaa;font-size:9px;">' + row.designation + '</span></div><div style="float:left;margin-top:1px; width:10px;">';								
						// 		var string_to_search = $('#searchHeader').val();
						// 		row.url = '/search?q=' + "string_to_search" + '&commit=Search&marine=true';
						// 	}
						// }
					}
					// is a COUNTRY
					else {
						var menu_string = '<div style="margin-top:1px;float:left;width:169px;font-size:11px;">PAs in <b>' + row.name + '</b><br><span style="color:#aaa;font-size:9px;">' + row.pas + ' PAs in this country</span></div><div style="float:left;margin-top:1px; width:10px;">';
					}
					menu_string = menu_string + '</div>';
					return menu_string;
	      },
			resultsClass: "ac_results ac_results_header",
				loadingClass: "ac_loading_header",					
				width: 194,
				height: 50,
				minChars: 4,
				max: 5,
				selectFirst: false,
				multiple: false,
				scroll: false
			}).result(function(event,data){
				location.href = data.url;
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

function createGeoJsonPolygon(geojson){
	var coords = geojson.coordinates;
	var paths = [];
	$.each(coords,function(i,n){
		$.each(n,function(j,o){
			var path=[];
			$.each(o,function(k,p){
				var ll = new google.maps.LatLng(p[1],p[0]);
				path.push(ll);
			});
			paths.push(path);
		});
	});
	var polygon = new google.maps.Polygon({
		paths: paths,
		strokeColor: "#FF7800",
		strokeOpacity: 1,
		strokeWeight: 2,
		fillColor: "#46461F",
		fillOpacity: 0.5
	});
	return polygon;
}

function createMainGeoJsonPolygon(geojson){
	var coords = geojson.coordinates;
	var paths = [];
	$.each(coords,function(i,n){
		$.each(n,function(j,o){
			var path=[];
			$.each(o,function(k,p){
				var ll = new google.maps.LatLng(p[1],p[0]);
				path.push(ll);
			});
			paths.push(path);
		});
	});
	var polygon = new google.maps.Polygon({
		paths: paths,
		strokeColor: "#7952E0",
		strokeOpacity: 1,
		strokeWeight: 1,
		fillColor: "#BCA8F0",
		fillOpacity: 0.5
	});
	return polygon;
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










