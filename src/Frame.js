'use strict';

function Frame() {
  this.pinCount = 10;
  this.shotCount = 0;
  this.firstShot = null;
  this.secondShot = null;
  this.score = 0;
}


Frame.prototype.isSpare = function() {
  if (((this.firstShot + this.secondShot) === 10) && this.secondShot !== null ) { return true; }
};

Frame.prototype.isStrike = function() {
  if (this.firstShot === 10 ) { return true; }
};

Frame.prototype.receiveShot = function(hitpins) {
  this._checkFrameLegality(hitpins);
  this._updateFrameVariables(hitpins);
  this.shotCount++;
};

Frame.prototype._checkFrameLegality = function(hitpins) {
  if (this.shotCount === 2) { throw new Error ("You can not receive another shot in this frame."); }
  if ((this.pinCount - hitpins) < 0 ) { throw new Error ("You can only hit 10 pins per frame."); }
};

Frame.prototype._updateFrameVariables = function(hitpins) {
  this.pinCount -= hitpins;
  this.score += hitpins;
  this.firstShot === null ? this.firstShot = hitpins : this.secondShot = hitpins;
};

module.exports = Frame;