function Frame() {
  this.pinCount = 10
  this.shotCount = 0
};

Frame.prototype.receiveShot = function(hitpins) {
  if (this.shotCount === 2) { throw new Error ("You can not receive another shot in this frame."); }
  if ((this.pinCount - hitpins) < 0 ) { throw new Error ("You can only hit 10 pins per frame.")}
  this.pinCount -= hitpins;
  this.shotCount++;
};

