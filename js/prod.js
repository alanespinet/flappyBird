(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Bird(x, y) {
  this.x = x;
  this.y = y;
  this.speedY = 0;
  this.gravity = 1;
  this.sprites = [document.getElementById("bird1"), document.getElementById("bird2"), document.getElementById("bird3")];

  this.currentSprite = 0;
  this.updates = 0;
  this.initControls();
}

Bird.prototype.update = function () {
  this.speedY += this.gravity;
  this.updates++;

  if (this.updates % 5 === 0) this.currentSprite = (this.currentSprite + 1) % this.sprites.length;

  this.y += this.speedY;
  if (this.y < 0) this.y = 0;
};

Bird.prototype.render = function (ctx) {
  ctx.drawImage(this.sprites[this.currentSprite], this.x, this.y, 45, 32);
};

Bird.prototype.initControls = function () {
  var _this = this;

  window.addEventListener("keydown", function (e) {
    if (e.keyCode === 32) _this.speedY = -15;
  });
  window.addEventListener("touchstart", function (e) {
    _this.speedY = -15;
  });
};

exports.default = Bird;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Pipe(x, y, speed, w, h) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.w = w;
  this.h = h;
}

Pipe.prototype.update = function () {
  this.x -= this.speed;
};

Pipe.prototype.render = function (ctx) {
  ctx.save();
  ctx.fillStyle = "#00E800";
  ctx.fillRect(this.x, this.y, this.w, this.h);
  ctx.lineWidth = 10;
  ctx.strokeRect(this.x, this.y, this.w, this.h);
  ctx.restore();
};

exports.default = Pipe;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Pipe = require('./Pipe.js');

var _Pipe2 = _interopRequireDefault(_Pipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generatePipe(pipes) {
  var heightTop = Math.random() * 200 + 100;
  var heightBottom = 600 - heightTop - 200;

  var pipeTop = new _Pipe2.default(1000, -10, 3, 150, heightTop);
  var pipeBottom = new _Pipe2.default(1000, 610 - heightBottom, 3, 150, heightBottom);

  pipes.push(pipeTop);
  pipes.push(pipeBottom);
}

exports.default = generatePipe;

},{"./Pipe.js":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Scene() {
  this.bg = document.getElementById("bg");
  this.xOffset = 0;
  this.maxWidth = 1000;
}

Scene.prototype.update = function () {
  this.xOffset--;
  if (this.xOffset < -450) this.xOffset = 0;
};

Scene.prototype.render = function (ctx) {
  for (var i = 0; i <= this.maxWidth + 450; i += 449) {
    ctx.drawImage(this.bg, i + this.xOffset, 0, 450, 600);
  }
};

exports.default = new Scene();

},{}],5:[function(require,module,exports){
'use strict';

var _Scene = require('./Scene.js');

var _Scene2 = _interopRequireDefault(_Scene);

var _Bird = require('./Bird.js');

var _Bird2 = _interopRequireDefault(_Bird);

var _PipeGenerator = require('./PipeGenerator.js');

var _PipeGenerator2 = _interopRequireDefault(_PipeGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var pipes = [];

window.onload = function () {
  var bird = new _Bird2.default(475, 278);
  setInterval(_PipeGenerator2.default, 3000, pipes);

  function initGameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    _Scene2.default.update();
    _Scene2.default.render(ctx);

    bird.update();
    bird.render(ctx);

    pipes.forEach(function (pipe, i) {
      if (pipe.x < -pipe.width) {
        delete pipes[i];
      } else {
        pipe.update();
        pipe.render(ctx);
      }
    });

    window.requestAnimationFrame(initGameLoop);
  }

  initGameLoop();
};

},{"./Bird.js":1,"./PipeGenerator.js":3,"./Scene.js":4}]},{},[5]);
