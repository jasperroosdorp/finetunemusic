// @codekit-prepend '../node_modules/jquery/dist/jquery.min.js'
// @codekit-prepend '../node_modules/cloudinary-core/cloudinary-core-shrinkwrap.min.js'
// @codekit-prepend '../node_modules/moveto/dist/moveTo.min.js'
// @codekit-prepend 'mediaelement-and-player.js'
// @codekit-prepend 'mep-feature-playlist.js'

// Animation for MoveTo.js
document.addEventListener('DOMContentLoaded', function(){
  const easeFunctions = {
    easeInQuad: function (t, b, c, d) {
      t /= d;
      return c * t * t + b;
    },
    easeOutQuad: function (t, b, c, d) {
      t /= d;
      return -c * t* (t - 2) + b;
    }
  }
  const moveTo = new MoveTo({
    ease: 'easeInQuad'
  }, easeFunctions);
  const triggers = document.getElementsByClassName('moveto');
  for (var i = 0; i < triggers.length; i++) {
    moveTo.registerTrigger(triggers[i]);
  }
});


// Initialize mediaelementplayer
$(function(){
  $('video,audio').mediaelementplayer({
    loop: true,
    shuffle: false,
    playlist: true,
    audioHeight: 30,
    playlistposition: 'bottom',
    features: ['playpause', 'current', 'progress', 'duration', 'playlistfeature'],
    keyActions: []
  });
});
