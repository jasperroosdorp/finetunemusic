// Barba.Dispatcher.on('linkClicked', function() {
// });

// Barba.Dispatcher.on('newPageReady', function() {
// fluidvids.init({
//   selector: ['iframe', 'object'], // runs querySelectorAll()
//   players: ['www.youtube.com', 'player.vimeo.com'] // players to support
// });
// });

Barba.Dispatcher.on('transitionCompleted', function() {

  // Equalizer animation
  var bars = $('.music-bar .bar');
  var tl = (new TimelineMax()).staggerTo(bars, .3, {
    y: -10,
    repeat:-1,
    paused: false,
    yoyo:true,
    ease: Quad.easeInOut}, .25
  );
  $('.music-bar').on('click', function(){
    tl.isActive() ? pause() : tl.play();
  });
  function pause() {
    tl.pause();
    TweenMax.to(bars, .7, {
      y: 15,
      ease: Quad.easeOut}
    );
  }

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

  // Fade carousel
  var intro = $(".home-intro > h1").hide(), i = 0;
  (function cycle() {
    intro.eq(i).fadeIn(400)
    .delay(5000)
    .fadeOut(400, cycle);
    i = ++i % intro.length;
  })();

  // Navigation
  $('.unfold-nav').click(function() {
    $('html').addClass('nav-unfolded');
  })
  $('.fold-nav').click(function() {
    $('html').removeClass('nav-unfolded');
  })

  // Colored HTML background
  $(window).scroll(function () {
    $('html').toggleClass("top-out-of-viewport", ($(window).scrollTop() > 100));
  });

  var player = new Vimeo.Player('vimeo');

  player.on('play', function() {
    $("html").addClass("video-playing");
    if($("html").hasClass("audio-playing")) { audio.pause(); }
  });

  player.on('pause', function() {
    $("html").removeClass("video-playing");
  });

  audio = $('#audio-player').bind('play', function() {
    if($('html').hasClass('video-playing')) { player.pause() }
  });

});
