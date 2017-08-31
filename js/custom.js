(function ($, window, document, undefined) {
    'use strict';
    var pluginName = "Camaro",
        defaults = {
            //sliderFx: 'crossfade',		// Slider effect. Can be 'slide', 'fade', 'crossfade'
            //sliderInterval: 8000,		// Interval
            speedAnimation: 600,        // Default speed of the animation
            countdownTo: '2017/07/23',          // Change this in the format: 'YYYY/MM/DD'
            successText: 'You have successfully subscribed', // text after successful subscribing
            errorText: 'Please, enter a valid email', // text, if email is invalid
            //teamHeight : 450, // Team expand height
            //tooltipPosition: 'bottom',            // Tooltip position
            scrollTopButtonOffset: 100 // when scrollTop Button will show
        },
        $win = $(window),
        $doc = $(document),
        $html = $('html'),
        onMobile = false,
        scrT;

    // The plugin constructor
    function Plugin(element, options) {
        var that = this;
        that.element = $(element);
        that.options = $.extend({}, defaults, options);

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            onMobile = true;
        }

        $win.scrollTop(0);

        that.init();

        // onLoad function
        $win.load(function(){
            that.fSize();
            that.activate();

            setTimeout(function(){
                    that.fMiddle();
                }, 10);
            setTimeout( function(){
                    that.fNum();
                    $('.layer').height(
                        $doc.height()
                    );
                }, defaults.speedAnimation/2);

            that.headerScroll();


        }).scroll(function(){  // onScroll function
            that.fNum();
            that.headerScroll();
        }).resize(function(){  // onResize function
            $('.layer').height(
                $doc.height()
            );

            that.fSize();

            that.mask.each(function(){
                var $this = $(this),
                    realHeight;
                $this.parent().attr('maskheight', $(this).parent().height());
                realHeight = +$this.parent().attr('maskheight') + 1;
                $this.height(realHeight);

            });
            that.fMiddle();

            if( $win.width() > 768) {
                $('.header .collapse.in').removeClass('in').removeAttr('style');
            }

        });

    }

    Plugin.prototype = {
        init: function () {
            this.body = $(document.body);
            this.wrapper = $('.wrapper');
            this.home = $('.home');
            //this.slider = $('.slider');
            //this.oneslider = $('.oneslider');
            //this.gallery = $('.gallery');
            //this.ribbon = $('.ribbon');
            this.popup = $('.popup');
            this.pclose = $('.pclose');
            this.vmiddle = $('.vmiddle');
            this.fullsize = $('.full-size');
            this.internalLinks = $('.internal');
            //this.tooltipstered = $('.tooltipstered');
            this.header = $('.header');
            this.search = this.header.find('.search');
            this.aMenu = $('.check-progress');
            this.sidemenu = $('.sidemenu');
            this.menutable = $('.menutable');
            this.shoptable = $('.menushop');
            this.audio = $('audio');
            this.num = $('[data-num]');
            this.dataPopup = $('[data-popup]');
            this.chart = $('.chart');
            this.estimateshipping = $('.estimate-shipping');
            this.timer = $('#countdown');
            this.barDiagramm = $('.bar');
            this.skillLine = $('.progresses');
            this.team = $('.team');
            this.expandTeam = $('.expandteam');
            this.history = $('.history');
            this.histEvent = this.history.find('.row');
            this.newsletter = $('#feedback-form').find('form');
            this.passw = $('.login-password');
            this.cntMap = $('#contact-map');
            this.cntMapFix = $('#contact-map-fix');
            this.select = $('select');
            this.scrTop = $('.scrolltop');
            this.mask = $('.mask');
            this.magnific = $('.magnific');
            this.magnificWrap = $('.magnific-wrap');
            this.magnificGallery = $('.magnific-gallery');
            this.magnificVideo = $('.magnific-video');
            this.citem = $('.catalog-square .citem');
            this.addCart = $('.add-cart');
            //this.jslider = $('.jslider');
            this.rating = $('.raty');
            //this.thumbsSlider = $('.thumbs-slider');
            //this.mediumSlider = $('.medium-slider');
            this.counting = $('.counting');
            this.aLess = $('.a-less');
            this.aMore = $('.a-more');
            this.trRemove = $('.tr-remove');
            this.tabLink = $('.tab-link');
            this.dataToggleTab = $('[data-toggle="tab"]');
            this.btnValid = $('.btn-validation');
            //this.inputMask = $('[data-inputmask]');
            this.faq = $('.faq');
            this.navFaq = this.faq.find('.nav-category');
            this.faqGroup = this.faq.find('.panel-group');
            this.faqBody = this.faqGroup.find('.panel-body');
            this.dataToggle = $('[data-toggle]');
            this.expandLink = $('.expand-link');
            this.collapseLink = $('.collapse-link');
            this.accToggle = $('.accordeon-toggle');
            this.navCategory = $('.nav-category');
            this.filterLink = $('a.filter');
            this.mixList = $('.mix-list');
            this.masonryList = $('.masonry-list');
            this.ytvid = $('.ytvideo');
            this.vacRow = $('.vacancy-row');
            this.closeBox = $('.close-box');
            this.loadmore = $('a.loadmore');
            this.contactForm = $('#send-form');
            this.contactFormName = $('#send-form-name');
            this.contactFormEmail = $('#send-form-email');
            this.contactFormMessage = $('#send-form-message');
            this.emailValidationRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        },
        activate: function () {
            var instance = this;

            instance.mask.each(function(){
                var $this = $(this),
                    realHeight;
                $this.parent().attr('maskheight', $(this).parent().height());
                realHeight = +$this.parent().attr('maskheight');
                $this.height(realHeight);
                console.log('did');

            });

            if (instance.audio.length > 0){
                instance.audio.mediaelementplayer();
            }

            if (instance.internalLinks.length > 0){
                instance.internalLinks.on('click', function(e){
                    e.preventDefault();
                    var $this = $(this),
                        url = $this.attr('href'),
                        urlTop = $(url).offset().top;

                    $('body, html').stop(true, true)
                        .animate({ scrollTop: urlTop },
                        instance.options.speedAnimation);
                });
            }

            // Custom Select
           /* if (instance.select.length > 0){
                instance.select.each(function(){
                    var self = $(this),
                        wid = self.data('width');

                    self.width(wid).chosen({width: wid});
                    console.log('changed width');

                });
            }
*/
            // Custom input[type=range]
            /*if (instance.jslider.length > 0) {
                instance.jslider.slider({
                    from: 0,
                    to: 1000,
                    step: 1,
                    limits: false,
                    scale: [0, 1000],
                    dimension: "$&nbsp;"
                });
            }
*/
            //instance.inputMask.inputmask();

            // RATING
            if (instance.rating.length > 0){
                instance.rating.raty({
                    half: true,
                    starType: 'i',
                    readOnly   : function() {
                        return $(this).data('readonly');
                    },
                    score: function() {
                        return $(this).data('score');
                    },
                    starOff: 'fa fa-star-o',
                    starOn: 'fa fa-star',
                    starHalf: 'fa fa-star-half-o'
                });
            }

            if (instance.timer.length === 1) {
                instance.timer.countdown(instance.options.countdownTo, function (event) {
                    var $this = $(this);
                    $this.html(event.strftime(
                        '<div class="col-xs-6 col-md-3"><span class="day color">%D</span> <ins>day%!D</ins></div>' 
+ 
'<div class="col-xs-6 col-md-3"><span>%H</span><ins class="cd1">hour%!D</ins></div>' 
+ 
'<div class="col-xs-6 col-md-3"><span>%M</span><ins class="cd2">minute%!D</ins></div>' 
+ 
'<div class="col-xs-6 col-md-3"><span class="csec">%S</span><ins class="cd3">second%!D</ins></div>'));
                });
            }


            instance.citem.find('a').hover(function(){
                $(this).parents('.citem').toggleClass('color');
            });
            instance.addCart.on('click', function(e){
                e.preventDefault();
                var self = $(this);
                if (self.hasClass('btn-primary')){
                    self.removeClass('btn-primary').addClass('btn-default').text('Remove from Cart');
                } else {
                    self.removeClass('btn-default').addClass('btn-primary').text('Add to Cart');
                }
            });

            // scrollTop function
            if (instance.scrTop.length === 1) {
                instance.scrTop.click(function(e){
                    $('html, body').stop(true,true).animate({ scrollTop: 0 }, instance.options.speedAnimation);
                    e.preventDefault();
                });
            }

            instance.closeBox.on('click', function(e){
                e.preventDefault();
                var $this = $(this);

                $this.parents('.box-inline').fadeOut(instance.options.speedAnimation);
            });

            instance.estimateshipping.find('[data-toggle]').on('click', function(e){
                e.preventDefault();
            });

            instance.btnValid.on('click', function(e){

                var $this = $(this),
                    form = $this.parents('form');

                form.find('input, textarea').each(function(){
                    if ($(this).val().length === 0){
                        e.preventDefault();
                        $(this).addClass('invalid');
                    }
                });

                if ($this.parents(instance.form).find('.formwrap').length > 0) {
                    $this.parents(instance.form).find('.formwrap').addClass('has-error');
                }
            });

            $('input, textarea').on('keyup', function(){
                $(this).removeClass('invalid');
            });

            // navbar dropdown
            $('.navbar-nav .dropdown').hover(function() {
                if (!$(this).parents('.navbar-collapse').hasClass('in')) {
                    var offs = $(this).offset().left,
                        dropW = $(this).find('.dropdown-menu').first().outerWidth(),
                        ww = $win.width();

                    $(this).find('.dropdown-menu').first().delay(100).fadeIn(instance.options.speedAnimation / 2);

                    if (ww <= (offs + dropW)) {
                        $(this).find('.dropdown-menu').first().addClass('otherwise');
                    }
                    $(this).find('.dropdown-menu').first().stop(true, true).delay(200).slideDown(instance.options.speedAnimation / 4);
                }
            }, function() {
                    if (!$(this).parents('.navbar-collapse').hasClass('in')) {
                        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(instance.options.speedAnimation / 4);
                        $('.otherwise').removeClass('otherwise').removeAttr('style');
                    }
            });

            $('.dropdown-submenu').hover(function() {
                if (!$(this).parents('.navbar-collapse').hasClass('in')) {
                    var offs = $(this).offset().left,
                        dropW = $(this).find('.dropdown-menu').first().outerWidth(),
                        ww = $win.width();

                    if (ww <= (offs + dropW + $(this).parent().width())) {
                        $(this).find('.dropdown-menu').first().addClass('subotherwise');
                    }
                }
            }, function() {
                if (!$(this).parents('.navbar-collapse').hasClass('in')) {
                    $('.subotherwise').removeClass('subotherwise').removeAttr('style');
                }
            });

            $('.a-search').on('click', function(e){
                e.preventDefault();
                instance.search.fadeIn(instance.options.speedAnimation/4);
                instance.search.find('input').focus();
            });

            instance.search.find('.sclose').on('click', function(e){
                e.preventDefault();
                instance.search.fadeOut(instance.options.speedAnimation/4);
            });

            instance.aMenu.on('click', function(e){
                e.preventDefault();
                instance.sidemenu.fadeIn(instance.options.speedAnimation/4);
            });

            instance.dataToggleTab.on('shown.bs.tab', function () {
                var $this = $(this);
                $this.parent().addClass('active').siblings().removeClass('active');
            });

            instance.tabLink.on('click', function (e) {
                e.preventDefault();
                var $this = $(this),
                    hrf = $this.attr("href"),
                    top = $(hrf).parent().offset().top;
                $this.tab('show');
                $('.nav li').removeClass('active');
                setTimeout(function() {
                    $('.nav li a[href="' + $this.attr("href") + '"]').parent().addClass('active');
                }, 300);
                $('html, body').animate({scrollTop: top}, instance.options.speedAnimation/2);
            });


            $('.shop-category li a').on('mouseover', function(){
                if(!onMobile) {
                    var self = $(this),
                        img = self.data('img');
                    $('.category-imgs li').hide();
                    $('#'+img).show();
                } else {
                    // OR $(this).trigger('click');
                    return false;
                }
            });

            if (instance.navCategory.length > 0){

                var hsh = window.location.hash.replace('#','.'),
                    worksNavArr = [];

                if (hsh == '.all' ) {
                    hsh = 'all';
                }

                instance.navCategory.find('li').each(function(){
                    var $this = $(this);
                    worksNavArr.push($this.children().data('filter'));
                });

                if (instance.mixList.length > 0){
                    instance.mixList.stop(true,true)
                        .animate({'opacity': 1},
                        instance.options.speedAnimation/2, function() {
                            instance.mixList.mixItUp({
                                load: {
                                    filter: hsh !== '' ? hsh : 'all'
                                }
                            });

                            instance.navCategory.find('ins').removeAttr('style');
                            instance.navCategory.find('a.active ins').animate({
                                'width': '100%',
                                'left': 0
                            }, instance.options.speedAnimation, 'easeOutQuart');
                    });
                }

                instance.filterLink.on('click', function(){
                    var self = $(this),
                        npLine = self.find('ins'),
                        $expandTeam = $('.expandteam');

                    instance.navCategory.find('ins').removeAttr('style');
                    npLine.animate({
                        'width': '100%',
                        'left': 0
                    }, instance.options.speedAnimation, 'easeOutQuart');

                    if (self.parents('ul').hasClass('team-category')){
                        if ($expandTeam.length > 0) {
                            $expandTeam.removeClass('active');
                            closeExpand();
                        }
                    }
                });
            }

           
            instance.mixList.find(instance.filterLink).on('click', function(e){
                e.preventDefault();
                var self = $(this),
                    hrf = self.attr('href');

                if (!instance.navFaq.find('a[href=' + hrf + ']').hasClass('active')) {
                    instance.navFaq.find('ins').removeAttr('style');
                    instance.navFaq.find('a[href=' + hrf + ']').addClass('active');
                    instance.navFaq.find('a[href=' + hrf + '] ins').animate({
                        'width': '100%',
                        'left': 0
                    }, instance.options.speedAnimation, 'easeOutQuart');
                }

            });

            if (instance.faqBody.length > 0) {
                instance.faqBody.collapse({ toggle: false });
            }

            instance.expandLink.on('click', function(e){
                e.preventDefault();

                instance.faqBody.collapse('show');

                if (instance.accToggle.length > 0){
                    instance.accToggle.text('-');
                    instance.dataToggle.addClass('open');
                }
            });

            instance.collapseLink.on('click', function(e){
                e.preventDefault();

                instance.faqBody.collapse('hide');

                if (instance.accToggle.length > 0){
                    instance.accToggle.text('+');
                    instance.accToggle.removeClass('open');
                }
            });

            instance.dataToggle.on('click', function(){
                var $this = $(this),
                    par = $this.parents('.row:first');

                par.find(instance.dataToggle).toggleClass('open');
                if (par.find(instance.accToggle).hasClass('open')){
                    par.find(instance.accToggle).text('-');
                } else {
                    par.find(instance.accToggle).text('+');
                }

            });

            if (instance.passw.length > 0){
                instance.passw.each(function(){
                    $(this).hideShowPassword(false, true, {
                        toggle: {
                            element: '<a href="">',
                            className: 'fa form-control-feedback toggle-password'
                        },
                        states: {
                            shown: {
                                toggle: {
                                    className: 'fa-eye-slash',
                                    content: ''
                                }
                            },
                            hidden: {
                                toggle: {
                                    className: 'fa-eye',
                                    content: ''
                                }
                            }
                        }
                    });
                });
            }

            instance.contactFormName.focusout(function(){
                if ($(this).val() === '')
                    $(this).addClass('invalid');
            }).focusin(function(){
                $(this).removeClass('invalid');
            });

            instance.contactFormMessage.focusout(function(){
                if ($(this).val() === '')
                    $(this).addClass('invalid');
            }).focusin(function(){
                $(this).removeClass('invalid');
            });

            instance.contactFormEmail.focusout(function(){
                if (($(this).val() === '') || (!instance.emailValidationRegex.test($(this).val()))) {
                    $(this).addClass('invalid');
                }
            }).focusin(function(){
                $(this).removeClass('invalid');
            });

            instance.contactForm.on('submit', function(){
                var isHaveErrors = false;

                if (instance.contactFormName.val() === '') {
                    isHaveErrors = true;
                    instance.contactFormName.addClass('invalid');
                }

                if (instance.contactFormMessage.val() === '') {
                    isHaveErrors = true;
                    instance.contactFormMessage.addClass('invalid');
                }

                if ((instance.contactFormEmail.val() === '') || (!instance.emailValidationRegex.test(instance.contactFormEmail.val()))) {
                    isHaveErrors = true;
                    instance.contactFormEmail.addClass('invalid');
                }

                if (!isHaveErrors) {
                    $.ajax({
                        type: 'POST',
                        url: 'php/email.php',
                        data: {
                            name: instance.contactFormName.val(),
                            email: instance.contactFormEmail.val(),
                            message: instance.contactFormMessage.val()
                        },
                        dataType: 'json'
                    })
                        .done(function(answer){
                            if ((typeof answer.status != 'undefined') && (answer.status == 'ok')) {
                                $('.succs-msg').fadeIn().css("display","inline-block");
                                instance.contactFormName.val('');
                                instance.contactFormEmail.val('');
                                instance.contactFormMessage.val('');
                            } else {
                                alert('Message was not sent. Server-side error!');
                            }
                        })
                        .fail(function(){
                            alert('Message was not sent. Client error or Internet connection problems.');
                        });
                }

                return false;
            });

            // all about popups
            instance.body.append('<div class="layer"></div>');
            instance.dataPopup.on('click', function(e){
                e.preventDefault();
                var that = $(this),
                    popup = that.data('popup'),
                    $popup = $('#'+popup),
                    winTop = $win.scrollTop();

                instance.popup.hide();

                scrT = winTop;

                if ($popup.hasClass('block-popup')){
                    $('.layer').fadeIn(instance.options.speedAnimation/2);
                    $popup.css('top', winTop + 50).fadeIn(instance.options.speedAnimation/2);
                } else {
                    $popup.show(instance.options.speedAnimation / 2, function () {
                        instance.body.css('position', 'fixed');
                        instance.wrapper.css('marginTop', -scrT);
                    });
                }

            });

            instance.popup.click(function(e){ e.stopPropagation(); });

            instance.pclose.click(function(e){
                e.preventDefault();
                if ($(this).parents('.popup').hasClass('block-popup')){
                    $(this).parents('.popup').fadeOut(instance.options.speedAnimation / 2);
                    $('.layer').fadeOut(instance.options.speedAnimation/2);
                } else {
                    $(this).parents('.popup').hide(instance.options.speedAnimation / 2);
                    $html.css('overflow-y', 'auto');
                    $('body').removeAttr('style');
                    instance.wrapper.removeAttr('style');
                    $('body, html').scrollTop(scrT);
                }
            });

            $('.layer').on('click', function(){
                if (instance.popup.filter(':visible').hasClass('block-popup')){
                    instance.popup.filter(':visible').fadeOut(instance.options.speedAnimation / 2);
                    $('.layer').fadeOut(instance.options.speedAnimation/2);
                }
            });

            // Product counting more
            instance.aMore.on('click',function(e){
                e.preventDefault();
                var $this = $(this),
                    valIn = $this.parent().find('input').val();
                valIn++;
                $this.parent().find('input').val(valIn);

                if ($this.parent().find('input').val() <= 1){
                    $this.parent().find(instance.aLess).addClass('disabled');
                } else {
                    $this.parent().find(instance.aLess).removeClass('disabled');
                }
            });

            instance.counting.find('input').on('change', function(){
                var $this = $(this);
                if ($this.parent().find('input').val() <= 1){
                    $this.parent().find(instance.aLess).addClass('disabled');
                } else {
                    $this.parent().find(instance.aLess).removeClass('disabled');
                }
            });

            // Product counting less
            instance.aLess.on('click',function(e){
                e.preventDefault();
                var $this = $(this),
                    valIn = $this.parent().find('input').val();
                if($this.parent().find('input').val() != 1){
                    valIn--;
                    $this.parent().find('input').val(valIn);
                    $this.removeClass('disabled');
                } else{
                    $this.addClass('disabled');
                    return false;
                }
                if ($this.parent().find('input').val() <= 1){
                    $this.addClass('disabled');
                }
            });

            instance.trRemove.on('click', function(e){
                e.preventDefault();
                var $this = $(this);

                $this.parents('tr').fadeOut(instance.options.speedAnimation/2, function(){
                    $(this).remove();
                });
            });

        },

      
        headerScroll: function(){
            var instance = this,
                winTop = $win.scrollTop(),
                scrTop = instance.scrTop,
                hTopHeight = instance.header.filter(':visible').find('.htop').outerHeight();

            if (winTop > instance.options.scrollTopButtonOffset) {
                scrTop.fadeIn(instance.options.speedAnimation);
            } else {
                scrTop.fadeOut(instance.options.speedAnimation);
            }

            if (instance.header.filter(':visible').hasClass('centered') && !$html.hasClass('page404')) {
                if(instance.header.filter(':visible').hasClass('header-simple')) {
                    hTopHeight = 0;
                    if (winTop > hTopHeight) {
                        instance.header.addClass('sticky');
                        instance.wrapper.css('marginTop', hTopHeight);
                    } else {
                        instance.header.removeClass('sticky');
                        instance.wrapper.css('marginTop', 0);
                    }
                } else if (winTop > 160) {
                    instance.header.addClass('sticky');
                    instance.wrapper.css('marginTop', 160);
                } else {
                    instance.header.removeClass('sticky');
                    instance.wrapper.css('marginTop', 0);
                }
            } else if(instance.header.filter(':visible').hasClass('header-simple')){
                hTopHeight = 0;
                if (winTop > hTopHeight) {
                    instance.header.addClass('sticky');
                    instance.wrapper.css('marginTop', hTopHeight);
                } else {
                    instance.header.removeClass('sticky');
                    instance.wrapper.css('marginTop', 0);
                }
            } else if(instance.header.filter(':visible').hasClass('sides')){
                if (winTop > 102) {
                    instance.header.addClass('sticky');
                    instance.wrapper.css('marginTop', 180);
                } else {
                    instance.header.removeClass('sticky');
                    instance.wrapper.css('marginTop', 0);
                }
            }
        },


        fNum: function(){
            var instance = this,
                numbS;

            if (instance.num.length > 0){

                instance.num.parent().each(function(){
                    var self = $(this),
                        winTop = $win.scrollTop(),
                        topPos = self.offset().top - $win.height(),
                        blHeight = self.height() - 100,
                        sectionTop = self.parents('.container').offset().top;

                    if (!self.hasClass('target')) {
                        self.find(instance.num).each(function(){
                            var $this = $(this),
                                numb = $this.data('num'),
                                incr = $this.data('increment'),
                                fractional = $this.data('fractional') ? $this.data('fractional') : 0,
                                i = 0,
                                timer;

                            if ( (winTop >= topPos && winTop <= (topPos + blHeight)) && !onMobile || (winTop <= sectionTop && (winTop+$win.height()) >= sectionTop)){
                                timer = setTimeout(function run() {
                                    if ( i < numb) i+=incr;
                                    else {
                                        i = numb;
                                        $this.text(i.toFixed(fractional).replace('.',',')
                                            .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
                                        return i;
                                    }
                                    $this.text(i.toFixed(fractional).replace('.',',')
                                        .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

                                    if ( instance.skillLine.length > 0){
                                        $this.parent().prev().animate({'width' : i + '%'}, 17);
                                    }

                                    timer = setTimeout(run, 20);
                                }, 20);

                                $this.parent().addClass('target');
                            }
                            else {
                                numbS = numb.toString().replace('.',',');
                                $this.text(numbS.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
                                if ( instance.skillLine.length > 0){
                                    $this.parent().prev().css('width', numb + '%');
                                }
                            }
                        });
                    }
                });

            }
        },
     
        fMiddle: function(){
            this.vmiddle.each(function(){
                var $this = $(this);
                if ( !$this.prev().length ){
                    $this.css({
                        'marginTop' : ($this.parent().outerHeight() - $this.outerHeight())/2
                    });
                } else{
                    $this.css({
                        'marginTop' : ($this.parent().outerHeight() - $this.outerHeight())/2 - $this.prev().css('paddingTop').replace('px','')
                    });
                }

            });
        },
        fSize: function(){
            this.fullsize.height($win.height());
            this.fullsize.find('li').height($win.height());
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);

(function ($) {
    $(document.body).Camaro();

    // *** crossbrowser html5 placeholder *** //
    var UA=window.navigator.userAgent,IEB=/MSIE 9/i,IE=UA.match(IEB);if(!IE==""){$("[placeholder]").focus(function(){var e=$(this);if(e.val()==e.attr("placeholder")){e.val("");e.removeClass("placeholder");}}).blur(function(){var e=$(this);if(e.val()===""||e.val()==e.attr("placeholder")){e.addClass("placeholder");e.val(e.attr("placeholder"));}}).blur().parents("form").submit(function(){$(this).find("[placeholder]").each(function(){var e=$(this);if(e.val()==e.attr("placeholder")){e.val("");}});});}

})(jQuery);

$(document).ready(function(){
    //social menu in post
    var expandsocial = $('.byline .more-social').on('click',function(event){
        event.stopPropagation();
        event.preventDefault();
        console.log('clicked social menu');
        $('.byline-social').slideToggle();
    });
    $(".byline-social").bind( "clickoutside", function(event){
        $(this).hide();
    });

    //special select
    $('select').niceSelect();
        
    //video play on clicking button
    $('.lg-video').on('click', function() {
        $(this).find('video').play();
    });
        
    //Vertical Tab
    $('#userprofile').easyResponsiveTabs({
        type: 'vertical', //Types: default, vertical, accordion
        width: 'auto', //auto or any width like 600px
        fit: true, // 100% fit in a container
        tabidentify: 'hor_1', // The tab groups identifier
        activetab_bg: '#333', 
        inactive_bg: '#9b9b9b'
    });
    
    //multiple selected buttons
    $( ".btn-day" ).click(function() {
        $( this ).toggleClass( "pushed" );
    });
});

/*------------------------------------------------------------------
 [ DEVELOPER LIFE (only for dev version) ]
 -------------------------------------------------------------------*/
/*
var addJS = function(){
        var scriptElement = document.createElement('script');
        scriptElement.setAttribute('src', 'js/palette.js');
        document.body.appendChild(scriptElement);
    },
    addCSS = function(){
        var cssElement = document.createElement('link');
        cssElement.setAttribute('rel', 'stylesheet');
        cssElement.setAttribute('href', 'css/themes.css');
        document.head.appendChild(cssElement);
    };

addCSS();
addJS();

// GOOGLE Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-46302488-10', 'auto');
ga('send', 'pageview');
*/
