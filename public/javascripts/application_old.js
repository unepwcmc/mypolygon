// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults


$(function(){
	Cufon.replace('h2, h3, h4');
	$('a#tipsy').tipsy({fade: true, gravity: 's'});
	$('.zebra').colorize({bgColor:'#F5FAFF', altColor:'#F0F7FF', hoverColor:'#FFFED8'});
	$('a[rel*=facebox]').facebox() 
	setTimeout(function() {$("#flash").hide("normal")}, 3000);
	$('#close_fb').click(function(){
		$(document).trigger('close.facebox');
		false;
	});		
});