jQuery(document).ready(function ($) {

  $('#checkbox').change(function(){
    setInterval(function () {
        moveRight();
    }, 3000);
  });
  
    var slideCount = $('#slider ul li').length;
    var slideWidth = $('#slider ul li').width();
    var slideHeight = $('#slider ul li').height();
    var sliderUlWidth = slideCount * slideWidth;
    
    $('#slider').css({ width: slideWidth, height: slideHeight });
    
    $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
    
    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('.control_prev').click(function () {
        moveLeft();
    });

    $('.control_next').click(function () {
        moveRight();
    });

}); 



$(window).scroll(function(){
    if ($(window).scrollTop() >= 52) {
       $('header nav').addClass('fixed-header');
    }
    else {
       $('header nav').removeClass('fixed-header');
    }
});



;(function ($) {

    var headerFixed = function () {
        if ($('body').hasClass('Body_stick')) {
            var nav = $('#header');

            if (nav.size() !== 0) {
                var offsetTop = $('#header').offset().top,
                    headerHeight = $('#header').height(),
                    injectSpace = $('<div />', { height: 100 }).insertAfter(nav);
                    injectSpace.hide();

                 $(window).on('load scroll', function(){
                    if ( $(window).scrollTop() > offsetTop ) {
                        if ( $('#header').hasClass('header-classic') ) {
                            injectSpace.show();
                        }
                        $('#header').addClass('downscrolled');                        
                    } else {
                        $('#header').removeClass('header-small downscrolled');
                        injectSpace.hide();
                    }                    
                })

            }
        }
    };

    var responsiveMenu = function() {
        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var currMenuType = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                currMenuType = 'mobile';
            }

            if ( currMenuType !== menuType ) {
                menuType = currMenuType;

                if ( currMenuType === 'mobile' ) {
                    var $mobileMenu = $('#mainnav').attr('id', 'mainnav-mobi').hide();
                    var hasChildMenu = $('#mainnav-mobi').find('li:has(ul)');

                    $('#header').after($mobileMenu);
                    hasChildMenu.children('ul').hide();
                    hasChildMenu.children('a').after('<span class="btn-submenu"></span>');
                    $('.btn-menu').removeClass('active');
                } else {
                    var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');

                    $desktopMenu.find('.submenu').removeAttr('style');
                    $('#header').find('.nav-wrap').append($desktopMenu);
                    $('.btn-submenu').remove();
                }
            }
        });

        $('.btn-menu').on('click', function() {         
            $('#mainnav-mobi').slideToggle(300);
            $(this).toggleClass('active');
        });

        $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
            $(this).toggleClass('active').next('ul').slideToggle(300);
            e.stopImmediatePropagation()
        });
    };

    var topSearch = function () {
        $('.show-search').on('click', function (e) {
            if (!$('.top-search').hasClass('show')) {
                $('.top-search').addClass('show');
                e.preventDefault();
            } else {
                $('.top-search').removeClass('show');
                e.preventDefault();
            }
            if (!$('.show-search').hasClass('active')) {
                $('.show-search').addClass('active');
            } else {
                $('.show-search').removeClass('active');
            }
        });
    }

    var ajaxContactForm = function() {  
        $('#contactform').each(function() {
            $(this).validate({
                submitHandler: function( form ) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $('<div />', { 'class': 'loading' });

                    $.ajax({
                        type: "POST",
                        url:  $form.attr('action'),
                        data: str,
                        beforeSend: function () {
                            $form.find('.form-submit').append(loading);
                        },
                        success: function( msg ) {
                            var result, cls;                            
                            if ( msg === 'Success' ) {result = 'Message Sent Successfully To Email Administrator. ( You can change the email management a very easy way to get the message of customers in the user manual )'; cls = 'msg-success'; } else {result = 'Error sending email.'; cls = 'msg-error'; } $form.prepend(
                                $('<div />', {
                                    'class': 'flat-alert ' + cls,
                                    'text' : result
                                }).append(
                                    $('<a class="close" href="#"><i class="fa fa-close"></i></a>')
                                )
                            );

                            $form.find(':input').not('.submit').val('');
                        },
                        complete: function (xhr, status, error_thrown) {
                            $form.find('.loading').remove();
                        }
                    });
                }
            });
        }); // each contactform
    };   

    var alertBox = function() {
        $(document).on('click', '.close', function(e) {
            $(this).closest('.flat-alert').remove();
            e.preventDefault();
        })     
    }; 

    var googleMap = function () {
        // gmap default
        if ($().gmap3) {
            var data = JSON.parse('[{"address":"Dennis P. Collins Park, Bayonne, NJ 07002, USA","content":""}]');
            $(".maps")
                .gmap3({
                    map: {
                        options: {
                            zoom: 15,
                            center: [40.6463712, -74.1415158],
                            mapTypeId: 'Ibox',
                            mapTypeControlOptions: {
                                mapTypeIds: ['Ibox', google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID]
                            },
                            scrollwheel: true
                        },
                    },
                });

        }
        // json loop
        $.each(data, function (key, val) {
            $('.maps').gmap3({
                marker: {
                    values: [{
                        address: val.address,
                        options: {
                            icon: "./images/maps/logo-icon.png"
                        },
                        events: {
                            mouseover: function () {
                                $(this).gmap3({
                                    overlay: {
                                        address: val.address,
                                        options: {
                                            content: "<div class='infobox text-center'><ul class='list-address'><li>Dennis P. Collins Park, Bayonne, NJ 07002, USA</li></ul><div class='clearfix'></div></div>",
                                            offset: {
                                                y: 25,
                                                x: -160

                                            }
                                        }
                                    }
                                });
                            },
                            mouseout: function () {
                                $('.infobox').each(function () {
                                    $(this).remove();
                                });
                            }
                        }
                        }]
                },
                styledmaptype: {
                    id: "Ibox",
                    options: {
                        name: "Ibox Maps"
                    },
                    styles: [
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#e9e9e9"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f5f5f5"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 29
                                },
                                {
                                    "weight": 0.2
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 18
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f5f5f5"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "featureType": "poi.park",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#dedede"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "saturation": 36
                                },
                                {
                                    "color": "#333333"
                                },
                                {
                                    "lightness": 40
                                }
                            ]
                        },
                        {
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f2f2f2"
                                },
                                {
                                    "lightness": 19
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#fefefe"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#fefefe"
                                },
                                {
                                    "lightness": 17
                                },
                                {
                                    "weight": 1.2
                                }
                            ]
                        }
                    ]
                }
            });
        });
    }

    var ajaxSubscribe = {
        obj: {
            subscribeEmail    : $('#subscribe-email'),
            subscribeButton   : $('#subscribe-button'),
            subscribeMsg      : $('#subscribe-msg'),
            subscribeContent  : $("#subscribe-content"),
            dataMailchimp     : $('#subscribe-form').attr('data-mailchimp'),
            success_message   : '<div class="notification_ok">Thank you for joining our mailing list! Please check your email for a confirmation link.</div>',
            failure_message   : '<div class="notification_error">Error! <strong>There was a problem processing your submission.</strong></div>',
            noticeError       : '<div class="notification_error">{msg}</div>',
            noticeInfo        : '<div class="notification_error">{msg}</div>',
            basicAction       : 'mail/subscribe.php',
            mailChimpAction   : 'mail/subscribe-mailchimp.php'
        },

        eventLoad: function() {
            var objUse = ajaxSubscribe.obj;

            $(objUse.subscribeButton).on('click', function() {
                if ( window.ajaxCalling ) return;
                var isMailchimp = objUse.dataMailchimp === 'true';

                if ( isMailchimp ) {
                    ajaxSubscribe.ajaxCall(objUse.mailChimpAction);
                } else {
                    ajaxSubscribe.ajaxCall(objUse.basicAction);
                }
            });
        },

        ajaxCall: function (action) {
            window.ajaxCalling = true;
            var objUse = ajaxSubscribe.obj;
            var messageDiv = objUse.subscribeMsg.html('').hide();
            $.ajax({
                url: action,
                type: 'POST',
                dataType: 'json',
                data: {
                   subscribeEmail: objUse.subscribeEmail.val()
                },
                success: function (responseData, textStatus, jqXHR) {
                    if ( responseData.status ) {
                        objUse.subscribeContent.fadeOut(500, function () {
                            messageDiv.html(objUse.success_message).fadeIn(500);
                        });
                    } else {
                        switch (responseData.msg) {
                            case "email-required":
                                messageDiv.html(objUse.noticeError.replace('{msg}','Error! <strong>Email is required.</strong>'));
                                break;
                            case "email-err":
                                messageDiv.html(objUse.noticeError.replace('{msg}','Error! <strong>Email invalid.</strong>'));
                                break;
                            case "duplicate":
                                messageDiv.html(objUse.noticeError.replace('{msg}','Error! <strong>Email is duplicate.</strong>'));
                                break;
                            case "filewrite":
                                messageDiv.html(objUse.noticeInfo.replace('{msg}','Error! <strong>Mail list file is open.</strong>'));
                                break;
                            case "undefined":
                                messageDiv.html(objUse.noticeInfo.replace('{msg}','Error! <strong>undefined error.</strong>'));
                                break;
                            case "api-error":
                                objUse.subscribeContent.fadeOut(500, function () {
                                    messageDiv.html(objUse.failure_message);
                                });
                        }
                        messageDiv.fadeIn(500);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('Connection error');
                },
                complete: function (data) {
                    window.ajaxCalling = false;
                }
            });
        }
    };

    var equalHeight = function () {
        $('.flat-awards').each(function () {
            $(this).children('.awards').matchHeight();
        });
    }

    var counters = function () {
        $('.number-counter').each(function () {
            $('.number-counter').countTo();
        });
    }

    var flatAccordion = function () {
        var args = {
            duration: 600
        };
        $('.flat-toggle .toggle-title.active').siblings('.toggle-content').show();

        $('.flat-toggle .enable .toggle-title').on('click', function () {
            $(this).closest('.flat-toggle ').find('.toggle-content').slideToggle(args);
            $(this).toggleClass('active');
        }); // toggle 

        $('.flat-accordion .toggle-title').on('click', function () {
            if (!$(this).is('.active')) {
                $(this).closest('.flat-accordion').find('.toggle-title.active').toggleClass('active').next().slideToggle(args);
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            } else {
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            }
        }); // accordion
    }

    var flatImage = function () {
        $('.flat-image').each(function () {
            if ($().owlCarousel) {
                $(this).find('.box-image').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: $('.box-image').data('nav'),
                    dots: $('.box-image').data('dots'),
                    autoplay: $('.box-image').data('auto'),
                    responsive: {
                        0: {
                            items: 1
                        },
                        767: {
                            items: 1
                        },
                        991: {
                            items: 1
                        },
                        1200: {
                            items: $('.box-image').data('item')
                        }
                    }
                });
            }
        });
    }

    var portfolioIsotope = function () {
        if ($().isotope) {
            var $container = $('.portfolio-content');
            $container.imagesLoaded(function () {
                $container.isotope({
                    itemSelector: '.portfolio-item',
                    transitionDuration: '1s'
                });
            });

            $('.portfolio-filter li').on('click', function () {
                var selector = $(this).find("a").attr('data-filter');
                $('.portfolio-filter li').removeClass('active');
                $(this).addClass('active');
                $container.isotope({
                    filter: selector
                });
                return false;
            });
        };
    }

    var flatGallery = function () {
        $('.flat-row').each(function () {
            if ($().owlCarousel) {
                $(this).find('.gallery').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: $('.gallery').data('nav'),
                    dots: $('.gallery').data('dots'),
                    autoplay: $('.gallery').data('auto'),
                    autoplayTimeout: 3000,
                    animateOut: 'lightSpeedOut',
                    animateIn: 'zoomIn',
                    responsive: {
                        0: {
                            items: 1
                        },
                        767: {
                            items: 1
                        },
                        991: {
                            items: 1
                        },
                        1200: {
                            items: $('.gallery').data('item')
                        }
                    }
                });
            }
        });
    }

    var FlexPortfolio = function() {
        $('.flex-portfolio').each(function(){
            $(this).children('#portfolio-carousel').flexslider({
                animation: "slide",
                controlNav: false,
                controldot: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: 371,
                itemMargin: 30,
                directionNav: false,
                asNavFor: $(this).children('#portfolio-slider'),
                prevText: '<i class="fa fa-angle-left"></i>',
                nextText: '<i class="fa fa-angle-right"></i>'
            });
            
            $(this).children('#portfolio-slider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: true,
                slideshow: false,
                controldot: false,
                directionNav: true,
                sync: $(this).children('#portfolio-carousel'),
                prevText: '<i class="fa fa-angle-left"></i>',
                nextText: '<i class="fa fa-angle-right"></i>'
            });
        });
    };

    var flatPartner = function () {
        $('.flat-row').each(function () {
            if ($().owlCarousel) {
                $(this).find('.flat-partner').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: $('.flat-partner').data('nav'),
                    dots: $('.flat-partner').data('dots'),
                    autoplay: $('.flat-partner').data('auto'),
                    autoplayTimeout: 3000,
                    responsive: {
                        0: {
                            items: 2
                        },
                        480:{
                            items: 2
                        },
                        767: {
                            items: 3
                        },
                        991: {
                            items: 4
                        },
                        1200: {
                            items: $('.flat-partner').data('item')
                        }
                    }
                });
            }
        });
    }

    var flatTestimonials = function () {
        $('.flat-row').each(function () {
            if ($().owlCarousel) {
                $(this).find('.flat-testimonials').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: $('.flat-testimonials').data('nav'),
                    dots: $('.flat-testimonials').data('dots'),
                    autoplay: $('.flat-testimonials').data('auto'),
                    responsive: {
                        0: {
                            items: 1
                        },
                        767: {
                            items: 1
                        },
                        991: {
                            items: 1
                        },
                        1200: {
                            items: $('.flat-testimonials').data('item')
                        }
                    }
                });
            }
        });
    };

    var hoverEffect = function () {
        $(function () {
            $('#data-awards > li').each(function () {
                $(this).hoverdir({
                    hoverDelay: 75,
                    hoverElem: '.awards-effect'
                });
            });
            $('#team-effect .team-member').each(function () {
                $(this).hoverdir({
                    hoverDelay: 15,
                    hoverElem: '.overlay-effect'
                });
            });
            $('#service-effect .our-service').each(function () {
                $(this).hoverdir({
                    hoverDelay: 75,
                    hoverElem: '.service-effect'
                });
            });
            $('#price-effect .flat-price').each(function () {
                $(this).hoverdir({
                    hoverDelay: 75,
                    hoverElem: '.overlay-effect'
                });
            });
            $('#portfolio-effect .portfolio-item').each(function () {
                $(this).hoverdir({
                    hoverDelay: 75,
                    hoverElem: '.overlay-effect'
                });
            });
            $('#data-iconbox li').each(function () {
                $(this).hoverdir({
                    hoverDelay: 115,
                    hoverElem: '.overlay-effect'
                });
            });
        });
    }

    var goTop = function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('.go-top').addClass('show');
            } else {
                $('.go-top').removeClass('show');
            }
        });

        $('.go-top').on('click', function () {
            $("html, body").animate({
                scrollTop: 0
            }, 1000 , 'easeInOutExpo');
            return false;
        });

        $('.btn-arrow').on('click',function() {
            var anchor = $(this).attr('href').split('#')[1];

            $(this).parent()
                .addClass('current-menu-item')
                .siblings()
                    .removeClass('current-menu-item');

            if ( anchor ) {
                if ( $('#'+anchor).length > 0 ) {
                    var headerHeight = 0;

                    if ( $('body').hasClass('Body_stick')) 
                        headerHeight = $('#header').height();

                    var target = $('#' + anchor).offset().top - headerHeight;

                    $('html,body').animate({scrollTop: target}, 1000, 'easeInOutExpo');
                    
               }
            }
            return false;
            })
    }

    var retinaLogos = function() {
      var retina = window.devicePixelRatio > 1 ? true : false;
      if(retina) {
        if ( $('header').hasClass('logo-style2') ) {
            $('.header .logo').find('img').attr({src:'./images/logo2@2x.png',width:'126',height:'47'});  
        }

        if ( $('header').hasClass('logo-style1') ) {
            $('.header .logo').find('img').attr({src:'./images/logo@2x.png',width:'126',height:'47'});
        }

        if ( $('header').hasClass('logo-style3') ) {
            $('.header .logo').find('img').attr({src:'./images/logo3@2x.png',width:'126',height:'47'});
        }

        if ( $('footer').hasClass('logo-style3') ) {
            $('.footer .logo').find('img').attr({src:'./images/logo3@2x.png',width:'126',height:'47'});
        }

            
        }
    };

    var removePreloader = function () {
        $(window).on('load', function () {
            setTimeout(function () {
                $('.loading-overlay').hide();
            }, 1500);
        });
    }

    // Dom Ready
    $(function () {
        if ( matchMedia( 'only screen and (min-width: 991px)' ).matches ) {
            headerFixed(); 
        }
        
        topSearch();
        ajaxContactForm();
        alertBox();
        responsiveMenu();
        googleMap();
        ajaxSubscribe.eventLoad();
        equalHeight();
        counters();
        FlexPortfolio();
        flatAccordion();
        flatImage();
        portfolioIsotope();
        flatGallery();
        flatTestimonials();
        flatPartner();
        goTop();
        retinaLogos();
        removePreloader();
        hoverEffect();
    });
})(jQuery);
