// Iterate over each select element
$('select').each(function () {

    // Cache the number of options
    var $this = $(this),
        numberOfOptions = $(this).children('option').length;

    // Hides the select element
    $this.addClass('s-hidden');

    // Wrap the select element in a div
    $this.wrap('<div class="select"></div>');

    // Insert a styled div to sit over the top of the hidden select element
    $this.after('<div class="styledSelect"></div>');

    // Cache the styled div
    var $styledSelect = $this.next('div.styledSelect');

    // Show the first select option in the styled div
    $styledSelect.text($this.children('option').eq(0).text());

    // Insert an unordered list after the styled div and also cache the list
    var $list = $('<ul />', {
        'class': 'options'
    }).insertAfter($styledSelect);

    // Insert a list item into the unordered list for each select option
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    // Cache the list items
    var $listItems = $list.children('li');

    // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
    $styledSelect.click(function (e) {
        e.stopPropagation();
        $('div.styledSelect.active').each(function () {
            $(this).removeClass('active').next('ul.options').hide();
        });
        $(this).toggleClass('active').next('ul.options').toggle();
    });

    // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
    // Updates the select element to have the value of the equivalent option
    $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        /* alert($this.val()); Uncomment this for demonstration! */
    });

    // Hides the unordered list when clicking outside of it
    $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});






$( document ).ready(function() {

    $('#remove-credit-card-button').click(function() {
        $('#remove-credit-card').addClass('hide');
        $('#add-credit-card').removeClass('hide');
        $('.premier-account-default').removeClass('hide');
        $('.premier-account-card').addClass('hide');
    });


    $('#almost-there').click(function() {
        $('#related-products').slideDown();
    });


    $('.call-button').click(function() {
        $('.click-to-call-box').toggleClass('hide');
    });
    


// Index Page
    $('.account-choice').click(function() {
        $('.step-1').addClass('hide');
        $('.step-2').removeClass('hide');
    });

    $('.creditcard-choice').click(function() {
        $('.step-1').addClass('hide');
        $('.step-2').removeClass('hide');
    });

    $('.step-2 a').click(function() {
        $('.step-2').addClass('hide');
        $('.step-3').removeClass('hide');
    });

    $('.account-choice').click(function() {
        $('.account-1').removeClass('hide');
    });

    $('.creditcard-choice').click(function() {
        $('.creditcard-1').removeClass('hide');
    });


// Form Page
    $(function() {
        // $('.radio-no').addClass('active-button');
        $('.styledSelect').addClass('first-time');

        // Showing How Number Looks
        $('#phone-number-input').val($('#phone-number').text().replace('$',''));
        $('#emirates-id-number-input').val($('#emirates-id-number').text().replace('$',''));

    });

    $('.styledSelect').click(function() {
        $(this).removeClass('first-time');
        $('ul.options li:first-child').addClass("hide")
    });


    $('.styledSelect').click(function() {
        $('.styledSelect').removeClass('first-time');
        $('ul.options li:first-child').addClass("hide")
    });


    $('.fill-account-button').click(function() {
        $('.empty-account').addClass('hide');
        $('.filled-account').removeClass('hide');
    });


    $('#premier-card-choose').click(function() {
        $('.red-button').removeClass('disabled');
        $('#premier-card').removeClass('hide');
        $('#remove-upload').addClass("hide");
        $('.upload-box').addClass("choice-made");
    });

    $('#advance-card-choose').click(function() {
        $('.red-button').removeClass('disabled');
        $('#advance-card').removeClass('hide');
        $('#remove-upload').addClass("hide");
        $('.upload-box').addClass("choice-made");
    });
    
    $('#platnium-card-choose').click(function() {
        $('.red-button').removeClass('disabled');
        $('#platnium-card').removeClass('hide');
        $('#remove-upload').addClass("hide");
        $('.upload-box').addClass("choice-made");
    });


    $('#first_name').click(function() {
        $('.main-greeting').removeClass('hide');
    });


    $('ul.options li[rel=student]').click(function() {
        $('.student-block').slideDown();
        $('.other-block').slideUp();
    });

    $('ul.options li[rel=other]').click(function() {
        $('.other-block').slideDown();
        $('.student-block').slideUp();
    });


    $('ul.options li[rel=other-id]').click(function() {
        $('.other-id').slideDown();
    });


    $('#card-setup').click(function() {
        $('.card-setup').slideToggle();
    });


    $('#supplementary-button').click(function() {
        $('.supplementary-card').slideToggle();
    });



    $('ul.options li[rel=otherform]').click(function() {
        $('.otherform-block').slideDown();
    });

    $('ul.options li[rel=hideotherform]').click(function() {
        $('.otherform-block').slideUp();
    });


    $('.datepicker-button.active').click(function() {
        $('.timepicker').toggleClass("hide");
    });



    $('.radio-yes').click(function() {
        $('.collapseExample').slideDown();
        $('.radio-yes').addClass("active-button");
        $('.radio-no').removeClass("active-button");
    });

    $('.radio-no').click(function() {
        $('.collapseExample').slideUp();
        $('.radio-no').addClass("active-button");
        $('.radio-yes').removeClass("active-button");
    });


// Customises The Card
    $("#first_name").bind('input', function () {
        var stt = $(this).val();
        $(".card-example-first").text(stt);
        $(".start-text").text(stt);
    });

    $("#last_name").bind('input', function () {
        var stt = $(this).val();
        $(".card-example-second").text(stt);
        $(".start-text-last").text(stt);
    });

    $('.success .panel-title, .alert-success').click(function() {
        $('.alert-success').addClass("hide");
    });


// Pop Up If Directly Apply From HSBC Main Site  - step-3-from-page.html
    $('.ntb-0').click(function() {
        $('.ntb-1').removeClass('hide');
        $('.option-select').addClass('hide');
    });

    $('.ntb-1 .red-button').click(function() {
        $('.ntb-2').removeClass('hide');
        $('.ntb-1').addClass('hide');
    });

    $('.ntb-2 .red-button').click(function() {
        $('.ntb-3').removeClass('hide');
        $('.ntb-2').addClass('hide');
    });

    $('.ntb-3 .red-button').click(function() {
        $('.ntb-3-error').removeClass('hide');
        $('.ntb-3').addClass('hide');
    });



    $('.etb-0').click(function() {
        $('.etb-1').removeClass('hide');
        $('.option-select').addClass('hide');
    });

    $('.etb-1 .red-button').click(function() {
        $('.etb-2').removeClass('hide');
        $('.etb-1').addClass('hide');
    });

    $('.etb-2 .red-button').click(function() {
        $('.etb-3').removeClass('hide');
        $('.etb-2').addClass('hide');
    });

    $('.etb-3 .red-button').click(function() {
        $('.etb-3a').removeClass('hide');
        $('.etb-3').addClass('hide');
    });

    $('.etb-3a .red-button').click(function() {
        $('.etb-3b').removeClass('hide');
        $('.etb-3a').addClass('hide');
    });

    $('.etb-3b .red-button').click(function() {
        $('.etb-3c').removeClass('hide');
        $('.etb-3b').addClass('hide');
    });



// Make Dynamic

    $('.radio-yes-1').click(function() {
        $('.collapseExample-1').slideDown();
        $('.radio-yes-1').addClass("active-button");
        $('.radio-no-1').removeClass("active-button");
    });

    $('.radio-no-1').click(function() {
        $('.collapseExample-1').slideUp();
        $('.radio-no-1').addClass("active-button");
        $('.radio-yes-1').removeClass("active-button");
    });


    $('.radio-yes-2').click(function() {
        $('.collapseExample-2').slideDown();
        $('.radio-yes-2').addClass("active-button");
        $('.radio-no-2').removeClass("active-button");
    });

    $('.radio-no-2').click(function() {
        $('.collapseExample-2').slideUp();
        $('.radio-no-2').addClass("active-button");
        $('.radio-yes-2').removeClass("active-button");
    });


    $('.radio-yes-3').click(function() {
        $('.collapseExample-3').slideDown();
        $('.radio-yes-3').addClass("active-button");
        $('.radio-no-3').removeClass("active-button");
    });

    $('.radio-no-3').click(function() {
        $('.collapseExample-3').slideUp();
        $('.radio-no-3').addClass("active-button");
        $('.radio-yes-3').removeClass("active-button");
    });

    $('.radio-yes-4').click(function() {
        $('.collapseExample-4').slideDown();
        $('.radio-yes-4').addClass("active-button");
        $('.radio-no-4').removeClass("active-button");
    });

    $('.radio-no-4').click(function() {
        $('.collapseExample-4').slideUp();
        $('.radio-no-4').addClass("active-button");
        $('.radio-yes-4').removeClass("active-button");
    });

    $('.radio-yes-5').click(function() {
        $('.collapseExample-5').slideDown();
        $('.radio-yes-5').addClass("active-button");
        $('.radio-no-5').removeClass("active-button");
    });

    $('.radio-no-5').click(function() {
        $('.collapseExample-5').slideUp();
        $('.radio-no-5').addClass("active-button");
        $('.radio-yes-5').removeClass("active-button");
    });

    $('.radio-yes-6').click(function() {
        $('.collapseExample-6').slideDown();
        $('.radio-yes-6').addClass("active-button");
        $('.radio-no-6').removeClass("active-button");
    });

    $('.radio-no-6').click(function() {
        $('.collapseExample-6').slideUp();
        $('.radio-no-6').addClass("active-button");
        $('.radio-yes-6').removeClass("active-button");
    });

    $('.radio-yes-7').click(function() {
        $('.collapseExample-7').slideDown();
        $('.radio-yes-7').addClass("active-button");
        $('.radio-no-7').removeClass("active-button");
    });

    $('.radio-no-7').click(function() {
        $('.collapseExample-7').slideUp();
        $('.radio-no-7').addClass("active-button");
        $('.radio-yes-7').removeClass("active-button");
    });

    $('.radio-yes-8').click(function() {
        $('.collapseExample-8').slideDown();
        $('.radio-yes-8').addClass("active-button");
        $('.radio-no-8').removeClass("active-button");
    });

    $('.radio-no-8').click(function() {
        $('.collapseExample-8').slideUp();
        $('.radio-no-8').addClass("active-button");
        $('.radio-yes-8').removeClass("active-button");
    });

    $('.show-tin').click(function() {
        $('.collapseExample-9').slideDown();
        $('.radio-no-9').addClass("active-button");
        $('.radio-yes-9').removeClass("active-button");
    });

    $('.radio-yes-9').click(function() {
        $('.collapseExample-9').slideUp();
        $('.radio-yes-9').addClass("active-button");
        $('.radio-no-9').removeClass("active-button");
    });

    $('.radio-yes-10').click(function() {
        $('.collapseExample-10').slideDown();
        $('.radio-yes-10').addClass("active-button");
        $('.radio-no-10').removeClass("active-button");
    });

    $('.radio-no-10').click(function() {
        $('.collapseExample-10').slideUp();
        $('.radio-no-10').addClass("active-button");
        $('.radio-yes-10').removeClass("active-button");
    });


    $('.radio-yes-12').click(function() {
        $('.collapseExample-12').slideDown();
        $('.radio-yes-12').addClass("active-button");
        $('.radio-no-12').removeClass("active-button");
    });

    $('.radio-no-12').click(function() {
        $('.collapseExample-12').slideUp();
        $('.radio-no-12').addClass("active-button");
        $('.radio-yes-12').removeClass("active-button");
    });



    $('.category-choices .circle-style').click(function() {
        $('.circle-button',this).toggleClass("active");
        $('.circle-link',this).toggleClass("active");
    });



    $('.credit-card-details').click(function() {
        $('.credit-card-details').addClass("active");
        $('.account-details').removeClass("active");
        $('.account-details-info').addClass("hide");
        $('.credit-card-details-info').removeClass("hide");

    });


    $('.account-details').click(function() {
        $('.account-details').addClass("active");
        $('.account-details-info').removeClass("hide");
        $('.credit-card-details-info').addClass("hide");
        $('.credit-card-details').removeClass("active");
    });


    $('.existing-uae').click(function() {
        $('.existing-uae').removeClass("hide");
    });


    $('.overdraft-remove').click(function() {
        $('#cancel-overdraft-hide').addClass("hide");
    });


    $('.card-remove').click(function() {
        $('#cancel-card-hide').addClass("hide");
    });


    $('.joint-type a').click(function() {
        $('.joint-type').addClass("hide");
        $('.customer-type').removeClass("hide");
    });


    $('.sms-remove-button').click(function() {
        $('.sms-remove').addClass("hide");
    });


    $('.loan-overlay').click(function() {
        $('.icon-loan').toggleClass('active');
        $('.car-loan' ).fadeToggle();
        $('.home-loan' ).fadeToggle();
        $('.personal-loan').fadeToggle();
    });


    $('.new-customer').click(function() {
        $('.new-customer').removeClass("hide");
    });

    $('.new-customer-2').click(function() {
        $('.new-customer').addClass("collapse");
        $('.new-customer-2').removeClass("hide");
    });

    $('.new-customer-3').click(function() {
        $('.new-customer-2').addClass("collapse");
        $('.new-customer-3').removeClass("hide");
    });


    $('.joint-type-yes').click(function() {
        $('.joint-type-no').addClass("hide");
        $('.joint-type-yes').removeClass("hide");
    });

    $('.joint-type-no').click(function() {
        $('.joint-type-yes').addClass("hide");
        $('.joint-type-no').removeClass("hide");
    });


    $('.upload-documents').click(function() {
        $('.application-details-box').addClass("hide");
        $('.upload-documents-box').removeClass("hide");
    });

    $('.dashboard-box-close').click(function() {
        $('.application-details-box').removeClass("hide");
        $('.upload-documents-box').addClass("hide");
    });

    $('.experience-all-button').click(function() {
        $('.experience-all').slideDown();
        $('.experience-all-button').slideUp();
    });




    //
    // $('.status-button').click(function() {
    //     $('#collapseOne').removeClass('in');
    //     $("#headingOne h4.panel-title").remove("aria-expanded","true");
    //     $('#collapseTwo').addClass('in');
    //
    // });



    $('.timepicker-button').click(function() {
        $('.date-picker-block').slideUp();
        $('.appointment-block').slideDown();
    });

    $('.custom-tooltip').hover(function () {
        $('.tooltip-box', this).toggle();
    });


    var parentClass = '.row-same-height';
    var childrenClass = '.col-same-height';

    var $parents = $(parentClass);
    var resizeBoxes = function() {
        $parents.each(function() {
            var $children = $(this).find(childrenClass);
            var highestHeight = 0;
            $children.css('height', '');
            $children.each(function(index, child) {
                var $wb = $(child).find('.white-box');
                if ($wb.height() > highestHeight) {
                    highestHeight = $wb.height();
                }
            });
            $children.each(function() {
                $(this).find('.white-box').height(highestHeight);
            });
        });
    }


    $('.collapse').on('show.bs.collapse', function () {
        $otherPanels = $(this).parents('.panel-group').siblings('.panel-group');
        $('.collapse',$otherPanels).removeClass('in');
    });

    $(window).on('resize', resizeBoxes);
    $(window).on('load', resizeBoxes);

    $('.terms-content').on('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            $('.terms-footer .red-button').removeClass("disabled");
        }
    });

    $('.terms-footer .red-button').click(function() {
        $('#terms-check').removeClass( 'hide' );
        $('.terms-text').addClass( 'hide' );
        $('.terms-text-hidden').removeClass( 'hide' );
    });


    $('.new-customer-3').click(function() {
        $('.new-customer-2').addClass("collapse");
        $('.new-customer-3').removeClass("hide");
    });
 $('.radio-yes-3').click(function() {
      $('.offers1' ).fadeToggle();
      $('.offers2' ).fadeToggle();
    });

 $(".offers1 .left-block img").mouseenter(function () {

    $('.bottom-block' ).fadeIn('slow');

    });

 $(".btn-dismiss, .btn-accept").click(function () {
        $('.bottom-block' ).fadeOut('slow');
    });

 $(".white-box").hover(function () {
   $(this).find('.red-overlay').stop(true, true).fadeToggle(150);

    });



});
/*Slide effect*/
$(document).ready(function(){
    var _scroll = true, _timer = false, _floatbox = $("#contact_form"), _floatbox_opener = $(".contact-opener") ;
    _floatbox.css("right", "-300px"); //initial contact form position

    //Contact form Opener button
    _floatbox_opener.click(function(){
        if (_floatbox.hasClass('visible')){
            _floatbox.animate({"right":"-300px"}, {duration: 300}).removeClass('visible');
        $('.contactopeneroverlay' ).css("display", "none");

        }else{
           _floatbox.animate({"right":"0px"},  {duration: 300}).addClass('visible');
            $('.contactopeneroverlay' ).css("display", "block");
        }
 $(".close").click(function () {
   _floatbox.animate({"right":"-300px"}, {duration: 300}).removeClass('visible');
    $('.contactopeneroverlay' ).css("display", "none");

    });
    });


});