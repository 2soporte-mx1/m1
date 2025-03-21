            $(document).ready(function() {
              $('.owl-carousel').owlCarousel({
                loop: false,
                margin: 10,
                responsiveClass: true,
                responsive: {
                  0: {
                    items: 1,
                    nav: true
                  },
                  600: {
                    items: 3,
                    nav: false
                  },
                  1000: {
                    items: 5,
                    nav: true,
                    loop: false,
                    margin: 20
                  }
                }  
              })
			    $('.thumbnail').eq(0).addClass('active');
            })