function Pipe(x, y, speed, w, h){
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.w = w;
  this.h = h;
}

Pipe.prototype.update = function(){
  this.x -= this.speed;
}

Pipe.prototype.render = function(ctx){
  ctx.save();
  ctx.fillStyle = "#00E800";
  ctx.fillRect(this.x, this.y, this.w, this.h);
  ctx.lineWidth = 10;
  ctx.strokeRect(this.x, this.y, this.w, this.h);
  ctx.restore();
}

export default Pipe;
