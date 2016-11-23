function DrawCanvas (parent) {
  this.canvas = document.createElement('canvas');
  this.canvas.width = 600;
  this.canvas.height = 600;
  parent.appendChild(this.canvas);
  this.ctx = this.canvas.getContext('2d');
  this.isX = false;

  this.drawBackground();
};

DrawCanvas.prototype.drawBackground = function () {
  this.drawRect(150, 150);
  this.drawRect(250, 150);
  this.drawRect(350, 150);
  this.drawRect(150, 250);
  this.drawRect(250, 250);
  this.drawRect(350, 250);
  this.drawRect(150, 350);
  this.drawRect(250, 350);
  this.drawRect(350, 350);
};

DrawCanvas.prototype.drawRect = function (x, y) {
  this.ctx.strokeStyle = '#222';
  this.ctx.lineWidth = 5;
  this.ctx.strokeRect(x, y, 100, 100);
};

//判断鼠标落入的矩形框坐标
DrawCanvas.prototype.mouseLocation = function (x, y) {
  if (x >= 150 && x <250) {
    if (y >= 150 && y < 250) {
      return {x: 150, y: 150};
    } else if (y >= 250 && y < 350) {
      return {x: 150, y: 250};
    } else if (y >= 350 && y <= 450) {
      return {x: 150, y: 350};
    }
  } else if (x >= 250 && x < 350) {
    if (y >= 150 && y < 250) {
      return {x: 250, y: 150};
    } else if (y >= 250 && y < 350) {
      return {x: 250, y: 250};
    } else if (y >= 350 && y <= 450) {
      return {x: 250, y: 350};
    }
  } else if (x >= 350 && x <= 450) {
    if (y >= 150 && y < 250) {
      return {x: 350, y: 150};
    } else if (y >= 250 && y < 350) {
      return {x: 350, y: 250};
    } else if (y >= 350 && y <= 450) {
      return {x: 350, y: 350};
    }  
  }
};

//判断鼠标点击位置，在当前矩形中绘图
DrawCanvas.prototype.drawX = function (loc) {
  this.ctx.beginPath();
  this.ctx.moveTo(loc.x, loc.y);
  this.ctx.lineTo(loc.x + 100, loc.y + 100);
  this.ctx.moveTo(loc.x + 100, loc.y);
  this.ctx.lineTo(loc.x, loc.y + 100);
  this.ctx.stroke();
};

DrawCanvas.prototype.drawO = function (loc) {
  this.ctx.beginPath();
  var circle = {
    x: loc.x + 50,
    y: loc.y + 50,
    r: 25
  };
  this.ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, true);
  this.ctx.stroke();
};

var myCanvas = new DrawCanvas(document.body);

document.addEventListener("click", function (event) {
  var bbox = myCanvas.canvas.getBoundingClientRect();
  var x = (event.clientX - bbox.left) * (myCanvas.canvas.width / bbox.width);
  var y = (event.clientY - bbox.top) * (myCanvas.canvas.width / bbox.width);
  var locObj = myCanvas.mouseLocation(x, y);
  if (myCanvas.isX) {
    myCanvas.drawX(locObj);
    myCanvas.isX = false;
  } else {
    myCanvas.drawO(locObj);
    myCanvas.isX = true;
  }
});