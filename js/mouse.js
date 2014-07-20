Mouse = (function() {
  // Public
  self = {};
  self.x = null;
  self.y = null;
  self.target = null;

  // Private
  touchables = {};

  document.addEventListener("mousemove", function(event) {
    self.x = event.x;
    self.y = event.y;

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