Mouse = (function() {
  // Public
  self = {};
  self.x = null;
  self.y = null;
  self.offset_x = null;
  self.offset_y = null;
  self.target = null;

  // Private
  touchables = {};

  document.addEventListener("mousemove", function(event) {
    self.x = event.x;
    self.y = event.y;

    self.offset_x = $('#container').offsetLeft;
    self.offset_y = $('#container').offsetTop;

    coords = pixelsToCoords(
      (self.x - self.offset_x),
      (self.y - self.offset_y)
    );

    console.log(coords.x, coords.y);

    touchables.each(function(touchable) {
      console.log(touchable);
    });
  });

  self.registerTouchable = function(identifier, coord_tl, coord_br) {
    touchables[identifier] = [coord_tl, coord_br];
  }

  self.getTouchables = function() {
    return touchables;
  }

  return self;
}());