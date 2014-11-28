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

Frame.prototype.score = function() {
  return (10 - this.pinCount);
};

function Player() {};

Player.prototype.bowl = function(hitpins, currentframe) {
  currentframe.receiveShot(hitpins);
};


function Scorecard() {
  this.nextframe = 1
  this.frames = {}
};

Scorecard.prototype.create = function(element) {
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
  for (i = 0; i < scores.length; i++) { 
    console.log(scores)
    total += scores[i].score() };
  return total;
};