var list_size;
var actual_position;
var first_position;
var html_photo;
var html_graders;

	$(document).ready(function() {
		
		$('.custom_dropbox').sSelect();
		$('.country_dropbox').sSelect({ddMaxHeight: '300px'});

		
		//short country texts in magic combobox
		$('div.country select#user_country_id').change(function(ev){
			setTimeout('shortCountry()',25);		
		});
		
				
		/* ---------- USER IMAGE VOTING ON PROFILE PAGE ----------- */
		$('#user_image_vote a.ko').live("click", function(e){
			e.stopPropagation();
			e.preventDefault();
			
			var points = parseInt($('div.number_points p.number').text());
			if (points==0) {
				$('div.number_points p.points').text('POINT');
			} else {
				$('div.number_points p.points').text('POINTS');
			}
			$('div.number_points p.number').text(points+1);
			$('div div.loading_image').fadeIn();
			

			$.post($(this).attr('href'),{game: true}, function(data) {
				
				console.log(data);
				
				$.get(window.location.pathname+'/vote_ranking_json',null, function(data) {
					$('p.rank').text(getPositionOrdinalize(data.position)); 
					html_graders = createUsersList(data.preceeding_voters,data.subsequent_voters,data.user_votes,data.position);
					getUsersOperations(html_graders);
				});
				
				
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
				$('#user_image_vote div.image div img').fadeIn(1000, function(ev){
					$('div div.loading_image').delay(200).fadeOut();
				});
				
				html_photo = data;
				
			});		
			return(false);
		}); 

		$('#user_image_vote a.ok').live("click", function(e){
			e.stopPropagation();
			e.preventDefault();
			
			
			var points = parseInt($('div.number_points p.number').text());
			if (points==0) {
				$('div.number_points p.points').text('POINT');
			} else {
				$('div.number_points p.points').text('POINTS');
			}
			$('div.number_points p.number').text(points+1);
			$('div div.loading_image').fadeIn();

			
			$.post($(this).attr('href'),{game: true}, function(data) {
				
				$.get(window.location.pathname+'/vote_ranking_json',null, function(data) {
					$('p.rank').text(getPositionOrdinalize(data.position)); 
					html_graders = createUsersList(data.preceeding_voters,data.subsequent_voters,data.user_votes,data.position);
					getUsersOperations(html_graders);
				});
				
				
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
				$('#user_image_vote div.image div img').fadeIn(1000, function(ev) {
					$('div div.loading_image').delay(200).fadeOut();
				});
				
				html_photo = data;
			});		
			return(false);
		});
		
		
		
		
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
					speed: 300,
					onEnd: function() {actual_position = first_position;}
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
		

		list_size = $('div.graders ul li').size();
		
		$("div.graders ul li").each(function (index, domEle) {
			if ($(domEle).hasClass('you')) {
				actual_position = index + 1;
				return;
			}
		});
		
		if (actual_position==1 || actual_position==2 || actual_position==3) {
			actual_position = 3;
			first_position = actual_position;
			$('div.graders ul').css('margin-top','0px');
		} else {
			if (actual_position==list_size || actual_position==list_size-1 || actual_position==list_size-2) {
				actual_position = list_size - 2;
				first_position = actual_position;
				$('div.graders ul').css('margin-top', 45 - (actual_position-2)*45 + 'px');
			} else {
				first_position = actual_position;
				$('div.graders ul').css('margin-top', 45 - (actual_position-2)*45 + 'px');
			}
		}
		
		html_photo = $('div.pa_image').html();
		html_graders = $('div.graders').html();
	
	});
	
	
	
	function goUsersDown() {
		if (actual_position+2 < list_size) {
			actual_position = actual_position + 1;
			$('div.graders ul').animate({marginTop: 45 - (actual_position-2)*45}, 100);
		}
	}



	function goUsersUp() {
		if (actual_position-2 > 1) {
			actual_position = actual_position - 1;
			$('div.graders ul').animate({marginTop: 45 - (actual_position-2)*45}, 100);
		}
	}



	function shortCountry() {
		if ($("div.country div.selectedTxt").text().length>30) {
			$("div.country div.selectedTxt").text($("div.country div.selectedTxt").text().substring(0,27)+"...");
		}	
	}
	
	
	
	function createUsersList(pre_list,sub_list,you,position) {
		
		var i = position - pre_list.length;
		var html = '<h3>Top graders</h3><span><a href="javascript: void goUsersDown()" id="list_down"></a><a href="javascript: void goUsersUp()" id="list_up"></a></span>';
		html += '<div id="slider3"><ul style="float: left; position: relative; list-style-type: none; list-style-position: initial; list-style-image: initial; margin-top: 0px; ">';

		
		for (var j=0; j<pre_list.length; j++) {
			html += '<li><div class="avatar"><img src="'+ pre_list[j].get_avatar +'"/></div><div class="information"><p class="user">'+pre_list[j].username+'</p>';
			html += '<p class="votes">'+pre_list[j].votes+' votes</p></div><p class="position">' + getPositionOrdinalize(i) +'</p></li>';			
			i = i + 1;
		}
		
		if (position == 1) {
			var first = 'first';
		} else {
			var first = '';
		}
		
		html += '<li class="you"><div class="avatar"><img src="'+ you.get_avatar +'"/></div><div class="information"><p class="user">'+ you.username +'</p>';
		html += '<p class="votes">'+ you.votes +' votes</p></div><p class="pos">'+ getPositionOrdinalize(position) +'</p><div class="absolute '+first+'">';
		html += '<div class="avatar"><img src="'+ you.get_avatar +'"/></div><div class="information"><p class="user">'+ you.username +'</p><p class="votes">'+ you.votes +' votes</p></div><p class="pos">'+ getPositionOrdinalize(position) +'</p></div></li>';
		
		
		i = position + 1;
		
		for (var j=0; j<sub_list.length; j++) {
			html += '<li><div class="avatar"><img src="'+ sub_list[j].get_avatar +'"/></div><div class="information"><p class="user">'+sub_list[j].username+'</p>';
			html += '<p class="votes">'+sub_list[j].votes+' votes</p></div><p class="position">' + getPositionOrdinalize(i) +'</p></li>';			
			i = i + 1;
		}
		
		html += '</ul></div>'
		
		return html;

	}
	
	
	function getPositionOrdinalize (position) {
		switch (parseInt(position)) {
        case  1: return position + "st";
        case  2: return position + "nd";
        case  3: return position + "rd";
        default: return position + "th"; 
    }
	}
	
	
	function getUsersOperations(html_) {
		$(html_).find('li').each(function (index, domEle) {
			if ($(domEle).hasClass('you')) {
				actual_position = index + 1;
				return;
			}
		});
		
		if (actual_position==1 || actual_position==2 || actual_position==3) {
			actual_position = 3;
			first_position = actual_position;
			$(html_).children('ul').css('margin-top','0px');
		} else {
			if (actual_position==list_size || actual_position==list_size-1 || actual_position==list_size-2) {
				actual_position = list_size - 2;
				first_position = actual_position;
				$(html_).children('ul').css('margin-top', 45 - (actual_position-2)*45 + 'px');
			} else {
				first_position = actual_position;
				$(html_).children('ul').css('margin-top', 45 - (actual_position-2)*45 + 'px');
			}
		}
	}
	
	
