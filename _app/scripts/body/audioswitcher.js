  jQuery(function($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if(supportsAudio) {
      var index = 0,
      playing = false;
      mediaPath = '..',
      extension = '',
      // tracks = [
      //   {"name":"Nummer A","file":"1"},
      //   {"name":"Nummer B","file":"2"},
      //   {"name":"Nummer C","file":"3"},
      //   {"name":"Nummer D","file":"4"},
      //   {"name":"Nummer E","file":"5"},
      //   {"name":"Nummer F","file":"6"}
      // ],
      trackCount = tracks.length,
      title = $('.audio-player-title'),
      audio = $('#audio-player').bind('play', function() {
        playing = true;
        $('html').addClass('audio-playing');
        // if($('html').hasClass('video-playing')) { alert('double play!') }
      }).bind('pause', function() {
        playing = false;
        $('html').removeClass('audio-playing');
      }).bind('ended', function() {
        if((index + 1) < trackCount) {
          index++;
          loadTrack(index);
          audio.play();
        } else {
          audio.pause();
          index = 0;
          loadTrack(index);
        }
      }).get(0),
      li = $('.audio-tracklist ul li').click(function() {
        var id = parseInt($(this).index());
        if(id !== index) {
          playTrack(id);
        }
      }),
      loadTrack = function(id) {
        $('.selected-track').removeClass('selected-track');
        $('.audio-tracklist ul li:eq(' + id + ')').addClass('selected-track');
        title.text(tracks[id].name);
        index = id;
        audio.src = mediaPath + tracks[id].file;
      },
      playTrack = function(id) {
        loadTrack(id);
        audio.play();
      };

      extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';

      loadTrack(index);
    }

    $('#useLegend').click(function(e) {
      e.preventDefault();
      $('#use').slideToggle(300, function() {
        $('#useSpanSpan').text(($('#use').css('display') == 'none' ? 'show' : 'hide'));
      });
    });
  });
