function animate() {
  requestAnimFrame(animate);
  if(Game.ready) {
    Game.ball.draw();
  }
}