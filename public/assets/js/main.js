/* ---------------------------------------------------------------------
Global Js
Target Browsers: All
------------------------------------------------------------------------ */

var FX = (function(FX, $) {
	if ($('.back-to-top-desk').length) {
		var scrollTrigger = 200, // px
			backToTop = function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop > scrollTrigger) {
					$('.back-to-top-desk').addClass('back-to-top-show');
				} else {
					$('.back-to-top-desk').removeClass('back-to-top-show');
				}
			};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('.back-to-top-desk').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}
	/**
	 * Doc Ready
	 */
	$(function() {
        FX.General.init(); // For super general or super short scripts
		FX.ImAHuman.init(); // Enable by default
		FX.Affix.init();
		FX.MobileMenu.init();
        FX.Parallax.init();
        FX.SlickSlider.init();
        FX.Social.init();
		FX.BackToTop.init();
		FX.Click.init();
		FX.ResponsiveTables.init();
    });


	$(window).load(function() {
		
		FX.SmoothAnchors.init();
	});



	/**
	 * Example Code Block - This should be removed
	 * @type {Object}
	 */
	FX.CodeBlock = {
		init: function() {

		},
	};


	/**
	 * General functionality — ideal for one-liners or super-duper short code blocks
	 */
	FX.General = {
		init: function() {
			this.bind();
		},

		bind: function() {

			// Selectric
			$('select').selectric({
				arrowButtonMarkup: '<b class="button"></b>'
			});
			
			// IE CSS object-fit support
			objectFitImages();

			// TODO: Add additional small scripts below

		}
	},
	
	/**
     * Example Code Block - This should be removed
     * @type {Object}
     */
    
	
	
	/**
	 * Slider/Carousel
	 * @type {Object}
	 */
	FX.SlickSlider = {
		init: function() {
			
			$('.service-slider').slick({
				infinite: true,
				speed: 300,
				centerMode: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				dots: false,
				arrows: false,
				autoplaySpeed: 4000,
				centerPadding: '14%'
				
			  });

			  $('.system-slider').slick({
				infinite: true,
				speed: 300,
				centerMode: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				dots: false,
				arrows: false,
				autoplaySpeed: 4000,
				centerPadding: '14%'
				
			  });

			  $('.slider-for').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				asNavFor: '.slider-nav',
				dots: true,
			  });

			  $('.slider-nav').slick({
				slidesToShow: 2,
				slidesToScroll: 1,
				asNavFor: '.slider-for',
				dots: true,
				focusOnSelect: true,
			  });
			 
			  $('a[data-slide]').click(function(e) {
				e.preventDefault();
				var slideno = $(this).data('slide');
				$('.slider-nav').slick('slickGoTo', slideno - 1);
			  });
		}
	};
	

	/**
	 * Display scroll-to-top after a certain amount of pixels
	 * @type {Object}
	 */
	FX.BackToTop = {
		init: function() {
			this.bind();
		},

		bind: function() {
			$(window).on( 'scroll load', this.maybeShowButton );
			$('#back-to-top').on( 'click', this.scrollToTop );
		},

	

		scrollToTop: function() {
			$(window).scrollTop(0);
		}

		
	};
	
	
	/**
	 * Mobile menu script for opening/closing menu and sub menus
	 * @type {Object}
	 */
	FX.MobileMenu = {
		init: function() {
			$('.nav-primary li.menu-item-has-children > a').after('<span class="sub-menu-toggle icon-chevron-down"></span>');

			$('.sub-menu-toggle').click( function() {
				var $this = $(this),
					$parent = $this.closest("li"),
					$wrap = $parent.find("> .sub-menu");
				$wrap.toggleClass("js-toggled");
				$this.toggleClass('js-clicked');
				$this.toggleClass("js-toggled");
			});

			$('.toggle-menu').click( function() {
				$(this).toggleClass('close');
                $('.page-header .nav-primary').fadeToggle();
			});
			
		}
	};
	

	/**
	 * Force External Links to open in new window.
	 * @type {Object}
	 */
	FX.ExternalLinks = {
		init: function() {
			var siteUrlBase = FX.siteurl.replace(/^https?:\/\/((w){3})?/,'')

			$('a[href*="//"]:not([href*="'+siteUrlBase+'"])')
				.not('.ignore-external') // ignore class for excluding
				.addClass('external')
				.attr('target', '_blank')
				.attr('rel', 'noopener');
		}
	};
	

	
	/**
	 * Responsive Tables
	 * @type {Object}
	 */
	FX.ResponsiveTables = {
		init: function() {
			this.bind();
		},

		bind: function() {
			var self = this;

			// Add wrappers to table
			// - change ".page-content table" to appropriate class per project
			$('.table-responsive table').wrap('<div class="table-wrap-outer"><div class="table-wrap-inner"></div></div>' );
									
			// Make table draggable
			var mx = 0;
			$('.table-wrap-inner').on({
				mousemove: function(e) {
					var mx2 = e.pageX - this.offsetLeft;
					if( mx ) 
						this.scrollLeft = this.sx + mx - mx2;
				},
				mousedown: function(e) {
					this.sx = this.scrollLeft;
					mx = e.pageX - this.offsetLeft;
				}
			});

			$(document).on( 'mouseup', function() {
				mx = 0;
			});
			
			// Add class if table is wider than parent
			$('.table-wrap-outer').find('.table-wrap-inner table').each(function() {
				var $table 			= $(this),
					$table_outer 	= $table.closest('.table-wrap-outer');
				if( $table.width() > $table_outer.width() ) {
					$table_outer.addClass('js-table-is-overflowing');
					$('.page-content table').before( '<div class="js-table-fade"></div>' );
				}
			});
			
		}
	};


	/**
	 * Custom Social Share icons open windows
	 * Generate URLs, place in a tag and use class - example: https://github.com/bradvin/social-share-urls
	 * @type {Object}
	 */
	FX.Social = {
		init: function() {
			$(".js-social-share").on("click", this.open);
		},

		open: function(event) {
		  event.preventDefault();

		  FX.Social.windowPopup($(this).attr("href"), 500, 300);
		},

		windowPopup: function (url, width, height) {
			var left = (screen.width / 2) - (width / 2),
				top = (screen.height / 2) - (height / 2);

			window.open(
				url,
				"",
				"menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
			);
		}
	};

	/**
	 * ImAHuman
	 * Hidden Captchas for forms
	 * @type {Object}
	 */
	FX.ImAHuman = {
		num: "0xFF9481",
		forms: void 0,

		init: function() {
			this.setup();
		},

		setup: function() {
			this.forms = document.getElementsByTagName("form");
			this.bind();
		},

		bind: function() {
			for (var i = 0; this.forms.length > i; i++) {
				$(this.forms[i]).on("focus click", this.markAsHuman);
			}
		},

		markAsHuman: function() {
			$(this).find('.imahuman, [name="imahuman"]').attr("value", parseInt(FX.ImAHuman.num, 16));
		}
	};


	/**
	 * Affix
	 * Fixes sticky items on scroll
	 * @type {Object}
	 */
	FX.Affix = {
		init: function() {
            this.windowHeight = $(window).height();
            this.bind();
        },

        bind: function(e) {
            $(window).on('scroll', this.scroll);
            $(window).on('resize', this.updateWindowHeight);
        },
		
		scroll:function(){ 
			var fromTopPx = 200; 
			var scrolledFromtop = $(window).scrollTop(); 
			if(scrolledFromtop > 150){ $('.page-header').addClass('hideheader'); }
			else{ $('.page-header').removeClass('hideheader'); } 
			if(scrolledFromtop > fromTopPx){ $('.page-header').addClass('js-scrolled'); $('.masthead').addClass('scrolled'); $('.masthead-inner').addClass('scrolled'); }
			else{ $('.page-header').removeClass('js-scrolled'); $('.masthead').removeClass('scrolled'); $('.masthead-inner').removeClass('scrolled'); } },
		};


	/**
	 * FX.Parallax
	 * Parallax effect for images
	 * @type {Object}
	 */
	FX.Parallax = {
		init: function() {
			this.bind();
		},

		bind: function() {
			$(window).scroll(this.scroll);
		},

		scroll: function(e) {
			$('.js-parallax').each(function(){

				var $this   = $(this),
					$speed  = $this.data('speed') || 6,
					$window = $(window),
					yPos    = -($window.scrollTop() / $speed),
					coords  = 'center '+ yPos + 'px';

				$this.css({ backgroundPosition: coords });

			});
		}
	};



	/**
	 * FX.SmoothAnchors
	 * Smoothly Scroll to Anchor ID
	 * @type {Object}
	 */
	FX.SmoothAnchors = {
		init: function() {
			this.hash = window.location.hash;

			if ( this.hash != '' ) {
				this.scrollToSmooth(this.hash);
			}

			this.bind();
		},

		bind: function() {
			$('a[href^="#top"]').on('click', $.proxy(this.onClick, this));
		},

		onClick: function(event) {
			event.preventDefault();

			var target = $(event.currentTarget).attr('href');

			this.scrollToSmooth(target);
		},

		scrollToSmooth: function(target) {
			var $target = $( target );
			$target = ($target.length) ? $target : $( this.hash );

			var headerHeight =  $('#page-header').outerHeight(true);

			if ($target.length)
			{
				var targetOffset = $target.offset().top - headerHeight;
				$('html,body').animate({scrollTop: targetOffset}, 600);

				return false;
			}
		}
	};



	/**
	 * Tab Content
	 * @type {Object}
	 */
	
	FX.Tabs = {
		init: function() {

		tabControl();
		var resizeTimer;
		$(window).on('resize', function(e) {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			tabControl();
		}, 250);
		});
	}
	
	};


	return FX;
}(FX || {}, jQuery));


// tabbed content
// http://www.entheosweb.com/tutorials/css/tabs.asp
$(".tab_content").hide();
$(".tab_content:first").show();

/* if in tab mode */
$("ul.tabs li").click(function() {

	$(".tab_content").hide();
	var activeTab = $(this).attr("rel");
	$("#" + activeTab).fadeIn();

	$("ul.tabs li").removeClass("active");
	$(this).addClass("active");

	$(".tab_drawer_heading").removeClass("d_active");
	$(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");

});
/* if in drawer mode */
$(".tab_drawer_heading").click(function() {

	$(".tab_content").hide();
	var d_activeTab = $(this).attr("rel");
	$("#" + d_activeTab).fadeIn();

	$(".tab_drawer_heading").removeClass("d_active");
	$(this).addClass("d_active");

	$("ul.tabs li").removeClass("active");
	$("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
});


/* Extra class "tab_last" 
	to add border to right side
	of last tab */
$('ul.tabs li').last().addClass("tab_last");



// <!-- avatar-upload -->

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imageUpload").change(function() {
    readURL(this);
});

function readURL2(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview2').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview2').hide();
            $('#imagePreview2').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imageUpload2").change(function() {
    readURL2(this);
});





tabControl2();

var resizeTimer;
$(window).on('resize', function(e) {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    tabControl2();
  }, 250);
});


function tabControl2() {
  var tabs = $('.tabbed-content2').find('.tabs2');
  if(tabs.is(':visible')) {
    tabs.find('a').on('click', function(event) {
      event.preventDefault();
      var target = $(this).attr('href'),
          tabs = $(this).parents('.tabs2'),
          buttons = tabs.find('a'),
          item = tabs.parents('.tabbed-content2').find('.item2');
      buttons.removeClass('active');
      item.removeClass('active');
      $(this).addClass('active');
      $(target).addClass('active');
    });
  } else {
    $('.item2').on('click', function() {
      var container = $(this).parents('.tabbed-content2'),
          currId = $(this).attr('id'),
          items = container.find('.item2');
      container.find('.tabs2 a').removeClass('active');
      items.removeClass('active');
      $(this).addClass('active');
      container.find('.tabs2 a[href$="#'+ currId +'"]').addClass('active');
    });
  } 
}

$(document).ready(function(){

	$(".accordion2 h3").eq(0).addClass("active");
	$(".aaa").eq(0).show();

	$(".accordion2 h3").click(function(){
		$(this).next(".aaa").slideToggle("slow")
		.siblings(".aaa:visible").slideUp("slow");
		$(this).toggleClass("active");
		$(this).siblings("h3").removeClass("active");
	});

});

$(document).ready(function(){
	$(".custom-select-active").click(function(){
		$(this).toggleClass('active')
	});
	$(".custom-select-options").click(function(){
		$(".custom-select-active").removeClass('active')
	});
	
});









    $(document).ready(function(){
	$(".add_fav").click(function(){
		$(this).toggleClass('active')
	});
});

    $(document).ready(function(){
	$(".share_group").click(function(){
		$(this).toggleClass('active')
	});
});




    function openForm() {
            document.getElementById("myForm").style.display = "block";
        }

        function closeForm() {
            document.getElementById("myForm").style.display = "none";
        }

FX.Click = {
    	init: function() {
			$(".search-icon").click(function(){
				$(".search-div ").slideToggle();
				$(".search-icon").toggleClass("search-cross-icon");
			})
			
		}
		
    };



    $(".open-button").click(function(){
				$(".search-div").css("display" , "none");
			})
			
			$(".search-icon").click(function(){
				$(".form-popup").css("display" , "none");
			})


         $('.responsive').slick({
            dots: true,
            infinite: false,
            speed: 300,
            loop: true,
            slidesToShow: 5,
            arrow: true,
            autoplay: true,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                }, {
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