	
		$(document).ready(function() {
			
			$('.custom_dropbox').sSelect();
			$('.country_dropbox').sSelect({ddMaxHeight: '300px'});

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
			
		});
		

		
		function shortCountry() {
			if ($("div.country div.selectedTxt").text().length>30) {
				$("div.country div.selectedTxt").text($("div.country div.selectedTxt").text().substring(0,27)+"...");
			}	
		}
