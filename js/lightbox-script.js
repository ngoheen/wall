$(document).ready(function(){
   var $vg = $('.videogallery');
   
   var loadedvideo = $vg.lightGallery({
        thumbnail: false,
        autoplay: false,
        download: false,
        zoom: false,
        autoplayControls: false,
        fullScreen: false,
        counter: false,
        selector: 'a',
        videojs: true
    });
    loadedvideo.on('onAfterOpen.lg',function(event){
        var toolbar = $('.lg-outer').find('.bottom-tool-bar');
        var words = $('.lg-sub-html');
        var vidwords = $('.video .lg-sub-html');
        toolbar.append(words);
        words.css('display','inline-block');
        var arrows = $('.lg-outer').find('.lg-actions');
        arrows.css('display','none');
    });
 
    
    var $lg = $('.blightgallery');
 
    var loadedgallery = $lg.lightGallery({
        thumbnail: false,
        selector: 'a',
        autoplay: false,
        index: 0,
        download: false,
        actualSize: false,
        appendCounterTo: '.bottom-tool-bar'
    });
    loadedgallery.on('onAfterOpen.lg',function(event){
        var toolbar = $('.lg-outer').find('.bottom-tool-bar');
        var btn = '<ul class="buy-share"><li class="buy-btn"><a href="">Buy</a></li></ul>';
        toolbar.append(btn);
        var goonie = $('.lg-outer').find('.buy-share');
        var caption = $('<div class="caption"><i class="fa fa-sort-up"></i></div>').insertAfter(goonie);
        var count = $('#lg-counter');
        count.insertAfter(caption);
        $('div.caption').on('click',function(e){
            e.stopPropagation(); 
            $('.lg-sub-html').slideToggle('slow',function(){
                $('.caption').toggleClass('biteme', $(this).is(':visible'));
                $('.caption i').toggleClass('fa-sort-down', $(this).is(':visible'));
            });
        });
    });
    var $pg = $('.productgallery');
 
    var loadedproduct = $pg.lightGallery({
        thumbnail: false,
        selector: 'a',
        autoplay: false,
        index: 0,
        download: false,
        actualSize: false,
        appendCounterTo: '.bottom-tool-bar'
    });
    
    $('#photos .owl-carousel, #videos .owl-carousel').owlCarousel({
        loop: true,
        nav: false,
        navText: false,
        margin: 0,
        responsiveClass: true,
        slideBy: 'page',
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            576: {
                items: 2,
                center: true,
                nav: false
            },
            992: {
                items: 3,
                nav: false,
            },
            1330: {
                nav: true
            }
        }
    })
    $('#maincarousel .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        navText: false,
        dots: false,
        autoplay: false,
        margin: 0,
        thumbs: true,
        thumbsPrerendered: true
    });
    $('.product-gallery .owl-carousel').owlCarousel({
        items: 1
    });
        
    $('#sponsors .owl-carousel, #events .owl-carousel').owlCarousel({
        loop: true,
        nav: true,
        navText: false,
        margin: 0,
        autoplay: true,
        //stagePadding: 40,
        responsiveClass: true,
        slideBy: 'page',
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            576: {
                items: 2,
                nav: true
            },
            768: {
                items: 3,
                nav: true
            },
            992: {
                items: 4,
                nav: true
            }
        }
    });
    var prevs = $('#sponsors .owl-carousel .owl-nav').find('.owl-prev');
    var nexts = $('#sponsors .owl-carousel .owl-nav').find('.owl-next');
    prevs.append('<i class="custom-icon custom-icon-arrow-prev"></i>');
    nexts.append('<i class="custom-icon custom-icon-arrow-next"></i>');
    var preve = $('#events .owl-carousel .owl-nav').find('.owl-prev');
    var nexte = $('#events .owl-carousel .owl-nav').find('.owl-next');
    preve.append('<i class="custom-icon custom-icon-arrow-prev"></i>');
    nexte.append('<i class="custom-icon custom-icon-arrow-next"></i>');
    var prevm = $('#maincarousel .owl-carousel .owl-nav').find('.owl-prev');
    var nextm = $('#maincarousel .owl-carousel .owl-nav').find('.owl-next');
    prevm.append('<i class="custom-icon custom-icon-arrow-prev"></i>');
    nextm.append('<i class="custom-icon custom-icon-arrow-next"></i>');
});

// the following to the end is what's needed for the thumbnails.
jQuery( document ).ready(function() {
	 
  
    // 1) ASSIGN EACH 'DOT' A NUMBER
    dotcount = 1;
	 

    jQuery('.product-gallery .owl-dot').each(function() {

        jQuery( this ).addClass( 'dotnumber' + dotcount);
        jQuery( this ).attr('data-info', dotcount);
        dotcount=dotcount+1;
    });
			
    // 2) ASSIGN EACH 'SLIDE' A NUMBER
    slidecount = 1;
	 

    jQuery('.product-gallery .owl-item').not('.cloned').each(function() {

        jQuery( this ).addClass( 'slidenumber' + slidecount);
        slidecount=slidecount+1;
    });
			
    // SYNC THE SLIDE NUMBER IMG TO ITS DOT COUNTERPART (E.G SLIDE 1 IMG TO DOT 1 BACKGROUND-IMAGE)

    jQuery('.product-gallery .owl-dot').each(function() {

			
        grab = jQuery(this).data('info');

        slidegrab = jQuery('.slidenumber'+ grab +' img').attr('src');
        console.log(slidegrab);

        jQuery(this).css("background-image", "url("+slidegrab+")");  

    });
});