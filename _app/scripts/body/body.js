Barba.Dispatcher.on('linkClicked', function() {
  $('html').addClass('barba-active');
});

Barba.Dispatcher.on('newPageReady', function() {

  var tabheight = $('#tab-1').height();
  $('#tab-2').css('height', tabheight);

  $(".video-container").fitVids();

  // $('header').removeClass('hide');

  // $('html').removeClass('portfolio-to-top');

  // setTimeout(function(){
  //   $('html').removeClass('portfolio-to-top');
  // }, 2000);

  // Playing stops when switching pages, but also remove the class
  // $('html').removeClass('video-playing');

  // alert('test');

  // If video page, insert video
  // if($("#vimeo").length) {
  //
  //   var options = { id: 202771816, width: 640, height: 360, frameborder: 0, byline: false, portrait: false, title: false, color: "fff" };
  //   var player = new Vimeo.Player('vimeo', options);
  //
  //   // player.setVolume(0);
  //   player.on('play', function() {
  //     // console.log('played the video!');
  //     $("html").addClass("video-playing");
  //     if($("html").hasClass("audio-playing")) { audio.pause(); }
  //   });
  //   player.on('pause', function() {
  //     // console.log('played the video!');
  //     $("html").removeClass("video-playing");
  //   });
  // }

  // // Fade carousel
  // var intro = $(".index-intro > h1").hide(), i = 0;
  // (function cycle() {
  //   intro.eq(i).fadeIn(400)
  //   .delay(5000)
  //   .fadeOut(400, cycle);
  //   i = ++i % intro.length;
  // })();

});

Barba.Dispatcher.on('transitionCompleted', function(current, prev, newContainer) {

  // Barba is done
  $('html').removeClass('barba-active');

  // Fade carousel
  var intro = $(".index-intro > h1").hide(), i = 0;
  (function cycle() {
    intro.eq(i).fadeIn(400)
    .delay(5000)
    .fadeOut(400, cycle);
    i = ++i % intro.length;
  })();

  // Stop video when audio starts
  // audio = $('#audio-player').bind('play', function() {
  //   if($('html').hasClass('video-playing')) { player.pause() }
  //   // player.pause()
  // });

  // Hide images and fade-in after loading
  // [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
  // 	img.setAttribute('src', img.getAttribute('data-src'));
  // 	img.onload = function() {
  // 		img.removeAttribute('data-src');
  // 	};
  // });

  // if( $(".fluidvids iframe button.play").hasClass("state-playing") ) {
  //   alert("playing");
  // }

  // function tester() {
  //   if ($('html').is('#video')) {
  //     alert('video-page');
  //   }
  // }

  // Navigation
  $('.unfold-nav').click(function() {
    $('html').addClass('nav-unfolded');
  })
  $('.fold-nav').click(function() {
    $('html').removeClass('nav-unfolded');
  })

  // Returning from video page
  $('.return-button').click(function() {
    // $('html').addClass('portfolio-to-top');
    // $('header').addClass('hide');
    // $('html').removeClass('portfolio-tab-2a portfolio-tab-2b');
    // $('html').addClass('portfolio-tab-1');
    // javascript:history.back()
    // $('.portfolio-wrapper').animate({ scrollTop: 0}, 300, 'swing');
    // parent.history.back();
    // return false;
  })

  $('#tab-1 .video').click(function() {
    var currentpath = window.location.pathname;
    // $('header').addClass('hide');
    $('nav.upper .return-button').attr("href", currentpath);
    // $('html').addClass('portfolio-to-top');
    $('audio').each(function() { $(this)[0].pause(); });
    // if ($("html").hasClass("audio-playing")) {
    //   // audio.pause();
    //   media.pause();
      $('html').removeClass('audio-playing music voice-over');
      // $('html').removeClass('music');
      // $('html').removeClass('voice-over');
    // }
  })

  // Colored HTML background
  $(window).scroll(function () {
    $('html').toggleClass("top-out-of-viewport", ($(window).scrollTop() > 100));
  });

});
