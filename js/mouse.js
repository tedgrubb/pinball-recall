Mouse = (function() {
  // Public
  self = {};
  self.x = null;
  self.y = null;
  self.offset_x = null;
  self.offset_y = null;
  self.target = null;

  // Private
  touchables = [];

  document.addEventListener("mousemove", function(event) {
    self.x = event.x;
    self.y = event.y;

    self.offset_x = $('#container').offsetLeft;
    self.offset_y = $('#container').offsetTop;

    coords = pixelsToCoords(
      (self.x - self.offset_x),
      (self.y - self.offset_y)
    );

    over = false;

    touchables.each(function(touchable) {
      target_coords = pixelsToCoords(
        (touchable.coords.x),
        (touchable.coords.y)
      );
      if(coords.x == target_coords.x && coords.y == target_coords.y) {
        over = true;
        if(self.target != touchable.target) {
          $('#container').style.cursor = 'pointer';
          if(self.target != null) self.target.mouseOut();
          self.target = touchable.target;
          self.target.mouseOver();
        }
      }
    });

    if(!over && self.target != null) {
      $('#container').style.cursor = 'default';
      self.target.mouseOut();
      self.target = null;
    }
  });

  self.registerTouchable = function(target, coords) {
    touchables.push({target: target, coords: coords});
  }

  self.getTouchables = function() {
    return touchables;
  }

  return self;
}());