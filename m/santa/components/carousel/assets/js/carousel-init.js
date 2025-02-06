$(document).ready(init);
$(window).resize(resize);

function init(){
    carouselHeader();
    carouselBeneficios();
    carouselMasBeneficios();
}

function resize(){
    carouselBeneficios();
    carouselMasBeneficios();
}

function carouselHeader() {
    let slides = $('.section-header .owl-carousel > div').length;
    let autoplay = $(".section-header .owl-carousel").data("autoplay") != null ? true : false;
    let showDot = true;
    let showNav = true;
    let showLoop = true;

    if(slides == 1) {
        showDot = false;
        showNav = false;
        showLoop = false;
    }

    $('.section-header .owl-carousel').owlCarousel({
        /* animateOut: 'slideOutDown',
        animateIn: 'flipInX', */
        smartSpeed: 450,
        loop: showLoop,
        responsiveClass: true,
        navText: ["<img src='/components/carousel/assets/img/left.png'>","<img src='/components/carousel/assets/img/right.png'>"],
        autoHeight:true,
        dots: showDot,
        nav:showNav,
        responsive:{
            0:{
                items:1
            },
            992: {
                items:1,
                autoplay: autoplay,
                autoplayTimeout: 5000,
                autoplayHoverPause: false
            }
        }
    });
}

function carouselBeneficios() {
    var checkWidth = $(window).width();
    if (checkWidth > 767) 
    {
        $(".owl-beneficios").owlCarousel("destroy");
    } 
    else if (checkWidth <= 767) 
    {   
        $(".owl-beneficios").owlCarousel({
            smartSpeed: 450,
            loop: false,
            responsiveClass: true,
            autoHeight: false,
            navText: ["",""],
            dots: true,
            nav: true,
            responsive:{
                0:{
                    items:1
                }
            }
        });
    }
}

function carouselMasBeneficios() {
    var checkWidth = $(window).width();
    if (checkWidth > 767) {
        $(".owl-mas-beneficios").owlCarousel("destroy");
    } else if (checkWidth <= 767) {
        $(".owl-mas-beneficios").owlCarousel({
            smartSpeed: 450,
            loop: false,
            dots: true,
            nav: true,
            responsiveClass: true,
            navText: ["", ""],
            autoHeight: false,
            responsive: {
                0: {
                    items: 1
                }
            }
        });
    }
}