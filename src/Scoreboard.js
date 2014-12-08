function Scorecard() {
  this.frames = [];
};

Scorecard.prototype.create = function(element) {
  if (this.frameCount() === 10) {throw new Error ("No more frames available, create a new game to play again.")}
  for (i = 0; i < 9; i++) { this.frames.push(new element) };
    this.frames.push(new FrameTen);
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

Scorecard.prototype.addShitUp = function(){
  for (i = 0; i < this.frames.length; i++) {
    this.frames[i].addUpYourShit();
  };
};

Scorecard.prototype._evaluateSpare = function() {
  for (i = 0; i < 9; i++) { 
    if (this.frames[i].isSpare() && this.frames[i].isFrame10) {
      this.frames[i].score = 10 + this.frames[i].thirdShot 
    } else if (this.frames[i].isSpare()) {
      this.frames[i].score += this._firstExtraRoll(i)} 
    };
};

Scorecard.prototype._evaluateStrike = function() {
  for (i = 0; i < 9; i++) { 
    if (this._isFrameTenAStrike(i)) {
      this.frames[i].score = (10 + this.frames[i].secondShot + this.frames[i].thirdShot)
    } else if (this.frames[i].isStrike()) {
      this.frames[i].score += (this._firstExtraRoll(i) + this._secondExtraRoll(i)) 
    }
  };
};


Scorecard.prototype._isFrameTenAStrike = function(i) {
  return this.frames[i].isFrame10 && this.frames[i].isStrike();
};

Scorecard.prototype._isFrameNineAndTenAStrike = function(i) {
  return (this.frames[i].isStrike() && this.frames[i+1].isStrike()) && this.frames[i+1].isFrame10;
};

Scorecard.prototype._firstExtraRoll = function(i) {
  return this.frames[i+1].firstShot
};

Scorecard.prototype._secondExtraRoll = function(i) {
  return this.frames[i+1].isFrame10 ? this.frames[i+1].secondShot : 
        this.frames[i+1].isStrike() ? this.frames[i+2].firstShot : 
                                      this.frames[i+1].secondShot;
};

