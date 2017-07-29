$(document).ready(function () {
  // $('.open-portfolio, .close-portfolio').on('click', function(event) {
  //   if (!$('html').hasClass('portfolio-open')) {
  //     $('html').addClass('portfolio-open');
  //     $('.portfolio-nav').hide().delay(300).fadeIn(300);
  //     $('.portfolio > ul').show();
  //     if ($(this).hasClass('open-videos')) {
  //       $('.tab-link').addClass('first-open');
  //       $('.portfolio-nav-a.videos').trigger('click');
  //     }
  //     if ($(this).hasClass('open-muziek')) {
  //       $('.tab-link').addClass('first-open');
  //       $('.portfolio-nav-a.muziek').trigger('click');
  //     }
  //     if ($(this).hasClass('open-voice-overs')) {
  //       $('.tab-link').addClass('first-open');
  //       $('.portfolio-nav-a.voice-overs').trigger('click');
  //     }
  //   } else {
  //     $('html').removeClass('portfolio-open');
  //     $('html').addClass('portfolio-closing');
  //     setTimeout(function(){ $('html').removeClass('portfolio-closing'); }, 300);
  //     $('.portfolio-wrapper').animate({ scrollTop: 0 }, 300);
  //     $('.portfolio-nav, .portfolio > ul').fadeOut(200);
  //   }
  // });

  // NAVIGATION WITHIN PORTFOLIO
  $('.portfolio-nav-a').on('click', function(event) {
    $('.portfolio-wrapper').animate({ scrollTop: 0}, 300, 'swing');
    $('.portfolio-nav').find('.is-active').removeClass('is-active');
    $(this).addClass('is-active');
    if ($(this).hasClass('videos')) { $('.tab-link.videos').trigger('click'); }
    if ($(this).hasClass('muziek')) { $('.tab-link.muziek').trigger('click'); }
    if ($(this).hasClass('voice-overs')) { $('.tab-link.voice-overs').trigger('click'); }
  });

  // TAB SWITCHING
  $('.portfolio ul').on('click', 'li > a.tab-link', function(event) {
    if (!$(this).hasClass('first-open')) {
      event.preventDefault();
      $('.portfolio ul').find('.is-open').removeClass('is-open').fadeOut(300);
      $(this).next().toggleClass('is-open').delay(300).fadeIn(300);
      $('.portfolio ul').find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    } else {
      event.preventDefault();
      $('.portfolio ul').find('.first-open').removeClass('first-open');
      $('.portfolio ul').find('.is-open').removeClass('is-open').hide();
      $(this).next().toggleClass('is-open').delay(300).fadeIn(300);
      $('.portfolio ul').find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    }
  });

  // CLOSE PORTFOLIO
  $('.close-portfolio').on('click', function(event) {
    $('html').removeClass('portfolio-open');
    $('html').addClass('portfolio-closing');
    setTimeout(function(){ $('html').removeClass('portfolio-closing'); }, 300);
    $('.portfolio-wrapper').animate({ scrollTop: 0 }, 300);
    $('.portfolio-nav, .portfolio > ul').fadeOut(200);
  });
});

// OPEN PORTFOLIO
function openPortfolio(windowname) {
  var windowclass = '.' + windowname;
  if (!$('html').hasClass('portfolio-open')) {
    $('html').addClass('portfolio-open');
    $('.portfolio-nav').hide().delay(300).fadeIn(300);
    $('.portfolio > ul').show();
    $('.tab-link').addClass('first-open');
    $('.portfolio-nav-a' + windowclass).trigger('click');
  }
};
