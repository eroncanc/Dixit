function Sprite(options) {

  this.frameIndex = 0;
  this.tickCount = 0;
  this.ticksPerFrame = options.ticksPerFrame;
  this.numberOfFrames = options.numberOfFrames;
  this.numberOfCols = options.numberOfCols;
  this.width = options.width;
  this.height = options.height;
  this.image = options.image;
}

Sprite.prototype.render = function(ctx, index, player) {

  var row = Math.floor(this.frameIndex / this.numberOfCols);
  var col = this.frameIndex - (row * this.numberOfCols);
  var sx = col * this.width / this.numberOfCols;
  var sy = row * this.height;
  var score = player.score;
  // console.log(score);
  var yCenter;
  var xCenter;
  var rotateParams;
  switch (score) {
  case 0:
    yCenter = board.canvas.width - (board.canvas.width / 7.3);
    xCenter = 51 - board.canvas.height / 2.8;
    rotateParams = this.rotate("left");
    break;
  case 1:
    yCenter = board.canvas.width - (board.canvas.width / 4.5);
    xCenter = 51 - board.canvas.height / 2.8;
    rotateParams = this.rotate("left");
    break;
  case 2:
    yCenter = board.canvas.width - (board.canvas.width / 3.6);
    xCenter = 51 - board.canvas.height / 2.8;
    rotateParams = this.rotate("left");
    break;
  case 3:
    yCenter = board.canvas.width - (board.canvas.width / 2.9);
    xCenter = 51 - board.canvas.height / 2.6;
    rotateParams = this.rotate("left");
    break;
  case 4:
    yCenter = board.canvas.width - (board.canvas.width / 2.5);
    xCenter = 51 - board.canvas.height / 2.4;
    rotateParams = this.rotate("left");
    break;
  case 5:
    yCenter = board.canvas.width - (board.canvas.width / 2.2);
    xCenter = 51 - board.canvas.height / 3;
    rotateParams = this.rotate("left");
    break;
  case 6:
    yCenter = board.canvas.width - (board.canvas.width / 2);
    xCenter = 51 - board.canvas.height / 2.4;
    rotateParams = this.rotate("left");
    break;
  case 7:
    yCenter = board.canvas.width - (board.canvas.width / 1.8);
    xCenter = 51 - board.canvas.height / 2.8;
    rotateParams = this.rotate("left");
    break;
  case 8:
    yCenter = board.canvas.width - (board.canvas.width / 1.65);
    xCenter = 51 - board.canvas.height / 2.4;
    rotateParams = this.rotate("left");
    break;
  case 9:
    yCenter = board.canvas.width - (board.canvas.width / 1.52);
    xCenter = 51 - board.canvas.height / 2.65;
    rotateParams = this.rotate("left");
    break;
  case 10:
    yCenter = board.canvas.width - (board.canvas.width / 1.38);
    xCenter = 51 - board.canvas.height / 2.65;
    rotateParams = this.rotate("left");
    break;
  case 11:
    yCenter = board.canvas.width - (board.canvas.width / 1.26);
    xCenter = 51 - board.canvas.height / 2.65;
    rotateParams = this.rotate("left");
    break;
  case 12:
    yCenter = board.canvas.width - (board.canvas.width / 1.16);
    xCenter = 51 - board.canvas.height / 2.60;
    rotateParams = this.rotate("left");
    break;
  case 13:
    yCenter = board.canvas.width - (board.canvas.width / 1.08);
    xCenter = 51 - board.canvas.height / 2.35;
    rotateParams = this.rotate("left");
    break;
  case 14:
    yCenter = board.canvas.width - (board.canvas.width / 1.02);
    xCenter = 51 - board.canvas.height / 2.80;
    rotateParams = this.rotate("up");
    break;
  case 15:
    yCenter = board.canvas.width - (board.canvas.width / 1.02);
    xCenter = 51 - board.canvas.height / 4.5;
    rotateParams = this.rotate("up");
    break;
  case 16:
    yCenter = board.canvas.width - (board.canvas.width / 1.1);
    xCenter = 51 - board.canvas.height / 5.1;
    rotateParams = this.rotate("right");
    break;
  case 17:
    yCenter = board.canvas.width - (board.canvas.width / 1.18);
    xCenter = 51 - board.canvas.height / 8.4;
    rotateParams = this.rotate("right");
    break;
  case 18:
    yCenter = board.canvas.width - (board.canvas.width / 1.3);
    xCenter = 51 - board.canvas.height / 7;
    rotateParams = this.rotate("right");
    break;
  case 19:
    yCenter = board.canvas.width - (board.canvas.width / 1.38);
    xCenter = 51 - board.canvas.height / 4.5;
    rotateParams = this.rotate("right");
    break;
  case 20:
    yCenter = board.canvas.width - (board.canvas.width / 1.5);
    xCenter = 51 - board.canvas.height / 4.5;
    rotateParams = this.rotate("right");
    break;
  case 21:
    yCenter = board.canvas.width - (board.canvas.width / 1.56);
    xCenter = 51 - board.canvas.height / 7.5;
    rotateParams = this.rotate("right");
    break;
  case 22:
    yCenter = board.canvas.width - (board.canvas.width / 1.74);
    xCenter = 51 - board.canvas.height / 7;
    rotateParams = this.rotate("right");
    break;
  case 23:
    yCenter = board.canvas.width - (board.canvas.width / 1.95);
    xCenter = 51 - board.canvas.height / 7;
    rotateParams = this.rotate("right");
    break;
  case 24:
    yCenter = board.canvas.width - (board.canvas.width / 2.2);
    xCenter = 51 - board.canvas.height / 7;
    rotateParams = this.rotate("right");
    break;
  case 25:
    yCenter = board.canvas.width - (board.canvas.width / 2.5);
    xCenter = 51 - board.canvas.height / 7.2;
    rotateParams = this.rotate("right");
    break;
  case 26:
    yCenter = board.canvas.width - (board.canvas.width / 2.8);
    xCenter = 51 - board.canvas.height / 5.6;
    rotateParams = this.rotate("right");
    break;
  case 27:
    yCenter = board.canvas.width - (board.canvas.width / 3.3);
    xCenter = 51 - board.canvas.height / 5.6;
    rotateParams = this.rotate("right");
    break;
  case 28:
    yCenter = board.canvas.width - (board.canvas.width / 4);
    xCenter = 51 - board.canvas.height / 5.8;
    rotateParams = this.rotate("right");
    break;
  case 29:
    yCenter = board.canvas.width - (board.canvas.width / 5.3);
    xCenter = 51 - board.canvas.height / 6;
    rotateParams = this.rotate("right");
    break;
  case 30:
    yCenter = board.canvas.width - (board.canvas.width / 7.5);
    xCenter = 51 - board.canvas.height / 7;
    rotateParams = this.rotate("right");
    break;
  default:
    yCenter = board.canvas.width - (board.canvas.width / 8);
    xCenter = 51 - board.canvas.height / 2.8;
  }
  var x;
  var y;
  if (index === 0) {
    x = xCenter + board.canvas.height / 40;
    y = yCenter;
  } else if (index === 1) {
    x = xCenter + board.canvas.height / 40;
    y = yCenter + board.canvas.width / 40;
  } else if (index === 2) {
    x = xCenter;
    y = yCenter + board.canvas.width / 40;
  } else if (index === 3) {
    x = xCenter - board.canvas.height / 40;
    y = yCenter + board.canvas.width / 40;
  } else if (index === 4) {
    x = xCenter;
    y = yCenter;
  } else {
    x = xCenter - board.canvas.height / 40;
    y = yCenter;
  }

  // Draw the animation
  ctx.save();
  ctx.translate(rotateParams.tx, rotateParams.ty);
  ctx.rotate(rotateParams.angle * Math.PI / 180);
  ctx.drawImage(this.image, sx, sy, this.width / this.numberOfCols,
      this.height, x, y, this.width / this.numberOfCols, this.height);
  ctx.restore();
}

Sprite.prototype.update = function() {
  this.tickCount += 1;

  if (this.tickCount > this.ticksPerFrame) {
    this.tickCount = 0;
    // If the current frame index is in range
    if (this.frameIndex < this.numberOfFrames - 1) {
      // Go to the next frame
      this.frameIndex += 1;
    } else {
      this.frameIndex = 0;
    }
  }
}

Sprite.prototype.rotate = function(dir) {
  var tx, ty, angle;
  switch (dir) {
  case "left":// left
    tx = 0;
    ty = this.height;
    angle = 270;
    break;
  case "up":
    tx = 0;
    ty = 0;
    angle = 0;
  case "right":
    angle = 90;
    tx = 0;
    ty = 0;
  }
  return {
    tx : tx,
    ty : ty,
    angle : angle
  };
}