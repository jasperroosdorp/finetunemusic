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
      // document.body.scrollTop = 0;
      return $(this.oldContainer).animate({ opacity: 0 }, 1000).promise();
    },
    fadeIn: function() {
      var _this = this;
      var $el = $(this.newContainer);
      $(this.oldContainer).hide();
      document.body.scrollTop = 0;
      this.updatePageID();
      $("[data-bg-color]").attr( "data-bg-color", this.newContainer.dataset.page );
      $el.css({ visibility : 'visible', opacity : 0 });
      $el.animate({ opacity: 1 }, 1000, function() { _this.done(); });
    },
    updatePageID: function() {
      var newID = this.newContainer.dataset.pageid;
      $('html').attr('id', newID);
    },
    closeWindows: function() {
      $('html').removeClass('nav-unfolded portfolio-open');
    }
  });

  Barba.Pjax.getTransition = function() {
    return FadeTransition;
  };
});
