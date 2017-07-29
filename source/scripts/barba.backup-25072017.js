document.addEventListener("DOMContentLoaded", function() {
  var lastElementClicked;
  // var PrevLink = document.querySelector('a.prev');
  // var NextLink = document.querySelector('a.next');

  Barba.Pjax.init();
  Barba.Prefetch.init();

  Barba.Dispatcher.on('linkClicked', function(el) {
    lastElementClicked = el;
  });

  var MovePage = Barba.BaseTransition.extend({
    start: function() {
      this.originalThumb = lastElementClicked;

      Promise
      .all([this.newContainerLoading, this.scrollTop()])
      .then(this.movePages.bind(this));
    },

    scrollTop: function() {
      var deferred = Barba.Utils.deferred();
      var obj = { y: window.pageYOffset };

      TweenLite.to(obj, 0.4, {
        y: 0,
        onUpdate: function() {
          if (obj.y === 0) {
            deferred.resolve();
          }

          window.scroll(0, obj.y);
        },
        onComplete: function() {
          deferred.resolve();
        }
      });

      return deferred.promise;
    },

    movePages: function() {
      var _this = this;
      this.closeWindows();
      $('html').addClass('barba-active');
      TweenLite.set(this.oldContainer, {
        pointerEvents: 'none'
      });
      TweenLite.set(this.newContainer, {
        pointerEvents: 'none',
        position: 'fixed',
        visibility: 'hidden'
      });
      TweenLite.to(this.oldContainer, 0.6, {
        opacity: 0,
        display: 'none',
        onComplete: function() {
          _this.updatePageID();
          TweenLite.set(_this.newContainer, {
            clearProps: 'position',
            visibility: 'visible',
            opacity: 0
          });
        }
      });
      TweenLite.to(this.newContainer, 0.6, {
        delay: 0.9,
        opacity: 1,
        onComplete: function() {
          TweenLite.set(_this.newContainer, { clearProps: 'all' });
          $('html').removeClass('barba-active');
          _this.done();
        }});
      },

      updatePageID: function() {
        var newID = this.newContainer.dataset.pageid;
        $('html').attr('id', newID);
      },

      closeWindows: function() {
        $('html').removeClass('nav-unfolded portfolio-open');
      }

    //   getNewPageFile: function() {
    //     return Barba.HistoryManager.currentStatus().url.split('/').pop();
    //   }
    });

    Barba.Pjax.getTransition = function() {
      return MovePage;
    };
  });
