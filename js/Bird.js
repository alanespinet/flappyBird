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
  this.angle = 0;
  this.spriteWidth = 45;
  this.spriteHeight = 32;
  this.dead = false;
  this.initControls();
}

Bird.prototype.update = function(){
  this.speedY += this.gravity;
  this.updates++;
  this.angle = this.speedY * Math.PI / 100;

  if(this.updates % 5 === 0)
    this.currentSprite = (this.currentSprite + 1) % this.sprites.length;

  this.y += this.speedY;
  if(this.y < 0) this.y = 0;
  if(this.y > 1000) this.dead = true;
};

Bird.prototype.render = function(ctx){
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle);
  ctx.drawImage(this.sprites[this.currentSprite], -this.spriteWidth/2, -this.spriteHeight/2, 45, 32);
  ctx.restore();
};

Bird.prototype.detectCollisions = function(pipes){
  let collisionDetected = false;
  pipes.forEach((pipe, index)=>{
    if(pipe.y < 10){
      let a = this.x + this.spriteWidth / 2;
      let b = this.y - this.spriteHeight / 2;

      let x0 = pipe.x;
      let y0 = pipe.y + pipe.h;
      let x1 = x0 + pipe.w;
      collisionDetected = collisionDetected || (a > x0 && a < x1 && b < y0);
    }
    else {
      let a = this.x + this.spriteWidth / 2;
      let b = this.y - this.spriteHeight / 2;

      let x0 = pipe.x;
      let y1 = pipe.y;
      let x1 = x0 + pipe.w;
      collisionDetected = collisionDetected || (a > x0 && a < x1 && b > y1);
    }
  });
  if(collisionDetected){
    this.dead = true;
  }
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
