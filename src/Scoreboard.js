function Scorecard() {
  this.nextframe = 1
  this.frames = {}
};

Scorecard.prototype.create = function(element) {
  if (this.frameCount() >= 10) {throw new Error ("No more frames available, create a new game to play again.")}
  this.frames[this.nextframe] = (new element);
  this.nextframe++;
};

Scorecard.prototype.frameCount = function() { 
    var keys = [];
    for (var k in this.frames) { keys.push(k) };
    return keys.length; 
};

Scorecard.prototype.score = function () {
  var scores = [];
  var total = 0;
  for (var key in this.frames) { scores.push(this.frames[key]) };
  for (i = 0; i < scores.length; i++) { total += scores[i].score };
  return total;
};

Scorecard.prototype.evaluateScores = function() {
  var scores = [];
  var total = 0;
  for (var key in this.frames) { scores.push(this.frames[key]) };
  for (i = 0; i < scores.length; i++) { if (scores[i].isSpare()) {scores[i].score += scores[i+1].firstShot} };
  for (i = 0; i < scores.length; i++) { if (scores[i].isStrike()) {scores[i].score += (scores[i+1].secondShot +
   scores[i+1].firstShot) } };
};
