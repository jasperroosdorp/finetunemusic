// @codekit-prepend "vimeo-api.min.js", "../node_modules/barba.js/dist/barba.min.js", "barba.js", "../node_modules/gsap/src/minified/TweenMax.min.js", "../node_modules/fluidvids.js/dist/fluidvids.min.js", "portfolio.js", "equalizer.js";

// $(document).ready(function() {
//   // run test on initial page load
//   // checkSize();
//
//   // run test on resize of the window
//   // $(window).resize(checkSize);
//
//   $('.portfolio-nav-a').on('click', function(event) {
//     if ($(".portfolio-wrapper").css("float") == "none" ){
//       // $('body').animate({ scrollTop: 0}, 300, 'swing');
//       alert('yes!');
//     }
//   });
// });

// $('nav.upper a').on('click', checkSize());

// Show contact segment
// function showContact() {
//   $('html, body').animate({
//     scrollTop: $('footer').offset().top
//   }, 1000);
//   $('html').removeClass('nav-unfolded');
//   if (!$('html').hasClass('contact-visible')) {
//     $('html').addClass('contact-visible');
//   }
// };


document.addEventListener("DOMContentLoaded", function() {

  // Fade carousel
  var intro = $(".index-intro > h1").hide(), i = 0;
  (function cycle() {
    intro.eq(i).fadeIn(1000)
    .delay(4500)
    .fadeOut(1000, cycle);
    i = ++i % intro.length;
  })();

  // Language switch in navigation
  $('.language-switch').on('click', function() {
    if($(this).hasClass('en')) { var newUrl = $('.barba-container').attr('data-url-en'); }
    if($(this).hasClass('de')) { var newUrl = $('.barba-container').attr('data-url-de'); }
    if($(this).hasClass('nl')) { var newUrl = $('.barba-container').attr('data-url-nl'); }
    window.location.href = newUrl;
  });

  // Fold and unfold navigation
  $('.nav-trigger').click(function() {
    $('html').toggleClass('nav-unfolded');
  });

  // Reveal mobile navigation
  $('.mob-nav-toggle').click(function() {
    $('html').toggleClass('mob-nav-unfolded');
  });

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
  // var tabheight = $('#tab-1').height();
  // $('#tab-2').css('height', tabheight);

});

Barba.Dispatcher.on('transitionCompleted', function(current, prev, newContainer) {

  // Barba is done
  $('html').removeClass('barba-active');

  // Stop audio when video is clicked
  $('#tab-1 .video, .info-section .links a').click(function() {
    var currentpath = window.location.pathname;
    $('nav.upper .return-button').attr("href", currentpath);
    $('audio').each(function() { $(this)[0].pause(); });
    $('html').removeClass('audio-playing music voice-over');
  })

  // Extend footer background color to html background
  // $(window).scroll(function () {
  //   $('html').toggleClass("top-out-of-viewport", ($(window).scrollTop() > 100));
  // });

});
