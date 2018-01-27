$(function() {  

  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

// DOM CACHE
  var $carousel = $('.carousel');
  var $carouselHeader = $('.carousel-header', $carousel);
  var $carouselCaption = $('.carousel-caption', $carousel);
  var $carouselIndicators = $('.carousel-indicators', $carousel);
  var $ref = $('.ref');
  var $collapse = $('.tl-body');
  var $btnColorPick = $('.color-p');
  var $filter = $('.filter');
  var $btnCollapse = $('.btn-collapse');
  var $btnToTop = $('#back-to-top');


// EVENTS


  $btnToTop.on({

    click: function() {
    $('body,html').animate({
        scrollTop: 0
    }, 1000);
    $btnToTop.tooltip('hide');
  },
    mouseover: function(){
        $btnToTop.tooltip('show');
  }
  });

  $ref.on({
      mouseover: function() {
          $('.ref-hover', this).css('opacity', '1').addClass('animated slideInUp').one(animationEnd, function() {
          $(this).removeClass('animated slideInUp');
        });
      },
      mouseout: function() {
          $('.ref-hover', this).addClass('animated slideOutDown').one(animationEnd, function() {
                    $(this).removeClass('animated slideOutDown').css('opacity', '0');
         });
      }
  });


  $('.navbar-brand').on('mouseover', function() {
  	$(this).addClass('animated pulse').one(animationEnd, function() {
  		$(this).removeClass('animated pulse');
  	});
  });

  $carousel.on('slide.bs.carousel', function() {
  	$carouselHeader.addClass('animated fadeInDown').one(animationEnd, function() {
  	  		$(this).removeClass('animated fadeInDown');
  	  	});
  	 $carouselIndicators.addClass('animated fadeInUp').one(animationEnd, function() {
  	 		$(this).removeClass('animated fadeInUp');
  	 	});
  	$carouselCaption.addClass('animated lightSpeedIn').one(animationEnd, function() {
  	 		$(this).removeClass('animated lightSpeedIn');
  	 	});
  });


  $btnColorPick.on('click', function() {
  	$btnColorPick.removeClass('active');
  	$(this).addClass('active');
  	var $fSlctd = $(this).attr('data-filter');
  	if ($fSlctd == 'sve') {
  		$filter.show('1000');
  	} else {
  		$filter.not('.' + $fSlctd).hide('4000');
  		$filter.filter('.' + $fSlctd).show('4000');
  	}
  });

  $collapse.one('show.bs.collapse', function() {
  	$(this).prepend('<hr>');
  });

  function toggleAttr(el, attribute, vals){
      if ($(el).attr(attribute) ==  vals[0]){
          $(el).attr(attribute, vals[1]);
      } else if ($(el).attr(attribute) == vals[1])
       
      {
          $(el).attr(attribute, vals[0]);
      }
  }

    $('.collapse').on('show.bs.collapse hide.bs.collapse', function () {
      $vals = ['minus-hexagon', 'plus-hexagon'];
      var $parrent = $(this).parent();
      var $svgIcon = $('.btn-collapse svg', $parrent);
      toggleAttr($svgIcon, 'data-icon', $vals);
    });

    $collapse.on('show.bs.collapse hide.bs.collapse', function () {
      $vals = ['minus-hexagon', 'plus-hexagon'];
      var $parrent = $(this).parent().parent();
      var $svgIcon = $('.btn-collapse svg', $parrent);
      toggleAttr($svgIcon, 'data-icon', $vals);
    });

	$btnCollapse.on('click', function() {
    // determine which btn has been click on and get his href
		var $hrefLink = $(this).attr('href');
    // show collapse and hide opened collapse items
    $($hrefLink).collapse('toggle');
    $collapse.collapse('hide');
});

});

$(function() {  	
// WAYPOINTS


// DOM CACHE

	var $cardBorderedEven = $('.bordered:even');
	var $cardBorderedOdd = $('.bordered:odd');
	var $portShadow = $('.port-shadow');
  var $sLeft = $('.s-left');
  var $sRight = $('.s-right');
  var $sF = $('.s-flash');
  var $sDown = $('.s-down');
  var $sUp = $('.s-up');
  var $imgRev = $('.img-rev');
  var $contact = $('.contact');
  var $filter = $('.filter');


// LOOP THRU CACHED DOM && ADD OPACITY

var elements = [$filter, $contact, $imgRev, $sDown, $sLeft, $sRight, $cardBorderedEven, $cardBorderedOdd, $portShadow];
 	for(var i=0; i < elements.length; i++) {
 		elements[i].css('opacity', '0');
 	}

// ANIMATIONS ON WAYPOINTS REACHED

	$cardBorderedEven.waypoint(function(){
		$cardBorderedEven.css('opacity', '1').addClass('animated slideInDown');
	}, {
		offset: '60%'
	});

	$cardBorderedOdd.waypoint(function(){
		$cardBorderedOdd.css('opacity', '1').addClass('animated slideInUp');
	}, {
		offset: '60%'
	});

	$portShadow.waypoint(function(){
		$portShadow.addClass('animated flash');
	}, {
		offset: '70%'
	});

  $sLeft.waypoint(function(){
    $sLeft.css('opacity', '1').addClass('animated slideInLeft');
  }, {
    offset: '60%'
  });

  $sRight.waypoint(function(){
    $sRight.css('opacity', '1').addClass('animated slideInRight');
  }, {
    offset: '60%'
  });

  $sF.waypoint(function(){
      $sF.addClass('animated flash');
    }, {
      offset: '60%'
    });

  $sDown.waypoint(function(){
      $sDown.css('opacity', '1').addClass('animated slideInDown');
    }, {
      offset: '60%'
    });

  $sUp.waypoint(function(){
      $sUp.css('opacity', '1').addClass('animated slideInUp');
    }, {
      offset: '60%'
    });

    $imgRev.waypoint(function(){
        $imgRev.css('opacity', '1').addClass('animated flipInX');
      }, {
        offset: '70%'
      });
    
    $contact.waypoint(function(){
        $contact.css('opacity', '1').addClass('animated flipInX');
      }, {
        offset: '60%'
      });

    var $i = 0;
    var $filterIds = [];  
        $filter.each(function(){
            $filterIds[$i++] =  $(this).attr("id");
     });

      $.each($filterIds, function(index, el) {
          $('#'+el).waypoint(function(){
            $('#'+el).addClass('animated flipInX').css('opacity', '1');
          }, {
            offset: '80%'
          });        
      });
                
});