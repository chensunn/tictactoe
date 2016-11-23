function DrawCanvas (parent) {
  this.canvas = document.createElement('canvas');
  this.canvas.width = 600;
  this.canvas.height = 600;
  parent.appendChild(this.canvas);
  this.ctx = this.canvas.getContext('2d');
  
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
  
}

//判断鼠标点击位置，在当前矩形中绘图
DrawCanvas.prototype.drawX = function (x, y) {

}

DrawCanvas.prototype.drawO = function (x, y) {

}

var canvas = new DrawCanvas(document.body);