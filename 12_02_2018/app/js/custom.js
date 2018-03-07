$(function() {

//modal
	
	$('.entry').click(function(event) {
        event.preventDefault();
		$('#entry-register').animate({ opacity: 0, top: '45%', }, 200, ).css('display', 'none');
        $('#overlay').fadeIn(400, function() {
            $('#entry-login').css('display', 'block');
            $('#entry-login').animate({ opacity: 1, top: '20%' }, 200);
        });
    });

    $('.form-close').click(function() {
        $('#entry-login').animate({ opacity: 0, top: '45%' }, 200,
            function() {
                $(this).css('display', 'none');
                $('#overlay').fadeOut(400);
            }
        );
    });
	$('.registr').click(function(event) {
        event.preventDefault();
        $('#entry-login').animate({ opacity: 0, top: '45%', }, 200, ).css('display', 'none');
		$('#overlay').fadeIn(400, function() {
            $('#entry-register').css('display', 'block');
            $('#entry-register').animate({ opacity: 1, top: '20%' }, 200);
        });
    });

    $('.form-close').click(function() {
        $('#entry-register').animate({ opacity: 0, top: '45%', display: 'none', }, 200,
            function() {
                $(this).css('display', 'none');
                $('#overlay').fadeOut(400);
            }
        );
    });
	
// Mask Phone

	$("input[type='tel']").mask("+380 99 999 99 99");

//plus/minus

    $('.minus').click(function() {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function() {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });	
	
// Slider

	$("#main-slider").slick({
        lazyLoad: 'ondemand', // ondemand progressive anticipated
        infinite: true,
		dots: true,
		arrows: true,
    });
	$("#bestseller-product, #specials-product").slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 6,
		slidesToScroll: 2,
		responsive: [
			{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				dots: true
			  }
			},
			{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},
			{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		  ]
      });
	$("#last-news").slick({
		dots: true,
		infinite: true,
		speed: 300,
		variableWidth: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				dots: true
			  }
			},
			{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},
			{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		  ]
    });
});	