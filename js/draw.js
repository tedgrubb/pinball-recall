Draw = {
  line: function(target, start, end, styleOptions) {
    target.merge(styleOptions);

    target.beginPath();
    target.moveTo(start.x, start.y);
    target.lineTo(end.x, end.y);
    target.stroke();
  },

  box: function(target, start, end, styleOptions) {
    target.merge(styleOptions);
    target.fillRect(start.x, start.y, end.x, end.y);
  },

  circle: function() {

  },

  path: function(target, lines, styleOptions) {
    target.merge(styleOptions);
    console.log("PATH", lines);
    target.beginPath();
    target.moveTo(lines[0].x, lines[0].y);
    for(i=1;i<lines.length;i++) {
      target.lineTo(lines[i].x, lines[i].y);
    }
    target.stroke();
  }
}