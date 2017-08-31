$(document).ready(function() {
	
	redrawDotNav();
	
	/* Scroll event handler */
    $(window).bind('scroll',function(e){
    	parallaxScroll();
		redrawDotNav();
    });
    
	/* Next/prev and primary nav btn click handlers */
	$('a.page-number-1').click(function(){
    	$('html, body').animate({
    		scrollTop:0
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
	});
    $('a.page-number-2').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#page-number-2').offset().top
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
    $('a.page-number-3').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#page-number-3').offset().top
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
	$('a.page-number-4').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#page-number-4').offset().top
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
    
    /* Show/hide dot lav labels on hover */
    $('nav#primary a').hover(
    	function () {
			$(this).prev('h1').show();
		},
		function () {
			$(this).prev('h1').hide();
		}
    );
    
});

/* Scroll the background layers */
function parallaxScroll(){
	var scrolled = $(window).scrollTop();
	$('#parallax-bg1').css('top',(0-(scrolled*.25))+'px');
	$('#parallax-bg2').css('top',(0-(scrolled*.5))+'px');
	$('#parallax-bg3').css('top',(0-(scrolled*.75))+'px');
}

/* Set navigation dots to an active state as the user scrolls */
function redrawDotNav(){
	var section1Top =  0;
	// The top of each section is offset by half the distance to the previous section.
	var section2Top =  $('#page-number-2').offset().top - (($('#page-number-3').offset().top - $('#page-number-2').offset().top) / 2);
	var section3Top =  $('#page-number-3').offset().top - (($('#page-number-4').offset().top - $('#page-number-3').offset().top) / 2);
	var section4Top =  $('#page-number-4').offset().top - (($(document).height() - $('#page-number-4').offset().top) / 2);;
	$('nav#primary a').removeClass('active');
	if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
		$('nav#primary a.page-number-1').addClass('active');
	} else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top){
		$('nav#primary a.page-number-2').addClass('active');
	} else if ($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top){
		$('nav#primary a.page-number-3').addClass('active');
	} else if ($(document).scrollTop() >= section4Top){
		$('nav#primary a.page-number-4').addClass('active');
	}
	
}
