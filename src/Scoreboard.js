function Scorecard() {
  this.frames = [];
};

Scorecard.prototype.create = function(element) {
  if (this.frameCount() === 10) {throw new Error ("No more frames available, create a new game to play again.")}
  for (i = 0; i < 10; i++) { this.frames.push(new element) };
};

Scorecard.prototype.frameCount = function() { 
  return this.frames.length;
};

Scorecard.prototype.score = function () {
  var total = 0;
  for (i = 0; i < this.frames.length; i++) { total += this.frames[i].score };
  return total;
};

Scorecard.prototype.evaluateScores = function() {
  this._evaluateSpare();
  this._evaluateStrike();
};

Scorecard.prototype._evaluateSpare = function() {
  for (i = 0; i < this.frames.length; i++) { if (this.frames[i].isSpare()) {this.frames[i].score += this.frames[i+1].firstShot} };
};

Scorecard.prototype._evaluateStrike = function() {
  for (i = 0; i < this.frames.length; i++) {   
    if (this.frames[i].isStrike() && this.frames[i+1].isStrike()) {
      this.frames[i].score += (this.frames[i+1].firstShot + this.frames[i+2].firstShot)
    } else if (this.frames[i].isStrike()) {
      this.frames[i].score += (this.frames[i+1].firstShot + this.frames[i+1].secondShot) 
    }
  };
};
