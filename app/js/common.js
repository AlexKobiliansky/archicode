$(document).ready(function(){

    /** mobile-mnu customization */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /** end mobile-mnu customization */

    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    function drawCircle() {
        $('.intro-slider .owl-dot.active').circleProgress({
            fill: "#fff",
            value: 0.63,
            size: 36,
            thickness: 1,
            emptyFill: "rgba(255, 255, 255, 0)",
            startAngle: 4.7,
            animation: {
                duration: 400
            }
        });

        $('.intro-slider .owl-dot.active').circleProgress('redraw')
    }

    let owl = $('.intro-slider');
    let $introCurrent = $('#intro-current');
    let $introTotal = $('#intro-total');
    let $slides = owl.find('.intro-slide').length;



    owl.on('initialized.owl.carousel', function(){

        setTimeout(drawCircle, 300);
        $introTotal.text($slides);

    })


    owl.owlCarousel({
        loop:false,
        nav:true,
        items: 1,
        dots: true,
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        mouseDrag: false,
        touchDrag: false,
        smartSpeed:700,
        navText: false,
        responsive: {
            0: {
                nav: false
            },
            1300: {
                nav: true
            }
        }
    });

    owl.on('changed.owl.carousel', function(e) {

        let currentItem = e.item.index + 1;
        $introCurrent.text(currentItem);

        drawCircle();
    });

    var waypoints = $('.nums-wrap').waypoint(function(direction) {
        $('.num-item-val').each(function(){
            var $val = $(this).data("value");
            $(this).animateNumber(
                {
                    number: $val,
                },
                2600
            );
        });
        this.destroy();
    }, {
        offset: '50%'
    });


    $('.project-items-tabs').tabs();

    $('.s-form').parallax({
        bleed: '50',
    });


    var uPhone = $('.user-phone');
    uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    $('input[type="checkbox"]').styler();


    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });
});
