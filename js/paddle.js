Paddle = function(canvas, d, x, y) {
  var self = {};
  var size = 60;
  var width = 30;
  var padding = 15;
  var zero = 120;
  var canvas = null;

  self.start = {
    x: ((zero + padding) + (size * x)),
    y: ((zero + padding) + (size * y)) + (d * width)
  }

  self.end = {
    x: (self.start.x + 30),
    y: (self.start.y + 30) - (d * (width * 2))
  }

  self.init = function() {
    canvas = $("#paddles").getContext('2d');
    self.show();
  }

  self.show = function() {
    canvas.setLineDash([0]);

    Draw.line(canvas,
      { x: self.start.x, y: self.start.y },
      { x: self.end.x, y: self.end.y },
      {
        lineWidth: 18,
        lineCap: 'round',
        strokeStyle: '#745d3f'
      }
    );

    Draw.line(canvas,
      { x: self.start.x, y: self.start.y },
      { x: self.end.x, y: self.end.y },
      {
        lineWidth: 10,
        lineCap: 'round',
        strokeStyle: '#FFFFFF'
      }
    );
  }

  self.bend = function() {
    self.hide();

    canvas.beginPath();
    canvas.moveTo(self.start.x, self.start.y);
    canvas.quadraticCurveTo(self.end.x-32, self.end.y, self.end.x, self.end.y);
    canvas.strokeStyle = '#745d3f';
    canvas.lineWidth = 18;
    canvas.stroke();

    canvas.beginPath();
    canvas.moveTo(self.start.x, self.start.y);
    canvas.quadraticCurveTo(self.end.x-35, self.end.y, self.end.x, self.end.y);
    canvas.strokeStyle = '#FFFFFF';
    canvas.lineWidth = 10;
    canvas.stroke();

    setTimeout(function() {
      self.hide();
      self.show();
    }, 60);
  }

  self.fade = function() {
    alpha = 0;
    canvas.setLineDash([0]);

    self.int = setInterval(function() {
      self.hide(alpha);
      alpha += 0.2;
      if(alpha > 10) {
        clearInterval(self.int);
      }
    }, 60);
  }

  self.hide = function(alpha) {
    alpha = alpha == undefined ? 10 : alpha;
    start_x = self.start.x-10;
    start_y = d ? self.start.y-40 : self.start.y-10;
    Draw.box(canvas,
      {x: start_x, y: start_y},
      {x: 50, y: 50},
      {
        fillStyle: 'rgba(58, 31, 10, '+ alpha/10 +')'
        //fillStyle: 'red'
      }
    );
  }

  self.init();

  return self;
};