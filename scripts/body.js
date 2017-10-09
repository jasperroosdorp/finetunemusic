// @codekit-prepend "../node_modules/barba.js/dist/barba.min.js", "barba.js", "../node_modules/gsap/src/minified/TweenMax.min.js", "../node_modules/fluidvids.js/dist/fluidvids.min.js", "portfolio.js", "equalizer.js";

document.addEventListener("DOMContentLoaded", function() {

  // Fade carousel
  var intro = $(".index-intro > h1").hide(), i = 0;
  (function cycle() {
    intro.eq(i).fadeIn(1000)
    .delay(4500)
    .fadeOut(1000, cycle);
    i = ++i % intro.length;
  })();

});

Barba.Dispatcher.on('linkClicked', function() {
  $('html').addClass('barba-active');
});

Barba.Dispatcher.on('newPageReady', function() {

  // Responsive images
  var cl = cloudinary.Cloudinary.new({cloud_name: "roosdorp"});
  cl.responsive();

  // Responsive videos
  fluidvids.init({
    selector: ['iframe', 'object'], // runs querySelectorAll()
    players: ['www.youtube.com', 'player.vimeo.com'] // players to support
  });

  // Set portfolio tab 2 to the size of tab 1
  var tabheight = $('#tab-1').height();
  $('#tab-2').css('height', tabheight);

});

Barba.Dispatcher.on('transitionCompleted', function(current, prev, newContainer) {

  // Barba is done
  $('html').removeClass('barba-active');

  // Fold and unfold navigation
  $('.unfold-nav').click(function() {
    $('html').addClass('nav-unfolded');
  })
  $('.fold-nav').click(function() {
    $('html').removeClass('nav-unfolded');
  })

  // Stop audio when video is clicked
  $('#tab-1 .video').click(function() {
    var currentpath = window.location.pathname;
    $('nav.upper .return-button').attr("href", currentpath);
    $('audio').each(function() { $(this)[0].pause(); });
    $('html').removeClass('audio-playing music voice-over');
  })

  // Extend footer background color to html background
  $(window).scroll(function () {
    $('html').toggleClass("top-out-of-viewport", ($(window).scrollTop() > 100));
  });

});
