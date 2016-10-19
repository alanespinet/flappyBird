function Bird(x, y){
  this.x = x;
  this.y = y;
  this.speedY = 0;
  this.gravity = 1;
  this.sprites = [document.getElementById("bird1"),
                  document.getElementById("bird2"),
                  document.getElementById("bird3")];

  this.currentSprite = 0;
  this.updates = 0;
  this.initControls();
}

Bird.prototype.update = function(){
  this.speedY += this.gravity;
  this.updates++;

  if(this.updates % 5 === 0)
    this.currentSprite = (this.currentSprite + 1) % this.sprites.length;

  this.y += this.speedY;
  if(this.y < 0) this.y = 0;
};

Bird.prototype.render = function(ctx){
  ctx.drawImage(this.sprites[this.currentSprite], this.x, this.y, 45, 32);
};

Bird.prototype.initControls = function(){
  window.addEventListener("keydown", (e) => {
    if(e.keyCode === 32)
      this.speedY = -15;
  });
  window.addEventListener("touchstart", (e) => {
    this.speedY = -15;
  });
};

export default Bird;
