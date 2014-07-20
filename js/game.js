Game = (function() {
  // public space
  var self = {};
  self.ready = 0;
  self.paddles = {};
  self.top_lights = [];
  self.bottom_lights = [];
  self.right_lights = [];
  self.left_lights = [];
  self.path = [];

  self.settings = {
    name: 'Pinball Recall',
    canvis_id: 'game',
  }

  // private
  var grid_size = 60;
  var board = {
    cols: 6,
    rows: 6
  };
  var board_width = board['cols'] * grid_size;
  var board_height = board['rows'] * grid_size;
  var start_x = grid_size * 2; // + ((6 % board['cols']) * grid_size);
  var start_y = grid_size * 2; // + ((6 % board['rows']) * grid_size);
  var end_x = board_width + (grid_size * 2);
  var end_y = board_height + (grid_size * 2);
  var level = 1;

  // console.log("grid_size", grid_size);
  // console.log("board", board);
  // console.log("board_width", board_width);
  // console.log("board_height", board_height);
  // console.log("start_x", start_x);
  // console.log("start_y", start_y);

  var canvas = null;
  var initted = false;
  var img_path = 'images/';

  buildGame = function() {
    self.ball = new Ball();
    animate();

    // Background
    var img = new Image();
    img.src = img_path + 'wood.jpg';

    img.onload = function () {
      canvas.drawImage(img,0,0, 600, 600);

      drawOuterBox();
      drawInnerBox();
      drawGrid();
      drawLights();
      setPath();
      //drawPath();
      drawPaddles();

      self.ready = 1;
      //self.top_lights[1].start_marker();

      // setTimeout(function() {
      //   self.top_lights[1].start_marker();
      //   self.ready = 1;
      // }, 4600);
    }
  }

  setPath = function() {
    levels = [
      [
        {x: 510, y: 390},
        {x: 210, y: 390},
        {x: 210, y: 90}
      ], [
        {x: 210, y: 90},
        {x: 210, y: 390},
        {x: 510, y: 390}
      ], [
        {x: 210, y: 90},
        {x: 210, y: 390},
        {x: 390, y: 390},
        {x: 390, y: 210},
        {x: 270, y: 210},
        {x: 270, y: 510},
      ], [
        {x: 210, y: 90},
        {x: 210, y: 390},
        {x: 390, y: 390},
        {x: 390, y: 210},
        {x: 270, y: 210},
        {x: 270, y: 330},
        {x: 510, y: 330},
      ], [
        {x: 210, y: 90},
        {x: 210, y: 390},
        {x: 390, y: 390},
        {x: 390, y: 210},
        {x: 90, y: 210}
      ]
    ];

    self.path = levels[Math.randomInt(levels.length)];
  }

  // drawPath = function() {
  //   canvas.setLineDash([0]);
  //   turns = Math.randomInt(5)+4;
  //   path = [];
  //   start = randomCoord();
  //   path.push({x:(start.x*60)+150, y: (start.y*60)+150});
  //   for(i=1;i<turns;i++) {
  //     direction = Math.randomInt(2);
  //     if(direction == 0) {
  //       x = ( Math.randomInt(board.cols) * 60 ) + 150;
  //       y = path[i-1].y;
  //     } else {
  //       y = ( Math.randomInt(board.rows) * 60 ) + 150;
  //       x = path[i-1].x;
  //     }
  //     coords = randomCoord();

  //     path.push({x:x, y:y});
  //   }

  //   Draw.path(canvas,
  //     path,
  //     {lineWidth: 10,
  //      strokeStyle: '#FFFFFF'}
  //   );
  // }

  drawOuterBox = function() {
    Draw.box(
      canvas,
      {x: (start_x - grid_size), y: (start_y - grid_size)},
      {x: end_x, y: end_y},
      {
        fillStyle: '#311b09',
        globalAlpha: 0.4
      }
    );
  }

  drawInnerBox = function() {
    Draw.box(
      canvas,
      {x: start_x, y: start_y},
      {x: board_width, y: board_height},
      {
        fillStyle: '#3a1f0a',
        globalAlpha: 1
      }
    );
  }

  drawGrid = function() {
    canvas.setLineDash([8, 6]);

    // Horizontal Lines
    for(i = 1; i < board.rows; i++) {
      offset_y = start_y + (grid_size * i);

      Draw.line(
        canvas,
        {x: start_x, y: offset_y},
        {x: end_x, y: offset_y},
        {
          lineWidth: 3,
          strokeStyle: '#543111'
        }
      );
    }

    // Vertical Lines
    for(i = 1; i < board.cols; i++) {
      offset_x = start_x + (grid_size * i);

      Draw.line(
        canvas,
        {x: offset_x, y: start_y},
        {x: offset_x, y: end_y},
        {
          lineWidth: 3,
          strokeStyle: '#543111'
        }
      );
    }
  }

  drawLights = function() {
    for(i = 0; i < board['cols']; i++) {
      // Horizontal Lights
      x = 150 + (60 * i);
      self.top_lights.push(new Light(canvas, x, 90));
      self.bottom_lights.push(new Light(canvas, x, (board_height + (grid_size * 2)) + 30));
    }

    for(i = 0; i < board['rows']; i++) {
      // Vertical Lights
      y = 150 + (60 * i);
      self.left_lights.push(new Light(canvas, 90, y));
      self.right_lights.push(new Light(canvas, (board_width + (grid_size * 2)) + 30, y));
    }

    // showLights(self.top_lights);

    // setTimeout(function() { showLights(self.right_lights) }, 200);
    // setTimeout(function() { showLights(self.bottom_lights.reverse()) }, 400);
    // setTimeout(function() { showLights(self.left_lights.reverse()) }, 600);

    // setTimeout(function() { showLights(self.top_lights.reverse()) }, 800);
    // setTimeout(function() { showLights(self.left_lights.reverse()) }, 1000);
    // setTimeout(function() { showLights(self.bottom_lights.reverse()) }, 1200);
    // setTimeout(function() { showLights(self.right_lights.reverse()) }, 1400);

    // setTimeout(function() {
    //   for(i=0;i<board['cols']; i++) {
    //     self.top_lights[i].glow(0.025);
    //     self.bottom_lights[i].glow(0.025);
    //   }
    //   for(x=0;x<board['rows']; x++) {
    //     self.left_lights[x].glow(0.025);
    //     self.right_lights[x].glow(0.025);
    //   }
    // }, 1000);
  }

  drawPaddles = function() {
    setTimeout(function() {
      total = self.path.length;
      distractions = 4;

      // Draw path
      for(i=1; i<total-1;i++) {
        next  = self.path[i+1];
        current = self.path[i];
        previous = self.path[i-1];

        x = pixelToCoord(current.x);
        y = pixelToCoord(current.y);

        if (previous.y < current.y) {
          direction = next.x > current.x ? 0 : 1;
        } else if (previous.y > current.y) {
          direction = next.x > current.x ? 1 : 0;
        } else if (previous.x < current.x) {
          direction = next.y > current.y ? 0 : 1;
        } else if (previous.x > current.x) {
          direction = next.y > current.y ? 1 : 0;
        }

        self.paddles['paddle_' + i] = new Paddle(canvas, direction, x, y);
      }

      // Draw distractions
      // for(i = total; i < total + distractions; i++) {
      //   direction = Math.randomInt(2);
      //   coords = randomCoord();
      //   self.paddles['paddle_' + i] = new Paddle(canvas, direction, coords.x, coords.y);
      // }
    }, 1); //1600

    // setTimeout(function() {
    //   for (i in self.paddles) {
    //     self.paddles[i].hide();
    //   }
    // }, 4000);
  }

  showLights = function(light_set, interval) {
    v = 0
    interval = interval ? interval : 15;
    self.lights_int = setInterval(function() {
      light_set[v].glow();
      v++;
      if(v == light_set.length) {
        clearInterval(self.lights_int)
      }
    }, interval);
  }

  randomCoord = function() {
    return {
      x: Math.randomInt(board.cols),
      y: Math.randomInt(board.rows),
    }
  }

  pixelToCoord = function(pixel) {
    return Math.floor((pixel-start_x)/grid_size);
  }

  startGame = function() {
    //
  }

  getCanvas = function() {
    return $("#" + self.settings.canvis_id).getContext('2d');
  }

  // public

  self.init = function() {
    if(initted) return false;
    canvas = getCanvas();
    buildGame();
    startGame();
    return initted = true;
  }

  return self;
}());