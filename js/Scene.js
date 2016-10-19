function Scene(){
  this.bg = document.getElementById("bg");
  this.xOffset = 0;
  this.maxWidth = 1000;
}

Scene.prototype.update = function(){
  this.xOffset--;
  if(this.xOffset < -450) this.xOffset = 0;
}

Scene.prototype.render = function(ctx){
  for(var i = 0; i <= this.maxWidth + 450; i+=449)
    ctx.drawImage(this.bg, i+this.xOffset, 0, 450, 600);
}

export default new Scene();
