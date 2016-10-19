const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

import scene from './Scene.js';
import Bird from './Bird.js';
import generatePipe from './PipeGenerator.js';

const pipes = [];

window.onload = function(){
  var bird = new Bird(475, 278);
  setInterval(generatePipe, 3000, pipes);

  function initGameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    scene.update();
    scene.render(ctx);

    bird.update();
    bird.render(ctx);

    pipes.forEach(function(pipe, i){
      if(pipe.x < -pipe.width){
        delete pipes[i];
      }
      else {
        pipe.update();
        pipe.render(ctx);
      }
    });

    window.requestAnimationFrame(initGameLoop);
  }

  initGameLoop();
};
