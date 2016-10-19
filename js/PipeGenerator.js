import Pipe from './Pipe.js';

function generatePipe(pipes){
  let heightTop  = Math.random()*200+100;
  let heightBottom = 600 - heightTop - 200;

  let pipeTop = new Pipe(1000, -10, 3, 150, heightTop);
  let pipeBottom = new Pipe(1000, 610 - heightBottom, 3, 150, heightBottom);

  pipes.push(pipeTop);
  pipes.push(pipeBottom);
}

export default generatePipe;
