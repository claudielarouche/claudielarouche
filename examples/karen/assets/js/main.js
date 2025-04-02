jQuery(function($) {
    "use strict";
    /*	Table OF Contents
	==========================
	1-Menu
	2-Home slider
	3-Custome Select
	4-popover
	5-Parallax
	6-Portfolio
	7-Testimonial Slider
	8-Twitter
	9-Tabs
	10-Accordain
	11-Masonry blog
	12-Label as Placeholder
	13-Countdown
	14-flicker
	15-Google map
	/*==============================
	1-Menu
	=============================*/
	 var xv_ww=$(window).width(),xv_slideshow=true;
    $(window).on('resize load', function() {
        xv_ww = $(window).width();
        if(xv_ww <= 1030) {
            $('.responsive-menu').removeClass('xv-menuwrapper').addClass('dl-menuwrapper');
            $('.lg-submenu').addClass("dl-submenu");
        } else {
            $('.responsive-menu').removeClass('dl-menuwrapper').addClass('xv-menuwrapper');
            $('.lg-submenu').removeClass("dl-submenu");
        }
        $("#sticktop").sticky({
            topSpacing: 0
        });
    });
    $('#dl-menu').dlmenu({
        animationClasses: {
            classin: 'dl-animate-in-5',
            classout: 'dl-animate-out-5'
        }
    });
    /*============================
	2-Home slider
	===========================*/
	if(xv_ww<=768)
	xv_slideshow=false;
    $('#home-slider').flexslider({
        animation: "slide",
        directionNav: true,
        controlNav: true,
        pauseOnHover: true,
        slideshowSpeed: 7000,
        slideshow: xv_slideshow,
        direction: "horizontal", //Direction of slides
        start: function() {
            $(window).trigger('resize');
			if(xv_ww>=768)
            $('.xv_slider .animated').addClass("go").removeClass("goAway");
        },
        before: function() {
			if(xv_ww>=768)
            $('.xv_slider .animated').addClass("goAway").removeClass("go");
        },
        after: function() {
			if(xv_ww>=768)
            $('.xv_slider .animated').addClass("go").removeClass("goAway");
        },
    });
    if($('.xv_slider').length !== 0) {
        $('.xv_slide').each(function() {
            $(this).css('background-image', function() {
                return $(this).attr('data-slideBg');
            });
        });
    }
    /*=======================
	3-Custome Select
	=========================*/
    $('.custome-select select').on('change', function() {
        var p = $(this).parent(".custome-select");
        p.find('span').html($(this).val() + ' <b class="xv-angle-down"></b>');
    });
    /*============================
	4-popover
	============================*/
    $('.popover-element').popover({
        trigger: 'focus'
    });
	if(xv_ww>1024){
		$('.cart-look').hover(function(){
			$('.widget-cart-items').addClass('active');
		},function(){
			$('.widget-cart-items').removeClass('active');
		});
	}else if(xv_ww <= 1024){
		$('.cart-look').click(function(e){
			e.preventDefault();
			if(!$('.widget-cart-items').hasClass('active'))
			$('.widget-cart-items').addClass('active');
			else
			$('.widget-cart-items').removeClass('active');
		});
	}
	
	$('body').click(function(e){
	  if($(e.target).closest('.cart-look').length === 0){
		$('.widget-cart-items').removeClass('active');
	  }
	});
    /*=======================================
	5-Parallax
	=======================================*/
	if(xv_ww>=768){
		$.stellar({
			horizontalScrolling: false,
			verticalOffset: 0,
			responsive: true,
		});
	}
    /*==============================
	6-Portfolio
	============================*/
    $('#project-wrapper').waitForImages(function() {
        $('#project-wrapper').carouFredSel({
            width: "100%",
            circular: false,
            infinite: false,
            auto: false,
            align: "center",
            scroll: {
                items: 1,
                easing: "linear"
            },
            prev: {
                button: "#portfolio-prev",
                key: "left"
            },
            next: {
                button: "#portfolio-next",
                key: "right"
            }
        });
    });
    /*==========Portfolio Filter===================*/
    var $containerfolio = $('.projects');
    $containerfolio.waitForImages(function() {
        if($containerfolio.length) {
            $containerfolio.isotope({
                layoutMode: 'fitRows',
                filter: '*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
        }
    });
    $('.project-filter li').click(function() {
        $('.project-filter li').removeClass("active");
        $(this).addClass("active");
        var selector = $(this).attr('data-filter');
        $containerfolio.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });
    /*Case Slider*/
    $('#case-slider').flexslider({
        animation: "slide",
        directionNav: false,
        controlNav: false,
        pauseOnHover: true,
        slideshowSpeed: 7000,
        slideshow: true,
        direction: "horizontal", //Direction of slides
    });
    var $showcasestudy = $('#case-slider');
    $('#case-next').click(function() {
        $showcasestudy.flexslider("next");
    });
    $('#case-prev').click(function() {
        $showcasestudy.flexslider("prev");
    });
    /*=================================
	7-Testimonial Slider
	==============================*/
    $('#testimonial-slider').flexslider({
        animation: "slide",
        directionNav: false,
        controlNav: true,
        pauseOnHover: true,
        slideshowSpeed: 4000,
        slideshow: true,
        direction: "horizontal", //Direction of slides
    });
    var isSlider = false;
    $('#testimonial-slider-style2').flexslider({
        animation: "slide",
        slideshow: false,
        directionNav: false,
        controlNav: false,
        pauseOnHover: true,
        slideshowSpeed: 4000,
        direction: "horizontal", //Direction of slides
        start: function() {
            isSlider = true;
        },
    });
    $('.testimonial-slider-coltrols li').click(function() {
        if(isSlider) {
            $('#testimonial-slider-style2').flexslider($(this).index());
        }
    });
    $('.testimonial-slider-coltrols li').click(function() {
        $('.testimonial-slider-coltrols li').removeClass('active');
        $(this).addClass('active');
        $('#testimonial-slider-style2').flexslider($(this).index());
    });
    /*============================
	8-Twitter
	============================*/
    if($('.latest-tweet').length != 0) {
        $('.latest-tweet').twittie({
            username: 'envato',
            dateFormat: '%b. %d, %Y',
            template: '<div class="tweet-wrap">{{tweet}} <time class="timestamp">{{date}}</time></div>',
            count: 5,
            apiPath: "assets/php/tweet_api/tweet.php",
        }, function() {
            $(".latest-tweet ul").addClass("slides");
            $("#tweet-slider").flexslider({
                animation: "slide",
                directionNav: false,
                controlNav: false,
                pauseOnHover: true,
                slideshowSpeed: 6000,
            });
        });
    }
    /*=======================================
	9-Tabs
	=========================================*/
    $('.nav-tabs a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $("a[data-rel^='prettyPhoto']").prettyPhoto({
        social_tools: false
    });
    /*==================================
	 10-Accordain
	 ====================================*/
    $("#accordion1").collapse();
    $('.panel-title > a').click(function() {
        var $parent = $(this).parents('.panel-group');
        $parent.find('.accordain-icon').removeClass('fa-minus').addClass('fa-plus');
        $(this).find('.accordain-icon').removeClass('fa-plus').addClass('fa-minus');
    });
    /*==================================
	11-Masonry blog
	====================================*/
    $('.masonry-container').waitForImages(function() {
        $('.masonry-container').show();
        $('.masonry-container').masonry({
            itemSelector: '.blog-unit'
        });
    });
	$('.masonry-testimonials').waitForImages(function() {
        $('.masonry-testimonials').masonry({
            itemSelector: '.testimonial-post'
        });
    });
	
	/*=======================================
	12-Label as Placeholder
	=========================================*/
	$('.sb_input').focus(function(){
			$('label[for='+$(this).attr("id")+']').hide();
	});
	$('.sb_input').blur(function(){
		if($(this).val()===""){
			$('label[for='+$(this).attr("id")+']').show();
		}
	});
	
	/*=======================================
	13-Countdown
	=========================================*/
	var eventDate = $('#counter').data('date');
	var targetDate = new Date(eventDate),
	finished = false,
	availiableExamples = {
		set15daysFromNow: 15 * 24 * 60 * 60 * 1000,
		set5minFromNow  : 5 * 60 * 1000,
		set1minFromNow  : 1 * 60 * 1000
	};
	function callback(event) {
		var $this = $(this);
		switch(event.type) {
			case "seconds":
			case "minutes":
			case "hours":
			case "days":
			case "weeks":
			case "daysLeft":
				$this.find('div span#'+event.type).html(event.value);
				if(finished) {
					$this.fadeTo(0, 1);
					finished = false;
				}
	
				break;
			case "finished":
				$this.fadeTo('slow', .5);
				finished = true;
				break;
		}
	}
	$('#counter').countdown(targetDate.valueOf(), callback);
	
	/*=======================================
	14-flicker
	=========================================*/
	 $('#flicker-feed').jflickrfeed({
        limit: 6,
        qstrings: {
            id: '52617155@N08'
        },
        itemTemplate: '<li><a href="{{image_b}}" data-rel="prettyPhoto"><img alt="{{title}}" src="{{image_s}}" /></a></li>'
    }, function () {
        $("a[data-rel^='prettyPhoto']").prettyPhoto();
    });
    /*=======================================
	15-Google map
	=========================================*/
    if($('.g-map').length) {
		$('.g-map').each(function(index, element) {
            var map_selector = $(this).data('id'),
            mapAddress = $(this).data('address'),
            mapType = $(this).data('maptype'),
            zoomLvl = $(this).data('zoomlvl');
			$(this).attr('id',map_selector);
        	contactemaps(map_selector, mapAddress, mapType, zoomLvl);
        });
        
    }
    function contactemaps(selector, address, type, zoom_lvl) {
        var map = new google.maps.Map(document.getElementById(selector), {
            mapTypeId: google.maps.MapTypeId.type,
            scrollwheel: false,
            draggable: false,
            zoom: zoom_lvl,
        });
        var map_pin = "assets/img/basic/pin.png";
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
                'address': address
            },
            function(results, status) {
                if(status === google.maps.GeocoderStatus.OK) {
                    new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                        icon: map_pin
                    });
                    map.setCenter(results[0].geometry.location);
                }
            });
    }
});