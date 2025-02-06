$(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop()) {
            $("#cintillo-banner").addClass("fadeout");
        } else {
            $("#cintillo-banner").removeClass("fadeout");
            $("#cintillo-banner").addClass("fadein");
        }
    })


    $(window).scroll(function() {
        $("#cintillo-banner-responsive").css("opacity", 1 - $(window).scrollTop() / 250);
    });



})