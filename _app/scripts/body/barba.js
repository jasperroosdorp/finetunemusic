document.addEventListener("DOMContentLoaded", function() {

  var lastElementClicked;
  var body = document.querySelector("body");

  Barba.Pjax.init();
  Barba.Prefetch.init();

  Barba.Dispatcher.on('linkClicked', function(el) {
    lastElementClicked = el;
  });

  Barba.Dispatcher.on('newPageReady', function(current, prev, container) {
    history.scrollRestoration = 'manual';
  });

  var FadeTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
    },
    fadeOut: function() {
      this.closeWindows();
      $('html#video .return-button').css({ opacity : 1 });
      $('html#video .return-button').animate({ opacity: 0 }, 1000);
      $('html.portfolio-open .portfolio-content').animate({ opacity: 0 }, 1000);
      $('.portfolio-wrapper').animate({
        scrollTop: $('.portfolio-wrapper').scrollTop() + ($('.portfolio').offset().top - $('.portfolio-wrapper').offset().top)
      }, 200);
      return $(this.oldContainer).animate({ opacity: 0 }, 1000).promise();
    },
    fadeIn: function() {
      var _this = this;
      var $el = $(this.newContainer);
      $(this.oldContainer).hide();
      document.body.scrollTop = 0;
      this.updatePageID();
      $('html#video .return-button').css({ opacity : 0 });
      $('html#video .return-button').animate({ opacity: 1 }, 1000);
      $('html.portfolio-open .portfolio-wrapper').delay(800).animate({ scrollTop: $('body').scrollTop() }, 200);
      $('html.portfolio-open .portfolio-content').animate({ opacity: 1 }, 1000);
      $el.css({ visibility : 'visible', opacity : 0 });
      $el.animate({ opacity: 1 }, 1000, function() { _this.done(); });
    },
    updatePageID: function() {
      var newID = this.newContainer.dataset.pageid;
      $('html').attr('id', newID);
    },
    closeWindows: function() {
      $('html').removeClass('nav-unfolded');
    }
  });

  Barba.Pjax.getTransition = function() {
    return FadeTransition;
  };
});
