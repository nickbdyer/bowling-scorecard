function Frame() {
  this.pinCount = 10
  this.shotCount = 0
  this.firstShot = null
  this.secondShot = null
  this.thirdShot = null
  this.score = 0
  this.isFrame10 = false
};

Frame.prototype.receiveShot = function(hitpins) {
  if (this.isFrame10) {
    this._checkShotLegalityFrame10(hitpins);
    this._updateFrame10Stats(hitpins);
    this.shotCount++;
  } else { 
    this._checkShotLegality(hitpins);
    this._updateFrameStats(hitpins);
    this.shotCount++;
  };
};

Frame.prototype.isSpare = function() {
  if (((this.firstShot + this.secondShot) === 10) && this.secondShot !== null ) { return true };
};

Frame.prototype.isStrike = function() {
  if (this.firstShot === 10 ) { return true };
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

Frame.prototype._checkShotLegalityFrame10 = function(hitpins) {
  if (this.isSpare() && this.shotCount === 3) { throw new Error ("You can not receive another shot in this frame."); 
  } else if (this.isStrike() && this.shotCount === 3) { throw new Error ("You can not receive another shot in this frame."); 
  } else if ((!this.isStrike() && !this.isSpare()) && this.shotCount === 2) { throw new Error ("You can not receive another shot in this frame."); 
  };
};

Frame.prototype._updateFrame10Stats = function(hitpins) {
  this.pinCount -= hitpins;
  this.score += hitpins;
  if (this.firstShot === null) { this.firstShot = hitpins 
  } else if ( this.secondShot === null) { this.secondShot = hitpins 
  } else { this.thirdShot = hitpins};
};