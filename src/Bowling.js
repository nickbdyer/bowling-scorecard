function Frame() {
  this.pinCount = 10
  this.shotCount = 0
  this.firstShot = null
  this.secondShot = null
  this.score = 0
};

Frame.prototype.receiveShot = function(hitpins) {
  if (this.shotCount === 2) { throw new Error ("You can not receive another shot in this frame."); }
  if ((this.pinCount - hitpins) < 0 ) { throw new Error ("You can only hit 10 pins per frame.")}
  this.pinCount -= hitpins;
  this.shotCount++;
  this.score += hitpins;
  if (this.firstShot === null) { this.firstShot = hitpins; 
  } else { this.secondShot = hitpins; };
};

Frame.prototype.isSpare = function() {
  if (this.pinCount === 0 && this.secondShot !== null ) { return true };
};

Frame.prototype.isStrike = function() {
  if (this.pinCount === 0 && this.secondShot === null ) { return true };
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
  for (i = 0; i < scores.length; i++) { if (scores[i].isSpare) {scores[i].score += scores[i+=1].firstShot} };



};









