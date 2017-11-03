document.addEventListener("DOMContentLoaded", function() {

  var lastElementClicked;
  var body = document.querySelector("body");

  Barba.Pjax.init();
  Barba.Prefetch.init();

  Barba.Dispatcher.on('linkClicked', function(el) {
    lastElementClicked = el;
  });

  Barba.Dispatcher.on('initStateChange', function() {
    if (typeof ga === 'function') {
      ga('send', 'pageview', location.pathname);
    }
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
      if ($('html').is('html#video')) {
        if ($('.video-container iframe').is('iframe[src*="vimeo.com"]')) {
          var vimeo = document.querySelector('.video-container iframe[src*="vimeo.com"]');
          new Vimeo.Player(vimeo).setVolume(0);
        }
        // if ($('.video-container iframe').is('iframe[src*="youtube.com"]')) {
        //       // function onYouTubeIframeAPIReady() {
        //   //   player = new YT.Player('player', {});
        //   // }
        //   // var player = new YT.Player(document.querySelector('.video-container iframe'));
        //   // var player = YT.get('youtube-iframe');
        //
        //   // youtube.stopVideo()
        //   // $('iframe').css("display", "none");
        //   // setTimeout(function(){
        //   //   $('iframe').css("display", "block")
        //   // }, 1);
        //   // alert(youtube);
        // }
      }
      if (!$('html').hasClass("portfolio-open")) {
        $('html, body').animate({ scrollTop: 0 }, 400);
      }
      $('html#video .return-button').css({ opacity : 1 });
      $('html#video .return-button').animate({ opacity: 0 }, 1000);
      $('html.portfolio-open .portfolio-content').animate({ opacity: 0 }, 1000);
      $('html.portfolio-open .portfolio-wrapper').animate({
        scrollTop: $('.portfolio-wrapper').scrollTop() + ($('.portfolio').offset().top - $('.portfolio-wrapper').offset().top)
      }, 400);
      return $(this.oldContainer).animate({ opacity: 0 }, 1000).promise();
    },
    fadeIn: function() {
      var _this = this;
      var $el = $(this.newContainer);
      $(this.oldContainer).hide();
      // $('html, body').scrollTop();
      $('html, body').animate({ scrollTop: 0 }, 0);
      this.updatePageID();
      // $('body').scrollTop(0);
      // $(document).scrollTop(0);
      // $("html, body").animate({ scrollTop: "0" }, 300);
      // $('html, body').animate({ scrollTop: 0 }, 400);
      // alert('test!');

      // Fade carousel
      var intro = $(".index-intro > h1").hide(), i = 0;
      (function cycle() {
        intro.eq(i).fadeIn(1000)
        .delay(4500)
        .fadeOut(1000, cycle);
        i = ++i % intro.length;
      })();

      $('html#video .return-button').css({ opacity : 0 });
      $('html#video .return-button').animate({ opacity: 1 }, 1000);
      $('html.portfolio-open .portfolio-wrapper').delay(600).animate({ scrollTop: $('body').scrollTop() }, 400);
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
