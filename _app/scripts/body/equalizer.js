// Equalizer animation
var bars = $('.music-bar .bar');
var tl = (new TimelineMax()).staggerTo(bars, .3, {
  y: -10,
  repeat:-1,
  paused: false,
  yoyo:true,
  ease: Quad.easeInOut}, .25
);
$('.music-bar').on('click', function(){
  tl.isActive() ? pause() : tl.play();
});
function pause() {
  tl.pause();
  TweenMax.to(bars, .7, {
    y: 15,
    ease: Quad.easeOut}
  );
}
