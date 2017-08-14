// OPEN PORTFOLIO
function openPortfolio(windowname) {
  var windowclass = '.' + windowname;
  if (!$('html').hasClass('portfolio-open')) {
    $('html').addClass('portfolio-open');
    $('.portfolio-content').tabslet({
    mouseevent: 'click',
    attribute: 'href',
    animation: true,
    active: 1
    });
  }
};

$(document).ready(function () {

  // NAVIGATION WITHIN PORTFOLIO
  $('.portfolio-nav-a').on('click', function(event) {
    $('.portfolio-wrapper').animate({ scrollTop: 0}, 300, 'swing');
 });

  // CLOSE PORTFOLIO
  $('.close-portfolio').on('click', function(event) {
    // $('.portfolio ul').find('.active-window').
    $('html').removeClass('portfolio-open');
    $('html').addClass('portfolio-closing');
    setTimeout(function(){ $('html').removeClass('portfolio-closing'); }, 300);
    $('.portfolio-wrapper').animate({ scrollTop: 0 }, 300);
  });

});
