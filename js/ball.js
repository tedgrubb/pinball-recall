Ball = function() {
  var self = {};

  self.init = function() {
    self.x = null;
    self.y = null;
    self.radius = 15;
    self.lineWidth = 6;
    self.size = 40;
    self.speed = 10;
    self.canvas = $("#ball").getContext('2d');

    self.path_index = 0;
    self.options = {
      fillStyle: "#2fbeea",
      strokeStyle: "#FFFFFF",
      lineWidth: self.lineWidth
    }
  }

  self.init();

  self.draw = function() {
    if (Game.path.length == self.path_index) {
      return false;
    }

    self.canvas.merge(self.options);
    self.canvas.clearRect(self.x-(self.size/2), self.y-(self.size/2), self.size, self.size);

    if (self.x == null) {
      self.x = Game.path[self.path_index].x;
      self.y = Game.path[self.path_index].y;
    }

    if (self.y < Game.path[self.path_index].y) {
      self.y += self.speed;
    } else if (self.y > Game.path[self.path_index].y) {
      self.y -= self.speed;
    }

    if (self.x < Game.path[self.path_index].x) {
      self.x += self.speed;
    } else if (self.x > Game.path[self.path_index].x) {
      self.x -= self.speed;
    }

    if (self.y == Game.path[self.path_index].y && self.x == Game.path[self.path_index].x) {
      if (self.path_index != 0 && (self.path_index < Game.path.length-1)) {
        Game.paddles['paddle_' + self.path_index].bend();
      }
      self.path_index ++;
    }

    self.canvas.beginPath();
    self.canvas.arc(self.x, self.y, self.radius, 0, 2 * Math.PI, false);
    self.canvas.fill();
    self.canvas.stroke();
  }

  return self;
};