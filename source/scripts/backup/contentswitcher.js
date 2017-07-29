// Portfolio content switcher
$(document).ready(function () {
  // $('.portfolio-link').on('click', function(event) {
  //   $('html').toggleClass('portfolio-open');
  //   if ($(this).hasClass('open-videos')) { $('.videos-link').trigger('click'); }
  //   if ($(this).hasClass('open-muziek')) { $('.muziek-link').trigger('click'); }
  //   if ($(this).hasClass('open-voice-overs')) { $('.voice-overs-link').trigger('click'); }
  // });
  $('.open-portfolio').on('click', function(event) {
    if (!$('html').hasClass('portfolio-open')) {
      $('html').addClass('portfolio-open');
      if ($(this).hasClass('open-videos')) {
        $('.videos-link').addClass('first-open').trigger('click');
      }
      if ($(this).hasClass('open-muziek')) {
        $('.videos-link').addClass('first-open').trigger('click');
      }
      if ($(this).hasClass('open-voice-overs')) {
        $('.videos-link').addClass('first-open').trigger('click');
      }
    }
    else {
      $('html').removeClass('portfolio-open');
    }
  });
  // $('.open-muziek').on('click', function(event) {
  //   if (!$('html').hasClass('portfolio-open')) {
  //     $('html').addClass('portfolio-open');
  //     $('.muziek-link').trigger('click');
  //   } else {
  //     $('html').removeClass('portfolio-open');
  //   }
  // });
  // $('.open-voice-overs').on('click', function(event) {
  //   if (!$('html').hasClass('portfolio-open')) {
  //     $('html').addClass('portfolio-open');
  //     $('.voice-overs-link').trigger('click');
  //   } else {
  //     $('html').removeClass('portfolio-open');
  //   }
  // });
  // $('.accordion-tabs').on('click', 'li > a.tab-link', function(event) {
  //   if (!$(this).hasClass('is-active')) {
  //     event.preventDefault();
  //     var accordionTabs = $(this).closest('.accordion-tabs');
  //     // accordionTabs.find('.is-open').removeClass('is-open').hide();
  //     accordionTabs.find('.is-open').removeClass('is-open').fadeOut(400);
  //     // $(this).next().toggleClass('is-open').toggle();
  //     $(this).next().toggleClass('is-open').delay(400).fadeIn(400);
  //     accordionTabs.find('.is-active').removeClass('is-active');
  //     $(this).addClass('is-active');
  //   } else {
  //     event.preventDefault();
  //   }
  // });
  $('.portfolio ul').on('click', 'li > a.tab-link', function(event) {
    if (!$(this).hasClass('first-open')) {
      event.preventDefault();
      $('.portfolio ul').find('.is-open').removeClass('is-open').fadeOut(400);
      $(this).next().toggleClass('is-open').delay(400).fadeIn(400);
      $('.portfolio ul').find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    } else {
      event.preventDefault();
      $('.portfolio ul').find('.first-open').removeClass('first-open');
      $('.portfolio ul').find('.is-open').removeClass('is-open').hide();
      $(this).next().toggleClass('is-open').delay(300).fadeIn(400);
      $('.portfolio ul').find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    }
  });
});
