'use strict';

var Frame = require('../src/frame.js');

function FrameTen() {
  this.thirdShot = null;
  this.isFrame10 = true;
}

FrameTen.prototype = new Frame();

FrameTen.prototype.receiveShot = function(hitpins) {
  this._checkShotLegality(hitpins);
  this._updateFrameVariables(hitpins);
  this.shotCount++;
};

FrameTen.prototype._checkShotLegality = function(hitpins) {
  if ( this._isSpareOrStrikeWith3Shots() || this._isNotASpareOrStrikeWith2Shots() )  { 
    throw new Error ("You can not receive another shot in this frame."); 
  }
};

FrameTen.prototype._updateFrameVariables = function(hitpins) {
  this._resetPins(hitpins);
  this.score += hitpins;
  this._assignShot(hitpins);
};

FrameTen.prototype._resetPins = function(hitpins) {
  if (hitpins === 10 ) { this.pinCount = 10; 
  } else if ( this.firstShot + this.secondShot === 10 ) { this.pinCount = 10;
  } else { this.pinCount -= hitpins; }
};

FrameTen.prototype._isSpareOrStrikeWith3Shots = function() {
  return ((this.isSpare() || this.isStrike()) && this.shotCount === 3);
};

FrameTen.prototype._isNotASpareOrStrikeWith2Shots = function() {
  return ((!this.isStrike() && !this.isSpare()) && this.shotCount === 2);
};

FrameTen.prototype._assignShot = function(hitpins) {
    this.firstShot === null ? this.firstShot = hitpins : 
  this.secondShot === null ? this.secondShot = hitpins : this.thirdShot = hitpins;
};

module.exports = FrameTen;