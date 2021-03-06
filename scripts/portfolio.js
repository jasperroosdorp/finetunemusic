// OPEN PORTFOLIO
function openPortfolio(tab) {
  if(tab == 'tab-1') {
    $('html').removeClass('portfolio-tab-2a portfolio-tab-2b');
    $('html').addClass('portfolio-tab-1');
  }
  if(tab == 'tab-2a') {
    $('html').removeClass('portfolio-tab-1 portfolio-tab-2b');
    $('html').addClass('portfolio-tab-2a');
  }
  if(tab == 'tab-2b') {
    $('html').removeClass('portfolio-tab-1 portfolio-tab-2a');
    $('html').addClass('portfolio-tab-2b');
  }

  if (!$('html').hasClass('portfolio-open')) {
    $('html').addClass('portfolio-opening').removeClass('nav-unfolded mob-nav-unfolded');
    setTimeout(function(){
      $('html').removeClass('portfolio-opening').addClass('portfolio-open');
    }, 400);
  }
  if ($('html').hasClass('audio-playing music')) {
    $('html').removeClass('portfolio-tab-1 portfolio-tab-2b');
    $('html').addClass('portfolio-tab-2a');
  }
  if ($('html').hasClass('audio-playing sound_logo')) {
    $('html').removeClass('portfolio-tab-1 portfolio-tab-2a');
    $('html').addClass('portfolio-tab-2b');
  }
  // if ($(".testdiv").css("float") == "none" ){
  //   // $('html').animate({ scrollTop: 0}, 300, 'swing');
  //   // alert('mobile!');
  // }
};

$(document).ready(function () {

  // var tabheight = $('#tab-1').height();
  // $('#tab-2').css('height', tabheight);

  // NAVIGATION WITHIN PORTFOLIO
  $('.portfolio-nav-a').on('click', function(event) {
    // $('html').removeClass('portfolio-to-top');
    $('.portfolio-wrapper').animate({ scrollTop: 0}, 500, 'swing');
    // $('.portfolio-nav').addClass('test');
    // $('.portfolio-content > ul').attr("class", $(this).attr("class"));
    // $('.portfolio-nav').find('.active').removeClass('.active');
    // $(this).addClass('active');
    if($(this).hasClass('tab-1')) {
      $('html').removeClass('portfolio-tab-2a portfolio-tab-2b');
      $('html').addClass('portfolio-tab-1');
    }
    if($(this).hasClass('tab-2a')) {
      $('html').removeClass('portfolio-tab-1 portfolio-tab-2b');
      $('html').addClass('portfolio-tab-2a');
    }
    if($(this).hasClass('tab-2b')) {
      $('html').removeClass('portfolio-tab-1 portfolio-tab-2a');
      $('html').addClass('portfolio-tab-2b');
    }
  });

  // CLOSE PORTFOLIO
  $('.close-portfolio').on('click', function(event) {
    // $('.portfolio ul').find('.active-window').
    $('html').removeClass('portfolio-open');
    $('html').addClass('portfolio-closing');
    setTimeout(function(){ $('html').removeClass('portfolio-closing'); }, 500);
    $('.portfolio-wrapper').animate({ scrollTop: 0 }, 500);
  });

  $('.')

});
