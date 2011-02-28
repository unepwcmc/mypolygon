

/* VARIABLES */
	var editRecordsList;
	var editRecordsListCompressed;

$(document).ready(function() {
	
	$('.myselectbox').selectbox();

	
	/* NEED OPERATIONS FOR PA RECORDS ALIGNMENT */
	
	editRecordsList = $('div#right_container div.protected_area ul').height();
	
	$('div#right_container div.protected_area ul li .last').hide();
	editRecordsListCompressed = $('div#right_container div.protected_area ul').height();

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
	


	//show tooltips in edit box
	$('#edit_data_container div.data_edit div span a').hover(
		function () {
			$(this).children('div.tooltip').show();
		}, 
		function () {
		  $(this).children('div.tooltip').hide();
		}
	);	
	

		
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
	
	//show login box in activity create comment action
	$('a.create_comment').click( function(ev) {
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
	$('a.create_bottom_comment').click( function(ev) {
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
		
		
	//Cool hover in users (activity)
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

	


});














