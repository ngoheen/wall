/*! lg-share - v1.0.2 - 2016-11-26
* http://sachinchoolur.github.io/lightGallery
* Copyright (c) 2016 Sachin N; Licensed GPLv3 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(['jquery'], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(this, function ($) {

(function() {

    'use strict';

    var defaults = {
        share: true,
        facebook: true,
        facebookDropdownText: 'Facebook',
        twitter: true,
        twitterDropdownText: 'Twitter',
        googlePlus: true,
        googlePlusDropdownText: 'GooglePlus',
        pinterest: true,
        pinterestDropdownText: 'Pinterest',
        buy: true,
        tumbler: true,
        tumblerDropdownText: 'Tumbler'
    };

    var Share = function(element) {

        this.core = $(element).data('lightGallery');

        this.core.s = $.extend({}, defaults, this.core.s);
        if (this.core.s.share) {
            this.init();
        }

        return this;
    };


    Share.prototype.init = function() {
        var _this = this;
        var shareHtml = '<div class="bottom-tool-bar"><ul class="lg-share-list pull-left"><li>Share</li>';
        shareHtml += _this.core.s.facebook ? '<li class="face"><a id="lg-share-facebook" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>' : '';
        shareHtml += _this.core.s.twitter ? '<li class="twit"><a id="lg-share-twitter" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>' : '';
         shareHtml += '<li class="insta"><a href=""><i class="fa fa-instagram" aria-hidden="true"></i></a></li>';
        shareHtml += '<li class="more-social"><a href=""><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a></li>';
       // shareHtml += _this.core.s.googlePlus ? '<li><a id="lg-share-googleplus" target="_blank"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>' : '';
       // shareHtml += _this.core.s.pinterest ? '<li><a id="lg-share-pinterest" target="_blank"><i class="fa fa-pinterest" aria-hidden="true"></i></a></li>' : '';
        shareHtml += '</ul></span></div>';
        //shareHtml += _this.core.s.buy ? '<ul class="buy-share"><li class="buy-btn">Buy</li></ul></div>' : '';


        this.core.$outer.find('.lg').after(shareHtml);
        this.core.$outer.find('.lg').append('<ul class="expand-social"><li><a class="grey" href="">Google +</a></li><li><a class="grey" href="">Pinterest</a></li><li><a class="grey" href="">Tumblr</a></li><li><a class="grey" href="">Instagram</a></li><li><a class="grey" href="">Email</a></li><li><a class="grey" href="">Print</a></li></ul>');
        $('li.more-social').on('click', function(event){
            event.stopPropagation();
            event.preventDefault();
            console.log('clicked social');
            $('.expand-social').slideToggle();
        });
        //this.core.$outer.find('.lg').append('<div id="lg-dropdown-overlay"></div>');
        //$('#lg-share').on('click.lg', function(){
        //    _this.core.$outer.toggleClass('lg-dropdown-active');
        //});

        //$('#lg-dropdown-overlay').on('click.lg', function(){
         //   _this.core.$outer.removeClass('lg-dropdown-active');
       // });

        _this.core.$el.on('onAfterSlide.lg.tm', function(event, prevIndex, index) {

            setTimeout(function() {
               // $('#lg-share-facebook').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + (encodeURIComponent(_this.core.$items.eq(index).attr('data-facebook-share-url') || window.location.href)));
                $('#lg-share-face').attr('href', 'https://www.facebook.com/sharer/sharer.php?description=' + (encodeURIComponent(_this.core.$items.eq(index).find('img').attr('alt'))) + '&u=' + (encodeURIComponent(_this.core.$items.eq(index).attr('data-facebook-share-url') || window.location.href)) + '&picture=' + (encodeURIComponent(base_url + '/' + (_this.core.$items.eq(index).attr('data-src')))));
                $('#lg-share-twitter').attr('href', 'https://twitter.com/intent/tweet?text=' + _this.core.$items.eq(index).attr('data-tweet-text') + '&url=' + (encodeURIComponent(_this.core.$items.eq(index).attr('data-twitter-share-url') || window.location.href)));

                $('#lg-share-googleplus').attr('href', 'https://plus.google.com/share?url=' + (encodeURIComponent(_this.core.$items.eq(index).attr('data-googleplus-share-url') || window.location.href)));

                $('#lg-share-pinterest').attr('href', 'http://www.pinterest.com/pin/create/button/?url=' + (encodeURIComponent(_this.core.$items.eq(index).attr('data-pinterest-share-url') || window.location.href)) + '&media=' + encodeURIComponent(_this.core.$items.eq(index).attr('href') || _this.core.$items.eq(index).attr('data-src')) + '&description=' + _this.core.$items.eq(index).attr('data-pinterest-text'));
                //window.open('http://www.tumblr.com/share?v=3&u='+encodeURIComponent(u)+'&t='+encodeURIComponent(u),'tumblr','toolbar=0,status=0,width=626,height=436');
            }, 100);
        });
    };

    Share.prototype.destroy = function() {

    };

    $.fn.lightGallery.modules.share = Share;

})();



}));
