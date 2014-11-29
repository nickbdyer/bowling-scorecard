function Frame() {
  this.pinCount = 10
  this.shotCount = 0
  this.firstShot = null
  this.secondShot = null
  this.score = 0
};

Frame.prototype.receiveShot = function(hitpins) {
  this._checkShotLegality(hitpins);
  this._updateFrameStats(hitpins);
  this.shotCount++;
};

Frame.prototype.isSpare = function() {
  if (this.pinCount === 0 && this.secondShot !== null ) { return true };
};

Frame.prototype.isStrike = function() {
  if (this.pinCount === 0 && this.secondShot === null ) { return true };
};

Frame.prototype._checkShotLegality = function(hitpins) {
  if (this.shotCount === 2) { throw new Error ("You can not receive another shot in this frame."); }
  if ((this.pinCount - hitpins) < 0 ) { throw new Error ("You can only hit 10 pins per frame.")}
};

Frame.prototype._updateFrameStats = function(hitpins) {
  this.pinCount -= hitpins;
  this.score += hitpins;
  if (this.firstShot === null) { this.firstShot = hitpins 
  } else { this.secondShot = hitpins };
};