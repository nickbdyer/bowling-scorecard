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

function Player() {};

Player.prototype.bowl = function(hitpins, currentframe) {
  currentframe.receiveShot(hitpins);
};


function Scorecard() {
  this.nextframe = 1
};

Scorecard.prototype.create = function(element) {
  this.frames[this.nextframe] = (new element);
  this.nextframe++;
};

Scorecard.prototype.frames = {};

Scorecard.prototype.frameCount = function (){
    var keys = [];
    for(var k in this.frames) keys.push(k);
    return keys.length; 
};