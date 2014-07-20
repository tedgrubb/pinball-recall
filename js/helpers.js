// Global Cache

Cache = (function() {
  self = {
    dom: {},
    data: {}
  }
  return self;
}());

// String Patches

String.prototype.supplant = function (o) {
  return this.replace(/{([^{}]*)}/g,
    function (a, b) {
      var r = o[b];
      return typeof r === 'string' || typeof r === 'number' ? r : a;
    }
  );
};

// Object Patches

Object.prototype.merge = function(other) {
  for (var key in other) {
    this[key] = other[key];
  }
}

Object.prototype.each = function(callback) {
  for(t in this) {
    if(this.propertyIsEnumerable(t)) {
      callback(this[t]);
    }
  }
}

// Array Patches

Array.prototype.each = function(callback) {
  var size = this.length;
  for(var i = 0; i < size; i++) {
    callback(this[i]);
  }
}

Array.prototype.first = function() {
  return this[0];
}

Array.prototype.last = function() {
  return this.slice(-1)[0];
}

// Math Pathces

Math.randomInt = function(max) {
  max = max || 10;
  return Math.floor( Math.random() * max );
}

// jQuery style element selector

$ = function(selectors) {
  elements = Cache.dom[selectors] || document.querySelector(selectors);
  return Cache.dom[selectors] = elements;
}

// requestAnimFrame Shim

window.requestAnimFrame = (function(){
  return window.requestAnimationFrame  ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(/* function */ callback, /* DOMElement */ element){
      window.setTimeout(callback, 1000 / 60);
    };
})();
