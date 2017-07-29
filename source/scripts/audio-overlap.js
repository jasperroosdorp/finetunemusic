player.on('play', function() {
  // console.log('played the video!');
  // alert("playing!");
  $("html").addClass("video-playing");
  if($("html").hasClass("audio-playing")) {
    // alert("double sound");
    audio.pause();
  }
});
